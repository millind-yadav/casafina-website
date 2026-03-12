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

/* ─── Shared styles ─────────────────────────────────────────────────── */
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

function Field({ label, error, children, required }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
      {label && (
        <label
          style={{
            fontFamily: "'Montserrat', sans-serif",
            fontSize: '10px',
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: 'rgba(240,234,224,0.45)',
          }}
        >
          {label}{required && ' *'}
        </label>
      )}
      {children}
      {error && (
        <span
          style={{
            fontFamily: "'Montserrat', sans-serif",
            fontSize: '11px',
            color: '#e05252',
          }}
        >
          {error}
        </span>
      )}
    </div>
  );
}

const PROJECT_TYPES = ['Residential', 'Commercial', 'Industrial', 'Mixed Use'];
const SERVICES_LIST = [
  'Project Conceptualization',
  'Construction Management',
  'Procurement of Materials',
  'Engineering Design & Construction',
  'Quality Assurance',
  'Full EPC',
];
const BUDGET_OPTIONS = [
  { value: 'under-50m',   label: 'Under ₦50M' },
  { value: '50m-150m',   label: '₦50M – ₦150M' },
  { value: '150m-500m',  label: '₦150M – ₦500M' },
  { value: 'above-500m', label: 'Above ₦500M' },
];

/* ─── Step indicator ────────────────────────────────────────────────── */
function StepIndicator({ step }) {
  const steps = ['Project Info', 'Services', 'Your Details'];
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 0,
        marginBottom: '3rem',
      }}
    >
      {steps.map((label, i) => (
        <>
          <div
            key={label}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', zIndex: 1 }}
          >
            <motion.div
              animate={{
                background: i < step ? '#D4922A' : i === step ? 'transparent' : 'transparent',
                borderColor: i <= step ? '#D4922A' : 'rgba(212,146,42,0.25)',
              }}
              transition={{ duration: 0.4 }}
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                border: '1.5px solid',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: '14px',
                color: i <= step ? '#D4922A' : 'rgba(240,234,224,0.2)',
                position: 'relative',
              }}
            >
              {i < step ? '✓' : i + 1}
            </motion.div>
            <span
              style={{
                fontFamily: "'Montserrat', sans-serif",
                fontSize: '9px',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: i === step ? '#D4922A' : 'rgba(240,234,224,0.3)',
                whiteSpace: 'nowrap',
              }}
            >
              {label}
            </span>
          </div>
          {i < steps.length - 1 && (
            <div
              key={`line-${i}`}
              style={{
                flex: 1,
                height: '1px',
                marginBottom: '1.5rem',
                position: 'relative',
                background: 'rgba(212,146,42,0.12)',
              }}
            >
              <motion.div
                animate={{ scaleX: step > i ? 1 : 0 }}
                transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(90deg, #D4922A, #F0B842)',
                  transformOrigin: 'left center',
                }}
              />
            </div>
          )}
        </>
      ))}
    </div>
  );
}

