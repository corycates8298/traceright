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


export const palettes: Palette[] = [
  { 
    name: 'Purple Dream', 
    primary: '260 85% 60%', 
    primaryForeground: '0 0% 100%',
    swatches: ['#8A2BE2', '#9370DB', '#E6E6FA'] 
  },
  { 
    name: 'Ocean Blue', 
    primary: '210 85% 55%', 
    primaryForeground: '0 0% 100%',
    swatches: ['#1E90FF', '#87CEEB', '#F0F8FF'] 
  },
  { 
    name: 'Forest Green', 
    primary: '120 60% 45%', 
    primaryForeground: '0 0% 100%',
    swatches: ['#228B22', '#3CB371', '#F0FFF0']
  },
  { 
    name: 'Sunset Orange', 
    primary: '30 90% 55%', 
    primaryForeground: '0 0% 100%',
    swatches: ['#FF8C00', '#FFA500', '#FFF5E6']
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
]
