/**
 * @author Harsh Shah
 */
import SendIcon from "@mui/icons-material/Send";
import { Box, FormControl, IconButton, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { sendChatMessage } from "../services/messaging-rest";

const ChatEditor = () => {
    const { id: conversation_id, person: other_person } = useSelector((state) => state.messages.activeChat);
    const [message, messageHandler] = useState("");
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        sendMessage(message);
    };

    const sendMessage = (message) => {
        if (message.length === 0 || message.length > 200) {
            return;
        }

        dispatch(sendChatMessage({ conversation_id, other_person, message, sender_user_id: JSON.parse(localStorage.getItem("user")).id }));
        messageHandler("");
    };

    return (
        <form style={{ width: "100%" }} onSubmit={handleSubmit}>
            <FormControl sx={{ width: "100%" }}>
                <TextField
                    fullWidth
                    error={message.length > 200 ? true : false}
                    id="chat-message-editor"
                    placeholder="Type your message here"
                    label="Message"
                    variant="outlined"
                    onChange={(e) => messageHandler(e.target.value)}
                    value={message}
                    helperText={
                        <Box component={"span"} display={"flex"} justifyContent={"space-between"}>
                            <Typography variant="span">{message.length > 200 ? "Maximum length of message is 200 characters" : ""}</Typography>
                            <Typography variant="span">{message.length + "/200"}</Typography>
                        </Box>
                    }
                    InputProps={{
                        endAdornment: (
                            <IconButton onClick={() => sendMessage(message)}>
                                <SendIcon />
                            </IconButton>
                        ),
                    }}
                />
            </FormControl>
        </form>
    );
};

export default ChatEditor;
