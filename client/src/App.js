import { Container, createTheme, ThemeProvider } from "@mui/material";
import Button from "@mui/material/Button";
import { Route, Routes, useParams } from "react-router-dom";
import Certification from "./Pages/Certification";
import Eligibility from "./Pages/Eligibility";

const theme = createTheme({
  palette: {
    primary: {
      main: "#333333",
    },
  },
  typography: {
    fontFamily: ["Archivo", "Roboto", "sans-serif"].join(","),
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
