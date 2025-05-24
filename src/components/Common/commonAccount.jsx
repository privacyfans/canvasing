import Image from 'next/image'

import user17 from '@assets/images/avatar/user-17.png'
import { BadgeCheck, Building2, CalendarDays, MapPin } from 'lucide-react'

const CommonAccount = () => {
  return (
    <>
      <div className="relative mb-6">
        <div className="relative overflow-hidden rounded-md h-44 bg-primary-500/10">
          <div className="border-[60px] border-t-primary-500 border-l-primary-500 absolute opacity-10 -top-2 left-0 rotate-45 size-96" />
          <div className="border-[60px] border-green-500 absolute opacity-10 top-20 left-8 rotate-45 size-80" />
          <div className="border-[60px] border-pink-500 absolute opacity-10 top-36 left-28 rotate-45 size-40" />
        </div>
        <div className="text-center">
          <div className="relative inline-block mx-auto">
            <div className="relative p-1 rounded-full bg-gradient-to-tr from-primary-300 via-red-300 to-green-300 -mt-14">
              <Image
                src={user17}
                alt="userImg"
                className="mx-auto border-4 border-white rounded-full dark:border-dark-900 size-28"
              />
            </div>
            <div className="absolute border-2 border-white dark:border-dark-900 rounded-full size-4 bg-green-500 bottom-2.5 ltr:right-2.5 rtl:left-2.5" />
          </div>
          <h5 className="mt-2 mb-1">
            Jason Statham
            <BadgeCheck className="inline-block text-primary-500 fill-primary-500/20 size-5" />
          </h5>
          <ul className="flex flex-wrap items-center justify-center gap-2 text-gray-500 dark:text-dark-500 text-14">
            <li>
              <Building2 className="inline-block ltr:mr-1 rtl:ml-1 size-4" />
              <span className="align-middle">UI / UX Designer</span>
            </li>
            <li>
              <MapPin className="inline-block ltr:mr-1 rtl:ml-1 size-4" />
              <span className="align-middle">Argentina</span>
            </li>
            <li>
              <CalendarDays className="inline-block ltr:mr-1 rtl:ml-1 size-4" />
              <span className="align-middle">24 April, 2024</span>
            </li>
          </ul>
        </div>
      </div>
    </>
  )
}

export default CommonAccount
