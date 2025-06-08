// src/hooks/useEditProspect.js
import { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import { useApiCall } from '@src/hooks/useApiCall'
import { buildProspectDetailUrl, logApiResponse, logApiRequest } from '@src/utils/apiUtils'

export const useEditProspect = (prospectId) => {
  const [isLoading, setIsLoading] = useState(false)
  const [isLoadingProspect, setIsLoadingProspect] = useState(false)
  const [prospectData, setProspectData] = useState(null)
  const [error, setError] = useState(null)
  const { apiCall, getUserId, isAuthenticated } = useApiCall()

  // Get prospect detail by ID
  const getProspectDetail = async (id) => {
    if (!id) {
      setError('Prospect ID is required')
      return null
    }

    if (!isAuthenticated) {
      setError('Not authenticated')
      return null
    }
    
    const userId = getUserId()
    if (!userId) {
      console.log('[Get Prospect Detail] No userId available')
      setError('User ID not found')
      return null
    }
    
    setIsLoadingProspect(true)
    setError(null)
    
    try {
      console.log('[Get Prospect Detail] Loading prospect:', id, 'for user:', userId)
      
      // Build URL with proper parameters
      const url = buildProspectDetailUrl(id, userId)
      console.log('[Get Prospect Detail] Request URL:', url)
      
      const result = await apiCall(url)
      
      // Log response for debugging
      logApiResponse('GET', url, result)

      if (result.status && result.code === '000') {
        console.log('[Get Prospect Detail] Success:', result.data)
        setProspectData(result.data)
        setError(null)
        return result.data
      } else {
        throw new Error(result.message || 'Failed to fetch prospect detail')
      }
    } catch (error) {
      console.error('[Get Prospect Detail] Error:', error)
      const errorMessage = error.message || 'Failed to fetch prospect detail'
      setError(errorMessage)
      toast.error(errorMessage)
      setProspectData(null)
      return null
    } finally {
      setIsLoadingProspect(false)
    }
  }

  // Update prospect data (now using the new API endpoint)
  const updateProspect = async (updateData) => {
    if (!isAuthenticated) {
      throw new Error('Not authenticated')
    }

    if (!prospectId) {
      throw new Error('Prospect ID is required')
    }

    setIsLoading(true)
    
    try {
      console.log('[Update Prospect] Starting update for prospect:', prospectId)
      
      // Prepare the request data with the prospect ID
      const requestData = {
        id: prospectId,
        ...updateData
      }

      // Remove any undefined or null values
      Object.keys(requestData).forEach(key => {
        if (requestData[key] === null || requestData[key] === undefined) {
          delete requestData[key]
        }
      })

      console.log('[Update Prospect] Request data:', requestData)
      logApiRequest('PUT', 'prospect/update', { body: JSON.stringify(requestData) })

      const result = await apiCall('prospect/update', {
        method: 'PUT',
        body: JSON.stringify(requestData),
      })

      logApiResponse('PUT', 'prospect/update', result)

      if (result.status && result.code === '000') {
        console.log('[Update Prospect] Success:', result.data)
        
        // Update local prospect data with the response or merge with existing
        if (result.data) {
          setProspectData(result.data)
        } else {
          // If no data returned, merge with existing data
          setProspectData(prev => ({ ...prev, ...updateData }))
        }
        
        toast.success('Data berhasil diperbarui!')
        return result
      } else {
        throw new Error(result.message || 'Failed to update prospect')
      }
    } catch (error) {
      console.error('[Update Prospect] Error:', error)
      const errorMessage = error.message || 'Gagal memperbarui data'
      toast.error(errorMessage)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  // Update profile picture only
  const updateProfilePicture = async (profilePictureBase64) => {
    if (!isAuthenticated) {
      throw new Error('Not authenticated')
    }

    if (!prospectId) {
      throw new Error('Prospect ID is required')
    }

    setIsLoading(true)
    
    try {
      console.log('[Update Profile Picture] Starting update for prospect:', prospectId)
      
      const requestData = {
        id: prospectId,
        profilePicture: profilePictureBase64,
      }

      logApiRequest('PUT', 'prospect/profilepicture/update', { body: JSON.stringify(requestData) })

      const result = await apiCall('prospect/profilepicture/update', {
        method: 'PUT',
        body: JSON.stringify(requestData),
      })

      logApiResponse('PUT', 'prospect/profilepicture/update', result)

      if (result.status && result.code === '000') {
        console.log('[Update Profile Picture] Success')
        toast.success('Foto profil berhasil diperbarui!')
        
        // Update local prospect data if available
        if (prospectData) {
          const updatedData = { ...prospectData }
          // Update profile picture URL if it's in the response
          if (result.data?.profilePictureUrl) {
            updatedData.profilePictureUrl = result.data.profilePictureUrl
          }
          // Update the base64 data if provided
          if (profilePictureBase64) {
            updatedData.profilePicture = profilePictureBase64
          }
          setProspectData(updatedData)
        }
        
        return result
      } else {
        throw new Error(result.message || 'Failed to update profile picture')
      }
    } catch (error) {
      console.error('[Update Profile Picture] Error:', error)
      toast.error(error.message || 'Gagal memperbarui foto profil')
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  // Update prospect with photo (combined operation)
  const updateProspectWithPhoto = async (updateData, photoFile = null) => {
    try {
      console.log('[Update Prospect With Photo] Starting update with photo:', !!photoFile)
      
      // Step 1: Update profile picture if provided
      if (photoFile) {
        console.log('[Update Prospect With Photo] Updating profile picture first')
        // Convert file to base64
        const base64 = await convertFileToBase64(photoFile)
        await updateProfilePicture(base64)
      }
      
      // Step 2: Update prospect data if provided
      if (updateData && Object.keys(updateData).length > 0) {
        console.log('[Update Prospect With Photo] Updating prospect data')
        await updateProspect(updateData)
      }

      // If no data and no photo, show message
      if ((!updateData || Object.keys(updateData).length === 0) && !photoFile) {
        toast.info('Tidak ada perubahan untuk disimpan')
        return { success: true, message: 'No changes to save' }
      }

      return { success: true, message: 'Profile berhasil diperbarui' }
    } catch (error) {
      console.error('[Update Prospect With Photo] Error:', error)
      throw error
    }
  }

  // Function to save form data to local state (backup method)
  const saveFormDataLocally = (formData) => {
    try {
      console.log('[Save Form Data Locally] Saving data as backup:', formData)
      
      // Update the local state
      const updatedData = { ...prospectData, ...formData }
      setProspectData(updatedData)
      
      // Save to localStorage for persistence
      localStorage.setItem(`prospect_draft_${prospectId}`, JSON.stringify(formData))
      
      toast.info('Data disimpan secara lokal sebagai backup.')
      return { success: true, message: 'Data saved locally' }
    } catch (error) {
      console.error('[Save Form Data Locally] Error:', error)
      throw error
    }
  }

  // Validate required fields before update
  const validateProspectData = (data) => {
    const requiredFields = ['phoneNumber', 'fullName']
    const missingFields = []

    requiredFields.forEach(field => {
      if (!data[field] || data[field].trim() === '') {
        missingFields.push(field)
      }
    })

    if (missingFields.length > 0) {
      throw new Error(`Field wajib tidak boleh kosong: ${missingFields.join(', ')}`)
    }

    return true
  }

  // Enhanced update function with validation
  const updateProspectSafe = async (updateData) => {
    try {
      // Validate required fields
      validateProspectData(updateData)
      
      // Call the actual update
      return await updateProspect(updateData)
    } catch (error) {
      throw error
    }
  }

  // Load prospect detail on hook initialization
  useEffect(() => {
    if (prospectId && isAuthenticated) {
      console.log('[useEditProspect] Loading prospect detail for:', prospectId)
      getProspectDetail(prospectId)
    } else if (prospectId && !isAuthenticated) {
      console.log('[useEditProspect] Not authenticated, skipping load')
      setError('Not authenticated')
    }
  }, [prospectId, isAuthenticated])

  // Additional effect to handle form reset after prospect data loads
  useEffect(() => {
    if (prospectData) {
      console.log('[useEditProspect] Prospect data updated:', prospectData)
    }
  }, [prospectData])

  return {
    prospectData,
    isLoadingProspect,
    isLoading,
    error,
    getProspectDetail,
    updateProspect,
    updateProspectSafe,
    updateProfilePicture,
    updateProspectWithPhoto,
    saveFormDataLocally,
    validateProspectData,
    isAuthenticated,
    // Expose individual field update functions for better control
    setProspectData
  }
}

// Helper function to convert file to base64
const convertFileToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => {
      // Remove the data:image/jpeg;base64, part
      const base64 = reader.result.split(',')[1]
      resolve(base64)
    }
    reader.onerror = (error) => reject(error)
  })
}