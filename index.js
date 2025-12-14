import "dotenv/config";
import { startPoller } from "./poller.js";
import { startServer } from "./server.js";
import { transform } from "./transform.js";

startServer();
startPoller(transform);
