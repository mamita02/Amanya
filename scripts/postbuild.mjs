// Aplatit dist/client/* -> dist/  pour hébergement statique (Hostinger, etc.)
// Supprime aussi dist/server (inutile sans runtime Node).
import { readdirSync, renameSync, rmSync, existsSync } from "node:fs";
import { join } from "node:path";

const src = "dist/client";
const dst = "dist";

if (!existsSync(src)) {
  console.warn(`[postbuild] ${src} introuvable — rien à aplatir.`);
  process.exit(0);
}

for (const entry of readdirSync(src, { withFileTypes: true })) {
  const from = join(src, entry.name);
  const to = join(dst, entry.name);
  if (existsSync(to)) rmSync(to, { recursive: true, force: true });
  renameSync(from, to);
}

rmSync("dist/client", { recursive: true, force: true });
rmSync("dist/server", { recursive: true, force: true });

console.log("✓ dist/ aplati pour hébergement statique");