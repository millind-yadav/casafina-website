import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import useStore from '../../store/useStore';
import SectionTag from '../shared/SectionTag';
import { projects } from '../../data/projects';

function ProjectCard({ project, index }) {
  const [hovered, setHovered] = useState(false);

  return (
    <Link
      to={`/projects/${project.slug}`}
      style={{ textDecoration: 'none', flexShrink: 0 }}
    >
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          width: 340,
          height: 420,
          position: 'relative',
          overflow: 'hidden',
          background: '#1a1c24',
        }}
      >
        {/* Background image */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `url(${project.image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            transform: hovered ? 'scale(1.08)' : 'scale(1)',
            transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        />
        {/* Gradient overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: hovered
              ? 'linear-gradient(to top, rgba(5,5,7,0.95) 0%, rgba(5,5,7,0.6) 50%, transparent 100%)'
              : 'linear-gradient(to top, rgba(5,5,7,0.85) 0%, rgba(5,5,7,0.35) 60%, transparent 100%)',
            transition: 'background 0.4s',
          }}
        />
        {/* Content */}
        <div style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          padding: '1.5rem',
        }}>
          <div style={{
            fontFamily: "'Montserrat', sans-serif",
            fontSize: '9px',
            letterSpacing: '0.3em',
            color: '#D4922A',
            marginBottom: '0.5rem',
          }}>
            {String(index + 1).padStart(2, '0')}
          </div>
          <div style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: '22px',
            color: '#F0EAE0',
            lineHeight: 1.2,
            marginBottom: '0.3rem',
          }}>
            {project.name}
          </div>
          <div style={{
            fontFamily: "'Montserrat', sans-serif",
            fontSize: '10px',
            letterSpacing: '0.15em',
            color: 'rgba(240,234,224,0.5)',
          }}>
            {project.location}
          </div>
        </div>
      </div>
    </Link>
  );
}

function ProjectsSection() {
  const currentSection = useStore((s) => s.currentSection);
  const visible = currentSection === 3;

  const trackRef   = useRef(null);
  const dragRef    = useRef({ isDown: false, startX: 0, scrollLeft: 0 });

  const onMouseDown = (e) => {
    const el = trackRef.current;
    dragRef.current = { isDown: true, startX: e.pageX - el.offsetLeft, scrollLeft: el.scrollLeft };
    el.style.cursor = 'grabbing';
  };
  const onMouseLeave = () => {
    dragRef.current.isDown = false;
    if (trackRef.current) trackRef.current.style.cursor = 'grab';
  };
  const onMouseUp = () => {
    dragRef.current.isDown = false;
    if (trackRef.current) trackRef.current.style.cursor = 'grab';
  };
  const onMouseMove = (e) => {
    if (!dragRef.current.isDown) return;
    e.preventDefault();
    const el   = trackRef.current;
    const x    = e.pageX - el.offsetLeft;
    const walk = (x - dragRef.current.startX) * 1.5;
    el.scrollLeft = dragRef.current.scrollLeft - walk;
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.section
          key="projects"
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
            padding: '0 0 6vh',
          }}
        >
          {/* Header row */}
          <div style={{
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            padding: '0 7vw 1.5rem',
          }}>
            <div>
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05, duration: 0.6 }}
              >
                <SectionTag>Portfolio</SectionTag>
              </motion.div>
              <motion.h2
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  fontSize: 'clamp(28px, 3vw, 48px)',
                  fontWeight: 400,
                  color: '#F0EAE0',
                  marginTop: '0.6rem',
                }}
              >
                Featured{' '}
                <span style={{ fontStyle: 'italic', color: '#D4922A' }}>Projects</span>
              </motion.h2>
            </div>
            <Link
              to="/projects"
              style={{
                fontFamily: "'Montserrat', sans-serif",
                fontSize: '10px',
                letterSpacing: '0.25em',
                textTransform: 'uppercase',
                color: '#D4922A',
                textDecoration: 'none',
                borderBottom: '1px solid rgba(212,146,42,0.4)',
                paddingBottom: '2px',
              }}
            >
              View All →
            </Link>
          </div>

          {/* Drag-scroll track */}
          <div
            ref={trackRef}
            onMouseDown={onMouseDown}
            onMouseLeave={onMouseLeave}
            onMouseUp={onMouseUp}
            onMouseMove={onMouseMove}
            style={{
              display: 'flex',
              gap: '1px',
              overflowX: 'auto',
              paddingLeft: '7vw',
              paddingRight: '7vw',
              cursor: 'grab',
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              userSelect: 'none',
            }}
          >
            {projects.map((project, i) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.07, duration: 0.6 }}
              >
                <ProjectCard project={project} index={i} />
              </motion.div>
            ))}
          </div>
        </motion.section>
      )}
    </AnimatePresence>
  );
}

export default ProjectsSection;
