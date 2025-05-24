'use client'

import { LAYOUT_DIRECTION } from '@src/components/constants/layout'
import TwoStepVerificationModern from '@src/views/auth/twoStepVerification/twoStepVerificationModern'
import { useSelector } from 'react-redux'
import { ToastContainer } from 'react-toastify'

const TwoStepVerificationModernPage = () => {
  const { layoutMode, layoutDirection } = useSelector((state) => state.Layout)
  return (
    <>
      <TwoStepVerificationModern formId="otp-form1" />
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

export default TwoStepVerificationModernPage
