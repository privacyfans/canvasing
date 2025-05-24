'use client'

import { useEffect } from 'react'

import { usePathname } from 'next/navigation'

import { routes } from '@src/components/Common/dynamicTitle'

import Layout2 from './Layout2'

export default function NonLayoutWrapper({ children }) {
  const pathname = usePathname()
  const route = routes.find((r) => r.path === pathname)

  useEffect(() => {
    document.title = route
      ? `${route.title} | Domiex - Next JS Admin & Dashboard Template`
      : 'Domiex - Next JS Admin & Dashboard Template'
  }, [route])

  return <Layout2>{children}</Layout2>
}
