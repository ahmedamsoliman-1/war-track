import { createProxyMiddleware } from "http-proxy-middleware";
import logger from "./utils/logger";
import dotenv from "dotenv";

dotenv.config();

const userServiceUrl = process.env.USER_SERVICE_URL || "http://user-service:4001";
const warServiceUrl = process.env.WAR_SERVICE_URL || "http://war-service:4000";
const discussionServiceUrl = process.env.DISCUSSION_SERVICE_URL || "http://discussion-service:4002";

console.log(`User Service URL: ${userServiceUrl}`);
console.log(`War Service URL: ${warServiceUrl}`);
console.log(`Discussion Service URL: ${discussionServiceUrl}`);

export const userProxy = createProxyMiddleware({
  target: userServiceUrl,
  changeOrigin: true,
  pathRewrite: { "^/api/users": "/api/users" },
  onProxyReq: (proxyReq, req) => {
    logger.info(`Proxying ${req.method} ${req.originalUrl} -> User Service`);
  },
  onError: (err, req, res) => {
    logger.error(`User Service proxy error: ${err.message}`);
    res.status(502).json({ error: "Bad gateway" });
  }
});

export const warProxy = createProxyMiddleware({
  target: warServiceUrl,
  changeOrigin: true,
  pathRewrite: { "^/api/wars": "/api/wars" },
  onProxyReq: (proxyReq, req) => {
    logger.info(`Proxying ${req.method} ${req.originalUrl} -> War Service`);
  },
  onError: (err, req, res) => {
    logger.error(`War Service proxy error: ${err.message}`);
    res.status(502).json({ error: "Bad gateway" });
  }
});

export const discussionProxy = createProxyMiddleware({
  target: discussionServiceUrl,
  changeOrigin: true,
  pathRewrite: { "^/api/discussions": "/api/discussions" },
  onProxyReq: (proxyReq, req) => {
    logger.info(`Proxying ${req.method} ${req.originalUrl} -> Discussion Service`);
  },
  onError: (err, req, res) => {
    logger.error(`Discussion Service proxy error: ${err.message}`);
    res.status(502).json({ error: "Bad gateway" });
  }
});
