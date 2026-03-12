import { useState } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import SectionTag from '../components/shared/SectionTag';
import Button from '../components/shared/Button';
import useInView from '../hooks/useInView';
import { services } from '../data/services';

/* ─── Fade-up scroll reveal ─────────────────────────────────────────── */
function FadeUp({ children, delay = 0, style }) {
  const { ref, isVisible } = useInView(0.15);
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

/* ─── Alternating service block ─────────────────────────────────────── */
function ServiceBlock({ service, index }) {
  const isEven = index % 2 === 0;
  const { ref, isVisible } = useInView(0.12);

  return (
    <div
      ref={ref}
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: '6vw',
        padding: '100px 7vw',
        borderBottom: '1px solid rgba(212,146,42,0.07)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Faded background number */}
      <div
        style={{
          position: 'absolute',
          top: '16px',
          right: isEven ? '5vw' : 'auto',
          left: isEven ? 'auto' : '5vw',
          fontFamily: "'Cormorant Garamond', Georgia, serif",
          fontSize: '220px',
          fontWeight: 700,
          color: '#F0EAE0',
          opacity: 0.04,
          lineHeight: 1,
          userSelect: 'none',
          pointerEvents: 'none',
        }}
      >
        {service.number}
      </div>

      {/* Text content */}
      <motion.div
        initial={{ opacity: 0, x: isEven ? -44 : 44 }}
        animate={isVisible ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
        style={{ flex: 1, order: isEven ? 1 : 2, zIndex: 1 }}
      >
        <div
          style={{
            fontFamily: "'Montserrat', sans-serif",
            fontSize: '11px',
            color: '#D4922A',
            letterSpacing: '0.32em',
            textTransform: 'uppercase',
            marginBottom: '1rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.6rem',
          }}
        >
          <span style={{ fontSize: '1.5em' }}>{service.icon}</span>
          Service {service.number}
        </div>

        <h2
          style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: 'clamp(26px, 3.2vw, 46px)',
            fontWeight: 400,
            color: '#F0EAE0',
            lineHeight: 1.2,
            marginBottom: '1.25rem',
          }}
        >
          {service.title}
        </h2>

        <p
          style={{
            fontFamily: "'Montserrat', sans-serif",
            fontSize: 'clamp(13px, 1.15vw, 15px)',
            color: 'rgba(240,234,224,0.62)',
            lineHeight: 1.85,
            maxWidth: '480px',
            marginBottom: '2rem',
          }}
        >
          {service.description}
        </p>

        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.55rem' }}>
          {service.includes.map((item, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, x: -14 }}
              animate={isVisible ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 + i * 0.09, ease: [0.16, 1, 0.3, 1] }}
              style={{
                fontFamily: "'Montserrat', sans-serif",
                fontSize: 'clamp(11px, 1vw, 13px)',
                color: 'rgba(240,234,224,0.78)',
                letterSpacing: '0.06em',
                display: 'flex',
                alignItems: 'center',
                gap: '0.7rem',
              }}
            >
              <span style={{ color: '#D4922A', fontWeight: 700, flexShrink: 0 }}>—</span>
              {item}
            </motion.li>
          ))}
        </ul>
      </motion.div>

      {/* Image placeholder */}
      <motion.div
        initial={{ opacity: 0, x: isEven ? 44 : -44 }}
        animate={isVisible ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.85, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        style={{
          flex: 1,
          order: isEven ? 2 : 1,
          aspectRatio: '4/3',
          background: 'linear-gradient(135deg, #1a1c24 0%, #1e2840 55%, #0d0d10 100%)',
          position: 'relative',
          zIndex: 1,
          overflow: 'hidden',
        }}
      >
        <img
          src={service.image}
          alt={service.title}
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
            background: `linear-gradient(135deg, rgba(5,5,7,0.18) 0%, rgba(5,5,7,0.42) 100%), radial-gradient(ellipse at ${isEven ? '30% 40%' : '70% 60%'}, rgba(212,146,42,0.13) 0%, transparent 68%)`,
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: 'clamp(36px, 5vw, 72px)',
            opacity: 0.18,
            color: '#D4922A',
            userSelect: 'none',
          }}
        >
          {service.icon}
        </div>
        {/* Corner accent */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            width: '40px',
            height: '40px',
            borderLeft: '2px solid rgba(212,146,42,0.4)',
            borderBottom: '2px solid rgba(212,146,42,0.4)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            width: '40px',
            height: '40px',
            borderRight: '2px solid rgba(212,146,42,0.4)',
            borderTop: '2px solid rgba(212,146,42,0.4)',
          }}
        />
      </motion.div>
    </div>
  );
}

/* ─── Process timeline ──────────────────────────────────────────────── */
const STEPS = [
  { num: '01', title: 'Consultation',           desc: 'We define the project brief, goals, and the best delivery approach for your scope.' },
  { num: '02', title: 'Planning',               desc: 'Our team prepares technical direction, cost guidance, scheduling, and constructability reviews.' },
  { num: '03', title: 'Coordination',           desc: 'Design teams, vendors, and site stakeholders are aligned under one accountable process.' },
  { num: '04', title: 'Execution',              desc: 'Construction, procurement, and supervision progress with transparent reporting and quality control.' },
  { num: '05', title: 'Completion',             desc: 'Final delivery is managed for quality, schedule, and long-term client satisfaction.' },
];

