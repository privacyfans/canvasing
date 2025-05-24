'use client'

import { useState } from 'react'

import { toast } from 'react-toastify'

import { logoutUser } from '@/lib/apiClient'

const LogoutButton = ({ className, children }) => {
  const [isLoading, setIsLoading] = useState(false)

  const handleLogout = async () => {
    setIsLoading(true)
    try {
      await logoutUser()
      // Tidak perlu redirect atau toast karena logoutUser sudah melakukan redirect
    } catch (error) {
      console.error('Logout error:', error)
      toast.error('Terjadi kesalahan saat logout')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <button
      onClick={handleLogout}
      disabled={isLoading}
      className={className || 'btn btn-danger'}>
      {isLoading ? 'Sedang Proses...' : children || 'Logout'}
    </button>
  )
}

export default LogoutButton
