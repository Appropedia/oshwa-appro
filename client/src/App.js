import { createTheme, ThemeProvider } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import Certify from "./Pages/Certify";
import Validate from "./Pages/Validate";
import "./index.css";

const theme = createTheme({
  palette: {
    primary: {
      main: "#333333",
    },
  },
  typography: {
    fontFamily: ["Arial", "sans-serif"].join(","),
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
        <Routes>
          <Route exact path="/certify/:pageName" element={<Certify />} />
          <Route exact path="/validate/:pageName" element={<Validate />} />
        </Routes>
    </ThemeProvider>
  );
}

export default App;
