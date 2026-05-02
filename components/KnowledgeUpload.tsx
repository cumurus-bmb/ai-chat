'use client'

import { useState } from 'react'

type Status = 'idle' | 'loading' | 'done' | 'error'

export function KnowledgeUpload({ characterId }: { characterId: string }) {
  const [isOpen, setIsOpen] = useState(false)
  const [text, setText] = useState('')
  const [source, setSource] = useState('')
  const [status, setStatus] = useState<Status>('idle')
  const [count, setCount] = useState(0)

  const handleSubmit = async () => {
    if (!text.trim() || status === 'loading') return
    setStatus('loading')
    try {
      const res = await fetch('/api/knowledge', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text,
          personaId: characterId,
          source: source.trim() || undefined,
        }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error ?? 'error')
      setCount(data.chunksCreated)
      setStatus('done')
      setText('')
      setSource('')
    } catch {
      setStatus('error')
    }
  }

  return (
    <div className="rounded-xl border border-gray-200 bg-gray-50 overflow-hidden">
      <button
        type="button"
        onClick={() => setIsOpen((v) => !v)}
        className="w-full flex items-center justify-between px-4 py-3 text-sm font-medium text-gray-600 hover:bg-gray-100 transition-colors"
      >
        <span className="flex items-center gap-2">
          <span className="text-base">📄</span>
          調査データを登録する（任意）
        </span>
        <span className="text-gray-400 text-xs font-normal">{isOpen ? '▲' : '▼'}</span>
      </button>

      {isOpen && (
        <div className="px-4 pb-4 space-y-3 border-t border-gray-200 pt-4">
          <p className="text-xs text-gray-500 leading-relaxed">
            市場調査レポートを貼り付けると、チャット時の回答根拠として参照されます（RAG機能）。
          </p>
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1.5">
              ソース名（任意）
            </label>
            <input
              type="text"
              value={source}
              onChange={(e) => setSource(e.target.value)}
              placeholder="例: 2024年 食品市場調査レポート"
              className="w-full px-3 h-10 rounded-lg border border-gray-300 bg-white text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-20 transition-all text-sm"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1.5">
              テキスト本文
            </label>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="レポートの本文を貼り付けてください..."
              rows={5}
              className="w-full px-3 py-2 rounded-lg border border-gray-300 bg-white text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-20 transition-all resize-none text-sm"
            />
          </div>

          {status === 'done' && (
            <p className="text-sm text-green-700 bg-green-50 border border-green-200 rounded-lg px-3 py-2">
              ✓ {count}件のチャンクを登録しました
            </p>
          )}
          {status === 'error' && (
            <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
              登録に失敗しました。もう一度お試しください。
            </p>
          )}

          <button
            type="button"
            onClick={handleSubmit}
            disabled={!text.trim() || status === 'loading'}
            className="w-full py-2.5 rounded-xl font-semibold text-white text-sm bg-blue-500 hover:bg-blue-600 disabled:opacity-40 disabled:cursor-not-allowed shadow-md hover:shadow-lg transition-all"
          >
            {status === 'loading' ? '登録中...' : '登録する'}
          </button>
        </div>
      )}
    </div>
  )
}
