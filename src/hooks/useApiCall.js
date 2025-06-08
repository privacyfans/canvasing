// src/hooks/useApiCall.js
import { useCallback } from 'react'
import { useSession, signOut } from 'next-auth/react'
import { getUserIdFromToken } from '@src/utils/jwtDebug'

export const useApiCall = () => {
  const { data: session, status, update } = useSession()

  // Get userId from current token
  const getUserId = useCallback(() => {
    if (!session?.user?.accessToken) return null
    return getUserIdFromToken(session.user.accessToken)
  }, [session?.user?.accessToken])

  const apiCall = useCallback(async (endpoint, options = {}) => {
    const url = `/api/proxy/${endpoint}`
    console.log('[API Call]', options.method || 'GET', url)
    
    // Check authentication status
    if (status === 'loading') {
      console.log('[API Call] Session still loading, waiting...')
      throw new Error('Session still loading')
    }

    if (status === 'unauthenticated') {
      console.log('[API Call] Not authenticated')
      throw new Error('Not authenticated')
    }

    // Check for session errors
    if (session?.error) {
      console.log('[API Call] Session has error:', session.error)
      
      // Handle specific session errors
      switch (session.error) {
        case 'RefreshTokenExpired':
        case 'NoRefreshToken':
        case 'RefreshAccessTokenError':
          console.log('[API Call] Auth error, signing out...')
          await signOut({ redirect: true, callbackUrl: '/auth/signin?error=session_expired' })
          throw new Error('Authentication expired')
        default:
          console.log('[API Call] Unknown session error:', session.error)
      }
    }

    if (!session?.user?.accessToken) {
      console.log('[API Call] No access token available')
      throw new Error('No access token available')
    }

    const headers = {
      'Content-Type': 'application/json',
      'x-user-agent': 'web',
      'x-api-token': session.user.accessToken,
    }

    const config = {
      ...options,
      headers: {
        ...headers,
        ...options.headers
      }
    }

    console.log('[API Call] Making request with token...')

    let attempt = 0
    const maxAttempts = 2

    while (attempt < maxAttempts) {
      attempt++
      console.log(`[API Call] Attempt ${attempt}/${maxAttempts}`)

      try {
        const response = await fetch(url, config)
        console.log('[API Call] Response status:', response.status)
        
        // Handle 401 - Token expired
        if (response.status === 401 && attempt === 1) {
          console.log('[API Call] Token expired (401), attempting refresh...')
          
          try {
            // Trigger session refresh via NextAuth
            console.log('[API Call] Triggering session update...')
            const updatedSession = await update()
            console.log('[API Call] Session refresh result:', {
              hasSession: !!updatedSession,
              hasAccessToken: !!updatedSession?.user?.accessToken,
              hasError: !!updatedSession?.error
            })
            
            if (updatedSession?.error) {
              console.error('[API Call] Session refresh returned error:', updatedSession.error)
              await signOut({ redirect: true, callbackUrl: '/auth/signin?error=token_refresh_failed' })
              throw new Error('Token refresh failed')
            }
            
            if (updatedSession?.user?.accessToken) {
              console.log('[API Call] New token received, retrying request...')
              
              // Update config with new token for retry
              config.headers['x-api-token'] = updatedSession.user.accessToken
              
              // Continue to next iteration to retry
              continue
            } else {
              console.error('[API Call] Session refresh failed - no new token')
              await signOut({ redirect: true, callbackUrl: '/auth/signin?error=no_token' })
              throw new Error('Session refresh failed')
            }
          } catch (refreshError) {
            console.error('[API Call] Token refresh failed:', refreshError)
            await signOut({ redirect: true, callbackUrl: '/auth/signin?error=refresh_error' })
            throw new Error('Token refresh failed')
          }
        }

        // Handle other HTTP errors
        if (!response.ok) {
          const errorText = await response.text()
          console.log('[API Call] Non-OK response:', {
            status: response.status,
            statusText: response.statusText,
            bodyLength: errorText?.length,
            bodyPreview: errorText?.substring(0, 200)
          })
          
          // Try to parse error response 
          try {
            const errorData = JSON.parse(errorText)
            console.log('[API Call] Parsed error data:', errorData)
            
            // Parse nested details if available
            let detailsObj = null
            if (errorData.details) {
              try {
                detailsObj = JSON.parse(errorData.details)
                console.log('[API Call] Parsed details:', detailsObj)
              } catch (e) {
                console.log('[API Call] Details is not valid JSON')
              }
            }
            
            // Handle specific known error cases that should not be thrown
            if (response.status === 404) {
              console.log('[API Call] Checking 404 for "Data not found"...')
              
              if (errorData.message === 'Data not found' || 
                  (errorData.details && errorData.details.includes('Data not found')) ||
                  (detailsObj && detailsObj.message === 'Data not found')) {
                console.log('[API Call] 404 is "Data not found" - treating as empty result')
                // Return a structured response that looks like empty result
                return {
                  status: false,
                  code: '114',
                  message: 'Data not found',
                  data: { items: [], pagination: { total: 0 } }
                }
              }
            }
            
            // Handle 400 Bad Request with known business logic errors
            if (response.status === 400 && detailsObj) {
              console.log('[API Call] Checking 400 for business logic errors...')
              
              // Known business error codes that should be handled gracefully
              const businessErrorCodes = ['002', '003', '004', '005'] // 002 = Duplicate data, etc.
              
              if (businessErrorCodes.includes(detailsObj.code)) {
                console.log('[API Call] 400 is business logic error - returning structured response')
                // Return the actual API response structure
                return detailsObj
              }
            }
            
            const errorMessage = errorData.message || errorData.error || `HTTP ${response.status}: ${response.statusText}`
            throw new Error(errorMessage)
          } catch (parseError) {
            console.log('[API Call] Could not parse error response as JSON:', parseError.message)
            console.log('[API Call] Raw response text:', errorText)
            throw new Error(`HTTP ${response.status}: ${response.statusText}`)
          }
        }

        // Success response
        const data = await response.text()
        console.log('[API Call] Response received, length:', data.length)

        let parsedData
        try {
          parsedData = JSON.parse(data)
        } catch (parseError) {
          console.error('[API Call] JSON parse error:', parseError)
          throw new Error('Invalid JSON response from server')
        }

        console.log('[API Call] Success response:', {
          status: parsedData.status,
          code: parsedData.code,
          hasData: !!parsedData.data
        })

        return parsedData

      } catch (error) {
        console.error(`[API Call] Attempt ${attempt} failed:`, error.message)
        
        // If this was the last attempt or not a network error, throw the error
        if (attempt === maxAttempts || !error.message.includes('fetch')) {
          throw error
        }
        
        // Otherwise, continue to next attempt
        console.log('[API Call] Will retry due to network error...')
      }
    }

    throw new Error('Max retry attempts reached')
  }, [session, status, update])

  return {
    apiCall,
    getUserId,
    isAuthenticated: status === 'authenticated' && !session?.error,
    isLoading: status === 'loading',
    session,
    hasError: !!session?.error
  }
}