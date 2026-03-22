import { motion } from "framer-motion";
import { useState } from "react";

const inputCls =
  "w-full rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-3.5 text-sm text-white outline-none placeholder:text-white/30 transition-all duration-200 focus:border-[#D4AF37]/50 focus:bg-[#D4AF37]/[0.03] focus:ring-1 focus:ring-[#D4AF37]/20";

export default function Contact() {
  const [form, setForm] = useState({ name: "", phone: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

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
    { label: "Phone", value: "+91 90590 44443", icon: "📞" },
    { label: "Email", value: "tsshivajienterprisespvtltd@gmail.com", icon: "✉️" },
    { label: "Location", value: "Hyderabad / Sangareddy, Telangana", icon: "📍" },
  ];

  return (
    <section id="contact" className="relative overflow-hidden px-5 py-24 lg:px-10">
      <div className="pointer-events-none absolute left-0 bottom-0 h-[400px] w-[400px] rounded-full bg-[#D4AF37]/5 blur-[100px]" />

      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left — Info */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.65 }}
          >
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.25em] text-[#D4AF37]">
              Contact
            </p>
            <h2 className="text-4xl font-black text-white md:text-5xl">
              Let's talk about your <br />
              <span className="text-[#D4AF37]">next project.</span>
            </h2>
            <p className="mt-6 max-w-md leading-8 text-white/55">
              Reach out for construction, real-estate, EPC, infrastructure, or
              renovation requirements. We'll understand your project needs and
              connect with you promptly.
            </p>

            <div className="mt-10 space-y-4">
              {contacts.map((c) => (
                <div
                  key={c.label}
                  className="flex items-start gap-4 rounded-2xl border border-white/8 bg-white/4 px-5 py-4 backdrop-blur-xl"
                >
                  <span className="mt-0.5 text-lg">{c.icon}</span>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-widest text-white/40">
                      {c.label}
                    </p>
                    <p className="mt-0.5 text-sm font-medium text-white/85">{c.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right — Form */}
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="rounded-[32px] border border-white/10 bg-white/[0.035] p-7 backdrop-blur-xl shadow-2xl"
          >
            <p className="mb-6 text-lg font-bold text-white">Send Us an Enquiry</p>
            <div className="grid gap-4">
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Your Name"
                className={inputCls}
                required
              />
              <input
                type="tel"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="Phone Number"
                className={inputCls}
                required
              />
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Email Address"
                className={inputCls}
                required
              />
              <textarea
                rows="5"
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="Tell us about your project..."
                className={inputCls + " resize-none"}
                required
              />
              <button
                type="submit"
                className="rounded-full bg-[#D4AF37] px-6 py-3.5 text-sm font-bold text-black shadow-[0_0_24px_rgba(212,175,55,0.3)] transition-all hover:scale-[1.02] hover:shadow-[0_0_40px_rgba(212,175,55,0.5)] active:scale-100"
              >
                Send Enquiry →
              </button>
              {submitted && (
                <motion.p
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center text-sm text-[#D4AF37]"
                >
                  ✓ Your email client has been opened. We'll be in touch soon!
                </motion.p>
              )}
            </div>
          </motion.form>
        </div>
      </div>
    </section>
  );
}