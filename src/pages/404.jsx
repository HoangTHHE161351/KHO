import { Box, Button, Container, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { PathConstants } from "src/const";
import NotFoundImage from "src/assets/images/not-found.svg";

export default function NotFound() {
  const navigate = useNavigate();
  return (
    <Container>
      <Box
        sx={{
          py: 5,
          maxWidth: 480,
          mx: "auto",
          display: "flex",
          minHeight: "100vh",
          textAlign: "center",
          alignItems: "center",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Typography variant="h3" sx={{ mb: 3 }}>
          Sorry, page not found!
        </Typography>

        <Typography sx={{ color: "text.secondary" }}>
          Sorry, we couldn’t find the page you’re looking for. Perhaps you’ve
          mistyped the URL? Be sure to check your spelling.
        </Typography>
        <Box
          component={"img"}
          src={NotFoundImage}
          sx={{
            mx: "auto",
            height: 260,
            my: { xs: 5, sm: 10 },
          }}
        />

        <Button
          size="large"
          variant="contained"
          onClick={() => navigate(PathConstants.ROOT)}
        >
          Go to Home
        </Button>
      </Box>
    </Container>
  );
}
