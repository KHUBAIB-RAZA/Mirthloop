export type AdFormat = 'leaderboard' | 'rectangle' | 'banner' | 'responsive';

export interface AdUnitConfig {
  slotId?: string;
  format: AdFormat;
  label?: string;
  className?: string;
}

export interface AdSenseConfig {
  enabled: boolean;
  publisherId: string | null;
  testMode: boolean;
  slots: {
    homeTopLeaderboard?: string;
    homeBottomLeaderboard?: string;
    gameSidebarBanner?: string;
    gameBottomLeaderboard?: string;
    catalogLeaderboard?: string;
  };
}
