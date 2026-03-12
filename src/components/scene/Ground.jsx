function Ground() {
  return (
    <group>
      <mesh position={[0, -0.78, 0]} receiveShadow castShadow>
        <boxGeometry args={[122, 1.6, 106]} />
        <meshStandardMaterial color="#080808" roughness={0.9} metalness={0.05} />
      </mesh>

      <mesh position={[0, 0.01, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[114, 98]} />
        <meshStandardMaterial
          color="#0d0d0d"
          roughness={0.26}
          metalness={0.2}
          envMapIntensity={0.75}
        />
      </mesh>

      <mesh position={[0, -0.025, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[220, 220]} />
        <meshStandardMaterial color="#0a0a0f" roughness={1} metalness={0} />
      </mesh>

      {[-26, 0, 26].map((x) => (
        <mesh key={`joint-x-${x}`} position={[x, 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[0.16, 98]} />
          <meshBasicMaterial color="#1f2631" transparent opacity={0.45} />
        </mesh>
      ))}

      {[-18, 18].map((z) => (
        <mesh key={`joint-z-${z}`} position={[0, 0.02, z]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[114, 0.16]} />
          <meshBasicMaterial color="#1f2631" transparent opacity={0.45} />
        </mesh>
      ))}

      <mesh position={[0, 0.025, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[40, 0.08, 12, 140]} />
        <meshStandardMaterial
          color="#D4922A"
          emissive="#D4922A"
          emissiveIntensity={0.75}
          roughness={0.32}
          metalness={0.45}
        />
      </mesh>

      <mesh position={[0, 0.022, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[40.5, 0.08, 12, 140]} />
        <meshBasicMaterial color="#D4922A" transparent opacity={0.3} />
      </mesh>

      <mesh position={[0, 0.01, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[39.6, 40.5, 140]} />
        <meshBasicMaterial color="#D4922A" transparent opacity={0.12} />
      </mesh>

      <pointLight color="#D4922A" intensity={2.2} position={[0, 0.3, 0]} distance={65} decay={2} />
    </group>
  );
}

export default Ground;
