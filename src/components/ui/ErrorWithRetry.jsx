// src/components/ui/ErrorWithRetry.jsx
'use client'

import { AlertCircle, RefreshCw, Key } from 'lucide-react'
import { signOut } from 'next-auth/react'

const ErrorWithRetry = ({ 
  error, 
  onRetry, 
  isLoading = false,
  showSignOut = false,
  title = "Error Loading Data"
}) => {
  
  const handleSignOut = () => {
    signOut({ redirect: true, callbackUrl: '/auth/signin?error=manual_logout' })
  }

  const getErrorType = (errorMessage) => {
    if (!errorMessage) return 'unknown'
    
    const msg = errorMessage.toLowerCase()
    if (msg.includes('authentication') || msg.includes('token') || msg.includes('401')) {
      return 'auth'
    }
    if (msg.includes('network') || msg.includes('timeout') || msg.includes('fetch')) {
      return 'network'
    }
    if (msg.includes('invalid json') || msg.includes('parse')) {
      return 'parsing'
    }
    return 'api'
  }

  const errorType = getErrorType(error)

  const getErrorIcon = () => {
    switch (errorType) {
      case 'auth':
        return <Key className="mx-auto h-12 w-12 text-red-500" />
      case 'network':
        return <RefreshCw className="mx-auto h-12 w-12 text-orange-500" />
      default:
        return <AlertCircle className="mx-auto h-12 w-12 text-red-500" />
    }
  }

  const getErrorMessage = () => {
    switch (errorType) {
      case 'auth':
        return "Your session has expired or authentication failed. Please sign in again."
      case 'network':
        return "Network connection failed. Please check your internet connection and try again."
      case 'parsing':
        return "Server response format error. The server may be experiencing issues."
      case 'api':
        return "API request failed. The server may be temporarily unavailable."
      default:
        return error || "An unexpected error occurred."
    }
  }

  const shouldShowSignOut = showSignOut || errorType === 'auth'

  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="text-center max-w-md">
        {getErrorIcon()}
        <h3 className="mt-2 text-lg font-medium text-gray-900">{title}</h3>
        <p className="mt-1 text-sm text-gray-500 break-words">
          {getErrorMessage()}
        </p>
        
        <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
          {onRetry && (
            <button
              onClick={onRetry}
              disabled={isLoading}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
              {isLoading ? 'Retrying...' : 'Try Again'}
            </button>
          )}
          
          {shouldShowSignOut && (
            <button
              onClick={handleSignOut}
              className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
            >
              <Key className="w-4 h-4" />
              Sign In Again
            </button>
          )}
        </div>

        {/* Debug info */}
        <details className="mt-4 text-left">
          <summary className="text-xs text-gray-400 cursor-pointer hover:text-gray-600">
            Technical Details
          </summary>
          <div className="mt-2 p-3 bg-gray-50 rounded text-xs font-mono text-gray-700 break-all">
            <p><strong>Error Type:</strong> {errorType}</p>
            <p><strong>Raw Error:</strong> {error}</p>
            <p><strong>Timestamp:</strong> {new Date().toISOString()}</p>
          </div>
        </details>
      </div>
    </div>
  )
}

export default ErrorWithRetry