import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import SectionTag from '../components/shared/SectionTag';
import useInView from '../hooks/useInView';

/* ─── Fade-up ───────────────────────────────────────────────────────── */
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

/* ─── Shared input styles ───────────────────────────────────────────── */
const inputBase = {
  width: '100%',
  background: '#0d0d10',
  border: '1px solid rgba(212,146,42,0.18)',
  color: '#F0EAE0',
  fontFamily: "'Montserrat', sans-serif",
  fontSize: '13px',
  padding: '0.85rem 1rem',
  outline: 'none',
  boxSizing: 'border-box',
  transition: 'border-color 0.25s ease',
};

function Field({ label, error, children }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
      <label
        style={{
          fontFamily: "'Montserrat', sans-serif",
          fontSize: '10px',
          letterSpacing: '0.22em',
          textTransform: 'uppercase',
          color: 'rgba(240,234,224,0.45)',
        }}
      >
        {label}
      </label>
      {children}
      {error && (
        <span
          style={{
            fontFamily: "'Montserrat', sans-serif",
            fontSize: '11px',
            color: '#e05252',
            letterSpacing: '0.04em',
          }}
        >
          {error}
        </span>
      )}
    </div>
  );
}

/* ─── Contact info item ─────────────────────────────────────────────── */
function InfoItem({ icon, label, children }) {
  return (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
      <span
        style={{
          color: '#D4922A',
          fontSize: '16px',
          marginTop: '2px',
          flexShrink: 0,
          width: '22px',
          textAlign: 'center',
        }}
      >
        {icon}
      </span>
      <div>
        <div
          style={{
            fontFamily: "'Montserrat', sans-serif",
            fontSize: '9px',
            letterSpacing: '0.28em',
            textTransform: 'uppercase',
            color: '#D4922A',
            marginBottom: '0.3rem',
          }}
        >
          {label}
        </div>
        <div
          style={{
            fontFamily: "'Montserrat', sans-serif",
            fontSize: '13px',
            color: 'rgba(240,234,224,0.72)',
            lineHeight: 1.7,
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}

/* ─── Page ──────────────────────────────────────────────────────────── */
const Contact = () => {
  const [submitted, setSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    // TODO: wire up to backend / email service
    await new Promise((r) => setTimeout(r, 800));
    setSubmitted(true);
    reset();
  };

  const focusStyle = (hasError) => ({
    ...inputBase,
    borderColor: hasError ? '#e05252' : 'rgba(212,146,42,0.18)',
  });

  return (
    <>
      <Helmet>
        <title>Contact — Casafina Construction</title>
        <meta
          name="description"
          content="Get in touch with Casafina Construction Co. Ltd. Call, email, or send us a message."
        />
        <meta property="og:title" content="Contact — Casafina Construction" />
        <meta property="og:description" content="Get in touch with Casafina Construction Co. Ltd. Call, email, or send us a message." />
      </Helmet>

      {/* ── Hero ───────────────────────────────────────────────────────── */}
      <section
        style={{
          minHeight: '50vh',
          background: '#050507',
          display: 'flex',
          alignItems: 'center',
          padding: '160px 7vw 80px',
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
        <div style={{ position: 'relative', zIndex: 1, maxWidth: '640px' }}>
          <FadeUp>
            <SectionTag label="Contact Us" />
          </FadeUp>
          <FadeUp delay={0.1}>
            <h1
              style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: 'clamp(38px, 5.5vw, 76px)',
                fontWeight: 400,
                color: '#F0EAE0',
                lineHeight: 1.1,
                marginTop: '1.5rem',
                marginBottom: '1.5rem',
              }}
            >
              Get In Touch
            </h1>
          </FadeUp>
          <FadeUp delay={0.2}>
            <p
              style={{
                fontFamily: "'Montserrat', sans-serif",
                fontSize: 'clamp(13px, 1.2vw, 15px)',
                color: 'rgba(240,234,224,0.52)',
                lineHeight: 1.85,
                maxWidth: '460px',
              }}
            >
              We&apos;d love to hear from you. Reach out directly or send us a message and
              we&apos;ll respond within one business day.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* ── Two-column contact section ─────────────────────────────────── */}
      <section
        style={{
          padding: '80px 7vw 100px',
          background: '#050507',
          display: 'grid',
          gridTemplateColumns: '1fr 1.4fr',
          gap: '8vw',
          alignItems: 'start',
          borderTop: '1px solid rgba(212,146,42,0.07)',
        }}
      >
        {/* ── Left: info ── */}
        <FadeUp>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
            <div>
              <div
                style={{
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  fontSize: 'clamp(22px, 2.2vw, 32px)',
                  color: '#F0EAE0',
                  marginBottom: '2rem',
                }}
              >
                Our Office
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
                <InfoItem icon="📍" label="Address">
                  1B, Wing A, Opebi Link Road,
                  <br />
                  Oregun, Ikeja, Lagos, Nigeria
                </InfoItem>
                <InfoItem icon="📞" label="Phone">
                  <a
                    href="tel:+2349080702006"
                    style={{ color: 'inherit', textDecoration: 'none' }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = '#D4922A')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(240,234,224,0.72)')}
                  >
                    +234 908 070 2006
                  </a>
                  <br />
                  <a
                    href="tel:+2349096106213"
                    style={{ color: 'inherit', textDecoration: 'none' }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = '#D4922A')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(240,234,224,0.72)')}
                  >
                    +234 909 610 6213
                  </a>
                </InfoItem>
                <InfoItem icon="✉" label="Email">
                  <a
                    href="mailto:info@casafina.com.ng"
                    style={{ color: 'inherit', textDecoration: 'none' }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = '#D4922A')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(240,234,224,0.72)')}
                  >
                    info@casafina.com.ng
                  </a>
                </InfoItem>
                <InfoItem icon="🕐" label="Business Hours">
                  Mon – Fri: 8AM – 6PM
                  <br />
                  Saturday: 9AM – 2PM
                </InfoItem>
                <InfoItem icon="🔗" label="Follow Us">
                  <div style={{ display: 'flex', gap: '1.5rem', marginTop: '0.2rem' }}>
                    <a
                      href="https://linkedin.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        fontFamily: "'Montserrat', sans-serif",
                        fontSize: '11px',
                        letterSpacing: '0.18em',
                        textTransform: 'uppercase',
                        color: 'rgba(240,234,224,0.55)',
                        textDecoration: 'none',
                        transition: 'color 0.25s ease',
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = '#D4922A')}
                      onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(240,234,224,0.55)')}
                    >
                      LinkedIn
                    </a>
                    <a
                      href="https://instagram.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        fontFamily: "'Montserrat', sans-serif",
                        fontSize: '11px',
                        letterSpacing: '0.18em',
                        textTransform: 'uppercase',
                        color: 'rgba(240,234,224,0.55)',
                        textDecoration: 'none',
                        transition: 'color 0.25s ease',
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = '#D4922A')}
                      onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(240,234,224,0.55)')}
                    >
                      Instagram
                    </a>
                  </div>
                </InfoItem>
              </div>
            </div>
          </div>
        </FadeUp>

        {/* ── Right: form ── */}
        <FadeUp delay={0.15}>
          <div
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: 'clamp(22px, 2.2vw, 32px)',
              color: '#F0EAE0',
              marginBottom: '2rem',
            }}
          >
            Send Us a Message
          </div>

          <AnimatePresence mode="wait">
            {submitted ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  background: '#0d1a10',
                  border: '1px solid rgba(72,200,80,0.3)',
                  padding: '3rem 2rem',
                  textAlign: 'center',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '1rem',
                }}
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 260, damping: 20, delay: 0.15 }}
                  style={{ fontSize: '48px' }}
                >
                  ✅
                </motion.div>
                <div
                  style={{
                    fontFamily: "'Cormorant Garamond', Georgia, serif",
                    fontSize: '26px',
                    color: '#F0EAE0',
                  }}
                >
                  Message Sent!
                </div>
                <div
                  style={{
                    fontFamily: "'Montserrat', sans-serif",
                    fontSize: '13px',
                    color: 'rgba(240,234,224,0.55)',
                    lineHeight: 1.7,
                  }}
                >
                  Thank you! We&apos;ll be in touch within 24 hours.
                </div>
                <button
                  onClick={() => setSubmitted(false)}
                  style={{
                    marginTop: '1rem',
                    background: 'none',
                    border: '1px solid rgba(212,146,42,0.4)',
                    color: '#D4922A',
                    fontFamily: "'Montserrat', sans-serif",
                    fontSize: '11px',
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    padding: '0.65rem 1.5rem',
                    cursor: 'pointer',
                    transition: 'background 0.25s ease, color 0.25s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = '#D4922A';
                    e.currentTarget.style.color = '#050507';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'none';
                    e.currentTarget.style.color = '#D4922A';
                  }}
                >
                  Send Another
                </button>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleSubmit(onSubmit)}
                noValidate
                style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
              >
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
                  <Field label="Full Name *" error={errors.fullName?.message}>
                    <input
                      {...register('fullName', {
                        required: 'Name is required',
                        minLength: { value: 2, message: 'At least 2 characters' },
                      })}
                      placeholder="John Adeyemi"
                      style={focusStyle(errors.fullName)}
                      onFocus={(e) => (e.target.style.borderColor = '#D4922A')}
                      onBlur={(e) =>
                        (e.target.style.borderColor = errors.fullName
                          ? '#e05252'
                          : 'rgba(212,146,42,0.18)')
                      }
                    />
                  </Field>
                  <Field label="Email Address *" error={errors.email?.message}>
                    <input
                      type="email"
                      {...register('email', {
                        required: 'Email is required',
                        pattern: {
                          value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                          message: 'Enter a valid email',
                        },
                      })}
                      placeholder="you@example.com"
                      style={focusStyle(errors.email)}
                      onFocus={(e) => (e.target.style.borderColor = '#D4922A')}
                      onBlur={(e) =>
                        (e.target.style.borderColor = errors.email
                          ? '#e05252'
                          : 'rgba(212,146,42,0.18)')
                      }
                    />
                  </Field>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
                  <Field label="Phone" error={errors.phone?.message}>
                    <input
                      type="tel"
                      {...register('phone')}
                      placeholder="+234 800 000 0000"
                      style={inputBase}
                      onFocus={(e) => (e.target.style.borderColor = '#D4922A')}
                      onBlur={(e) => (e.target.style.borderColor = 'rgba(212,146,42,0.18)')}
                    />
                  </Field>
                  <Field label="Subject *" error={errors.subject?.message}>
                    <select
                      {...register('subject', { required: 'Please select a subject' })}
                      style={{
                        ...focusStyle(errors.subject),
                        appearance: 'none',
                        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath fill='%23D4922A' d='M6 8L0 0h12z'/%3E%3C/svg%3E")`,
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'right 1rem center',
                        backgroundSize: '10px',
                      }}
                      onFocus={(e) => (e.target.style.borderColor = '#D4922A')}
                      onBlur={(e) =>
                        (e.target.style.borderColor = errors.subject
                          ? '#e05252'
                          : 'rgba(212,146,42,0.18)')
                      }
                    >
                      <option value="" style={{ background: '#0d0d10' }}>
                        Select subject…
                      </option>
                      <option value="general" style={{ background: '#0d0d10' }}>
                        General Inquiry
                      </option>
                      <option value="quote" style={{ background: '#0d0d10' }}>
                        Project Quote
                      </option>
                      <option value="partnership" style={{ background: '#0d0d10' }}>
                        Partnership
                      </option>
                      <option value="other" style={{ background: '#0d0d10' }}>
                        Other
                      </option>
                    </select>
                  </Field>
                </div>

                <Field label="Message *" error={errors.message?.message}>
                  <textarea
                    {...register('message', {
                      required: 'Message is required',
                      minLength: { value: 20, message: 'At least 20 characters' },
                    })}
                    rows={6}
                    placeholder="Tell us how we can help you…"
                    style={{
                      ...focusStyle(errors.message),
                      resize: 'vertical',
                      minHeight: '140px',
                    }}
                    onFocus={(e) => (e.target.style.borderColor = '#D4922A')}
                    onBlur={(e) =>
                      (e.target.style.borderColor = errors.message
                        ? '#e05252'
                        : 'rgba(212,146,42,0.18)')
                    }
                  />
                </Field>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  style={{
                    alignSelf: 'flex-start',
                    background: isSubmitting ? 'rgba(212,146,42,0.6)' : '#D4922A',
                    border: 'none',
                    color: '#050507',
                    fontFamily: "'Montserrat', sans-serif",
                    fontSize: '12px',
                    fontWeight: 600,
                    letterSpacing: '0.22em',
                    textTransform: 'uppercase',
                    padding: '0.9rem 2.5rem',
                    cursor: isSubmitting ? 'not-allowed' : 'pointer',
                    transition: 'background 0.25s ease, transform 0.2s ease',
                  }}
                  onMouseEnter={(e) => {
                    if (!isSubmitting) e.currentTarget.style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  {isSubmitting ? 'Sending…' : 'Send Message →'}
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </FadeUp>
      </section>

      {/* ── Map placeholder ─────────────────────────────────────────────── */}
      {/* Replace this div with a Google Maps embed when ready */}
      <section style={{ padding: '0 7vw 100px', background: '#050507' }}>
        <FadeUp>
          <div
            style={{
              height: '340px',
              background: '#0a0c12',
              border: '1px solid rgba(212,146,42,0.1)',
              position: 'relative',
              overflow: 'hidden',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {/* Grid overlay */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                backgroundImage:
                  'linear-gradient(rgba(212,146,42,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(212,146,42,0.05) 1px, transparent 1px)',
                backgroundSize: '40px 40px',
              }}
            />
            {/* Radial glow */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background:
                  'radial-gradient(ellipse at 50% 50%, rgba(212,146,42,0.08) 0%, transparent 65%)',
              }}
            />
            {/* Pin + label */}
            <div
              style={{
                position: 'relative',
                zIndex: 1,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '0.75rem',
              }}
            >
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                style={{ fontSize: '36px' }}
              >
                📍
              </motion.div>
              <div
                style={{
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  fontSize: '22px',
                  color: '#F0EAE0',
                  opacity: 0.6,
                }}
              >
                Lagos, Nigeria
              </div>
              <div
                style={{
                  fontFamily: "'Montserrat', sans-serif",
                  fontSize: '10px',
                  letterSpacing: '0.28em',
                  textTransform: 'uppercase',
                  color: 'rgba(212,146,42,0.5)',
                }}
              >
                Oregun, Ikeja
              </div>
            </div>
          </div>
        </FadeUp>
      </section>
    </>
  );
};

export default Contact;
