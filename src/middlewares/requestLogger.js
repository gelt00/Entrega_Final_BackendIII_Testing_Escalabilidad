import { logger } from "../utils/logger.js";
import { requestCounter, requestDuration } from "../utils/metrics.js";

export function getLogLevel(statusCode) {
  if (statusCode >= 500) return "error";
  if (statusCode >= 400) return "warn";
  return "info";
}

export function requestLogger(req, res, next) {
  const start = Date.now();

  res.on("finish", () => {
    requestCounter.labels(req.method, res.statusCode).inc();
    const responseTimeMs = Date.now() - start;
    requestDuration.observe(responseTimeMs / 1000);
    const logLevel = getLogLevel(res.statusCode);

    logger[logLevel]({
      msg: "HTTP Request",
      reqId: req.reqId,
      method: req.method,
      path: req.originalUrl,
      statusCode: res.statusCode,
      responseTimeMs,
    });
  });

  next();
}
