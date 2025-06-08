'use client'

import { useState } from 'react'

import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

import whiteLogo from '@assets/images/logo-white.png'
import mainLogo from '@assets/images/main-logo.png'
import auth from '@assets/images/others/auth-creative.png'
import google from '@assets/images/others/google.png'
import { Eye, EyeOff } from 'lucide-react'

const SigninCreative = () => {
  const [show, setShow] = useState(false)
  const handleToggle = () => setShow((prev) => !prev)
  const [formData, setFormData] = useState({
    emailOrUsername: 'admin@example.com',
    password: 'admin@123',
  })
  const [alert, setAlert] = useState({
    isVisible: false,
    message: '',
    type: 'bg-red-100 text-red-500',
  })

  const router = useRouter()

  const allowedCredentials = {
    adminEmail: 'admin@example.com',
    adminPassword: 'admin@123',
    userEmail: 'user@example.com',
    userPassword: 'user@123',
  }

  const validateForm = (e) => {
    e.preventDefault()
    setAlert({ ...alert, isVisible: false, message: '' })

    // Check if the form data matches either the admin or user credentials
    const isAdminValid =
      formData.emailOrUsername === allowedCredentials.adminEmail &&
      formData.password === allowedCredentials.adminPassword
    const isUserValid =
      formData.emailOrUsername === allowedCredentials.userEmail &&
      formData.password === allowedCredentials.userPassword
    if (!isAdminValid && !isUserValid) {
      // Show an alert if neither admin nor user credentials are correct
      showAlert('Invalid email or password', 'bg-red-100 text-red-500')
      return
    }

    // If all validations pass
    showAlert(
      `You've successfully signed in to CNVSG!`,
      'bg-green-100 text-green-500'
    )

    // Redirect to index.html after a short delay
    setTimeout(() => {
      router.push('/dashboards') // Adjust the path as needed
    }, 1000) // Adjust the delay as needed
  }

  const showAlert = (message, type) => {
    setAlert({ isVisible: true, message, type })
  }

  const handleInputChange = (e) => {
    const { id, value } = e.target
    setFormData({ ...formData, [id]: value })
  }

  return (
    <div className="relative">
      <div className="grid grid-cols-12">
        <div className="relative col-span-12 py-8 overflow-hidden bg-gray-100 dark:bg-dark-850 lg:min-h-screen lg:col-span-6 md:p-9 xl:p-12">
          <div className="absolute bottom-0 w-32 -rotate-45 -top-64 -right-8 bg-gray-200/20 dark:bg-dark-800/20" />
          <div className="p-4">
            <Link href="#!">
              <Image
                src={mainLogo}
                alt="logo"
                width={175}
                height={32}
                className="h-8 dark:hidden"
              />
              <Image
                src={whiteLogo}
                alt="logo"
                width={175}
                height={32}
                className="hidden h-8 dark:inline-block"
              />
            </Link>
            <h1 className="max-w-lg mt-8 text-2xl font-normal leading-tight capitalize md:leading-tight md:text-4xl">
              The most straightforward way to manage your projects
            </h1>
            <Image
              src={auth}
              alt="auth"
              style={{ widows: '952px', height: '996' }}
              className="mt-9 xl:mt-0 relative xl:absolute xl:scale-110 rounded-lg shadow-lg xl:top-[315px] xl:left-[115px]"
            />
          </div>
        </div>
        <div className="flex items-center col-span-12 lg:min-h-screen lg:col-span-6 py-9 md:py-12">
          <div className="grid w-full grid-cols-12">
            <div className="col-span-12 mx-4 mb-0 2xl:col-span-8 2xl:col-start-3 md:mx-12 card">
              <div className="md:p-10 card-body">
                <h4 className="mb-2 font-bold leading-relaxed text-center text-transparent drop-shadow-lg ltr:bg-gradient-to-r rtl:bg-gradient-to-l from-primary-500 vie-purple-500 to-pink-500 bg-clip-text">
                  Welcome Back, Sofia!
                </h4>
                <p className="mb-5 text-center text-gray-500">
                  Don&apos;t have an account?
                  <Link
                    href="/auth/signup-creative"
                    className="font-medium link link-primary">
                    Sign Up
                  </Link>
                </p>
                {alert.isVisible && (
                  <div
                    className={`relative py-3 text-sm rounded-md ltr:pl-5 rtl:pr-5 ltr:pr-7 rtl:pl-7 ${alert.type}`}>
                    <span>{alert.message}</span>
                    <button
                      onClick={() => setAlert({ ...alert, isVisible: false })}
                      className="absolute text-lg transition duration-200 ease-linear ltr:right-5 rtl:left-5 top-2">
                      <i className="ri-close-fill" />
                    </button>
                  </div>
                )}
                <form onSubmit={validateForm}>
                  <div className="grid grid-cols-12 gap-5 mb-5 items-center">
                    <div className="col-span-12">
                      <label htmlFor="emailOrUsername" className="form-label">
                        Email Or Username
                      </label>
                      <input
                        type="text"
                        id="emailOrUsername"
                        value={formData.emailOrUsername}
                        onChange={handleInputChange}
                        className="w-full form-input"
                        placeholder="Enter your email or username"
                      />
                    </div>
                    <div className="col-span-12">
                      <div>
                        <label
                          htmlFor="password"
                          className="block mb-2 text-sm">
                          Password
                        </label>
                        <div className="relative">
                          <input
                            type={show ? 'text' : 'password'}
                            id="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            className="w-full ltr:pr-8 rtl:pl-8 form-input"
                            placeholder="Enter your password"
                          />
                          <button
                            type="button"
                            onClick={handleToggle}
                            className="absolute inset-y-0 flex items-center text-gray-500 ltr:right-3 rtl:left-3 focus:outline-hidden dark:text-dark-500">
                            {show ? (
                              <Eye className="size-5" />
                            ) : (
                              <EyeOff className="size-5" />
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="col-span-12">
                      <div className="flex items-center">
                        <div className="input-check-group grow">
                          <input
                            id="checkboxBasic1"
                            className="input-check input-check-primary"
                            type="checkbox"
                          />
                          <label
                            htmlFor="checkboxBasic1"
                            className="input-check-label">
                            Remember me
                          </label>
                        </div>
                        <Link
                          href="/auth/forgot-password-creative"
                          className="block text-sm font-medium text-right underline transition duration-300 ease-linear shrink-0 text-primary-500 hover:text-primary-600">
                          Forgot Password?
                        </Link>
                      </div>
                    </div>
                    <div className="col-span-12">
                      <button type="submit" className="w-full btn btn-primary">
                        Sign In
                      </button>
                    </div>
                  </div>
                </form>

                <div className="relative my-5 text-center text-gray-500 before:absolute dark:text-dark-500 before:border-gray-200 dark:before:border-dark-800 before:border-dashed before:w-full ltr:before:left-0 rtl:before:right-0 before:top-2.5 before:border-b">
                  <p className="relative inline-block px-2 bg-white dark:bg-dark-900">
                    OR
                  </p>
                </div>

                <div className="flex flex-col gap-2">
                  <button
                    type="button"
                    className="w-full border-gray-200 dark:border-dark-800 btn hover:bg-gray-50 dark:hover:bg-dark-850 hover:text-primary-500">
                    <Image
                      src={google}
                      alt="logo"
                      width={16}
                      height={16}
                      className="inline-block h-4 ltr:mr-1 rtl:ml-1"
                    />
                    Sign In via Google
                  </button>
                  <button
                    type="button"
                    className="w-full border-gray-200 dark:border-dark-800 btn hover:bg-gray-50 dark:hover:bg-dark-850 hover:text-primary-500">
                    <i className="ri-facebook-fill text-[20px] inline-block ltr:mr-1 rtl:ml-1 size-4 text-primary-500" />
                    Sign In Via Facebook
                  </button>
                </div>

                <div className="items-center gap-3 mt-5 md:flex">
                  <div className="grow">
                    <h6 className="mb-1">Admin</h6>
                    <p className="text-gray-500">Email: admin@example.com</p>
                    <p className="text-gray-500">Password: admin@123</p>
                  </div>
                  <button
                    className="shrink-0 btn btn-sub-gray mt-2.5 md:mt-0"
                    onClick={() =>
                      setFormData({
                        emailOrUsername: 'admin@example.com',
                        password: 'admin@123',
                      })
                    }>
                    Login
                  </button>
                </div>

                <div className="items-center gap-3 mt-3 md:flex">
                  <div className="grow">
                    <h6 className="mb-1">Users</h6>
                    <p className="text-gray-500">Email: user@example.com</p>
                    <p className="text-gray-500">Password: user@123</p>
                  </div>
                  <button
                    className="shrink-0 btn btn-sub-gray mt-2.5 md:mt-0"
                    onClick={() =>
                      setFormData({
                        emailOrUsername: 'user@example.com',
                        password: 'user@123',
                      })
                    }>
                    Login
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SigninCreative
