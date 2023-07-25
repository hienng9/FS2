import patientsData from "../../data/patients"
import {
  NewPatientEntry,
  NonSensitivePatient,
  Patient,
  EntryWithoutId,
  Entry,
} from "../types"
import { v4 as uuidv4 } from "uuid"

const getNonSensitivePatientsData = (): NonSensitivePatient[] => {
  return patientsData.map(
    ({ id, name, dateOfBirth, gender, occupation, entries }) => ({
      id,
      name,
      dateOfBirth,
      gender,
      occupation,
      entries,
    })
  )
}

const findPatientById = (id: string): Patient => {
  const patient = patientsData.find((p) => p.id === id)
  if (!patient) {
    throw new Error(`Cannot find patient with id ${id}`)
  }
  return patient
}
const addPatient = (newPatient: NewPatientEntry): Patient => {
  const patient = {
    ...newPatient,
    id: uuidv4(),
  }
  patientsData.push(patient)
  return patient
}

const addEntry = (newEntry: EntryWithoutId, patientId: string): Entry => {
  const entry = {
    ...newEntry,
    id: uuidv4(),
  }
  const patient = patientsData.find((p) => p.id === patientId)
  if (!patient) {
    throw new Error(`Cannot find patient with id ${patientId}`)
  }
  patient.entries.push(entry)
  return entry
}

export default {
  getNonSensitivePatientsData,
  addPatient,
  findPatientById,
  addEntry,
}
