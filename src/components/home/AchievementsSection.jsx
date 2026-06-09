import { Reveal } from '@/components/site/Reveal.jsx';
import { achievements } from '@/content/testimonials.js';

export function AchievementsSection() {
  return (
    <section className="section relative">
      <div className="absolute inset-0 section-glow-achievements pointer-events-none" />
      <div className="container-luxe relative z-10">
        <Reveal>
          <div className="glass-card-strong rounded-3xl px-8 py-12 md:py-16">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
              {achievements.map((a, i) => (
                <div key={i} className="space-y-2">
                  <p className="font-serif text-4xl md:text-5xl text-gold num-old">{a.value}</p>
                  <p className="eyebrow">{a.label}</p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
