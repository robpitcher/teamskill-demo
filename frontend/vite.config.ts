// Use Vite dev server proxy to forward /api -> backend service in Docker network
const backendUrl = 'http://backend:4000'

export default {
  server: {
    host: true,
    port: 5173,
    proxy: {
      '/api': {
        target: backendUrl,
        changeOrigin: true,
        rewrite: (path: string) => path.replace(/^\/api/, '')
      }
    }
  }
}
