import { DefaultRequestHandler } from "@a2a-js/sdk/server";
import { basicAssistantCard } from "./card";
import { basicAssistantExecutor, tasksStore } from "./executor";

/**
 * Request handler that exposes the Basic Assistant agent endpoints.
 */
export const agiBasicAssistantRequestHandler = new DefaultRequestHandler(
  basicAssistantCard,
  tasksStore,
  basicAssistantExecutor
);
