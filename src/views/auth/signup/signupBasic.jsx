'use client'

import { useState } from 'react'

import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

import logoWhite from '@assets/images/logo-white.png'
import mainLogo from '@assets/images/main-logo.png'
import google from '@assets/images/others/google.png'
import { Eye, EyeOff } from 'lucide-react'
import { signIn } from 'next-auth/react'

export default function SignupPage() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    name: '',
    email: '',
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

      router.push('/auth/signin-basic')
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="relative flex items-center justify-center min-h-screen py-12 from-sky-100 dark:from-sky-500/15 ltr:bg-gradient-to-l rtl:bg-gradient-to-r via-green-50 dark:via-green-500/10 to-pink-50 dark:to-pink-500/10">
      <div className="container">
        <div className="grid grid-cols-12">
          <div className="col-span-12 mb-0 md:col-span-10 lg:col-span-6 xl:col-span-4 md:col-start-2 lg:col-start-4 xl:col-start-5 card">
            <div className="md:p-10 card-body">
              <div className="mb-5 text-center">
                <Link href="/">
                  <Image
                    src={mainLogo}
                    alt="logo"
                    className="h-8 mx-auto dark:hidden"
                    width={175}
                    height={32}
                  />
                  <Image
                    src={logoWhite}
                    alt="logo"
                    className="hidden h-8 mx-auto dark:inline-block"
                    width={175}
                    height={32}
                  />
                </Link>
              </div>
              <h4 className="mb-2 font-bold leading-relaxed text-center text-transparent drop-shadow-lg ltr:bg-gradient-to-r rtl:bg-gradient-to-l from-primary-500 vie-purple-500 to-pink-500 bg-clip-text">
                Create a New Account
              </h4>
              <p className="mb-5 text-center text-gray-500 dark:text-dark-500">
                Already have an account?
                <Link
                  href="/auth/signin-basic"
                  className="font-medium link link-primary">
                  Sign In
                </Link>
              </p>
              {error && <p className="text-sm text-red-500">{error}</p>}
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-12 gap-4 mt-5">
                  <div className="col-span-12 md:col-span-6">
                    <label htmlFor="firstNameInput" className="form-label">
                      First Name
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      id="firstNameInput"
                      className="w-full form-input"
                      placeholder="Enter your first name"
                      value={formData.firstName}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-span-12 md:col-span-6">
                    <label htmlFor="lastNameInput" className="form-label">
                      Last Name
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      id="lastNameInput"
                      className="w-full form-input"
                      placeholder="Enter your last name"
                      value={formData.lastName}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-span-12 md:col-span-6">
                    <label htmlFor="userNameInput" className="form-label">
                      Username
                    </label>
                    <input
                      type="text"
                      id="userNameInput"
                      name="name"
                      className="w-full form-input"
                      placeholder="Enter your username"
                      value={formData.name}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-span-12 md:col-span-6">
                    <label htmlFor="emailInput" className="form-label">
                      Email
                    </label>
                    <input
                      type="email"
                      id="emailInput"
                      name="email"
                      className="w-full form-input"
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={handleChange}
                    />
                    <p className="text-sm text-red-500" />
                  </div>
                  <div className="col-span-12">
                    <label htmlFor="passwordInput" className="form-label">
                      Password
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        id="passwordInput"
                        name="password"
                        className="ltr:pr-8 rtl:pl-8 form-input"
                        placeholder="Enter your password"
                        value={formData.password}
                        onChange={handleChange}
                      />
                      <button
                        type="button"
                        className="absolute inset-y-0 flex items-center text-gray-500 dark:text-dark-500 ltr:right-3 rtl:left-3 focus:outline-hidden"
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
                    <label
                      htmlFor="confirmPasswordInput"
                      className="form-label">
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
                        className="absolute inset-y-0 flex items-center text-gray-500 dark:text-dark-500 ltr:right-3 rtl:left-3 focus:outline-hidden"
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
                        id="checkboxBasic1"
                        className="input-check shrink-0"
                        type="checkbox"
                      />
                      <label
                        htmlFor="checkboxBasic1"
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
              <div className="relative my-5 text-center text-gray-500 dark:text-dark-500 before:absolute before:border-gray-200 dark:before:border-dark-800 before:border-dashed before:w-full ltr:before:left-0 rtl:before:right-0 before:top-2.5 before:border-b">
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
                    alt="googleLogo"
                    className="inline-block h-4 ltr:mr-1 rtl:ml-1"
                    width={16}
                    height={16}
                    onClick={() =>
                      signIn('github', { callbackUrl: '/dashboards' })
                    }
                  />
                  SignUp Vie Google
                </button>
                <button
                  type="button"
                  className="w-full border-gray-200 dark:border-dark-800 btn hover:bg-gray-50 dark:hover:bg-dark-850 hover:text-primary-500">
                  <i className="ri-facebook-fill text-[20px] inline-block ltr:mr-1 rtl:ml-1 size-4 text-primary-500" />
                  SignUp Vie Facebook
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
