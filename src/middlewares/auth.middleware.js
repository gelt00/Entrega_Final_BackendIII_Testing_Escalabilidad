import jwt from "jsonwebtoken";
import { createError } from "../utils/createError.js";
import { env } from "../config/env.js";

export function authenticate(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return next(createError("Token is required", 401));
  }

  const [type, token] = authHeader.split(" ");
  if (type !== "Bearer" || !token) {
    return next(createError("Invalid authorization format", 401));
  }

  try {
    const decodedUser = jwt.verify(token, env.jwtSecret);
    req.user = decodedUser;

    next();
  } catch (error) {
    return next(createError("Invalid or expired token", 401));
  }
}

export function admin(req, res, next) {
  if (!req.user) {
    return next(createError("User not authenticated", 401));
  }

  if (req.user.role !== "admin") {
    return next(createError("Forbidden", 403));
  }

  next();
}
