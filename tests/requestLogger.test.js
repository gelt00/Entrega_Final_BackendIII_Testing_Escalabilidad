import { jest } from "@jest/globals";

import {
  getLogLevel,
  requestLogger,
} from "../src/middlewares/requestLogger.js";

describe("getLogLevel", () => {
  test("debería devolver info para status codes menores a 400", () => {
    expect(getLogLevel(200)).toBe("info");
    expect(getLogLevel(201)).toBe("info");
  });

  test("debería devolver warn para status codes desde 400 hasta 499", () => {
    expect(getLogLevel(400)).toBe("warn");
    expect(getLogLevel(404)).toBe("warn");
  });

  test("debería devolver error para status codes desde 500", () => {
    expect(getLogLevel(500)).toBe("error");
  });
});

describe("requestLogger middleware", () => {
  test("debería registrar el evento finish y llamar a next", () => {
    const req = {
      method: "GET",
      originalUrl: "/api/products",
      reqId: "test-req-id",
    };

    const res = {
      on: jest.fn(),
      statusCode: 200,
    };

    const next = jest.fn();

    requestLogger(req, res, next);
    expect(res.on).toHaveBeenCalledWith("finish", expect.any(Function));
    expect(next).toHaveBeenCalledTimes(1);
  });
});
