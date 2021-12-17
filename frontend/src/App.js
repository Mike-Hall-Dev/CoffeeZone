import React from "react";
import { BrowserRouter, } from "react-router-dom";
import { Container } from "react-bootstrap";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import Routes from "./components/Routes";


function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <main className="py-3">
        <Container>
          <Routes />
        </Container>
      </main>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
