import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  ArrowLeft,
  Star,
  Sparkles,
  Heart,
  Briefcase,
  Moon,
  Sun,
  BookOpen,
  ChevronDown,
  Award,
  Quote,
} from "lucide-react";
import { useRef, useState, useMemo, useEffect } from "react";
import heroImg from "@/assets/hero-section.jpg";
import aboutImg from "@/assets/about-section.jpg";
import qnaImg from "@/assets/qna-section.jpg";
import { Reveal } from "@/components/site/Reveal";

export default function HomeWrapper() {
  return (
    <>
      <Helmet>
        <title>The Preceptor — Premium Astrology Consultations</title>
        <meta name="description" content="Cinematic astrology consultations and spiritual guidance for high-intention clients in the US and across the world." />
        <meta property="og:title" content="The Preceptor — Premium Astrology Consultations" />
        <meta property="og:description" content="Modern luxury astrology, birth chart readings, and spiritual consultations." />
      </Helmet>
      <HomeContent />
    </>
  );
}

const services = [
  {
    icon: Star,
    title: "Birth Chart Reading",
    desc: "A cinematic decode of your natal sky — purpose, gifts, and life arc.",
  },
  {
    icon: Briefcase,
    title: "Career Guidance",
    desc: "Strategic timing and direction aligned with your dharma and ambition.",
  },
  {
    icon: Heart,
    title: "Relationship Consultation",
    desc: "Synastry and compatibility guidance for love, family, and partnership.",
  },
  {
    icon: Moon,
    title: "Tarot Reading",
    desc: "Intuitive symbolic readings for clarity at decisive crossroads.",
  },
  {
    icon: Sparkles,
    title: "Spiritual Consultation",
    desc: "Personal practices, rituals, and remedies for inner alignment.",
  },
  {
    icon: BookOpen,
    title: "Kundli Analysis",
    desc: "Deep Vedic chart analysis with predictive timelines and dashas.",
  },
];

const testimonials = [
  {
    name: "Amelia R.",
    country: "New York, USA",
    text: "The most precise reading I've ever had. It felt like sitting with a wise friend who could see decades ahead.",
    rating: 5,
  },
  {
    name: "Daniel K.",
    country: "London, UK",
    text: "Calm, confident, and breathtakingly accurate. The Preceptor gave me a map I didn't know I needed.",
    rating: 5,
  },
  {
    name: "Priya S.",
    country: "Toronto, CA",
    text: "A truly luxurious experience. Insightful, grounded and deeply transformative. I have referred half of my friends.",
    rating: 5,
  },
  {
    name: "Marcus T.",
    country: "Los Angeles, USA",
    text: "I've worked with multiple astrologers. None compare. The clarity I received reshaped my next career move.",
    rating: 5,
  },
  {
    name: "Lina M.",
    country: "Berlin, DE",
    text: "Every word landed. The session was poetic, precise and quietly powerful.",
    rating: 5,
  },
];

const testimonialSlideInterval = 6000;

const achievements = [
  { value: "12+", label: "Years of Practice" },
  { value: "8,400", label: "Sessions Delivered" },
  { value: "47", label: "Countries Served" },
  { value: "4.98", label: "Average Rating" },
];

const faqs = [
  {
    q: "How does an online astrology consultation work?",
    a: "Sessions are conducted over a private video call. You receive a calendar invite, an intake form, and a recording afterwards.",
  },
  {
    q: "What details are required to book?",
    a: "Your full date of birth, exact time of birth, and place of birth — plus the questions on your mind.",
  },
  {
    q: "How long is a session?",
    a: "Standard consultations run 60 minutes. Deep-dive readings extend to 90 minutes with a written summary.",
  },
  {
    q: "Can international clients book sessions?",
    a: "Absolutely. We serve clients across all timezones with white-glove scheduling.",
  },
  {
    q: "Are sessions private and confidential?",
    a: "Yes. Every conversation is held in complete confidence. Recordings are shared only with you.",
  },
];

