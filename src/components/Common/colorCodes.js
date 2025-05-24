export function extractOklchValues(oklchString) {
  const matches = oklchString.match(
    /oklch\(([0-9.]+)\s+([0-9.]+)\s+([0-9.]+)\)/
  )
  if (matches && matches.length === 4) {
    return {
      l: parseFloat(matches[1]),
      c: parseFloat(matches[2]),
      h: parseFloat(matches[3]),
    }
  }
  return null
}

// Convert OKLCH values to HEX
export function oklchToHex(l, c, h) {
  const hRadians = (h * Math.PI) / 180
  const a = c * Math.cos(hRadians)
  const b = c * Math.sin(hRadians)

  const l_ = l + 0.3963377774 * a + 0.2158037573 * b
  const m_ = l - 0.1055613458 * a - 0.0638541728 * b
  const s_ = l - 0.0894841775 * a - 1.291485548 * b

  const l_cubed = l_ ** 3
  const m_cubed = m_ ** 3
  const s_cubed = s_ ** 3

  const r =
    +4.0767416621 * l_cubed - 3.3077115913 * m_cubed + 0.2309699292 * s_cubed
  const g =
    -1.2684380046 * l_cubed + 2.6097574011 * m_cubed - 0.3413193965 * s_cubed
  const ba =
    -0.0041960863 * l_cubed - 0.7034186147 * m_cubed + 1.707614701 * s_cubed

  const toGamma = (x) => {
    if (x <= 0) return 0
    if (x >= 1) return 1
    return x <= 0.0031308 ? 12.92 * x : 1.055 * x ** (1 / 2.4) - 0.055
  }

  const r_gamma = Math.round(toGamma(r) * 255)
  const g_gamma = Math.round(toGamma(g) * 255)
  const b_gamma = Math.round(toGamma(ba) * 255)

  return (
    '#' +
    r_gamma.toString(16).padStart(2, '0') +
    g_gamma.toString(16).padStart(2, '0') +
    b_gamma.toString(16).padStart(2, '0')
  )
}

// Main function to extract color codes from class names
export function getColorCodes(dataset) {
  if (typeof window === 'undefined') return []

  const chartCommonColors =
    document.documentElement.getAttribute('data-mode') === 'light'
      ? dataset.chartColors
      : dataset.chartDarkColors
        ? dataset.chartDarkColors
        : dataset.chartColors

  const classNames = chartCommonColors
    .replace(/^\[|\]$/g, '')
    .split(',')
    .map((c) => c.trim())
  const hashColorCodes = []

  classNames.forEach((className) => {
    if (!className) return

    let backgroundColor = ''
    const element = document.querySelector(className)

    if (element) {
      backgroundColor = window.getComputedStyle(element).backgroundColor
    } else {
      const temp = document.createElement('div')
      temp.className = className
      temp.style.visibility = 'hidden'
      document.body.appendChild(temp)
      backgroundColor = window.getComputedStyle(temp).backgroundColor
      document.body.removeChild(temp)
    }

    try {
      const oklch = extractOklchValues(backgroundColor)
      const hexColor = oklch
        ? oklchToHex(oklch.l, oklch.c, oklch.h)
        : backgroundColor
      hashColorCodes.push(hexColor)
    } catch (err) {
      console.warn('Error converting color:', err)
      hashColorCodes.push(backgroundColor)
    }
  })

  return hashColorCodes
}
