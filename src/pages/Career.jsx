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

const WHY_ITEMS = [
  { icon: '💰', title: 'Competitive Pay',    text: 'Market-leading salaries and performance bonuses.' },
  { icon: '📈', title: 'Career Growth',      text: 'Structured development paths and promotions from within.' },
  { icon: '🤝', title: 'Great Culture',       text: 'Inclusive, respectful and collaborative environment.' },
  { icon: '🏗', title: 'Exciting Projects',   text: 'Work on landmark Lagos projects that define skylines.' },
];

const JOBS = [
  { title: 'Site Engineer',       type: 'Full-Time', dept: 'Engineering', location: 'Lagos' },
  { title: 'Project Manager',     type: 'Full-Time', dept: 'Management',  location: 'Lagos' },
  { title: 'Quantity Surveyor',   type: 'Full-Time', dept: 'Finance',     location: 'Lagos' },
  { title: 'AutoCAD Draftsman',   type: 'Contract',  dept: 'Design',      location: 'Lagos' },
];

/* ─── Apply form (shared by job listings + general) ─────────────────── */
const inputBase = {
  width: '100%',
  background: '#0a0a0f',
  border: '1px solid rgba(212,146,42,0.18)',
  color: '#F0EAE0',
  fontFamily: "'Montserrat', sans-serif",
  fontSize: '13px',
  padding: '0.8rem 1rem',
  outline: 'none',
  boxSizing: 'border-box',
  transition: 'border-color 0.25s ease',
};

function ApplyForm({ jobTitle, onClose }) {
  const [submitted, setSubmitted] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [cvName, setCvName] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: wire to backend
    setSubmitted(true);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) setCvName(file.name);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) setCvName(file.name);
  };

  return (
    <motion.div
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: 'auto', opacity: 1 }}
      exit={{ height: 0, opacity: 0 }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      style={{ overflow: 'hidden' }}
    >
      <div
        style={{
          background: '#0a0a0f',
          border: '1px solid rgba(212,146,42,0.12)',
          borderTop: 'none',
          padding: '2rem',
        }}
      >
        {submitted ? (
          <div
            style={{
              textAlign: 'center',
              padding: '2rem 1rem',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '0.75rem',
            }}
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 260, damping: 20 }}
              style={{ fontSize: '40px' }}
            >
              ✅
            </motion.div>
            <div
              style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: '22px',
                color: '#F0EAE0',
              }}
            >
              Application Received
            </div>
            <div
              style={{
                fontFamily: "'Montserrat', sans-serif",
                fontSize: '12px',
                color: 'rgba(240,234,224,0.4)',
              }}
            >
              We&apos;ll review your application and be in touch within 5 business days.
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div
              style={{
                fontFamily: "'Montserrat', sans-serif",
                fontSize: '11px',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: '#D4922A',
                marginBottom: '0.25rem',
              }}
            >
              Applying for: {jobTitle}
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <input
                required
                placeholder="Full Name *"
                style={inputBase}
                onFocus={(e) => (e.target.style.borderColor = '#D4922A')}
                onBlur={(e) => (e.target.style.borderColor = 'rgba(212,146,42,0.18)')}
              />
              <input
                required
                type="email"
                placeholder="Email Address *"
                style={inputBase}
                onFocus={(e) => (e.target.style.borderColor = '#D4922A')}
                onBlur={(e) => (e.target.style.borderColor = 'rgba(212,146,42,0.18)')}
              />
            </div>
            <input
              type="tel"
              placeholder="Phone Number"
              style={inputBase}
              onFocus={(e) => (e.target.style.borderColor = '#D4922A')}
              onBlur={(e) => (e.target.style.borderColor = 'rgba(212,146,42,0.18)')}
            />
            {/* CV drag-drop zone */}
            <div
              onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
              onDragLeave={() => setDragOver(false)}
              onDrop={handleDrop}
              style={{
                border: `2px dashed ${dragOver ? '#D4922A' : 'rgba(212,146,42,0.22)'}`,
                background: dragOver ? 'rgba(212,146,42,0.06)' : 'transparent',
                padding: '2rem',
                textAlign: 'center',
                transition: 'all 0.25s ease',
                cursor: 'pointer',
                position: 'relative',
              }}
            >
              <input
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={handleFileChange}
                style={{
                  position: 'absolute',
                  inset: 0,
                  opacity: 0,
                  cursor: 'pointer',
                  width: '100%',
                  height: '100%',
                }}
              />
              <div
                style={{
                  fontFamily: "'Montserrat', sans-serif",
                  fontSize: '11px',
                  color: cvName ? '#D4922A' : 'rgba(240,234,224,0.35)',
                  letterSpacing: '0.08em',
                  pointerEvents: 'none',
                }}
              >
                {cvName ? `✔  ${cvName}` : '📄  Drop your CV here, or click to browse (.pdf, .doc, .docx)'}
              </div>
            </div>
            <textarea
              rows={5}
              placeholder="Cover letter (optional) — tell us why you want to join Casafina…"
              style={{ ...inputBase, resize: 'vertical', minHeight: '110px' }}
              onFocus={(e) => (e.target.style.borderColor = '#D4922A')}
              onBlur={(e) => (e.target.style.borderColor = 'rgba(212,146,42,0.18)')}
            />
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <button
                type="submit"
                style={{
                  background: '#D4922A',
                  border: 'none',
                  color: '#050507',
                  fontFamily: "'Montserrat', sans-serif",
                  fontSize: '11px',
                  fontWeight: 600,
                  letterSpacing: '0.22em',
                  textTransform: 'uppercase',
                  padding: '0.85rem 2rem',
                  cursor: 'pointer',
                  transition: 'transform 0.2s ease',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-2px)')}
                onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
              >
                Submit Application
              </button>
              {onClose && (
                <button
                  type="button"
                  onClick={onClose}
                  style={{
                    background: 'none',
                    border: '1px solid rgba(212,146,42,0.2)',
                    color: 'rgba(240,234,224,0.4)',
                    fontFamily: "'Montserrat', sans-serif",
                    fontSize: '11px',
                    letterSpacing: '0.18em',
                    textTransform: 'uppercase',
                    padding: '0.85rem 1.5rem',
                    cursor: 'pointer',
                    transition: 'color 0.25s ease',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = '#D4922A')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(240,234,224,0.4)')}
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        )}
      </div>
    </motion.div>
  );
}

