import { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import useStore from '../../store/useStore';

// Camera starts INSIDE the gate, slowly pulls out as user scrolls
const CAM_PATH = [
  { pos: [0, 3, 2],    look: [0, 4, -8]  },   // inside gate, ground level
  { pos: [0, 4, 8],    look: [0, 5, -10] },   // backing out slightly
  { pos: [-6, 5, 14],  look: [2, 5, -8]  },   // angled side view
  { pos: [0, 6, 20],   look: [0, 5, -6]  },   // pulling back further
  { pos: [10, 8, 28],  look: [-2, 6, -4] },   // elevated side
  { pos: [0, 14, 40],  look: [0, 4, 0]   },   // bird's eye pulling back
  { pos: [0, 22, 55],  look: [0, 2, 0]   },   // full aerial overview
];

function easeInOut(t) {
  return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
}

const _camTarget   = new THREE.Vector3();
const _lookTarget  = new THREE.Vector3();

function CameraRig() {
  const { camera } = useThree();
  const cursorPos   = useStore((s) => s.cursorPos);
  const scrProgress = useStore((s) => s.scrollProgress);
  const lookRef     = useRef(new THREE.Vector3(...CAM_PATH[0].look));

  useFrame(() => {
    const t     = Math.min(0.9999, scrProgress);
    const index = t * (CAM_PATH.length - 1);
    const i     = Math.floor(index);
    const frac  = easeInOut(index - i);
    const a     = CAM_PATH[i];
    const b     = CAM_PATH[Math.min(i + 1, CAM_PATH.length - 1)];

    _camTarget.set(
      a.pos[0] + (b.pos[0] - a.pos[0]) * frac,
      a.pos[1] + (b.pos[1] - a.pos[1]) * frac,
      a.pos[2] + (b.pos[2] - a.pos[2]) * frac,
    );

    _lookTarget.set(
      a.look[0] + (b.look[0] - a.look[0]) * frac,
      a.look[1] + (b.look[1] - a.look[1]) * frac,
      a.look[2] + (b.look[2] - a.look[2]) * frac,
    );

    // Mouse parallax
    const mx = ((cursorPos?.x ?? 0) / window.innerWidth  - 0.5) * 4;
    const my = ((cursorPos?.y ?? 0) / window.innerHeight - 0.5) * 2;
    _lookTarget.x += mx;
    _lookTarget.y -= my;

    camera.position.lerp(_camTarget, 0.05);
    lookRef.current.lerp(_lookTarget, 0.04);
    camera.lookAt(lookRef.current);
  });

  return null;
}

export default CameraRig;