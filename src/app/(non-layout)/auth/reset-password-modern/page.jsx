'use client'

import { LAYOUT_DIRECTION } from '@src/components/constants/layout'
import ResetPasswordModern from '@src/views/auth/resetPassword.jsx/resetPasswordModern'
import { useSelector } from 'react-redux'
import { ToastContainer } from 'react-toastify'

const ResetPasswordModernPage = () => {
  const { layoutMode, layoutDirection } = useSelector((state) => state.Layout)
  return (
    <>
      <ResetPasswordModern />
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

export default ResetPasswordModernPage
