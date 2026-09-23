import express from "express";

import cors from "cors"
import cookieParser from "cookie-parser"

const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true 
}))

app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(express.static("public"))
app.use(cookieParser())

import userRouter from './routes/user.route.js'
import memberRouter from './routes/member.route.js'
import paymentRouter from './routes/payment.route.js'

app.use("/api/v1/users", userRouter)
app.use("/api/v1/members", memberRouter)
app.use("/payment", paymentRouter)

app.get("/", (req, res) => {
    res.send("Welcome to GymOS API")
})

export { app };