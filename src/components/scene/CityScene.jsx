import { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { ContactShadows, Html, useProgress } from '@react-three/drei';
import * as THREE from 'three';

import ErrorBoundary  from '../ErrorBoundary';
import CityModel      from './CityModel';
import CityLights     from './CityLights';
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
        <div style={{ fontSize: '1rem', fontWeight: 500, letterSpacing: '0.18em', textTransform: 'uppercase' }}>
          Loading...
        </div>
        <div style={{
          width: '220px', maxWidth: '60vw', height: '6px', borderRadius: '999px',
          background: 'rgba(212, 146, 42, 0.22)', overflow: 'hidden',
          boxShadow: '0 0 0 1px rgba(212, 146, 42, 0.18)',
        }}>
          <div style={{
            width: `${Math.min(progress, 100)}%`, height: '100%', borderRadius: '999px',
            background: 'linear-gradient(90deg, #d4922a 0%, #f0b842 100%)',
            transition: 'width 120ms ease-out',
          }} />
        </div>
      </div>
    </Html>
  );
}

// ─────────────────────────────────────────────────────────────────────
// GLSL Sky with FBM Clouds
// ─────────────────────────────────────────────────────────────────────
const skyVert = /* glsl */`
  varying vec3 vWorldDir;
  void main() {
    vWorldDir = normalize((modelMatrix * vec4(position, 0.0)).xyz);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const skyFrag = /* glsl */`
  uniform vec3  uZenith;
  uniform vec3  uMid;
  uniform vec3  uHorizon;
  uniform vec3  uGround;
  uniform vec3  uSunDir;
  uniform vec3  uSunColor;
  uniform float uTime;

  varying vec3 vWorldDir;

  // ── Hash & noise ────────────────────────────────────────────────
  vec2 hash2(vec2 p) {
    p = vec2(dot(p, vec2(127.1, 311.7)),
             dot(p, vec2(269.5, 183.3)));
    return -1.0 + 2.0 * fract(sin(p) * 43758.5453123);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f); // smoothstep
    return mix(
      mix(dot(hash2(i + vec2(0,0)), f - vec2(0,0)),
          dot(hash2(i + vec2(1,0)), f - vec2(1,0)), u.x),
      mix(dot(hash2(i + vec2(0,1)), f - vec2(0,1)),
          dot(hash2(i + vec2(1,1)), f - vec2(1,1)), u.x),
      u.y
    );
  }

  // ── FBM — 5 octaves for fluffy cloud detail ──────────────────────
  float fbm(vec2 p) {
    float v = 0.0;
    float a = 0.5;
    vec2  s = vec2(1.0);
    for (int i = 0; i < 5; i++) {
      v += a * noise(p);
      p  = p * 2.1 + vec2(1.7, 9.2);
      a *= 0.5;
    }
    return v;
  }

  void main() {
    vec3  dir = normalize(vWorldDir);
    float h   = dir.y;

    // ── Sky gradient ─────────────────────────────────────────────
    float tHorizon = smoothstep(0.0,  0.14, h);
    float tZenith  = smoothstep(0.12, 0.75, h);
    vec3  sky      = mix(uHorizon, uMid,    tHorizon);
    sky             = mix(sky,     uZenith, tZenith);

    // ── Horizon warm band ────────────────────────────────────────
    float band = exp(-abs(h) * 14.0) * 0.18;
    sky += vec3(0.85, 0.72, 0.40) * band;

    // ── Sun glow + disc ─────────────────────────────────────────
    float sd   = dot(dir, uSunDir);
    float glow = pow(max(0.0, sd), 4.0)    * 0.35;
    float halo = pow(max(0.0, sd), 64.0)   * 0.90;
    float disc = pow(max(0.0, sd), 1000.0) * 6.00;
    sky += uSunColor * (glow + halo);
    sky += vec3(1.0, 0.98, 0.92) * disc;

    // ── Clouds ───────────────────────────────────────────────────
    // Only render clouds in the upper hemisphere (h > 0.04)
    // Project sphere direction onto a flat cloud plane
    if (h > 0.04) {
      // Spherical → flat plane projection
      // Divide xz by y so overhead clouds are denser, horizon clouds stretch naturally
      vec2  cloudUV = dir.xz / (h + 0.05);

      // Slow drift — x direction, very gentle
      float drift   = uTime * 0.018;
      cloudUV      += vec2(drift, 0.0);

      // Two FBM layers at different scales for fluffy detail
      float f1 = fbm(cloudUV * 1.4);
      float f2 = fbm(cloudUV * 2.8 + vec2(4.2, 1.7));
      float f  = f1 * 0.65 + f2 * 0.35;

      // Remap: sharpen the cloud edges via smoothstep
      // threshold controls coverage (lower = more clouds)
      float threshold = 0.08;
      float cloud = smoothstep(threshold, threshold + 0.30, f);

      // Cloud height fade — less cloud near horizon, full overhead
      float heightFade = smoothstep(0.04, 0.22, h);
      cloud *= heightFade;

      // Cloud shading:
      //  – lit face: bright white, slightly warm on sun side
      //  – shadow belly: cool grey-blue underside
      float sunLit   = max(0.0, dot(dir, uSunDir)) * 0.4 + 0.6;
      vec3  cloudLit = mix(
        vec3(0.78, 0.84, 0.92),   // shadow belly — cool blue-grey
        vec3(1.00, 0.99, 0.97),   // bright lit top — near white
        sunLit
      );

      // Subtle warm tint on the sun-facing side
      cloudLit += uSunColor * 0.06 * max(0.0, dot(dir, uSunDir));

      sky = mix(sky, cloudLit, cloud * 0.88);
    }

    // ── Below horizon ────────────────────────────────────────────
    float below = smoothstep(0.0, -0.10, h);
    sky = mix(sky, uGround, below);

    gl_FragColor = vec4(sky, 1.0);
  }
