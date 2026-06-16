import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Reveal } from "@/components/site/Reveal";
import { ASTROLOGER } from "@/utils/constants";
import aboutImg from "@/assets/about-section.jpg";

export function AboutSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["8%", "-8%"]);
  const imgScale = useTransform(scrollYProgress, [0, 1], [1.08, 1.18]);
  const glowOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.25, 0.55, 0.25]);

  return (
    <section ref={ref} className="relative py-32 md:py-40 lg:py-48 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none section-glow-about" aria-hidden />
      <div className="absolute inset-0 pointer-events-none">
        <motion.div style={{ opacity: glowOpacity }}
          className="absolute top-1/4 -left-32 w-[55%] aspect-square rounded-full bg-[radial-gradient(circle,oklch(0.55_0.08_310_/_0.35),transparent_65%)] blur-3xl" />
        <motion.div style={{ opacity: glowOpacity }}
          className="absolute bottom-0 -right-40 w-[60%] aspect-square rounded-full bg-[radial-gradient(circle,oklch(0.82_0.12_85_/_0.18),transparent_65%)] blur-3xl" />
      </div>
      <div className="star-cluster absolute inset-0" aria-hidden />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-10 grid lg:grid-cols-12 gap-12 lg:gap-20 items-center">
        <motion.div style={{ y }} className="lg:col-span-6 relative aspect-[4/5] lg:aspect-[5/6] order-1 lg:order-none">
          <div className="absolute -inset-10 bg-[radial-gradient(ellipse_at_center,oklch(0.82_0.12_85_/_0.15),transparent_70%)] blur-2xl pointer-events-none" />
          <motion.div initial={{ opacity: 0, scale: 1.05 }} whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0 overflow-hidden"
            style={{
              WebkitMaskImage: "radial-gradient(ellipse 75% 80% at 50% 50%, black 45%, rgba(0,0,0,0.55) 75%, transparent 100%)",
              maskImage: "radial-gradient(ellipse 75% 80% at 50% 50%, black 45%, rgba(0,0,0,0.55) 75%, transparent 100%)",
            }}>
            <motion.img src={aboutImg} alt="The Preceptor — guiding presence"
              loading="lazy" decoding="async" width={600} height={750}
              style={{ scale: imgScale }}
              className="w-full h-full object-cover mix-blend-luminosity opacity-90" />
            <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-transparent to-background/70" />
            <div className="absolute inset-0 bg-gradient-to-r from-background/40 via-transparent to-transparent" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_60%_40%,oklch(0.82_0.12_85_/_0.14),transparent_60%)]" />
          </motion.div>
          <motion.span animate={{ y: [0, -10, 0], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-6 right-6 text-gold font-serif text-3xl select-none" aria-hidden>✦</motion.span>
        </motion.div>

        <div className="lg:col-span-6 lg:pl-4">
          <Reveal><span className="eyebrow">— Our Practice</span></Reveal>
          <Reveal delay={0.08}>
            <h2 className="mt-6 text-balance">
              A modern astrologer<br />
              <span className="display-italic text-gold">for a modern world.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mt-8 lead text-pretty">{ASTROLOGER.bio}</p>
          </Reveal>
          <Reveal delay={0.22}>
            <p className="mt-5 text-muted-foreground leading-relaxed max-w-xl">{ASTROLOGER.philosophy}</p>
          </Reveal>
          <Reveal delay={0.3}>
            <div className="mt-12 grid grid-cols-2 gap-5 max-w-md">
              {[{ n: "12+", l: "Years of practice" }, { n: "4.98★", l: "Average rating" }].map((s) => (
                <div key={s.l} className="border-l border-gold/40 pl-5">
                  <p className="font-serif text-3xl text-gold num-old">{s.n}</p>
                  <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground mt-2">{s.l}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
