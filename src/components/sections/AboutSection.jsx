import { motion, AnimatePresence } from 'framer-motion';
import useStore from '../../store/useStore';
import SectionTag from '../shared/SectionTag';

function AboutSection() {
  const currentSection = useStore((s) => s.currentSection);
  const visible = currentSection === 1;

  return (
    <AnimatePresence>
      {visible && (
        <motion.section
          key="about"
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
          <div style={{
            position: 'absolute',
            left: '7vw',
            bottom: '10vh',
            maxWidth: 600,
          }}>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05, duration: 0.6 }}
            >
              <SectionTag>Who We Are</SectionTag>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: 'clamp(36px, 4.5vw, 64px)',
                fontWeight: 400,
                color: '#F0EAE0',
                margin: '1rem 0 1.5rem',
                lineHeight: 1.1,
              }}
            >
              Where We Build{' '}
              <span style={{ fontStyle: 'italic', color: '#D4922A' }}>Your Visions</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.6 }}
              style={{
                fontFamily: "'Montserrat', sans-serif",
                fontSize: '13px',
                lineHeight: 1.9,
                color: 'rgba(240,234,224,0.65)',
                marginBottom: '1rem',
              }}
            >
              At Casafina Construction Company Limited, we are more than just builders;
              we are creators of exceptional spaces and architects of dreams. With a rich
              legacy of construction expertise, we have been shaping skylines and
              transforming landscapes within a short span of existence.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.32, duration: 0.6 }}
              style={{
                fontFamily: "'Montserrat', sans-serif",
                fontSize: '13px',
                lineHeight: 1.9,
                color: 'rgba(240,234,224,0.65)',
                marginBottom: '2rem',
              }}
            >
              Our commitment to excellence drives us to deliver projects that not only meet
              but exceed expectations, embracing innovation, sustainable practices, and
              end-to-end project execution from concept to completion.
            </motion.p>

            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.4, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              style={{
                width: 60,
                height: 1,
                background: '#D4922A',
                transformOrigin: 'left',
                marginBottom: '1.25rem',
              }}
            />

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: '28px',
                color: '#F0EAE0',
                letterSpacing: '0.03em',
              }}
            >
              +234 908 070 2006
            </motion.div>
          </div>
        </motion.section>
      )}
    </AnimatePresence>
  );
}

export default AboutSection;
