const plugin = require('tailwindcss/plugin')

const breadcrumbStyle = plugin(function ({ addComponents }) {
  addComponents({
    '.breadcrumb': {
      '@apply flex items-center shrink-0 *:font-medium ltr:*:pr-6 rtl:*:pl-6 *:relative *:before:font-remix *:before:absolute ltr:*:before:right-1 rtl:*:before:left-1 *:before:text-gray-500 dark:*:before:text-dark-500 mb-3':
        {},
      '.breadcrumb-item': {
        '@apply ltr:last:pr-0 rtl:last:pl-0 ltr:last:before:hidden': {},
        a: {
          '@apply text-gray-500 dark:text-dark-500': {},
        },
        '&.active': {
          '@apply text-gray-800 dark:text-dark-50': {},
        },
      },
    },
  })
})

module.exports = breadcrumbStyle
