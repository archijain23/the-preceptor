import { Link } from "react-router-dom";
import SEO from "@/components/site/SEO";
import { PAGE_SEO } from "@/content/seo";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Star,
  Sparkles,
  Heart,
  Briefcase,
  Moon,
  BookOpen,
  ChevronDown,
  Award,
  Quote,
} from "lucide-react";
import { useRef, useState, useMemo, useEffect } from "react";
// vite-imagetools: ?format=webp&quality=80 converts JPG → WebP at build time.
// hero: ~1.3 MB JPG → ~110-130 KB WebP
// about: ~1.27 MB JPG → ~100-120 KB WebP
// qna:   ~1.39 MB JPG → ~110-130 KB WebP
import heroImg from "@/assets/hero-section.jpg?format=webp&quality=80";
import aboutImg from "@/assets/about-section.jpg?format=webp&quality=80";
import qnaImg from "@/assets/qna-section.jpg?format=webp&quality=80";
import Reveal from "@/components/site/Reveal";

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
  { value: "2,500+", label: "Sessions Delivered" },
  { value: "18+", label: "Countries Served" },
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

// Deterministic particle props — stable across renders, no Math.random() in animate/transition.
function Particle({ x, y, size, delay, duration, dx, repeatDelay }) {
  return (
    <motion.span
      aria-hidden
      initial={{ opacity: 0, y: 0 }}
      animate={{
        opacity: [0, 0.7, 0.4, 0.8, 0],
        y: [0, -60, -120],
        x: [0, dx],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
        repeatDelay,
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

// RESTORED: Original blur-dissolve entrance animation for heading words.
// Each word emerges from blur(4px) into sharp focus — the original cinematic effect.
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
            className="inline-block mr-[0.25em] last:mr-0"
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
            className="inline-block mr-[0.25em] last:mr-0 bg-gradient-gold"
          >
            {word}
          </motion.span>
        ))}
      </span>
    </h1>
  );
}

