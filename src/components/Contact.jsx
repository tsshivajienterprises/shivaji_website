import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { enquiriesApi } from "../api";
import { useSettings } from "../hooks/useSettings";

const inputCls =
  "w-full rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-3.5 text-sm text-white outline-none placeholder:text-white/30 transition-all duration-200 focus:border-[#D4AF37]/50 focus:bg-[#D4AF37]/[0.03] focus:ring-1 focus:ring-[#D4AF37]/20";

export default function Contact() {
  const [form, setForm] = useState({ name: "", phone: "", email: "", serviceInterest: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);
  const { settings } = useSettings();
  const locatorRef = useRef(null);

  useEffect(() => {
    const initMap = async () => {
      if (typeof customElements !== "undefined") {
        await customElements.whenDefined("gmpx-store-locator");
        if (locatorRef.current) {
          locatorRef.current.configureFromQuickBuilder({
            locations: [
              {
                title: "TS SHIVA JI ENTERPRISES",
                address1: "Villa-3, Dev Prime Villas Block-1",
                address2: "Patancheru, Telangana, India",
                coords: { lat: 17.5473889, lng: 78.2718854 },
                placeId: "ChIJ1TVjEfHIzy0RHVjzI111sjE",
              },
            ],
            mapOptions: {
              center: { lat: 17.5473889, lng: 78.2718854 },
              zoom: 17,
              mapTypeControl: false,
              streetViewControl: false,
              fullscreenControl: true,
              gestureHandling: "greedy",
              styles: [
                { elementType: "geometry", stylers: [{ color: "#0B1020" }] },
                { elementType: "labels.text.stroke", stylers: [{ color: "#0B1020" }] },
                { elementType: "labels.text.fill", stylers: [{ color: "#8a8a8a" }] },
                { featureType: "administrative.locality", elementType: "labels.text.fill", stylers: [{ color: "#d59563" }] },
                { featureType: "poi", elementType: "labels.text.fill", stylers: [{ color: "#D4AF37" }] },
                { featureType: "poi.park", elementType: "geometry", stylers: [{ color: "#111827" }] },
                { featureType: "poi.park", elementType: "labels.text.fill", stylers: [{ color: "#6b9a76" }] },
                { featureType: "road", elementType: "geometry", stylers: [{ color: "#111827" }] },
                { featureType: "road", elementType: "geometry.stroke", stylers: [{ color: "#212a37" }] },
                { featureType: "road", elementType: "labels.text.fill", stylers: [{ color: "#9ca5b3" }] },
                { featureType: "road.highway", elementType: "geometry", stylers: [{ color: "#D4AF37" }, { lightness: -40 }] },
                { featureType: "road.highway", elementType: "geometry.stroke", stylers: [{ color: "#0B1020" }] },
                { featureType: "transit", elementType: "geometry", stylers: [{ color: "#111827" }] },
                { featureType: "water", elementType: "geometry", stylers: [{ color: "#050810" }] },
                { featureType: "water", elementType: "labels.text.fill", stylers: [{ color: "#515c6d" }] },
              ],
            },
            mapsApiKey: "AIzaSyB41DRUbKWJHPxaFjMAwdrzWzbVKartNGg",
          });
        }
      }
    };
    initMap();
  }, []);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (error) setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await enquiriesApi.create({
        name: form.name,
        phone: form.phone,
        email: form.email,
        serviceInterest: form.serviceInterest,
        message: form.message,
      });

      setSubmitted(true);
      setForm({ name: "", phone: "", email: "", serviceInterest: "", message: "" });
      
      setTimeout(() => setSubmitted(false), 5000);
    } catch (err) {
      console.error('Enquiry submission failed:', err);
      setError(err.message || 'Failed to submit enquiry. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const contacts = [
    {
      label: "Address",
      value: settings.company_address || "TS SHIVA JI ENTERPRISES, Villa-3, Dev Prime Villas Block-1, Patancheru, Telangana, India",
      icon: "📍",
    },
    { label: "Phone", value: settings.company_phone || "+91 90001 64356", icon: "📞" },
    { label: "Email", value: settings.company_email || "tsshivajienterprises@gmail.com", icon: "✉️" },
  ];

  return (
    <section id="contact" className="relative overflow-hidden px-5 py-24 lg:px-10">
      <div className="pointer-events-none absolute right-0 top-0 h-[400px] w-[400px] rounded-full bg-[#D4AF37]/5 blur-[100px]" />

      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-start">
          
          {/* Left — Form */}
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7 }}
            className="rounded-[32px] border border-white/10 bg-white/[0.035] p-7 backdrop-blur-xl shadow-2xl lg:order-1"
          >
            <p className="mb-2 text-3xl font-black text-white">Contact Us</p>
            <p className="mb-8 text-sm text-white/60">Share your project requirements and our team will get in touch with you.</p>
            
            <div className="grid gap-4">
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Full Name *"
                className={inputCls}
                required
                disabled={loading}
              />
              <input
                type="tel"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="Phone *"
                className={inputCls}
                required
                disabled={loading}
              />
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Email *"
                className={inputCls}
                required
                disabled={loading}
              />
              <input
                type="text"
                name="serviceInterest"
                value={form.serviceInterest}
                onChange={handleChange}
                placeholder="Service Interest (e.g., Residential, Commercial)"
                className={inputCls}
                disabled={loading}
              />
              <textarea
                rows="5"
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="Project Details / Message *"
                className={inputCls + " resize-none"}
                required
                disabled={loading}
              />
              <button
                type="submit"
                disabled={loading}
                className="w-fit rounded-full bg-[#D4AF37] px-8 py-3 text-sm font-bold text-black shadow-[0_0_24px_rgba(212,175,55,0.3)] transition-all hover:scale-[1.02] hover:shadow-[0_0_40px_rgba(212,175,55,0.5)] active:scale-100 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Submitting...
                  </span>
                ) : (
                  'Submit'
                )}
              </button>
              {submitted && (
                <motion.p
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-2 text-sm text-[#D4AF37] flex items-center gap-2"
                >
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Thank you! Your enquiry has been submitted successfully. We'll get back to you soon.
                </motion.p>
              )}
              {error && (
                <motion.p
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-2 text-sm text-red-400 flex items-center gap-2"
                >
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                  {error}
                </motion.p>
              )}
            </div>
          </motion.form>

          {/* Right — Info & Map */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.65, delay: 0.1 }}
            className="lg:order-2"
          >
            <h2 className="mb-6 text-2xl font-black text-white">Office & Contact</h2>
            
            <div className="mb-8 space-y-4">
              {contacts.map((c) => (
                <div key={c.label} className="flex items-start gap-4">
                  <span className="mt-0.5 text-xl">{c.icon}</span>
                  <div>
                    <p className="text-sm font-bold text-white/80">{c.label === "Address" ? "TS SHIVA JI ENTERPRISES PVT LTD" : c.label}</p>
                    <p className="mt-1 text-sm leading-relaxed text-white/60 whitespace-pre-line">
                      {c.value.replace(", Patancheru", "\nPatancheru")}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <h3 className="mb-4 text-xl font-bold text-white">Location</h3>
            <div className="overflow-hidden rounded-2xl border border-white/10 shadow-[0_0_20px_rgba(0,0,0,0.5)] h-[400px] transition-all duration-500 hover:scale-[1.02] hover:shadow-[0_0_40px_rgba(212,175,55,0.25)] hover:border-[#D4AF37]/30 cursor-crosshair">
              <gmpx-store-locator
                ref={locatorRef}
                map-id="TSShivaJiMap"
                style={{ 
                  width: "100%", 
                  height: "100%", 
                  filter: "invert(92%) hue-rotate(180deg) brightness(110%) contrast(105%) sepia(10%) hue-rotate(340deg)",
                  transition: "filter 0.5s ease"
                }}
              ></gmpx-store-locator>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}