/* ─────────────────────────────────────────────
   Ambient particle — single drifting gold dot
───────────────────────────────────────────── */
function Particle({ x, y, size, delay, duration }) {
  return (
    <motion.span
      aria-hidden
      initial={{ opacity: 0, y: 0 }}
      animate={{
        opacity: [0, 0.7, 0.4, 0.8, 0],
        y: [0, -60, -120],
        x: [0, (Math.random() - 0.5) * 40],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
        repeatDelay: Math.random() * 4 + 2,
      }}
      style={{
        position: "absolute",
        left: `${x}%`,
        top: `${y}%`,
        width: size,
        height: size,
        borderRadius: "50%",
        background: "oklch(0.82 0.12 85 / 0.75)",
        boxShadow: "0 0 6px 2px oklch(0.82 0.12 85 / 0.45)",
        pointerEvents: "none",
      }}
    />
  );
}

/* ─────────────────────────────────────────────
   Word-by-word staggered heading
───────────────────────────────────────────── */
function StaggeredHeading({ line1, line2Gold, delay = 0 }) {
  const words1 = line1.split(" ");
  const words2 = line2Gold.split(" ");

  const wordVariant = {
    hidden: { opacity: 0, x: -22, filter: "blur(4px)" },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      filter: "blur(0px)",
      transition: {
        delay: delay + i * 0.09,
        duration: 0.75,
        ease: [0.22, 1, 0.36, 1],
      },
    }),
  };

  return (
    <h1
      className="mt-8 leading-[1.04]"
      style={{
        fontFamily: "var(--font-serif)",
        fontSize: "clamp(2.75rem, 6vw + 0.5rem, 5.75rem)",
        letterSpacing: "-0.025em",
        fontWeight: 400,
      }}
    >
      <span className="block overflow-hidden">
        {words1.map((word, i) => (
          <motion.span
            key={i}
            custom={i}
            variants={wordVariant}
            initial="hidden"
            animate="visible"
            className="inline-block mr-[0.28em] last:mr-0"
          >
            {word}
          </motion.span>
        ))}
      </span>
      <span className="block overflow-hidden mt-1">
        {words2.map((word, i) => (
          <motion.span
            key={i}
            custom={words1.length + i}
            variants={wordVariant}
            initial="hidden"
            animate="visible"
            className="inline-block mr-[0.28em] last:mr-0 bg-gradient-gold"
          >
            {word}
          </motion.span>
        ))}
      </span>
    </h1>
  );
}

function HomeContent() {
  return (
    <>
      <Hero />
      <About />
      <Services />
      <Testimonials />
      <Achievements />
      <Faq />
      <CTA />
    </>
  );
}

