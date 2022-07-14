import { faker } from "@faker-js/faker";
import { createAsyncThunk } from "@reduxjs/toolkit";
import httpClient from "../../../lib/httpClient";
import { postMessage } from "../slice/MessageSlice";

// Integrated
export const fetchContactList = createAsyncThunk(
  "messages/contact",
  async (userId = "62c5fb01e9c61bd62f27743c") => {
    const status = [0, 1];


    return (await httpClient.get(`/conversation/user/${userId}`)).data

    // return await new Promise((resolve) => {
    //   setTimeout(() => {
    //     resolve(
    //       Array.from({ length: 15 }, () => {
    //         return {
    //           id: faker.datatype.uuid(),
    //           name: faker.name.findName(),
    //           message: faker.random.words(3),
    //           status: status[Math.floor(Math.random() * status.length)],
    //         };
    //       })
    //     );
    //   }, 1000);
    // });
  }
);

export const fetchChats = createAsyncThunk("messages/chat", async (conversation_id) => {


  const status = [0, 1];


  return (await httpClient.get(`/messaging/${conversation_id}`)).data


  // const userIds = [1, 2];
  // const messageLength = [3, 5, 7, 8, 9, 11];

  // return await new Promise((resolve) => {
  //   setTimeout(() => {
  //     resolve(
  //       Array.from({ length: 5 }, () => {
  //         return {
  //           id: faker.datatype.uuid(),
  //           sender: userIds[Math.floor(Math.random() * userIds.length)],
  //           message: faker.random.words(
  //             messageLength[Math.floor(Math.random() * messageLength.length)]
  //           ),
  //           timestamp: faker.date.between(
  //             "2022-01-01T00:00:00.000Z",
  //             "2022-06-01T00:00:00.000Z"
  //           ),
  //         };
  //       })
  //         .sort((x, y) => x.timestamp.getTime() - y.timestamp.getTime())
  //         .map((itr) => {
  //           const timestamp = itr.timestamp.toLocaleString();
  //           return { ...itr, timestamp };
  //         })
  //     );
  //   }, 1000);
  // });
});


export const sendChatMessage = createAsyncThunk("messages/post", async (payload, thunkAPI) => {


  const { message, conversation_id, other_person  } = payload;



  const sender_user_id = "62c5fb01e9c61bd62f27743c"
  const receiver_user_id = other_person.user_id

  const response = await httpClient.post("/messaging", {
    sender_user_id,
    receiver_user_id,
    conversation_id,
    message
  })

  thunkAPI.dispatch(postMessage(response.data))

    // const userIds = [1, 2];
  // const messageLength = [3, 5, 7, 8, 9, 11];

  // return await new Promise((resolve) => {
  //   setTimeout(() => {
  //     resolve(
  //       Array.from({ length: 5 }, () => {
  //         return {
  //           id: faker.datatype.uuid(),
  //           sender: userIds[Math.floor(Math.random() * userIds.length)],
  //           message: faker.random.words(
  //             messageLength[Math.floor(Math.random() * messageLength.length)]
  //           ),
  //           timestamp: faker.date.between(
  //             "2022-01-01T00:00:00.000Z",
  //             "2022-06-01T00:00:00.000Z"
  //           ),
  //         };
  //       })
  //         .sort((x, y) => x.timestamp.getTime() - y.timestamp.getTime())
  //         .map((itr) => {
  //           const timestamp = itr.timestamp.toLocaleString();
  //           return { ...itr, timestamp };
  //         })
  //     );
  //   }, 1000);
  // });
})



