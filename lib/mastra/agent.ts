import { Agent } from "@mastra/core/agent";

export function createCharacterAgent(name: string, personality: string) {
  return new Agent({
    id: `persona-${name}`,
    name,
    instructions: `あなたは「${name}」という仮想顧客ペルソナを演じています。\nプロフィール・価値観: ${personality}\n\nインタビュアーの質問に対して、このペルソナとして自然な日本語で回答してください。商品への感想、懸念点、購買意向などを率直に述べてください。`,
    model: "anthropic/claude-sonnet-4-6",
  });
}
