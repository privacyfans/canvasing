// src/utils/apiUtils.js

/**
 * Build URL with parameters, filtering out empty values
 * @param {string} baseUrl - Base URL
 * @param {object} params - Parameters object
 * @returns {string} - Complete URL with parameters
 */
export const buildApiUrl = (baseUrl, params = {}) => {
  const filteredParams = {}
  
  // Filter out null and undefined values, but keep empty strings for some params like 'term'
  Object.keys(params).forEach(key => {
    const value = params[key]
    if (value !== null && value !== undefined) {
      // Keep empty strings for search term to allow clearing search
      if (key === 'term' || value !== '') {
        filteredParams[key] = value
      }
    }
  })
  
  const queryString = new URLSearchParams(filteredParams).toString()
  return queryString ? `${baseUrl}?${queryString}` : baseUrl
}

/**
 * Build prospect list URL with proper parameters
 * @param {object} options - Query options
 * @returns {string} - Complete prospect list URL
 */
export const buildProspectListUrl = (options = {}) => {
  const {
    page = 1,
    size = 10,
    search = '',
    userId = null,
    paging = '1'
  } = options
  
  const params = {
    paging: paging.toString(),
    page: parseInt(page).toString(),
    size: parseInt(size).toString()
  }
  
  // Add userId if provided
  if (userId) {
    params.userId = userId
  }
  
  // Add search term if provided and not empty
  // Use 'term' parameter as expected by backend API
  if (search && search.trim()) {
    params.term = search.trim()
  }
  
  console.log('[buildProspectListUrl] Building URL with params:', params)
  
  return buildApiUrl('prospect/list', params)
}

/**
 * Build prospect detail URL with proper parameters
 * @param {string} prospectId - Prospect ID
 * @param {string} userId - User ID
 * @returns {string} - Complete prospect detail URL
 */
export const buildProspectDetailUrl = (prospectId, userId) => {
  const params = { id: prospectId }
  
  if (userId) {
    params.userId = userId
  }
  
  return buildApiUrl('prospect/detail', params)
}

/**
 * Log API request for debugging
 * @param {string} method - HTTP method
 * @param {string} url - Request URL
 * @param {object} options - Additional options
 */
export const logApiRequest = (method, url, options = {}) => {
  if (process.env.NODE_ENV !== 'development') return
  
  console.group(`🌐 API Request [${method.toUpperCase()}]`)
  console.log('URL:', url)
  
  if (options.body) {
    try {
      const body = JSON.parse(options.body)
      console.log('Body:', body)
    } catch {
      console.log('Body (raw):', options.body)
    }
  }
  
  if (options.headers) {
    console.log('Headers:', Object.keys(options.headers))
  }
  
  console.groupEnd()
}

/**
 * Log API response for debugging
 * @param {string} method - HTTP method
 * @param {string} url - Request URL
 * @param {object} response - Response object
 */
export const logApiResponse = (method, url, response) => {
  if (process.env.NODE_ENV !== 'development') return
  
  console.group(`📡 API Response [${method.toUpperCase()}]`)
  console.log('URL:', url)
  console.log('Status:', response.status)
  console.log('Code:', response.code)
  console.log('Message:', response.message)
  
  if (response.data) {
    if (Array.isArray(response.data)) {
      console.log('Data (array):', response.data.length, 'items')
    } else if (typeof response.data === 'object') {
      console.log('Data (object):', Object.keys(response.data))
    } else {
      console.log('Data:', response.data)
    }
  }
  
  console.groupEnd()
}