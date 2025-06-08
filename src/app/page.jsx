'use client'

import { useEffect } from 'react'

import { useRouter } from 'next/navigation'

import { changeSettingModalOpen } from '@src/slices/layout/reducer'
import { useSession } from 'next-auth/react'
import { useDispatch } from 'react-redux'

import DashboardsPage from './(layout)/dashboards/page'
import DefaultLayout from './(layout)/layout'

export default function Home() {
  const router = useRouter()
  const dispatch = useDispatch()
  const { status } = useSession()
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin')
    } else {
      router.push('/dashboards')
      setTimeout(() => {
        dispatch(changeSettingModalOpen(true))
      }, 1000)
    }
  }, [status, router, dispatch])
  if (status === 'loading') {
    return <p>Loading...</p>
  }

  return (
    <>
      <DefaultLayout>
        <DashboardsPage />
      </DefaultLayout>
    </>
  )
}
