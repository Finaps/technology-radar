const QUADRANTS = [
  {
    name: 'Techniques',
    id: 4,
    description:
      'are elements of a software process, such as experience design and/or code, methodologies, and ways of structuring the software as microservices.',
  },
  {
    name: 'Platforms',
    id: 1,
    description:
      'similar to the previous one, they are software that helps in the development; however, they are made available without direct team maintenance. Overall, they fit in as a PaaS and/or SaaS.',
  },
  {
    name: 'Languages & Frameworks',
    id: 2,
    description:
      'are the tools that we use directly in the development of projects',
  },
  {
    name: 'Tools',
    id: 3,
    description:
      'we use software directly for development, requiring direct maintenance. For example, a database, a container orchestrator, etc.',
  },
];

const RINGS = [
  { name: 'ADOPT', color: 'var(--color-accent-1)', id: 0 },
  { name: 'TRIAL', color: 'var(--color-accent-2)', id: 1 },
  { name: 'ASSESS', color: 'var(--color-accent-3)', id: 2 },
  { name: 'HOLD', color: 'var(--color-accent-4)', id: 3 },
];

const RADAR_WIDTH = 1400 - 4 * 16;

const RADAR_CONFIG = {
  svg_id: 'radar',
  width: RADAR_WIDTH,
  height: 1000,
  colors: {
    grid: 'var(--border-color)',
    inactive: 'var(--color-grey-1)',
  },
  quadrants: QUADRANTS,
  rings: RINGS,
  print_rings: true,
  print_legend: true,
};
