import { MDocument } from '@mastra/rag'
import { createVoyage } from '@ai-sdk/voyage'
import { embedMany } from 'ai'
import { prisma } from '@/lib/prisma'

const voyage = createVoyage({ apiKey: process.env.VOYAGE_API_KEY! })

export async function ingestText(
  text: string,
  personaId?: string,
  source?: string
): Promise<{ count: number }> {
  const doc = MDocument.fromText(text)
  const chunks = await doc.chunk({
    strategy: 'recursive',
    maxSize: 512,
    overlap: 50,
  })

  const { embeddings } = await embedMany({
    model: voyage.embedding('voyage-3-lite'),
    values: chunks.map((c) => c.text),
  })

  await prisma.knowledgeChunk.createMany({
    data: chunks.map((chunk, i) => ({
      text: chunk.text,
      embedding: embeddings[i],
      personaId: personaId ?? null,
      source: source ?? null,
    })),
  })

  return { count: chunks.length }
}
