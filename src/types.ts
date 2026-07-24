export type AppStateMode = 'INITIAL' | 'ON' | 'OFF' | 'LOCKED';

export interface TelemetryData {
  photonLevel: number;
  quantumFrequency: string;
  beamTemperature: string;
  aiOptimizationScore: number;
}

export const COMEDY_QUOTES = [
  "Only Premium users deserve brightness.",
  "Darkness is a premium feature.",
  "Please purchase more photons.",
  "Brightness quota exceeded.",
  "You have reached today's light limit.",
  "Your bulb needs a subscription.",
  "Moonlight is available in Premium.",
  "AI has determined you have used enough light today.",
  "Congratulations! You have consumed 100% of your free photons.",
  "Upgrade to unlock the Sun."
];

export const PREMIUM_FEATURES = [
  { text: "Unlimited Flashlight Access", highlight: true },
  { text: "4K Ultra HD Light", highlight: false },
  { text: "AI Brightness™", highlight: true },
  { text: "Quantum Beam Technology™", highlight: false },
  { text: "Lightning Speed Activation", highlight: false },
  { text: "VIP Photon Delivery", highlight: true },
  { text: "Battery Happiness Mode", highlight: false },
  { text: "Dark Mode Compatibility", highlight: false },
  { text: "Unlimited Darkness Removal", highlight: true },
  { text: "Premium Oxygen Support", highlight: false }
];

export const SIMULATED_LOADING_STEPS = [
  "Connecting to Flashlight Cloud...",
  "Checking Photon Inventory...",
  "Encrypting Brightness...",
  "Calibrating Premium Light...",
  "Activating Quantum Beam..."
];
