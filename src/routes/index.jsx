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
        <title>The Precetor — Premium Astrology Consultations</title>
        <meta name="description" content="Cinematic astrology consultations and spiritual guidance for high-intention clients in the US and across the world." />
        <meta property="og:title" content="The Precetor — Premium Astrology Consultations" />
        <meta property="og:description" content="Modern luxury astrology, birth chart readings, and spiritual consultations." />
      </Helmet>
      <HomeContent />
    </>
  );
}

function HomeContent() {

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
    text: "Calm, confident, and breathtakingly accurate. The Precetor gave me a map I didn't know I needed.",
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
      />
