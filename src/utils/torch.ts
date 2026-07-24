/**
 * Hardware Flashlight (Torch API) helper for Web browsers
 */

let activeStream: MediaStream | null = null;
let activeTrack: MediaStreamTrack | null = null;

export const TorchController = {
  async turnOn(): Promise<{ success: boolean; hardwareUsed: boolean; error?: string }> {
    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        return { success: true, hardwareUsed: false };
      }

      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: 'environment',
        }
      });

      activeStream = stream;
      const track = stream.getVideoTracks()[0];
      if (track) {
        activeTrack = track;
        const capabilities = (track as unknown as { getCapabilities?: () => { torch?: boolean } }).getCapabilities?.();
        
        if (capabilities && 'torch' in capabilities) {
          await track.applyConstraints({
            advanced: [{ torch: true } as unknown as MediaTrackConstraintSet]
          });
          return { success: true, hardwareUsed: true };
        }
      }

      return { success: true, hardwareUsed: false };
    } catch (err: unknown) {
      console.warn('Torch camera access error / fallback to simulated screen flash:', err);
      return { 
        success: true, 
        hardwareUsed: false, 
        error: err instanceof Error ? err.message : 'Camera permission or torch unsupported'
      };
    }
  },

  async turnOff(): Promise<void> {
    try {
      if (activeTrack) {
        try {
          await activeTrack.applyConstraints({
            advanced: [{ torch: false } as unknown as MediaTrackConstraintSet]
          });
        } catch {
          // ignore error
        }
        activeTrack.stop();
        activeTrack = null;
      }
      if (activeStream) {
        activeStream.getTracks().forEach(t => t.stop());
        activeStream = null;
      }
    } catch (e) {
      console.warn('Error turning off torch:', e);
    }
  }
};
