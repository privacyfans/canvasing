'use client'

import { useState } from 'react'

import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

import whiteLogo from '@assets/images/logo-white.png'
import backgroundImg from '@assets/images/others/auth.jpg'
import google from '@assets/images/others/google.png'
import { Eye, EyeOff } from 'lucide-react'

const SignupModern = () => {
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

      router.push('/auth/signin-modern')
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
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
            <div className="p-10 card-body">
              <div className="mb-5 text-center">
                <Link href="#!">
                  <Image
                    src={whiteLogo}
                    alt="logo"
                    width={175}
                    height={32}
                    className="h-8 mx-auto"
                  />
                </Link>
              </div>
              <h4 className="mb-2 leading-relaxed text-center text-white">
                Create a New Account
              </h4>
              <p className="mb-5 text-center text-white/75">
                Already have an account?
                <Link
                  href="/auth/signin-modern"
                  className="font-medium text-white">
                  Sign In
                </Link>
              </p>
              {error && <p className="text-sm text-red-500">{error}</p>}
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-12 gap-4 mt-5">
                  <div className="col-span-6">
                    <label
                      htmlFor="firstNameInput"
                      className="form-label text-white/75">
                      First Name
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      className="text-white border-none form-input bg-white/10 placeholder:text-white/75"
                      placeholder="Enter your first name"
                      value={formData.firstName}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-span-6">
                    <label
                      htmlFor="lastNameInput"
                      className="form-label text-white/75">
                      Last Name
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      className="text-white border-none form-input bg-white/10 placeholder:text-white/75"
                      placeholder="Enter your last name"
                      value={formData.lastName}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-span-6">
                    <label
                      htmlFor="userNameInput"
                      className="form-label text-white/75">
                      Username
                    </label>
                    <input
                      type="text"
                      id="username"
                      name="name"
                      className="text-white border-none form-input bg-white/10 placeholder:text-white/75"
                      placeholder="Enter your username"
                      value={formData.name}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-span-6">
                    <label
                      htmlFor="emailInput"
                      className="form-label text-white/75">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className="text-white border-none form-input bg-white/10 placeholder:text-white/75"
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-span-12">
                    <label
                      htmlFor="passwordInput"
                      className="form-label text-white/75">
                      Password
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        id="passwordInput"
                        name="password"
                        className="text-white border-none ltr:pr-8 rtl:pl-8 form-input bg-white/10 placeholder:text-white/75"
                        placeholder="Enter your password"
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
                    <label
                      htmlFor="confirmPasswordInput"
                      className="form-label text-white/75">
                      Confirm Password
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        id="confirmPasswordInput"
                        name="confirmPassword"
                        className="text-white border-none ltr:pr-8 rtl:pl-8 form-input bg-white/10 placeholder:text-white/75"
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
                        className="border-0 input-check bg-white/10 shrink-0"
                        type="checkbox"
                      />
                      <label
                        htmlFor="agreeToTerms"
                        className="input-check-label text-white/75">
                        By creating an account, you agree to all of our terms,
                        conditions & policies.
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

              <div className="relative my-5 text-center text-white/75">
                <p>OR</p>
              </div>

              <div className="flex flex-col gap-2">
                <button
                  type="button"
                  className="w-full border-white/10 text-white/75 btn hover:bg-white/10 hover:text-white">
                  <Image
                    src={google}
                    alt="Google logo"
                    width={16}
                    height={16}
                    className="inline-block h-4 mx-2"
                  />
                  SignIn Via Google
                </button>
                <button
                  type="button"
                  className="w-full border-white/10 text-white/75 btn hover:bg-white/10 hover:text-white">
                  <i className="ri-facebook-fill text-[20px] inline-block ltr:mr-1 rtl:ml-1 size-4 text-primary-500" />
                  SignIn Via Facebook
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignupModern
