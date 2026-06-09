import { Star } from 'lucide-react';
import { Reveal } from '@/components/site/Reveal.jsx';
import { testimonials } from '@/content/testimonials.js';

export function TestimonialsSection() {
  return (
    <section id="testimonials" className="section relative">
      <div className="absolute inset-0 section-glow-testimonials pointer-events-none" />
      <div className="container-luxe relative z-10">
        <Reveal className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-gold/60" />
            <span className="eyebrow">Testimonials</span>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-gold/60" />
          </div>
          <h2 className="text-balance">Voices from the Journey</h2>
        </Reveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <Reveal key={t.id} delay={i * 0.08}>
              <div className="glass-card rounded-2xl p-7 card-lift h-full flex flex-col">
                <div className="flex gap-0.5 mb-5">
                  {[...Array(t.rating)].map((_, j) => (
                    <Star key={j} className="w-3.5 h-3.5 fill-gold text-gold" />
                  ))}
                </div>
                <blockquote className="quote-serif flex-1 mb-6">&ldquo;{t.text}&rdquo;</blockquote>
                <div className="flex items-center gap-3 pt-4 border-t border-border/40">
                  <div className="w-9 h-9 rounded-full bg-primary/20 border border-gold/20 flex items-center justify-center text-xs font-medium text-gold shrink-0">
                    {t.avatar}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">{t.name}</p>
                    <p className="text-xs text-muted-foreground">{t.location}</p>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
