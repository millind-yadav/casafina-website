import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import useStore from '../../store/useStore';
import BrandLogo from '../shared/BrandLogo';

function Loader() {
  const setIsLoading = useStore((s) => s.setIsLoading);
  const [progress, setProgress] = useState(0);
  const [visible, setVisible]   = useState(true);

  // Drive percentage counter via RAF
  useEffect(() => {
    const start = Date.now();
    const dur   = 2400;
    let id;
    const tick = () => {
      const p = Math.min(100, Math.round(((Date.now() - start) / dur) * 100));
      setProgress(p);
      if (p < 100) id = requestAnimationFrame(tick);
    };
    id = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(id);
  }, []);

  const onBarComplete = () => {
    setTimeout(() => {
      setVisible(false);
      setTimeout(() => setIsLoading(false), 600);
    }, 600);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.6, ease: [0.65, 0, 0.35, 1] }}
          style={{
            position: 'fixed',
            inset: 0,
            background: '#050507',
            zIndex: 10000,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '2rem',
          }}
        >
          <BrandLogo width="min(240px, 70vw)" />

          {/* Progress bar track */}
          <div style={{
            width: 220,
            height: 1,
            background: 'rgba(212,146,42,0.2)',
            position: 'relative',
            overflow: 'hidden',
          }}>
            <motion.div
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={{ duration: 2.4, ease: 'linear' }}
              onAnimationComplete={onBarComplete}
              style={{
                position: 'absolute',
                left: 0,
                top: 0,
                height: '100%',
                background: 'linear-gradient(90deg, #D4922A, #F0B842)',
              }}
            />
          </div>

          <div style={{
            fontFamily: "'Montserrat', sans-serif",
            fontSize: '10px',
            letterSpacing: '0.3em',
            color: '#D4922A',
            fontVariantNumeric: 'tabular-nums',
          }}>
            {progress}%
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default Loader;
