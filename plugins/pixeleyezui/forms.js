const plugin = require('tailwindcss/plugin')

const formsStyle = plugin(function ({ addComponents }) {
  var colors = require('tailwindcss/colors')

  const customColors = {
    ...colors,
    primary: {
      50: 'var(--color-primary-50)',
      100: 'var(--color-primary-100)',
      200: 'var(--color-primary-200)',
      300: 'var(--color-primary-300)',
      400: 'var(--color-primary-400)',
      500: 'var(--color-primary-500)',
      600: 'var(--color-primary-600)',
      700: 'var(--color-primary-700)',
      800: 'var(--color-primary-800)',
      900: 'var(--color-primary-900)',
      950: 'var(--color-primary-950)',
    },
  }

  const checkboxBasicComponents = {}
  const checkboxSoftComponents = {}
  const radioBasicComponents = {}
  const radioSoftComponents = {}
  const switchColoredComponents = {}

  Object.keys(customColors).forEach((color) => {
    checkboxBasicComponents[`.input-check-${color}`] = {
      [`@apply checked:bg-${color}-500 checked:!border-${color}-500 focus:checked:bg-${color}-500`]:
        {},
    }
  })

  Object.keys(customColors).forEach((color) => {
    checkboxSoftComponents[`.input-check-soft-${color}`] = {
      [`@apply bg-${color}-500/15 !border-${color}-500/20 dark:!border-${color}-500/20 checked:!bg-${color}-500 checked:!border-${color}-500 focus:checked:bg-${color}-500`]:
        {},
    }
  })

  Object.keys(customColors).forEach((color) => {
    radioBasicComponents[`.input-radio-${color}`] = {
      [`@apply checked:hover:bg-${color}-500 checked:bg-${color}-500 checked:!border-${color}-500 focus:checked:bg-${color}-500 focus:checked:ring-${color}-500`]:
        {},
    }
  })

  Object.keys(customColors).forEach((color) => {
    radioSoftComponents[`.input-radio-soft-${color}`] = {
      [`@apply bg-${color}-500/15 !border-${color}-500/20 dark:!border-${color}-500/20 checked:hover:bg-${color}-500 checked:bg-${color}-500 checked:!border-${color}-500 focus:checked:bg-${color}-500 focus:checked:ring-${color}-500`]:
        {},
    }
  })

  Object.keys(customColors).forEach((color) => {
    switchColoredComponents[`.switch-${color}`] = {
      [`@apply peer-checked:!bg-${color}-500`]: {},
    }
  })

  // Add the forms components to the Tailwind CSS configuration
  addComponents({
    '.form-input': {
      '@apply border rounded-md block text-base h-10 py-[0.5625rem] px-4 w-full border-gray-200 bg-white focus:outline-0 focus:shadow-none focus:ring-0 focus:border-primary-500 placeholder:text-gray-400 disabled:text-gray-500 disabled:cursor-none disabled:bg-gray-100 disabled:border-gray-200':
        {},
      /*-----dark mode-----*/
      '@apply dark:bg-dark-900 dark:border-dark-800 dark:focus:border-primary-500 dark:disabled:border-dark-800 dark:disabled:bg-dark-850 dark:placeholder:text-dark-500 dark:disabled:text-dark-500':
        {},

      '&.input-sm': {
        '@apply py-1 px-2 text-xs h-[1.625rem]': {},
      },

      '&.input-md': {
        '@apply py-1.5 px-3 text-sm h-[2.125rem]': {},
      },
      '&.input-lg': {
        '@apply py-2.5 px-5 text-base h-[2.7813rem]': {},
      },
    },
    '.form-label': {
      '@apply block mb-2 text-sm font-medium': {},
    },
    '.input-label-group': {
      '@apply flex items-center justify-center px-4 py-1.5 font-medium border border-gray-200 ltr:border-r-0 rtl:border-l-0 rounded-md ltr:rounded-r-none rtl:rounded-l-none ltr:group-[&.right]:border-l-0 rtl:group-[&.right]:border-r-0 ltr:group-[&.right]:border-r rtl:group-[&.right]:border-l ltr:group-[&.right]:rounded-l-none rtl:group-[&.right]:rounded-r-none ltr:group-[&.right]:rounded-r-md rtl:group-[&.right]:rounded-l-md':
        {},
      /*-----dark mode-----*/
      '@apply dark:border-dark-800': {},
    },
    '.form-select': {
      '@apply border rounded-md border-gray-200 block py-[0.5625rem] h-10 ltr:pl-3 rtl:pr-3 ltr:pr-10 rtl:pl-10 px-4 text-base w-full bg-no-repeat appearance-none focus:outline-0 focus:shadow-none focus:ring-0':
        {},
      backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3e%3cpath fill='none' stroke='%231f242e' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='m2 5 6 6 6-6'/%3e%3c/svg%3e")`,
      backgroundPosition: 'right 0.70rem center',
      backgroundRepeat: 'no-repeat',
      backgroundSize: '0.70em 0.70em',
      /*-----dark mode-----*/
      '@apply dark:border-dark-800 dark:bg-dark-900': {},
    },
    ':is(.input-check-group, .input-radio-group)': {
      '@apply flex items-center gap-2': {},
    },
    '.input-check': {
      '@apply border border-gray-300 dark:border-dark-800 rounded-xs appearance-none cursor-pointer size-[1.125rem]':
        {},
    },
    ':is(.input-check-label, .input-radio-label)': {
      '@apply cursor-pointer leading-none': {},
    },
    '.input-radio': {
      '@apply size-[1.125rem] border-gray-300 dark:border-dark-800 appearance-none border rounded-full cursor-pointer focus:checked:ring-1 focus:checked:ring-offset-1 focus:checked:ring-offset-white dark:focus:checked:ring-offset-dark-900':
        {},
    },
    ...checkboxBasicComponents,
    ...checkboxSoftComponents,
    ...radioBasicComponents,
    ...radioSoftComponents,
    //range input element
    '.input-range': {
      '@apply w-full h-2 rounded-md appearance-none bg-gray-200 dark:bg-dark-800':
        {},
    },
    // file upload elements
    '.form-file': {
      '@apply border rounded-md block text-base w-full focus:outline-0 border-gray-200 dark:border-dark-800 focus:shadow-none focus:ring-0 file:bg-gray-900 dark:file:bg-dark-800 file:text-gray-100 dark:file:text-dark-100':
        {},
      '&::-webkit-file-upload-button': {
        '@apply py-2 px-4 cursor-pointer border-none shadow-none outline-hidden':
          {},
      },
      '&.form-file-sm': {
        '@apply text-xs': {},
        '&::-webkit-file-upload-button': {
          '@apply py-1 px-3 text-xs': {},
        },
      },

      '&.form-file-md': {
        '@apply text-xs': {},
        '&::-webkit-file-upload-button': {
          '@apply py-1.5 px-3 text-14': {},
        },
      },

      '&.form-file-light': {
        '@apply file:bg-gray-100 file:text-gray-500 dark:file:text-dark-400 dark:file:bg-dark-850':
          {},
      },
      '&.form-file-lg': {
        '&::-webkit-file-upload-button': {
          '@apply py-3 px-5': {},
        },
      },
    },
    //switches
    '.switch-group': {
      '@apply flex items-center cursor-pointer select-none': {},

      '.switch-wrapper': {
        '@apply block w-12 border border-gray-200 rounded-full h-7 dark:border-dark-800':
          {},
      },
      '.switch-dot': {
        '@apply absolute transition bg-gray-200 rounded-full dark:bg-dark-800 size-5 ltr:left-1 rtl:right-1 top-1':
          {},
      },
      '&.switch-soft': {
        '.switch-wrapper': {
          '@apply border-0 bg-gray-200 dark:bg-dark-800': {},
        },
        '.switch-dot': {
          '@apply bg-white dark:bg-dark-900': {},
        },
      },
      '&.switch-text': {
        '.switch-dot': {
          '@apply flex items-center justify-center text-xs after:content-["N"] after:font-semibold peer-checked:after:content-["Y"]':
            {},
        },
      },
      '&.switch-3d': {
        '.switch-wrapper': {
          '@apply shadow-inner shadow-gray-300 dark:shadow-dark-850': {},
        },
        '.switch-dot': {
          '@apply shadow-lg shadow-gray-400 bg-white dark:bg-dark-800 dark:shadow-dark-850':
            {},
        },
      },
    },
    ...switchColoredComponents,
  })
})

module.exports = formsStyle
