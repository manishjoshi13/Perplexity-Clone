import { configureStore } from "@reduxjs/toolkit";
import  authReducer  from "../features/auth/auth.slice";
import chatReducer from "../features/chats/chats.slice"

const store = configureStore({
  reducer: {
    auth:authReducer,
    chat:chatReducer
  },
});

export default store;