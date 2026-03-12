function SectionTag({ children }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
      <div style={{ width: 30, height: 1, background: '#D4922A', flexShrink: 0 }} />
      <span style={{
        fontFamily: "'Montserrat', sans-serif",
        fontSize: '9px',
        letterSpacing: '0.35em',
        textTransform: 'uppercase',
        color: '#D4922A',
      }}>
        {children}
      </span>
    </div>
  );
}

export default SectionTag;