/* ─── Job listing card ───────────────────────────────────────────────── */
function JobCard({ job, delay }) {
  const [open, setOpen] = useState(false);
  return (
    <FadeUp delay={delay}>
      <div style={{ borderBottom: '1px solid rgba(212,146,42,0.08)' }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '1.75rem 0',
            gap: '1rem',
            flexWrap: 'wrap',
          }}
        >
          <div style={{ flex: 1 }}>
            <div
              style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: 'clamp(18px, 1.8vw, 26px)',
                color: '#F0EAE0',
                marginBottom: '0.5rem',
              }}
            >
              {job.title}
            </div>
            <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap' }}>
              <span
                style={{
                  fontFamily: "'Montserrat', sans-serif",
                  fontSize: '9px',
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color: '#D4922A',
                  border: '1px solid rgba(212,146,42,0.35)',
                  padding: '3px 8px',
                }}
              >
                {job.dept}
              </span>
              <span
                style={{
                  fontFamily: "'Montserrat', sans-serif",
                  fontSize: '9px',
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color: 'rgba(240,234,224,0.4)',
                  border: '1px solid rgba(240,234,224,0.1)',
                  padding: '3px 8px',
                }}
              >
                {job.type}
              </span>
              <span
                style={{
                  fontFamily: "'Montserrat', sans-serif",
                  fontSize: '9px',
                  letterSpacing: '0.12em',
                  color: 'rgba(240,234,224,0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.3rem',
                }}
              >
                📍 {job.location}
              </span>
            </div>
          </div>
          <button
            onClick={() => setOpen((p) => !p)}
            style={{
              background: open ? '#D4922A' : 'none',
              border: '1px solid rgba(212,146,42,0.5)',
              color: open ? '#050507' : '#D4922A',
              fontFamily: "'Montserrat', sans-serif",
              fontSize: '11px',
              fontWeight: open ? 600 : 400,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              padding: '0.75rem 1.5rem',
              cursor: 'pointer',
              transition: 'all 0.25s ease',
              flexShrink: 0,
            }}
          >
            {open ? 'Close ✕' : 'Apply →'}
          </button>
        </div>
        <AnimatePresence>
          {open && (
            <ApplyForm
              key="form"
              jobTitle={job.title}
              onClose={() => setOpen(false)}
            />
          )}
        </AnimatePresence>
      </div>
    </FadeUp>
  );
}

