import { Helmet } from "react-helmet-async";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import {
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Sparkles,
  Globe2,
  Clock,
  CalendarDays,
  Video,
  Mail,
  ShieldCheck,
} from "lucide-react";
import Reveal from "@/components/site/Reveal";

// ----- Constants -----
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

const ASTROLOGER_TZ = "Asia/Kolkata";
const ASTROLOGER_SLOTS_IST = [10, 12.5, 15, 17.5, 20, 21.5];
const SESSION_DURATION_MIN = 60;

const COMMON_TZ = [
  "America/New_York",
  "America/Chicago",
  "America/Denver",
  "America/Los_Angeles",
  "Europe/London",
  "Europe/Paris",
  "Europe/Berlin",
  "Asia/Dubai",
  "Asia/Kolkata",
  "Asia/Singapore",
  "Asia/Tokyo",
  "Australia/Sydney",
];

// ----- Helpers -----
function getTzOffsetLabel(tz) {
  try {
    const dtf = new Intl.DateTimeFormat("en-US", {
      timeZone: tz,
      timeZoneName: "shortOffset",
    });
    const parts = dtf.formatToParts(new Date());
    const off = parts.find((p) => p.type === "timeZoneName")?.value ?? "";
    const abbr =
      new Intl.DateTimeFormat("en-US", {
        timeZone: tz,
        timeZoneName: "short",
      })
        .formatToParts(new Date())
        .find((p) => p.type === "timeZoneName")?.value ?? "";
    return { abbr, off };
  } catch {
    return { abbr: "", off: "" };
  }
}

// BUG FIX: IST offset is +5:30 so UTC = IST - 5h30m → subtract 5h and 30m correctly
function istHourToUserDate(baseDate, istHour) {
  const y = baseDate.getFullYear();
  const m = baseDate.getMonth() + 1;
  const d = baseDate.getDate();
  const hh = Math.floor(istHour);
  const mm = Math.round((istHour - hh) * 60);
  // IST = UTC+5:30 → UTC = IST - 5h30m
  const utcMs = Date.UTC(y, m - 1, d, hh - 5, mm - 30);
  return new Date(utcMs);
}

function formatInTz(date, tz, opts) {
  return new Intl.DateTimeFormat("en-US", { timeZone: tz, ...opts }).format(date);
}

