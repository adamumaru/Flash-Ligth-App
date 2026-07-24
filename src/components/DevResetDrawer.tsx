import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { RefreshCw, Video, Database, CheckCircle, X } from 'lucide-react';

interface DevResetDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onResetTrial: () => void;
  isTrialEnded: boolean;
  isDark: boolean;
}

export const DevResetDrawer: React.FC<DevResetDrawerProps> = ({
  isOpen,
  onClose,
  onResetTrial,
  isTrialEnded,
  isDark
}) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className={`w-full max-w-sm rounded-3xl p-6 shadow-2xl border space-y-4 relative ${
            isDark ? 'bg-slate-900 border-amber-500/30 text-white' : 'bg-white border-amber-300 text-slate-900'
          }`}
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-2">
            <Video className="w-5 h-5 text-amber-500" />
            <h3 className="text-base font-black tracking-tight">
              Video Filming / Dev Controls
            </h3>
          </div>

          <p className="text-xs text-slate-500 dark:text-slate-400">
            Easily reset trial state for recording multiple comedy video takes.
          </p>

          <div className="p-3 rounded-2xl bg-slate-100 dark:bg-slate-800 border text-xs space-y-1.5 font-mono">
            <div className="flex items-center justify-between">
              <span>Jetpack DataStore:</span>
              <span className={`font-bold ${isTrialEnded ? 'text-rose-500' : 'text-emerald-500'}`}>
                {isTrialEnded ? 'LOCKED (0 Photons)' : 'FRESH (1 Photon)'}
              </span>
            </div>
            <div className="flex items-center justify-between text-[11px] text-slate-400">
              <span>Free Session Limit:</span>
              <span>1 Completion</span>
            </div>
          </div>

          <div className="space-y-2 pt-2">
            <button
              onClick={() => {
                onResetTrial();
                onClose();
              }}
              className="w-full py-3 px-4 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-xs tracking-wider uppercase flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Reset Free Trial (Re-enable 1 Session)</span>
            </button>

            <button
              onClick={onClose}
              className="w-full py-2.5 px-4 rounded-xl text-xs font-semibold text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            >
              Close
            </button>
          </div>

          <div className="text-[10px] text-center text-slate-400 flex items-center justify-center gap-1">
            <Database className="w-3 h-3 text-amber-500" />
            <span>Simulating Jetpack DataStore Proto Storage</span>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
};
