const plugin = require('tailwindcss/plugin')

const dropdownStyle = plugin(function ({ addComponents }) {
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

  const dropdownColoredComponents = {}

  Object.keys(customColors).forEach((color) => {
    dropdownColoredComponents[`.dropdown-${color}`] = {
      [`@apply hover:!bg-${color}-500/10 hover:!text-${color}-500 disabled:!text-${color}-500`]:
        {},
    }
  })

  // Add the dropdown components to the Tailwind CSS configuration
  addComponents({
    '.dropdown': {
      '@apply relative inline-block': {},
      '.dropdown-menu': {
        '@apply absolute z-10 w-40 bg-white rounded-md shadow-md dark:bg-dark-900 shadow-gray-200 dark:shadow-dark-800':
          {},
        '.dropdown-item': {
          '@apply flex items-center gap-2 w-full transition duration-300 ease-linear first-of-type:rounded-t-md last-of-type:rounded-b-md px-4 py-2.5 text-sm hover:bg-gray-50 hover:text-primary-500 disabled:text-gray-500 dark:hover:bg-dark-850 dark:disabled:text-dark-500':
            {},
        },

        '&.dropdown-right': {
          '@apply ltr:right-0 rtl:left-0 ltr:left-auto rtl:right-auto': {},
        },
        '&.dropdown-top': {
          '@apply bottom-full': {},
        },
        '&.dropdown-top-right': {
          '@apply lg:top-0 ltr:lg:left-full rtl:lg:right-full': {},
        },
        '&.dropdown-top-left': {
          '@apply lg:top-0 lg:ltr:right-full lg:rtl:left-full lg:ltr:left-auto lg:rtl:right-auto':
            {},
        },
      },
    },
    ...dropdownColoredComponents,
  })
})

module.exports = dropdownStyle
