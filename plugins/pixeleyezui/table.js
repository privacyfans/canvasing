const plugin = require('tailwindcss/plugin')

const tableStyle = plugin(function ({ addBase }) {
  // Add the links components to the Tailwind CSS configuration
  addBase({
    '.table': {
      '@apply w-full align-middle border-collapse': {},
      tr: {
        td: {
          '@apply border-b px-3 py-3.5 border-gray-200 dark:border-dark-800':
            {},
        },
        th: {
          '@apply border-b px-3 py-3.5 border-gray-200 font-semibold text-start dark:border-dark-800':
            {},
        },
      },

      '&.bordered': {
        tr: {
          'td, th': {
            '@apply border border-gray-200 dark:border-dark-800': {},
          },
        },
      },

      '&.table-sm': {
        tr: {
          'td, th': {
            '@apply py-1.5 px-2': {},
          },
        },
      },

      '&.flush': {
        tr: {
          td: {
            '@apply border-0': {},
          },
        },
      },

      '&.hovered': {
        tr: {
          '@apply hover:!bg-gray-200/50 dark:hover:!bg-dark-850 transition ease-linear duration-200':
            {},
        },
      },

      '&.even-striped': {
        tr: {
          '@apply odd:bg-white even:bg-gray-100 dark:odd:bg-dark-900 dark:even:bg-dark-850':
            {},
        },
      },
      '&.odd-striped': {
        tr: {
          '@apply even:bg-white odd:bg-gray-100 dark:even:bg-dark-900 dark:odd:bg-dark-850':
            {},
        },
      },
    },
    '.table-box': {
      '@apply -mx-5': {},
      'td, th': {
        '@apply first:!pl-5 last:!pr-5': {},
      },

      '.table-sm': {
        'td, th': {
          '@apply first:!pl-5 last:!pr-5': {},
        },
      },
    },
    '.dtr-details': {
      '@apply divide-y divide-gray-200 dark:divide-dark-800 *:py-2.5': {},
      '.dtr-title': {
        '@apply font-medium': {},
      },
    },
    '.dt-length': {
      '@apply capitalize': {},
    },
  })
})

module.exports = tableStyle
