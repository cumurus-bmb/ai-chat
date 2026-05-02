import Link from 'next/link'

const SAMPLE_REPORT = `【2024年スマートウォッチ購買調査 – 概要】

調査対象: 30〜40代の会社員 500名（男性260名、女性240名）
調査期間: 2024年10月〜11月

■ 購入の決め手（複数回答）
1位: バッテリー持続時間 … 68%
2位: 健康管理機能（睡眠・心拍） … 61%
3位: デザイン・外観 … 54%
4位: スマートフォンとの連携 … 47%
5位: 価格（3万円以下） … 43%

■ 非購入の理由（複数回答）
1位: 充電が面倒 … 52%
2位: 必要性を感じない … 39%
3位: 価格が高い … 35%

■ 利用シーン
最も多い利用シーンは「通勤・通学中」（74%）で、
次いで「運動時」（63%）、「就寝中の睡眠計測」（48%）であった。

■ 購入検討ブランド
1位: AppleWatch … 71%
2位: Garmin … 38%
3位: Fitbit … 27%

■ 新ブランド（WEBにない新情報）
調査期間中に話題になった新興ブランド「Arvelio（アルヴェリオ）」は
認知率12%ながら、購入意向が38%と突出して高かった。
理由として「デザインが他社と全く違う」が87%を占めた。`

