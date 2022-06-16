import { faker } from "@faker-js/faker";
import { createSlice, current } from "@reduxjs/toolkit";
import { fetchChats, fetchContactList } from "../services/messaging-rest";

const initialState = {
  contacts: {
    list: [],
    filteredList: [],
    isFetching: false,
  },
  chat: {
    list: [],
    isFetching: false,
  },
  activeChat: {
    id: null,
    person: {},
  },
};

const highlightText = (text, highlight) => {
  const parts = text.split(new RegExp(`(${highlight})`, "gi"));
  highlight = highlight.toLowerCase();

  return (
    <span>
      {parts.map((part, i) => (
        <span
          key={i}
          style={part.toLowerCase() === highlight ? { fontWeight: "bold" } : {}}
        >
          {part}
        </span>
      ))}
    </span>
  );
};

export const messageSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {
    setActiveChat: (state, action) => {
      state.activeChat.id = action.payload;
      const activeChatPerson = [...current(state.contacts.list)].filter(
        (person) => person.id === action.payload
      );
      state.activeChat.person =
        activeChatPerson && activeChatPerson.length === 1
          ? activeChatPerson[0]
          : {};
    },
    searchContact: (state, action) => {
      state.contacts.filteredList = [...current(state.contacts.list)]
        .filter((person) =>
          new RegExp(action.payload, "gi").test(person.name)
        )
        .map((person) => {
          const name = person.name;
          return { ...person, caption: highlightText(name, action.payload) };
        });
    },
    postMessage: (state, action) => {
      state.chat.list.push({
        id: faker.datatype.uuid(),
        sender: 1,
        message: action.payload,
        timestamp: new Date().toLocaleString()
      });
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchContactList.fulfilled, (state, action) => {
      state.contacts.list = action.payload;
      state.contacts.isFetching = false;
    });
    builder.addCase(fetchContactList.pending, (state) => {
      state.contacts.isFetching = true;
    });

    builder.addCase(fetchChats.fulfilled, (state, action) => {
      state.chat.list = action.payload;
      state.chat.isFetching = false;
    });
    builder.addCase(fetchChats.pending, (state) => {
      state.chat.isFetching = true;
    });
  },
});

export const { setActiveChat, postMessage, searchContact } =
  messageSlice.actions;

export default messageSlice.reducer;
