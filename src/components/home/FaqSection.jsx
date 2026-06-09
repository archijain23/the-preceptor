import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Reveal } from '@/components/site/Reveal.jsx';
import { faqs } from '@/content/faq.js';

export function FaqSection() {
  const [open, setOpen] = useState(null);

  return (
    <section id="faq" className="section relative">
      <div className="absolute inset-0 section-glow-faq pointer-events-none" />
      <div className="container-luxe relative z-10">
        <Reveal className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-gold/60" />
            <span className="eyebrow">FAQ</span>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-gold/60" />
          </div>
          <h2 className="text-balance">Common Questions</h2>
        </Reveal>

        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((f, i) => (
            <Reveal key={i} delay={i * 0.05}>
              <div className="glass-card rounded-2xl overflow-hidden">
                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
                  aria-expanded={open === i}
                >
                  <span className="font-medium text-foreground">{f.q}</span>
                  <motion.span
                    animate={{ rotate: open === i ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="shrink-0 text-gold"
                  >
                    <ChevronDown className="w-5 h-5" />
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {open === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <div className="px-6 pb-5 border-t border-border/40">
                        <p className="pt-4 text-sm text-muted-foreground leading-relaxed">{f.a}</p>
                      </div>
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
