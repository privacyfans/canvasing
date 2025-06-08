// src/utils/jwtDebug.js

export const decodeJWT = (token) => {
  if (!token) return null
  
  try {
    const parts = token.split('.')
    if (parts.length !== 3) {
      throw new Error('Invalid JWT format')
    }
    
    const header = JSON.parse(atob(parts[0]))
    const payload = JSON.parse(atob(parts[1]))
    
    return {
      header,
      payload,
      signature: parts[2]
    }
  } catch (error) {
    console.error('Error decoding JWT:', error)
    return null
  }
}

export const getUserIdFromToken = (token) => {
  const decoded = decodeJWT(token)
  return decoded?.payload?.userId || decoded?.payload?.sub || null
}

export const getTokenInfo = (token) => {
  const decoded = decodeJWT(token)
  if (!decoded) return null
  
  const now = Date.now()
  const exp = decoded.payload.exp * 1000 // Convert to milliseconds
  const iat = decoded.payload.iat * 1000 // Convert to milliseconds
  
  return {
    userId: decoded.payload.userId || decoded.payload.sub,
    role: decoded.payload.role,
    permissions: decoded.payload.permissions || [],
    issuedAt: new Date(iat).toISOString(),
    expiresAt: new Date(exp).toISOString(),
    timeUntilExpiry: Math.round((exp - now) / 1000),
    isExpired: now > exp,
    ageInSeconds: Math.round((now - iat) / 1000)
  }
}

export const logTokenInfo = (token, context = '') => {
  if (process.env.NODE_ENV !== 'development') return
  
  const info = getTokenInfo(token)
  if (!info) {
    console.log(`🔐 ${context}: Invalid token`)
    return
  }
  
  console.group(`🔐 Token Info ${context ? `[${context}]` : ''}`)
  console.log('User ID:', info.userId)
  console.log('Role:', info.role)
  console.log('Permissions:', info.permissions)
  console.log('Issued At:', info.issuedAt)
  console.log('Expires At:', info.expiresAt)
  console.log('Time Until Expiry:', `${info.timeUntilExpiry} seconds`)
  console.log('Age:', `${info.ageInSeconds} seconds`)
  console.log('Is Expired:', info.isExpired)
  
  if (info.timeUntilExpiry < 300) { // Less than 5 minutes
    console.warn('⚠️ Token expires soon!')
  }
  
  if (info.isExpired) {
    console.error('❌ Token is expired!')
  }
  
  console.groupEnd()
  
  return info
}