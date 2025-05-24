'use client'

import { useEffect, useMemo, useState } from 'react'

import { getColorCodes } from '@src/components/Common/ColorCodes'
import { useSelector } from 'react-redux'

const useChartColors = ({
  chartColors: datasetChartColors,
  chartDarkColors: datasetChartDarkColors,
}) => {
  const [chartColors, setChartColors] = useState([])
  const { layoutDataColor, layoutMode } = useSelector((state) => state.Layout)

  // Memoize the dataset to avoid unnecessary re-renders
  const stableDataset = useMemo(
    () => ({
      chartColors: datasetChartColors,
      chartDarkColors: datasetChartDarkColors,
    }),
    [datasetChartColors, datasetChartDarkColors]
  )

  useEffect(() => {
    const colors = getColorCodes(stableDataset)
    setChartColors(colors)
  }, [layoutDataColor, stableDataset, layoutMode])

  return chartColors
}

export default useChartColors
