import mongoose from "mongoose";
import { env } from "../config/env.js";
import { successResponse } from "../utils/apiResponse.js";

export function getHealth(req, res) {
  const dbStatus = mongoose.connection.readyState === 1 ? 'connected' : 'disconnected';
  return successResponse(res, {
    message: 'ok',
    payload: {
      environment: env.nodeEnv,
      store: env.storeName,
      database: dbStatus,
    }
  });
};