export default function Home() {
  return (
    <>
      <SEO {...PAGE_SEO.home} />
      <HeroSection />
      <ServicesSection />
      <AboutSection />
      <AchievementsSection />
      <TestimonialsSection />
      <QnASection />
      <FAQSection />
      <CTASection />
    </>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
function HeroSection() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const yBg   = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const oBg   = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  // Stable particle data — computed once, never on re-render
  const particles = useMemo(() => [
    { id: 0, x: 15, y: 65, size: "5px",  delay: 0,   duration: 5,   dx: 12,  repeatDelay: 1.5 },
    { id: 1, x: 25, y: 75, size: "3px",  delay: 1.2, duration: 6.5, dx: -8,  repeatDelay: 2 },
    { id: 2, x: 70, y: 80, size: "4px",  delay: 0.5, duration: 7,   dx: 15,  repeatDelay: 1 },
    { id: 3, x: 85, y: 60, size: "6px",  delay: 2,   duration: 5.5, dx: -18, repeatDelay: 2.5 },
    { id: 4, x: 50, y: 85, size: "3.5px",delay: 0.8, duration: 8,   dx: 10,  repeatDelay: 1.8 },
    { id: 5, x: 35, y: 70, size: "4px",  delay: 1.5, duration: 6,   dx: -12, repeatDelay: 2.2 },
    { id: 6, x: 60, y: 72, size: "5px",  delay: 3,   duration: 7.5, dx: 20,  repeatDelay: 1.2 },
  ], []);

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      aria-label="Hero"
    >
      {/* ── Parallax background image ──────────────────────── */}
      <motion.div
        style={{ y: yBg, opacity: oBg }}
        className="absolute inset-0 z-0 pointer-events-none"
      >
        <img
          src={heroImg}
          alt=""
          aria-hidden="true"
          width={2400}
          height={1600}
          loading="eager"
          decoding="async"
          fetchPriority="high"
          className="w-full h-full object-cover"
          style={{ opacity: 0.35 }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/40 to-background" />
      </motion.div>

      {/* ── Cosmic ambient ─────────────────────────────────── */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div
          className="absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[900px]
                     rounded-full opacity-20 blur-3xl pointer-events-none"
          style={{ background: "radial-gradient(circle, var(--nebula-violet) 0%, var(--nebula-blue) 50%, transparent 70%)" }}
        />
        <div
          className="absolute bottom-0 right-0 w-[500px] h-[500px]
                     rounded-full opacity-15 blur-3xl pointer-events-none"
          style={{ background: "radial-gradient(circle, var(--gold) 0%, transparent 60%)" }}
        />
      </div>

      {/* ── RESTORED: Drifting ambient blur orbs ───────────── */}
      {/* Orb 1 — top-left violet, drifts right */}
      <motion.div
        aria-hidden
        initial={{ opacity: 0 }}
        animate={{ x: [0, 38, 0], opacity: [0.28, 0.5, 0.28] }}
        transition={{ duration: 24, repeat: Infinity, ease: "easeInOut", delay: 1.6 }}
        className="absolute -top-24 -left-24 w-[65%] h-[85%] pointer-events-none blur-3xl"
        style={{
          background: "radial-gradient(ellipse at 40% 40%, var(--nebula-violet) 0%, var(--nebula-blue) 40%, transparent 70%)",
          mixBlendMode: "screen",
        }}
      />
      {/* Orb 2 — bottom-right gold, drifts left */}
      <motion.div
        aria-hidden
        initial={{ opacity: 0 }}
        animate={{ x: [0, -28, 0], opacity: [0.2, 0.38, 0.2] }}
        transition={{ duration: 28, repeat: Infinity, ease: "easeInOut", delay: 2.2 }}
        className="absolute bottom-0 right-0 w-[58%] h-[65%] pointer-events-none blur-3xl"
        style={{
          background: "radial-gradient(ellipse at 60% 60%, var(--gold) 0%, var(--nebula-blue) 50%, transparent 70%)",
          mixBlendMode: "screen",
        }}
      />
      {/* Orb 3 — mid-right violet, drifts right */}
      <motion.div
        aria-hidden
        animate={{ x: [0, 55, 0], opacity: [0.18, 0.32, 0.18] }}
        transition={{ duration: 34, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[15%] right-[10%] w-[55%] h-[40%] pointer-events-none blur-2xl"
        style={{
          background: "radial-gradient(ellipse at 50% 50%, var(--nebula-violet) 0%, transparent 65%)",
          mixBlendMode: "screen",
        }}
      />
      {/* Orb 4 — bottom-right blue, drifts left */}
      <motion.div
        aria-hidden
        animate={{ x: [0, -45, 0], opacity: [0.12, 0.26, 0.12] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut", delay: 4 }}
        className="absolute bottom-[20%] right-[5%] w-[48%] h-[35%] pointer-events-none blur-2xl"
        style={{
          background: "radial-gradient(ellipse at 50% 50%, var(--nebula-blue) 0%, transparent 65%)",
          mixBlendMode: "screen",
        }}
      />
      {/* Orb 5 — center-bottom gold accent, drifts right */}
      <motion.div
        aria-hidden
        animate={{ x: [0, 30, 0], opacity: [0.1, 0.22, 0.1] }}
        transition={{ duration: 30, repeat: Infinity, ease: "easeInOut", delay: 3 }}
        className="absolute bottom-[10%] left-[20%] w-[40%] h-[30%] pointer-events-none blur-2xl"
        style={{
          background: "radial-gradient(ellipse at 50% 50%, var(--gold) 0%, transparent 65%)",
          mixBlendMode: "screen",
        }}
      />

      {/* ── Floating particles ─────────────────────────────── */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {particles.map((p) => (
          <Particle key={p.id} {...p} />
        ))}
      </div>

      {/* ── Hero content ───────────────────────────────────── */}
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full text-xs uppercase
                     tracking-[0.3em] border gold-border bg-secondary/30 backdrop-blur-sm"
        >
          <Sparkles className="w-3.5 h-3.5 text-gold" />
          <span>Vedic · Western · Spiritual</span>
        </motion.div>

        <StaggeredHeading
          line1="Navigate Life With"
          line2Gold="Celestial Clarity"
          delay={0.1}
        />

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.85, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mt-7 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed"
        >
          Private astrology consultations for founders, healers, and
          high-intention seekers. Trusted by 2,500+ clients across 18+ countries.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.05, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <Link to="/book" className="btn-primary">
            Book a Consultation <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            to="/about"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-sm
                       font-medium gold-border hover:bg-secondary/40 transition-all"
          >
            Learn More
          </Link>
        </motion.div>
      </div>

      {/* ── Scroll indicator ───────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] uppercase tracking-[0.35em] text-muted-foreground">Explore</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="w-4 h-4 text-muted-foreground" />
        </motion.div>
      </motion.div>
    </section>
  );
}

// ─── Services ─────────────────────────────────────────────────────────────────
function ServicesSection() {
  return (
    <section className="relative py-24 lg:py-32" aria-labelledby="services-heading">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <Reveal>
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-xs uppercase tracking-[0.3em] text-gold">What We Offer</span>
            <h2 id="services-heading" className="mt-4 text-4xl md:text-5xl">
              Every reading, a different lens.
            </h2>
            <p className="mt-4 text-muted-foreground">
              Six modalities. One intention: to give you profound clarity exactly where you need it.
            </p>
          </div>
        </Reveal>

        <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.07}>
              <Link
                to="/book"
                className="group glass-card rounded-3xl p-8 flex flex-col gap-5 shadow-elegant
                           hover:border-gold/40 transition-all duration-300 h-full"
              >
                <div className="w-10 h-10 rounded-full flex items-center justify-center
                               bg-secondary/60 group-hover:bg-gold/10 transition-colors">
                  <s.icon className="w-5 h-5 text-gold" />
                </div>
                <div>
                  <h3 className="text-xl font-medium">{s.title}</h3>
                  <p className="mt-2 text-muted-foreground text-sm leading-relaxed">{s.desc}</p>
                </div>
                <div className="mt-auto flex items-center gap-1.5 text-xs text-gold">
                  Book now <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── About ────────────────────────────────────────────────────────────────────
function AboutSection() {
  return (
    <section className="relative py-24 lg:py-32" aria-labelledby="about-heading">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 grid lg:grid-cols-2 gap-16 items-center">
        <Reveal>
          <div className="aspect-[4/5] rounded-2xl overflow-hidden gold-border shadow-elegant">
            <img
              src={aboutImg}
              alt="The Preceptor — a trusted guide in the art of celestial reading"
              width={1000}
              height={1250}
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover"
            />
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <span className="text-xs uppercase tracking-[0.3em] text-gold">About</span>
          <h2 id="about-heading" className="mt-4 text-4xl md:text-5xl">
            Astrology that moves with you.
          </h2>
          <p className="mt-6 text-muted-foreground leading-relaxed">
            The Preceptor is a private global consultation practice blending classical
            Vedic astrology, Western tropical analysis, and intuitive symbolic work.
            Twelve years of practice. 2,500+ sessions. A quiet reputation built entirely
            on word of mouth.
          </p>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            Every reading is crafted around your specific chart, your moment, and your
            questions. No templates. No generic readings. Just precise, actionable insight.
          </p>
          <Link to="/about" className="mt-8 inline-flex items-center gap-2 text-sm text-gold hover:gap-3 transition-all">
            Read our story <ArrowRight className="w-4 h-4" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}

// ─── Achievements ─────────────────────────────────────────────────────────────
function AchievementsSection() {
  return (
    <section className="py-20" aria-label="Achievements">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="glass-card rounded-3xl p-10 lg:p-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {achievements.map((a, i) => (
            <Reveal key={a.label} delay={i * 0.08}>
              <div className="text-center">
                <div
                  className="text-5xl lg:text-6xl bg-gradient-gold"
                  style={{ fontFamily: "var(--font-serif)", fontWeight: 300 }}
                >
                  {a.value}
                </div>
                <p className="mt-3 text-sm text-muted-foreground uppercase tracking-[0.2em]">{a.label}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Testimonials ─────────────────────────────────────────────────────────────
function TestimonialsSection() {
  const [active, setActive]   = useState(0);
  const [paused, setPaused]   = useState(false);
  const intervalRef           = useRef(null);

  const startInterval = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setActive((prev) => (prev + 1) % testimonials.length);
    }, testimonialSlideInterval);
  };

  useEffect(() => {
    if (!paused) startInterval();
    else clearInterval(intervalRef.current);
    return () => clearInterval(intervalRef.current);
  }, [paused]);

  const goTo = (i) => { setActive(i); startInterval(); };
  const prev = () => { goTo((active - 1 + testimonials.length) % testimonials.length); };
  const next = () => { goTo((active + 1) % testimonials.length); };

  return (
    <section
      className="relative py-24 lg:py-32"
      aria-labelledby="testimonials-heading"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="max-w-5xl mx-auto px-6 lg:px-10">
        <Reveal>
          <div className="text-center">
            <span className="text-xs uppercase tracking-[0.3em] text-gold">Client Stories</span>
            <h2 id="testimonials-heading" className="mt-4 text-4xl md:text-5xl">
              Words from those who've sat with us.
            </h2>
          </div>
        </Reveal>

        <div className="mt-16 relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="glass-card rounded-3xl p-10 lg:p-14 text-center shadow-elegant"
            >
              <Quote className="w-8 h-8 text-gold/50 mx-auto" />
              <blockquote className="mt-6 text-xl md:text-2xl leading-relaxed max-w-3xl mx-auto"
                style={{ fontFamily: "var(--font-serif)", fontWeight: 300, fontStyle: "italic" }}
              >
                "{testimonials[active].text}"
              </blockquote>
              <div className="mt-8 flex items-center justify-center gap-1.5">
                {Array.from({ length: testimonials[active].rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-gold text-gold" />
                ))}
              </div>
              <p className="mt-4 text-sm font-medium">{testimonials[active].name}</p>
              <p className="text-xs text-muted-foreground">{testimonials[active].country}</p>
            </motion.div>
          </AnimatePresence>

          {/* Prev / Next */}
          <div className="mt-8 flex items-center justify-center gap-4">
            <button
              onClick={prev}
              aria-label="Previous testimonial"
              className="w-10 h-10 rounded-full gold-border flex items-center justify-center
                         hover:bg-secondary transition text-foreground"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                aria-hidden="true">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>

            {/* Dots */}
            <div className="flex items-center gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  aria-label={`Go to testimonial ${i + 1}`}
                  className={`rounded-full transition-all ${
                    i === active
                      ? "w-5 h-2 bg-gold"
                      : "w-2 h-2 bg-muted-foreground/40 hover:bg-muted-foreground/70"
                  }`}
                />
              ))}
            </div>

            <button
              onClick={next}
              aria-label="Next testimonial"
              className="w-10 h-10 rounded-full gold-border flex items-center justify-center
                         hover:bg-secondary transition text-foreground"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Q&A / QnA ────────────────────────────────────────────────────────────────
function QnASection() {
  return (
    <section className="relative py-24 lg:py-32" aria-labelledby="qna-heading">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 grid lg:grid-cols-2 gap-16 items-center">
        <Reveal delay={0.05}>
          <span className="text-xs uppercase tracking-[0.3em] text-gold">The Experience</span>
          <h2 id="qna-heading" className="mt-4 text-4xl md:text-5xl">
            What makes The Preceptor different?
          </h2>
          <div className="mt-8 space-y-5">
            {[
              { icon: Award, title: "12 Years of Practice", desc: "Refined over thousands of sessions across Vedic, Western, and symbolic traditions." },
              { icon: Sparkles, title: "No Templates", desc: "Every reading is original. Every session is built around you." },
              { icon: Star, title: "Global Clientele", desc: "Trusted by founders, artists, healers, and seekers across 18+ countries." },
            ].map((item, i) => (
              <Reveal key={item.title} delay={0.08 + i * 0.07}>
                <div className="flex items-start gap-5 glass-card rounded-2xl p-5">
                  <div className="w-9 h-9 rounded-full bg-secondary/60 flex items-center justify-center shrink-0">
                    <item.icon className="w-4 h-4 text-gold" />
                  </div>
                  <div>
                    <h3 className="font-medium">{item.title}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{item.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="aspect-square rounded-2xl overflow-hidden gold-border shadow-elegant">
            <img
              src={qnaImg}
              alt="A private astrology consultation session — calm, focused, world-class"
              width={1200}
              height={1200}
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ─── FAQ ──────────────────────────────────────────────────────────────────────
function FAQSection() {
  const [open, setOpen] = useState(null);
  const toggle = (i) => setOpen(open === i ? null : i);

  return (
    <section className="py-24 lg:py-32" aria-labelledby="faq-heading">
      <div className="max-w-3xl mx-auto px-6">
        <Reveal>
          <div className="text-center">
            <span className="text-xs uppercase tracking-[0.3em] text-gold">FAQs</span>
            <h2 id="faq-heading" className="mt-4 text-4xl md:text-5xl">Common questions.</h2>
          </div>
        </Reveal>

        <div className="mt-12 space-y-3">
          {faqs.map((faq, i) => (
            <Reveal key={faq.q} delay={i * 0.06}>
              <div className="glass-card rounded-2xl overflow-hidden">
                <button
                  onClick={() => toggle(i)}
                  aria-expanded={open === i}
                  className="w-full flex items-center justify-between px-7 py-5 text-left"
                >
                  <span className="font-medium pr-4">{faq.q}</span>
                  <motion.div
                    animate={{ rotate: open === i ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronDown className="w-5 h-5 text-gold shrink-0" />
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
                      <p className="px-7 pb-6 text-muted-foreground leading-relaxed">{faq.a}</p>
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

// ─── CTA ──────────────────────────────────────────────────────────────────────
function CTASection() {
  return (
    <section className="py-24 lg:py-32" aria-label="Call to action">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <Reveal>
          <span className="text-xs uppercase tracking-[0.3em] text-gold">Begin</span>
          <h2
            className="mt-4 text-4xl md:text-6xl leading-[1.05]"
            style={{ fontFamily: "var(--font-serif)", fontWeight: 300 }}
          >
            Your stars are waiting.
          </h2>
          <p className="mt-6 text-lg text-muted-foreground max-w-xl mx-auto">
            Book a private consultation today. Quiet, precise, and entirely yours.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link to="/book" className="btn-primary">
              Book a Consultation <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/about"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-sm
                         font-medium gold-border hover:bg-secondary/40 transition-all"
            >
              Learn More
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
