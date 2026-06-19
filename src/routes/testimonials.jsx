import { Helmet } from "react-helmet-async";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight, Star, Quote, PlayCircle } from "lucide-react";
import { Reveal } from "@/components/site/Reveal";
import { TESTIMONIALS } from "@/utils/constants";
import { useSanity } from "@/lib/useSanity";
import { useSiteSettings } from "@/lib/useSiteSettings";
import { TESTIMONIALS_QUERY } from "@/lib/sanityQueries";

const CAROUSEL_COUNT = 5;
const SLIDE_INTERVAL = 6000;

/** Normalise a Sanity testimonial doc into the shape the card expects. */
function normalise(t) {
  return {
    _id:             t._id,
    name:            t.name    ?? "",
    country:         t.location ?? "",
    text:            t.review   ?? "",
    rating:          t.rating   ?? 5,
    service:         t.service  ?? "",
    avatarInitial:   t.avatarInitial ?? "",
    featured:        t.featured ?? false,
    // Resolve Sanity image URL
    screenshotUrl:   t.screenshotImage?.asset?.url ?? null,
    screenshotAlt:   t.screenshotImage?.alt ?? "Client testimonial screenshot",
  };
}

// ─── Testimonial Card ──────────────────────────────────────────────────────────
function TestimonialCard({ r, large = false }) {
  const hasImage = Boolean(r.screenshotUrl);

  if (hasImage) {
    return (
      <div className={`glass-card rounded-2xl overflow-hidden ${
        large ? "" : "hover:border-primary/40 hover:-translate-y-1 transition h-full"
      }`}>
        {/* Screenshot */}
        <div className="w-full bg-secondary/30">
          <img
            src={r.screenshotUrl}
            alt={r.screenshotAlt}
            className="w-full object-contain max-h-96"
            loading="lazy"
          />
        </div>
        {/* Name strip */}
        <div className="px-6 py-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gold/20 border border-gold/40 flex items-center justify-center text-gold text-xs font-semibold shrink-0">
              {r.avatarInitial || r.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <p className="font-serif text-sm text-gold leading-tight">{r.name}</p>
              {r.country && (
                <p className="text-[10px] text-muted-foreground">{r.country}</p>
              )}
            </div>
          </div>
          {r.service && (
            <span className="text-[10px] uppercase tracking-widest text-muted-foreground border border-border rounded-full px-2.5 py-1 shrink-0">
              {r.service}
            </span>
          )}
        </div>
      </div>
    );
  }

  // Text-only card
  return (
    <div className={`glass-card rounded-2xl p-8 ${
      large ? "" : "h-full hover:border-primary/40 hover:-translate-y-1 transition"
    }`}>
      <Quote className="w-7 h-7 text-gold/40" />
      <p className="mt-4 leading-relaxed text-foreground/90">&ldquo;{r.text}&rdquo;</p>
      <div className="mt-6 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gold/20 border border-gold/40 flex items-center justify-center text-gold text-xs font-semibold shrink-0">
            {r.avatarInitial || r.name.charAt(0).toUpperCase()}
          </div>
          <div>
            <p className="font-serif text-sm text-gold leading-tight">{r.name}</p>
            {r.country && (
              <p className="text-[10px] text-muted-foreground">{r.country}</p>
            )}
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

// ─── Page ──────────────────────────────────────────────────────────────────────
export default function TestimonialsPage() {
  const { data: cmsTestimonials } = useSanity(TESTIMONIALS_QUERY, null);
  const { settings } = useSiteSettings();

  const reviews = cmsTestimonials && cmsTestimonials.length > 0
    ? cmsTestimonials.map(normalise)
    : TESTIMONIALS.map((t) => ({ ...t, screenshotUrl: null }));

  // Featured carousel: prefer explicitly featured, else first CAROUSEL_COUNT
  const featuredReviews = reviews.filter((r) => r.featured).length > 0
    ? reviews.filter((r) => r.featured).slice(0, CAROUSEL_COUNT)
    : reviews.slice(0, CAROUSEL_COUNT);
  const moreReviews = reviews.filter((r) => !featuredReviews.includes(r));

  const [activeIndex, setActiveIndex] = useState(0);
  const activeReview = featuredReviews[activeIndex] ?? featuredReviews[0];

  useEffect(() => { setActiveIndex(0); }, [reviews.length]);

  useEffect(() => {
    if (featuredReviews.length === 0) return;
    const timer = window.setInterval(() => {
      setActiveIndex((c) => (c + 1) % featuredReviews.length);
    }, SLIDE_INTERVAL);
    return () => window.clearInterval(timer);
  }, [featuredReviews.length]);

  const goPrevious = () =>
    setActiveIndex((c) => (c + featuredReviews.length - 1) % featuredReviews.length);
  const goNext = () =>
    setActiveIndex((c) => (c + 1) % featuredReviews.length);

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

          {/* Featured carousel */}
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
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className="mt-10 glass-card rounded-3xl overflow-hidden relative"
                  >
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,oklch(0.82_0.12_85_/_0.08),transparent_40%)] pointer-events-none" />

                    {activeReview?.screenshotUrl ? (
                      // Screenshot carousel slide
                      <div className="relative z-10">
                        <div className="w-full bg-secondary/20 flex justify-center">
                          <img
                            src={activeReview.screenshotUrl}
                            alt={activeReview.screenshotAlt}
                            className="max-h-[480px] w-auto object-contain"
                            loading="lazy"
                          />
                        </div>
                        <div className="p-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-gold/20 border border-gold/40 flex items-center justify-center text-gold font-semibold shrink-0">
                              {activeReview.avatarInitial || activeReview.name.charAt(0).toUpperCase()}
                            </div>
                            <div>
                              <p className="font-serif text-lg text-gold">{activeReview.name}</p>
                              <p className="text-xs text-muted-foreground">{activeReview.country}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <CarouselControls
                              current={activeIndex}
                              total={featuredReviews.length}
                              onPrev={goPrevious}
                              onNext={goNext}
                              onDot={setActiveIndex}
                            />
                          </div>
                        </div>
                      </div>
                    ) : (
                      // Text carousel slide
                      <div className="p-10 relative z-10">
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
                          <CarouselControls
                            current={activeIndex}
                            total={featuredReviews.length}
                            onPrev={goPrevious}
                            onNext={goNext}
                            onDot={setActiveIndex}
                          />
                        </div>
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>
              </Reveal>
            </div>
          )}

          {/* More reviews grid */}
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

          {/* Video testimonials placeholder */}
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

function CarouselControls({ current, total, onPrev, onNext, onDot }) {
  return (
    <div className="flex items-center gap-3">
      <button onClick={onPrev} aria-label="Previous review" className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-gold/30 text-gold transition hover:bg-gold/10">
        <ArrowLeft className="w-4 h-4" />
      </button>
      <div className="flex items-center gap-2">
        {[...Array(total)].map((_, i) => (
          <button key={i} onClick={() => onDot(i)} aria-label={`View review ${i + 1}`}
            className={`h-2 rounded-full transition-all ${ i === current ? "w-8 bg-gold" : "w-2 bg-muted" }`}
          />
        ))}
      </div>
      <button onClick={onNext} aria-label="Next review" className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-gold/30 text-gold transition hover:bg-gold/10">
        <ArrowRight className="w-4 h-4" />
      </button>
    </div>
  );
}
