import { useEffect, useRef } from 'react';
import useCursor from '../../hooks/useCursor';
import useStore from '../../store/useStore';

function Cursor() {
  useCursor(); // start tracking mouse + lerp ring into store

  const dotRef      = useRef(null);
  const ringRef     = useRef(null);
  const ringSizeRef = useRef(32);

  useEffect(() => {
    // Imperatively update DOM — avoids 60fps React re-renders
    const unsub = useStore.subscribe((state) => {
      const { x: dx, y: dy } = state.cursorPos;
      const { x: rx, y: ry } = state.cursorRingPos;
      const s = ringSizeRef.current;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${dx - 4}px, ${dy - 4}px)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${rx - s / 2}px, ${ry - s / 2}px)`;
      }
    });

    const expand   = () => {
      ringSizeRef.current = 60;
      if (ringRef.current) {
        ringRef.current.style.width  = '60px';
        ringRef.current.style.height = '60px';
      }
    };
    const contract = () => {
      ringSizeRef.current = 32;
      if (ringRef.current) {
        ringRef.current.style.width  = '32px';
        ringRef.current.style.height = '32px';
      }
    };

    const attach = () => {
      document.querySelectorAll('a, button').forEach((el) => {
        el.addEventListener('mouseenter', expand);
        el.addEventListener('mouseleave', contract);
      });
    };

    attach();
    const mo = new MutationObserver(attach);
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      unsub();
      mo.disconnect();
      document.querySelectorAll('a, button').forEach((el) => {
        el.removeEventListener('mouseenter', expand);
        el.removeEventListener('mouseleave', contract);
      });
    };
  }, []);

  return (
    <>
      {/* Dot — follows mouse instantly */}
      <div
        ref={dotRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: 8,
          height: 8,
          borderRadius: '50%',
          background: '#D4922A',
          pointerEvents: 'none',
          zIndex: 9999,
          mixBlendMode: 'difference',
          willChange: 'transform',
        }}
      />
      {/* Ring — lerped */}
      <div
        ref={ringRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: 32,
          height: 32,
          borderRadius: '50%',
          border: '1.5px solid rgba(212,146,42,0.65)',
          pointerEvents: 'none',
          zIndex: 9998,
          transition: 'width 0.25s ease, height 0.25s ease',
          willChange: 'transform',
        }}
      />
    </>
  );
}

export default Cursor;
