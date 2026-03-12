import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import useStore from '../../store/useStore';
import SectionTag from '../shared/SectionTag';
import Button from '../shared/Button';

const STATS = [
  { number: '50', sup: '+', label: 'Projects Done' },
  { number: '7',  sup: '+', label: 'Years Experience' },
  { number: '100', sup: '%', label: 'Satisfaction' },
];

const HEADLINE = ['We', 'Build', 'Your', 'Visions', 'With', 'High', 'Perfection'];
const GOLD_WORDS = new Set(['Visions', 'Perfection']);
const ITALIC_WORDS = new Set(['Visions', 'Perfection']);

function HeroSection() {
  const currentSection = useStore((s) => s.currentSection);
  const visible = currentSection === 0;

  return (
    <AnimatePresence>
      {visible && (
        <motion.section
          key="hero"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.65, 0, 0.35, 1] }}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 20,
            pointerEvents: 'all',
          }}
        >
          {/* Bottom-left content */}
          <div style={{
            position: 'absolute',
            left: '7vw',
            bottom: '10vh',
            maxWidth: 680,
          }}>
            <SectionTag>Lagos, Nigeria · Est. 2018</SectionTag>

            <h1 style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: 'clamp(56px, 8vw, 110px)',
              fontWeight: 400,
              lineHeight: 1.05,
              color: '#F0EAE0',
              margin: '1rem 0 1.5rem',
              letterSpacing: '-0.01em',
            }}>
              {HEADLINE.map((word, i) => (
                <motion.span
                  key={word + i}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.07, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                  style={{
                    display: 'inline-block',
                    marginRight: '0.22em',
                    color: GOLD_WORDS.has(word) ? '#D4922A' : 'inherit',
                    fontStyle: ITALIC_WORDS.has(word) ? 'italic' : 'normal',
                  }}
                >
                  {word}
                </motion.span>
              ))}
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55, duration: 0.6 }}
              style={{
                fontFamily: "'Montserrat', sans-serif",
                fontSize: '13px',
                lineHeight: 1.8,
                color: 'rgba(240,234,224,0.65)',
                maxWidth: 440,
                marginBottom: '2.5rem',
                letterSpacing: '0.03em',
              }}
            >
              More than just builders, we are creators of exceptional spaces and
              architects of dreams, delivering residential and commercial projects with
              precision, innovation, and attention to detail.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.65, duration: 0.6 }}
              style={{ display: 'flex', gap: '1.5rem', alignItems: 'center', flexWrap: 'wrap' }}
            >
              <Button variant="primary" to="/quote">Get Free Quote →</Button>
              <Button variant="ghost"   to="/projects">View Projects</Button>
            </motion.div>
          </div>

          {/* Stats — bottom right */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7, duration: 0.7 }}
            style={{
              position: 'absolute',
              right: '7vw',
              bottom: '10vh',
              display: 'flex',
              flexDirection: 'column',
              gap: '1.8rem',
              textAlign: 'right',
            }}
          >
            {STATS.map((s) => (
              <div key={s.label}>
                <div style={{
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  fontSize: '44px',
                  fontWeight: 400,
                  color: '#F0EAE0',
                  lineHeight: 1,
                }}>
                  {s.number}
                  <sup style={{ fontSize: '0.45em', color: '#D4922A', verticalAlign: 'super' }}>{s.sup}</sup>
                </div>
                <div style={{
                  fontFamily: "'Montserrat', sans-serif",
                  fontSize: '9px',
                  letterSpacing: '0.25em',
                  textTransform: 'uppercase',
                  color: 'rgba(240,234,224,0.5)',
                  marginTop: '4px',
                }}>
                  {s.label}
                </div>
              </div>
            ))}
          </motion.div>
        </motion.section>
      )}
    </AnimatePresence>
  );
}

export default HeroSection;
