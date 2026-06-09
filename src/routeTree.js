/**
 * Static route tree — no code generation needed.
 * Add routes here manually as you create new pages.
 */
import { createRootRoute, createRoute } from '@tanstack/react-router';
import { RootLayout } from './routes/__root.jsx';
import HomePage from './routes/index.jsx';
import AboutPage from './routes/about.jsx';
import ServicesPage from './routes/services.jsx';
import BookPage from './routes/book.jsx';
import ContactPage from './routes/contact.jsx';
import ShopPage from './routes/shop.jsx';
import TestimonialsPage from './routes/testimonials.jsx';

const rootRoute = createRootRoute({ component: RootLayout });

const indexRoute      = createRoute({ getParentRoute: () => rootRoute, path: '/',             component: HomePage });
const aboutRoute      = createRoute({ getParentRoute: () => rootRoute, path: '/about',        component: AboutPage });
const servicesRoute   = createRoute({ getParentRoute: () => rootRoute, path: '/services',     component: ServicesPage });
const bookRoute       = createRoute({ getParentRoute: () => rootRoute, path: '/book',         component: BookPage });
const contactRoute    = createRoute({ getParentRoute: () => rootRoute, path: '/contact',      component: ContactPage });
const shopRoute       = createRoute({ getParentRoute: () => rootRoute, path: '/shop',         component: ShopPage });
const testimonialsRoute = createRoute({ getParentRoute: () => rootRoute, path: '/testimonials', component: TestimonialsPage });

export const routeTree = rootRoute.addChildren([
  indexRoute,
  aboutRoute,
  servicesRoute,
  bookRoute,
  contactRoute,
  shopRoute,
  testimonialsRoute,
]);
