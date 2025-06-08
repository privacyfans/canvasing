'use client'

import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'

import logoWhite from '@assets/images/logo-white.png'
import LogoMain from '@assets/images/main-logo.png'

const errorMessages = {
  Configuration: 'Ada masalah dengan konfigurasi server.',
  AccessDenied: 'Akses ditolak.',
  Verification: 'Token verifikasi tidak valid atau sudah kedaluwarsa.',
  Default: 'Terjadi kesalahan pada sistem autentikasi.',
  CredentialsSignin: 'Username atau password salah.',
  SessionRequired: 'Silakan login untuk mengakses halaman ini.',
  AuthError: 'Terjadi kesalahan saat autentikasi.',
  SessionExpired: 'Sesi Anda telah berakhir.',
}

export default function AuthErrorPage() {
  const searchParams = useSearchParams()
  const error = searchParams.get('error')
  const callbackUrl = searchParams.get('callbackUrl')

  const errorMessage = errorMessages[error] || errorMessages.Default

  return (
    <div className="relative flex items-center justify-center min-h-screen py-12 from-sky-100 dark:from-sky-500/15 ltr:bg-gradient-to-l rtl:bg-gradient-to-r via-green-50 dark:via-green-500/10 to-pink-50 dark:to-pink-500/10">
      <div className="container">
        <div className="grid grid-cols-12">
          <div className="col-span-12 mb-0 md:col-span-10 lg:col-span-6 xl:col-span-4 md:col-start-2 lg:col-start-4 xl:col-start-5 card">
            <div className="md:p-10 card-body">
              <div className="mb-5 text-center">
                <Link href="/">
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
              
              <div className="text-center">
                <div className="mb-4">
                  <div className="w-16 h-16 mx-auto mb-4 text-red-500">
                    <svg className="w-full h-full" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <h4 className="mb-2 font-bold text-2xl text-red-600">
                    Autentikasi Gagal
                  </h4>
                  <p className="mb-6 text-gray-600">
                    {errorMessage}
                  </p>
                </div>
                
                {error && (
                  <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded">
                    <p className="text-sm text-red-700">
                      <strong>Error Code:</strong> {error}
                    </p>
                  </div>
                )}
                
                <div className="space-y-3">
                  <Link 
                    href={`/auth/signin-basic${callbackUrl ? `?callbackUrl=${encodeURIComponent(callbackUrl)}` : ''}`}
                    className="w-full btn btn-primary">
                    Coba Login Lagi
                  </Link>
                  
                  <Link 
                    href="/debug"
                    className="w-full btn btn-secondary">
                    Debug Mode
                  </Link>
                  
                  <Link 
                    href="/"
                    className="block text-sm text-gray-500 hover:text-gray-700">
                    Kembali ke Beranda
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}