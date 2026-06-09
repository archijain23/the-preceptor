import { Link } from '@tanstack/react-router'
import { siteConfig } from '@/content/site'
import Logo from './Logo'

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <div className="footer-brand">
          <Logo />
          <p className="footer-tagline">{siteConfig.tagline}</p>
        </div>
        <nav className="footer-nav" aria-label="Footer navigation">
          {siteConfig.nav.map((item) => (
            <Link key={item.href} to={item.href}>{item.label}</Link>
          ))}
        </nav>
        <p className="footer-copy">© {new Date().getFullYear()} The Preceptor. All rights reserved.</p>
      </div>
    </footer>
  )
}