/* ─── Page ─────────────────────────────────────────────────────────── */
const Career = () => {
  const [generalOpen, setGeneralOpen] = useState(false);

  return (
    <>
      <Helmet>
        <title>Careers — Casafina Construction</title>
        <meta
          name="description"
          content="Join the Casafina Construction team and build your career on landmark projects across Lagos."
        />
        <meta property="og:title" content="Careers — Casafina Construction" />
        <meta property="og:description" content="Join the Casafina Construction team and build your career on landmark projects across Lagos." />
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
          <FadeUp><SectionTag label="Careers" /></FadeUp>
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
              Build Your Career
              <br />
              <em style={{ color: '#D4922A', fontStyle: 'italic' }}>With Casafina</em>
            </h1>
          </FadeUp>
          <FadeUp delay={0.2}>
            <p
              style={{
                fontFamily: "'Montserrat', sans-serif",
                fontSize: 'clamp(13px, 1.2vw, 15px)',
                color: 'rgba(240,234,224,0.52)',
                lineHeight: 1.85,
                maxWidth: '480px',
              }}
            >
              We are always looking for talented, ambitious professionals to join our growing
              team and help us raise the standard of construction excellence in Nigeria.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* ── Why join us ─────────────────────────────────────────────── */}
      <section
        style={{
          padding: '80px 7vw',
          background: '#0d0d10',
          borderTop: '1px solid rgba(212,146,42,0.07)',
        }}
      >
        <FadeUp><SectionTag label="Why Casafina" /></FadeUp>
        <FadeUp delay={0.1}>
          <h2
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: 'clamp(24px, 2.8vw, 42px)',
              fontWeight: 400,
              color: '#F0EAE0',
              marginTop: '1rem',
              marginBottom: '2.5rem',
            }}
          >
            Why Join Our Team
          </h2>
        </FadeUp>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '1.25rem',
          }}
        >
          {WHY_ITEMS.map((item, i) => (
            <FadeUp key={item.title} delay={i * 0.1}>
              <div
                style={{
                  background: '#13131a',
                  border: '1px solid rgba(212,146,42,0.08)',
                  padding: '2rem 1.5rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.75rem',
                }}
              >
                <div style={{ fontSize: '28px' }}>{item.icon}</div>
                <div
                  style={{
                    fontFamily: "'Cormorant Garamond', Georgia, serif",
                    fontSize: 'clamp(16px, 1.5vw, 21px)',
                    color: '#F0EAE0',
                    lineHeight: 1.3,
                  }}
                >
                  {item.title}
                </div>
                <div
                  style={{
                    fontFamily: "'Montserrat', sans-serif",
                    fontSize: '11px',
                    color: 'rgba(240,234,224,0.42)',
                    lineHeight: 1.7,
                  }}
                >
                  {item.text}
                </div>
              </div>
            </FadeUp>
          ))}
        </div>
      </section>

      {/* ── Open positions ────────────────────────────────────────────── */}
      <section style={{ padding: '100px 7vw', background: '#050507' }}>
        <FadeUp><SectionTag label="Open Roles" /></FadeUp>
        <FadeUp delay={0.1}>
          <h2
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: 'clamp(24px, 2.8vw, 42px)',
              fontWeight: 400,
              color: '#F0EAE0',
              marginTop: '1rem',
              marginBottom: '3rem',
            }}
          >
            Open Positions
          </h2>
        </FadeUp>

        <div
          style={{
            borderTop: '1px solid rgba(212,146,42,0.08)',
            maxWidth: '900px',
          }}
        >
          {JOBS.map((job, i) => (
            <JobCard key={job.title} job={job} delay={i * 0.07} />
          ))}
        </div>

        {/* General application */}
        <FadeUp style={{ marginTop: '5rem' }}>
          <div
            style={{
              background: '#0d0d10',
              border: '1px solid rgba(212,146,42,0.1)',
              padding: '2.5rem',
              maxWidth: '900px',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '1rem',
                marginBottom: generalOpen ? '0' : '0',
              }}
            >
              <div>
                <div
                  style={{
                    fontFamily: "'Cormorant Garamond', Georgia, serif",
                    fontSize: 'clamp(20px, 2vw, 28px)',
                    color: '#F0EAE0',
                    marginBottom: '0.4rem',
                  }}
                >
                  Don’t see your role?
                </div>
                <div
                  style={{
                    fontFamily: "'Montserrat', sans-serif",
                    fontSize: '12px',
                    color: 'rgba(240,234,224,0.42)',
                  }}
                >
                  Send us a general application and we’ll reach out when something fits.
                </div>
              </div>
              <button
                onClick={() => setGeneralOpen((p) => !p)}
                style={{
                  background: generalOpen ? '#D4922A' : 'none',
                  border: '1px solid rgba(212,146,42,0.5)',
                  color: generalOpen ? '#050507' : '#D4922A',
                  fontFamily: "'Montserrat', sans-serif",
                  fontSize: '11px',
                  fontWeight: generalOpen ? 600 : 400,
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  padding: '0.75rem 1.5rem',
                  cursor: 'pointer',
                  transition: 'all 0.25s ease',
                  flexShrink: 0,
                }}
              >
                {generalOpen ? 'Close ✕' : 'Apply →'}
              </button>
            </div>
            <AnimatePresence>
              {generalOpen && (
                <ApplyForm
                  key="general"
                  jobTitle="General Application"
                  onClose={() => setGeneralOpen(false)}
                />
              )}
            </AnimatePresence>
          </div>
        </FadeUp>
      </section>
    </>
  );
};

export default Career;