`;

const ZENITH  = '#1060b8';
const MID     = '#2e90d0';
const HORIZON = '#5aace0';
const GROUND  = '#4a90c0';
const FOG_COL = '#5aace0';

function GradientSky() {
  const matRef = useRef();
  const sunDir = new THREE.Vector3(48, 28, -28).normalize();

  const uniforms = useRef({
    uZenith:   { value: new THREE.Color(ZENITH)  },
    uMid:      { value: new THREE.Color(MID)     },
    uHorizon:  { value: new THREE.Color(HORIZON) },
    uGround:   { value: new THREE.Color(GROUND)  },
    uSunDir:   { value: sunDir },
    uSunColor: { value: new THREE.Color('#ffd080') },
    uTime:     { value: 0 },
  });

  useFrame(({ clock }) => {
    if (matRef.current) {
      matRef.current.uniforms.uTime.value = clock.elapsedTime;
    }
  });

  return (
    <mesh renderOrder={-1}>
      <sphereGeometry args={[490, 64, 32]} />
      <shaderMaterial
        ref={matRef}
        vertexShader={skyVert}
        fragmentShader={skyFrag}
        uniforms={uniforms.current}
        side={THREE.BackSide}
        depthWrite={false}
      />
    </mesh>
  );
}

function SceneFog() {
  return <fogExp2 attach="fog" args={[FOG_COL, 0.005]} />;
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
          toneMappingExposure: 0.88,
        }}
        style={{ position: 'fixed', inset: 0, zIndex: 0, background: FOG_COL }}
      >
        <SceneFog />
        <GradientSky />
        <Suspense fallback={<SceneLoadingFallback />}>
          <Ground />
          <CityModel />
          <ContactShadows
            position={[0, 0.015, 0]}
            opacity={0.45}
            scale={130}
            blur={2.4}
            far={24}
            color="#000000"
          />
        </Suspense>
        <CityLights />
        <CameraRig />
        <PostProcessing />
      </Canvas>
    </ErrorBoundary>
  );
}

export default CityScene;