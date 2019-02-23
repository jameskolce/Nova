import * as postcss from 'postcss'
import * as customMedia from 'postcss-custom-media'
import * as mediaMinMax from 'postcss-media-minmax'
import * as autoprefixer from 'autoprefixer'
import * as ifMedia from 'postcss-if-media'
import * as nested from 'postcss-nested'
import requires from './modules/require'
import lh from './modules/lh'
import typeScale from './modules/typeScale'
import customProperties from './modules/customProperties'

const modules = [
  requires(),
  ifMedia(),
  nested(),
  customMedia(),
  mediaMinMax(),
  customProperties(),
  lh({
    rootSelector: ':root',
    unit: 'lh',
    lineHeight: 1.5
  }),
  typeScale({
    rootSelector: ':root',
    typeRatio: 1.2,
    ratioProperty: '--type-ratio'
  }),
  autoprefixer()
]

export = postcss.plugin('nova', (): any => postcss(modules))
