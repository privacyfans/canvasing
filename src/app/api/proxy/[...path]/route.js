// src/app/api/proxy/[...path]/route.js
import { NextResponse } from 'next/server'

const API_BASE_URL = 'http://117.102.70.147:9583/api/v1'

export async function GET(request, { params }) {
  try {
    // Await params before using
    const { path } = await params
    const url = new URL(request.url)
    const searchParams = url.searchParams
    
    // Construct the full API URL
    const apiPath = Array.isArray(path) ? path.join('/') : path
    const apiUrl = `${API_BASE_URL}/${apiPath}?${searchParams.toString()}`
    
    console.log('[Proxy API] GET:', apiUrl)
    
    // Get headers from the original request
    const headers = {
      'Content-Type': 'application/json',
      'x-user-agent': request.headers.get('x-user-agent') || 'web'
    }
    
    // Add token headers if available
    const apiToken = request.headers.get('x-api-token')
    const refreshToken = request.headers.get('x-refresh-token')
    
    if (apiToken) {
      headers['x-api-token'] = apiToken
    }
    
    if (refreshToken) {
      headers['x-refresh-token'] = refreshToken
    }
    
    console.log('[Proxy API] Headers:', Object.keys(headers))
    
    // Make the API call
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers
    })
    
    console.log('[Proxy API] Response status:', response.status)
    
    if (!response.ok) {
      const errorText = await response.text()
      console.error('[Proxy API] Error response:', errorText)
      return NextResponse.json(
        { error: `API Error: ${response.status}`, details: errorText },
        { status: response.status }
      )
    }
    
    const data = await response.text()
    console.log('[Proxy API] Response length:', data.length)
    
    // Parse and return the JSON response
    try {
      const jsonData = JSON.parse(data)
      return NextResponse.json(jsonData)
    } catch (parseError) {
      console.error('[Proxy API] JSON parse error:', parseError)
      return NextResponse.json(
        { error: 'Invalid JSON response from API' },
        { status: 500 }
      )
    }
    
  } catch (error) {
    console.error('[Proxy API] Network error:', error)
    return NextResponse.json(
      { error: 'Network error', details: error.message },
      { status: 500 }
    )
  }
}

export async function POST(request, { params }) {
  try {
    // Await params before using
    const { path } = await params
    const body = await request.text()
    
    // Construct the full API URL
    const apiPath = Array.isArray(path) ? path.join('/') : path
    const apiUrl = `${API_BASE_URL}/${apiPath}`
    
    console.log('[Proxy API] POST:', apiUrl)
    
    // Get headers from the original request
    const headers = {
      'Content-Type': 'application/json',
      'x-user-agent': request.headers.get('x-user-agent') || 'web'
    }
    
    // Add token headers if available
    const apiToken = request.headers.get('x-api-token')
    const refreshToken = request.headers.get('x-refresh-token')
    
    if (apiToken) {
      headers['x-api-token'] = apiToken
    }
    
    if (refreshToken) {
      headers['x-refresh-token'] = refreshToken
    }
    
    console.log('[Proxy API] Headers:', Object.keys(headers))
    console.log('[Proxy API] Has refresh token:', !!refreshToken)
    
    // Make the API call
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers,
      body
    })
    
    console.log('[Proxy API] Response status:', response.status)
    
    if (!response.ok) {
      const errorText = await response.text()
      console.error('[Proxy API] Error response:', errorText)
      return NextResponse.json(
        { error: `API Error: ${response.status}`, details: errorText },
        { status: response.status }
      )
    }
    
    const data = await response.text()
    console.log('[Proxy API] Response length:', data.length)
    
    // Parse and return the JSON response
    try {
      const jsonData = JSON.parse(data)
      return NextResponse.json(jsonData)
    } catch (parseError) {
      console.error('[Proxy API] JSON parse error:', parseError)
      return NextResponse.json(
        { error: 'Invalid JSON response from API' },
        { status: 500 }
      )
    }
    
  } catch (error) {
    console.error('[Proxy API] Network error:', error)
    return NextResponse.json(
      { error: 'Network error', details: error.message },
      { status: 500 }
    )
  }
}

