'use client'

import { LAYOUT_DIRECTION } from '@src/components/constants/layout'
import ForgotPasswordBasic from '@src/views/auth/forgotPassword/forgotPasswordBasic'
import { useSelector } from 'react-redux'
import { ToastContainer } from 'react-toastify'

const ForgotPasswordBasicPage = () => {
  const { layoutMode, layoutDirection } = useSelector((state) => state.Layout)
  return (
    <>
      <ForgotPasswordBasic />
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

export default ForgotPasswordBasicPage
