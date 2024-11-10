import "dotenv/config"
import express from "express" 
import cors from "cors"
import { PORT } from "./libs/env"
import userRouter from "./user/router"
const app = express()

app.use(cors())
app.use(express.json())

app.use("/api/v1/user",userRouter)

app.listen(PORT)