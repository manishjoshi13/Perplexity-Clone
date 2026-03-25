import {io} from 'socket.io-client'

export const initializeSocketConnection=()=>{
    const socket=io('http://localhost:3000',{
        withCredentials:true,
    })
    socket.on('connection',(socket)=>{
        console.log("Connected To socket.io Server")

    })
}