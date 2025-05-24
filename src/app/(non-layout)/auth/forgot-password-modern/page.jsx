'use client'

import { LAYOUT_DIRECTION } from '@src/components/constants/layout'
import ForgotPasswordModern from '@src/views/auth/forgotPassword/forgotPasswordModern'
import { useSelector } from 'react-redux'
import { ToastContainer } from 'react-toastify'

const ForgotPasswordModernPage = () => {
  const { layoutMode, layoutDirection } = useSelector((state) => state.Layout)
  return (
    <>
      <ForgotPasswordModern />
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

export default ForgotPasswordModernPage
