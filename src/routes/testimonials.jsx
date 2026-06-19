import { Helmet } from "react-helmet-async";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight, Star, Quote, PlayCircle } from "lucide-react";
import { Reveal } from "@/components/site/Reveal";
import { TESTIMONIALS } from "@/utils/constants";
import { useSanity } from "@/lib/useSanity";
import { useSiteSettings } from "@/lib/useSiteSettings";
import { TESTIMONIALS_QUERY } from "@/lib/sanityQueries";

const CAROUSEL_COUNT  = 5;
const SLIDE_INTERVAL  = 6000;
const CAROUSEL_HEIGHT = 520;  // px — shared by image + text carousel slides
const STRIP_H         = 72;   // px — name/controls strip at bottom of image card
const GRID_CARD_H     = 360;  // px — uniform height for grid cards
const GRID_STRIP_H    = 60;   // px — strip in grid cards

function normalise(t) {
  return {
    _id:           t._id,
    name:          t.name    ?? "",
    country:       t.location ?? "",
    text:          t.review   ?? "",
    rating:        t.rating   ?? 5,
    service:       t.service  ?? "",
    avatarInitial: t.avatarInitial ?? "",
    featured:      t.featured ?? false,
    screenshotUrl: t.screenshotImage?.asset?.url ?? null,
    screenshotAlt: t.screenshotImage?.alt ?? "Client testimonial screenshot",
  };
}

/* ─── Shared nav button ──────────────────────────────────────────────── */
function NavBtn({ onClick, label, children, size = 10 }) {
  return (
    <button onClick={onClick} aria-label={label}
      className={`inline-flex h-${size} w-${size} items-center justify-center rounded-full border border-gold/40 text-gold backdrop-blur-sm bg-black/30 transition hover:bg-gold/20 shrink-0`}>
      {children}
    </button>
  );
}

/* ─── Dots ───────────────────────────────────────────────────────────── */
function Dots({ total, current, onDot, light = false }) {
  return (
    <div className="flex items-center gap-1.5">
      {[...Array(total)].map((_, i) => (
        <button key={i} onClick={() => onDot(i)} aria-label={`Review ${i + 1}`}
          className={`rounded-full transition-all ${
            i === current
              ? "w-6 h-2 bg-gold"
              : `w-2 h-2 ${light ? "bg-muted" : "bg-white/30"}`
          }`} />
      ))}
    </div>
  );
}

/* ─── Screenshot image card (grid) ──────────────────────────────────── */
function ScreenshotCard({ r }) {
  return (
    <div
      className="glass-card rounded-2xl overflow-hidden relative hover:border-primary/40 hover:-translate-y-1 transition"
      style={{ height: `${GRID_CARD_H}px` }}
    >
      {/* Scrollable image zone */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0,
        bottom: `${GRID_STRIP_H}px`,
        overflowY: "auto", overflowX: "hidden",
        scrollbarWidth: "none",
      }}>
        <img
          src={r.screenshotUrl}
          alt={r.screenshotAlt}
          loading="lazy"
          style={{ width: "100%", height: "auto", display: "block", minHeight: "100%" }}
        />
      </div>

      {/* Bottom gradient */}
      <div style={{
        position: "absolute", left: 0, right: 0, bottom: 0,
        height: `${GRID_STRIP_H + 48}px`,
        background: "linear-gradient(to bottom, transparent, rgba(0,0,0,0.9) 55%)",
        pointerEvents: "none", zIndex: 1,
      }} />

      {/* Name strip */}
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0,
        height: `${GRID_STRIP_H}px`,
        display: "flex", alignItems: "center",
        justifyContent: "space-between",
        padding: "0 1.25rem", gap: "0.5rem", zIndex: 2,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <div style={{
            width: "2rem", height: "2rem", borderRadius: "9999px",
            background: "rgba(212,175,55,0.22)",
            border: "1px solid rgba(212,175,55,0.45)",
            display: "flex", alignItems: "center", justifyContent: "center",
            color: "#d4af37", fontSize: "0.75rem", fontWeight: 600, flexShrink: 0,
          }}>
            {r.avatarInitial || r.name.charAt(0).toUpperCase()}
          </div>
          <div>
            <p style={{ color: "#d4af37", fontFamily: "serif", fontSize: "0.85rem", lineHeight: 1.2 }}>
              {r.name}
            </p>
            {r.country && (
              <p style={{ color: "rgba(255,255,255,0.45)", fontSize: "0.65rem" }}>{r.country}</p>
            )}
          </div>
        </div>
        {r.service && (
          <span className="text-[10px] uppercase tracking-widest text-muted-foreground border border-border/50 rounded-full px-2 py-0.5 shrink-0 bg-black/40">
            {r.service}
          </span>
        )}
      </div>
    </div>
  );
}

