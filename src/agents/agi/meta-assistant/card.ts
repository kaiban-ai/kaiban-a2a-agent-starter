import { AgentCard } from "@a2a-js/sdk";

/**
 * Card metadata that describes the Meta Assistant agent.
 */
export const metaAssistantCard: AgentCard = {
  name: "Meta Assistant Agent",
  description: "Agent that can orchestrate other agents on the kaiban platform",
  protocolVersion: "0.3.0",
  version: "0.1.0",
  url: `${process.env.A2A_BASE_URL || "http://localhost:4000"}/agi/metaAssistant/a2a`,
  defaultInputModes: ["text"],
  defaultOutputModes: ["text"],
  skills: [
    {
      id: "meta-assistant",
      name: "Meta Assistant",
      description: "Agent that can orchestrate other agents on the kaiban platform",
      tags: ["orchestrator", "agents", "kaiban"]
    }
  ],
  capabilities: {
    streaming: true,
    pushNotifications: false,
    stateTransitionHistory: false
  }
};
