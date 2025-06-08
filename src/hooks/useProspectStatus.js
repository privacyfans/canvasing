import { useState, useCallback } from 'react'
import { useApiCall } from './useApiCall'

export const useProspectStatus = () => {
  const [loading, setLoading] = useState(false)
  const [statusHistory, setStatusHistory] = useState([])
  const { apiCall } = useApiCall()

  const fetchStatusHistory = useCallback(async (prospectId) => {
    if (!prospectId) return { success: false, error: 'Prospect ID is required' }

    setLoading(true)
    try {
      const result = await apiCall(`prospect/status/list?prospectId=${prospectId}`)

      if (result.status && result.data?.items) {
        setStatusHistory(result.data.items)
        return { success: true, data: result.data.items }
      } else {
        // Handle 404 "Data not found" as empty status history
        if (result.message === 'Data not found' || result.code === '114') {
          setStatusHistory([])
          return { success: true, data: [] }
        }
        return { success: false, error: result.message || 'Failed to fetch status history' }
      }
    } catch (error) {
      console.error('Error fetching status history:', error)
      return { success: false, error: 'Network error occurred' }
    } finally {
      setLoading(false)
    }
  }, [apiCall])

  const createStatus = useCallback(async (statusData) => {
    const { prospectId, statusId, statusName, note } = statusData

    if (!prospectId || !statusId || !statusName) {
      return { success: false, error: 'Missing required fields' }
    }

    setLoading(true)
    try {
      const result = await apiCall('prospect/status/create', {
        method: 'POST',
        body: JSON.stringify({
          prospectId,
          statusId,
          statusName,
          note: note || ''
        })
      })

      if (result.status) {
        console.log('Status created successfully')
        return { success: true, data: result.data }
      } else {
        console.log(result.message || 'Status creation failed')
        return { success: false, error: result.message || 'Status creation failed' }
      }
    } catch (error) {
      console.error('Error creating status:', error)
      console.log('Status creation failed. Please try again.')
      return { success: false, error: 'Network error occurred' }
    } finally {
      setLoading(false)
    }
  }, [apiCall])

  const updateStatus = useCallback(async (statusData) => {
    const { id, statusId, statusName, note } = statusData

    if (!id || !statusId || !statusName) {
      return { success: false, error: 'Missing required fields' }
    }

    setLoading(true)
    try {
      const result = await apiCall('prospect/status/update', {
        method: 'PUT',
        body: JSON.stringify({
          id,
          statusId,
          statusName,
          note: note || ''
        })
      })

      if (result.status) {
        console.log('Status updated successfully')
        return { success: true, data: result.data }
      } else {
        console.log(result.message || 'Status update failed')
        return { success: false, error: result.message || 'Status update failed' }
      }
    } catch (error) {
      console.error('Error updating status:', error)
      console.log('Status update failed. Please try again.')
      return { success: false, error: 'Network error occurred' }
    } finally {
      setLoading(false)
    }
  }, [apiCall])

  const getStatusOptions = useCallback(() => {
    return [
      { id: '01', name: 'On Verification', color: 'bg-yellow-100 text-yellow-800' },
      { id: '02', name: 'Rejected', color: 'bg-red-100 text-red-800' },
      { id: '03', name: 'Approved', color: 'bg-green-100 text-green-800' }
    ]
  }, [])

  const getStatusById = useCallback((statusId) => {
    const options = getStatusOptions()
    return options.find(option => option.id === statusId)
  }, [getStatusOptions])

  const getCurrentStatus = useCallback(() => {
    if (statusHistory.length === 0) return null
    return statusHistory[statusHistory.length - 1]
  }, [statusHistory])

  return {
    loading,
    statusHistory,
    fetchStatusHistory,
    createStatus,
    updateStatus,
    getStatusOptions,
    getStatusById,
    getCurrentStatus
  }
}

export default useProspectStatus