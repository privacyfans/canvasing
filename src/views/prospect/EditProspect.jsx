'use client';

import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Image from 'next/image';
import { useRouter, useParams } from 'next/navigation';
import { Camera, Save, ArrowLeft, Loader2, Info, Upload, AlertCircle, CheckCircle } from 'lucide-react';
import { toast } from 'react-toastify'; 
import { useEditProspect } from '@src/hooks/useEditProspect';
import { useAuthHandler } from '@src/hooks/useAuthHandler';
import { useLocationData } from '@src/hooks/useLocationData';
import SearchableSelect from '@src/components/SearchableSelect';
import { 
  getProspectValidationRules, 
  formatPhoneNumber, 
  formatNPWP 
} from '@src/utils/prospectValidation';
import ProfilePicture from '@src/components/ui/ProfilePicture';
import DocumentManager from '@src/components/prospect/DocumentManager';

const EditProspect = () => {
  const router = useRouter();
  const params = useParams();
  const prospectId = params?.id;
  
  // Auth handling
  const { isAuthenticated, isLoading: authLoading, hasError: authError } = useAuthHandler();
  
  const { 
    prospectData, 
    isLoadingProspect, 
    updateProspectSafe,
    updateProfilePicture,
    updateProspectWithPhoto,
    isLoading 
  } = useEditProspect(prospectId);
  
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [isFormReady, setIsFormReady] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

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
  } = useLocationData();

  const validationRules = getProspectValidationRules();
  
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    setValue,
    watch,
    reset,
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
  });

  // Populate form when prospect data is loaded
  useEffect(() => {
    if (prospectData && !isFormReady) {
      console.log('[EditProspect] Populating form with prospect data:', prospectData);
      
      // Create a clean data object with proper fallbacks
      const formValues = {
        phoneNumber: prospectData.phoneNumber || '',
        fullName: prospectData.fullName || '',
        nickName: prospectData.nickName || '',
        birthPlace: prospectData.birthPlace || '',
        birthDate: prospectData.birthDate || '',
        gender: prospectData.gender || 'Male',
        religion: prospectData.religion || 'Islam',
        motherName: prospectData.motherName || '',
        maritalStatus: prospectData.maritalStatus || 'Single',
        identityType: prospectData.identityType || 'KTP',
        identityNumber: prospectData.identityNumber || '',
        identityExpiredDate: prospectData.identityExpiredDate || '',
        address: prospectData.address || '',
        rt: prospectData.rt || '',
        rw: prospectData.rw || '',
        provinceId: prospectData.provinceId || '',
        provinceName: prospectData.provinceName || '',
        cityId: prospectData.cityId || '',
        cityName: prospectData.cityName || '',
        villageId: prospectData.villageId || '',
        villageName: prospectData.villageName || '',
        districtId: prospectData.districtId || '',
        districtName: prospectData.districtName || '',
        postalCode: prospectData.postalCode || '',
        npwp: prospectData.npwp || '',
        email: prospectData.email || '',
        occupation: prospectData.occupation || '',
        fundPurposeId: prospectData.fundPurposeId || '',
        fundPurposeName: prospectData.fundPurposeName || '',
        fundSourceId: prospectData.fundSourceId || '',
        fundSourceName: prospectData.fundSourceName || '',
        annualIncomeId: prospectData.annualIncomeId || '',
        annualIncomeName: prospectData.annualIncomeName || '',
      };

      console.log('[EditProspect] Form values prepared:', {
        provinceId: formValues.provinceId,
        cityId: formValues.cityId,
        districtId: formValues.districtId,
        villageId: formValues.villageId
      });

      // Reset form with proper values
      reset(formValues);

      // Set profile photo preview if exists
      if (prospectData.profilePicture) {
        setPhotoPreview(prospectData.profilePicture);
      }

      // Load cascading location data based on existing values
      if (formValues.provinceId) {
        console.log('[EditProspect] Loading cities for province:', formValues.provinceId);
        fetchCities(formValues.provinceId).then(() => {
          console.log('[EditProspect] Cities loaded');
        });
        
        if (formValues.cityId) {
          setTimeout(() => {
            console.log('[EditProspect] Loading districts for city:', formValues.cityId);
            fetchDistricts(formValues.provinceId, formValues.cityId).then(() => {
              console.log('[EditProspect] Districts loaded');
            });
          }, 500);
          
          if (formValues.districtId) {
            setTimeout(() => {
              console.log('[EditProspect] Loading villages for district:', formValues.districtId);
              fetchVillages(formValues.provinceId, formValues.cityId, formValues.districtId).then(() => {
                console.log('[EditProspect] Villages loaded');
              });
            }, 1000);
          }
        }
      }

      setIsFormReady(true);
    }
  }, [prospectData, reset, fetchCities, fetchDistricts, fetchVillages, isFormReady]);

  // Track form changes
  useEffect(() => {
    setHasUnsavedChanges(isDirty || profilePhoto !== null);
  }, [isDirty, profilePhoto]);

  // Monitor location values changes (for debugging)
  useEffect(() => {
    console.log('[EditProspect] Location values changed:', {
      provinceId: watch('provinceId'),
      cityId: watch('cityId'),
      districtId: watch('districtId'),
      villageId: watch('villageId'),
      arrays: {
        provinces: provinces.length,
        cities: cities.length,
        districts: districts.length,
        villages: villages.length
      }
    });
  }, [watch('provinceId'), watch('cityId'), watch('districtId'), watch('villageId'), 
      provinces.length, cities.length, districts.length, villages.length]);

  // Handle auto-format for phone and NPWP
  const handlePhoneChange = (e) => {
    const formatted = formatPhoneNumber(e.target.value);
    setValue('phoneNumber', formatted, { shouldDirty: true });
  };

  const handleNPWPChange = (e) => {
    const formatted = formatNPWP(e.target.value);
    setValue('npwp', formatted, { shouldDirty: true });
  };

  // Handle location selection changes
  const handleProvinceChange = (province) => {
    console.log('[EditProspect] Province changed:', province);
    setValue('provinceId', province.id, { shouldDirty: true });
    setValue('provinceName', province.name, { shouldDirty: true });
    
    // Reset dependent fields
    setValue('cityId', '', { shouldDirty: true });
    setValue('cityName', '', { shouldDirty: true });
    setValue('districtId', '', { shouldDirty: true });
    setValue('districtName', '', { shouldDirty: true });
    setValue('villageId', '', { shouldDirty: true });
    setValue('villageName', '', { shouldDirty: true });
    setValue('postalCode', '', { shouldDirty: true });
    
    // Reset cascading data and fetch cities
    resetCascadingData('province');
    fetchCities(province.id);
  };

  const handleCityChange = (city) => {
    console.log('[EditProspect] City changed:', city);
    const selectedProvinceId = watch('provinceId');
    
    setValue('cityId', city.id, { shouldDirty: true });
    setValue('cityName', city.name, { shouldDirty: true });
    
    // Reset dependent fields
    setValue('districtId', '', { shouldDirty: true });
    setValue('districtName', '', { shouldDirty: true });
    setValue('villageId', '', { shouldDirty: true });
    setValue('villageName', '', { shouldDirty: true });
    setValue('postalCode', '', { shouldDirty: true });
    
    // Reset cascading data and fetch districts
    resetCascadingData('city');
    fetchDistricts(selectedProvinceId, city.id);
  };

  const handleDistrictChange = (district) => {
    console.log('[EditProspect] District changed:', district);
    const selectedProvinceId = watch('provinceId');
    const selectedCityId = watch('cityId');
    
    setValue('districtId', district.id, { shouldDirty: true });
    setValue('districtName', district.name, { shouldDirty: true });
    
    // Reset dependent fields
    setValue('villageId', '', { shouldDirty: true });
    setValue('villageName', '', { shouldDirty: true });
    setValue('postalCode', '', { shouldDirty: true });
    
    // Reset cascading data and fetch villages
    resetCascadingData('district');
    fetchVillages(selectedProvinceId, selectedCityId, district.id);
  };

  const handleVillageChange = (village) => {
    console.log('[EditProspect] Village changed:', village);
    setValue('villageId', village.id, { shouldDirty: true });
    setValue('villageName', village.name, { shouldDirty: true });
    
    // Auto-fill postal code if available
    if (village.postalCode) {
      setValue('postalCode', village.postalCode, { shouldDirty: true });
    } else {
      // Clear postal code if not available
      setValue('postalCode', '', { shouldDirty: true });
    }
  };

  // Auto-fill fund purpose and source names based on ID selection
  const handleFundPurposeChange = (e) => {
    const selectedId = e.target.value;
    const selectedOption = fundPurposeOptions.find(opt => opt.value === selectedId);
    setValue('fundPurposeId', selectedId, { shouldDirty: true });
    if (selectedOption) {
      setValue('fundPurposeName', selectedOption.label, { shouldDirty: true });
    }
  };

  const handleFundSourceChange = (e) => {
    const selectedId = e.target.value;
    const selectedOption = fundSourceOptions.find(opt => opt.value === selectedId);
    setValue('fundSourceId', selectedId, { shouldDirty: true });
    if (selectedOption) {
      setValue('fundSourceName', selectedOption.label, { shouldDirty: true });
    }
  };

  const handleAnnualIncomeChange = (e) => {
    const selectedId = e.target.value;
    const selectedOption = annualIncomeOptions.find(opt => opt.value === selectedId);
    setValue('annualIncomeId', selectedId, { shouldDirty: true });
    if (selectedOption) {
      setValue('annualIncomeName', selectedOption.label, { shouldDirty: true });
    }
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file size (max 2MB)
      if (file.size > 2 * 1024 * 1024) {
        toast.error('File size must be less than 2MB');
        return;
      }

      // Validate file type
      if (!file.type.startsWith('image/')) {
        toast.error('Please select an image file');
        return;
      }

      setProfilePhoto(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle only profile picture update
  const handleUpdateProfilePicture = async () => {
    if (!profilePhoto) {
      toast.error('Please select a photo first');
      return;
    }

    try {
      // Convert file to base64
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64 = reader.result.split(',')[1];
        await updateProfilePicture(base64);
        // Clear the selected photo after successful upload
        setProfilePhoto(null);
        // Keep the preview updated with the new image
      };
      reader.readAsDataURL(profilePhoto);
    } catch (error) {
      console.error('Error updating profile picture:', error);
    }
  };

  // Handle save form data with new API
  const handleSaveData = async (data) => {
    try {
      if (profilePhoto) {
        // If there's a new photo, update both data and photo
        await updateProspectWithPhoto(data, profilePhoto);
        setProfilePhoto(null); // Clear after successful update
      } else {
        // Just update the prospect data
        await updateProspectSafe(data);
      }
      
      // Reset form dirty state
      reset(data);
      setHasUnsavedChanges(false);
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };

  // Show loading/error states for authentication
  if (authLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <Loader2 className="size-8 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Checking authentication...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated || authError) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <AlertCircle className="size-12 text-red-500 mx-auto mb-4" />
          <p className="text-red-600 mb-4">Authentication required</p>
          <button
            onClick={() => router.push('/auth/signin-basic')}
            className="btn btn-primary">
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  // Show loading spinner while fetching prospect data
  if (isLoadingProspect) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <Loader2 className="size-8 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading prospect data...</p>
        </div>
      </div>
    );
  }

  // Show error if prospect not found
  if (!prospectData && !isLoadingProspect) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <AlertCircle className="size-12 text-red-500 mx-auto mb-4" />
          <p className="text-red-600 mb-4">Prospect not found</p>
          <button
            onClick={() => router.back()}
            className="btn btn-gray">
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const genderOptions = [
    { value: 'Male', label: 'Laki-laki' },
    { value: 'Female', label: 'Perempuan' },
  ];

  const religionOptions = [
    { value: 'Islam', label: 'Islam' },
    { value: 'Kristen', label: 'Kristen' },
    { value: 'Katolik', label: 'Katolik' },
    { value: 'Hindu', label: 'Hindu' },
    { value: 'Buddha', label: 'Buddha' },
    { value: 'Konghucu', label: 'Konghucu' },
  ];

  const maritalStatusOptions = [
    { value: 'Single', label: 'Belum Menikah' },
    { value: 'Married', label: 'Menikah' },
    { value: 'Divorced', label: 'Cerai' },
    { value: 'Widowed', label: 'Janda/Duda' },
  ];

  const identityTypeOptions = [
    { value: 'KTP', label: 'KTP' },
    { value: 'SIM', label: 'SIM' },
    { value: 'Passport', label: 'Passport' },
  ];

  const fundPurposeOptions = [
    { value: '01', label: 'Investasi' },
    { value: '02', label: 'Tabungan' },
    { value: '03', label: 'Bisnis' },
  ];

  const fundSourceOptions = [
    { value: '01', label: 'Gaji' },
    { value: '02', label: 'Bisnis' },
    { value: '03', label: 'Investasi' },
  ];

  const annualIncomeOptions = [
    { value: '01', label: 'Dibawah Rp50.000.000' },
    { value: '02', label: 'Rp50.000.000 - Rp100.000.000' },
    { value: '03', label: 'Rp100.000.000 - Rp250.000.000' },
    { value: '04', label: 'Diatas Rp250.000.000' },
  ];

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
          <h1 className="text-2xl font-bold text-gray-800">
            Edit Prospect: {prospectData?.fullName || 'Loading...'}
          </h1>
        </div>
        
        {/* Unsaved changes indicator */}
        {hasUnsavedChanges && (
          <div className="flex items-center gap-2 text-amber-600">
            <AlertCircle className="size-4" />
            <span className="text-sm">Ada perubahan yang belum disimpan</span>
          </div>
        )}
      </div>

      {/* API Status Notice */}
      {/* <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
        <div className="flex items-start gap-3">
          <CheckCircle className="size-5 text-green-600 mt-0.5" />
          <div>
            <h3 className="font-medium text-green-900">API Update Available</h3>
            <p className="text-green-700 text-sm mt-1">
              Sekarang Anda dapat mengedit dan menyimpan data prospect. 
              Perubahan akan langsung tersinkronisasi dengan server.
            </p>
          </div>
        </div>
      </div> */}

      <form onSubmit={handleSubmit(handleSaveData)} className="space-y-6">
        {/* Profile Photo Section */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Foto Profil</h2>
          <div className="flex items-center gap-6">
            <div className="relative">
              <div className="w-24 h-24 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center overflow-hidden">
                {photoPreview ? (
                  // <Image
                  //   src={photoPreview}
                  //   alt="Preview"
                  //   width={96}
                  //   height={96}
                  //   className="w-full h-full object-cover rounded-full"
                  // />
                   <ProfilePicture
                            base64Image={photoPreview}
                            alt={'Profile'}
                            size="xl"
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
            <div className="flex-1">
              <p className="text-sm text-gray-600">
                Klik untuk {photoPreview ? 'ganti' : 'upload'} foto profil
              </p>
              <p className="text-xs text-gray-500">
                Format: JPG, PNG. Maksimal 2MB
              </p>
              {profilePhoto && (
                <div className="mt-3 flex gap-2">
                  <button
                    type="button"
                    onClick={handleUpdateProfilePicture}
                    disabled={isLoading}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 flex items-center gap-2 text-sm">
                    {isLoading ? (
                      <>
                        <Loader2 className="size-4 animate-spin" />
                        Uploading...
                      </>
                    ) : (
                      <>
                        <Upload className="size-4" />
                        Update Foto Saja
                      </>
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setProfilePhoto(null);
                      setPhotoPreview(prospectData?.profilePicture || null);
                    }}
                    className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 text-sm">
                    Batal
                  </button>
                </div>
              )}
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
              label="Provinsi *"
              placeholder="Pilih Provinsi"
              searchPlaceholder="Cari provinsi..."
              options={provinces}
              loading={loadingProvinces}
              value={watch('provinceId')}
              onSelect={handleProvinceChange}
              onSearch={(term) => {
                // Optional: implement province search if needed
                console.log('Search provinces:', term);
              }}
              className="col-span-12 md:col-span-6"
            />

            {/* City Dropdown */}
            <SearchableSelect
              label="Kota/Kabupaten *"
              placeholder="Pilih Kota/Kabupaten"
              searchPlaceholder="Cari kota..."
              options={cities}
              loading={loadingCities}
              value={watch('cityId')}
              onSelect={handleCityChange}
              onSearch={(term) => {
                const provinceId = watch('provinceId');
                if (provinceId) {
                  fetchCities(provinceId, term);
                }
              }}
              disabled={!watch('provinceId')}
              className="col-span-12 md:col-span-6"
            />

            {/* District Dropdown */}
            <SearchableSelect
              label="Kecamatan *"
              placeholder="Pilih Kecamatan"
              searchPlaceholder="Cari kecamatan..."
              options={districts}
              loading={loadingDistricts}
              value={watch('districtId')}
              onSelect={handleDistrictChange}
              onSearch={(term) => {
                const provinceId = watch('provinceId');
                const cityId = watch('cityId');
                if (provinceId && cityId) {
                  fetchDistricts(provinceId, cityId, term);
                }
              }}
              disabled={!watch('cityId')}
              className="col-span-12 md:col-span-6"
            />

            {/* Village Dropdown */}
            <SearchableSelect
              label="Kelurahan/Desa *"
              placeholder="Pilih Kelurahan/Desa"
              searchPlaceholder="Cari kelurahan..."
              options={villages}
              loading={loadingVillages}
              value={watch('villageId')}
              onSelect={handleVillageChange}
              onSearch={(term) => {
                const provinceId = watch('provinceId');
                const cityId = watch('cityId');
                const districtId = watch('districtId');
                if (provinceId && cityId && districtId) {
                  fetchVillages(provinceId, cityId, districtId, term);
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
                {...register('postalCode')}
                className="form-input"
                placeholder="40114"
                readOnly={!!watch('villageId')}
              />
              {!watch('villageId') && (
                <p className="text-sm text-gray-500 mt-1">Kode pos akan terisi otomatis setelah memilih kelurahan/desa</p>
              )}
            </div>

            {/* Hidden fields to store names */}
            <input type="hidden" {...register('provinceName')} />
            <input type="hidden" {...register('cityName')} />
            <input type="hidden" {...register('districtName')} />
            <input type="hidden" {...register('villageName')} />
          </div>
        </div>

        {/* Financial Information */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Informasi Keuangan</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="form-label">Tujuan Dana</label>
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
              <label className="form-label">Sumber Dana</label>
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
              <label className="form-label">Pendapatan Tahunan</label>
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

        {/* Documents Section */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Dokumen Prospect</h2>
          <DocumentManager 
            prospectId={prospectId} 
            isOpen={true}
          />
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={() => router.back()}
            className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">
            Kembali
          </button>
          
          <button
            type="submit"
            disabled={isLoading || (!isDirty && !profilePhoto)}
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2">
            {isLoading ? (
              <>
                <Loader2 className="size-4 animate-spin" />
                Menyimpan...
              </>
            ) : (
              <>
                <Save className="size-4" />
                Simpan Perubahan
              </>
            )}
          </button>
        </div>

        {/* Development Debug Info */}
         {/* 
        {process.env.NODE_ENV === 'development' && (
          <div className="bg-gray-100 rounded-lg p-4 mt-6">
            <h3 className="font-medium text-gray-800 mb-2">Debug Info (Development Only)</h3>
            <div className="text-sm text-gray-600 space-y-1">
              <p>Prospect ID: {prospectId}</p>
              <p>Authenticated: {isAuthenticated ? 'Yes' : 'No'}</p>
              <p>Prospect Data Loaded: {prospectData ? 'Yes' : 'No'}</p>
              <p>Form Ready: {isFormReady ? 'Yes' : 'No'}</p>
              <p>Form Dirty: {isDirty ? 'Yes' : 'No'}</p>
              <p>Has Unsaved Changes: {hasUnsavedChanges ? 'Yes' : 'No'}</p>
              <p>Profile Photo Selected: {profilePhoto ? 'Yes' : 'No'}</p>
              {prospectData && (
                <p>Profile Picture URL: {prospectData.profilePicture || 'None'}</p>
              )}
              
              
              <div className="mt-4 pt-2 border-t border-gray-300">
                <h4 className="font-medium text-gray-700 mb-1">Location Data:</h4>
                <p>Province ID: {watch('provinceId') || 'None'} | Name: {watch('provinceName') || 'None'}</p>
                <p>City ID: {watch('cityId') || 'None'} | Name: {watch('cityName') || 'None'}</p>
                <p>District ID: {watch('districtId') || 'None'} | Name: {watch('districtName') || 'None'}</p>
                <p>Village ID: {watch('villageId') || 'None'} | Name: {watch('villageName') || 'None'}</p>
                <p>Postal Code: {watch('postalCode') || 'None'}</p>
                <p>Provinces Count: {provinces.length}</p>
                <p>Cities Count: {cities.length}</p>
                <p>Districts Count: {districts.length}</p>
                <p>Villages Count: {villages.length}</p>
                <p>Loading States: P:{loadingProvinces ? 'T' : 'F'} | C:{loadingCities ? 'T' : 'F'} | D:{loadingDistricts ? 'T' : 'F'} | V:{loadingVillages ? 'T' : 'F'}</p>
              </div>
            </div>
          </div>
        )}
          */}
      </form>
    </div>
  );
};

export default EditProspect;