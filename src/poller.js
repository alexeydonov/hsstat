import fs from "fs/promises";

const URL = process.env.HEADSCALE_URL;
const API_KEY = process.env.API_KEY;
const INTERVAL = 60_000;
const CACHE_FILE = "./data/cache.json";

export async function startPoller(transform) {
  async function poll() {
    try {
      const res = await fetch(URL, {
        headers: { Authorization: `Bearer ${API_KEY}` }
      });

      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      const raw = await res.json();
      const transformed = transform(raw);

      await fs.writeFile(
        CACHE_FILE,
        JSON.stringify(transformed, null, 2),
        "utf8"
      );
    } catch (err) {
      console.error("Poll failed:", err.message);
    }
  }

  await poll();               // run once at startup
  setInterval(poll, INTERVAL);
}
