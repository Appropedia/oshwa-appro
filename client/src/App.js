import { createTheme, ThemeProvider } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import Certify from "./Pages/Certify";
import Validate from "./Pages/Validate";
import Welcome from "./Pages/Welcome";
import Success from "./Pages/Success";
import Failure from "./Pages/Failure";

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
        <Route path="/" element={<Welcome />} />
        <Route exact path="/certify/:pageName" element={<Certify />} />
        <Route exact path="/validate/:pageName" element={<Validate />} />
        <Route exact path="/success" element={<Success />} />
        <Route exact path="/failure" element={<Failure />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
