import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";

const inputCls =
  "w-full rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-3.5 text-sm text-white outline-none placeholder:text-white/30 transition-all duration-200 focus:border-[#D4AF37]/50 focus:bg-[#D4AF37]/[0.03] focus:ring-1 focus:ring-[#D4AF37]/20";

export default function Contact() {
  const [form, setForm] = useState({ name: "", phone: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
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

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    const subject = `Project Enquiry from ${form.name || "Website Visitor"}`;
    const body = `Name: ${form.name}\nPhone: ${form.phone}\nEmail: ${form.email}\n\nProject Details:\n${form.message}`;
    window.location.href = `mailto:tsshivajienterprisespvtltd@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  const contacts = [
    {
      label: "Address",
      value: "TS SHIVA JI ENTERPRISES, Villa-3, Dev Prime Villas Block-1, Patancheru, Telangana, India",
      icon: "📍",
    },
    { label: "Phone", value: "+91 90001 64356", icon: "📞" },
    { label: "Email", value: "tsshivajienterprises@gmail.com", icon: "✉️" },
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
              />
              <input
                type="tel"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="Phone *"
                className={inputCls}
                required
              />
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Email *"
                className={inputCls}
                required
              />
              <textarea
                rows="5"
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="Project Details / Message *"
                className={inputCls + " resize-none"}
                required
              />
              <button
                type="submit"
                className="w-fit rounded-full bg-[#D4AF37] px-8 py-3 text-sm font-bold text-black shadow-[0_0_24px_rgba(212,175,55,0.3)] transition-all hover:scale-[1.02] hover:shadow-[0_0_40px_rgba(212,175,55,0.5)] active:scale-100"
              >
                Submit
              </button>
              {submitted && (
                <motion.p
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-2 text-sm text-[#D4AF37]"
                >
                  ✓ Your email client has been opened.
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