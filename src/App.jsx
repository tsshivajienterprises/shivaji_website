import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { AuthProvider } from "./context/AuthContext";
import api from "./services/api";
import ProtectedRoute from "./components/admin/ProtectedRoute";
import AdminLayout from "./layouts/AdminLayout";

// Public Components
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Stats from "./components/Stats";
import About from "./components/About";
import Services from "./components/Services";
import Projects from "./components/Projects";
import Gallery from "./components/Gallery";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import WhatsAppButton from "./components/WhatsAppButton";
import BuildingBackground from "./components/BuildingBackground";

// Admin Pages
import LoginPage from "./pages/admin/LoginPage";
import Dashboard from "./pages/admin/Dashboard";
import EnquiriesPage from "./pages/admin/EnquiriesPage";
import CallbacksPage from "./pages/admin/CallbacksPage";
import ProjectManagement from "./pages/admin/ProjectManagement";
import GalleryManagement from "./pages/admin/GalleryManagement";
import SettingsPage from "./pages/admin/SettingsPage";

const PublicLayout = () => (
  <div className="relative min-h-screen bg-[#0B1020] text-white">
    <BuildingBackground />
    <div className="relative z-10">
      <Navbar />
      <Hero />
      <Stats />
      <About />
      <Services />
      <Projects />
      <Gallery />
      <Contact />
      <Footer />
    </div>
    <WhatsAppButton />
  </div>
);

export default function App() {
  useEffect(() => {
    const trackVisit = async () => {
      try {
        await api.post('/visits/increment');
      } catch (err) {
        console.error("Failed to track visit", err);
      }
    };
    trackVisit();
  }, []);

  return (
    <AuthProvider>
      <Routes>
        {/* Public Site */}
        <Route path="/" element={<PublicLayout />} />

        {/* Admin Flow */}
        <Route path="/admin/login" element={<LoginPage />} />
        
        <Route element={<ProtectedRoute />}>
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="enquiries" element={<EnquiriesPage />} />
            <Route path="callbacks" element={<CallbacksPage />} />
            <Route path="projects" element={<ProjectManagement />} />
            <Route path="gallery" element={<GalleryManagement />} />
            <Route path="settings" element={<SettingsPage />} />
          </Route>
        </Route>
      </Routes>
    </AuthProvider>
  );
}