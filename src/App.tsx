import React, { useState, useEffect, useCallback } from 'react';
import { AndroidStatusBar } from './components/AndroidStatusBar';
import { MaterialNavBar } from './components/MaterialNavBar';
import { FlashlightBulb } from './components/FlashlightBulb';
import { PhotonTelemetry } from './components/PhotonTelemetry';
import { PremiumModal } from './components/PremiumModal';
import { LoadingOverlay } from './components/LoadingOverlay';
import { PaymentFailedDialog } from './components/PaymentFailedDialog';
import { AboutFooter } from './components/AboutFooter';
import { DevResetDrawer } from './components/DevResetDrawer';
import { DataStore } from './utils/dataStore';
import { SoundEngine } from './utils/audio';
import { TorchController } from './utils/torch';
import { Smartphone, Maximize2, Minimize2 } from 'lucide-react';

export default function App() {
  const [isDark, setIsDark] = useState<boolean>(false);
  const [useDeviceFrame, setUseDeviceFrame] = useState<boolean>(true);
  
  // Flashlight state
  const [isOn, setIsOn] = useState<boolean>(false);
  const [isTrialEnded, setIsTrialEnded] = useState<boolean>(false);
  
  // Modals & Overlays
  const [isPremiumModalOpen, setIsPremiumModalOpen] = useState<boolean>(false);
  const [isLoadingUpgrade, setIsLoadingUpgrade] = useState<boolean>(false);
  const [isPaymentFailedOpen, setIsPaymentFailedOpen] = useState<boolean>(false);
  const [isDevDrawerOpen, setIsDevDrawerOpen] = useState<boolean>(false);

  // Initialize DataStore on mount
  useEffect(() => {
    const trialState = DataStore.isTrialEnded();
    setIsTrialEnded(trialState);
  }, []);

  // Main Flashlight Button Click handler
  const handleMainButtonClick = useCallback(async () => {
    // If trial has ended or user is locked: Do NOT turn on flashlight. Show Premium screen.
    if (isTrialEnded) {
      SoundEngine.playLockDenied();
      setIsPremiumModalOpen(true);
      return;
    }

    // First attempt: Toggle ON or OFF
    if (!isOn) {
      // TURN ON
      SoundEngine.playTurnOn();
      setIsOn(true);
      await TorchController.turnOn();
    } else {
      // TURN OFF - Free trial ends after turning off!
      SoundEngine.playTurnOff();
      setIsOn(false);
      await TorchController.turnOff();
      
      // Permanently lock the flashlight in DataStore
      DataStore.setTrialEnded(true);
      setIsTrialEnded(true);
    }
  }, [isOn, isTrialEnded]);

  // Upgrade Now flow
  const handleUpgradeNow = () => {
    setIsPremiumModalOpen(false);
    setIsLoadingUpgrade(true);
  };

  // When 5-second simulated cloud sync loading finishes
  const handleLoadingComplete = () => {
    setIsLoadingUpgrade(false);
    SoundEngine.playLockDenied();
    setIsPaymentFailedOpen(true);
  };

  // Payment Failed dialog OK
  const handleClosePaymentFailed = () => {
    setIsPaymentFailedOpen(false);
  };

  // Maybe Later
  const handleMaybeLater = () => {
    setIsPremiumModalOpen(false);
  };

  // Dev Reset
  const handleResetTrial = async () => {
    if (isOn) {
      setIsOn(false);
      await TorchController.turnOff();
    }
    DataStore.resetDataStore();
    setIsTrialEnded(false);
    setIsPremiumModalOpen(false);
  };

  return (
    <div className={`min-h-screen w-full transition-colors duration-300 font-sans flex flex-col items-center justify-center relative overflow-x-hidden ${
      isDark ? 'bg-slate-950 text-slate-100' : 'bg-[#F3F4F6] text-slate-900'
    }`}>
      
      {/* Screen Bright Beam Flash Overlay when flashlight is ON */}
      {isOn && (
        <div className="fixed inset-0 bg-amber-100/30 dark:bg-amber-300/20 pointer-events-none z-0 animate-pulse transition-opacity duration-300" />
      )}

      {/* Frame View Toggle Floating Button for Desktop/Previewers */}
      <div className="fixed top-3 right-3 z-40 hidden sm:flex items-center gap-2 bg-slate-900/80 text-white p-1.5 px-3 rounded-full text-xs font-semibold backdrop-blur-md shadow-lg border border-slate-700">
        <button
          onClick={() => setUseDeviceFrame(!useDeviceFrame)}
          className="flex items-center gap-1.5 hover:text-amber-400 transition-colors"
        >
          <Smartphone className="w-3.5 h-3.5" />
          <span>{useDeviceFrame ? 'Full View' : 'Device Frame'}</span>
          {useDeviceFrame ? <Maximize2 className="w-3 h-3" /> : <Minimize2 className="w-3 h-3" />}
        </button>
      </div>

      {/* App Container (Phone Frame or Full viewport) */}
      <div className={`w-full transition-all duration-300 flex flex-col relative z-10 ${
        useDeviceFrame
          ? 'max-w-[380px] my-0 sm:my-6 rounded-none sm:rounded-[48px] shadow-2xl border-0 sm:border-[10px] border-slate-900 overflow-hidden min-h-screen sm:h-[720px] sm:min-h-[720px] bg-white dark:bg-slate-950'
          : 'max-w-xl min-h-screen bg-white dark:bg-slate-950 shadow-xl'
      }`}>

        {/* Android Hardware Punch Hole Notch in Device Frame mode */}
        {useDeviceFrame && (
          <div className="hidden sm:block absolute top-2 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-slate-900 border border-slate-800 z-50 pointer-events-none" />
        )}

        {/* Android Status Bar */}
        <AndroidStatusBar isDark={isDark} />

        {/* Material 3 Top Navigation Bar */}
        <MaterialNavBar
          isDark={isDark}
          onToggleTheme={() => setIsDark(!isDark)}
          onOpenDevDrawer={() => setIsDevDrawerOpen(true)}
          isLocked={isTrialEnded}
        />

        {/* Main Content Area */}
        <main className="flex-1 flex flex-col justify-between overflow-y-auto">
          {/* Flashlight Core Center Graphic */}
          <FlashlightBulb
            isOn={isOn}
            isLocked={isTrialEnded}
            isDark={isDark}
            onMainButtonClick={handleMainButtonClick}
          />

          {/* AI Photon Telemetry Widget */}
          <div className="px-4">
            <PhotonTelemetry isLocked={isTrialEnded} isOn={isOn} isDark={isDark} />
          </div>

          {/* Parody Enterprise About Page Footer */}
          <AboutFooter
            onDevResetClick={() => setIsDevDrawerOpen(true)}
            isDark={isDark}
          />
        </main>
      </div>

      {/* Premium Paywall Modal */}
      <PremiumModal
        isOpen={isPremiumModalOpen}
        onUpgradeNow={handleUpgradeNow}
        onMaybeLater={handleMaybeLater}
        isDark={isDark}
      />

      {/* Simulated 5-second Cloud Sync Loading Overlay */}
      <LoadingOverlay
        isOpen={isLoadingUpgrade}
        onComplete={handleLoadingComplete}
      />

      {/* Payment Failed Dialog */}
      <PaymentFailedDialog
        isOpen={isPaymentFailedOpen}
        onClose={handleClosePaymentFailed}
        isDark={isDark}
      />

      {/* Dev / Filming Reset Controls */}
      <DevResetDrawer
        isOpen={isDevDrawerOpen}
        onClose={() => setIsDevDrawerOpen(false)}
        onResetTrial={handleResetTrial}
        isTrialEnded={isTrialEnded}
        isDark={isDark}
      />

    </div>
  );
}
