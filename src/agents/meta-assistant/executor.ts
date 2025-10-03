import {
  AgentExecutor,
  ExecutionEventBus,
  InMemoryTaskStore,
  RequestContext,
} from '@a2a-js/sdk/server';
import { v4 as uuidv4 } from 'uuid';

import { createLogger } from '../../shared/utils';

export const tasksStore = new InMemoryTaskStore();
const logger = createLogger('MetaAssistantExecutor');

/**
 * Minimal executor that acknowledges the user message and completes the task.
 */
class MetaAssistantExecutor implements AgentExecutor {
  async execute(requestContext: RequestContext, eventBus: ExecutionEventBus): Promise<void> {
    const { taskId, contextId, userMessage } = requestContext;

    eventBus.publish({
      kind: 'task',
      id: taskId,
      contextId,
      status: { state: 'submitted', timestamp: new Date().toISOString() },
    });

    const userMessageText = userMessage.parts
      .filter((part) => part.kind === 'text')
      .map((part) => part.text)
      .join('\n');

    if (userMessageText) {
      logger.info({ userMessageText }, 'Received user message');
      eventBus.publish({
        kind: 'message',
        messageId: uuidv4(),
        taskId,
        contextId,
        role: 'agent',
        parts: [{ kind: 'text', text: `Got it. You said: ${userMessageText}` }],
      });
    }

    eventBus.publish({
      kind: 'status-update',
      taskId,
      contextId,
      status: { state: 'completed', timestamp: new Date().toISOString() },
      final: true,
    });

    eventBus.finished();
  }

  async cancelTask(taskId: string, _eventBus: ExecutionEventBus): Promise<void> {
    logger.warn({ taskId }, 'Cancel not implemented');
    throw new Error('Not implemented');
  }
}

export const metaAssistantExecutor = new MetaAssistantExecutor();
