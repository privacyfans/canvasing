const plugin = require('tailwindcss/plugin')

const timelineStyle = plugin(function ({ addComponents }) {
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

  Object.keys(customColors).forEach((color) => {
    accordionComponents[`.timeline-${color}`] = {
      [`@apply [&.active]:before:!bg-${color}-500 [&.active]:after:!bg-${color}-500`]:
        {},
    }
  })

  addComponents({
    '.timeline': {
      '@apply *:before:absolute *:before:w-0.5 *:before:bg-gray-200 dark:*:before:bg-dark-800 *:before:top-2 *:before:-bottom-2 *:relative rtl:*:before:right-0.5  ltr:*:before:left-0.5 flex flex-col *:pb-3 ltr:*:pl-5 rtl:*:pr-5 *:after:absolute *:after:size-1.5 *:after:bg-gray-300 dark:*:after:bg-gray-800 ltr:*:after:left-0 rtl:*:after:right-0 *:after:top-2 *:after:rounded-full':
        {},
      li: {
        '@apply last:before:hidden last:pb-0': {},
      },
      '&.timeline-square': {
        '@apply *:after:rounded-xs': {},
      },
    },
    ...accordionComponents,
  })
})

module.exports = timelineStyle
