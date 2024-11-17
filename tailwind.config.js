// tailwind.config.js
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Ajuste o caminho conforme a estrutura do seu projeto
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('daisyui'),
  ],
}
