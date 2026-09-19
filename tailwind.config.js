/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        page: {
          DEFAULT: 'var(--page)',
          muted: 'var(--page-muted)',
        },
        surface: {
          DEFAULT: 'var(--surface)',
          raised: 'var(--surface-raised)',
        },
        line: {
          DEFAULT: 'var(--line)',
          strong: 'var(--line-strong)',
        },
        ink: {
          DEFAULT: 'var(--ink)',
          soft: 'var(--ink-soft)',
        },
        mute: 'var(--mute)',
        accent: {
          DEFAULT: 'var(--accent)',
          strong: 'var(--accent-strong)',
          dim: 'var(--accent-dim)',
        },
      },
      fontFamily: {
        sans: ['Instrument Sans', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['IBM Plex Mono', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      maxWidth: {
        site: 'var(--width-site)',
        prose: 'var(--width-prose)',
        content: 'var(--width-content)',
      },
      boxShadow: {
        soft: 'var(--shadow-soft)',
        lift: 'var(--shadow-lift)',
        assistant: 'var(--shadow-assistant)',
      },
    },
  },
  plugins: [],
}
