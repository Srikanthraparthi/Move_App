import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: 'https://github.com/Srikanthraparthi/MovieApp', // Replace with your GitHub repo name
  plugins: [react()],
});
