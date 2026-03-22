import { motion } from "framer-motion";

const highlights = [
  { label: "Quality-First Mindset", desc: "Every project is built to last with meticulous planning and superior materials." },
  { label: "Integrated Planning", desc: "From concept to handover, we ensure seamless coordination at every phase." },
  { label: "Timely Delivery", desc: "We treat your timelines as our own and commit to on-schedule completions." },
];

export default function About() {
  return (
    <section id="about" className="relative overflow-hidden px-5 py-24 lg:px-10">
      <div className="pointer-events-none absolute right-0 top-0 h-[400px] w-[400px] rounded-full bg-[#D4AF37]/5 blur-[100px]" />

      <div className="mx-auto max-w-7xl">
        {/* Section Label */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-3 text-xs font-bold uppercase tracking-[0.25em] text-[#D4AF37]"
        >
          About Us
        </motion.p>

        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65 }}
          >
            <h2 className="text-4xl font-black leading-tight text-white md:text-5xl">
              Modern execution <br />
              <span className="text-[#D4AF37]">with a strong</span> foundation.
            </h2>
            <p className="mt-7 leading-8 text-white/60">
              We build and deliver with a practical, quality-first mindset across
              construction, real-estate development, EPC, and infrastructure work.
              Our goal is to create projects that are functional, valuable, and built to last.
            </p>
            <p className="mt-5 leading-8 text-white/60">
              From concept to execution, we focus on timely delivery, integrated
              planning, and dependable project outcomes for clients who value
              professionalism and clarity.
            </p>
          </motion.div>

          {/* Right — highlight cards */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="flex flex-col gap-4"
          >
            {highlights.map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group flex gap-5 rounded-[24px] border border-white/8 bg-white/4 p-6 backdrop-blur-xl transition-all duration-300 hover:border-[#D4AF37]/30 hover:bg-[#D4AF37]/5"
              >
                <div className="mt-1 flex-shrink-0">
                  <div className="h-2 w-2 rounded-full bg-[#D4AF37] shadow-[0_0_8px_#D4AF37]" />
                </div>
                <div>
                  <p className="font-bold text-white">{item.label}</p>
                  <p className="mt-1.5 text-sm leading-7 text-white/55">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}