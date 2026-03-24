import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  MessageSquare, 
  PhoneCall, 
  Briefcase, 
  TrendingUp, 
  Clock 
} from 'lucide-react';
import api from '../../services/api';

const StatCard = ({ label, value, icon: Icon, color, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay }}
    className="rounded-3xl border border-white/5 bg-white/[0.02] p-6 shadow-sm"
  >
    <div className="flex items-center justify-between">
      <div>
        <p className="text-xs font-medium text-white/40 uppercase tracking-widest">{label}</p>
        <h3 className="mt-2 text-3xl font-black text-white">{value}</h3>
      </div>
      <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${color} bg-opacity-10`}>
        <Icon size={24} className={color === 'bg-[#D4AF37]' ? 'text-[#D4AF37]' : 'text-blue-400'} />
      </div>
    </div>
  </motion.div>
);

export default function Dashboard() {
  const [stats, setStats] = useState({
    enquiries: 0,
    callbacks: 0,
    projects: 0,
    visits: 0,
    recentEnquiries: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [statsRes, enqRes] = await Promise.all([
          api.get('/admin/stats/dashboard'),
          api.get('/admin/enquiries?limit=5')
        ]);
        
        setStats({
          enquiries: statsRes.data.enquiries || 0,
          callbacks: statsRes.data.callbacks || 0,
          projects: statsRes.data.projects || 0,
          visits: statsRes.data.visits || 0,
          recentEnquiries: enqRes.data.enquiries?.slice(0, 5) || []
        });
      } catch (err) {
        console.error("Failed to fetch dashboard stats", err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="h-8 w-48 animate-pulse rounded bg-white/5"></div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="h-32 animate-pulse rounded-3xl bg-white/5"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-3xl font-black text-white">Dashboard <span className="text-[#D4AF37]">Overview</span></h1>
        <p className="mt-2 text-sm text-white/40">Real-time performance metrics and recent activities</p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatCard 
          label="Total Enquiries" 
          value={stats.enquiries} 
          icon={MessageSquare} 
          color="bg-[#D4AF37]" 
          delay={0.1}
        />
        <StatCard 
          label="Pending Callbacks" 
          value={stats.callbacks} 
          icon={PhoneCall} 
          color="bg-blue-500" 
          delay={0.2}
        />
        <StatCard 
          label="Active Projects" 
          value={stats.projects} 
          icon={Briefcase} 
          color="bg-emerald-500" 
          delay={0.3}
        />
        <StatCard 
          label="Site Visits" 
          value={stats.visits >= 1000 ? `${(stats.visits / 1000).toFixed(1)}k` : stats.visits} 
          icon={TrendingUp} 
          color="bg-purple-500" 
          delay={0.4}
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Recent Enquiries Table */}
        <div className="lg:col-span-2 rounded-3xl border border-white/5 bg-white/[0.02] p-8">
          <div className="mb-6 flex items-center justify-between">
            <h3 className="font-bold text-white">Recent Enquiries</h3>
            <button className="text-xs font-bold uppercase tracking-widest text-[#D4AF37] hover:underline">View All</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-white/5 text-white/30">
                <tr>
                  <th className="pb-4 font-semibold">User</th>
                  <th className="pb-4 font-semibold">Project Details</th>
                  <th className="pb-4 font-semibold">Status</th>
                  <th className="pb-4 font-semibold text-right">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-white/80">
                {stats.recentEnquiries.length > 0 ? stats.recentEnquiries.map((enq) => (
                  <tr key={enq.id} className="group transition-colors hover:bg-white/[0.02]">
                    <td className="py-4">
                      <p className="font-bold text-white">{enq.name}</p>
                      <p className="text-[11px] text-[#D4AF37]/40">{enq.email}</p>
                    </td>
                    <td className="py-4 max-w-[200px] truncate">{enq.message}</td>
                    <td className="py-4">
                      <span className={`rounded-full px-2 py-1 text-[10px] font-bold uppercase ${
                        enq.status === 'PENDING' ? 'bg-yellow-500/10 text-yellow-500' : 'bg-emerald-500/10 text-emerald-500'
                      }`}>
                        {enq.status}
                      </span>
                    </td>
                    <td className="py-4 text-right text-white/40">
                      {new Date(enq.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan="4" className="py-10 text-center text-white/20 italic">No recent enquiries found</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Activity Feed / Placeholder */}
        <div className="rounded-3xl border border-white/5 bg-white/[0.02] p-8">
          <h3 className="mb-6 font-bold text-white">Platform Updates</h3>
          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#D4AF37]/10 text-[#D4AF37]">
                <Clock size={18} />
              </div>
              <div>
                <p className="text-sm font-bold text-white">System Optimized</p>
                <p className="mt-1 text-xs text-white/40">Database pooling and performance patches applied.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400">
                <Users size={18} />
              </div>
              <div>
                <p className="text-sm font-bold text-white">Multi-user Beta</p>
                <p className="mt-1 text-xs text-white/40">Preparing role-based access control for team members.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
