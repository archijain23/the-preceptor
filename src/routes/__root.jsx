import React, { useEffect, useState } from 'react';
import { Outlet, Link, useRouter } from '@tanstack/react-router';

const NAV_LINKS = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/services', label: 'Services' },
  { to: '/testimonials', label: 'Testimonials' },
  { to: '/shop', label: 'Shop' },
  { to: '/contact', label: 'Contact' },
];

export function RootLayout() {
  const [theme, setTheme] = useState(() =>
    window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  );
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme(t => (t === 'dark' ? 'light' : 'dark'));

  return (
    <>
      <header className="site-header">
        <div className="header-inner">
          <Link to="/" className="logo-link" aria-label="The Preceptor — Home">
            <svg width="36" height="36" viewBox="0 0 36 36" fill="none" aria-hidden="true">
              <circle cx="18" cy="18" r="16" stroke="currentColor" strokeWidth="1.2" />
              <circle cx="18" cy="18" r="6" fill="currentColor" opacity="0.15" />
              <circle cx="18" cy="18" r="2.5" fill="currentColor" />
              <line x1="18" y1="2" x2="18" y2="10" stroke="currentColor" strokeWidth="1" />
              <line x1="18" y1="26" x2="18" y2="34" stroke="currentColor" strokeWidth="1" />
              <line x1="2" y1="18" x2="10" y2="18" stroke="currentColor" strokeWidth="1" />
              <line x1="26" y1="18" x2="34" y2="18" stroke="currentColor" strokeWidth="1" />
              <line x1="6.1" y1="6.1" x2="11.8" y2="11.8" stroke="currentColor" strokeWidth="0.8" />
              <line x1="24.2" y1="24.2" x2="29.9" y2="29.9" stroke="currentColor" strokeWidth="0.8" />
              <line x1="29.9" y1="6.1" x2="24.2" y2="11.8" stroke="currentColor" strokeWidth="0.8" />
              <line x1="11.8" y1="24.2" x2="6.1" y2="29.9" stroke="currentColor" strokeWidth="0.8" />
            </svg>
            <span className="logo-wordmark">The Preceptor</span>
          </Link>

          <nav className={`main-nav${menuOpen ? ' open' : ''}`} aria-label="Main navigation">
            {NAV_LINKS.map(({ to, label }) => (
              <Link key={to} to={to} className="nav-link" onClick={() => setMenuOpen(false)}>
                {label}
              </Link>
            ))}
            <Link to="/book" className="nav-cta" onClick={() => setMenuOpen(false)}>
              Book a Session
            </Link>
          </nav>

          <div className="header-actions">
            <button
              className="theme-toggle"
              onClick={toggleTheme}
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            >
              {theme === 'dark' ? (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="5" />
                  <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
                </svg>
              ) : (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                </svg>
              )}
            </button>
            <button
              className="menu-toggle"
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen(o => !o)}
            >
              <span /><span /><span />
            </button>
          </div>
        </div>
      </header>

      <main id="main-content">
        <Outlet />
      </main>

      <footer className="site-footer">
        <div className="footer-inner">
          <p className="footer-copy">
            &copy; {new Date().getFullYear()} The Preceptor &mdash; All rights reserved.
          </p>
          <nav className="footer-nav" aria-label="Footer navigation">
            {NAV_LINKS.map(({ to, label }) => (
              <Link key={to} to={to} className="footer-link">{label}</Link>
            ))}
          </nav>
        </div>
      </footer>
    </>
  );
}
