const plugin = require('tailwindcss/plugin')

module.exports = plugin(function ({ addComponents }) {
  addComponents({
    '.page-wrapper': {
      '@apply pb-14 ltr:ml-0 rtl:mr-0 ltr:lg:ml-sidebar rtl:lg:mr-sidebar px-5 xl:px-28 pt-[calc(theme("spacing.topbar")_*_1.2)] group-data-[layout=horizontal]:pt-[calc(theme("spacing.topbar")_*_1.9)]':
        {},
      //print
      '@apply ltr:print:ml-0 rtl:print:mr-0 print:p-0': {},
      '@apply lg:ltr:group-data-[sidebar=small]:ml-sidebar-small lg:rtl:group-data-[sidebar=small]:mr-sidebar-small':
        {},
      //sidebar-medium
      '@apply lg:ltr:group-data-[sidebar=medium]:ml-sidebar-medium lg:rtl:group-data-[sidebar=medium]:mr-sidebar-medium lg:ltr:group-data-[sidebar=small]:ml-sidebar-small lg:rtl:group-data-[sidebar=small]:mr-sidebar-small':
        {},
    },
  })
})
