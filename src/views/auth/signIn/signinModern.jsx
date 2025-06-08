'use client'

import { useState } from 'react'

import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

import mainLogo from '@assets/images/logo-white.png'
import backgroundImg from '@assets/images/others/auth.jpg'
import google from '@assets/images/others/google.png'
import { Eye, EyeOff } from 'lucide-react'

const SigninBasic = () => {
  const [show, setShow] = useState(false)

  const handleToggle = () => setShow((prev) => !prev)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
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
      formData.email === allowedCredentials.adminEmail &&
      formData.password === allowedCredentials.adminPassword
    const isUserValid =
      formData.email === allowedCredentials.userEmail &&
      formData.password === allowedCredentials.userPassword
    if (!isAdminValid && !isUserValid) {
      // Show an alert if neither admin nor user credentials are correct
      showAlert('Invalid email or password', 'bg-red-100 text-red-500')
      return
    }
    showAlert(
      `You've successfully signed in to CNVSG!`,
      'bg-green-100 text-green-500'
    )
    setTimeout(() => {
      router.push('/dashboards')
    }, 1000)
  }

  const showAlert = (message, type) => {
    setAlert({ isVisible: true, message, type })
  }

  const handleInputChange = (e) => {
    const { id, value } = e.target
    setFormData({ ...formData, [id]: value })
  }

  // handle admin login
  const handleAdminLogin = () => {
    setFormData({ email: 'admin@example.com', password: 'admin@123' })
  }
  // handle user login
  const handleGuestLogin = () => {
    setFormData({ email: 'user@example.com', password: 'user@123' })
  }

  return (
    <div
      className="flex items-center justify-center min-h-screen py-12 bg-center bg-cover"
      style={{ backgroundImage: `url(${backgroundImg.src})` }}>
      {' '}
      <div className="absolute inset-0 bg-gray-950/50" />
      <div className="container relative">
        <div className="grid grid-cols-12">
          <div className="col-span-12 mb-0 border-none shadow-none md:col-span-10 lg:col-span-6 xl:col-span-4 md:col-start-2 lg:col-start-4 xl:col-start-5 card bg-white/10 backdrop-blur-md">
            {' '}
            <div className="md:p-10 card-body">
              <div className="mb-5 text-center">
                <Link href="#!">
                  <Image
                    src={mainLogo}
                    alt="logo"
                    className="h-8 mx-auto"
                    style={{ width: '175px', height: '32px' }}
                  />
                </Link>
              </div>
              <h4 className="mb-2 leading-relaxed text-center text-white">
                Welcome Back, Sofia!
              </h4>
              <p className="mb-5 text-center text-white/75">
                Don&apos;t have an account?
                <Link
                  href="/auth/signup-modern"
                  className="font-medium text-white">
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
                <div className="grid grid-cols-12 gap-5 mt-5">
                  <div className="col-span-12">
                    <label htmlFor="email" className="form-label text-white/75">
                      Email Or Username
                    </label>
                    <input
                      type="text"
                      id="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="text-white border-none form-input bg-white/10 placeholder:text-white/75"
                      placeholder="Enter your email or username"
                    />
                  </div>
                  <div className="col-span-12">
                    <div>
                      <label
                        htmlFor="password"
                        className="block mb-2 text-sm text-white/75">
                        Password
                      </label>
                      <div className="relative">
                        <input
                          type={show ? 'text' : 'password'}
                          id="password"
                          value={formData.password}
                          onChange={handleInputChange}
                          className="text-white border-none ltr:pr-8 rtl:pl-8 form-input bg-white/10 placeholder:text-white/75"
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
                          className="border-0 input-check input-check-primary bg-white/10"
                          type="checkbox"
                        />
                        <label
                          htmlFor="checkboxBasic1"
                          className="input-check-label text-white/75">
                          Remember me
                        </label>
                      </div>
                      <Link
                        href="/auth/forgot-password-modern"
                        className="block text-sm font-medium text-right underline transition duration-300 ease-linear shrink-0 text-white/75 hover:text-white">
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
              <p className="relative my-5 text-center text-white/75">OR</p>
              <div className="flex flex-col gap-2">
                <button
                  type="button"
                  className="w-full border-white/10 text-white/75 btn hover:bg-white/10 hover:text-white">
                  <Image
                    src={google}
                    alt="googleLogo"
                    className="inline-block h-4 ltr:mr-1 rtl:ml-1"
                    style={{ width: '16px', height: '16px' }}
                  />
                  SignIn Via Google
                </button>
                <button
                  type="button"
                  className="w-full border-white/10 text-white/75 btn hover:bg-white/10 hover:text-white">
                  <i className="ri-facebook-fill text-[14px] inline-block ltr:mr-1 rtl:ml-1 size-4 text-primary-500" />
                  Sign In Via Facebook
                </button>
              </div>
              <div className="flex items-center gap-3 mt-5">
                <div className="grow">
                  <h6 className="mb-1 text-white">Admin</h6>
                  <p className="text-white/75">Email: admin@example.com</p>
                  <p className="text-white/75">Password: admin@123</p>
                </div>
                <button
                  className="shrink-0 btn btn-sub-gray"
                  onClick={handleAdminLogin}>
                  Login
                </button>
              </div>
              <div className="flex items-center gap-3 mt-3">
                <div className="grow">
                  <h6 className="mb-1 text-white">Users</h6>
                  <p className="text-white/75">Email: user@example.com</p>
                  <p className="text-white/75">Password: user@123</p>
                </div>
                <button
                  className="shrink-0 btn btn-sub-gray"
                  onClick={handleGuestLogin}>
                  Login
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SigninBasic
