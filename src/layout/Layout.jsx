'use client'

import React, { useCallback, useEffect, useState } from 'react'

import { useRouter } from 'next/navigation'

import { LAYOUT_TYPES, SIDEBAR_SIZE } from '@src/components/constants/layout'
import { menu } from '@src/data/Sidebar/menu'
import { changeSettingModalOpen } from '@src/slices/layout/reducer'
import { changeHTMLAttribute, setNewThemeData } from '@src/slices/layout/utils'
import { changeSidebarSize } from '@src/slices/thunk'
import { useSession } from 'next-auth/react'
import { useDispatch, useSelector } from 'react-redux'

import Footer from './Footer'
import Sidebar from './Sidebar'
import TopBar from './Topbar'

export default function Layout({ children }) {
  const { status } = useSession()
  const router = useRouter()
  useEffect(() => {
    // Redirect to login if not authenticated
    if (status === 'unauthenticated') {
      router.push('/auth/signin')
    }
  }, [status, router])

  useEffect(() => {
    // When the session is authenticated, store a flag in localStorage
    if (status === 'authenticated') {
      localStorage.setItem('wasLoggedIn', 'true')
    }
  }, [status])
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const {
    layoutMode,
    layoutType,
    layoutWidth,
    layoutSidebar,
    layoutDarkModeClass,
    layoutSidebarColor,
    layoutDataColor,
    layoutDirection,
  } = useSelector((state) => state.Layout)
  const dispatch = useDispatch()
  const [searchSidebar, setSearchSidebar] = useState(menu)
  const [searchValue, setSearchValue] = useState('')
  const handleThemeSidebarSize = useCallback(() => {
    if (layoutType !== 'horizontal') {
      // Toggle between BIG and SMALL sidebar
      const newSize =
        layoutSidebar === SIDEBAR_SIZE.DEFAULT
          ? SIDEBAR_SIZE.SMALL
          : SIDEBAR_SIZE.DEFAULT
      setNewThemeData('data-sidebar-size', newSize)
      changeHTMLAttribute('data-sidebar', newSize)
      dispatch(changeSidebarSize(newSize))
    } else {
      // If layout is horizontal, always use default size
      setNewThemeData('data-sidebar-size', SIDEBAR_SIZE.DEFAULT)
      changeHTMLAttribute('data-sidebar', SIDEBAR_SIZE.DEFAULT)
      dispatch(changeSidebarSize(SIDEBAR_SIZE.DEFAULT))
    }
  }, [layoutType, layoutSidebar, dispatch])

  const toggleSidebar = () => {
    if (window.innerWidth < 1000) {
      // Toggle sidebar open/close for small screens
      setIsSidebarOpen((prev) => !prev)
      setNewThemeData('data-sidebar-size', SIDEBAR_SIZE.DEFAULT)
      changeHTMLAttribute('data-sidebar', SIDEBAR_SIZE.DEFAULT)
      dispatch(changeSidebarSize(SIDEBAR_SIZE.DEFAULT))
    } else {
      // On larger screens, toggle between big and small sidebar
      handleThemeSidebarSize()
    }
  }
  useEffect(() => {
    const handleResize = () => {
      // Update the sidebar state based on the window width
      setIsSidebarOpen(window.innerWidth >= 1024)
      if (
        layoutType === LAYOUT_TYPES.SEMIBOX ||
        layoutType === LAYOUT_TYPES.MODERN
      ) {
        if (window.innerWidth > 1000) {
          // Set the layout to the layoutType if screen size is greater than 1000px
          document.documentElement.setAttribute('data-layout', layoutType)
        } else {
          // Set to 'default' if screen size is 1000px or less
          document.documentElement.setAttribute('data-layout', 'default')
        }
      } else {
        // For other layouts, just set to layoutType, no need to check screen size
        document.documentElement.setAttribute('data-layout', layoutType)
      }
    }
    // Initial layout check on component mount
    handleResize()
    // Listen for window resize events
    window.addEventListener('resize', handleResize)
    // Cleanup the event listener on unmount
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [layoutType]) // Only rerun the effect when layoutType changes

  // handle search menu
  const handleSearchClient = (value) => {
    setSearchValue(value)

    if (value.trim() !== '') {
      const filteredMenu = menu.filter((megaItem) => {
        // Filter the first level: MegaMenu
        const isMegaMenuMatch =
          megaItem.title.toLowerCase().includes(value.toLowerCase()) ||
          megaItem.lang.toLowerCase().includes(value.toLowerCase())

        // Filter the second level: MainMenu (children of MegaMenu)
        const filteredMainMenu = megaItem.children?.filter((mainItem) => {
          const isMainMenuMatch =
            mainItem.title.toLowerCase().includes(value.toLowerCase()) ||
            mainItem.lang.toLowerCase().includes(value.toLowerCase())

          // Filter the third level: SubMenu (children of MainMenu)
          const filteredSubMenu = mainItem.children?.filter((subItem) => {
            return (
              subItem.title.toLowerCase().includes(value.toLowerCase()) ||
              subItem.lang.toLowerCase().includes(value.toLowerCase())
            )
          })

          // If SubMenu matches or MainMenu matches, return the filtered item
          return (
            isMainMenuMatch || (filteredSubMenu && filteredSubMenu.length > 0)
          )
        })

        // Return MegaMenu item if it matches or has any matching MainMenu children
        return (
          isMegaMenuMatch || (filteredMainMenu && filteredMainMenu.length > 0)
        )
      })

      setSearchSidebar(filteredMenu)
    } else {
      setSearchSidebar(menu)
    }
  }
  // useEffect(() => {
  //   let timer

  //   if (typeof window !== 'undefined') {
  //     // Check if page was refreshed by checking sessionStorage
  //     const isPageRefreshed = sessionStorage.getItem('isRefreshed')
  //     if (!isPageRefreshed) {
  //       sessionStorage.setItem('isRefreshed', 'true')
  //     } else {
  //       if (window.innerWidth >= 768) {
  //         timer = setTimeout(() => {
  //           dispatch(changeSettingModalOpen(true))
  //         }, 500) // Delay to show modal after a short timeout
  //       }
  //     }
  //   }
  //   // Cleanup the timeout if the component is unmounted or the effect is cleaned up
  //   return () => {
  //     clearTimeout(timer)
  //     sessionStorage.removeItem('isRefreshed')
  //   }
  // }, [dispatch])
  const sidebarColors =
    (typeof document !== 'undefined' &&
      localStorage.getItem('data-sidebar-colors')) ||
    layoutSidebarColor

  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.classList.add('scroll-smooth', 'group')
      document.documentElement.setAttribute('data-mode', layoutMode)
      document.documentElement.setAttribute('data-colors', layoutDataColor)
      document.documentElement.setAttribute('lang', 'en')
      document.documentElement.setAttribute('data-layout', layoutType)
      document.documentElement.setAttribute('data-content-width', layoutWidth)
      document.documentElement.setAttribute(
        'data-sidebar',
        layoutType === 'horizontal' ? 'default' : layoutSidebar
      )
      document.documentElement.setAttribute(
        'data-sidebar-colors',
        layoutType === 'horizontal' ? 'light' : sidebarColors
      )
      document.documentElement.setAttribute(
        'data-nav-type',
        layoutDarkModeClass
      )
      document.documentElement.setAttribute('dir', layoutDirection)
    }
  }, [
    layoutMode,
    layoutType,
    layoutWidth,
    layoutSidebar,
    layoutSidebarColor,
    layoutDataColor,
    layoutDarkModeClass,
    layoutDirection,
    sidebarColors,
  ])
  return (
    <React.Fragment>
      {/* Main topbar */}

      <TopBar
        searchMenu={(value) => handleSearchClient(value)}
        searchText={searchValue}
        toggleSidebar={toggleSidebar}
      />

      {/* sidebar */}
      <Sidebar
        searchSidebar={searchSidebar}
        isSidebarOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
      />

      <div className="relative min-h-screen group-data-[layout=boxed]:bg-white group-data-[layout=boxed]:rounded-md">
        <div className="page-wrapper pt-[calc(theme('spacing.topbar')_*_1.2)]">
          {children}
        </div>
        <Footer />
      </div>
    </React.Fragment>
  )
}
