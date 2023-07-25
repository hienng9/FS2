import {
  Gender,
  NewPatientEntry,
  Diagnosis,
  EntryWithoutId,
  HealthCheckRating,
  Discharge,
  SickLeave,
} from "./types"

const isString = (str: unknown): str is string =>
  typeof str === "string" || str instanceof String

const parseName = (name: unknown): string => {
  if (!name || !isString(name)) {
    throw new Error("Incorrect or missing name: " + name)
  }
  return name
}
const isDate = (date: string): boolean => Boolean(Date.parse(date))
const parseDate = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error("Incorrect or missing date: " + date)
  }
  return date
}
const isGender = (gender: string): gender is Gender =>
  Object.values(Gender)
    .map((g) => g.toString())
    .includes(gender)

const parseGender = (gender: unknown): Gender => {
  if (!gender || !isString(gender) || !isGender(gender)) {
    throw new Error("Incorrect or missing gender: " + gender)
  }
  return gender
}

const parseOccupation = (occ: unknown): string => {
  if (!occ || !isString(occ)) {
    throw new Error("Incorrect or missing occupation: " + occ)
  }
  return occ
}

const isSSN = (ssn: string): boolean => {
  console.log(ssn.length)
  if (ssn.length >= 10 && ssn.length < 12) {
    const [firstPart, secondPart] = ssn.split("-")

    const existsLetter = (numbers: string): boolean => {
      return numbers
        .split("")
        .reduce(
          (acc: boolean, curr: string) => acc || "0123456789".includes(curr),
          false
        )
    }

    return (
      !existsLetter(firstPart) && secondPart.length > 3 && secondPart.length < 5
    )
  }
  throw new Error("Inapproriate numbers of SSN")
}
const toNewPatientEntry = (object: unknown): NewPatientEntry => {
  if (!object || typeof object !== "object") {
    throw new Error("Incorrect or missing data")
  }
  if (
    "name" in object &&
    "gender" in object &&
    "occupation" in object &&
    "dateOfBirth" in object
  ) {
    const newPatient = {
      name: parseName(object.name),
      dateOfBirth: parseDate(object.dateOfBirth),
      occupation: parseOccupation(object.occupation),
      gender: parseGender(object.gender),
      entries: [],
    }
    if ("ssn" in object && isString(object.ssn) && isSSN(object.ssn)) {
      return {
        ...newPatient,

        ssn: object.ssn,
      }
    }
    return newPatient
  }
  throw new Error("Some fields are missing")
}

export const parseDiagnosisCodes = (
  diagnosisCodes: unknown
): Array<Diagnosis["code"]> => {
  if (!diagnosisCodes || typeof diagnosisCodes !== "object") {
    return [] as Array<Diagnosis["code"]>
  }
  return diagnosisCodes as Array<Diagnosis["code"]>
}

const parseDescription = (description: unknown): string => {
  if (!description || !isString(description)) {
    throw new Error("description field is missing")
  }
  return description
}
const parseSpecialist = (specialist: unknown): string => {
  if (!specialist || !isString(specialist)) {
    throw new Error("description field is missing")
  }
  return specialist
}

const isType = (type: string): boolean => {
  return ["HealthCheck", "Hospital", "OccupationalHealthcare"].includes(type)
}
const parseType = (type: unknown): string => {
  if (!type || !isString(type) || !isType(type)) {
    throw new Error(`Incorrect or missing type ${type}`)
  }
  return type
}

const isHealthCheckRating = (rating: number): rating is HealthCheckRating => {
  console.log("is", rating)
  console.log("health", Object.values(HealthCheckRating))
  console.log("check", Object.values(HealthCheckRating).includes(rating))
  return Object.values(HealthCheckRating).includes(rating)
}
const parseHealthCheckRating = (rating: unknown): HealthCheckRating => {
  if (typeof rating !== "number" || !isHealthCheckRating(rating)) {
    throw new Error("Value of Health Check Rating is not correct ")
  }
  return rating
}
const isDischarge = (object: object): object is Discharge => {
  if (
    !("date" in object) ||
    !("criteria" in object) ||
    !isString(object.date) ||
    !isString(object.criteria)
  ) {
    throw new Error("missing date or criteria fields in discharge")
  }

  return isDate(object.date) && isString(object.criteria)
}
const parseDischarge = (discharge: unknown): Discharge => {
  if (!discharge || typeof discharge !== "object" || !isDischarge(discharge)) {
    throw new Error("discharge field is required for Hospital Entry")
  }
  return discharge
}

const isSickLeave = (object: object): object is SickLeave => {
  if (!object || !("startDate" in object) || !("endDate" in object)) {
    throw new Error(`Incorrect or missing sickLeave field: ${object}`)
  }
  return (
    isString(object.startDate) &&
    isString(object.endDate) &&
    isDate(object.startDate) &&
    isDate(object.endDate)
  )
}
const parseSickLeave = (sickLeave: unknown): SickLeave => {
  if (!sickLeave || typeof sickLeave !== "object" || !isSickLeave(sickLeave)) {
    throw new Error("Incorrect or missing sickLeave fields")
  }
  return sickLeave
}

export const toNewEntry = (object: unknown): EntryWithoutId => {
  console.log(object)
  if (!object || typeof object !== "object") {
    throw new Error("Incorrect or missing data")
  }
  let newEntry = null
  if (
    "description" in object &&
    "date" in object &&
    "specialist" in object &&
    "type" in object
  ) {
    newEntry = {
      description: parseDescription(object.description),
      date: parseDate(object.date),
      specialist: parseSpecialist(object.specialist),
      type: parseType(object.type),
    }
    if ("diagnosisCodes" in object) {
      newEntry = {
        ...newEntry,
        diagnosisCodes: parseDiagnosisCodes(object.diagnosisCodes),
      }
    }
    switch (newEntry.type) {
      case "Hospital":
        if (!("discharge" in object)) {
          throw new Error("discharge is required for Hospital type")
        } else {
          newEntry = {
            ...newEntry,
            discharge: parseDischarge(object.discharge),
          }
          return newEntry as EntryWithoutId
        }
      case "OccupationalHealthcare":
        if ("employerName" in object && isString(object.employerName)) {
          newEntry = {
            ...newEntry,
            employerName: object.employerName,
          }
          if ("sickLeave" in object) {
            newEntry = {
              ...newEntry,
              sickLeave: parseSickLeave(object.sickLeave),
            }
          }
          return newEntry as EntryWithoutId
        } else {
          throw new Error(
            "EmployerName is required for Occupational Healthcare Check"
          )
        }
      case "HealthCheck":
        if (!("healthCheckRating" in object)) {
          throw new Error(
            "health check rating is required for HealthCheck type"
          )
        } else {
          newEntry = {
            ...newEntry,
            healthCheckRating: parseHealthCheckRating(object.healthCheckRating),
          }
          return newEntry as EntryWithoutId
        }
      default:
        throw new Error("Wrong type")
    }
  } else {
    throw new Error("Some required fields are missing")
  }
}

export default toNewPatientEntry
