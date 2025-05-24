'use client'

import React, { useEffect, useRef } from 'react'

import { useRouter } from 'next/navigation'

import { MailOpen } from 'lucide-react'
import { toast } from 'react-toastify'

const TwoStepVerificationBasic = ({ formId }) => {
  const formRef = useRef(null)
  const submitButtonRef = useRef(null)
  const router = useRouter()
  useEffect(() => {
    const form = formRef.current
    if (!form) return

    const inputs = Array.from(form.querySelectorAll('input[type=text]'))

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
          submitButtonRef.current?.focus()
        }
      }
    }

    const handleFocus = (e) => {
      e.target.select()
    }

    const handlePaste = (e) => {
      e.preventDefault()
      const text = e.clipboardData?.getData('text')
      if (!text || !/^[0-9]{6}$/.test(text)) return // Adjust the length based on the number of inputs
      const digits = text.split('')
      inputs.forEach((input, index) => (input.value = digits[index]))
      submitButtonRef.current?.focus()
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
  const handleSubmit = (e) => {
    e.preventDefault()
    const form = formRef.current
    if (!form) return
    const inputs = Array.from(form.querySelectorAll('input[type=text]'))
    const otp = inputs.map((input) => input.value).join('')
    if (otp.length !== 6) {
      toast.error('Please enter a valid OTP')
      return
    } else {
      router.push('/auth/reset-password-basic')
    }
  }

  return (
    <div className="relative flex items-center justify-center min-h-screen py-12 from-sky-100 dark:from-sky-500/15 ltr:bg-gradient-to-l rtl:bg-gradient-to-r via-green-50 dark:via-green-500/10 to-pink-50 dark:to-pink-500/10">
      <div className="container">
        <div className="grid grid-cols-12">
          <div className="col-span-12 mb-0 md:col-span-10 lg:col-span-6 xl:col-span-4 md:col-start-2 lg:col-start-4 xl:col-start-5 card">
            <div className="md:p-10 card-body">
              <div className="mb-4 text-center">
                <div className="flex items-center justify-center mx-auto size-14">
                  <MailOpen className="text-gray-500 stroke-1 dark:text-dark-500 size-10 fill-gray-100 dark:fill-dark-850" />
                </div>
              </div>
              <h4 className="mb-2 font-bold leading-relaxed text-center text-transparent drop-shadow-lg ltr:bg-gradient-to-r rtl:bg-gradient-to-l from-primary-500 vie-purple-500 to-pink-500 bg-clip-text">
                OTP Verification
              </h4>
              <p className="mb-5 text-center text-gray-500">
                We&apos;re sent a code to <b>sophiamia@example.com</b>
              </p>
              <form id={formId} onSubmit={handleSubmit} ref={formRef}>
                <div className="flex items-center justify-center gap-3">
                  {Array.from({ length: 6 }).map((_, index) => (
                    <input
                      key={index}
                      type="text"
                      className="text-2xl font-extrabold text-center bg-gray-100 border border-transparent rounded-sm outline-hiddenappearance-none size-9 sm:size-12 md:size-14 text-slate-900 dark:text-dark-50 dark:bg-dark-850 hover:border-slate-200 dark:hover:border-dark-800 focus:bg-white dark:focus:bg-dark-900 focus:border-primary-400 dark:focus:border-primary-500 focus:ring-2 focus:ring-primary-500/15"
                      pattern="\d*"
                      maxLength={1}
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
  )
}

export default TwoStepVerificationBasic
