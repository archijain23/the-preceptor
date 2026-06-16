import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
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

export default function HomePage() {
  return (
    <>
      <Helmet>
        <title>The Preceptor — Premium Astrology Consultations</title>
        <meta
          name="description"
          content="Cinematic astrology consultations and spiritual guidance for high-intention clients in the US and across the world."
        />
        <meta
          property="og:title"
          content="The Preceptor — Premium Astrology Consultations"
        />
        <meta
          property="og:description"
          content="Modern luxury astrology, birth chart readings, and spiritual consultations."
        />
      </Helmet>

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
    []
  );

  return (
    <section className="relative overflow-hidden min-h-[100svh] flex items-center shooting-star">
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
      <div className="absolute inset-0 starfield" aria-hidden />
      <div className="absolute inset-0 starfield-glow" aria-hidden />
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        {particles.map((p) => (
          <Particle key={p.id} {...p} />
        ))}
      </div>
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
          maskComposite: "intersect, intersect",
        }}
      >
        <motion.div
          className="absolute inset-0"
          animate={{ y: [0, -16, 0] }}
          transition={{ duration: 13, repeat: Infinity, ease: "easeInOut", delay: 2.6 }}
        >
          {/* Hero: above-fold LCP — eager, high priority, WebP via vite-imagetools */}
          <img
            src={heroImg}
            alt="The Preceptor — celestial guide"
            width={1400}
            height={1867}
            fetchPriority="high"
            loading="eager"
            decoding="async"
            className="absolute inset-0 w-full h-full object-cover object-center lg:scale-[1.18] mix-blend-luminosity"
            style={{ opacity: 0.88 }}
          />
        </motion.div>
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to right, oklch(0.10 0.025 270) 0%, oklch(0.10 0.025 270 / 0.55) 22%, transparent 55%)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, oklch(0.10 0.025 270) 0%, oklch(0.10 0.025 270 / 0.45) 15%, transparent 45%)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, oklch(0.10 0.025 270 / 0.6) 0%, transparent 30%)",
          }}
        />
        <motion.div
          aria-hidden
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.25, 0.5, 0.25], scale: [0.95, 1.05, 0.95] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 2.2 }}
          className="absolute top-[44%] left-[52%] -translate-x-1/2 -translate-y-1/2 w-[50%] aspect-square rounded-full pointer-events-none blur-3xl"
          style={{
            background: "radial-gradient(circle, oklch(0.82 0.12 85 / 0.40), transparent 65%)",
          }}
        />
        <motion.div
          aria-hidden
          animate={{ opacity: [0.2, 0.38, 0.2] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 3 }}
          className="absolute top-[8%] left-[50%] -translate-x-1/2 w-[40%] h-[28%] pointer-events-none blur-3xl"
          style={{
            background:
              "radial-gradient(ellipse at center, oklch(0.55 0.12 255 / 0.45), transparent 70%)",
          }}
        />
      </motion.div>
      <div
        className="absolute inset-y-0 left-0 pointer-events-none w-full lg:w-[58%]"
        style={{
          background:
            "linear-gradient(to right, oklch(0.10 0.025 270) 38%, oklch(0.10 0.025 270 / 0.75) 58%, transparent 100%)",
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, oklch(0.10 0.025 270 / 0.5) 0%, transparent 18%, transparent 75%, oklch(0.10 0.025 270) 100%)",
        }}
      />
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 pt-32 pb-24 lg:py-40 w-full">
        <div className="max-w-[52rem] lg:max-w-[46rem]">
          <motion.span
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.25, duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-card text-xs uppercase tracking-[0.28em] text-gold"
          >
            <motion.span
              animate={{ rotate: [0, 18, -12, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 3 }}
            >
              <Sparkles className="w-3 h-3" />
            </motion.span>
            Premium Astrology
          </motion.span>

          <StaggeredHeading
            line1="Modern guidance,"
            line2Gold="written in the stars."
            delay={0.45}
          />

          <motion.p
            initial={{ opacity: 0, x: -18 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.15, duration: 1.0, ease: [0.22, 1, 0.36, 1] }}
            className="mt-8 text-lg md:text-xl max-w-xl leading-relaxed"
            style={{ color: "oklch(0.7 0.02 80)" }}
          >
            Cinematic, deeply personal astrology consultations for high-intention seekers — designed
            for clarity in love, career, and life's defining chapters.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, x: -14 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.4, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="mt-10 flex flex-wrap gap-4"
          >
            <motion.div
              animate={{
                boxShadow: [
                  "0 0 0 0 oklch(0.82 0.12 85 / 0.0)",
                  "0 0 0 10px oklch(0.82 0.12 85 / 0.12)",
                  "0 0 0 20px oklch(0.82 0.12 85 / 0.0)",
                ],
              }}
              transition={{ duration: 2.8, repeat: Infinity, ease: "easeOut", delay: 2.5 }}
              className="rounded-full"
            >
              <Link to="/book" className="btn-primary group">
                Book a Session
                <motion.span
                  animate={{ x: [0, 3, 0] }}
                  transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut", delay: 3 }}
                >
                  <ArrowRight className="w-4 h-4" />
                </motion.span>
              </Link>
            </motion.div>
            <a href="#services" className="btn-secondary">
              Explore Services
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.8, duration: 0.9 }}
            className="mt-14 flex items-center gap-5 text-sm"
            style={{ color: "oklch(0.7 0.02 80)" }}
          >
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.9 + i * 0.07, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Star className="w-4 h-4 fill-gold text-gold" />
                </motion.span>
              ))}
            </div>
            <span>Trusted by 2,500+ clients across 18+ countries</span>
          </motion.div>
        </div>
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ y: [0, 9, 0], opacity: [0, 0.5, 0.75, 0.4] }}
        transition={{
          opacity: { delay: 2.4, duration: 1.2, ease: "easeOut" },
          y: { duration: 3.2, repeat: Infinity, delay: 2.4 },
        }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 select-none flex flex-col items-center gap-2"
      >
        <span
          className="text-[0.6rem] uppercase tracking-[0.38em]"
          style={{ color: "oklch(0.82 0.12 85 / 0.60)" }}
        >
          Scroll
        </span>
        <motion.span
          animate={{ opacity: [0.4, 1, 0.4], scaleY: [0.6, 1, 0.6] }}
          transition={{ duration: 1.8, repeat: Infinity }}
          className="block w-px h-6"
          style={{ background: "oklch(0.82 0.12 85 / 0.45)" }}
        />
      </motion.div>
    </section>
  );
}

