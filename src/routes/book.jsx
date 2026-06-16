import { Helmet } from "react-helmet-async";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import Cal, { getCalApi } from "@calcom/embed-react";
import {
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Sparkles,
  Globe2,
  Clock,
  Video,
  Mail,
  ShieldCheck,
  CalendarDays,
  User,
  Star,
} from "lucide-react";
import Reveal from "@/components/site/Reveal";

// ─── Cal.com config ────────────────────────────────────────────
const CAL_LINK = "preceptor/astrology-session";
const CAL_NAMESPACE = "astrology-session";

const CAL_THEME = {
  "cal-bg":             "#14121e",
  "cal-bg-emphasis":    "#1c192d",
  "cal-bg-subtle":      "#1f1c30",
  "cal-bg-muted":       "#18162a",
  "cal-bg-inverted":    "#f5f0e8",
  "cal-text":           "#f0ede6",
  "cal-text-emphasis":  "#faf8f3",
  "cal-text-subtle":    "#9b97a8",
  "cal-text-muted":     "#6b6778",
  "cal-text-inverted":  "#14121e",
  "cal-brand":          "#d4a84b",
  "cal-brand-emphasis": "#e8c068",
  "cal-brand-subtle":   "#2a2318",
  "cal-brand-text":     "#14121e",
  "cal-border":         "rgba(255,255,255,0.08)",
  "cal-border-subtle":  "rgba(255,255,255,0.05)",
  "cal-border-booker":  "rgba(255,255,255,0.07)",
  "cal-border-default": "rgba(255,255,255,0.08)",
};

// ─── Form initial state ─────────────────────────────────────────
const initialForm = {
  fullName: "",
  email: "",
  phone: "",
  country: "",
  city: "",
  dob: "",
  tob: "",
  pob: "",
  consultationType: "Birth Chart Reading",
  language: "English",
  concern: "",
};

const consultationTypes = [
  "Birth Chart Reading",
  "Career Guidance",
  "Relationship Consultation",
  "Tarot Reading",
  "Spiritual Consultation",
  "Kundli Analysis",
];

const languages = ["English", "Hindi", "Spanish", "French", "Arabic", "Mandarin"];

