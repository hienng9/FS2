import { useEffect, useState } from "react"
import diariesService from "./services/diariesService"
import { DiaryEntry, NewDiaryEntry, Weather, Visibility } from "./types"
import { toNewDiaryEntry } from "./utils"
import Notification from "./components/Notification"
import React from "react"

const App = () => {
  const weatherChoices = Object.values(Weather).map((w) => w.toString())
  const visibilityChoices = Object.values(Visibility).map((w) => w.toString())

  const [diaries, setDiaries] = useState<DiaryEntry[]>([])
  const [newDate, setNewDate] = useState("")
  const [newVisibility, setNewVisibility] = useState("")
  const [newWeather, setNewWeather] = useState("")
  const [newComment, setNewComment] = useState("")
  const [errorMessage, setErrorMessage] = useState("")

  useEffect(() => {
    diariesService.getDiaries().then((diaries) => setDiaries(diaries))
  }, [])

  const newEntryCreation = (event: React.SyntheticEvent) => {
    event.preventDefault()
    try {
      const newEntry: NewDiaryEntry = toNewDiaryEntry({
        date: newDate,
        weather: newWeather,
        visibility: newVisibility,
        comment: newComment,
      })
      diariesService
        .createNewEntry(newEntry)
        .then((entry) => setDiaries(diaries.concat(entry)))
        .catch((error: unknown) => {
          let errorMess = "Error: "
          if (error instanceof Error) {
            errorMess += error.message
          }
          setErrorMessage(errorMess)
          setTimeout(() => setErrorMessage(""), 5000)
        })
    } catch (error: unknown) {
      let errorMess = "Error:"
      if (error instanceof Error) {
        errorMess += error.message
      }
      setErrorMessage(errorMess)
      setTimeout(() => setErrorMessage(""), 5000)
    }

    setNewDate("")
    setNewWeather("")
    setNewComment("")
    setNewVisibility("")
  }
  return (
    <div>
      <Notification {...{ message: errorMessage }} />
      <h3>Create New Diari Entry</h3>
      <form onSubmit={newEntryCreation}>
        <div>
          Date:{" "}
          <input
            type="date"
            value={newDate}
            onChange={(event) => setNewDate(event.target.value)}
          />
        </div>
        <div>
          Visibility:{" "}
          {visibilityChoices.map((w) => (
            <React.Fragment key={w}>
              <input
                type="radio"
                value={w}
                onChange={() => setNewVisibility(w)}
              />
              <label>{w}</label>
            </React.Fragment>
          ))}
        </div>
        <div>
          Weather:{" "}
          {weatherChoices.map((w) => (
            <React.Fragment key={w}>
              <input type="radio" value={w} onChange={() => setNewWeather(w)} />
              <label>{w}</label>
            </React.Fragment>
          ))}
        </div>
        <div>
          Comment:{" "}
          <input
            value={newComment}
            onChange={(event) => setNewComment(event.target.value)}
          />
        </div>

        <button type="submit">add</button>
      </form>
      <h3>Past Diary Entries</h3>
      {diaries.map((entry) => (
        <div key={entry.id}>
          <h2>{entry.date}</h2>
          <p>visibility: {entry.visibility}</p>
          <p>weather: {entry.weather}</p>
        </div>
      ))}
    </div>
  )
}
export default App
