'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { KnowledgeUpload } from '@/components/KnowledgeUpload'

const PERSONA_PRESETS = [
  {
    label: '30代・共働き',
    emoji: '👩‍💼',
    value:
      '30代の共働き女性。子育てと仕事の両立に忙しく、時短・効率を最優先に考える消費者。価格より利便性を重視し、使いやすさと時間節約に強い価値を感じる。話し方は忙しそうで率直、「正直〜」「ぶっちゃけ」などを使う。絵文字は使わない。',
  },
  {
    label: '20代・体験重視',
    emoji: '✨',
    value:
      '20代の独身男性。新しいものが好きでデザインや体験を重視する。SNSのトレンドに敏感でブランドストーリーに共感しやすく、コスパよりも「かっこよさ」を優先する消費者。話し方はカジュアルで「〜じゃないですか」「〜っすね」など若者口語を使う。',
  },
  {
    label: '40代・コスト重視',
    emoji: '💼',
    value:
      '40代の管理職男性。実用性とコストパフォーマンスを最重視する合理的な消費者。機能が多すぎるものを敬遠し、必要十分な機能を適正価格で求める。話し方は端的でビジネスライク。「まあ」「そうだな」「で、結局いくらなんだ？」など実務的なトーン。絵文字や感情的な表現は使わない。',
  },
]

export default function SetupPage() {
  const router = useRouter()
  const [name, setName] = useState('')
  const [selectedPreset, setSelectedPreset] = useState<string | null>(null)
  const [customPersonality, setCustomPersonality] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [createdCharacterId, setCreatedCharacterId] = useState<string | null>(null)

  const getPersonality = () => {
    if (!selectedPreset) return ''
    if (selectedPreset === 'custom') return customPersonality
    return PERSONA_PRESETS.find((p) => p.label === selectedPreset)?.value ?? ''
  }

  const isValid = name.trim().length > 0 && getPersonality().trim().length > 0

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!isValid || isLoading) return

    setIsLoading(true)
    setError('')

    try {
      const res = await fetch('/api/characters', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name.trim(), personality: getPersonality() }),
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error ?? 'ペルソナの作成に失敗しました')
      }

      const character = await res.json()
      setCreatedCharacterId(character.id)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'エラーが発生しました')
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-200 px-4 sm:px-6 h-16 flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-blue-700 transition-colors"
        >
          ← トップに戻る
        </Link>
        <Link href="/manual" className="text-sm text-gray-500 hover:text-blue-700 transition-colors">
          使い方
        </Link>
      </header>

      <main className="max-w-lg mx-auto px-4 py-12">
        {/* Title */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-1.5">ペルソナを設定する</h1>
          <p className="text-sm text-gray-600">
            インタビューするターゲット顧客像を設定してください。
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-gray-300 shadow-md p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                ペルソナ名
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="例: 田中さん、30代ママ、Bさん..."
                maxLength={20}
                autoFocus
                disabled={!!createdCharacterId}
                className="w-full px-4 h-12 rounded-lg border border-gray-300 bg-white text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-20 transition-all text-sm disabled:bg-gray-50 disabled:text-gray-500"
              />
            </div>

            {/* Persona presets */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                プロフィール・価値観
              </label>
              <div className="space-y-2 mb-2">
                {PERSONA_PRESETS.map((preset) => (
                  <button
                    key={preset.label}
                    type="button"
                    disabled={!!createdCharacterId}
                    onClick={() => setSelectedPreset(preset.label)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl border-2 text-left transition-all disabled:cursor-default ${
                      selectedPreset === preset.label
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-300 bg-white hover:border-gray-400'
                    }`}
                  >
                    <span className="text-xl shrink-0">{preset.emoji}</span>
                    <div className="min-w-0">
                      <p
                        className={`text-sm font-semibold ${
                          selectedPreset === preset.label ? 'text-blue-700' : 'text-gray-900'
                        }`}
                      >
                        {preset.label}
                      </p>
                      <p className="text-xs text-gray-500 truncate">{preset.value.substring(0, 42)}…</p>
                    </div>
                  </button>
                ))}
              </div>

              <button
                type="button"
                disabled={!!createdCharacterId}
                onClick={() => setSelectedPreset('custom')}
                className={`w-full py-2.5 px-4 rounded-xl text-sm font-semibold transition-all border-2 disabled:cursor-default ${
                  selectedPreset === 'custom'
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-gray-300 bg-white text-gray-700 hover:border-gray-400'
                }`}
              >
                ✏️ カスタムで入力する
              </button>

              {selectedPreset === 'custom' && (
                <textarea
                  value={customPersonality}
                  onChange={(e) => setCustomPersonality(e.target.value)}
                  placeholder="年齢、職業、価値観、悩みなどを自由に入力してください..."
                  rows={4}
                  maxLength={300}
                  disabled={!!createdCharacterId}
                  className="mt-3 w-full px-4 py-3 rounded-lg border border-gray-300 bg-white text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-20 transition-all resize-none text-sm disabled:bg-gray-50"
                />
              )}
            </div>

            {error && (
              <p className="text-red-600 text-sm bg-red-50 border border-red-200 rounded-lg py-2 px-4">
                {error}
              </p>
            )}

            {!createdCharacterId && (
              <button
                type="submit"
                disabled={!isValid || isLoading}
                className="w-full py-3.5 rounded-2xl font-semibold text-white bg-blue-500 hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 transition-all text-sm"
              >
                {isLoading ? '作成中...' : 'ペルソナを作成する →'}
              </button>
            )}
          </form>

          {createdCharacterId && (
            <div className="mt-4 space-y-3">
              <div className="flex items-center gap-2 justify-center py-2">
                <span className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center text-white text-xs">✓</span>
                <p className="text-sm text-green-700 font-semibold">ペルソナを作成しました</p>
              </div>
              <KnowledgeUpload characterId={createdCharacterId} />
              <button
                onClick={() => router.push(`/chat/${createdCharacterId}`)}
                className="w-full py-3.5 rounded-2xl font-semibold text-white bg-blue-500 hover:bg-blue-600 shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 transition-all text-sm"
              >
                インタビューを開始する →
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
