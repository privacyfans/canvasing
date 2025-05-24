'use client'

import { LAYOUT_DIRECTION } from '@src/components/constants/layout'
import ResetPasswordBasic from '@src/views/auth/resetPassword.jsx/resetPasswordBasic'
import { useSelector } from 'react-redux'
import { ToastContainer } from 'react-toastify'

const ResetPasswordBasicPage = () => {
  const { layoutMode, layoutDirection } = useSelector((state) => state.Layout)
  return (
    <>
      <ResetPasswordBasic />
      <ToastContainer
        theme={layoutMode}
        rtl={layoutDirection === LAYOUT_DIRECTION.RTL}
        position={
          layoutDirection === LAYOUT_DIRECTION.RTL ? 'top-left' : 'top-right'
        }
      />
    </>
  )
}

export default ResetPasswordBasicPage
