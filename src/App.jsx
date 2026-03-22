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

export default function App() {
  return (
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
}