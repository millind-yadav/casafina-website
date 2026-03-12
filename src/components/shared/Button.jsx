import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const MotionLink   = motion(Link);
const MotionAnchor = motion.a;
const MotionBtn    = motion.button;

const BASE = {
  fontFamily: "'Montserrat', sans-serif",
  fontSize: '11px',
  letterSpacing: '0.25em',
  textTransform: 'uppercase',
  display: 'inline-block',
  textDecoration: 'none',
  cursor: 'none',
  outline: 'none',
  border: 'none',
};

const VARIANTS = {
  primary: {
    style: { ...BASE, background: '#D4922A', color: '#050507', padding: '14px 32px' },
    whileHover: { y: -3, boxShadow: '0 12px 40px rgba(212,146,42,0.35)' },
    whileTap:   { scale: 0.97 },
  },
  ghost: {
    style: { ...BASE, background: 'transparent', color: '#D4922A', padding: '8px 0',
      borderBottom: '1px solid rgba(212,146,42,0.4)' },
    whileHover: { color: '#F0B842', borderColor: '#F0B842' },
    whileTap:   { scale: 0.97 },
  },
  outline: {
    style: { ...BASE, background: 'transparent', color: '#D4922A',
      padding: '13px 31px', border: '1px solid #D4922A' },
    whileHover: { background: '#D4922A', color: '#050507' },
    whileTap:   { scale: 0.97 },
  },
};

function Button({ children, variant = 'primary', onClick, href, to }) {
  const v = VARIANTS[variant] ?? VARIANTS.primary;

  if (to) {
    return (
      <MotionLink to={to} style={v.style} whileHover={v.whileHover} whileTap={v.whileTap}>
        {children}
      </MotionLink>
    );
  }
  if (href) {
    return (
      <MotionAnchor
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        style={v.style}
        whileHover={v.whileHover}
        whileTap={v.whileTap}
      >
        {children}
      </MotionAnchor>
    );
  }
  return (
    <MotionBtn
      onClick={onClick}
      style={v.style}
      whileHover={v.whileHover}
      whileTap={v.whileTap}
    >
      {children}
    </MotionBtn>
  );
}

export default Button;
