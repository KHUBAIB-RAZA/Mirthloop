/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_ADSENSE_ENABLED?: string;
  readonly VITE_ADSENSE_CLIENT_ID?: string;
  readonly VITE_ADSENSE_SLOT_HOME_TOP?: string;
  readonly VITE_ADSENSE_SLOT_HOME_BOTTOM?: string;
  readonly VITE_ADSENSE_SLOT_GAME_SIDEBAR?: string;
  readonly VITE_ADSENSE_SLOT_GAME_BOTTOM?: string;
  readonly VITE_ADSENSE_SLOT_CATALOG?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
