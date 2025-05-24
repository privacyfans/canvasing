// find the record id
export const getRecordId = (recordList, field, type) => {
  // Find the maximum user | product ID
  const maxRecordId =
    recordList.length > 0
      ? Math.max(...recordList.map((record) => record.id))
      : 0

  // Find the record with the highest ID
  const findLastRecord = recordList.find((record) => record.id === maxRecordId)

  let newRecordTypeId = 1 // Default customer ID if no customers exist

  if (findLastRecord) {
    // Check if the field exists
    if (findLastRecord[field]) {
      // Extract the numeric part of the last ID and increment it
      const newRecordId = Number(findLastRecord[field].split('-')[1])
      newRecordTypeId = newRecordId + 1
    } else {
      console.error(`Field "${field}" not found in the last record.`)
      newRecordTypeId = maxRecordId + 1 // Fallback in case the field is not found
    }
  } else {
    newRecordTypeId = maxRecordId + 1 // Fallback if no records exist
  }

  return `${type}-${newRecordTypeId}`
}
