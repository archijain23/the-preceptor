import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { Reveal } from "@/components/site/Reveal";
import { FAQS } from "@/utils/constants";
import qnaImg from "@/assets/qna-section.jpg";

export function FaqSection() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="py-32 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none section-glow-faq" aria-hidden />
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 right-0 w-[45%] h-[55%] bg-[radial-gradient(ellipse_at_bottom_right,oklch(0.55_0.08_310_/_0.15),transparent_65%)] blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-10 grid lg:grid-cols-2 gap-16 items-start relative z-10">
        <Reveal>
          <motion.div animate={{ y: [0, -10, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="relative aspect-square rounded-3xl overflow-hidden gold-border shadow-elegant lg:sticky lg:top-32">
            <img src={qnaImg} alt="Cosmic question space" loading="lazy" decoding="async"
              width={600} height={600} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-background/50 via-transparent to-transparent" />
          </motion.div>
        </Reveal>

        <div>
          <Reveal>
            <span className="text-xs uppercase tracking-[0.3em] text-gold">Questions</span>
            <h2 className="mt-4 text-4xl md:text-5xl">Everything you might wonder.</h2>
          </Reveal>
          <div className="mt-10 space-y-3">
            {FAQS.map((f, i) => (
              <Reveal key={f.q} delay={i * 0.05}>
                <div className="glass-card rounded-2xl overflow-hidden">
                  <button onClick={() => setOpen(open === i ? null : i)}
                    className="w-full p-6 flex items-center justify-between text-left"
                    aria-expanded={open === i}>
                    <span className="font-serif text-lg">{f.q}</span>
                    <ChevronDown className={`w-5 h-5 text-gold flex-shrink-0 transition-transform duration-300 ${open === i ? "rotate-180" : ""}`} />
                  </button>
                  <motion.div initial={false}
                    animate={open === i ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden">
                    <p className="px-6 pb-6 text-muted-foreground leading-relaxed">{f.a}</p>
                  </motion.div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
