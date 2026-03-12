function Marquee({ items = [], speed = '25s' }) {
  const doubled = [...items, ...items];

  return (
    <div style={{ background: '#D4922A', overflow: 'hidden', whiteSpace: 'nowrap' }}>
      <div
        style={{
          display: 'inline-flex',
          animation: `cfMarquee ${speed} linear infinite`,
        }}
      >
        {doubled.map((item, i) => (
          <span
            key={i}
            style={{
              fontFamily: "'Montserrat', sans-serif",
              fontSize: '11px',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: '#050507',
              padding: '0.65rem 0',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '1.5rem',
              paddingRight: '1.5rem',
            }}
          >
            {item}
            <span style={{ fontSize: '7px', opacity: 0.45 }}>&#9670;</span>
          </span>
        ))}
      </div>
      <style>{`
        @keyframes cfMarquee {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}

export default Marquee;
