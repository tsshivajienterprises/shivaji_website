import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, 
  Search, 
  Edit2, 
  Trash2, 
  Image as ImageIcon, 
  MapPin, 
  Star, 
  ChevronRight,
  Upload,
  X,
  ExternalLink,
  Briefcase
} from 'lucide-react';
import api from '../../services/api';

export default function ProjectManagement() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Form State
  const [formData, setFormData] = useState({
    title: '',
    category: 'Residential',
    shortDescription: '',
    fullDescription: '',
    location: '',
    isFeatured: false,
    displayOrder: 0
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const res = await api.get('/projects');
      setProjects(res.data.projects);
    } catch (err) {
      console.error("Failed to fetch projects", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleOpenForm = (project = null) => {
    if (project) {
      setEditingProject(project);
      setFormData({
        title: project.title,
        category: project.category,
        shortDescription: project.shortDescription,
        fullDescription: project.fullDescription,
        location: project.location || '',
        isFeatured: project.isFeatured,
        displayOrder: project.displayOrder
      });
      setPreviewUrl(project.coverImageUrl);
    } else {
      setEditingProject(null);
      setFormData({
        title: '',
        category: 'Residential',
        shortDescription: '',
        fullDescription: '',
        location: '',
        isFeatured: false,
        displayOrder: 0
      });
      setPreviewUrl('');
    }
    setSelectedFile(null);
    setIsFormOpen(true);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    const data = new FormData();
    Object.keys(formData).forEach(key => data.append(key, formData[key]));
    if (selectedFile) data.append('coverImage', selectedFile);

    try {
      if (editingProject) {
        await api.patch(`/admin/projects/${editingProject.id}`, data, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
      } else {
        await api.post('/admin/projects', data, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
      }
      fetchProjects();
      setIsFormOpen(false);
    } catch (err) {
      const errorMsg = err.response?.data?.error || err.message;
      alert(`Project submission failed: ${errorMsg}\n\nTip: Please ensure Cloudinary credentials are set in backend/.env`);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this project?")) return;
    try {
      await api.delete(`/admin/projects/${id}`);
      setProjects(prev => prev.filter(p => p.id !== id));
    } catch (err) {
      alert("Delete failed");
    }
  };

  const filtered = projects.filter(p => p.title.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-black text-white">Project <span className="text-[#D4AF37]">Portfolio</span></h1>
          <p className="mt-1 text-sm text-white/40">Manage projects displayed on the public website</p>
        </div>
        
        <button 
          onClick={() => handleOpenForm()}
          className="flex items-center gap-2 rounded-full bg-[#D4AF37] px-6 py-3 text-sm font-bold text-black shadow-lg transition-transform hover:scale-105 active:scale-100"
        >
          <Plus size={18} /> Add New Project
        </button>
      </div>

      <div className="relative max-w-md">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" size={18} />
        <input 
          type="text" 
          placeholder="Search projects..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full rounded-2xl border border-white/5 bg-white/[0.04] py-3 pl-12 pr-4 text-sm text-white outline-none focus:border-[#D4AF37]/40"
        />
      </div>

      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {loading ? (
          [1,2,3].map(i => <div key={i} className="h-64 animate-pulse rounded-3xl bg-white/5"></div>)
        ) : filtered.length > 0 ? filtered.map((project) => (
          <motion.div
            layout
            key={project.id}
            className="group relative overflow-hidden rounded-3xl border border-white/5 bg-white/[0.02] transition-all hover:bg-white/[0.04]"
          >
            <div className="aspect-video w-full overflow-hidden bg-white/5">
              <img 
                src={project.coverImageUrl} 
                alt={project.title}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" 
              />
              {project.isFeatured && (
                <div className="absolute left-4 top-4 flex items-center gap-1 rounded-full bg-[#D4AF37] px-3 py-1 text-[10px] font-black text-black">
                  <Star size={10} fill="currentColor" /> FEATURED
                </div>
              )}
            </div>

            <div className="p-6">
              <div className="mb-2 flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#D4AF37]">{project.category}</span>
                <span className="text-[10px] text-white/20 font-bold">POS: {project.displayOrder}</span>
              </div>
              <h3 className="text-xl font-black text-white">{project.title}</h3>
              <p className="mt-2 line-clamp-2 text-sm text-white/40">{project.shortDescription}</p>
              
              <div className="mt-4 flex items-center gap-2 text-xs text-white/20 font-medium">
                <MapPin size={14} /> {project.location || 'Location Not Set'}
              </div>

              <div className="mt-6 flex items-center justify-end gap-2 border-t border-white/5 pt-4">
                <button 
                  onClick={() => handleOpenForm(project)}
                  className="rounded-xl bg-white/5 p-3 text-white/40 hover:bg-[#D4AF37]/10 hover:text-[#D4AF37] transition-all"
                >
                  <Edit2 size={16} />
                </button>
                <button 
                  onClick={() => handleDelete(project.id)}
                  className="rounded-xl bg-white/5 p-3 text-white/40 hover:bg-red-500/10 hover:text-red-500 transition-all"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          </motion.div>
        )) : (
          <div className="col-span-full py-20 text-center">
             <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-white/5 text-white/10">
               <Briefcase size={32} />
             </div>
             <p className="text-white/20 italic">No projects found. Add your first architectural masterpiece!</p>
          </div>
        )}
      </div>

      {/* Form Sidebar/Modal Placeholder */}
      <AnimatePresence>
        {isFormOpen && (
          <div className="fixed inset-0 z-[60] flex items-center justify-end">
            <motion.div 
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               exit={{ opacity: 0 }}
               onClick={() => setIsFormOpen(false)}
               className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="relative h-full w-full max-w-2xl overflow-y-auto bg-[#0B1020] p-10 shadow-2xl border-l border-white/5"
            >
              <div className="mb-10 flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-black text-white">{editingProject ? 'Edit' : 'New'} <span className="text-[#D4AF37]">Project</span></h2>
                  <p className="mt-1 text-sm text-white/40">Provide project details and upload a cover image</p>
                </div>
                <button onClick={() => setIsFormOpen(false)} className="rounded-full bg-white/5 p-3 text-white/40 hover:text-white transition-colors">
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Image Upload Area */}
                <div className="space-y-3">
                  <label className="text-[11px] font-bold uppercase tracking-widest text-white/40">Cover Image</label>
                  <label className="group relative block aspect-video cursor-pointer overflow-hidden rounded-[32px] border-2 border-dashed border-white/10 bg-white/[0.02] transition-colors hover:border-[#D4AF37]/40">
                    <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
                    {previewUrl ? (
                      <>
                        <img src={previewUrl} className="h-full w-full object-cover" />
                        <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity">
                           <Upload className="text-white" size={32} />
                        </div>
                      </>
                    ) : (
                      <div className="flex h-full flex-col items-center justify-center gap-2 text-white/20 group-hover:text-[#D4AF37]/60">
                         <Upload size={32} />
                         <span className="text-xs font-bold font-mono">UPLOAD PROJECT IMAGE</span>
                      </div>
                    )}
                  </label>
                </div>

                <div className="grid gap-6 sm:grid-cols-2">
                  <div className="space-y-2">
                    <label className="text-[11px] font-bold uppercase tracking-widest text-white/40">Project Title</label>
                    <input 
                      type="text" 
                      required
                      value={formData.title}
                      onChange={(e) => setFormData({...formData, title: e.target.value})}
                      className="w-full rounded-2xl border border-white/5 bg-white/5 px-5 py-4 text-sm text-white outline-none focus:border-[#D4AF37]/50"
                      placeholder="Modern Luxury Villa"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[11px] font-bold uppercase tracking-widest text-white/40">Category</label>
                    <select 
                      value={formData.category}
                      onChange={(e) => setFormData({...formData, category: e.target.value})}
                      className="w-full rounded-2xl border border-white/5 bg-white/5 px-5 py-4 text-sm text-white outline-none focus:border-[#D4AF37]/50"
                    >
                      <option value="Residential">Residential</option>
                      <option value="Commercial">Commercial</option>
                      <option value="Infrastructure">Infrastructure</option>
                      <option value="Industrial">Industrial</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[11px] font-bold uppercase tracking-widest text-white/40">Short Description (Cards)</label>
                  <input 
                    type="text" 
                    required
                    value={formData.shortDescription}
                    onChange={(e) => setFormData({...formData, shortDescription: e.target.value})}
                    className="w-full rounded-2xl border border-white/5 bg-white/5 px-5 py-4 text-sm text-white outline-none focus:border-[#D4AF37]/50"
                    placeholder="Brief summary for list view cards..."
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[11px] font-bold uppercase tracking-widest text-white/40">Full Project Description</label>
                  <textarea 
                    rows="6"
                    required
                    value={formData.fullDescription}
                    onChange={(e) => setFormData({...formData, fullDescription: e.target.value})}
                    className="w-full rounded-3xl border border-white/5 bg-white/5 px-6 py-5 text-sm text-white outline-none focus:border-[#D4AF37]/50 resize-none"
                    placeholder="Detailed project scope, materials used, architecture style..."
                  />
                </div>

                <div className="grid gap-6 sm:grid-cols-3">
                  <div className="sm:col-span-2 space-y-2">
                    <label className="text-[11px] font-bold uppercase tracking-widest text-white/40">Location</label>
                    <input 
                      type="text" 
                      value={formData.location}
                      onChange={(e) => setFormData({...formData, location: e.target.value})}
                      className="w-full rounded-2xl border border-white/5 bg-white/5 px-5 py-4 text-sm text-white outline-none focus:border-[#D4AF37]/50"
                      placeholder="Hyderabad, Telangana"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[11px] font-bold uppercase tracking-widest text-white/40">Display Order</label>
                    <input 
                      type="number" 
                      value={formData.displayOrder}
                      onChange={(e) => setFormData({...formData, displayOrder: parseInt(e.target.value)})}
                      className="w-full rounded-2xl border border-white/5 bg-white/5 px-5 py-4 text-sm text-white outline-none focus:border-[#D4AF37]/50"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-3 rounded-2xl bg-white/[0.03] p-5 border border-white/5">
                  <input 
                    type="checkbox" 
                    id="featured"
                    checked={formData.isFeatured}
                    onChange={(e) => setFormData({...formData, isFeatured: e.target.checked})}
                    className="h-5 w-5 rounded accent-[#D4AF37]"
                  />
                  <label htmlFor="featured" className="text-sm font-bold text-white selection:bg-none">Mark as Featured (Shown on homepage)</label>
                </div>

                <div className="pt-6">
                  <button 
                    type="submit"
                    disabled={submitting}
                    className="flex w-full items-center justify-center gap-3 rounded-full bg-[#D4AF37] py-5 text-[15px] font-black uppercase tracking-widest text-black shadow-[0_0_40px_rgba(212,175,55,0.2)] transition-all hover:scale-[1.02] hover:shadow-[0_0_60px_rgba(212,175,55,0.4)] active:scale-100 disabled:opacity-50"
                  >
                    {submitting ? 'PROCESSING...' : (editingProject ? 'UPDATE PROJECT' : 'CREATE PROJECT')}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
