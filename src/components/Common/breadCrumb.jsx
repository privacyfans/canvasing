'use client'

import { useEffect, useState } from 'react'

import Link from 'next/link'

const BreadCrumb = ({ title, subTitle }) => {
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    setHydrated(true)
  }, [])
  if (!hydrated) {
    return null
  }
  return (
    <>
      <div className="flex-col items-start gap-1 page-heading sm:flex-row sm:items-center">
        <h6 className="grow group-data-[nav-type=pattern]:text-white dark:text-white text-black">
          {' '}
          {title}
        </h6>
        <ul className="breadcrumb *:before:content-['\EA6E']">
          <li className="breadcrumb-item">
            <Link href="#!">{subTitle}</Link>
          </li>
          <li className="breadcrumb-item active">{title}</li>
        </ul>
      </div>
    </>
  )
}

export default BreadCrumb
