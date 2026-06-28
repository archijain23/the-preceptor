import { useState, useEffect } from "react";
import { OFFER_END_DATE } from "@/utils/constants";
import { useSiteSettings } from "@/lib/useSiteSettings";

/**
 * Returns true while the offer deadline is still in the future.
 * Once the timer reaches 0:0:0:0 it flips to false, causing price
 * cards to revert from the discounted price back to the original price.
 */
export function useOfferActive() {
  const { settings } = useSiteSettings();
  const deadline = settings?.offerDeadline ?? OFFER_END_DATE;

  const [active, setActive] = useState(() => new Date(deadline) > Date.now());

  useEffect(() => {
    // Re-evaluate immediately whenever the deadline changes
    setActive(new Date(deadline) > Date.now());

    const id = setInterval(() => {
      const stillActive = new Date(deadline) > Date.now();
      setActive(stillActive);
      if (!stillActive) clearInterval(id);
    }, 1_000);

    return () => clearInterval(id);
  }, [deadline]);

  return active;
}
