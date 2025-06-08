import { useState, useCallback } from 'react'
import { useApiCall } from './useApiCall'

export const useAttachments = () => {
  const [loading, setLoading] = useState(false)
  const [documents, setDocuments] = useState([])
  const { apiCall } = useApiCall()

  const fetchDocuments = useCallback(async (prospectId, categoryId = '') => {
    if (!prospectId) return { success: false, error: 'Prospect ID is required' }

    setLoading(true)
    try {
      const queryParams = new URLSearchParams({
        paging: '0',
        prospectId,
        categoryId
      })

      const result = await apiCall(`prospect/attachment/list?${queryParams.toString()}`)

      if (result.status && result.data?.items) {
        setDocuments(result.data.items)
        return { success: true, data: result.data.items }
      } else {
        // Handle "Data not found" gracefully - return empty array instead of error
        if (result.code === '114' || result.message === 'Data not found') {
          console.log('[fetchDocuments] No documents found for prospect:', prospectId)
          setDocuments([])
          return { success: true, data: [] }
        }
        return { success: false, error: result.message || 'Failed to fetch documents' }
      }
    } catch (error) {
      console.error('Error fetching documents:', error)
      return { success: false, error: 'Network error occurred' }
    } finally {
      setLoading(false)
    }
  }, [apiCall])

  const createDocument = useCallback(async (documentData) => {
    const { prospectId, categoryId, categoryName, name, size, type, file } = documentData

    if (!prospectId || !categoryId || !categoryName || !name || !size || !type || !file) {
      return { success: false, error: 'Missing required fields' }
    }

    setLoading(true)
    try {
      const result = await apiCall('prospect/attachment/create', {
        method: 'POST',
        body: JSON.stringify(documentData)
      })

      if (result.status) {
        console.log('Document uploaded successfully')
        return { success: true, data: result.data }
      } else {
        console.log(result.message || 'Upload failed')
        return { success: false, error: result.message || 'Upload failed' }
      }
    } catch (error) {
      console.error('Error creating document:', error)
      console.log('Upload failed. Please try again.')
      return { success: false, error: 'Network error occurred' }
    } finally {
      setLoading(false)
    }
  }, [apiCall])

  const updateDocument = useCallback(async (documentData) => {
    const { id, prospectId, categoryId, categoryName, name, size, type, file } = documentData

    if (!id || !prospectId || !categoryId || !categoryName || !name || !size || !type || !file) {
      return { success: false, error: 'Missing required fields' }
    }

    setLoading(true)
    try {
      const result = await apiCall('prospect/attachment/update', {
        method: 'PUT',
        body: JSON.stringify(documentData)
      })

      if (result.status) {
        console.log('Document updated successfully')
        return { success: true, data: result.data }
      } else {
        console.log(result.message || 'Update failed')
        return { success: false, error: result.message || 'Update failed' }
      }
    } catch (error) {
      console.error('Error updating document:', error)
      console.log('Update failed. Please try again.')
      return { success: false, error: 'Network error occurred' }
    } finally {
      setLoading(false)
    }
  }, [apiCall])

  const deleteDocument = useCallback(async (documentId) => {
    if (!documentId) {
      return { success: false, error: 'Document ID is required' }
    }

    setLoading(true)
    try {
      const result = await apiCall(`prospect/attachment/delete?id=${documentId}`, {
        method: 'DELETE'
      })

      if (result.status) {
        console.log('Document deleted successfully')
        setDocuments(prev => prev.filter(doc => doc.id !== documentId))
        return { success: true }
      } else {
        console.log(result.message || 'Delete failed')
        return { success: false, error: result.message || 'Delete failed' }
      }
    } catch (error) {
      console.error('Error deleting document:', error)
      console.log('Delete failed. Please try again.')
      return { success: false, error: 'Network error occurred' }
    } finally {
      setLoading(false)
    }
  }, [apiCall])

  const convertToBase64 = useCallback((file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => resolve(reader.result)
      reader.onerror = error => reject(error)
    })
  }, [])

  const formatFileSize = useCallback((bytes) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }, [])

  const validateFile = useCallback((file) => {
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'application/pdf']
    const maxSize = 10 * 1024 * 1024 // 10MB

    if (!allowedTypes.includes(file.type)) {
      return { valid: false, error: 'File type not allowed. Please upload JPG, PNG, or PDF files.' }
    }

    if (file.size > maxSize) {
      return { valid: false, error: 'File size too large. Maximum size is 10MB.' }
    }

    return { valid: true }
  }, [])

  const uploadFile = useCallback(async (file, prospectId, categoryId, categoryName, existingDocument = null) => {
    // Validate file
    const validation = validateFile(file)
    if (!validation.valid) {
      alert(validation.error)
      return { success: false, error: validation.error }
    }

    try {
      // Convert to base64
      const base64File = await convertToBase64(file)
      const fileExtension = file.name.split('.').pop()

      const documentData = {
        prospectId,
        categoryId,
        categoryName,
        name: categoryName.toLowerCase(),
        size: formatFileSize(file.size),
        type: fileExtension,
        file: base64File
      }

      let result
      if (existingDocument) {
        // Update existing document
        result = await updateDocument({
          ...documentData,
          id: existingDocument.id
        })
      } else {
        // Create new document
        result = await createDocument(documentData)
      }

      return result
    } catch (error) {
      console.error('File upload error:', error)
      alert('Failed to process file. Please try again.')
      return { success: false, error: 'Failed to process file' }
    }
  }, [validateFile, convertToBase64, formatFileSize, createDocument, updateDocument])

  return {
    loading,
    documents,
    fetchDocuments,
    createDocument,
    updateDocument,
    deleteDocument,
    uploadFile,
    validateFile,
    convertToBase64,
    formatFileSize
  }
}

export default useAttachments