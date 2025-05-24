const plugin = require('tailwindcss/plugin')

module.exports = plugin(function ({ addComponents }) {
  addComponents({
    '.page-wrapper': {
      '@apply ltr:group-data-[layout=horizontal]:ml-0 rtl:group-data-[layout=horizontal]:mr-0 group-data-[layout=horizontal]:lg:pt-[calc(theme("spacing.topbar")_*_1.9)] group-data-[layout=horizontal]:pt-[calc(theme("spacing.topbar")_*_1.2)]':
        {},
    },
    '.main-footer': {
      '@apply ltr:group-data-[layout=horizontal]:left-0 rtl:group-data-[layout=horizontal]:right-0':
        {},
    },
    '.main-sidebar': {
      '@apply group-data-[layout=horizontal]:ltr:right-0 group-data-[layout=horizontal]:rtl:left-0 group-data-[layout=horizontal]:top-topbar group-data-[layout=horizontal]:bottom-auto group-data-[layout=horizontal]:w-full':
        {},

      '.sidebar-wrapper': {
        '@apply group-data-[layout=horizontal]:border-b': {},
      },

      '.navbar-brand': {
        '@apply group-data-[layout=horizontal]:hidden': {},
      },

      '.nav-link': {
        '@apply group-data-[layout=horizontal]:p-3 group-data-[layout=horizontal]:md:p-4 group-data-[layout=horizontal]:before:hidden':
          {},
      },

      '.navbar-menu': {
        '@apply group-data-[layout=horizontal]:h-64 group-data-[layout=horizontal]:md:h-auto':
          {},
      },

      '.dropdown-menu': {
        '@apply group-data-[layout=horizontal]:static group-data-[layout=horizontal]:md:py-2 group-data-[layout=horizontal]:py-0 group-data-[layout=horizontal]:md:fixed group-data-[layout=horizontal]:bg-white dark:group-data-[layout=horizontal]:bg-dark-850 group-data-[layout=horizontal]:md:shadow-sm group-data-[layout=horizontal]:md:w-40':
          {},

        '.dropdown-wrapper': {
          '@apply ltr:group-data-[layout=horizontal]:md:ml-0 rtl:group-data-[layout=horizontal]:md:mr-0 group-data-[layout=horizontal]:md:max-h-[calc(100vh_-_10rem)] group-data-[layout=horizontal]:overflow-y-auto':
            {},
        },

        '&.mega-menu': {
          '@apply group-data-[layout=horizontal]:md:w-96': {},
        },

        li: {
          'a, button': {
            '@apply group-data-[layout=horizontal]:before:hidden group-data-[layout=horizontal]:py-2':
              {},
          },
        },
        '.nav-link': {
          '@apply group-data-[layout=horizontal]:before:hidden': {},
        },
      },
    },
    '.main-topbar': {
      '@apply group-data-[layout=horizontal]:z-[1005]': {},
    },
  })
})