/* ═══════════════════════════════════════════════════════
   HERO
═══════════════════════════════════════════════════════ */
function Hero() {
  const particles = useMemo(
    () =>
      Array.from({ length: 18 }, (_, idx) => ({
        id: idx,
        x: ((idx * 37 + 11) % 90) + 5,
        y: ((idx * 53 + 17) % 80) + 10,
        size: (idx % 3) + 1.5,
        delay: idx * 0.45,
        duration: 5 + (idx % 5),
      })),
    [],
  );

  return (
    <section className="relative overflow-hidden min-h-[100svh] flex items-center shooting-star">

      {/* ── 1. Hero nebula gradient ── */}
      <div
        className="absolute inset-0"
        style={{
          background: [
            "radial-gradient(ellipse 80% 60% at 72% 28%, oklch(0.28 0.10 255 / 0.65), transparent 58%)",
            "radial-gradient(ellipse 60% 50% at 18% 78%, oklch(0.35 0.10 30 / 0.22), transparent 58%)",
            "radial-gradient(ellipse 50% 60% at 55% 55%, oklch(0.22 0.07 280 / 0.30), transparent 65%)",
          ].join(", "),
        }}
      />

      {/* ── 2a. Star dots + warm gold stars ── */}
      <div className="absolute inset-0 starfield" aria-hidden />

      {/* ── 2b. Blurred glow halos around star positions ── */}
      <div className="absolute inset-0 starfield-glow" aria-hidden />

      {/* ── 3. Ambient particles ── */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        {particles.map((p) => (
          <Particle key={p.id} {...p} />
        ))}
      </div>

      {/* ── 4. Left purple nebula fog ── */}
      <motion.div
        aria-hidden
        initial={{ opacity: 0 }}
        animate={{ x: [0, 38, 0], opacity: [0.28, 0.5, 0.28] }}
        transition={{ duration: 24, repeat: Infinity, ease: "easeInOut", delay: 1.6 }}
        className="absolute -top-24 -left-24 w-[65%] h-[85%] pointer-events-none blur-3xl"
        style={{
          background:
            "radial-gradient(ellipse at center, oklch(0.52 0.09 295 / 0.30), transparent 62%)",
        }}
      />

      {/* ── 5. Right warm amber nebula fog ── */}
      <motion.div
        aria-hidden
        initial={{ opacity: 0 }}
        animate={{ x: [0, -28, 0], opacity: [0.2, 0.38, 0.2] }}
        transition={{ duration: 28, repeat: Infinity, ease: "easeInOut", delay: 2.2 }}
        className="absolute bottom-0 right-0 w-[58%] h-[65%] pointer-events-none blur-3xl"
        style={{
          background:
            "radial-gradient(ellipse at center, oklch(0.38 0.10 38 / 0.22), transparent 60%)",
        }}
      />

      {/* ── 6. Cloud layer A ── */}
      <motion.div
        aria-hidden
        animate={{ x: [0, 55, 0], opacity: [0.18, 0.32, 0.18] }}
        transition={{ duration: 34, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[15%] right-[10%] w-[55%] h-[40%] pointer-events-none blur-2xl"
        style={{
          background:
            "radial-gradient(ellipse 120% 60% at 60% 50%, oklch(0.30 0.08 255 / 0.55), transparent 70%)",
          mixBlendMode: "screen",
        }}
      />

      {/* ── 7. Cloud layer B ── */}
      <motion.div
        aria-hidden
        animate={{ x: [0, -45, 0], opacity: [0.12, 0.26, 0.12] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut", delay: 4 }}
        className="absolute bottom-[20%] right-[5%] w-[48%] h-[35%] pointer-events-none blur-2xl"
        style={{
          background:
            "radial-gradient(ellipse 100% 60% at 40% 60%, oklch(0.55 0.08 60 / 0.35), transparent 68%)",
          mixBlendMode: "screen",
        }}
      />

      {/* ── 8. Hero figure ── */}
      <motion.div
        initial={{ opacity: 0, y: 48, scale: 1.06 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 2.6, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-y-0 right-0 w-full lg:w-[68%] xl:w-[62%] pointer-events-none"
        style={{
          WebkitMaskImage: [
            "linear-gradient(to right, transparent 0%, black 30%, black 80%, transparent 100%)",
            "linear-gradient(to bottom, transparent 0%, black 12%, black 80%, transparent 100%)",
            "radial-gradient(ellipse 75% 80% at 62% 44%, black 30%, rgba(0,0,0,0.55) 62%, transparent 88%)",
          ].join(", "),
          maskImage: [
            "linear-gradient(to right, transparent 0%, black 30%, black 80%, transparent 100%)",
            "linear-gradient(to bottom, transparent 0%, black 12%, black 80%, transparent 100%)",
            "radial-gradient(ellipse 75% 80% at 62% 44%, black 30%, rgba(0,0,0,0.55) 62%, transparent 88%)",
          ].join(", "),
          WebkitMaskComposite: "source-in, source-in",
        }}
      >
        <img
          src={heroImg}
          alt="The Preceptor — astrology guide"
          className="w-full h-full object-cover object-top"
          loading="eager"
        />
      </motion.div>

      {/* ── 9. Hero text content ── */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 w-full pt-28 pb-24 lg:pb-32">
        <div className="max-w-xl lg:max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-center gap-2.5 mb-6"
          >
            <span className="text-gold">✦</span>
            <span className="text-xs uppercase tracking-[0.28em] text-gold/80">Premium Astrology Consultations</span>
          </motion.div>

          <StaggeredHeading
            line1="Read the Stars,"
            line2Gold="Shape Your Destiny"
            delay={0.2}
          />

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.85, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="mt-8 text-muted-foreground max-w-md leading-relaxed"
            style={{ fontSize: "clamp(1rem, 1.5vw, 1.15rem)" }}
          >
            Precision astrology for high-intention seekers. Cinematic readings that decode your birth chart with depth, clarity, and presence.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="mt-10 flex flex-wrap gap-4"
          >
            <Link
              to="/book"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-primary text-primary-foreground font-medium hover:scale-[1.03] hover:shadow-gold transition-all duration-300"
            >
              Book a Session
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/services"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full glass-card text-foreground hover:scale-[1.03] transition-all duration-300"
            >
              Explore Services
            </Link>
          </motion.div>
        </div>
      </div>

      {/* ── 10. Scroll hint ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-xs uppercase tracking-[0.25em] text-muted-foreground">Scroll</span>
        <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 1.8, repeat: Infinity }}>
          <ChevronDown className="w-4 h-4 text-gold/60" />
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════
   ABOUT
═══════════════════════════════════════════════════════ */
function About() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
    <section ref={ref} className="relative py-32 lg:py-40 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
        {/* Image */}
        <Reveal className="relative">
          <motion.div style={{ y }} className="relative aspect-[3/4] rounded-2xl overflow-hidden">
            <img
              src={aboutImg}
              alt="About The Preceptor"
              className="w-full h-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
          </motion.div>
          <div className="absolute -bottom-6 -right-6 w-36 h-36 rounded-2xl glass-card flex flex-col items-center justify-center gap-1 shadow-gold">
            <span className="text-gold font-serif text-3xl">✦</span>
            <span className="text-xs uppercase tracking-widest text-muted-foreground">Since 2012</span>
          </div>
        </Reveal>

        {/* Text */}
        <div className="space-y-8">
          <Reveal>
            <span className="text-xs uppercase tracking-[0.28em] text-gold/80">About</span>
            <h2 className="mt-4 font-serif text-4xl lg:text-5xl leading-[1.1]">
              Where Ancient Wisdom Meets Modern Clarity
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-muted-foreground leading-relaxed">
              With over a decade of practice, The Preceptor has guided thousands of seekers across 47 countries. Rooted in Vedic astrology and enriched by Tarot and intuitive counsel, every session is a rare blend of precision and presence.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="text-muted-foreground leading-relaxed">
              Sessions are private, recorded, and tailored. No generic readings — only the deep, personalised guidance your chart uniquely calls for.
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <Link
              to="/about"
              className="inline-flex items-center gap-2 text-sm text-gold hover:gap-3 transition-all duration-300"
            >
              Learn more <ArrowRight className="w-4 h-4" />
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════
   SERVICES
═══════════════════════════════════════════════════════ */
function Services() {
  return (
    <section className="relative py-32 lg:py-40 overflow-hidden">
      <div className="absolute inset-0 bg-hero opacity-60 pointer-events-none" />
      <div className="relative max-w-7xl mx-auto px-6 lg:px-10">
        <Reveal className="text-center mb-16">
          <span className="text-xs uppercase tracking-[0.28em] text-gold/80">Services</span>
          <h2 className="mt-4 font-serif text-4xl lg:text-5xl">What We Offer</h2>
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.07}>
              <div className="glass-card rounded-2xl p-8 h-full hover:scale-[1.02] hover:shadow-gold transition-all duration-300 group">
                <s.icon className="w-7 h-7 text-gold mb-5 group-hover:scale-110 transition-transform duration-300" />
                <h3 className="font-serif text-xl mb-3">{s.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{s.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="text-center mt-14">
          <Link
            to="/services"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full glass-card hover:scale-[1.03] hover:shadow-gold transition-all duration-300"
          >
            View All Services <ArrowRight className="w-4 h-4" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════
   TESTIMONIALS
═══════════════════════════════════════════════════════ */
function Testimonials() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = setInterval(
      () => setActive((p) => (p + 1) % testimonials.length),
      testimonialSlideInterval,
    );
    return () => clearInterval(id);
  }, []);

  return (
    <section className="relative py-32 lg:py-40 overflow-hidden">
      <div className="max-w-4xl mx-auto px-6 lg:px-10 text-center">
        <Reveal>
          <span className="text-xs uppercase tracking-[0.28em] text-gold/80">Testimonials</span>
          <h2 className="mt-4 font-serif text-4xl lg:text-5xl">Words From Clients</h2>
        </Reveal>

        <div className="mt-16 relative min-h-[220px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="glass-card rounded-2xl p-10 lg:p-14"
            >
              <Quote className="w-8 h-8 text-gold/40 mx-auto mb-6" />
              <p className="font-serif text-xl lg:text-2xl leading-relaxed text-foreground">
                &ldquo;{testimonials[active].text}&rdquo;
              </p>
              <div className="mt-8 flex flex-col items-center gap-1">
                <span className="font-medium">{testimonials[active].name}</span>
                <span className="text-xs text-muted-foreground tracking-wider">{testimonials[active].country}</span>
                <div className="flex gap-0.5 mt-2">
                  {Array.from({ length: testimonials[active].rating }).map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-gold text-gold" />
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex items-center justify-center gap-3 mt-8">
          <button
            onClick={() => setActive((p) => (p - 1 + testimonials.length) % testimonials.length)}
            className="w-9 h-9 rounded-full glass-card flex items-center justify-center hover:scale-110 transition-transform"
            aria-label="Previous testimonial"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                i === active ? "bg-gold w-5" : "bg-border"
              }`}
              aria-label={`Go to testimonial ${i + 1}`}
            />
          ))}
          <button
            onClick={() => setActive((p) => (p + 1) % testimonials.length)}
            className="w-9 h-9 rounded-full glass-card flex items-center justify-center hover:scale-110 transition-transform"
            aria-label="Next testimonial"
          >
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════
   ACHIEVEMENTS
═══════════════════════════════════════════════════════ */
function Achievements() {
  return (
    <section className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 bg-hero opacity-40 pointer-events-none" />
      <div className="relative max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {achievements.map((a, i) => (
            <Reveal key={a.label} delay={i * 0.08}>
              <div className="text-center">
                <p className="font-serif text-4xl lg:text-5xl text-gold">{a.value}</p>
                <p className="mt-2 text-xs uppercase tracking-[0.2em] text-muted-foreground">{a.label}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════
   FAQ
═══════════════════════════════════════════════════════ */
function Faq() {
  const [open, setOpen] = useState(null);

  return (
    <section className="relative py-32 lg:py-40 overflow-hidden">
      <div className="max-w-3xl mx-auto px-6 lg:px-10">
        <Reveal className="text-center mb-14">
          <span className="text-xs uppercase tracking-[0.28em] text-gold/80">FAQ</span>
          <h2 className="mt-4 font-serif text-4xl lg:text-5xl">Common Questions</h2>
        </Reveal>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <Reveal key={i} delay={i * 0.05}>
              <div className="glass-card rounded-xl overflow-hidden">
                <button
                  className="w-full flex items-center justify-between px-7 py-5 text-left"
                  onClick={() => setOpen(open === i ? null : i)}
                  aria-expanded={open === i}
                >
                  <span className="font-medium pr-4">{faq.q}</span>
                  <motion.div animate={{ rotate: open === i ? 180 : 0 }} transition={{ duration: 0.3 }}>
                    <ChevronDown className="w-4 h-4 text-gold shrink-0" />
                  </motion.div>
                </button>
                <AnimatePresence initial={false}>
                  {open === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <p className="px-7 pb-6 text-muted-foreground text-sm leading-relaxed">{faq.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════
   CTA
═══════════════════════════════════════════════════════ */
function CTA() {
  return (
    <section className="relative py-32 lg:py-44 overflow-hidden">
      <div className="absolute inset-0 bg-hero opacity-60 pointer-events-none" />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 50% 50%, oklch(0.28 0.10 255 / 0.35), transparent 70%)",
        }}
      />
      <div className="absolute inset-0 starfield opacity-40" aria-hidden />

      <div className="relative max-w-3xl mx-auto px-6 text-center">
        <Reveal>
          <span className="text-gold font-serif text-4xl">✦</span>
          <h2 className="mt-6 font-serif text-4xl lg:text-6xl leading-[1.08]">
            Your Stars Are Waiting
          </h2>
          <p className="mt-6 text-muted-foreground max-w-lg mx-auto leading-relaxed">
            Book a private session and receive the clarity, direction, and cosmic insight you've been searching for.
          </p>
          <div className="mt-10 flex flex-wrap gap-4 justify-center">
            <Link
              to="/book"
              className="inline-flex items-center gap-2 px-10 py-4 rounded-full bg-primary text-primary-foreground font-medium hover:scale-[1.03] hover:shadow-gold transition-all duration-300"
            >
              Book a Session <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-10 py-4 rounded-full glass-card hover:scale-[1.03] transition-all duration-300"
            >
              Get in Touch
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
