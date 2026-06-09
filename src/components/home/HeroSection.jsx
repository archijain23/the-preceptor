import { Link } from '@tanstack/react-router';
import { motion } from 'framer-motion';
import { ArrowRight, Star } from 'lucide-react';
import { Reveal } from '@/components/site/Reveal.jsx';

export function HeroSection() {
  return (
    <section className="relative min-h-[100svh] flex items-center overflow-hidden">
      {/* Starfield layers */}
      <div className="absolute inset-0 starfield" aria-hidden="true" />
      <div className="absolute inset-0 starfield-glow" aria-hidden="true" />
      <div className="absolute inset-0 shooting-star" aria-hidden="true" />

      {/* Nebula orbs */}
      <div className="nebula-orb orb-indigo w-[600px] -top-32 -left-20" />
      <div className="nebula-orb orb-mauve w-[500px] top-20 right-0" />
      <div className="nebula-orb orb-amber w-[400px] bottom-0 left-1/3" />

      <div className="container-luxe relative z-10 pt-32 pb-20 w-full">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left — text */}
          <div>
            <Reveal>
              <div className="flex items-center gap-3 mb-8">
                <div className="h-px w-12 bg-gradient-to-r from-transparent to-gold/60" />
                <span className="eyebrow">Private Consultations</span>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <h1 className="display-serif text-balance mb-6">
                Navigate Life by{' '}
                <span className="display-italic bg-gradient-gold">the Stars</span>
              </h1>
            </Reveal>

            <Reveal delay={0.2}>
              <p className="lead mb-10">
                Personalised astrology consultations for those seeking clarity, direction and a deeper
                understanding of the cosmic patterns shaping their journey.
              </p>
            </Reveal>

            <Reveal delay={0.3}>
              <div className="flex flex-wrap items-center gap-4">
                <Link to="/book" className="btn-primary">
                  Book a Session
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <a href="/#services" className="btn-secondary">
                  Explore Services
                </a>
              </div>
            </Reveal>

            <Reveal delay={0.4}>
              <div className="flex items-center gap-6 mt-12 pt-8 border-t border-border/40">
                <div className="flex -space-x-2">
                  {['SL', 'AM', 'EV', 'JO'].map((initials) => (
                    <div
                      key={initials}
                      className="w-9 h-9 rounded-full glass-card border border-gold/20 flex items-center justify-center text-xs font-medium text-gold"
                    >
                      {initials}
                    </div>
                  ))}
                </div>
                <div>
                  <div className="flex gap-0.5 mb-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-gold text-gold" />
                    ))}
                  </div>
                  <p className="text-xs text-muted-foreground">Trusted by 1,200+ clients in 48 countries</p>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Right — decorative cosmic chart */}
          <Reveal delay={0.15} className="hidden lg:flex items-center justify-center">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 120, repeat: Infinity, ease: 'linear' }}
              className="relative w-80 h-80"
            >
              {/* Outer ring */}
              <svg viewBox="0 0 320 320" className="absolute inset-0 w-full h-full opacity-30">
                <circle cx="160" cy="160" r="150" fill="none" stroke="oklch(0.82 0.12 85 / 0.25)" strokeWidth="1" strokeDasharray="4 8" />
                <circle cx="160" cy="160" r="120" fill="none" stroke="oklch(0.82 0.12 85 / 0.15)" strokeWidth="1" strokeDasharray="2 6" />
                <circle cx="160" cy="160" r="90" fill="none" stroke="oklch(0.82 0.12 85 / 0.20)" strokeWidth="0.5" />
                {/* Zodiac tick marks */}
                {[...Array(12)].map((_, i) => {
                  const angle = (i * 30 - 90) * (Math.PI / 180);
                  const x1 = 160 + 148 * Math.cos(angle);
                  const y1 = 160 + 148 * Math.sin(angle);
                  const x2 = 160 + 138 * Math.cos(angle);
                  const y2 = 160 + 138 * Math.sin(angle);
                  return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="oklch(0.82 0.12 85 / 0.50)" strokeWidth="1.5" />;
                })}
              </svg>
              {/* Centre star */}
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  animate={{ scale: [1, 1.08, 1] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                  className="text-6xl text-gold/80 font-serif"
                >
                  ✦
                </motion.div>
              </div>
            </motion.div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
