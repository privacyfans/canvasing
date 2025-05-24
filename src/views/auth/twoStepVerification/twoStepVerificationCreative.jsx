'use client'

import React, { useEffect, useRef } from 'react'

import Image from 'next/image'
import Link from 'next/link'

import whiteLogo from '@assets/images/logo-white.png'
import mainLogo from '@assets/images/main-logo.png'
import creativeAuth from '@assets/images/others/auth-creative.png'
import { MailOpen } from 'lucide-react'

const TwoStepVerificationCreative = ({ formId }) => {
  const formRef = useRef(null)
  const submitButtonRef = useRef(null)
  useEffect(() => {
    const form = formRef.current
    const inputs = form
      ? Array.from(form.querySelectorAll('input[type=text]'))
      : []
    const submitButton = submitButtonRef.current

    const handleKeyDown = (e) => {
      const target = e.target
      if (
        !/^[0-9]{1}$/.test(e.key) &&
        e.key !== 'Backspace' &&
        e.key !== 'Delete' &&
        e.key !== 'Tab' &&
        !e.metaKey
      ) {
        e.preventDefault()
      }

      if (e.key === 'Delete' || e.key === 'Backspace') {
        const index = inputs.indexOf(target)
        if (index > 0) {
          inputs[index - 1].value = ''
          inputs[index - 1].focus()
        }
      }
    }

    const handleInput = (e) => {
      const target = e.target
      const index = inputs.indexOf(target)
      if (target.value) {
        if (index < inputs.length - 1) {
          inputs[index + 1].focus()
        } else {
          submitButton?.focus()
        }
      }
    }

    const handleFocus = (e) => {
      e.target.select()
    }

    const handlePaste = (e) => {
      e.preventDefault()
      const text = e.clipboardData?.getData('text')
      if (!text || !/^[0-9]{6}$/.test(text)) return // Adjust length based on the number of inputs
      const digits = text.split('')
      inputs.forEach((input, index) => (input.value = digits[index]))
      submitButton?.focus()
    }

    inputs.forEach((input) => {
      input.addEventListener('input', handleInput)
      input.addEventListener('keydown', handleKeyDown)
      input.addEventListener('focus', handleFocus)
      input.addEventListener('paste', handlePaste)
    })

    return () => {
      inputs.forEach((input) => {
        input.removeEventListener('input', handleInput)
        input.removeEventListener('keydown', handleKeyDown)
        input.removeEventListener('focus', handleFocus)
        input.removeEventListener('paste', handlePaste)
      })
    }
  }, [formId])

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
                className="inline-block h-8 mx-auto dark:hidden"
                width={176}
                height={32}
              />
              <Image
                src={whiteLogo}
                alt="logo"
                className="hidden h-8 mx-auto dark:inline-block"
                width={176}
                height={32}
              />
            </Link>
            <h1 className="max-w-lg mt-8 text-2xl font-normal leading-tight capitalize md:leading-tight md:text-4xl">
              The most straightforward way to manage your projects
            </h1>
            <Image
              src={creativeAuth}
              alt="authImg"
              className="mt-9 xl:mt-0 relative xl:absolute xl:scale-110 rounded-lg shadow-lg xl:top-[315px] xl:left-[115px]"
            />
          </div>
        </div>
        <div className="flex items-center col-span-12 lg:min-h-screen lg:col-span-6 py-9 md:py-122">
          <div className="grid w-full grid-cols-12">
            <div className="col-span-12 mx-4 mb-0 2xl:col-span-8 2xl:col-start-3 md:mx-12 card">
              <div className="p-10 card-body">
                <div className="mb-4 text-center">
                  <div className="flex items-center justify-center mx-auto size-9 sm:size-12 md:size-14">
                    <MailOpen className="text-gray-500 stroke-1 dark:text-dark-500 size-10 fill-gray-100 dark:fill-dark-850" />
                  </div>
                </div>
                <h4 className="mb-2 font-bold leading-relaxed text-center text-transparent drop-shadow-lg ltr:bg-gradient-to-r rtl:bg-gradient-to-l from-primary-500 vie-purple-500 to-pink-500 bg-clip-text">
                  OTP Verification
                </h4>
                <p className="mb-5 text-center text-gray-500">
                  We&apos;re sent a code to <b>sophiamia@example.com</b>
                </p>
                <form
                  id={formId}
                  action="/auth/reset-password-creative"
                  ref={formRef}>
                  <div className="flex items-center justify-center gap-3">
                    {Array.from({ length: 6 }).map((_, index) => (
                      <input
                        key={index}
                        type="text"
                        className="text-2xl font-extrabold text-center bg-gray-100 border border-transparent rounded outline-hiddenappearance-none size-9 sm:size-12 md:size-14 text-slate-900 dark:text-dark-50 dark:bg-dark-850 hover:border-slate-200 dark:hover:border-dark-800 focus:bg-white dark:focus:bg-dark-900 focus:border-primary-400 dark:focus:border-primary-500 focus:ring-2 focus:ring-primary-500/15"
                        pattern="\d*"
                        maxLength={1}
                        required
                      />
                    ))}
                  </div>
                  <div className="mt-5">
                    <button
                      type="submit"
                      className="w-full btn btn-primary"
                      ref={submitButtonRef}>
                      Reset Password
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TwoStepVerificationCreative
