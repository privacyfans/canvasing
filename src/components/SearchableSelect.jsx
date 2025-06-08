import React, { useState, useEffect, useRef } from 'react'
import { ChevronDown, Search, Loader2 } from 'lucide-react'

const SearchableSelect = ({
  options = [],
  loading = false,
  placeholder = "Pilih...",
  searchPlaceholder = "Cari...",
  value = "",
  onSelect,
  onSearch,
  disabled = false,
  className = "",
  label = "",
  error = "",
  required = false
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [debounceTimer, setDebounceTimer] = useState(null)
  const dropdownRef = useRef(null)
  const searchInputRef = useRef(null)

  // Get selected option display text
  const selectedOption = options.find(option => option.id === value)
  const displayText = selectedOption ? selectedOption.name : placeholder

  // Debounced search
  useEffect(() => {
    if (debounceTimer) {
      clearTimeout(debounceTimer)
    }

    const timer = setTimeout(() => {
      if (onSearch && searchTerm !== '') {
        onSearch(searchTerm)
      }
    }, 300)

    setDebounceTimer(timer)

    return () => {
      if (timer) clearTimeout(timer)
    }
  }, [searchTerm, onSearch])

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false)
        setSearchTerm('')
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      // Focus search input when dropdown opens
      setTimeout(() => {
        if (searchInputRef.current) {
          searchInputRef.current.focus()
        }
      }, 100)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  const handleToggle = () => {
    if (!disabled) {
      setIsOpen(!isOpen)
      if (!isOpen) {
        setSearchTerm('')
        if (onSearch) {
          onSearch('')
        }
      }
    }
  }

  const handleSelect = (option) => {
    if (onSelect) {
      onSelect(option)
    }
    setIsOpen(false)
    setSearchTerm('')
  }

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value)
  }

  const filteredOptions = searchTerm
    ? options.filter(option =>
        option.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : options

  return (
    <div className={`relative ${className}`}>
      {label && (
        <label className="form-label">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      
      <div ref={dropdownRef} className="relative">
        {/* Select Button */}
        <button
          type="button"
          onClick={handleToggle}
          disabled={disabled}
          className={`
            w-full form-input flex items-center justify-between
            ${disabled ? 'bg-gray-100 cursor-not-allowed' : 'cursor-pointer hover:border-blue-300'}
            ${error ? 'border-red-500' : ''}
            ${isOpen ? 'border-blue-500 ring-1 ring-blue-500' : ''}
          `}
        >
          <span className={`truncate ${!selectedOption ? 'text-gray-500' : ''}`}>
            {displayText}
          </span>
          <ChevronDown 
            className={`size-4 text-gray-400 transition-transform ${
              isOpen ? 'transform rotate-180' : ''
            }`}
          />
        </button>

        {/* Dropdown Menu */}
        {isOpen && (
          <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-hidden">
            {/* Search Input */}
            <div className="p-2 border-b border-gray-200">
              <div className="relative">
                <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 size-4 text-gray-400" />
                <input
                  ref={searchInputRef}
                  type="text"
                  placeholder={searchPlaceholder}
                  value={searchTerm}
                  onChange={handleSearchChange}
                  className="w-full pl-8 pr-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>

            {/* Options List */}
            <div className="max-h-48 overflow-y-auto">
              {loading ? (
                <div className="flex items-center justify-center py-4">
                  <Loader2 className="size-4 animate-spin text-gray-400" />
                  <span className="ml-2 text-sm text-gray-500">Loading...</span>
                </div>
              ) : filteredOptions.length > 0 ? (
                filteredOptions.map((option) => (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => handleSelect(option)}
                    className={`
                      w-full text-left px-3 py-2 text-sm hover:bg-blue-50 focus:outline-none focus:bg-blue-50
                      ${value === option.id ? 'bg-blue-100 text-blue-900' : 'text-gray-900'}
                    `}
                  >
                    {option.name}
                  </button>
                ))
              ) : (
                <div className="px-3 py-4 text-sm text-gray-500 text-center">
                  {searchTerm ? 'Tidak ada hasil ditemukan' : 'Tidak ada data'}
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Error Message */}
      {error && (
        <p className="text-red-500 text-sm mt-1">{error}</p>
      )}
    </div>
  )
}

export default SearchableSelect