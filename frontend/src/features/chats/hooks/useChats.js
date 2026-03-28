import { initializeSocketConnection } from "../service/chat.socket";
import { sendMessage as sendMsgApi, getChatMessages as getChatMsgsApi, getChats as getChatsApi, deleteChat as deleteChatApi } from "../service/chats.api";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setChats, setError, setCurrentChatId, setMessages, addMessage } from "../chats.slice";

export default function useChats() {
    const dispatch = useDispatch();
    const { chats, currentChatId, loading, error,messages } = useSelector((state) => state.chat);

    const handleGetChats = async () => {
        dispatch(setLoading(true));
        dispatch(setError(null))
        try {
            const data = await getChatsApi();
            dispatch(setChats(data.chats));
            dispatch(setError(null));
            return data;
        } catch (err) {
            const errMsg = err.response?.data?.message || "Failed to fetch chats";
            dispatch(setError(errMsg));
            return [];
        } finally {
            dispatch(setLoading(false));
        }
    };

    const handleGetChatMessages = async (chatId) => {
        dispatch(setLoading(true));
        dispatch(setError(null))
        try {
            const data = await getChatMsgsApi(chatId);
            dispatch(setError(null));
            dispatch(setMessages(data.messages));
            return data;
        } catch (err) {
            const errMsg = err.response?.data?.message || "Failed to fetch messages";
            dispatch(setError(errMsg));
            return [];
        } finally {
            dispatch(setLoading(false));
        }
    };

    const handleSendMessage = async (message,chatId) => {
        // Optimistic UI update
        dispatch(addMessage([{
            _id: `temp-${Date.now()}`,
            role: "user",
            content: message,
            createdAt: new Date().toISOString()
        }]));

        dispatch(setLoading(true));
        dispatch(setError(null))
        try {
            const data = await sendMsgApi( message,chatId);
            // After sending a message, it might create a new chat, so refetch chats
            if(!chatId){
                await handleGetChats();
                dispatch(setCurrentChatId(data.chat._id));
                await handleGetChatMessages(data.chat._id);
            }else{
                await handleGetChatMessages(chatId);
            }
            dispatch(setError(null));
            return data;
        } catch (err) {
            const errMsg = err.response?.data?.message || "Failed to send message";
            dispatch(setError(errMsg));
            throw err;
        } finally {
            dispatch(setLoading(false));
        }
    };

    const handleDeleteChat = async (chatId) => {
        dispatch(setLoading(true));
        dispatch(setError(null))
        try {
            await deleteChatApi(chatId);
            // Re-fetch chats after deletion to update the UI
            await handleGetChats();
            if (currentChatId === chatId) {
                dispatch(setCurrentChatId(null));
            }
            dispatch(setError(null));
            return true;
        } catch (err) {
            const errMsg = err.response?.data?.message || "Failed to delete chat";
            dispatch(setError(errMsg));
            return false;
        } finally {
            dispatch(setLoading(false));
        }
    };

    const handleSetCurrentChat = (chatId) => {
        dispatch(setError(null))
        dispatch(setCurrentChatId(chatId));
    };

    return {
        chats,
        messages,
        currentChatId,
        loading,
        error,
        initializeSocketConnection,
        handleGetChats,
        handleGetChatMessages,
        handleSendMessage,
        handleDeleteChat,
        handleSetCurrentChat
    };
}