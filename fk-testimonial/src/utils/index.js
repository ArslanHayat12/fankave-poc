export const convertSecondsToHourMinute = (milliSeconds) => {
    const sec_num = parseInt(milliSeconds, 10)
    const hours = Math.floor(sec_num / 3600)
    const minutes = Math.floor(sec_num / 60) % 60
    const seconds = sec_num % 60

    const formattedTime = [hours, minutes, seconds].map(v => (v < 10 ? '0' + v : v)).join(':')
    return formattedTime
}