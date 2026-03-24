// /** @type {import('tailwindcss').Config} */
// module.exports = {
//   content: [
//     './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
//     './src/components/**/*.{js,ts,jsx,tsx,mdx}',
//     './src/app/**/*.{js,ts,jsx,tsx,mdx}',
//   ],
//   theme: {
//     extend: {
//       colors: {
//         primary: '#0B1F3B',
//         secondary: '#C6A75E',
//         accent: '#FFFFFF',
//         'light-gray': '#F4F4F4',
//       },
//       fontFamily: {
//         heading: ['var(--font-montserrat)', 'sans-serif'],
//         body: ['var(--font-open-sans)', 'sans-serif'],
//       },
//     },
//   },
//   plugins: [],
// }
















import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          'var(--font-open-sans)',
          'var(--font-montserrat)',
          'system-ui',
          '-apple-system',
          'Segoe UI',
          'Roboto',
          'Arial',
          'sans-serif',
        ],
      },
    },
  },

  // 🔑 Disable Tailwind preflight ONLY if you want full control (optional)
  // corePlugins: {
  //   preflight: false,
  // },

  plugins: [],
}

export default config