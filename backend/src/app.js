import express from "express";
import cookieParser from "cookie-parser";

const app = express()

app.use(express.json({limit: `10kb`}))
app.use(express.urlencoded({ extended: true, limit: `10kb` }))
app.use(cookieParser())


import authRouter from "./routes/auth.routes.js"

app.use("/api/v1/auth", authRouter)

export default app