import React from 'react';
import { Cpu, Zap, Activity, ShieldAlert } from 'lucide-react';

interface PhotonTelemetryProps {
  isLocked: boolean;
  isOn: boolean;
  isDark: boolean;
}

export const PhotonTelemetry: React.FC<PhotonTelemetryProps> = ({ isLocked, isOn, isDark }) => {
  return (
    <div className={`w-full max-w-md mx-auto px-5 py-4 my-2 rounded-2xl border transition-colors ${
      isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-slate-50/80 border-slate-200/80'
    }`}>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Cpu className="w-4 h-4 text-amber-500" />
          <span className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
            AI Photon Telemetry™
          </span>
        </div>
        <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-amber-500/10 text-amber-600 dark:text-amber-400 font-semibold">
          v25.0 Live
        </span>
      </div>

      <div className="grid grid-cols-2 gap-2 text-xs">
        <div className={`p-2.5 rounded-xl border ${isDark ? 'bg-slate-950/50 border-slate-800/80' : 'bg-white border-slate-100'}`}>
          <div className="text-[10px] text-slate-400 flex items-center gap-1 font-medium">
            <Activity className="w-3 h-3 text-amber-500" />
            <span>Beam Technology</span>
          </div>
          <div className="font-bold text-slate-800 dark:text-slate-200 mt-1">
            Quantum 4K Beam
          </div>
        </div>

        <div className={`p-2.5 rounded-xl border ${isDark ? 'bg-slate-950/50 border-slate-800/80' : 'bg-white border-slate-100'}`}>
          <div className="text-[10px] text-slate-400 flex items-center gap-1 font-medium">
            <Zap className="w-3 h-3 text-amber-500" />
            <span>AI Brightness</span>
          </div>
          <div className="font-bold text-slate-800 dark:text-slate-200 mt-1">
            {isOn ? '100% Calibrated' : 'Standby'}
          </div>
        </div>

        <div className={`p-2.5 rounded-xl border col-span-2 ${
          isLocked
            ? 'bg-rose-500/5 border-rose-500/20 text-rose-600 dark:text-rose-400'
            : isDark ? 'bg-slate-950/50 border-slate-800/80' : 'bg-white border-slate-100'
        }`}>
          <div className="flex items-center justify-between text-[11px] font-semibold">
            <span className="flex items-center gap-1">
              <ShieldAlert className="w-3.5 h-3.5" />
              <span>Complimentary Photon Quota</span>
            </span>
            <span className="font-mono font-bold">
              {isLocked ? '0.00 / 1.00 Used' : '1.00 / 1.00 Remaining'}
            </span>
          </div>
          <div className="w-full bg-slate-200 dark:bg-slate-800 h-1.5 rounded-full mt-2 overflow-hidden">
            <div
              className={`h-full transition-all duration-500 ${isLocked ? 'w-full bg-rose-500' : isOn ? 'w-full bg-amber-400 animate-pulse' : 'w-0 bg-emerald-500'}`}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
