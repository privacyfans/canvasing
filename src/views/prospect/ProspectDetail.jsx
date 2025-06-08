'use client';

import React, { useEffect, useState } from 'react';
import { ArrowLeft, Edit, User, Phone, Mail, MapPin, Calendar, Briefcase, CreditCard, Building, Image as ImageIcon } from 'lucide-react';
import { useRouter, useParams } from 'next/navigation';
import { useProspectDetail } from '@src/hooks/useProspectDetail';
import DocumentManager from '@src/components/prospect/DocumentManager';
import StatusManager from '@src/components/prospect/StatusManager';

const ProspectDetail = () => {
  const router = useRouter();
  const params = useParams();
  const prospectId = params?.id || "25052390794975337"; // fallback ID untuk testing
  const [activeTab, setActiveTab] = useState('profile');
  
  const {
    prospectDetail,
    loading,
    error,
    fetchProspectDetail,
    clearProspectDetail,
    refreshProspectDetail
  } = useProspectDetail();

  useEffect(() => {
    if (prospectId) {
      fetchProspectDetail(prospectId);
    }

    // Cleanup function
    return () => {
      clearProspectDetail();
    };
  }, [prospectId, fetchProspectDetail, clearProspectDetail]);

  const handleBack = () => {
    router.back();
  };

  const handleEdit = () => {
    router.push(`/prospect/edit/${prospectId}`);
  };

  const handleRefresh = () => {
    refreshProspectDetail(prospectId);
  };

  const formatDate = (dateString) => {
    if (!dateString || dateString === '-') return '-';
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('id-ID', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch (error) {
      return dateString; // Return original string if parsing fails
    }
  };

  const formatDateTime = (dateString) => {
    if (!dateString || dateString === '-') return '-';
    try {
      const date = new Date(dateString);
      return date.toLocaleString('id-ID', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch (error) {
      return dateString; // Return original string if parsing fails
    }
  };

  // Decode HTML entities
  const decodeHtmlEntities = (text) => {
    if (!text || typeof text !== 'string') return text;
    
    const textArea = document.createElement('textarea');
    textArea.innerHTML = text;
    return textArea.value;
  };

  // Format text with HTML entity decoding
  const formatText = (text) => {
    if (!text || text === '-') return '-';
    return decodeHtmlEntities(text);
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading prospect detail...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto">
          <div className="bg-red-100 rounded-full p-3 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
            <svg className="h-8 w-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833-.208 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Failed to Load Data</h3>
          <p className="text-gray-600 mb-4">{error}</p>
          <div className="space-x-3">
            <button
              onClick={handleRefresh}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Try Again
            </button>
            <button
              onClick={handleBack}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors"
            >
              Back
            </button>
          </div>
        </div>
      </div>
    );
  }

  // No data state
  if (!prospectDetail) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="bg-gray-100 rounded-full p-3 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
            <User className="h-8 w-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Prospect Not Found</h3>
          <p className="text-gray-600 mb-4">The prospect data could not be found.</p>
          <button
            onClick={handleBack}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <button
                onClick={handleBack}
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <ArrowLeft className="h-5 w-5" />
                <span>Back</span>
              </button>
              <div className="h-6 w-px bg-gray-300"></div>
              <h1 className="text-xl font-semibold text-gray-900">Prospect Detail</h1>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={handleRefresh}
                className="flex items-center space-x-2 px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                disabled={loading}
              >
                <svg className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                <span>Refresh</span>
              </button>
              <button
                onClick={handleEdit}
                className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Edit className="h-4 w-4" />
                <span>Edit</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Profile Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="text-center">
                {/* Profile Picture with Enhanced Display */}
                <div className="relative w-32 h-32 mx-auto mb-6">
                  {prospectDetail?.profilePicture ? (
                    <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-blue-100 shadow-lg bg-white">
                      <img
                        src={`data:image/jpeg;base64,${prospectDetail.profilePicture}`}
                        alt={prospectDetail.fullName || 'Profile Picture'}
                        className="w-full h-full object-cover object-center"
                        onError={(e) => {
                          console.log('Image load error:', e);
                          e.target.style.display = 'none';
                          e.target.nextSibling.style.display = 'flex';
                        }}
                      />
                      {/* Fallback when image fails to load */}
                      <div className="w-full h-full bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center hidden">
                        <User className="h-16 w-16 text-white" />
                      </div>
                    </div>
                  ) : (
                    <div className="w-32 h-32 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center border-4 border-blue-100 shadow-lg">
                      <User className="h-16 w-16 text-white" />
                    </div>
                  )}
                  
                  {/* Photo indicator - smaller and positioned better */}
                  <div className="absolute bottom-1 right-1 w-6 h-6 bg-white rounded-full shadow-md flex items-center justify-center border border-gray-200">
                    {prospectDetail?.profilePicture ? (
                      <ImageIcon className="h-3 w-3 text-green-600" />
                    ) : (
                      <User className="h-3 w-3 text-gray-400" />
                    )}
                  </div>
                </div>

                <h2 className="text-xl font-semibold text-gray-900 mb-2">
                  {prospectDetail?.fullName || 'N/A'}
                </h2>
                <p className="text-gray-500 mb-1">
                  {prospectDetail?.nickName ? `"${prospectDetail.nickName}"` : ''}
                </p>
                <p className="text-sm text-gray-500 mb-4">
                  User ID: {prospectDetail?.userId || 'N/A'}
                </p>
                
                {/* Contact Information Summary */}
                <div className="space-y-3 text-left">
                  <div className="flex items-center space-x-3">
                    <Phone className="h-4 w-4 text-gray-400 flex-shrink-0" />
                    <span className="text-sm truncate">{prospectDetail?.phoneNumber || 'N/A'}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Mail className="h-4 w-4 text-gray-400 flex-shrink-0" />
                    <span className="text-sm truncate">{prospectDetail?.email || 'N/A'}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Briefcase className="h-4 w-4 text-gray-400 flex-shrink-0" />
                    <span className="text-sm truncate">{prospectDetail?.occupation || 'N/A'}</span>
                  </div>
                </div>

                {/* Profile Picture Status */}
                {/* <div className="mt-6 pt-6 border-t border-gray-200">
                  <div className="flex items-center justify-center space-x-2 text-sm">
                    <ImageIcon className="h-4 w-4 text-gray-400" />
                    <span className="text-gray-500">
                      {prospectDetail?.profilePicture ? 'Profile photo available' : 'No profile photo'}
                    </span>
                  </div>
                </div> */}
              </div>
            </div>
          </div>

          {/* Main Content with Tabs */}
          <div className="lg:col-span-3">
            {/* Tab Navigation */}
            <div className="bg-white rounded-lg shadow-sm mb-6">
              <div className="border-b border-gray-200">
                <nav className="flex">
                  <button
                    onClick={() => setActiveTab('profile')}
                    className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                      activeTab === 'profile'
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    Profile Information
                  </button>
                  <button
                    onClick={() => setActiveTab('documents')}
                    className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                      activeTab === 'documents'
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    Documents
                  </button>
                  <button
                    onClick={() => setActiveTab('status')}
                    className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                      activeTab === 'status'
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    Status Approval
                  </button>
                </nav>
              </div>
            </div>

            {/* Tab Content */}
            <div className="space-y-6">
              {/* Profile Tab */}
              {activeTab === 'profile' && (
                <div className="space-y-6">
                  {/* Personal Information */}
              <div className="bg-white rounded-lg shadow-sm">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h3 className="text-lg font-medium text-gray-900 flex items-center">
                    <User className="h-5 w-5 mr-2 text-blue-600" />
                    Personal Information
                  </h3>
                </div>
                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-500 mb-1">
                        Full Name
                      </label>
                      <p className="text-gray-900">{prospectDetail?.fullName || '-'}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-500 mb-1">
                        Nickname
                      </label>
                      <p className="text-gray-900">{prospectDetail?.nickName || '-'}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-500 mb-1">
                        Birth Place
                      </label>
                      <p className="text-gray-900">{prospectDetail?.birthPlace || '-'}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-500 mb-1">
                        Birth Date
                      </label>
                      <p className="text-gray-900">{formatDate(prospectDetail?.birthDate)}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-500 mb-1">
                        Gender
                      </label>
                      <p className="text-gray-900">{prospectDetail?.gender || '-'}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-500 mb-1">
                        Religion
                      </label>
                      <p className="text-gray-900">{prospectDetail?.religion || '-'}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-500 mb-1">
                        Mother's Name
                      </label>
                      <p className="text-gray-900">{prospectDetail?.motherName || '-'}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-500 mb-1">
                        Marital Status
                      </label>
                      <p className="text-gray-900">{prospectDetail?.maritalStatus || '-'}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-500 mb-1">
                        Occupation
                      </label>
                      <p className="text-gray-900">{prospectDetail?.occupation || '-'}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div className="bg-white rounded-lg shadow-sm">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h3 className="text-lg font-medium text-gray-900 flex items-center">
                    <Phone className="h-5 w-5 mr-2 text-blue-600" />
                    Contact Information
                  </h3>
                </div>
                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-500 mb-1">
                        Phone Number
                      </label>
                      <p className="text-gray-900">{prospectDetail?.phoneNumber || '-'}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-500 mb-1">
                        Email Address
                      </label>
                      <p className="text-gray-900 break-all">{prospectDetail?.email || '-'}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Identity Information */}
              <div className="bg-white rounded-lg shadow-sm">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h3 className="text-lg font-medium text-gray-900 flex items-center">
                    <CreditCard className="h-5 w-5 mr-2 text-blue-600" />
                    Identity Information
                  </h3>
                </div>
                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-500 mb-1">
                        Identity Type
                      </label>
                      <p className="text-gray-900">{prospectDetail?.identityType || '-'}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-500 mb-1">
                        Identity Number
                      </label>
                      <p className="text-gray-900">{prospectDetail?.identityNumber || '-'}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-500 mb-1">
                        Expiry Date
                      </label>
                      <p className="text-gray-900">{formatDate(prospectDetail?.identityExpiredDate)}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-500 mb-1">
                        NPWP
                      </label>
                      <p className="text-gray-900">{prospectDetail?.npwp || '-'}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Address Information */}
              <div className="bg-white rounded-lg shadow-sm">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h3 className="text-lg font-medium text-gray-900 flex items-center">
                    <MapPin className="h-5 w-5 mr-2 text-blue-600" />
                    Address Information
                  </h3>
                </div>
                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-500 mb-1">
                        Full Address
                      </label>
                      <p className="text-gray-900">{prospectDetail?.address || '-'}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-500 mb-1">
                        RT
                      </label>
                      <p className="text-gray-900">{prospectDetail?.rt || '-'}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-500 mb-1">
                        RW
                      </label>
                      <p className="text-gray-900">{prospectDetail?.rw || '-'}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-500 mb-1">
                        Province
                      </label>
                      <p className="text-gray-900">{prospectDetail?.provinceName || '-'}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-500 mb-1">
                        City/Regency
                      </label>
                      <p className="text-gray-900">{prospectDetail?.cityName || '-'}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-500 mb-1">
                        District
                      </label>
                      <p className="text-gray-900">{prospectDetail?.districtName || '-'}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-500 mb-1">
                        Village
                      </label>
                      <p className="text-gray-900">{prospectDetail?.villageName || '-'}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-500 mb-1">
                        Postal Code
                      </label>
                      <p className="text-gray-900">{prospectDetail?.postalCode || '-'}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Financial Information */}
              <div className="bg-white rounded-lg shadow-sm">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h3 className="text-lg font-medium text-gray-900 flex items-center">
                    <Building className="h-5 w-5 mr-2 text-blue-600" />
                    Financial Information
                  </h3>
                </div>
                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-500 mb-1">
                        Fund Purpose
                      </label>
                      <p className="text-gray-900">{formatText(prospectDetail?.fundPurposeName)}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-500 mb-1">
                        Fund Source
                      </label>
                      <p className="text-gray-900">{formatText(prospectDetail?.fundSourceName)}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-500 mb-1">
                        Annual Income
                      </label>
                      <p className="text-gray-900">{formatText(prospectDetail?.annualIncomeName)}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Timestamps */}
              <div className="bg-white rounded-lg shadow-sm">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h3 className="text-lg font-medium text-gray-900 flex items-center">
                    <Calendar className="h-5 w-5 mr-2 text-blue-600" />
                    Timeline Information
                  </h3>
                </div>
                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-500 mb-1">
                        Created At
                      </label>
                      <p className="text-gray-900">{formatDateTime(prospectDetail?.createdAt)}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-500 mb-1">
                        Updated At
                      </label>
                      <p className="text-gray-900">{formatDateTime(prospectDetail?.updatedAt)}</p>
                    </div>
                  </div>
                </div>
              </div>
                </div>
              )}

              {/* Documents Tab */}
              {activeTab === 'documents' && (
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <DocumentManager 
                    prospectId={prospectId} 
                    isOpen={true}
                  />
                </div>
              )}

              {/* Status Approval Tab */}
              {activeTab === 'status' && (
                <StatusManager 
                  prospectId={prospectId}
                  onStatusUpdate={(status) => {
                    console.log('Status updated:', status);
                  }}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProspectDetail;