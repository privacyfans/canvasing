'use client'

import React, { useEffect } from 'react'

import Prism from 'prismjs'
import 'prismjs/themes/prism-okaidia.css'

const PrismCode = ({ language, code }) => {
  useEffect(() => {
    Prism.highlightAll() // Highlight all code blocks
  }, [code])

  return (
    <pre>
      <code className={`language-${language}`}>{code}</code>
    </pre>
  )
}

export default PrismCode
