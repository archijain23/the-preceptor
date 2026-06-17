/**
 * useSanity — generic React hook for fetching from Sanity.
 *
 * Features:
 *  - Never throws — always falls back to `fallback` on error
 *  - Shows `loading: true` only on first fetch (avoids layout shift on refetch)
 *  - Exposes `fromCMS: boolean` so components can show a subtle indicator
 *    if needed during development
 *
 * Usage:
 *   const { data, loading } = useSanity(SERVICES_QUERY, FALLBACK_SERVICES);
 */
import { useState, useEffect } from 'react';
import { safeFetch } from './sanityClient';

export function useSanity(query, fallback) {
  const [data, setData]       = useState(fallback);
  const [loading, setLoading] = useState(true);
  const [fromCMS, setFromCMS] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      const result = await safeFetch(query, fallback);
      if (!cancelled) {
        setData(result);
        setFromCMS(result !== fallback);
        setLoading(false);
      }
    }

    load();
    return () => { cancelled = true; };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  return { data, loading, fromCMS };
}
