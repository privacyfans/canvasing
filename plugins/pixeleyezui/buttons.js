const plugin = require('tailwindcss/plugin')

const buttonStyle = plugin(function ({ addComponents }) {
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

  // Define objects to store button components for different styles
  const buttonComponents = {} // Regular buttons
  const buttonOutlineComponents = {} // Outline buttons
  const buttonSoftComponents = {} // Soft buttons
  const button3DComponents = {} // 3D buttons
  const buttonDashedComponents = {} // dashed style buttons
  const buttonActiveComponents = {} // active style buttons

  // Generate regular button components for each color
  Object.keys(customColors).forEach((color) => {
    buttonComponents[`.btn-${color}`] = {
      [`@apply bg-${color}-500 text-white border-${color}-500 hover:bg-${color}-600 hover:text-white hover:border-${color}-600 focus:bg-${color}-600 focus:text-white focus:border-${color}-600`]:
        {},
    }
  })

  // Generate outline button components for each color
  Object.keys(customColors).forEach((color) => {
    buttonOutlineComponents[`.btn-outline-${color}`] = {
      [`@apply bg-transparent text-${color}-500 border-${color}-500 hover:bg-${color}-500 hover:text-white hover:border-${color}-500 focus:bg-${color}-500 focus:text-white focus:border-${color}-500`]:
        {},
    }
  })

  // Generate soft button components for each color
  Object.keys(customColors).forEach((color) => {
    buttonSoftComponents[`.btn-sub-${color}`] = {
      [`@apply bg-${color}-500/10 text-${color}-500 border-none hover:bg-${color}-500/20 hover:text-${color}-600 focus:bg-${color}-500/20 focus:text-${color}-600`]:
        {},
    }
  })

  // Generate 3d button components for each color
  Object.keys(customColors).forEach((color) => {
    button3DComponents[`.btn-3d-${color}`] = {
      [`@apply shadow-inner bg-${color}-500 text-white border-${color}-500 hover:bg-${color}-600 hover:text-white hover:border-${color}-600 focus:bg-${color}-600 focus:text-white focus:border-${color}-600 shadow-${color}-700`]:
        {},
    }
  })

  // Generate Dashed style  button components for each color
  Object.keys(customColors).forEach((color) => {
    buttonDashedComponents[`.btn-dashed-${color}`] = {
      [`@apply bg-transparent text-${color}-500 border-${color}-500 hover:bg-${color}-500/10 hover:text-${color}-500 hover:border-${color}-500 focus:bg-${color}-500/10 focus:text-${color}-500 focus:border-${color}-500`]:
        {},
    }
  })

  // Generate active style  button components for each color
  Object.keys(customColors).forEach((color) => {
    buttonActiveComponents[`.btn-active-${color}`] = {
      [`@apply bg-transparent text-${color}-500 border-none hover:bg-${color}-500/10 hover:text-${color}-500 focus:bg-${color}-500/10 focus:text-${color}-500`]:
        {},
    }
  })

  // Add the button components to the Tailwind CSS configuration
  addComponents({
    '.btn.btn-sub-gray': {
      '@apply dark:text-gray-400 dark:hover:text-gray-300': {},
    },
    // Include generated button components
    ...buttonComponents,
    ...buttonOutlineComponents,
    ...buttonSoftComponents,
    ...button3DComponents,
    ...buttonDashedComponents,
    ...buttonActiveComponents,
  })
})

module.exports = buttonStyle
