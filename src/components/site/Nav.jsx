import { Link } from '@tanstack/react-router'
import { siteConfig } from '@/content/site'
import Logo from './Logo'

export default function Nav() {
  return (
    <header className="site-header">
      <nav className="nav-inner container">
        <Link to="/" aria-label="Home">
          <Logo />
        </Link>
        <ul className="nav-links" role="list">
          {siteConfig.nav.map((item) => (
            <li key={item.href}>
              <Link to={item.href} activeProps={{ className: 'active' }}>
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
        <Link to="/book" className="btn btn-primary">
          Book a Session
        </Link>
      </nav>
    </header>
  )
}
