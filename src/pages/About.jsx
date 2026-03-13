import { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform, animate } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import SectionTag from '../components/shared/SectionTag';
import Button from '../components/shared/Button';
import useInView from '../hooks/useInView';
import { team } from '../data/team';
import { assetPath } from '../utils/assetPath';

/* ─── Reusable fade-up wrapper ─────────────────────────────────────── */
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

/* ─── Count-up number ───────────────────────────────────────────────── */
function CountUp({ to, suffix = '', isVisible }) {
  const mv  = useMotionValue(0);
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!isVisible) return;
    const ctrl = animate(mv, to, { duration: 1.8, ease: 'easeOut' });
    const unsub = mv.on('change', (v) => setDisplay(Math.round(v)));
    return () => { ctrl.stop(); unsub(); };
  }, [isVisible, to, mv]);

  return (
    <span>
      {display}
      <sup style={{ fontSize: '0.45em', color: '#D4922A', verticalAlign: 'super' }}>{suffix}</sup>
    </span>
  );
}

/* ─── Stat item ─────────────────────────────────────────────────────── */
function Stat({ number, suffix, label, isVisible, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={isVisible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
      style={{ textAlign: 'center' }}
    >
      <div style={{
        fontFamily: "'Cormorant Garamond', Georgia, serif",
        fontSize: 'clamp(44px, 5vw, 72px)',
        fontWeight: 400,
        color: '#F0EAE0',
        lineHeight: 1,
        marginBottom: '0.5rem',
      }}>
        <CountUp to={number} suffix={suffix} isVisible={isVisible} />
      </div>
      <div style={{
        fontFamily: "'Montserrat', sans-serif",
        fontSize: '10px',
        letterSpacing: '0.3em',
        textTransform: 'uppercase',
        color: 'rgba(240,234,224,0.5)',
      }}>
        {label}
      </div>
    </motion.div>
  );
}

/* ─── Value card ────────────────────────────────────────────────────── */
const VALUES = [
  {
    icon: '◈',
    title: 'Trust & Integrity',
    desc: 'We build long-term relationships through honest communication, dependable delivery, and a process our clients can trust.',
  },
  {
    icon: '◇',
    title: 'Safety on Site',
    desc: 'Safety remains central to every stage of our work, guiding how we plan, supervise, and execute each project.',
  },
  {
    icon: '⬡',
    title: 'Client Satisfaction',
    desc: 'Our goal is to deliver high-quality, timely, value-added projects that consistently meet and surpass client expectations.',
  },
];

function ValueCard({ value, delay }) {
  const [hovered, setHovered] = useState(false);
  return (
    <FadeUp delay={delay}>
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          background: '#0d0d10',
          border: '1px solid rgba(212,146,42,0.1)',
          borderTop: hovered ? '1px solid #D4922A' : '1px solid rgba(212,146,42,0.1)',
          padding: '2rem',
          transform: hovered ? 'translateY(-6px)' : 'translateY(0)',
          transition: 'transform 0.35s ease, border-color 0.35s ease',
        }}
      >
        <div style={{
          fontSize: '24px',
          color: '#D4922A',
          marginBottom: '1rem',
          fontStyle: 'normal',
        }}>
          {value.icon}
        </div>
        <div style={{
          fontFamily: "'Cormorant Garamond', Georgia, serif",
          fontSize: '22px',
          color: '#F0EAE0',
          marginBottom: '0.75rem',
          lineHeight: 1.25,
        }}>
          {value.title}
        </div>
        <div style={{
          fontFamily: "'Montserrat', sans-serif",
          fontSize: '12px',
          lineHeight: 1.8,
          color: 'rgba(240,234,224,0.55)',
        }}>
          {value.desc}
        </div>
      </div>
    </FadeUp>
  );
}

/* ─── Team card ─────────────────────────────────────────────────────── */
function TeamCard({ member, delay }) {
  return (
    <FadeUp delay={delay}>
      <div style={{ textAlign: 'center' }}>
        {/* Circular image / placeholder */}
        <div style={{
          width: 160,
          height: 160,
          borderRadius: '50%',
          margin: '0 auto 1.25rem',
          background: '#1a1c24',
          border: '1px solid rgba(212,146,42,0.25)',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <img
            src={member.image}
            alt={member.name}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            onError={(e) => { e.currentTarget.style.display = 'none'; }}
          />
        </div>
        <div style={{
          fontFamily: "'Cormorant Garamond', Georgia, serif",
          fontSize: '22px',
          color: '#F0EAE0',
          marginBottom: '4px',
        }}>
          {member.name}
        </div>
        <div style={{
          fontFamily: "'Montserrat', sans-serif",
          fontSize: '10px',
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          color: '#D4922A',
          marginBottom: '0.75rem',
        }}>
          {member.title}
        </div>
        {/* LinkedIn icon */}
        <a
          href={`https://linkedin.com`}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 32,
            height: 32,
            border: '1px solid rgba(212,146,42,0.3)',
            color: '#D4922A',
            fontSize: '13px',
            textDecoration: 'none',
            transition: 'background 0.3s, border-color 0.3s',
          }}
        >
          in
        </a>
      </div>
    </FadeUp>
  );
}

