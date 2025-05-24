'use client'

import React, { useEffect, useState } from 'react'

import { usePathname, useRouter } from 'next/navigation'

const Tabs = ({
  children,
  ulProps = '',
  activeTabClass = '',
  inactiveTabClass = '',
  otherClass = '',
  contentProps = '',
  liProps = '',
  spanProps = '',
  onChange,
}) => {
  const router = useRouter()
  const pathname = usePathname()
  const [activeTab, setActiveTab] = useState(0)

  const tabs = React.Children.toArray(children)

  useEffect(() => {
    const activeIndex = tabs.findIndex((tab) => tab.props.path === pathname)
    if (activeIndex !== -1) {
      setActiveTab(activeIndex)
    }
  }, [pathname, tabs])

  const handleTabClick = (index, path) => {
    setActiveTab(index)
    if (path) {
      router.push(path)
    }
    if (tabs[index].props.label && onChange) {
      onChange(tabs[index].props.label)
    }
  }

  return (
    <>
      <ul className={ulProps}>
        {tabs.map((tab, index) => (
          <li
            key={index}
            onClick={() => handleTabClick(index, tab.props.path)}
            className={liProps}
            style={{ cursor: 'pointer' }}>
            <span
              className={`${activeTab === index ? activeTabClass : inactiveTabClass} ${otherClass}`}>
              {tab.props.icon}
              <span className={spanProps}>{tab.props.label}</span>
            </span>
          </li>
        ))}
      </ul>
      <div className={contentProps}>{tabs[activeTab].props.children}</div>
    </>
  )
}

const Tab = ({ children }) => {
  return <React.Fragment>{children}</React.Fragment>
}

export { Tabs, Tab }