export default function ManualPage() {
  return (
    <div className="min-h-screen bg-white">

      {/* Navbar */}
      <nav className="border-b border-gray-200 bg-white/95 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center shrink-0 shadow-sm">
              <span className="text-white text-xs font-bold">AI</span>
            </div>
            <span className="font-semibold text-gray-900 text-sm hidden sm:block">
              仮想顧客インタビュー・シミュレーター
            </span>
          </Link>
          <Link
            href="/setup"
            className="px-5 py-2 bg-blue-500 text-white text-sm font-semibold rounded-xl shadow-md hover:bg-blue-600 hover:shadow-lg transition-all"
          >
            試してみる
          </Link>
        </div>
      </nav>

      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        {/* Page header */}
        <div className="mb-12">
          <p className="text-blue-600 text-sm font-semibold mb-2">ガイド</p>
          <h1 className="text-3xl font-bold text-gray-900 mb-3">使い方</h1>
          <p className="text-gray-600 leading-relaxed">
            ペルソナ設定から仮想インタビュー開始まで、3つのステップで完了します。
            市場調査レポートを読み込ませることで、データに根拠した回答が得られます。
          </p>
        </div>

        {/* Steps */}
        <div className="space-y-10 mb-14">

          {/* Step 1 */}
          <div>
            <div className="flex items-center gap-4 mb-4">
              <div className="w-10 h-10 bg-blue-500 text-white font-bold rounded-full flex items-center justify-center shadow-md text-sm shrink-0">
                01
              </div>
              <h2 className="text-xl font-semibold text-gray-900">ペルソナを設定する</h2>
            </div>
            <div className="ml-14">
              <p className="text-sm text-gray-600 leading-relaxed mb-4">
                インタビューしたいターゲット顧客像を設定します。
                プリセットから選ぶか、カスタムでプロフィールを自由に入力してください。
              </p>
              <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
                <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide mb-3">
                  プリセット例
                </p>
                <div className="space-y-2">
                  {[
                    { emoji: '👩‍💼', label: '30代・共働き', desc: '時短・効率重視、率直な口調' },
                    { emoji: '✨', label: '20代・体験重視', desc: 'デザイン・トレンド重視、若者口語' },
                    { emoji: '💼', label: '40代・コスト重視', desc: '実用性・コスパ重視、ビジネスライクな口調' },
                  ].map((p) => (
                    <div key={p.label} className="flex items-center gap-3 text-sm">
                      <span>{p.emoji}</span>
                      <span className="font-semibold text-gray-800">{p.label}</span>
                      <span className="text-gray-500">— {p.desc}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Step 2 */}
          <div>
            <div className="flex items-center gap-4 mb-4">
              <div className="w-10 h-10 bg-blue-500 text-white font-bold rounded-full flex items-center justify-center shadow-md text-sm shrink-0">
                02
              </div>
              <h2 className="text-xl font-semibold text-gray-900">
                調査データを登録する
                <span className="ml-2 text-xs font-medium text-gray-400 bg-gray-100 border border-gray-300 rounded px-2 py-0.5">
                  任意
                </span>
              </h2>
            </div>
            <div className="ml-14">
              <p className="text-sm text-gray-600 leading-relaxed mb-4">
                ペルソナ作成後に表示される「ナレッジを登録する」パネルに市場調査レポートを貼り付けてください。
                AIがその内容をRAG（検索拡張生成）で参照し、データに根拠した回答を生成します。
                登録しなくても対話は可能です。
              </p>
              {/* Sample data */}
              <div className="bg-gray-50 border border-gray-200 rounded-xl overflow-hidden">
                <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
                  <p className="text-xs font-semibold text-gray-700">
                    📊 マーケティング調査サンプル（コピーして使用できます）
                  </p>
                </div>
                <pre className="text-xs text-gray-600 whitespace-pre-wrap leading-relaxed font-mono p-4 overflow-x-auto">
                  {SAMPLE_REPORT}
                </pre>
              </div>
            </div>
          </div>

          {/* Step 3 */}
          <div>
            <div className="flex items-center gap-4 mb-4">
              <div className="w-10 h-10 bg-blue-500 text-white font-bold rounded-full flex items-center justify-center shadow-md text-sm shrink-0">
                03
              </div>
              <h2 className="text-xl font-semibold text-gray-900">インタビューを開始する</h2>
            </div>
            <div className="ml-14">
              <p className="text-sm text-gray-600 leading-relaxed mb-4">
                「インタビューを開始する」ボタンを押してチャット画面に進みます。
                設定したペルソナのAIと自由に対話して、商品への反応を確認してください。
              </p>
              <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
                <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide mb-3">
                  質問例（スマートウォッチ調査の場合）
                </p>
                <ul className="space-y-2 text-sm text-gray-600">
                  {[
                    'スマートウォッチを買うとしたら、何を一番重視しますか？',
                    'Arvelioというブランドをご存知ですか？',
                    'この商品に3万円払う価値を感じますか？',
                    'どんな機能があれば毎日使いたいと思いますか？',
                  ].map((q) => (
                    <li key={q} className="flex items-start gap-2">
                      <span className="text-blue-400 mt-0.5 shrink-0">・</span>
                      <span>{q}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Expected results */}
        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6 mb-10">
          <h2 className="text-base font-semibold text-blue-900 mb-4">
            💡 期待できる結果
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              'ペルソナごとに異なる回答が得られる',
              '調査データに根拠した具体的な回答',
              '商品の懸念点・刺さる訴求ポイントの発見',
              'WEBに存在しない独自情報も回答に反映',
            ].map((item) => (
              <div key={item} className="flex items-start gap-2 text-sm text-blue-800">
                <span className="text-blue-500 mt-0.5 shrink-0 font-bold">✓</span>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Tech explanation */}
        <div className="border border-gray-200 rounded-2xl p-6 mb-12">
          <h2 className="text-base font-semibold text-gray-900 mb-3">⚙️ 技術的な仕組み</h2>
          <p className="text-sm text-gray-600 leading-relaxed mb-4">
            本システムはRAG（Retrieval-Augmented Generation）を採用しています。
            登録した調査テキストをチャンク分割・ベクトル化してMongoDBに保存し、
            ユーザーの質問と意味的に近いチャンクをリアルタイム検索してAIに注入します。
            これにより、AIが「WEBにない独自情報」を根拠に回答できます。
          </p>
          <div className="flex flex-wrap gap-2">
            {[
              'Next.js 16', 'Mastra', 'Claude API',
              'MongoDB Atlas Vector Search', 'Voyage AI (Embedding)',
              'Prisma', 'Hono', 'TypeScript',
            ].map((t) => (
              <span
                key={t}
                className="text-xs px-3 py-1.5 bg-white border border-gray-300 rounded-lg font-medium text-gray-700 shadow-sm"
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link
            href="/setup"
            className="inline-flex items-center gap-2 px-8 py-4 bg-blue-500 text-white font-semibold rounded-2xl shadow-md hover:bg-blue-600 hover:shadow-lg hover:-translate-y-0.5 transition-all text-sm"
          >
            ペルソナを作成して試す →
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 mt-12 py-8">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <p className="text-xs text-gray-400">
            仮想顧客インタビュー・シミュレーター — Portfolio · Next.js + Mastra + Claude API + MongoDB
          </p>
        </div>
      </footer>
    </div>
  )
}
