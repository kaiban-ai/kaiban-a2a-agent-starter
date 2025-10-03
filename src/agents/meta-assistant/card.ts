import { AgentCard } from '@a2a-js/sdk';

/**
 * Card metadata for a simple orchestrator sample agent.
 */
export const metaAssistantCard: AgentCard = {
  name: 'Meta Assistant (Sample)',
  description: 'Sample agent that acknowledges input and represents an orchestrator.',
  protocolVersion: '0.3.0',
  version: '0.1.0',
  url: `${process.env.A2A_BASE_URL || 'http://localhost:4000'}/agents/metaAssistant/a2a`,
  defaultInputModes: ['text'],
  defaultOutputModes: ['text'],
  skills: [
    {
      id: 'meta-assistant',
      name: 'Meta Assistant',
      description: 'Orchestrator sample for quick start',
      tags: ['sample', 'orchestrator', 'starter'],
    },
  ],
  capabilities: {
    streaming: true,
    pushNotifications: true,
    stateTransitionHistory: false,
  },
};
