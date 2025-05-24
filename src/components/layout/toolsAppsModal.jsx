import Image from 'next/image'

import brand4 from '@assets/images/brands/img-04.png'
import brand6 from '@assets/images/brands/img-06.png'
import brand11 from '@assets/images/brands/img-11.png'
import brand15 from '@assets/images/brands/img-15.png'
import brand20 from '@assets/images/brands/img-20.png'
import brand26 from '@assets/images/brands/img-26.png'
import brand29 from '@assets/images/brands/img-29.png'
import brand30 from '@assets/images/brands/img-30.png'
import brand31 from '@assets/images/brands/img-31.png'
import { Search } from 'lucide-react'

import { Modal } from '../custom/Modal/Modal'

const ToolsAppsModal = ({ open, handleCloseModal }) => {
  return (
    <>
      <Modal
        isOpen={open}
        onClose={handleCloseModal}
        position="modal-center"
        title="Enhance Your Tech Stacks With Additional Tools"
        id="toolsAppsModal"
        size="modal-lg"
        contentClass="model-content"
        footerClass="flex items-center justify-end gap-2"
        content={() => (
          <>
            <div className="relative w-full mb-5 group/form grow">
              <input
                type="email"
                className="ltr:pl-9 rtl:pr-9 form-input ltr:group-[&.right]/form:pr-9 rtl:group-[&.right]/form:pl-9 ltr:group-[&.right]/form:pl-4 rtl:group-[&.right]/form:pr-4"
                placeholder="Search for ..."
              />
              <button className="absolute inset-y-0 flex items-center text-gray-500 dark:text-dark-500 ltr:left-3 rtl:right-3 ltr:group-[&.right]/form:right-3 rtl:group-[&.right]/form:left-3 ltr:group-[&.right]/form:left-auto rtl:group-[&.right]/form:right-auto focus:outline-hidden">
                <Search className="size-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
              <div className="relative w-full input-check-group">
                <input
                  id="toolsCheckbox1"
                  name="toolsAppsCheckbox"
                  className="absolute bg-white rounded-full input-check -top-2 size-5 -right-2 dark:bg-dark-900 input-check-primary dark:checked:bg-primary-500 peer"
                  type="checkbox"
                />
                <label
                  htmlFor="toolsCheckbox1"
                  className="flex items-center w-full gap-3 p-3 font-medium border border-gray-200 rounded-md dark:border-dark-800 input-check-label peer-checked:border-primary-500">
                  <Image
                    src={brand30}
                    height={28}
                    width={28}
                    alt="brandImg"
                    className="h-7"
                  />
                  X Twitter
                </label>
              </div>
              <div className="relative w-full input-check-group">
                <input
                  id="toolsCheckbox2"
                  name="toolsAppsCheckbox"
                  className="absolute bg-white rounded-full input-check -top-2 size-5 -right-2 dark:bg-dark-900 input-check-primary dark:checked:bg-primary-500 peer"
                  type="checkbox"
                />
                <label
                  htmlFor="toolsCheckbox2"
                  className="flex items-center w-full gap-3 p-3 font-medium border border-gray-200 rounded-md dark:border-dark-800 input-check-label peer-checked:border-primary-500">
                  <Image
                    src={brand29}
                    height={28}
                    width={28}
                    alt="brandImg"
                    className="h-7"
                  />
                  Slack
                </label>
              </div>
              <div className="relative w-full input-check-group">
                <input
                  id="toolsCheckbox3"
                  name="toolsAppsCheckbox"
                  className="absolute bg-white rounded-full input-check -top-2 size-5 -right-2 dark:bg-dark-900 input-check-primary dark:checked:bg-primary-500 peer"
                  type="checkbox"
                />
                <label
                  htmlFor="toolsCheckbox3"
                  className="flex items-center w-full gap-3 p-3 font-medium border border-gray-200 rounded-md dark:border-dark-800 input-check-label peer-checked:border-primary-500">
                  <Image
                    src={brand26}
                    height={28}
                    width={28}
                    alt="brandImg"
                    className="h-7"
                  />
                  GitHub
                </label>
              </div>
              <div className="relative w-full input-check-group">
                <input
                  id="toolsCheckbox4"
                  name="toolsAppsCheckbox"
                  className="absolute bg-white rounded-full input-check -top-2 size-5 -right-2 dark:bg-dark-900 input-check-primary dark:checked:bg-primary-500 peer"
                  type="checkbox"
                />
                <label
                  htmlFor="toolsCheckbox4"
                  className="flex items-center w-full gap-3 p-3 font-medium border border-gray-200 rounded-md dark:border-dark-800 input-check-label peer-checked:border-primary-500">
                  <Image
                    src={brand15}
                    height={28}
                    width={28}
                    alt="brandImg"
                    className="h-7"
                  />
                  YouTube
                </label>
              </div>
              <div className="relative w-full input-check-group">
                <input
                  id="toolsCheckbox5"
                  name="toolsAppsCheckbox"
                  className="absolute bg-white rounded-full input-check -top-2 size-5 -right-2 dark:bg-dark-900 input-check-primary dark:checked:bg-primary-500 peer"
                  type="checkbox"
                />
                <label
                  htmlFor="toolsCheckbox5"
                  className="flex items-center w-full gap-3 p-3 font-medium border border-gray-200 rounded-md dark:border-dark-800 input-check-label peer-checked:border-primary-500">
                  <Image
                    src={brand6}
                    height={28}
                    width={28}
                    alt="brandImg"
                    className="h-7"
                  />
                  Windows 11
                </label>
              </div>
              <div className="relative w-full input-check-group">
                <input
                  id="toolsCheckbox6"
                  name="toolsAppsCheckbox"
                  className="absolute bg-white rounded-full input-check -top-2 size-5 -right-2 dark:bg-dark-900 input-check-primary dark:checked:bg-primary-500 peer"
                  type="checkbox"
                />
                <label
                  htmlFor="toolsCheckbox6"
                  className="flex items-center w-full gap-3 p-3 font-medium border border-gray-200 rounded-md dark:border-dark-800 input-check-label peer-checked:border-primary-500">
                  <Image
                    src={brand20}
                    height={28}
                    width={28}
                    alt="brandImg"
                    className="h-7"
                  />
                  PayPal
                </label>
              </div>
              <div className="relative w-full input-check-group">
                <input
                  id="toolsCheckbox7"
                  name="toolsAppsCheckbox"
                  className="absolute bg-white rounded-full input-check -top-2 size-5 -right-2 dark:bg-dark-900 input-check-primary dark:checked:bg-primary-500 peer"
                  type="checkbox"
                />
                <label
                  htmlFor="toolsCheckbox7"
                  className="flex items-center w-full gap-3 p-3 font-medium border border-gray-200 rounded-md dark:border-dark-800 input-check-label peer-checked:border-primary-500">
                  <Image
                    src={brand11}
                    height={28}
                    width={28}
                    alt="brandImg"
                    className="h-7"
                  />
                  Twitch
                </label>
              </div>
              <div className="relative w-full input-check-group">
                <input
                  id="toolsCheckbox8"
                  name="toolsAppsCheckbox"
                  className="absolute bg-white rounded-full input-check -top-2 size-5 -right-2 dark:bg-dark-900 input-check-primary dark:checked:bg-primary-500 peer"
                  type="checkbox"
                />
                <label
                  htmlFor="toolsCheckbox8"
                  className="flex items-center w-full gap-3 p-3 font-medium border border-gray-200 rounded-md dark:border-dark-800 input-check-label peer-checked:border-primary-500">
                  <Image
                    src={brand31}
                    height={28}
                    width={28}
                    alt="brandImg"
                    className="h-7"
                  />
                  Snapchat
                </label>
              </div>
              <div className="relative w-full input-check-group">
                <input
                  id="toolsCheckbox9"
                  name="toolsAppsCheckbox"
                  className="absolute bg-white rounded-full input-check -top-2 size-5 -right-2 dark:bg-dark-900 input-check-primary dark:checked:bg-primary-500 peer"
                  type="checkbox"
                />
                <label
                  htmlFor="toolsCheckbox9"
                  className="flex items-center w-full gap-3 p-3 font-medium border border-gray-200 rounded-md dark:border-dark-800 input-check-label peer-checked:border-primary-500">
                  <Image
                    src={brand4}
                    height={28}
                    width={28}
                    alt="brandImg"
                    className="h-7"
                  />
                  Linux
                </label>
              </div>
            </div>
          </>
        )}
        footer={(onClose) => (
          <>
            <button
              type="button"
              className="btn btn-active-red"
              data-modal-close="toolsAppsModal"
              onClick={onClose}>
              Close
            </button>
            <button type="button" className="btn btn-primary" onClick={onClose}>
              Save Changes
            </button>
          </>
        )}
      />
    </>
  )
}

export default ToolsAppsModal
