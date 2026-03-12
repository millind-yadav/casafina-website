import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import useStore from '../../store/useStore';
import SectionTag from '../shared/SectionTag';

const SERVICES = [
  {
    num: '01',
    title: 'Project Conceptualization',
    desc: 'Allowing clients to tap into our extensive construction expertise during the planning phase of their project.',
  },
  {
    num: '02',
    title: 'Construction Management',
    desc: 'Construction management services for clients who complete design before engaging general contractors.',
  },
  {
    num: '03',
    title: 'Procurement of Materials',
    desc: 'Sourcing qualified materials at the best price with convenient payment structures.',
  },
  {
    num: '04',
    title: 'Engineering Design & Construction',
    desc: 'Giving clients a single source of responsibility for both the design and construction of their project.',
  },
];

function ServiceCard({ service, delay }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? '#0f0f12' : '#0d0d10',
        border: '1px solid rgba(212,146,42,0.1)',
        borderBottom: hovered ? '1px solid #D4922A' : '1px solid rgba(212,146,42,0.1)',
        padding: '1.5rem',
        transition: 'background 0.3s, border-color 0.3s',
      }}
    >
      <div style={{
        fontFamily: "'Montserrat', sans-serif",
        fontSize: '9px',
        letterSpacing: '0.3em',
        color: '#D4922A',
        marginBottom: '0.75rem',
      }}>
        {service.num}
      </div>
      <div style={{
        fontFamily: "'Cormorant Garamond', Georgia, serif",
        fontSize: '22px',
        color: '#F0EAE0',
        marginBottom: '0.6rem',
        lineHeight: 1.25,
      }}>
        {service.title}
      </div>
      <div style={{
        fontFamily: "'Montserrat', sans-serif",
        fontSize: '12px',
        lineHeight: 1.7,
        color: 'rgba(240,234,224,0.55)',
      }}>
        {service.desc}
      </div>
    </motion.div>
  );
}

function ServicesSection() {
  const currentSection = useStore((s) => s.currentSection);
  const visible = currentSection === 2;

  return (
    <AnimatePresence>
      {visible && (
        <motion.section
          key="services"
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
            alignItems: 'flex-end',
            padding: '0 7vw 10vh',
            gap: '5vw',
          }}
        >
          {/* Left column */}
          <div style={{ flex: '0 0 320px' }}>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05, duration: 0.6 }}
            >
              <SectionTag>What We Do</SectionTag>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: 'clamp(32px, 3.5vw, 56px)',
                fontWeight: 400,
                color: '#F0EAE0',
                margin: '1rem 0 1.25rem',
                lineHeight: 1.1,
              }}
            >
              Our Core <span style={{ fontStyle: 'italic', color: '#D4922A' }}>Services</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.6 }}
              style={{
                fontFamily: "'Montserrat', sans-serif",
                fontSize: '12px',
                lineHeight: 1.85,
                color: 'rgba(240,234,224,0.55)',
              }}
            >
              We are a team of brilliant, experienced, and hardworking professionals
              committed to delivering the highest standard of quality on every project.
              Our process is transparent, reliable, cost-effective, and built around the
              fields where we are most adept.
            </motion.p>
          </div>

          {/* 2×2 service cards */}
          <div style={{
            flex: 1,
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '1px',
          }}>
            {SERVICES.map((s, i) => (
              <ServiceCard key={s.num} service={s} delay={0.1 + i * 0.08} />
            ))}
          </div>
        </motion.section>
      )}
    </AnimatePresence>
  );
}

export default ServicesSection;