// ─── Page ───────────────────────────────────────────────────────
// Flow: 0=intro → 1=details → 2=cal embed (pre-filled, books here) → 3=confirmed
export default function BookPage() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState(initialForm);
  const [bookedData, setBookedData] = useState(null);
  const calInitialised = useRef(false);

  // Init Cal API once on mount
  useEffect(() => {
    if (calInitialised.current) return;
    calInitialised.current = true;
    (async () => {
      const cal = await getCalApi({ namespace: CAL_NAMESPACE });
      if (window.Cal) {
        window.Cal.config = window.Cal.config || {};
        window.Cal.config.forwardQueryParams = true;
      }
      cal("ui", {
        theme: "dark",
        cssVarsPerTheme: { dark: CAL_THEME },
        hideEventTypeDetails: false,
        layout: "month_view",
      });
      cal("on", {
        action: "bookingSuccessful",
        callback: (e) => {
          setBookedData(e.detail?.data ?? {});
          setStep(3);
        },
      });
    })();
  }, []);

  const progressSteps = ["Your Details", "Choose a Time", "Confirmed"];

  return (
    <>
      <Helmet>
        <title>Book a Session — The Preceptor</title>
        <meta name="description" content="Reserve a private astrology consultation with The Preceptor. Available every day." />
        <meta property="og:title" content="Book a Session — The Preceptor" />
        <meta property="og:description" content="Premium astrology consultation — birth chart, career, relationships, and more." />
      </Helmet>

      <div className="bg-hero starfield min-h-screen relative overflow-hidden">
        <div
          className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full opacity-30 blur-3xl"
          style={{ background: "radial-gradient(circle, var(--gold) 0%, transparent 60%)" }}
        />

        <section className="relative max-w-6xl mx-auto px-6 lg:px-10 py-16 lg:py-24">

          {/* Progress bar */}
          {step >= 1 && step <= 2 && (
            <Reveal>
              <div className="max-w-3xl mx-auto mb-12">
                <div className="flex items-center gap-3">
                  {progressSteps.map((s, i) => {
                    const done = step > i;
                    const current = step === i + 1;
                    return (
                      <div key={s} className="flex-1">
                        <div className={`h-[3px] rounded-full transition-all duration-700 ${
                          done || current ? "bg-gold shadow-gold" : "bg-muted"
                        }`} />
                        <p className={`mt-2 text-[10px] md:text-xs uppercase tracking-[0.25em] ${
                          done || current ? "text-gold" : "text-muted-foreground"
                        }`}>{s}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </Reveal>
          )}

          <AnimatePresence mode="wait">
            {step === 0 && (
              <StepWrap key="intro"><IntroStep onStart={() => setStep(1)} /></StepWrap>
            )}
            {step === 1 && (
              <StepWrap key="details">
                <DetailsStep
                  form={form}
                  setForm={setForm}
                  onNext={() => setStep(2)}
                  onBack={() => setStep(0)}
                />
              </StepWrap>
            )}
            {step === 2 && (
              <StepWrap key="cal">
                <CalStep form={form} onBack={() => setStep(1)} />
              </StepWrap>
            )}
            {step === 3 && (
              <StepWrap key="done">
                <ConfirmedStep form={form} bookedData={bookedData} />
              </StepWrap>
            )}
          </AnimatePresence>
        </section>
      </div>
    </>
  );
}

function StepWrap({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

// ─── Step 0: Intro ──────────────────────────────────────────────
function IntroStep({ onStart }) {
  return (
    <div className="text-center max-w-3xl mx-auto pt-8">
      <motion.span
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
        className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.35em] text-gold"
      >
        <Sparkles className="w-3.5 h-3.5" /> Private Consultation
      </motion.span>

      <h1 className="mt-6 text-5xl md:text-7xl leading-[1.05] bg-gradient-gold">
        Begin Your Spiritual Consultation
      </h1>
      <p className="mt-6 text-lg text-muted-foreground leading-relaxed max-w-xl mx-auto">
        A calm, private space to explore your chart with clarity and care. Each
        session is crafted around your story — guided by quiet intention.
      </p>

      <div className="mt-12 grid sm:grid-cols-3 gap-4 max-w-2xl mx-auto">
        {[
          { icon: Clock,  label: "60 minute session" },
          { icon: Video,  label: "Online — private 1:1" },
          { icon: Globe2, label: "Your local timezone" },
        ].map((item, i) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + i * 0.1 }}
            className="glass-card rounded-2xl p-5"
          >
            <item.icon className="w-5 h-5 text-gold mx-auto" />
            <p className="mt-3 text-sm text-foreground/90">{item.label}</p>
          </motion.div>
        ))}
      </div>

      {/* How it works */}
      <motion.div
        initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.55 }}
        className="mt-10 max-w-lg mx-auto glass-card rounded-2xl p-6 text-left"
      >
        <p className="text-xs uppercase tracking-[0.3em] text-gold mb-5 text-center">How it works</p>
        <div className="space-y-4">
          {[
            { icon: User,        step: "01", text: "Share your details & birth info" },
            { icon: CalendarDays,step: "02", text: "Pick a date & time from the live calendar" },
            { icon: Star,        step: "03", text: "Get instant confirmation by email" },
          ].map((row) => (
            <div key={row.step} className="flex items-center gap-4">
              <span className="text-[10px] font-mono text-gold/60 w-6 shrink-0">{row.step}</span>
              <row.icon className="w-4 h-4 text-gold shrink-0" />
              <span className="text-sm text-muted-foreground">{row.text}</span>
            </div>
          ))}
        </div>
      </motion.div>

      <motion.button
        initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        onClick={onStart}
        className="mt-10 btn-primary"
      >
        Begin Booking <ArrowRight className="w-4 h-4" />
      </motion.button>

      <p className="mt-6 text-xs text-muted-foreground tracking-wide">
        Takes about 3 minutes · Confirmed instantly via Cal.com
      </p>
    </div>
  );
}

