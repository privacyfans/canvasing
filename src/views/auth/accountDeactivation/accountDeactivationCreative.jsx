'use client'

import Image from 'next/image'
import Link from 'next/link'

import whiteLogo from '@assets/images/logo-white.png'
import mainlogo from '@assets/images/main-logo.png'
import creativeauth from '@assets/images/others/auth-creative.png'
import { EyeOff, Trash2 } from 'lucide-react'

const AccountDeactivationCreative = () => {
  return (
    <>
      <div className="relative">
        <div className="grid grid-cols-12">
          <div className="relative col-span-12 py-8 overflow-hidden bg-gray-100 dark:bg-dark-850 lg:min-h-screen lg:col-span-6 md:p-9 xl:p-12">
            <div className="absolute bottom-0 w-32 -rotate-45 -top-64 -right-8 bg-gray-200/20 dark:bg-dark-800/20" />
            <div className="p-4">
              <Link href="/">
                <Image
                  src={mainlogo}
                  alt="logo"
                  className="inline-block h-8 mx-auto dark:hidden"
                  width={176}
                  height={32}
                />
                <Image
                  src={whiteLogo}
                  alt="logo"
                  className="hidden h-8 mx-auto dark:inline-block"
                  width={176}
                  height={32}
                />
              </Link>
              <h1 className="max-w-lg mt-8 text-2xl font-normal leading-tight capitalize md:leading-tight md:text-4xl">
                The most straightforward way to manage your projects
              </h1>

              <Image
                src={creativeauth}
                alt="creativeauthImg"
                className="mt-9 xl:mt-0 relative xl:absolute xl:scale-110 rounded-lg shadow-lg xl:top-[315px] xl:left-[115px]"
              />
            </div>
          </div>
          <div className="flex items-center col-span-12 lg:min-h-screen lg:col-span-6 py-9 md:py-12">
            <div className="grid w-full grid-cols-12">
              <div className="col-span-12 mx-4 mb-0 2xl:col-span-8 2xl:col-start-3 md:mx-12 card">
                <div className="md:p-10 card-body">
                  <div className="mb-5 text-center">
                    <Link href="/">
                      <Image
                        src={mainlogo}
                        creativeauth
                        className="inline-block h-8 mx-auto dark:hidden"
                        width={176}
                        height={32}
                        alt="Logo"
                      />
                      <Image
                        src={whiteLogo}
                        creativeauth
                        className="hidden h-8 mx-auto dark:inline-block"
                        width={176}
                        height={32}
                        alt="Logo"
                      />
                    </Link>
                  </div>
                  <h4 className="mb-1 font-bold leading-relaxed text-center text-transparent drop-shadow-lg ltr:bg-gradient-to-r rtl:bg-gradient-to-l from-primary-500 vie-purple-500 to-pink-500 bg-clip-text">
                    Account Deactivation
                  </h4>
                  <p className="mb-6 text-center text-gray-500">
                    CNVSG Security and Privacy
                  </p>
                  <div className="flex gap-3 mb-3">
                    <div className="shrink-0">
                      <EyeOff />
                    </div>
                    <div className="grow">
                      <h6 className="mb-1">Temporary Disable</h6>
                      <p className="text-gray-500">
                        The customer is very important and will be followed up
                        with care. Everyone&apos;s needs are expected to be met.
                        It is not just about the process, but about benefiting
                        everyone, with an emphasis on ecological mindfulness.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="shrink-0">
                      <Trash2 />
                    </div>
                    <div className="grow">
                      <h6 className="mb-1">Permanent Delete</h6>
                      <p className="text-gray-500">
                        The customer is very important and will receive
                        dedicated attention. Everyone&apos;s needs and
                        expectations are considered. This process is undertaken
                        for the benefit of all, with a focus on ecological
                        responsibility.
                      </p>
                    </div>
                  </div>
                  <div className="justify-center gap-2 mt-6 sm:flex">
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
      </div>
    </>
  )
}

export default AccountDeactivationCreative
