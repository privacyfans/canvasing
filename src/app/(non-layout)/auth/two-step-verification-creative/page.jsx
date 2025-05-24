'use client'

import { LAYOUT_DIRECTION } from '@src/components/constants/layout'
import TwoStepVerificationCreative from '@src/views/auth/twoStepVerification/twoStepVerificationCreative'
import { useSelector } from 'react-redux'
import { ToastContainer } from 'react-toastify'

const TwoStepVerificationCreativePage = () => {
  const { layoutMode, layoutDirection } = useSelector((state) => state.Layout)
  return (
    <>
      <TwoStepVerificationCreative formId="otp-form1" />
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

export default TwoStepVerificationCreativePage
