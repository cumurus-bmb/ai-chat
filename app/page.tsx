import Link from 'next/link'

const FEATURES = [
  {
    icon: '👤',
    title: 'ペルソナ設定',
    desc: '年齢・職業・価値観・悩みなどターゲット顧客像をテキストで設定。プリセットから30代共働き、20代体験重視など代表的なペルソナをすぐに使えます。',
  },
  {
    icon: '📊',
    title: '調査データ注入（RAG）',
    desc: '手元の市場調査レポートをテキストで登録するだけ。AIが内容をベクトル検索で参照し、データに根差した回答を生成します。',
  },
  {
    icon: '💬',
    title: '仮想インタビュー',
    desc: '設定ペルソナのAIとリアルタイムで対話。商品コンセプトへの反応・懸念点・刺さる訴求ポイントを即座に探れます。',
  },
]

const TECH = [
  'Next.js 16', 'Mastra', 'Claude API', 'MongoDB Atlas',
  'Vector Search', 'Prisma', 'Hono', 'Voyage AI', 'TypeScript',
]

export default function LandingPage() {
  return (
    <div className="bg-white min-h-screen">

      {/* ── Navbar ── */}
      <nav className="border-b border-gray-200 bg-white/95 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center shrink-0 shadow-sm">
              <span className="text-white text-xs font-bold leading-none">AI</span>
            </div>
            <span className="font-semibold text-gray-900 text-sm hidden sm:block">
              仮想顧客インタビュー・シミュレーター
            </span>
            <span className="font-semibold text-gray-900 text-sm sm:hidden">InsightSim</span>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/manual"
              className="text-sm font-medium text-gray-600 hover:text-blue-700 transition-colors px-2 py-1"
            >
              使い方
            </Link>
            <Link
              href="/setup"
              className="px-5 py-2 bg-blue-500 text-white text-sm font-semibold rounded-xl shadow-md hover:bg-blue-600 hover:shadow-lg transition-all"
            >
              無料で試す
            </Link>
          </div>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-20">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-50 border border-blue-200 rounded-full text-blue-700 text-xs font-semibold mb-7">
            <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
            RAG × Claude API × MongoDB — マーケティング調査特化
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight mb-6">
            高コストな顧客インタビューを、<br />
            <span className="text-blue-500">AIで即時に擬似体験。</span>
          </h1>
          <p className="text-lg text-gray-600 leading-relaxed mb-8 max-w-2xl">
            ターゲット層のペルソナと実際の市場調査レポートを組み合わせ、
            商品コンセプトへの反応を低コスト・短時間でテストできる
            仮想顧客インタビューシステムです。
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              href="/setup"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-blue-500 text-white font-semibold rounded-2xl shadow-md hover:bg-blue-600 hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 transition-all text-sm"
            >
              ペルソナを作成して試す
              <span>→</span>
            </Link>
            <Link
              href="/manual"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-blue-700 font-semibold rounded-2xl border-2 border-blue-700 shadow-sm hover:bg-blue-50 hover:shadow-md transition-all text-sm"
            >
              使い方を見る
            </Link>
          </div>
        </div>
      </section>

      {/* ── ROI 比較 ── */}
      <section className="border-y border-gray-200 bg-gray-50 py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">導入メリット</h2>
            <p className="text-gray-600 text-sm">従来の対面インタビューと比較</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              {
                icon: '💰',
                metric: '調査コスト',
                before: '1件 数万円〜数十万円',
                after: '無料',
                note: 'ペルソナを何人作っても追加費用なし',
              },
              {
                icon: '⏱',
                metric: '実施までの時間',
                before: 'リクルートに2〜3週間',
                after: '3分以内',
                note: 'ペルソナ設定後すぐにインタビュー開始',
              },
              {
                icon: '🔁',
                metric: 'スケーラビリティ',
                before: '一度に5〜10名が限界',
                after: '無制限',
                note: '異なるペルソナを並行して何件でも試せる',
              },
            ].map((item) => (
              <div
                key={item.metric}
                className="bg-white rounded-2xl border border-gray-300 shadow-md p-6 hover:shadow-lg hover:border-gray-400 transition-all"
              >
                <div className="text-2xl mb-4">{item.icon}</div>
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">
                  {item.metric}
                </p>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs text-gray-500 bg-gray-100 border border-gray-300 rounded px-2 py-0.5 font-medium shrink-0">
                    従来
                  </span>
                  <span className="text-sm text-gray-500 line-through">{item.before}</span>
                </div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs text-blue-700 bg-blue-50 border border-blue-200 rounded px-2 py-0.5 font-semibold shrink-0">
                    本システム
                  </span>
                  <span className="text-xl font-bold text-blue-600">{item.after}</span>
                </div>
                <p className="text-xs text-gray-500 leading-relaxed">{item.note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 主要機能 ── */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">主要機能</h2>
          <p className="text-gray-600 text-sm">必要なものだけを、シンプルに。</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {FEATURES.map((f) => (
            <div
              key={f.title}
              className="bg-white rounded-2xl border border-gray-300 shadow-md p-6 hover:shadow-lg hover:border-gray-400 transition-all"
            >
              <div className="w-11 h-11 bg-blue-50 border border-blue-200 rounded-xl flex items-center justify-center text-xl mb-4">
                {f.icon}
              </div>
              <h3 className="text-base font-semibold text-gray-900 mb-2">{f.title}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── 使い方 3ステップ ── */}
      <section className="border-y border-gray-200 bg-gray-50 py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">3ステップで開始</h2>
            <p className="text-gray-600 text-sm">ペルソナ設定から対話開始まで3分以内</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                n: '01',
                title: 'ペルソナを設定',
                desc: 'ターゲット顧客像（年齢・職業・価値観など）をテキストで設定。プリセットから選ぶことも可能です。',
              },
              {
                n: '02',
                title: '調査データを登録',
                desc: '市場調査レポートを貼り付けるだけ。AIがRAGでその内容を参照して回答します。省略可能です。',
              },
              {
                n: '03',
                title: 'インタビュー開始',
                desc: 'ペルソナのAIと自由に対話。商品への反応・懸念点・購買意向を即座に探れます。',
              },
            ].map((s, i) => (
              <div key={s.n} className="flex flex-col items-center text-center">
                <div className="w-12 h-12 bg-blue-500 text-white font-bold rounded-full flex items-center justify-center shadow-md mb-4 text-sm">
                  {s.n}
                </div>
                {i < 2 && (
                  <div className="hidden md:block absolute translate-x-32 translate-y-[-32px] text-gray-300 text-2xl">
                  </div>
                )}
                <h3 className="text-base font-semibold text-gray-900 mb-2">{s.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 技術スタック ── */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">技術スタック</h2>
          <p className="text-gray-600 text-sm">最新のAI・クラウド技術で構築されたRAGシステム</p>
        </div>
        <div className="flex flex-wrap justify-center gap-2.5">
          {TECH.map((t) => (
            <span
              key={t}
              className="px-4 py-2 bg-white border border-gray-300 rounded-xl text-sm font-medium text-gray-700 shadow-sm hover:border-blue-300 hover:text-blue-700 transition-colors"
            >
              {t}
            </span>
          ))}
        </div>
      </section>

      {/* ── Bottom CTA ── */}
      <section className="bg-blue-500 py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
            今すぐ仮想インタビューを体験する
          </h2>
          <p className="text-blue-100 text-sm mb-8">
            ペルソナ設定から対話開始まで3分。クレジットカード不要。
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/setup"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-blue-700 font-semibold rounded-2xl shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all text-sm"
            >
              ペルソナを作成する →
            </Link>
            <Link
              href="/manual"
              className="inline-flex items-center justify-center px-8 py-4 bg-blue-600 text-white font-semibold rounded-2xl border-2 border-blue-300 hover:bg-blue-700 transition-all text-sm"
            >
              使い方を見る
            </Link>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-gray-200 py-8">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-blue-500 rounded flex items-center justify-center shrink-0">
              <span className="text-white text-xs font-bold">AI</span>
            </div>
            <span className="text-sm text-gray-600">仮想顧客インタビュー・シミュレーター</span>
          </div>
          <p className="text-xs text-gray-400">
            Portfolio — Next.js + Mastra + Claude API + MongoDB Atlas
          </p>
        </div>
      </footer>
    </div>
  )
}
