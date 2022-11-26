import { Box, Container, CssBaseline } from "@mui/material";
import "./App.css";
import Home from "./Components/Home/Home";

function App() {
  return (
    <div>
      <CssBaseline />
      <Container maxWidth="lg">
        <Box sx={{ bgcolor: "#cfe8fc", height: "100vh" }}>
          <Home />
        </Box>
      </Container>
    </div>
  );
}

export default App;
