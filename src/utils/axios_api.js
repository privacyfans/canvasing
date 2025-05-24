// mockApi.ts
import axios from 'axios'

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL, // This won't be used but gives a sense of structure
})

// Mock GET request -- get data
api.get = async (url) => {
  // Assuming url contains the endpoint to fetch data from
  try {
    const response = await axios.get(url) // Make a real GET request to fetch the data
    return response.data
  } catch (error) {
    console.error('Error fetching data:', error)
    throw new Error('Failed to fetch data')
  }
}

// Mock POST request -- add data
api.post = async (api, newRecord, field) => {
  const isApiActive = process.env.NEXT_PUBLIC_IS_API_ACTIVE === 'true'
  const data = []

  if (isApiActive) {
    try {
      const response = await axios.post(api, newRecord, {
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (response.status === 200 || response.status === 201) {
        return response.data
      } else {
        throw new Error(response.data?.message || 'Failed to add new record')
      }
    } catch (error) {
      console.error('Error adding record:', error)
      throw new Error('Internal Server Error')
    }
  } else {
    data.push(newRecord)
    return Promise.resolve({
      data: newRecord,
      message: `${field} record added successfully`,
    })
  }
}

// Mock PUT request -- update data
api.put = async (api, updatedRecord, field) => {
  const isApiActive = process.env.NEXT_PUBLIC_IS_API_ACTIVE === 'true'

  if (isApiActive) {
    try {
      const response = await axios.put(api, updatedRecord, {
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (response.status === 200 || response.status === 201) {
        return response.data
      } else {
        throw new Error(response.data?.message || 'Failed to update record')
      }
    } catch (error) {
      console.error('Error updating record:', error)
      throw new Error('Internal Server Error')
    }
  } else {
    return Promise.resolve({
      data: updatedRecord,
      message: `${field} update successfully`,
    })
  }
}

// Mock DELETE request -- delete data
api.delete = async (api, id, field) => {
  const isApi = process.env.NEXT_PUBLIC_IS_API_ACTIVE === 'true'

  if (isApi) {
    try {
      const response = await axios.delete(api, {
        headers: {
          'Content-Type': 'application/json',
        },
        data: id,
      })

      // Check if the delete was successful
      if (response.status === 200) {
        return response.data // Return the API response data
      } else {
        throw new Error(response.data?.message || 'Failed to delete record')
      }
    } catch (error) {
      // Log and rethrow the error
      console.error('Delete Error:', error)
      const errorMessage =
        error.response?.data?.message || 'Internal Server Error'
      throw new Error(errorMessage)
    }
  } else {
    // Simulate delete when the API is inactive
    return Promise.resolve({
      data: id,
      message: `${field} delete successful`,
    })
  }
}

export default api
