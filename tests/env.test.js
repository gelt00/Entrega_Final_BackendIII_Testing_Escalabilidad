import { jest } from "@jest/globals";

const originalEnv = process.env;

async function loadEnv(customEnv = {}, keysToDelete = []) {
  jest.resetModules();
  process.env = {
    ...originalEnv,
    ...customEnv,
  };

  keysToDelete.forEach((key) => {
    delete process.env[key];
  });

  const { env } = await import("../src/config/env.js");

  return env;
}

afterEach(() => {
  process.env = originalEnv;
  jest.resetModules();
});

describe("env config", () => {
  test("deberia convertir PORT a number", async () => {
    const env = await loadEnv({ PORT: "8080" });

    expect(env.port).toBe(8080);
  });

  test("debería usar 3000 como puerto por defecto si PORT no existe", async () => {
    const env = await loadEnv({}, ["PORT"]);

    expect(env.port).toBe(3000);
  });

  test("debería interpretar MAINTENANCE=true como boolean true", async () => {
    const env = await loadEnv({ MAINTENANCE: "true" });

    expect(env.maintenance).toBe(true);
  });

  test("debería interpretar NODE_ENV=production como isProd true", async () => {
    const env = await loadEnv({ NODE_ENV: "production" });

    expect(env.isProd).toBe(true);
  });

  test("debería convertir CLUSTER_WORKERS a número", async () => {
    const env = await loadEnv({ CLUSTER_WORKERS: "4" });

    expect(env.workers).toBe(4);
  });
});
