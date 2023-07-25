import express from "express"
const cors = require("cors")

import diagnoseRouter from "./src/routes/diagnoses"
import patientsRouter from "./src/routes/patients"
const app = express()
app.use(express.json())
app.use(cors())

app.get("/api/ping", (_req, res) => {
  return res.send("pong")
})
app.use("/api/diagnoses", diagnoseRouter)
app.use("/api/patients", patientsRouter)

const PORT = 3001
app.listen(PORT, () => console.log(`Server running on ${PORT}`))
