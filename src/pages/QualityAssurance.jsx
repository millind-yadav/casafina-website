import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import SectionTag from '../components/shared/SectionTag';
import useInView from '../hooks/useInView';

function FadeUp({ children, delay = 0, style }) {
  const { ref, isVisible } = useInView(0.1);
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 26 }}
      animate={isVisible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.75, delay, ease: [0.16, 1, 0.3, 1] }}
      style={style}
    >
      {children}
    </motion.div>
  );
}

/* ─── QA process cards ─────────────────────────────────────────────── */
const QA_STEPS = [
  {
    num: '01',
    title: 'Material Testing & Inspection',
    desc: 'Every material arriving on site is tested against certified standards before use. Only verified, grade-A materials pass our incoming quality checks.',
  },
  {
    num: '02',
    title: 'Structural Integrity Checks',
    desc: 'Our engineers conduct systematic structural assessments at every phase of construction. Compliance with approved drawings is enforced at each milestone.',
  },
  {
    num: '03',
    title: 'Safety Compliance (OSHA)',
    desc: 'All sites operate under strict OSHA-aligned safety standards. Regular audits and daily toolbox talks ensure zero tolerance for unsafe practices.',
  },
  {
    num: '04',
    title: 'Progress Monitoring & Reporting',
    desc: 'Detailed progress reports are issued weekly to clients with photographic evidence and variance analysis. Full transparency at every stage.',
  },
  {
    num: '05',
    title: 'Third-Party Auditing',
    desc: 'Independent third-party inspectors are engaged at critical project milestones to provide unbiased quality assessments and validation.',
  },
  {
    num: '06',
    title: 'Post-Completion Inspection',
    desc: 'A comprehensive defect-liability inspection is conducted 30 days post-handover. All identified issues are resolved within our 12-month warranty period.',
  },
];

function QACard({ step, delay }) {
  const [hovered, setHovered] = useState(false);
  return (
    <FadeUp delay={delay}>
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          background: '#13131a',
          border: '1px solid rgba(212,146,42,0.08)',
          borderTop: hovered ? '1px solid #D4922A' : '1px solid rgba(212,146,42,0.08)',
          padding: '2rem',
          transform: hovered ? 'translateY(-6px)' : 'translateY(0)',
          transition: 'transform 0.35s ease, border-color 0.35s ease',
          height: '100%',
          boxSizing: 'border-box',
        }}
      >
        <div
          style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: '13px',
            color: 'rgba(212,146,42,0.5)',
            letterSpacing: '0.12em',
            marginBottom: '0.75rem',
          }}
        >
          {step.num}
        </div>
        <div
          style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: 'clamp(17px, 1.6vw, 22px)',
            color: '#F0EAE0',
            marginBottom: '0.85rem',
            lineHeight: 1.3,
          }}
        >
          {step.title}
        </div>
        <div
          style={{
            fontFamily: "'Montserrat', sans-serif",
            fontSize: '12px',
            color: 'rgba(240,234,224,0.45)',
            lineHeight: 1.8,
            letterSpacing: '0.02em',
          }}
        >
          {step.desc}
        </div>
      </div>
    </FadeUp>
  );
}

/* ─── Certifications ────────────────────────────────────────────────── */
const CERTS = [
  { icon: '📋', name: 'ISO 9001:2015', body: 'International Organization for Standardization' },
  { icon: '🎓', name: 'COREN Registered', body: 'Council for the Regulation of Engineering in Nigeria' },
  { icon: '🏗', name: 'CORBON Member', body: 'Council of Registered Builders of Nigeria' },
  { icon: '📜', name: 'LASBCA Certified', body: 'Lagos State Building Control Agency' },
];

/* ─── Accordion ────────────────────────────────────────────────────── */
const HS_ITEMS = [
  {
    title: 'Site Safety Protocols',
    content:
      'All personnel must complete a site induction before entering. Daily hazard assessments are conducted by the site supervisor, and all identified risks are logged and mitigated before work commences.',
  },
  {
    title: 'PPE Requirements',
    content:
      'Hard hats, high-visibility vests, safety boots, and gloves are mandatory on all active sites. Additional PPE such as harnesses and respirators is provided based on task-specific risk assessments.',
  },
  {
    title: 'Emergency Response Procedures',
    content:
      'Emergency assembly points are clearly marked on every site. First aid kits are placed at every 50-metre interval. Emergency contacts are posted at site entrances and all workers are briefed quarterly.',
  },
  {
    title: 'Environmental Compliance',
    content:
      'Waste segregation, dust suppression, and noise controls are enforced in line with Lagos State Environmental Agency guidelines. We minimise our environmental footprint at every project site.',
  },
  {
    title: 'Worker Rights & Welfare',
    content:
      'All workers are entitled to fair wages, regular breaks, and a safe working environment free from harassment. Grievance channels are open and confidential for every employee on site.',
  },
];

