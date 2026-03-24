import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  PhoneCall, 
  Clock, 
  CheckCircle2, 
  Search,
  Calendar,
  User,
  MoreVertical
} from 'lucide-react';
import api from '../../services/api';

const STATUS_MAP = {
  PENDING: { label: 'Pending', color: 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20', icon: Clock },
  COMPLETED: { label: 'Completed', color: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20', icon: CheckCircle2 }
};

export default function CallbacksPage() {
  const [callbacks, setCallbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchCallbacks = async () => {
    try {
      setLoading(true);
      const res = await api.get('/admin/callbacks');
      setCallbacks(res.data.callbacks);
    } catch (err) {
      console.error("Failed to fetch callbacks", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCallbacks();
  }, []);

  const toggleStatus = async (item) => {
    const newStatus = item.status === 'PENDING' ? 'COMPLETED' : 'PENDING';
    try {
      await api.patch(`/admin/callbacks/${item.id}`, { status: newStatus });
      setCallbacks(prev => prev.map(c => c.id === item.id ? { ...c, status: newStatus } : c));
    } catch (err) {
      alert("Status update failed");
    }
  };

  const filtered = callbacks.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    c.phone.includes(searchTerm)
  );

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-black text-white">Callback <span className="text-[#D4AF37]">Requests</span></h1>
          <p className="mt-1 text-sm text-white/40">Users waiting for a return call from your team</p>
        </div>
        
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" size={18} />
          <input 
            type="text" 
            placeholder="Search by name or number..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-2xl border border-white/5 bg-white/[0.04] py-3 pl-12 pr-4 text-sm text-white outline-none focus:border-[#D4AF37]/40"
          />
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {loading ? (
          [1,2,3,4].map(i => <div key={i} className="h-48 animate-pulse rounded-3xl bg-white/5"></div>)
        ) : filtered.length > 0 ? filtered.map((item) => {
          const status = STATUS_MAP[item.status];
          const Icon = status.icon;
          
          return (
            <motion.div
              layout
              key={item.id}
              className={`group relative rounded-3xl border border-white/5 bg-white/[0.02] p-6 transition-all hover:bg-white/[0.04] ${item.status === 'COMPLETED' ? 'opacity-60' : ''}`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`rounded-xl p-3 ${item.status === 'PENDING' ? 'bg-[#D4AF37]/10 text-[#D4AF37]' : 'bg-white/10 text-white/20'}`}>
                  <PhoneCall size={20} />
                </div>
                <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[9px] font-black uppercase tracking-wider ${status.color}`}>
                  <Icon size={10} />
                  {status.label}
                </span>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-bold text-white group-hover:text-[#D4AF37] transition-colors">{item.name}</h3>
                <p className="mt-1 text-sm font-medium text-white/60">{item.phone}</p>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-white/5">
                <div className="flex items-center gap-2 text-[10px] text-white/30 uppercase font-bold tracking-widest">
                  <Calendar size={12} />
                  {new Date(item.createdAt).toLocaleDateString()}
                </div>
                <button 
                  onClick={() => toggleStatus(item)}
                  className={`rounded-lg px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest transition-all ${
                    item.status === 'PENDING' ? 'bg-emerald-500 text-white hover:bg-emerald-600' : 'bg-white/5 text-white/40 hover:bg-white/10'
                  }`}
                >
                  {item.status === 'PENDING' ? 'Mark Done' : 'Re-open'}
                </button>
              </div>
            </motion.div>
          );
        }) : (
          <div className="col-span-full py-20 text-center">
            <p className="text-white/20 italic">No callback requests found</p>
          </div>
        )}
      </div>
    </div>
  );
}
