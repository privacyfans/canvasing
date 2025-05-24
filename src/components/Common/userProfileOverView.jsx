'use client'

import { useState } from 'react'

import Image from 'next/image'
import Link from 'next/link'

import Image1 from '@assets/images/gallery/img-01.jpg'
import Image2 from '@assets/images/gallery/img-02.jpg'
import Image4 from '@assets/images/gallery/img-04.jpg'
import highQualityImage from '@assets/images/others/high-quality.png'
import newImage from '@assets/images/others/new.png'
import qualityImage from '@assets/images/others/quality.png'
import rewardImage from '@assets/images/others/reward.png'
import {
  BriefcaseBusiness,
  Cake,
  Globe,
  Mail,
  MapPin,
  Monitor,
  Phone,
} from 'lucide-react'
import { Tooltip } from 'react-tooltip'
import 'react-tooltip/dist/react-tooltip.css'

const UserProfileOverView = () => {
  const [followerCount, setFollowerCount] = useState(2459)
  const [isFollowing, setIsFollowing] = useState(false)
  const [active, setActive] = useState(false)

  const toggleFollowers = async () => {
    setIsFollowing(!isFollowing)
    setActive(true)

    const timer = setTimeout(() => {
      setActive(false)
      const newCount = isFollowing ? followerCount - 1 : followerCount + 1
      setFollowerCount(newCount)
    }, 1000)

    return () => clearTimeout(timer)
  }

  return (
    <>
      {/* profile status */}
      <div className="grid grid-cols-12 mt-space gap-space">
        <div className="col-span-12 md:col-span-5 lg:col-span-4">
          {/* followers and following */}
          <div className="card">
            <div className="card-body">
              <div className="grid grid-cols-2 gap-0 mb-4">
                <div className="text-center border-gray-200 ltr:border-r rtl:border-l dark:border-dark-800">
                  <h6 className="mb-1">{followerCount}</h6>
                  <p className="text-gray-500 dark:text-dark-500">Followers</p>
                </div>
                <div className="text-center">
                  <h6 className="mb-1">2459</h6>
                  <p className="text-gray-500 dark:text-dark-500">Following</p>
                </div>
              </div>
              <div>
                <button
                  className="w-full btn btn-sky btn-icon-text"
                  onClick={toggleFollowers}>
                  {isFollowing === true && active === false && (
                    <span className="flex items-center gap-2">
                      <i className="ri-user-unfollow-line" /> UnFollow
                    </span>
                  )}

                  {isFollowing === false && active === false && (
                    <span className="flex items-center gap-2">
                      <i className="ri-user-add-line" /> Follow
                    </span>
                  )}

                  {active && (
                    <svg
                      className="text-white size-4 animate-spin"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24">
                      <circle
                        className="opacity-0"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* introductions */}
          <div className="card">
            <div className="card-header">
              <h6 className="card-title">Introductions</h6>
            </div>
            <div className="card-body">
              <p className="mb-3 text-sm font-medium text-gray-500 uppercase dark:text-dark-500">
                About
              </p>
              <div className="flex flex-col gap-3">
                <h6 className="font-medium">
                  <Monitor className="inline-block text-gray-500 ltr:mr-2 rtl:ml-2 dark:text-dark-500 size-4" />
                  <span className="align-middle whitespace-nowrap">
                    Jason Statham
                  </span>
                </h6>
                <h6 className="font-medium">
                  <BriefcaseBusiness className="inline-block text-gray-500 ltr:mr-2 rtl:ml-2 dark:text-dark-500 size-4" />
                  <span className="align-middle whitespace-nowrap">
                    UI / UX Designer
                  </span>
                </h6>
                <h6 className="font-medium">
                  <MapPin className="inline-block text-gray-500 ltr:mr-2 rtl:ml-2 dark:text-dark-500 size-4" />
                  <span className="align-middle whitespace-nowrap">
                    Argentina
                  </span>
                </h6>
                <h6 className="font-medium">
                  <Cake className="inline-block text-gray-500 ltr:mr-2 rtl:ml-2 dark:text-dark-500 size-4" />
                  <span className="align-middle whitespace-nowrap">
                    24 Jun, 1998
                  </span>
                </h6>
              </div>

              <div className="flex flex-col gap-3 pt-4 mt-4 border-t border-gray-200 dark:border-dark-800">
                <h6 className="font-medium">
                  <Globe className="inline-block text-gray-500 ltr:mr-2 rtl:ml-2 dark:text-dark-500 size-4" />
                  <Link href="#!" className="align-middle whitespace-nowrap">
                    www.domiex.com
                  </Link>
                </h6>
                <h6 className="font-medium">
                  <Mail className="inline-block text-gray-500 ltr:mr-2 rtl:ml-2 dark:text-dark-500 size-4" />
                  <Link
                    href="mailto:support@example.com"
                    className="align-middle whitespace-nowrap">
                    support@example.com
                  </Link>
                </h6>
                <h6 className="font-medium">
                  <Phone className="inline-block text-gray-500 ltr:mr-2 rtl:ml-2 dark:text-dark-500 size-4" />
                  <Link
                    href="tel:+1511555333222"
                    className="align-middle whitespace-nowrap">
                    +(151) 1555 333 222
                  </Link>
                </h6>
                <h6 className="font-medium">
                  <i className="ri-twitter-line text-[20px]" />
                  <span className="align-middle whitespace-nowrap">
                    SRBThemes
                  </span>
                </h6>
              </div>

              {/* languages known */}
              <p className="flex flex-col gap-3 pt-4 mt-4 mb-3 text-sm font-medium text-gray-500 uppercase border-t border-gray-200 dark:border-dark-800 dark:text-dark-500">
                Fluent In
              </p>
              <div className="flex items-center gap-2">
                <span className="text-gray-500 bg-transparent border-gray-200 dark:border-dark-800 dark:text-dark-500 badge">
                  English
                </span>
                <span className="text-gray-500 bg-transparent border-gray-200 dark:border-dark-800 dark:text-dark-500 badge">
                  Madrian
                </span>
                <span className="text-gray-500 bg-transparent border-gray-200 dark:border-dark-800 dark:text-dark-500 badge">
                  French
                </span>
              </div>
            </div>
          </div>

          {/* Badges */}
          <div className="card">
            <div className="card-header">
              <h6 className="card-title">Badges</h6>
            </div>
            <div className="flex items-center gap-2 card-body">
              <div>
                <Image
                  src={newImage}
                  alt="New Users"
                  className="size-7"
                  data-tooltip-id="newUsersTooltip"
                  data-tooltip-content="New Users"
                />
                <Tooltip id="newUsersTooltip" />
              </div>
              <div>
                <Image
                  src={qualityImage}
                  alt="Verified Badge"
                  className="size-7"
                  data-tooltip-id="verifiedBadgeTooltip"
                  data-tooltip-content="Verified Badge"
                />
                <Tooltip id="verifiedBadgeTooltip" />
              </div>
              <div>
                <Image
                  src={highQualityImage}
                  alt="High Quality"
                  className="size-7"
                  data-tooltip-id="highQualityTooltip"
                  data-tooltip-content="High Quality"
                />
                <Tooltip id="highQualityTooltip" />
              </div>
              <div>
                <Image
                  src={rewardImage}
                  alt="Reward"
                  className="size-7"
                  data-tooltip-id="rewardTooltip"
                  data-tooltip-content="Reward"
                />
                <Tooltip id="rewardTooltip" />
              </div>
            </div>
          </div>
        </div>

        {/* profile data */}
        <div className="col-span-12 md:col-span-7 lg:col-span-8">
          <h6 className="mb-2">Overview</h6>
          <p className="mb-2 text-gray-500 dark:text-dark-500">
            Hello, I&apos;m <span className="font-medium">Jason Statham</span>,
            a passionate UI/UX designer dedicated to crafting seamless digital
            experiences that blend elegance with functionality. With a keen eye
            for detail and a deep understanding of user psychology, I strive to
            create interfaces that not only look stunning but also intuitively
            guide users towards their goals.
          </p>
          <p className="mb-3 text-gray-500 dark:text-dark-500">
            I believe in the power of collaboration and enjoy working closely
            with cross-functional teams, including developers, product managers,
            and stakeholders. By fostering open communication and incorporating
            diverse perspectives, I ensure that the final product exceeds
            expectations and delights users.
          </p>

          <h6 className="mb-2">Experience</h6>

          <ul className="timeline">
            <li className="timeline-primary active">
              <h6 className="mb-1">UI/UX Designer - March 2020 - Present</h6>
              <p className="mb-2 text-sm text-gray-500 dark:text-dark-500">
                XYZ Tech Solutions, San Francisco, CA
              </p>
              <ul className="flex flex-col gap-2 text-gray-500 list-disc list-inside dark:text-dark-500">
                <li>
                  Designed intuitive user interfaces for web and mobile
                  applications, focusing on user experience optimization.
                </li>
                <li>
                  Conducted user research, usability testing, and gathered
                  feedback to iterate on designs and improve user satisfaction.
                </li>
                <li>
                  Collaborated with cross-functional teams including product
                  managers, developers, and stakeholders to translate business
                  requirements into user-centric design solutions.
                </li>
                <li>
                  Created wireframes, prototypes, and mockups using tools such
                  as Sketch, Adobe XD, and Figma.
                </li>
                <li>
                  Implemented responsive design principles to ensure seamless
                  user experiences across various devices and screen sizes.
                </li>
                <li>
                  Led design workshops and presentations to communicate design
                  concepts and rationale to team members and stakeholders.
                </li>
                <li>
                  Contributed to the development of design systems and style
                  guides to maintain design consistency and scalability across
                  products.
                </li>
              </ul>
            </li>
            <li className="timeline-primary active">
              <h6 className="mb-1">Junior UI/UX Designer</h6>
              <p className="mb-2 text-sm text-gray-500 dark:text-dark-500">
                ABC Design Studio, New York, NY
              </p>
              <ul className="flex flex-col gap-2 text-gray-500 list-disc list-inside dark:text-dark-500">
                <li>
                  Assisted in the design and development of user interfaces for
                  web and mobile applications.
                </li>
                <li>
                  Conducted competitive analysis and market research to identify
                  design trends and best practices.
                </li>
                <li>
                  Collaborated with senior designers to create wireframes,
                  prototypes, and high-fidelity mockups.
                </li>
                <li>
                  Participated in usability testing sessions and analyzed user
                  feedback to refine design concepts.
                </li>
                <li>
                  Supported the implementation of design solutions by providing
                  assets and design specifications to development teams.
                </li>
                <li>
                  Maintained and organized design files and assets using version
                  control systems.
                </li>
              </ul>
            </li>
          </ul>

          <h6 className="mt-3 mb-2">Portfolio Highlights</h6>

          <div className="grid grid-cols-2 mb-5 lg:grid-cols-3 gap-space">
            <div className="text-center group/item">
              <div className="overflow-hidden rounded-md">
                <Image
                  src={Image1}
                  alt="galleryImg"
                  className="transition duration-200 ease-linear group-hover/item:scale-105 group-hover/item:skew-x-3"
                />
              </div>
              <h6 className="mt-2">
                <Link href="#!">Chat Application</Link>
              </h6>
            </div>
            <div className="text-center group/item">
              <div className="overflow-hidden rounded-md">
                <Image
                  src={Image2}
                  alt="galleryImg"
                  className="transition duration-200 ease-linear group-hover/item:scale-105 group-hover/item:skew-x-3"
                />
              </div>
              <h6 className="mt-2">
                <Link href="#!">CRM React Projects</Link>
              </h6>
            </div>
            <div className="text-center group/item">
              <div className="overflow-hidden rounded-md">
                <Image
                  src={Image4}
                  alt="galleryImg"
                  className="transition duration-200 ease-linear group-hover/item:scale-105 group-hover/item:skew-x-3"
                />
              </div>
              <h6 className="mt-2">
                <Link href="#!">HR Management Team</Link>
              </h6>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default UserProfileOverView
