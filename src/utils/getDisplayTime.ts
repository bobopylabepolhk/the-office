import addZero from "./addZero"

const getDisplayTime = (time: Time) => `${addZero(time.hours)}:${addZero(time.minutes)}`

export default getDisplayTime
