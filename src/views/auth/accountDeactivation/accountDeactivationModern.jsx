'use client'

import Image from 'next/image'
import Link from 'next/link'

import mainLogo from '@assets/images/logo-white.png'
import backgroundImg from '@assets/images/others/auth.jpg'
import { EyeOff, Trash2 } from 'lucide-react'

const AccountDeactivationModern = () => {
  return (
    <>
      <div
        className="flex items-center justify-center min-h-screen py-12 bg-center bg-cover"
        style={{ backgroundImage: `url(${backgroundImg.src})` }}>
        <div className="absolute inset-0 bg-gray-950/50" />
        <div className="container relative">
          <div className="grid grid-cols-12">
            <div className="col-span-12 mb-0 border-none shadow-none md:col-span-10 lg:col-span-6 xl:col-span-4 md:col-start-2 lg:col-start-4 xl:col-start-5 card bg-white/10 backdrop-blur-md">
              {' '}
              <div className="md:p-10 card-body">
                <div className="mb-5 text-center">
                  <Link href="/">
                    <Image
                      src={mainLogo}
                      alt="mainLogo"
                      className="h-8 mx-auto"
                      width={148}
                      height={32}
                    />
                  </Link>
                </div>
                <h4 className="mb-2 leading-relaxed text-center text-white">
                  Account Deactivation
                </h4>
                <p className="mb-5 text-center text-white/75">
                  CNVSG Security and Privacy
                </p>
                <div className="flex gap-3 mb-3">
                  <div className="text-white shrink-0">
                    <EyeOff />
                  </div>
                  <div className="grow">
                    <h6 className="mb-1 text-white">Temporary Disable</h6>
                    <p className="text-white/60">
                      The customer is very important and will be followed up
                      with care. Everyone&apos;s needs are expected to be met.
                      It is not just about the process, but about benefiting
                      everyone, with an emphasis on ecological mindfulness.
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="text-white shrink-0">
                    <Trash2 />
                  </div>
                  <div className="grow">
                    <h6 className="mb-1 text-white">Permanent Delete</h6>
                    <p className="text-white/60">
                      The customer is very important and will receive dedicated
                      attention. Everyone&apos;s needs and expectations are
                      considered. This process is undertaken for the benefit of
                      all, with a focus on ecological responsibility.
                    </p>
                  </div>
                </div>
                <div className="sm:flex justify-center gap-2 mt-6">
                  <Link href="#!" className="btn btn-primary">
                    Temporary Disable
                  </Link>
                  <Link href="#!" className="btn btn-red mt-2.5 sm:mt-0">
                    Permanent Delete
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

export default AccountDeactivationModern
