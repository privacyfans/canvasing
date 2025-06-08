'use client'
import { useState, useRef } from 'react'
import { useAttachments } from '@src/hooks/useAttachments'
import { Modal } from '@src/components/custom/Modal/Modal'
import { Eye, Download, ZoomIn, ZoomOut } from 'lucide-react'

const DocumentUpload = ({ 
  prospectId, 
  existingDocument = null, 
  categoryId, 
  categoryName,
  onUploadSuccess,
  onDeleteSuccess 
}) => {
  const [isUploading, setIsUploading] = useState(false)
  const [preview, setPreview] = useState(existingDocument?.file || null)
  const [viewerOpen, setViewerOpen] = useState(false)
  const [zoom, setZoom] = useState(100)
  const fileInputRef = useRef(null)
  const { uploadFile, deleteDocument } = useAttachments()

  const handleFileSelect = async (event) => {
    const file = event.target.files[0]
    if (!file) return

    setIsUploading(true)

    try {
      const result = await uploadFile(file, prospectId, categoryId, categoryName, existingDocument)

      if (result.success) {
        alert(`Document ${existingDocument ? 'updated' : 'uploaded'} successfully`)
        // Convert file to preview for immediate UI update
        const reader = new FileReader()
        reader.onload = () => {
          setPreview(reader.result)
          console.log('Preview updated:', reader.result.substring(0, 50) + '...')
        }
        reader.readAsDataURL(file)
        
        onUploadSuccess && onUploadSuccess(result.data)
      } else {
        alert(result.error || 'Upload failed')
      }
    } catch (error) {
      console.error('Upload error:', error)
      alert('Upload failed. Please try again.')
    } finally {
      setIsUploading(false)
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    }
  }

  const handleDelete = async () => {
    if (!existingDocument?.id) return

    if (!confirm('Are you sure you want to delete this document?')) {
      return
    }

    try {
      const result = await deleteDocument(existingDocument.id)

      if (result.success) {
        alert('Document deleted successfully')
        setPreview(null)
        onDeleteSuccess && onDeleteSuccess(existingDocument.id)
      } else {
        alert(result.error || 'Delete failed')
      }
    } catch (error) {
      console.error('Delete error:', error)
      alert('Delete failed. Please try again.')
    }
  }

  const handleDownload = () => {
    const documentData = existingDocument || { file: preview, type: 'unknown', size: 'Unknown' }
    if (!documentData.file) return

    // Construct proper image source
    let downloadSrc = documentData.file
    if (existingDocument?.file && !existingDocument.file.startsWith('data:')) {
      downloadSrc = `data:image/jpeg;base64,${existingDocument.file}`
    }

    const link = document.createElement('a')
    link.href = downloadSrc
    link.download = `${categoryName}.${documentData.type}`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const handleZoomIn = () => {
    setZoom(prev => Math.min(prev + 25, 200))
  }

  const handleZoomOut = () => {
    setZoom(prev => Math.max(prev - 25, 50))
  }

  const handleResetZoom = () => {
    setZoom(100)
  }

  const renderModalContent = () => {
    const documentData = existingDocument || { file: preview, type: 'unknown', size: 'Unknown' }
    const isImage = preview?.startsWith('data:image') || 
                   (existingDocument?.type && ['jpg', 'jpeg', 'png'].includes(existingDocument.type.toLowerCase()))
    const isPdf = preview?.startsWith('data:application/pdf') || 
                 (existingDocument?.type && existingDocument.type.toLowerCase() === 'pdf')

    // Construct proper image source
    let imageSrc = preview
    if (!imageSrc && existingDocument?.file && isImage) {
      if (existingDocument.file.startsWith('data:')) {
        imageSrc = existingDocument.file
      } else {
        imageSrc = `data:image/jpeg;base64,${existingDocument.file}`
      }
    }

    return (
      <div>
        {/* Document Info */}
        <div className="mb-4 p-3 bg-gray-50 rounded-lg">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-600">
                {documentData.type?.toUpperCase()} • {documentData.size}
              </p>
            </div>
            <div className="flex items-center space-x-2">
              {/* Zoom Controls for Images */}
              {isImage && (
                <div className="flex items-center space-x-2">
                  <button
                    onClick={handleZoomOut}
                    disabled={zoom <= 50}
                    className="p-1 text-gray-600 hover:text-gray-900 hover:bg-gray-200 rounded disabled:opacity-50"
                  >
                    <ZoomOut className="h-4 w-4" />
                  </button>
                  <span className="text-sm text-gray-600 min-w-[60px] text-center">
                    {zoom}%
                  </span>
                  <button
                    onClick={handleZoomIn}
                    disabled={zoom >= 200}
                    className="p-1 text-gray-600 hover:text-gray-900 hover:bg-gray-200 rounded disabled:opacity-50"
                  >
                    <ZoomIn className="h-4 w-4" />
                  </button>
                  <button
                    onClick={handleResetZoom}
                    className="px-2 py-1 text-xs text-gray-600 hover:text-gray-900 hover:bg-gray-200 rounded"
                  >
                    Reset
                  </button>
                </div>
              )}
              
              {/* Download Button */}
              <button
                onClick={handleDownload}
                className="flex items-center space-x-1 px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
              >
                <Download className="h-4 w-4" />
                <span>Download</span>
              </button>
            </div>
          </div>
        </div>

        {/* Document Content */}
        <div className="overflow-auto max-h-[60vh]">
          {isImage && imageSrc && (
            <div className="flex justify-center">
              <img
                src={imageSrc}
                alt={categoryName}
                className="max-w-full h-auto transition-transform duration-200"
                style={{ transform: `scale(${zoom / 100})` }}
                onLoad={() => setZoom(100)}
                onError={(e) => {
                  console.error('Image load error in modal:', e)
                }}
              />
            </div>
          )}

          {isPdf && (
            <div className="text-center">
              <div className="mb-4">
                <div className="inline-flex items-center justify-center w-24 h-24 bg-red-100 rounded-full mb-4">
                  <svg className="w-12 h-12 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                  </svg>
                </div>
                <h4 className="text-xl font-semibold text-gray-900 mb-2">PDF Document</h4>
                <p className="text-gray-600 mb-4">
                  Preview not available for PDF files. Click download to view the document.
                </p>
              </div>
            </div>
          )}

          {!isImage && !isPdf && (
            <div className="text-center py-12">
              <div className="inline-flex items-center justify-center w-24 h-24 bg-gray-100 rounded-full mb-4">
                <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h4 className="text-xl font-semibold text-gray-900 mb-2">File Preview</h4>
              <p className="text-gray-600 mb-4">
                Preview not available for this file type. Click download to view the file.
              </p>
            </div>
          )}
        </div>
      </div>
    )
  }

  const renderPreview = () => {
    if (!preview && !existingDocument) return null

    const isImage = preview?.startsWith('data:image') || 
                   (existingDocument?.type && ['jpg', 'jpeg', 'png'].includes(existingDocument.type.toLowerCase()))
    const isPdf = preview?.startsWith('data:application/pdf') || 
                 (existingDocument?.type && existingDocument.type.toLowerCase() === 'pdf')

    // Construct proper image source
    let imageSrc = preview
    if (!imageSrc && existingDocument?.file && isImage) {
      console.log('Constructing image source for', categoryName, ':')
      console.log('File data length:', existingDocument.file?.length)
      console.log('File starts with data:', existingDocument.file?.startsWith('data:'))
      console.log('File preview (first 100 chars):', existingDocument.file?.substring(0, 100))
      console.log('File end (last 50 chars):', existingDocument.file?.substring(existingDocument.file.length - 50))
      
      // Check if file already has data URL format
      if (existingDocument.file.startsWith('data:')) {
        imageSrc = existingDocument.file
        console.log('Using file as-is (already data URL)')
      } else {
        // Add data URL prefix for base64 data
        imageSrc = `data:image/jpeg;base64,${existingDocument.file}`
        console.log('Added data URL prefix')
      }
    }

    return (
      <div className="mt-3 relative group">
        <div className="relative">
          {isImage && imageSrc && (
            <img 
              src={imageSrc} 
              alt={categoryName}
              className="w-full h-32 object-cover rounded-lg border cursor-pointer hover:opacity-95 transition-opacity"
              onClick={() => setViewerOpen(true)}
              onError={(e) => {
                console.error('Image load error for', categoryName, ':', e)
                console.error('Failed image src:', e.target.src)
                // Show placeholder instead of hiding
                e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjEyOCIgdmlld0JveD0iMCAwIDIwMCAxMjgiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMTI4IiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik04NCA2NEw5NiA3Nkw4NCA4OEw3MiA3Nkw4NCA2NFoiIGZpbGw9IiM5Q0EzQUYiLz4KPHR5cGU+SW1hZ2UgTm90IEZvdW5kPC90ZXh0Pgo8L3N2Zz4K'
                e.target.className = e.target.className.replace('cursor-pointer', '')
              }}
            />
          )}
          {isPdf && (
            <div 
              className="flex items-center justify-center w-full h-32 bg-gray-100 rounded-lg border cursor-pointer hover:bg-gray-200 transition-colors"
              onClick={() => setViewerOpen(true)}
            >
              <div className="text-center">
                <svg className="w-12 h-12 mx-auto text-red-500 mb-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                </svg>
                <p className="text-sm text-gray-600">PDF Document</p>
                <p className="text-xs text-gray-500">Click to view</p>
              </div>
            </div>
          )}
          
          {/* View Overlay */}
          {(isImage || isPdf) && (
            <div className="absolute inset-0 bg-opacity-0 group-hover:bg-opacity-20 rounded-lg transition-all duration-200 flex items-center justify-center">
              <button
                onClick={() => setViewerOpen(true)}
                className="opacity-0 group-hover:opacity-100 bg-white bg-opacity-90 hover:bg-opacity-100 text-gray-700 p-2 rounded-full shadow-lg transition-all duration-200 transform scale-90 group-hover:scale-100"
              >
                <Eye className="h-5 w-5" />
              </button>
            </div>
          )}
        </div>
        
        {/* View Button for smaller screens */}
        {(isImage || isPdf) && (
          <button
            onClick={() => setViewerOpen(true)}
            className="absolute top-2 right-2 bg-opacity-50 hover:bg-opacity-70 text-white p-1 rounded-full transition-colors lg:hidden"
          >
            <Eye className="h-4 w-4" />
          </button>
        )}
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg p-4">
      <div className="flex items-center justify-between mb-3">
        <h4 className="font-medium text-gray-900">{categoryName}</h4>
        {existingDocument && (
          <button
            onClick={handleDelete}
            className="text-red-600 hover:text-red-800 text-sm"
          >
            Delete
          </button>
        )}
      </div>

      <div className="space-y-3">
        <div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/jpg,image/png,application/pdf"
            onChange={handleFileSelect}
            className="hidden"
            id={`file-${categoryId}`}
          />
          <label
            htmlFor={`file-${categoryId}`}
            className={`block w-full p-3 border-2 border-dashed rounded-lg text-center cursor-pointer transition-colors ${
              isUploading 
                ? 'border-gray-300 bg-gray-50 cursor-not-allowed' 
                : 'border-gray-300 hover:border-blue-400 hover:bg-blue-50'
            }`}
          >
            {isUploading ? (
              <div className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Uploading...
              </div>
            ) : (
              <div>
                <svg className="w-8 h-8 mx-auto text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
                <p className="text-sm text-gray-600">
                  {existingDocument ? 'Click to replace document' : 'Click to upload document'}
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  JPG, PNG, PDF (Max: 10MB)
                </p>
              </div>
            )}
          </label>
        </div>

        {renderPreview()}

        {existingDocument && (
          <div className="text-xs text-gray-500 space-y-1">
            <p><span className="font-medium">Size:</span> {existingDocument.size}</p>
            <p><span className="font-medium">Type:</span> {existingDocument.type.toUpperCase()}</p>
            <p><span className="font-medium">Uploaded:</span> {new Date(existingDocument.createdAt).toLocaleDateString()}</p>
          </div>
        )}
      </div>

      {/* Document Viewer Modal */}
      <Modal
        isOpen={viewerOpen}
        onClose={() => {
          setViewerOpen(false)
          setZoom(100) // Reset zoom when closing
        }}
        title={`View ${categoryName} Document`}
        content={renderModalContent()}
        size="xl"
        position="center"
      />
    </div>
  )
}

export default DocumentUpload