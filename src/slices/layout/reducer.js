import { createSlice } from '@reduxjs/toolkit'
import {
  DARK_MODE_CLASS,
  DATA_COLORS,
  LAYOUT_CONTENT_WIDTH,
  LAYOUT_DIRECTION,
  LAYOUT_LANGUAGES,
  LAYOUT_MODE_TYPES,
  LAYOUT_TYPES,
  MODERN_NAVIGATION,
  SIDEBAR_COLOR,
  SIDEBAR_SIZE,
} from '@src/components/constants/layout'

export const initialState = {
  layoutType: LAYOUT_TYPES.VERTICAL,
  layoutWidth: LAYOUT_CONTENT_WIDTH.DEFAULT,
  layoutMode: LAYOUT_MODE_TYPES.LIGHT,
  layoutSidebar: SIDEBAR_SIZE.DEFAULT,
  layoutSidebarColor: SIDEBAR_COLOR.LIGHT,
  layoutDirection: LAYOUT_DIRECTION.LTR,
  layoutDataColor: DATA_COLORS.DEFAULT,
  layoutLanguages: LAYOUT_LANGUAGES.ENGLISH,
  layoutNavigation: MODERN_NAVIGATION.DEFAULT,
  layoutDarkModeClass: DARK_MODE_CLASS.DEFAULT,
  isSettingModalOpen: false,
}

const LayoutSlice = createSlice({
  name: 'layoutdata',
  initialState,
  reducers: {
    changeLayoutAction(state, action) {
      state.layoutType = action.payload
    },
    changeLayoutWidthAction(state, action) {
      state.layoutWidth = action.payload
    },
    changeLayoutModeAction(state, action) {
      state.layoutMode = action.payload
    },
    changeLayoutSidebarAction(state, action) {
      state.layoutSidebar = action.payload
    },
    changeLayoutSidebarColorAction(state, action) {
      state.layoutSidebarColor = action.payload
    },
    changeLayoutDirectionAction(state, action) {
      state.layoutDirection = action.payload
    },
    changeLayoutDataColorAction(state, action) {
      state.layoutDataColor = action.payload
    },
    changeLayoutLanguageAction(state, action) {
      state.layoutLanguages = action.payload
    },
    changeLayoutModalNavigationAction(state, action) {
      state.layoutNavigation = action.payload
    },
    changeLayoutDarkModeClass(state, action) {
      state.layoutDarkModeClass = action.payload
    },
    changeSettingModalOpen(state, action) {
      state.isSettingModalOpen = action.payload
    },
  },
})

export const {
  changeLayoutAction,
  changeLayoutWidthAction,
  changeLayoutModeAction,
  changeLayoutSidebarAction,
  changeLayoutSidebarColorAction,
  changeLayoutDirectionAction,
  changeLayoutDataColorAction,
  changeLayoutLanguageAction,
  changeLayoutModalNavigationAction,
  changeLayoutDarkModeClass,
  changeSettingModalOpen,
} = LayoutSlice.actions

export default LayoutSlice.reducer
