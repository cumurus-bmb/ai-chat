'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

const PRESETS = [
  {
    label: '優しい',
    emoji: '🌸',
    value: '優しく穏やかで、いつも温かい言葉をかけてくれる。思いやりがあり、相手の気持ちに寄り添う性格。',
  },
  {
    label: 'クール',
    emoji: '❄️',
    value: 'クールで無口。感情をあまり表に出さないが、内心は相手のことを気にかけている。的確で少し辛口なアドバイスをする。',
  },
  {
    label: 'ツンデレ',
    emoji: '🔥',
    value: 'ぶっきらぼうで素直じゃないが、実は相手のことを深く気にかけている。照れ屋で、でも憎めないキャラクター。',
  },
]

export default function SetupPage() {
  const router = useRouter()
  const [name, setName] = useState('')
  const [selectedPreset, setSelectedPreset] = useState<string | null>(null)
  const [customPersonality, setCustomPersonality] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const getPersonality = () => {
    if (!selectedPreset) return ''
    if (selectedPreset === 'custom') return customPersonality
    return PRESETS.find(p => p.label === selectedPreset)?.value ?? ''
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
        throw new Error(data.error ?? 'キャラクターの作成に失敗しました')
      }

      const character = await res.json()
      router.push(`/chat/${character.id}`)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'エラーが発生しました')
      setIsLoading(false)
    }
  }

  return (
    <main
      className="min-h-dvh flex items-center justify-center p-4 sm:p-6"
      style={{
        background: 'linear-gradient(135deg, #FDF8F2 0%, #FFEEE4 45%, #F2EEF8 100%)',
      }}
    >
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="text-5xl mb-3">✨</div>
          <h1 className="text-2xl font-bold text-stone-800 mb-1.5">
            キャラクターを作ろう
          </h1>
          <p className="text-stone-500 text-sm">
            あなただけのAIキャラクターをカスタマイズ
          </p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-3xl shadow-xl border border-stone-100 p-6 sm:p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-2">
                キャラクターの名前
              </label>
              <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="例: アリス、ユウ、ハナ..."
                maxLength={20}
                autoFocus
                className="w-full px-4 py-3 rounded-2xl border border-stone-200 bg-stone-50 text-stone-800 placeholder:text-stone-300 focus:outline-none focus:ring-2 focus:ring-orange-200 focus:border-orange-300 transition-all text-sm"
              />
            </div>

            {/* Personality */}
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-3">
                性格・口調
              </label>
              <div className="grid grid-cols-3 gap-2 mb-2">
                {PRESETS.map(preset => (
                  <button
                    key={preset.label}
                    type="button"
                    onClick={() => setSelectedPreset(preset.label)}
                    className={`py-3 px-2 rounded-2xl text-sm font-medium transition-all border-2 ${
                      selectedPreset === preset.label
                        ? 'border-orange-400 bg-orange-50 text-orange-700'
                        : 'border-stone-100 bg-stone-50 text-stone-600 hover:border-stone-200 hover:bg-stone-100'
                    }`}
                  >
                    <div className="text-xl mb-1">{preset.emoji}</div>
                    {preset.label}
                  </button>
                ))}
              </div>

              <button
                type="button"
                onClick={() => setSelectedPreset('custom')}
                className={`w-full py-2.5 px-4 rounded-2xl text-sm font-medium transition-all border-2 ${
                  selectedPreset === 'custom'
                    ? 'border-violet-400 bg-violet-50 text-violet-700'
                    : 'border-stone-100 bg-stone-50 text-stone-600 hover:border-stone-200 hover:bg-stone-100'
                }`}
              >
                ✏️ カスタム入力
              </button>

              {selectedPreset === 'custom' && (
                <textarea
                  value={customPersonality}
                  onChange={e => setCustomPersonality(e.target.value)}
                  placeholder="性格や口調を自由に入力してください..."
                  rows={3}
                  maxLength={200}
                  className="mt-3 w-full px-4 py-3 rounded-2xl border border-stone-200 bg-stone-50 text-stone-800 placeholder:text-stone-300 focus:outline-none focus:ring-2 focus:ring-violet-200 focus:border-violet-300 transition-all resize-none text-sm"
                />
              )}
            </div>

            {/* Error */}
            {error && (
              <p className="text-red-500 text-sm text-center bg-red-50 rounded-2xl py-2 px-4">
                {error}
              </p>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={!isValid || isLoading}
              className="w-full py-4 rounded-2xl font-medium text-white transition-all bg-gradient-to-r from-orange-400 to-rose-400 hover:from-orange-500 hover:to-rose-500 disabled:opacity-40 disabled:cursor-not-allowed shadow-lg shadow-orange-100 hover:shadow-orange-200 hover:-translate-y-0.5 active:translate-y-0 text-sm"
            >
              {isLoading ? '作成中...' : 'キャラクターを作成 →'}
            </button>
          </form>
        </div>
      </div>
    </main>
  )
}
