import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, Star, Quote } from "lucide-react";
import { Link } from "react-router-dom";
import { Reveal } from "@/components/site/Reveal";
import { TESTIMONIALS } from "@/utils/constants";
import { useSanity } from "@/lib/useSanity";
import { useSiteSettings } from "@/lib/useSiteSettings";
import { TESTIMONIALS_QUERY } from "@/lib/sanityQueries";

const SLIDE_INTERVAL = 6000;

function normalise(t) {
  return {
    name:          t.name ?? "",
    country:       t.location ?? t.country ?? "",
    text:          t.review   ?? t.text    ?? "",
    rating:        t.rating   ?? 5,
    avatarInitial: t.avatarInitial ?? "",
    featured:      t.featured ?? false,
    screenshotUrl: t.screenshotImage?.asset?.url ?? null,
    screenshotAlt: t.screenshotImage?.alt ?? "Client testimonial screenshot",
  };
}

export function TestimonialsSection() {
  const { data: cmsTestimonials } = useSanity(TESTIMONIALS_QUERY, null);
  const { settings } = useSiteSettings();

  const sectionLabel   = settings?.testimonialsSectionLabel   ?? "Testimonials";
  const sectionHeading = settings?.testimonialsSectionHeading ?? "Voices from across the world.";

  const all = cmsTestimonials
    ? cmsTestimonials.map(normalise)
    : TESTIMONIALS.map((t) => ({ ...t, screenshotUrl: null }));

  // Prefer explicitly featured; fall back to all
  const testimonials = all.filter((t) => t.featured).length > 0
    ? all.filter((t) => t.featured)
    : all;

  const [idx, setIdx] = useState(0);
  useEffect(() => { setIdx(0); }, [testimonials.length]);

  const t = testimonials[idx] ?? testimonials[0];
  const hasImage = Boolean(t?.screenshotUrl);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setIdx((c) => (c + 1) % testimonials.length);
    }, SLIDE_INTERVAL);
    return () => window.clearInterval(timer);
  }, [testimonials.length]);

  const goPrev = () => setIdx((c) => (c + testimonials.length - 1) % testimonials.length);
  const goNext = () => setIdx((c) => (c + 1) % testimonials.length);

  const dots = (
    <div className="flex items-center gap-2">
      {testimonials.map((_, i) => (
        <button key={i} onClick={() => setIdx(i)} aria-label={`View review ${i + 1}`}
          className={`h-2 rounded-full transition-all ${i === idx ? "w-8 bg-gold" : "w-2 bg-muted"}`}
        />
      ))}
    </div>
  );

  const controls = (
    <div className="flex items-center justify-center gap-3">
      <button onClick={goPrev} aria-label="Previous review"
        className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-gold/30 text-gold transition hover:bg-gold/10">
        <ArrowLeft className="w-4 h-4" />
      </button>
      {dots}
      <button onClick={goNext} aria-label="Next review"
        className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-gold/30 text-gold transition hover:bg-gold/10">
        <ArrowRight className="w-4 h-4" />
      </button>
    </div>
  );

  return (
    <section className="py-32 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none section-glow-testimonials" aria-hidden />
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] aspect-square rounded-full bg-[radial-gradient(circle,oklch(0.55_0.08_310_/_0.12),transparent_65%)] blur-3xl" />
      </div>

      <div className="max-w-5xl mx-auto px-6 lg:px-10 text-center relative z-10">
        <Reveal>
          <span className="text-xs uppercase tracking-[0.3em] text-gold">{sectionLabel}</span>
          <h2 className="mt-4 text-4xl md:text-5xl">{sectionHeading}</h2>
        </Reveal>

        <Reveal delay={0.1}>
          <AnimatePresence mode="wait">
            <motion.div key={idx}
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="mt-14 glass-card rounded-3xl overflow-hidden relative">

              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,oklch(0.82_0.12_85_/_0.07),transparent_40%)] pointer-events-none" />

              {hasImage ? (
                /* ── Screenshot slide ── */
                <div className="relative z-10">
                  <div className="w-full bg-secondary/20 flex justify-center">
                    <img
                      src={t.screenshotUrl}
                      alt={t.screenshotAlt}
                      className="max-h-[420px] w-auto object-contain"
                      loading="lazy"
                    />
                  </div>
                  <div className="px-8 py-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 text-left">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-gold/20 border border-gold/40 flex items-center justify-center text-gold text-xs font-semibold shrink-0">
                        {t.avatarInitial || t.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <p className="font-serif text-base text-gold leading-tight">{t.name}</p>
                        {t.country && <p className="text-xs text-muted-foreground">{t.country}</p>}
                      </div>
                    </div>
                    {controls}
                  </div>
                </div>
              ) : (
                /* ── Text slide ── */
                <div className="p-12 relative z-10">
                  <Quote className="w-10 h-10 text-gold/30 mx-auto" />
                  <p className="mt-6 font-serif text-2xl md:text-3xl leading-relaxed">
                    &ldquo;{t?.text}&rdquo;
                  </p>
                  <div className="mt-8 flex justify-center gap-1">
                    {[...Array(t?.rating ?? 5)].map((_, k) => (
                      <Star key={k} className="w-4 h-4 fill-gold text-gold" />
                    ))}
                  </div>
                  <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="text-left">
                      <p className="font-serif text-lg text-gold">{t?.name}</p>
                      <p className="text-xs text-muted-foreground">{t?.country}</p>
                    </div>
                    {controls}
                  </div>
                </div>
              )}
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
