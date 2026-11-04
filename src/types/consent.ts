export interface CookiePreferences {
  necessary: boolean; // Always true
  analytics: boolean; // Future analytics consent
  advertising: boolean; // Future advertising/personalized ad consent
  hasAnswered: boolean;
  updatedAt: string;
}

export const DEFAULT_COOKIE_PREFERENCES: CookiePreferences = {
  necessary: true,
  analytics: false,
  advertising: false,
  hasAnswered: false,
  updatedAt: '',
};
