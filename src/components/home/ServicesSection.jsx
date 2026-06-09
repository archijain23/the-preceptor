import { Link } from '@tanstack/react-router';
import { ArrowRight } from 'lucide-react';
import { Reveal } from '@/components/site/Reveal.jsx';
import { services } from '@/content/services.js';

export function ServicesSection() {
  return (
    <section id="services" className="section relative">
      <div className="absolute inset-0 section-glow-services pointer-events-none" />
      <div className="container-luxe relative z-10">
        <Reveal className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-gold/60" />
            <span className="eyebrow">Services</span>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-gold/60" />
          </div>
          <h2 className="text-balance">Consultations &amp; Readings</h2>
          <p className="lead mt-4 mx-auto text-center">Each session is tailored to your chart, your questions and your moment in time.</p>
        </Reveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s, i) => (
            <Reveal key={s.id} delay={i * 0.07}>
              <div className="glass-card rounded-2xl p-7 card-lift h-full flex flex-col">
                <span className="text-gold text-3xl mb-4 block">{s.icon}</span>
                <h4 className="mb-2">{s.title}</h4>
                <p className="text-sm flex-1 mb-5">{s.description}</p>
                <div className="flex items-center justify-between pt-4 border-t border-border/40">
                  <span className="text-xs text-muted-foreground">{s.duration}</span>
                  <span className="text-gold font-medium text-sm">{s.price}</span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="text-center mt-12">
          <Link to="/book" className="btn-primary">
            Book Any Service
            <ArrowRight className="w-4 h-4" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
