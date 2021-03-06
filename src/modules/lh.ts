import * as postcss from 'postcss'

interface Options {
  rootSelector: string,
  unit: string,
  lineHeight: number
}

const defaults = {
  rootSelector: ':root',
  unit: 'lh',
  lineHeight: 1.5
}

export default postcss.plugin('lh', (opts: Options = defaults) => {
  const options: Options = Object.assign({}, defaults, opts)

  return css => css.replaceValues(
    new RegExp('\\d*\\.?\\d+' + options.unit, 'gi'),
    { fast: options.unit },
    val => lhToRem(parseFloat(val), getLineHeight(css, options))
  )
})

function getLineHeight(css, opts): number {
  // Start with the default line-height
  let lineHeight: number = opts.lineHeight

  // Walk over all the root selectors
  css.walkRules(opts.rootSelector, rule => {

    // Omit the process if the selector is inside a print media query
    if (rule.parent && rule.parent.params === 'print') return

    // Walk over all the font or line-height properties
    rule.walkDecls(/font$|line-height/, decl => {
      // Matches {$1:font-size}{$2:unit}/{$3:line-height} when the property is 'font'
      const fontProps: Array<string> = decl.value.match(/(\d+|\d+?\.\d+)(r?em|px|%)(?:\s*\/\s*)(\d+|\d+?\.\d+)\s+/) || []

      lineHeight = fontProps[3] || decl.value
    })
  })

  return lineHeight
}

function lhToRem(val: number, lineHeight: number): string {
  return parseFloat((lineHeight * val).toFixed(3)) + 'rem'
}