function ProcessTimeline() {
  const { ref, isVisible } = useInView(0.2);

  return (
    <section style={{ padding: '120px 7vw', background: '#050507' }}>
      <FadeUp>
        <SectionTag label="Our Process" />
      </FadeUp>
      <FadeUp delay={0.1}>
        <h2
          style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: 'clamp(30px, 3.8vw, 54px)',
            fontWeight: 400,
            color: '#F0EAE0',
            marginTop: '1rem',
            marginBottom: '80px',
            maxWidth: '420px',
          }}
        >
          How We Work
        </h2>
      </FadeUp>

      <div ref={ref} style={{ position: 'relative' }}>
        {/* Base connector line */}
        <div
          style={{
            position: 'absolute',
            top: '27px',
            left: 'calc(10% + 27px)',
            right: 'calc(10% + 27px)',
            height: '1px',
            background: 'rgba(212,146,42,0.15)',
          }}
        />
        {/* Animated gold fill */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={isVisible ? { scaleX: 1 } : {}}
          transition={{ duration: 1.5, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          style={{
            position: 'absolute',
            top: '27px',
            left: 'calc(10% + 27px)',
            right: 'calc(10% + 27px)',
            height: '1px',
            background: 'linear-gradient(90deg, #D4922A 0%, #F0B842 100%)',
            transformOrigin: 'left center',
          }}
        />

        {/* Steps */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            rowGap: '48px',
          }}
        >
          {STEPS.map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 26 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.65, delay: 0.25 + i * 0.2, ease: [0.16, 1, 0.3, 1] }}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                width: 'calc(20% - 1vw)',
                minWidth: '130px',
              }}
            >
              <div
                style={{
                  width: '54px',
                  height: '54px',
                  borderRadius: '50%',
                  border: '1px solid #D4922A',
                  background: '#050507',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  fontSize: '16px',
                  color: '#D4922A',
                  marginBottom: '1.25rem',
                  position: 'relative',
                  zIndex: 1,
                  flexShrink: 0,
                }}
              >
                {step.num}
              </div>
              <div
                style={{
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  fontSize: 'clamp(15px, 1.4vw, 19px)',
                  fontWeight: 400,
                  color: '#F0EAE0',
                  marginBottom: '0.5rem',
                }}
              >
                {step.title}
              </div>
              <div
                style={{
                  fontFamily: "'Montserrat', sans-serif",
                  fontSize: '11px',
                  color: 'rgba(240,234,224,0.42)',
                  lineHeight: 1.65,
                  letterSpacing: '0.02em',
                }}
              >
                {step.desc}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Why Choose Us ─────────────────────────────────────────────────── */
const WHY = [
  { icon: '🏆', title: 'Quality Service Delivery', text: 'We take on every project with one goal in mind, ensuring that our clients are satisfied and their expectations are met and even surpassed.' },
  { icon: '✏️', title: 'Unique Designs',           text: 'Originality is a keyword for us, which is why we put the utmost value on creativity and excellence when it comes to our designs.' },
  { icon: '💡', title: 'Cost-Effective Solutions', text: 'Understanding how to maximize quality while optimizing cost is a key feature of our process, and we always work to give you the best value for your money.' },
  { icon: '🤝', title: 'Quality Support',          text: 'Right from the start of your project till we reach the finish line, we are always there to guide you through the process and answer your questions.' },
  { icon: '🧭', title: 'Integrity & Transparency', text: 'Our word is our bond, and we maintain a transparent process that keeps pre- and post-project transition seamless.' },
  { icon: '🛠', title: 'Solution Oriented',        text: 'We focus our energy and intellect on creating positive outcomes, staying flexible and prepared for any challenge.' },
];

function WhyCard({ item, delay }) {
  const [hovered, setHovered] = useState(false);
  return (
    <FadeUp delay={delay}>
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          background: '#13131a',
          border: '1px solid rgba(212,146,42,0.1)',
          borderTop: hovered ? '1px solid #D4922A' : '1px solid rgba(212,146,42,0.1)',
          padding: '2rem',
          transform: hovered ? 'translateY(-6px)' : 'translateY(0)',
          transition: 'transform 0.35s ease, border-color 0.35s ease',
          height: '100%',
          boxSizing: 'border-box',
        }}
      >
        <div style={{ fontSize: '26px', marginBottom: '1rem' }}>{item.icon}</div>
        <div
          style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: 'clamp(17px, 1.5vw, 21px)',
            color: '#F0EAE0',
            marginBottom: '0.5rem',
          }}
        >
          {item.title}
        </div>
        <div
          style={{
            fontFamily: "'Montserrat', sans-serif",
            fontSize: '12px',
            color: 'rgba(240,234,224,0.48)',
            lineHeight: 1.75,
            letterSpacing: '0.02em',
          }}
        >
          {item.text}
        </div>
      </div>
    </FadeUp>
  );
}

