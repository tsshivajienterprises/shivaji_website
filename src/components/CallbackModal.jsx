import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { X, Phone, User, Clock, CheckCircle } from 'lucide-react';
import api from '../services/api';

export default function CallbackModal({ isOpen, onClose }) {
  const [form, setForm] = useState({ name: '', phone: '', preferredTime: '', notes: '' });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await api.post('/callback-requests', form);
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        onClose();
        setForm({ name: '', phone: '', preferredTime: '', notes: '' });
      }, 3000);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to submit request');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        />
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative w-full max-w-lg overflow-hidden rounded-[32px] border border-white/10 bg-[#0B1020] p-8 shadow-2xl"
        >
          <button 
            onClick={onClose}
            className="absolute right-6 top-6 text-white/40 hover:text-white transition-colors"
          >
            <X size={24} />
          </button>

          {success ? (
            <div className="flex flex-col items-center py-12 text-center">
              <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-500">
                <CheckCircle size={48} />
              </div>
              <h3 className="text-2xl font-black text-white">Request Received!</h3>
              <p className="mt-2 text-white/60">Our team will call you back at your preferred time.</p>
            </div>
          ) : (
            <>
              <div className="mb-8">
                <h3 className="text-2xl font-black text-white">Request a <span className="text-[#D4AF37]">Callback</span></h3>
                <p className="mt-2 text-sm text-white/40">Leave your details and we'll call you back shortly.</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={18} />
                  <input
                    type="text"
                    required
                    placeholder="Full Name"
                    className="w-full rounded-2xl border border-white/10 bg-white/[0.03] py-4 pl-12 pr-4 text-white outline-none focus:border-[#D4AF37]/50"
                    value={form.name}
                    onChange={e => setForm({...form, name: e.target.value})}
                  />
                </div>

                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={18} />
                  <input
                    type="tel"
                    required
                    placeholder="Phone Number"
                    className="w-full rounded-2xl border border-white/10 bg-white/[0.03] py-4 pl-12 pr-4 text-white outline-none focus:border-[#D4AF37]/50"
                    value={form.phone}
                    onChange={e => setForm({...form, phone: e.target.value})}
                  />
                </div>

                <div className="relative">
                  <Clock className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={18} />
                  <input
                    type="text"
                    placeholder="Preferred Time (e.g. 2 PM - 4 PM)"
                    className="w-full rounded-2xl border border-white/10 bg-white/[0.03] py-4 pl-12 pr-4 text-white outline-none focus:border-[#D4AF37]/50"
                    value={form.preferredTime}
                    onChange={e => setForm({...form, preferredTime: e.target.value})}
                  />
                </div>

                <textarea
                  placeholder="Additional Notes (Optional)"
                  rows="3"
                  className="w-full rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-white outline-none focus:border-[#D4AF37]/50 resize-none"
                  value={form.notes}
                  onChange={e => setForm({...form, notes: e.target.value})}
                />

                {error && <p className="text-xs text-red-500">{error}</p>}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full rounded-2xl bg-[#D4AF37] py-4 text-sm font-black uppercase tracking-widest text-[#0B1020] transition-all hover:scale-[1.02] active:scale-100 disabled:opacity-50"
                >
                  {loading ? 'Submitting...' : 'Request Callback'}
                </button>
              </form>
            </>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
