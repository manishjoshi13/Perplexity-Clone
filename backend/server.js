import app from './src/app.js'
import connectDB from './src/config/database.js'
import dotenv from 'dotenv'
import authRoutes from './src/routes/auth.routes.js'
import { errorHandler } from './src/middleware/errorHandler.js'
import http from 'http'
import { initializeSocketConnection } from './src/sockets/socket.js'
dotenv.config()

let httpServer=http.createServer(app)
initializeSocketConnection(httpServer)

connectDB()
httpServer.listen(3000,()=>{
    console.log("listening")
})


// Routes
app.use('/api/auth', authRoutes)
app.use(errorHandler)
