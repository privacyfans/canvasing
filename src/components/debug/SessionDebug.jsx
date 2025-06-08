// src/components/debug/SessionDebug.jsx
'use client'

import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { RefreshCw, Clock, Key } from 'lucide-react'

const SessionDebug = () => {
  const { data: session, status, update } = useSession()
  const [refreshing, setRefreshing] = useState(false)
  const [lastRefresh, setLastRefresh] = useState(null)

  const handleRefreshSession = async () => {
    setRefreshing(true)
    try {
      console.log('[Session Debug] Manually refreshing session...')
      const result = await update()
      console.log('[Session Debug] Refresh result:', result)
      setLastRefresh(new Date())
    } catch (error) {
      console.error('[Session Debug] Refresh failed:', error)
    } finally {
      setRefreshing(false)
    }
  }

  const getTokenExpiryInfo = () => {
    if (!session?.user?.expire) return null
    
    const now = Date.now()
    const expiryTime = now + (session.user.expire * 1000)
    const timeLeft = expiryTime - now
    
    return {
      expiresAt: new Date(expiryTime).toLocaleString(),
      timeLeftMs: timeLeft,
      timeLeftMinutes: Math.floor(timeLeft / (1000 * 60)),
      isExpiringSoon: timeLeft < 5 * 60 * 1000 // 5 minutes
    }
  }

  const tokenInfo = getTokenExpiryInfo()

  return (
    <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold flex items-center gap-2">
          <Key className="w-4 h-4" />
          Session Debug
        </h3>
        <button
          onClick={handleRefreshSession}
          disabled={refreshing}
          className="text-xs px-2 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50 flex items-center gap-1"
        >
          <RefreshCw className={`w-3 h-3 ${refreshing ? 'animate-spin' : ''}`} />
          Refresh
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
        <div>
          <h4 className="font-medium mb-2">Session Status:</h4>
          <div className="space-y-1">
            <p><strong>Status:</strong> <span className={`px-2 py-0.5 rounded ${
              status === 'authenticated' ? 'bg-green-100 text-green-700' :
              status === 'loading' ? 'bg-yellow-100 text-yellow-700' :
              'bg-red-100 text-red-700'
            }`}>{status}</span></p>
            <p><strong>User:</strong> {session?.user?.name || 'None'}</p>
            <p><strong>Token Length:</strong> {session?.user?.accessToken?.length || 0}</p>
            <p><strong>Refresh Token:</strong> {session?.user?.refreshToken ? 'Available' : 'None'}</p>
            <p><strong>First Login:</strong> {session?.user?.isFirstLogin?.toString() || 'Unknown'}</p>
          </div>
        </div>

        <div>
          <h4 className="font-medium mb-2">Token Expiry:</h4>
          {tokenInfo ? (
            <div className="space-y-1">
              <p><strong>Expires:</strong> {tokenInfo.expiresAt}</p>
              <p><strong>Time Left:</strong> {tokenInfo.timeLeftMinutes} minutes</p>
              <p><strong>Status:</strong> <span className={`px-2 py-0.5 rounded ${
                tokenInfo.isExpiringSoon ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
              }`}>
                {tokenInfo.isExpiringSoon ? 'Expiring Soon' : 'Valid'}
              </span></p>
            </div>
          ) : (
            <p className="text-gray-500">No expiry info available</p>
          )}
        </div>
      </div>

      {lastRefresh && (
        <div className="mt-3 pt-3 border-t border-blue-200">
          <p className="text-xs text-blue-600 flex items-center gap-1">
            <Clock className="w-3 h-3" />
            Last refresh: {lastRefresh.toLocaleTimeString()}
          </p>
        </div>
      )}

      {session?.error && (
        <div className="mt-3 p-2 bg-red-100 border border-red-200 rounded">
          <p className="text-xs text-red-700">
            <strong>Session Error:</strong> {session.error}
          </p>
        </div>
      )}
    </div>
  )
}

export default SessionDebug