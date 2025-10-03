import {
  AgentExecutor,
  ExecutionEventBus,
  InMemoryTaskStore,
  RequestContext,
} from '@a2a-js/sdk/server';
import { v4 as uuidv4 } from 'uuid';

import { createLogger } from '../../shared/utils';

export const tasksStore = new InMemoryTaskStore();
const logger = createLogger('BasicAssistantExecutor');

/**
 * Minimal executor for the Basic Assistant sample.
 *
 * A2A Summary:
 * - Publishes a `task` event to mark submission
 * - Emits an assistant `message` echoing the user text (if any)
 * - Publishes a `status-update` with `completed` and finishes the event bus
 *
 * Contract:
 * - `execute` must publish lifecycle events to `ExecutionEventBus`
 * - `cancelTask` should attempt to cancel in-flight work (not implemented here)
 */
class BasicAssistantExecutor implements AgentExecutor {
  /**
   * Executes a single A2A task for this agent.
   *
   * Parameters
   * - requestContext: includes `taskId`, `contextId`, and the user `message`
   * - eventBus: streaming channel used to publish task, message, and status events
   */
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
        parts: [{ kind: 'text', text: `Echo: ${userMessageText}` }],
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

  /**
   * Attempts to cancel a running task.
   *
   * Note: This sample does not implement cancellation. Real agents should
   * persist state and signal their workers to stop if possible.
   */
  async cancelTask(taskId: string, _eventBus: ExecutionEventBus): Promise<void> {
    logger.warn({ taskId }, 'Cancel not implemented');
    throw new Error('Not implemented');
  }
}

export const basicAssistantExecutor = new BasicAssistantExecutor();
