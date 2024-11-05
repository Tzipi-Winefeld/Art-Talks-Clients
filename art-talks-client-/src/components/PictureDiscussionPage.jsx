import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import { useParams } from "react-router-dom";
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  CircularProgress,
  Divider,
} from "@mui/material";
import { Send } from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import { fetchPictureById } from "../api";

const socket = io("http://localhost:3001");

const MainContainer = styled(Box)({
  padding: "20px",
  gap: "20px",
  maxWidth: "1200px",
  margin: "0 auto",
});

const ContentContainer = styled(Box)({
  display: "flex",
  gap: "20px",
  height: "500px",
  marginTop: "16px",
});

const ImageSection = styled(Box)({
  flex: "1",
  marginRight: "20px",
  display: "flex",
  flexDirection: "column",
});

const TitleRow = styled(Box)({
  display: "flex",
  alignItems: "baseline",
  gap: "12px",
  marginBottom: "16px",
});

const PictureTitle = styled(Typography)({
  fontWeight: 700,
  margin: 0,
});

const ChatSection = styled(Paper)({
  width: "300px",
  display: "flex",
  flexDirection: "column",
  height: "500px",
  backgroundColor: "#fff",
  borderRadius: "8px",
  boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
});

const ChatHeader = styled(Box)({
  padding: "15px",
  borderBottom: "1px solid #eee",
  backgroundColor: "#f5f5f5",
});

const ChatMessages = styled(Box)({
  flex: 1,
  overflowY: "auto",
  padding: "15px",
  display: "flex",
  flexDirection: "column",
  gap: "10px",
});

const MessageContainer = styled(Box)({
  marginBottom: "8px",
  display: "flex",
  gap: "4px",
  alignItems: "baseline",
});

const Username = styled(Typography)({
  fontWeight: "bold",
  fontSize: "14px",
  whiteSpace: "nowrap",
});

const MessageText = styled(Typography)({
  fontSize: "14px",
  color: "#333",
});

const ChatInputContainer = styled(Box)({
  padding: "15px",
  borderTop: "1px solid #eee",
  display: "flex",
  gap: "8px",
});

const ImageContainer = styled(Box)({
  height: "100%",
  position: "relative",
  overflow: "hidden",
  borderRadius: "8px",
});

const StyledImg = styled("img")({
  width: "100%",
  height: "100%",
  objectFit: "cover",
  borderRadius: "8px",
});

const Discussion = () => {
  const { id } = useParams();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [localUsername] = useState("John"); 
  const [selectedPicture, setSelectedPicture] = useState(null);

  useEffect(() => {
    socket.on("message", (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    const loadPicture = async () => {
      try {
        const picture = await fetchPictureById(id);
        setSelectedPicture(picture);
      } catch (error) {
        console.error("Error fetching picture:", error);
      }
    };

    loadPicture();

    return () => {
      socket.off("message");
    };
  }, [id]);

  const sendMessage = () => {
    if (input.trim()) {
      const message = {
        username: localUsername, // global name
        text: input,
      };
      socket.emit("message", message);
      setInput("");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  if (!selectedPicture) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <MainContainer>
      <TitleRow>
        <PictureTitle variant="h4" component="h1">
          {selectedPicture.name}
        </PictureTitle>
        <Typography variant="subtitle1" color="text.secondary">
          by {selectedPicture.artist}
        </Typography>
      </TitleRow>

      <ContentContainer>
        <ImageSection>
          <ImageContainer>
            <StyledImg src={selectedPicture.url} alt={selectedPicture.title} />
          </ImageContainer>
        </ImageSection>

        <ChatSection>
          <ChatHeader>
            <Typography variant="h6">Chat</Typography>
          </ChatHeader>
          <ChatMessages>
            {messages.map((msg, index) => (
              <MessageContainer key={index}>
                <Username>
                  {msg.username === localUsername ? "Me" : msg.username}:
                </Username>
                <MessageText>{msg.text}</MessageText>
              </MessageContainer>
            ))}
          </ChatMessages>
          <Divider />
          <ChatInputContainer>
            <TextField
              fullWidth
              size="small"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message here"
              variant="outlined"
            />
            <Button
              variant="contained"
              color="primary"
              onClick={sendMessage}
              disabled={!input.trim()}
              endIcon={<Send />}
            >
              Send
            </Button>
          </ChatInputContainer>
        </ChatSection>
      </ContentContainer>
    </MainContainer>
  );
};

export default Discussion;
