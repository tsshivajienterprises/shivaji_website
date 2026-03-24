import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Globe, 
  Save, 
  Shield, 
  User,
  CheckCircle,
  Clock,
  Unlock
} from 'lucide-react';
import api from '../../services/api';
import { useAuth } from '../../context/AuthContext';

const SettingCard = ({ title, icon: Icon, children }) => (
  <div className="rounded-3xl border border-white/5 bg-white/[0.02] p-8 space-y-6">
    <div className="flex items-center gap-3">
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#D4AF37]/10 text-[#D4AF37]">
        <Icon size={20} />
      </div>
      <h3 className="font-bold text-white">{title}</h3>
    </div>
    <div className="space-y-4">
      {children}
    </div>
  </div>
);

const InputField = ({ label, icon: Icon, ...props }) => (
  <div className="space-y-2">
    <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/30">{label}</label>
    <div className="relative">
      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20">
        <Icon size={16} />
      </div>
      <input 
        className="w-full rounded-2xl border border-white/5 bg-white/[0.03] py-4 pl-12 pr-4 text-sm text-white outline-none focus:border-[#D4AF37]/40 focus:bg-white/[0.05] transition-all"
        {...props} 
      />
    </div>
  </div>
);

export default function SettingsPage() {
  const { user } = useAuth();
  const [settings, setSettings] = useState({
    siteName: 'TS SHIVA JI ENTERPRICES PVT LTD',
    contactPhone: '+91 90001 64356',
    contactEmail: 'tsshivajienterprises@gmail.com',
    officeAddress: 'Villa-3, Dev Prime Villas Block-1, Patancheru, Telangana, India',
    whatsappNumber: '919000164356'
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await api.get('/admin/settings');
        if (Array.isArray(res.data.settings)) {
          const sMap = {};
          res.data.settings.forEach(s => {
            if (s.settingKey) sMap[s.settingKey] = s.settingValue;
          });
          setSettings(prev => ({ ...prev, ...sMap }));
        }
      } catch (err) {
        console.error("Failed to fetch settings", err);
      } finally {
        setLoading(false);
      }
    };
    fetchSettings();
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setSuccess(false);
    try {
      const settingsArray = Object.keys(settings).map(key => ({
        settingKey: key,
        settingValue: settings[key]
      }));
      await api.patch('/admin/settings', { settings: settingsArray });
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      alert("Failed to update settings");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="animate-pulse space-y-8"><div className="h-20 w-1/3 bg-white/5 rounded-3xl"></div><div className="grid lg:grid-cols-2 gap-8"><div className="h-96 bg-white/5 rounded-3xl"></div><div className="h-96 bg-white/5 rounded-3xl"></div></div></div>;

  return (
    <div className="space-y-10">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black text-white">Site <span className="text-[#D4AF37]">Settings</span></h1>
          <p className="mt-1 text-sm text-white/40">Configure your website contact details and platform preferences</p>
        </div>
        <AnimatePresence>
          {success && (
            <motion.div
               initial={{ opacity: 0, x: 20 }}
               animate={{ opacity: 1, x: 0 }}
               exit={{ opacity: 0 }}
               className="flex items-center gap-2 rounded-full bg-emerald-500/10 px-4 py-2 text-xs font-bold text-emerald-500 border border-emerald-500/20"
            >
              <CheckCircle size={14} /> Changes Saved Successfully
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <form onSubmit={handleSave} className="grid gap-8 lg:grid-cols-2">
        <div className="space-y-8">
          <SettingCard title="Company Information" icon={Globe}>
            <InputField 
              label="Business Name" 
              icon={Shield} 
              value={settings.siteName}
              onChange={(e) => setSettings({...settings, siteName: e.target.value})}
            />
            <div className="grid gap-4 sm:grid-cols-2">
              <InputField 
                label="Primary Email" 
                icon={Mail} 
                value={settings.contactEmail}
                onChange={(e) => setSettings({...settings, contactEmail: e.target.value})}
              />
              <InputField 
                label="Primary Phone" 
                icon={Phone} 
                value={settings.contactPhone}
                onChange={(e) => setSettings({...settings, contactPhone: e.target.value})}
              />
            </div>
          </SettingCard>

          <SettingCard title="Reach & Support" icon={Phone}>
            <InputField 
              label="WhatsApp Integration (91XXXXXXXXXX)" 
              icon={Globe} 
                value={settings.whatsappNumber}
                onChange={(e) => setSettings({...settings, whatsappNumber: e.target.value})}
            />
            <InputField 
              label="Office Location Address" 
              icon={MapPin} 
              value={settings.officeAddress}
              onChange={(e) => setSettings({...settings, officeAddress: e.target.value})}
            />
          </SettingCard>
        </div>

        <div className="space-y-8">
          <SettingCard title="Security & Admin Profile" icon={User}>
            <div className="flex gap-4 p-4 rounded-2xl bg-white/[0.03] border border-white/5">
               <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#D4AF37] text-black font-black">
                 {user?.name?.charAt(0)}
               </div>
               <div>
                 <p className="font-bold text-white">{user?.name}</p>
                 <p className="text-xs text-white/40">{user?.email}</p>
                 <span className="mt-2 inline-block rounded-md bg-[#D4AF37]/10 px-2 py-0.5 text-[9px] font-black uppercase text-[#D4AF37] tracking-widest">Master Admin</span>
               </div>
            </div>
            
            <div className="rounded-2xl border border-[#D4AF37]/20 bg-[#D4AF37]/5 p-6">
               <div className="flex items-center gap-3 text-[#D4AF37] mb-2">
                 <Unlock size={18} />
                 <h4 className="font-black text-sm uppercase tracking-widest">Password Protocol</h4>
               </div>
               <p className="text-xs text-[#D4AF37]/70 leading-relaxed mb-4">To update your master login password, please use the cloud security console or contact the developer for a hash update.</p>
               <button type="button" className="text-[10px] font-black uppercase tracking-widest text-[#D4AF37] hover:underline opacity-50 cursor-not-allowed">Reset Requested (Coming Soon)</button>
            </div>
          </SettingCard>

          <div className="rounded-3xl bg-[#D4AF37] p-8 shadow-[0_0_50px_rgba(212,175,55,0.2)]">
            <h4 className="text-xl font-black text-black mb-2">Ready to publish?</h4>
            <p className="text-xs text-black/60 font-medium mb-6">Updating these settings will instantly change the contact information in the website footer and map overlays.</p>
            <button 
              type="submit"
              disabled={saving}
              className="flex w-full items-center justify-center gap-3 rounded-full bg-black py-4 text-sm font-black uppercase tracking-widest text-white transition-all hover:scale-[1.03] active:scale-100 disabled:opacity-50"
            >
              {saving ? <div className="h-4 w-4 animate-spin rounded-full border-b-2 border-white"></div> : <><Save size={18} /> SAVE ALL CHANGES</>}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
