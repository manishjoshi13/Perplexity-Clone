import express from 'express'
import cors  from 'cors'
import cookieParser from 'cookie-parser'
import morgan from 'morgan'
import dotenv from 'dotenv'
dotenv.config()



let app=express()
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
}))
app.use((req, res, next) => {
  res.set("Cache-Control", "no-store");
  next();
});
app.use(morgan('dev'))
app.use(cookieParser())



export default app;