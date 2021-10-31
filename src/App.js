import { Routes } from "./Routes";
import { BrowserRouter as Router } from "react-router-dom";
import { Container, Divider } from "@mui/material";
import { GolbalProvider } from "./context/GlobalState";
import { Header } from "./components/header/Header";
import NotificationAlert from "./components/notificationAlert/NotificationAlert";

function App() {
  return (
    <GolbalProvider>
      <Header />
      <Divider />
      <Container maxWidth="md">
        <Router>
          <Routes />
        </Router>
      </Container>
      <NotificationAlert />
    </GolbalProvider>
  );
}

export default App;
