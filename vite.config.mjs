import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.dirname(fileURLToPath(import.meta.url));
const publicDir = path.join(root, "public");
const outDir = path.join(root, "dist", "client");

const mimeTypes = new Map([
  [".avif", "image/avif"],
  [".gif", "image/gif"],
  [".jpg", "image/jpeg"],
  [".jpeg", "image/jpeg"],
  [".mp4", "video/mp4"],
  [".png", "image/png"],
  [".svg", "image/svg+xml"],
  [".webp", "image/webp"],
]);

function servePublicAssets() {
  return {
    name: "serve-public-assets-without-watch",
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const url = new URL(req.url || "/", "http://localhost");
        const pathname = decodeURIComponent(url.pathname);

        if (!pathname.startsWith("/assets/")) {
          next();
          return;
        }

        const filePath = path.normalize(path.join(publicDir, pathname.slice(1)));

        if (!filePath.startsWith(publicDir) || !fs.existsSync(filePath)) {
          next();
          return;
        }

        const stat = fs.statSync(filePath);

        if (!stat.isFile()) {
          next();
          return;
        }

        const extension = path.extname(filePath).toLowerCase();
        const contentType = mimeTypes.get(extension) || "application/octet-stream";
        res.setHeader("Content-Type", contentType);

        if (extension === ".mp4") {
          res.setHeader("Accept-Ranges", "bytes");
        }

        if (req.method === "HEAD") {
          res.setHeader("Content-Length", stat.size);
          res.statusCode = 200;
          res.end();
          return;
        }

        const range = req.headers.range;

        if (extension === ".mp4" && range) {
          const match = /^bytes=(\d*)-(\d*)$/.exec(range);
          const start = match?.[1] ? Number(match[1]) : 0;
          const end = match?.[2] ? Number(match[2]) : stat.size - 1;
          const safeEnd = Math.min(end, stat.size - 1);

          res.statusCode = 206;
          res.setHeader("Content-Range", `bytes ${start}-${safeEnd}/${stat.size}`);
          res.setHeader("Content-Length", safeEnd - start + 1);
          fs.createReadStream(filePath, { start, end: safeEnd }).pipe(res);
          return;
        }

        res.setHeader("Content-Length", stat.size);
        fs.createReadStream(filePath).pipe(res);
      });
    },
    closeBundle() {
      fs.cpSync(publicDir, outDir, { recursive: true });
    },
  };
}

export default defineConfig({
  base: './',
  publicDir: false,
  build: {
    outDir: "dist/client",
  },
  optimizeDeps: {
    include: ["react", "react-dom/client"],
  },
  server: {
    host: "0.0.0.0",
    allowedHosts: ["terminal.local"],
    watch: {
      ignored: ["**/public/assets/**"],
    },
    warmup: {
      clientFiles: ["./src/main.jsx"],
    },
  },
  plugins: [react(), servePublicAssets()],
});
