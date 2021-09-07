import { isMobile } from 'react-device-detect'

export const videoWidth =
  window.innerWidth > 0 ? window.innerWidth : window.screen.width

export const videoConstraints = {
  width: isMobile
    ? undefined
    : videoWidth > 375
    ? 340
    : videoWidth < 375
    ? 294
    : 294,
  height: isMobile
    ? undefined
    : videoWidth > 375
    ? 450
    : videoWidth < 375
    ? 388
    : 388,
  facingMode: 'user',
}
