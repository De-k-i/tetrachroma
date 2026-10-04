/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        'tetra-graphite': '#121418',
        'tetra-slate': '#1B1F26',
        'tetra-slate-light': '#242933',
        'tetra-border': '#2E3542',
        'tetra-parchment': '#E5E7EB',
        'tetra-muted': '#9CA3AF',
        'tetra-solar': '#F2E205',
        'tetra-solar-hover': '#D9CA04',
        'tetra-cobalt': '#2175BF',
        'tetra-cobalt-light': '#3A8FD9',
        'tetra-carmine': '#D90404',
        'tetra-emerald': '#10B981',
      },
      fontFamily: {
        grotesk: ['"Space Grotesk"', 'sans-serif'],
        mono: ['"Space Mono"', 'monospace'],
      },
      boxShadow: {
        'hard-sm': '2px 2px 0px #000000',
        'hard': '4px 4px 0px #000000',
        'hard-lg': '6px 6px 0px #000000',
        'hard-solar': '4px 4px 0px #F2E205',
        'hard-cobalt': '4px 4px 0px #2175BF',
      },
      borderRadius: {
        'none': '0px',
      }
    },
  },
  plugins: [],
}


