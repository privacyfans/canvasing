'use client'

import { useState } from 'react'

export default function TestLoginPage() {
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)

  const testProxyLogin = async () => {
    setLoading(true)
    setResult(null)

    const loginData = {
      username: 'kcukc.admin',
      password: '123456'
    }

    console.log('=== TESTING PROXY LOGIN ===')
    console.log('Login data:', loginData)

    try {
      const response = await fetch('/api/proxy/auth/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-user-agent': 'web'
        },
        body: JSON.stringify(loginData)
      })

      console.log('Proxy response status:', response.status)
      console.log('Proxy response headers:', Object.fromEntries(response.headers.entries()))

      const responseText = await response.text()
      console.log('Proxy response body:', responseText)

      let parsedData = null
      try {
        parsedData = JSON.parse(responseText)
      } catch (e) {
        console.error('Failed to parse response as JSON:', e)
      }

      setResult({
        success: response.ok && parsedData?.status && parsedData?.code === '000',
        status: response.status,
        statusText: response.statusText,
        headers: Object.fromEntries(response.headers.entries()),
        body: responseText,
        parsed: parsedData,
        url: '/api/proxy/auth/token'
      })

    } catch (error) {
      console.error('Proxy login error:', error)
      setResult({
        success: false,
        error: error.message,
        url: '/api/proxy/auth/token'
      })
    } finally {
      setLoading(false)
    }
  }

  const testDirectAPI = async () => {
    setLoading(true)
    setResult(null)

    const loginData = {
      username: 'kcukc.admin',
      password: '123456'
    }

    console.log('=== TESTING DIRECT API ===')

    try {
      const response = await fetch('http://117.102.70.147:9583/api/v1/auth/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-user-agent': 'web'
        },
        body: JSON.stringify(loginData)
      })

      const responseText = await response.text()
      const parsedData = JSON.parse(responseText)

      setResult({
        success: response.ok && parsedData?.status && parsedData?.code === '000',
        status: response.status,
        statusText: response.statusText,
        body: responseText,
        parsed: parsedData,
        url: 'http://117.102.70.147:9583/api/v1/auth/token'
      })

    } catch (error) {
      console.error('Direct API error:', error)
      setResult({
        success: false,
        error: error.message,
        url: 'http://117.102.70.147:9583/api/v1/auth/token'
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Test Login API</h1>
        
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Test Buttons</h2>
          <div className="space-x-4">
            <button 
              onClick={testProxyLogin}
              disabled={loading}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50">
              {loading ? 'Testing...' : 'Test Proxy Login'}
            </button>
            
            <button 
              onClick={testDirectAPI}
              disabled={loading}
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:opacity-50">
              {loading ? 'Testing...' : 'Test Direct API'}
            </button>
          </div>
        </div>

        {result && (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Test Result</h2>
            
            <div className="mb-4">
              <span className={`inline-block px-3 py-1 rounded text-white ${result.success ? 'bg-green-500' : 'bg-red-500'}`}>
                {result.success ? '✅ SUCCESS' : '❌ FAILED'}
              </span>
            </div>

            <div className="space-y-4">
              <div>
                <strong>URL:</strong> 
                <span className="font-mono text-sm bg-gray-100 p-1 rounded ml-2">{result.url}</span>
              </div>
              
              {result.status && (
                <div>
                  <strong>Status:</strong> {result.status} {result.statusText}
                </div>
              )}

              {result.error && (
                <div>
                  <strong>Error:</strong> 
                  <span className="text-red-600">{result.error}</span>
                </div>
              )}

              {result.headers && (
                <div>
                  <strong>Headers:</strong>
                  <pre className="bg-gray-100 p-2 rounded text-sm mt-1 overflow-auto">
                    {JSON.stringify(result.headers, null, 2)}
                  </pre>
                </div>
              )}

              {result.parsed && (
                <div>
                  <strong>Parsed Response:</strong>
                  <pre className="bg-gray-100 p-2 rounded text-sm mt-1 overflow-auto">
                    {JSON.stringify(result.parsed, null, 2)}
                  </pre>
                </div>
              )}

              {result.body && (
                <div>
                  <strong>Raw Response:</strong>
                  <pre className="bg-gray-100 p-2 rounded text-sm mt-1 overflow-auto">
                    {result.body}
                  </pre>
                </div>
              )}
            </div>
          </div>
        )}

        <div className="mt-6 text-sm text-gray-600">
          <p><strong>Expected credentials:</strong></p>
          <p>Username: kcukc.admin</p>
          <p>Password: 123456</p>
        </div>
      </div>
    </div>
  )
}