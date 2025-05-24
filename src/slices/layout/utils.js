/**
 * Changes the body attribute
 */
const changeHTMLAttribute = (attribute, value) => {
  if (document.documentElement)
    document.documentElement.setAttribute(attribute, value)
  return true
}

const removeAttribute = (attribute) => {
  if (document.documentElement)
    document.documentElement.removeAttribute(attribute)
}

// get previous theme data
const getPreviousStorageData = (key) => {
  try {
    const value = localStorage.getItem(key)
    return value ? value : null
  } catch (error) {
    console.error('Error accessing localStorage', error)
    return null
  }
}

// set new theme data
const setNewThemeData = (key, value) => {
  try {
    localStorage.setItem(key, value)
  } catch (error) {
    console.error('Error accessing localStorage', error)
  }
}

const appendDarkModeClass = (existingClass, darkModeClass) => {
  // Check if the class is already present to avoid duplicates
  return !existingClass.includes(darkModeClass)
    ? `${existingClass} ${darkModeClass}`
    : existingClass
}

// remove existing theme data
const removeThemeData = (existingItem) => {
  try {
    localStorage.removeItem(existingItem)
  } catch (error) {
    console.error('Error accessing localStorage', error)
  }
}

export {
  changeHTMLAttribute,
  getPreviousStorageData,
  setNewThemeData,
  appendDarkModeClass,
  removeAttribute,
  removeThemeData,
}
