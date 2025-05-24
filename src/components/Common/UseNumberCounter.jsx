'use client'

import React, { useEffect, useState } from 'react'

const UseNumberCounter = ({ start, end, duration }) => {
  const [count, setCount] = useState(start)

  useEffect(() => {
    const startTime = Date.now()
    const endTime = startTime + duration

    const step = () => {
      const now = Date.now()
      const remaining = endTime - now

      if (remaining <= 0) {
        setCount(end)
      } else {
        const progress = 1 - remaining / duration
        const currentCount = Math.floor(progress * (end - start) + start)
        setCount(currentCount)
        requestAnimationFrame(step)
      }
    }
    const animationFrameId = requestAnimationFrame(step)
    return () => cancelAnimationFrame(animationFrameId)
  }, [start, end, duration])

  return <span>{count}</span>
}

export default UseNumberCounter
