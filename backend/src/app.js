import express from 'express'
import cors  from 'cors'
import cookieParser from 'cookie-parser'



let app=express()
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors({
    origin: process.env.CLIENT_URL || 'http://localhost:3000',
    credentials: true
}))
app.use(cookieParser())




export default app;