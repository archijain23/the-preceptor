import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { Reveal } from "@/components/site/Reveal";
import { useSanityData } from "@/sanity/useSanityData";
import { FAQS_QUERY } from "@/sanity/queries";
import { FAQS } from "@/utils/constants";

function FaqItem({ question, answer, isOpen, onToggle }) {
  return (
    <div className="border-b border-gold/10">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-4 py-5 text-left group"
        aria-expanded={isOpen}
      >
        <span className="font-serif text-lg leading-snug group-hover:text-gold transition-colors">
          {question}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="flex-shrink-0 w-6 h-6 text-gold"
        >
          <ChevronDown className="w-6 h-6" />
        </motion.div>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <p className="pb-5 text-muted-foreground leading-relaxed">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function QnAPage() {
  // ── Live from Sanity, falls back to constants.js ───────────────────────────
  const { data: rawFaqs } = useSanityData(FAQS_QUERY, FAQS);

  // Normalise field names: Sanity uses {question, answer}; constants use {q, a}
  const faqs = (rawFaqs || []).map((f) => ({
    question: f.question || f.q,
    answer: f.answer || f.a,
  }));

  const [openIdx, setOpenIdx] = useState(0);

  return (
    <>
      <Helmet>
        <title>FAQ — The Preceptor</title>
        <meta name="description" content="Answers to the most common questions about astrology consultations at The Preceptor." />
      </Helmet>

      <main className="min-h-screen">
        {/* Hero */}
        <section className="relative py-36 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,oklch(0.28_0.10_255_/_0.45),transparent_65%)]" />
          <div className="absolute inset-0 starfield" aria-hidden />
          <div className="relative max-w-4xl mx-auto px-6 lg:px-10 text-center z-10">
            <motion.span
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="text-xs uppercase tracking-[0.3em] text-gold"
            >
              — Common Questions
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="mt-5"
              style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(2.5rem, 5vw, 4.5rem)", fontWeight: 400 }}
            >
              Questions & Answers
            </motion.h1>
          </div>
        </section>

        {/* Accordion */}
        <section className="py-24 bg-cosmic-deep">
          <div className="max-w-3xl mx-auto px-6 lg:px-10">
            <Reveal>
              {faqs.map((f, i) => (
                <FaqItem
                  key={i}
                  question={f.question}
                  answer={f.answer}
                  isOpen={openIdx === i}
                  onToggle={() => setOpenIdx(openIdx === i ? -1 : i)}
                />
              ))}
            </Reveal>
          </div>
        </section>
      </main>
    </>
  );
}
