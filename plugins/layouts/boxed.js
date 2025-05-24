const plugin = require('tailwindcss/plugin')

module.exports = plugin(function ({ addComponents }) {
  addComponents({
    '.page-wrapper': {
      '@apply group-data-[layout=boxed]:bg-white group-data-[layout=boxed]:min-h-screen group-data-[layout=boxed]:dark:bg-dark-950 ltr:group-data-[layout=boxed]:rounded-r-md rtl:group-data-[layout=boxed]:rounded-l-md':
        {},
    },
    '.main-sidebar': {
      '@apply ltr:group-data-[layout=boxed]:left-8 rtl:group-data-[layout=boxed]:right-8 ltr:group-data-[layout=boxed]:rounded-bl-md rtl:group-data-[layout=boxed]:rounded-br-md':
        {},

      '.navbar-brand': {
        '@apply group-data-[layout=boxed]:hidden': {},
      },
    },
    '.main-topbar': {
      '@apply group-data-[layout=boxed]:inset-x-8 group-data-[layout=boxed]:top-8 group-data-[layout=boxed]:rounded-t-md':
        {},
    },
  })
})
