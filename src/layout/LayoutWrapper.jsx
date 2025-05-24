'use client'

import { useEffect } from 'react'

import { usePathname } from 'next/navigation'

import { routes } from '@src/components/Common/dynamicTitle'
import Layout from '@src/layout/Layout'

export default function LayoutWrapper({ children }) {
  const pathname = usePathname()
  const route = routes.find((r) => r.path === pathname)

  useEffect(() => {
    document.title = route
      ? `${route.title} | Domiex - Next JS Admin & Dashboard Template`
      : 'Domiex - Next JS Admin & Dashboard Template'
  }, [route])

  return <Layout>{children}</Layout>
}
