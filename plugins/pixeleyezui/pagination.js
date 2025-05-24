const plugin = require('tailwindcss/plugin')

const paginationStyle = plugin(function ({ addComponents }) {
  //accordion Colors
  addComponents({
    '.pagination': {
      '@apply inline-flex flex-wrap items-center gap-2': {},

      '.pagination-item': {
        '@apply flex items-center justify-center text-sm transition duration-200 ease-linear border rounded-md size-9 border-gray-200 dark:border-dark-800':
          {},
      },
      '.pagination-pre, .pagination-next': {
        '@apply flex items-center justify-center px-3 py-1 text-sm transition duration-200 ease-linear border rounded-md h-9 border-gray-200 dark:border-dark-800 disabled:text-gray-500 dark:disabled:text-dark-500':
          {},
      },

      '&.pagination-md': {
        '.pagination-item': {
          '@apply size-8': {},
        },
      },

      '&.pagination-sm': {
        '.pagination-item': {
          '@apply size-7 text-xs': {},
        },
        '.pagination-pre, .pagination-next': {
          '@apply px-2 py-0.5 text-xs h-7': {},
        },
      },

      '&.pagination-xs': {
        '.pagination-item': {
          '@apply size-6 text-xs': {},
        },
        '.pagination-pre, .pagination-next': {
          '@apply px-2 py-0.5 text-xs h-6': {},
        },
      },

      '&.pagination-lg': {
        '.pagination-item': {
          '@apply size-10 text-15': {},
        },
        '.pagination-pre, .pagination-next': {
          '@apply px-3 py-1 text-15 h-10': {},
        },
      },

      '&.pagination-flush': {
        '.pagination-item': {
          '@apply border-none': {},
        },
        '.pagination-pre, .pagination-next': {
          '@apply border-none': {},
        },
      },
    },
    '.pagination-primary': {
      '.pagination-item': {
        '@apply hover:text-primary-500 [&.active]:bg-primary-500 [&.active]:border-primary-500 [&.active]:text-primary-50':
          {},
      },
      '.pagination-pre, .pagination-next': {
        '@apply hover:text-primary-500 [&.active]:bg-primary-500 [&.active]:border-primary-500 [&.active]:text-primary-50':
          {},
      },
    },
    '.pagination-purple': {
      '.pagination-item': {
        '@apply hover:text-purple-500 [&.active]:bg-purple-500 [&.active]:border-purple-500 [&.active]:text-purple-50':
          {},
      },
      '.pagination-pre, .pagination-next': {
        '@apply hover:text-purple-500 [&.active]:bg-purple-500 [&.active]:border-purple-500 [&.active]:text-purple-50':
          {},
      },
    },
    '.pagination-green': {
      '.pagination-item': {
        '@apply hover:text-green-500 [&.active]:bg-green-500 [&.active]:border-green-500 [&.active]:text-green-50':
          {},
      },
      '.pagination-pre, .pagination-next': {
        '@apply hover:text-green-500 [&.active]:bg-green-500 [&.active]:border-green-500 [&.active]:text-green-50':
          {},
      },
    },
    '.pagination-red': {
      '.pagination-item': {
        '@apply hover:text-red-500 [&.active]:bg-red-500 [&.active]:border-red-500 [&.active]:text-red-50':
          {},
      },
      '.pagination-pre, .pagination-next': {
        '@apply hover:text-red-500 [&.active]:bg-red-500 [&.active]:border-red-500 [&.active]:text-red-50':
          {},
      },
    },
    '.pagination-yellow': {
      '.pagination-item': {
        '@apply hover:text-yellow-500 [&.active]:bg-yellow-500 [&.active]:border-yellow-500 [&.active]:text-yellow-50':
          {},
      },
      '.pagination-pre, .pagination-next': {
        '@apply hover:text-yellow-500 [&.active]:bg-yellow-500 [&.active]:border-yellow-500 [&.active]:text-yellow-50':
          {},
      },
    },
    '.pagination-sky': {
      '.pagination-item': {
        '@apply hover:text-sky-500 [&.active]:bg-sky-500 [&.active]:border-sky-500 [&.active]:text-sky-50':
          {},
      },
      '.pagination-pre, .pagination-next': {
        '@apply hover:text-sky-500 [&.active]:bg-sky-500 [&.active]:border-sky-500 [&.active]:text-sky-50':
          {},
      },
    },
    '.pagination-sky': {
      '.pagination-item': {
        '@apply hover:text-sky-500 [&.active]:bg-sky-500 [&.active]:border-sky-500 [&.active]:text-sky-50':
          {},
      },
      '.pagination-pre, .pagination-next': {
        '@apply hover:text-sky-500 [&.active]:bg-sky-500 [&.active]:border-sky-500 [&.active]:text-sky-50':
          {},
      },
    },
  })
})

module.exports = paginationStyle
