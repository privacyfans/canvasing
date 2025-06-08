// src/utils/tokenDebug.js
import { getSession } from 'next-auth/react'

export const logTokenStatus = async (context = '') => {
  if (process.env.NODE_ENV !== 'development') return

  try {
    const session = await getSession()
    const now = Date.now()
    
    console.group(`🔐 Token Status ${context ? `[${context}]` : ''}`)
    
    if (!session) {
      console.log('❌ No session available')
      console.groupEnd()
      return
    }

    console.log('📊 Session Status:', {
      authenticated: !!session.user,
      hasAccessToken: !!session.user?.accessToken,
      hasRefreshToken: !!session.user?.refreshToken,
      isFirstLogin: session.user?.isFirstLogin,
      error: session.error || 'none'
    })

    if (session.user?.accessToken) {
      try {
        // Decode JWT payload (basic decode, not verification)
        const tokenParts = session.user.accessToken.split('.')
        if (tokenParts.length === 3) {
          const payload = JSON.parse(atob(tokenParts[1]))
          const expiresAt = payload.exp * 1000 // Convert to milliseconds
          const timeUntilExpiry = Math.round((expiresAt - now) / 1000)
          
          console.log('🎫 Token Info:', {
            issuer: payload.iss,
            subject: payload.sub,
            audience: payload.aud,
            expiresAt: new Date(expiresAt).toISOString(),
            timeUntilExpiry: `${timeUntilExpiry} seconds`,
            isExpired: now > expiresAt,
            needsRefreshSoon: timeUntilExpiry < 300 // Less than 5 minutes
          })
        }
      } catch (error) {
        console.log('⚠️ Could not decode token:', error.message)
      }
    }

    if (session.error) {
      console.log('❌ Session Error:', session.error)
    }

    console.groupEnd()
  } catch (error) {
    console.error('Error logging token status:', error)
  }
}

// Hook for easy token status monitoring
export const useTokenDebug = (context = '') => {
  React.useEffect(() => {
    logTokenStatus(context)
  }, [context])

  return { logTokenStatus }
}