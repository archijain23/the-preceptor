import { createContext, useContext } from "react";
import { useSanityData } from "./useSanityData";
import {
  SITE_SETTINGS_QUERY,
  OFFER_CONFIG_QUERY,
} from "./queries";
import { SITE, OFFER_END_DATE } from "@/utils/constants";

// ─── Fallbacks from constants.js ────────────────────────────────────────────
const SITE_FALLBACK = {
  siteName: SITE.name,
  tagline: SITE.tagline,
  description: SITE.description,
  email: SITE.email,
  phone: SITE.phone,
  whatsapp: SITE.whatsapp,
  instagram: SITE.social.instagram,
  youtube: SITE.social.youtube,
  twitter: SITE.social.twitter,
  facebook: SITE.social.facebook,
};

const OFFER_FALLBACK = {
  offerEndDate: OFFER_END_DATE,
  currentPrice: "$180",
  originalPrice: "$200",
  sessionDuration: "60 min",
};

// ─── Context ─────────────────────────────────────────────────────────────────
const SanityCtx = createContext({
  siteSettings: SITE_FALLBACK,
  offerConfig: OFFER_FALLBACK,
  loading: false,
});

/** Wrap your App with this once — all children can call useSanityCtx() */
export function SanityProvider({ children }) {
  const { data: siteSettings } = useSanityData(SITE_SETTINGS_QUERY, SITE_FALLBACK);
  const { data: offerConfig } = useSanityData(OFFER_CONFIG_QUERY, OFFER_FALLBACK);

  return (
    <SanityCtx.Provider value={{ siteSettings, offerConfig }}>
      {children}
    </SanityCtx.Provider>
  );
}

/** Hook — use anywhere: const { siteSettings, offerConfig } = useSanityCtx(); */
export function useSanityCtx() {
  return useContext(SanityCtx);
}
