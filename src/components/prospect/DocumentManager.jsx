'use client'
import { useState, useEffect } from 'react'
import DocumentUpload from './DocumentUpload'
import { useAttachments } from '@src/hooks/useAttachments'

const DocumentManager = ({ prospectId, isOpen = true }) => {
  const { documents, loading, fetchDocuments } = useAttachments()

  const documentCategories = [
    { id: '01', name: 'KTP' },
    { id: '02', name: 'NPWP' },
    { id: '03', name: 'Selfie + KTP' },
    { id: '04', name: 'Tempat Usaha' }
  ]

  const loadDocuments = async () => {
    if (!prospectId) return
    
    const result = await fetchDocuments(prospectId)
    if (!result.success) {
      console.error('Failed to fetch documents:', result.error)
    }
  }

  useEffect(() => {
    if (prospectId && isOpen) {
      loadDocuments()
    }
  }, [prospectId, isOpen])

  const handleUploadSuccess = (newDocument) => {
    loadDocuments() // Refresh the list
  }

  const handleDeleteSuccess = (deletedId) => {
    loadDocuments() // Refresh the documents list to clear existingDocument
  }

  const getDocumentByCategory = (categoryId) => {
    return documents.find(doc => doc.categoryId === categoryId)
  }

  if (!isOpen) return null

  return (
    <div className="bg-gray-50 rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">
          Dokumen Prospect
        </h3>
        <button
          onClick={loadDocuments}
          disabled={loading}
          className="text-blue-600 hover:text-blue-800 text-sm font-medium disabled:opacity-50"
        >
          {loading ? 'Loading...' : 'Refresh'}
        </button>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[1, 2, 3, 4].map((item) => (
            <div key={item} className="bg-white rounded-lg p-4 animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-1/3 mb-3"></div>
              <div className="h-24 bg-gray-200 rounded"></div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {documentCategories.map((category) => {
            const existingDocument = getDocumentByCategory(category.id)
            
            return (
              <DocumentUpload
                key={category.id}
                prospectId={prospectId}
                categoryId={category.id}
                categoryName={category.name}
                existingDocument={existingDocument}
                onUploadSuccess={handleUploadSuccess}
                onDeleteSuccess={handleDeleteSuccess}
              />
            )
          })}
        </div>
      )}

      {!loading && documents.length === 0 && (
        <div className="text-center py-8">
          <svg className="w-16 h-16 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <p className="text-gray-500 text-lg">Belum ada dokumen yang diupload</p>
          <p className="text-gray-400 text-sm mt-1">
            Upload dokumen KTP, NPWP, Selfie + KTP, dan Tempat Usaha
          </p>
        </div>
      )}

      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <h4 className="font-medium text-blue-900 mb-2">Catatan:</h4>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• Format file yang didukung: JPG, PNG, PDF</li>
          <li>• Ukuran maksimal file: 10MB</li>
          <li>• Semua dokumen akan disimpan dalam format yang aman</li>
          <li>• Anda dapat mengganti dokumen kapan saja</li>
        </ul>
      </div>
    </div>
  )
}

export default DocumentManager