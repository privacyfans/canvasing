// src/hooks/useCreateProspect.js
import { useState } from 'react'
import { useApiCall } from '@src/hooks/useApiCall'
import { logApiRequest, logApiResponse } from '@src/utils/apiUtils'
import { toast } from 'react-toastify'

export const useCreateProspect = () => {
  const [isLoading, setIsLoading] = useState(false)
  const { apiCall, getUserId, isAuthenticated } = useApiCall()

  const createProspect = async (prospectData) => {
    if (!isAuthenticated) {
      throw new Error('Not authenticated')
    }

    const userId = getUserId()
    if (!userId) {
      throw new Error('User ID not found')
    }

    setIsLoading(true)
    
    try {
      console.log('[Create Prospect] Starting creation with data:', prospectData)
      
      // Add userId to prospect data
      const dataWithUserId = {
        ...prospectData,
        userId: userId
      }

      logApiRequest('POST', 'prospect/create', { body: JSON.stringify(dataWithUserId) })

      const result = await apiCall('prospect/create', {
        method: 'POST',
        body: JSON.stringify(dataWithUserId),
      })

      logApiResponse('POST', 'prospect/create', result)

      if (result.status && result.code === '000') {
        console.log('[Create Prospect] Success:', result.data)
        return result
      } else {
        // Handle business logic errors gracefully (don't throw)
        console.log('[Create Prospect] Business logic error:', {
          code: result.code,
          message: result.message,
          status: result.status
        })
        
        // Show user-friendly error message
        if (result.code === '002') {
          toast.error('Data sudah ada. Silakan periksa kembali data yang dimasukkan.')
        } else {
          toast.error(result.message || 'Failed to create prospect')
        }
        
        // Return the result so components can handle it properly
        return result
      }
    } catch (error) {
      console.error('[Create Prospect] Error:', error)
      toast.error(error.message || 'Failed to create prospect')
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const updateProfilePicture = async (id, profilePictureBase64) => {
    if (!isAuthenticated) {
      throw new Error('Not authenticated')
    }

    setIsLoading(true)
    
    try {
      console.log('[Update Profile Picture] Starting update for prospect:', id)
      
      const requestData = {
        id: id,
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
        return result
      } else {
        throw new Error(result.message || 'Failed to update profile picture')
      }
    } catch (error) {
      console.error('[Update Profile Picture] Error:', error)
      toast.error(error.message || 'Failed to update profile picture')
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const createProspectWithPhoto = async (prospectData, photoFile = null) => {
    console.log('[Create Prospect With Photo] Starting with photo:', !!photoFile)
    
    // Step 1: Create prospect
    const prospectResult = await createProspect(prospectData)
    
    // Check if prospect creation was successful
    if (!prospectResult.status || prospectResult.code !== '000') {
      console.log('[Create Prospect With Photo] Prospect creation failed:', prospectResult)
      // Error message already shown by createProspect, just return the result
      return prospectResult
    }
    
    // Step 2: Upload profile picture if provided
    if (photoFile && prospectResult.data?.id) {
      console.log('[Create Prospect With Photo] Uploading photo for ID:', prospectResult.data.id)
      try {
        // Convert file to base64
        const base64 = await convertFileToBase64(photoFile)
        await updateProfilePicture(prospectResult.data.id, base64)
      } catch (photoError) {
        console.error('[Create Prospect With Photo] Photo upload failed:', photoError)
        // Photo upload failed, but prospect was created successfully
        toast.warning('Prospect created successfully, but profile picture upload failed.')
        return prospectResult
      }
    }

    toast.success('Prospect created successfully!')
    return prospectResult
  }

  return {
    createProspect,
    updateProfilePicture,
    createProspectWithPhoto,
    isLoading,
    isAuthenticated
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