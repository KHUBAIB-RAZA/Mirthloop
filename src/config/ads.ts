import { AdSenseConfig } from '../types/ads';

/**
 * AdSense Configuration for Mirthloop
 * 
 * In V1 development & initial production release, ads are in placeholder mode.
 * Ad scripts are never loaded unless a valid VITE_ADSENSE_CLIENT_ID is provided
 * AND the user has granted advertising cookie consent.
 */
export const adConfig: AdSenseConfig = {
  enabled: Boolean(import.meta.env.VITE_ADSENSE_ENABLED === 'true' && import.meta.env.VITE_ADSENSE_CLIENT_ID),
  publisherId: import.meta.env.VITE_ADSENSE_CLIENT_ID || null,
  testMode: import.meta.env.DEV,
  slots: {
    homeTopLeaderboard: import.meta.env.VITE_ADSENSE_SLOT_HOME_TOP,
    homeBottomLeaderboard: import.meta.env.VITE_ADSENSE_SLOT_HOME_BOTTOM,
    gameSidebarBanner: import.meta.env.VITE_ADSENSE_SLOT_GAME_SIDEBAR,
    gameBottomLeaderboard: import.meta.env.VITE_ADSENSE_SLOT_GAME_BOTTOM,
    catalogLeaderboard: import.meta.env.VITE_ADSENSE_SLOT_CATALOG,
  },
};
