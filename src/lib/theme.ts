
export type Palette = {
  name: string;
  primary: string;
  primaryForeground: string;
  swatches: [string, string, string];
};

export type Font = {
  name: string;
  variable: string;
  className: string;
};

export type Gradient = {
  name: string;
  description: string;
};

export type SolidColor = {
  name: string;
  value: string;
}

export type Pattern = {
  name: string;
  className: string;
}

export const palettes: Palette[] = [
  {
    name: 'TraceRight Teal',
    primary: '167 19% 56%',
    primaryForeground: '0 0% 100%',
    swatches: ['#73A89A', '#84A176', '#F0F4F3'],
  },
  {
    name: 'Ocean Blue',
    primary: '210 85% 55%',
    primaryForeground: '0 0% 100%',
    swatches: ['#1E90FF', '#87CEEB', '#F0F8FF'],
  },
  {
    name: 'Forest Green',
    primary: '120 60% 45%',
    primaryForeground: '0 0% 100%',
    swatches: ['#228B22', '#3CB371', '#F0FFF0'],
  },
  {
    name: 'Sunset Orange',
    primary: '30 90% 55%',
    primaryForeground: '0 0% 100%',
    swatches: ['#FF8C00', '#FFA500', '#FFF5E6'],
  },
];

export const fonts: Font[] = [
  { name: 'Inter', variable: 'var(--font-inter)', className: 'font-sans' },
  { name: 'System Sans', variable: 'sans-serif', className: 'font-sans' },
  { name: 'Monospace', variable: 'monospace', className: 'font-mono' },
  { name: 'Serif', variable: 'serif', className: 'font-serif' },
];

export const gradients: Gradient[] = [
  { name: 'Linear', description: 'Left to right flow' },
  { name: 'Radial', description: 'Center outward' },
  { name: 'Conic', description: 'Circular sweep' },
  { name: 'Diagonal', description: 'Corner to corner' },
];

export const solidColors: SolidColor[] = [
  { name: 'Matte Black', value: '#1c1c1c' },
  { name: 'Deep Navy', value: '#000080'},
  { name: 'Charcoal', value: '#36454F'},
  { name: 'Slate Gray', value: '#708090'},
  { name: 'Light Gray', value: '#D3D3D3' },
  { name: 'Off White', value: '#F5F5F5' },
  { name: 'Mint Green', value: '#98FF98' },
  { name: 'Sky Blue', value: '#87CEEB' },
];

export const patterns: Pattern[] = [
    { name: 'Dots', className: 'bg-dots'},
    { name: 'Grid', className: 'bg-grid'},
    { name: 'Diagonal', className: 'bg-diagonal'},
    { name: 'Waves', className: 'bg-waves'},
]
