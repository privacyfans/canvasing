// phone number validation
export const formatPhoneNumber = (value) => {
  const cleaned = value.replace(/\D/g, '') // Remove any non-numeric characters
  const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/)
  if (match) {
    return `(${match[1]}) ${match[2]} ${match[3]}`
  }
  return value
}

export const handleFileUpload = (
  file,
  setPreview,
  setValue,
  setError,
  fieldName // Dynamic field name based on the generic type
) => {
  // Clear any previous errors
  setError(fieldName, { type: 'manual', message: '' })

  // Validate file presence
  if (!file) {
    setError(fieldName, { type: 'manual', message: 'File is required' })
    return false
  }

  // Validate file type
  const validTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/gif']
  if (!validTypes.includes(file.type)) {
    setError(fieldName, {
      type: 'manual',
      message:
        'Invalid file type. Please select an image file (.png, .jpg, .jpeg)',
    })
    return false
  }

  // Read the file
  const reader = new FileReader()
  reader.onloadend = () => {
    setPreview(reader.result)
    setValue(fieldName, file) // No casting needed here
  }
  reader.readAsDataURL(file)

  return true // No error occurred
}

// validate fields
export const validateField = (
  fieldName,
  type, // Added "date" type
  value
) => {
  const validations = {
    required: `${fieldName} is required.`,
    pattern: '',
  }

  // Check for required field
  if (!value) {
    return validations
  }

  if (type === 'email') {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    if (!emailRegex.test(value)) {
      validations.pattern = `Please enter a valid ${fieldName}.`
    }
  }

  if (type === 'phone') {
    const phoneRegex = /^\d{10}$/ // Check for exactly 10 digits
    if (!phoneRegex.test(value.replace(/\D/g, ''))) {
      validations.pattern = `Please enter a valid ${fieldName}.`
    }
  }

  if (type === 'date') {
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/ // Check for YYYY-MM-DD format
    if (!dateRegex.test(value)) {
      validations.pattern = `Please enter a valid ${fieldName}.`
    }
  }

  return validations
}