function About() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["8%", "-8%"]);
  const imgScale = useTransform(scrollYProgress, [0, 1], [1.08, 1.18]);
  const glowOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.25, 0.55, 0.25]);

  return (
    <section ref={ref} className="relative py-32 md:py-40 lg:py-48 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none section-glow-about" aria-hidden />
      <div className="absolute inset-0 pointer-events-none">
        <motion.div style={{ opacity: glowOpacity }} className="absolute top-1/4 -left-32 w-[55%] aspect-square rounded-full bg-[radial-gradient(circle,oklch(0.55_0.08_310_/_0.35),transparent_65%)] blur-3xl" />
        <motion.div style={{ opacity: glowOpacity }} className="absolute bottom-0 -right-40 w-[60%] aspect-square rounded-full bg-[radial-gradient(circle,oklch(0.82_0.12_85_/_0.18),transparent_65%)] blur-3xl" />
      </div>
      <div className="star-cluster absolute inset-0" aria-hidden />
      <div className="relative max-w-7xl mx-auto px-6 lg:px-10 grid lg:grid-cols-12 gap-12 lg:gap-20 items-center">
        <motion.div style={{ y }} className="lg:col-span-6 relative aspect-[4/5] lg:aspect-[5/6] order-1 lg:order-none">
          <div className="absolute -inset-10 bg-[radial-gradient(ellipse_at_center,oklch(0.82_0.12_85_/_0.15),transparent_70%)] blur-2xl pointer-events-none" />
          <motion.div
            initial={{ opacity: 0, scale: 1.05 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0 overflow-hidden"
            style={{
              WebkitMaskImage: "radial-gradient(ellipse 75% 80% at 50% 50%, black 45%, rgba(0,0,0,0.55) 75%, transparent 100%)",
              maskImage: "radial-gradient(ellipse 75% 80% at 50% 50%, black 45%, rgba(0,0,0,0.55) 75%, transparent 100%)",
            }}
          >
            {/* About: below-fold — lazy WebP via vite-imagetools */}
            <motion.img
              src={aboutImg}
              alt="The Preceptor — guiding presence"
              width={1000}
              height={1250}
              loading="lazy"
              decoding="async"
              style={{ scale: imgScale }}
              className="w-full h-full object-cover mix-blend-luminosity opacity-90"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-transparent to-background/70" />
            <div className="absolute inset-0 bg-gradient-to-r from-background/40 via-transparent to-transparent" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_60%_40%,oklch(0.82_0.12_85_/_0.14),transparent_60%)]" />
          </motion.div>
          <motion.span animate={{ y: [0, -10, 0], opacity: [0.5, 1, 0.5] }} transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }} className="absolute top-6 right-6 text-gold font-serif text-3xl select-none" aria-hidden>✦</motion.span>
        </motion.div>
        <div className="lg:col-span-6 lg:pl-4">
          <Reveal><span className="eyebrow">— Our Practice</span></Reveal>
          <Reveal delay={0.08}>
            <h2 className="mt-6 text-balance">
              A modern astrologer<br />
              <span className="display-italic text-gold">for a modern world.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mt-8 lead text-pretty">For over twelve years, The Preceptor has guided executives, artists, and seekers through life's most pivotal chapters — translating classical Vedic and Western astrology into language that is grounded, modern, and quietly powerful.</p>
          </Reveal>
          <Reveal delay={0.22}>
            <p className="mt-5 text-muted-foreground leading-relaxed max-w-xl">Our philosophy is simple: the stars do not predict your fate — they reveal your design. We help you read it.</p>
          </Reveal>
          <Reveal delay={0.3}>
            <div className="mt-12 grid grid-cols-2 gap-5 max-w-md">
              {[
                { n: "12+", l: "Years of practice" },
                { n: "4.98★", l: "Average rating" },
              ].map((s) => (
                <div key={s.l} className="border-l border-gold/40 pl-5">
                  <p className="font-serif text-3xl text-gold num-old">{s.n}</p>
                  <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground mt-2">{s.l}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Services() {
  return (
    <section id="services" className="py-32 relative bg-cosmic-deep overflow-hidden">
      <div className="absolute inset-0 pointer-events-none section-glow-services" aria-hidden />
      <div className="cosmic-stars absolute inset-0 pointer-events-none" aria-hidden />
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[50%] h-[60%] bg-[radial-gradient(ellipse_at_top_right,oklch(0.55_0.08_310_/_0.15),transparent_65%)] blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[40%] h-[50%] bg-[radial-gradient(ellipse_at_bottom_left,oklch(0.82_0.12_85_/_0.08),transparent_65%)] blur-3xl" />
      </div>
      <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10">
        <Reveal className="text-center max-w-2xl mx-auto">
          <span className="text-xs uppercase tracking-[0.3em] text-gold">Services</span>
          <h2 className="mt-4 text-4xl md:text-5xl">Consultations crafted with intention.</h2>
          <p className="mt-5 text-muted-foreground">Each offering is a focused, cinematic session — designed around what you actually need to know.</p>
        </Reveal>
        <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.05}>
              <motion.div whileHover={{ y: -6 }} transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }} className="glass-card rounded-2xl p-8 h-full group cursor-pointer hover:border-primary/40 relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,oklch(0.82_0.12_85_/_0.07),transparent_40%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-full bg-primary/10 text-gold flex items-center justify-center group-hover:bg-primary/20 transition">
                    <s.icon className="w-5 h-5" />
                  </div>
                  <h3 className="mt-6 text-2xl">{s.title}</h3>
                  <p className="mt-3 text-muted-foreground text-sm leading-relaxed">{s.desc}</p>
                  <div className="mt-6 flex items-center gap-2 text-gold text-sm opacity-0 group-hover:opacity-100 transition">Learn more <ArrowRight className="w-3 h-3" /></div>
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  const [i, setI] = useState(0);

  useEffect(() => {
    if (!testimonials.length) return;
    const timer = window.setInterval(() => {
      setI((current) => (current + 1) % testimonials.length);
    }, testimonialSlideInterval);
    return () => window.clearInterval(timer);
  }, []);

  if (!testimonials.length) return null;
  const t = testimonials[i];
  const goPrevious = () => setI((current) => (current + testimonials.length - 1) % testimonials.length);
  const goNext = () => setI((current) => (current + 1) % testimonials.length);

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
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }} className="mt-14 glass-card rounded-3xl p-12 relative overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,oklch(0.82_0.12_85_/_0.07),transparent_40%)]" />
              <div className="relative z-10">
                <Quote className="w-10 h-10 text-gold/30 mx-auto" />
                <p className="mt-6 font-serif text-2xl md:text-3xl leading-relaxed">"{t.text}"</p>
                <div className="mt-8 flex justify-center gap-1">
                  {[...Array(t.rating)].map((_, k) => (<Star key={k} className="w-4 h-4 fill-gold text-gold" />))}
                </div>
                <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="font-serif text-lg text-gold">{t.name}</p>
                    <p className="text-xs text-muted-foreground">{t.country}</p>
                  </div>
                  <div className="flex items-center justify-center gap-3">
                    <button onClick={goPrevious} aria-label="Previous review" className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-gold/30 text-gold transition hover:bg-gold/10"><ArrowLeft className="w-4 h-4" /></button>
                    <div className="flex items-center gap-2">
                      {testimonials.map((_, index) => (<button key={index} onClick={() => setI(index)} aria-label={`View review ${index + 1}`} className={`h-2 rounded-full transition-all ${index === i ? "w-8 bg-gold" : "w-2 bg-muted"}`} />))}
                    </div>
                    <button onClick={goNext} aria-label="Next review" className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-gold/30 text-gold transition hover:bg-gold/10"><ArrowRight className="w-4 h-4" /></button>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
          <div className="mt-8 flex justify-center">
            <Link to="/testimonials" className="inline-flex items-center gap-2 text-gold font-medium hover:text-foreground transition">View more testimonials <ArrowRight className="w-4 h-4" /></Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Achievements() {
  return (
    <section className="py-32 bg-cosmic-deep relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none section-glow-achievements" aria-hidden />
      <div className="absolute inset-0 bg-hero opacity-50" />
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[55%] h-[50%] bg-[radial-gradient(ellipse_at_top,oklch(0.82_0.12_85_/_0.1),transparent_65%)] blur-3xl" />
      </div>
      <div className="cosmic-stars absolute inset-0 pointer-events-none" aria-hidden />
      <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10">
        <Reveal className="text-center max-w-2xl mx-auto">
          <span className="text-xs uppercase tracking-[0.3em] text-gold">Recognition</span>
          <h2 className="mt-4 text-4xl md:text-5xl">A practice built on trust.</h2>
        </Reveal>
        <div className="mt-16 grid grid-cols-2 lg:grid-cols-4 gap-6">
          {achievements.map((a, i) => (
            <Reveal key={a.label} delay={i * 0.08}>
              <div className="glass-card rounded-2xl p-8 text-center hover:shadow-gold transition relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,oklch(0.82_0.12_85_/_0.08),transparent_50%)] opacity-0 hover:opacity-100 transition-opacity duration-500" />
                <div className="relative z-10">
                  <Award className="w-6 h-6 text-gold mx-auto" />
                  <p className="mt-4 font-serif text-4xl md:text-5xl bg-gradient-gold">{a.value}</p>
                  <p className="mt-2 text-sm text-muted-foreground">{a.label}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Faq() {
  const [open, setOpen] = useState(0);
  return (
    <section className="py-32 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none section-glow-faq" aria-hidden />
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 right-0 w-[45%] h-[55%] bg-[radial-gradient(ellipse_at_bottom_right,oklch(0.55_0.08_310_/_0.15),transparent_65%)] blur-3xl" />
      </div>
      <div className="max-w-7xl mx-auto px-6 lg:px-10 grid lg:grid-cols-2 gap-16 items-start relative z-10">
        <Reveal>
          <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }} className="relative aspect-square rounded-3xl overflow-hidden gold-border shadow-elegant lg:sticky lg:top-32">
            {/* FAQ: below-fold — lazy WebP via vite-imagetools */}
            <img
              src={qnaImg}
              alt="Cosmic question space"
              width={800}
              height={800}
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/50 via-transparent to-transparent" />
          </motion.div>
        </Reveal>
        <div>
          <Reveal>
            <span className="text-xs uppercase tracking-[0.3em] text-gold">Questions</span>
            <h2 className="mt-4 text-4xl md:text-5xl">Everything you might wonder.</h2>
          </Reveal>
          <div className="mt-10 space-y-3">
            {faqs.map((f, i) => (
              <Reveal key={f.q} delay={i * 0.05}>
                <div className="glass-card rounded-2xl overflow-hidden">
                  <button onClick={() => setOpen(open === i ? null : i)} className="w-full p-6 flex items-center justify-between text-left" aria-expanded={open === i}>
                    <span className="font-serif text-lg">{f.q}</span>
                    <ChevronDown className={`w-5 h-5 text-gold flex-shrink-0 transition-transform duration-300 ${open === i ? "rotate-180" : ""}`} />
                  </button>
                  <motion.div initial={false} animate={open === i ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }} transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }} className="overflow-hidden">
                    <p className="px-6 pb-6 text-muted-foreground leading-relaxed">{f.a}</p>
                  </motion.div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section className="py-32 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none section-glow-cta" aria-hidden />
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,oklch(0.82_0.12_85_/_0.07),transparent_60%)] blur-3xl" />
      </div>
      <div className="max-w-5xl mx-auto px-6 lg:px-10 relative z-10">
        <Reveal>
          <div className="relative rounded-3xl overflow-hidden glass-card p-12 md:p-20 text-center">
            <div className="absolute inset-0 bg-hero opacity-60" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,oklch(0.82_0.12_85_/_0.15),transparent_40%)]" />
            <div className="relative z-10">
              <motion.div animate={{ rotate: [0, 15, -10, 0], scale: [1, 1.12, 1] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}>
                <Sun className="w-10 h-10 text-gold mx-auto" />
              </motion.div>
              <h2 className="mt-6 text-4xl md:text-5xl">Begin your reading.</h2>
              <p className="mt-5 text-muted-foreground max-w-xl mx-auto">A single conversation can shift the trajectory of a decade. Reserve your private session today.</p>
              <Link to="/book" className="mt-10 inline-flex items-center gap-2 px-8 py-4 rounded-full bg-primary text-primary-foreground font-medium shadow-gold hover:scale-[1.02] transition">Book Your Session <ArrowRight className="w-4 h-4" /></Link>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
