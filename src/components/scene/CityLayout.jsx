import Building from './Building';

const BUILDINGS = [
  { position: [0,   0, -8],  width: 6,   depth: 4, floors: 18, style: 'hero'   },
  { position: [-10, 0, -12], width: 4,   depth: 3, floors: 12, style: 'tower'  },
  { position: [10,  0, -10], width: 5,   depth: 4, floors: 14, style: 'tower'  },
  { position: [-18, 0, -14], width: 5,   depth: 4, floors: 8                   },
  { position: [18,  0, -12], width: 4,   depth: 3, floors: 10                  },
  { position: [-6,  0, -20], width: 8,   depth: 6, floors: 16                  },
  { position: [6,   0, -18], width: 7,   depth: 5, floors: 20, style: 'tower'  },
  { position: [-22, 0, -18], width: 6,   depth: 5, floors: 14                  },
  { position: [22,  0, -16], width: 5,   depth: 4, floors: 12                  },
  { position: [-14, 0, -22], width: 6,   depth: 5, floors: 10                  },
  { position: [14,  0, -20], width: 5,   depth: 5, floors: 22, style: 'hero'   },
  { position: [0,   0, -26], width: 10,  depth: 8, floors: 8                   },
  { position: [-28, 0, -20], width: 4,   depth: 3, floors: 18                  },
  { position: [28,  0, -18], width: 4,   depth: 3, floors: 16                  },
  { position: [-4,  0, -2],  width: 3,   depth: 2, floors: 5                   },
  { position: [4,   0, -2],  width: 2.5, depth: 2, floors: 6                   },
  { position: [-8,  0, -4],  width: 3,   depth: 3, floors: 4                   },
  { position: [8,   0, -4],  width: 3,   depth: 2.5, floors: 7                 },
];

function CityLayout({ isMobile = false }) {
  const buildings = isMobile ? BUILDINGS.slice(0, 10) : BUILDINGS;
  return (
    <group>
      {buildings.map((b, i) => (
        <Building
          key={i}
          position={b.position}
          width={b.width}
          depth={b.depth}
          floors={b.floors}
          style={b.style || 'standard'}
        />
      ))}
    </group>
  );
}

export default CityLayout;
