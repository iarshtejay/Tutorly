// import io from "socket.io-client";
// // import { store } from "./store";
// // import { postMessage } from "./components/Messaging/slice/MessageSlice";

// const socket = io(process.env.REACT_APP_BACKEND_BASE_URL, {
//   reconnection: false,
//   autoConnect: false,
// });

// export const openSocket = () => {
//    socket.connect();
// };

// export const sendEvent = async (name, data) => {
//   socket.emit(name, data);
// };

// // // socket.on("add-online-user", (id) => {
// // // //   store.dispatch(addOnlineUser(id));
// // // });

// // // socket.on("remove-offline-user", (id) => {
// // // //   store.dispatch(removeOfflineUser(id));
// // // });

// socket.on("new-message", (data) => {
//   console.log(data)
//     // const appState = store.getState();
//     // store.dispatch(postMessage(data))
// });


// export default socket;
