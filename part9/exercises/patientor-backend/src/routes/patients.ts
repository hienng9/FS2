import express from "express"
import patientsService from "../services/patientsService"
import toNewPatientEntry, { toNewEntry } from "../utils"

const router = express.Router()

router.get("/", (_req, res) => {
  return res.send(patientsService.getNonSensitivePatientsData())
})

router.get("/:id", (req, res) => {
  try {
    const id = req.params.id
    const patient = patientsService.findPatientById(id)
    console.log("patient", patient)
    res.status(200).json(patient)
  } catch (error: unknown) {
    let errorMessage = "Something went wrong"
    if (error instanceof Error) {
      errorMessage += error.message
    }
    res.status(400).json({ error: errorMessage })
  }
})

router.post("/", (req, res) => {
  try {
    const newEntry = toNewPatientEntry(req.body)
    const addedEntry = patientsService.addPatient(newEntry)
    res.status(201).json(addedEntry)
  } catch (error: unknown) {
    let errorMessage = "Something went wrong"
    if (error instanceof Error) {
      errorMessage += error.message
    }
    res.status(400).json({ error: errorMessage })
  }
})

router.post("/:id/entries", (req, res) => {
  const patientId = req.params.id
  const entry = toNewEntry(req.body)
  try {
    const newEntry = patientsService.addEntry(entry, patientId)
    res.status(200).json(newEntry)
  } catch (error: unknown) {
    let errorMessage = "Something went wrong"
    if (error instanceof Error) {
      errorMessage += error.message
    }
    res.status(400).json({ error: errorMessage })
  }
})
export default router
