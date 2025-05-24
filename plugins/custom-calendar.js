const plugin = require('tailwindcss/plugin')

module.exports = plugin(function ({ addComponents }) {
  addComponents({
    '.active-date': {
      '@apply bg-primary-500 text-primary-50 border-primary-500': {},
      p: {
        '@apply text-primary-200': {},
      },
    },
    '.flatpickr-monthDropdown-months': {
      '@apply bg-white dark:bg-dark-900': {},
    },
  })
})
