const MagicString = require('magic-string')
// const fs = require('fs')
// const postcss = require('postcss')
// const tailwindcss = require('tailwindcss')

const { blue, magenta, red } = require('chalk')
const log = console.log

// let stylesTree

function _staticStyles(code) {
  if (code.match(/class: `(.+?)`/gs)) {
    console.log('HERE')
    // console.log(code)
    let tokens = code.replace(/[\n'}]+/gm, '').match(/class: `(.+?)`/gs)
    console.log(tokens)
    tokens = tokens
      .map(str =>  str.match(/`(.*)`/)[1])
      .join(' ')
      .split(' ')
      .filter(s => s !== '')
    console.log('TOKENS:', tokens)
    const result = stylesTree.root.nodes.reduce((acc, node) => {
        if (node.selector && tokens.includes(node.selector.substring(1))) {
          return node.toString().replace(/(\r\n|\n|\r)/gm, '') + ' \\n' + acc
        }
        return acc
      }, ' S')
    return result
  }
}

function rollupPluginTailwind() {

  return {
    name: 'rollup-plugin-foo',

    buildStart() {
      console.log(`FOO BUILDSTART`)
    },

    transform(code, id) {
      // console.log(`id`)
      if (id.includes('components')) {
        if (id.includes('switch')) {
          console.log(`id: `, id)
          console.log(code)
          let match = /= (.*?Style;)/.exec(code)
          console.log(`MATCH`, match)
          if (match) {
            const s = new MagicString(code)
            log(magenta("OVERWRITE:", s.toString()))
            const styles = _staticStyles(code)
            if (styles) {
              s.overwrite(match.index, match.index + 1, styles)
            }
            log(blue(s.toString()))
            log(red(match[1]))
            return {
              code: s.toString()
            }
          }
        }
      }
    },

  }

}

module.exports = rollupPluginTailwind

