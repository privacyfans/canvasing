const plugin = require('tailwindcss/plugin')

const btnNavigationStyle = plugin(function ({ addComponents }) {
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

  const navigationColoredComponents = {}
  const navigationAnimationColoredComponents = {}

  Object.keys(customColors).forEach((color) => {
    navigationColoredComponents[`.navigation-${color}`] = {
      [`@apply hover:text-${color}-500 dark:hover:text-${color}-500 [&.active]:text-${color}-500 dark:[&.active]:text-${color}-500`]:
        {},
    }
  })

  Object.keys(customColors).forEach((color) => {
    navigationAnimationColoredComponents[`.navigation-animation-${color}`] = {
      [`@apply hover:text-${color}-500 dark:hover:text-${color}-500 after:bg-${color}-500 [&.active]:text-${color}-500 dark:[&.active]:text-${color}-500`]:
        {},
    }
  })

  addComponents({
    '.btn-navigation': {
      '@apply inline-flex rounded-md shadow-lg shadow-gray-200 dark:shadow-dark-850 relative':
        {},
      a: {
        '@apply relative inline-block px-4 py-6 transition duration-200 ease-linear grow text-gray-500 dark:text-dark-500':
          {},
      },
      '&.navigation-border': {
        a: {
          '@apply after:w-0 hover:after:w-full after:h-[2px] after:absolute after:transition-all after:duration-200 after:opacity-0 after:bottom-0 hover:after:opacity-100 after:mx-auto after:rounded-full after:inset-x-0 [&.active]:after:w-full [&.active]:after:opacity-100':
            {},
        },
        '&.border-top': {
          a: {
            '@apply after:top-0 after:bottom-auto': {},
          },
        },
      },
    },
    '.animate-navigation': {
      a: {
        '@apply after:size-1.5 after:absolute after:transition-all after:duration-200 after:opacity-0 after:bottom-0 hover:after:bottom-3 hover:after:opacity-100 after:mx-auto after:rounded-full after:inset-x-0 [&.active]:after:bottom-3 [&.active]:after:opacity-100':
          {},
      },
    },
    ...navigationColoredComponents,
    ...navigationAnimationColoredComponents,
  })
})

module.exports = btnNavigationStyle
