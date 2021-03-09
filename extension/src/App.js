import Header from "./components/Header";
import styled from "styled-components";
import { useState } from "react";
import Nav from "./components/Nav";
import Cart from "./pages/Cart";
import Home from "./pages/Home";
import Settings from "./pages/Settings";

const AppContainer = styled.div`
  width: 315px;
  height: 558px;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.2);
  border-radius: 5px;
`;

function App() {
  const [currentPage, setCurrentPage] = useState("Home");

  return (
    <AppContainer className="flex flex-col justify-between relative">
      <Header />
      {currentPage === "Home" ? <Home /> : null}
      {currentPage === "Settings" ? <Settings /> : null}
      {currentPage === "Cart" ? <Cart /> : null}
      <Nav setCurrentPage={setCurrentPage} currentPage={currentPage} />
    </AppContainer>
  );
}

export default App;
