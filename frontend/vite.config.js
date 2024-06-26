import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import fs from "fs";
import path from "path";

export default defineConfig({
  server: {
    https: {
      key: fs.readFileSync(path.resolve(__dirname, "key.pem")),
      cert: fs.readFileSync(path.resolve(__dirname, "cert.pem")),
    },
    proxy: {
      "/": {
        target: "https://homelink-nyna.onrender.com",
        changeOrigin: true,
        secure: false, // הגדר ל-true אם יש לך תעודת SSL תקפה
      },
    },
    build:{
      outDir:"dist"
    },
  },
  base:"/",
  plugins: [react()],
});
