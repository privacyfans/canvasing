// src/hooks/useAuthHandler.js
import { useEffect } from 'react'
import { useSession, signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'

export const useAuthHandler = () => {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    // Handle session errors
    if (session?.error) {
      console.log('[Auth Handler] Session error detected:', session.error)

      switch (session.error) {
        case 'RefreshTokenExpired':
        case 'NoRefreshToken':
        case 'RefreshAccessTokenError':
          console.log('[Auth Handler] Auth error, redirecting to login...')
          signOut({ 
            redirect: true, 
            callbackUrl: '/auth/signin?error=session_expired' 
          })
          break
        default:
          console.log('[Auth Handler] Unknown session error:', session.error)
      }
    }
  }, [session?.error, router])

  return {
    session,
    status,
    isAuthenticated: status === 'authenticated' && !session?.error,
    isLoading: status === 'loading',
    hasError: !!session?.error,
    error: session?.error
  }
}