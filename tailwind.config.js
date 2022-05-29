const defaultSizes = {
  '1/10': '10%',
  '1/5': '20%',
  '1/4': '25%',
  '1/3': '33.33%',
  '2/5': '40%',
  '1/2': '50%',
  '3/5': '60%',
  '2/3': '66.66%',
  '3/4': '75%',
  '4/5': '80%',
  '9/10': '90%',
  '6xs': '1rem',
  '5xs': '2rem',
  '4xs': '3rem',
  '3xs': '4rem',
  '2xs': '5rem',
  xs: '6rem',
  base: '10rem',
  md: '12rem',
  lg: '14rem',
  xl: '16rem',
  '2xl': '18rem',
  '3xl': '20rem',
  '4xl': '24rem',
  '5xl': '28rem',
};

module.exports = {
  mode: 'jit',
  purge: [
    './apps/frontend/src/**/*.{html,js,ts}',
    './libs/components/src/lib/**/*.{html,js,ts}',
  ],
  theme: {
    container: {
      center: true,
      padding: '1rem',
    },
    screens: {
      sm: '768px',
      md: '1024px',
      xl: '1280px',
      '2xl': '1440px',
      '3xl': '1680px',
      '4xl': '1920px',
    },
    fontSize: {
      xs: ['0.625rem', '1rem'],
      sm: ['0.75rem', '1.125rem'],
      md: ['0.875rem', '1.25rem'],
      DEFAULT: ['1rem', '1.5rem'],
      xl: ['1.125rem', '1.5rem'],
      '2xl': ['1.25rem', '1.75rem'],
      '3xl': ['1.5rem', '2rem'],
      '4xl': ['2rem', '2.25rem'],
      '5xl': ['2.5rem', '2.5rem'],
      '6xl': ['3rem', '2.5rem'],
      '7xl': ['3.5rem', '2.5rem'],
      '8xl': ['4rem', '2.5rem'],
      massive: ['10rem', '10rem'],
    },
    fontWeight: {
      normal: 400,
      semiBold: 500,
      bold: 700,
    },
    fontFamily: {
      sans: ['Noto Sans', 'sans-serif'],
    },
    extend: {
      minHeight: {
        ...defaultSizes,
      },
      maxHeight: {
        ...defaultSizes,
      },
      maxWidth: {
        fit: 'fit-content',
        ...defaultSizes,
      },
      minWidth: {
        ...defaultSizes,
      },
      inset: {
        ...defaultSizes,
        41: '41%',
        48: '48%',
      },
      height: {
        '10vh': '10vh',
        '20vh': '20vh',
        '30vh': '30vh',
        '40vh': '40vh',
        '50vh': '50vh',
      },
      zIndex: {
        100: '100',
        150: '150',
        200: '200',
      },
      colors: {
        black: {
          DEFAULT: 'var(--black)',
          light: 'var(--black-light)',
          dark: 'var(--black-dark)',
        },
        red: {
          DEFAULT: 'var(--red)',
          light: 'var(--red-light)',
        },
        yellow: {
          DEFAULT: 'var(--yellow)',
          light: 'var(--yellow-light)',
        },
        'fluorescent-green': {
          DEFAULT: 'var(--fluorescent-green)',
          light: 'var(--fluorescent-green-light)',
        },
      },
    },
  },
  plugins: [],
};
