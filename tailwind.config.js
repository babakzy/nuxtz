/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class'],
  content: [],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          'Inter Variable',
          'Inter',
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          'sans-serif',
        ],
        display: [
          'Inter Variable',
          'Inter',
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          'sans-serif',
        ],
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
        'dk-xs': 'var(--dk-radius-xs)',
        'dk-sm': 'var(--dk-radius-sm)',
        'dk-md': 'var(--dk-radius-md)',
        'dk-lg': 'var(--dk-radius-lg)',
        'dk-pill': 'var(--dk-radius-pill)',
      },
      colors: {
        'dk-primary': 'var(--dk-primary)',
        'dk-primary-focus': 'var(--dk-primary-focus)',
        'dk-primary-on-dark': 'var(--dk-primary-on-dark)',
        'dk-ink': 'var(--dk-ink)',
        'dk-body-muted': 'var(--dk-body-muted)',
        'dk-ink-muted': 'var(--dk-ink-muted-80)',
        'dk-ink-subtle': 'var(--dk-ink-muted-48)',
        'dk-canvas': 'var(--dk-canvas)',
        'dk-parchment': 'var(--dk-canvas-parchment)',
        'dk-pearl': 'var(--dk-surface-pearl)',
        'dk-tile': 'var(--dk-surface-tile-1)',
        'dk-tile-2': 'var(--dk-surface-tile-2)',
        'dk-black': 'var(--dk-surface-black)',
        'dk-hairline': 'var(--dk-hairline)',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          1: 'hsl(var(--chart-1))',
          2: 'hsl(var(--chart-2))',
          3: 'hsl(var(--chart-3))',
          4: 'hsl(var(--chart-4))',
          5: 'hsl(var(--chart-5))',
        },
      },
      maxWidth: {
        content: '720px',
        store: '1024px',
      },
      boxShadow: {
        product: 'var(--dk-product-shadow)',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
}
