'use client'

import React, { useState, useCallback, useEffect } from 'react';
import {
  User,
  Phone,
  Mail,
  MapPin,
  Search,
  Plus,
  Edit,
  Trash2,
  Eye,
  ChevronLeft,
  ChevronRight,
  AlertCircle,
  RefreshCw,
  X
} from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useProspects } from '@src/hooks/useProspects';
import { useDebounce } from '@src/hooks/useDebounce';
import { useSimpleToast } from '@src/components/ui/Toast';
import ProfilePicture from '@src/components/ui/ProfilePicture';
import { useAuthHandler } from '@src/hooks/useAuthHandler';
import ErrorWithRetry from '@src/components/ui/ErrorWithRetry';
import TableContainer from '@src/components/custom/Table/Table';

const UserProspectList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // Get term from URL query params
  const termFromUrl = searchParams.get('term') || '';
  
  // Debounce search term to avoid too many API calls
  const debouncedSearchTerm = useDebounce(searchTerm, 800);
  
  // Debug values
  console.log('[UserProspectList] Current searchTerm:', `"${searchTerm}"`);
  console.log('[UserProspectList] Current debouncedSearchTerm:', `"${debouncedSearchTerm}"`);
  console.log('[UserProspectList] searchTerm === debouncedSearchTerm:', searchTerm === debouncedSearchTerm);
  const { showSuccess, showError, showInfo, ToastContainer } = useSimpleToast();
  const { isAuthenticated, isLoading: authLoading, hasError: authError } = useAuthHandler();
  
  const {
    prospects,
    loading,
    error,
    pagination,
    searchProspects,
    changePage,
    changePageSize,
    refreshProspects,
    deleteProspect
  } = useProspects();

  // Effect to set initial search term from URL
  useEffect(() => {
    if (termFromUrl && termFromUrl !== searchTerm) {
      console.log('[UserProspectList] Setting search term from URL:', termFromUrl);
      setSearchTerm(termFromUrl);
    }
  }, [termFromUrl]);

  // Effect untuk menjalankan search ketika debounced value berubah
  useEffect(() => {
    console.log('[UserProspectList] useEffect triggered - debouncedSearchTerm:', `"${debouncedSearchTerm}"`);
    console.log('[UserProspectList] useEffect triggered - searchProspects type:', typeof searchProspects);
    
    // Only search if term is defined (not initial state)
    if (debouncedSearchTerm !== undefined) {
      console.log('[UserProspectList] Searching for term:', `"${debouncedSearchTerm}"`);
      console.log('[UserProspectList] Search term length:', debouncedSearchTerm.length);
      
      // Set searching state
      setIsSearching(true);
      
      // Perform search with term parameter (can be empty string to clear search)
      searchProspects(debouncedSearchTerm).finally(() => {
        setIsSearching(false);
      });
    } else {
      console.log('[UserProspectList] Initial state, not searching');
    }
  }, [debouncedSearchTerm]);

  // Handle search input change
  const handleSearchChange = useCallback((value) => {
    console.log('[UserProspectList] Search term changed:', value);
    setSearchTerm(value);
  }, []);

  // Manual search trigger if useEffect is not working
  const handleManualSearch = useCallback(() => {
    console.log('[UserProspectList] Manual search triggered for:', searchTerm);
    if (searchProspects) {
      setIsSearching(true);
      searchProspects(searchTerm).finally(() => {
        setIsSearching(false);
      });
    }
  }, [searchTerm, searchProspects]);

  // Columns definition for TableContainer
  const columns = [
    {
      accessorKey: 'prospect',
      header: 'Prospect',
      cell: ({ row }) => {
        const prospect = row.original;
        return (
          <div className="flex items-center">
            <ProfilePicture
              base64Image={prospect.profilePicture}
              alt={prospect.fullName || 'Profile'}
              size="md"
            />
            <div className="ml-4">
              <div className="text-sm font-medium text-gray-900">
                {prospect.fullName || '-'}
              </div>
              <div className="text-sm text-gray-500">
                {prospect.nickName && `"${prospect.nickName}"`}
              </div>
              <div className="text-xs text-gray-400">
                ID: {prospect.userId || prospect.id}
              </div>
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: 'contact',
      header: 'Contact Info',
      cell: ({ row }) => {
        const prospect = row.original;
        return (
          <div className="space-y-1">
            <div className="flex items-center text-sm text-gray-900">
              <Phone className="w-4 h-4 mr-2 text-gray-400" />
              {prospect.phoneNumber || '-'}
            </div>
            <div className="flex items-center text-sm text-gray-900">
              <Mail className="w-4 h-4 mr-2 text-gray-400" />
              {prospect.email || '-'}
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: 'location',
      header: 'Location',
      cell: ({ row }) => {
        const prospect = row.original;
        return (
          <div className="text-sm text-gray-900">
            <div className="flex items-start">
              <MapPin className="w-4 h-4 mr-2 text-gray-400 mt-0.5 flex-shrink-0" />
              <div>
                <div>{prospect.address || '-'}</div>
                <div className="text-xs text-gray-500">
                  {prospect.villageName || '-'}, {prospect.districtName || '-'}
                </div>
                <div className="text-xs text-gray-500">
                  {prospect.cityName || '-'}, {prospect.provinceName || '-'}
                </div>
                <div className="text-xs text-gray-500">
                  {prospect.postalCode || '-'}
                </div>
              </div>
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: 'personal',
      header: 'Personal Info',
      cell: ({ row }) => {
        const prospect = row.original;
        return (
          <div className="text-sm text-gray-900 space-y-1">
            <div>
              <span className="font-medium">Birth:</span> {prospect.birthPlace || '-'}, {formatDate(prospect.birthDate)}
            </div>
            <div>
              <span className="font-medium">Gender:</span> {prospect.gender || '-'}
            </div>
            <div>
              <span className="font-medium">Religion:</span> {prospect.religion || '-'}
            </div>
            <div>
              <span className="font-medium">Marital:</span> {prospect.maritalStatus || '-'}
            </div>
            <div>
              <span className="font-medium">Job:</span> {prospect.occupation || '-'}
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: 'financial',
      header: 'Financial Info',
      cell: ({ row }) => {
        const prospect = row.original;
        return (
          <div className="text-sm text-gray-900 space-y-1">
            <div>
              <span className="font-medium">Income:</span>
              <br />
              <span className="text-xs">{formatText(prospect.annualIncomeName)}</span>
            </div>
            <div>
              <span className="font-medium">Fund Purpose:</span>
              <br />
              <span className="text-xs">{formatText(prospect.fundPurposeName)}</span>
            </div>
            <div>
              <span className="font-medium">Fund Source:</span>
              <br />
              <span className="text-xs">{formatText(prospect.fundSourceName)}</span>
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: 'actions',
      header: 'Actions',
      cell: ({ row }) => {
        const prospect = row.original;
        return (
          <div className="flex items-center space-x-2">
            <button
              onClick={() => handleView(prospect)}
              className="text-blue-600 hover:text-blue-900 p-1 rounded hover:bg-blue-50"
              title="View Details"
            >
              <Eye className="w-4 h-4" />
            </button>
            <button
              onClick={() => handleEdit(prospect)}
              className="text-green-600 hover:text-green-900 p-1 rounded hover:bg-green-50"
              title="Edit"
            >
              <Edit className="w-4 h-4" />
            </button>
            <button
              onClick={() => handleDelete(prospect)}
              className="text-red-600 hover:text-red-900 p-1 rounded hover:bg-red-50"
              title="Delete"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        );
      },
    },
  ];

  // Clear search
  const handleClearSearch = useCallback(() => {
    console.log('[UserProspectList] Clearing search');
    setSearchTerm('');
    // This will trigger the useEffect to search with empty term
  }, []);

  // Handle search submit (Enter key)
  const handleSearchSubmit = useCallback((e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      console.log('[UserProspectList] Search submitted via Enter:', searchTerm);
      
      setIsSearching(true);
      searchProspects(searchTerm).finally(() => {
        setIsSearching(false);
      });
    }
  }, [searchTerm, searchProspects]);

  // Handle actions
  const handleView = (prospect) => {
    console.log('Navigate to prospect detail:', prospect);
    router.push(`/prospect/detail/${prospect.id}`);
  };

  const handleEdit = (prospect) => {
    console.log('Navigate to edit prospect:', prospect);
    router.push(`/prospect/edit/${prospect.id}`);
  };

  const handleDelete = async (prospect) => {
    if (window.confirm(`Are you sure you want to delete ${prospect.fullName}?`)) {
      console.log('[UserProspectList] Deleting prospect:', prospect.id);
      const result = await deleteProspect(prospect.id);
      if (result.success) {
        showSuccess('Prospect deleted successfully');
      } else {
        showError(`Failed to delete prospect: ${result.error}`);
      }
    }
  };

  const handleAddNew = () => {
    console.log('Navigate to add new prospect');
    router.push('/prospect/create');
  };

  // Handle page change with search preservation
  const handlePageChange = useCallback((page) => {
    console.log('[UserProspectList] Page changed to:', page);
    changePage(page);
  }, [changePage]);

  // Handle page size change with search preservation
  const handlePageSizeChange = useCallback((size) => {
    console.log('[UserProspectList] Page size changed to:', size);
    changePageSize(size);
  }, [changePageSize]);

  // Format date helper
  const formatDate = (dateString) => {
    if (!dateString || dateString === '-') return '-';
    try {
      return new Date(dateString).toLocaleDateString('id-ID');
    } catch {
      return dateString;
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

  // Get search info text
  const getSearchInfoText = () => {
    if (searchTerm.trim()) {
      return `Search results for "${searchTerm}" - ${prospects.length} of ${pagination.total} prospects`;
    }
    return `Showing ${prospects.length} of ${pagination.total} prospects`;
  };

  // Debug info
  console.log('[UserProspectList] State:', {
    prospectsCount: prospects.length,
    loading,
    error,
    pagination,
    searchTerm,
    debouncedSearchTerm,
    isSearching
  });

  // Loading state
  if (authLoading || (loading && prospects.length === 0 && !searchTerm)) {
    return (
      <>
        <ToastContainer />
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="mt-2 text-gray-600">
              {authLoading ? 'Authenticating...' : 'Loading prospects...'}
            </p>
          </div>
        </div>
      </>
    );
  }

  // Auth error state
  if (authError) {
    return (
      <>
        <ToastContainer />
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <AlertCircle className="mx-auto h-12 w-12 text-red-500" />
            <h3 className="mt-2 text-lg font-medium text-gray-900">Authentication Error</h3>
            <p className="mt-1 text-sm text-gray-500">Please sign in again to continue</p>
          </div>
        </div>
      </>
    );
  }

  // Not authenticated
  if (!isAuthenticated) {
    return (
      <>
        <ToastContainer />
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <AlertCircle className="mx-auto h-12 w-12 text-yellow-500" />
            <h3 className="mt-2 text-lg font-medium text-gray-900">Not Authenticated</h3>
            <p className="mt-1 text-sm text-gray-500">Please sign in to view prospects</p>
          </div>
        </div>
      </>
    );
  }

  // Error state
  if (error && prospects.length === 0) {
    return (
      <>
        <ToastContainer />
        <ErrorWithRetry
          error={error}
          onRetry={refreshProspects}
          isLoading={loading}
          title="Error Loading Prospects"
        />
      </>
    );
  }

  return (
    <>
      <ToastContainer />
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Prospect List</h1>
            <p className="text-gray-600">
              {getSearchInfoText()}
            </p>
            {searchTerm && (
              <div className="mt-1 flex items-center gap-2">
                <span className="text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded">
                  Searching: {searchTerm}
                </span>
                <button
                  onClick={handleClearSearch}
                  className="text-xs text-gray-500 hover:text-gray-700"
                >
                  Clear
                </button>
              </div>
            )}
          </div>
          <button
            onClick={handleAddNew}
            className="btn btn-primary flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Add New Prospect
          </button>
        </div>

        {/* Search and Filters */}
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Enhanced Search */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search by name, nickname, phone, email, ID number, or status..."
                  value={searchTerm}
                  onChange={(e) => handleSearchChange(e.target.value)}
                  onKeyDown={handleSearchSubmit}
                  className="w-full pl-10 pr-20 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
                {searchTerm && (
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center gap-1">
                    <button
                      onClick={handleManualSearch}
                      className="text-blue-500 hover:text-blue-700 p-1"
                      title="Search"
                    >
                      <Search className="w-4 h-4" />
                    </button>
                    <button
                      onClick={handleClearSearch}
                      className="text-gray-400 hover:text-gray-600 p-1"
                      title="Clear search"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                )}
                {(isSearching || loading) && (
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    <RefreshCw className="w-4 h-4 animate-spin text-gray-400" />
                  </div>
                )}
              </div>
              <div className="mt-1 text-xs text-gray-500">
                Search across fields: fullname, nickname, email, phone, identity number and status.
              </div>
            </div>

            {/* Page Size */}
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Show:</span>
              <select
                value={pagination.perPage}
                onChange={(e) => handlePageSizeChange(Number(e.target.value))}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                disabled={loading}
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
              </select>
            </div>

            {/* Refresh Button */}
            <button
              onClick={refreshProspects}
              disabled={loading}
              className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50"
              title="Refresh"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            </button>
          </div>
        </div>

        {/* Search Status */}
        {searchTerm && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Search className="w-4 h-4 text-blue-600" />
                <span className="text-sm text-blue-800">
                  {isSearching ? 'Searching...' : `Found ${prospects.length} results for "${searchTerm}"`}
                </span>
              </div>
              <button
                onClick={handleClearSearch}
                className="text-blue-600 hover:text-blue-800 text-sm font-medium"
              >
                Clear Search
              </button>
            </div>
            {!isSearching && prospects.length === 0 && (
              <p className="text-sm text-blue-600 mt-1">
                No prospects found matching your search criteria. Try different keywords.
              </p>
            )}
          </div>
        )}

        {/* Results Summary */}
        <div className="flex justify-between items-center text-sm text-gray-600">
          <span>
            {getSearchInfoText()}
          </span>
          {(loading || isSearching) && (
            <span className="flex items-center gap-1">
              <RefreshCw className="w-3 h-3 animate-spin" />
              {isSearching ? 'Searching...' : 'Loading...'}
            </span>
          )}
        </div>

        {/* Prospects Table */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          {error && prospects.length === 0 ? (
            <div className="text-center py-12">
              <User className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">Error Loading Prospects</h3>
              <div className="mt-4 p-3 bg-red-50 rounded text-sm text-red-600 max-w-md mx-auto">
                <p className="font-medium">Error Details:</p>
                <p className="break-words">{error}</p>
              </div>
              <button
                onClick={() => window.location.reload()}
                className="mt-3 btn btn-primary text-sm"
              >
                Retry
              </button>
            </div>
          ) : (
            <TableContainer
              columns={columns}
              data={prospects}
              tableClass="table"
              theadClass=""
              divClass="overflow-x-auto"
              thtrClass=""
              trClass="hover:bg-gray-50"
              thClass="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              tdClass="px-6 py-4"
              tbodyClass="bg-white divide-y divide-gray-200"
              isSearch={false}
              isPagination={true}
              isHeader={true}
              SearchPlaceholder="Search prospects..."
            />
          )}
        </div>
      </div>
    </>
  );
};

export default UserProspectList;