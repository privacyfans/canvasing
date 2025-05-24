'use client'

import Link from 'next/link'

import backgroundImg from '@assets/images/others/auth.jpg'
import { CircleCheckBig, MoveRight } from 'lucide-react'

const SuccessfulPasswordModern = () => {
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
                <div className="mb-4 text-center">
                  <div className="flex items-center justify-center mx-auto size-14">
                    <CircleCheckBig className="text-green-500 stroke-1 size-10 fill-green-100/20" />
                  </div>
                </div>
                <h4 className="mb-2 leading-relaxed text-center text-white">
                  Password Reset!
                </h4>
                <p className="mb-5 text-center text-white/75">
                  Your password has been successfully reset. Click below to
                  continue accessing your account.
                </p>
                <div className="text-center">
                  <Link href="/auth/signin-modern" className="btn btn-primary">
                    <span className="align-middle">Return to SignIn</span>
                    <MoveRight className="inline-block size-4 ml-0.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default SuccessfulPasswordModern
