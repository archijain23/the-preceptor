// CMS-ready content configuration.
// Replace these constants with calls to your CMS (Sanity, Contentful, etc.) when ready.

export const siteConfig = {
  name: 'The Preceptor',
  tagline: 'Modern guidance, written in the stars.',
  description:
    'Cinematic, deeply personal astrology consultations for high-intention seekers — clarity in love, career, and life\'s defining chapters.',
  email: 'hello@thepreceptor.com',
  phone: '+1 (212) 555-0117',
  social: {
    instagram: 'https://instagram.com/thepreceptor',
    youtube: 'https://youtube.com/@thepreceptor',
    linkedin: 'https://linkedin.com/company/thepreceptor',
  },
};

export const navLinks = [
  { to: '/', label: 'Home', hash: undefined },
  { to: '/about', label: 'About', hash: undefined },
  { to: null, label: 'Services', hash: '#services' },
  { to: '/testimonials', label: 'Testimonials', hash: undefined },
  { to: '/shop', label: 'Shop', hash: undefined },
  { to: '/contact', label: 'Contact', hash: undefined },
];

export const footerLinks = {
  explore: [
    { to: '/', label: 'Home' },
    { to: '/about', label: 'About' },
    { to: '/testimonials', label: 'Testimonials' },
    { to: '/book', label: 'Book a Session' },
    { to: '/shop', label: 'Shop' },
  ],
  legal: [
    { to: '/privacy', label: 'Privacy Policy' },
    { to: '/terms', label: 'Terms & Conditions' },
    { to: '/contact', label: 'Contact' },
  ],
};
