import { useEffect, useRef } from 'react';
import useStore from '../store/useStore';

const LERP_FACTOR = 0.1;

const useCursor = () => {
  const setCursorPos     = useStore((s) => s.setCursorPos);
  const setCursorRingPos = useStore((s) => s.setCursorRingPos);

  const dotRef  = useRef({ x: 0, y: 0 });
  const ringRef = useRef({ x: 0, y: 0 });
  const rafRef  = useRef(null);

  useEffect(() => {
    const onMouseMove = (e) => {
      dotRef.current = { x: e.clientX, y: e.clientY };
      setCursorPos({ x: e.clientX, y: e.clientY });
    };

    const tick = () => {
      const ring = ringRef.current;
      const dot  = dotRef.current;
      ring.x += (dot.x - ring.x) * LERP_FACTOR;
      ring.y += (dot.y - ring.y) * LERP_FACTOR;
      setCursorRingPos({ x: ring.x, y: ring.y });
      rafRef.current = requestAnimationFrame(tick);
    };

    window.addEventListener('mousemove', onMouseMove);
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, [setCursorPos, setCursorRingPos]);
};

export default useCursor;
