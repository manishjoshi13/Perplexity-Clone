import axios from 'axios'

let api = axios.create({
    baseURL:"http://localhost:3000",
    withCredentials:true
})

export const sendMessage = async(message,chatId) => {
    let response = await api.post('/api/chats/message', { chatId, message  });
    return response.data;
}

export const getChats = async() => {
    let response = await api.get('/api/chats/');
    return response.data;
}

export const getChatMessages = async(chatId) => {
    let response = await api.get(`/api/chats/${chatId}/message`);
    return response.data;
}

export const deleteChat = async(chatId) => {
    // Route in Express is /delete/:chatid
    let response = await api.delete(`/api/chats/delete/${chatId}`);
    return response.data;
}