/* ─── Page ──────────────────────────────────────────────────────────── */
const Quote = () => {
  const [step, setStep]         = useState(0);
  const [done, setDone]         = useState(false);
  const [selections, setSelections] = useState({
    projectType: '',
    services: [],
  });

  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors, isSubmitting },
  } = useForm({ mode: 'onTouched' });

  /* ── Step 1 validation ── */
  const goToStep2 = async () => {
    const ok = await trigger(['projectLocation', 'estimatedSize', 'startDate']);
    if (!selections.projectType) return;
    if (ok) setStep(1);
  };

  /* ── Step 2 → 3 ── */
  const goToStep3 = () => setStep(2);

  /* ── Final submit ── */
  const onSubmit = async (data) => {
    const payload = { ...data, ...selections };
    // TODO: send payload to backend
    await new Promise((r) => setTimeout(r, 900));
    void payload;
    setDone(true);
  };

  const focusStyle = (hasError) => ({
    ...inputBase,
    borderColor: hasError ? '#e05252' : 'rgba(212,146,42,0.18)',
  });

  const selectDropdown = {
    ...inputBase,
    appearance: 'none',
    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath fill='%23D4922A' d='M6 8L0 0h12z'/%3E%3C/svg%3E")`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'right 1rem center',
    backgroundSize: '10px',
  };

  const btnPrimary = {
    background: '#D4922A',
    border: 'none',
    color: '#050507',
    fontFamily: "'Montserrat', sans-serif",
    fontSize: '12px',
    fontWeight: 600,
    letterSpacing: '0.22em',
    textTransform: 'uppercase',
    padding: '0.9rem 2.5rem',
    cursor: 'pointer',
    transition: 'transform 0.2s ease, opacity 0.2s ease',
  };

  const btnGhost = {
    background: 'none',
    border: '1px solid rgba(212,146,42,0.3)',
    color: 'rgba(240,234,224,0.6)',
    fontFamily: "'Montserrat', sans-serif",
    fontSize: '12px',
    letterSpacing: '0.2em',
    textTransform: 'uppercase',
    padding: '0.9rem 2rem',
    cursor: 'pointer',
    transition: 'border-color 0.25s ease, color 0.25s ease',
  };

  const toggleService = (svc) => {
    setSelections((prev) => ({
      ...prev,
      services: prev.services.includes(svc)
        ? prev.services.filter((s) => s !== svc)
        : [...prev.services, svc],
    }));
  };

  return (
    <>
      <Helmet>
        <title>Free Quote — Casafina Construction</title>
        <meta
          name="description"
          content="Request a free construction quote from Casafina Construction Co. Ltd."
        />
        <meta property="og:title" content="Free Quote — Casafina Construction" />
        <meta property="og:description" content="Request a free construction quote from Casafina Construction Co. Ltd." />
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
            <SectionTag label="Free Quote" />
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
              Get Your
              <br />
              <em style={{ color: '#D4922A', fontStyle: 'italic' }}>Free Quote</em>
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
              Complete the form below and our team will prepare a tailored proposal for your
              project within 24 hours — at no cost.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* ── Form ────────────────────────────────────────────────────────── */}
      <section
        style={{
          padding: '80px 7vw 120px',
          background: '#050507',
          borderTop: '1px solid rgba(212,146,42,0.07)',
        }}
      >
        <div style={{ maxWidth: '720px', margin: '0 auto' }}>
          <AnimatePresence mode="wait">
            {done ? (
              /* ── Success screen ── */
              <motion.div
                key="done"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  textAlign: 'center',
                  padding: '5rem 2rem',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '1.25rem',
                }}
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 260, damping: 20, delay: 0.2 }}
                  style={{ fontSize: '56px' }}
                >
                  🏗️
                </motion.div>
                <div
                  style={{
                    fontFamily: "'Cormorant Garamond', Georgia, serif",
                    fontSize: 'clamp(28px, 3.5vw, 48px)',
                    color: '#F0EAE0',
                  }}
                >
                  Quote Request Received!
                </div>
                <div
                  style={{
                    fontFamily: "'Montserrat', sans-serif",
                    fontSize: '14px',
                    color: 'rgba(240,234,224,0.52)',
                    lineHeight: 1.75,
                    maxWidth: '380px',
                  }}
                >
                  We&apos;ll contact you within 24 hours with a tailored proposal for your project.
                </div>
                <div
                  style={{
                    marginTop: '0.5rem',
                    fontFamily: "'Montserrat', sans-serif",
                    fontSize: '11px',
                    color: '#D4922A',
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                  }}
                >
                  — Casafina Construction Co. Ltd
                </div>
              </motion.div>
            ) : (
              <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <StepIndicator step={step} />

                <form onSubmit={handleSubmit(onSubmit)} noValidate>
                  <AnimatePresence mode="wait">

                    {/* ══ Step 1: Project Info ══════════════════════════════ */}
                    {step === 0 && (
                      <motion.div
                        key="step1"
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -30 }}
                        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                      >
                        <div
                          style={{
                            fontFamily: "'Cormorant Garamond', Georgia, serif",
                            fontSize: 'clamp(20px, 2.2vw, 28px)',
                            color: '#F0EAE0',
                            marginBottom: '2rem',
                          }}
                        >
                          Tell us about your project
                        </div>

                        {/* Project type radio cards */}
                        <Field label="Project Type *">
                          <div
                            style={{
                              display: 'grid',
                              gridTemplateColumns: 'repeat(4, 1fr)',
                              gap: '0.75rem',
                              marginTop: '0.25rem',
                            }}
                          >
                            {PROJECT_TYPES.map((type) => (
                              <button
                                key={type}
                                type="button"
                                onClick={() =>
                                  setSelections((p) => ({ ...p, projectType: type }))
                                }
                                style={{
                                  background:
                                    selections.projectType === type
                                      ? 'rgba(212,146,42,0.12)'
                                      : '#0d0d10',
                                  border:
                                    selections.projectType === type
                                      ? '1px solid #D4922A'
                                      : '1px solid rgba(212,146,42,0.18)',
                                  color:
                                    selections.projectType === type
                                      ? '#D4922A'
                                      : 'rgba(240,234,224,0.5)',
                                  fontFamily: "'Montserrat', sans-serif",
                                  fontSize: '11px',
                                  letterSpacing: '0.1em',
                                  padding: '0.85rem 0.5rem',
                                  cursor: 'pointer',
                                  textAlign: 'center',
                                  transition: 'all 0.25s ease',
                                }}
                              >
                                {type}
                              </button>
                            ))}
                          </div>
                          {!selections.projectType && (
                            <span
                              style={{
                                fontFamily: "'Montserrat', sans-serif",
                                fontSize: '11px',
                                color: 'rgba(240,234,224,0.3)',
                                marginTop: '0.35rem',
                              }}
                            >
                              Select a type to continue
                            </span>
                          )}
                        </Field>

                        <div
                          style={{
                            display: 'grid',
                            gridTemplateColumns: '1fr 1fr',
                            gap: '1.25rem',
                            marginTop: '1.5rem',
                          }}
                        >
                          <Field label="Project Location *" error={errors.projectLocation?.message}>
                            <input
                              {...register('projectLocation', { required: 'Location is required' })}
                              placeholder="e.g. Lekki, Lagos"
                              style={focusStyle(errors.projectLocation)}
                              onFocus={(e) => (e.target.style.borderColor = '#D4922A')}
                              onBlur={(e) =>
                                (e.target.style.borderColor = errors.projectLocation
                                  ? '#e05252'
                                  : 'rgba(212,146,42,0.18)')
                              }
                            />
                          </Field>
                          <Field label="Estimated Size (sqm) *" error={errors.estimatedSize?.message}>
                            <input
                              type="number"
                              {...register('estimatedSize', {
                                required: 'Size is required',
                                min: { value: 1, message: 'Must be at least 1 sqm' },
                              })}
                              placeholder="e.g. 450"
                              style={focusStyle(errors.estimatedSize)}
                              onFocus={(e) => (e.target.style.borderColor = '#D4922A')}
                              onBlur={(e) =>
                                (e.target.style.borderColor = errors.estimatedSize
                                  ? '#e05252'
                                  : 'rgba(212,146,42,0.18)')
                              }
                            />
                          </Field>
                        </div>

                        <div style={{ marginTop: '1.5rem' }}>
                          <Field label="Expected Start Date *" error={errors.startDate?.message}>
                            <input
                              type="date"
                              {...register('startDate', { required: 'Start date is required' })}
                              style={{
                                ...focusStyle(errors.startDate),
                                colorScheme: 'dark',
                              }}
                              onFocus={(e) => (e.target.style.borderColor = '#D4922A')}
                              onBlur={(e) =>
                                (e.target.style.borderColor = errors.startDate
                                  ? '#e05252'
                                  : 'rgba(212,146,42,0.18)')
                              }
                            />
                          </Field>
                        </div>

                        <div style={{ marginTop: '2.5rem' }}>
                          <button
                            type="button"
                            onClick={goToStep2}
                            style={btnPrimary}
                            onMouseEnter={(e) =>
                              (e.currentTarget.style.transform = 'translateY(-2px)')
                            }
                            onMouseLeave={(e) =>
                              (e.currentTarget.style.transform = 'translateY(0)')
                            }
                          >
                            Next →
                          </button>
                        </div>
                      </motion.div>
                    )}

                    {/* ══ Step 2: Services ══════════════════════════════════ */}
                    {step === 1 && (
                      <motion.div
                        key="step2"
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -30 }}
                        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                      >
                        <div
                          style={{
                            fontFamily: "'Cormorant Garamond', Georgia, serif",
                            fontSize: 'clamp(20px, 2.2vw, 28px)',
                            color: '#F0EAE0',
                            marginBottom: '2rem',
                          }}
                        >
                          What services do you need?
                        </div>

                        {/* Service checkbox cards */}
                        <Field label="Services Required *">
                          <div
                            style={{
                              display: 'grid',
                              gridTemplateColumns: 'repeat(2, 1fr)',
                              gap: '0.75rem',
                              marginTop: '0.25rem',
                            }}
                          >
                            {SERVICES_LIST.map((svc) => {
                              const active = selections.services.includes(svc);
                              return (
                                <button
                                  key={svc}
                                  type="button"
                                  onClick={() => toggleService(svc)}
                                  style={{
                                    background: active ? 'rgba(212,146,42,0.1)' : '#0d0d10',
                                    border: active
                                      ? '1px solid #D4922A'
                                      : '1px solid rgba(212,146,42,0.15)',
                                    color: active ? '#D4922A' : 'rgba(240,234,224,0.55)',
                                    fontFamily: "'Montserrat', sans-serif",
                                    fontSize: '11px',
                                    letterSpacing: '0.06em',
                                    padding: '0.9rem 1rem',
                                    cursor: 'pointer',
                                    textAlign: 'left',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.6rem',
                                    transition: 'all 0.25s ease',
                                  }}
                                >
                                  <span
                                    style={{
                                      width: '14px',
                                      height: '14px',
                                      border: `1.5px solid ${active ? '#D4922A' : 'rgba(212,146,42,0.3)'}`,
                                      display: 'flex',
                                      alignItems: 'center',
                                      justifyContent: 'center',
                                      flexShrink: 0,
                                      fontSize: '9px',
                                      color: '#D4922A',
                                    }}
                                  >
                                    {active ? '✓' : ''}
                                  </span>
                                  {svc}
                                </button>
                              );
                            })}
                          </div>
                        </Field>

                        <div style={{ marginTop: '1.75rem' }}>
                          <Field label="Budget Range *" error={errors.budgetRange?.message}>
                            <select
                              {...register('budgetRange', { required: 'Select a budget range' })}
                              style={{
                                ...selectDropdown,
                                borderColor: errors.budgetRange
                                  ? '#e05252'
                                  : 'rgba(212,146,42,0.18)',
                              }}
                              onFocus={(e) => (e.target.style.borderColor = '#D4922A')}
                              onBlur={(e) =>
                                (e.target.style.borderColor = errors.budgetRange
                                  ? '#e05252'
                                  : 'rgba(212,146,42,0.18)')
                              }
                            >
                              <option value="" style={{ background: '#0d0d10' }}>
                                Select range…
                              </option>
                              {BUDGET_OPTIONS.map((opt) => (
                                <option
                                  key={opt.value}
                                  value={opt.value}
                                  style={{ background: '#0d0d10' }}
                                >
                                  {opt.label}
                                </option>
                              ))}
                            </select>
                          </Field>
                        </div>

                        <div
                          style={{ display: 'flex', gap: '1rem', marginTop: '2.5rem' }}
                        >
                          <button
                            type="button"
                            onClick={() => setStep(0)}
                            style={btnGhost}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.borderColor = '#D4922A';
                              e.currentTarget.style.color = '#D4922A';
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.borderColor = 'rgba(212,146,42,0.3)';
                              e.currentTarget.style.color = 'rgba(240,234,224,0.6)';
                            }}
                          >
                            ← Back
                          </button>
                          <button
                            type="button"
                            onClick={goToStep3}
                            style={btnPrimary}
                            onMouseEnter={(e) =>
                              (e.currentTarget.style.transform = 'translateY(-2px)')
                            }
                            onMouseLeave={(e) =>
                              (e.currentTarget.style.transform = 'translateY(0)')
                            }
                          >
                            Next →
                          </button>
                        </div>
                      </motion.div>
                    )}

                    {/* ══ Step 3: Your Details ══════════════════════════════ */}
                    {step === 2 && (
                      <motion.div
                        key="step3"
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -30 }}
                        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                      >
                        <div
                          style={{
                            fontFamily: "'Cormorant Garamond', Georgia, serif",
                            fontSize: 'clamp(20px, 2.2vw, 28px)',
                            color: '#F0EAE0',
                            marginBottom: '2rem',
                          }}
                        >
                          Your contact details
                        </div>

                        <div
                          style={{
                            display: 'grid',
                            gridTemplateColumns: '1fr 1fr',
                            gap: '1.25rem',
                          }}
                        >
                          <Field label="Full Name" required error={errors.fullName?.message}>
                            <input
                              {...register('fullName', { required: 'Name is required', minLength: { value: 2, message: 'At least 2 characters' } })}
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
                          <Field label="Company Name" error={null}>
                            <input
                              {...register('companyName')}
                              placeholder="Optional"
                              style={inputBase}
                              onFocus={(e) => (e.target.style.borderColor = '#D4922A')}
                              onBlur={(e) => (e.target.style.borderColor = 'rgba(212,146,42,0.18)')}
                            />
                          </Field>
                        </div>

                        <div
                          style={{
                            display: 'grid',
                            gridTemplateColumns: '1fr 1fr',
                            gap: '1.25rem',
                            marginTop: '1.25rem',
                          }}
                        >
                          <Field label="Email" required error={errors.email?.message}>
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
                          <Field label="Phone" required error={errors.phone?.message}>
                            <input
                              type="tel"
                              {...register('phone', { required: 'Phone is required' })}
                              placeholder="+234 800 000 0000"
                              style={focusStyle(errors.phone)}
                              onFocus={(e) => (e.target.style.borderColor = '#D4922A')}
                              onBlur={(e) =>
                                (e.target.style.borderColor = errors.phone
                                  ? '#e05252'
                                  : 'rgba(212,146,42,0.18)')
                              }
                            />
                          </Field>
                        </div>

                        <div style={{ marginTop: '1.25rem' }}>
                          <Field label="How did you hear about us?" error={null}>
                            <select
                              {...register('referralSource')}
                              style={selectDropdown}
                              onFocus={(e) => (e.target.style.borderColor = '#D4922A')}
                              onBlur={(e) => (e.target.style.borderColor = 'rgba(212,146,42,0.18)')}
                            >
                              <option value="" style={{ background: '#0d0d10' }}>Select…</option>
                              <option value="google" style={{ background: '#0d0d10' }}>Google</option>
                              <option value="referral" style={{ background: '#0d0d10' }}>Referral</option>
                              <option value="social" style={{ background: '#0d0d10' }}>Social Media</option>
                              <option value="other" style={{ background: '#0d0d10' }}>Other</option>
                            </select>
                          </Field>
                        </div>

                        <div style={{ marginTop: '1.25rem' }}>
                          <Field label="Additional Notes" error={null}>
                            <textarea
                              {...register('notes')}
                              rows={5}
                              placeholder="Any additional context or requirements for your project…"
                              style={{ ...inputBase, resize: 'vertical', minHeight: '120px' }}
                              onFocus={(e) => (e.target.style.borderColor = '#D4922A')}
                              onBlur={(e) => (e.target.style.borderColor = 'rgba(212,146,42,0.18)')}
                            />
                          </Field>
                        </div>

                        <div
                          style={{ display: 'flex', gap: '1rem', marginTop: '2.5rem' }}
                        >
                          <button
                            type="button"
                            onClick={() => setStep(1)}
                            style={btnGhost}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.borderColor = '#D4922A';
                              e.currentTarget.style.color = '#D4922A';
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.borderColor = 'rgba(212,146,42,0.3)';
                              e.currentTarget.style.color = 'rgba(240,234,224,0.6)';
                            }}
                          >
                            ← Back
                          </button>
                          <button
                            type="submit"
                            disabled={isSubmitting}
                            style={{
                              ...btnPrimary,
                              opacity: isSubmitting ? 0.7 : 1,
                              cursor: isSubmitting ? 'not-allowed' : 'pointer',
                            }}
                            onMouseEnter={(e) => {
                              if (!isSubmitting)
                                e.currentTarget.style.transform = 'translateY(-2px)';
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.transform = 'translateY(0)';
                            }}
                          >
                            {isSubmitting ? 'Submitting…' : 'Request Quote →'}
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </form>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </>
  );
};

export default Quote;
