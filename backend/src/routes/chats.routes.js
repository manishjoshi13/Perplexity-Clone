import express from 'express'
import { authenticateToken } from '../middleware/auth.middleware.js'
import { sendMessage, getAllChats, getChatMessages, deleteChat } from '../controllers/chats.controller.js'



let router=express.Router()

router.post('/message',authenticateToken,sendMessage)
router.get('/', authenticateToken, getAllChats)
router.get('/:chatid/message', authenticateToken, getChatMessages)
router.delete('/delete/:chatid', authenticateToken, deleteChat)

export default router