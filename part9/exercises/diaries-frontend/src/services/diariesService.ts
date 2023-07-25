import axios from "axios"
import { DiaryEntry, NewDiaryEntry } from "../types"

const baseUrl = "http://localhost:3001/api/diaries"

const getDiaries = async () => {
  const response = await axios.get<DiaryEntry[]>(baseUrl)
  return response.data
}

const createNewEntry = async (newEntry: NewDiaryEntry) => {
  const response = await axios.post<DiaryEntry>(baseUrl, newEntry)
  console.log(response)
  return response.data
}
export default { getDiaries, createNewEntry }
