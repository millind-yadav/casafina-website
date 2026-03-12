import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import SectionTag from '../components/shared/SectionTag';
import Button from '../components/shared/Button';
import useInView from '../hooks/useInView';
import { projects } from '../data/projects';

const FILTERS = ['All', 'Residential', 'Commercial', 'Luxury Residential', 'Mixed Use'];

/* ─── Fade-up wrapper ────────────────────────────────────────────────── */
function FadeUp({ children, delay = 0, style }) {
  const { ref, isVisible } = useInView(0.12);
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={isVisible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.75, delay, ease: [0.16, 1, 0.3, 1] }}
      style={style}
    >
      {children}
    </motion.div>
  );
}

/* ─── Project card ───────────────────────────────────────────────────── */
function ProjectCard({ project }) {
  const navigate = useNavigate();
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.94 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.94 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      onClick={() => navigate(`/projects/${project.slug}`)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        cursor: 'pointer',
        position: 'relative',
        overflow: 'hidden',
        aspectRatio: '3/4',
        background: 'linear-gradient(145deg, #1a1c24 0%, #1e2840 60%, #0d0d10 100%)',
      }}
    >
      {/* Image */}
      <img
        src={project.image}
        alt={project.name}
        onError={(e) => { e.target.style.display = 'none'; }}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          transform: hovered ? 'scale(1.07)' : 'scale(1)',
          transition: 'transform 0.65s ease',
        }}
      />

      {/* Gradient overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: hovered
            ? 'linear-gradient(to top, rgba(5,5,7,0.92) 0%, rgba(5,5,7,0.5) 50%, rgba(5,5,7,0.15) 100%)'
            : 'linear-gradient(to top, rgba(5,5,7,0.7) 0%, transparent 55%)',
          transition: 'background 0.45s ease',
        }}
      />

      {/* Bottom content */}
      <div
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
          padding: '1.5rem',
          transform: hovered ? 'translateY(0)' : 'translateY(4px)',
          transition: 'transform 0.4s ease',
        }}
      >
        {/* Category badge */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          style={{
            display: 'inline-block',
            fontFamily: "'Montserrat', sans-serif",
            fontSize: '9px',
            letterSpacing: '0.28em',
            textTransform: 'uppercase',
            color: '#D4922A',
            border: '1px solid rgba(212,146,42,0.5)',
            padding: '3px 10px',
            marginBottom: '0.6rem',
          }}
        >
          {project.category}
        </motion.div>

        <div
          style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: 'clamp(18px, 1.8vw, 24px)',
            fontWeight: 400,
            color: '#F0EAE0',
            lineHeight: 1.2,
            marginBottom: '0.25rem',
          }}
        >
          {project.name}
        </div>
        <div
          style={{
            fontFamily: "'Montserrat', sans-serif",
            fontSize: '11px',
            color: 'rgba(240,234,224,0.5)',
            letterSpacing: '0.08em',
          }}
        >
          {project.location} · {project.year}
        </div>
      </div>

      {/* Arrow on hover */}
      <motion.div
        initial={{ opacity: 0, x: 10 }}
        animate={{ opacity: hovered ? 1 : 0, x: hovered ? 0 : 10 }}
        transition={{ duration: 0.3 }}
        style={{
          position: 'absolute',
          top: '1.25rem',
          right: '1.25rem',
          width: '36px',
          height: '36px',
          border: '1px solid rgba(212,146,42,0.6)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#D4922A',
          fontSize: '14px',
        }}
      >
        ↗
      </motion.div>
    </motion.div>
  );
}

