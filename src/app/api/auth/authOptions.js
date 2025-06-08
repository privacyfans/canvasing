import axios from 'axios'
import CredentialsProvider from 'next-auth/providers/credentials'
import { logTokenInfo, getTokenInfo } from '@src/utils/jwtDebug'

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || 'http://117.102.70.147:9583/api/v1'

// Use direct API for login (server-side), proxy for client-side requests
const USE_PROXY_FOR_REFRESH = true // Always use proxy for refresh
const NEXTAUTH_URL = process.env.NEXTAUTH_URL || 'http://localhost:3000'

// Token refresh buffer time (5 minutes before expiry)
const REFRESH_BUFFER_TIME = 5 * 60 * 1000

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        console.log('=== AUTHORIZE FUNCTION CALLED ===')
        console.log('Credentials received:', { 
          username: credentials?.username, 
          password: credentials?.password ? '[PROVIDED]' : '[MISSING]' 
        })

        if (!credentials?.username || !credentials?.password) {
          console.error('Missing credentials')
          return null
        }

        try {
          // Use direct API URL for login from server-side
          const loginUrl = `${API_URL}/auth/token`
          console.log('Attempting login to (direct API):', loginUrl)
          
          // Login menggunakan API langsung
          const response = await axios.post(
            loginUrl,
            {
              username: credentials.username,
              password: credentials.password,
            },
            {
              headers: {
                'x-user-agent': 'web',
                'Content-Type': 'application/json',
              },
              timeout: 15000,
            }
          )

          console.log('Login response status:', response.status)
          console.log('Login response data:', response.data)

          // Pastikan response sukses
          if (response.data && response.data.status && response.data.code === '000') {
            const userData = response.data.data

            console.log('Login successful for user:', userData.userId)
            console.log('Token received, length:', userData.token?.length)
            console.log('Refresh token received, length:', userData.refreshToken?.length)
            console.log('Token expires in:', userData.expire, 'seconds')
            
            // Debug token info
            logTokenInfo(userData.token, 'Login Response')

            // Mengembalikan data user yang akan disimpan dalam token JWT NextAuth
            const userObject = {
              id: userData.userId || 'default-id',
              name: credentials.username,
              email: credentials.username,
              accessToken: userData.token,
              refreshToken: userData.refreshToken,
              isFirstLogin: userData.isFirstLogin,
              expire: userData.expire,
            }

            console.log('Returning user object with tokens')
            return userObject
          } else {
            console.error('Login failed - API returned error:', response.data)
            return null
          }
        } catch (error) {
          console.error('Login error:', error.message)
          
          if (error.response) {
            console.error('Error response status:', error.response.status)
            console.error('Error response data:', error.response.data)
          }
          
          return null
        }
      },
    }),
  ],
  callbacks: {
    // Add signIn callback for additional logging
    async signIn({ user, account, profile, email, credentials }) {
      console.log('=== SIGNIN CALLBACK ===')
      console.log('User received in signIn callback:', {
        id: user?.id,
        name: user?.name,
        email: user?.email,
        hasAccessToken: !!user?.accessToken,
        hasRefreshToken: !!user?.refreshToken,
        isFirstLogin: user?.isFirstLogin,
        expire: user?.expire
      })
      
      if (account?.provider === 'credentials') {
        // Return true if user object is valid
        const isValid = user && user.accessToken && user.refreshToken
        console.log('Credentials sign in validation:', {
          userExists: !!user,
          hasAccessToken: !!user?.accessToken,
          hasRefreshToken: !!user?.refreshToken,
          isValid: isValid
        })
        
        if (!isValid) {
          console.error('❌ SignIn callback failed - missing required fields')
          return false
        }
        
        console.log('✅ SignIn callback successful')
        return true
      }
      
      return true
    },

    // JWT callback for token management with improved refresh logic
    async jwt({ token, user, account }) {
      console.log('=== JWT CALLBACK ===')
      console.log('Token exists:', !!token)
      console.log('User exists:', !!user)
      console.log('Account:', account?.provider)

      // If we have a user object (first login), add it to token
      if (user) {
        console.log('Adding user data to token')
        token.accessToken = user.accessToken
        token.refreshToken = user.refreshToken
        token.isFirstLogin = user.isFirstLogin
        token.expire = user.expire
        token.expiresAt = Date.now() + (user.expire * 1000)
        token.error = undefined // Clear any previous errors
        console.log('JWT callback - new token created, expires at:', new Date(token.expiresAt).toISOString())
        
        // Debug new token
        logTokenInfo(user.accessToken, 'New Token Created')
        
        return token
      }

      // If we don't have an access token, something went wrong
      if (!token.accessToken) {
        console.error('No access token in JWT callback')
        return { ...token, error: 'NoAccessToken' }
      }

      // Check if token needs refresh (use buffer time)
      const now = Date.now()
      const shouldRefresh = token.expiresAt && (now > token.expiresAt - REFRESH_BUFFER_TIME)
      
      console.log('Token refresh check:', {
        now: new Date(now).toISOString(),
        expiresAt: token.expiresAt ? new Date(token.expiresAt).toISOString() : 'unknown',
        shouldRefresh: shouldRefresh,
        timeUntilExpiry: token.expiresAt ? Math.round((token.expiresAt - now) / 1000) : 'unknown',
        tokenAge: token.expiresAt ? Math.round((now - (token.expiresAt - (token.expire * 1000))) / 1000) : 'unknown'
      })

      // Only refresh if token is actually close to expiry and has existed for at least 30 seconds
      const tokenAge = token.expiresAt ? (now - (token.expiresAt - (token.expire * 1000))) : 0
      const shouldActuallyRefresh = shouldRefresh && tokenAge > 30000 // Token must be at least 30 seconds old

      if (shouldActuallyRefresh) {
        console.log('Token needs refresh, attempting to refresh...')
        
        try {
          if (!token.refreshToken) {
            console.error('No refresh token available')
            return { ...token, error: 'NoRefreshToken' }
          }

          // Use proxy for refresh token if enabled, otherwise direct API
          const refreshUrl = USE_PROXY_FOR_REFRESH ? 
            `${NEXTAUTH_URL}/api/proxy/auth/refresh` : 
            `${API_URL}/auth/refresh`
          
          console.log('Refresh URL:', refreshUrl)

          const response = await axios.post(
            refreshUrl,
            {},
            {
              headers: {
                'x-refresh-token': token.refreshToken,
                'x-user-agent': 'web',
                'Content-Type': 'application/json',
              },
              timeout: 15000,
            }
          )

          console.log('Refresh response status:', response.status)
          console.log('Refresh response data:', response.data)

          if (response.data && response.data.status && response.data.code === '000') {
            console.log('✅ Token successfully refreshed')
            const refreshData = response.data.data
            
            const newToken = {
              ...token,
              accessToken: refreshData.token,
              refreshToken: refreshData.refreshToken,
              isFirstLogin: refreshData.isFirstLogin,
              expire: refreshData.expire,
              expiresAt: Date.now() + (refreshData.expire * 1000),
              error: undefined // Clear any previous errors
            }
            
            console.log('New token expires at:', new Date(newToken.expiresAt).toISOString())
            console.log('New token will be valid for:', refreshData.expire, 'seconds')
            
            return newToken
          } else {
            console.error('❌ Token refresh failed - API error:', response.data?.message)
            return { ...token, error: 'RefreshAccessTokenError' }
          }
        } catch (error) {
          console.error('❌ Token refresh error:', error.message)
          
          // Check specific error conditions
          if (error.response?.status === 401 || error.response?.status === 403) {
            console.log('Refresh token expired or invalid, user needs to login again')
            return { ...token, error: 'RefreshTokenExpired' }
          }
          
          if (error.code === 'ECONNREFUSED' || error.code === 'ETIMEDOUT') {
            console.log('Network error during refresh, keeping existing token temporarily')
            // Don't mark as error for network issues, just extend the current token slightly
            return {
              ...token,
              expiresAt: Date.now() + (2 * 60 * 1000) // Give 2 more minutes
            }
          }
          
          // For other errors, mark as refresh error
          return { ...token, error: 'RefreshAccessTokenError' }
        }
      }

      // Token is still valid, return as-is
      console.log('Token is still valid, no refresh needed')
      return token
    },
    
    // Session callback to expose data to client
    async session({ session, token }) {
      console.log('=== SESSION CALLBACK ===')
      console.log('Session error:', token.error)
      
      session.user.accessToken = token.accessToken
      session.user.refreshToken = token.refreshToken
      session.user.isFirstLogin = token.isFirstLogin
      session.user.expire = token.expire
      session.error = token.error

      // Extract user data from access token
      if (token.accessToken && !token.error) {
        try {
          const tokenInfo = getTokenInfo(token.accessToken)
          if (tokenInfo) {
            session.user.userId = tokenInfo.userId
            session.user.role = tokenInfo.role
            session.user.permissions = tokenInfo.permissions || []
            console.log('Added token data to session:', {
              userId: tokenInfo.userId,
              role: tokenInfo.role,
              permissions: tokenInfo.permissions
            })
          }
        } catch (error) {
          console.error('Error extracting token info for session:', error)
        }
      }

      // If there's an error, don't include sensitive data
      if (token.error) {
        console.log('Session has error, limiting exposed data')
        session.user.accessToken = undefined
        session.user.refreshToken = undefined
        session.user.userId = undefined
        session.user.role = undefined
        session.user.permissions = undefined
      }

      return session
    },
  },
  session: {
    strategy: 'jwt',
    maxAge: 3600, // 1 hour max session
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/auth/signin',
    error: '/auth/error',
  },
  // Add debug option in development
  debug: process.env.NODE_ENV === 'development',
}