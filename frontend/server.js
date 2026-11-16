// Minimal production server: serves the Vite build output in ./dist.
// Run `npm run build` first (hosting platforms like Heroku do this automatically).
import path from "node:path";
import { fileURLToPath } from "node:url";
import express from "express";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.join(__dirname, "dist");
const PORT = process.env.PORT || 8080;

const app = express();

app.use(express.static(distDir));

app.listen(PORT, (error) => {
  if (error) {
    console.error(error);
    process.exit(1);
  }
  console.info(`==> Listening on port ${PORT}. Visit http://localhost:${PORT}/ in your browser.`);
});
