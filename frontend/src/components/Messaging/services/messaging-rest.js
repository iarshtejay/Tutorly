import { faker } from "@faker-js/faker";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchContactList = createAsyncThunk(
  "messages/contact",
  async () => {
    const status = [0, 1];

    return await new Promise((resolve) => {
      setTimeout(() => {
        resolve(
          Array.from({ length: 15 }, () => {
            return {
              id: faker.datatype.uuid(),
              name: faker.name.findName(),
              message: faker.random.words(3),
              status: status[Math.floor(Math.random() * status.length)],
            };
          })
        );
      }, 1000);
    });
  }
);

export const fetchChats = createAsyncThunk("messages/chat", async () => {
  const userIds = [1, 2];
  const messageLength = [3, 5, 7, 8, 9, 11];

  return await new Promise((resolve) => {
    setTimeout(() => {
      resolve(
        Array.from({ length: 5 }, () => {
          return {
            id: faker.datatype.uuid(),
            sender: userIds[Math.floor(Math.random() * userIds.length)],
            message: faker.random.words(
              messageLength[Math.floor(Math.random() * messageLength.length)]
            ),
            timestamp: faker.date.between(
              "2022-01-01T00:00:00.000Z",
              "2022-06-01T00:00:00.000Z"
            ),
          };
        })
          .sort((x, y) => x.timestamp.getTime() - y.timestamp.getTime())
          .map((itr) => {
            const timestamp = itr.timestamp.toLocaleString();
            return { ...itr, timestamp };
          })
      );
    }, 1000);
  });
});
