import { Fragment, useEffect, useState } from 'react'

import Link from 'next/link'

import { rankItem } from '@tanstack/match-sorter-utils'
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'

const TableContainer = ({
  columns,
  data,
  tableClass,
  theadClass,
  divClass,
  thtrClass,
  trClass,
  thClass,
  tdClass,
  tbodyClass,
  SearchPlaceholder = 'Search...',
  classStyle,
  isTableFooter = false,
  isPagination = false,
  isSearch = false,
  isHeader = true, // Default to true
  isHiddenHeder,
  lastTrClass,
}) => {
  const [itemsPerPage] = useState(10)
  const [columnFilters, setColumnFilters] = useState([])
  const [globalFilter, setGlobalFilter] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(itemsPerPage)

  const fuzzyFilter = (row, columnId, value, addMeta) => {
    const itemRank = rankItem(row.getValue(columnId), value)
    addMeta({ itemRank })
    return itemRank.passed
  }

  const table = useReactTable({
    columns,
    data,
    filterFns: { fuzzy: fuzzyFilter },
    state: { columnFilters, globalFilter },
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: fuzzyFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    pageSize: pageSize,
  })

  const {
    getHeaderGroups,
    getFooterGroups,
    getRowModel,
    setPageIndex,
    setPageSize: setTablePageSize,
  } = table

  useEffect(() => {
    setTablePageSize(pageSize)
    setCurrentPage(1)
  }, [pageSize, setTablePageSize, globalFilter])

  const filteredRows = table.getFilteredRowModel()?.rows || []
  const totalPages = Math.ceil(filteredRows.length / pageSize)

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return
    setCurrentPage(page)
    setPageIndex(page - 1)
  }

  const showingStartFiltered = (currentPage - 1) * pageSize + 1
  const showingEndFiltered = Math.min(
    currentPage * pageSize,
    filteredRows.length
  )

  return (
    <Fragment>
      {isSearch && (
        <div className="grid grid-cols-1 gap-4 mb-6 md:grid-cols-2">
          <>
            <div className="justify-self-center md:justify-self-start">
              <div className="dt-length">
                <select
                  name="example_length"
                  aria-controls="example"
                  className="inline-block w-auto form-select ltr:mr-2 rtl:ml-2"
                  id="dt-length-0"
                  value={pageSize}
                  onChange={(e) => setPageSize(parseInt(e.target.value, 10))}>
                  <option value="10">10</option>
                  <option value="25">25</option>
                  <option value="50">50</option>
                  <option value="100">100</option>
                  <option value={data.length}>All</option>
                </select>
                <label htmlFor="dt-length-0"> entries per page</label>
              </div>
            </div>
            <div className="md:col-start-2 justify-self-center md:justify-self-end">
              <div className="dt-search">
                <label htmlFor="dt-search-0">Search:</label>
                <input
                  type="search"
                  value={globalFilter}
                  className="inline-block w-auto form-input ltr:ml-2 rtl:mr-2"
                  id="dt-search-0"
                  placeholder={SearchPlaceholder}
                  aria-controls="example"
                  onChange={(e) => setGlobalFilter(e.target.value)}
                />
              </div>
            </div>
          </>
        </div>
      )}

      <div className={divClass}>
        <table className={tableClass} style={{ width: classStyle }}>
          {/* Conditionally render the table header based on isHeader */}
          {isHeader && !isHiddenHeder && (
            <thead className={theadClass}>
              {getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id} className={thtrClass}>
                  {headerGroup.headers.map((header, cellIndex, cellArray) => {
                    const isSorted = header.column.getIsSorted()
                    const sortIcon =
                      isSorted === 'asc' ? '↑' : isSorted === 'desc' ? '↓' : ''
                    const isLastCell = cellIndex === cellArray.length - 1
                    return (
                      <th
                        key={header.id}
                        className={`${header.column.getCanSort() ? 'sortable' : ''} ${thClass} ${isLastCell ? lastTrClass : ''}`}
                        onClick={header.column.getToggleSortingHandler()}>
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                        {isSorted && (
                          <span style={{ marginLeft: '5px' }}>{sortIcon}</span>
                        )}
                      </th>
                    )
                  })}
                </tr>
              ))}
            </thead>
          )}
          <tbody className={tbodyClass}>
            {filteredRows.length > 0 ? (
              getRowModel().rows.map((row) => {
                return (
                  <tr key={row.id} className={trClass}>
                    {row.getVisibleCells().map((cell, cellIndex, cellArray) => {
                      const isLastCell = cellIndex === cellArray.length - 1

                      return (
                        <td
                          key={cell.id}
                          className={`${tdClass} ${isLastCell ? lastTrClass : ''}`}>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </td>
                      )
                    })}
                  </tr>
                )
              })
            ) : (
              <tr>
                <td colSpan={columns.length} className="p-4">
                  <div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      x="0px"
                      y="0px"
                      className="mx-auto size-12"
                      viewBox="0 0 48 48">
                      <linearGradient
                        id="SVGID_1__h35ynqzIJzH4_gr1"
                        x1="34.598"
                        x2="15.982"
                        y1="15.982"
                        y2="34.598"
                        gradientUnits="userSpaceOnUse">
                        <stop offset="0" stopColor="#60e8fe" />
                        <stop offset=".033" stopColor="#6ae9fe" />
                        <stop offset=".197" stopColor="#97f0fe" />
                        <stop offset=".362" stopColor="#bdf5ff" />
                        <stop offset=".525" stopColor="#dafaff" />
                        <stop offset=".687" stopColor="#eefdff" />
                        <stop offset=".846" stopColor="#fbfeff" />
                        <stop offset="1" stopColor="#fff" />
                      </linearGradient>
                      <path
                        fill="url(#SVGID_1__h35ynqzIJzH4_gr1)"
                        d="M40.036,33.826L31.68,25.6c0.847-1.739,1.335-3.684,1.335-5.748c0-7.27-5.894-13.164-13.164-13.164	S6.688,12.582,6.688,19.852c0,7.27,5.894,13.164,13.164,13.164c2.056,0,3.995-0.485,5.728-1.326l3.914,4.015l4.331,4.331	c1.715,1.715,4.496,1.715,6.211,0C41.751,38.321,41.751,35.541,40.036,33.826z"
                      />
                      <path
                        fill="none"
                        stroke="#10cfe3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeMiterlimit="10"
                        strokeWidth="3"
                        d="M31.95,25.739l8.086,8.086c1.715,1.715,1.715,4.496,0,6.211l0,0c-1.715,1.715-4.496,1.715-6.211,0	l-4.331-4.331"
                      />
                      <path
                        fill="none"
                        stroke="#10cfe3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeMiterlimit="10"
                        strokeWidth="3"
                        d="M7.525,24.511c-1.771-4.694-0.767-10.196,3.011-13.975c3.847-3.847,9.48-4.817,14.228-2.912"
                      />
                      <path
                        fill="none"
                        stroke="#10cfe3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeMiterlimit="10"
                        strokeWidth="3"
                        d="M30.856,12.603c3.376,5.114,2.814,12.063-1.688,16.565c-4.858,4.858-12.565,5.129-17.741,0.814"
                      />
                    </svg>
                    <p className="mt-2 text-center text-gray-500 dark:text-dark-500">
                      No matching records found
                    </p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
          {isTableFooter && (
            <tfoot>
              {getFooterGroups().map((footerGroup) => (
                <tr key={footerGroup.id}>
                  {footerGroup.headers.map((footer) => (
                    <th
                      key={footer.id}
                      className="p-3 text-left border-slate-200 dark:border-zink-500">
                      {flexRender(
                        footer.column.columnDef.footer,
                        footer.getContext()
                      )}
                    </th>
                  ))}
                </tr>
              ))}
            </tfoot>
          )}
          {isTableFooter && (
            <tfoot>
              <tr>
                <th className="ltr:text-left rtl:text-right">Name</th>
                <th className="ltr:text-left rtl:text-right">Position</th>
                <th className="ltr:text-left rtl:text-right">Office</th>
                <th className="ltr:text-left rtl:text-right">Age</th>
                <th className="ltr:text-left rtl:text-right">Start date</th>
                <th className="ltr:text-left rtl:text-right">Salary</th>
              </tr>
            </tfoot>
          )}
        </table>
      </div>

      {filteredRows.length === 0 && isPagination && (
        <div
          className="grid grid-cols-1 gap-4 md:grid-cols-2"
          style={{ marginTop: '20px' }}>
          <div className="justify-self-center md:justify-self-start">
            <div
              className="dt-info"
              aria-live="polite"
              id="example_info"
              role="status">
              No entries found
            </div>
          </div>
          <div className="md:col-start-2 justify-self-center md:justify-self-end">
            <div className="dt-paging paging_full_numbers">
              <ul className="pagination pagination-primary">
                <li>
                  <Link
                    href="#"
                    className="pagination-item disabled"
                    aria-controls="example"
                    aria-label="First"
                    data-dt-idx="first"
                    tabIndex={-1}>
                    «
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="pagination-item disabled"
                    aria-controls="example"
                    aria-label="Previous"
                    data-dt-idx="previous"
                    tabIndex={-1}>
                    ‹
                  </Link>
                </li>
                {/* No page numbers to display */}

                <li>
                  <Link
                    href="#"
                    className="pagination-item disabled"
                    aria-controls="example"
                    aria-label="Next"
                    data-dt-idx="next"
                    tabIndex={-1}>
                    ›
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="pagination-item disabled"
                    aria-controls="example"
                    aria-label="Last"
                    data-dt-idx="last"
                    tabIndex={-1}>
                    »
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
      {filteredRows.length > 0 && isPagination && totalPages === 1 && (
        <div
          className="grid grid-cols-1 gap-4 md:grid-cols-2"
          style={{ marginTop: '20px' }}>
          <div className="justify-self-center md:justify-self-start">
            <div
              className="dt-info"
              aria-live="polite"
              id="example_info"
              role="status">
              Showing {showingStartFiltered} to {showingEndFiltered} of
              {data.length} entries
            </div>
          </div>
          <div className="md:col-start-2 justify-self-center md:justify-self-end">
            <div className="dt-paging paging_full_numbers">
              <ul className="pagination pagination-primary">
                <li>
                  <Link
                    href="#"
                    className={`pagination-item first ${currentPage === 1 ? 'disabled' : ''}`}
                    aria-controls="example"
                    aria-label="First"
                    data-dt-idx="first"
                    tabIndex={0}
                    onClick={(e) => {
                      e.preventDefault()
                      handlePageChange(1)
                    }}>
                    «
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className={`pagination-item previous ${currentPage === 1 ? 'disabled' : ''}`}
                    aria-controls="example"
                    aria-label="Previous"
                    data-dt-idx="previous"
                    tabIndex={0}
                    onClick={(e) => {
                      e.preventDefault()
                      handlePageChange(currentPage - 1)
                    }}>
                    ‹
                  </Link>
                </li>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
                    <li key={page}>
                      <Link
                        href="#"
                        className={`pagination-item ${currentPage === page ? 'active' : ''}`}
                        aria-controls="example"
                        data-dt-idx={page}
                        tabIndex={0}
                        onClick={(e) => {
                          e.preventDefault()
                          handlePageChange(page)
                        }}>
                        {page}
                      </Link>
                    </li>
                  )
                )}
                <li>
                  <Link
                    href="#"
                    className={`pagination-item next ${currentPage === totalPages ? 'disabled' : ''}`}
                    aria-controls="example"
                    aria-label="Next"
                    data-dt-idx="next"
                    tabIndex={0}
                    onClick={(e) => {
                      e.preventDefault()
                      handlePageChange(currentPage + 1)
                    }}>
                    ›
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className={`pagination-item last ${currentPage === totalPages ? 'disabled' : ''}`}
                    aria-controls="example"
                    aria-label="Last"
                    data-dt-idx="last"
                    tabIndex={0}
                    onClick={(e) => {
                      e.preventDefault()
                      handlePageChange(totalPages)
                    }}>
                    »
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
      {filteredRows.length > 0 && isPagination && totalPages > 1 && (
        <div
          className="grid grid-cols-1 gap-4 md:grid-cols-2"
          style={{ marginTop: '20px' }}>
          <div className="justify-self-center md:justify-self-start">
            <div
              className="dt-info"
              aria-live="polite"
              id="example_info"
              role="status">
              Showing {showingStartFiltered} to {showingEndFiltered} of
              {data.length} entries
            </div>
          </div>
          <div className="md:col-start-2 justify-self-center md:justify-self-end">
            <div className="dt-paging paging_full_numbers">
              <ul className="pagination pagination-primary">
                <li>
                  <Link
                    href="#"
                    className={`pagination-item first ${currentPage === 1 ? 'disabled' : ''}`}
                    aria-controls="example"
                    aria-label="First"
                    data-dt-idx="first"
                    tabIndex={0}
                    onClick={(e) => {
                      e.preventDefault()
                      handlePageChange(1)
                    }}>
                    «
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className={`pagination-item previous ${currentPage === 1 ? 'disabled' : ''}`}
                    aria-controls="example"
                    aria-label="Previous"
                    data-dt-idx="previous"
                    tabIndex={0}
                    onClick={(e) => {
                      e.preventDefault()
                      handlePageChange(currentPage - 1)
                    }}>
                    ‹
                  </Link>
                </li>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
                    <li key={page}>
                      <Link
                        href="#"
                        className={`pagination-item ${currentPage === page ? 'active' : ''}`}
                        aria-controls="example"
                        data-dt-idx={page}
                        tabIndex={0}
                        onClick={(e) => {
                          e.preventDefault()
                          handlePageChange(page)
                        }}>
                        {page}
                      </Link>
                    </li>
                  )
                )}
                <li>
                  <Link
                    href="#"
                    className={`pagination-item next ${currentPage === totalPages ? 'disabled' : ''}`}
                    aria-controls="example"
                    aria-label="Next"
                    data-dt-idx="next"
                    tabIndex={0}
                    onClick={(e) => {
                      e.preventDefault()
                      handlePageChange(currentPage + 1)
                    }}>
                    ›
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className={`pagination-item last ${currentPage === totalPages ? 'disabled' : ''}`}
                    aria-controls="example"
                    aria-label="Last"
                    data-dt-idx="last"
                    tabIndex={0}
                    onClick={(e) => {
                      e.preventDefault()
                      handlePageChange(totalPages)
                    }}>
                    »
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </Fragment>
  )
}

export default TableContainer