// ----- Page -----
export default function BookPage() {
  // 0 intro, 1 details, 2 timezone, 3 slot, 4 summary, 5 confirmed
  const [step, setStep] = useState(0);
  const [form, setForm] = useState(initialForm);
  const [tz, setTz] = useState("UTC");
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);

  // BUG FIX: detect user timezone on mount; fall back gracefully
  useEffect(() => {
    try {
      const detected = Intl.DateTimeFormat().resolvedOptions().timeZone;
      if (detected) setTz(detected);
    } catch {
      setTz("UTC");
    }
  }, []);

  const tzLabel = useMemo(() => getTzOffsetLabel(tz), [tz]);

  const progressSteps = ["Your Details", "Timezone", "Choose Time", "Review"];

  return (
    <>
      <Helmet>
        <title>Book a Session — The Preceptor</title>
        <meta
          name="description"
          content="Reserve a private astrology consultation with The Preceptor. Timezone-aware scheduling, premium experience for international clients."
        />
        <meta property="og:title" content="Book a Session — The Preceptor" />
        <meta
          property="og:description"
          content="Premium astrology consultation booking — birth chart, career, relationships, and more."
        />
      </Helmet>

      <div className="bg-hero starfield min-h-screen relative overflow-hidden">
        {/* Ambient glow */}
        <div
          className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full opacity-30 blur-3xl"
          style={{
            background: "radial-gradient(circle, var(--gold) 0%, transparent 60%)",
          }}
        />

        <section className="relative max-w-6xl mx-auto px-6 lg:px-10 py-16 lg:py-24">
          {/* Progress bar — hidden on intro (0) and confirmed (5) */}
          {step > 0 && step < 5 && (
            <Reveal>
              <div className="max-w-3xl mx-auto mb-12">
                <div className="flex items-center gap-3">
                  {progressSteps.map((s, i) => {
                    const idx = i + 1;
                    const active = step >= idx;
                    return (
                      <div key={s} className="flex-1">
                        <div
                          className={`h-[3px] rounded-full transition-all duration-500 ${
                            active ? "bg-gold shadow-gold" : "bg-muted"
                          }`}
                        />
                        <p
                          className={`mt-2 text-[10px] md:text-xs uppercase tracking-[0.25em] ${
                            active ? "text-gold" : "text-muted-foreground"
                          }`}
                        >
                          {s}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </Reveal>
          )}

          <AnimatePresence mode="wait">
            {step === 0 && (
              <StepWrap key="intro">
                <IntroStep onStart={() => setStep(1)} />
              </StepWrap>
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
              <StepWrap key="tz">
                <TimezoneStep
                  tz={tz}
                  setTz={setTz}
                  tzLabel={tzLabel}
                  onNext={() => setStep(3)}
                  onBack={() => setStep(1)}
                />
              </StepWrap>
            )}
            {step === 3 && (
              <StepWrap key="slot">
                <SlotStep
                  tz={tz}
                  tzLabel={tzLabel}
                  selectedDate={selectedDate}
                  setSelectedDate={setSelectedDate}
                  selectedSlot={selectedSlot}
                  setSelectedSlot={setSelectedSlot}
                  onNext={() => setStep(4)}
                  onBack={() => setStep(2)}
                />
              </StepWrap>
            )}
            {step === 4 && (
              <StepWrap key="summary">
                <SummaryStep
                  form={form}
                  tz={tz}
                  tzLabel={tzLabel}
                  selectedSlot={selectedSlot}
                  onConfirm={() => setStep(5)}
                  onBack={() => setStep(3)}
                />
              </StepWrap>
            )}
            {step === 5 && (
              <StepWrap key="done">
                <ConfirmedStep
                  form={form}
                  tz={tz}
                  tzLabel={tzLabel}
                  selectedSlot={selectedSlot}
                />
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
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

// ----- Step 1: Intro -----
function IntroStep({ onStart }) {
  return (
    <div className="text-center max-w-3xl mx-auto pt-8">
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
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
          { icon: Clock, label: "60 minute session" },
          { icon: Video, label: "Online — private 1:1" },
          { icon: Globe2, label: "Your local timezone" },
        ].map((item, i) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + i * 0.1 }}
            className="glass-card rounded-2xl p-5"
          >
            <item.icon className="w-5 h-5 text-gold mx-auto" />
            <p className="mt-3 text-sm text-foreground/90">{item.label}</p>
          </motion.div>
        ))}
      </div>

      <motion.button
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        onClick={onStart}
        className="mt-12 inline-flex items-center gap-2 px-9 py-4 rounded-full bg-primary text-primary-foreground font-medium shadow-gold hover:scale-[1.03] transition"
      >
        Start Booking <ArrowRight className="w-4 h-4" />
      </motion.button>

      <p className="mt-6 text-xs text-muted-foreground tracking-wide">
        Estimated 3 minutes · Confirmed by email within 12 hours
      </p>
    </div>
  );
}

// ----- Step 2: Details -----
function DetailsStep({ form, setForm, onNext, onBack }) {
  // BUG FIX: update function uses plain string key, no TypeScript keyof
  const update = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const valid =
    form.fullName &&
    form.email &&
    form.country &&
    form.dob &&
    form.tob &&
    form.pob;

  return (
    <div className="max-w-3xl mx-auto">
      <SectionTitle
        eyebrow="Step 1"
        title="Share a few details"
        subtitle="Used solely to prepare your reading. Always private."
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

        <NavRow onBack={onBack} onNext={onNext} nextDisabled={!valid} />
      </div>
    </div>
  );
}

// ----- Step 3: Timezone -----
function TimezoneStep({ tz, setTz, tzLabel, onNext, onBack }) {
  return (
    <div className="max-w-2xl mx-auto">
      <SectionTitle
        eyebrow="Step 2"
        title="Confirm your timezone"
        subtitle="Available session times are automatically shown in your local timezone."
      />

      <div className="mt-10 glass-card rounded-3xl p-8 md:p-10 shadow-elegant text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full gold-border mx-auto">
          <Globe2 className="w-7 h-7 text-gold" />
        </div>

        <p className="mt-6 text-sm uppercase tracking-[0.3em] text-muted-foreground">
          Your Timezone
        </p>
        <h3 className="mt-2 text-3xl md:text-4xl">{tz.replace(/_/g, " ")}</h3>
        <p className="mt-2 text-gold tracking-wide">
          {tzLabel.abbr} {tzLabel.off && `(${tzLabel.off})`}
        </p>

        <div className="mt-8 text-left">
          <label className="text-sm text-muted-foreground">
            Change timezone (optional)
          </label>
          <select
            value={tz}
            onChange={(e) => setTz(e.target.value)}
            className="mt-2 w-full bg-secondary/50 border border-border rounded-xl px-4 py-3 text-foreground focus:border-gold focus:outline-none transition"
          >
            {/* BUG FIX: deduplicate — if detected tz already in COMMON_TZ, avoid duplicate option */}
            {[tz, ...COMMON_TZ.filter((t) => t !== tz)].map((t) => (
              <option key={t} value={t}>
                {t.replace(/_/g, " ")}
              </option>
            ))}
          </select>
        </div>

        <NavRow onBack={onBack} onNext={onNext} />
      </div>
    </div>
  );
}

// ----- Step 4: Slot selection -----
function SlotStep({
  tz,
  tzLabel,
  selectedDate,
  setSelectedDate,
  selectedSlot,
  setSelectedSlot,
  onNext,
  onBack,
}) {
  // 14-day rolling window starting from tomorrow
  const days = useMemo(() => {
    const arr = [];
    const start = new Date();
    start.setHours(0, 0, 0, 0);
    for (let i = 1; i <= 14; i++) {
      const d = new Date(start);
      d.setDate(start.getDate() + i);
      arr.push(d);
    }
    return arr;
  }, []);

  const slots = useMemo(() => {
    if (!selectedDate) return [];
    return ASTROLOGER_SLOTS_IST.map((h) => istHourToUserDate(selectedDate, h));
  }, [selectedDate]);

  // BUG FIX: clear previously chosen slot when user picks a new date
  const handleDateSelect = (d) => {
    setSelectedDate(d);
    setSelectedSlot(null);
  };

  const isUnavailable = (d) => d.getDay() === 0; // no Sundays

  return (
    <div className="max-w-4xl mx-auto">
      <SectionTitle
        eyebrow="Step 3"
        title="Choose a time"
        subtitle="All session times are displayed in your local timezone."
      />

      <div className="mt-6 inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-gold">
        <Globe2 className="w-3.5 h-3.5" /> {tzLabel.abbr || tz}{" "}
        {tzLabel.off && `· ${tzLabel.off}`}
      </div>

      <div className="mt-8 glass-card rounded-3xl p-6 md:p-10 shadow-elegant">
        <div className="flex items-center gap-3 mb-6">
          <CalendarDays className="w-5 h-5 text-gold" />
          <h3 className="text-xl">Select a date</h3>
        </div>

        <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-7 gap-3">
          {days.map((d) => {
            const disabled = isUnavailable(d);
            const isSelected = selectedDate?.toDateString() === d.toDateString();
            return (
              <button
                key={d.toISOString()}
                disabled={disabled}
                onClick={() => handleDateSelect(d)}
                className={`group rounded-2xl p-3 text-center border transition-all ${
                  disabled
                    ? "opacity-30 cursor-not-allowed border-border"
                    : isSelected
                    ? "border-gold bg-gold/10 shadow-gold"
                    : "border-border hover:border-gold/50 hover:bg-secondary/50"
                }`}
              >
                <div className="text-[10px] uppercase tracking-widest text-muted-foreground">
                  {d.toLocaleDateString("en-US", { weekday: "short" })}
                </div>
                <div className={`mt-1 text-2xl ${isSelected ? "text-gold" : ""}`}>
                  {d.getDate()}
                </div>
                <div className="text-[10px] text-muted-foreground">
                  {d.toLocaleDateString("en-US", { month: "short" })}
                </div>
              </button>
            );
          })}
        </div>

        <AnimatePresence mode="wait">
          {selectedDate && (
            <motion.div
              key={selectedDate.toISOString()}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="mt-10"
            >
              <div className="flex items-center gap-3 mb-5">
                <Clock className="w-5 h-5 text-gold" />
                <h3 className="text-xl">
                  Available times —{" "}
                  <span className="text-muted-foreground">
                    {selectedDate.toLocaleDateString("en-US", {
                      weekday: "long",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                </h3>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {slots.map((s) => {
                  const isSel = selectedSlot?.getTime() === s.getTime();
                  const label = formatInTz(s, tz, {
                    hour: "numeric",
                    minute: "2-digit",
                    hour12: true,
                  });
                  return (
                    <button
                      key={s.toISOString()}
                      onClick={() => setSelectedSlot(s)}
                      className={`rounded-xl px-4 py-4 border transition-all ${
                        isSel
                          ? "border-gold bg-gold/10 text-gold shadow-gold"
                          : "border-border hover:border-gold/50 hover:bg-secondary/50"
                      }`}
                    >
                      {label}
                    </button>
                  );
                })}
              </div>
              <p className="mt-4 text-xs text-muted-foreground">
                Times converted from astrologer's timezone (
                {ASTROLOGER_TZ.replace(/_/g, " ")}) to yours automatically.
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        <NavRow
          onBack={onBack}
          onNext={onNext}
          nextDisabled={!selectedSlot}
          nextLabel="Review Booking"
        />
      </div>
    </div>
  );
}

// ----- Step 5: Summary -----
function SummaryStep({ form, tz, tzLabel, selectedSlot, onConfirm, onBack }) {
  // BUG FIX: guard against null selectedSlot before formatting
  const dateStr = selectedSlot
    ? formatInTz(selectedSlot, tz, {
        weekday: "long",
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    : "";
  const timeStr = selectedSlot
    ? formatInTz(selectedSlot, tz, { hour: "numeric", minute: "2-digit", hour12: true })
    : "";

  return (
    <div className="max-w-2xl mx-auto">
      <SectionTitle
        eyebrow="Step 4"
        title="Review your session"
        subtitle="A quiet moment to confirm everything is right."
      />

      <div className="mt-10 glass-card rounded-3xl p-8 md:p-10 shadow-elegant">
        <SummaryRow label="Client" value={form.fullName} />
        <SummaryRow label="Consultation" value={form.consultationType} />
        <SummaryRow label="Language" value={form.language} />
        <SummaryRow label="Date" value={dateStr} />
        <SummaryRow label="Time" value={`${timeStr} · ${tzLabel.abbr || tz}`} />
        <SummaryRow label="Duration" value={`${SESSION_DURATION_MIN} minutes`} />
        <SummaryRow label="Format" value="Private online video session" last />

        <div className="mt-8 flex items-start gap-3 p-4 rounded-2xl bg-secondary/40 border border-border">
          <ShieldCheck className="w-5 h-5 text-gold shrink-0 mt-0.5" />
          <p className="text-sm text-muted-foreground">
            Your details are kept private and used only to prepare your reading.
            A confirmation and meeting link will be sent to{" "}
            <span className="text-foreground">{form.email}</span>.
          </p>
        </div>

        <NavRow onBack={onBack} onNext={onConfirm} nextLabel="Confirm Booking" />
      </div>
    </div>
  );
}

// ----- Step 6: Confirmed -----
function ConfirmedStep({ form, tz, tzLabel, selectedSlot }) {
  const dateStr = selectedSlot
    ? formatInTz(selectedSlot, tz, { weekday: "long", month: "long", day: "numeric" })
    : "";
  const timeStr = selectedSlot
    ? formatInTz(selectedSlot, tz, { hour: "numeric", minute: "2-digit", hour12: true })
    : "";

  // BUG FIX: safe first name — guard empty fullName
  const firstName = form.fullName.trim().split(" ")[0] || "friend";

  return (
    <div className="max-w-2xl mx-auto text-center">
      <motion.div
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="relative inline-flex items-center justify-center w-24 h-24 rounded-full"
        style={{
          background:
            "radial-gradient(circle, color-mix(in oklab, var(--gold) 40%, transparent), transparent 70%)",
        }}
      >
        <CheckCircle2 className="w-14 h-14 text-gold" />
      </motion.div>

      <h2 className="mt-8 text-4xl md:text-5xl bg-gradient-gold">
        Your Session Has Been Reserved
      </h2>
      <p className="mt-4 text-muted-foreground max-w-md mx-auto">
        Thank you, {firstName}. Your private consultation has been gently placed
        on the calendar.
      </p>

      <div className="mt-10 glass-card rounded-3xl p-8 shadow-elegant text-left">
        <SummaryRow label="Date" value={dateStr} />
        <SummaryRow label="Time" value={`${timeStr} · ${tzLabel.abbr || tz}`} />
        <SummaryRow label="Consultation" value={form.consultationType} />
        <SummaryRow label="Sent to" value={form.email} last />
      </div>

      <div className="mt-8 inline-flex items-center gap-2 text-sm text-muted-foreground">
        <Mail className="w-4 h-4 text-gold" />
        A confirmation email and meeting details have been sent to your inbox.
      </div>
    </div>
  );
}

// ----- Shared UI components -----
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
  return (
    <div className="my-8 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
  );
}

function Field({ label, value, onChange, type = "text", required }) {
  return (
    <label className="block group">
      <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground group-focus-within:text-gold transition">
        {label}
        {required && " *"}
      </span>
      <input
        type={type}
        value={value}
        onChange={onChange}
        required={required}
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
        value={value}
        onChange={onChange}
        className="mt-2 w-full bg-secondary/40 border border-border rounded-xl px-4 py-3.5 text-foreground focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold/40 transition"
      >
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
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
        rows={4}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="mt-2 w-full bg-secondary/40 border border-border rounded-xl px-4 py-3.5 text-foreground focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold/40 transition resize-none"
      />
    </label>
  );
}

function SummaryRow({ label, value, last }) {
  return (
    <div
      className={`flex items-center justify-between py-4 ${
        last ? "" : "border-b border-border/60"
      }`}
    >
      <span className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
        {label}
      </span>
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
        className="ml-auto inline-flex items-center gap-2 px-7 py-3 rounded-full bg-primary text-primary-foreground font-medium shadow-gold hover:scale-[1.02] transition disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100"
      >
        {nextLabel} <ArrowRight className="w-4 h-4" />
      </button>
    </div>
  );
}
