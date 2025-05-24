'use client'

import { useState } from 'react'

import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

import whiteLogo from '@assets/images/logo-white.png'
import mainLogo from '@assets/images/main-logo.png'
import creativeAuth from '@assets/images/others/auth-creative.png'
import { MoveRight } from 'lucide-react'
import { toast } from 'react-toastify'

const ForgotPasswordCreative = () => {
  const [email, setEmail] = useState('')
  const router = useRouter()
  const handleSubmit = (e) => {
    e.preventDefault()
    if (!email) {
      toast.error('Please enter your email')
      return
    } else {
      router.push('/auth/two-step-verification-creative')
    }
  }
  return (
    <>
      <div className="relative">
        <div className="grid grid-cols-12">
          <div className="relative col-span-12 py-8 overflow-hidden bg-gray-100 dark:bg-dark-850 lg:min-h-screen lg:col-span-6 md:p-9 xl:p-12">
            <div className="absolute bottom-0 w-32 -rotate-45 -top-64 -right-8 bg-gray-200/20 dark:bg-dark-800/20" />
            <div className="p-4">
              <Link href="/">
                <Image
                  src={mainLogo}
                  alt="logo"
                  className="inline-block h-8 mx-auto dark:hidden"
                  width={175}
                  height={32}
                />
                <Image
                  src={whiteLogo}
                  alt="logo"
                  className="hidden h-8 mx-auto dark:inline-block"
                  width={175}
                  height={32}
                />
              </Link>
              <h1 className="max-w-lg mt-8 text-4xl font-normal leading-tight capitalize">
                The most straightforward way to manage your projects
              </h1>

              <Image
                src={creativeAuth}
                alt="creativeauthImg"
                className="absolute scale-110 rounded-lg shadow-lg top-[315px] left-[115px]"
              />
            </div>
          </div>
          <div className="flex items-center min-h-screen col-span-6 py-12">
            <div className="grid w-full grid-cols-12">
              <div className="col-span-8 col-start-3 mx-12 mb-0 card">
                <div className="p-10 card-body">
                  <h4 className="mb-2 font-bold leading-relaxed text-center text-transparent drop-shadow-lg ltr:bg-gradient-to-r rtl:bg-gradient-to-l from-primary-500 vie-purple-500 to-pink-500 bg-clip-text">
                    Forgot your Password?
                  </h4>
                  <p className="mb-5 text-center text-gray-500">
                    Enter your email or username to reset it.
                  </p>

                  <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-12 gap-4 mt-5">
                      <div className="col-span-12">
                        <label htmlFor="emailInput" className="form-label">
                          Email or Username
                        </label>
                        <input
                          type="text"
                          id="emailInput"
                          className="w-full form-input"
                          placeholder="Enter your email or username"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>
                      <div className="col-span-12">
                        <button
                          type="submit"
                          className="w-full px-4 py-2 text-white rounded-md bg-primary-500 hover:bg-primary-600">
                          Reset Password
                        </button>
                        <p className="mt-3 text-center text-gray-500">
                          Return to the
                          <Link
                            href="/auth/signin-creative"
                            className="font-medium underline link link-primary">
                            <span className="align-middle">Sign In</span>
                            <MoveRight className="inline-block rtl:mr-1 ltr:ml-1 size-4" />
                          </Link>
                        </p>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ForgotPasswordCreative
