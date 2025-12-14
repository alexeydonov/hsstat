import http from "http";
import fs from "fs/promises";

const CACHE_FILE = "./data/cache.json";

export function startServer() {
  http.createServer(async (_req, res) => {
    try {
      const data = await fs.readFile(CACHE_FILE, "utf8");
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(data);
    } catch {
      res.writeHead(503);
      res.end("Cache not ready");
    }
  }).listen(3000);
}
