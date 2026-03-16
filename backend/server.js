import app from './src/app.js'
import connectDB from './src/config/database.js'
import dotenv from 'dotenv'
import authRoutes from './src/routes/auth.routes.js'
import { errorHandler } from './src/middleware/errorHandler.js'
dotenv.config()

connectDB()
app.listen(3000,()=>{
    console.log("listening")
})


// Routes
app.use('/api/auth', authRoutes)
app.use(errorHandler)
