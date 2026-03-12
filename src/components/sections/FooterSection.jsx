import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import useStore from '../../store/useStore';
import BrandLogo from '../shared/BrandLogo';

const COMPANY_LINKS = [
  { label: 'About Us',         path: '/about' },
  { label: 'Services',         path: '/services' },
  { label: 'Projects',         path: '/projects' },
  { label: 'Quality Assurance',path: '/quality-assurance' },
  { label: 'Career',           path: '/career' },
];

const SERVICE_LINKS = [
  { label: 'Project Conceptualization', path: '/services' },
  { label: 'Construction Management',   path: '/services' },
  { label: 'Procurement of Materials',  path: '/services' },
  { label: 'Engineering Design',        path: '/services' },
  { label: 'Free Quote',                path: '/quote' },
];

const linkStyle = {
  fontFamily: "'Montserrat', sans-serif",
  fontSize: '11px',
  letterSpacing: '0.1em',
  color: 'rgba(240,234,224,0.5)',
  textDecoration: 'none',
  lineHeight: 2.2,
  display: 'block',
  transition: 'color 0.3s',
};

const headStyle = {
  fontFamily: "'Cormorant Garamond', Georgia, serif",
  fontSize: '16px',
  color: '#F0EAE0',
  marginBottom: '1rem',
  letterSpacing: '0.05em',
};

function FooterSection() {
  const currentSection = useStore((s) => s.currentSection);
  const visible = currentSection === 5;

  return (
    <AnimatePresence>
      {visible && (
        <motion.footer
          key="footer"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.65, 0, 0.35, 1] }}
          style={{
            position: 'fixed',
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 20,
            pointerEvents: 'all',
            background: 'rgba(5,5,7,0.96)',
            borderTop: '1px solid rgba(212,146,42,0.12)',
          }}
        >
          {/* Main grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1.5fr 1fr 1fr 1.2fr',
            gap: '3rem',
            padding: '3rem 7vw 2rem',
          }}>
            {/* Brand */}
            <div>
              <BrandLogo width="180px" style={{ marginBottom: '1rem' }} />
              <p style={{
                fontFamily: "'Montserrat', sans-serif",
                fontSize: '11px',
                lineHeight: 1.8,
                color: 'rgba(240,234,224,0.45)',
                maxWidth: 240,
              }}>
                Building landmark spaces across Lagos and beyond since 2018.
              </p>
            </div>

            {/* Company */}
            <div>
              <div style={headStyle}>Company</div>
              {COMPANY_LINKS.map((l) => (
                <Link key={l.path + l.label} to={l.path} style={linkStyle}>{l.label}</Link>
              ))}
            </div>

            {/* Services */}
            <div>
              <div style={headStyle}>Services</div>
              {SERVICE_LINKS.map((l) => (
                <Link key={l.label} to={l.path} style={linkStyle}>{l.label}</Link>
              ))}
            </div>

            {/* Contact */}
            <div>
              <div style={headStyle}>Contact</div>
              {[
                '+234 908 070 2006',
                'info@casafinaconstruction.com',
                'Lagos, Nigeria',
              ].map((line) => (
                <div key={line} style={{
                  fontFamily: "'Montserrat', sans-serif",
                  fontSize: '11px',
                  color: 'rgba(240,234,224,0.5)',
                  lineHeight: 2.2,
                }}>
                  {line}
                </div>
              ))}
            </div>
          </div>

          {/* Bottom bar */}
          <div style={{
            borderTop: '1px solid rgba(240,234,224,0.06)',
            padding: '1rem 7vw',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
            <span style={{
              fontFamily: "'Montserrat', sans-serif",
              fontSize: '10px',
              letterSpacing: '0.1em',
              color: 'rgba(240,234,224,0.3)',
            }}>
              © {new Date().getFullYear()} Casafina Construction Co. Ltd. All rights reserved.
            </span>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              style={{
                fontFamily: "'Montserrat', sans-serif",
                fontSize: '10px',
                letterSpacing: '0.25em',
                textTransform: 'uppercase',
                color: '#D4922A',
                background: 'none',
                border: 'none',
                cursor: 'none',
              }}
            >
              Back to Top ↑
            </button>
          </div>
        </motion.footer>
      )}
    </AnimatePresence>
  );
}

export default FooterSection;
