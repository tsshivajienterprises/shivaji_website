import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative overflow-hidden bg-black px-5 pb-24 pt-20 lg:px-10 lg:pt-28"
    >
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 h-full w-full object-cover opacity-30"
      >
        <source src="/videos/hero.mp4" type="video/mp4" />
      </video>

      {/* Ambient glows */}
      <div className="pointer-events-none absolute -left-24 -top-24 h-[500px] w-[500px] rounded-full bg-[#D4AF37]/8 blur-[120px]" />
      <div className="pointer-events-none absolute -right-24 top-10 h-[450px] w-[450px] rounded-full bg-blue-600/8 blur-[120px]" />
      <div className="pointer-events-none absolute bottom-0 left-1/2 h-[300px] w-[600px] -translate-x-1/2 rounded-full bg-[#D4AF37]/5 blur-[100px]" />

      <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-16 lg:grid-cols-2">
        {/* Left — Text */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Pill badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/25 bg-[#D4AF37]/8 px-4 py-2"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[#D4AF37] animate-pulse" />
            <span className="text-xs font-semibold tracking-[0.12em] text-[#D4AF37]">
              CONSTRUCTION · REAL ESTATE · EPC · INFRASTRUCTURE
            </span>
          </motion.div>

          {/* Headline */}
          <h1 className="text-5xl font-black leading-[1.1] tracking-tight text-white md:text-6xl lg:text-7xl">
            Building
            <span className="block text-[#D4AF37]">Trust.</span>
            <span className="block">Delivering</span>
            <span className="block text-[#D4AF37]">Tomorrow.</span>
          </h1>

          <p className="mt-7 max-w-lg text-base leading-8 text-white/60 md:text-lg">
            TS SHIVA JI ENTERPRICES PVT LTD delivers modern construction,
            real-estate development, EPC, and infrastructure solutions with an
            uncompromising focus on quality, reliability, and execution.
          </p>

          {/* CTAs */}
          <div className="mt-10 flex flex-wrap gap-4">
            <a
              href="#contact"
              className="group relative overflow-hidden rounded-full bg-[#D4AF37] px-7 py-3.5 text-sm font-bold text-black shadow-[0_0_32px_rgba(212,175,55,0.35)] transition-all duration-300 hover:shadow-[0_0_48px_rgba(212,175,55,0.5)] hover:scale-[1.03]"
            >
              Request a Callback
            </a>
            <a
              href="#services"
              className="rounded-full border border-white/15 bg-white/5 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur transition-all duration-300 hover:border-[#D4AF37]/40 hover:bg-[#D4AF37]/8 hover:text-[#D4AF37]"
            >
              Explore Services
            </a>
          </div>
        </motion.div>

        {/* Right — Visual cards grid */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.15, ease: "easeOut" }}
          className="relative"
        >
          {/* Glow behind card */}
          <div className="absolute inset-0 rounded-[40px] bg-[#D4AF37]/6 blur-3xl" />
          <div className="relative rounded-[36px] border border-white/10 bg-white/4 p-5 shadow-2xl backdrop-blur-xl">
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-[26px] bg-gradient-to-br from-[#D4AF37] to-[#B8922C] p-6 text-black shadow-lg">
                <p className="text-xs font-bold uppercase tracking-widest opacity-70">Focus</p>
                <h3 className="mt-8 text-xl font-black leading-tight">
                  End-to-End<br />Project Delivery
                </h3>
              </div>
              <div className="rounded-[26px] border border-white/8 bg-white/6 p-6 backdrop-blur-xl">
                <p className="text-xs font-semibold uppercase tracking-widest text-white/50">Scope</p>
                <h3 className="mt-8 text-xl font-black text-white leading-tight">
                  Residential<br />&amp; Commercial
                </h3>
              </div>
              <div className="rounded-[26px] border border-white/8 bg-white/6 p-6 backdrop-blur-xl">
                <p className="text-xs font-semibold uppercase tracking-widest text-white/50">Capabilities</p>
                <h3 className="mt-8 text-xl font-black text-white leading-tight">
                  EPC &amp;<br />Infrastructure
                </h3>
              </div>
              <div className="rounded-[26px] bg-gradient-to-br from-slate-800 to-slate-950 p-6 border border-white/8">
                <p className="text-xs font-semibold uppercase tracking-widest text-white/50">Promise</p>
                <h3 className="mt-8 text-xl font-black text-white leading-tight">
                  Quality.<br />Speed. Trust.
                </h3>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}