import React, { useState } from 'react';
import { Globe, Shield, Sparkles } from 'lucide-react';

interface AboutFooterProps {
  onDevResetClick: () => void;
  isDark: boolean;
}

export const AboutFooter: React.FC<AboutFooterProps> = ({ onDevResetClick, isDark }) => {
  const [clickCount, setClickCount] = useState<number>(0);

  const handleVersionClick = () => {
    const next = clickCount + 1;
    setClickCount(next);
    if (next >= 3) {
      setClickCount(0);
      onDevResetClick();
    }
  };

  return (
    <footer className={`w-full py-6 px-4 text-center border-t select-none transition-colors ${
      isDark ? 'bg-slate-950/60 border-slate-900 text-slate-400' : 'bg-slate-50/80 border-slate-200/60 text-slate-500'
    }`}>
      <div className="max-w-xs mx-auto space-y-2">
        
        {/* Version line */}
        <button
          onClick={handleVersionClick}
          title="Triple-click for Parody Filming Reset Controls"
          className="text-xs font-mono font-bold text-slate-500 dark:text-slate-400 hover:text-amber-500 transition-colors inline-flex items-center gap-1 cursor-pointer"
        >
          <Shield className="w-3 h-3 text-amber-500" />
          <span>Version 25.0.0 Enterprise</span>
        </button>

        {/* Powered by */}
        <div className="text-[11px] font-semibold text-slate-600 dark:text-slate-300">
          Powered by:{' '}
          <span className="font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-amber-600 to-amber-500 dark:from-amber-400 dark:to-amber-200">
            FlashLight Technologies Inc.
          </span>
        </div>

        {/* Worldwide count */}
        <div className="text-[10px] font-medium text-slate-400 dark:text-slate-500 flex items-center justify-center gap-1">
          <Globe className="w-3 h-3 text-amber-500/80" />
          <span>Serving over <strong>12 Billion Illuminations</strong> Worldwide</span>
        </div>

        {/* Subtle Enterprise Compliance Notice */}
        <div className="text-[9px] font-mono text-slate-400/60 dark:text-slate-600 pt-1">
          ISO 9001 Photon Certified • AI Light Standards Compliant
        </div>

      </div>
    </footer>
  );
};
