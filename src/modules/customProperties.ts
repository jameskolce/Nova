import * as postcss from 'postcss'

// Matches --variable(fallback)
const reg = /(--[\w\d-_]+)\((.*)\)/

export default postcss.plugin('custom-properties', () => {
  return css => {
    css.replaceValues(/(var\()*--[\w\d-_]+(\))*(\(.*\))*/g, { fast: '--' }, value => {
      // If the value is already using var()
      if (value.includes('var(')) return value

      return reg.test(value)
        ? `var(${value.match(reg)[1]}, ${value.match(reg)[2]})` // {$1:propertyName}{$2:Fallback}
        : `var(${value})`
    })
  }
})
