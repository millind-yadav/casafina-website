import { motion, AnimatePresence } from 'framer-motion';
import useStore from '../../store/useStore';
import Button from '../shared/Button';

function CTASection() {
  const currentSection = useStore((s) => s.currentSection);
  const visible = currentSection === 4;

  return (
    <AnimatePresence>
      {visible && (
        <motion.section
          key="cta"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.65, 0, 0.35, 1] }}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 20,
            pointerEvents: 'all',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            padding: '0 7vw',
            /* Radial gold glow */
            background: 'radial-gradient(ellipse 60% 50% at 50% 60%, rgba(212,146,42,0.08) 0%, transparent 70%)',
          }}
        >
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: 'clamp(38px, 5vw, 72px)',
              fontWeight: 400,
              color: '#F0EAE0',
              lineHeight: 1.1,
              maxWidth: 720,
              marginBottom: '1.5rem',
            }}
          >
            Get Your Free{' '}
            <span style={{ fontStyle: 'italic', color: '#D4922A' }}>Consultation</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.22, duration: 0.7 }}
            style={{
              fontFamily: "'Montserrat', sans-serif",
              fontSize: '13px',
              lineHeight: 1.9,
              color: 'rgba(240,234,224,0.6)',
              maxWidth: 440,
              marginBottom: '2.5rem',
            }}
          >
            Ready to take on your next project? Let us help you create a reliable
            end-to-end quotation to ensure your construction process is a success.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.32, duration: 0.6 }}
          >
            <Button variant="primary" to="/contact">Book An Appointment →</Button>
          </motion.div>
        </motion.section>
      )}
    </AnimatePresence>
  );
}

export default CTASection;
