const plugin = require('tailwindcss/plugin')

const spinLoaderStyle = plugin(function ({ addComponents }) {
  var colors = require('tailwindcss/colors')

  const customColors = {
    ...colors,
    primary: {
      50: 'var(--color-primary-50)',
      100: 'var(--color-primary-100)',
      200: 'var(--color-primary-200)',
      300: 'var(--color-primary-300)',
      400: 'var(--color-primary-400)',
      500: 'var(--color-primary-500)',
      600: 'var(--color-primary-600)',
      700: 'var(--color-primary-700)',
      800: 'var(--color-primary-800)',
      900: 'var(--color-primary-900)',
      950: 'var(--color-primary-950)',
    },
  }

  // Define objects to store loader components for different styles
  const sipnComponents = {} // Regular loader
  const sipnPlusComponents = {} // Plus loader

  // Generate loader components for each color
  Object.keys(customColors).forEach((color) => {
    sipnComponents[`.loader-${color}`] = {
      [`@apply border-${color}-500`]: {},
    }
  })

  // Generate loader components for each color
  Object.keys(customColors).forEach((color) => {
    sipnPlusComponents[`.pulse-${color}`] = {
      [`@apply bg-${color}-500 border-none`]: {},
    }
  })

  // Add the loader components to the Tailwind CSS configuration
  addComponents({
    '.spin': {
      '@apply inline-block border-2 rounded-full size-8': {},
    },
    '.loader-spin': {
      '@apply ltr:!border-l-transparent rtl:!border-r-transparent animate-spin':
        {},
    },
    '.modern-spin': {
      '@apply animate-spin !border-x-transparent': {},
    },
    '.ping-spin': {
      '@apply size-4 animate-ping': {},
    },
    // Include generated loader components
    ...sipnComponents,
    ...sipnPlusComponents,
  })
})

module.exports = spinLoaderStyle
