import express from "express"
import diaryServices from "../services/diaryServices"
import { NewDiaryEntry } from "../types"
import { toNewDiaryEntry } from "../utils"
const router = express.Router()

router.get("/", (_req, res) => {
  res.send(diaryServices.getNonSensitiveEntries())
})

router.get("/:id", (req, res) => {
  const id = req.params.id
  const diary = diaryServices.findById(Number(id))
  if (diary) {
    res.send(diary)
  } else {
    res.sendStatus(404)
  }
})
router.post("/", (req, res) => {
  try {
    const newEntry: NewDiaryEntry = toNewDiaryEntry(req.body)
    const addedEntry = diaryServices.addEntry(newEntry)
    res.json(addedEntry)
  } catch (error) {
    let errorMessage = "Something went wrong"
    if (error instanceof Error) {
      errorMessage += error.message
    }
    res.status(400).send(errorMessage)
  }
})

export default router
