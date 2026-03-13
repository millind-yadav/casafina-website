// CityLights.jsx
// Sun direction matches Sky sunPosition={[1.2, 0.18, -0.7]}
// → light comes from right-front, slightly elevated (golden hour / late morning)

function CityLights() {
  return (
    <group>
      {/* Sky dome — warm top, cool blue-grey undersky */}
      <hemisphereLight
        args={['#c9dff5', '#8fa8b8', 0.65]}
      />

      {/* Very low ambient — let the directional light do the work */}
      <ambientLight color="#e8f0f8" intensity={0.12} />

      {/*
        Key sun light — matches Sky sunPosition [1.2, 0.18, -0.7]
        Position is just the normalised direction * some large scalar
        Warm golden-white, slightly raking from the right
      */}
      <directionalLight
        color="#fff4e0"
        intensity={1.1}
        position={[48, 28, -28]}
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-bias={-0.00015}
        shadow-camera-near={1}
        shadow-camera-far={200}
        shadow-camera-left={-80}
        shadow-camera-right={80}
        shadow-camera-top={80}
        shadow-camera-bottom={-80}
      />

      {/* Cool sky fill from opposite side — gives that overcast soft shadow look */}
      <directionalLight
        color="#aac4e0"
        intensity={0.35}
        position={[-30, 18, 22]}
      />

      {/* Soft ground bounce — warm light rising from city floor */}
      <pointLight
        color="#e8c870"
        intensity={0.06}
        position={[0, 10, -12]}
        distance={160}
        decay={2}
      />
    </group>
  );
}

export default CityLights;