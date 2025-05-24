const plugin = require('tailwindcss/plugin')

const progressBarStyle = plugin(function ({ addComponents }) {
  addComponents({
    '.progress-bar': {
      '@apply relative w-full h-4 bg-gray-100 dark:bg-dark-800 rounded-full':
        {},

      '&.progress-1': {
        '@apply h-2': {},

        '.progress-bar-wrap': {
          '@apply h-2': {},
        },
      },

      '&.progress-2': {
        '@apply h-2.5': {},

        '.progress-bar-wrap': {
          '@apply h-2.5': {},
        },
      },

      '&.progress-3': {
        '@apply h-3': {},

        '.progress-bar-wrap': {
          '@apply h-3': {},
        },
      },
      '&.progress-4': {
        '@apply h-4': {},

        '.progress-bar-wrap': {
          '@apply h-4': {},
        },
      },
      '&.progress-5': {
        '@apply h-5': {},

        '.progress-bar-wrap': {
          '@apply h-5': {},
        },
      },
      '&.progress-6': {
        '@apply h-6': {},

        '.progress-bar-wrap': {
          '@apply h-6': {},
        },
      },
      '&.progress-7': {
        '@apply h-8': {},

        '.progress-bar-wrap': {
          '@apply h-8': {},
        },
      },
    },
    '.progress-bar-wrap': {
      '@apply h-4 text-xs text-center rounded-full': {},
    },
    '.progress-animate': {
      '@apply absolute inset-0 top-0 h-4 -translate-x-full rounded-sm animate-shimmer bg-white/20':
        {},
    },
  })
})

module.exports = progressBarStyle
