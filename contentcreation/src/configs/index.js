import deepmerge from 'deepmerge'

import defaultConfigs from './defaultTheme'

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
