import React, { memo, useCallback, useEffect, useRef, useState } from 'react'

import { X } from 'lucide-react'

const ModalHeader = memo(({ title, onClose }) => {
  return (
    <div className="modal-header">
      <h6>{title}</h6>
      <button onClick={onClose} className="link link-red">
        <X className="size-5" />
      </button>
    </div>
  )
})

ModalHeader.displayName = 'ModalHeader'

const ModalContent = memo(({ children, contentClass }) => {
  return <div className={`modal-content ${contentClass}`}>{children}</div>
})

ModalContent.displayName = 'ModalContent'

const ModalFooter = memo(({ children, footerClass, isFooter }) => {
  return (
    <div className={`${isFooter ? '' : 'modal-footer'} ${footerClass}`}>
      {children}
    </div>
  )
})

ModalFooter.displayName = 'ModalFooter'

const Modal = ({
  isOpen,
  onClose,
  position = 'center',
  size = 'md',
  title,
  content,
  footer,
  id,
  contentClass,
  footerClass,
  isFooter,
}) => {
  const modalRef = useRef(null)
  const [isAnimating, setIsAnimating] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  // Handle overlay click to close the modal
  const handleOverlayClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      closeWithAnimation()
    }
  }

  // Close modal with animation
  const closeWithAnimation = useCallback(() => {
    setIsAnimating(true)

    setTimeout(() => {
      setIsAnimating(false)
      setIsVisible(false)
      onClose()
      document.body.classList.remove('overflow-hidden')
    }, 300)
  }, [onClose])

  // Handle modal open/close state
  useEffect(() => {
    if (isOpen) {
      setIsVisible(true)
      setIsAnimating(true)
      document.body.classList.add('overflow-hidden')

      const timeout = setTimeout(() => {
        setIsAnimating(false)
      }, 300)

      return () => clearTimeout(timeout)
    }
  }, [isOpen])

  // Don't render if the modal is not visible
  if (!isVisible) return null

  return (
    <>
      <div>
        {/* Backdrop overlay */}
        <div
          className={`backdrop-overlay backdrop-blur-xs ${isAnimating ? 'show' : ''}`}
          onClick={closeWithAnimation}
        />
        {/* Modal container */}
        <div
          className={`modal  modal-${position} ${isAnimating ? 'show' : ''}`}
          onClick={handleOverlayClick}
          id={id}>
          <div className={`modal-wrap ${size} modal-${position}`} ref={modalRef}>
            {/* Modal header */}
            {title && (
              <ModalHeader title={title} onClose={closeWithAnimation} />
            )}
            {/* Modal content */}
            <ModalContent contentClass={contentClass}>
              {typeof content === 'function'
                ? content(closeWithAnimation)
                : content}
            </ModalContent>
            {/* Modal footer */}
            {footer && (
              <ModalFooter footerClass={footerClass} isFooter={isFooter}>
                {typeof footer === 'function'
                  ? footer(closeWithAnimation)
                  : footer}
              </ModalFooter>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export { ModalHeader, ModalContent, ModalFooter, Modal }
