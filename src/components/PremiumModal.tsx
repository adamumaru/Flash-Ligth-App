import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Zap, Check, Sparkles, Clock, AlertTriangle, Quote } from 'lucide-react';
import { COMEDY_QUOTES, PREMIUM_FEATURES } from '../types';

interface PremiumModalProps {
  isOpen: boolean;
  onUpgradeNow: () => void;
  onMaybeLater: () => void;
  isDark: boolean;
}

export const PremiumModal: React.FC<PremiumModalProps> = ({
  isOpen,
  onUpgradeNow,
  onMaybeLater,
  isDark
}) => {
  const [randomQuote, setRandomQuote] = useState<string>('');
  const [secondsLeft, setSecondsLeft] = useState<number>(599); // 09:59

  useEffect(() => {
    if (isOpen) {
      // Pick random quote every time page opens
      const idx = Math.floor(Math.random() * COMEDY_QUOTES.length);
      setRandomQuote(COMEDY_QUOTES[idx]);
      // Reset countdown timer to 09:59 every time app/modal opens as requested
      setSecondsLeft(599);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const interval = setInterval(() => {
      setSecondsLeft(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [isOpen]);

  const formatTimer = (totalSec: number) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
        
        <motion.div
          initial={{ y: '100%', opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: '100%', opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 220 }}
          className={`w-full max-w-lg rounded-t-3xl sm:rounded-3xl p-6 shadow-2xl relative border overflow-hidden transition-colors ${
            isDark
              ? 'bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 text-slate-100 border-amber-500/30'
              : 'bg-gradient-to-b from-white via-amber-50/30 to-amber-100/50 text-slate-900 border-amber-300'
          }`}
        >
          {/* Top Parody Banner Badge */}
          <div className="absolute top-0 inset-x-0 bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 text-slate-950 text-[11px] font-black uppercase tracking-widest text-center py-1.5 flex items-center justify-center gap-2 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 fill-current" />
            <span>OFFICIAL ENTERPRISE PAYWALL</span>
            <Sparkles className="w-3.5 h-3.5 fill-current" />
          </div>

          <div className="mt-5 space-y-5">
            {/* Header Title */}
            <div className="text-center space-y-1">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/15 text-amber-600 dark:text-amber-400 font-extrabold text-sm border border-amber-500/30">
                <span>⚡</span>
                <span>Free Trial Ended</span>
              </div>

              <h2 className="text-2xl font-black tracking-tight pt-2">
                Congratulations!
              </h2>
              <p className="text-sm font-semibold text-slate-600 dark:text-slate-300 max-w-xs mx-auto">
                You have successfully used your complimentary flashlight session.
              </p>
            </div>

            {/* Comedy Quote Box */}
            {randomQuote && (
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/25 flex items-start gap-3"
              >
                <Quote className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs italic font-bold text-amber-700 dark:text-amber-300">
                    &quot;{randomQuote}&quot;
                  </p>
                  <span className="text-[10px] font-mono text-amber-600/80 dark:text-amber-400/80 uppercase">
                    — AI Photon Governance Committee
                  </span>
                </div>
              </motion.div>
            )}

            {/* Subtitle Body */}
            <p className="text-xs text-center text-slate-500 dark:text-slate-400">
              To continue enjoying premium illumination, please upgrade to the <strong className="text-amber-600 dark:text-amber-400 font-bold">Lifetime Light Membership</strong>.
            </p>

            {/* Price Box */}
            <div className="p-4 rounded-2xl border bg-slate-50 dark:bg-slate-900 border-slate-100 dark:border-slate-800 relative overflow-hidden">
              <div className="flex justify-between items-end mb-2">
                <div className="text-left">
                  <p className="text-[10px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest">
                    Lifetime Plan
                  </p>
                  <div className="flex items-center gap-2">
                    <span className="text-3xl font-black text-slate-900 dark:text-white">$49.99</span>
                    <span className="text-sm text-slate-400 line-through">$199.99</span>
                  </div>
                </div>
                <div className="bg-amber-400 text-slate-900 text-[10px] font-black px-2 py-1 rounded-lg shadow-xs">
                  75% OFF TODAY
                </div>
              </div>
              <div className="flex items-center gap-2 text-[11px] text-slate-400 font-medium">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                <span>Offer Ends In <strong className="text-slate-900 dark:text-white font-bold">{formatTimer(secondsLeft)}</strong></span>
              </div>
            </div>

            {/* Features List */}
            <div className="space-y-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Premium Includes
              </h3>
              <div className="grid grid-cols-2 gap-x-4 gap-y-2 w-full text-[11px] text-slate-600 dark:text-slate-300 font-medium">
                {PREMIUM_FEATURES.map((feat, index) => (
                  <div
                    key={index}
                    className={`flex items-center gap-1.5 py-0.5 text-left ${
                      feat.highlight ? 'text-blue-600 dark:text-blue-400 font-bold' : 'text-slate-600 dark:text-slate-300'
                    }`}
                  >
                    <span className="text-blue-600 dark:text-blue-400 font-bold">✔</span>
                    <span className="truncate">{feat.text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Buttons */}
            <div className="space-y-2.5 pt-2">
              {/* Large Gold Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={onUpgradeNow}
                className="w-full bg-amber-400 hover:bg-amber-500 text-slate-900 font-black py-4 rounded-2xl shadow-lg shadow-amber-200 dark:shadow-none transition-all text-sm flex items-center justify-center gap-2"
              >
                <Zap className="w-5 h-5 fill-current" />
                <span>UPGRADE NOW</span>
              </motion.button>

              {/* Gray Button */}
              <button
                onClick={onMaybeLater}
                className="w-full bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 font-bold py-3 rounded-2xl text-xs hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
              >
                Maybe Later
              </button>
            </div>

            {/* Fine print */}
            <div className="text-[10px] text-center text-slate-400 dark:text-slate-500 pt-1 border-t border-slate-200/50 dark:border-slate-800">
              ⚡ Guaranteed 100% Photon Purity. Cancel anytime before sunrise.
            </div>

          </div>
        </motion.div>

      </div>
    </AnimatePresence>
  );
};
