/**
 * All GROQ queries used by the frontend.
 * Keep them here so they're easy to find and test in Sanity Vision.
 */

/** All services ordered by display order */
export const SERVICES_QUERY = `
  *[_type == "service"] | order(order asc) {
    "slug": slug.current,
    title,
    badge,
    icon,
    "desc": description,
    duration,
    price,
    originalPrice,
    showOnHome,
    order
  }
`;

/** Only home-page services (showOnHome: true), first 4 */
export const HOME_SERVICES_QUERY = `
  *[_type == "service" && showOnHome == true] | order(order asc) [0...4] {
    "slug": slug.current,
    title,
    badge,
    icon,
    "desc": description,
    duration,
    price,
    originalPrice
  }
`;

/** All testimonials ordered */
export const TESTIMONIALS_QUERY = `
  *[_type == "testimonial"] | order(order asc) {
    name,
    country,
    text,
    rating,
    featured
  }
`;

/** All FAQs ordered */
export const FAQS_QUERY = `
  *[_type == "faq"] | order(order asc) {
    question,
    answer
  }
`;

/** Achievements ordered */
export const ACHIEVEMENTS_QUERY = `
  *[_type == "achievement"] | order(order asc) {
    value,
    label
  }
`;

/** Singleton site settings */
export const SITE_SETTINGS_QUERY = `
  *[_type == "siteSettings"][0] {
    siteName,
    tagline,
    description,
    email,
    phone,
    whatsapp,
    instagram,
    youtube,
    twitter,
    facebook
  }
`;

/** Singleton offer config */
export const OFFER_CONFIG_QUERY = `
  *[_type == "offerConfig"][0] {
    offerEndDate,
    currentPrice,
    originalPrice,
    sessionDuration
  }
`;
