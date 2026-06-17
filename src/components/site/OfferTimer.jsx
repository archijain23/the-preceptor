import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSanityCtx } from "@/sanity/SanityProvider";

function pad(n) {
  return String(n).padStart(2, "0");
}

function getTimeLeft(endDate) {
  const diff = new Date(endDate) - Date.now();
  if (diff <= 0) return null;
  return {
    days: Math.floor(diff / 86400000),
    hours: Math.floor((diff % 86400000) / 3600000),
    mins: Math.floor((diff % 3600000) / 60000),
    secs: Math.floor((diff % 60000) / 1000),
  };
}

function Digit({ value }) {
  return (
    <AnimatePresence mode="popLayout" initial={false}>
      <motion.span
        key={value}
        initial={{ y: -16, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 16, opacity: 0 }}
        transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
        className="inline-block tabular-nums"
      >
        {value}
      </motion.span>
    </AnimatePresence>
  );
}

export function OfferTimer() {
  // ── Pull offer config from Sanity (falls back to constants.js) ──
  const { offerConfig } = useSanityCtx();
  const endDate = offerConfig?.offerEndDate;
  const originalPrice = offerConfig?.originalPrice || "$200";

  const [timeLeft, setTimeLeft] = useState(() =>
    endDate ? getTimeLeft(endDate) : null
  );

  useEffect(() => {
    if (!endDate) return;
    // Re-initialise when endDate changes (Sanity loaded)
    setTimeLeft(getTimeLeft(endDate));
    const id = setInterval(() => {
      setTimeLeft(getTimeLeft(endDate));
    }, 1000);
    return () => clearInterval(id);
  }, [endDate]);

  // Don't render if offer has expired or no date configured
  if (!timeLeft) return null;

  const segments = [
    { label: "Days", value: pad(timeLeft.days) },
    { label: "Hours", value: pad(timeLeft.hours) },
    { label: "Mins", value: pad(timeLeft.mins) },
    { label: "Secs", value: pad(timeLeft.secs) },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="w-full flex flex-col items-center gap-3 mb-10 px-4"
    >
      {/* Label */}
      <p className="text-xs uppercase tracking-[0.3em] text-gold/70">
        Introductory offer ends in — prices rise to{" "}
        <span className="text-gold font-semibold">{originalPrice}</span> after
      </p>

      {/* Countdown blocks */}
      <div className="flex items-end gap-2 sm:gap-4">
        {segments.map(({ label, value }, idx) => (
          <div key={label} className="flex items-end gap-2 sm:gap-4">
            <div className="flex flex-col items-center">
              <div className="glass-card rounded-xl px-4 py-3 min-w-[3.5rem] text-center">
                <span className="font-serif text-3xl sm:text-4xl text-gold leading-none overflow-hidden flex justify-center">
                  <Digit value={value[0]} />
                  <Digit value={value[1]} />
                </span>
              </div>
              <span className="mt-1.5 text-[10px] uppercase tracking-widest text-muted-foreground">
                {label}
              </span>
            </div>
            {idx < 3 && (
              <span className="text-gold/40 text-2xl font-serif mb-4">:</span>
            )}
          </div>
        ))}
      </div>
    </motion.div>
  );
}
