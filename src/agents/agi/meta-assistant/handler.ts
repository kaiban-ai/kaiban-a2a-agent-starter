import { DefaultRequestHandler } from "@a2a-js/sdk/server";
import { metaAssistantCard } from "./card";
import { metaAssistantExecutor, tasksStore } from "./executor";

/**
 * Request handler that exposes the Meta Assistant agent endpoints.
 */
export const agiMetaAssistantRequestHandler = new DefaultRequestHandler(
  metaAssistantCard,
  tasksStore,
  metaAssistantExecutor
);
