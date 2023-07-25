import express = require("express")
import { calculateBmi } from "./bmiCalculator"
import { calculateExercises } from "./exerciseCalculator"
const app = express()
app.use(express.json())

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack")
})

app.get("/bmi", (req, res) => {
  const height = Number(req.query.height)
  const weight = Number(req.query.weight)

  if (isNaN(height) || isNaN(weight) || height < 0 || weight < 0) {
    return res.status(400).json({ error: "malformatted parameters" })
  }
  const bmi = calculateBmi(height, weight)
  return res.send({
    height,
    weight,
    bmi,
  })
})

app.post("/exercises", (req, res) => {
  console.log(console.log(req.body))
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const daily_exercises = req.body.daily_exercises
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const target = req.body.target
  console.log(daily_exercises, target, typeof target, typeof daily_exercises)

  if (!daily_exercises || !target) {
    return res.status(400).json({ error: "parameters missing" })
  }
  const numberTarget = Number(target)
  const existingNaNs = daily_exercises.reduce(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (acc: boolean, curr: number) => isNaN(curr) || acc,
    false
  )

  if (isNaN(numberTarget) || existingNaNs) {
    return res.status(400).json({ error: "malformatted parameters" })
  }

  const result = calculateExercises(daily_exercises as number[], numberTarget)
  return res.send(result)
})

const PORT = 3002
app.listen(PORT, () => console.log(`server running on ${PORT}`))
