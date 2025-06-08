// Validation utilities for prospect form

export const validatePhoneNumber = (phoneNumber) => {
  const phoneRegex = /^(\+62|62|0)8[1-9][0-9]{6,9}$/
  return phoneRegex.test(phoneNumber)
}

export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export const validateNPWP = (npwp) => {
  // Basic NPWP format validation: XX.XXX.XXX.X-XXX.XXX
  const npwpRegex = /^\d{2}\.\d{3}\.\d{3}\.\d{1}-\d{3}\.\d{3}$/
  return npwpRegex.test(npwp)
}

export const validateKTP = (ktp) => {
  // KTP should be 16 digits
  return /^\d{16}$/.test(ktp)
}

export const validatePostalCode = (postalCode) => {
  // Indonesian postal code is 5 digits
  return /^\d{5}$/.test(postalCode)
}

export const formatPhoneNumber = (value) => {
  // Remove all non-numeric characters
  const cleaned = value.replace(/\D/g, '')
  
  // Format Indonesian phone number
  if (cleaned.startsWith('0')) {
    return cleaned
  } else if (cleaned.startsWith('62')) {
    return '0' + cleaned.substring(2)
  } else if (cleaned.startsWith('8')) {
    return '0' + cleaned
  }
  
  return value
}

export const formatNPWP = (value) => {
  // Remove all non-numeric characters
  const cleaned = value.replace(/\D/g, '')
  
  // Format as XX.XXX.XXX.X-XXX.XXX
  if (cleaned.length >= 15) {
    return cleaned.replace(
      /(\d{2})(\d{3})(\d{3})(\d{1})(\d{3})(\d{3})/,
      '$1.$2.$3.$4-$5.$6'
    )
  } else if (cleaned.length >= 9) {
    return cleaned.replace(
      /(\d{2})(\d{3})(\d{3})(\d{1})?(\d{0,3})?(\d{0,3})?/,
      (match, p1, p2, p3, p4, p5, p6) => {
        let formatted = `${p1}.${p2}.${p3}`
        if (p4) formatted += `.${p4}`
        if (p5) formatted += `-${p5}`
        if (p6) formatted += `.${p6}`
        return formatted
      }
    )
  } else if (cleaned.length >= 6) {
    return cleaned.replace(/(\d{2})(\d{3})(\d{0,3})/, '$1.$2.$3')
  } else if (cleaned.length >= 3) {
    return cleaned.replace(/(\d{2})(\d{0,3})/, '$1.$2')
  }
  
  return cleaned
}

export const getProspectValidationRules = () => ({
  phoneNumber: {
    required: 'Nomor telepon wajib diisi',
    validate: (value) => validatePhoneNumber(value) || 'Format nomor telepon tidak valid'
  },
  fullName: {
    required: 'Nama lengkap wajib diisi',
    minLength: {
      value: 3,
      message: 'Nama lengkap minimal 3 karakter'
    }
  },
  email: {
    validate: (value) => !value || validateEmail(value) || 'Format email tidak valid'
  },
  identityNumber: {
    validate: (value, formValues) => {
      if (!value) return true
      if (formValues.identityType === 'KTP') {
        return validateKTP(value) || 'Nomor KTP harus 16 digit'
      }
      return true
    }
  },
  npwp: {
    validate: (value) => !value || validateNPWP(value) || 'Format NPWP tidak valid'
  },
  postalCode: {
    validate: (value) => !value || validatePostalCode(value) || 'Kode pos harus 5 digit'
  }
})