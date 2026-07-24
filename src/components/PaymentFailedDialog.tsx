import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Moon, AlertOctagon, SunDim } from 'lucide-react';

interface PaymentFailedDialogProps {
  isOpen: boolean;
  onClose: () => void;
  isDark: boolean;
}

export const PaymentFailedDialog: React.FC<PaymentFailedDialogProps> = ({
  isOpen,
  onClose,
  isDark
}) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
        <motion.div
          initial={{ scale: 0.85, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.85, opacity: 0 }}
          className={`w-full max-w-sm rounded-3xl p-6 shadow-2xl border text-center space-y-4 ${
            isDark
              ? 'bg-slate-900 border-slate-800 text-white'
              : 'bg-white border-slate-200 text-slate-900'
          }`}
        >
          {/* Icon */}
          <div className="mx-auto w-16 h-16 rounded-full bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-500">
            <AlertOctagon className="w-8 h-8" />
          </div>

          <div>
            <h3 className="text-xl font-black tracking-tight text-rose-600 dark:text-rose-400">
              PAYMENT FAILED
            </h3>
            <p className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider mt-0.5">
              ERROR CODE: SERVER_SLEEP_0x404
            </p>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/60 text-xs text-left space-y-2">
            <div className="font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
              <Moon className="w-4 h-4 text-amber-500 shrink-0" />
              <span>Reason:</span>
            </div>
            <p className="text-slate-600 dark:text-slate-300 font-medium leading-relaxed pl-5">
              Your flashlight subscription server is currently asleep. Please try again after sunrise.
            </p>
          </div>

          <div className="pt-2">
            <button
              onClick={onClose}
              className="w-full py-3.5 px-6 rounded-2xl bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 font-extrabold text-sm tracking-wide shadow-lg hover:bg-slate-800 transition-all active:scale-98"
            >
              OK
            </button>
          </div>

          <div className="text-[10px] text-slate-400 flex items-center justify-center gap-1">
            <SunDim className="w-3 h-3 text-amber-500" />
            <span>Sunrise ETA: ~06:00 AM Local Time</span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
