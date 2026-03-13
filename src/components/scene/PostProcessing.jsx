import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing';

function PostProcessing() {
  return (
    <EffectComposer>
      <Bloom
        luminanceThreshold={0.10}
        intensity={0.1}
        mipmapBlur
      />
      <Vignette
        offset={0.16}
        darkness={0.3}
      />
    </EffectComposer>
  );
}

export default PostProcessing;
