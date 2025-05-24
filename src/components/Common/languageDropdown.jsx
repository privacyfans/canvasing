'use client'

import Image from 'next/image'
import Link from 'next/link'

import FlagImg from '@assets/images/flag/us.svg'
import { interNationalization } from '@src/data/layout/inter-nationalization'
import { changeLayoutLanguage } from '@src/slices/thunk'
import i18n from '@src/utils/i18n'
import { useDispatch, useSelector } from 'react-redux'
import SimpleBar from 'simplebar-react'

import {
  Dropdown,
  DropdownButton,
  DropdownMenu,
} from '../custom/Dropdown/Dropdown'

const LanguageDropdown = () => {
  const dispatch = useDispatch()
  const { layoutLanguages } = useSelector((state) => state.Layout)
  // get country flag
  const getCountryFlag = (code) => {
    return interNationalization.find((item) => item.code === code)?.flag
  }
  // change language
  const changeLanguage = (lng) => {
    dispatch(changeLayoutLanguage(lng))
    i18n.changeLanguage(lng)
  }

  return (
    <div>
      <Dropdown position="right" trigger="click" dropdownClassName="dropdown">
        <DropdownButton colorClass="topbar-link">
          <Image
            src={getCountryFlag(layoutLanguages) || FlagImg}
            alt="falgImg"
            className="object-cover rounded-md size-6"
            width={24}
            height={24}
          />
        </DropdownButton>

        <DropdownMenu>
          <SimpleBar className="max-h-[calc(100vh_-_100px)]">
            {interNationalization &&
              interNationalization.length > 0 &&
              interNationalization.map((value, key) => {
                return (
                  <Link
                    href="#!"
                    className="dropdown-item"
                    key={key}
                    onClick={() => changeLanguage(value.code)}>
                    <Image
                      src={value.flag}
                      alt={value.language}
                      className="object-cover rounded-md size-5"
                      width={20}
                      height={20}
                    />
                    <span>{value.language}</span>
                  </Link>
                )
              })}
          </SimpleBar>
        </DropdownMenu>
      </Dropdown>
    </div>
  )
}

export default LanguageDropdown
