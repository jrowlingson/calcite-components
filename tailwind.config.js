module.exports = {

  theme: {

    colors: {

      yellow: {
        lightest: '#faf7dc', // m-yy-010
        lighter: '#f6f0c1',  // m-yy-020
        light: '#fcee8d',    // h-yy-030
        default: '#edd317',  // h-yy-060
        dark: '#d9bc00',     // h-yy-070
        darker: '#8c7500',   // h-yy-090
        darkest: '#5c4e00',  // h-yy-100
      },

      'yellow-green': {
        lightest: '#f0f7da', // m-yg-010
        lighter: '#e5efc6',  // m-yg-020
        light: '#cde78a',    // h-yg-030
        default: '#aad04b',  // h-yg-060
        dark: '#84a338',     // h-yg-070
        darker: '#384813',   // h-yg-090
        darkest: '#121a00',  // h-yg-100
      },

      green: {
        lightest: '#e4f0e4', // m-gg-010
        lighter: '#cbe2cb',  // m-gg-020
        light: '#87d692',    // h-gg-030
        default: '#35ac46',  // h-gg-060
        dark: '#288835',     // h-gg-070
        darker: '#0d3f14',   // h-gg-090
        darkest: '#001a03',  // h-gg-100
      },

      'green-blue': {
       lightest: '#dbf2f1', // m-gb-010
        lighter: '#beedec',  // m-gb-020
        light: '#8fe6e5',    // h-gb-030
        default: '#00bab5',  // h-gb-060
        dark: '#009b98',     // h-gb-070
        darker: '#004d4c',   // h-gb-090
        darkest: '#002625',  // h-gb-100
      },

      blue: {
        lightest: '#dfeffa', // m-bb-010
        lighter: '#c8e3f5',  // m-bb-020
        light: '#77bde7',    // h-bb-030
        default: '#007ac2',  // h-bb-060
        dark: '#00619b',     // h-bb-070
        darker: '#00304d',   // h-bb-090
        darkest: '#001726',  // h-bb-100
      },

      violet: {
        lightest: '#ece6ff', // m-vv-010
        lighter: '#dcd2f2',  // m-vv-020
        light: '#b39ad7',    // h-vv-030
        default: '#633b9b',  // h-vv-060
        dark: '#4e2c7e',     // h-vv-070
        darker: '#250f43',   // h-vv-090
        darkest: '#100026',  // h-vv-100
      },

      'violet-red': {
        lightest: '#f6e1fa', // m-vr-010
        lighter: '#e9ceee',  // m-vr-020
        light: '#cfa1d7',    // h-vr-030
        default: '#8e499b',  // h-vr-060
        dark: '#73377e',     // h-vr-070
        darker: '#3c1243',   // h-vr-090
        darkest: '#200026',  // h-vr-100
      },

      pink: {
        lightest: '#fadef0', // m-pk-010
        lighter: '#facdea',  // m-pk-020
        light: '#f2a5d6',    // h-pk-030
        default: '#e04ea6',  // h-pk-060
        dark: '#ba2f7e',     // h-pk-070
        darker: '#590b32',   // h-pk-090
        darkest: '#260404',  // h-pk-100
      },

      red: {
        lightest: '#fadfdc', // m-rr-010
        lighter: '#fccac5',  // m-rr-020
        light: '#f2877b',    // h-rr-030
        default: '#d83020',  // h-rr-060
        dark: '#a82b1e',     // h-rr-070
        darker: '#4f0e08',   // h-rr-090
        darkest: '#210300',  // h-rr-100
      },

      'red-orange': {
        lightest: '#f7e4dc', // m-ro-010
        lighter: '#f5d0c2',  // m-ro-020
        light: '#f09677',    // h-ro-030
        default: '#da4d1e',  // h-ro-060
        dark: '#ad3c16',     // h-ro-070
        darker: '#531b07',   // h-ro-090
        darkest: '#260a00',  // h-ro-100
      },

      orange: {
        lightest: '#ffece0', // m-oo-010
        lighter: '#fcdac5',  // m-oo-020
        light: '#faae7f',    // h-oo-030
        default: '#f36f20',  // h-oo-060
        dark: '#c65a18',     // h-oo-070
        darker: '#6d2f08',   // h-oo-090
        darkest: '#401900',  // h-oo-100
      },

      'orange-yellow': {
        lightest: '#ffedd6', // m-oy-010
        lighter: '#fce0bd',  // m-oy-020
        light: '#fcc582',    // h-oy-030
        default: '#f89927',  // h-oy-060
        dark: '#c67718',     // h-oy-070
        darker: '#6d3f08',   // h-oy-090
        darkest: '#402300',  // h-oy-100
      },

      // Grayscale
      'white': 'white',

      gray: {
        lightest: '#f8f8f8', // blk-005
        lighter: '#dfdfdf',  // blk-030
        light: '#bfbfbf',    // blk-060
        default: '#9f9f9f',  // blk-090
        dark: '#606060',     // blk-150
        darker: '#404040',   // blk-180
        darkest: '#2b2b2b',  // blk-200
      },

      black: '#151515', // blk-220

      transparent: 'transparent',

      // Functional colors
      alert: {
        red: '#d83020',
        yellow: '#edd317',
        green: '#35ac46',
        blue: '#007ac2',
      },

      // Brand colors (Theme)
      brand: {
        light: 'var(--app-brand-primary-light, #c8e3f5)', // blue-lighter
        default: 'var(--app-brand-primary, #007ac2)', // blue
        dark: 'var(--app-brand-primary-dark, #00304d)', // blue-darker
        highlight: 'var(--app-brand-primary-highlight, #77bde7)', // blue-light
        secondary: 'var(--app-brand-secondary, #f36f20)', // orange
      },

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
    backgroundPosition: [ 'responsive', 'mirror' ],
    borderRadius: [ 'responsive', 'mirror' ],
    borderWidth: [ 'responsive', 'rtl', 'mirror' ],
    fontStyle: [ 'responsive', 'hover', 'focus' ],
    fontWeight: [ 'responsive', 'hover' ],
    inset: [ 'responsive', 'rtl', 'mirror' ],
    margin: [ 'responsive', 'rtl', 'mirror' ],
    objectFit: [],
    opacity: [ 'responsive', 'disabled' ],
    outline: [ 'focus' ],
    padding: [ 'responsive', 'rtl', 'mirror' ],
    position: [ 'responsive', 'rtl' ],
    stroke: [],
    textAlign: [ 'responsive', 'rtl', 'mirror' ],
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
          return `:host([dir="rtl"]) .${e(`rtl${separator}${className}`)}`
        })
      })
      addVariant('mirror', ({ container, separator }) => {
        const newRules = []
        container.walkRules(rule => {
          const className = rule.selector.slice(1)
          const reversableMarginOrPadding = /-?(m|p)(l|r)-(px|auto|[0-9]+)/.test(className)
          const reversableBorderRadius = /rounded-(l|r|tl|tr|bl|br)(-[a-z]+)?/.test(className)
          const reversableBorderWidth = /border-(l|r)(-[0-9])?/.test(className)
          const reversablePosition = /(right|left)-(0|auto)/.test(className)
          const reversableProperty = reversableMarginOrPadding || reversableBorderRadius || reversableBorderWidth || reversablePosition

          const reversableFloat = /float-(right|left)/.test(className)
          const reversableClear = /clear-(right|left)/.test(className)
          const reversableTextAlign = /text-(right|left)/.test(className)
          const reversableBackgroundPosition = /bg-(right|left)(-(bottom|top))?/.test(className)
          const reversableValue = reversableFloat || reversableClear || reversableTextAlign || reversableBackgroundPosition

          if (reversableProperty || reversableValue) {
            rule.selector = `:host([dir="ltr"]) .${e(`mirror${separator}${className}`)}`
            const clone = rule.clone({ selector: `:host([dir="rtl"]) .${e(`mirror${separator}${className}`)}` })
            clone.each(node => {
              if (reversableProperty) {
                node.prop = node.prop.includes('left')
                  ? node.prop.replace('left', 'right')
                  : node.prop.replace('right', 'left')
              }
              if (reversableValue) {
                node.value = node.value.includes('left')
                  ? node.value.replace('left', 'right')
                  : node.value.replace('right', 'left')
              }
            })
            newRules.push(clone)
          }
        })
        container.append(newRules)
      })
    },
  ],

}
