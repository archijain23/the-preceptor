import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, Star, Quote } from "lucide-react";
import { Link } from "react-router-dom";
import { Reveal } from "@/components/site/Reveal";
import { TESTIMONIALS } from "@/utils/constants";

const SLIDE_INTERVAL = 6000;

export function TestimonialsSection() {
  const [i, setI] = useState(0);
  const t = TESTIMONIALS[i];

  useEffect(() => {
    const timer = window.setInterval(() => {
      setI((c) => (c + 1) % TESTIMONIALS.length);
    }, SLIDE_INTERVAL);
    return () => window.clearInterval(timer);
  }, []);

  const goPrev = () => setI((c) => (c + TESTIMONIALS.length - 1) % TESTIMONIALS.length);
  const goNext = () => setI((c) => (c + 1) % TESTIMONIALS.length);

  return (
    <section className="py-32 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none section-glow-testimonials" aria-hidden />
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] aspect-square rounded-full bg-[radial-gradient(circle,oklch(0.55_0.08_310_/_0.12),transparent_65%)] blur-3xl" />
      </div>

      <div className="max-w-5xl mx-auto px-6 lg:px-10 text-center relative z-10">
        <Reveal>
          <span className="text-xs uppercase tracking-[0.3em] text-gold">Testimonials</span>
          <h2 className="mt-4 text-4xl md:text-5xl">Voices from across the world.</h2>
        </Reveal>

        <Reveal delay={0.1}>
          <AnimatePresence mode="wait">
            <motion.div key={i}
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="mt-14 glass-card rounded-3xl p-12 relative overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,oklch(0.82_0.12_85_/_0.07),transparent_40%)]" />
              <div className="relative z-10">
                <Quote className="w-10 h-10 text-gold/30 mx-auto" />
                <p className="mt-6 font-serif text-2xl md:text-3xl leading-relaxed">"{t.text}"</p>
                <div className="mt-8 flex justify-center gap-1">
                  {[...Array(t.rating)].map((_, k) => (
                    <Star key={k} className="w-4 h-4 fill-gold text-gold" />
                  ))}
                </div>
                <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="font-serif text-lg text-gold">{t.name}</p>
                    <p className="text-xs text-muted-foreground">{t.country}</p>
                  </div>
                  <div className="flex items-center justify-center gap-3">
                    <button onClick={goPrev} aria-label="Previous review"
                      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-gold/30 text-gold transition hover:bg-gold/10">
                      <ArrowLeft className="w-4 h-4" />
                    </button>
                    <div className="flex items-center gap-2">
                      {TESTIMONIALS.map((_, idx) => (
                        <button key={idx} onClick={() => setI(idx)} aria-label={`View review ${idx + 1}`}
                          className={`h-2 rounded-full transition-all ${idx === i ? "w-8 bg-gold" : "w-2 bg-muted"}`}
                        />
                      ))}
                    </div>
                    <button onClick={goNext} aria-label="Next review"
                      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-gold/30 text-gold transition hover:bg-gold/10">
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="mt-8 flex justify-center">
            <Link to="/testimonials"
              className="inline-flex items-center gap-2 text-gold font-medium hover:text-foreground transition">
              View more testimonials <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
