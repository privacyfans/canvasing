'use client'

import { useState } from 'react'

import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

import whiteLogo from '@assets/images/logo-white.png'
import backgroundImg from '@assets/images/others/auth.jpg'
import { MoveRight } from 'lucide-react'
import { toast } from 'react-toastify'

const ForgotPasswordModern = () => {
  const [email, setEmail] = useState('')
  const router = useRouter()
  const handleSubmit = (e) => {
    e.preventDefault()
    if (!email) {
      toast.error('Please enter your email')
      return
    } else {
      router.push('/auth/two-step-verification-modern')
    }
  }
  return (
    <>
      <div
        className="flex items-center justify-center min-h-screen py-12 bg-center bg-cover"
        style={{ backgroundImage: `url(${backgroundImg.src})` }}>
        {' '}
        <div className="absolute inset-0 bg-gray-950/50" />
        <div className="container relative">
          <div className="grid grid-cols-12">
            <div className="col-span-12 mb-0 border-none shadow-none md:col-span-10 lg:col-span-6 xl:col-span-4 md:col-start-2 lg:col-start-4 xl:col-start-5 card bg-white/10 backdrop-blur-md">
              <div className="md:p-10 card-body">
                <div className="mb-5 text-center">
                  <Link href="#!">
                    <Image
                      src={whiteLogo}
                      alt="logo"
                      className="h-8 mx-auto "
                      width={176}
                      height={32}
                    />
                  </Link>
                </div>
                <h4 className="mb-2 leading-relaxed text-center text-white">
                  Forgot your Password?
                </h4>
                <p className="mb-5 text-center text-white/75">
                  Enter your email or username to reset it.
                </p>

                <form onSubmit={handleSubmit}>
                  <div className="grid grid-cols-12 gap-4 mt-5">
                    <div className="col-span-12">
                      <label
                        htmlFor="emailInput"
                        className="form-label text-white/75">
                        Email or Username
                      </label>
                      <input
                        type="text"
                        id="emailInput"
                        className="text-white border-none form-input bg-white/10 placeholder:text-white/75"
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
                      <p className="mt-3 text-center text-white/75">
                        Return to the
                        <Link
                          href="/auth/signin-modern"
                          className="font-medium text-white/75 hover:text-white link">
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
    </>
  )
}

export default ForgotPasswordModern
