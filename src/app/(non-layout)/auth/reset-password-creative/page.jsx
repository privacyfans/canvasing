'use client'

import { LAYOUT_DIRECTION } from '@src/components/constants/layout'
import ResetPasswordCreative from '@src/views/auth/resetPassword.jsx/resetPasswordCreative'
import { useSelector } from 'react-redux'
import { ToastContainer } from 'react-toastify'

const ResetPasswordCreativePage = () => {
  const { layoutMode, layoutDirection } = useSelector((state) => state.Layout)
  return (
    <>
      <ResetPasswordCreative />
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

export default ResetPasswordCreativePage
