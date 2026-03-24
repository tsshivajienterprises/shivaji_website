import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone } from "lucide-react";
import CallbackModal from "./CallbackModal";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Projects", href: "#projects" },
  { label: "Gallery", href: "#gallery" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isCallbackOpen, setIsCallbackOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLinkClick = () => setOpen(false);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-white/10 bg-[#0B1020]/90 shadow-2xl backdrop-blur-2xl"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-10">
        {/* Logo */}
        <a href="#home" className="flex items-center gap-3" onClick={handleLinkClick}>
          <div className="rounded-xl border border-[#D4AF37]/20 bg-[#D4AF37]/5 px-3 py-2 backdrop-blur">
            <img
              src="/logo.png"
              alt="TS Shiva Ji Enterprises Logo"
              className="h-9 object-contain"
            />
          </div>
          <div className="leading-none">
            <p className="text-sm font-black tracking-wider text-white">TS SHIVA JI</p>
            <p className="text-[10px] tracking-[0.22em] text-[#D4AF37]">ENTERPRICES PVT LTD</p>
          </div>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-8 text-sm font-medium text-white/75 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="relative py-1 transition-colors duration-200 hover:text-[#D4AF37] after:absolute after:bottom-0 after:left-0 after:h-[1.5px] after:w-0 after:bg-[#D4AF37] after:transition-all after:duration-300 hover:after:w-full"
            >
              {link.label}
            </a>
          ))}
          <button
            onClick={() => setIsCallbackOpen(true)}
            className="flex items-center gap-2 py-1 transition-colors duration-200 hover:text-[#D4AF37]"
          >
            <Phone size={16} />
            Callback
          </button>
        </nav>

        {/* Desktop CTA */}
        <a
          href="#contact"
          className="hidden rounded-full border border-[#D4AF37]/40 bg-[#D4AF37]/10 px-5 py-2 text-sm font-semibold text-[#D4AF37] backdrop-blur transition duration-200 hover:bg-[#D4AF37] hover:text-black md:inline-flex"
        >
          Discuss Project
        </a>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setOpen((prev) => !prev)}
          className="flex flex-col gap-[5px] p-2 md:hidden"
          aria-label="Toggle menu"
        >
          <motion.span
            animate={open ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.25 }}
            className="block h-[2px] w-6 rounded-full bg-white origin-center"
          />
          <motion.span
            animate={open ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.2 }}
            className="block h-[2px] w-6 rounded-full bg-white origin-center"
          />
          <motion.span
            animate={open ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.25 }}
            className="block h-[2px] w-6 rounded-full bg-white origin-center"
          />
        </button>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden border-t border-white/10 bg-[#0B1020]/95 backdrop-blur-2xl md:hidden"
          >
            <nav className="flex flex-col gap-1 px-5 py-4">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={handleLinkClick}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06, duration: 0.25 }}
                  className="rounded-xl px-4 py-3 text-sm font-medium text-white/80 transition hover:bg-white/5 hover:text-[#D4AF37]"
                >
                  {link.label}
                </motion.a>
              ))}
              <motion.a
                href="#contact"
                onClick={handleLinkClick}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35, duration: 0.25 }}
                className="mt-3 rounded-full bg-[#D4AF37] py-3 text-center text-sm font-bold text-black"
              >
                Discuss Project
              </motion.a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      <CallbackModal 
        isOpen={isCallbackOpen} 
        onClose={() => setIsCallbackOpen(false)} 
      />
    </header>
  );
}