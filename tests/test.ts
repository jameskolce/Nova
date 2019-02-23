import * as tape from 'tape'
import * as postcss from 'postcss'
import * as fs from 'fs'

const tests = {
  lh: {
    'font': 'should be transformed with a font declaration',
    'line-height': 'should be transformed with a line-height declaration'
  },
  typeScale: {
    'default': 'should be transformed into rem units'
  },
  customProperties: {
    'default': 'should be transformed into standard CSS custom properties'
  },
  customMedia: {
    'transform-all': 'should transform all custom media',
    'transform-circular-reference': 'should transform circular reference',
    'transform-reference': 'should transform reference',
    'transform-self-reference': 'transform self reference',
    'transform': 'transform',
    'undefined': 'undefined',
  },
  ifMedia: {
    'default': 'should transform inline media queries'
  },
  mediaMinMax: {
    'min-max': 'min max',
    'aspect-ratio': 'aspect ratio',
    'color-index': 'color index',
    'color': 'color',
    'comment': 'comment',
    'device-aspect-ratio': 'device aspect ratio',
    'device-width-height': 'device width height',
    'line-break': 'line break',
    'monochrome': 'monochrome',
    'more-units': 'more units',
    'other-name': 'other-name',
    'resolution': 'resolution',
    'shorthands': 'shorthands',
    'width-height': 'width-height'
  },
  nested: {
    'default': 'transform nested rulesets'
  },
  require: {
    'default': 'process @require'
  }
}

for (const feature in tests) {
  tape(feature, t => {

    for (const test in tests[feature]) {
      t.equal(
        actual(`${feature}/${test}`),
        expected(`${feature}/${test}`),
        tests[feature][test]
      )
    }

    t.end()
  })
}

function actual(file) {
  const css = fs.readFileSync(`tests/cases/${file}.pcss`, 'utf8')
  return postcss([require('../src')])
    .process(css, { from: `tests/cases/${file}.pcss` })
    .css
    .replace(/\s+/g, '')
}

function expected(file) {
  return fs.readFileSync(`tests/cases/${file}.css`, 'utf8').replace(/\s+/g, '')
}
