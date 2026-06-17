import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { Reveal } from "@/components/site/Reveal";
import { useSanityData } from "@/sanity/useSanityData";
import { TESTIMONIALS_QUERY } from "@/sanity/queries";
import { TESTIMONIALS } from "@/utils/constants";

function StarRating({ rating = 5 }) {
  return (
    <div className="flex gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`w-3.5 h-3.5 ${
            i < rating ? "text-gold fill-gold" : "text-muted-foreground"
          }`}
        />
      ))}
    </div>
  );
}

export default function TestimonialsPage() {
  // ── Live from Sanity, falls back to constants.js ───────────────────────────
  const { data: reviews } = useSanityData(TESTIMONIALS_QUERY, TESTIMONIALS);

  const [active, setActive] = useState(0);
  const total = reviews?.length || 0;

  const prev = () => setActive((a) => (a - 1 + total) % total);
  const next = () => setActive((a) => (a + 1) % total);

  // Guard: empty state
  if (!total) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">No testimonials yet.</p>
      </main>
    );
  }

  const current = reviews[active];

  return (
    <>
      <Helmet>
        <title>Client Testimonials — The Preceptor</title>
        <meta name="description" content="Real words from real clients. Discover why seekers from across the world return to The Preceptor for guidance." />
      </Helmet>

      <main className="min-h-screen">
        {/* Hero */}
        <section className="relative py-36 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,oklch(0.28_0.10_255_/_0.45),transparent_65%)]" />
          <div className="absolute inset-0 starfield" aria-hidden />
          <div className="relative max-w-4xl mx-auto px-6 lg:px-10 text-center z-10">
            <motion.span
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="text-xs uppercase tracking-[0.3em] text-gold"
            >
              — Client Words
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="mt-5"
              style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(2.5rem, 5vw, 4.5rem)", fontWeight: 400 }}
            >
              What seekers say
              <span className="block bg-gradient-gold"> after the session.</span>
            </motion.h1>
          </div>
        </section>

        {/* Carousel */}
        <section className="py-24 bg-cosmic-deep relative overflow-hidden">
          <div className="max-w-3xl mx-auto px-6 lg:px-10 relative z-10">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -24 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="glass-card rounded-3xl p-10 md:p-14 text-center"
              >
                <Quote className="w-8 h-8 text-gold/30 mx-auto mb-6" />
                <p className="text-xl md:text-2xl font-serif leading-relaxed text-foreground">
                  &ldquo;{current.text}&rdquo;
                </p>
                <div className="mt-8 flex flex-col items-center gap-2">
                  <StarRating rating={current.rating} />
                  <p className="text-sm font-medium text-foreground">{current.name}</p>
                  {current.country && (
                    <p className="text-xs text-muted-foreground">{current.country}</p>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation */}
            <div className="mt-8 flex items-center justify-center gap-6">
              <button
                onClick={prev}
                aria-label="Previous testimonial"
                className="glass-card w-10 h-10 rounded-full flex items-center justify-center hover:border-gold/40 transition"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <span className="text-xs text-muted-foreground tabular-nums">
                {active + 1} / {total}
              </span>
              <button
                onClick={next}
                aria-label="Next testimonial"
                className="glass-card w-10 h-10 rounded-full flex items-center justify-center hover:border-gold/40 transition"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </section>

        {/* All reviews grid */}
        <section className="py-24">
          <div className="max-w-6xl mx-auto px-6 lg:px-10">
            <Reveal>
              <h2 className="text-2xl font-serif text-center mb-12">All reviews</h2>
            </Reveal>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {reviews.map((r, i) => (
                <Reveal key={i} delay={i * 0.05}>
                  <div className="glass-card rounded-2xl p-6 flex flex-col gap-3">
                    <StarRating rating={r.rating} />
                    <p className="text-sm text-muted-foreground leading-relaxed flex-1">
                      &ldquo;{r.text}&rdquo;
                    </p>
                    <div>
                      <p className="text-sm font-medium">{r.name}</p>
                      {r.country && (
                        <p className="text-xs text-muted-foreground">{r.country}</p>
                      )}
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
