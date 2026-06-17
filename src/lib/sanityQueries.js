/**
 * GROQ queries for every CMS-backed section.
 *
 * Keep all queries in one place so they are easy to find,
 * update, and preview in Sanity Vision.
 */

/** All service/pricing cards — ordered by the `order` field */
export const SERVICES_QUERY = `
  *[_type == "service"] | order(order asc) {
    _id,
    title,
    slug,
    tagline,
    description,
    price,
    originalPrice,
    currency,
    sessionDuration,
    deliveryFormat,
    isPopular,
    isSoldOut,
    features,
    order
  }
`;

/** All published testimonials — newest first */
export const TESTIMONIALS_QUERY = `
  *[_type == "testimonial"] | order(_createdAt desc) {
    _id,
    name,
    location,
    rating,
    review,
    service,
    avatarInitial
  }
`;

/** All FAQ items — grouped by category, ordered by order field */
export const FAQ_QUERY = `
  *[_type == "faq"] | order(order asc) {
    _id,
    question,
    answer,
    category,
    order
  }
`;

/** Global site settings — single document */
export const SITE_SETTINGS_QUERY = `
  *[_type == "siteSettings"][0] {
    siteName,
    tagline,
    email,
    phone,
    instagramUrl,
    redditUrl,
    calcomUsername,
    calcomEventType,
    announcementBanner
  }
`;
