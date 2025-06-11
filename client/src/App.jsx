import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "@src/pages/home";
import Header from "@components/header";
import Footer from "@components/footer";
import Login from "@src/pages/login";
import PropertySelling from "./pages/propertySelling";
import { AuthProvider } from "@api/authContext"; // Ensure this path is correct
import DisputeDashboard from "@src/pages/disputedashboard";
import { disputes } from "./data/mockData";
import DisputeDetail from "@src/pages/disputedetail"; // Ensure this path is correct

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/property-selling" element={<PropertySelling />} />
      </Routes>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dispute" element={<DisputeDashboard disputes={disputes} />} />
          <Route path="/dispute/:disputeId" element={<DisputeDetail disputes={disputes} />} />
          {/* Add more routes as needed */} 
        </Routes>
      </AuthProvider>
      <Footer />
    </>
  );
}

export default App;
