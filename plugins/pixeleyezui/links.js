const plugin = require('tailwindcss/plugin')

const linksStyle = plugin(function ({ addComponents }) {
  // const colors = Object.keys(theme('colors'));
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

  // Define objects to store links components for different styles
  const linkComponents = {} // Regular links
  const linkUnderlineComponents = {} // underline links

  // Generate links components for each color
  Object.keys(customColors).forEach((color) => {
    linkComponents[`.link-${color}`] = {
      [`@apply hover:text-${color}-500`]: {},
    }
  })

  // Generate links components for each color
  Object.keys(customColors).forEach((color) => {
    linkUnderlineComponents[`.link-line-${color}`] = {
      [`@apply underline underline-offset-2 hover:decoration-${color}-500`]: {},
    }
  })

  // Add the links components to the Tailwind CSS configuration
  addComponents({
    '.link': {
      '@apply text-gray-500 transition duration-200 ease-linear dark:text-dark-500':
        {},
    },
    // Include generated links components
    ...linkComponents,
    ...linkUnderlineComponents,
  })
})

module.exports = linksStyle
