// src/components/ui/ProfilePicture.jsx
'use client'

import { useState } from 'react'
import { User } from 'lucide-react'

const ProfilePicture = ({ 
  base64Image, 
  alt = 'Profile', 
  size = 'md',
  className = '' 
}) => {
  const [imageError, setImageError] = useState(false)
  const [imageLoading, setImageLoading] = useState(true)

  // Size variants
  const sizeClasses = {
    sm: 'h-8 w-8',
    md: 'h-10 w-10', 
    lg: 'h-16 w-16',
    xl: 'h-24 w-24'
  }

  const iconSizes = {
    sm: 'h-4 w-4',
    md: 'h-5 w-5',
    lg: 'h-8 w-8', 
    xl: 'h-12 w-12'
  }

  // Format base64 string to data URL
  const formatBase64Image = (base64String) => {
    if (!base64String) return null
    
    // Check if it already has data URL prefix
    if (base64String.startsWith('data:image/')) {
      return base64String
    }
    
    // Add data URL prefix for base64 string
    // Try to detect image type from base64 header, default to jpeg
    let mimeType = 'image/jpeg'
    
    // Basic detection based on base64 header
    if (base64String.startsWith('/9j/')) {
      mimeType = 'image/jpeg'
    } else if (base64String.startsWith('iVBORw0KGgo')) {
      mimeType = 'image/png'
    } else if (base64String.startsWith('R0lGODlh')) {
      mimeType = 'image/gif'
    } else if (base64String.startsWith('UklGR')) {
      mimeType = 'image/webp'
    }
    
    return `data:${mimeType};base64,${base64String}`
  }

  const handleImageLoad = () => {
    setImageLoading(false)
    setImageError(false)
  }

  const handleImageError = (e) => {
    console.error('Profile picture load error:', e)
    setImageLoading(false)
    setImageError(true)
  }

  const imageUrl = formatBase64Image(base64Image)
  const shouldShowImage = imageUrl && !imageError

  return (
    <div className={`${sizeClasses[size]} flex-shrink-0 relative ${className}`}>
      {shouldShowImage && (
        <>
          {imageLoading && (
            <div className={`${sizeClasses[size]} rounded-full bg-gray-200 animate-pulse flex items-center justify-center`}>
              <User className={`${iconSizes[size]} text-gray-400`} />
            </div>
          )}
          <img
            className={`${sizeClasses[size]} rounded-full object-cover border border-gray-200 ${
              imageLoading ? 'opacity-0' : 'opacity-100'
            } transition-opacity duration-200`}
            src={imageUrl}
            alt={alt}
            onLoad={handleImageLoad}
            onError={handleImageError}
          />
        </>
      )}
      
      {/* Fallback avatar */}
      {(!shouldShowImage || imageError) && !imageLoading && (
        <div className={`${sizeClasses[size]} rounded-full bg-primary-100 flex items-center justify-center`}>
          <User className={`${iconSizes[size]} text-primary-600`} />
        </div>
      )}
    </div>
  )
}

export default ProfilePicture