/* ─── Page ───────────────────────────────────────────────────────────── */
function About() {
  const { ref: statsRef, isVisible: statsVisible } = useInView(0.3);

  return (
    <>
      <Helmet>
        <title>About Us — Casafina Construction</title>
        <meta name="description" content="Learn about Casafina Construction: our story, values, team and mission to build exceptional spaces across Lagos." />
        <meta property="og:title" content="About Us — Casafina Construction" />
        <meta property="og:description" content="Learn about Casafina Construction: our story, values, team and mission to build exceptional spaces across Lagos." />
      </Helmet>

      <div style={{ background: '#050507', minHeight: '100vh', paddingTop: 120 }}>

        {/* ── 1. PAGE HERO ─────────────────────────────────────────── */}
        <section style={{
          minHeight: '60vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '0 7vw',
          background: 'radial-gradient(ellipse 70% 60% at 40% 60%, rgba(212,146,42,0.07) 0%, transparent 70%)',
        }}>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <SectionTag>About Us</SectionTag>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: 'clamp(42px, 6vw, 90px)',
              fontWeight: 400,
              color: '#F0EAE0',
              lineHeight: 1.08,
              margin: '1rem 0 1.25rem',
              maxWidth: 780,
            }}
          >
            We Are More Than{' '}
            <span style={{ fontStyle: 'italic', color: '#D4922A' }}>Just Builders</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35 }}
            style={{
              fontFamily: "'Montserrat', sans-serif",
              fontSize: '14px',
              lineHeight: 1.85,
              color: 'rgba(240,234,224,0.6)',
              maxWidth: 520,
            }}
          >
            Casafina Construction Company Limited is a wholly owned subsidiary of Casafina Group, created to deliver superior craftsmanship and dependable construction service across Nigeria.
          </motion.p>
        </section>

        {/* ── 2. STORY SECTION ─────────────────────────────────────── */}
        <section style={{ padding: '120px 7vw' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '5vw',
            alignItems: 'center',
          }}>
            {/* Left */}
            <div>
              <FadeUp delay={0}>
                <SectionTag>Our Story</SectionTag>
              </FadeUp>
              <FadeUp delay={0.1}>
                <h2 style={{
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  fontSize: 'clamp(32px, 3.5vw, 52px)',
                  fontWeight: 400,
                  color: '#F0EAE0',
                  margin: '1rem 0 1.25rem',
                  lineHeight: 1.12,
                }}>
                  Built on Craft,{' '}
                  <span style={{ fontStyle: 'italic', color: '#D4922A' }}>Driven by Purpose</span>
                </h2>
              </FadeUp>
              <FadeUp delay={0.12}>
                <div style={{ width: 60, height: 1, background: '#D4922A', margin: '0 0 1.5rem' }} />
              </FadeUp>
              {[
                'Casafina Construction Company Limited is a wholly owned subsidiary of Casafina Group, a privately held Africa-originated and globally focused finance and alternative asset management company.',
                'We were created to provide the highest level of service in the construction industry while offering superior craftsmanship on every project we handle, becoming the preferred choice for quality and timely value-added delivery for subsidiary companies and other clients.',
                'Within a short span of existence, we have completed many prestigious real estate and commercial projects, supported by brilliant ideas, precise builders, professional specialists, and dependable client support.',
              ].map((para, i) => (
                <FadeUp key={i} delay={0.15 + i * 0.08}>
                  <p style={{
                    fontFamily: "'Montserrat', sans-serif",
                    fontSize: '13px',
                    lineHeight: 1.9,
                    color: 'rgba(240,234,224,0.6)',
                    marginBottom: '1rem',
                  }}>
                    {para}
                  </p>
                </FadeUp>
              ))}
            </div>

            {/* Right: image with offset gold border */}
            <FadeUp delay={0.2}>
              <div style={{ position: 'relative', display: 'inline-block', width: '100%' }}>
                {/* Gold border offset frame */}
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  border: '1px solid rgba(212,146,42,0.5)',
                  transform: 'translate(20px, 20px)',
                  pointerEvents: 'none',
                  zIndex: 0,
                }} />
                <div style={{
                  position: 'relative',
                  zIndex: 1,
                  width: '100%',
                  aspectRatio: '4/5',
                  background: '#1a1c24',
                  overflow: 'hidden',
                }}>
                  <img
                    src={assetPath('images/IMG_1483-1-scaled-q8ju3z3rd07fm25z2hugvoyjdgj9o4kkrlbkl0n2pc.jpg')}
                    alt="Casafina team at work"
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                    onError={(e) => {
                      e.currentTarget.parentElement.style.background =
                        'linear-gradient(135deg, #1a1c24 0%, #0d0d10 100%)';
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                </div>
              </div>
            </FadeUp>
          </div>
        </section>

        {/* ── 3. STATS BAR ─────────────────────────────────────────── */}
        <section
          ref={statsRef}
          style={{
            background: '#0d0d10',
            padding: '80px 7vw',
            borderTop: '1px solid rgba(212,146,42,0.08)',
            borderBottom: '1px solid rgba(212,146,42,0.08)',
          }}
        >
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '2rem',
          }}>
            <Stat number={50}  suffix="+" label="Projects Done"    isVisible={statsVisible} delay={0}    />
            <Stat number={7}   suffix="+" label="Years Experience"  isVisible={statsVisible} delay={0.1}  />
            <Stat number={4}   suffix=""  label="Core Services"     isVisible={statsVisible} delay={0.2}  />
            <Stat number={100} suffix="%" label="Client Satisfaction" isVisible={statsVisible} delay={0.3} />
          </div>
        </section>

        {/* ── 4. VALUES SECTION ────────────────────────────────────── */}
        <section style={{ padding: '120px 7vw' }}>
          <FadeUp>
            <SectionTag>Our Principles</SectionTag>
          </FadeUp>
          <FadeUp delay={0.1}>
            <h2 style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: 'clamp(30px, 3.5vw, 52px)',
              fontWeight: 400,
              color: '#F0EAE0',
              margin: '1rem 0 3rem',
              lineHeight: 1.12,
            }}>
              Our Core{' '}
              <span style={{ fontStyle: 'italic', color: '#D4922A' }}>Values</span>
            </h2>
          </FadeUp>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '1px',
          }}>
            {VALUES.map((v, i) => (
              <ValueCard key={v.title} value={v} delay={i * 0.1} />
            ))}
          </div>
        </section>

        {/* ── 5. TEAM SECTION ──────────────────────────────────────── */}
        <section style={{
          padding: '120px 7vw',
          background: '#0a0a0d',
          borderTop: '1px solid rgba(212,146,42,0.08)',
        }}>
          <FadeUp>
            <SectionTag>The People</SectionTag>
          </FadeUp>
          <FadeUp delay={0.1}>
            <h2 style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: 'clamp(30px, 3.5vw, 52px)',
              fontWeight: 400,
              color: '#F0EAE0',
              margin: '1rem 0 3rem',
              lineHeight: 1.12,
            }}>
              Our Leaders &{' '}
              <span style={{ fontStyle: 'italic', color: '#D4922A' }}>Technical Team</span>
            </h2>
          </FadeUp>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '3rem',
          }}>
            {team.map((member, i) => (
              <TeamCard key={member.id} member={member} delay={i * 0.1} />
            ))}
          </div>
        </section>

        {/* ── 6. CTA BANNER ────────────────────────────────────────── */}
        <section style={{
          padding: '120px 7vw',
          textAlign: 'center',
          background: 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(212,146,42,0.08) 0%, transparent 70%)',
          borderTop: '1px solid rgba(212,146,42,0.08)',
        }}>
          <FadeUp>
            <SectionTag style={{ justifyContent: 'center' }}>Work With Us</SectionTag>
          </FadeUp>
          <FadeUp delay={0.1}>
            <h2 style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: 'clamp(34px, 4vw, 62px)',
              fontWeight: 400,
              color: '#F0EAE0',
              margin: '1rem 0 1.25rem',
              lineHeight: 1.1,
            }}>
              We Provide the Best Service{' '}
              <span style={{ fontStyle: 'italic', color: '#D4922A' }}>in Industry</span>
            </h2>
          </FadeUp>
          <FadeUp delay={0.14}>
            <p style={{
              fontFamily: "'Montserrat', sans-serif",
              fontSize: '13px',
              lineHeight: 1.9,
              color: 'rgba(240,234,224,0.58)',
              maxWidth: 520,
              margin: '0 auto',
            }}>
              We are easy to reach and ready to hear from you about your next project. Click the button below to get started.
            </p>
          </FadeUp>
          <FadeUp delay={0.18}>
            <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', flexWrap: 'wrap', marginTop: '2rem' }}>
              <Button variant="primary" to="/contact">Contact Us Today</Button>
              <Button variant="ghost" to="/services">Learn More</Button>
            </div>
          </FadeUp>
        </section>

      </div>
    </>
  );
}

export default About;
