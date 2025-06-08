'use client'

import Link from 'next/link'

const Footer = () => {
  const brandName = process.env.NEXT_PUBLIC_BRAND_NAME || 'posfin'

  return (
    <>
      <div className="main-footer">
        <div className="w-full">
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
            <div className="hidden lg:block">
              <ul className="flex items-center gap-4">
                <li>
                  <Link
                    href="#!"
                    className="font-medium text-gray-500 transition duration-300 ease-linear dark:text-dark-500 hover:text-primary-500 dark:hover:text-primary-500">
                    About
                  </Link>
                </li>
              </ul>
            </div>
            <div className="text-center text-gray-500 dark:text-dark-500 ltr:lg:text-right rtl:lg:text-left">
              <div>
                &copy; {new Date().getFullYear()} CNVSG by
                <Link href="#!" className="ml-1 font-semibold">
                  {brandName}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Footer
