const plugin = require('tailwindcss/plugin')

const accordionStyle = plugin(function ({ addComponents }) {
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

  //accordion Colors
  const accordionComponents = {}
  const accordionSolidComponents = {}

  Object.keys(customColors).forEach((color) => {
    accordionComponents[`.accordion-${color}`] = {
      [`@apply [&.active]:bg-${color}-500/10 [&.active]:text-${color}-500 [&.active]:border-${color}-500/20`]:
        {},
    }
  })

  Object.keys(customColors).forEach((color) => {
    accordionSolidComponents[`.accordion-solid-${color}`] = {
      [`@apply [&.active]:bg-${color}-500 [&.active]:text-${color}-50 [&.active]:border-${color}-500`]:
        {},
    }
  })

  addComponents({
    '.accordion': {
      '@apply relative border-b border-gray-200 dark:border-dark-800': {},
      '.accordion-button': {
        '@apply block w-full px-3 py-2.5 font-medium transition ease-linear duration-200':
          {},
      },
    },
    '.arrow-icon': {
      '@apply text-gray-500 dark:text-dark-500 [&.active]:text-current dark:text-current':
        {},
    },
    '.accordion-main-content': {
      '@apply relative overflow-hidden transition-all duration-700 max-h-0': {},
      '.content': {
        '@apply px-3 py-2.5': {},
      },
    },
    '.accordion-boxed': {
      '@apply relative': {},
      '.accordion-button': {
        '@apply block w-full px-3 py-2.5 font-medium transition ease-linear duration-200 border rounded-md border-gray-200 dark:border-dark-800':
          {},
      },
    },
    ...accordionComponents,
    ...accordionSolidComponents,
  })
})

module.exports = accordionStyle
