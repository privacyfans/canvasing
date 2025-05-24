const plugin = require('tailwindcss/plugin')

const navStyle = plugin(function ({ addComponents }) {
  // Add the loader components to the Tailwind CSS configuration
  addComponents({
    '.tabs': {
      '@apply flex items-center flex-wrap': {},
      '.nav-item': {
        '@apply relative block px-4 text-center py-2 font-medium after:absolute after:h-[1px] transition duration-200 ease-linear after:w-0 hover:after:w-full after:transition-all after:duration-200 after:opacity-0 after:bottom-0 hover:after:opacity-100 after:mx-auto after:bg-primary-500 after:rounded-full after:inset-x-0':
          {},
      },
    },
    '.tabs-pills': {
      '@apply flex items-center flex-wrap': {},
      '.nav-item': {
        '@apply relative block px-4 py-2 font-medium text-center transition duration-200 ease-linear rounded-md':
          {},
      },
      '&.tabs-icon': {
        '.nav-item': {
          '@apply p-0 size-10 flex items-center justify-center': {},
        },
      },
    },
    '.tabs-animation': {
      '@apply flex items-center flex-wrap': {},
      '.nav-item': {
        '@apply relative block overflow-hidden font-medium text-center transition duration-200 ease-linear rounded-md h-11':
          {},
        '.icon': {
          '@apply inline-block mx-auto transition duration-200 ease-linear translate-y-2.5 size-4':
            {},
        },
        '.content': {
          '@apply invisible block align-middle transition duration-200 ease-linear -translate-y-10':
            {},
        },
      },
      '&.ng-animation': {
        '.nav-item': {
          '.icon': {
            '@apply translate-y-0 size-[auto]': {},
            svg: {
              '@apply inline-block mx-auto transition duration-200 ease-linear translate-y-2.5 size-4':
                {},
            },
          },
          '&:hover': {
            '.icon': {
              svg: {
                '@apply translate-y-11': {},
              },
            },
          },
        },
      },
    },
  })
})

module.exports = navStyle
