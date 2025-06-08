import { useState, useEffect, useCallback } from 'react'
import { useSession } from 'next-auth/react'

export const useLocationData = () => {
  const { data: session } = useSession()
  
  // States for data
  const [provinces, setProvinces] = useState([])
  const [cities, setCities] = useState([])
  const [districts, setDistricts] = useState([])
  const [villages, setVillages] = useState([])
  
  // States for loading
  const [loadingProvinces, setLoadingProvinces] = useState(false)
  const [loadingCities, setLoadingCities] = useState(false)
  const [loadingDistricts, setLoadingDistricts] = useState(false)
  const [loadingVillages, setLoadingVillages] = useState(false)
  
  // States for pagination info
  const [provincePagination, setProvincePagination] = useState(null)
  const [cityPagination, setCityPagination] = useState(null)
  const [districtPagination, setDistrictPagination] = useState(null)
  const [villagePagination, setVillagePagination] = useState(null)

  // Generic API call function using proxy
  const makeApiCall = async (endpoint, params = {}) => {
    try {
      const searchParams = new URLSearchParams()
      
      // Default pagination
      searchParams.append('paging', '1')
      searchParams.append('page', params.page || '1')
      searchParams.append('size', params.size || '50')
      
      // Add search term if provided
      if (params.term) {
        searchParams.append('term', params.term)
      }
      
      // Add location filters
      if (params.provinceId) searchParams.append('provinceId', params.provinceId)
      if (params.cityId) searchParams.append('cityId', params.cityId)
      if (params.districtId) searchParams.append('districtId', params.districtId)

      // Use proxy API route instead of direct API call
      const url = `/api/proxy/reference/${endpoint}/list?${searchParams.toString()}`
      
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'x-api-token': session?.user?.accessToken || '',
          'x-user-agent': 'web',
        },
      })

      const result = await response.json()

      if (!response.ok || !result.status) {
        throw new Error(result.message || result.error || `Failed to fetch ${endpoint}`)
      }

      return result.data
    } catch (error) {
      console.error(`Error fetching ${endpoint}:`, error)
      throw error
    }
  }

  // Fetch provinces
  const fetchProvinces = useCallback(async (searchTerm = '', page = 1, size = 50) => {
    setLoadingProvinces(true)
    try {
      const data = await makeApiCall('province', { term: searchTerm, page, size })
      setProvinces(data.items || [])
      setProvincePagination(data.pagination)
    } catch (error) {
      console.error('Error fetching provinces:', error)
      setProvinces([])
    } finally {
      setLoadingProvinces(false)
    }
  }, [session])

  // Fetch cities based on province
  const fetchCities = useCallback(async (provinceId, searchTerm = '', page = 1, size = 50) => {
    if (!provinceId) {
      setCities([])
      return
    }

    setLoadingCities(true)
    try {
      const data = await makeApiCall('city', { 
        provinceId, 
        term: searchTerm, 
        page, 
        size 
      })
      setCities(data.items || [])
      setCityPagination(data.pagination)
    } catch (error) {
      console.error('Error fetching cities:', error)
      setCities([])
    } finally {
      setLoadingCities(false)
    }
  }, [session])

  // Fetch districts based on province and city
  const fetchDistricts = useCallback(async (provinceId, cityId, searchTerm = '', page = 1, size = 50) => {
    if (!provinceId || !cityId) {
      setDistricts([])
      return
    }

    setLoadingDistricts(true)
    try {
      const data = await makeApiCall('district', { 
        provinceId, 
        cityId, 
        term: searchTerm, 
        page, 
        size 
      })
      setDistricts(data.items || [])
      setDistrictPagination(data.pagination)
    } catch (error) {
      console.error('Error fetching districts:', error)
      setDistricts([])
    } finally {
      setLoadingDistricts(false)
    }
  }, [session])

  // Fetch villages based on province, city, and district
  const fetchVillages = useCallback(async (provinceId, cityId, districtId, searchTerm = '', page = 1, size = 50) => {
    if (!provinceId || !cityId || !districtId) {
      setVillages([])
      return
    }

    setLoadingVillages(true)
    try {
      const data = await makeApiCall('village', { 
        provinceId, 
        cityId, 
        districtId, 
        term: searchTerm, 
        page, 
        size 
      })
      setVillages(data.items || [])
      setVillagePagination(data.pagination)
    } catch (error) {
      console.error('Error fetching villages:', error)
      setVillages([])
    } finally {
      setLoadingVillages(false)
    }
  }, [session])

  // Reset dependent dropdowns when parent changes
  const resetCascadingData = (level) => {
    switch (level) {
      case 'province':
        setCities([])
        setDistricts([])
        setVillages([])
        break
      case 'city':
        setDistricts([])
        setVillages([])
        break
      case 'district':
        setVillages([])
        break
      default:
        break
    }
  }

  // Initialize provinces on mount
  useEffect(() => {
    if (session?.user?.accessToken) {
      fetchProvinces()
    }
  }, [session, fetchProvinces])

  return {
    // Data
    provinces,
    cities,
    districts,
    villages,
    
    // Loading states
    loadingProvinces,
    loadingCities,
    loadingDistricts,
    loadingVillages,
    
    // Pagination info
    provincePagination,
    cityPagination,
    districtPagination,
    villagePagination,
    
    // Functions
    fetchProvinces,
    fetchCities,
    fetchDistricts,
    fetchVillages,
    resetCascadingData,
  }
}