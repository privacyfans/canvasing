'use client'

import React, { useLayoutEffect, useRef, useState } from 'react'

import { X } from 'lucide-react'
import SimpleBar from 'simplebar-react'

const DrawerHeader = ({ title, onClose }) => {
  return (
    <div className="drawer-header">
      <h6>{title}</h6>
      <button onClick={onClose} className="text-red-500">
        <X className="link link-red" />
      </button>
    </div>
  )
}

const DrawerContent = ({ children, isSimpleBar, customContentClass }) => {
  return isSimpleBar ? (
    <SimpleBar
      className={customContentClass ? customContentClass : 'drawer-content'}>
      {children}
    </SimpleBar>
  ) : (
    <div className={customContentClass ? customContentClass : 'drawer-content'}>
      {children}
    </div>
  )
}

const DrawerFooter = ({ children, footerClass }) => {
  return <div className={`drawer-footer ${footerClass}`}>{children}</div>
}

const Drawer = ({
  isOpen,
  onClose,
  position = 'right',
  size = '',
  title,
  content,
  isSimpleBar,
  footer,
  id,
  footerClass,
  customContentClass,
}) => {
  const drawerRef = useRef(null)
  const [isAnimating, setIsAnimating] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  useLayoutEffect(() => {
    if (isOpen) {
      setIsVisible(true)
      requestAnimationFrame(() => setIsAnimating(true))
      document.body.classList.add('overflow-hidden')
    } else {
      setIsAnimating(false)
      const timeoutId = setTimeout(() => setIsVisible(false), 300)
      return () => clearTimeout(timeoutId)
    }
  }, [isOpen])

  if (!isVisible) return null

  const positionClass =
    position === 'left'
      ? 'drawer-start start-0 translate-x-0'
      : position === 'right'
        ? 'drawer-end end-0'
        : position === 'top'
          ? 'h-[20rem] left-0 right-0 w-full'
          : 'h-[20rem] left-0 right-0 bottom-0 top-auto w-full'
  const sizeClass =
    size === 'small'
      ? 'drawer-sm'
      : size === 'medium'
        ? 'w-80'
        : size === 'large'
          ? 'w-96'
          : size === 'half-screen'
            ? 'w-1/2'
            : 'w-80'

  return (
    <>
      {/* Backdrop with fade effect */}
      <div
        className={`backdrop-overlay backdrop-blur-xs transition-opacity duration-300 ${isAnimating ? 'opacity-100' : 'opacity-0'}`}
        onClick={onClose}
      />

      {/* Drawer with slide animation */}
      <div
        className={`drawer fixed ${positionClass} light:bg-white ${sizeClass} transition-transform duration-300 ease-in-out ${
          isAnimating
            ? 'translate-x-0 translate-y-0'
            : position === 'left'
              ? '-translate-x-full'
              : position === 'right'
                ? 'translate-x-full'
                : position === 'top'
                  ? '-translate-y-full'
                  : 'translate-y-full'
        }`}
        id={id}
        ref={drawerRef}>
        <div className="flex flex-col">
          {title && <DrawerHeader title={title} onClose={onClose} />}
          <DrawerContent
            isSimpleBar={isSimpleBar}
            customContentClass={customContentClass}>
            {content}
          </DrawerContent>
          {footer && (
            <DrawerFooter footerClass={footerClass}>{footer}</DrawerFooter>
          )}
        </div>
      </div>
    </>
  )
}

export { DrawerHeader, DrawerContent, DrawerFooter, Drawer }
