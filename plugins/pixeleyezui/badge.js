const plugin = require('tailwindcss/plugin')

const badgeStyle = plugin(function ({ addComponents }) {
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

  // Define objects to store badge components for different styles
  const badgeComponents = {} // Regular badges
  const badgeOutlineComponents = {} // outline badges
  const badgeSoftComponents = {} // soft badges
  const badgeSolidComponents = {} // solid badges

  // Generate regular badge components for each color
  Object.keys(customColors).forEach((color) => {
    badgeComponents[`.badge-${color}`] = {
      [`@apply bg-${color}-500/10 text-${color}-500 border-${color}-500/20`]:
        {},
    }
  })

  // Generate outline badge components for each color
  Object.keys(customColors).forEach((color) => {
    badgeOutlineComponents[`.badge-outline-${color}`] = {
      [`@apply bg-transparent text-${color}-500 border-${color}-500`]: {},
    }
  })

  // Generate soft badge components for each color
  Object.keys(customColors).forEach((color) => {
    badgeSoftComponents[`.badge-sub-${color}`] = {
      [`@apply bg-${color}-500/20 text-${color}-500 border-${color}-500/0`]: {},
    }
  })

  // Generate solid badge components for each color
  Object.keys(customColors).forEach((color) => {
    badgeSolidComponents[`.badge-solid-${color}`] = {
      [`@apply bg-${color}-500 text-white border-${color}-500`]: {},
    }
  })

  // Add the badge components to the Tailwind CSS configuration
  addComponents({
    '.badge': {
      '@apply inline-block px-1.5 py-0.5 rounded-md text-11 border font-medium':
        {},
    },
    '.badge-square': {
      '@apply inline-flex items-center justify-center w-5.5 h-5.5 rounded-md text-11 border font-medium':
        {},
    },
    // Include generated badge components
    ...badgeComponents,
    ...badgeOutlineComponents,
    ...badgeSoftComponents,
    ...badgeSolidComponents,
  })
})

module.exports = badgeStyle