// ─── Step 1: Details form ───────────────────────────────────────
function DetailsStep({ form, setForm, onNext, onBack }) {
  const update = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const valid = form.fullName && form.email && form.country && form.dob && form.tob && form.pob;

  return (
    <div className="max-w-3xl mx-auto">
      <SectionTitle
        eyebrow="Step 1 of 2"
        title="Share a few details"
        subtitle="Used to prepare your reading and pre-fill your booking. Always private."
      />

      <div className="mt-10 glass-card rounded-3xl p-8 md:p-10 shadow-elegant">
        <Group title="Basic Information">
          <Field label="Full Name" value={form.fullName} onChange={update("fullName")} required />
          <Field label="Email Address" type="email" value={form.email} onChange={update("email")} required />
          <Field label="Phone Number" type="tel" value={form.phone} onChange={update("phone")} />
          <div className="grid md:grid-cols-2 gap-5">
            <Field label="Country" value={form.country} onChange={update("country")} required />
            <Field label="City" value={form.city} onChange={update("city")} />
          </div>
        </Group>

        <Divider />

        <Group title="Astrology Information">
          <div className="grid md:grid-cols-2 gap-5">
            <Field label="Date of Birth" type="date" value={form.dob} onChange={update("dob")} required />
            <Field label="Exact Time of Birth" type="time" value={form.tob} onChange={update("tob")} required />
          </div>
          <Field label="Place of Birth" value={form.pob} onChange={update("pob")} required />
        </Group>

        <Divider />

        <Group title="Session Details">
          <div className="grid md:grid-cols-2 gap-5">
            <SelectField
              label="Consultation Type"
              value={form.consultationType}
              onChange={update("consultationType")}
              options={consultationTypes}
            />
            <SelectField
              label="Preferred Language"
              value={form.language}
              onChange={update("language")}
              options={languages}
            />
          </div>
          <TextAreaField
            label="Main Concern / Questions"
            value={form.concern}
            onChange={update("concern")}
            placeholder="Share what you'd love clarity on..."
          />
        </Group>

        {/* Inline note */}
        <div className="mt-6 flex items-start gap-3 p-4 rounded-2xl bg-secondary/30 border border-border/60">
          <CalendarDays className="w-4 h-4 text-gold shrink-0 mt-0.5" />
          <p className="text-xs text-muted-foreground">
            Next: pick your date &amp; time from the live calendar. Your details will be automatically filled in so you don’t have to type them again.
          </p>
        </div>

        <NavRow onBack={onBack} onNext={onNext} nextDisabled={!valid} nextLabel="Pick a Date & Time" />
      </div>
    </div>
  );
}

// ─── Step 2: Cal.com embed (THE booking step) ──────────────────
// All booking happens INSIDE Cal.com here.
// We pre-fill name/email/phone/notes so user just picks slot & hits confirm.
function CalStep({ form, onBack }) {
  // Build the notes string from form data
  const notes = [
    form.consultationType && `Consultation: ${form.consultationType}`,
    form.language         && `Language: ${form.language}`,
    form.dob              && `DOB: ${form.dob}`,
    form.tob              && `TOB: ${form.tob}`,
    form.pob              && `POB: ${form.pob}`,
    form.country          && `Country: ${form.country}`,
    form.city             && `City: ${form.city}`,
    form.concern          && `Concern: ${form.concern}`,
  ].filter(Boolean).join(" | ");

  return (
    <div className="max-w-5xl mx-auto">
      <SectionTitle
        eyebrow="Step 2 of 2"
        title="Pick your date & time"
        subtitle="Your details are pre-filled. Simply choose a slot and confirm your booking."
      />

      {/* Prefilled badge strip */}
      <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold/10 border border-gold/20 text-xs text-gold">
          <CheckCircle2 className="w-3.5 h-3.5" />
          Booking as {form.fullName}
        </div>
        <div className="inline-flex items-center gap-2 text-xs text-muted-foreground">
          <Globe2 className="w-3.5 h-3.5 text-gold" /> Times in your local timezone
        </div>
        <div className="inline-flex items-center gap-2 text-xs text-muted-foreground">
          <Clock className="w-3.5 h-3.5 text-gold" /> 60 min session
        </div>
      </div>

      {/* Cal.com embed — this is where the actual booking is completed */}
      <div
        className="mt-6 rounded-3xl overflow-hidden shadow-elegant"
        style={{
          background: "oklch(0.14 0.024 270 / 0.80)",
          border: "1px solid rgba(255,255,255,0.07)",
          backdropFilter: "blur(16px)",
        }}
      >
        <Cal
          namespace={CAL_NAMESPACE}
          calLink={CAL_LINK}
          config={{
            layout: "month_view",
            useSlotsViewOnSmallScreen: "true",
            // Pre-fill user details — Cal shows these in the booking form
            name:  form.fullName,
            email: form.email,
            smsReminderNumber: form.phone || undefined,
            notes,
          }}
          style={{ width: "100%", height: "720px", overflow: "scroll" }}
        />
      </div>

      <div className="mt-6 flex items-center gap-3">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 px-5 py-3 rounded-full gold-border hover:bg-secondary transition text-sm"
        >
          <ArrowLeft className="w-4 h-4" /> Edit Details
        </button>
        <p className="ml-auto text-xs text-muted-foreground">
          Select a date above, then choose a time slot to complete booking
        </p>
      </div>
    </div>
  );
}

