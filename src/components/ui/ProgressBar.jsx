import useStore from '../../store/useStore';

function ProgressBar() {
  const scrollProgress = useStore((s) => s.scrollProgress);

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        height: '2px',
        width: `${scrollProgress * 100}%`,
        background: 'linear-gradient(90deg, #D4922A, #F0B842)',
        zIndex: 200,
        pointerEvents: 'none',
        transition: 'width 0.1s linear',
      }}
    />
  );
}

export default ProgressBar;
