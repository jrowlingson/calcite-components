const colors = require("@esri/calcite-colors/colors.json")

module.exports = {

  theme: {

    colors: {
      // Basic colors
      blue: {
        m: {
          50: colors['m-bb-050']
        }
      }

      // Functional colors
      'ui-blue': {
        1: 'var(--calcite-ui-blue-1)',
        2: 'var(--calcite-ui-blue-2)',
        3: 'var(--calcite-ui-blue-3)',
      },

      'ui-green': {
        1: 'var(--calcite-ui-green-1)',
        2: 'var(--calcite-ui-green-2)',
        3: 'var(--calcite-ui-green-3)',
      },

      'ui-red': {
        1: 'var(--calcite-ui-red-1)',
        2: 'var(--calcite-ui-red-2)',
        3: 'var(--calcite-ui-red-3)',
      },

      'ui-yellow': {
        1: 'var(--calcite-ui-yellow-1)',
        2: 'var(--calcite-ui-yellow-2)',
        3: 'var(--calcite-ui-yellow-3)',
      },

      'ui-background': 'var(--calcite-ui-background)',

      'ui-border': {
        1: 'var(--calcite-ui-border-1)',
        2: 'var(--calcite-ui-border-2)',
        3: 'var(--calcite-ui-border-3)',
        4: 'var(--calcite-ui-border-4)',
        5: 'var(--calcite-ui-border-5)',
      },

      'ui-foreground': {
        1: 'var(--calcite-ui-foreground-1)',
        2: 'var(--calcite-ui-foreground-2)',
        3: 'var(--calcite-ui-foreground-3)',
      },

      'ui-text': {
        1: 'var(--calcite-ui-text-1)',
        2: 'var(--calcite-ui-text-2)',
        3: 'var(--calcite-ui-text-3)',
      },

      // Grayscale
      white: colors['blk-000'],

      black: colors['blk-240'],

      transparent: 'transparent',

      gray: {
        5: colors['blk-015'],
        10: colors['blk-010'],
        20: colors['blk-020'],
        40: colors['blk-040'],
        80: colors['blk-080'],
        120: colors['blk-120'],
        170: colors['blk-170'],
        180: colors['blk-180'],
        190: colors['blk-190'],
        200: colors['blk-200'],
        220: colors['blk-220'],
        230: colors['blk-230'],
      }
    },

    screens: {
      'sm': '576px',
      'md': '768px',
      'lg': '992px',
      'xl': '1200px',
    },

    fontFamily: {
      'sans': [
        '"Avenir Next"',
        'system-ui',
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        '"Noto Sans"',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
        '"Noto Color Emoji"',
      ],
      'serif': [ 'Georgia', 'Cambria', '"Times New Roman"', 'Times', 'serif' ],
      'mono': [ 'Menlo', 'Monaco', 'Consolas', 'Liberation Mono', '"Courier New"', 'monospace' ],
    },

    fontSize: {
      '2xs': '.625rem',  // 10px
      'xs': '.75rem',    // 12px
      'sm': '.875rem',   // 14px
      'base': '1rem',    // 16px
      'lg': '1.125rem',  // 18px
      'xl': '1.25rem',   // 20px
      '2xl': '1.625rem', // 26px
      '3xl': '2rem',     // 32px
      '4xl': '2.5rem',   // 40px

      'display-sm': '3rem',   // 48px
      'display-md': '3.5rem', // 56px
      'display-lg': '4rem',   // 64px
    },

    borderColor: theme => ({
      ...theme('colors'),
      default: theme('colors.gray.default', 'currentColor'),
    }),

    boxShadow: {
      default: '0 2px 4px 0 rgba(0,0,0,0.10)',
      'md': '0 4px 8px 0 rgba(0,0,0,0.12), 0 2px 4px 0 rgba(0,0,0,0.08)',
      'lg': '0 15px 30px 0 rgba(0,0,0,0.11), 0 5px 15px 0 rgba(0,0,0,0.08)',
      'inner': 'inset 0 2px 4px 0 rgba(0,0,0,0.06)',
      'outline': '0 0 0 3px rgba(var(--app-brand-primary-rgb,52,144,220),0.5)',
      'none': 'none',
    },

    extend: {

      height: {
        '128': '32rem',
      },

      width: {
        '128': '32rem',
      },

    },

  },

  variants: {
    borderWidth: [ 'responsive', 'rtl' ],
    fontStyle: [ 'responsive', 'hover', 'focus' ],
    fontWeight: [ 'responsive', 'hover' ],
    inset: [ 'responsive', 'rtl' ],
    margin: [ 'responsive', 'rtl' ],
    objectFit: [],
    opacity: [ 'responsive', 'disabled' ],
    outline: [ 'focus' ],
    padding: [ 'responsive', 'rtl' ],
    position: [ 'responsive', 'rtl' ],
    stroke: [],
    textAlign: [ 'responsive', 'rtl' ],
  },

  corePlugins: {
    objectPosition: false,
  },

  /*
  |-----------------------------------------------------------------------------
  | Plugins                                https://tailwindcss.com/docs/plugins
  |-----------------------------------------------------------------------------
  |
  | Here is where you can register any plugins you'd like to use in your
  | project. Tailwind's built-in `container` plugin is enabled by default to
  | give you a Bootstrap-style responsive container component out of the box.
  |
  | Be sure to view the complete plugin documentation to learn more about how
  | the plugin system works.
  |
  */

  plugins: [
    function({ addVariant, e }) {
      addVariant('rtl', ({ modifySelectors, separator }) => {
        modifySelectors(({ className }) => {
          return `[dir="rtl"] .${e(`rtl${separator}${className}`)}`
        })
      })
    },
  ],

}
