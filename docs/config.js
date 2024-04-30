const QUADRANTS = [
  {
    name: 'Techniques',
    id: 4,
  },
  {
    name: 'Platforms',
    id: 1,
  },
  {
    name: 'Languages & Frameworks',
    id: 2,
  },
  {
    name: 'Tools',
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
    inactive: 'var(--color-grey-1)',
  },
  quadrants: QUADRANTS,
  rings: RINGS,
  print_rings: true,
  print_legend: false,
};
