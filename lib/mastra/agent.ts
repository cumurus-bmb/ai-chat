import { Agent } from "@mastra/core/agent";

export function createCharacterAgent(name: string, personality: string) {
  return new Agent({
    id: `character-${name}`,
    name,
    instructions: `あなたは${name}というキャラクターです。性格・口調: ${personality}\nこのキャラクターとして日本語で会話してください。`,
    model: "anthropic/claude-sonnet-4-6",
  });
}
