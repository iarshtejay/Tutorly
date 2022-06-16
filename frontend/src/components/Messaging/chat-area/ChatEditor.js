import SendIcon from "@mui/icons-material/Send";
import {
  Box,
  FormControl,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { postMessage } from "../slice/MessageSlice";

const ChatEditor = () => {
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

    dispatch(postMessage(message));
    messageHandler("");
  };

  return (
    <form style={{ width: "100%" }} onSubmit={handleSubmit}>
      <FormControl sx={{ width: "100%" }}>
        <TextField
          fullWidth
          error={message.length > 200 ? true : false}
          id="outlined-basic-1"
          placeholder="Type your message here"
          variant="outlined"
          onChange={(e) => messageHandler(e.target.value)}
          value={message}
          helperText={
            <Box component={"span"} display={"flex"} justifyContent={"space-between"}>
              <Typography variant="span">
                {message.length > 200
                  ? "Maximum length of message is 200 characters"
                  : ""}
              </Typography>
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
