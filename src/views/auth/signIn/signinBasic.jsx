'use client'

import { useState } from 'react'

import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

import logoWhite from '@assets/images/logo-white.png'
import LogoMain from '@assets/images/main-logo.png'
import Google from '@assets/images/others/google.png'
import { Eye, EyeOff } from 'lucide-react'
import { signIn, getSession } from 'next-auth/react'
import { toast } from 'react-toastify'

export default function LoginPage() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e) => {
  e.preventDefault()

  if (!username || !password || !username.trim() || !password.trim()) {
    toast.error('Username dan password diperlukan.')
    return
  }

  setIsLoading(true)

  try {
    console.log('=== LOGIN ATTEMPT ===')
    console.log('Username:', username)
    console.log('Environment check:', {
      NEXTAUTH_URL: process.env.NEXTAUTH_URL,
      API_URL: process.env.NEXT_PUBLIC_API_URL
    })
    
    const result = await signIn('credentials', {
      redirect: false,
      username: username.trim(), // Trim whitespace
      password: password.trim(), // Trim whitespace
      callbackUrl: '/dashboards',
    })

    console.log('=== SIGNIN RESULT ===')
    console.log('Result:', result)

    if (result?.ok) {
      console.log('SignIn successful, checking session...')
      
      const session = await getSession()
      console.log('Session after login:', session)
      
      if (session?.error) {
        console.log('Session error after login:', session.error)
        
        // Handle specific session errors
        if (session.error === 'RefreshAccessTokenError') {
          toast.error('Token kedaluwarsa. Silakan login ulang.')
        } else if (session.error === 'NoRefreshToken') {
          toast.error('Sesi tidak valid. Silakan login ulang.')
        } else {
          toast.error('Terjadi masalah dengan autentikasi. Silakan coba lagi.')
        }
        return
      }
      
      toast.success('Login berhasil!')
      router.push('/dashboards')
    } else {
      console.error('SignIn failed:', result)
      
      // Handle different error types
      if (result?.error === 'CredentialsSignin') {
        toast.error('Username atau password salah.')
      } else if (result?.error === 'Configuration') {
        toast.error('Konfigurasi autentikasi bermasalah. Periksa pengaturan server.')
      } else if (result?.error === 'AccessDenied') {
        toast.error('Akses ditolak.')
      } else if (result?.error?.includes('URL')) {
        toast.error('Konfigurasi URL tidak valid. Hubungi administrator.')
      } else {
        toast.error('Login gagal: ' + (result?.error || 'Kesalahan tidak diketahui'))
      }
    }
  } catch (error) {
    console.error('Login error:', error)
    
    // More specific error handling
    if (error.message?.includes('URL')) {
      toast.error('Konfigurasi URL tidak valid. Periksa pengaturan aplikasi.')
    } else if (error.message?.includes('fetch')) {
      toast.error('Tidak dapat terhubung ke server. Periksa koneksi internet.')
    } else {
      toast.error('Terjadi kesalahan: ' + error.message)
    }
  } finally {
    setIsLoading(false)
  }
}

  // Handle demo login
  const handleDemoLogin = async () => {
  const demoUsername = 'kcukc.admin'
  const demoPassword = '123456'

  setUsername(demoUsername)
  setPassword(demoPassword)
  setIsLoading(true)

  try {
    console.log('=== DEMO LOGIN ATTEMPT ===')
    
    const result = await signIn('credentials', {
      redirect: false,
      username: demoUsername,
      password: demoPassword,
      callbackUrl: '/dashboards',
    })

    console.log('Demo login result:', result)

    if (result?.ok) {
      const session = await getSession()
      console.log('Demo session:', session)
      
      if (session?.error) {
        console.log('Session error after demo login:', session.error)
        toast.error('Terjadi masalah dengan autentikasi demo.')
        return
      }
      
      toast.success('Login demo berhasil!')
      router.push('/dashboards')
    } else {
      console.error('Demo login failed:', result)
      toast.error(result?.error || 'Login demo gagal!')
    }
  } catch (error) {
    console.error('Demo login failed', error)
    
    if (error.message?.includes('URL')) {
      toast.error('Konfigurasi aplikasi bermasalah. Hubungi administrator.')
    } else {
      toast.error('Terjadi kesalahan saat login demo: ' + error.message)
    }
  } finally {
    setIsLoading(false)
  }
}

  return (
    <div className="relative flex items-center justify-center min-h-screen py-12 from-sky-100 dark:from-sky-500/15 ltr:bg-gradient-to-l rtl:bg-gradient-to-r via-green-50 dark:via-green-500/10 to-pink-50 dark:to-pink-500/10">
      <div className="container">
        <div className="grid grid-cols-12">
          <div className="col-span-12 mb-0 md:col-span-10 lg:col-span-6 xl:col-span-4 md:col-start-2 lg:col-start-4 xl:col-start-5 card">
            <div className="md:p-10 card-body">
              <div className="mb-5 text-center">
                <Link href="#">
                  <Image
                    src={LogoMain}
                    alt="LogoMain"
                    className="h-8 mx-auto dark:hidden"
                    width={175}
                    height={32}
                  />
                  <Image
                    src={logoWhite}
                    alt="whiteLogo"
                    className="hidden h-8 mx-auto dark:inline-block"
                    width={175}
                    height={32}
                  />
                </Link>
              </div>
              <h4 className="mb-2 font-bold leading-relaxed text-center text-transparent drop-shadow-lg ltr:bg-gradient-to-r rtl:bg-gradient-to-l from-primary-500 vie-purple-500 to-pink-500 bg-clip-text">
                Selamat Datang!
              </h4>
              <p className="mb-5 text-center text-gray-500 dark:text-dark-500">
                Silakan masuk untuk melanjutkan
              </p>
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-12 gap-5 mb-5 items-center">
                  <div className="col-span-12">
                    <label htmlFor="username" className="form-label">
                      Username
                    </label>
                    <input
                      type="text"
                      id="username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="w-full form-input"
                      placeholder="Masukkan username Anda"
                      disabled={isLoading}
                    />
                  </div>
                  <div className="col-span-12">
                    <label htmlFor="password" className="block mb-2 text-sm">
                      Password
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full ltr:pr-8 rtl:pl-8 form-input"
                        placeholder="Masukkan password Anda"
                        disabled={isLoading}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword((prev) => !prev)}
                        className="absolute inset-y-0 flex items-center text-gray-500 ltr:right-3 rtl:left-3 focus:outline-hidden dark:text-dark-500"
                        disabled={isLoading}>
                        {showPassword ? (
                          <Eye className="size-5" />
                        ) : (
                          <EyeOff className="size-5" />
                        )}
                      </button>
                    </div>
                  </div>
                  <div className="col-span-12">
                    <div className="flex items-center">
                      <div className="input-check-group grow">
                        <input
                          id="checkboxBasic1"
                          className="input-check input-check-primary"
                          type="checkbox"
                          disabled={isLoading}
                        />
                        <label
                          htmlFor="checkboxBasic1"
                          className="input-check-label">
                          Ingat saya
                        </label>
                      </div>
                      <Link
                        href="/auth/forgot-password-basic"
                        className="block text-sm font-medium underline transition duration-300 ease-linear ltr:text-right rtl:text-left shrink-0 text-primary-500 hover:text-primary-600">
                        Lupa Password?
                      </Link>
                    </div>
                  </div>
                  <div className="col-span-12">
                    <button
                      type="submit"
                      className="w-full btn btn-primary"
                      disabled={isLoading}>
                      {isLoading ? 'Sedang Proses...' : 'Masuk'}
                    </button>
                  </div>
                </div>
              </form>

              <div className="relative my-5 text-center text-gray-500 dark:text-dark-500 before:absolute before:border-gray-200 dark:before:border-dark-800 before:border-dashed before:w-full ltr:before:left-0 rtl:before:right-0 before:top-2.5 before:border-b">
                <p className="relative inline-block px-2 bg-white dark:bg-dark-900">
                  ATAU
                </p>
              </div>

              {/* Demo login section */}
              <div className="flex items-center gap-3 mt-5">
                <div className="grow">
                  <h6 className="mb-1">Demo User</h6>
                  <p className="text-gray-500 dark:text-dark-500">
                    Username: kcukc.admin
                  </p>
                  <p className="text-gray-500 dark:text-dark-500">
                    Password: 123456
                  </p>
                </div>
                <button
                  className="shrink-0 btn btn-sub-gray"
                  onClick={handleDemoLogin}
                  disabled={isLoading}>
                  {isLoading ? 'Loading...' : 'Login Demo'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}