import React from 'react';
import { motion } from 'motion/react';
import { Zap, Lock, Sparkles, AlertCircle, CheckCircle2 } from 'lucide-react';

interface FlashlightBulbProps {
  isOn: boolean;
  isLocked: boolean;
  isDark: boolean;
  onMainButtonClick: () => void;
  permissionRequested?: boolean;
}

export const FlashlightBulb: React.FC<FlashlightBulbProps> = ({
  isOn,
  isLocked,
  isDark,
  onMainButtonClick
}) => {
  return (
    <div className="flex-1 flex flex-col items-center justify-between px-6 py-6 w-full max-w-md mx-auto select-none relative z-10">
      
      {/* Top Photon Status Chips */}
      <div className="w-full flex items-center justify-between">
        <div className={`px-3 py-1.5 rounded-2xl text-xs font-semibold flex items-center gap-1.5 transition-colors ${
          isLocked
            ? 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20'
            : isOn
            ? 'bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/30 shadow-xs'
            : 'bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300'
        }`}>
          {isLocked ? (
            <>
              <AlertCircle className="w-3.5 h-3.5 text-rose-500" />
              <span>Free Photons: 0 / 1 (Exhausted)</span>
            </>
          ) : isOn ? (
            <>
              <Sparkles className="w-3.5 h-3.5 text-amber-500 animate-spin" />
              <span>4K Beam Active</span>
            </>
          ) : (
            <>
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
              <span>1 Free Photon Session Remaining</span>
            </>
          )}
        </div>

        <div className="text-[11px] font-mono text-slate-400 dark:text-slate-500 uppercase tracking-widest font-bold">
          {isLocked ? 'MEMBERSHIP REQUIRED' : 'FREE TRIAL ACTIVE'}
        </div>
      </div>

      {/* Center Flashlight Animated Graphics */}
      <div className="my-auto flex flex-col items-center justify-center relative py-8">
        
        {/* Beam Glow Radiation Cone when ON */}
        {isOn && (
          <>
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: [1, 1.25, 1], opacity: [0.6, 0.9, 0.6] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              className="absolute -top-16 w-72 h-72 rounded-full bg-amber-400/30 dark:bg-amber-400/20 blur-3xl pointer-events-none"
            />
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 260, opacity: 0.8 }}
              className="absolute top-12 w-64 bg-gradient-to-b from-amber-300/40 via-amber-200/20 to-transparent blur-md pointer-events-none rounded-t-full"
            />
          </>
        )}

        {/* Outer Circular Ring Housing */}
        <div className="relative">
          {/* Animated Pulsing Rings */}
          {isOn && (
            <motion.div
              animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0, 0.5] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="absolute -inset-4 rounded-full border-2 border-amber-400/60 pointer-events-none"
            />
          )}

          <motion.div
            whileTap={{ scale: 0.96 }}
            className={`w-44 h-44 rounded-full flex items-center justify-center relative shadow-2xl transition-all duration-500 border-4 ${
              isLocked
                ? 'bg-gradient-to-b from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900 border-slate-300 dark:border-slate-700 shadow-slate-400/10'
                : isOn
                ? 'bg-gradient-to-br from-amber-300 via-amber-400 to-amber-500 border-amber-200 shadow-amber-500/50 ring-8 ring-amber-400/20'
                : isDark
                ? 'bg-gradient-to-b from-slate-800 to-slate-900 border-slate-700 shadow-slate-950/50'
                : 'bg-gradient-to-b from-white to-slate-100 border-slate-200 shadow-slate-200'
            }`}
          >
            {/* Core Flashlight Icon */}
            {isLocked ? (
              <div className="flex flex-col items-center gap-1">
                <Lock className="w-16 h-16 text-slate-400 dark:text-slate-500" />
              </div>
            ) : (
              <div className="relative">
                <Zap
                  className={`w-20 h-20 transition-all duration-300 ${
                    isOn
                      ? 'text-slate-950 fill-slate-950 drop-shadow-[0_0_12px_rgba(255,255,255,0.8)]'
                      : 'text-amber-500/80 dark:text-amber-400/80 fill-amber-500/20'
                  }`}
                />
                {isOn && (
                  <motion.div
                    animate={{ opacity: [0.4, 1, 0.4] }}
                    transition={{ repeat: Infinity, duration: 0.8 }}
                    className="absolute inset-0 flex items-center justify-center text-white"
                  >
                    <Sparkles className="w-12 h-12 text-white animate-pulse" />
                  </motion.div>
                )}
              </div>
            )}
          </motion.div>
        </div>

        {/* Status Text Block */}
        <div className="mt-8 text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-1">
            Status
          </p>
          <div className="flex items-center justify-center gap-2">
            {isLocked && <Lock className="w-5 h-5 text-rose-500" />}
            <h2 className={`text-2xl font-black tracking-tight ${
              isLocked
                ? 'text-slate-800 dark:text-slate-200'
                : isOn
                ? 'text-amber-600 dark:text-amber-400 drop-shadow-xs'
                : 'text-slate-900 dark:text-white'
            }`}>
              {isLocked ? (
                'Flashlight Locked'
              ) : isOn ? (
                <span className="flex items-center gap-2">
                  Flashlight <span className="text-amber-500 underline decoration-amber-400/50">ON</span>
                </span>
              ) : (
                'Flashlight OFF'
              )}
            </h2>
          </div>
          {isLocked && (
            <p className="text-xs text-rose-500/90 font-medium mt-1">
              Trial quota reached (1/1 photolytic usage)
            </p>
          )}
        </div>
      </div>

      {/* Main Action Button */}
      <div className="w-full space-y-3 pb-2">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onMainButtonClick}
          className={`w-full py-4 px-6 rounded-3xl font-extrabold text-base tracking-wide transition-all shadow-xl flex items-center justify-center gap-2.5 ${
            isLocked
              ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 shadow-amber-500/25 hover:brightness-105 active:scale-98'
              : isOn
              ? 'bg-slate-900 dark:bg-slate-100 text-slate-100 dark:text-slate-900 shadow-slate-900/20 hover:bg-slate-800'
              : 'bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 text-slate-950 shadow-amber-500/30 hover:shadow-amber-500/40'
          }`}
        >
          {isLocked ? (
            <>
              <Lock className="w-5 h-5" />
              <span>Upgrade Required</span>
            </>
          ) : isOn ? (
            <>
              <Zap className="w-5 h-5 fill-current" />
              <span>TURN OFF</span>
            </>
          ) : (
            <>
              <Zap className="w-5 h-5 fill-current" />
              <span>TURN ON</span>
            </>
          )}
        </motion.button>
      </div>

    </div>
  );
};
