import { assetPath } from '../../utils/assetPath';

function BrandLogo({
  width = '180px',
  alt = 'Casafina Construction logo',
  style,
}) {
  return (
    <img
      src={assetPath('images/Casafina-construction-222x86.png')}
      alt={alt}
      style={{
        width,
        height: 'auto',
        display: 'block',
        objectFit: 'contain',
        ...style,
      }}
    />
  );
}

export default BrandLogo;