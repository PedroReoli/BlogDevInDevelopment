const path = require('path');
const { defineConfig } = require('vite');

module.exports = defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    outDir: 'dist', // Garante a saída no diretório correto
  },
});
