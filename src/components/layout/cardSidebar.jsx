'use client'

import { X } from 'lucide-react'

import { Drawer } from '../custom/Drawer/Drawer'

const CardSidebar = ({ open, handleCloseModal }) => {
  return (
    <>
      <Drawer
        isOpen={open}
        onClose={() => handleCloseModal()}
        position="right"
        size="large"
        customContentClass="none"
        content={
          <>
            <div id="basicEnd" drawer-end className="drawer show drawer-lg p-3">
              <div className="drawer-header">
                <h6>My Cart (3)</h6>
                <button data-drawer-close="basicEnd">
                  <X className="link link-red" onClick={handleCloseModal} />
                </button>
              </div>
            </div>
          </>
        }
        footer={<></>}
      />
    </>
  )
}

export default CardSidebar
