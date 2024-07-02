const QUADRANTS = [
  {
    name: 'Technologies',
    id: 4,
  },
  {
    name: 'Tools',
    id: 1,
  },
  {
    name: 'Platforms',
    id: 2,
  },
  {
    name: 'Methodologies & Practices',
    id: 3,
  },
];

const RINGS = [
  { name: 'ADOPT', color: 'var(--color-accent-1)', id: 0 },
  { name: 'TRIAL', color: 'var(--color-accent-2)', id: 1 },
  { name: 'ASSESS', color: 'var(--color-accent-3)', id: 2 },
  { name: 'HOLD', color: 'var(--color-accent-4)', id: 3 },
];

const RADAR_CONFIG = {
  svg_id: 'radar',
  width: 804,
  height: 804,
  colors: {
    grid: 'var(--border-color)',
    inactive: 'var(--bg-inactive-blip)',
  },
  quadrants: QUADRANTS,
  rings: RINGS,
  print_rings: true,
  print_legend: false,
};
