
import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import authroutes from './routes/auth.routes.js'
import userroutes from './routes/user.route.js'
import messageroutes from './routes/message.route.js'
import { conectDB } from './DB/dbConnection.js'
import {app, server} from './socket/socket.js'

dotenv.config()

conectDB()
const port=process.env.VITE_BACKPORT||5000

app.use(express.json())
app.use(cookieParser())
server.listen(port,()=>console.log(`server run on ${port}`))


app.use("/api/auth",authroutes)
app.use("/api/message",messageroutes)
app.use("/api/user",userroutes)
 app.get("/",(req,res,next)=>{
res.send("hello")
 })

