import { Link } from "react-router-dom";
import SEO from "@/components/site/SEO";
import { PAGE_SEO } from "@/content/seo";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Star,
  Sparkles,
  Award,
  Quote,
  ChevronDown,
} from "lucide-react";
import { useRef, useState, useEffect } from "react";
import qnaImg from "@/assets/qna-section.jpg?format=webp&quality=80";
import Reveal from "@/components/site/Reveal";

import { HeroSection } from "@/components/home/HeroSection";
import { ServicesSection } from "@/components/home/ServicesSection";
import { AboutSection } from "@/components/home/AboutSection";
import { AchievementsSection } from "@/components/home/AchievementsSection";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { FaqSection } from "@/components/home/FaqSection";
import { CtaSection } from "@/components/home/CtaSection";

export default function Home() {
  return (
    <>
      <SEO {...PAGE_SEO.home} />
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <AchievementsSection />
      <TestimonialsSection />
      <QnASection />
      <FaqSection />
      <CtaSection />
    </>
  );
}

// ─── Q&A ─────────────────────────────────────────────────────────────────────
// No component file exists for this section — kept inline intentionally
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
            <img src={qnaImg} alt="A private astrology consultation session — calm, focused, world-class"
              width={1200} height={1200} loading="lazy" decoding="async"
              className="w-full h-full object-cover" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
