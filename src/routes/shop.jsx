import { motion } from "framer-motion";
import { Sparkles, BookOpen, Gem, GraduationCap, Bell } from "lucide-react";
import { useState } from "react";
import { Reveal } from "@/components/site/Reveal";

const previews = [
  {
    icon: BookOpen,
    t: "Astrology Reports",
    d: "Personalised written natal and yearly forecasts.",
  },
  {
    icon: Gem,
    t: "Spiritual Products",
    d: "Hand-curated objects for your altar and rituals.",
  },
  {
    icon: GraduationCap,
    t: "Courses & Ebooks",
    d: "Self-paced learning to read your own chart.",
  },
];

export default function ShopPage() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  return (
    <div className="bg-hero starfield min-h-screen">
      <section className="max-w-5xl mx-auto px-6 lg:px-10 py-24 lg:py-32 text-center">
        <Reveal>
          <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{
              duration: 60,
              repeat: Infinity,
              ease: "linear",
            }}
            className="w-20 h-20 mx-auto rounded-full gold-border flex items-center justify-center"
          >
            <Sparkles className="w-8 h-8 text-gold" />
          </motion.div>

          <span className="mt-8 inline-block text-xs uppercase tracking-[0.3em] text-gold">
            Shop
          </span>

          <h1 className="mt-4 text-6xl md:text-7xl">
            Coming Soon.
          </h1>

          <p className="mt-6 text-lg text-muted-foreground max-w-xl mx-auto">
            A curated collection of reports, products, ebooks and courses —
            crafted with the same care as our consultations.
          </p>
        </Reveal>

        <Reveal delay={0.15}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setDone(true);

              // Add API call here
              console.log("Email:", email);
            }}
            className="mt-12 max-w-md mx-auto glass-card rounded-full p-2 flex items-center"
          >
            <Bell className="w-5 h-5 text-gold mx-4" />

            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Notify me at launch"
              type="email"
              required
              className="flex-1 bg-transparent focus:outline-none px-2 py-2 text-sm"
            />

            <button
              type="submit"
              className="px-6 py-3 rounded-full bg-primary text-primary-foreground text-sm font-medium hover:scale-[1.02] transition"
            >
              {done ? "On the list ✓" : "Notify Me"}
            </button>
          </form>
        </Reveal>

        <div className="mt-20 grid md:grid-cols-3 gap-6">
          {previews.map((p, i) => (
            <Reveal key={p.t} delay={i * 0.08}>
              <div className="glass-card rounded-2xl p-8 hover:shadow-gold transition">
                <p.icon className="w-7 h-7 text-gold mx-auto" />

                <h3 className="mt-5 text-xl">
                  {p.t}
                </h3>

                <p className="mt-2 text-sm text-muted-foreground">
                  {p.d}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  );
}