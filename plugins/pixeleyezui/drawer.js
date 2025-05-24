const plugin = require('tailwindcss/plugin')

const drawerStyle = plugin(function ({ addComponents }) {
  // Add the drawer components to the Tailwind CSS configuration
  addComponents({
    '.drawer': {
      '@apply fixed inset-y-0 flex flex-col w-48 transition-transform duration-300 ease-in-out transform bg-white md:w-80 z-[1050] dark:bg-dark-900 dark:text-dark-100':
        {},
    },
    '.drawer-sm': {
      '@apply w-28': {},
    },
    '.drawer-lg': {
      '@apply w-96': {},
    },
    '.drawer-half': {
      '@apply w-1/2': {},
    },
    '.drawer-header': {
      '@apply flex items-center justify-between p-5 border-b card-body border-gray-200 dark:border-dark-800':
        {},
    },
    '.drawer-content': {
      '@apply h-full p-5 overflow-y-auto': {},
    },
    '.drawer-footer': {
      '@apply flex items-center justify-between p-5 border-t border-gray-200 dark:border-dark-800':
        {},
    },
    '.modal': {
      '@apply fixed flex flex-col transition duration-300 ease-in-out overflow-y-auto min-h-screen p-space inset-0 z-[1050] opacity-100':
        {},

      '.modal-top': {
        '@apply transition duration-300 ease-in-out mx-auto': {},
      },

      '.modal-center': {
        '@apply transition duration-300 ease-in-out m-auto': {},
      },

      '.modal-br': {
        '@apply transition duration-300 ease-in-out ltr:ml-auto rtl:mr-auto mt-auto':
          {},
      },

      '.modal-bl': {
        '@apply transition duration-300 ease-in-out ltr:mr-auto rtl:ml-auto mt-auto':
          {},
      },

      '.modal-tl': {
        '@apply transition duration-300 ease-in-out ltr:mr-auto rtl:ml-auto':
          {},
      },

      '.modal-tr': {
        '@apply transition duration-300 ease-in-out ltr:ml-auto rtl:mr-auto':
          {},
      },

      '&.show': {
        '@apply opacity-0 -translate-y-[50px]': {},
      },
    },
    '.modal-header': {
      '@apply flex items-center justify-between p-5 border-b border-gray-200 dark:border-dark-800':
        {},
    },

    '.modal-content': {
      '@apply p-5': {},
    },

    '.modal-footer': {
      '@apply flex items-center justify-between p-5 mt-auto border-t border-gray-200 dark:border-dark-800':
        {},
    },
    '.modal-wrap': {
      '@apply md:!w-[30rem] w-full bg-white shadow-lg shadow-gray-200/30 rounded-md flex flex-col relative z-[1099] dark:bg-dark-900 dark:shadow-dark-900 dark:text-dark-100':
        {},

      '&.modal-xs': {
        '@apply md:!w-[20rem] w-full': {},
      },
      '&.modal-sm': {
        '@apply md:!w-[26rem] w-full': {},
      },
      '&.modal-lg': {
        '@apply lg:!w-[40rem] w-full': {},
      },
      '&.modal-xl': {
        '@apply lg:!w-[52rem] w-full': {},
      },
      '&.modal-2xl': {
        '@apply xl:!w-[64rem] w-full': {},
      },
    },
    '.backdrop-overlay': {
      '@apply fixed inset-0 bg-gray-900/40 z-[1049] dark:bg-dark-950/80': {},
    },
  })
})

module.exports = drawerStyle
