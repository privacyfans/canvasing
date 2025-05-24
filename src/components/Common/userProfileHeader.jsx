'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'

import { Eye, FileText, List, Monitor, Sparkles, UserRound } from 'lucide-react'

import CommonAccount from './CommonAccount'

const UserProfileHeader = () => {
  const router = useRouter()

  return (
    <>
      {/* common Profile info */}
      <CommonAccount />

      {/* navigation bar for user profile */}
      <ul className="pb-2 overflow-x-auto tabs-pills lg:pb-0">
        <li>
          <Link
            href="/page/user"
            className={`nav-item text-gray-500 dark:text-dark-500 [&.active]:bg-primary-500 [&.active]:text-primary-50 ${router.pathname == '/page/user' || router.pathname == '/apps/ecommerce/customer/user' ? 'active' : ''}`}>
            <Eye className="inline-block ltr:mr-1 rtl:ml-1 size-4" />
            <span className="align-middle whitespace-nowrap">Overview</span>
          </Link>
        </li>
        <li>
          <Link
            href="/page/user-activity"
            className={`nav-item text-gray-500 dark:text-dark-500 [&.active]:bg-primary-500 [&.active]:text-primary-50 ${router.pathname == '/page/user-activity' ? 'active' : ''}`}>
            <Sparkles className="inline-block ltr:mr-1 rtl:ml-1 size-4" />
            <span className="align-middle whitespace-nowrap">Activity</span>
          </Link>
        </li>
        <li>
          <Link
            href="/page/user-followers"
            className={`nav-item text-gray-500 dark:text-dark-500 [&.active]:bg-primary-500 [&.active]:text-primary-50 ${router.pathname == '/page/user-followers' ? 'active' : ''}`}>
            <UserRound className="inline-block ltr:mr-1 rtl:ml-1 size-4" />
            <span className="align-middle whitespace-nowrap">Followers</span>
          </Link>
        </li>
        <li>
          <Link
            href="/page/user-documents"
            className={`nav-item text-gray-500 dark:text-dark-500 [&.active]:bg-primary-500 [&.active]:text-primary-50 ${router.pathname == '/page/user-documents' ? 'active' : ''}`}>
            <FileText className="inline-block ltr:mr-1 rtl:ml-1 size-4" />
            <span className="align-middle whitespace-nowrap">Documents</span>
          </Link>
        </li>
        <li>
          <Link
            href="/page/user-notes"
            className={`nav-item text-gray-500 dark:text-dark-500 [&.active]:bg-primary-500 [&.active]:text-primary-50 ${router.pathname == '/page/user-notes' ? 'active' : ''}`}>
            <List className="inline-block ltr:mr-1 rtl:ml-1 size-4" />
            <span className="align-middle whitespace-nowrap">Notes</span>
          </Link>
        </li>
        <li>
          <Link
            href="/page/user-projects"
            className={`nav-item text-gray-500 dark:text-dark-500 [&.active]:bg-primary-500 [&.active]:text-primary-50 ${router.pathname == '/page/user-projects' ? 'active' : ''}`}>
            <Monitor className="inline-block ltr:mr-1 rtl:ml-1 size-4" />
            <span className="align-middle whitespace-nowrap">Projects</span>
          </Link>
        </li>
      </ul>
    </>
  )
}

export default UserProfileHeader
