import { Box, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import { useEffect, useRef } from "react";

const ChatMessages = ({ messages }) => {
  const isScrollNotAtBottom = (element) => {
    return element
      ? element.scrollHeight - Math.round(element.scrollTop) !==
          element.clientHeight
      : false;
  };

  const scrollToBottom = (element, smoothly = false) => {
    element.scrollTo({
      top: element.scrollHeight,
      behavior: smoothly ? "smooth" : "auto",
    });
  };

  useEffect(() => {
    if (!messageContainer.current) {
      return;
    }

    if (isScrollNotAtBottom(messageContainer.current)) {
      scrollToBottom(messageContainer.current, true);
    }
  }, [messages]);

  const messageContainer = useRef(null);

  return (
    <Box
      ref={messageContainer}
      m={2}
      sx={{
        height: "94%",
        maxHeight: "94%",
        overflow: "auto",
      }}
    >
      {messages.map((item) => (
        <Box
          display={"flex"}
          flexDirection={"column"}
          my={1}
          mr={item.sender === 1 ? 1 : 0}
          alignItems={item.sender === 1 ? "end" : "start"}
          key={item.id}
        >
          <Typography
            maxWidth={"45%"}
            bgcolor={item.sender === 1 ? grey[200] : grey[800]}
            color={item.sender === 1 ? "black" : "white"}
            borderRadius={"10px"}
            textAlign={"left"}
            p={2}
            variant={"span"}
            sx={{
              overflowWrap: "break-word",
              wordWrap: "break-word",
              hyphens: "auto",
            }}
          >
            {item.message}
          </Typography>
          <Typography
            maxWidth={"45%"}
            color={grey[500]}
            variant={"span"}
            fontSize={"0.7rem"}
            mx={"5px"}
            mt={"2px"}
          >
            {item.timestamp}
          </Typography>
        </Box>
      ))}
    </Box>
  );
};

export default ChatMessages;
