import axios from 'axios'
import CredentialsProvider from 'next-auth/providers/credentials'

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || 'http://117.102.70.147:9583/api/v1'

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) {
          throw new Error('Username atau password tidak valid')
        }

        try {
          // Login menggunakan API
          const response = await axios.post(
            `${API_URL}/auth/token`,
            {
              username: credentials.username,
              password: credentials.password,
            },
            {
              headers: {
                'x-user-agent': 'web',
              },
            }
          )

          // Pastikan response sukses
          if (response.data.status && response.data.code === '000') {
            const userData = response.data.data

            // Mengembalikan data user yang akan disimpan dalam token JWT NextAuth
            return {
              id: userData.userId || 'default-id',
              name: credentials.username,
              email: credentials.username,
              accessToken: userData.token,
              refreshToken: userData.refreshToken,
              isFirstLogin: userData.isFirstLogin,
              expire: userData.expire,
            }
          } else {
            throw new Error(response.data.message || 'Autentikasi gagal')
          }
        } catch (error) {
          console.error('Login error:', error)
          throw new Error(error.response?.data?.message || 'Autentikasi gagal')
        }
      },
    }),
  ],
  callbacks: {
    // Tambahkan token & refreshToken ke token JWT
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.accessToken
        token.refreshToken = user.refreshToken
        token.isFirstLogin = user.isFirstLogin
        token.expire = user.expire
        token.expiresAt = Date.now() + user.expire * 1000 // Convert seconds to milliseconds
      }

      // Cek jika token hampir kadaluarsa (misalnya 5 menit sebelum) dan refresh
      if (token.expiresAt && Date.now() > token.expiresAt - 5 * 60 * 1000) {
        try {
          const response = await axios.post(
            `${API_URL}/auth/refresh`,
            {},
            {
              headers: {
                'x-refresh-token': token.refreshToken,
                'x-user-agent': 'web',
              },
            }
          )

          if (response.data.status && response.data.code === '000') {
            token.accessToken = response.data.data.token
            token.refreshToken = response.data.data.refreshToken
            token.expiresAt = Date.now() + response.data.data.expire * 1000
          }
        } catch (error) {
          console.error('Token refresh error:', error)
          // Token refresh gagal, user perlu login ulang
          return { ...token, error: 'RefreshAccessTokenError' }
        }
      }

      return token
    },
    // Ekspos data dari JWT ke client melalui session
    async session({ session, token }) {
      session.user.accessToken = token.accessToken
      session.user.refreshToken = token.refreshToken
      session.user.isFirstLogin = token.isFirstLogin
      session.error = token.error

      return session
    },
  },
  session: {
    strategy: 'jwt',
    maxAge: 3600, // Durasi sesi dalam detik, sesuaikan dengan expire dari API
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/auth/signin-basic',
    error: '/auth/error',
  },
}
