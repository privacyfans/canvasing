'use client'

import { LAYOUT_DIRECTION } from '@src/components/constants/layout'
import SigninBasic from '@src/views/auth/signIn/signinBasic'
import { useSelector } from 'react-redux'
import { ToastContainer } from 'react-toastify'

const SignInPage = () => {
  const { layoutMode, layoutDirection } = useSelector((state) => state.Layout)
  return (
    <>
      <SigninBasic />
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

export default SignInPage