const plugin = require('tailwindcss/plugin')

module.exports = plugin(function ({ addComponents }) {
  addComponents({
    '.main-sidebar': {
      '@apply group-data-[layout=semibox]:top-3 group-data-[layout=semibox]:bottom-3 ltr:group-data-[layout=semibox]:left-3 rtl:group-data-[layout=semibox]:right-3':
        {},
      '.navbar-menu': {
        '@apply group-data-[layout=semibox]:h-[calc(100%_-_10rem)]': {},
      },
      '.sidebar-wrapper': {
        '@apply group-data-[layout=semibox]:border group-data-[layout=semibox]:rounded-md':
          {},
      },
    },

    //page wrapper
    '.page-wrapper': {
      '@apply group-data-[content-width=fluid]:px-space group-data-[content-width=fluid]:group-data-[layout=semibox]:px-3 ltr:group-data-[layout=semibox]:ml-0 rtl:group-data-[layout=semibox]:mr-0 group-data-[layout=semibox]:pt-[calc(theme("spacing.topbar")_*_1.3)] ltr:lg:group-data-[layout=semibox]:ml-[calc(var(--spacing-sidebar)_+_theme("spacing.3"))] rtl:lg:group-data-[layout=semibox]:mr-[calc(var(--spacing-sidebar)_+_theme("spacing.3"))]':
        {},
      //sidebar small
      '@apply ltr:group-data-[layout=semibox]:group-data-[sidebar=small]:ml-[calc(theme("spacing.sidebar-small")_+_theme("spacing.3"))] rtl:group-data-[layout=semibox]:group-data-[sidebar=small]:mr-[calc(theme("spacing.sidebar-small")_+_theme("spacing.3"))]':
        {},
      //sidebar medium
      '@apply ltr:group-data-[layout=semibox]:group-data-[sidebar=medium]:ml-[calc(theme("spacing.sidebar-medium")_+_theme("spacing.3"))] rtl:group-data-[layout=semibox]:group-data-[sidebar=medium]:mr-[calc(theme("spacing.sidebar-medium")_+_theme("spacing.3"))]':
        {},
    },

    //topbar
    '.main-topbar': {
      '@apply group-data-[layout=semibox]:top-3 ltr:group-data-[layout=semibox]:left-3 rtl:ltr:group-data-[layout=semibox]:right-3 ltr:lg:group-data-[layout=semibox]:left-[calc(theme("height.sidebar")_+_theme("spacing.3")_+_theme("spacing.3"))] rtl:group-data-[layout=semibox]:right-[calc(theme("height.sidebar")_+_theme("spacing.3")_+_theme("spacing.3"))] ltr:group-data-[layout=semibox]:right-3 rtl:group-data-[layout=semibox]:left-3':
        {},
      //sidebar small
      '@apply ltr:group-data-[layout=semibox]:group-data-[sidebar=small]:left-[calc(theme("height.sidebar-small")_+_theme("spacing.3")_+_theme("spacing.3"))] rtl:group-data-[layout=semibox]:group-data-[sidebar=small]:right-[calc(theme("height.sidebar-small")_+_theme("spacing.3")_+_theme("spacing.3"))]':
        {},
      //sidebar medium
      '@apply ltr:group-data-[layout=semibox]:group-data-[sidebar=medium]:left-[calc(theme("height.sidebar-medium")_+_theme("spacing.3")_+_theme("spacing.3"))] rtl:group-data-[layout=semibox]:group-data-[sidebar=medium]:right-[calc(theme("height.sidebar-medium")_+_theme("spacing.3")_+_theme("spacing.3"))]':
        {},

      '.main-topbar-wrapper': {
        '@apply group-data-[layout=semibox]:border group-data-[layout=semibox]:rounded-md':
          {},
      },
    },

    '.main-footer': {
      '@apply group-data-[content-width=fluid]:mx-space': {},
    },
  })
})
