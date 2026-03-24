import { useState } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BarChart3, 
  MessageSquare, 
  PhoneCall, 
  Settings, 
  Image, 
  Briefcase, 
  LogOut, 
  Menu, 
  X,
  ChevronRight
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const navItems = [
  { path: '/admin/dashboard', icon: BarChart3, label: 'Overview' },
  { path: '/admin/enquiries', icon: MessageSquare, label: 'Enquiries' },
  { path: '/admin/callbacks', icon: PhoneCall, label: 'Callbacks' },
  { path: '/admin/projects', icon: Briefcase, label: 'Projects' },
  { path: '/admin/gallery', icon: Image, label: 'Gallery' },
  { path: '/admin/settings', icon: Settings, label: 'Site Settings' },
];

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  return (
    <div className="flex min-h-screen bg-[#050810] text-gray-200">
      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <aside className={`
        fixed left-0 top-0 z-50 h-full w-72 border-r border-white/5 bg-[#0B1020] transition-transform duration-300
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="flex flex-col h-full">
          {/* Sidebar Header */}
          <div className="flex items-center gap-3 p-8">
            <img src="/logo.png" alt="Logo" className="h-8" />
            <div>
              <p className="text-xs font-black tracking-widest text-white">TS SHIVA JI</p>
              <p className="text-[10px] text-[#D4AF37]">ADMIN PANEL</p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-2 px-4">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setSidebarOpen(false)}
                className={({ isActive }) => `
                  flex items-center justify-between rounded-xl px-4 py-3.5 text-sm transition-all duration-200
                  ${isActive 
                    ? 'bg-[#D4AF37] text-black shadow-[0_0_20px_rgba(212,175,55,0.15)]' 
                    : 'text-white/50 hover:bg-white/5 hover:text-white'}
                `}
              >
                <div className="flex items-center gap-3">
                  <item.icon size={18} />
                  <span className="font-semibold">{item.label}</span>
                </div>
                <ChevronRight size={14} className="opacity-40" />
              </NavLink>
            ))}
          </nav>

          {/* User Section */}
          <div className="border-t border-white/5 p-6">
            <div className="mb-4 flex items-center gap-3 rounded-2xl bg-white/5 p-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#D4AF37]/20 text-[#D4AF37]">
                {user?.name?.charAt(0) || 'A'}
              </div>
              <div className="overflow-hidden">
                <p className="truncate text-sm font-bold text-white">{user?.name || 'Admin User'}</p>
                <p className="truncate text-[10px] text-white/30 uppercase tracking-tighter">Super Admin</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-red-400 transition-colors hover:bg-red-400/10"
            >
              <LogOut size={18} />
              Logout
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 lg:ml-72">
        {/* Header */}
        <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-white/5 bg-[#050810]/80 px-8 backdrop-blur-xl">
          <button 
            onClick={() => setSidebarOpen(true)}
            className="rounded-lg bg-white/5 p-2 text-white/60 lg:hidden"
          >
            <Menu size={20} />
          </button>
          
          <div className="hidden md:block">
            <h2 className="text-sm font-medium text-white/40">Welcome back, <span className="text-[#D4AF37]">{user?.name}</span></h2>
          </div>

          <div className="flex items-center gap-4">
            <button 
              onClick={() => navigate('/')}
              className="rounded-full border border-[#D4AF37]/30 px-5 py-2 text-[11px] font-bold uppercase tracking-widest text-[#D4AF37] transition-all hover:bg-[#D4AF37] hover:text-black"
            >
              View Site
            </button>
          </div>
        </header>

        {/* Dynamic Content */}
        <div className="min-h-[calc(100vh-80px)] p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
