import React from 'react';
import { ShieldCheck, Moon, Sun, Settings, Zap } from 'lucide-react';

interface MaterialNavBarProps {
  isDark: boolean;
  onToggleTheme: () => void;
  onOpenDevDrawer: () => void;
  isLocked: boolean;
}

export const MaterialNavBar: React.FC<MaterialNavBarProps> = ({
  isDark,
  onToggleTheme,
  onOpenDevDrawer,
  isLocked
}) => {
  return (
    <header className={`w-full px-5 py-3.5 flex items-center justify-between border-b transition-colors duration-300 ${
      isDark ? 'bg-slate-900/90 border-slate-800 text-slate-100' : 'bg-white/90 border-slate-100 text-slate-900'
    } backdrop-blur-md`}>
      <div className="flex items-center gap-3">
        <div className={`p-2 rounded-2xl flex items-center justify-center shadow-xs transition-transform duration-300 ${
          isLocked 
            ? 'bg-amber-500/10 text-amber-500 ring-1 ring-amber-500/30' 
            : 'bg-gradient-to-br from-amber-400 to-amber-600 text-slate-950 shadow-amber-500/20'
        }`}>
          <Zap className="w-5 h-5 fill-current" />
        </div>

        <div>
          <div className="flex items-center gap-1.5">
            <h1 className="font-extrabold text-lg tracking-tight font-sans text-slate-900 dark:text-white">
              FlashLight<span className="text-blue-600">++</span>
            </h1>
            <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 text-[10px] font-extrabold rounded-full bg-blue-50 text-blue-600 dark:bg-blue-950/60 dark:text-blue-400 border border-blue-200/60 dark:border-blue-800/60">
              <ShieldCheck className="w-3 h-3 text-blue-600 dark:text-blue-400" />
              PRO
            </span>
          </div>
          <p className="text-[11px] font-medium text-slate-500 dark:text-slate-400 -mt-0.5 tracking-tight">
            The World&apos;s First Premium Flashlight
          </p>
        </div>
      </div>

      <div className="flex items-center gap-1">
        <button
          onClick={onToggleTheme}
          aria-label="Toggle Theme"
          className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        >
          {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-600" />}
        </button>

        <button
          onClick={onOpenDevDrawer}
          title="Parody Dev Controls & Trial Reset"
          className="p-2 rounded-xl text-slate-400 hover:text-amber-500 hover:bg-amber-500/10 transition-colors"
        >
          <Settings className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
};
