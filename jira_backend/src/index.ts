import "dotenv/config"
import express from "express" 
import cors from "cors"
import { PORT } from "./libs/env"
import userRouter from "./user/router"
import orgRouter from "./organizations/router"
const app = express()


app.use(cors())
app.use(express.json())

app.use("/api/v1/user",userRouter)
app.use("/api/v1/organizations",orgRouter)

app.listen(PORT)