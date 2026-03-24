import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, 
  Trash2, 
  Image as ImageIcon, 
  Upload,
  X,
  Star,
  Layers,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import api from '../../services/api';

export default function GalleryManagement() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [projects, setProjects] = useState([]);

  // Form State
  const [formData, setFormData] = useState({
    title: '',
    projectId: '',
    displayOrder: 0,
    isActive: true
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [galleryRes, projectRes] = await Promise.all([
        api.get('/gallery'),
        api.get('/projects')
      ]);
      setItems(galleryRes.data.items);
      setProjects(projectRes.data.projects);
    } catch (err) {
      console.error("Failed to fetch gallery data", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedFile) return alert("Please select an image");
    setSubmitting(true);

    const data = new FormData();
    data.append('title', formData.title);
    if (formData.projectId) data.append('projectId', formData.projectId);
    data.append('displayOrder', formData.displayOrder);
    data.append('isActive', formData.isActive);
    data.append('image', selectedFile);

    try {
      await api.post('/admin/gallery', data, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      fetchData();
      setIsFormOpen(false);
      setFormData({ title: '', projectId: '', displayOrder: 0, isActive: true });
      setSelectedFile(null);
      setPreviewUrl('');
    } catch (err) {
      const errorMsg = err.response?.data?.error || err.message;
      alert(`Gallery upload failed: ${errorMsg}\n\nTip: Please ensure Cloudinary credentials are set in backend/.env`);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this gallery image?")) return;
    try {
      await api.delete(`/admin/gallery/${id}`);
      setItems(prev => prev.filter(item => item.id !== id));
    } catch (err) {
      alert("Delete failed");
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-black text-white">Gallery <span className="text-[#D4AF37]">Management</span></h1>
          <p className="mt-1 text-sm text-white/40">Upload images for the site gallery and attach them to projects</p>
        </div>
        
        <button 
          onClick={() => setIsFormOpen(true)}
          className="flex items-center gap-2 rounded-full bg-[#D4AF37] px-6 py-3 text-sm font-bold text-black shadow-lg transition-transform hover:scale-105 active:scale-100"
        >
          <Plus size={18} /> Upload Image
        </button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xxl:grid-cols-5">
        {loading ? (
          [1,2,3,4,5].map(i => <div key={i} className="aspect-square animate-pulse rounded-3xl bg-white/5"></div>)
        ) : items.length > 0 ? items.map((item) => (
          <motion.div
            layout
            key={item.id}
            className="group relative aspect-square overflow-hidden rounded-3xl border border-white/5 bg-white/[0.02]"
          >
            <img 
              src={item.imageUrl} 
              alt={item.title}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-5 flex flex-col justify-end">
              <p className="text-sm font-bold text-white mb-2">{item.title}</p>
              <div className="flex items-center justify-between">
                 <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest flex items-center gap-1">
                   <Layers size={10} /> {item.project?.title || 'General'}
                 </span>
                 <button 
                   onClick={() => handleDelete(item.id)}
                   className="rounded-lg bg-red-500/20 p-2 text-red-500 hover:bg-red-500 hover:text-white transition-all shadow-lg"
                 >
                   <Trash2 size={14} />
                 </button>
              </div>
            </div>
            {!item.isActive && (
              <div className="absolute top-4 right-4 rounded-full bg-black/60 px-2 py-1 text-[8px] font-black text-white/40 uppercase">Hidden</div>
            )}
          </motion.div>
        )) : (
          <div className="col-span-full py-20 text-center">
             <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-white/5 text-white/10">
               <ImageIcon size={32} />
             </div>
             <p className="text-white/20 italic">The gallery is currently empty.</p>
          </div>
        )}
      </div>

      <AnimatePresence>
        {isFormOpen && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-6">
            <motion.div 
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               exit={{ opacity: 0 }}
               onClick={() => setIsFormOpen(false)}
               className="absolute inset-0 bg-black/80 backdrop-blur-md"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-lg rounded-[40px] border border-white/10 bg-[#0B1020] p-10 shadow-2xl"
            >
              <div className="mb-8 text-center">
                <h2 className="text-2xl font-black text-white">Upload <span className="text-[#D4AF37]">Media</span></h2>
                <p className="mt-1 text-sm text-white/40">Add a new image to your website gallery</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <label className="group relative block aspect-square cursor-pointer overflow-hidden rounded-[32px] border-2 border-dashed border-white/10 bg-white/[0.02] transition-colors hover:border-[#D4AF37]/40">
                  <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
                  {previewUrl ? (
                    <img src={previewUrl} className="h-full w-full object-cover" />
                  ) : (
                    <div className="flex h-full flex-col items-center justify-center gap-3 text-white/20 group-hover:text-[#D4AF37]/60">
                       <Upload size={40} />
                       <span className="text-xs font-black tracking-widest uppercase">Select Image File</span>
                    </div>
                  )}
                </label>

                <div className="space-y-4">
                  <input 
                    type="text" 
                    placeholder="Image Title..."
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    className="w-full rounded-2xl border border-white/5 bg-white/5 px-5 py-4 text-sm text-white outline-none focus:border-[#D4AF37]/50"
                  />
                  
                  <select 
                    value={formData.projectId}
                    onChange={(e) => setFormData({...formData, projectId: e.target.value})}
                    className="w-full rounded-2xl border border-white/5 bg-white/5 px-5 py-4 text-sm text-white outline-none focus:border-[#D4AF37]/50"
                  >
                    <option value="">Linked Project (Optional)</option>
                    {projects.map(p => (
                      <option key={p.id} value={p.id}>{p.title}</option>
                    ))}
                  </select>

                  <div className="grid grid-cols-2 gap-4">
                    <input 
                      type="number" 
                      placeholder="Order (0)"
                      value={formData.displayOrder}
                      onChange={(e) => setFormData({...formData, displayOrder: parseInt(e.target.value)})}
                      className="w-full rounded-2xl border border-white/5 bg-white/5 px-5 py-4 text-sm text-white outline-none focus:border-[#D4AF37]/50"
                    />
                    <div className="flex items-center justify-center gap-2 rounded-2xl bg-white/5 p-4 border border-white/5 cursor-pointer select-none"
                         onClick={() => setFormData({...formData, isActive: !formData.isActive})}>
                       <input type="checkbox" checked={formData.isActive} readOnly className="h-4 w-4 accent-[#D4AF37]" />
                       <span className="text-xs font-bold text-white">Live Status</span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-4">
                  <button 
                    type="button" 
                    onClick={() => setIsFormOpen(false)}
                    className="flex-1 rounded-full border border-white/10 py-5 text-sm font-bold text-white/40 transition-all hover:bg-white/5"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    disabled={submitting}
                    className="flex-[2] rounded-full bg-[#D4AF37] py-5 text-[15px] font-black uppercase tracking-widest text-black shadow-lg transition-all hover:scale-[1.02] disabled:opacity-50"
                  >
                    {submitting ? 'UPLOADING...' : 'START UPLOAD →'}
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
