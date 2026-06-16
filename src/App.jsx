import React from "react";
import { Routes, Route } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Nav from "./components/site/Nav";
import Footer from "./components/site/Footer";
import TorchCursor from "./components/site/TorchCursor";
import Home from "./routes/index";
import About from "./routes/about";
import Book from "./routes/book";
import Contact from "./routes/contact";
import Services from "./routes/services";
import Testimonials from "./routes/testimonials";
import Shop from "./routes/shop";
import QnA from "./routes/qna";
import NotFound from "./routes/not-found";
import { SITE } from "./content/seo";

/**
 * Global JSON-LD Organisation schema — injected once at the app root.
 * Google uses this to understand the business entity behind the site.
 *
 * PRIVACY: Owner name, phone, and India-origin are intentionally omitted.
 * The brand is presented as a global English-language service.
 */
const orgSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "name": "The Preceptor",
  "alternateName": "The Preceptor Global",
  "url": SITE.domain,
  "logo": `${SITE.domain}/favicon.svg`,
  "image": SITE.ogImage,
  "description": "Premium Vedic astrology consultations and spiritual guidance for high-intention seekers worldwide. Birth chart readings, career guidance, relationship synastry, tarot and Kundli analysis.",
  "slogan": "For those who seek clarity.",
  "email": SITE.email,
  "priceRange": "$$",
  "areaServed": "Worldwide",
  "availableLanguage": [{ "@type": "Language", "name": "English" }],
  "serviceType": [
    "Vedic Astrology Reading",
    "Birth Chart Reading",
    "Relationship Synastry",
    "Career Guidance Astrology",
    "Tarot Reading",
    "Kundli Analysis",
    "Spiritual Consultation"
  ],
  "sameAs": [
    SITE.social.instagram,
    SITE.social.reddit
  ],
  "hasMap": "",
  "currenciesAccepted": "USD, INR, GBP, EUR",
  "paymentAccepted": "Online payment",
};

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* ── Global JSON-LD Organisation Schema ─────────────────
          Injected once here so it appears on every page.
          Page-level <SEO> components handle per-route meta tags.
      ──────────────────────────────────────────────────────── */}
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(orgSchema)}
        </script>
      </Helmet>

      {/* Cosmic background layers */}
      <div id="cosmic-bg" aria-hidden="true" />
      <div id="cosmic-grain" aria-hidden="true" />

      {/* Golden torch cursor — fixed overlay, pointer-events-none */}
      <TorchCursor />

      <Nav />
      <main className="flex-1 pt-20">
        <Routes>
          <Route path="/"             element={<Home />} />
          <Route path="/about"        element={<About />} />
          <Route path="/book"         element={<Book />} />
          <Route path="/contact"      element={<Contact />} />
          <Route path="/services"     element={<Services />} />
          <Route path="/testimonials" element={<Testimonials />} />
          <Route path="/shop"         element={<Shop />} />
          <Route path="/qna"          element={<QnA />} />
          <Route path="*"             element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
