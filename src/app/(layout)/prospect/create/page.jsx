'use client'

import { LAYOUT_DIRECTION } from '@src/components/constants/layout'
import CreateProspect from '@src/views/prospect/CreateProspect'
import { useSelector } from 'react-redux'
import { ToastContainer } from 'react-toastify'

const CreateProspectPage = () => {
  const { layoutMode, layoutDirection } = useSelector((state) => state.Layout)
  
  return (
    <>
      <CreateProspect />
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

export default CreateProspectPage