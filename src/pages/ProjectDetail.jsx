import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import SectionTag from '../components/shared/SectionTag';
import Button from '../components/shared/Button';
import useInView from '../hooks/useInView';
import { projects } from '../data/projects';

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

/* ─── Page ───────────────────────────────────────────────────────────── */
const ProjectDetail = () => {
  const { slug } = useParams();
  const navigate  = useNavigate();
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const index   = projects.findIndex((p) => p.slug === slug);
  const project = projects[index];

  // Redirect to 404 if slug is unknown
  useEffect(() => {
    if (!project) navigate('/404', { replace: true });
  }, [project, navigate]);

  if (!project) return null;

  const nextProject = projects[(index + 1) % projects.length];
  const galleryImages = project.gallery?.length ? project.gallery : [project.image];
  const isLightboxOpen = lightboxIndex !== null;

  const { ref: scopeRef, isVisible: scopeVisible } = useInView(0.2);

  useEffect(() => {
    if (!isLightboxOpen) return undefined;

    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        setLightboxIndex(null);
      }
      if (event.key === 'ArrowRight') {
        setLightboxIndex((current) => (current + 1) % galleryImages.length);
      }
      if (event.key === 'ArrowLeft') {
        setLightboxIndex((current) => (current - 1 + galleryImages.length) % galleryImages.length);
      }
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [galleryImages.length, isLightboxOpen]);

  return (
    <>
      <Helmet>
        <title>{project.name} — Casafina Construction</title>
        <meta name="description" content={project.description} />
        <meta property="og:title" content={`${project.name} — Casafina Construction`} />
        <meta property="og:description" content={project.description} />
      </Helmet>

      {/* ── Back arrow ───────────────────────────────────────────────── */}
      <Link
        to="/projects"
        style={{
          position: 'fixed',
          top: '88px',
          left: '3vw',
          zIndex: 50,
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          fontFamily: "'Montserrat', sans-serif",
          fontSize: '11px',
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          color: 'rgba(240,234,224,0.55)',
          textDecoration: 'none',
          transition: 'color 0.25s ease',
        }}
        onMouseEnter={(e) => (e.currentTarget.style.color = '#D4922A')}
        onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(240,234,224,0.55)')}
      >
        <span style={{ fontSize: '16px' }}>←</span> Portfolio
      </Link>

      {/* ── Hero image ───────────────────────────────────────────────── */}
      <section
        style={{
          position: 'relative',
          height: '60vh',
          minHeight: '380px',
          overflow: 'hidden',
          background: 'linear-gradient(145deg, #1a1c24 0%, #1e2840 60%, #0d0d10 100%)',
        }}
      >
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
          }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(to top, rgba(5,5,7,0.88) 0%, rgba(5,5,7,0.35) 50%, rgba(5,5,7,0.1) 100%)',
          }}
        />
        {/* Name + badge */}
        <div
          style={{
            position: 'absolute',
            bottom: '2.5rem',
            left: '7vw',
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            style={{
              display: 'inline-block',
              fontFamily: "'Montserrat', sans-serif",
              fontSize: '9px',
              letterSpacing: '0.32em',
              textTransform: 'uppercase',
              color: '#D4922A',
              border: '1px solid rgba(212,146,42,0.5)',
              padding: '4px 12px',
              marginBottom: '0.75rem',
            }}
          >
            {project.category}
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: 'clamp(36px, 5vw, 72px)',
              fontWeight: 400,
              color: '#F0EAE0',
              lineHeight: 1.1,
              margin: 0,
            }}
          >
            {project.name}
          </motion.h1>
        </div>
      </section>

      {/* ── Info bar ─────────────────────────────────────────────────── */}
      <section
        style={{
          background: '#0d0d10',
          borderBottom: '1px solid rgba(212,146,42,0.1)',
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            padding: '2rem 7vw',
            gap: '0 4vw',
          }}
        >
          {[
            { label: 'Location', value: project.location },
            { label: 'Client',   value: project.client },
            { label: 'Category', value: project.category },
            { label: 'Year',     value: project.year },
            { label: 'Status',   value: project.status },
          ].map(({ label, value }) => (
            <div key={label} style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
              <span
                style={{
                  fontFamily: "'Montserrat', sans-serif",
                  fontSize: '9px',
                  letterSpacing: '0.3em',
                  textTransform: 'uppercase',
                  color: '#D4922A',
                }}
              >
                {label}
              </span>
              <span
                style={{
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  fontSize: 'clamp(16px, 1.6vw, 22px)',
                  color: '#F0EAE0',
                }}
              >
                {value}
              </span>
            </div>
          ))}
        </motion.div>
      </section>

      {/* ── Description + Scope ──────────────────────────────────────── */}
      <section
        style={{
          padding: '100px 7vw',
          background: '#050507',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '6vw',
          alignItems: 'start',
        }}
      >
        <FadeUp>
          <SectionTag label="Project Overview" />
          <p
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: 'clamp(20px, 2.2vw, 32px)',
              fontWeight: 400,
              color: '#F0EAE0',
              lineHeight: 1.6,
              marginTop: '1.5rem',
            }}
          >
            {project.description}
          </p>
        </FadeUp>

        <div ref={scopeRef}>
          <SectionTag label="Scope of Work" />
          <ul
            style={{
              listStyle: 'none',
              padding: 0,
              margin: '1.5rem 0 0',
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
            }}
          >
            {project.scope.map((item, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -24 }}
                animate={scopeVisible ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.13, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  borderBottom: '1px solid rgba(212,146,42,0.08)',
                  paddingBottom: '1rem',
                }}
              >
                <span
                  style={{
                    fontFamily: "'Cormorant Garamond', Georgia, serif",
                    fontSize: '11px',
                    color: '#D4922A',
                    opacity: 0.6,
                    minWidth: '28px',
                  }}
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span
                  style={{
                    fontFamily: "'Montserrat', sans-serif",
                    fontSize: 'clamp(12px, 1.1vw, 14px)',
                    color: 'rgba(240,234,224,0.8)',
                    letterSpacing: '0.04em',
                  }}
                >
                  {item}
                </span>
              </motion.li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── Gallery ───────────────────────────────────────────────────── */}
      <section style={{ padding: '0 7vw 100px', background: '#050507' }}>
        <FadeUp>
          <SectionTag label="Gallery" />
        </FadeUp>
        <FadeUp delay={0.05}>
          <p
            style={{
              fontFamily: "'Montserrat', sans-serif",
              fontSize: '12px',
              letterSpacing: '0.08em',
              color: 'rgba(240,234,224,0.48)',
              margin: '1rem 0 0',
              textTransform: 'uppercase',
            }}
          >
            Open any image for fullscreen viewing
          </p>
        </FadeUp>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '1rem',
            marginTop: '2rem',
          }}
        >
          {galleryImages.map((image, i) => (
            <FadeUp key={image} delay={i * 0.1}>
              <button
                type="button"
                onClick={() => setLightboxIndex(i)}
                style={{
                  aspectRatio: i % 3 === 0 ? '4/3' : '3/4',
                  background:
                    'linear-gradient(135deg, #1a1c24 0%, #1e2840 55%, #0d0d10 100%)',
                  position: 'relative',
                  overflow: 'hidden',
                  border: '1px solid rgba(212,146,42,0.08)',
                  padding: 0,
                  cursor: 'pointer',
                  textAlign: 'left',
                }}
              >
                <img
                  src={image}
                  alt={`${project.name} view ${i + 1}`}
                  style={{
                    position: 'absolute',
                    inset: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: `linear-gradient(180deg, rgba(5,5,7,0.04) 0%, rgba(5,5,7,0.5) 100%), radial-gradient(ellipse at ${i % 3 === 0 ? '30% 60%' : i % 3 === 1 ? '70% 30%' : '50% 50%'}, rgba(212,146,42,0.1) 0%, transparent 65%)`,
                  }}
                />
                <div
                  style={{
                    position: 'absolute',
                    bottom: '1rem',
                    left: '1rem',
                    fontFamily: "'Montserrat', sans-serif",
                    fontSize: '9px',
                    letterSpacing: '0.2em',
                    color: 'rgba(240,234,224,0.2)',
                    textTransform: 'uppercase',
                  }}
                >
                  {project.name} · Image {i + 1}
                </div>
              </button>
            </FadeUp>
          ))}
        </div>
      </section>

      {/* ── Next project ─────────────────────────────────────────────── */}
      <section
        style={{
          padding: '80px 7vw',
          background: '#0d0d10',
          borderTop: '1px solid rgba(212,146,42,0.08)',
        }}
      >
        <FadeUp>
          <div
            style={{
              fontFamily: "'Montserrat', sans-serif",
              fontSize: '10px',
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
              color: 'rgba(240,234,224,0.3)',
              marginBottom: '2rem',
            }}
          >
            Next Project
          </div>
          <Link
            to={`/projects/${nextProject.slug}`}
            style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '2rem' }}
          >
            {/* Mini thumbnail */}
            <div
              style={{
                width: '120px',
                height: '80px',
                background: 'linear-gradient(145deg, #1a1c24 0%, #1e2840 70%, #0d0d10 100%)',
                flexShrink: 0,
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <img
                src={nextProject.image}
                alt={nextProject.name}
                onError={(e) => { e.target.style.display = 'none'; }}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
            <div>
              <div
                style={{
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  fontSize: 'clamp(22px, 2.5vw, 36px)',
                  fontWeight: 400,
                  color: '#F0EAE0',
                  transition: 'color 0.25s ease',
                  marginBottom: '0.25rem',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#D4922A')}
                onMouseLeave={(e) => (e.currentTarget.style.color = '#F0EAE0')}
              >
                {nextProject.name} →
              </div>
              <div
                style={{
                  fontFamily: "'Montserrat', sans-serif",
                  fontSize: '11px',
                  color: 'rgba(240,234,224,0.4)',
                  letterSpacing: '0.06em',
                }}
              >
                {nextProject.location} · {nextProject.category}
              </div>
            </div>
          </Link>
        </FadeUp>
      </section>

      <AnimatePresence>
        {isLightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setLightboxIndex(null)}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 120,
              background: 'rgba(5,5,7,0.94)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '5vh 4vw',
            }}
          >
            <button
              type="button"
              onClick={() => setLightboxIndex(null)}
              style={{
                position: 'absolute',
                top: '24px',
                right: '24px',
                border: '1px solid rgba(212,146,42,0.3)',
                background: 'rgba(13,13,16,0.65)',
                color: '#F0EAE0',
                width: '44px',
                height: '44px',
                cursor: 'pointer',
                fontSize: '18px',
              }}
            >
              ×
            </button>

            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                setLightboxIndex((current) => (current - 1 + galleryImages.length) % galleryImages.length);
              }}
              style={{
                position: 'absolute',
                left: '24px',
                top: '50%',
                transform: 'translateY(-50%)',
                border: '1px solid rgba(212,146,42,0.3)',
                background: 'rgba(13,13,16,0.65)',
                color: '#F0EAE0',
                width: '52px',
                height: '52px',
                cursor: 'pointer',
                fontSize: '22px',
              }}
            >
              ←
            </button>

            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                setLightboxIndex((current) => (current + 1) % galleryImages.length);
              }}
              style={{
                position: 'absolute',
                right: '24px',
                top: '50%',
                transform: 'translateY(-50%)',
                border: '1px solid rgba(212,146,42,0.3)',
                background: 'rgba(13,13,16,0.65)',
                color: '#F0EAE0',
                width: '52px',
                height: '52px',
                cursor: 'pointer',
                fontSize: '22px',
              }}
            >
              →
            </button>

            <motion.div
              key={galleryImages[lightboxIndex]}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 16 }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              onClick={(event) => event.stopPropagation()}
              style={{
                width: 'min(1100px, 100%)',
                maxHeight: '100%',
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
              }}
            >
              <div
                style={{
                  position: 'relative',
                  flex: 1,
                  minHeight: '50vh',
                  background: '#0d0d10',
                  overflow: 'hidden',
                  border: '1px solid rgba(212,146,42,0.12)',
                }}
              >
                <img
                  src={galleryImages[lightboxIndex]}
                  alt={`${project.name} lightbox view ${lightboxIndex + 1}`}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain',
                    display: 'block',
                  }}
                />
              </div>

              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  gap: '1rem',
                  color: '#F0EAE0',
                }}
              >
                <div>
                  <div
                    style={{
                      fontFamily: "'Cormorant Garamond', Georgia, serif",
                      fontSize: '28px',
                      color: '#F0EAE0',
                    }}
                  >
                    {project.name}
                  </div>
                  <div
                    style={{
                      fontFamily: "'Montserrat', sans-serif",
                      fontSize: '11px',
                      letterSpacing: '0.2em',
                      textTransform: 'uppercase',
                      color: 'rgba(240,234,224,0.55)',
                    }}
                  >
                    Image {lightboxIndex + 1} of {galleryImages.length}
                  </div>
                </div>

                <div
                  style={{
                    display: 'flex',
                    gap: '0.5rem',
                    overflowX: 'auto',
                    paddingBottom: '0.25rem',
                  }}
                >
                  {galleryImages.map((image, imageIndex) => (
                    <button
                      key={image}
                      type="button"
                      onClick={() => setLightboxIndex(imageIndex)}
                      style={{
                        width: '72px',
                        height: '56px',
                        padding: 0,
                        border: imageIndex === lightboxIndex
                          ? '1px solid #D4922A'
                          : '1px solid rgba(212,146,42,0.12)',
                        overflow: 'hidden',
                        background: '#0d0d10',
                        cursor: 'pointer',
                        flexShrink: 0,
                      }}
                    >
                      <img
                        src={image}
                        alt={`${project.name} thumbnail ${imageIndex + 1}`}
                        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                      />
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ProjectDetail;
