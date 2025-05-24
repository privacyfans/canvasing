const plugin = require('tailwindcss/plugin')

module.exports = plugin(function ({ addComponents, theme }) {
  var colors = require('tailwindcss/colors')
  const dmColors = {
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
  let customColors = []
  for (var key in colors) {
    customColors.push(key)
  }
  for (var key in dmColors) {
    customColors.push(key)
  }
  // Define the spin components object
  const spinBasicComponents = {}
  const spinSolidComponents = {}

  // Loop through each scroll color and generate the corresponding CSS
  customColors.forEach((color) => {
    const className = `.input-spin-${color} :is(.input-spin-minus, .input-spin-plus):hover`
    const solidClassName = `.input-spin-solid-${color} :is(.input-spin-minus, .input-spin-plus)`
    const colorValue = theme(`colors.${color}.500`, color)
    const textColorValue = theme(`colors.${color}.50`, color)

    spinBasicComponents[className] = {
      color: colorValue,
    }

    spinSolidComponents[solidClassName] = {
      backgroundColor: colorValue,
      borderColor: colorValue,
      color: textColorValue,
    }
  })

  // Add the input spin components to the Tailwind CSS
  addComponents({
    '.input-spin-group': {
      '@apply flex items-center w-32 text-center': {},

      '.input-spin-minus': {
        '@apply flex items-center justify-center transition duration-200 ease-linear border border-gray-200 ltr:border-r-0 rtl:border-l-0 ltr:rounded-l-md rtl:rounded-r-md size-10 shrink-0':
          {},
        /*-----dark mode-----*/
        '@apply dark:border-dark-800': {},
      },
      '.input-spin-plus': {
        '@apply flex items-center justify-center transition duration-200 ease-linear border border-gray-200 ltr:border-l-0 rtl:border-r-0 ltr:rounded-r-md rtl:rounded-l-md size-10 shrink-0':
          {},
        /*-----dark mode-----*/
        '@apply dark:border-dark-800': {},
      },
      '.input-spin': {
        '@apply p-0 text-center rounded-none focus:border-gray-200 dark:focus:border-dark-800':
          {},
      },
    },
    ...spinBasicComponents,
    ...spinSolidComponents,
  })
})
