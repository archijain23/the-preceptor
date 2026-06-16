/**
 * src/content/seo.js
 * ─────────────────────────────────────────────────────────────
 * Central SEO configuration for The Preceptor.
 * All public-facing metadata lives here — one place to update.
 *
 * PRIVATE DATA NOTE:
 *   Owner identity, phone number, and India-origin details are
 *   intentionally excluded. The brand is presented as a global,
 *   location-neutral premium service.
 * ─────────────────────────────────────────────────────────────
 */

export const SITE = {
  name:        "The Preceptor",
  handle:      "thepreceptorglobal",
  tagline:     "For those who seek clarity.",
  description: "Modern guidance, written in the stars.",
  domain:      "https://thepreceptorglobal.com",
  email:       "thepreceptor1111@gmail.com",

  /** Absolute URL of the 1200×630 OG social card image.
   *  Replace with a real hosted image once designed.
   *  Until then this falls back gracefully (no broken tag). */
  ogImage: "https://thepreceptorglobal.com/og-image.jpg",

  social: {
    instagram: "https://www.instagram.com/thepreceptor1111",
    reddit:    "https://www.reddit.com/user/ThePreceptor1111/",
  },

  /** twitter:site handle — used in Twitter card meta */
  twitterHandle: "@thepreceptorglobal",
};

/**
 * Per-page SEO metadata.
 * title     — browser tab + og:title + twitter:title
 * description — meta description + og:description + twitter:description
 *              Keep between 120–160 characters.
 * canonical — absolute canonical URL (no trailing slash except homepage)
 * keywords  — comma-separated; used for reference / future schema only;
 *              Google ignores the keywords meta tag but it's kept for
 *              internal documentation purposes.
 */
export const PAGE_SEO = {
  home: {
    title:       "The Preceptor — Vedic Astrology Readings & Spiritual Consultations Online",
    description: "Book a private Vedic astrology consultation online. Birth chart readings, career guidance, relationship insights & spiritual clarity — trusted by 2,500+ clients across 18+ countries.",
    canonical:   `${SITE.domain}/`,
    keywords:    "vedic astrology reading online USA, birth chart reading, astrology consultation online, personalized astrology guidance, the preceptor, the preceptor global, astrologer in USA",
  },

  about: {
    title:       "About — The Preceptor | Premium Astrology & Spiritual Guidance",
    description: "Meet The Preceptor — a modern astrologer blending classical Vedic and Western traditions to deliver cinematic, deeply personal readings for high-intention seekers worldwide.",
    canonical:   `${SITE.domain}/about`,
    keywords:    "the preceptor global, vedic astrologer online, spiritual guidance astrology, professional astrologer, best vedic astrologer USA",
  },

  book: {
    title:       "Book a Session — The Preceptor | Astrology Consultation Online",
    description: "Reserve your private astrology session with The Preceptor. Vedic birth chart readings, relationship synastry, career guidance & spiritual consultations. Available worldwide.",
    canonical:   `${SITE.domain}/book`,
    keywords:    "book astrology consultation online, paid astrology reading USA, professional astrologer near me online, astrology session booking, vedic astrology reading online",
  },

  services: {
    title:       "Services — The Preceptor | Birth Chart, Synastry & Spiritual Readings",
    description: "Explore all astrology services: Vedic birth chart readings, relationship synastry, career guidance, tarot readings, Kundli analysis & spiritual consultations — all online.",
    canonical:   `${SITE.domain}/services`,
    keywords:    "birth chart reading astrologer, synastry astrology, kundli analysis online, tarot reading online, spiritual consultation astrology, deep astrology reading session",
  },

  testimonials: {
    title:       "Client Reviews — The Preceptor | Trusted Astrology Consultations",
    description: "Read what 2,500+ clients across 18+ countries say about their astrology sessions with The Preceptor. Accurate, cinematic, and life-changing readings.",
    canonical:   `${SITE.domain}/testimonials`,
    keywords:    "the preceptor reviews, astrology consultation reviews, best vedic astrologer reviews, accurate astrology reading online",
  },

  contact: {
    title:       "Contact — The Preceptor | Get in Touch",
    description: "Reach out to The Preceptor for questions, collaborations, or to learn more about available astrology consultations and spiritual guidance sessions.",
    canonical:   `${SITE.domain}/contact`,
    keywords:    "contact the preceptor, astrology consultation enquiry, book astrologer online",
  },

  qna: {
    title:       "Q&A — The Preceptor | Astrology Questions Answered",
    description: "Frequently asked questions about Vedic astrology, birth chart readings, session formats, and what to expect from a consultation with The Preceptor.",
    canonical:   `${SITE.domain}/qna`,
    keywords:    "astrology faq, vedic astrology questions, birth chart reading faq, astrology consultation questions",
  },

  shop: {
    title:       "Shop — The Preceptor | Astrology Resources (Coming Soon)",
    description: "The Preceptor shop is coming soon — curated astrology resources, guides, and tools for high-intention seekers. Join the waitlist for early access.",
    canonical:   `${SITE.domain}/shop`,
    keywords:    "astrology shop, astrology resources online, the preceptor shop",
  },

  notFound: {
    title:       "Page Not Found — The Preceptor",
    description: "The page you're looking for doesn't exist. Return to The Preceptor homepage for premium astrology consultations and spiritual guidance.",
    canonical:   `${SITE.domain}/`,
    keywords:    "",
  },
};
