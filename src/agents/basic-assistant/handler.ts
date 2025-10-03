import { DefaultRequestHandler } from '@a2a-js/sdk/server';

import { basicAssistantCard } from './card';
import { basicAssistantExecutor, tasksStore } from './executor';

/**
 * Request handler that exposes the Basic Assistant sample agent endpoints.
 */
export const basicAssistantRequestHandler = new DefaultRequestHandler(
  basicAssistantCard,
  tasksStore,
  basicAssistantExecutor,
);
