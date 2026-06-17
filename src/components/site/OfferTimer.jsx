import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Clock } from "lucide-react";
import { OFFER_END_DATE } from "@/utils/constants";

/**
 * OfferTimer
 * Displays a live countdown to OFFER_END_DATE.
 * Hides itself completely once the offer has expired.
 */
export function OfferTimer() {
  const [timeLeft, setTimeLeft] = useState(calcTimeLeft());

  function calcTimeLeft() {
    const diff = new Date(OFFER_END_DATE).getTime() - Date.now();
    if (diff <= 0) return null;
    const d = Math.floor(diff / 86_400_000);
    const h = Math.floor((diff % 86_400_000) / 3_600_000);
    const m = Math.floor((diff % 3_600_000) / 60_000);
    const s = Math.floor((diff % 60_000) / 1_000);
    return { d, h, m, s };
  }

  useEffect(() => {
    const id = setInterval(() => setTimeLeft(calcTimeLeft()), 1000);
    return () => clearInterval(id);
  }, []);

  if (!timeLeft) return null; // offer expired — hide banner entirely

  const units = [
    { label: "Days",    value: timeLeft.d },
    { label: "Hours",   value: timeLeft.h },
    { label: "Mins",    value: timeLeft.m },
    { label: "Secs",    value: timeLeft.s },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="mb-12 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6"
      role="timer"
      aria-label="Offer countdown"
    >
      {/* Label */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Clock className="w-4 h-4 text-gold" />
        <span>
          Introductory offer ends in — prices rise to{" "}
          <span className="text-foreground font-medium">$200</span> after
        </span>
      </div>

      {/* Digit blocks */}
      <div className="flex items-center gap-2">
        {units.map(({ label, value }, idx) => (
          <>
            <div
              key={label}
              className="flex flex-col items-center justify-center w-14 h-14 rounded-xl bg-primary/10 border border-gold/20 backdrop-blur-sm"
            >
              <AnimatePresence mode="popLayout">
                <motion.span
                  key={value}
                  initial={{ y: -10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 10, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="text-xl font-semibold text-gold tabular-nums leading-none"
                >
                  {String(value).padStart(2, "0")}
                </motion.span>
              </AnimatePresence>
              <span className="text-[9px] uppercase tracking-widest text-muted-foreground mt-1">
                {label}
              </span>
            </div>
            {/* colon separator — not after last */}
            {idx < units.length - 1 && (
              <span className="text-gold/60 text-lg font-light mb-3">:</span>
            )}
          </>
        ))}
      </div>
    </motion.div>
  );
}
