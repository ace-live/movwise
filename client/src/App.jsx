import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "@src/pages/home";
import Header from "@components/header";
import Footer from "@components/footer";
import Login from "@src/pages/login";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
