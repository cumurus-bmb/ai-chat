'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'

interface Character {
  id: string
  name: string
  personality: string
  createdAt: string
}

interface Message {
  role: 'user' | 'assistant'
  content: string
}

function getInitial(name: string) {
  return name.charAt(0)
}

const AVATAR_COLORS = [
  'bg-rose-400',
  'bg-violet-400',
  'bg-sky-400',
  'bg-emerald-400',
  'bg-amber-400',
  'bg-pink-400',
  'bg-teal-400',
]

function getAvatarColor(name: string) {
  return AVATAR_COLORS[name.charCodeAt(0) % AVATAR_COLORS.length]
}

export default function ChatPage() {
  const params = useParams()
  const router = useRouter()
  const characterId = params.characterId as string

  const [character, setCharacter] = useState<Character | null>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isStreaming, setIsStreaming] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [fetchError, setFetchError] = useState('')

  const messagesEndRef = useRef<HTMLDivElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const messagesContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    fetch(`/api/characters/${characterId}`)
      .then(res => {
        if (!res.ok) throw new Error('not found')
        return res.json()
      })
      .then((data: Character) => {
        setCharacter(data)
        setIsLoading(false)
      })
      .catch(() => {
        setFetchError('キャラクターが見つかりませんでした')
        setIsLoading(false)
      })
  }, [characterId])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value)
    e.target.style.height = 'auto'
    e.target.style.height = Math.min(e.target.scrollHeight, 120) + 'px'
  }

  const sendMessage = useCallback(async () => {
    if (!input.trim() || isStreaming || !character) return

    const userMessage = input.trim()
    setInput('')
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
    }

    setMessages(prev => [...prev, { role: 'user', content: userMessage }])
    setIsStreaming(true)
    setMessages(prev => [...prev, { role: 'assistant', content: '' }])

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ characterId, message: userMessage }),
      })

      if (!response.ok) throw new Error('Request failed')
      if (!response.body) throw new Error('No response body')

      const reader = response.body.getReader()
      const decoder = new TextDecoder()

      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        const chunk = decoder.decode(value, { stream: true })
        setMessages(prev => {
          const msgs = [...prev]
          const last = msgs[msgs.length - 1]
          msgs[msgs.length - 1] = { ...last, content: last.content + chunk }
          return msgs
        })
      }
    } catch {
      setMessages(prev => {
        const msgs = [...prev]
        msgs[msgs.length - 1] = {
          role: 'assistant',
          content: 'エラーが発生しました。もう一度お試しください。',
        }
        return msgs
      })
    } finally {
      setIsStreaming(false)
    }
  }, [input, isStreaming, character, characterId])

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  if (isLoading) {
    return (
      <div
        className="h-dvh flex items-center justify-center"
        style={{ background: '#FDF8F2' }}
      >
        <div className="text-center">
          <div className="text-4xl mb-3 animate-pulse">💬</div>
          <p className="text-stone-400 text-sm">読み込み中...</p>
        </div>
      </div>
    )
  }

  if (fetchError || !character) {
    return (
      <div
        className="h-dvh flex items-center justify-center p-6"
        style={{ background: '#FDF8F2' }}
      >
        <div className="text-center">
          <div className="text-4xl mb-3">😢</div>
          <p className="text-stone-600 mb-5 text-sm">
            {fetchError || 'キャラクターが見つかりません'}
          </p>
          <button
            onClick={() => router.push('/')}
            className="px-6 py-2.5 rounded-full bg-gradient-to-r from-orange-400 to-rose-400 text-white text-sm font-medium shadow-md shadow-orange-100"
          >
            トップに戻る
          </button>
        </div>
      </div>
    )
  }

  const avatarColor = getAvatarColor(character.name)
  const isLastMessageStreaming =
    isStreaming &&
    messages.length > 0 &&
    messages[messages.length - 1].role === 'assistant' &&
    messages[messages.length - 1].content === ''

  return (
    <div className="h-dvh flex flex-col" style={{ background: '#FDF8F2' }}>
      {/* Header */}
      <header className="bg-white border-b border-stone-100 px-4 py-3 flex items-center gap-3 shrink-0 shadow-sm z-10">
        <button
          onClick={() => router.push('/')}
          className="text-stone-400 hover:text-stone-600 transition-colors p-1.5 rounded-xl hover:bg-stone-50 text-lg leading-none shrink-0"
          aria-label="トップに戻る"
        >
          ←
        </button>
        <div
          className={`w-10 h-10 rounded-full ${avatarColor} flex items-center justify-center text-white font-bold text-base shrink-0`}
        >
          {getInitial(character.name)}
        </div>
        <div className="min-w-0 flex-1">
          <p className="font-semibold text-stone-800 leading-tight truncate text-sm">
            {character.name}
          </p>
          <p className="text-xs text-stone-400 truncate">
            {character.personality.length > 40
              ? character.personality.substring(0, 40) + '...'
              : character.personality}
          </p>
        </div>
      </header>

      {/* Messages */}
      <div
        ref={messagesContainerRef}
        className="flex-1 overflow-y-auto px-4 py-5 space-y-4"
      >
        {messages.length === 0 && (
          <div className="text-center py-16">
            <div
              className={`w-16 h-16 rounded-full ${avatarColor} flex items-center justify-center text-white font-bold text-2xl mx-auto mb-4`}
            >
              {getInitial(character.name)}
            </div>
            <p className="font-semibold text-stone-700 text-base">
              {character.name}
            </p>
            <p className="text-sm text-stone-400 mt-1.5">
              メッセージを送ってみよう！
            </p>
          </div>
        )}

        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex items-end gap-2 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
          >
            {msg.role === 'assistant' && (
              <div
                className={`w-7 h-7 rounded-full ${avatarColor} flex items-center justify-center text-white font-bold text-xs shrink-0`}
              >
                {getInitial(character.name)}
              </div>
            )}
            <div
              className={`max-w-[78%] px-4 py-3 text-sm leading-relaxed whitespace-pre-wrap break-words ${
                msg.role === 'user'
                  ? 'bg-gradient-to-br from-orange-400 to-rose-400 text-white rounded-3xl rounded-br-md shadow-md shadow-orange-100'
                  : 'bg-white text-stone-800 rounded-3xl rounded-bl-md shadow-md shadow-stone-100 border border-stone-50'
              }`}
            >
              {isLastMessageStreaming && i === messages.length - 1 ? (
                <span className="flex gap-1 items-center h-4 py-0.5">
                  <span className="w-2 h-2 rounded-full bg-stone-300 dot-1" />
                  <span className="w-2 h-2 rounded-full bg-stone-300 dot-2" />
                  <span className="w-2 h-2 rounded-full bg-stone-300 dot-3" />
                </span>
              ) : (
                msg.content
              )}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Bar */}
      <div className="bg-white border-t border-stone-100 px-4 py-3 shrink-0">
        <div className="flex items-end gap-2 max-w-2xl mx-auto">
          <textarea
            ref={textareaRef}
            value={input}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            placeholder={`${character.name}に話しかける...`}
            rows={1}
            disabled={isStreaming}
            className="flex-1 px-4 py-2.5 rounded-2xl border border-stone-200 bg-stone-50 text-stone-800 placeholder:text-stone-300 focus:outline-none focus:ring-2 focus:ring-orange-200 focus:border-orange-300 transition-all resize-none text-sm leading-relaxed disabled:opacity-50"
            style={{ maxHeight: '120px' }}
          />
          <button
            onClick={sendMessage}
            disabled={!input.trim() || isStreaming}
            className="w-10 h-10 rounded-2xl flex items-center justify-center bg-gradient-to-br from-orange-400 to-rose-400 text-white disabled:opacity-40 disabled:cursor-not-allowed transition-all hover:scale-105 active:scale-95 shadow-md shadow-orange-100 shrink-0 text-base leading-none"
            aria-label="送信"
          >
            ↑
          </button>
        </div>
        <p className="text-center text-xs text-stone-300 mt-1.5">
          Enter で送信 · Shift+Enter で改行
        </p>
      </div>
    </div>
  )
}
