import { AgentCard } from "@a2a-js/sdk";

/**
 * Card metadata that describes the Basic Assistant agent.
 */
export const basicAssistantCard: AgentCard = {
  name: "Basic Assistant Agent",
  description: "Agent that can perform basic kaiban operations",
  protocolVersion: "0.3.0",
  version: "0.1.0",
  url: `${process.env.A2A_BASE_URL || "http://localhost:4000"}/agi/basicAssistant/a2a`,
  defaultInputModes: ["text"],
  defaultOutputModes: ["text"],
  skills: [
    {
      id: "basic-assistant",
      name: "Basic Assistant",
      description: "Agent that can perform basic kaiban operations",
      tags: ["operations", "assistant"]
    }
  ],
  capabilities: {
    streaming: true,
    pushNotifications: false,
    stateTransitionHistory: false
  }
};
