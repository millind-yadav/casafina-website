import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import Button from '../components/shared/Button';

const NotFound = () => {
  return (
    <>
      <Helmet>
        <title>404 — Page Not Found — Casafina Construction</title>
        <meta name="description" content="The page you're looking for doesn't exist. Return to Casafina Construction." />
      </Helmet>

      <section
        style={{
          minHeight: '100vh',
          background: '#050507',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          padding: '120px 7vw',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Radial glow */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'radial-gradient(ellipse at 50% 60%, rgba(212,146,42,0.07) 0%, transparent 65%)',
            pointerEvents: 'none',
          }}
        />

        {/* Decorative 404 */}
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: 'clamp(140px, 22vw, 280px)',
            fontWeight: 700,
            color: '#F0EAE0',
            opacity: 0.04,
            lineHeight: 1,
            userSelect: 'none',
            pointerEvents: 'none',
            whiteSpace: 'nowrap',
          }}
        >
          404
        </div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem' }}
        >
          <div
            style={{
              fontFamily: "'Montserrat', sans-serif",
              fontSize: '10px',
              letterSpacing: '0.35em',
              textTransform: 'uppercase',
              color: '#D4922A',
              marginBottom: '0.5rem',
            }}
          >
            Error 404
          </div>

          <h1
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: 'clamp(34px, 5vw, 68px)',
              fontWeight: 400,
              color: '#F0EAE0',
              lineHeight: 1.15,
              margin: 0,
            }}
          >
            Page Not Found
          </h1>

          <p
            style={{
              fontFamily: "'Montserrat', sans-serif",
              fontSize: 'clamp(13px, 1.15vw, 15px)',
              color: 'rgba(240,234,224,0.45)',
              lineHeight: 1.85,
              maxWidth: '400px',
              margin: 0,
            }}
          >
            The page you&apos;re looking for doesn&apos;t exist or has been moved. Let&apos;s
            get you back on track.
          </p>

          <div style={{ marginTop: '0.5rem' }}>
            <Button to="/" variant="primary">Back to Home</Button>
          </div>

          {/* Decorative gold rule */}
          <div
            style={{
              width: '60px',
              height: '1px',
              background: 'linear-gradient(90deg, transparent, #D4922A, transparent)',
              marginTop: '0.5rem',
            }}
          />
        </motion.div>
      </section>
    </>
  );
};

export default NotFound;
