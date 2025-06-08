'use client'

import React from 'react'
import { Users, UserCheck, UserX, Clock, RefreshCw } from 'lucide-react'

const ProspectStatsWidgets = ({ stats, loading, error, onRefresh }) => {
  if (error) {
    return (
      <div className="col-span-12 card">
        <div className="card-body text-center">
          <div className="text-red-500 mb-2">
            <UserX className="size-12 mx-auto" />
          </div>
          <h6 className="text-red-600 mb-2">Error Loading Statistics</h6>
          <p className="text-gray-500 mb-4">{error}</p>
          <button 
            onClick={onRefresh}
            className="btn btn-primary"
            disabled={loading}
          >
            <RefreshCw className={`size-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
            Try Again
          </button>
        </div>
      </div>
    )
  }

  const totalPercentage = stats.total > 0 ? 100 : 0
  const onVerificationPercentage = stats.total > 0 ? (stats.onVerification / stats.total) * 100 : 0
  const rejectedPercentage = stats.total > 0 ? (stats.rejected / stats.total) * 100 : 0
  const approvedPercentage = stats.total > 0 ? (stats.approved / stats.total) * 100 : 0

  return (
    <>
      {/* Total Prospects */}
      <div className="col-span-12 md:col-span-6 xl:col-span-3 card">
        <div className="card-body">
          <div className="flex items-center justify-center mx-auto mb-4 size-16 bg-gradient-to-t from-blue-500/10 rounded-modern">
            <Users className="relative text-blue-500 stroke-1 size-9 fill-blue-500/10" />
          </div>
          <h5 className={`mb-1 ${loading ? 'animate-pulse' : ''}`}>
            {loading ? '...' : stats.total}
          </h5>
          <p className="mb-4 text-gray-700 dark:text-gray-300">Total Prospects</p>
          <p className="text-gray-500 dark:text-dark-500">
            <span className="align-bottom badge badge-blue">
              <span>{totalPercentage.toFixed(0)}</span>%
            </span>
            All data
          </p>
        </div>
      </div>

      {/* On Verification */}
      <div className="col-span-12 md:col-span-6 xl:col-span-3 card">
        <div className="card-body">
          <div className="flex items-center justify-center mx-auto mb-4 size-16 bg-gradient-to-t from-yellow-500/10 rounded-modern">
            <Clock className="relative text-yellow-500 stroke-1 size-9 fill-yellow-500/10" />
          </div>
          <h5 className={`mb-1 ${loading ? 'animate-pulse' : ''}`}>
            {loading ? '...' : stats.onVerification}
          </h5>
          <p className="mb-4 text-gray-700 dark:text-gray-300">On Verification</p>
          <p className="text-gray-500 dark:text-dark-500">
            <span className="align-bottom badge badge-yellow">
              <span>{onVerificationPercentage.toFixed(1)}</span>%
            </span>
            Of total
          </p>
        </div>
      </div>

      {/* Rejected */}
      <div className="col-span-12 md:col-span-6 xl:col-span-3 card">
        <div className="card-body">
          <div className="flex items-center justify-center mx-auto mb-4 size-16 bg-gradient-to-t from-red-500/10 rounded-modern">
            <UserX className="relative text-red-500 stroke-1 size-9 fill-red-500/10" />
          </div>
          <h5 className={`mb-1 ${loading ? 'animate-pulse' : ''}`}>
            {loading ? '...' : stats.rejected}
          </h5>
          <p className="mb-4 text-gray-700 dark:text-gray-300">Rejected</p>
          <p className="text-gray-500 dark:text-dark-500">
            <span className="align-bottom badge badge-red">
              <span>{rejectedPercentage.toFixed(1)}</span>%
            </span>
            Of total
          </p>
        </div>
      </div>

      {/* Approved */}
      <div className="col-span-12 md:col-span-6 xl:col-span-3 card">
        <div className="card-body">
          <div className="flex items-center justify-center mx-auto mb-4 size-16 bg-gradient-to-t from-green-500/10 rounded-modern">
            <UserCheck className="relative text-green-500 stroke-1 size-9 fill-green-500/10" />
          </div>
          <h5 className={`mb-1 ${loading ? 'animate-pulse' : ''}`}>
            {loading ? '...' : stats.approved}
          </h5>
          <p className="mb-4 text-gray-700 dark:text-gray-300">Approved</p>
          <p className="text-gray-500 dark:text-dark-500">
            <span className="align-bottom badge badge-green">
              <span>{approvedPercentage.toFixed(1)}</span>%
            </span>
            Of total
          </p>
        </div>
      </div>
    </>
  )
}

export default ProspectStatsWidgets