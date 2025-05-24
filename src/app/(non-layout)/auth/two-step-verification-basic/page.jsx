'use client'

import { LAYOUT_DIRECTION } from '@src/components/constants/layout'
import TwoStepVerificationBasic from '@src/views/auth/twoStepVerification/twoStepVerificationBasic'
import { useSelector } from 'react-redux'
import { ToastContainer } from 'react-toastify'

const TwoStepVerificationBasicPage = () => {
  const { layoutMode, layoutDirection } = useSelector((state) => state.Layout)
  return (
    <>
      <TwoStepVerificationBasic formId="otp-form1" />
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

export default TwoStepVerificationBasicPage
