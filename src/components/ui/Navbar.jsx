import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import BrandLogo from '../shared/BrandLogo';

const LINKS = [
  { label: 'Home',     path: '/' },
  { label: 'About',    path: '/about' },
  { label: 'Services', path: '/services' },
  { label: 'Projects', path: '/projects' },
  { label: 'Contact',  path: '/contact' },
  { label: 'Career',   path: '/career' },
];

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => { setMenuOpen(false); }, [location.pathname]);

  const isActive = (path) =>
    path === '/' ? location.pathname === '/' : location.pathname.startsWith(path);

  const linkStyle = (path) => ({
    fontFamily: "'Montserrat', sans-serif",
    fontSize: '10px',
    letterSpacing: '0.3em',
    textTransform: 'uppercase',
    color: isActive(path) ? '#D4922A' : '#F0EAE0',
    textDecoration: 'none',
    borderBottom: isActive(path) ? '1px solid #D4922A' : '1px solid transparent',
    paddingBottom: '2px',
    transition: 'color 0.3s, border-color 0.3s',
  });

  return (
    <>
      <nav
        style={{
          position: 'fixed',
          top: 0, left: 0, right: 0,
          zIndex: 100,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: scrolled ? '16px 7vw' : '32px 7vw',
          background: scrolled ? 'rgba(5,5,7,0.92)' : 'transparent',
          backdropFilter: scrolled ? 'blur(16px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(16px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(212,146,42,0.12)' : '1px solid transparent',
          transition: 'padding 0.4s ease, background 0.4s ease, border-color 0.4s ease',
        }}
      >
        {/* Logo */}
        <Link to="/" style={{ textDecoration: 'none', display: 'block' }} aria-label="Casafina Construction home">
          <BrandLogo
            width="clamp(140px, 15vw, 190px)"
            style={{ filter: 'drop-shadow(0 0 12px rgba(0, 0, 0, 0.18))' }}
          />
        </Link>

        {/* Desktop links */}
        <div className="cf-nav-desktop" style={{
          display: 'flex',
          alignItems: 'center',
          gap: '2.5rem',
        }}>
          {LINKS.map((link) => (
            <Link key={link.path} to={link.path} style={linkStyle(link.path)}>
              {link.label}
            </Link>
          ))}
          <Link
            to="/quote"
            style={{
              fontFamily: "'Montserrat', sans-serif",
              fontSize: '10px',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: '#050507',
              background: '#D4922A',
              padding: '10px 20px',
              textDecoration: 'none',
              transition: 'background 0.3s',
            }}
          >
            Free Quote
          </Link>
        </div>

        {/* Hamburger */}
        <button
          className="cf-nav-hamburger"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Toggle menu"
          style={{
            display: 'none',
            flexDirection: 'column',
            gap: '5px',
            background: 'none',
            border: 'none',
            padding: '4px',
          }}
        >
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              style={{
                display: 'block',
                width: '24px',
                height: '1.5px',
                background: '#F0EAE0',
                transformOrigin: 'center',
                transition: 'transform 0.3s ease, opacity 0.3s ease',
                transform:
                  menuOpen && i === 0 ? 'rotate(45deg) translateY(6.5px)' :
                  menuOpen && i === 2 ? 'rotate(-45deg) translateY(-6.5px)' :
                  'none',
                opacity: menuOpen && i === 1 ? 0 : 1,
              }}
            />
          ))}
        </button>
      </nav>

      {/* Mobile full-screen menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.4, ease: [0.65, 0, 0.35, 1] }}
            style={{
              position: 'fixed',
              inset: 0,
              background: '#050507',
              zIndex: 99,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '2.5rem',
            }}
          >
            {LINKS.map((link, i) => (
              <motion.div
                key={link.path}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07, ease: [0.16, 1, 0.3, 1] }}
              >
                <Link
                  to={link.path}
                  style={{
                    fontFamily: "'Cormorant Garamond', Georgia, serif",
                    fontSize: '2.5rem',
                    letterSpacing: '0.08em',
                    color: isActive(link.path) ? '#D4922A' : '#F0EAE0',
                    textDecoration: 'none',
                  }}
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}
            <Link
              to="/quote"
              style={{
                fontFamily: "'Montserrat', sans-serif",
                fontSize: '11px',
                letterSpacing: '0.25em',
                textTransform: 'uppercase',
                color: '#050507',
                background: '#D4922A',
                padding: '14px 32px',
                textDecoration: 'none',
                marginTop: '1rem',
              }}
            >
              Free Quote
            </Link>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 900px) {
          .cf-nav-desktop  { display: none !important; }
          .cf-nav-hamburger { display: flex !important; }
        }
      `}</style>
    </>
  );
}

export default Navbar;
