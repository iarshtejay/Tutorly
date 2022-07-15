/**
 * @author Harsh Shah
 */
import { faker } from "@faker-js/faker";
import { createAsyncThunk } from "@reduxjs/toolkit";
import httpClient from "../../../lib/httpClient";

export const createCourseDiscussion = createAsyncThunk("discussion/create", async (course_id) => {
    return (
        await httpClient.post("/forum", {
            course_id,
        })
    ).data;
});

export const fetchCourseList = createAsyncThunk("discussion/courses", async (user_id) => {
    const forums = (
        await httpClient.get("/forum", {
            params: { user_id },
        })
    ).data;

    return forums.map((f) => {
        const { _id: id, course_id: course } = f;
        const { _id: course_id, name, description, imageURL: picture } = course;
        return {
            id,
            course_id,
            name,
            description,
            picture,
        };
    });

    // const status = ["https://picsum.photos/200", "https://source.unsplash.com/random"];

    // return await new Promise((resolve) => {
    //     setTimeout(() => {
    //         resolve(
    //             Array.from({ length: 15 }, () => {
    //                 return {
    //                     id: faker.datatype.uuid(),
    //                     name: faker.random.words(2),
    //                     description: faker.random.words(15),
    //                     picture: status[Math.floor(Math.random() * status.length)],
    //                 };
    //             })
    //         );
    //     }, 1000);
    // });
});

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
                        timestamp: faker.date.between("2022-01-01T00:00:00.000Z", "2022-06-01T00:00:00.000Z"),
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

export const fetchPostDetails = createAsyncThunk("discussion/post", async () => {
    return await new Promise((resolve) => {
        setTimeout(() => {
            const data = {
                id: faker.datatype.uuid(),
                name: faker.name.findName() + " " + faker.name.lastName(),
                title: faker.lorem.words(15),
                message: faker.random.words(150),
                description: faker.random.words(150),
                timestamp: faker.date.between("2022-01-01T00:00:00.000Z", "2022-06-01T00:00:00.000Z"),
            };

            const responses = Array.from({ length: 5 }, () => {
                return {
                    id: faker.datatype.uuid(),
                    name: faker.name.findName() + " " + faker.name.lastName(),
                    title: faker.lorem.words(15),
                    message: faker.random.words(150),
                    description: faker.random.words(150),
                    timestamp: faker.date.between("2022-01-01T00:00:00.000Z", "2022-06-01T00:00:00.000Z"),
                };
            });

            resolve({ data, responses });
        }, 1000);
    });
});
