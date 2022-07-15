/**
 * @author Harsh Shah
 */
import { createAsyncThunk } from "@reduxjs/toolkit";
import httpClient from "../../../lib/httpClient";
import { postMessage } from "../slice/MessageSlice";

// dispatch(addToContactList({userId1, userId2}))
export const addToContactList = createAsyncThunk("messages/add-contact", async (convo) => {
    return (await httpClient.post("/conversation", convo)).data;
});

// Integrated
export const fetchContactList = createAsyncThunk("messages/contact", async (userId) => {
    const status = [0, 1];
    return (await httpClient.get(`/conversation/user/${userId}`)).data;
});

export const fetchChats = createAsyncThunk("messages/chat", async (conversation_id) => {
    const status = [0, 1];

    return (await httpClient.get(`/messaging/${conversation_id}`)).data;
});

export const checkForNewMessage = createAsyncThunk("messages/new-chat", async (conversation_id) => {
    return (await httpClient.get(`/messaging/${conversation_id}`)).data;
});

export const sendChatMessage = createAsyncThunk("messages/post", async (payload, thunkAPI) => {
    const { message, conversation_id, sender_user_id, other_person, is_important } = payload;

    const receiver_user_id = other_person.user_id;

    const response = await httpClient.post("/messaging", {
        sender_user_id,
        receiver_user_id,
        conversation_id,
        is_important,
        message,
    });

    thunkAPI.dispatch(postMessage(response.data));
});


export const deleteConversation = createAsyncThunk("messages/delete-contact", async (payload, thunkAPI) => {
   


});