export async function PUT(request, { params }) {
  try {
    // Await params before using
    const { path } = await params
    const url = new URL(request.url)
    const searchParams = url.searchParams
    const body = await request.text()
    
    // Construct the full API URL
    const apiPath = Array.isArray(path) ? path.join('/') : path
    const queryString = searchParams.toString()
    const apiUrl = `${API_BASE_URL}/${apiPath}${queryString ? `?${queryString}` : ''}`
    
    console.log('[Proxy API] PUT:', apiUrl)
    
    // Get headers from the original request
    const headers = {
      'Content-Type': 'application/json',
      'x-user-agent': request.headers.get('x-user-agent') || 'web'
    }
    
    // Add token headers if available
    const apiToken = request.headers.get('x-api-token')
    const refreshToken = request.headers.get('x-refresh-token')
    
    if (apiToken) {
      headers['x-api-token'] = apiToken
    }
    
    if (refreshToken) {
      headers['x-refresh-token'] = refreshToken
    }
    
    console.log('[Proxy API] Headers:', Object.keys(headers))
    
    // Make the API call
    const response = await fetch(apiUrl, {
      method: 'PUT',
      headers,
      body
    })
    
    console.log('[Proxy API] Response status:', response.status)
    
    if (!response.ok) {
      const errorText = await response.text()
      console.error('[Proxy API] Error response:', errorText)
      return NextResponse.json(
        { error: `API Error: ${response.status}`, details: errorText },
        { status: response.status }
      )
    }
    
    const data = await response.text()
    console.log('[Proxy API] Response length:', data.length)
    
    // Parse and return the JSON response
    try {
      const jsonData = JSON.parse(data)
      return NextResponse.json(jsonData)
    } catch (parseError) {
      console.error('[Proxy API] JSON parse error:', parseError)
      return NextResponse.json(
        { error: 'Invalid JSON response from API' },
        { status: 500 }
      )
    }
    
  } catch (error) {
    console.error('[Proxy API] Network error:', error)
    return NextResponse.json(
      { error: 'Network error', details: error.message },
      { status: 500 }
    )
  }
}

export async function DELETE(request, { params }) {
  try {
    // Await params before using
    const { path } = await params
    const url = new URL(request.url)
    const searchParams = url.searchParams
    
    // Construct the full API URL
    const apiPath = Array.isArray(path) ? path.join('/') : path
    const queryString = searchParams.toString()
    const apiUrl = `${API_BASE_URL}/${apiPath}${queryString ? `?${queryString}` : ''}`
    
    console.log('[Proxy API] DELETE:', apiUrl)
    
    // Get headers from the original request
    const headers = {
      'Content-Type': 'application/json',
      'x-user-agent': request.headers.get('x-user-agent') || 'web'
    }
    
    // Add token headers if available
    const apiToken = request.headers.get('x-api-token')
    const refreshToken = request.headers.get('x-refresh-token')
    
    if (apiToken) {
      headers['x-api-token'] = apiToken
    }
    
    if (refreshToken) {
      headers['x-refresh-token'] = refreshToken
    }
    
    console.log('[Proxy API] Headers:', Object.keys(headers))
    
    // Make the API call
    const response = await fetch(apiUrl, {
      method: 'DELETE',
      headers
    })
    
    console.log('[Proxy API] Response status:', response.status)
    
    if (!response.ok) {
      const errorText = await response.text()
      console.error('[Proxy API] Error response:', errorText)
      return NextResponse.json(
        { error: `API Error: ${response.status}`, details: errorText },
        { status: response.status }
      )
    }
    
    const data = await response.text()
    console.log('[Proxy API] Response length:', data.length)
    
    // Parse and return the JSON response
    try {
      const jsonData = JSON.parse(data)
      return NextResponse.json(jsonData)
    } catch (parseError) {
      console.error('[Proxy API] JSON parse error:', parseError)
      return NextResponse.json(
        { error: 'Invalid JSON response from API' },
        { status: 500 }
      )
    }
    
  } catch (error) {
    console.error('[Proxy API] Network error:', error)
    return NextResponse.json(
      { error: 'Network error', details: error.message },
      { status: 500 }
    )
  }
}