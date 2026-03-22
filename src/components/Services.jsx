import { motion } from "framer-motion";

const services = [
  {
    icon: "🏗️",
    title: "Construction & Civil Works",
    desc: "Full-scope civil construction from foundations to finishing, built to exacting standards.",
  },
  {
    icon: "🏢",
    title: "Real Estate Development",
    desc: "End-to-end residential and commercial real estate development with long-term value focus.",
  },
  {
    icon: "⚙️",
    title: "EPC & Turnkey Projects",
    desc: "Integrated Engineering, Procurement, and Construction delivery under a single responsible entity.",
  },
  {
    icon: "🛋️",
    title: "Interiors & Renovation",
    desc: "Premium interior fit-outs and renovation services that transform spaces into functional assets.",
  },
  {
    icon: "🛣️",
    title: "Infrastructure Development",
    desc: "Civil and utility infrastructure for roads, drainage, and community-scale developments.",
  },
  {
    icon: "📋",
    title: "Consulting & Project Management",
    desc: "Strategic project advisory, planning, and supervision for construction and development work.",
  },
];

export default function Services() {
  return (
    <section id="services" className="relative overflow-hidden px-5 py-24 lg:px-10">
      <div className="pointer-events-none absolute left-0 top-0 h-[350px] w-[350px] rounded-full bg-[#D4AF37]/5 blur-[100px]" />

      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.25em] text-[#D4AF37]">
            Services
          </p>
          <h2 className="text-4xl font-black text-white md:text-5xl">
            Integrated solutions for <br className="hidden md:block" />
            <span className="text-[#D4AF37]">ambitious projects.</span>
          </h2>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="group relative overflow-hidden rounded-[28px] border border-white/8 bg-white/4 p-7 backdrop-blur-xl transition-all duration-400 hover:-translate-y-1.5 hover:border-[#D4AF37]/35 hover:bg-[#D4AF37]/5 hover:shadow-[0_16px_48px_rgba(212,175,55,0.1)]"
            >
              {/* Top-right glow on hover */}
              <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-[#D4AF37]/0 blur-2xl transition-all duration-500 group-hover:bg-[#D4AF37]/12" />

              <div className="relative mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl border border-[#D4AF37]/20 bg-[#D4AF37]/8 text-2xl transition-all group-hover:border-[#D4AF37]/40 group-hover:bg-[#D4AF37]/15">
                {service.icon}
              </div>
              <h3 className="text-lg font-bold text-white">{service.title}</h3>
              <p className="mt-3 text-sm leading-7 text-white/55 transition-colors group-hover:text-white/70">
                {service.desc}
              </p>

              {/* Bottom accent line */}
              <div className="mt-6 h-px w-0 bg-gradient-to-r from-[#D4AF37] to-transparent transition-all duration-500 group-hover:w-full" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}