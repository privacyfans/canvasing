// src/components/debug/ImageTest.jsx
'use client'

import { useState } from 'react'
import ProfilePicture from '@src/components/ui/ProfilePicture'

const ImageTest = ({ base64String }) => {
  const [showFullBase64, setShowFullBase64] = useState(false)

  if (!base64String) {
    return (
      <div className="p-4 bg-gray-50 rounded-lg">
        <p className="text-gray-600">No base64 image data provided</p>
      </div>
    )
  }

  // Format base64 to data URL
  const formatBase64Image = (base64) => {
    if (base64.startsWith('data:image/')) {
      return base64
    }
    
    // Detect image type from base64 header
    let mimeType = 'image/jpeg'
    if (base64.startsWith('/9j/')) {
      mimeType = 'image/jpeg'
    } else if (base64.startsWith('iVBORw0KGgo')) {
      mimeType = 'image/png'
    } else if (base64.startsWith('R0lGODlh')) {
      mimeType = 'image/gif'
    }
    
    return `data:${mimeType};base64,${base64}`
  }

  const imageUrl = formatBase64Image(base64String)
  const base64Preview = base64String.substring(0, 100) + '...'

  return (
    <div className="p-6 bg-white rounded-lg shadow-sm space-y-4">
      <h3 className="text-lg font-semibold">Base64 Image Test</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Profile Picture Component Test */}
        <div>
          <h4 className="font-medium mb-2">Profile Picture Component:</h4>
          <div className="flex items-center space-x-4">
            <ProfilePicture
              base64Image={base64String}
              alt="Test Profile"
              size="sm"
            />
            <ProfilePicture
              base64Image={base64String}
              alt="Test Profile"
              size="md"
            />
            <ProfilePicture
              base64Image={base64String}
              alt="Test Profile"
              size="lg"
            />
            <ProfilePicture
              base64Image={base64String}
              alt="Test Profile"
              size="xl"
            />
          </div>
        </div>

        {/* Raw Image Test */}
        <div>
          <h4 className="font-medium mb-2">Raw Image Element:</h4>
          <img
            src={imageUrl}
            alt="Test"
            className="h-20 w-20 rounded-full object-cover border border-gray-200"
            onLoad={() => console.log('✅ Image loaded successfully')}
            onError={(e) => {
              console.error('❌ Image load failed:', e)
              console.error('Image URL length:', imageUrl.length)
              console.error('Image URL preview:', imageUrl.substring(0, 100))
            }}
          />
        </div>
      </div>

      {/* Base64 Info */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <h4 className="font-medium mb-2">Base64 Info:</h4>
        <div className="space-y-2 text-sm">
          <p><strong>Length:</strong> {base64String.length} characters</p>
          <p><strong>Starts with:</strong> {base64String.substring(0, 20)}...</p>
          <p><strong>Detected MIME:</strong> {
            base64String.startsWith('/9j/') ? 'image/jpeg' :
            base64String.startsWith('iVBORw0KGgo') ? 'image/png' :
            base64String.startsWith('R0lGODlh') ? 'image/gif' :
            'image/jpeg (default)'
          }</p>
          <p><strong>Data URL Length:</strong> {imageUrl.length} characters</p>
        </div>
      </div>

      {/* Base64 Preview */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <div className="flex items-center justify-between mb-2">
          <h4 className="font-medium">Base64 String:</h4>
          <button
            onClick={() => setShowFullBase64(!showFullBase64)}
            className="text-blue-600 hover:text-blue-800 text-sm"
          >
            {showFullBase64 ? 'Hide Full' : 'Show Full'}
          </button>
        </div>
        <div className="bg-white p-2 rounded border font-mono text-xs max-h-32 overflow-auto">
          {showFullBase64 ? base64String : base64Preview}
        </div>
      </div>
    </div>
  )
}

export default ImageTest