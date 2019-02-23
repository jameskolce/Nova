import * as postcss from 'postcss'
import * as fs from 'fs'
import * as path from 'path'

export default postcss.plugin('require', () => {
  return css => {
    css.walkAtRules('require', rule => {
      const relativeFile = rule.params.substr(1, rule.params.length - 2)
      const file = path.join(path.dirname(rule.source.input.file), relativeFile)
      const content: any = fs.readFileSync(file, 'utf-8')

      if (content.indexOf('@require') !== -1) {
        throw Error('Recursive @require detected in ' + file)
      }

      rule.replaceWith(content)
    })
  }
})
