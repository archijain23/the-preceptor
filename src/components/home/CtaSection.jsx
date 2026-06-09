import { Link } from '@tanstack/react-router';
import { ArrowRight } from 'lucide-react';
import { Reveal } from '@/components/site/Reveal.jsx';

export function CtaSection() {
  return (
    <section className="section relative">
      <div className="absolute inset-0 section-glow-cta pointer-events-none" />
      <div className="absolute inset-0 starfield" aria-hidden="true" />
      <div className="container-luxe relative z-10 text-center">
        <Reveal>
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-gold/60" />
            <span className="eyebrow">Begin Your Journey</span>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-gold/60" />
          </div>
          <h2 className="text-balance mb-6">Ready to Read<br /><em>Your Stars?</em></h2>
          <p className="lead mx-auto text-center mb-10">
            Reserve a private session and receive celestial guidance tailored to your exact cosmic blueprint.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link to="/book" className="btn-primary">
              Book a Session
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link to="/contact" className="btn-secondary">Get in Touch</Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
