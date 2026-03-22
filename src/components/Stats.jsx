import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const stats = [
  { value: 120, suffix: "+", label: "Projects Completed" },
  { value: 10, suffix: "+", label: "Years Experience" },
  { value: 98, suffix: "%", label: "Client Satisfaction" },
  { value: 15, suffix: "+", label: "Ongoing Projects" },
];

function CountUp({ target, suffix, duration = 2000 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const startTime = performance.now();
          const animate = (now) => {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * target));
            if (progress < 1) requestAnimationFrame(animate);
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.4 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, duration]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

export default function Stats() {
  return (
    <section className="relative overflow-hidden px-5 py-16 lg:px-10">
      {/* Subtle divider glow */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/30 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/30 to-transparent" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[400px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#D4AF37]/5 blur-[100px]" />

      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-2 gap-6 xl:grid-cols-4">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.55, delay: i * 0.1 }}
              className="group relative overflow-hidden rounded-[28px] border border-white/8 bg-white/4 p-7 text-center backdrop-blur-xl transition-all duration-300 hover:border-[#D4AF37]/30 hover:bg-[#D4AF37]/5"
            >
              {/* Corner accent */}
              <div className="absolute right-0 top-0 h-16 w-16 rounded-bl-[28px] bg-[#D4AF37]/8 transition-all group-hover:bg-[#D4AF37]/15" />
              <p className="relative text-4xl font-black text-[#D4AF37] md:text-5xl">
                <CountUp target={stat.value} suffix={stat.suffix} />
              </p>
              <p className="mt-3 text-sm font-medium text-white/60">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
