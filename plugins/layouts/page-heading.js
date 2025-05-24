const plugin = require('tailwindcss/plugin')

module.exports = plugin(function ({ addComponents }) {
  addComponents({
    '.page-heading': {
      '@apply flex items-center mb-3 print:hidden': {},
      '.breadcrumb': {
        '@apply mb-0': {},
        '.breadcrumb-item': {
          '@apply group-data-[nav-type=pattern]:before:text-white/50': {},
          a: {
            '@apply group-data-[nav-type=pattern]:text-white/50': {},
          },
          '&.active': {
            '@apply group-data-[nav-type=pattern]:text-white': {},
          },
        },
      },
    },
  })
})
