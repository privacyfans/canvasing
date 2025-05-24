'use client'

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { LAYOUT_TYPES, SIDEBAR_SIZE } from '@src/components/constants/layout'
import { useSelector } from 'react-redux'

let openDropdowns = []
const DropdownContext = createContext(undefined)
const Dropdown = ({
  position = 'bottom',
  trigger = 'click',
  children,
  dropdownClassName,
  isActive,
  closeOnOutsideClick = true,
  closeOnOutsideClickSidebar = true,
  toggleSidebar,
}) => {
  const pathname = usePathname()
  const { layoutType, layoutSidebar } = useSelector((state) => state.Layout)
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef(null)
  const menuRef = useRef(null)

  const handleToggle = useCallback(() => {
    // if horizontall
    if (
      layoutType === LAYOUT_TYPES.HORIZONTAL ||
      layoutSidebar === SIDEBAR_SIZE.SMALL
    ) {
      if (!dropdownRef?.current?.closest('.dropdown-menu')) openDropdowns = []

      openDropdowns.push(dropdownRef)
      let count = 0
      if (openDropdowns.length > 2) {
        openDropdowns = openDropdowns.filter((item) => {
          count++
          if (count === 2) {
            item.current.click()
            return false // Remove this item from the array
          }
          return true // Keep the rest
        })
      }
    }

    if (trigger === 'click') {
      setIsOpen((prev) => !prev)
    }
  }, [trigger, layoutSidebar, layoutType])

  const handleMouseEnter = useCallback(() => {
    if (trigger === 'hover') {
      setIsOpen(true)
    }
  }, [trigger])

  const handleMouseLeave = useCallback(() => {
    if (trigger === 'hover') {
      setIsOpen(false)
    }
  }, [trigger])

  const handleKeyDown = useCallback((event) => {
    if (event.key === 'Escape') {
      setIsOpen(false)
    }
  }, [])

  const handleClickOutside = useCallback(
    (event) => {
      if (
        closeOnOutsideClick &&
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setIsOpen(false)
      }
    },
    [closeOnOutsideClick]
  )

  useEffect(() => {
    document.addEventListener('click', handleClickOutside)
    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  })

  const handleClickOutsideSidebar = useCallback(
    (event) => {
      const sidebar = document.querySelector('#main-sidebar')

      if (
        closeOnOutsideClickSidebar &&
        sidebar &&
        sidebar.contains(event.target) &&
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setIsOpen(false)
      }
    },
    [closeOnOutsideClickSidebar]
  )

  useEffect(() => {
    document.addEventListener('click', handleClickOutsideSidebar)
    return () => {
      document.removeEventListener('click', handleClickOutsideSidebar)
    }
  }, [handleClickOutsideSidebar])

  //function
  const getDefault = (buttonRect, dropdown) => {
    const data = { left: 0, top: 0 }
    const dropdownWidth = dropdown.offsetWidth
    const dropdownHeight = dropdown.offsetHeight

    const yTSpace = buttonRect.top
    const yBSpace = window.innerHeight - buttonRect.bottom
    const xRSpace = window.innerWidth - buttonRect.left
    const xLSpace = buttonRect.left
    data.left =
      xRSpace >= dropdownWidth
        ? buttonRect.left
        : buttonRect.right - dropdownWidth

    if (yBSpace >= dropdownHeight) {
      data.top = buttonRect.bottom
    } else if (yTSpace >= dropdownHeight) {
      data.top = buttonRect.top - dropdown.offsetHeight
    } else {
      data.top = buttonRect.top
      if (xRSpace >= dropdownWidth) {
        data.left = buttonRect.right
      } else if (xLSpace >= dropdownWidth) {
        data.left = buttonRect.left - dropdown.offsetWidth
      } else {
        data.left = buttonRect.right
      }
    }
    return data
  }

  const getRight = (buttonRect, dropdown) => {
    const data = { left: 0, top: 0 }
    const dropdownWidth = dropdown.offsetWidth
    const dropdownHeight = dropdown.offsetHeight

    const yTSpace = buttonRect.top
    const yBSpace = window.innerHeight - buttonRect.bottom
    const xLSpace = buttonRect.right
    data.left =
      xLSpace < dropdownWidth
        ? buttonRect.left
        : buttonRect.right - dropdownWidth

    if (yBSpace >= dropdownHeight) {
      data.top = buttonRect.bottom
    } else if (yTSpace >= dropdownHeight) {
      data.top = buttonRect.top - dropdown.offsetHeight
    } else {
      data.top = buttonRect.top
      if (xLSpace - buttonRect.width > dropdownWidth) {
        data.left = buttonRect.left - dropdown.offsetWidth
      } else {
        data.left = buttonRect.right
      }
    }
    return data
  }

  const getTopRight = (buttonRect, dropdown) => {
    const data = { left: 0, top: 0 }
    const dropdownWidth = dropdown.offsetWidth
    const dropdownHeight = dropdown.offsetHeight

    const yTSpace = buttonRect.bottom
    const yBSpace = window.innerHeight - buttonRect.top
    const xRSpace = window.innerWidth - buttonRect.right
    const xLSpace = buttonRect.left

    if (yBSpace >= dropdownHeight) {
      data.top = buttonRect.top
    } else if (yTSpace >= dropdownHeight) {
      data.top = buttonRect.bottom - dropdown.offsetHeight
    } else {
      data.top = buttonRect.top
    }
    if (xRSpace >= dropdownWidth) {
      data.left = buttonRect.right
    } else if (xLSpace >= dropdownWidth) {
      data.left = buttonRect.left - dropdown.offsetWidth
    } else {
      data.left = buttonRect.right
    }

    return data
  }

  const getRightLeft = (buttonRect, dropdown) => {
    const data = {
      left: 0,
      top: 0,
    }
    if (buttonRect.x - dropdown.offsetWidth < 0) {
      data.top = buttonRect.bottom
      data.left = buttonRect.left
    }
    if (window.innerHeight < buttonRect.top + dropdown.offsetHeight) {
      data.top = buttonRect.top - dropdown.offsetHeight
      data.left = buttonRect.left
    }
    return data
  }

  useEffect(() => {
    if (position === 'top-right' || position === 'right') {
      setIsOpen(isActive)
    } else {
      setIsOpen(false)
    }
  }, [position, trigger, isActive])

  const calculatePosition = useCallback(() => {
    if (!dropdownRef.current || !menuRef.current) {
      return
    }

    const buttonRect =
      dropdownRef.current.getBoundingClientRect() ||
      dropdownRef.current.closest('.dropdown')?.getBoundingClientRect()
    let dropdownPosition = { left: 0, top: 0 }
    switch (position) {
      case 'right':
        dropdownPosition = getRight(buttonRect, menuRef.current)
        break
      case 'top-right':
        dropdownPosition = getTopRight(buttonRect, menuRef.current)
        break
      case 'top-left':
        dropdownPosition = getRightLeft(buttonRect, menuRef.current)
        break
      default:
        dropdownPosition = getDefault(buttonRect, menuRef.current)
        break
    }

    menuRef.current.style.left = `${Math.max(0, dropdownPosition.left)}px`
    menuRef.current.style.top = `${Math.max(0, dropdownPosition.top)}px`
  }, [position])

  useEffect(() => {
    calculatePosition()
  }, [isOpen, calculatePosition])

  const close = useCallback(() => {
    setIsOpen(false)
  }, [])
  const isOpenRef = useRef(isOpen)
  const layoutSidebarRef = useRef(layoutSidebar)
  const layoutTypeRef = useRef(layoutType)
  const toggleSidebarRef = useRef(toggleSidebar)

  // Update the refs whenever the dependencies change
  useEffect(() => {
    isOpenRef.current = isOpen
    layoutSidebarRef.current = layoutSidebar
    layoutTypeRef.current = layoutType
    toggleSidebarRef.current = toggleSidebar
  }, [isOpen, layoutSidebar, layoutType, toggleSidebar])

  useEffect(() => {
    if (
      layoutTypeRef.current === LAYOUT_TYPES.HORIZONTAL ||
      layoutSidebarRef.current === SIDEBAR_SIZE.SMALL
    ) {
      setIsOpen(false)
    }

    const screenSize = window.innerWidth <= 768
    if (screenSize && toggleSidebarRef.current && isOpenRef.current) {
      toggleSidebarRef.current()
      setIsOpen(false)
    }
  }, [pathname])
  return (
    <DropdownContext.Provider
      value={{
        isOpen,
        setIsOpen,
        position,
        trigger,
        close,
        menuRef,
        calculatePosition,
      }}>
      <div
        ref={dropdownRef}
        className={`${dropdownClassName}`}
        onClick={handleToggle}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onKeyDown={handleKeyDown}>
        {children}
      </div>
    </DropdownContext.Provider>
  )
}

