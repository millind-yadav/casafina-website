function CityLights() {
  return (
    <group>
      <ambientLight color="#ffffff" intensity={0.25} />

      {/* Main sun */}
      <directionalLight
        color="#fff5e8"
        intensity={1.2}
        position={[30, 40, 20]}
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-bias={-0.0001}
      />

      {/* Cool sky fill */}
      <directionalLight
        color="#c8d8ff"
        intensity={0.4}
        position={[-20, 20, -10]}
      />
    </group>
  );
}

export default CityLights;