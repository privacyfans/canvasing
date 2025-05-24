const plugin = require('tailwindcss/plugin')

const btnGroupStyle = plugin(function ({ addComponents }) {
  addComponents({
    '.btn-group': {
      '@apply flex items-center gap-0': {},
      '.btn': {
        '@apply rounded-none ltr:last:rounded-r-md rtl:last:rounded-l-md ltr:first:rounded-l-md rtl:first:rounded-r-md':
          {},
      },
    },
    '.btn-group-vertical': {
      '@apply flex flex-col items-start': {},
      '.btn': {
        '@apply rounded-none last:rounded-b-md first:rounded-t-md': {},
      },
    },
  })
})

module.exports = btnGroupStyle
