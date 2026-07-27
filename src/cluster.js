import cluster from "cluster";
import os from "os";
import { env } from "./config/env.js";
import { logger } from "./utils/logger.js";

const cpuCount = os.cpus().length;
const workersCount = Math.min(env.workers, cpuCount);

if (cluster.isPrimary) {
  logger.info({
    msg: "Primary process started",
    primaryPid: process.pid,
    cpuCount,
    workersCount,
  });

  for (let i = 0; i < workersCount; i++) {
    cluster.fork();
  }
} else {
  await import("./server.js");
}
