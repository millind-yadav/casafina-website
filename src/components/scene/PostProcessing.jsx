import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing';

function PostProcessing() {
  return (
    <EffectComposer>
      <Bloom
        luminanceThreshold={0.1}
        intensity={0.8}
        mipmapBlur
      />
      <Vignette
        offset={0.2}
        darkness={0.85}
      />
    </EffectComposer>
  );
}

export default PostProcessing;
