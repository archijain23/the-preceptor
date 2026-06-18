/**
 * GROQ queries for every CMS-backed section.
 * Keep all queries here so they are easy to find, update, and preview in Sanity Vision.
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

/** All FAQ items — ordered by order field */
export const FAQ_QUERY = `
  *[_type == "faq"] | order(order asc) {
    _id,
    question,
    answer,
    category,
    order
  }
`;

/** Global site settings — single document, full home page fields */
export const SITE_SETTINGS_QUERY = `
  *[_type == "siteSettings"][0] {
    // General
    siteName,
    tagline,
    email,
    phone,
    instagramUrl,
    redditUrl,
    calcomUsername,
    calcomEventType,
    announcementBanner,

    // Hero
    heroBadgeText,
    heroHeading1,
    heroHeading2Gold,
    heroBodyCopy,
    heroCta1Label,
    heroCta2Label,

    // About
    aboutHeading1,
    aboutHeading2Gold,
    aboutParagraph1,
    aboutParagraph2,

    // Stats (site-wide — used in Hero, About & Achievements)
    stat1 { value, label },
    stat2 { value, label },
    stat3 { value, label },
    stat4 { value, label },

    // Services section header
    servicesSectionLabel,
    servicesSectionHeading,
    servicesSectionSubtitle,

    // Achievements section header
    achievementsSectionLabel,
    achievementsSectionHeading,

    // Testimonials section header
    testimonialsSectionLabel,
    testimonialsSectionHeading,

    // Experience section
    experienceSectionLabel,
    experienceSectionHeading,
    experienceItems[] { title, desc, icon },

    // FAQ section header
    faqSectionLabel,
    faqSectionHeading,

    // Offer timer
    offerDeadline
  }
`;
