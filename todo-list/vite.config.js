import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 5007, // 포트 변경 가능
    strictPort: true,
    proxy: {
      "/socket.io": {
        target: "wss://kart.hollywood.kro.kr:5007",
        ws: true
      }
    }
  },
});