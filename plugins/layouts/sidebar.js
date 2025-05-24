const plugin = require('tailwindcss/plugin')

module.exports = plugin(function ({ addComponents }) {
  addComponents({
    '.main-sidebar': {
      //bg-sidebar
      '@apply fixed bottom-0 ltr:left-0 rtl:right-0 top-0 lg:top-topbar w-sidebar z-[1005] lg:z-[1002] transition-all duration-200 ease-linear':
        {},
      //modern layouts
      '@apply group-data-[layout=modern]:top-0': {},
      //column layouts
      '@apply ltr:group-data-[layout=dualcolumn]:left-20 rtl:group-data-[layout=dualcolumn]:right-20':
        {},
      //icon sidebar
      '@apply group-data-[sidebar=icon]:w-sidebar-icon': {},
      //small sidebar
      '@apply group-data-[sidebar=small]:w-sidebar-small': {},
      '@apply group-data-[sidebar=medium]:w-sidebar-medium': {},
      '@apply print:hidden': {},

      '.sidebar-wrapper': {
        '@apply bg-sidebar border-sidebar-border ltr:border-r rtl:border-l h-full':
          {},

        //sidebar light dark
        '@apply group-data-[sidebar-colors=light]:dark:bg-dark-900 group-data-[sidebar-colors=light]:dark:border-dark-800':
          {},
      },

      '.navbar-brand': {
        '@apply group-data-[layout=default]:hidden group-data-[layout=default]:px-4 group-data-[sidebar=icon]:w-sidebar-icon h-topbar w-sidebar flex items-center':
          {},
        //sidebar-medium
        '@apply group-data-[sidebar=medium]:w-sidebar-medium group-data-[sidebar=small]:w-sidebar-small':
          {},
      },

      '.menu-title': {
        '@apply px-4 py-2 text-[0.75rem] group-data-[layout=horizontal]:hidden group-data-[sidebar=medium]:text-center uppercase text-menu-title':
          {},
        //sidebar light dark
        '@apply group-data-[sidebar-colors=light]:dark:text-dark-500': {},
      },

      '.nav-link': {
        '@apply hyphens-auto flex items-center w-full px-4 py-2.5 text-sidebar-text text-15 rounded-md group-data-[sidebar=small]:py-3 transition-all ltr:text-left rtl:text-right duration-200 ease-linear':
          {},
        '@apply group-data-[sidebar=medium]:py-3 group-data-[sidebar=medium]:flex-col group-data-[sidebar=medium]:text-center group-data-[sidebar=medium]:gap-3 group-data-[sidebar=medium]:!w-[calc(theme("spacing.sidebar-medium")_-_24px)] group-data-[sidebar=medium]:mx-3 group-data-[sidebar=medium]:[&.active]:bg-sidebar-bg-active/10 group-data-[sidebar=medium]:my-2':
          {},
        //sidebar small
        '@apply group-data-[sidebar=small]:!w-[calc(theme("spacing.sidebar-small")_-_24px)] group-data-[sidebar=small]:mx-auto group-data-[sidebar=small]:[&.active]:!bg-sidebar-bg-active/10':
          {},

        '.content': {
          '@apply group-data-[sidebar=small]:hidden': {},
        },

        '.arrow': {
          '@apply ltr:ml-auto rtl:mr-auto text-current transition-transform duration-300 size-5 group-data-[sidebar=small]:hidden':
            {},
          '@apply group-data-[sidebar=medium]:hidden': {},
        },

        //hover & active
        '@apply hover:text-sidebar-text-hover [&.active]:text-sidebar-text-active':
          {},

        //sidebar light dark
        '@apply group-data-[sidebar-colors=light]:dark:text-dark-500 group-data-[sidebar-colors=light]:dark:hover:text-sidebar-text-hover group-data-[sidebar-colors=light]:dark:[&.active]:text-sidebar-text-active':
          {},
      },
      '.navbar-menu': {
        '@apply h-[calc(100%_-_5rem)] group-data-[layout=modern]:h-[calc(100%_-_10rem)] group-data-[layout=boxed]:h-[calc(100%_-_5rem)]':
          {},

        '.dropdown-menu': {
          '@apply static': {},
          //sidebar small
          '@apply group-data-[sidebar=small]:fixed group-data-[sidebar=small]:w-48 group-data-[sidebar=small]:bg-sidebar group-data-[sidebar=small]:group-data-[sidebar-colors=light]:dark:bg-dark-900 group-data-[sidebar=small]:group-data-[sidebar-colors=light]:dark:border group-data-[sidebar=small]:group-data-[sidebar-colors=light]:dark:border-dark-800 group-data-[sidebar=small]:shadow-lg group-data-[sidebar=small]:z-30':
            {},

          '.dropdown-wrapper': {
            '@apply ltr:ml-6 rtl:mr-6 ltr:group-data-[sidebar=medium]:ml-0 rtl:group-data-[sidebar=medium]:mr-0 ltr:group-data-[sidebar=small]:ml-0 rtl:group-data-[sidebar=small]:mr-0 group-data-[sidebar=small]:py-2':
              {},
            '&::-webkit-scrollbar': {
              width: '8px',
            },

            /* Track */
            '&::-webkit-scrollbar-track': {
              '@apply bg-transparent': {},
            },

            /* Handle */
            '&::-webkit-scrollbar-thumb': {
              '@apply bg-gray-200 dark:bg-dark-800 rounded-full opacity-0': {},
            },

            /* Handle on hover */
            '&::-webkit-scrollbar-thumb:hover': {
              '@apply opacity-100': {},
            },
          },

          li: {
            'a, button': {
              '@apply hyphens-auto flex items-center px-4 py-1.5 text-sidebar-text text-[14.5px] group-data-[sidebar=medium]:justify-center group-data-[sidebar=medium]:text-center transition-all duration-200 ease-linear':
                {},
              //effect
              '@apply relative before:absolute before:size-2 before:outline-sidebar-text before:outline-1 before:outline-dashed before:rounded-full before:top-3 ltr:before:-left-1 rtl:before:-right-1 before:transition-all before:duration-300 before:ease-linear hover:before:animate-spin before:bg-effect group-data-[sidebar-colors=light]:dark:before:bg-dark-900 before:z-10':
                {},
              //sidebar medium
              '@apply group-data-[sidebar=medium]:before:hidden': {},
              //sidebar small
              '@apply group-data-[sidebar=small]:before:hidden group-data-[sidebar=small]:py-2 group-data-[sidebar=small]:px-6':
                {},
              //hover & active
              '@apply hover:text-sidebar-text-hover [&.active]:text-sidebar-text-active [&.active]:before:outline-sidebar-text-hover hover:before:outline-sidebar-text-hover':
                {},
              //sidebar light dark
              '@apply group-data-[sidebar-colors=light]:dark:text-dark-500 group-data-[sidebar-colors=light]:dark:hover:text-sidebar-text-hover group-data-[sidebar-colors=light]:[&.active]:text-sidebar-text-active':
                {},
            },
            //sidebar medium
            '.nav-link': {
              '@apply px-4 py-1.5 group-data-[sidebar=small]:py-1.5 group-data-[sidebar=medium]:m-0 group-data-[sidebar=small]:m-0 group-data-[sidebar=small]:w-full group-data-[sidebar=small]:[&.active]:bg-transparent group-data-[sidebar=medium]:[&.active]:bg-transparent group-data-[sidebar=medium]:!w-full':
                {},

              '.content': {
                '@apply group-data-[sidebar=small]:block': {},
              },

              '.arrow': {
                '@apply group-data-[sidebar=small]:inline-block': {},
              },
            },
          },
        },
      },
    },
  })
})
