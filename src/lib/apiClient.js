import axios from 'axios'
import { getSession, signOut } from 'next-auth/react'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://117.102.70.147:9583/api/v1'

// Membuat instance axios dengan konfigurasi dasar
const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    'x-user-agent': 'web',
  },
  timeout: 10000, // 10 second timeout
})

// Interceptor untuk menambahkan token otentikasi ke header permintaan
apiClient.interceptors.request.use(
  async (config) => {
    try {
      // Dapatkan sesi pengguna saat ini
      const session = await getSession()

      // Tambahkan token ke header jika tersedia
      if (session?.user?.accessToken) {
        config.headers['x-api-token'] = session.user.accessToken
      }

      return config
    } catch (error) {
      console.error('Error getting session in request interceptor:', error)
      return config
    }
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Interceptor untuk menangani respons dan error
apiClient.interceptors.response.use(
  (response) => {
    return response
  },
  async (error) => {
    const originalRequest = error.config

    // Jika error adalah 401 (Unauthorized) dan bukan percobaan retry
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true

      try {
        // Dapatkan sesi pengguna untuk mendapatkan refreshToken
        const session = await getSession()

        if (session?.user?.refreshToken) {
          console.log('Mencoba refresh token via API client...')
          
          // Coba refresh token
          const response = await axios.post(
            `${API_URL}/auth/refresh`,
            {},
            {
              headers: {
                'x-refresh-token': session.user.refreshToken,
                'x-user-agent': 'web',
              },
              timeout: 10000,
            }
          )

          if (response.data.status && response.data.code === '000') {
            console.log('Token berhasil di-refresh via API client')
            
            // Update header untuk request yang gagal
            originalRequest.headers['x-api-token'] = response.data.data.token

            // Ulangi permintaan asli dengan token baru
            return apiClient(originalRequest)
          }
        }
      } catch (refreshError) {
        console.error('Token refresh failed in API client:', refreshError.message)
        
        // Jika refresh token gagal, logout pengguna
        console.log('Logout user karena refresh token gagal')
        await signOut({ 
          redirect: true, 
          callbackUrl: '/auth/signin-basic' 
        })
        return Promise.reject(refreshError)
      }

      // Jika tidak ada refresh token atau refresh gagal, logout pengguna
      console.log('Logout user karena tidak ada refresh token atau refresh gagal')
      await signOut({ 
        redirect: true, 
        callbackUrl: '/auth/signin-basic' 
      })
    }

    return Promise.reject(error)
  }
)

// Fungsi untuk logout secara eksplisit melalui API
export const logoutUser = async () => {
  try {
    const session = await getSession()

    if (session?.user?.accessToken) {
      try {
        await apiClient.post('/auth/logout')
        console.log('Logout API berhasil dipanggil')
      } catch (apiError) {
        console.warn('Logout API gagal, tetapi tetap logout lokal:', apiError.message)
      }
    }

    // Selalu lakukan signOut lokal terlepas dari hasil API
    await signOut({ redirect: true, callbackUrl: '/auth/signin-basic' })
  } catch (error) {
    console.error('Logout error:', error)
    // Tetap lakukan signOut lokal meskipun API logout gagal
    await signOut({ redirect: true, callbackUrl: '/auth/signin-basic' })
  }
}

// Fungsi untuk memeriksa status token
export const checkToken = async () => {
  try {
    const response = await apiClient.post('/auth/check')
    return response.data.status === true && response.data.code === '000'
  } catch (error) {
    console.error('Token check error:', error.message)
    return false
  }
}

// Fungsi untuk mendapatkan session dengan error handling
export const getSessionSafely = async () => {
  try {
    const session = await getSession()
    
    // Cek jika ada error dalam session
    if (session?.error) {
      console.log('Session error detected:', session.error)
      
      if (session.error === 'RefreshTokenExpired' || session.error === 'RefreshAccessTokenError') {
        console.log('Redirect ke login karena token expired')
        await signOut({ redirect: true, callbackUrl: '/auth/signin-basic' })
        return null
      }
    }
    
    return session
  } catch (error) {
    console.error('Error getting session:', error)
    return null
  }
}

export default apiClient