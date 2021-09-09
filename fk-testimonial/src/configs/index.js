import deepmerge from 'deepmerge'

import beviBookConfigs from './beviTheme'
import defaultConfigs from './defaultTheme'
import demoConfigs from './demoTheme'
import postalConfigs from './postalTheme'
import honeyBookConfigs from './honeyBookTheme'
import proveConfigs from './proveTheme'

const theme = () => {
  switch (window.self.ctag) {
    case 'demo':
      return defaultConfigs
    default:
      return defaultConfigs
  }
}

const themeConfigs = theme()
export default themeConfigs
