'use client'

import React from 'react'
import { Users, TrendingUp, BarChart3, RefreshCw, Eye } from 'lucide-react'
import Link from 'next/link'
import useProspectStats from '@src/hooks/useProspectStats'
import ProspectStatsWidgets from '@src/components/prospect/ProspectStatsWidgets'

const ProspectDashboard = () => {
  const { stats, loading, error, refreshStats, isAuthenticated } = useProspectStats()

  const handleRefresh = () => {
    refreshStats()
  }

  if (!isAuthenticated) {
    return (
      <div className="grid grid-cols-12 gap-x-space">
        <div className="col-span-12 card">
          <div className="card-body text-center py-16">
            <Users className="size-16 mx-auto text-gray-400 mb-4" />
            <h5 className="mb-2">Authentication Required</h5>
            <p className="text-gray-500 mb-6">Please login to view prospect dashboard</p>
            <Link href="/auth/signin" className="btn btn-primary">
              Login to Continue
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <>
      {/* Header Section */}
      <div className="grid grid-cols-12 gap-x-space mb-6">
        <div className="col-span-12">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h4 className="mb-2 font-semibold text-gray-900 dark:text-white">
                Prospect Dashboard
              </h4>
              <p className="text-gray-600 dark:text-gray-400">
                Overview of prospect verification status and statistics
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={handleRefresh}
                disabled={loading}
                className="btn btn-outline-primary"
                title="Refresh Statistics"
              >
                <RefreshCw className={`size-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
                Refresh
              </button>
              <Link href="/prospect/list" className="btn btn-primary">
                <Eye className="size-4 mr-2" />
                View All Prospects
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Statistics Widgets */}
      <div className="grid grid-cols-12 gap-x-space mb-6">
        <ProspectStatsWidgets 
          stats={stats}
          loading={loading}
          error={error}
          onRefresh={handleRefresh}
        />
      </div>

      {/* Status Breakdown Chart Section */}
      <div className="grid grid-cols-12 gap-x-space mb-6">
        <div className="col-span-12 lg:col-span-8 card">
          <div className="card-body">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h6 className="mb-1">Status Distribution</h6>
                <p className="text-gray-500">Breakdown of prospect verification status</p>
              </div>
              <BarChart3 className="size-6 text-gray-400" />
            </div>
            
            {/* Progress Bars */}
            <div className="space-y-4">
              {/* On Verification */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    On Verification
                  </span>
                  <span className="text-sm text-gray-500">
                    {stats.onVerification} ({((stats.onVerification / (stats.total || 1)) * 100).toFixed(1)}%)
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 dark:bg-gray-700">
                  <div
                    className="bg-yellow-500 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${(stats.onVerification / (stats.total || 1)) * 100}%` }}
                  ></div>
                </div>
              </div>

              {/* Approved */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Approved
                  </span>
                  <span className="text-sm text-gray-500">
                    {stats.approved} ({((stats.approved / (stats.total || 1)) * 100).toFixed(1)}%)
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 dark:bg-gray-700">
                  <div
                    className="bg-green-500 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${(stats.approved / (stats.total || 1)) * 100}%` }}
                  ></div>
                </div>
              </div>

              {/* Rejected */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Rejected
                  </span>
                  <span className="text-sm text-gray-500">
                    {stats.rejected} ({((stats.rejected / (stats.total || 1)) * 100).toFixed(1)}%)
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 dark:bg-gray-700">
                  <div
                    className="bg-red-500 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${(stats.rejected / (stats.total || 1)) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="col-span-12 lg:col-span-4 card">
          <div className="card-body">
            <h6 className="mb-4">Quick Actions</h6>
            <div className="space-y-3">
              <Link
                href="/prospect/list?term=On%20Verification"
                className="block p-3 border border-yellow-200 rounded-lg hover:bg-yellow-50 transition-colors"
              >
                <div className="flex items-center">
                  <div className="size-8 bg-yellow-100 rounded-lg flex items-center justify-center mr-3">
                    <span className="text-yellow-600 text-sm font-semibold">01</span>
                  </div>
                  <div>
                    <div className="font-medium text-sm">On Verification</div>
                    <div className="text-xs text-gray-500">{stats.onVerification} prospects</div>
                  </div>
                </div>
              </Link>

              <Link
                href="/prospect/list?term=Approved"
                className="block p-3 border border-green-200 rounded-lg hover:bg-green-50 transition-colors"
              >
                <div className="flex items-center">
                  <div className="size-8 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                    <span className="text-green-600 text-sm font-semibold">03</span>
                  </div>
                  <div>
                    <div className="font-medium text-sm">View Approved</div>
                    <div className="text-xs text-gray-500">{stats.approved} prospects</div>
                  </div>
                </div>
              </Link>

              <Link
                href="/prospect/list?term=Rejected"
                className="block p-3 border border-red-200 rounded-lg hover:bg-red-50 transition-colors"
              >
                <div className="flex items-center">
                  <div className="size-8 bg-red-100 rounded-lg flex items-center justify-center mr-3">
                    <span className="text-red-600 text-sm font-semibold">02</span>
                  </div>
                  <div>
                    <div className="font-medium text-sm">Review Rejected</div>
                    <div className="text-xs text-gray-500">{stats.rejected} prospects</div>
                  </div>
                </div>
              </Link>

              <Link
                href="/prospect/list"
                className="block p-3 border border-blue-200 rounded-lg hover:bg-blue-50 transition-colors"
              >
                <div className="flex items-center">
                  <div className="size-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                    <Users className="size-4 text-blue-600" />
                  </div>
                  <div>
                    <div className="font-medium text-sm">View All Prospects</div>
                    <div className="text-xs text-gray-500">{stats.total} total prospects</div>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Performance Summary */}
      <div className="grid grid-cols-12 gap-x-space">
        <div className="col-span-12 card">
          <div className="card-body">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h6 className="mb-1">Summary</h6>
                <p className="text-gray-500">Overall prospect management statistics</p>
              </div>
              <TrendingUp className="size-6 text-gray-400" />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600 mb-1">
                  {stats.total > 0 ? ((stats.approved / stats.total) * 100).toFixed(1) : '0'}%
                </div>
                <div className="text-sm text-gray-500">Approval Rate</div>
              </div>
              
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-600 mb-1">
                  {stats.total > 0 ? ((stats.onVerification / stats.total) * 100).toFixed(1) : '0'}%
                </div>
                <div className="text-sm text-gray-500">Pending Review</div>
              </div>
              
              <div className="text-center">
                <div className="text-2xl font-bold text-red-600 mb-1">
                  {stats.total > 0 ? ((stats.rejected / stats.total) * 100).toFixed(1) : '0'}%
                </div>
                <div className="text-sm text-gray-500">Rejection Rate</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ProspectDashboard