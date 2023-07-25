import express from "express"
import diaryRouter from "./routes/diaries"
import cors from "cors"

const app = express()
app.use(express.json())
app.use(cors())

app.get("/ping", (_req, res) => {
  return res.send("pong")
})

app.use("/api/diaries", diaryRouter)

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Serer running on ${PORT}`)
})
