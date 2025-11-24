export const COLORS = {
  lemonade: '#FBD271',
  seaBlue: '#0F4E77',
  matcha: '#89A377',
  honey: '#E7BD8B',
  coffee: '#372516',
  bg: '#F5EFE7',
  ink: '#2A221C',
  muted: '#6B5C53',
  paper: '#F2E6D7',
  danger: '#C94B45',
  
  // Aliases
  get cream() { return this.honey; },
  get primary() { return this.seaBlue; },
  get accent() { return this.lemonade; },
  get ok() { return this.matcha; },
};

export const SIZES = {
  radius: 14,
  radiusLg: 22,
  radiusXl: 32,
};

export const SHADOWS = {
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 2,
  },
  default: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.12,
    shadowRadius: 28,
    elevation: 4,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 18 },
    shadowOpacity: 0.16,
    shadowRadius: 40,
    elevation: 6,
  },
};
