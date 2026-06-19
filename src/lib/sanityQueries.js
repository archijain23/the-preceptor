import { groq } from '@sanity/client';

export const TESTIMONIALS_QUERY = groq`
  *[_type == "testimonial"] | order(coalesce(order, 9999) asc, _createdAt asc) {
    _id,
    name,
    // prefer canonical field, fall back to legacy alias
    "location": coalesce(location, country),
    // prefer canonical field, fall back to legacy alias
    "review":   coalesce(review, text),
    rating,
    service,
    avatarInitial,
    featured,
    screenshotImage {
      asset->{ url },
      alt
    }
  }
`;

export const SERVICES_QUERY = groq`
  *[_type == "service"] | order(order asc) {
    _id,
    title,
    slug,
    tagline,
    description,
    icon,
    price,
    originalPrice,
    sessionDuration,
    deliveryFormat,
    isPopular,
    isSoldOut,
    features,
    order
  }
`;

export const FAQ_QUERY = groq`
  *[_type == "faq"] | order(order asc) {
    _id,
    question,
    answer,
    category,
    order
  }
`;

export const SITE_SETTINGS_QUERY = groq`
  *[_type == "siteSettings"][0]
`;