// ─── Step 3: Confirmed (fires from bookingSuccessful event) ─────────
function ConfirmedStep({ form, bookedData }) {
  const firstName = form.fullName.trim().split(" ")[0] || "friend";

  const startTime = bookedData?.startTime
    ? new Date(bookedData.startTime).toLocaleString("en-US", {
        weekday: "long", month: "long", day: "numeric",
        hour: "numeric", minute: "2-digit", hour12: true, timeZoneName: "short",
      })
    : null;

  return (
    <div className="max-w-2xl mx-auto text-center">
      <motion.div
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="relative inline-flex items-center justify-center w-24 h-24 rounded-full"
        style={{ background: "radial-gradient(circle, color-mix(in oklab, var(--gold) 40%, transparent), transparent 70%)" }}
      >
        <CheckCircle2 className="w-14 h-14 text-gold" />
      </motion.div>

      <h2 className="mt-8 text-4xl md:text-5xl bg-gradient-gold">Your Session is Confirmed</h2>
      <p className="mt-4 text-muted-foreground max-w-md mx-auto">
        Thank you, {firstName}. Your private consultation is booked and a
        calendar invite with the meeting link is on its way to your inbox.
      </p>

      <div className="mt-10 glass-card rounded-3xl p-8 shadow-elegant text-left">
        {startTime && <SummaryRow label="Time" value={startTime} />}
        <SummaryRow label="Consultation" value={form.consultationType} />
        <SummaryRow label="Language" value={form.language} />
        <SummaryRow label="Confirmation sent to" value={form.email} last />
      </div>

      <div className="mt-8 inline-flex items-center gap-2 text-sm text-muted-foreground">
        <Mail className="w-4 h-4 text-gold" />
        Check your inbox for the Cal.com confirmation &amp; meeting link.
      </div>

      <div className="mt-6 flex items-start gap-3 p-4 rounded-2xl bg-secondary/40 border border-border max-w-md mx-auto">
        <ShieldCheck className="w-5 h-5 text-gold shrink-0 mt-0.5" />
        <p className="text-sm text-muted-foreground text-left">
          Your birth details have been noted for session preparation.
        </p>
      </div>
    </div>
  );
}

// ─── Shared UI helpers ─────────────────────────────────────────────
function SectionTitle({ eyebrow, title, subtitle }) {
  return (
    <div className="text-center max-w-2xl mx-auto">
      <span className="text-xs uppercase tracking-[0.35em] text-gold">{eyebrow}</span>
      <h2 className="mt-3 text-4xl md:text-5xl">{title}</h2>
      {subtitle && <p className="mt-4 text-muted-foreground">{subtitle}</p>}
    </div>
  );
}

function Group({ title, children }) {
  return (
    <div className="space-y-5">
      <h4 className="text-xs uppercase tracking-[0.3em] text-gold">{title}</h4>
      {children}
    </div>
  );
}

function Divider() {
  return <div className="my-8 h-px bg-gradient-to-r from-transparent via-border to-transparent" />;
}

function Field({ label, value, onChange, type = "text", required }) {
  return (
    <label className="block group">
      <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground group-focus-within:text-gold transition">
        {label}{required && " *"}
      </span>
      <input
        type={type} value={value} onChange={onChange} required={required}
        className="mt-2 w-full bg-secondary/40 border border-border rounded-xl px-4 py-3.5 text-foreground focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold/40 transition"
      />
    </label>
  );
}

function SelectField({ label, value, onChange, options }) {
  return (
    <label className="block group">
      <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground group-focus-within:text-gold transition">
        {label}
      </span>
      <select
        value={value} onChange={onChange}
        className="mt-2 w-full bg-secondary/40 border border-border rounded-xl px-4 py-3.5 text-foreground focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold/40 transition"
      >
        {options.map((o) => <option key={o} value={o}>{o}</option>)}
      </select>
    </label>
  );
}

function TextAreaField({ label, value, onChange, placeholder }) {
  return (
    <label className="block group">
      <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground group-focus-within:text-gold transition">
        {label}
      </span>
      <textarea
        rows={4} value={value} onChange={onChange} placeholder={placeholder}
        className="mt-2 w-full bg-secondary/40 border border-border rounded-xl px-4 py-3.5 text-foreground focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold/40 transition resize-none"
      />
    </label>
  );
}

function SummaryRow({ label, value, last }) {
  return (
    <div className={`flex items-center justify-between py-4 ${last ? "" : "border-b border-border/60"}`}>
      <span className="text-xs uppercase tracking-[0.25em] text-muted-foreground">{label}</span>
      <span className="text-sm md:text-base text-right">{value || "—"}</span>
    </div>
  );
}

function NavRow({ onBack, onNext, nextDisabled, nextLabel = "Continue" }) {
  return (
    <div className="mt-10 flex items-center gap-3">
      {onBack && (
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 px-5 py-3 rounded-full gold-border hover:bg-secondary transition text-sm"
        >
          <ArrowLeft className="w-4 h-4" /> Back
        </button>
      )}
      <button
        onClick={onNext}
        disabled={nextDisabled}
        className="ml-auto btn-primary disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:shadow-none"
      >
        {nextLabel} <ArrowRight className="w-4 h-4" />
      </button>
    </div>
  );
}
