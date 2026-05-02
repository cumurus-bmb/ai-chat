import { createVoyage } from '@ai-sdk/voyage'
import { embed } from 'ai'
import { prisma } from '@/lib/prisma'

const voyage = createVoyage({ apiKey: process.env.VOYAGE_API_KEY! })

export async function searchKnowledge(
  query: string,
  personaId?: string,
  topK = 3
): Promise<string[]> {
  const { embedding } = await embed({
    model: voyage.embedding('voyage-3-lite'),
    value: query,
  })

  const results = await prisma.$runCommandRaw({
    aggregate: 'KnowledgeChunk',
    pipeline: [
      {
        $vectorSearch: {
          index: process.env.VECTOR_INDEX_NAME,
          path: 'embedding',
          queryVector: embedding,
          numCandidates: 50,
          limit: topK,
          ...(personaId
            ? { filter: { personaId: { $eq: personaId } } }
            : {}),
        },
      },
      {
        $project: { text: 1, score: { $meta: 'vectorSearchScore' } },
      },
    ],
    cursor: {},
  })

  const docs = (results as { cursor?: { firstBatch?: { text: string }[] } }).cursor?.firstBatch ?? []
  return docs.map((d) => d.text)
}
