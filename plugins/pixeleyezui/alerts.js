const plugin = require('tailwindcss/plugin')
const colors = require('tailwindcss/colors')

const alertsStyle = plugin(function ({ addComponents, theme }) {
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
  const alertsComponents = {} // Regular badges
  const alertsSoftComponents = {} // soft badges
  const alertsOutlineComponents = {} // outline badges
  const alertsSolidComponents = {} // solid badges

  // Generate regular alerts components for each color
  Object.keys(customColors).forEach((color) => {
    alertsComponents[`.alert-${color}`] = {
      [`@apply bg-${color}-100 dark:bg-${color}-500/20 text-${color}-500 border-${color}-200 dark:border-${color}-500/30`]:
        {},
    }
  })

  // Generate soft alerts components for each color
  Object.keys(customColors).forEach((color) => {
    alertsSoftComponents[`.alert-sub-${color}`] = {
      [`@apply bg-${color}-100 text-${color}-500 border-${color}-100 dark:bg-${color}-500/20 dark:border-${color}-500/0`]:
        {},
    }
  })

  // Generate outline alerts components for each color
  Object.keys(customColors).forEach((color) => {
    alertsOutlineComponents[`.alert-outline-${color}`] = {
      [`@apply bg-transparent text-${color}-500 border-${color}-500`]: {},
    }
  })

  // Generate solid alerts components for each color
  Object.keys(customColors).forEach((color) => {
    alertsSolidComponents[`.alert-solid-${color}`] = {
      [`@apply text-white bg-${color}-500 border-${color}-500`]: {},
    }
  })

  // Add the badge components to the Tailwind CSS configuration
  addComponents({
    '.alert': {
      '@apply px-5 py-3 ltr:pr-10 rtl:pl-10 text-sm border rounded-md relative':
        {},
      '.btn-close': {
        '@apply absolute text-lg ltr:right-5 rtl:left-5 top-2 transition duration-200 ease-linear':
          {},
      },
      '&.alert-icon': {
        '@apply relative ltr:pr-10 rtl:pl-10 ltr:pl-16 rtl:pr-16': {},
        '.icon': {
          '@apply absolute inset-y-0 flex items-center justify-center ltr:left-0 rtl:right-0 rtl:border-l ltr:border-r w-11':
            {},
        },
      },
      '&.alert-border': {
        '@apply sm:flex gap-3 p-5 relative bg-white !border-t-4 dark:bg-dark-900':
          {},
      },
      '&.alert-gray': {
        '@apply dark:border-dark-800 dark:bg-dark-850': {},
      },
    },
    // Include generated badge components
    ...alertsComponents,
    ...alertsSoftComponents,
    ...alertsOutlineComponents,
    ...alertsSolidComponents,
  })
})

module.exports = alertsStyle