function AccordionItem({ item, isOpen, onClick }) {
  return (
    <div
      style={{
        borderBottom: '1px solid rgba(212,146,42,0.1)',
      }}
    >
      <button
        onClick={onClick}
        style={{
          width: '100%',
          background: 'none',
          border: 'none',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '1.4rem 0',
          cursor: 'pointer',
          textAlign: 'left',
          gap: '1rem',
        }}
      >
        <span
          style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: 'clamp(16px, 1.6vw, 22px)',
            color: isOpen ? '#D4922A' : '#F0EAE0',
            transition: 'color 0.25s ease',
          }}
        >
          {item.title}
        </span>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          style={{
            color: '#D4922A',
            fontSize: '18px',
            flexShrink: 0,
            display: 'inline-block',
          }}
        >
          ⌄
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
            style={{ overflow: 'hidden' }}
          >
            <div
              style={{
                fontFamily: "'Montserrat', sans-serif",
                fontSize: '13px',
                color: 'rgba(240,234,224,0.55)',
                lineHeight: 1.85,
                paddingBottom: '1.5rem',
                maxWidth: '680px',
              }}
            >
              {item.content}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ─── Page ─────────────────────────────────────────────────────────── */
const QualityAssurance = () => {
  const [openItem, setOpenItem] = useState(null);

  return (
    <>
      <Helmet>
        <title>Quality Assurance — Casafina Construction</title>
        <meta
          name="description"
          content="Casafina's rigorous quality assurance processes ensure every project meets the highest standards of safety, compliance, and excellence."
        />
        <meta property="og:title" content="Quality Assurance — Casafina Construction" />
        <meta property="og:description" content="Casafina's rigorous quality assurance processes ensure every project meets the highest standards of safety, compliance, and excellence." />
      </Helmet>

      {/* ── Hero ────────────────────────────────────────────────────── */}
      <section
        style={{
          minHeight: '55vh',
          background: '#050507',
          display: 'flex',
          alignItems: 'center',
          padding: '160px 7vw 90px',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            width: '60vw',
            height: '100%',
            background:
              'radial-gradient(ellipse at 75% 50%, rgba(212,146,42,0.07) 0%, transparent 65%)',
            pointerEvents: 'none',
          }}
        />
        <div style={{ position: 'relative', zIndex: 1, maxWidth: '680px' }}>
          <FadeUp>
            <SectionTag label="Quality Assurance" />
          </FadeUp>
          <FadeUp delay={0.1}>
            <h1
              style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: 'clamp(36px, 5.2vw, 74px)',
                fontWeight: 400,
                color: '#F0EAE0',
                lineHeight: 1.1,
                marginTop: '1.5rem',
                marginBottom: '1.5rem',
              }}
            >
              We Never Compromise
              <br />
              <em style={{ color: '#D4922A', fontStyle: 'italic' }}>on Quality</em>
            </h1>
          </FadeUp>
          <FadeUp delay={0.2}>
            <p
              style={{
                fontFamily: "'Montserrat', sans-serif",
                fontSize: 'clamp(13px, 1.2vw, 15px)',
                color: 'rgba(240,234,224,0.52)',
                lineHeight: 1.85,
                maxWidth: '500px',
              }}
            >
              From materials sourcing to post-completion inspection, our rigorous QA process
              ensures that every Casafina project exceeds the standards our clients deserve.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* ── Intro two-column ────────────────────────────────────────── */}
      <section
        style={{
          padding: '100px 7vw',
          background: '#050507',
          display: 'grid',
          gridTemplateColumns: '1.3fr 1fr',
          gap: '8vw',
          alignItems: 'center',
          borderTop: '1px solid rgba(212,146,42,0.07)',
        }}
      >
        <FadeUp>
          <SectionTag label="Our Commitment" />
          <h2
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: 'clamp(26px, 3vw, 44px)',
              fontWeight: 400,
              color: '#F0EAE0',
              lineHeight: 1.25,
              marginTop: '1rem',
              marginBottom: '1.5rem',
            }}
          >
            Our Commitment to Excellence
          </h2>
          <div
            style={{
              fontFamily: "'Montserrat', sans-serif",
              fontSize: '13px',
              color: 'rgba(240,234,224,0.55)',
              lineHeight: 1.9,
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
            }}
          >
            <p>
              At Casafina, quality assurance is not an afterthought — it is embedded in every
              decision we make from project inception. We maintain a dedicated QA team that
              operates independently of the construction crew, providing objective oversight
              across all active sites.
            </p>
            <p>
              Our multi-tiered quality management system follows international best practices and
              Nigerian regulatory requirements. By combining rigorous in-house processes with
              independent third-party audits, we ensure that every project is built to last.
            </p>
          </div>
        </FadeUp>

        {/* 100% ring */}
        <FadeUp delay={0.15} style={{ display: 'flex', justifyContent: 'center' }}>
          <div style={{ position: 'relative', width: '220px', height: '220px' }}>
            {/* Outer gold ring */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                borderRadius: '50%',
                border: '1.5px solid rgba(212,146,42,0.25)',
              }}
            />
            <div
              style={{
                position: 'absolute',
                inset: '12px',
                borderRadius: '50%',
                border: '1px solid rgba(212,146,42,0.12)',
              }}
            />
            {/* Rotating dash ring */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 24, repeat: Infinity, ease: 'linear' }}
              style={{
                position: 'absolute',
                inset: '6px',
                borderRadius: '50%',
                border: '1px dashed rgba(212,146,42,0.18)',
              }}
            />
            {/* Centre content */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.25rem',
              }}
            >
              <div
                style={{
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  fontSize: '58px',
                  fontWeight: 400,
                  color: '#D4922A',
                  lineHeight: 1,
                }}
              >
                100%
              </div>
              <div
                style={{
                  fontFamily: "'Montserrat', sans-serif",
                  fontSize: '9px',
                  letterSpacing: '0.28em',
                  textTransform: 'uppercase',
                  color: 'rgba(240,234,224,0.45)',
                  textAlign: 'center',
                }}
              >
                Client Satisfaction
              </div>
            </div>
          </div>
        </FadeUp>
      </section>

      {/* ── QA process grid ──────────────────────────────────────────── */}
      <section style={{ padding: '100px 7vw', background: '#0d0d10' }}>
        <FadeUp>
          <SectionTag label="QA Process" />
        </FadeUp>
        <FadeUp delay={0.1}>
          <h2
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: 'clamp(26px, 3.2vw, 48px)',
              fontWeight: 400,
              color: '#F0EAE0',
              marginTop: '1rem',
              marginBottom: '3rem',
            }}
          >
            Six Steps to Certainty
          </h2>
        </FadeUp>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '1.25rem',
          }}
        >
          {QA_STEPS.map((step, i) => (
            <QACard key={step.num} step={step} delay={i * 0.08} />
          ))}
        </div>
      </section>

      {/* ── Certifications ────────────────────────────────────────────── */}
      <section style={{ padding: '100px 7vw', background: '#050507' }}>
        <FadeUp>
          <SectionTag label="Certifications" />
        </FadeUp>
        <FadeUp delay={0.1}>
          <h2
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: 'clamp(26px, 3.2vw, 48px)',
              fontWeight: 400,
              color: '#F0EAE0',
              marginTop: '1rem',
              marginBottom: '3rem',
            }}
          >
            Our Standards &amp; Certifications
          </h2>
        </FadeUp>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '1.25rem',
          }}
        >
          {CERTS.map((cert, i) => (
            <FadeUp key={cert.name} delay={i * 0.1}>
              <div
                style={{
                  background: '#0d0d10',
                  border: '1px solid rgba(212,146,42,0.1)',
                  padding: '2rem 1.5rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.75rem',
                  alignItems: 'flex-start',
                }}
              >
                <div
                  style={{
                    width: '48px',
                    height: '48px',
                    border: '1px solid rgba(212,146,42,0.3)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '22px',
                  }}
                >
                  {cert.icon}
                </div>
                <div
                  style={{
                    fontFamily: "'Cormorant Garamond', Georgia, serif",
                    fontSize: 'clamp(15px, 1.4vw, 20px)',
                    color: '#F0EAE0',
                    lineHeight: 1.3,
                  }}
                >
                  {cert.name}
                </div>
                <div
                  style={{
                    fontFamily: "'Montserrat', sans-serif",
                    fontSize: '10px',
                    color: 'rgba(240,234,224,0.38)',
                    lineHeight: 1.6,
                    letterSpacing: '0.02em',
                  }}
                >
                  {cert.body}
                </div>
              </div>
            </FadeUp>
          ))}
        </div>
      </section>

      {/* ── H&S accordion ─────────────────────────────────────────────── */}
      <section style={{ padding: '100px 7vw', background: '#0d0d10' }}>
        <FadeUp>
          <SectionTag label="Health & Safety" />
        </FadeUp>
        <FadeUp delay={0.1}>
          <h2
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: 'clamp(26px, 3.2vw, 48px)',
              fontWeight: 400,
              color: '#F0EAE0',
              marginTop: '1rem',
              marginBottom: '3rem',
            }}
          >
            Health &amp; Safety Policy
          </h2>
        </FadeUp>
        <FadeUp>
          <div
            style={{
              borderTop: '1px solid rgba(212,146,42,0.1)',
              maxWidth: '840px',
            }}
          >
            {HS_ITEMS.map((item, i) => (
              <AccordionItem
                key={item.title}
                item={item}
                isOpen={openItem === i}
                onClick={() => setOpenItem(openItem === i ? null : i)}
              />
            ))}
          </div>
        </FadeUp>
      </section>
    </>
  );
};

export default QualityAssurance;
