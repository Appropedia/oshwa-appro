import { createTheme, ThemeProvider } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import Certification from "./Pages/Certification";
import Eligibility from "./Pages/Eligibility";
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
          <Route exact path="/page/:pageName" element={<Certification />} />
          <Route exact path="/eligibilty" element={<Eligibility />} />
        </Routes>
    </ThemeProvider>
  );
}

export default App;
