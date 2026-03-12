import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { ContactShadows, Environment, Html, useProgress } from '@react-three/drei';
import * as THREE from 'three';

import ErrorBoundary  from '../ErrorBoundary';
import CityModel      from './CityModel';
import CityLights     from './CityLights';
import Particles      from './Particles';
import CameraRig      from './CameraRig';
import Ground         from './Ground';
import PostProcessing from './PostProcessing';

function SceneLoadingFallback() {
  const { progress } = useProgress();
  return (
    <Html center fullscreen>
      <div style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        justifyContent: 'center', gap: '1rem', color: '#ffffff',
        textAlign: 'center', pointerEvents: 'none',
      }}>
        <div style={{
          fontSize: '1rem', fontWeight: 500,
          letterSpacing: '0.18em', textTransform: 'uppercase',
        }}>
          Loading...
        </div>
        <div style={{
          width: '220px', maxWidth: '60vw', height: '6px',
          borderRadius: '999px', background: 'rgba(212, 146, 42, 0.22)',
          overflow: 'hidden', boxShadow: '0 0 0 1px rgba(212, 146, 42, 0.18)',
        }}>
          <div style={{
            width: `${Math.min(progress, 100)}%`, height: '100%',
            borderRadius: '999px',
            background: 'linear-gradient(90deg, #d4922a 0%, #f0b842 100%)',
            transition: 'width 120ms ease-out',
          }} />
        </div>
      </div>
    </Html>
  );
}

// function BackgroundAtmosphere() {
//   return (
//     <group>
//       <mesh position={[0, 56, -120]}>
//         <planeGeometry args={[300, 220]} />
//         <meshBasicMaterial color="#000000" transparent opacity={1} fog={false} />
//       </mesh>
//       <mesh position={[0, 24, -94]}>
//         <planeGeometry args={[180, 70]} />
//         <meshBasicMaterial color="#000000" transparent opacity={1} fog={false} />
//       </mesh>
//     </group>
//   );
// }
function BackgroundAtmosphere() {
  return (
    <group>
      <mesh position={[0, 56, -120]}>
        <planeGeometry args={[300, 220]} />
        <meshBasicMaterial color="#000000" transparent opacity={1} fog={false} />
      </mesh>
    </group>
  );
}

function SceneFog() {
  return <fogExp2 attach="fog" args={['#000000', 0.000]} />
}

function CityScene() {
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  return (
    <ErrorBoundary>
      <Canvas
        shadows
        dpr={isMobile ? [1, 1] : [1, 2]}
        frameloop="always"
        camera={{ fov: 65, near: 0.1, far: 800, position: [0, 3, 2] }}
        gl={{
          antialias: !isMobile,
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 0.75,
        }}
        style={{ position: 'fixed', inset: 0, zIndex: 0, background: '#000000' }}
      >
        {/* <SceneFog /> */}
        <Suspense fallback={<SceneLoadingFallback />}>
          {/* <Environment preset="night" background={false} /> */}
          <BackgroundAtmosphere />
          <Ground />
          <CityModel />
          <ContactShadows
            position={[0, 0.015, 0]}
            opacity={0.42}
            scale={130}
            blur={2.4}
            far={24}
            color="#000000"
          />
        </Suspense>
        <CityLights />
        <Particles count={isMobile ? 200 : 800} />
        <CameraRig />
        <PostProcessing />
      </Canvas>
    </ErrorBoundary>
  );
}

export default CityScene;