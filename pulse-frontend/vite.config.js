import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],

  // This "proxy" is the bridge between the two servers.
  // While you develop, the front end runs on port 5173. When your
  // React code asks for "/articles" or "/saved", Vite quietly forwards
  // that request to your backend on port 4000. So your fetch() calls
  // stay exactly the same as before — no full URLs needed.
  server: {
    proxy: {
      "/articles": "http://localhost:4000",
      "/saved": "http://localhost:4000",
    },
  },
});