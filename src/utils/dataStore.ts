/**
 * Simulates Android Jetpack DataStore persistent state storage
 */

const DATASTORE_KEYS = {
  TRIAL_ENDED: 'flashlight_datastore_trial_ended',
  SESSION_COUNT: 'flashlight_datastore_session_count',
  PERMISSIONS_GRANTED: 'flashlight_datastore_permissions_granted',
};

export const DataStore = {
  isTrialEnded(): boolean {
    try {
      return localStorage.getItem(DATASTORE_KEYS.TRIAL_ENDED) === 'true';
    } catch {
      return false;
    }
  },

  setTrialEnded(ended: boolean): void {
    try {
      localStorage.setItem(DATASTORE_KEYS.TRIAL_ENDED, ended ? 'true' : 'false');
    } catch (e) {
      console.warn('DataStore save error:', e);
    }
  },

  getSessionCount(): number {
    try {
      const val = localStorage.getItem(DATASTORE_KEYS.SESSION_COUNT);
      return val ? parseInt(val, 10) : 0;
    } catch {
      return 0;
    }
  },

  incrementSessionCount(): number {
    try {
      const current = this.getSessionCount() + 1;
      localStorage.setItem(DATASTORE_KEYS.SESSION_COUNT, current.toString());
      return current;
    } catch {
      return 1;
    }
  },

  resetDataStore(): void {
    try {
      localStorage.removeItem(DATASTORE_KEYS.TRIAL_ENDED);
      localStorage.removeItem(DATASTORE_KEYS.SESSION_COUNT);
      localStorage.removeItem(DATASTORE_KEYS.PERMISSIONS_GRANTED);
    } catch (e) {
      console.warn('DataStore reset error:', e);
    }
  }
};
