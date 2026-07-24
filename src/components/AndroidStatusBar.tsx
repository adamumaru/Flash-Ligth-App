import React, { useState, useEffect } from 'react';
import { Wifi, Signal, Battery, Sparkles } from 'lucide-react';

interface AndroidStatusBarProps {
  isDark?: boolean;
}

export const AndroidStatusBar: React.FC<AndroidStatusBarProps> = ({ isDark = false }) => {
  const [currentTime, setCurrentTime] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }));
    };
    updateTime();
    const interval = setInterval(updateTime, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`w-full px-5 py-2.5 flex items-center justify-between text-xs font-semibold select-none transition-colors duration-300 ${
      isDark ? 'text-slate-100 bg-slate-950/80' : 'text-slate-800 bg-white/80'
    } backdrop-blur-md border-b border-black/5`}>
      <div className="flex items-center gap-1.5">
        <span>{currentTime || '09:41'}</span>
        <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
          <Sparkles className="w-2.5 h-2.5" /> 5G+
        </span>
      </div>

      <div className="flex items-center gap-2">
        <Signal className="w-3.5 h-3.5" />
        <Wifi className="w-3.5 h-3.5" />
        <div className="flex items-center gap-1">
          <span className="text-[10px] font-mono">99%</span>
          <Battery className="w-4 h-4 fill-current" />
        </div>
      </div>
    </div>
  );
};