/* ─── Page ──────────────────────────────────────────────────────────── */
const Services = () => {
  return (
    <>
      <Helmet>
        <title>Services — Casafina Construction</title>
        <meta
          name="description"
          content="Discover Casafina Construction services, from project conceptualization and construction management to procurement of materials and engineering design and construction."
        />
        <meta property="og:title" content="Services — Casafina Construction" />
        <meta property="og:description" content="Discover Casafina Construction services, from project conceptualization and construction management to procurement of materials and engineering design and construction." />
      </Helmet>

      {/* ── Hero ──────────────────────────────────────────────── */}
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
              'radial-gradient(ellipse at 80% 50%, rgba(212,146,42,0.07) 0%, transparent 65%)',
            pointerEvents: 'none',
          }}
        />
        <div style={{ position: 'relative', zIndex: 1, maxWidth: '700px' }}>
          <FadeUp>
            <SectionTag label="Our Services" />
          </FadeUp>
          <FadeUp delay={0.12}>
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
              Everything You Need,
              <br />
              <em style={{ color: '#D4922A', fontStyle: 'italic' }}>From Concept to Completion</em>
            </h1>
          </FadeUp>
          <FadeUp delay={0.22}>
            <p
              style={{
                fontFamily: "'Montserrat', sans-serif",
                fontSize: 'clamp(13px, 1.25vw, 15px)',
                color: 'rgba(240,234,224,0.58)',
                lineHeight: 1.85,
                maxWidth: '520px',
              }}
            >
              We are a team of brilliant, experienced, and hardworking professionals committed
              to delivering the highest standard of quality on all projects we embark on. From
              start to finish our process is transparent, reliable, and cost-effective.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* ── Service detail blocks ──────────────────────────────── */}
      <section style={{ background: '#050507' }}>
        {services.map((service, i) => (
          <ServiceBlock key={service.id} service={service} index={i} />
        ))}
      </section>

      {/* ── Process timeline ───────────────────────────────────── */}
      <ProcessTimeline />

      {/* ── Why choose us ─────────────────────────────────────── */}
      <section style={{ padding: '100px 7vw', background: '#0d0d10' }}>
        <FadeUp>
          <SectionTag label="Why Casafina" />
        </FadeUp>
        <FadeUp delay={0.1}>
          <h2
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: 'clamp(28px, 3.5vw, 52px)',
              fontWeight: 400,
              color: '#F0EAE0',
              marginTop: '1rem',
              marginBottom: '3rem',
            }}
          >
            Why Choose Us
          </h2>
        </FadeUp>
        <FadeUp delay={0.14}>
          <p
            style={{
              fontFamily: "'Montserrat', sans-serif",
              fontSize: '13px',
              lineHeight: 1.85,
              color: 'rgba(240,234,224,0.56)',
              maxWidth: '620px',
              marginBottom: '2.5rem',
            }}
          >
            When it comes to construction, quality, timeliness, and reliability are key, and at Casafina Construction Company Limited, we offer not just the best, but the safest and most reliable construction solutions you can get.
          </p>
        </FadeUp>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '1.5rem',
          }}
        >
          {WHY.map((item, i) => (
            <WhyCard key={item.title} item={item} delay={i * 0.08} />
          ))}
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────── */}
      <section
        style={{
          padding: '120px 7vw',
          background: '#050507',
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
              'radial-gradient(ellipse at 50% 60%, rgba(212,146,42,0.09) 0%, transparent 65%)',
            pointerEvents: 'none',
          }}
        />
        <FadeUp style={{ position: 'relative', zIndex: 1 }}>
          <SectionTag label="Get Started" />
        </FadeUp>
        <FadeUp delay={0.1} style={{ position: 'relative', zIndex: 1 }}>
          <h2
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: 'clamp(30px, 4vw, 60px)',
              fontWeight: 400,
              color: '#F0EAE0',
              marginTop: '1.5rem',
              marginBottom: '1rem',
            }}
          >
            Start Your Project Today
          </h2>
        </FadeUp>
        <FadeUp delay={0.2} style={{ marginBottom: '2.5rem', position: 'relative', zIndex: 1 }}>
          <p
            style={{
              fontFamily: "'Montserrat', sans-serif",
              fontSize: 'clamp(13px, 1.2vw, 15px)',
              color: 'rgba(240,234,224,0.52)',
              lineHeight: 1.85,
              maxWidth: '460px',
            }}
          >
            Tell us about your project and we will get back to you within 24 hours with a tailored
            proposal.
          </p>
        </FadeUp>
        <FadeUp delay={0.28} style={{ position: 'relative', zIndex: 1 }}>
          <Button to="/quote" variant="primary">
            Request a Free Quote
          </Button>
        </FadeUp>
      </section>
    </>
  );
};

export default Services;
