// groq is a standalone tagged-template helper — NOT exported from @sanity/client
import groq from 'groq';

export const TESTIMONIALS_QUERY = groq`
  *[_type == "testimonial"] | order(coalesce(order, 9999) asc, _createdAt asc) {
    _id,
    name,
    "location": coalesce(location, country),
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