const DropdownButton = ({ children, colorClass, arrow }) => {
  const context = useContext(DropdownContext)

  if (!context) {
    throw new Error('DropdownButton must be used within a Dropdown')
  }

  const { isOpen } = context

  return (
    <button className={`${colorClass}`} type="button">
      {children}
      {arrow && (
        <svg
          className={`size-5 arrow ${isOpen ? 'transform rotate-180' : ''}`}
          viewBox="0 0 20 20"
          fill="currentColor">
          <path
            fillRule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      )}
    </button>
  )
}

const DropdownMenu = ({ children, menuClass, handleMenuClick, sidebar }) => {
  const context = useContext(DropdownContext)

  if (!context) {
    throw new Error('DropdownMenu must be used within a Dropdown')
  }
  const { isOpen, menuRef } = context
  return (
    isOpen && (
      <div
        ref={menuRef}
        className={`${sidebar ? '' : '!fixed'} dropdown-menu ${menuClass}`}
        style={{ transition: 'opacity 0.2s' }}
        onClick={handleMenuClick}>
        {children}
      </div>
    )
  )
}

const DropdownItem = ({ children, href, className }) => {
  return (
    <li>
      <Link to={href || '#'} className={`dropdown-item ${className}`}>
        {children}
      </Link>
    </li>
  )
}

export { Dropdown, DropdownButton, DropdownMenu, DropdownItem, DropdownContext }
