// src/hooks/useProspectStats.js
import { useState, useCallback, useEffect } from 'react'
import { useApiCall } from '@src/hooks/useApiCall'

export const useProspectStats = () => {
  const { apiCall, getUserId, isAuthenticated, isLoading: authLoading } = useApiCall()
  const [stats, setStats] = useState({
    total: 0,
    onVerification: 0,
    rejected: 0,
    approved: 0
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  // Load prospect statistics
  const loadStats = useCallback(async () => {
    if (!isAuthenticated) {
      console.log('[Prospect Stats] Not authenticated, skipping')
      setError('Please login to view statistics')
      return
    }

    const userId = getUserId()
    if (!userId) {
      console.log('[Prospect Stats] No userId available')
      setError('User ID not found')
      return
    }

    setLoading(true)
    setError(null)

    try {
      // Get all prospects without pagination to calculate statistics
      const response = await apiCall(`prospect/list?userId=${userId}&paging=0`)
      
      console.log('[Prospect Stats] Response:', response)

      if (response.status && response.code === '000') {
        const prospects = response.data?.items || []
        
        console.log('[Prospect Stats] Total prospects found:', prospects.length)

        // Calculate statistics based on current status
        const statistics = {
          total: prospects.length,
          onVerification: 0,
          rejected: 0,
          approved: 0
        }

        // Count prospects by their status using statusId and statusName fields
        prospects.forEach(prospect => {
          const statusId = prospect.statusId
          const statusName = prospect.statusName
          
          console.log('[Prospect Stats] Processing prospect:', {
            id: prospect.id,
            statusId: statusId,
            statusName: statusName
          })
          
          // Use statusId first (more reliable), fallback to statusName
          if (statusId === '01' || (statusName && statusName.toLowerCase().includes('verification'))) {
            statistics.onVerification++
          } else if (statusId === '02' || (statusName && statusName.toLowerCase().includes('rejected'))) {
            statistics.rejected++
          } else if (statusId === '03' || (statusName && statusName.toLowerCase().includes('approved'))) {
            statistics.approved++
          } else {
            // Unknown status, consider as "On Verification"
            console.log('[Prospect Stats] Unknown status, defaulting to On Verification:', { statusId, statusName })
            statistics.onVerification++
          }
        })

        console.log('[Prospect Stats] Calculated statistics:', statistics)
        setStats(statistics)
      } else if (response.message === 'Data not found' || response.code === '114') {
        // Handle "Data not found" as empty results
        console.log('[Prospect Stats] No data found, setting empty stats')
        setStats({
          total: 0,
          onVerification: 0,
          rejected: 0,
          approved: 0
        })
      } else {
        throw new Error(response.message || 'Failed to load prospect statistics')
      }
    } catch (err) {
      console.error('[Prospect Stats] Error:', err)
      setError(err.message)
      setStats({
        total: 0,
        onVerification: 0,
        rejected: 0,
        approved: 0
      })
    } finally {
      setLoading(false)
    }
  }, [apiCall, getUserId, isAuthenticated])

  // Refresh statistics
  const refreshStats = useCallback(async () => {
    console.log('[Prospect Stats] Refreshing statistics')
    await loadStats()
  }, [loadStats])

  // Load initial data when authenticated
  useEffect(() => {
    if (isAuthenticated && !authLoading) {
      console.log('[useProspectStats] Authentication ready, loading statistics...')
      loadStats()
    } else if (!isAuthenticated && !authLoading) {
      console.log('[useProspectStats] Not authenticated')
      setError('Please login to view statistics')
      setStats({
        total: 0,
        onVerification: 0,
        rejected: 0,
        approved: 0
      })
    }
  }, [isAuthenticated, authLoading, loadStats])

  return {
    stats,
    loading: loading || authLoading,
    error,
    refreshStats,
    isAuthenticated
  }
}

export default useProspectStats