import { Hono } from 'hono'
import { handle } from 'hono/vercel'
import { streamText } from 'hono/streaming'
import { prisma } from '@/lib/prisma'
import { createCharacterAgent } from '@/lib/mastra/agent'
import { ingestText } from '@/lib/mastra/rag'
import { searchKnowledge } from '@/lib/mastra/vectorSearch'

const app = new Hono().basePath('/api')

app.post('/characters', async (c) => {
  const { name, personality } = await c.req.json()

  if (!name || !personality) {
    return c.json({ error: 'name and personality are required' }, 400)
  }

  const character = await prisma.character.create({
    data: { name, personality },
  })

  return c.json(character, 201)
})

app.get('/characters/:id', async (c) => {
  const id = c.req.param('id')

  const character = await prisma.character.findUnique({
    where: { id },
  })

  if (!character) {
    return c.json({ error: 'Character not found' }, 404)
  }

  return c.json(character)
})

app.post('/knowledge', async (c) => {
  try {
    const { text, personaId, source } = await c.req.json()
    if (!text || typeof text !== 'string') {
      return c.json({ error: 'text is required' }, 400)
    }
    const result = await ingestText(text, personaId, source)
    return c.json({ success: true, chunksCreated: result.count })
  } catch (e) {
    console.error('[knowledge ingest error]', e)
    return c.json({ error: 'Failed to ingest knowledge' }, 500)
  }
})

app.post('/chat', async (c) => {
  const { characterId, message } = await c.req.json()

  if (!characterId || !message) {
    return c.json({ error: 'characterId and message are required' }, 400)
  }

  const character = await prisma.character.findUnique({
    where: { id: characterId },
  })

  if (!character) {
    return c.json({ error: 'Character not found' }, 404)
  }

  let ragContext = ''
  try {
    const relevantChunks = await searchKnowledge(message, character.id, 3)
    if (relevantChunks.length > 0) {
      ragContext = `\n\n---\n以下の市場調査レポートの内容を前提として、仮想顧客として回答してください：\n${relevantChunks.join('\n\n')}\n---`
    }
  } catch (e) {
    console.error('[vectorSearch error]', e)
    // 検索失敗時はRAGなしで継続
  }
  const agent = createCharacterAgent(character.name, character.personality + ragContext)
  const result = await agent.stream(message)

  return streamText(c, async (stream) => {
    for await (const chunk of result.textStream) {
      await stream.write(chunk)
    }
  })
})

export const GET = handle(app)
export const POST = handle(app)
