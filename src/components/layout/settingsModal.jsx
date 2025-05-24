'use client'

import { initialState } from '@src/slices/layout/reducer'
import { changeHTMLAttribute, setNewThemeData } from '@src/slices/layout/utils'
import {
  changeDarkModeClass,
  changeDataColor,
  changeDirection,
  changeLayout,
  changeLayoutContentWidth,
  changeLayoutMode,
  changeModernNavigation,
  changeSidebarColor,
  changeSidebarSize,
} from '@src/slices/thunk'
import { RotateCcw, ShoppingBag, X } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'

import {
  DARK_MODE_CLASS,
  DATA_COLORS,
  LAYOUT_CONTENT_WIDTH,
  LAYOUT_DIRECTION,
  LAYOUT_MODE_TYPES,
  LAYOUT_TYPES,
  MODERN_NAVIGATION,
  SIDEBAR_COLOR,
  SIDEBAR_SIZE,
} from '../constants/layout'
import { Modal } from '../custom/Modal/Modal'

const SettingsModal = ({ handleCloseModal }) => {
  const dispatch = useDispatch()
  const {
    layoutMode,
    layoutType,
    layoutNavigation,
    layoutWidth,
    layoutSidebar,
    layoutDirection,
    layoutDarkModeClass,
    layoutSidebarColor,
    layoutDataColor,
    isSettingModalOpen,
  } = useSelector((state) => state.Layout)

  const handleThemeLayout = (value) => {
    dispatch(changeLayoutMode(value))
  }

  const handleThemeContentWidth = (value = LAYOUT_CONTENT_WIDTH.DEFAULT) => {
    dispatch(changeLayoutContentWidth(value))
  }

  const handleThemeSidebarSize = (value) => {
    dispatch(changeSidebarSize(value))
  }

  const handleThemeDirection = (value) => {
    dispatch(changeDirection(value))
  }

  const handleThemeLayoutType = (value) => {
    dispatch(changeLayout(value))
    if (value === LAYOUT_TYPES.HORIZONTAL) {
      setNewThemeData('data-sidebar-size', SIDEBAR_SIZE.DEFAULT)
      changeHTMLAttribute('data-sidebar', SIDEBAR_SIZE.DEFAULT)
    }
  }

  const handleThemeSideColorChange = (value) => {
    dispatch(changeSidebarColor(value))
  }

  const handleThemeColor = (value) => {
    dispatch(changeDataColor(value))
  }

  const handleModernNavigation = (value) => {
    dispatch(changeModernNavigation(value))
  }

  const handleDarkModeClass = (value) => {
    dispatch(changeDarkModeClass(value))
  }

  const resetTheme = (onClose) => {
    handleThemeLayoutType(initialState.layoutType)
    handleThemeDirection(initialState.layoutDirection)
    handleModernNavigation(initialState.layoutNavigation)
    handleThemeContentWidth(initialState.layoutWidth)
    handleThemeSidebarSize(initialState.layoutSidebar)
    handleThemeLayout(initialState.layoutMode)
    handleDarkModeClass(initialState.layoutDarkModeClass)
    handleThemeSideColorChange(initialState.layoutSidebarColor)
    handleThemeColor(initialState.layoutDataColor)
    onClose()
  }

  return (
    <>
      <Modal
        isOpen={isSettingModalOpen}
        onClose={handleCloseModal}
        position="modal-center"
        title="Domiex Customize"
        id="toolsAppsModal"
        size="modal-xl"
        contentClass="model-content"
        footerClass="flex items-center justify-end gap-2"
        content={() => (
          <>
            <div>
              <h6 className="mb-3">Select Layout:</h6>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-space">
                <div className="flex-col gap-0 input-radio-group">
                  <input
                    id="defaultLayout"
                    name="layout"
                    type="radio"
                    className="hidden input-radio peer"
                    value={layoutType}
                    onChange={() =>
                      handleThemeLayoutType(LAYOUT_TYPES.VERTICAL)
                    }
                    checked={layoutType === LAYOUT_TYPES.VERTICAL}
                  />
                  <label
                    htmlFor="defaultLayout"
                    className="block w-full mb-3 overflow-hidden cursor-pointer card h-28 peer-checked:border-primary-500">
                    <span className="block h-full">
                      <span className="flex gap-1 px-4 py-1.5 bg-gray-200/50 dark:bg-dark-800/50">
                        <span className="inline-block bg-red-500 rounded-full size-1.5" />
                        <span className="inline-block bg-green-500 rounded-full size-1.5" />
                        <span className="inline-block rounded-full bg-yellow-500 size-1.5" />
                      </span>
                      <span className="grid h-[calc(100%_-_8px)] grid-cols-12">
                        <span className="h-[calc(100%_-_8px)] col-span-2 bg-gray-50 dark:bg-dark-850" />
                        <span className="h-[calc(100%_-_8px)] col-span-10 p-1.5 inline-block">
                          <span className="block w-1/3 h-1.5 bg-gray-100 rounded-md dark:bg-dark-850" />
                          <span className="block w-1/2 h-1.5 mt-1 bg-gray-100 rounded-md dark:bg-dark-850" />
                          <span className="block w-full h-1.5 mt-1 bg-gray-100 rounded-md dark:bg-dark-850" />
                          <span className="block w-1/3 h-1.5 mt-1 bg-gray-100 rounded-md dark:bg-dark-850" />
                          <span className="block w-2/3 h-1.5 mt-1 bg-gray-100 rounded-md dark:bg-dark-850" />
                        </span>
                      </span>
                    </span>
                  </label>
                  <label
                    htmlFor="defaultLayout"
                    className="cursor-pointer form-label">
                    Default
                  </label>
                </div>
                <div className="flex-col gap-0 input-radio-group">
                  <input
                    id="horizontalLayout"
                    name="layout"
                    type="radio"
                    className="hidden input-radio peer"
                    value={layoutType}
                    onChange={() =>
                      handleThemeLayoutType(LAYOUT_TYPES.HORIZONTAL)
                    }
                    checked={layoutType === LAYOUT_TYPES.HORIZONTAL}
                  />
                  <label
                    htmlFor="horizontalLayout"
                    className="block w-full mb-3 overflow-hidden cursor-pointer card h-28 peer-checked:border-primary-500">
                    <span className="block h-full">
                      <span className="flex gap-1 px-4 py-1.5 bg-gray-200/50 dark:bg-dark-800/50">
                        <span className="inline-block bg-red-500 rounded-full size-1.5" />
                        <span className="inline-block bg-green-500 rounded-full size-1.5" />
                        <span className="inline-block rounded-full bg-yellow-500 size-1.5" />
                      </span>
                      <span className="block h-2 bg-gray-50 dark:bg-dark-850" />
                      <span className="grid grid-cols-12 gap-0">
                        <span className="inline-block col-span-12 p-2">
                          <span className="block w-1/3 h-1.5 bg-gray-100 rounded-md dark:bg-dark-850" />
                          <span className="block w-1/2 h-1.5 mt-1 bg-gray-100 rounded-md dark:bg-dark-850" />
                          <span className="block w-full h-1.5 mt-1 bg-gray-100 rounded-md dark:bg-dark-850" />
                          <span className="block w-1/3 h-1.5 mt-1 bg-gray-100 rounded-md dark:bg-dark-850" />
                          <span className="block w-2/3 h-1.5 mt-1 bg-gray-100 rounded-md dark:bg-dark-850" />
                        </span>
                      </span>
                    </span>
                  </label>
                  <label
                    htmlFor="horizontalLayout"
                    className="cursor-pointer form-label">
                    Horizontal
                  </label>
                </div>
                <div
                  className="flex-col hidden gap-0 input-radio-group lg:flex"
                  onClick={() => handleThemeLayoutType(LAYOUT_TYPES.MODERN)}>
                  <input
                    id="modernLayout"
                    name="layout"
                    type="radio"
                    className="hidden input-radio peer"
                    value={layoutType}
                    onChange={() => handleThemeLayoutType(LAYOUT_TYPES.MODERN)}
                    checked={layoutType === LAYOUT_TYPES.MODERN}
                  />
                  <label
                    htmlFor="modernLayout"
                    className="block w-full mb-3 overflow-hidden cursor-pointer card h-28 peer-checked:border-primary-500">
                    <span className="flex h-full">
                      <span className="w-3 h-full shrink-0 bg-gray-50 dark:bg-dark-850" />
                      <span className="grow">
                        <span className="flex gap-1 px-4 py-1.5 bg-gray-200/50 dark:bg-dark-800/50">
                          <span className="inline-block bg-red-500 rounded-full size-1.5" />
                          <span className="inline-block bg-green-500 rounded-full size-1.5" />
                          <span className="inline-block rounded-full bg-yellow-500 size-1.5" />
                        </span>
                        <span className="p-1.5 block">
                          <span className="block w-1/3 h-1.5 bg-gray-100 rounded-md dark:bg-dark-850" />
                          <span className="block w-1/2 h-1.5 mt-1 bg-gray-100 rounded-md dark:bg-dark-850" />
                          <span className="block w-full h-1.5 mt-1 bg-gray-100 rounded-md dark:bg-dark-850" />
                          <span className="block w-1/3 h-1.5 mt-1 bg-gray-100 rounded-md dark:bg-dark-850" />
                          <span className="block w-2/3 h-1.5 mt-1 bg-gray-100 rounded-md dark:bg-dark-850" />
                        </span>
                      </span>
                    </span>
                  </label>
                  <label
                    htmlFor="modernLayout"
                    className="cursor-pointer form-label">
                    Modern
                  </label>
                </div>
                <div className="flex-col gap-0 input-radio-group">
                  <input
                    id="boxedLayout"
                    name="layout"
                    type="radio"
                    className="hidden input-radio peer"
                    value={layoutType}
                    onChange={() => handleThemeLayoutType(LAYOUT_TYPES.BOXED)}
                    checked={layoutType === LAYOUT_TYPES.BOXED}
                  />
                  <label
                    htmlFor="boxedLayout"
                    className="block w-full p-1.5 mb-3 overflow-hidden cursor-pointer card h-28 peer-checked:border-primary-500">
                    <span className="block h-full">
                      <span className="flex gap-1 px-4 py-1.5 bg-gray-200/50 dark:bg-dark-800/50">
                        <span className="inline-block bg-red-500 rounded-full size-1.5" />
                        <span className="inline-block bg-green-500 rounded-full size-1.5" />
                        <span className="inline-block rounded-full bg-yellow-500 size-1.5" />
                      </span>
                      <span className="grid h-[calc(100%_-_8px)] grid-cols-12">
                        <span className="h-[calc(100%_-_8px)] col-span-2 bg-gray-50 dark:bg-dark-850" />
                        <span className="h-[calc(100%_-_8px)] col-span-10 p-1.5 inline-block">
                          <span className="block w-1/3 h-1.5 bg-gray-100 rounded-md dark:bg-dark-850" />
                          <span className="block w-1/2 h-1.5 mt-1 bg-gray-100 rounded-md dark:bg-dark-850" />
                          <span className="block w-full h-1.5 mt-1 bg-gray-100 rounded-md dark:bg-dark-850" />
                          <span className="block w-1/3 h-1.5 mt-1 bg-gray-100 rounded-md dark:bg-dark-850" />
                          <span className="block w-2/3 h-1.5 mt-1 bg-gray-100 rounded-md dark:bg-dark-850" />
                        </span>
                      </span>
                    </span>
                  </label>
                  <label
                    htmlFor="boxedLayout"
                    className="cursor-pointer form-label">
                    Boxed
                  </label>
                </div>
                <div className="flex-col hidden gap-0 input-radio-group lg:flex">
                  <input
                    id="semiboxLayout"
                    name="layout"
                    type="radio"
                    className="hidden input-radio peer"
                    value={layoutType}
                    onChange={() => handleThemeLayoutType(LAYOUT_TYPES.SEMIBOX)}
                    checked={layoutType === LAYOUT_TYPES.SEMIBOX}
                  />
                  <label
                    htmlFor="semiboxLayout"
                    className="block w-full p-1.5 mb-3 overflow-hidden cursor-pointer card h-28 peer-checked:border-primary-500">
                    <span className="block h-full">
                      <span className="flex gap-1 px-4 py-1.5 bg-gray-200/50 dark:bg-dark-800/50">
                        <span className="inline-block bg-red-500 rounded-full size-1.5" />
                        <span className="inline-block bg-green-500 rounded-full size-1.5" />
                        <span className="inline-block rounded-full bg-yellow-500 size-1.5" />
                      </span>
                      <span className="grid h-[calc(100%_-_8px)] grid-cols-12">
                        <span className="h-[calc(100%_-_8px)] col-span-2 bg-gray-50 dark:bg-dark-850" />
                        <span className="h-[calc(100%_-_8px)] col-span-10 p-1.5 inline-block">
                          <span className="block w-1/3 h-1.5 bg-gray-100 rounded-md dark:bg-dark-850" />
                          <span className="block w-1/2 h-1.5 mt-1 bg-gray-100 rounded-md dark:bg-dark-850" />
                          <span className="block w-full h-1.5 mt-1 bg-gray-100 rounded-md dark:bg-dark-850" />
                          <span className="block w-1/3 h-1.5 mt-1 bg-gray-100 rounded-md dark:bg-dark-850" />
                          <span className="block w-2/3 h-1.5 mt-1 bg-gray-100 rounded-md dark:bg-dark-850" />
                        </span>
                      </span>
                    </span>
                  </label>
                  <label
                    htmlFor="semiboxLayout"
                    className="cursor-pointer form-label">
                    Semibox
                  </label>
                </div>
              </div>
              {layoutType === LAYOUT_TYPES.MODERN && (
                <div>
                  <h6 className="my-3">Navigation Types</h6>
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-space">
                    <div className="input-radio-group">
                      <input
                        id="defaultType"
                        name="navType"
                        type="radio"
                        className="input-radio input-radio-primary"
                        value={layoutNavigation}
                        onChange={() =>
                          handleModernNavigation(MODERN_NAVIGATION.DEFAULT)
                        }
                        checked={layoutNavigation === MODERN_NAVIGATION.DEFAULT}
                      />
                      <label
                        htmlFor="defaultType"
                        className="input-radio-label">
                        Default
                      </label>
                    </div>
                    <div className="input-radio-group">
                      <input
                        id="floatingType"
                        name="navType"
                        type="radio"
                        className="input-radio input-radio-primary"
                        value={layoutNavigation}
                        onChange={() =>
                          handleModernNavigation(MODERN_NAVIGATION.FLOATING)
                        }
                        checked={
                          layoutNavigation === MODERN_NAVIGATION.FLOATING
                        }
                      />
                      <label
                        htmlFor="floatingType"
                        className="input-radio-label">
                        Floating
                      </label>
                    </div>
                    <div className="input-radio-group">
                      <input
                        id="boxedType"
                        name="navType"
                        type="radio"
                        className="input-radio input-radio-primary"
                        value={layoutNavigation}
                        onChange={() =>
                          handleModernNavigation(MODERN_NAVIGATION.BOXED)
                        }
                        checked={layoutNavigation === MODERN_NAVIGATION.BOXED}
                      />
                      <label htmlFor="boxedType" className="input-radio-label">
                        Boxed
                      </label>
                    </div>
                    <div className="input-radio-group">
                      <input
                        id="patternType"
                        name="navType"
                        type="radio"
                        className="input-radio input-radio-primary"
                        value={layoutNavigation}
                        onChange={() =>
                          handleModernNavigation(MODERN_NAVIGATION.PATTERN)
                        }
                        checked={layoutNavigation === MODERN_NAVIGATION.PATTERN}
                      />
                      <label
                        htmlFor="patternType"
                        className="input-radio-label">
                        Pattern
                      </label>
                    </div>
                  </div>
                </div>
              )}

              <div className="hidden xl:block">
                <h6 className="my-4">Content Widths:</h6>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-space">
                  <div className="flex-col gap-0 input-radio-group">
                    <input
                      id="defaultContent"
                      name="contentWidth"
                      type="radio"
                      className="hidden input-radio peer"
                      value={layoutWidth}
                      onChange={() =>
                        handleThemeContentWidth(LAYOUT_CONTENT_WIDTH.DEFAULT)
                      }
                      checked={layoutWidth === LAYOUT_CONTENT_WIDTH.DEFAULT}
                    />
                    <label
                      htmlFor="defaultContent"
                      className="block w-full mb-3 overflow-hidden cursor-pointer card h-28 peer-checked:border-primary-500">
                      <span className="block h-full">
                        <span className="flex gap-1 px-4 py-1.5 bg-gray-200/50 dark:bg-dark-800/50">
                          <span className="inline-block bg-red-500 rounded-full size-1.5" />
                          <span className="inline-block bg-green-500 rounded-full size-1.5" />
                          <span className="inline-block rounded-full bg-yellow-500 size-1.5" />
                        </span>
                        <span className="grid h-[calc(100%_-_8px)] grid-cols-12">
                          <span className="h-[calc(100%_-_8px)] col-span-2 bg-gray-50 dark:bg-dark-850" />
                          <span className="h-[calc(100%_-_8px)] col-span-10 py-1.5 px-4 inline-block">
                            <span className="block w-1/3 h-1.5 bg-gray-100 rounded-md dark:bg-dark-850" />
                            <span className="block w-1/2 h-1.5 mt-1 bg-gray-100 rounded-md dark:bg-dark-850" />
                            <span className="block w-full h-1.5 mt-1 bg-gray-100 rounded-md dark:bg-dark-850" />
                            <span className="block w-1/3 h-1.5 mt-1 bg-gray-100 rounded-md dark:bg-dark-850" />
                            <span className="block w-2/3 h-1.5 mt-1 bg-gray-100 rounded-md dark:bg-dark-850" />
                          </span>
                        </span>
                      </span>
                    </label>
                    <label
                      htmlFor="defaultContent"
                      className="cursor-pointer form-label">
                      Default
                    </label>
                  </div>
                  <div className="flex-col gap-0 input-radio-group">
                    <input
                      id="fluidLayout"
                      name="contentWidth"
                      type="radio"
                      className="hidden input-radio peer"
                      value={layoutWidth}
                      onChange={() =>
                        handleThemeContentWidth(LAYOUT_CONTENT_WIDTH.FLUID)
                      }
                      checked={layoutWidth === LAYOUT_CONTENT_WIDTH.FLUID}
                    />
                    <label
                      htmlFor="fluidLayout"
                      className="block w-full mb-3 overflow-hidden cursor-pointer card h-28 peer-checked:border-primary-500">
                      <span className="block h-full">
                        <span className="flex gap-1 px-4 py-1.5 bg-gray-200/50 dark:bg-dark-800/50">
                          <span className="inline-block bg-red-500 rounded-full size-1.5" />
                          <span className="inline-block bg-green-500 rounded-full size-1.5" />
                          <span className="inline-block rounded-full bg-yellow-500 size-1.5" />
                        </span>
                        <span className="grid h-[calc(100%_-_8px)] grid-cols-12">
                          <span className="h-[calc(100%_-_8px)] col-span-2 bg-gray-50 dark:bg-dark-850" />
                          <span className="h-[calc(100%_-_8px)] col-span-10 p-1.5 inline-block">
                            <span className="block w-1/3 h-1.5 bg-gray-100 rounded-md dark:bg-dark-850" />
                            <span className="block w-1/2 h-1.5 mt-1 bg-gray-100 rounded-md dark:bg-dark-850" />
                            <span className="block w-full h-1.5 mt-1 bg-gray-100 rounded-md dark:bg-dark-850" />
                            <span className="block w-1/3 h-1.5 mt-1 bg-gray-100 rounded-md dark:bg-dark-850" />
                            <span className="block w-2/3 h-1.5 mt-1 bg-gray-100 rounded-md dark:bg-dark-850" />
                          </span>
                        </span>
                      </span>
                    </label>
                    <label
                      htmlFor="fluidLayout"
                      className="cursor-pointer form-label">
                      Fluid
                    </label>
                  </div>
                </div>
              </div>

              {layoutType !== LAYOUT_TYPES.HORIZONTAL && (
                <div className="hidden lg:block">
                  <h6 className="my-4">Sidebar Sizes:</h6>
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-space">
                    <div className="flex-col gap-0 input-radio-group">
                      <input
                        id="defaultSidebar"
                        name="sidebar"
                        type="radio"
                        value={layoutSidebar}
                        className="hidden input-radio peer"
                        onChange={() =>
                          handleThemeSidebarSize(SIDEBAR_SIZE.DEFAULT)
                        }
                        checked={layoutSidebar === SIDEBAR_SIZE.DEFAULT}
                      />
                      <label
                        htmlFor="defaultSidebar"
                        className="block w-full h-24 mb-3 overflow-hidden cursor-pointer card peer-checked:border-primary-500">
                        <span className="block h-full">
                          <span className="flex gap-1 px-4 py-1.5 bg-gray-200/50 dark:bg-dark-800/50">
                            <span className="inline-block bg-red-500 rounded-full size-1.5" />
                            <span className="inline-block bg-green-500 rounded-full size-1.5" />
                            <span className="inline-block rounded-full bg-yellow-500 size-1.5" />
                          </span>
                          <span className="grid h-[calc(100%_-_8px)] grid-cols-12">
                            <span className="h-[calc(100%_-_8px)] col-span-3 bg-gray-50 dark:bg-dark-850" />
                            <span className="h-[calc(100%_-_8px)] col-span-9 py-1.5 px-4 inline-block">
                              <span className="block w-1/3 h-1.5 bg-gray-100 rounded-md dark:bg-dark-850" />
                              <span className="block w-1/2 h-1.5 mt-1 bg-gray-100 rounded-md dark:bg-dark-850" />
                              <span className="block w-full h-1.5 mt-1 bg-gray-100 rounded-md dark:bg-dark-850" />
                              <span className="block w-1/3 h-1.5 mt-1 bg-gray-100 rounded-md dark:bg-dark-850" />
                              <span className="block w-2/3 h-1.5 mt-1 bg-gray-100 rounded-md dark:bg-dark-850" />
                            </span>
                          </span>
                        </span>
                      </label>
                      <label
                        htmlFor="defaultSidebar"
                        className="cursor-pointer form-label">
                        Default (Large)
                      </label>
                    </div>

                    <div className="flex-col gap-0 input-radio-group">
                      <input
                        id="mediumSidebar"
                        name="sidebar"
                        type="radio"
                        value={layoutSidebar}
                        className="hidden input-radio peer"
                        onChange={() =>
                          handleThemeSidebarSize(SIDEBAR_SIZE.MEDIUM)
                        }
                        checked={layoutSidebar === SIDEBAR_SIZE.MEDIUM}
                      />
                      <label
                        htmlFor="mediumSidebar"
                        className="block w-full h-24 mb-3 overflow-hidden cursor-pointer card peer-checked:border-primary-500">
                        <span className="block h-full">
                          <span className="flex gap-1 px-4 py-1.5 bg-gray-200/50 dark:bg-dark-800/50">
                            <span className="inline-block bg-red-500 rounded-full size-1.5" />
                            <span className="inline-block bg-green-500 rounded-full size-1.5" />
                            <span className="inline-block rounded-full bg-yellow-500 size-1.5" />
                          </span>
                          <span className="grid h-[calc(100%_-_8px)] grid-cols-12">
                            <span className="h-[calc(100%_-_8px)] col-span-2 bg-gray-50 dark:bg-dark-850" />
                            <span className="h-[calc(100%_-_8px)] col-span-10 py-1.5 px-4 inline-block">
                              <span className="block w-1/3 h-1.5 bg-gray-100 rounded-md dark:bg-dark-850" />
                              <span className="block w-1/2 h-1.5 mt-1 bg-gray-100 rounded-md dark:bg-dark-850" />
                              <span className="block w-full h-1.5 mt-1 bg-gray-100 rounded-md dark:bg-dark-850" />
                              <span className="block w-1/3 h-1.5 mt-1 bg-gray-100 rounded-md dark:bg-dark-850" />
                              <span className="block w-2/3 h-1.5 mt-1 bg-gray-100 rounded-md dark:bg-dark-850" />
                            </span>
                          </span>
                        </span>
                      </label>
                      <label
                        htmlFor="mediumSidebar"
                        className="cursor-pointer form-label">
                        Medium
                      </label>
                    </div>

                    <div className="flex-col gap-0 input-radio-group">
                      <input
                        id="smallSidebar"
                        name="sidebar"
                        type="radio"
                        value={layoutSidebar}
                        className="hidden input-radio peer"
                        onChange={() =>
                          handleThemeSidebarSize(SIDEBAR_SIZE.SMALL)
                        }
                        checked={layoutSidebar === SIDEBAR_SIZE.SMALL}
                      />
                      <label
                        htmlFor="smallSidebar"
                        className="block w-full h-24 mb-3 overflow-hidden cursor-pointer card peer-checked:border-primary-500">
                        <span className="block h-full">
                          <span className="flex gap-1 px-4 py-1.5 bg-gray-200/50 dark:bg-dark-800/50">
                            <span className="inline-block bg-red-500 rounded-full size-1.5" />
                            <span className="inline-block bg-green-500 rounded-full size-1.5" />
                            <span className="inline-block rounded-full bg-yellow-500 size-1.5" />
                          </span>
                          <span className="grid h-[calc(100%_-_8px)] grid-cols-12">
                            <span className="h-[calc(100%_-_8px)] col-span-1 bg-gray-50 dark:bg-dark-850" />
                            <span className="h-[calc(100%_-_8px)] col-span-11 py-1.5 px-4 inline-block">
                              <span className="block w-1/3 h-1.5 bg-gray-100 rounded-md dark:bg-dark-850" />
                              <span className="block w-1/2 h-1.5 mt-1 bg-gray-100 rounded-md dark:bg-dark-850" />
                              <span className="block w-full h-1.5 mt-1 bg-gray-100 rounded-md dark:bg-dark-850" />
                              <span className="block w-1/3 h-1.5 mt-1 bg-gray-100 rounded-md dark:bg-dark-850" />
                              <span className="block w-2/3 h-1.5 mt-1 bg-gray-100 rounded-md dark:bg-dark-850" />
                            </span>
                          </span>
                        </span>
                      </label>
                      <label
                        htmlFor="smallSidebar"
                        className="cursor-pointer form-label">
                        Small
                      </label>
                    </div>
                  </div>
                </div>
              )}

              {/* </template> */}

              <h6 className="my-4">Layout Directions:</h6>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-space">
                <div className="flex-col gap-0 input-radio-group">
                  <input
                    id="ltrMode"
                    name="layoutDirection"
                    type="radio"
                    className="hidden input-radio peer"
                    value={layoutDirection}
                    onChange={() => handleThemeDirection(LAYOUT_DIRECTION.LTR)}
                    checked={layoutDirection === LAYOUT_DIRECTION.LTR}
                  />
                  <label
                    htmlFor="ltrMode"
                    className="block w-full mb-3 overflow-hidden cursor-pointer card h-28 peer-checked:border-primary-500">
                    <span className="block h-full">
                      <span className="flex gap-1 px-4 py-1.5 bg-gray-200/50 dark:bg-dark-800/50">
                        <span className="inline-block bg-red-500 rounded-full size-1.5" />
                        <span className="inline-block bg-green-500 rounded-full size-1.5" />
                        <span className="inline-block rounded-full bg-yellow-500 size-1.5" />
                      </span>
                      <span className="grid h-[calc(100%_-_8px)] grid-cols-12">
                        <span className="h-[calc(100%_-_8px)] col-span-2 bg-gray-50 dark:bg-dark-850" />
                        <span className="h-[calc(100%_-_8px)] col-span-10 py-1.5 px-4 inline-block">
                          <span className="block w-1/3 h-1.5 bg-gray-100 rounded-md dark:bg-dark-850" />
                          <span className="block w-1/2 h-1.5 mt-1 bg-gray-100 rounded-md dark:bg-dark-850" />
                          <span className="block w-full h-1.5 mt-1 bg-gray-100 rounded-md dark:bg-dark-850" />
                          <span className="block w-1/3 h-1.5 mt-1 bg-gray-100 rounded-md dark:bg-dark-850" />
                          <span className="block w-2/3 h-1.5 mt-1 bg-gray-100 rounded-md dark:bg-dark-850" />
                        </span>
                      </span>
                    </span>
                  </label>
                  <label
                    htmlFor="ltrMode"
                    className="cursor-pointer form-label">
                    LTR
                  </label>
                </div>
                <div className="flex-col gap-0 input-radio-group">
                  <input
                    id="rtlMode"
                    name="layoutDirection"
                    type="radio"
                    className="hidden input-radio peer"
                    value={layoutDirection}
                    onChange={() => handleThemeDirection(LAYOUT_DIRECTION.RTL)}
                    checked={layoutDirection === LAYOUT_DIRECTION.RTL}
                  />
                  <label
                    htmlFor="rtlMode"
                    className="block w-full mb-3 overflow-hidden cursor-pointer card h-28 peer-checked:border-primary-500">
                    <span className="block h-full">
                      <span className="flex gap-1 px-4 py-1.5 bg-gray-200/50 justify-end dark:bg-dark-800/50">
                        <span className="inline-block bg-red-500 rounded-full size-1.5" />
                        <span className="inline-block bg-green-500 rounded-full size-1.5" />
                        <span className="inline-block rounded-full bg-yellow-500 size-1.5" />
                      </span>
                      <span className="grid h-[calc(100%_-_8px)] grid-cols-12">
                        <span className="h-[calc(100%_-_8px)] col-span-10 p-1.5 inline-block">
                          <span className="block w-1/3 h-1.5 bg-gray-100 rounded-md dark:bg-dark-850 ml-auto" />
                          <span className="block w-1/2 h-1.5 mt-1 bg-gray-100 rounded-md dark:bg-dark-850 ml-auto" />
                          <span className="block w-full h-1.5 mt-1 bg-gray-100 rounded-md dark:bg-dark-850 ml-auto" />
                          <span className="block w-1/3 h-1.5 mt-1 bg-gray-100 rounded-md dark:bg-dark-850 ml-auto" />
                          <span className="block w-2/3 h-1.5 mt-1 bg-gray-100 rounded-md dark:bg-dark-850 ml-auto" />
                        </span>
                        <span className="h-[calc(100%_-_8px)] col-span-2 bg-gray-50 dark:bg-dark-850" />
                      </span>
                    </span>
                  </label>
                  <label
                    htmlFor="rtlMode"
                    className="cursor-pointer form-label">
                    RTL
                  </label>
                </div>
              </div>

              <h6 className="my-4">Layout Modes:</h6>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-space">
                <div className="flex-col gap-0 input-radio-group">
                  <input
                    id="lightMode"
                    name="layoutMode"
                    type="radio"
                    className="hidden input-radio peer"
                    value={layoutMode}
                    onChange={() => handleThemeLayout(LAYOUT_MODE_TYPES.LIGHT)}
                    checked={layoutMode === LAYOUT_MODE_TYPES.LIGHT}
                  />
                  <label
                    htmlFor="lightMode"
                    className="block w-full mb-3 overflow-hidden cursor-pointer card h-28 peer-checked:border-primary-500">
                    <span className="block h-full">
                      <span className="flex gap-1 px-4 py-1.5 bg-gray-200/50 dark:bg-dark-800/50">
                        <span className="inline-block bg-red-500 rounded-full size-1.5" />
                        <span className="inline-block bg-green-500 rounded-full size-1.5" />
                        <span className="inline-block rounded-full bg-yellow-500 size-1.5" />
                      </span>
                      <span className="grid h-[calc(100%_-_8px)] grid-cols-12">
                        <span className="h-[calc(100%_-_8px)] col-span-2 bg-gray-50 dark:bg-dark-850" />
                        <span className="h-[calc(100%_-_8px)] col-span-10 p-1.5 inline-block">
                          <span className="block w-1/3 h-1.5 bg-gray-100 rounded-md dark:bg-dark-850" />
                          <span className="block w-1/2 h-1.5 mt-1 bg-gray-100 rounded-md dark:bg-dark-850" />
                          <span className="block w-full h-1.5 mt-1 bg-gray-100 rounded-md dark:bg-dark-850" />
                          <span className="block w-1/3 h-1.5 mt-1 bg-gray-100 rounded-md dark:bg-dark-850" />
                          <span className="block w-2/3 h-1.5 mt-1 bg-gray-100 rounded-md dark:bg-dark-850" />
                        </span>
                      </span>
                    </span>
                  </label>
                  <label
                    htmlFor="lightMode"
                    className="cursor-pointer form-label">
                    Light
                  </label>
                </div>
                <div className="flex-col gap-0 input-radio-group">
                  <input
                    id="darkMode"
                    name="layoutMode"
                    type="radio"
                    className="hidden input-radio peer"
                    value={layoutMode}
                    onChange={() => handleThemeLayout(LAYOUT_MODE_TYPES.DARK)}
                    checked={layoutMode === LAYOUT_MODE_TYPES.DARK}
                  />
                  <label
                    htmlFor="darkMode"
                    className="block w-full mb-3 overflow-hidden cursor-pointer border-dark-700 bg-dark-950 card h-28 peer-checked:border-primary-500">
                    <span className="block h-full">
                      <span className="flex gap-1 px-4 py-1.5 bg-dark-700/50">
                        <span className="inline-block bg-red-500 rounded-full size-1.5" />
                        <span className="inline-block bg-green-500 rounded-full size-1.5" />
                        <span className="inline-block rounded-full bg-yellow-500 size-1.5" />
                      </span>
                      <span className="grid h-[calc(100%_-_8px)] grid-cols-12">
                        <span className="h-[calc(100%_-_8px)] col-span-2 bg-dark-900 dark:bg-dark-850" />
                        <span className="h-[calc(100%_-_8px)] col-span-10 p-1.5 inline-block">
                          <span className="block w-1/3 h-1.5 bg-dark-900 dark:bg-dark-850 rounded-md" />
                          <span className="block w-1/2 h-1.5 mt-1 bg-dark-900 dark:bg-dark-850 rounded-md" />
                          <span className="block w-full h-1.5 mt-1 bg-dark-900 dark:bg-dark-850 rounded-md" />
                          <span className="block w-1/3 h-1.5 mt-1 bg-dark-900 dark:bg-dark-850 rounded-md" />
                          <span className="block w-2/3 h-1.5 mt-1 bg-dark-900 dark:bg-dark-850 rounded-md" />
                        </span>
                      </span>
                    </span>
                  </label>
                  <label
                    htmlFor="darkMode"
                    className="cursor-pointer form-label">
                    Dark
                  </label>
                </div>
                <div className="flex-col gap-0 input-radio-group">
                  <input
                    id="autoMode"
                    name="layoutMode"
                    type="radio"
                    className="hidden input-radio peer"
                    value={layoutMode}
                    onChange={() =>
                      handleThemeLayout(LAYOUT_MODE_TYPES.DEFAULT)
                    }
                    checked={layoutMode === LAYOUT_MODE_TYPES.DEFAULT}
                  />
                  <label
                    htmlFor="autoMode"
                    className="relative block w-full mb-3 overflow-hidden cursor-pointer card h-28 peer-checked:border-primary-500 before:absolute before:bg-gray-950 before:w-1/2 before:inset-y-0 before:right-0">
                    <span className="relative block h-full">
                      <span className="flex gap-1 px-4 py-1.5 bg-gray-200/50 dark:bg-dark-800/50">
                        <span className="inline-block bg-red-500 rounded-full size-1.5" />
                        <span className="inline-block bg-green-500 rounded-full size-1.5" />
                        <span className="inline-block rounded-full bg-yellow-500 size-1.5" />
                      </span>
                      <span className="grid h-[calc(100%_-_8px)] grid-cols-12">
                        <span className="h-[calc(100%_-_8px)] col-span-2 bg-gray-50 dark:bg-dark-850" />
                        <span className="h-[calc(100%_-_8px)] col-span-10 p-1.5 inline-block">
                          <span className="block w-1/3 h-1.5 bg-gray-100/50 dark:bg-dark-850 rounded-md" />
                          <span className="block w-1/2 h-1.5 mt-1 bg-gray-100/50 dark:bg-dark-850 rounded-md" />
                          <span className="block w-full h-1.5 mt-1 bg-gray-100/50 dark:bg-dark-850 rounded-md" />
                          <span className="block w-1/3 h-1.5 mt-1 bg-gray-100/50 dark:bg-dark-850 rounded-md" />
                          <span className="block w-2/3 h-1.5 mt-1 bg-gray-100/50 dark:bg-dark-850 rounded-md" />
                        </span>
                      </span>
                    </span>
                  </label>
                  <label
                    htmlFor="autoMode"
                    className="cursor-pointer form-label">
                    Default System
                  </label>
                </div>
                <div className="flex-col gap-0 input-radio-group">
                  <input
                    id="blackWhiteMode"
                    name="layoutMode"
                    type="radio"
                    className="hidden input-radio peer"
                    value={layoutMode}
                    onChange={() =>
                      handleThemeLayout(LAYOUT_MODE_TYPES.BLACK_WHITE)
                    }
                    checked={layoutMode === LAYOUT_MODE_TYPES.BLACK_WHITE}
                  />
                  <label
                    htmlFor="blackWhiteMode"
                    className="block w-full mb-3 overflow-hidden cursor-pointer card h-28 peer-checked:border-primary-500 grayscale">
                    <span className="block h-full">
                      <span className="flex gap-1 px-4 py-1.5 bg-gray-200/50 dark:bg-dark-800/50">
                        <span className="inline-block bg-red-500 rounded-full size-1.5" />
                        <span className="inline-block bg-green-500 rounded-full size-1.5" />
                        <span className="inline-block rounded-full bg-yellow-500 size-1.5" />
                      </span>
                      <span className="grid h-[calc(100%_-_8px)] grid-cols-12">
                        <span className="h-[calc(100%_-_8px)] col-span-2 bg-gray-50 dark:bg-dark-850" />
                        <span className="h-[calc(100%_-_8px)] col-span-10 p-1.5 inline-block">
                          <span className="block w-1/3 h-1.5 bg-gray-100 rounded-md dark:bg-dark-850" />
                          <span className="block w-1/2 h-1.5 mt-1 bg-gray-100 rounded-md dark:bg-dark-850" />
                          <span className="block w-full h-1.5 mt-1 bg-gray-100 rounded-md dark:bg-dark-850" />
                          <span className="block w-1/3 h-1.5 mt-1 bg-gray-100 rounded-md dark:bg-dark-850" />
                          <span className="block w-2/3 h-1.5 mt-1 bg-gray-100 rounded-md dark:bg-dark-850" />
                        </span>
                      </span>
                    </span>
                  </label>
                  <label
                    htmlFor="blackWhiteMode"
                    className="cursor-pointer form-label">
                    Black & White
                  </label>
                </div>
              </div>

              {layoutMode === LAYOUT_MODE_TYPES.DARK && (
                <div>
                  <h6 className="my-4 darkModeColors">Dark Mode Colors:</h6>
                  <div className="flex flex-wrap items-center gap-3 darkModeColors">
                    <div className="input-radio-group">
                      <input
                        id="noneColors"
                        name="darkModeColors"
                        type="radio"
                        className="hidden input-radio peer"
                        value={layoutDarkModeClass}
                        onChange={() =>
                          handleDarkModeClass(DARK_MODE_CLASS.DEFAULT)
                        }
                        checked={
                          layoutDarkModeClass === DARK_MODE_CLASS.DEFAULT
                        }
                      />
                      <label
                        htmlFor="noneColors"
                        className="flex items-center justify-center border border-gray-200 rounded-full dark:border-dark-800 input-radio-label size-10 peer-checked:ring-1 peer-checked:ring-offset-2 dark:peer-checked:ring-offset-dark-900 peer-checked:ring-primary-400">
                        <X className="size-4" />
                      </label>
                    </div>
                    <div className="input-radio-group">
                      <input
                        id="zincColors"
                        name="darkModeColors"
                        type="radio"
                        className="hidden input-radio peer"
                        value={layoutDarkModeClass}
                        onChange={() =>
                          handleDarkModeClass(DARK_MODE_CLASS.ZINC)
                        }
                        checked={layoutDarkModeClass === DARK_MODE_CLASS.ZINC}
                      />
                      <label
                        htmlFor="zincColors"
                        className="rounded-full bg-zinc-950 input-radio-label size-10 peer-checked:ring-1 peer-checked:ring-offset-2 dark:peer-checked:ring-offset-dark-900 peer-checked:ring-primary-400"
                      />
                    </div>
                    <div
                      className="input-radio-group"
                      onClick={() =>
                        handleDarkModeClass(DARK_MODE_CLASS.STONE)
                      }>
                      <input
                        id="stoneColors"
                        name="darkModeColors"
                        type="radio"
                        className="hidden input-radio peer"
                        value={layoutDarkModeClass}
                        onChange={() =>
                          handleDarkModeClass(DARK_MODE_CLASS.STONE)
                        }
                        checked={layoutDarkModeClass === DARK_MODE_CLASS.STONE}
                      />
                      <label
                        htmlFor="stoneColors"
                        className="rounded-full bg-stone-950 input-radio-label size-10 peer-checked:ring-1 peer-checked:ring-offset-2 dark:peer-checked:ring-offset-dark-900 peer-checked:ring-primary-400"
                      />
                    </div>
                    <div
                      className="input-radio-group"
                      onClick={() =>
                        handleDarkModeClass(DARK_MODE_CLASS.NEUTRAL)
                      }>
                      <input
                        id="neutralColors"
                        name="darkModeColors"
                        type="radio"
                        className="hidden input-radio peer"
                        value={layoutDarkModeClass}
                        onChange={() =>
                          handleDarkModeClass(DARK_MODE_CLASS.NEUTRAL)
                        }
                        checked={
                          layoutDarkModeClass === DARK_MODE_CLASS.NEUTRAL
                        }
                      />
                      <label
                        htmlFor="neutralColors"
                        className="rounded-full bg-neutral-950 input-radio-label size-10 peer-checked:ring-1 peer-checked:ring-offset-2 dark:peer-checked:ring-offset-dark-900 peer-checked:ring-primary-400"
                      />
                    </div>
                    <div className="input-radio-group">
                      <input
                        id="defaultColors"
                        name="darkModeColors"
                        type="radio"
                        className="hidden input-radio peer"
                        value={layoutDarkModeClass}
                        onChange={() =>
                          handleDarkModeClass(DARK_MODE_CLASS.GRAY)
                        }
                        checked={layoutDarkModeClass === DARK_MODE_CLASS.GRAY}
                      />
                      <label
                        htmlFor="defaultColors"
                        className="rounded-full bg-gray-950 input-radio-label size-10 peer-checked:ring-1 peer-checked:ring-offset-2 dark:peer-checked:ring-offset-dark-900 peer-checked:ring-primary-400"
                      />
                    </div>
                  </div>
                </div>
              )}
              {layoutType !== LAYOUT_TYPES.HORIZONTAL && (
                <div>
                  <h6 className="my-4">Sidebar Asset Colors:</h6>
                  <div className="flex flex-wrap items-center gap-3">
                    <div className="input-radio-group">
                      <input
                        id="lightSidebarColors"
                        name="sidebarColors"
                        type="radio"
                        className="hidden input-radio peer"
                        value={layoutSidebarColor}
                        onChange={() =>
                          handleThemeSideColorChange(SIDEBAR_COLOR.LIGHT)
                        }
                        checked={layoutSidebarColor === SIDEBAR_COLOR.LIGHT}
                      />
                      <label
                        htmlFor="lightSidebarColors"
                        className="bg-gray-100 rounded-full input-radio-label size-10 peer-checked:ring-1 peer-checked:ring-offset-2 dark:peer-checked:ring-offset-dark-900 peer-checked:ring-primary-400"
                      />
                    </div>

                    <div className="input-radio-group">
                      <input
                        id="darkSidebarColors"
                        name="sidebarColors"
                        type="radio"
                        className="hidden input-radio peer"
                        value={layoutSidebarColor}
                        onChange={() =>
                          handleThemeSideColorChange(SIDEBAR_COLOR.DARK)
                        }
                        checked={layoutSidebarColor === SIDEBAR_COLOR.DARK}
                      />
                      <label
                        htmlFor="darkSidebarColors"
                        className="bg-gray-800 rounded-full input-radio-label size-10 peer-checked:ring-1 peer-checked:ring-offset-2 dark:peer-checked:ring-offset-dark-900 peer-checked:ring-primary-400"
                      />
                    </div>

                    <div className="input-radio-group">
                      <input
                        id="brandSidebarColors"
                        name="sidebarColors"
                        type="radio"
                        className="hidden input-radio peer"
                        value={layoutSidebarColor}
                        onChange={() =>
                          handleThemeSideColorChange(SIDEBAR_COLOR.BRAND)
                        }
                        checked={layoutSidebarColor === SIDEBAR_COLOR.BRAND}
                      />
                      <label
                        htmlFor="brandSidebarColors"
                        className="rounded-full bg-primary-900 input-radio-label size-10 peer-checked:ring-1 peer-checked:ring-offset-2 dark:peer-checked:ring-offset-dark-900 peer-checked:ring-primary-400"
                      />
                    </div>

                    <div className="input-radio-group">
                      <input
                        id="purpleSidebarColors"
                        name="sidebarColors"
                        type="radio"
                        className="hidden input-radio peer"
                        value={layoutSidebarColor}
                        onChange={() =>
                          handleThemeSideColorChange(SIDEBAR_COLOR.PURPLE)
                        }
                        checked={layoutSidebarColor === SIDEBAR_COLOR.PURPLE}
                      />
                      <label
                        htmlFor="purpleSidebarColors"
                        className="rounded-full bg-purple-950 input-radio-label size-10 peer-checked:ring-1 peer-checked:ring-offset-2 dark:peer-checked:ring-offset-dark-900 peer-checked:ring-primary-400"
                      />
                    </div>

                    <div className="input-radio-group">
                      <input
                        id="skySidebarColors"
                        name="sidebarColors"
                        type="radio"
                        className="hidden input-radio peer"
                        value={layoutSidebarColor}
                        onChange={() =>
                          handleThemeSideColorChange(SIDEBAR_COLOR.SKY)
                        }
                        checked={layoutSidebarColor === SIDEBAR_COLOR.SKY}
                      />
                      <label
                        htmlFor="skySidebarColors"
                        className="rounded-full bg-sky-950 input-radio-label size-10 peer-checked:ring-1 peer-checked:ring-offset-2 dark:peer-checked:ring-offset-dark-900 peer-checked:ring-primary-400"
                      />
                    </div>
                  </div>
                </div>
              )}
              <h6 className="my-4">Primary Asset Colors:</h6>
              <div className="flex flex-wrap items-center gap-3">
                <div className="input-radio-group">
                  <input
                    id="defaultPrimaryColors"
                    name="primaryColors"
                    type="radio"
                    className="hidden input-radio peer"
                    value={layoutDataColor}
                    onChange={() => handleThemeColor(DATA_COLORS.DEFAULT)}
                    checked={layoutDataColor === DATA_COLORS.DEFAULT}
                  />
                  <label
                    htmlFor="defaultPrimaryColors"
                    className="rounded-full bg-[#358ffc] input-radio-label size-10 peer-checked:ring-1 peer-checked:ring-offset-2 dark:peer-checked:ring-offset-dark-900 peer-checked:ring-primary-400"
                  />
                </div>
                <div className="input-radio-group">
                  <input
                    id="greenPrimaryColors"
                    name="primaryColors"
                    type="radio"
                    className="hidden input-radio peer"
                    value={layoutDataColor}
                    onChange={() => handleThemeColor(DATA_COLORS.GREEN)}
                    checked={layoutDataColor === DATA_COLORS.GREEN}
                  />
                  <label
                    htmlFor="greenPrimaryColors"
                    className="bg-[#1acd81] rounded-full input-radio-label size-10 peer-checked:ring-1 peer-checked:ring-offset-2 dark:peer-checked:ring-offset-dark-900 peer-checked:ring-primary-400"
                  />
                </div>
                <div className="input-radio-group">
                  <input
                    id="violetPrimaryColors"
                    name="primaryColors"
                    type="radio"
                    className="hidden input-radio peer"
                    value={layoutDataColor}
                    onChange={() => handleThemeColor(DATA_COLORS.VIOLET)}
                    checked={layoutDataColor === DATA_COLORS.VIOLET}
                  />
                  <label
                    htmlFor="violetPrimaryColors"
                    className="rounded-full bg-violet-500 input-radio-label size-10 peer-checked:ring-1 peer-checked:ring-offset-2 dark:peer-checked:ring-offset-dark-900 peer-checked:ring-primary-400"
                  />
                </div>
                <div className="input-radio-group">
                  <input
                    id="orangePrimaryColors"
                    name="primaryColors"
                    type="radio"
                    className="hidden input-radio peer"
                    value={layoutDataColor}
                    onChange={() => handleThemeColor(DATA_COLORS.ORANGE)}
                    checked={layoutDataColor === DATA_COLORS.ORANGE}
                  />
                  <label
                    htmlFor="orangePrimaryColors"
                    className="rounded-full bg-[#f04b1f] input-radio-label size-10 peer-checked:ring-1 peer-checked:ring-offset-2 dark:peer-checked:ring-offset-dark-900 peer-checked:ring-primary-400"
                  />
                </div>
                <div className="input-radio-group">
                  <input
                    id="tealPrimaryColors"
                    name="primaryColors"
                    type="radio"
                    className="hidden input-radio peer"
                    value={layoutDataColor}
                    onChange={() => handleThemeColor(DATA_COLORS.TEAL)}
                    checked={layoutDataColor === DATA_COLORS.TEAL}
                  />
                  <label
                    htmlFor="tealPrimaryColors"
                    className="bg-teal-500 rounded-full input-radio-label size-10 peer-checked:ring-1 peer-checked:ring-offset-2 dark:peer-checked:ring-offset-dark-900 peer-checked:ring-primary-400"
                  />
                </div>
                <div className="input-radio-group">
                  <input
                    id="fuchsiaPrimaryColors"
                    name="primaryColors"
                    type="radio"
                    className="hidden input-radio peer"
                    value={layoutDataColor}
                    onChange={() => handleThemeColor(DATA_COLORS.FUCHSIA)}
                    checked={layoutDataColor === DATA_COLORS.FUCHSIA}
                  />
                  <label
                    htmlFor="fuchsiaPrimaryColors"
                    className="rounded-full bg-fuchsia-500 input-radio-label size-10 peer-checked:ring-1 peer-checked:ring-offset-2 dark:peer-checked:ring-offset-dark-900 peer-checked:ring-primary-400"
                  />
                </div>
                <div className="input-radio-group">
                  <input
                    id="limePrimaryColors"
                    name="primaryColors"
                    type="radio"
                    className="hidden input-radio peer"
                    value={layoutDataColor}
                    onChange={() => handleThemeColor(DATA_COLORS.LIME)}
                    checked={layoutDataColor === DATA_COLORS.LIME}
                  />
                  <label
                    htmlFor="limePrimaryColors"
                    className="rounded-full bg-lime-500 input-radio-label size-10 peer-checked:ring-1 peer-checked:ring-offset-2 dark:peer-checked:ring-offset-dark-900 peer-checked:ring-primary-400"
                  />
                </div>
                <div className="input-radio-group">
                  <input
                    id="amberPrimaryColors"
                    name="primaryColors"
                    type="radio"
                    className="hidden input-radio peer"
                    value={layoutDataColor}
                    onChange={() => handleThemeColor(DATA_COLORS.AMBER)}
                    checked={layoutDataColor === DATA_COLORS.AMBER}
                  />
                  <label
                    htmlFor="amberPrimaryColors"
                    className="rounded-full bg-amber-500 input-radio-label size-10 peer-checked:ring-1 peer-checked:ring-offset-2 dark:peer-checked:ring-offset-dark-900 peer-checked:ring-primary-400"
                  />
                </div>
              </div>
            </div>
          </>
        )}
        footer={(onClose) => (
          <>
            <button
              type="button"
              className="btn btn-sub-gray"
              onClick={() => resetTheme(onClose)}>
              <RotateCcw className="inline-block ltr:mr-1 rtl:ml-1 size-4" />
              Reset Layouts
            </button>
            <button type="button" className="btn btn-red">
              <ShoppingBag className="inline-block ltr:mr-1 rtl:ml-1 size-4" />
              Buy Now
            </button>
          </>
        )}
      />
    </>
  )
}

export default SettingsModal
