import { Box, Typography } from "@mui/material";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div className="App">
      <Navbar/>
      <Box>
        <Typography variant="h3" align="center">
          Selamat datang username
        </Typography>
      </Box>
    </div>
  );
}

export default App;
