import { Reveal } from '@/components/site/Reveal.jsx';

export function AboutSection() {
  const pillars = [
    { icon: '✦', title: 'Vedic & Western Astrology', desc: 'Dual-tradition expertise combining the precision of Vedic calculation with Western psychological depth.' },
    { icon: '◈', title: 'Intuitive Tarot', desc: 'Archetypal card wisdom used as a mirror to clarify and amplify the themes illuminated in the birth chart.' },
    { icon: '⚕', title: 'Holistic Guidance', desc: 'Every session integrates mindfulness, practical strategy and spiritual insight for real-world application.' },
  ];

  return (
    <section id="about" className="section relative">
      <div className="absolute inset-0 section-glow-about pointer-events-none" />
      <div className="container-luxe relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left */}
          <div>
            <Reveal>
              <div className="flex items-center gap-3 mb-6">
                <div className="h-px w-12 bg-gradient-to-r from-transparent to-gold/60" />
                <span className="eyebrow">About The Preceptor</span>
              </div>
              <h2 className="text-balance mb-6">Ancient Wisdom,<br /><em>Modern Clarity</em></h2>
              <div className="prose-luxe">
                <p>
                  With over eight years of dedicated practice across Vedic and Western traditions,
                  The Preceptor brings scholarly rigour and intuitive depth to every consultation.
                  Each reading is a conversation between the celestial map and your lived experience.
                </p>
                <p>
                  Clients across 48 countries return again and again not for predictions, but for the
                  clarity and agency that comes from truly understanding their cosmic blueprint.
                </p>
              </div>
            </Reveal>
          </div>

          {/* Right — pillars */}
          <div className="space-y-6">
            {pillars.map((p, i) => (
              <Reveal key={p.title} delay={0.1 + i * 0.1}>
                <div className="glass-card rounded-2xl p-6 card-lift">
                  <div className="flex items-start gap-4">
                    <span className="text-gold text-2xl mt-0.5 shrink-0">{p.icon}</span>
                    <div>
                      <h4 className="mb-2">{p.title}</h4>
                      <p className="text-sm">{p.desc}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
