const plugin = require('tailwindcss/plugin')

module.exports = plugin(function ({ addBase, theme }) {
  addBase({
    '.invoice-landing-chart': {
      '.apexcharts-text': {
        '@apply dark:fill-muted-invoice': {},
      },
      '.apexcharts-gridline, .apexcharts-xaxis-tick, .apexcharts-xcrosshairs, .apexcharts-xaxis-tick':
        {
          '@apply dark:!stroke-slate-300/10': {},
        },
      '.apexcharts-grid-borders': {
        line: {
          '@apply dark:!stroke-slate-300/10': {},
        },
      },
      '.apexcharts-tooltip': {
        '&.apexcharts-theme-light': {
          '@apply dark:bg-body-invoice dark:border-slate-300/10': {},
        },
        '.apexcharts-tooltip-title': {
          '@apply dark:!bg-body-invoice/50 dark:border-slate-300/10': {},
        },
      },
      '.apexcharts-xaxistooltip, .apexcharts-yaxistooltip': {
        '@apply dark:!bg-body-invoice dark:!border-slate-300/10': {},
      },
    },
  })
})
