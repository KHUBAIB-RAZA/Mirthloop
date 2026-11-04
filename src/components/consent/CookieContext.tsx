import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { CookiePreferences, DEFAULT_COOKIE_PREFERENCES } from '../../types/consent';

interface CookieContextType {
  preferences: CookiePreferences;
  isModalOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
  updatePreferences: (newPrefs: Partial<CookiePreferences>) => void;
  acceptAll: () => void;
  rejectOptional: () => void;
}

const CookieContext = createContext<CookieContextType | undefined>(undefined);

const STORAGE_KEY = 'mirthloop_cookie_preferences_v1';

export const CookieProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [preferences, setPreferences] = useState<CookiePreferences>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.warn('Unable to access localStorage for cookie preferences', e);
    }
    return DEFAULT_COOKIE_PREFERENCES;
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(preferences));
    } catch (e) {
      console.warn('Unable to persist cookie preferences', e);
    }
  }, [preferences]);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const updatePreferences = (newPrefs: Partial<CookiePreferences>) => {
    setPreferences((prev) => ({
      ...prev,
      ...newPrefs,
      necessary: true, // Always true
      hasAnswered: true,
      updatedAt: new Date().toISOString(),
    }));
    closeModal();
  };

  const acceptAll = () => {
    updatePreferences({
      necessary: true,
      analytics: true,
      advertising: true,
    });
  };

  const rejectOptional = () => {
    updatePreferences({
      necessary: true,
      analytics: false,
      advertising: false,
    });
  };

  return (
    <CookieContext.Provider
      value={{
        preferences,
        isModalOpen,
        openModal,
        closeModal,
        updatePreferences,
        acceptAll,
        rejectOptional,
      }}
    >
      {children}
    </CookieContext.Provider>
  );
};

export const useCookieConsent = (): CookieContextType => {
  const context = useContext(CookieContext);
  if (!context) {
    throw new Error('useCookieConsent must be used within a CookieProvider');
  }
  return context;
};
