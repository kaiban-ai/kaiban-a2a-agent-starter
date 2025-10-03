import { A2AExpressApp } from "@a2a-js/sdk/server/express";
import "dotenv/config";
import express from "express";
import { agiBasicAssistantRequestHandler } from "@/agents/agi/basic-assistant/handler";
import { agiMetaAssistantRequestHandler } from "@/agents/agi/meta-assistant/handler";
import { createLogger } from "@/shared/utils";

const logger = createLogger("Server");

// Create Express app first
const app = express();

// Add CORS headers BEFORE setting up A2A routes
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );

  if (req.method === "OPTIONS") {
    res.sendStatus(200);
  } else {
    next();
  }
});

// Setup A2A routes
new A2AExpressApp(agiBasicAssistantRequestHandler).setupRoutes(app, "/agi/basicAssistant/a2a");
new A2AExpressApp(agiMetaAssistantRequestHandler).setupRoutes(app, "/agi/metaAssistant/a2a");

const port = process.env.PORT || 4000;
app.listen(port, () => {
  logger.info(`🚀 A2A Server Running on http://localhost:${port}`);
  logger.info(`📝 Agents Cards:`);
  logger.info(` - /agi/basicAssistant/a2a/.well-known/agent-card.json`);
  logger.info(` - /agi/metaAssistant/a2a/.well-known/agent-card.json`);
});
