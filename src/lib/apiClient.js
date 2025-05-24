import axios from 'axios'
import { getSession, signOut } from 'next-auth/react'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://192.168.1.1/api/v1'

// Membuat instance axios dengan konfigurasi dasar
const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    'x-user-agent': 'web',
  },
})

// Interceptor untuk menambahkan token otentikasi ke header permintaan
apiClient.interceptors.request.use(
  async (config) => {
    // Dapatkan sesi pengguna saat ini
    const session = await getSession()

    // Tambahkan token ke header jika tersedia
    if (session?.user?.accessToken) {
      config.headers['x-api-token'] = session.user.accessToken
    }

    return config
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
          // Coba refresh token
          const response = await axios.post(
            `${API_URL}/auth/refresh`,
            {},
            {
              headers: {
                'x-refresh-token': session.user.refreshToken,
                'x-user-agent': 'web',
              },
            }
          )

          if (response.data.status && response.data.code === '000') {
            // Mengupdate token dalam sesi akan ditangani oleh callback NextAuth
            // Tetapi kita bisa langsung menggunakan token baru untuk request saat ini
            originalRequest.headers['x-api-token'] = response.data.data.token

            // Ulangi permintaan asli dengan token baru
            return apiClient(originalRequest)
          }
        }
      } catch (refreshError) {
        console.error('Token refresh failed:', refreshError)
      }

      // Jika refresh token gagal, logout pengguna
      await signOut({ redirect: true, callbackUrl: '/auth/signin-basic' })
    }

    return Promise.reject(error)
  }
)

// Fungsi untuk logout secara eksplisit melalui API
export const logoutUser = async () => {
  try {
    const session = await getSession()

    if (session?.user?.accessToken) {
      await apiClient.post('/auth/logout')
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
    console.error('Token check error:', error)
    return false
  }
}

export default apiClient
