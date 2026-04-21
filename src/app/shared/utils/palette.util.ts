import chroma from 'chroma-js';

export function createPalette(base: string) {
  const scale = chroma
    .scale([chroma(base).brighten(3), base, chroma(base).darken(3)])
    .mode('lab')
    .colors(10);

  const bg = scale[9];

  return {
    50: scale[0],
    100: scale[1],
    200: scale[2],
    300: scale[3],
    400: scale[4],
    500: scale[5],
    600: scale[6],
    700: scale[7],
    800: scale[8],
    900: scale[9],

    // Semantic roles.
    bg: scale[0],
    surface: scale[8],
    surfaceAlt: scale[7],
    border: scale[6],
    text: chroma.contrast(scale[9], '#fff') > 4.5 ? '#111' : '#fff',
    // text: chroma.contrast(bg, '#fff') > 4.5 ? '#111' : '#fff',
    textMuted: scale[3],
    accent: scale[4],
    accentHover: scale[3],
    accentActive: scale[2],

    // State colors.
    hover: chroma(base).brighten(0.5).hex(),
    active: chroma(base).darken(0.5).hex(),
    focus: chroma(base).saturate(1).hex(),
  };
}
