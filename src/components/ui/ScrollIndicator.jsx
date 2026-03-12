import useStore from '../../store/useStore';

function ScrollIndicator() {
  const scrollProgress = useStore((s) => s.scrollProgress);

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '2.5rem',
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '0.5rem',
        opacity: scrollProgress > 0.05 ? 0 : 1,
        transition: 'opacity 0.5s ease',
        pointerEvents: 'none',
        zIndex: 50,
      }}
    >
      <span style={{
        fontFamily: "'Montserrat', sans-serif",
        fontSize: '9px',
        letterSpacing: '0.4em',
        color: '#D4922A',
        textTransform: 'uppercase',
      }}>
        Scroll
      </span>
      <div
        style={{
          width: '1px',
          height: '48px',
          background: 'linear-gradient(to bottom, #D4922A, transparent)',
          animation: 'cfScrollPulse 2s ease-in-out infinite',
        }}
      />
      <style>{`
        @keyframes cfScrollPulse {
          0%, 100% { transform: scaleY(1);   opacity: 0.5; }
          50%       { transform: scaleY(1.2); opacity: 1;   }
        }
      `}</style>
    </div>
  );
}

export default ScrollIndicator;
