import { faker } from "@faker-js/faker";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchCourseList = createAsyncThunk(
  "discussion/courses",
  async () => {
    const status = [
      "https://picsum.photos/200",
      "https://source.unsplash.com/random",
    ];

    return await new Promise((resolve) => {
      setTimeout(() => {
        resolve(
          Array.from({ length: 15 }, () => {
            return {
              id: faker.datatype.uuid(),
              name: faker.random.words(2),
              description: faker.random.words(15),
              picture: status[Math.floor(Math.random() * status.length)],
            };
          })
        );
      }, 1000);
    });
  }
);

export const fetchForumPost = createAsyncThunk("discussion/forum", async () => {
  return await new Promise((resolve) => {
    setTimeout(() => {
      resolve(
        Array.from({ length: 5 }, () => {
          return {
            id: faker.datatype.uuid(),
            name: faker.name.findName() + " " + faker.name.lastName(),
            title: faker.random.words(15),
            message: faker.random.words(150),
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
