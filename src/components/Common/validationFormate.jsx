export const ValidatePhoneNumber = (phoneNumber) => {
  const phoneWithoutPlus = phoneNumber.replace('+', '') // Remove '+' if present
  const phoneLength = phoneWithoutPlus.length

  if (phoneNumber === '') {
    return 'Phone number is required.'
  } else if (phoneLength !== 10) {
    return 'Phone number must be exactly 10 digits.'
  } else if (!/^\+?\d{10}$/.test(phoneNumber)) {
    // Allow 10 digits with optional '+' at the start
    return 'Invalid phone number format.'
  }

  return true // Return true if valid
}

export const validateEmailField = (email) => {
  // Regular expression to validate email format
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

  if (!email) {
    return 'Email is required.' // Error message if email is missing
  } else if (!emailPattern.test(email)) {
    return 'Invalid email format.' // Error message if the email format is invalid
  }

  return true // Return true if email is valid
}
