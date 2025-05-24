// get list data from storage
const getLocalStorage = (key) => {
  if (typeof window === 'undefined') return null

  const listData = localStorage.getItem(key)
  if (listData === null) return null
  return JSON.parse(listData)
}

// set list data in storage
const createLocalStorage = (key, data) => {
  if (typeof window === 'undefined') return false

  localStorage.setItem(key, JSON.stringify(data))
  return true
}

// delete list data in storage
const deleteLocalStorage = (key) => {
  if (typeof window === 'undefined') return false

  if (getLocalStorage(key)) {
    localStorage.removeItem(key)
    return true
  } else {
    return false
  }
}

// add list Record in storage
const addLocalStorageRecord = (key, listRecord) => {
  if (typeof window === 'undefined') return false

  const listData = getLocalStorage(key) ?? []

  const newRecordId =
    listData && listData.length > 0 ? listData[listData.length - 1].id + 1 : 1
  const newRecord = { ...listRecord, id: newRecordId }
  listData.push(newRecord)
  localStorage.setItem(key, JSON.stringify(listData))
  return true
}

// update list Record in storage
const updateLocalStorageRecord = (key, listRecord) => {
  if (typeof window === 'undefined') return false

  const newRecord = listRecord

  const listData = getLocalStorage(key)
  const recordIndex = listData.findIndex((record) => record.id === newRecord.id)
  if (recordIndex !== -1) {
    listData[recordIndex] = newRecord
  } else {
    listData.push(newRecord)
  }
  localStorage.setItem(key, JSON.stringify(listData))
  return true
}

// delete list Record in storage
const deleteLocalStorageRecord = ({
  key,
  listRecord,
  multipleRecords = false,
}) => {
  if (typeof window === 'undefined') return false

  // Retrieve the list data from local storage
  let listData = getLocalStorage(key) || []

  if (multipleRecords && Array.isArray(listRecord)) {
    listData = listData.filter((item) => !listRecord.includes(item.id))
    localStorage.setItem(key, JSON.stringify(listData))
    return true
  }

  // Delete multiple records - listRecord should be an array of ids
  if (multipleRecords && Array.isArray(listRecord)) {
    listData = listData.filter((item) => !listRecord.includes(item.id))
    localStorage.setItem(key, JSON.stringify(listData))
    return true
  }

  // Return false if nothing happens
  return false
}

export {
  getLocalStorage,
  createLocalStorage,
  deleteLocalStorage,
  addLocalStorageRecord,
  updateLocalStorageRecord,
  deleteLocalStorageRecord,
}
