const plugin = require('tailwindcss/plugin')

module.exports = plugin(function ({ addComponents }) {
  addComponents({
    '.landing-navbar': {
      '@apply h-20 fixed inset-x-0 flex items-center transition ease-linear duration-500 z-50':
        {},
      '.navbar-collapase': {
        '@apply absolute inset-x-0 top-20 xl:relative xl:top-auto bg-white xl:bg-transparent dark:xl:bg-transparent dark:bg-dark-850 p-5 shadow-lg shadow-gray-200 dark:shadow-dark-800 xl:shadow-none':
          {},
      },
    },
    '.fc-timeline-events': {
      '.fc-timeline-event': {
        '@apply py-2 px-5': {},
      },
    },
  })
})
