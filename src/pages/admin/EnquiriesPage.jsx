import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  Filter, 
  MoreVertical, 
  CheckCircle2, 
  Clock, 
  XCircle,
  Mail,
  Phone,
  ArrowUpDown
} from 'lucide-react';
import api from '../../services/api';

const STATUS_COLORS = {
  PENDING: 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20',
  CONTACTED: 'bg-blue-500/10 text-blue-500 border-blue-500/20',
  CLOSED: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20'
};

export default function EnquiriesPage() {
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [selectedEnquiry, setSelectedEnquiry] = useState(null);

  const fetchEnquiries = async () => {
    try {
      setLoading(true);
      const res = await api.get('/admin/enquiries');
      setEnquiries(res.data.enquiries);
    } catch (err) {
      console.error("Failed to fetch enquiries", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEnquiries();
  }, []);

  const updateStatus = async (id, status) => {
    try {
      await api.patch(`/admin/enquiries/${id}`, { status });
      setEnquiries(prev => prev.map(e => e.id === id ? { ...e, status } : e));
      if (selectedEnquiry?.id === id) setSelectedEnquiry({ ...selectedEnquiry, status });
    } catch (err) {
      alert("Failed to update status");
    }
  };

  const filteredEnquiries = enquiries.filter(e => {
    const matchesSearch = e.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          e.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'ALL' || e.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-black text-white">Project <span className="text-[#D4AF37]">Enquiries</span></h1>
          <p className="mt-1 text-sm text-white/40">Manage and track all project requests from the website</p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" size={18} />
            <input 
              type="text" 
              placeholder="Search by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-2xl border border-white/5 bg-white/[0.04] py-3 pl-12 pr-4 text-sm text-white outline-none focus:border-[#D4AF37]/40"
            />
          </div>
          
          <select 
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="rounded-2xl border border-white/5 bg-white/[0.04] px-4 py-3 text-sm text-white outline-none focus:border-[#D4AF37]/40"
          >
            <option value="ALL">All Status</option>
            <option value="PENDING">Pending</option>
            <option value="CONTACTED">Contacted</option>
            <option value="CLOSED">Closed</option>
          </select>
        </div>
      </div>

      <div className="rounded-3xl border border-white/5 bg-white/[0.02] overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-white/[0.03] text-white/30 text-[11px] font-bold uppercase tracking-widest">
              <tr>
                <th className="px-8 py-5">S.No.</th>
                <th className="px-8 py-5">Sender</th>
                <th className="px-8 py-5">Contact Details</th>
                <th className="px-8 py-5">Status</th>
                <th className="px-8 py-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-white/80">
              {loading ? (
                [1,2,3,4,5].map(i => (
                  <tr key={i} className="animate-pulse">
                    <td colSpan="5" className="h-20 px-8 py-4 bg-white/[0.01]"></td>
                  </tr>
                ))
              ) : filteredEnquiries.length > 0 ? filteredEnquiries.map((enq, idx) => (
                <tr 
                  key={enq.id} 
                  onClick={() => setSelectedEnquiry(enq)}
                  className="group cursor-pointer transition-colors hover:bg-white/[0.03]"
                >
                  <td className="px-8 py-6 text-white/30 font-medium">{(idx + 1).toString().padStart(2, '0')}</td>
                  <td className="px-8 py-6">
                    <p className="font-bold text-white group-hover:text-[#D4AF37] transition-colors">{enq.name}</p>
                    <p className="mt-1 text-xs text-[#D4AF37]/60">{new Date(enq.createdAt).toLocaleDateString()}</p>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex flex-col gap-1.5">
                      <div className="flex items-center gap-2 text-white/50">
                        <Mail size={12} />
                        <span className="text-[12px]">{enq.email}</span>
                      </div>
                      <div className="flex items-center gap-2 text-white/50">
                        <Phone size={12} />
                        <span className="text-[12px]">{enq.phone}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider ${STATUS_COLORS[enq.status]}`}>
                      {enq.status === 'PENDING' && <Clock size={10} />}
                      {enq.status === 'CONTACTED' && <CheckCircle2 size={10} />}
                      {enq.status === 'CLOSED' && <XCircle size={10} />}
                      {enq.status}
                    </span>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <button className="rounded-xl bg-white/5 p-2 text-white/30 group-hover:bg-[#D4AF37]/10 group-hover:text-[#D4AF37] transition-all">
                      <MoreVertical size={16} />
                    </button>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan="5" className="py-20 text-center">
                    <p className="text-white/20 italic">No enquiries found matching your criteria</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Detail Modal */}
      <AnimatePresence>
        {selectedEnquiry && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedEnquiry(null)}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-2xl rounded-[32px] border border-white/10 bg-[#0B1020] p-8 shadow-2xl"
            >
              <button 
                onClick={() => setSelectedEnquiry(null)}
                className="absolute right-6 top-6 rounded-full bg-white/5 p-2 text-white/40 hover:bg-white/10 hover:text-white"
              >
                <XCircle size={20} />
              </button>

              <div className="mb-8">
                <span className={`inline-flex rounded-full border px-3 py-1 text-[10px] font-bold uppercase tracking-widest ${STATUS_COLORS[selectedEnquiry.status]}`}>
                  {selectedEnquiry.status}
                </span>
                <h2 className="mt-4 text-3xl font-black text-white">{selectedEnquiry.name}</h2>
                <div className="mt-4 flex flex-wrap gap-4">
                   <a href={`mailto:${selectedEnquiry.email}`} className="flex items-center gap-2 text-sm text-[#D4AF37] hover:underline">
                    <Mail size={16} /> {selectedEnquiry.email}
                   </a>
                   <a href={`tel:${selectedEnquiry.phone}`} className="flex items-center gap-2 text-sm text-[#D4AF37] hover:underline">
                    <Phone size={16} /> {selectedEnquiry.phone}
                   </a>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <h4 className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/30">Project Requirement</h4>
                  <div className="mt-3 rounded-2xl bg-white/5 p-6 text-sm leading-relaxed text-white/80 border border-white/5">
                    {selectedEnquiry.message}
                  </div>
                </div>

                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h4 className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/30">Admin Actions</h4>
                    <div className="mt-3 flex gap-2">
                      <button 
                        onClick={() => updateStatus(selectedEnquiry.id, 'PENDING')}
                        className={`rounded-xl px-4 py-2 text-xs font-bold transition-all ${selectedEnquiry.status === 'PENDING' ? 'bg-yellow-500 text-black' : 'bg-white/5 text-white/50 hover:bg-white/10'}`}
                      >
                        Pending
                      </button>
                      <button 
                        onClick={() => updateStatus(selectedEnquiry.id, 'CONTACTED')}
                        className={`rounded-xl px-4 py-2 text-xs font-bold transition-all ${selectedEnquiry.status === 'CONTACTED' ? 'bg-blue-500 text-white' : 'bg-white/5 text-white/50 hover:bg-white/10'}`}
                      >
                        Mark Contacted
                      </button>
                      <button 
                        onClick={() => updateStatus(selectedEnquiry.id, 'CLOSED')}
                        className={`rounded-xl px-4 py-2 text-xs font-bold transition-all ${selectedEnquiry.status === 'CLOSED' ? 'bg-emerald-500 text-white' : 'bg-white/5 text-white/50 hover:bg-white/10'}`}
                      >
                        Close Lead
                      </button>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <p className="text-[10px] text-white/20 uppercase font-black">Logged on</p>
                    <p className="text-sm text-white/50">{new Date(selectedEnquiry.createdAt).toLocaleString()}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
