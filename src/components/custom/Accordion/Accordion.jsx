import { useEffect, useRef, useState } from 'react'

import { ChevronDown, ChevronUp } from 'lucide-react'

const Accordion = ({
  title,
  isOpen,
  onToggle,
  children,
  headerColor,
  isButtonAccordion,
  accordionClass,
  arrowColor,
}) => {
  const contentRef = useRef(null)
  const [height, setHeight] = useState('0px')

  useEffect(() => {
    setHeight(isOpen ? `${contentRef.current?.scrollHeight}px` : '0px')
  }, [isOpen])

  return (
    <>
      {isButtonAccordion ? (
        <button
          type="button"
          className={`text-white btn bg-primary-500 border-primary-500 hover:bg-primary-600 hover:text-white hover:border-primary-600 focus:bg-primary-600 focus:text-white focus:border-primary-600 ${headerColor} ${isOpen ? 'active' : ''}`}
          onClick={onToggle}>
          <div className="flex items-center justify-between">
            <span className="ltr:mr-1 rtl:ml-1">{title}</span>
            {isOpen ? (
              <span className="ico-down">
                <ChevronDown />
              </span>
            ) : (
              <span className="ico-up">
                <ChevronUp />
              </span>
            )}
          </div>
        </button>
      ) : (
        <div className={`${accordionClass}`}>
          <button
            className={`accordion-button ${headerColor} ${isOpen ? 'active' : ''}`}
            onClick={onToggle}>
            <span className="flex items-center justify-between">
              <span>{title}</span>
              <span className="arrow-icon">
                <span className={`arrow-icon ${isOpen ? 'active' : ''}`}>
                  {isOpen ? (
                    <ChevronUp style={{ color: `${arrowColor}` }} />
                  ) : (
                    <ChevronDown />
                  )}
                </span>
              </span>
            </span>
          </button>
        </div>
      )}
      <div
        className="relative overflow-hidden transition-all duration-700 accordion-main-content"
        ref={contentRef}
        style={{ maxHeight: height }}>
        {children}
      </div>
    </>
  )
}

export default Accordion
