import { createClient } from "@sanity/client";

/**
 * Sanity client — used for all data fetching in the frontend.
 * Credentials come from Vite env vars (VITE_ prefix = exposed to browser).
 */
export const sanityClient = createClient({
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID,
  dataset: import.meta.env.VITE_SANITY_DATASET || "production",
  apiVersion: "2024-01-01", // pin a date — never changes without your intent
  useCdn: true,             // fast edge-cached reads; set false for real-time
});
