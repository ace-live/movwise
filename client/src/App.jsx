import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "@src/pages/home";
import Header from "@components/header";
import Footer from "@components/footer";
import Login from "@src/pages/login";
import PropertySelling from "./pages/propertySelling";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/property-selling" element={<PropertySelling />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
