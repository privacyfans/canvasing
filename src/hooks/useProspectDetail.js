// src/hooks/useProspectDetail.js
import { useState, useCallback } from 'react'
import { useApiCall } from '@src/hooks/useApiCall'
import { buildProspectDetailUrl, logApiResponse } from '@src/utils/apiUtils'

export const useProspectDetail = () => {
  const { apiCall, getUserId, isAuthenticated } = useApiCall()
  const [prospectDetail, setProspectDetail] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  // Fetch prospect detail
  const fetchProspectDetail = useCallback(async (id) => {
    if (!id) {
      setError('Prospect ID is required')
      return
    }

    if (!isAuthenticated) {
      setError('Not authenticated')
      return
    }

    const userId = getUserId()
    if (!userId) {
      console.log('[Fetch Prospect Detail] No userId available')
      setError('User ID not found')
      return
    }

    setLoading(true)
    setError(null)
    
    try {
      console.log('[Fetch Prospect Detail] Loading detail for ID:', id, 'User:', userId)
      
      // Build URL with proper parameters using apiUtils
      const url = buildProspectDetailUrl(id, userId)
      console.log('[Fetch Prospect Detail] Request URL:', url)
      
      const response = await apiCall(url)
      
      // Log response for debugging
      logApiResponse('GET', url, response)
      
      if (response?.status && response?.code === '000') {
        console.log('[Fetch Prospect Detail] Success:', response.data)
        setProspectDetail(response.data)
        setError(null)
      } else {
        throw new Error(response?.message || 'Failed to fetch prospect detail')
      }
    } catch (err) {
      console.error('[Fetch Prospect Detail] Error:', err)
      const errorMessage = err.message || 'Failed to fetch prospect detail'
      setError(errorMessage)
      setProspectDetail(null)
    } finally {
      setLoading(false)
    }
  }, [apiCall, getUserId, isAuthenticated])

  // Clear prospect detail
  const clearProspectDetail = useCallback(() => {
    console.log('[Clear Prospect Detail] Clearing data')
    setProspectDetail(null)
    setError(null)
    setLoading(false)
  }, [])

  // Refresh prospect detail
  const refreshProspectDetail = useCallback(async (id) => {
    console.log('[Refresh Prospect Detail] Refreshing for ID:', id)
    await fetchProspectDetail(id)
  }, [fetchProspectDetail])

  return {
    prospectDetail,
    loading,
    error,
    fetchProspectDetail,
    clearProspectDetail,
    refreshProspectDetail,
    isAuthenticated
  }
}