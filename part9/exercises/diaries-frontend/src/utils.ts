import { NewDiaryEntry, Visibility, Weather } from "./types"

const isString = (text: unknown): text is string =>
  typeof text === "string" || text instanceof String

const parseComment = (comment: unknown): string => {
  if (!isString(comment)) {
    throw new Error("incorrect or missing comment: " + comment)
  }
  return comment
}

const isDate = (date: string): boolean => Boolean(Date.parse(date))

const parseDate = (date: unknown): string => {
  if (!isString(date) || !isDate(date)) {
    throw new Error("Incorrect or missing date: " + date)
  }
  return date
}

const isWeather = (param: string): param is Weather =>
  Object.values(Weather)
    .map((v) => v.toString())
    .includes(param)

const parseWeather = (weather: unknown): Weather => {
  if (!isString(weather) || !isWeather(weather)) {
    throw new Error("Incorrect or missing weather: " + weather)
  }
  return weather
}

const isVisibility = (param: string): param is Visibility =>
  Object.values(Visibility)
    .map((v) => v.toString())
    .includes(param)

const parseVisibility = (visibility: unknown): Visibility => {
  if (!isString(visibility) || !isVisibility(visibility)) {
    throw new Error("Incorrect or missing visibility: " + visibility)
  }
  return visibility
}

export const toNewDiaryEntry = (object: unknown): NewDiaryEntry => {
  if (!object || typeof object !== "object") {
    throw new Error("Incorrect or missing data")
  }
  if (
    "date" in object &&
    "weather" in object &&
    "visibility" in object &&
    "comment" in object
  ) {
    const newEntry: NewDiaryEntry = {
      date: parseDate(object.date),
      weather: parseWeather(object.weather),
      visibility: parseVisibility(object.visibility),
      comment: parseComment(object.comment),
    }
    return newEntry
  }
  throw new Error("Some fields are missing")
}
