'use client'

import { LAYOUT_DIRECTION } from '@src/components/constants/layout'
import EditProspect from '@src/views/prospect/EditProspect'
import { useSelector } from 'react-redux'
import { ToastContainer } from 'react-toastify'

const EditProspectPage = () => {
  const { layoutMode, layoutDirection } = useSelector((state) => state.Layout)
  
  return (
    <>
      <EditProspect />
      <ToastContainer
        theme={layoutMode}
        rtl={layoutDirection === LAYOUT_DIRECTION.RTL}
        position={
          layoutDirection === LAYOUT_DIRECTION.RTL ? 'top-left' : 'top-right'
        }
      />
    </>
  )
}

export default EditProspectPage