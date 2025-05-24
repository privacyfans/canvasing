'use client'

import { LAYOUT_MODE_TYPES } from '@src/components/constants/layout'
import { changeLayoutMode } from '@src/slices/thunk'
import { Moon, Sun } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'

const LandingThemeMode = ({ bgColor }) => {
  const { layoutMode } = useSelector((state) => state.Layout)
  const dispatch = useDispatch()
  // change layout mode
  const handleChangeLayoutMode = (value) => {
    dispatch(changeLayoutMode(value))
  }

  return (
    <>
      <button
        className={`fixed flex items-center justify-center text-white ltr:right-0 rtl:left-0 ${bgColor} ltr:rounded-l-md rtl:rounded-r-md size-12 top-1/2`}
        onClick={() =>
          handleChangeLayoutMode(
            layoutMode === LAYOUT_MODE_TYPES.LIGHT
              ? LAYOUT_MODE_TYPES.DARK
              : LAYOUT_MODE_TYPES.LIGHT
          )
        }>
        {layoutMode === LAYOUT_MODE_TYPES.LIGHT ||
        layoutMode === LAYOUT_MODE_TYPES.DEFAULT ||
        layoutMode === LAYOUT_MODE_TYPES.BLACK_WHITE ? (
          <Moon className="size-5" />
        ) : (
          <Sun className="size-5" />
        )}
      </button>
    </>
  )
}

export default LandingThemeMode
