import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import thunk from "redux-thunk";
import discussionReducer from "../components/Discussion/slice/DiscussionSlice";
import messageReducer from "../components/Messaging/slice/MessageSlice";
import appReducer from "./slice/appSlice";

export const store = configureStore({
  reducer: {
    messages: messageReducer,
    discussion: discussionReducer,
    app: appReducer
  },
  middleware: [thunk, logger],
});
