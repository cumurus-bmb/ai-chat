import { Hono } from 'hono'
import { handle } from 'hono/vercel'
import { streamText } from 'hono/streaming'
import { prisma } from '@/lib/prisma'
import { createCharacterAgent } from '@/lib/mastra/agent'

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

  const agent = createCharacterAgent(character.name, character.personality)
  const result = await agent.stream(message)

  return streamText(c, async (stream) => {
    for await (const chunk of result.textStream) {
      await stream.write(chunk)
    }
  })
})

export const GET = handle(app)
export const POST = handle(app)
