import { motion } from "framer-motion";
import { useProjects } from "../hooks/useProjects";

const fallbackProjects = [
  {
    title: "Residential Construction",
    category: "Housing",
    shortDescription: "Modern homes and housing projects built with planning, quality, and long-term value in mind.",
    gradient: "from-[#1e1a10] to-[#0f0d08]",
    accent: "from-[#D4AF37]/22 to-transparent",
  },
  {
    title: "Commercial Development",
    category: "Commercial",
    shortDescription: "Workspaces, commercial structures, and business-ready developments designed for performance and scale.",
    gradient: "from-[#1a2035] to-[#0f172a]",
    accent: "from-blue-500/15 to-transparent",
  },
  {
    title: "EPC & Turnkey Delivery",
    category: "EPC",
    shortDescription: "Integrated project execution from planning to handover — coordinated engineering, procurement, and construction under one roof.",
    gradient: "from-[#1c1b25] to-[#0e0d18]",
    accent: "from-[#D4AF37]/18 to-transparent",
  },
  {
    title: "Infrastructure Works",
    category: "Infrastructure",
    shortDescription: "Reliable civil and infrastructure execution for roads, drainage, utility-linked developments, and public-facing works.",
    gradient: "from-[#121a28] to-[#0b1020]",
    accent: "from-slate-400/10 to-transparent",
  },
];

const gradients = [
  "from-[#1e1a10] to-[#0f0d08]",
  "from-[#1a2035] to-[#0f172a]",
  "from-[#1c1b25] to-[#0e0d18]",
  "from-[#121a28] to-[#0b1020]",
];

const accents = [
  "from-[#D4AF37]/22 to-transparent",
  "from-blue-500/15 to-transparent",
  "from-[#D4AF37]/18 to-transparent",
  "from-slate-400/10 to-transparent",
];

export default function Projects() {
  const { projects: apiProjects, loading } = useProjects(true);
  
  // Use API projects if available, otherwise fallback to static
  const projects = apiProjects.length > 0 
    ? apiProjects.map((project, index) => ({
        ...project,
        tag: project.category,
        text: project.shortDescription,
        gradient: gradients[index % gradients.length],
        accent: accents[index % accents.length],
      }))
    : fallbackProjects;

  return (
    <section id="projects" className="relative overflow-hidden px-5 py-24 lg:px-10">
      <div className="pointer-events-none absolute right-0 bottom-0 h-[400px] w-[400px] rounded-full bg-blue-600/5 blur-[100px]" />

      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.25em] text-[#D4AF37]">Projects & Capabilities</p>
          <h2 className="text-4xl font-black text-white md:text-5xl">
            Built for scale, quality,
            <span className="text-[#D4AF37]"> and trust.</span>
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-7 text-white/55">
            From residential developments to large-scale infrastructure — our capabilities span the full spectrum of construction and real estate.
          </p>
        </motion.div>

        {loading && (
          <div className="flex justify-center py-12">
            <div className="flex items-center gap-3 text-white/60">
              <svg className="animate-spin h-6 w-6" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              <span>Loading projects...</span>
            </div>
          </div>
        )}

        <div className="grid gap-6 md:grid-cols-2">
          {projects.map((project, index) => (
            <motion.div
              key={project.id || project.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.55, delay: index * 0.1 }}
              className="group relative overflow-hidden rounded-[30px] border border-white/8 bg-white/4 backdrop-blur-xl transition-all duration-400 hover:-translate-y-1.5 hover:border-[#D4AF37]/30 hover:shadow-[0_20px_60px_rgba(0,0,0,0.4)]"
            >
              <div className={`relative h-52 bg-gradient-to-br ${project.gradient} overflow-hidden`}>
                {project.coverImageUrl ? (
                  <img 
                    src={project.coverImageUrl} 
                    alt={project.title}
                    className="absolute inset-0 w-full h-full object-cover opacity-60"
                  />
                ) : (
                  <>
                    <div className={`absolute inset-0 bg-gradient-to-br ${project.accent} opacity-40 transition-opacity duration-500 group-hover:opacity-80`} />
                    <div
                      className="absolute inset-0 opacity-[0.04]"
                      style={{
                        backgroundImage:
                          "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
                        backgroundSize: "32px 32px",
                      }}
                    />
                  </>
                )}
                <div className="absolute left-5 top-5 rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/10 px-3 py-1 text-xs font-semibold text-[#D4AF37] backdrop-blur">
                  {project.tag || project.category}
                </div>
                <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-white/10 backdrop-blur">
                    <span className="text-white">↗</span>
                  </div>
                </div>
              </div>
              <div className="p-7">
                <h3 className="text-2xl font-black text-white">{project.title}</h3>
                <p className="mt-3 leading-7 text-white/55 transition-colors group-hover:text-white/70">
                  {project.text || project.shortDescription}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
