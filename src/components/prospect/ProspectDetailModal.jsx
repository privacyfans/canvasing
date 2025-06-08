'use client'

import React, { useState, useEffect } from 'react'
import { X, User, Phone, Mail, MapPin, Calendar, FileText, DollarSign } from 'lucide-react'
import { useProspectDetail } from '@src/hooks/useProspectDetail'

const ProspectDetailModal = ({ isOpen, onClose, prospectId }) => {
  const { prospectDetail, loading, error, fetchProspectDetail, clearProspectDetail } = useProspectDetail()

  // Effect to fetch data when modal opens
  useEffect(() => {
    if (isOpen && prospectId) {
      fetchProspectDetail(prospectId)
    }
  }, [isOpen, prospectId, fetchProspectDetail])

  // Reset state when modal closes
  useEffect(() => {
    if (!isOpen) {
      clearProspectDetail()
    }
  }, [isOpen, clearProspectDetail])

  if (!isOpen) return null

  const formatDate = (dateString) => {
    if (!dateString) return '-'
    return new Date(dateString).toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const formatCurrency = (amount) => {
    if (!amount) return '-'
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR'
    }).format(amount)
  }

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-50">
      {/* Modal Container */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative w-full max-w-4xl bg-white rounded-lg shadow-xl" onClick={(e) => e.stopPropagation()}>
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-white rounded-t-lg">
            <h2 className="text-xl font-semibold text-gray-900">
              Detail Prospect
            </h2>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6 bg-white max-h-[70vh] overflow-y-auto">
            {loading && (
              <div className="flex items-center justify-center py-12 bg-white">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500"></div>
                <span className="ml-2 text-gray-600">Memuat data...</span>
              </div>
            )}

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <p className="text-red-600">{error}</p>
              </div>
            )}

            {prospectDetail && (
              <div className="space-y-6">
                {/* Profile Picture & Basic Info */}
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex-shrink-0">
                    {prospectDetail.profilePicture ? (
                      <img
                        src={`data:image/jpeg;base64,${prospectDetail.profilePicture}`}
                        alt="Profile"
                        className="w-32 h-32 rounded-full object-cover border-4 border-gray-200"
                      />
                    ) : (
                      <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center">
                        <User className="w-16 h-16 text-gray-400" />
                      </div>
                    )}
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      {prospectDetail.fullName}
                    </h3>
                    <p className="text-lg text-gray-600 mb-4">
                      {prospectDetail.nickName}
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4 text-gray-500" />
                        <span className="text-gray-900">{prospectDetail.phoneNumber}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4 text-gray-500" />
                        <span className="text-gray-900">{prospectDetail.email}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4 text-gray-500" />
                        <span className="text-gray-900">{prospectDetail.gender}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-gray-500" />
                        <span className="text-gray-900">{formatDate(prospectDetail.birthDate)}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Personal Information */}
                <div className="bg-gray-50 rounded-lg p-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">
                    Informasi Personal
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-500">Tempat Lahir</label>
                      <p className="text-gray-900">{prospectDetail.birthPlace || '-'}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-500">Agama</label>
                      <p className="text-gray-900">{prospectDetail.religion || '-'}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-500">Nama Ibu</label>
                      <p className="text-gray-900">{prospectDetail.motherName || '-'}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-500">Status Pernikahan</label>
                      <p className="text-gray-900">{prospectDetail.maritalStatus || '-'}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-500">Pekerjaan</label>
                      <p className="text-gray-900">{prospectDetail.occupation || '-'}</p>
                    </div>
                  </div>
                </div>

                {/* Identity Information */}
                <div className="bg-gray-50 rounded-lg p-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <FileText className="w-5 h-5" />
                    Informasi Identitas
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-500">Jenis Identitas</label>
                      <p className="text-gray-900">{prospectDetail.identityType || '-'}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-500">Nomor Identitas</label>
                      <p className="text-gray-900">{prospectDetail.identityNumber || '-'}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-500">Tanggal Kadaluarsa</label>
                      <p className="text-gray-900">{prospectDetail.identityExpiredDate || '-'}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-500">NPWP</label>
                      <p className="text-gray-900">{prospectDetail.npwp || '-'}</p>
                    </div>
                  </div>
                </div>

                {/* Address Information */}
                <div className="bg-gray-50 rounded-lg p-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <MapPin className="w-5 h-5" />
                    Informasi Alamat
                  </h4>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-500">Alamat Lengkap</label>
                      <p className="text-gray-900">{prospectDetail.address || '-'}</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-500">RT</label>
                        <p className="text-gray-900">{prospectDetail.rt || '-'}</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-500">RW</label>
                        <p className="text-gray-900">{prospectDetail.rw || '-'}</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-500">Kode Pos</label>
                        <p className="text-gray-900">{prospectDetail.postalCode || '-'}</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-500">Provinsi</label>
                        <p className="text-gray-900">{prospectDetail.provinceName || '-'}</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-500">Kota/Kabupaten</label>
                        <p className="text-gray-900">{prospectDetail.cityName || '-'}</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-500">Kecamatan</label>
                        <p className="text-gray-900">{prospectDetail.districtName || '-'}</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-500">Kelurahan</label>
                        <p className="text-gray-900">{prospectDetail.villageName || '-'}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Financial Information */}
                <div className="bg-gray-50 rounded-lg p-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <DollarSign className="w-5 h-5" />
                    Informasi Keuangan
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-500">Tujuan Dana</label>
                      <p className="text-gray-900">{prospectDetail.fundPurposeName || '-'}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-500">Sumber Dana</label>
                      <p className="text-gray-900">{prospectDetail.fundSourceName || '-'}</p>
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-500">Pendapatan Tahunan</label>
                      <p className="text-gray-900">{prospectDetail.annualIncomeName || '-'}</p>
                    </div>
                  </div>
                </div>

                {/* Metadata */}
                <div className="bg-gray-50 rounded-lg p-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">
                    Informasi Sistem
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-500">ID Prospect</label>
                      <p className="text-gray-900 font-mono text-sm">{prospectDetail.id}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-500">User ID</label>
                      <p className="text-gray-900 font-mono text-sm">{prospectDetail.userId}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-500">Dibuat</label>
                      <p className="text-gray-900">{formatDate(prospectDetail.createdAt)}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-500">Diupdate</label>
                      <p className="text-gray-900">{formatDate(prospectDetail.updatedAt)}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="flex justify-end p-6 border-t border-gray-200 bg-white rounded-b-lg">
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:text-gray-800 font-medium bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
            >
              Tutup
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProspectDetailModal