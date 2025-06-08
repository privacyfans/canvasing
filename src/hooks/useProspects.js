// src/hooks/useProspects.js
import { useState, useCallback, useEffect, useRef } from 'react'
import { useApiCall } from '@src/hooks/useApiCall'
import { buildProspectListUrl, logApiResponse } from '@src/utils/apiUtils'

export const useProspects = () => {
  const { apiCall, getUserId, isAuthenticated, isLoading: authLoading } = useApiCall()
  const [prospects, setProspects] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [pagination, setPagination] = useState({
    currentPage: 1,
    perPage: 10,
    total: 0,
    totalPages: 0
  })

  // Store current search term to preserve during pagination
  const currentSearchRef = useRef('')

  // Load prospects - Fixed dependency issue
  const loadProspects = useCallback(async (params = {}) => {
    if (!isAuthenticated) {
      console.log('[Load Prospects] Not authenticated, skipping')
      setError('Please login to view prospects')
      return
    }

    const userId = getUserId()
    if (!userId) {
      console.log('[Load Prospects] No userId available')
      setError('User ID not found')
      return
    }

    setLoading(true)
    setError(null)

    try {
      // Use current pagination state for defaults, not from dependency
      const requestParams = {
        page: params.page || pagination.currentPage || 1,
        size: params.size || pagination.perPage || 10,
        userId: userId,
        paging: '1'
      }

      // Preserve search term if not explicitly provided
      const searchTerm = params.hasOwnProperty('search') 
        ? params.search 
        : currentSearchRef.current

      // Only add search term if provided and not empty
      if (searchTerm && searchTerm.trim()) {
        requestParams.term = searchTerm.trim()
        currentSearchRef.current = searchTerm.trim()
        console.log('[Load Prospects] Search term added:', searchTerm.trim())
      } else {
        currentSearchRef.current = ''
        console.log('[Load Prospects] No search term provided')
      }

      // Build URL with search parameter properly
      const urlParams = {
        page: requestParams.page,
        size: requestParams.size,
        paging: requestParams.paging,
        userId: requestParams.userId
      }
      
      // Add search term if exists
      if (requestParams.term) {
        urlParams.search = requestParams.term
      }
      
      const url = buildProspectListUrl(urlParams)

      console.log('[Load Prospects] Request URL:', url)
      console.log('[Load Prospects] Request Params:', requestParams)

      const response = await apiCall(url)
      
      // Log response for debugging
      logApiResponse('GET', url, response)

      if (response.status && response.code === '000') {
        const data = response.data || {}
        const items = data.items || []
        const paginationData = data.pagination || {}
        
        console.log('[Load Prospects] Items found:', items.length)
        console.log('[Load Prospects] Pagination:', paginationData)
        
        setProspects(items)
        setPagination({
          currentPage: paginationData.currentPage || requestParams.page,
          perPage: paginationData.perPage || requestParams.size,
          total: paginationData.total || 0,
          totalPages: paginationData.totalPages || 1
        })
      } else if (response.message === 'Data not found' || response.code === '114') {
        // Handle "Data not found" as empty results, not an error
        console.log('[Load Prospects] No data found, showing empty results')
        setProspects([])
        setPagination({
          currentPage: requestParams.page,
          perPage: requestParams.size,
          total: 0,
          totalPages: 1
        })
      } else {
        throw new Error(response.message || 'Failed to load prospects')
      }
    } catch (err) {
      console.error('[Load Prospects] Error:', err)
      setError(err.message)
      setProspects([])
      setPagination(prev => ({ 
        ...prev, 
        total: 0, 
        totalPages: 0,
        currentPage: 1 
      }))
    } finally {
      setLoading(false)
    }
  }, [apiCall, getUserId, isAuthenticated]) // Removed pagination dependencies

  // Search prospects
  const searchProspects = useCallback(async (searchTerm = '') => {
    console.log('[Search Prospects] Searching for:', `"${searchTerm}"`)
    console.log('[Search Prospects] Search term type:', typeof searchTerm)
    console.log('[Search Prospects] Search term length:', searchTerm?.length)
    
    currentSearchRef.current = searchTerm
    const params = { search: searchTerm, page: 1 }
    console.log('[Search Prospects] Calling loadProspects with params:', params)
    await loadProspects(params)
  }, [loadProspects])

  // Change page - Fixed to preserve search term
  const changePage = useCallback(async (page) => {
    console.log('[Change Page] Changing to page:', page, 'with search:', currentSearchRef.current)
    
    if (page >= 1 && page <= pagination.totalPages) {
      const params = { 
        page,
        search: currentSearchRef.current // Preserve current search
      }
      await loadProspects(params)
    }
  }, [loadProspects, pagination.totalPages])

  // Change page size - Fixed to preserve search term
  const changePageSize = useCallback(async (size) => {
    console.log('[Change Page Size] Changing to size:', size, 'with search:', currentSearchRef.current)
    
    const params = { 
      page: 1, 
      size,
      search: currentSearchRef.current // Preserve current search
    }
    await loadProspects(params)
  }, [loadProspects])

  // Refresh prospects - Preserve current state
  const refreshProspects = useCallback(async () => {
    console.log('[Refresh Prospects] Refreshing with current state')
    
    const params = {
      page: pagination.currentPage,
      size: pagination.perPage,
      search: currentSearchRef.current
    }
    await loadProspects(params)
  }, [loadProspects, pagination.currentPage, pagination.perPage])

  // Delete prospect
  const deleteProspect = useCallback(async (id) => {
    if (!isAuthenticated) {
      return { success: false, error: 'Not authenticated' }
    }

    try {
      setLoading(true)
      const response = await apiCall(`prospect/${id}`, {
        method: 'DELETE'
      })

      if (response.status && response.code === '000') {
        // Reload current page with current search
        const params = {
          page: pagination.currentPage,
          size: pagination.perPage,
          search: currentSearchRef.current
        }
        await loadProspects(params)
        return { success: true }
      } else {
        throw new Error(response.message || 'Failed to delete prospect')
      }
    } catch (err) {
      console.error('[Delete Prospect] Error:', err)
      return { success: false, error: err.message }
    } finally {
      setLoading(false)
    }
  }, [apiCall, isAuthenticated, loadProspects, pagination.currentPage, pagination.perPage])

  // Load initial data when authenticated
  useEffect(() => {
    if (isAuthenticated && !authLoading) {
      console.log('[useProspects] Authentication ready, loading prospects...')
      loadProspects()
    } else if (!isAuthenticated && !authLoading) {
      console.log('[useProspects] Not authenticated')
      setError('Please login to view prospects')
      setProspects([])
    }
  }, [isAuthenticated, authLoading, loadProspects])

  return {
    prospects,
    loading: loading || authLoading,
    error,
    pagination,
    searchProspects,
    changePage,
    changePageSize,
    refreshProspects,
    deleteProspect,
    loadProspects,
    isAuthenticated
  }
}