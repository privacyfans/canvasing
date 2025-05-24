'use client'

import { useState } from 'react'

import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

import whiteLogo from '@assets/images/logo-white.png'
import mainLogo from '@assets/images/main-logo.png'
import authCreative from '@assets/images/others/auth-creative.png'
import google from '@assets/images/others/google.png'
import { Eye, EyeOff } from 'lucide-react'

const SignupCreative = () => {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    name: '', // Pre-filled based on provided data
    email: '', // Pre-filled based on provided data
    password: '',
    confirmPassword: '',
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
    if (error) setError(null) // Clear error when user types
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const { name, email, password, confirmPassword } = formData

    if (!name || !email || !password || !confirmPassword) {
      setError('Please fill in all required fields')
      setLoading(false)
      return
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match')
      setLoading(false)
      return
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long')
      setLoading(false)
      return
    }

    try {
      const res = await fetch('/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.message || 'Something went wrong')
      }

      router.push('/auth/signin-creative')
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="relative">
      <div className="grid grid-cols-12">
        <div className="relative col-span-12 py-8 overflow-hidden bg-gray-100 dark:bg-dark-850 lg:min-h-screen lg:col-span-6 md:p-9 xl:p-12">
          <div className="absolute bottom-0 w-32 -rotate-45 -top-64 -right-8 bg-gray-200/20 dark:bg-dark-800/20" />
          <div className="p-4">
            <Link href="/">
              <Image
                src={mainLogo}
                alt="logo"
                width={175}
                height={32}
                className="h-8 inline-block dark:hidden"
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
              src={authCreative}
              alt="Auth Creative"
              width={952}
              height={996}
              className="mt-9 xl:mt-0 relative xl:absolute xl:scale-110 rounded-lg shadow-lg xl:top-[315px] xl:left-[115px]"
            />
          </div>
        </div>
        <div className="flex items-center lg:min-h-screen col-span-12 lg:col-span-6 py-9 md:py-12">
          <div className="grid w-full grid-cols-12">
            <div className="col-span-12 2xl:col-span-8 2xl:col-start-3 mx-4 md:mx-12 mb-0 card">
              <div className="md:p-10 card-body">
                <h4 className="mb-2 font-bold leading-relaxed text-center text-transparent drop-shadow-lg bg-gradient-to-r from-primary-500 to-pink-500 bg-clip-text">
                  Create a New Account
                </h4>
                <p className="mb-5 text-center text-gray-500">
                  Already have an account?
                  <Link
                    href="/auth/signin-creative"
                    className="font-medium link link-primary">
                    Sign In
                  </Link>
                </p>
                {error && <p className="text-sm text-red-500">{error}</p>}
                <form onSubmit={handleSubmit}>
                  <div className="grid grid-cols-12 gap-4 mt-5">
                    <div className="col-span-12 md:col-span-6">
                      <label htmlFor="firstName" className="form-label">
                        First Name
                      </label>
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        className="w-full form-input"
                        placeholder="Enter your first name"
                        value={formData.firstName}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="col-span-12 md:col-span-6">
                      <label htmlFor="lastName" className="form-label">
                        Last Name
                      </label>
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        className="w-full form-input"
                        placeholder="Enter your last name"
                        value={formData.lastName}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="col-span-12 md:col-span-6">
                      <label htmlFor="username" className="form-label">
                        Username
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        className="w-full form-input"
                        placeholder="Enter your username"
                        value={formData.name}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="col-span-12 md:col-span-6">
                      <label htmlFor="email" className="form-label">
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        className="w-full form-input"
                        placeholder="Enter your email"
                        value={formData.email}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="col-span-12">
                      <label htmlFor="password" className="form-label">
                        Password
                      </label>
                      <div className="relative">
                        <input
                          type={showPassword ? 'text' : 'password'}
                          id="password"
                          name="password"
                          className="ltr:pr-8 rtl:pl-8 form-input"
                          placeholder="Enter your confirm password"
                          value={formData.password}
                          onChange={handleChange}
                        />
                        <button
                          type="button"
                          className="absolute inset-y-0 flex items-center text-gray-500 ltr:right-3 rtl:left-3 focus:outline-hidden"
                          onClick={() => setShowPassword((prev) => !prev)}>
                          {showPassword ? (
                            <Eye className="size-5" />
                          ) : (
                            <EyeOff className="size-5" />
                          )}
                        </button>
                      </div>
                    </div>
                    <div className="col-span-12">
                      <label htmlFor="confirmPassword" className="form-label">
                        Confirm Password
                      </label>
                      <div className="relative">
                        <input
                          type={showPassword ? 'text' : 'password'}
                          id="confirmPasswordInput"
                          name="confirmPassword"
                          className="ltr:pr-8 rtl:pl-8 form-input"
                          placeholder="Enter your confirm password"
                          value={formData.confirmPassword}
                          onChange={handleChange}
                        />
                        <button
                          type="button"
                          className="absolute inset-y-0 flex items-center text-gray-500 ltr:right-3 rtl:left-3 focus:outline-hidden"
                          onClick={() => setShowPassword((prev) => !prev)}>
                          {showPassword ? (
                            <Eye className="size-5" />
                          ) : (
                            <EyeOff className="size-5" />
                          )}
                        </button>
                      </div>
                    </div>
                    <div className="col-span-12">
                      <div className="items-start input-check-group grow">
                        <input
                          id="agreeToTerms"
                          className="input-check input-check-primary shrink-0"
                          type="checkbox"
                          name="agreeToTerms"
                        />
                        <label
                          htmlFor="agreeToTerms"
                          className="leading-normal input-check-label">
                          By creating an account, you agree to all of our terms
                          condition & policies.
                        </label>
                      </div>
                    </div>
                    <div className="col-span-12">
                      <button type="submit" className="w-full btn btn-primary">
                        Sign Up
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
                      alt="Google"
                      width={16}
                      height={16}
                      className="inline-block h-4 ltr:mr-1 rtl:ml-1"
                    />
                    Sign Up Via Google
                  </button>
                  <button
                    type="button"
                    className="w-full border-gray-200 dark:border-dark-800 btn hover:bg-gray-50 dark:hover:bg-dark-850 hover:text-primary-500">
                    <i className="ri-facebook-fill text-[20px] inline-block ltr:mr-1 rtl:ml-1 size-4 text-primary-500" />
                    Sign Up Via Facebook
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

export default SignupCreative
