'use client'

import React, { useEffect, useState } from 'react'

import { CircleAlert, CircleCheckBig, Hourglass, X } from 'lucide-react'

const Widgets = ({ invoices }) => {
  const totalInvoices = invoices ? invoices.length : 1

  const [paidCount, setPaidCount] = useState(0)
  const [unPaidCount, setUnPaidCount] = useState(0)
  const [pendingCount, setPendingCount] = useState(0)
  const [overdueCount, setOverdueCount] = useState(0)
  const paidPercentage = (paidCount / totalInvoices) * 100
  const unpaidPercentage = (unPaidCount / totalInvoices) * 100
  const pendingPercentage = (pendingCount / totalInvoices) * 100
  const overduePercentage = (overdueCount / totalInvoices) * 100

  useEffect(() => {
    if (!invoices) {
      setPaidCount(1)
      setUnPaidCount(1)
      setPendingCount(1)
      setOverdueCount(1)
      return
    }
    setPaidCount(
      invoices
        ? invoices.filter((invoice) => invoice.status === 'Paid').length
        : 1
    )
    setUnPaidCount(
      invoices
        ? invoices.filter((invoice) => invoice.status === 'Unpaid').length
        : 1
    )
    setPendingCount(
      invoices
        ? invoices.filter((invoice) => invoice.status === 'Pending').length
        : 1
    )
    setOverdueCount(
      invoices
        ? invoices.filter((invoice) => invoice.status === 'Overdue').length
        : 1
    )
  }, [invoices])

  return (
    <>
      <div className="col-span-12 md:col-span-6 xl:col-span-4 2xl:col-span-2 card">
        <div className="card-body">
          <div className="flex items-center justify-center mx-auto mb-4 size-16 bg-gradient-to-t from-green-500/10 rounded-modern">
            <CircleCheckBig className="relative text-green-500 stroke-1 size-9 fill-green-500/10" />
          </div>
          <h5 className="mb-1">{paidCount}</h5>
          <p className="mb-4">Paid Invoice</p>
          <p className="text-gray-500 dark:text-dark-500">
            <span className="align-bottom badge badge-green">
              <span>{paidPercentage > 0 ? paidPercentage.toFixed(2) : 0}</span>%
            </span>
            This month
          </p>
        </div>
      </div>
      <div className="col-span-12 md:col-span-6 xl:col-span-4 2xl:col-span-2 card">
        <div className="card-body">
          <div className="flex items-center justify-center mx-auto mb-4 size-16 bg-gradient-to-t from-pink-500/10 rounded-modern">
            <CircleAlert className="relative text-pink-500 stroke-1 size-9 fill-pink-500/10" />
          </div>
          <h5 className="mb-1">{unPaidCount}</h5>
          <p className="mb-4">Unpaid Invoice</p>
          <p className="text-gray-500 dark:text-dark-500">
            <span className="align-bottom badge badge-green">
              <span>
                {unpaidPercentage > 0 ? unpaidPercentage.toFixed(2) : 0}
              </span>
              %
            </span>
            This month
          </p>
        </div>
      </div>
      <div className="col-span-12 md:col-span-6 xl:col-span-4 2xl:col-span-2 card">
        <div className="card-body">
          <div className="flex items-center justify-center mx-auto mb-4 size-16 bg-gradient-to-t from-yellow-500/10 rounded-modern">
            <Hourglass className="relative text-yellow-500 stroke-1 size-9 fill-yellow-500/10" />
          </div>
          <h5 className="mb-1">{pendingCount}</h5>
          <p className="mb-4">Pending Invoice</p>
          <p className="text-gray-500 dark:text-dark-500">
            <span className="align-bottom badge badge-green">
              <span>
                {pendingPercentage ? pendingPercentage.toFixed(2) : 0}
              </span>
              %
            </span>
            This month
          </p>
        </div>
      </div>
      <div className="col-span-12 md:col-span-6 xl:col-span-4 2xl:col-span-2 card">
        <div className="card-body">
          <div className="flex items-center justify-center mx-auto mb-4 size-16 bg-gradient-to-t from-red-500/10 rounded-modern">
            <X className="relative text-red-500 stroke-1 size-9 fill-red-500/10" />
          </div>
          <h5 className="mb-1">{overdueCount > 0 ? overdueCount : 0}</h5>
          <p className="mb-4">Overdue Invoice</p>
          <p className="text-gray-500 dark:text-dark-500">
            <span className="align-bottom badge badge-green">
              <span>
                {overduePercentage > 0 ? overduePercentage.toFixed(2) : 0}
              </span>
              %
            </span>
            This month
          </p>
        </div>
      </div>
    </>
  )
}

export default Widgets
