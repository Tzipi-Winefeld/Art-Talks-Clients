import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Container,
  TextField,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  InputAdornment,
  CardActionArea,
} from "@mui/material";
import { Search } from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import { fetchPictures } from "../api";

const StyledTextField = styled(TextField)({
  "& .MuiOutlinedInput-root": {
    borderRadius: "50px",
    backgroundColor: "#fff",
    "& fieldset": {
      borderColor: "#e0e0e0",
    },
    "&:hover fieldset": {
      borderColor: "#bdbdbd",
    },
  },
});

const StyledCard = styled(Card)({
  height: "100%",
  display: "flex",
  flexDirection: "column",
  transition: "transform 0.2s",
  "&:hover": {
    transform: "translateY(-4px)",
    boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
  },
});

const Gallery = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [pictures, setPictures] = useState([]);

  useEffect(() => {
    const loadPictures = async () => {
      try {
        const data = await fetchPictures();
        setPictures(data);
      } catch (error) {
        console.error("Error loading pictures:", error);
      }
    };

    loadPictures();
  }, []);

  const filteredPictures = pictures.filter(
    (pic) =>
      pic.artist.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pic.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handlePictureClick = (pictureId) => {
    navigate(`/discussion/${pictureId}`);
  };

  return (
    <Container maxWidth="xl">
      <Box sx={{ py: 4 }}>
        {/* Search Bar */}
        <Box sx={{ maxWidth: 600, mx: "auto", mb: 6 }}>
          <StyledTextField
            fullWidth
            placeholder="What are you looking for?"
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            }}
          />
        </Box>

        {/* Gallery Grid */}
        <Grid container spacing={3}>
          {filteredPictures.map((pic) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={pic.id}>
              <StyledCard>
                <CardActionArea onClick={() => handlePictureClick(pic.id)}>
                  <CardMedia
                    component="img"
                    height="200"
                    image={pic.url}
                    alt={pic.artist}
                    sx={{
                      objectFit: "cover",
                    }}
                    title={`resolution: ${pic.dimensions.width}x${
                      pic.dimensions.height
                    }, weight: ${Math.round(pic.size / 1024)}KB`}
                  />
                  <CardContent>
                    <Typography
                      variant="h6"
                      component="h3"
                      gutterBottom
                      sx={{
                        fontWeight: "bold",
                        fontSize: "1.1rem",
                      }}
                    >
                      {pic.name}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                      }}
                    >
                      {pic.artist}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.primary"
                      sx={{
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                      }}
                    >
                      {pic.description}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </StyledCard>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default Gallery;