/* ─── Text-only card (grid) ──────────────────────────────────────────── */
function TextCard({ r }) {
  return (
    <div className="glass-card rounded-2xl p-8 h-full hover:border-primary/40 hover:-translate-y-1 transition flex flex-col justify-between">
      <div>
        <Quote className="w-7 h-7 text-gold/40" />
        <p className="mt-4 leading-relaxed text-foreground/90">&ldquo;{r.text}&rdquo;</p>
      </div>
      <div className="mt-6 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gold/20 border border-gold/40 flex items-center justify-center text-gold text-xs font-semibold shrink-0">
            {r.avatarInitial || r.name.charAt(0).toUpperCase()}
          </div>
          <div>
            <p className="font-serif text-sm text-gold leading-tight">{r.name}</p>
            {r.country && <p className="text-[10px] text-muted-foreground">{r.country}</p>}
          </div>
        </div>
        <div className="flex gap-0.5 shrink-0">
          {[...Array(r.rating ?? 5)].map((_, k) => (
            <Star key={k} className="w-3 h-3 fill-gold text-gold" />
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── Unified card (grid) ────────────────────────────────────────────── */
function TestimonialCard({ r }) {
  return r.screenshotUrl ? <ScreenshotCard r={r} /> : <TextCard r={r} />;
}

/* ─── Page ───────────────────────────────────────────────────────────── */
export default function TestimonialsPage() {
  const { data: cmsTestimonials } = useSanity(TESTIMONIALS_QUERY, null);
  const { settings } = useSiteSettings();

  const reviews = cmsTestimonials && cmsTestimonials.length > 0
    ? cmsTestimonials.map(normalise)
    : TESTIMONIALS.map((t) => ({ ...t, screenshotUrl: null }));

  const featuredReviews = reviews.filter((r) => r.featured).length > 0
    ? reviews.filter((r) => r.featured).slice(0, CAROUSEL_COUNT)
    : reviews.slice(0, CAROUSEL_COUNT);
  const moreReviews = reviews.filter((r) => !featuredReviews.includes(r));

  const [activeIndex, setActiveIndex] = useState(0);
  const activeReview = featuredReviews[activeIndex] ?? featuredReviews[0];
  const carouselHasImage = Boolean(activeReview?.screenshotUrl);

  useEffect(() => { setActiveIndex(0); }, [reviews.length]);
  useEffect(() => {
    if (!featuredReviews.length) return;
    const t = window.setInterval(() =>
      setActiveIndex((c) => (c + 1) % featuredReviews.length)
    , SLIDE_INTERVAL);
    return () => window.clearInterval(t);
  }, [featuredReviews.length]);

  const goPrevious = () => setActiveIndex((c) => (c + featuredReviews.length - 1) % featuredReviews.length);
  const goNext     = () => setActiveIndex((c) => (c + 1) % featuredReviews.length);

  return (
    <>
      <Helmet>
        <title>Testimonials — The Preceptor</title>
        <meta name="description" content="Real stories from clients across the United States and the world after their consultations with The Preceptor." />
        <meta property="og:title" content="Client Stories — The Preceptor" />
        <meta property="og:description" content="Trusted by clients across 47 countries." />
      </Helmet>

      <div className="bg-hero starfield min-h-screen">
        <section className="max-w-7xl mx-auto px-6 lg:px-10 py-20 lg:py-28">

          {/* Hero heading */}
          <Reveal className="text-center max-w-3xl mx-auto">
            <span className="text-xs uppercase tracking-[0.3em] text-gold">
              {settings?.testimonialsSectionLabel ?? "Testimonials"}
            </span>
            <h1 className="mt-4 text-5xl md:text-6xl">
              {settings?.testimonialsSectionHeading ?? "Stories from the seekers."}
            </h1>
            <p className="mt-5 text-muted-foreground">Trust earned, one consultation at a time.</p>
          </Reveal>

          {/* ── Featured carousel ── */}
          {featuredReviews.length > 0 && (
            <div className="mt-20">
              <Reveal>
                <span className="text-xs uppercase tracking-[0.3em] text-gold">Featured Stories</span>
                <h2 className="mt-4 text-4xl md:text-5xl">Standout reviews.</h2>
              </Reveal>

              <Reveal delay={0.1}>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeIndex}
                    initial={{ opacity: 0, scale: 0.97 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.97 }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className="mt-10 glass-card rounded-3xl overflow-hidden relative"
                    style={{ height: `${CAROUSEL_HEIGHT}px` }}
                  >
                    {carouselHasImage ? (
                      /* Screenshot carousel slide */
                      <div style={{ position: "relative", width: "100%", height: "100%" }}>

                        {/* Scrollable image zone */}
                        <div style={{
                          position: "absolute", top: 0, left: 0, right: 0,
                          bottom: `${STRIP_H}px`,
                          overflowY: "auto", overflowX: "hidden",
                          scrollbarWidth: "none",
                        }}>
                          <img
                            src={activeReview.screenshotUrl}
                            alt={activeReview.screenshotAlt}
                            loading="lazy"
                            style={{ width: "100%", height: "auto", display: "block", minHeight: "100%" }}
                          />
                        </div>

                        {/* Top fade */}
                        <div style={{
                          position: "absolute", top: 0, left: 0, right: 0, height: "60px",
                          background: "linear-gradient(to bottom, rgba(0,0,0,0.35), transparent)",
                          pointerEvents: "none", zIndex: 1,
                        }} />

                        {/* Bottom gradient */}
                        <div style={{
                          position: "absolute", left: 0, right: 0, bottom: 0,
                          height: `${STRIP_H + 60}px`,
                          background: "linear-gradient(to bottom, transparent, rgba(0,0,0,0.92) 55%)",
                          pointerEvents: "none", zIndex: 1,
                        }} />

                        {/* Name + controls strip */}
                        <div style={{
                          position: "absolute", bottom: 0, left: 0, right: 0,
                          height: `${STRIP_H}px`,
                          display: "flex", alignItems: "center",
                          justifyContent: "space-between",
                          padding: "0 2rem", gap: "1rem", zIndex: 2,
                        }}>
                          <div style={{ display: "flex", alignItems: "center", gap: "0.7rem" }}>
                            <div style={{
                              width: "2.5rem", height: "2.5rem", borderRadius: "9999px",
                              background: "rgba(212,175,55,0.22)",
                              border: "1px solid rgba(212,175,55,0.45)",
                              display: "flex", alignItems: "center", justifyContent: "center",
                              color: "#d4af37", fontSize: "0.9rem", fontWeight: 600, flexShrink: 0,
                            }}>
                              {activeReview.avatarInitial || activeReview.name.charAt(0).toUpperCase()}
                            </div>
                            <div>
                              <p style={{ color: "#d4af37", fontFamily: "serif", fontSize: "1rem", lineHeight: 1.2 }}>
                                {activeReview.name}
                              </p>
                              {activeReview.country && (
                                <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.72rem", marginTop: "0.1rem" }}>
                                  {activeReview.country}
                                </p>
                              )}
                            </div>
                          </div>
                          <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                            <NavBtn onClick={goPrevious} label="Previous"><ArrowLeft className="w-4 h-4" /></NavBtn>
                            <Dots total={featuredReviews.length} current={activeIndex} onDot={setActiveIndex} />
                            <NavBtn onClick={goNext} label="Next"><ArrowRight className="w-4 h-4" /></NavBtn>
                          </div>
                        </div>
                      </div>
                    ) : (
                      /* Text carousel slide */
                      <div className="p-10 relative z-10 h-full flex flex-col justify-center">
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,oklch(0.82_0.12_85_/_0.08),transparent_40%)] pointer-events-none" />
                        <Quote className="w-10 h-10 text-gold/30 mx-auto" />
                        <p className="mt-6 font-serif text-2xl md:text-3xl leading-relaxed text-center">
                          &ldquo;{activeReview?.text}&rdquo;
                        </p>
                        <div className="mt-8 flex justify-center gap-1">
                          {[...Array(activeReview?.rating ?? 5)].map((_, k) => (
                            <Star key={k} className="w-4 h-4 fill-gold text-gold" />
                          ))}
                        </div>
                        <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                          <div>
                            <p className="font-serif text-lg text-gold">{activeReview?.name}</p>
                            <p className="text-xs text-muted-foreground">{activeReview?.country}</p>
                          </div>
                          <div className="flex items-center gap-3">
                            <NavBtn onClick={goPrevious} label="Previous"><ArrowLeft className="w-4 h-4" /></NavBtn>
                            <Dots total={featuredReviews.length} current={activeIndex} onDot={setActiveIndex} light />
                            <NavBtn onClick={goNext} label="Next"><ArrowRight className="w-4 h-4" /></NavBtn>
                          </div>
                        </div>
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>
              </Reveal>
            </div>
          )}

          {/* ── More reviews grid ── */}
          {moreReviews.length > 0 && (
            <div className="mt-16">
              <Reveal className="text-center max-w-3xl mx-auto">
                <span className="text-xs uppercase tracking-[0.3em] text-gold">More stories</span>
                <h2 className="mt-4 text-4xl md:text-5xl">More voices from clients.</h2>
              </Reveal>
              <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {moreReviews.map((r, i) => (
                  <Reveal key={r._id ?? `${r.name}-${i}`} delay={i * 0.05}>
                    <TestimonialCard r={r} />
                  </Reveal>
                ))}
              </div>
            </div>
          )}

          {/* ── Video testimonials placeholder ── */}
          <Reveal>
            <div className="mt-24 text-center">
              <span className="text-xs uppercase tracking-[0.3em] text-gold">Video Stories</span>
              <h2 className="mt-4 text-4xl md:text-5xl">Hear it in their words.</h2>
            </div>
          </Reveal>
          <div className="mt-12 grid md:grid-cols-3 gap-6">
            {[1, 2, 3].map((n) => (
              <Reveal key={n} delay={n * 0.05}>
                <div className="aspect-video glass-card rounded-2xl flex items-center justify-center hover:shadow-gold transition cursor-pointer group">
                  <PlayCircle className="w-14 h-14 text-gold group-hover:scale-110 transition" />
                </div>
              </Reveal>
            ))}
          </div>

        </section>
      </div>
    </>
  );
}
