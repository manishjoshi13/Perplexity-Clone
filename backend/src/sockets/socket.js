import {Server} from 'socket.io'
import  'dotenv/config';


let io;
export const initializeSocketConnection=(httpServer)=>{
    io=new Server(httpServer,{
        cors:{
            origin:process.env.FRONTEND_URL,
            credentials:true
        }
    })
    console.log("Socket.io server is running")
    io.on('connection',(socket)=>{
        console.log("Device Connected: "+socket.id)
    })
}

export function getIO(){
    if(!io){
        console.log("Socket io Not initialized")
    }
    return io
}