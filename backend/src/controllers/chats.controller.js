import { asyncHandler } from '../utils/asyncHandler.js';
import { AppError } from '../utils/AppError.js';
import { generateRes, generateTitle } from '../services/ai.service.js';
import Chat from '../models/chat.model.js'
import Message from '../models/message.model.js'
import { AIMessage, HumanMessage } from 'langchain';


export const sendMessage=asyncHandler(async(req,res)=>{
    let {message,chatId}=req.body
    if(!message){
        throw new AppError("No Message Sent",400)
    }
    let chat;
    
    if(!chatId){
        let chatTitle=await generateTitle(message)
        chat=await Chat.create({title:chatTitle,user:req.userId})
    }
    else{
        chat =await Chat.findById(chatId)
    }
    
    
    let userMessage=await Message.create({chat:chat._id,content:message,role:"user"})
    let allMessages=await Message.find({chat:chat._id})
    let formatted=allMessages.map((msg)=>{
        if(msg.role==='user'){
            return new HumanMessage(msg.content)
        }
        if(msg.role==='ai'){
            return new AIMessage(msg.content)
        }
        return null;
    })


    let response=await generateRes(formatted)
    console.log(response)
    let aiMessage=await Message.create({chat:chat._id,content:response,role:"ai"})
    
    res.status(200).json({
        aiMessage,
        userMessage,
        chat,
    })
    

})

export const getAllChats = asyncHandler(async (req, res) => {
    const chats = await Chat.find({ user: req.userId }).sort({ createdAt: -1 });
    res.status(200).json({chats});
});

export const getChatMessages = asyncHandler(async (req, res) => {
    const { chatid } = req.params;
    
    const chat = await Chat.findOne({ _id: chatid, user: req.userId });
    if (!chat) {
        throw new AppError("Chat not found or unauthorized", 404);
    }
    
    const messages = await Message.find({ chat: chatid }).sort({ createdAt: 1 });
    res.status(200).json({messages});
});

export const deleteChat = asyncHandler(async (req, res) => {
    const { chatid } = req.params;

    const chat = await Chat.findOneAndDelete({ _id: chatid, user: req.userId });
    if (!chat) {
        throw new AppError("Chat not found or unauthorized", 404);
    }

    await Message.deleteMany({ chat: chatid });
    
    res.status(200).json({ message: "Chat deleted successfully" });
});