import { useRef, useMemo, memo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const FLOOR_H = 2.4;

function Building({ position = [0, 0, 0], width = 4, depth = 3, floors = 8, style = 'standard' }) {
  const blinkRef = useRef();

  const totalHeight = floors * FLOOR_H;

  // ── Main body material ───────────────────────────────────────────
  const bodyMat = useMemo(() => {
    if (style === 'hero') {
      return new THREE.MeshStandardMaterial({
        color: '#1e2840',
        roughness: 0.05,
        metalness: 0.9,
        transparent: true,
        opacity: 0.85,
      });
    }
    return new THREE.MeshStandardMaterial({
      color: '#1a1c24',
      roughness: 0.85,
      metalness: 0.15,
    });
  }, [style]);

  // ── Floor slab data ───────────────────────────────────────────────
  const slabs = useMemo(() => {
    const arr = [];
    for (let f = 1; f < floors; f++) {
      arr.push(f * FLOOR_H - totalHeight / 2);
    }
    return arr;
  }, [floors, totalHeight]);

  // ── Window data ───────────────────────────────────────────────────
  const windows = useMemo(() => {
    const winCols = Math.max(2, Math.floor(width / 1.8));
    const winRows = Math.min(floors - 1, 12);
    const list = [];

    const faces = [
      // front
      { axis: 'z', sign: 1, uSize: width, vSize: totalHeight },
      // back
      { axis: 'z', sign: -1, uSize: width, vSize: totalHeight },
      // left
      { axis: 'x', sign: -1, uSize: depth, vSize: totalHeight },
      // right
      { axis: 'x', sign: 1, uSize: depth, vSize: totalHeight },
    ];

    faces.forEach(({ axis, sign, uSize }) => {
      const cols = Math.max(2, Math.floor(uSize / 1.8));
      for (let r = 0; r < winRows; r++) {
        for (let c = 0; c < cols; c++) {
          const lit = Math.random() < 0.7;
          const intensity = lit ? 0.4 + Math.random() * 0.6 : 0;
          const uPos = ((c + 0.5) / cols - 0.5) * (uSize - 0.8);
          const vPos = ((r + 0.5) / winRows - 0.5) * totalHeight * 0.85;

          let pos;
          const offset = (axis === 'z' ? depth : width) / 2 + 0.02;
          if (axis === 'z') {
            pos = [uPos, vPos, sign * offset];
          } else {
            pos = [sign * offset, vPos, uPos];
          }

          list.push({ pos, lit, intensity });
        }
      }
    });

    return list;
  }, [width, depth, floors, totalHeight]);

  // ── Roof/tower cap ───────────────────────────────────────────────
  const hasRoof = style === 'hero' || style === 'tower';
  const roofY   = totalHeight / 2;

  useFrame(({ clock }) => {
    if (blinkRef.current) {
      const on = Math.sin(clock.elapsedTime * 3) > 0.8;
      blinkRef.current.material.emissiveIntensity = on ? 2 : 0;
    }
  });

  return (
    <group position={[position[0], totalHeight / 2, position[2]]}>
      {/* Main body */}
      <mesh castShadow receiveShadow material={bodyMat}>
        <boxGeometry args={[width, totalHeight, depth]} />
      </mesh>

      {/* Floor slabs */}
      {slabs.map((y, i) => (
        <mesh key={i} position={[0, y, 0]}>
          <boxGeometry args={[width + 0.1, 0.12, depth + 0.1]} />
          <meshStandardMaterial color="#0d0f14" roughness={1} metalness={0} />
        </mesh>
      ))}

      {/* Windows */}
      {windows.map((w, i) => (
        <mesh key={i} position={w.pos}>
          <planeGeometry args={[0.5, 0.7]} />
          <meshStandardMaterial
            color={w.lit ? '#FFE0A0' : '#111520'}
            emissive={w.lit ? '#C06000' : '#000000'}
            emissiveIntensity={w.intensity}
            roughness={0.2}
            metalness={0.1}
          />
        </mesh>
      ))}

      {/* Roof cap + antenna */}
      {hasRoof && (
        <group position={[0, roofY, 0]}>
          <mesh>
            <boxGeometry args={[width * 0.3, 3, depth * 0.3]} />
            <meshStandardMaterial color="#D4922A" roughness={0.3} metalness={0.8} />
          </mesh>
          <mesh position={[0, 4.5, 0]}>
            <cylinderGeometry args={[0.05, 0.05, 6, 6]} />
            <meshStandardMaterial color="#888" roughness={0.6} metalness={0.5} />
          </mesh>
          {/* Blink light */}
          <mesh ref={blinkRef} position={[0, 7.5, 0]}>
            <sphereGeometry args={[0.15, 8, 8]} />
            <meshStandardMaterial
              color="#ff2200"
              emissive="#ff2200"
              emissiveIntensity={0}
            />
          </mesh>
        </group>
      )}
    </group>
  );
}

export default memo(Building);
