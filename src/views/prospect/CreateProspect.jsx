'use client';

import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Image from 'next/image'
import { useRouter, useParams } from 'next/navigation';
import { Camera, Save, ArrowLeft} from 'lucide-react';
import { useCreateProspect } from '@src/hooks/useCreateProspect';
import { 
  getProspectValidationRules, 
  formatPhoneNumber, 
  formatNPWP 
} from '@src/utils/prospectValidation';
import { useSession } from 'next-auth/react'; 
import { toast } from 'react-toastify'; 
import { useLocationData } from '@src/hooks/useLocationData';
import SearchableSelect from '@src/components/SearchableSelect';


const CreateProspect = () => {
  const router = useRouter()
  const { createProspectWithPhoto, isLoading } = useCreateProspect()
  const [profilePhoto, setProfilePhoto] = useState(null)
  const [photoPreview, setPhotoPreview] = useState(null)

  // Location data hook
  const {
    provinces,
    cities,
    districts,
    villages,
    loadingProvinces,
    loadingCities,
    loadingDistricts,
    loadingVillages,
    fetchCities,
    fetchDistricts,
    fetchVillages,
    resetCascadingData,
  } = useLocationData()

  const validationRules = getProspectValidationRules()
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm({
    defaultValues: {
      phoneNumber: '',
      fullName: '',
      nickName: '',
      birthPlace: '',
      birthDate: '',
      gender: 'Male',
      religion: 'Islam',
      motherName: '',
      maritalStatus: 'Single',
      identityType: 'KTP',
      identityNumber: '',
      identityExpiredDate: '',
      address: '',
      rt: '',
      rw: '',
      provinceId: '',
      provinceName: '',
      cityId: '',
      cityName: '',
      villageId: '',
      villageName: '',
      districtId: '',
      districtName: '',
      postalCode: '',
      npwp: '',
      email: '',
      occupation: '',
      fundPurposeId: '',
      fundPurposeName: '',
      fundSourceId: '',
      fundSourceName: '',
      annualIncomeId: '',
      annualIncomeName: '',
    },
  })

  // Handle auto-format for phone and NPWP
  const handlePhoneChange = (e) => {
    const formatted = formatPhoneNumber(e.target.value)
    setValue('phoneNumber', formatted)
  }

  const handleNPWPChange = (e) => {
    const formatted = formatNPWP(e.target.value)
    setValue('npwp', formatted)
  }

  // Handle location selection changes
  const handleProvinceChange = (province) => {
    setValue('provinceId', province.id)
    setValue('provinceName', province.name)
    
    // Reset dependent fields
    setValue('cityId', '')
    setValue('cityName', '')
    setValue('districtId', '')
    setValue('districtName', '')
    setValue('villageId', '')
    setValue('villageName', '')
    setValue('postalCode', '')
    
    // Reset cascading data and fetch cities
    resetCascadingData('province')
    fetchCities(province.id)
  }

  const handleCityChange = (city) => {
    const selectedProvinceId = watch('provinceId')
    
    setValue('cityId', city.id)
    setValue('cityName', city.name)
    
    // Reset dependent fields
    setValue('districtId', '')
    setValue('districtName', '')
    setValue('villageId', '')
    setValue('villageName', '')
    setValue('postalCode', '')
    
    // Reset cascading data and fetch districts
    resetCascadingData('city')
    fetchDistricts(selectedProvinceId, city.id)
  }

  const handleDistrictChange = (district) => {
    const selectedProvinceId = watch('provinceId')
    const selectedCityId = watch('cityId')
    
    setValue('districtId', district.id)
    setValue('districtName', district.name)
    
    // Reset dependent fields
    setValue('villageId', '')
    setValue('villageName', '')
    setValue('postalCode', '')
    
    // Reset cascading data and fetch villages
    resetCascadingData('district')
    fetchVillages(selectedProvinceId, selectedCityId, district.id)
  }

  const handleVillageChange = (village) => {
    setValue('villageId', village.id)
    setValue('villageName', village.name)
    
    // Auto-fill postal code if available
    if (village.postalCode) {
      setValue('postalCode', village.postalCode)
    }
  }

 
  // Auto-fill fund purpose and source names based on ID selection
  const handleFundPurposeChange = (e) => {
    const selectedId = e.target.value
    const selectedOption = fundPurposeOptions.find(opt => opt.value === selectedId)
    setValue('fundPurposeId', selectedId)
    if (selectedOption) {
      setValue('fundPurposeName', selectedOption.label)
    }
  }

  const handleFundSourceChange = (e) => {
    const selectedId = e.target.value
    const selectedOption = fundSourceOptions.find(opt => opt.value === selectedId)
    setValue('fundSourceId', selectedId)
    if (selectedOption) {
      setValue('fundSourceName', selectedOption.label)
    }
  }

  const handleAnnualIncomeChange = (e) => {
    const selectedId = e.target.value
    const selectedOption = annualIncomeOptions.find(opt => opt.value === selectedId)
    setValue('annualIncomeId', selectedId)
    if (selectedOption) {
      setValue('annualIncomeName', selectedOption.label)
    }
  }

  const handlePhotoChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setProfilePhoto(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setPhotoPreview(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const onSubmit = async (data) => {
    console.log('[CreateProspect] Form submitted with data:', data)
    
    const result = await createProspectWithPhoto(data, profilePhoto)
    
    // Check if creation was successful
    if (result.status && result.code === '000') {
      console.log('[CreateProspect] Success, redirecting to prospect list')
      router.push('/prospect/list') // Redirect to prospect list
    } else {
      console.log('[CreateProspect] Creation failed:', result)
      // Error message already shown by the hook, just stay on the form
      // User can correct the data and try again
    }
  }

  const genderOptions = [
    { value: 'Male', label: 'Laki-laki' },
    { value: 'Female', label: 'Perempuan' },
  ]

  const religionOptions = [
    { value: 'Islam', label: 'Islam' },
    { value: 'Kristen', label: 'Kristen' },
    { value: 'Katolik', label: 'Katolik' },
    { value: 'Hindu', label: 'Hindu' },
    { value: 'Buddha', label: 'Buddha' },
    { value: 'Konghucu', label: 'Konghucu' },
  ]

  const maritalStatusOptions = [
    { value: 'Single', label: 'Belum Menikah' },
    { value: 'Married', label: 'Menikah' },
    { value: 'Divorced', label: 'Cerai' },
    { value: 'Widowed', label: 'Janda/Duda' },
  ]

  const identityTypeOptions = [
    { value: 'KTP', label: 'KTP' },
    { value: 'SIM', label: 'SIM' },
    { value: 'Passport', label: 'Passport' },
  ]

  const fundPurposeOptions = [
    { value: '01', label: 'Investasi' },
    { value: '02', label: 'Tabungan' },
    { value: '03', label: 'Bisnis' },
  ]

  const fundSourceOptions = [
    { value: '01', label: 'Gaji' },
    { value: '02', label: 'Bisnis' },
    { value: '03', label: 'Investasi' },
  ]

  const annualIncomeOptions = [
    { value: '01', label: 'Dibawah Rp50.000.000' },
    { value: '02', label: 'Rp50.000.000 - Rp100.000.000' },
    { value: '03', label: 'Rp100.000.000 - Rp250.000.000' },
    { value: '04', label: 'Diatas Rp250.000.000' },
  ]

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-800">
            <ArrowLeft className="size-4" />
            Kembali
          </button>
          <h1 className="text-2xl font-bold text-gray-800">Tambah Prospect Baru</h1>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Profile Photo Section */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Foto Profil</h2>
          <div className="flex items-center gap-6">
            <div className="relative">
              <div className="w-24 h-24 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center overflow-hidden">
                {photoPreview ? (
                  <Image
                    src={photoPreview}
                    alt="Preview"
                    width={96}
                    height={96}
                    className="w-full h-full object-cover rounded-full"
                  />
                ) : (
                  <Camera className="size-8 text-gray-400" />
                )}
              </div>
              <input
                type="file"
                accept="image/*"
                onChange={handlePhotoChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
            </div>
            <div>
              <p className="text-sm text-gray-600">
                Klik untuk upload foto profil
              </p>
              <p className="text-xs text-gray-500">
                Format: JPG, PNG. Maksimal 2MB
              </p>
            </div>
          </div>
        </div>

        {/* Personal Information */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Informasi Pribadi</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="form-label">Nomor Telepon *</label>
              <input
                type="tel"
                {...register('phoneNumber', validationRules.phoneNumber)}
                onChange={handlePhoneChange}
                className="form-input"
                placeholder="08123456789"
              />
              {errors.phoneNumber && (
                <p className="text-red-500 text-sm mt-1">{errors.phoneNumber.message}</p>
              )}
            </div>

            <div>
              <label className="form-label">Nama Lengkap *</label>
              <input
                type="text"
                {...register('fullName', validationRules.fullName)}
                className="form-input"
                placeholder="John Doe"
              />
              {errors.fullName && (
                <p className="text-red-500 text-sm mt-1">{errors.fullName.message}</p>
              )}
            </div>

            <div>
              <label className="form-label">Nama Panggilan</label>
              <input
                type="text"
                {...register('nickName')}
                className="form-input"
                placeholder="Johnny"
              />
            </div>

            <div>
              <label className="form-label">Tempat Lahir</label>
              <input
                type="text"
                {...register('birthPlace')}
                className="form-input"
                placeholder="Bandung"
              />
            </div>

            <div>
              <label className="form-label">Tanggal Lahir</label>
              <input
                type="date"
                {...register('birthDate')}
                className="form-input"
              />
            </div>

            <div>
              <label className="form-label">Jenis Kelamin</label>
              <select {...register('gender')} className="form-input">
                {genderOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="form-label">Agama</label>
              <select {...register('religion')} className="form-input">
                {religionOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="form-label">Nama Ibu Kandung</label>
              <input
                type="text"
                {...register('motherName')}
                className="form-input"
                placeholder="Jane Doe"
              />
            </div>

            <div>
              <label className="form-label">Status Pernikahan</label>
              <select {...register('maritalStatus')} className="form-input">
                {maritalStatusOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="form-label">Email</label>
              <input
                type="email"
                {...register('email', validationRules.email)}
                className="form-input"
                placeholder="johndoe@example.com"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
              )}
            </div>

            <div>
              <label className="form-label">Pekerjaan</label>
              <input
                type="text"
                {...register('occupation')}
                className="form-input"
                placeholder="Software Engineer"
              />
            </div>
          </div>
        </div>

        {/* Identity Information */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Informasi Identitas</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="form-label">Jenis Identitas</label>
              <select {...register('identityType')} className="form-input">
                {identityTypeOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="form-label">Nomor Identitas</label>
              <input
                type="text"
                {...register('identityNumber', validationRules.identityNumber)}
                className="form-input"
                placeholder="012312312"
                maxLength={watch('identityType') === 'KTP' ? 16 : 20}
              />
              {errors.identityNumber && (
                <p className="text-red-500 text-sm mt-1">{errors.identityNumber.message}</p>
              )}
            </div>

            <div>
              <label className="form-label">Tanggal Berakhir Identitas</label>
              <input
                type="date"
                {...register('identityExpiredDate')}
                className="form-input"
              />
            </div>

            <div>
              <label className="form-label">NPWP</label>
              <input
                type="text"
                {...register('npwp', validationRules.npwp)}
                onChange={handleNPWPChange}
                className="form-input"
                placeholder="12.345.678.9-012.000"
                maxLength={20}
              />
              {errors.npwp && (
                <p className="text-red-500 text-sm mt-1">{errors.npwp.message}</p>
              )}
            </div>
          </div>
        </div>

        {/* Address Information */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Informasi Alamat</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="form-label">Alamat Lengkap</label>
              <textarea
                {...register('address')}
                className="form-input"
                rows="3"
                placeholder="Jl. Merdeka No.123"
              />
            </div>

            <div>
              <label className="form-label">RT</label>
              <input
                type="text"
                {...register('rt')}
                className="form-input"
                placeholder="01"
              />
            </div>

            <div>
              <label className="form-label">RW</label>
              <input
                type="text"
                {...register('rw')}
                className="form-input"
                placeholder="05"
              />
            </div>

            {/* Province Dropdown */}
            <SearchableSelect
              label="Provinsi"
              placeholder="Pilih Provinsi"
              searchPlaceholder="Cari provinsi..."
              options={provinces}
              loading={loadingProvinces}
              value={watch('provinceId')}
              onSelect={handleProvinceChange}
              onSearch={(term) => {
                // Optional: implement province search if needed
                console.log('Search provinces:', term)
              }}
              className="col-span-12 md:col-span-6"
            />

            {/* City Dropdown */}
            <SearchableSelect
              label="Kota/Kabupaten"
              placeholder="Pilih Kota/Kabupaten"
              searchPlaceholder="Cari kota..."
              options={cities}
              loading={loadingCities}
              value={watch('cityId')}
              onSelect={handleCityChange}
              onSearch={(term) => {
                const provinceId = watch('provinceId')
                if (provinceId) {
                  fetchCities(provinceId, term)
                }
              }}
              disabled={!watch('provinceId')}
              className="col-span-12 md:col-span-6"
            />

            {/* District Dropdown */}
            <SearchableSelect
              label="Kecamatan"
              placeholder="Pilih Kecamatan"
              searchPlaceholder="Cari kecamatan..."
              options={districts}
              loading={loadingDistricts}
              value={watch('districtId')}
              onSelect={handleDistrictChange}
              onSearch={(term) => {
                const provinceId = watch('provinceId')
                const cityId = watch('cityId')
                if (provinceId && cityId) {
                  fetchDistricts(provinceId, cityId, term)
                }
              }}
              disabled={!watch('cityId')}
              className="col-span-12 md:col-span-6"
            />

            {/* Village Dropdown */}
            <SearchableSelect
              label="Kelurahan/Desa"
              placeholder="Pilih Kelurahan/Desa"
              searchPlaceholder="Cari kelurahan..."
              options={villages}
              loading={loadingVillages}
              value={watch('villageId')}
              onSelect={handleVillageChange}
              onSearch={(term) => {
                const provinceId = watch('provinceId')
                const cityId = watch('cityId')
                const districtId = watch('districtId')
                if (provinceId && cityId && districtId) {
                  fetchVillages(provinceId, cityId, districtId, term)
                }
              }}
              disabled={!watch('districtId')}
              className="col-span-12 md:col-span-6"
            />

            {/* Postal Code - Auto-filled but editable */}
            <div className="col-span-12 md:col-span-6">
              <label className="form-label">Kode Pos</label>
              <input
                type="text"
                {...register('postalCode', validationRules.postalCode)}
                className="form-input"
                placeholder="40114"
                maxLength={5}
              />
              {errors.postalCode && (
                <p className="text-red-500 text-sm mt-1">{errors.postalCode.message}</p>
              )}
            </div>
          </div>
        </div>

        {/* Financial Information */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Informasi Keuangan</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="form-label">ID Tujuan Dana</label>
              <select 
                {...register('fundPurposeId')} 
                onChange={handleFundPurposeChange}
                className="form-input"
              >
                <option value="">Pilih Tujuan Dana</option>
                {fundPurposeOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="form-label">Nama Tujuan Dana</label>
              <input
                type="text"
                {...register('fundPurposeName')}
                className="form-input bg-gray-50"
                placeholder="Investasi"
                readOnly
              />
            </div>

            <div>
              <label className="form-label">ID Sumber Dana</label>
              <select 
                {...register('fundSourceId')} 
                onChange={handleFundSourceChange}
                className="form-input"
              >
                <option value="">Pilih Sumber Dana</option>
                {fundSourceOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="form-label">Nama Sumber Dana</label>
              <input
                type="text"
                {...register('fundSourceName')}
                className="form-input bg-gray-50"
                placeholder="Gaji"
                readOnly
              />
            </div>

            <div>
              <label className="form-label">ID Pendapatan Tahunan</label>
              <select 
                {...register('annualIncomeId')} 
                onChange={handleAnnualIncomeChange}
                className="form-input"
              >
                <option value="">Pilih Pendapatan Tahunan</option>
                {annualIncomeOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="form-label">Nama Pendapatan Tahunan</label>
              <input
                type="text"
                {...register('annualIncomeName')}
                className="form-input bg-gray-50"
                placeholder="Rp100.000.000 - Rp250.000.000"
                readOnly
              />
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={() => router.back()}
            className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">
            Batal
          </button>
          <button
            type="submit"
            disabled={isLoading}
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 flex items-center gap-2">
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                Menyimpan...
              </>
            ) : (
              <>
                <Save className="size-4" />
                Simpan Prospect
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  )
}

export default CreateProspect