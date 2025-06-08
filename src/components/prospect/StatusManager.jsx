'use client'
import { useState, useEffect } from 'react'
import { useProspectStatus } from '@src/hooks/useProspectStatus'

const StatusManager = ({ prospectId, onStatusUpdate }) => {
  const [selectedStatus, setSelectedStatus] = useState('')
  const [note, setNote] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [editingStatus, setEditingStatus] = useState(null)

  const {
    loading,
    statusHistory,
    fetchStatusHistory,
    createStatus,
    updateStatus,
    getStatusOptions,
    getStatusById,
    getCurrentStatus
  } = useProspectStatus()

  const statusOptions = getStatusOptions()
  const currentStatus = getCurrentStatus()

  useEffect(() => {
    if (prospectId) {
      fetchStatusHistory(prospectId)
    }
  }, [prospectId, fetchStatusHistory])

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!selectedStatus) {
      alert('Please select a status')
      return
    }

    const statusOption = getStatusById(selectedStatus)
    if (!statusOption) {
      alert('Invalid status selected')
      return
    }

    const statusData = {
      statusId: selectedStatus,
      statusName: statusOption.name,
      note: note.trim()
    }

    let result
    if (editingStatus) {
      result = await updateStatus({
        ...statusData,
        id: editingStatus.id
      })
    } else {
      result = await createStatus({
        ...statusData,
        prospectId
      })
    }

    if (result.success) {
      setSelectedStatus('')
      setNote('')
      setShowForm(false)
      setEditingStatus(null)
      await fetchStatusHistory(prospectId)
      if (onStatusUpdate) {
        onStatusUpdate(result.data)
      }
    } else {
      alert(result.error || 'Operation failed')
    }
  }

  const handleEdit = (status) => {
    setEditingStatus(status)
    setSelectedStatus(status.statusId)
    setNote(status.note || '')
    setShowForm(true)
  }

  const handleCancel = () => {
    setSelectedStatus('')
    setNote('')
    setShowForm(false)
    setEditingStatus(null)
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString('id-ID', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Status Approval</h3>
        {!showForm && (
          <button
            onClick={() => setShowForm(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Update Status
          </button>
        )}
      </div>

      {/* Current Status */}
      <div className="mb-6 p-4 bg-gray-50 rounded-lg">
        <h4 className="text-sm font-medium text-gray-700 mb-2">Current Status</h4>
        {currentStatus ? (
          <div>
            <div className="flex items-center gap-2">
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusById(currentStatus.statusId)?.color || 'bg-gray-100 text-gray-800'}`}>
                {currentStatus.statusName}
              </span>
              <span className="text-sm text-gray-500">
                {formatDate(currentStatus.updatedAt)}
              </span>
            </div>
            {currentStatus.note && (
              <p className="mt-2 text-sm text-gray-600">{currentStatus.note}</p>
            )}
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-600">
              No Status Yet
            </span>
            <span className="text-sm text-gray-500">
              Status belum ditentukan
            </span>
          </div>
        )}
      </div>

      {/* Status Form */}
      {showForm && (
        <div className="mb-6 p-4 border border-gray-200 rounded-lg">
          <h4 className="text-sm font-medium text-gray-700 mb-3">
            {editingStatus ? 'Edit Status' : 'Add New Status'}
          </h4>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Status
              </label>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              >
                <option value="">Select Status</option>
                {statusOptions.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Note (Optional)
              </label>
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Add a note for this status update..."
              />
            </div>

            <div className="flex gap-2">
              <button
                type="submit"
                disabled={loading}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {loading ? 'Saving...' : editingStatus ? 'Update Status' : 'Add Status'}
              </button>
              <button
                type="button"
                onClick={handleCancel}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Status History */}
      <div>
        <h4 className="text-sm font-medium text-gray-700 mb-3">Status History</h4>
        {loading && statusHistory.length === 0 ? (
          <div className="text-center py-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
            <p className="text-sm text-gray-500 mt-2">Loading status history...</p>
          </div>
        ) : statusHistory.length === 0 ? (
          <p className="text-sm text-gray-500 text-center py-4">No status history available</p>
        ) : (
          <div className="space-y-3">
            {statusHistory.map((status, index) => (
              <div
                key={status.id}
                className={`p-3 rounded-lg border ${index === statusHistory.length - 1 ? 'border-blue-200 bg-blue-50' : 'border-gray-200 bg-gray-50'}`}
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusById(status.statusId)?.color || 'bg-gray-100 text-gray-800'}`}>
                        {status.statusName}
                      </span>
                      <span className="text-xs text-gray-500">
                        {formatDate(status.updatedAt)}
                      </span>
                    </div>
                    {status.note && (
                      <p className="text-sm text-gray-600">{status.note}</p>
                    )}
                  </div>
                  {index === statusHistory.length - 1 && (
                    <button
                      onClick={() => handleEdit(status)}
                      className="text-xs text-blue-600 hover:text-blue-800 ml-2"
                    >
                      Edit
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default StatusManager