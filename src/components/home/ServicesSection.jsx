import { motion } from "framer-motion";
import { Star, Briefcase, Heart, Moon, Sparkles, BookOpen, ArrowRight } from "lucide-react";
import { Reveal } from "@/components/site/Reveal";
import { SERVICES } from "@/utils/constants";

const ICON_MAP = { Star, Briefcase, Heart, Moon, Sparkles, BookOpen };

export function ServicesSection() {
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
          <p className="mt-5 text-muted-foreground">
            Each offering is a focused, cinematic session — designed around what you actually need to know.
          </p>
        </Reveal>

        <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((s, i) => {
            const Icon = ICON_MAP[s.icon] || Star;
            return (
              <Reveal key={s.slug} delay={i * 0.05}>
                <motion.div
                  whileHover={{ y: -6 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="glass-card rounded-2xl p-8 h-full group cursor-pointer hover:border-primary/40 relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,oklch(0.82_0.12_85_/_0.07),transparent_40%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="relative z-10">
                    <div className="w-12 h-12 rounded-full bg-primary/10 text-gold flex items-center justify-center group-hover:bg-primary/20 transition">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="mt-6 text-2xl">{s.title}</h3>
                    <p className="mt-3 text-muted-foreground text-sm leading-relaxed">{s.desc}</p>
                    <div className="mt-4 flex items-center gap-3 text-xs text-muted-foreground">
                      <span className="px-2 py-0.5 rounded-full border border-gold/20 text-gold">{s.duration}</span>
                      <span className="font-serif text-gold text-sm">{s.price}</span>
                    </div>
                    <div className="mt-4 flex items-center gap-2 text-gold text-sm opacity-0 group-hover:opacity-100 transition">
                      Learn more <ArrowRight className="w-3 h-3" />
                    </div>
                  </div>
                </motion.div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
