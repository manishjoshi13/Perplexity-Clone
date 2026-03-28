import { createSlice } from "@reduxjs/toolkit";


export const chatSlice = createSlice({
  name: "chat",
  initialState: {
    chats: [],
    messages: [],
    currentChatId:null,
    loading: false,
    error: null,
    },
    reducers: {
        setChats: (state, action) => {
            state.chats = action.payload;
        },
        setMessages: (state, action) => {
            state.messages = action.payload;
        },
        addMessage: (state, action) => {
            if (!Array.isArray(state.messages)) {
                state.messages = [];
            }
            state.messages.push(...action.payload);
        },
        setCurrentChatId: (state, action) => {
            state.currentChatId = action.payload;
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
    },
});

export const { setChats,setCurrentChatId,setLoading,setError,setMessages,addMessage } = chatSlice.actions;

export default chatSlice.reducer;