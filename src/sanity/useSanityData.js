import { useState, useEffect } from "react";
import { sanityClient } from "./client";

/**
 * useSanityData(query, fallback)
 *
 * Generic hook — fetches any GROQ query from Sanity.
 * Falls back to `fallback` value while loading or if Sanity is not configured.
 *
 * @param {string} query   — GROQ query string
 * @param {any}    fallback — value to use while loading or on error
 * @returns {{ data, loading, error }}
 *
 * Usage:
 *   const { data: services, loading } = useSanityData(SERVICES_QUERY, SERVICES_FALLBACK);
 */
export function useSanityData(query, fallback = null) {
  const [data, setData] = useState(fallback);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const projectId = import.meta.env.VITE_SANITY_PROJECT_ID;

  useEffect(() => {
    // If Sanity is not configured yet, use the fallback immediately
    if (!projectId) {
      setData(fallback);
      setLoading(false);
      return;
    }

    let cancelled = false;

    sanityClient
      .fetch(query)
      .then((result) => {
        if (!cancelled) {
          // If Sanity returns empty array/null, fall back to static data
          setData(result && (Array.isArray(result) ? result.length > 0 : true)
            ? result
            : fallback
          );
        }
      })
      .catch((err) => {
        console.warn("[Sanity] fetch error — using fallback data", err);
        if (!cancelled) {
          setData(fallback);
          setError(err);
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => { cancelled = true; };
  }, [query, projectId]);

  return { data, loading, error };
}
