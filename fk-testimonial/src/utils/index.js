export const convertSecondsToHourMinute = (milliSeconds) => {
  const sec_num = parseInt(milliSeconds, 10)
  const hours = Math.floor(sec_num / 3600)
  const minutes = Math.floor(sec_num / 60) % 60
  const seconds = sec_num % 60

  const formattedTime = [hours, minutes, seconds]
    .map((v) => (v < 10 ? '0' + v : v))
    .join(':')
  return formattedTime
}

export const getQueryStringValue = (key) => {
  return decodeURIComponent(
    window.location.search.replace(
      new RegExp(
        '^(?:.*[&\\?]' +
          encodeURIComponent(key).replace(/[\.\+\*]/g, '\\$&') +
          '(?:\\=([^&]*))?)?.*$',
        'i'
      ),
      '$1'
    )
  )
}

export const getPublishAPIRequest = (hostname, topic = 'testimonialmvp') => {
  const environment = hostname.includes('dev')
    ? 'dev'
    : hostname.includes('staging')
    ? 'staging'
    : 'prod'
  if (environment === 'prod')
    return `https://api.fankave.com/cmsx/stories/${topic}/publish`
  return `https://${environment}.api.fankave.com/cmsx/stories/${topic}/publish`
}

export const getCanvasImageSize = (image, container) => {
  const childRatio = image.width / image.height
  const parentRatio = container.width / container.height
  let width = container.width
  let height = container.height
  if (childRatio < parentRatio) {
    height = width / childRatio
  } else {
    width = height * childRatio
  }
  return {
    width,
    height,
  }
}
