'use client'

import { useState } from 'react'
import { useSession } from 'next-auth/react'
import apiClient from '@src/lib/apiClient'

export default function DebugProspectsPage() {
  const { data: session } = useSession()
  const [results, setResults] = useState(null)
  const [loading, setLoading] = useState(false)

  const testProspectsAPI = async () => {
    setLoading(true)
    setResults(null)

    try {
      console.log('Testing prospects API...')
      console.log('Session:', session)

      if (!session) {
        setResults({ error: 'No session found. Please login first.' })
        return
      }

      // Test different possible endpoints
      const endpoints = [
        '/prospect/list',
        '/api/prospect/list', 
        '/canvasing/list-prospect',
        '/prospects'
      ]

      const testResults = []

      for (const endpoint of endpoints) {
        try {
          console.log(`Testing endpoint: ${endpoint}`)
          
          const response = await apiClient.get(endpoint, {
            params: { page: 1, limit: 5 }
          })
          
          testResults.push({
            endpoint,
            success: true,
            status: response.status,
            data: response.data
          })
          
          console.log(`✅ ${endpoint} - Success:`, response.data)
        } catch (error) {
          testResults.push({
            endpoint,
            success: false,
            status: error.response?.status,
            error: error.response?.data || error.message
          })
          
          console.log(`❌ ${endpoint} - Error:`, error.response?.data || error.message)
        }
      }

      setResults({
        session: {
          user: session.user?.name,
          hasToken: !!session.user?.accessToken,
          tokenPreview: session.user?.accessToken?.substring(0, 20) + '...'
        },
        tests: testResults
      })

    } catch (error) {
      console.error('Test error:', error)
      setResults({ error: error.message })
    } finally {
      setLoading(false)
    }
  }

  const testDirectAPI = async () => {
    setLoading(true)
    setResults(null)

    try {
      console.log('Testing direct API call...')

      if (!session?.user?.accessToken) {
        setResults({ error: 'No access token found' })
        return
      }

      // Test direct call to external API via proxy dengan parameter yang benar
      const url = '/api/proxy/prospect/list?paging=1&page=1&size=5'
      
      if (session.user?.id) {
        url += `&userId=${session.user.id}`
      }
      
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'x-api-token': session.user.accessToken,
          'x-user-agent': 'web',
          'Content-Type': 'application/json'
        }
      })

      const responseText = await response.text()
      let parsedData = null

      try {
        parsedData = JSON.parse(responseText)
      } catch (e) {
        console.error('Failed to parse response:', e)
      }

      setResults({
        directTest: {
          url: url,
          status: response.status,
          statusText: response.statusText,
          headers: Object.fromEntries(response.headers.entries()),
          rawResponse: responseText,
          parsedData: parsedData
        }
      })

    } catch (error) {
      console.error('Direct test error:', error)
      setResults({ error: error.message })
    } finally {
      setLoading(false)
    }
  }

  if (!session) {
    return (
      <div className="min-h-screen p-8 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Debug Prospects API</h1>
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <p className="text-yellow-800">Please login first to test the prospects API.</p>
            <a href="/auth/signin-basic" className="text-blue-600 hover:underline">
              Go to Login
            </a>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Debug Prospects API</h1>
        
        {/* Session Info */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Session Information</h2>
          <div className="space-y-2 text-sm">
            <div><strong>User:</strong> {session.user?.name}</div>
            <div><strong>Email:</strong> {session.user?.email}</div>
            <div><strong>Has Access Token:</strong> {session.user?.accessToken ? 'Yes' : 'No'}</div>
            <div><strong>Token Preview:</strong> {session.user?.accessToken?.substring(0, 30)}...</div>
            <div><strong>Session Error:</strong> {session.error || 'None'}</div>
          </div>
        </div>

        {/* Test Buttons */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">API Tests</h2>
          <div className="space-x-4">
            <button 
              onClick={testProspectsAPI}
              disabled={loading}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50">
              {loading ? 'Testing...' : 'Test Prospects API (Multiple Endpoints)'}
            </button>
            
            <button 
              onClick={testDirectAPI}
              disabled={loading}
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:opacity-50">
              {loading ? 'Testing...' : 'Test Direct API Call'}
            </button>
          </div>
        </div>

        {/* Results */}
        {results && (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Test Results</h2>
            
            {results.error && (
              <div className="bg-red-50 border border-red-200 rounded p-4 mb-4">
                <p className="text-red-800 font-medium">Error:</p>
                <p className="text-red-700">{results.error}</p>
              </div>
            )}

            {results.session && (
              <div className="mb-6">
                <h3 className="font-semibold mb-2">Session Info:</h3>
                <pre className="bg-gray-100 p-3 rounded text-sm overflow-auto">
                  {JSON.stringify(results.session, null, 2)}
                </pre>
              </div>
            )}

            {results.tests && (
              <div className="mb-6">
                <h3 className="font-semibold mb-2">Endpoint Tests:</h3>
                {results.tests.map((test, index) => (
                  <div key={index} className="mb-4 border rounded p-3">
                    <div className="flex items-center mb-2">
                      <span className={`inline-block px-2 py-1 rounded text-xs text-white mr-2 ${
                        test.success ? 'bg-green-500' : 'bg-red-500'
                      }`}>
                        {test.success ? 'SUCCESS' : 'FAILED'}
                      </span>
                      <code className="bg-gray-100 px-2 py-1 rounded text-sm">{test.endpoint}</code>
                    </div>
                    
                    {test.success ? (
                      <pre className="bg-gray-100 p-2 rounded text-xs overflow-auto max-h-40">
                        {JSON.stringify(test.data, null, 2)}
                      </pre>
                    ) : (
                      <div className="text-red-600 text-sm">
                        <div>Status: {test.status}</div>
                        <div>Error: {JSON.stringify(test.error)}</div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {results.directTest && (
              <div>
                <h3 className="font-semibold mb-2">Direct API Test:</h3>
                <div className="space-y-4">
                  <div>
                    <strong>URL:</strong> 
                    <code className="bg-gray-100 px-2 py-1 rounded text-sm ml-2">{results.directTest.url}</code>
                  </div>
                  <div>
                    <strong>Status:</strong> {results.directTest.status} {results.directTest.statusText}
                  </div>
                  
                  {results.directTest.parsedData && (
                    <div>
                      <strong>Parsed Response:</strong>
                      <pre className="bg-gray-100 p-3 rounded text-sm overflow-auto max-h-60">
                        {JSON.stringify(results.directTest.parsedData, null, 2)}
                      </pre>
                    </div>
                  )}
                  
                  <div>
                    <strong>Raw Response:</strong>
                    <pre className="bg-gray-100 p-3 rounded text-sm overflow-auto max-h-40">
                      {results.directTest.rawResponse}
                    </pre>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        <div className="mt-6 text-sm text-gray-600">
          <p><strong>Correct API endpoint for prospects:</strong></p>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li><strong>Main:</strong> /prospect/list?paging=1&page=1&size=10&term=search&userId=123</li>
            <li><strong>Parameters:</strong></li>
            <li className="ml-4">• paging: 1 (enable pagination)</li>
            <li className="ml-4">• page: page number</li>
            <li className="ml-4">• size: items per page</li>
            <li className="ml-4">• term: search term (optional)</li>
            <li className="ml-4">• userId: user ID (optional)</li>
          </ul>
        </div>
      </div>
    </div>
  )
}