/* ─── Page ───────────────────────────────────────────────────────────── */
const Projects = () => {
  const [active, setActive] = useState('All');

  const filtered = active === 'All'
    ? projects
    : projects.filter((p) => p.category === active);

  return (
    <>
      <Helmet>
        <title>Portfolio — Casafina Construction</title>
        <meta
          name="description"
          content="Explore the residential, commercial and luxury projects delivered by Casafina Construction Co. Ltd across Lagos."
        />
        <meta property="og:title" content="Portfolio — Casafina Construction" />
        <meta property="og:description" content="Explore the residential, commercial and luxury projects delivered by Casafina Construction Co. Ltd across Lagos." />
      </Helmet>

      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <section
        style={{
          minHeight: '60vh',
          background: '#050507',
          display: 'flex',
          alignItems: 'center',
          padding: '160px 7vw 100px',
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
            <SectionTag label="Our Portfolio" />
          </FadeUp>
          <FadeUp delay={0.1}>
            <h1
              style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: 'clamp(38px, 5.5vw, 78px)',
                fontWeight: 400,
                color: '#F0EAE0',
                lineHeight: 1.1,
                marginTop: '1.5rem',
                marginBottom: '1.5rem',
              }}
            >
              Work That
              <br />
              <em style={{ color: '#D4922A', fontStyle: 'italic' }}>Speaks for Itself</em>
            </h1>
          </FadeUp>
          <FadeUp delay={0.2}>
            <p
              style={{
                fontFamily: "'Montserrat', sans-serif",
                fontSize: 'clamp(13px, 1.2vw, 15px)',
                color: 'rgba(240,234,224,0.55)',
                lineHeight: 1.85,
                maxWidth: '500px',
              }}
            >
              From residential apartments to commercial complexes and luxury residences — every
              Casafina project is a testament to quality craftsmanship and uncompromising
              attention to detail.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* ── Filter bar ───────────────────────────────────────────────── */}
      <section style={{ padding: '0 7vw 60px', background: '#050507' }}>
        <div
          style={{
            display: 'flex',
            gap: '0.5rem',
            flexWrap: 'wrap',
            borderBottom: '1px solid rgba(212,146,42,0.1)',
            paddingBottom: '0',
          }}
        >
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setActive(f)}
              style={{
                background: 'none',
                border: 'none',
                borderBottom: active === f ? '2px solid #D4922A' : '2px solid transparent',
                padding: '0.75rem 1.25rem',
                fontFamily: "'Montserrat', sans-serif",
                fontSize: '11px',
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                color: active === f ? '#D4922A' : 'rgba(240,234,224,0.4)',
                cursor: 'pointer',
                transition: 'color 0.25s ease, border-color 0.25s ease',
                marginBottom: '-1px',
              }}
            >
              {f}
            </button>
          ))}
        </div>
      </section>

      {/* ── Grid ─────────────────────────────────────────────────────── */}
      <section style={{ padding: '0 7vw 120px', background: '#050507' }}>
        <motion.div
          layout
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '1.5rem',
          }}
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </AnimatePresence>
        </motion.div>

        {filtered.length === 0 && (
          <div
            style={{
              textAlign: 'center',
              padding: '80px 0',
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: '24px',
              color: 'rgba(240,234,224,0.25)',
            }}
          >
            No projects in this category yet.
          </div>
        )}
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────── */}
      <section
        style={{
          padding: '100px 7vw',
          background: '#0d0d10',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'radial-gradient(ellipse at 50% 70%, rgba(212,146,42,0.08) 0%, transparent 60%)',
            pointerEvents: 'none',
          }}
        />
        <FadeUp style={{ position: 'relative', zIndex: 1 }}>
          <SectionTag label="Start Building" />
        </FadeUp>
        <FadeUp delay={0.1} style={{ position: 'relative', zIndex: 1 }}>
          <h2
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: 'clamp(28px, 4vw, 58px)',
              fontWeight: 400,
              color: '#F0EAE0',
              marginTop: '1.5rem',
              marginBottom: '1rem',
            }}
          >
            Ready to Add Your Project to This List?
          </h2>
        </FadeUp>
        <FadeUp delay={0.2} style={{ marginBottom: '2.5rem', position: 'relative', zIndex: 1 }}>
          <p
            style={{
              fontFamily: "'Montserrat', sans-serif",
              fontSize: '14px',
              color: 'rgba(240,234,224,0.5)',
              maxWidth: '420px',
              lineHeight: 1.8,
            }}
          >
            Tell us about your vision and we&apos;ll build it.
          </p>
        </FadeUp>
        <FadeUp delay={0.28} style={{ position: 'relative', zIndex: 1 }}>
          <Button to="/quote" variant="primary">Request a Free Quote</Button>
        </FadeUp>
      </section>
    </>
  );
};

export default Projects;
