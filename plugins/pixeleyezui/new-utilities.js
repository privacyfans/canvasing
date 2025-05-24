const plugin = require('tailwindcss/plugin')

const addUtilitiesStyle = plugin(function ({ addUtilities }) {
  const newUtilities = {
    '.clip-path-plus': {
      'clip-path':
        'polygon(20% 0%, 0% 20%, 30% 50%, 0% 80%, 20% 100%, 50% 70%, 80% 100%, 100% 80%, 70% 50%, 100% 20%, 80% 0%, 50% 30%)',
    },
    '.clip-path-triangle': {
      'clip-path': 'polygon(50% 0%, 100% 38%, 100% 100%, 0 99%, 0% 38%)',
    },
  }
  addUtilities(newUtilities, ['responsive', 'hover'])
})

module.exports = addUtilitiesStyle
