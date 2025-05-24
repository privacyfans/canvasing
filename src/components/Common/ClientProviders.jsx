'use client'

import { useEffect } from 'react'

import { LAYOUT_LANGUAGES } from '@src/components/constants/layout'
import { initialState } from '@src/slices/layout/reducer'
import { getPreviousStorageData } from '@src/slices/layout/utils'
import store from '@src/slices/reducer'
import {
  changeDarkModeClass,
  changeDataColor,
  changeDirection,
  changeLayout,
  changeLayoutContentWidth,
  changeLayoutLanguage,
  changeLayoutMode,
  changeModernNavigation,
  changeSidebarColor,
  changeSidebarSize,
} from '@src/slices/thunk'
import { Provider } from 'react-redux'

import AuthContext from '../auth/SessionWrapper'

export default function ClientProviders({ children }) {
  useEffect(() => {
    const htmlElement = document.documentElement
    htmlElement.classList.add('scroll-smooth', 'group')
    return () => {
      htmlElement.classList.remove('scroll-smooth', 'group')
    }
  }, [])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const dispatch = store.dispatch

      dispatch(
        changeLayoutMode(
          getPreviousStorageData('data-layout-mode') ?? initialState.layoutMode
        )
      )
      dispatch(
        changeLayoutContentWidth(
          getPreviousStorageData('data-layout-content-width') ??
            initialState.layoutWidth
        )
      )
      dispatch(
        changeSidebarSize(
          getPreviousStorageData('data-sidebar-size') ??
            initialState.layoutSidebar
        )
      )
      dispatch(
        changeDirection(
          getPreviousStorageData('data-layout-direction') ??
            initialState.layoutDirection
        )
      )
      dispatch(
        changeLayout(
          getPreviousStorageData('data-layout-type') ?? initialState.layoutType
        )
      )
      dispatch(
        changeSidebarColor(
          getPreviousStorageData('data-sidebar-colors') ??
            initialState.layoutSidebarColor
        )
      )
      dispatch(
        changeLayoutLanguage(
          getPreviousStorageData('data-layout-language') ??
            LAYOUT_LANGUAGES.ENGLISH
        )
      )
      dispatch(
        changeDataColor(
          getPreviousStorageData('data-theme-color') ??
            initialState.layoutDataColor
        )
      )
      dispatch(
        changeDarkModeClass(
          getPreviousStorageData('data-theme-dark-class') ??
            initialState.layoutDarkModeClass
        )
      )
      dispatch(
        changeModernNavigation(
          getPreviousStorageData('data-theme-nav-type') ??
            initialState.layoutNavigation
        )
      )
    }
  }, [])
  return (
    <AuthContext>
      <Provider store={store}>{children}</Provider>
    </AuthContext>
  )
}
