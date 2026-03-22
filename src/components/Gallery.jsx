import { motion } from "framer-motion";
import { useGallery } from "../hooks/useGallery";

const fallbackGalleryItems = [
  { label: "Construction Planning", tag: "Planning" },
  { label: "Project Execution", tag: "Execution" },
  { label: "Site Development", tag: "Civil" },
  { label: "Infrastructure Work", tag: "Infrastructure" },
  { label: "Interior & Finishing", tag: "Interiors" },
  { label: "Commercial Capability", tag: "Commercial" },
];

const gradients = [
  "from-[#1e1a10] via-[#15120a] to-[#0b1020]",
  "from-[#1a2035] via-[#111827] to-[#0b1020]",
  "from-[#0f1e2e] via-[#0d1a28] to-[#0b1020]",
  "from-[#1a1e28] via-[#111520] to-[#0b1020]",
  "from-[#1e1a10] via-[#151208] to-[#0b1020]",
  "from-[#1c1525] via-[#130f1c] to-[#0b1020]",
];

export default function Gallery() {
  const { items: apiItems, loading } = useGallery();

  // Use API items if available, otherwise fallback to static
  const galleryItems = apiItems.length > 0
    ? apiItems.map((item) => ({
        label: item.title,
        tag: item.project?.title || 'Gallery',
        imageUrl: item.imageUrl,
      }))
    : fallbackGalleryItems;

  return (
    <section id="gallery" className="relative overflow-hidden px-5 py-24 lg:px-10">
      <div className="pointer-events-none absolute left-1/2 top-0 h-[300px] w-[800px] -translate-x-1/2 rounded-full bg-[#D4AF37]/4 blur-[100px]" />

      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.25em] text-[#D4AF37]">Gallery</p>
          <h2 className="text-4xl font-black text-white md:text-5xl">
            Our work, <span className="text-[#D4AF37]">up close.</span>
          </h2>
        </motion.div>

        {loading && (
          <div className="flex justify-center py-12">
            <div className="flex items-center gap-3 text-white/60">
              <svg className="animate-spin h-6 w-6" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              <span>Loading gallery...</span>
            </div>
          </div>
        )}

        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {galleryItems.map((item, index) => (
            <motion.div
              key={item.id || item.label}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="group relative overflow-hidden rounded-[28px] border border-white/8 bg-white/4 backdrop-blur-xl transition-all duration-400 hover:border-[#D4AF37]/30 hover:shadow-[0_20px_60px_rgba(0,0,0,0.5)]"
            >
              <div className={`relative h-60 overflow-hidden ${item.imageUrl ? '' : `bg-gradient-to-br ${gradients[index % gradients.length]}`}`}>
                {item.imageUrl ? (
                  <img 
                    src={item.imageUrl} 
                    alt={item.label}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                ) : (
                  <>
                    <div
                      className="absolute inset-0 opacity-[0.04]"
                      style={{
                        backgroundImage:
                          "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
                        backgroundSize: "28px 28px",
                      }}
                    />
                    <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-[#D4AF37]/8 blur-2xl transition-all duration-500 group-hover:bg-[#D4AF37]/20" />
                  </>
                )}
                <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/5 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <div className="absolute left-4 top-4 rounded-full border border-[#D4AF37]/25 bg-black/40 px-3 py-1 text-xs font-semibold text-[#D4AF37] backdrop-blur">
                  {item.tag}
                </div>
                <div className="absolute inset-0 flex items-center justify-center bg-black/25 opacity-0 transition-all duration-300 group-hover:opacity-100">
                  <div className="scale-75 rounded-full border border-white/20 bg-white/10 px-5 py-2.5 text-sm font-semibold text-white backdrop-blur transition-transform duration-300 group-hover:scale-100">
                    View Project
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between p-5">
                <h3 className="font-bold text-white">{item.label}</h3>
                <div className="flex h-7 w-7 items-center justify-center rounded-full border border-white/10 bg-white/5 text-xs text-white/50 transition-all group-hover:border-[#D4AF37]/40 group-hover:bg-[#D4AF37]/10 group-hover:text-[#D4AF37]">
                  ↗
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
