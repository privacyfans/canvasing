// src/components/ui/Toast.jsx
import React, { useState, useCallback, createContext, useContext } from 'react'
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from 'lucide-react'

const ToastContext = createContext()

export const useToast = () => {
  const context = useContext(ToastContext)
  if (!context) {
    // Fallback implementation if used outside provider
    return {
      showSuccess: (message) => console.log('Success:', message),
      showError: (message) => console.error('Error:', message),
      showInfo: (message) => console.log('Info:', message),
      showWarning: (message) => console.warn('Warning:', message),
      ToastContainer: () => null
    }
  }
  return context
}

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([])

  const addToast = useCallback((toast) => {
    const id = Date.now() + Math.random()
    const newToast = { ...toast, id }
    
    setToasts(prev => [...prev, newToast])

    // Auto remove after duration
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id))
    }, toast.duration || 5000)

    return id
  }, [])

  const removeToast = useCallback((id) => {
    setToasts(prev => prev.filter(t => t.id !== id))
  }, [])

  const showSuccess = useCallback((message, options = {}) => {
    addToast({
      type: 'success',
      message,
      ...options
    })
  }, [addToast])

  const showError = useCallback((message, options = {}) => {
    addToast({
      type: 'error',
      message,
      duration: 7000, // Longer for errors
      ...options
    })
  }, [addToast])

  const showInfo = useCallback((message, options = {}) => {
    addToast({
      type: 'info',
      message,
      ...options
    })
  }, [addToast])

  const showWarning = useCallback((message, options = {}) => {
    addToast({
      type: 'warning',
      message,
      ...options
    })
  }, [addToast])

  const ToastContainer = () => (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      {toasts.map(toast => (
        <Toast
          key={toast.id}
          toast={toast}
          onClose={() => removeToast(toast.id)}
        />
      ))}
    </div>
  )

  const value = {
    showSuccess,
    showError,
    showInfo,
    showWarning,
    ToastContainer
  }

  return (
    <ToastContext.Provider value={value}>
      {children}
    </ToastContext.Provider>
  )
}

const Toast = ({ toast, onClose }) => {
  const icons = {
    success: CheckCircle,
    error: AlertCircle,
    info: Info,
    warning: AlertTriangle
  }

  const colors = {
    success: 'bg-green-50 border-green-200 text-green-800',
    error: 'bg-red-50 border-red-200 text-red-800',
    info: 'bg-blue-50 border-blue-200 text-blue-800',
    warning: 'bg-yellow-50 border-yellow-200 text-yellow-800'
  }

  const iconColors = {
    success: 'text-green-400',
    error: 'text-red-400',
    info: 'text-blue-400',
    warning: 'text-yellow-400'
  }

  const Icon = icons[toast.type] || Info

  return (
    <div className={`max-w-sm w-full border rounded-lg shadow-lg p-4 ${colors[toast.type]}`}>
      <div className="flex items-start">
        <div className="flex-shrink-0">
          <Icon className={`h-5 w-5 ${iconColors[toast.type]}`} />
        </div>
        <div className="ml-3 w-0 flex-1">
          <p className="text-sm font-medium">
            {toast.message}
          </p>
        </div>
        <div className="ml-4 flex-shrink-0 flex">
          <button
            className="rounded-md inline-flex text-gray-400 hover:text-gray-600 focus:outline-none"
            onClick={onClose}
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  )
}

// Simple hook version for components that don't need the provider
export const useSimpleToast = () => {
  const [toasts, setToasts] = useState([])

  const addToast = useCallback((toast) => {
    const id = Date.now() + Math.random()
    const newToast = { ...toast, id }
    
    setToasts(prev => [...prev, newToast])

    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id))
    }, toast.duration || 5000)

    return id
  }, [])

  const removeToast = useCallback((id) => {
    setToasts(prev => prev.filter(t => t.id !== id))
  }, [])

  const showSuccess = useCallback((message) => {
    addToast({ type: 'success', message })
  }, [addToast])

  const showError = useCallback((message) => {
    addToast({ type: 'error', message, duration: 7000 })
  }, [addToast])

  const showInfo = useCallback((message) => {
    addToast({ type: 'info', message })
  }, [addToast])

  const showWarning = useCallback((message) => {
    addToast({ type: 'warning', message })
  }, [addToast])

  const ToastContainer = () => (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      {toasts.map(toast => (
        <Toast
          key={toast.id}
          toast={toast}
          onClose={() => removeToast(toast.id)}
        />
      ))}
    </div>
  )

  return {
    showSuccess,
    showError,
    showInfo,
    showWarning,
    ToastContainer
  }
}