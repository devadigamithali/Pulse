import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import NavBar from "./components/NavBar";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/Home";
import Festivals from "./pages/Festivals";
import Marketplace from "./pages/Marketplace";
import Activities from "./pages/Activities";
import MovingGuide from "./pages/MovingGuide";
import VisaInfo from "./pages/VisaInfo";
import FoodGuide from "./pages/FoodGuide";
import Weather from "./pages/Weather";
import News from "./pages/News";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Saved from "./pages/Saved";
import ArticleDetail from "./pages/ArticleDetail";
import Discussions from "./pages/Discussions";
import ThreadDetail from "./pages/ThreadDetail";
import "./App.css";

export default function App() {
  return (
    <AuthProvider>
      <NavBar />
      <div className="page">
        <Routes>
          <Route path="/"             element={<Home />} />
          <Route path="/festivals"    element={<Festivals />} />
          <Route path="/marketplace"  element={<Marketplace />} />
          <Route path="/activities"   element={<Activities />} />
          <Route path="/moving-guide" element={<MovingGuide />} />
          <Route path="/visa-info"    element={<VisaInfo />} />
          <Route path="/food-guide"   element={<FoodGuide />} />
          <Route path="/weather"      element={<Weather />} />
          <Route path="/news"         element={<News />} />
          <Route path="/login"        element={<Login />} />
          <Route path="/register"     element={<Register />} />
          <Route path="/saved"          element={<ProtectedRoute><Saved /></ProtectedRoute>} />
          <Route path="/article/:id"   element={<ArticleDetail />} />
          <Route path="/discussions"  element={<Discussions />} />
          <Route path="/thread/:id"   element={<ThreadDetail />} />
        </Routes>
      </div>
    </AuthProvider>
  );
}
