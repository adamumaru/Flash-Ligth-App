import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Loader2, Zap, Server, ShieldCheck, Sparkles } from 'lucide-react';
import { SIMULATED_LOADING_STEPS } from '../types';

interface LoadingOverlayProps {
  isOpen: boolean;
  onComplete: () => void;
}

export const LoadingOverlay: React.FC<LoadingOverlayProps> = ({ isOpen, onComplete }) => {
  const [stepIndex, setStepIndex] = useState<number>(0);
  const [progress, setProgress] = useState<number>(5);

  useEffect(() => {
    if (!isOpen) {
      setStepIndex(0);
      setProgress(5);
      return;
    }

    // Step message intervals across 5 seconds total
    const messageInterval = setInterval(() => {
      setStepIndex(prev => {
        if (prev < SIMULATED_LOADING_STEPS.length - 1) {
          return prev + 1;
        }
        return prev;
      });
    }, 900);

    // Progress bar up to 99%
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev < 99) {
          const next = prev + Math.floor(Math.random() * 15) + 5;
          return next > 99 ? 99 : next;
        }
        return 99;
      });
    }, 250);

    // Timeout after exactly 5 seconds (5000ms)
    const timer = setTimeout(() => {
      onComplete();
    }, 5000);

    return () => {
      clearInterval(messageInterval);
      clearInterval(progressInterval);
      clearTimeout(timer);
    };
  }, [isOpen, onComplete]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-slate-950/95 text-white p-6 backdrop-blur-xl">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="w-full max-w-sm text-center space-y-6"
      >
        {/* Pulsing Icon */}
        <div className="relative mx-auto w-24 h-24 flex items-center justify-center">
          <div className="absolute inset-0 bg-amber-500/20 rounded-full animate-ping" />
          <div className="w-20 h-20 bg-gradient-to-tr from-amber-400 to-amber-600 rounded-full flex items-center justify-center shadow-2xl shadow-amber-500/50">
            <Zap className="w-10 h-10 text-slate-950 fill-current animate-pulse" />
          </div>
        </div>

        <div>
          <h3 className="text-xl font-black tracking-tight text-amber-400">
            Upgrading to Lifetime Light...
          </h3>
          <p className="text-xs font-mono text-slate-400 mt-1 flex items-center justify-center gap-1.5">
            <Server className="w-3.5 h-3.5 text-amber-500 animate-spin" />
            <span>FLASHLIGHT-CLOUD-US-EAST-1</span>
          </p>
        </div>

        {/* Progress Bar & Percentage */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs font-mono font-bold text-amber-400">
            <span>PROCESSSING</span>
            <span>{progress}%</span>
          </div>

          <div className="w-full bg-slate-800 h-3 rounded-full overflow-hidden p-0.5 border border-slate-700">
            <motion.div
              className="bg-gradient-to-r from-amber-400 to-amber-500 h-full rounded-full"
              style={{ width: `${progress}%` }}
              transition={{ ease: "easeOut", duration: 0.2 }}
            />
          </div>
        </div>

        {/* Current Step Status Text */}
        <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 text-xs font-medium text-slate-300 flex items-center justify-center gap-2.5 shadow-inner min-h-[48px]">
          <Loader2 className="w-4 h-4 text-amber-400 animate-spin shrink-0" />
          <motion.span
            key={stepIndex}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-mono text-amber-200"
          >
            {SIMULATED_LOADING_STEPS[stepIndex]}
          </motion.span>
        </div>

        <div className="text-[10px] text-slate-500 flex items-center justify-center gap-1">
          <ShieldCheck className="w-3 h-3 text-emerald-500" />
          <span>256-Bit Photon Encryption Active</span>
        </div>

      </motion.div>
    </div>
  );
};
