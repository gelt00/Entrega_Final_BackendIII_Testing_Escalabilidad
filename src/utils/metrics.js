import client from "prom-client";

export const requestCounter = new client.Counter({
  name: "http_requests_total",
  help: "Total de request",
  labelNames: ["method", "status"],
});

export const requestDuration = new client.Histogram({
  name: "http_request_duration_seconds",
  help: "Duración de request en segundos",
  buckets: [0.1, 0.5, 1],
});
