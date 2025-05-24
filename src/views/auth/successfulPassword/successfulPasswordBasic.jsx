'use client'

import Link from 'next/link'

import { CircleCheckBig, MoveRight } from 'lucide-react'

const SuccessfulPasswordBasic = () => {
  return (
    <>
      <div className="relative flex items-center justify-center min-h-screen py-12 from-sky-100 dark:from-sky-500/15 ltr:bg-gradient-to-l rtl:bg-gradient-to-r via-green-50 dark:via-green-500/10 to-pink-50 dark:to-pink-500/10">
        <div className="container">
          <div className="grid grid-cols-12">
            <div className="col-span-12 md:col-span-10 lg:col-span-6 xl:col-span-4 md:col-start-2 lg:col-start-4 xl:col-start-5 mb-0 card">
              <div className="md:p-10 card-body">
                <div className="mb-4 text-center">
                  <div className="flex items-center justify-center mx-auto size-14">
                    <CircleCheckBig className="text-green-500 stroke-1 size-10 fill-green-500/10" />
                  </div>
                </div>
                <h4 className="mb-2 font-bold leading-relaxed text-center text-transparent drop-shadow-lg ltr:bg-gradient-to-r rtl:bg-gradient-to-l from-primary-500 vie-purple-500 to-pink-500 bg-clip-text">
                  Password Reset!
                </h4>
                <p className="mb-5 text-center text-gray-500">
                  Your password has been successfully reset. Click below to
                  continue accessing your account.
                </p>
                <div className="text-center">
                  <Link href="/auth/signin-basic" className="btn btn-primary">
                    <span className="align-middle">Return to SignIn </span>
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

export default SuccessfulPasswordBasic
