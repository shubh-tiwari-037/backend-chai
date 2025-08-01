import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

const app = express()

app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials: true,
}))

app.use(express.json({limit : "16kb"}))
app.use(express.static("public"))
app.use(express.urlencoded({extended: true, limit:"16kb"}))
app.use(cookieParser())

// routes import
import userRouter from "./routes/user.routes.js"  //userRouter name nahi h main page me router h par dono name se chalta h server

// routes declaration
app.use("/api/v1/users",userRouter)

// http://localhost:8000/api/v1/users/register
// ye api ka link banega aur users ke aage jis route me jayenge uska name aayega

export {app};