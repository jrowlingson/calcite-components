export function css(classes: string): RegExpMatchArray | string | null {
  return _buildThemeClasses(_buildSizeClasses(classes, this.size), this.theme)
}

function _buildSizeClasses(classes: string, size: string): string {
  return classes.replace(/\w*<.*?>/g, '')
    .concat(_parseSizeClasses(classes, size))
}

function _buildThemeClasses(classes: string, theme: string): string {
  return classes.replace(/\S+\[.*?]/g, '')
    .concat(_parseThemeClasses(classes.replace(/\n/g, ''), theme))
}

function _parseThemeClasses(classes: string, theme: string): string | null {
  const match = classes.match(/(\S+\[.*?])/gm)
  const result = match.reduce((acc, token) => {
    const tokens = token.match(/(\S+)\[(.*)]/)
    const darkModifiers = tokens[2].split(' ')
    if (theme === 'dark') {
      return `${acc} ${tokens[1]}${darkModifiers.length === 1 ? darkModifiers[0] : darkModifiers[1]}`
    } else {
      return `${acc} ${tokens[1]}${darkModifiers.length === 1 ? '' : darkModifiers[0]}`
    }
  }, '')
  return result
}

function _parseSizeClasses(classes: string, size: string): string | null {
  if (size === 'small') {
    return (new RegExp(/sm<(.*?)>/)).exec(classes)[1]
  } else if (size === 'medium') {
    return (new RegExp(/md<(.*?)>/)).exec(classes)[1]
  } else if (size === 'large') {
    return (new RegExp(/lg<(.*?)>/)).exec(classes)[1]
  }
  return classes.match(/[^\w]<(.*?)>/)[1]
}
