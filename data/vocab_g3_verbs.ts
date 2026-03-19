import type { Problem } from '../types';

export const vocabG3VerbProblems: Problem[] = [
  // --- achieve ---
  { type: 'select', data: { question: '「achieve」の意味を選びなさい。', options: ['〜を避ける', '〜を認める', '〜を変える', '〜を達成する'] }, answer: '〜を達成する' },
  { type: 'select', data: { question: '「〜を達成する」を表す英語を選びなさい。', japanese: '〜を達成する', options: ['avoid', 'admit', 'alter', 'achieve'] }, answer: 'achieve' },
  { type: 'input', data: { question: '「〜を達成する」を英語で書きなさい。', japanese: '〜を達成する' }, answer: 'achieve' },

  // --- afford ---
  { type: 'select', data: { question: '「afford」の意味を選びなさい。', options: ['〜を強制する', '〜を与える', '〜を避ける', '〜を買う余裕がある'] }, answer: '〜を買う余裕がある' },
  { type: 'select', data: { question: '「〜を買う余裕がある」を表す英語を選びなさい。', japanese: '〜を買う余裕がある', options: ['force', 'offer', 'avoid', 'afford'] }, answer: 'afford' },
  { type: 'input', data: { question: '「〜を買う余裕がある」を英語で書きなさい。', japanese: '〜を買う余裕がある' }, answer: 'afford' },

  // --- appreciate ---
  { type: 'select', data: { question: '「appreciate」の意味を選びなさい。', options: ['〜を批判する', '〜を無視する', '〜に感謝する', '〜を説明する'] }, answer: '〜に感謝する' },
  { type: 'select', data: { question: '「〜に感謝する」を表す英語を選びなさい。', japanese: '〜に感謝する', options: ['criticize', 'ignore', 'explain', 'appreciate'] }, answer: 'appreciate' },
  { type: 'input', data: { question: '「〜に感謝する」を英語で書きなさい。', japanese: '〜に感謝する' }, answer: 'appreciate' },

  // --- argue ---
  { type: 'select', data: { question: '「argue」の意味を選びなさい。', options: ['〜を認める', '〜を説明する', '議論する', '〜を支持する'] }, answer: '議論する' },
  { type: 'select', data: { question: '「議論する」を表す英語を選びなさい。', japanese: '議論する', options: ['admit', 'explain', 'support', 'argue'] }, answer: 'argue' },
  { type: 'input', data: { question: '「議論する」を英語で書きなさい。', japanese: '議論する' }, answer: 'argue' },

  // --- communicate ---
  { type: 'select', data: { question: '「communicate」の意味を選びなさい。', options: ['〜を翻訳する', '〜を比較する', '〜を表現する', '意思疎通する'] }, answer: '意思疎通する' },
  { type: 'select', data: { question: '「意思疎通する」を表す英語を選びなさい。', japanese: '意思疎通する', options: ['translate', 'compare', 'express', 'communicate'] }, answer: 'communicate' },
  { type: 'input', data: { question: '「意思疎通する」を英語で書きなさい。', japanese: '意思疎通する' }, answer: 'communicate' },

  // --- compare ---
  { type: 'select', data: { question: '「compare」の意味を選びなさい。', options: ['〜を準備する', '〜を共有する', '〜を組み合わせる', '〜を比較する'] }, answer: '〜を比較する' },
  { type: 'select', data: { question: '「〜を比較する」を表す英語を選びなさい。', japanese: '〜を比較する', options: ['prepare', 'share', 'combine', 'compare'] }, answer: 'compare' },
  { type: 'input', data: { question: '「〜を比較する」を英語で書きなさい。', japanese: '〜を比較する' }, answer: 'compare' },

  // --- concentrate ---
  { type: 'select', data: { question: '「concentrate」の意味を選びなさい。', options: ['〜を記念する', '〜を考慮する', '集中する', '〜を批判する'] }, answer: '集中する' },
  { type: 'select', data: { question: '「集中する」を表す英語を選びなさい。', japanese: '集中する', options: ['celebrate', 'consider', 'criticize', 'concentrate'] }, answer: 'concentrate' },
  { type: 'input', data: { question: '「集中する」を英語で書きなさい。', japanese: '集中する' }, answer: 'concentrate' },

  // --- consider ---
  { type: 'select', data: { question: '「consider」の意味を選びなさい。', options: ['〜を発見する', '〜を比較する', '〜を構成する', '〜をよく考える'] }, answer: '〜をよく考える' },
  { type: 'select', data: { question: '「〜をよく考える」を表す英語を選びなさい。', japanese: '〜をよく考える', options: ['discover', 'compare', 'consist', 'consider'] }, answer: 'consider' },
  { type: 'input', data: { question: '「〜をよく考える」を英語で書きなさい。', japanese: '〜をよく考える' }, answer: 'consider' },

  // --- contribute ---
  { type: 'select', data: { question: '「contribute」の意味を選びなさい。', options: ['〜を管理する', '〜を配布する', '貢献する', '〜を制御する'] }, answer: '貢献する' },
  { type: 'select', data: { question: '「貢献する」を表す英語を選びなさい。', japanese: '貢献する', options: ['manage', 'distribute', 'control', 'contribute'] }, answer: 'contribute' },
  { type: 'input', data: { question: '「貢献する」を英語で書きなさい。', japanese: '貢献する' }, answer: 'contribute' },

  // --- depend ---
  { type: 'select', data: { question: '「depend」の意味を選びなさい。', options: ['〜を証明する', '〜を守る', '〜を開発する', '〜に依存する'] }, answer: '〜に依存する' },
  { type: 'select', data: { question: '「〜に依存する」を表す英語を選びなさい。', japanese: '〜に依存する', options: ['prove', 'defend', 'develop', 'depend'] }, answer: 'depend' },
  { type: 'input', data: { question: '「〜に依存する」を英語で書きなさい。', japanese: '〜に依存する' }, answer: 'depend' },

  // --- develop ---
  { type: 'select', data: { question: '「develop」の意味を選びなさい。', options: ['〜を配達する', '〜に依存する', '〜を破壊する', '〜を発展させる'] }, answer: '〜を発展させる' },
  { type: 'select', data: { question: '「〜を発展させる」を表す英語を選びなさい。', japanese: '〜を発展させる', options: ['deliver', 'depend', 'destroy', 'develop'] }, answer: 'develop' },
  { type: 'input', data: { question: '「〜を発展させる」を英語で書きなさい。', japanese: '〜を発展させる' }, answer: 'develop' },

  // --- discuss ---
  { type: 'select', data: { question: '「discuss」の意味を選びなさい。', options: ['〜を発見する', '〜を配布する', '〜を区別する', '〜について話し合う'] }, answer: '〜について話し合う' },
  { type: 'select', data: { question: '「〜について話し合う」を表す英語を選びなさい。', japanese: '〜について話し合う', options: ['discover', 'distribute', 'distinguish', 'discuss'] }, answer: 'discuss' },
  { type: 'input', data: { question: '「〜について話し合う」を英語で書きなさい。', japanese: '〜について話し合う' }, answer: 'discuss' },

  // --- divide ---
  { type: 'select', data: { question: '「divide」の意味を選びなさい。', options: ['〜を運転する', '〜を発見する', '〜を区別する', '〜を分ける'] }, answer: '〜を分ける' },
  { type: 'select', data: { question: '「〜を分ける」を表す英語を選びなさい。', japanese: '〜を分ける', options: ['drive', 'discover', 'distinguish', 'divide'] }, answer: 'divide' },
  { type: 'input', data: { question: '「〜を分ける」を英語で書きなさい。', japanese: '〜を分ける' }, answer: 'divide' },

  // --- encourage ---
  { type: 'select', data: { question: '「encourage」の意味を選びなさい。', options: ['〜を強制する', '〜を参加させる', '〜を楽しませる', '〜を励ます'] }, answer: '〜を励ます' },
  { type: 'select', data: { question: '「〜を励ます」を表す英語を選びなさい。', japanese: '〜を励ます', options: ['enforce', 'engage', 'entertain', 'encourage'] }, answer: 'encourage' },
  { type: 'input', data: { question: '「〜を励ます」を英語で書きなさい。', japanese: '〜を励ます' }, answer: 'encourage' },

  // --- establish ---
  { type: 'select', data: { question: '「establish」の意味を選びなさい。', options: ['〜を推定する', '〜を拡大する', '〜を検討する', '〜を設立する'] }, answer: '〜を設立する' },
  { type: 'select', data: { question: '「〜を設立する」を表す英語を選びなさい。', japanese: '〜を設立する', options: ['estimate', 'expand', 'examine', 'establish'] }, answer: 'establish' },
  { type: 'input', data: { question: '「〜を設立する」を英語で書きなさい。', japanese: '〜を設立する' }, answer: 'establish' },

  // --- express ---
  { type: 'select', data: { question: '「express」の意味を選びなさい。', options: ['〜を期待する', '〜を説明する', '〜を経験する', '〜を表現する'] }, answer: '〜を表現する' },
  { type: 'select', data: { question: '「〜を表現する」を表す英語を選びなさい。', japanese: '〜を表現する', options: ['expect', 'explain', 'experience', 'express'] }, answer: 'express' },
  { type: 'input', data: { question: '「〜を表現する」を英語で書きなさい。', japanese: '〜を表現する' }, answer: 'express' },

  // --- identify ---
  { type: 'select', data: { question: '「identify」の意味を選びなさい。', options: ['〜を無視する', '〜を改善する', '〜を含む', '〜を特定する'] }, answer: '〜を特定する' },
  { type: 'select', data: { question: '「〜を特定する」を表す英語を選びなさい。', japanese: '〜を特定する', options: ['ignore', 'improve', 'include', 'identify'] }, answer: 'identify' },
  { type: 'input', data: { question: '「〜を特定する」を英語で書きなさい。', japanese: '〜を特定する' }, answer: 'identify' },

  // --- imagine ---
  { type: 'select', data: { question: '「imagine」の意味を選びなさい。', options: ['〜を改善する', '〜を感動させる', '〜を含む', '〜を想像する'] }, answer: '〜を想像する' },
  { type: 'select', data: { question: '「〜を想像する」を表す英語を選びなさい。', japanese: '〜を想像する', options: ['improve', 'impress', 'include', 'imagine'] }, answer: 'imagine' },
  { type: 'input', data: { question: '「〜を想像する」を英語で書きなさい。', japanese: '〜を想像する' }, answer: 'imagine' },

  // --- include ---
  { type: 'select', data: { question: '「include」の意味を選びなさい。', options: ['〜を増やす', '〜を示す', '〜を影響する', '〜を含む'] }, answer: '〜を含む' },
  { type: 'select', data: { question: '「〜を含む」を表す英語を選びなさい。', japanese: '〜を含む', options: ['increase', 'indicate', 'influence', 'include'] }, answer: 'include' },
  { type: 'input', data: { question: '「〜を含む」を英語で書きなさい。', japanese: '〜を含む' }, answer: 'include' },

  // --- indicate ---
  { type: 'select', data: { question: '「indicate」の意味を選びなさい。', options: ['〜を含む', '〜を増やす', '〜を特定する', '〜を示す'] }, answer: '〜を示す' },
  { type: 'select', data: { question: '「〜を示す」を表す英語を選びなさい。', japanese: '〜を示す', options: ['include', 'increase', 'identify', 'indicate'] }, answer: 'indicate' },
  { type: 'input', data: { question: '「〜を示す」を英語で書きなさい。', japanese: '〜を示す' }, answer: 'indicate' },

  // --- influence ---
  { type: 'select', data: { question: '「influence」の意味を選びなさい。', options: ['〜を知らせる', '〜を示す', '〜を含む', '〜に影響を与える'] }, answer: '〜に影響を与える' },
  { type: 'select', data: { question: '「〜に影響を与える」を表す英語を選びなさい。', japanese: '〜に影響を与える', options: ['inform', 'indicate', 'include', 'influence'] }, answer: 'influence' },
  { type: 'input', data: { question: '「〜に影響を与える」を英語で書きなさい。', japanese: '〜に影響を与える' }, answer: 'influence' },

  // --- inspire ---
  { type: 'select', data: { question: '「inspire」の意味を選びなさい。', options: ['〜を指示する', '〜を含む', '〜を調査する', '〜を刺激する・奮い立たせる'] }, answer: '〜を刺激する・奮い立たせる' },
  { type: 'select', data: { question: '「〜を刺激する・奮い立たせる」を表す英語を選びなさい。', japanese: '〜を刺激する・奮い立たせる', options: ['instruct', 'include', 'investigate', 'inspire'] }, answer: 'inspire' },
  { type: 'input', data: { question: '「〜を刺激する・奮い立たせる」を英語で書きなさい。', japanese: '〜を刺激する・奮い立たせる' }, answer: 'inspire' },

  // --- introduce ---
  { type: 'select', data: { question: '「introduce」の意味を選びなさい。', options: ['〜を調査する', '〜を含む', '〜を発明する', '〜を紹介する'] }, answer: '〜を紹介する' },
  { type: 'select', data: { question: '「〜を紹介する」を表す英語を選びなさい。', japanese: '〜を紹介する', options: ['investigate', 'include', 'invent', 'introduce'] }, answer: 'introduce' },
  { type: 'input', data: { question: '「〜を紹介する」を英語で書きなさい。', japanese: '〜を紹介する' }, answer: 'introduce' },

  // --- involve ---
  { type: 'select', data: { question: '「involve」の意味を選びなさい。', options: ['〜を発明する', '〜を調査する', '〜を改善する', '〜を含む・巻き込む'] }, answer: '〜を含む・巻き込む' },
  { type: 'select', data: { question: '「〜を含む・巻き込む」を表す英語を選びなさい。', japanese: '〜を含む・巻き込む', options: ['invent', 'investigate', 'improve', 'involve'] }, answer: 'involve' },
  { type: 'input', data: { question: '「〜を含む・巻き込む」を英語で書きなさい。', japanese: '〜を含む・巻き込む' }, answer: 'involve' },

  // --- manage ---
  { type: 'select', data: { question: '「manage」の意味を選びなさい。', options: ['〜を作る', '〜を意味する', '〜を測る', '〜を管理する・なんとかやりとげる'] }, answer: '〜を管理する・なんとかやりとげる' },
  { type: 'select', data: { question: '「〜を管理する・なんとかやりとげる」を表す英語を選びなさい。', japanese: '〜を管理する・なんとかやりとげる', options: ['make', 'mean', 'measure', 'manage'] }, answer: 'manage' },
  { type: 'input', data: { question: '「〜を管理する・なんとかやりとげる」を英語で書きなさい。', japanese: '〜を管理する・なんとかやりとげる' }, answer: 'manage' },

  // --- obtain ---
  { type: 'select', data: { question: '「obtain」の意味を選びなさい。', options: ['〜を観察する', '〜を申し出る', '〜を運営する', '〜を入手する'] }, answer: '〜を入手する' },
  { type: 'select', data: { question: '「〜を入手する」を表す英語を選びなさい。', japanese: '〜を入手する', options: ['observe', 'offer', 'operate', 'obtain'] }, answer: 'obtain' },
  { type: 'input', data: { question: '「〜を入手する」を英語で書きなさい。', japanese: '〜を入手する' }, answer: 'obtain' },

  // --- overcome ---
  { type: 'select', data: { question: '「overcome」の意味を選びなさい。', options: ['〜を見落とす', '〜を上回る', '〜を引き継ぐ', '〜を乗り越える'] }, answer: '〜を乗り越える' },
  { type: 'select', data: { question: '「〜を乗り越える」を表す英語を選びなさい。', japanese: '〜を乗り越える', options: ['overlook', 'outnumber', 'overtake', 'overcome'] }, answer: 'overcome' },
  { type: 'input', data: { question: '「〜を乗り越える」を英語で書きなさい。', japanese: '〜を乗り越える' }, answer: 'overcome' },

  // --- produce ---
  { type: 'select', data: { question: '「produce」の意味を選びなさい。', options: ['〜を保護する', '〜を証明する', '〜を提案する', '〜を生産する'] }, answer: '〜を生産する' },
  { type: 'select', data: { question: '「〜を生産する」を表す英語を選びなさい。', japanese: '〜を生産する', options: ['protect', 'prove', 'propose', 'produce'] }, answer: 'produce' },
  { type: 'input', data: { question: '「〜を生産する」を英語で書きなさい。', japanese: '〜を生産する' }, answer: 'produce' },

  // --- provide ---
  { type: 'select', data: { question: '「provide」の意味を選びなさい。', options: ['〜を保護する', '〜を証明する', '〜を生産する', '〜を提供する'] }, answer: '〜を提供する' },
  { type: 'select', data: { question: '「〜を提供する」を表す英語を選びなさい。', japanese: '〜を提供する', options: ['protect', 'prove', 'produce', 'provide'] }, answer: 'provide' },
  { type: 'input', data: { question: '「〜を提供する」を英語で書きなさい。', japanese: '〜を提供する' }, answer: 'provide' },

  // --- realize ---
  { type: 'select', data: { question: '「realize」の意味を選びなさい。', options: ['〜に頼る', '〜を受け取る', '〜を減らす', '〜に気づく・実現する'] }, answer: '〜に気づく・実現する' },
  { type: 'select', data: { question: '「〜に気づく・実現する」を表す英語を選びなさい。', japanese: '〜に気づく・実現する', options: ['rely', 'receive', 'reduce', 'realize'] }, answer: 'realize' },
  { type: 'input', data: { question: '「〜に気づく・実現する」を英語で書きなさい。', japanese: '〜に気づく・実現する' }, answer: 'realize' },

  // --- recognize ---
  { type: 'select', data: { question: '「recognize」の意味を選びなさい。', options: ['〜を推薦する', '〜を記録する', '〜を回収する', '〜を認識する'] }, answer: '〜を認識する' },
  { type: 'select', data: { question: '「〜を認識する」を表す英語を選びなさい。', japanese: '〜を認識する', options: ['recommend', 'record', 'recover', 'recognize'] }, answer: 'recognize' },
  { type: 'input', data: { question: '「〜を認識する」を英語で書きなさい。', japanese: '〜を認識する' }, answer: 'recognize' },

  // --- refer ---
  { type: 'select', data: { question: '「refer」の意味を選びなさい。', options: ['〜を断る', '〜を返す', '〜を取り除く', '〜に言及する・参照する'] }, answer: '〜に言及する・参照する' },
  { type: 'select', data: { question: '「〜に言及する・参照する」を表す英語を選びなさい。', japanese: '〜に言及する・参照する', options: ['refuse', 'return', 'remove', 'refer'] }, answer: 'refer' },
  { type: 'input', data: { question: '「〜に言及する・参照する」を英語で書きなさい。', japanese: '〜に言及する・参照する' }, answer: 'refer' },

  // --- represent ---
  { type: 'select', data: { question: '「represent」の意味を選びなさい。', options: ['〜を要求する', '〜を尊重する', '〜を調査する', '〜を代表する'] }, answer: '〜を代表する' },
  { type: 'select', data: { question: '「〜を代表する」を表す英語を選びなさい。', japanese: '〜を代表する', options: ['require', 'respect', 'research', 'represent'] }, answer: 'represent' },
  { type: 'input', data: { question: '「〜を代表する」を英語で書きなさい。', japanese: '〜を代表する' }, answer: 'represent' },

  // --- require ---
  { type: 'select', data: { question: '「require」の意味を選びなさい。', options: ['〜を尊重する', '〜を代表する', '〜を調査する', '〜を必要とする'] }, answer: '〜を必要とする' },
  { type: 'select', data: { question: '「〜を必要とする」を表す英語を選びなさい。', japanese: '〜を必要とする', options: ['respect', 'represent', 'research', 'require'] }, answer: 'require' },
  { type: 'input', data: { question: '「〜を必要とする」を英語で書きなさい。', japanese: '〜を必要とする' }, answer: 'require' },

  // --- research ---
  { type: 'select', data: { question: '「research」の意味を選びなさい。', options: ['〜を尊重する', '〜を必要とする', '〜を代表する', '〜を調査する・研究する'] }, answer: '〜を調査する・研究する' },
  { type: 'select', data: { question: '「〜を調査する・研究する」を表す英語を選びなさい。', japanese: '〜を調査する・研究する', options: ['respect', 'require', 'represent', 'research'] }, answer: 'research' },
  { type: 'input', data: { question: '「〜を調査する・研究する」を英語で書きなさい。', japanese: '〜を調査する・研究する' }, answer: 'research' },

  // --- respect ---
  { type: 'select', data: { question: '「respect」の意味を選びなさい。', options: ['〜を必要とする', '〜を調査する', '〜を代表する', '〜を尊重する'] }, answer: '〜を尊重する' },
  { type: 'select', data: { question: '「〜を尊重する」を表す英語を選びなさい。', japanese: '〜を尊重する', options: ['require', 'research', 'represent', 'respect'] }, answer: 'respect' },
  { type: 'input', data: { question: '「〜を尊重する」を英語で書きなさい。', japanese: '〜を尊重する' }, answer: 'respect' },

  // --- suggest ---
  { type: 'select', data: { question: '「suggest」の意味を選びなさい。', options: ['〜を支持する', '〜を供給する', '〜を驚かせる', '〜を提案する'] }, answer: '〜を提案する' },
  { type: 'select', data: { question: '「〜を提案する」を表す英語を選びなさい。', japanese: '〜を提案する', options: ['support', 'supply', 'surprise', 'suggest'] }, answer: 'suggest' },
  { type: 'input', data: { question: '「〜を提案する」を英語で書きなさい。', japanese: '〜を提案する' }, answer: 'suggest' },

  // --- support ---
  { type: 'select', data: { question: '「support」の意味を選びなさい。', options: ['〜を提案する', '〜を供給する', '〜を驚かせる', '〜を支持する'] }, answer: '〜を支持する' },
  { type: 'select', data: { question: '「〜を支持する」を表す英語を選びなさい。', japanese: '〜を支持する', options: ['suggest', 'supply', 'surprise', 'support'] }, answer: 'support' },
  { type: 'input', data: { question: '「〜を支持する」を英語で書きなさい。', japanese: '〜を支持する' }, answer: 'support' },

  // --- translate ---
  { type: 'select', data: { question: '「translate」の意味を選びなさい。', options: ['〜を移動させる', '〜を変換する', '〜を転送する', '〜を翻訳する'] }, answer: '〜を翻訳する' },
  { type: 'select', data: { question: '「〜を翻訳する」を表す英語を選びなさい。', japanese: '〜を翻訳する', options: ['transfer', 'transform', 'transmit', 'translate'] }, answer: 'translate' },
  { type: 'input', data: { question: '「〜を翻訳する」を英語で書きなさい。', japanese: '〜を翻訳する' }, answer: 'translate' },

  // --- treat ---
  { type: 'select', data: { question: '「treat」の意味を選びなさい。', options: ['〜を訓練する', '〜を信頼する', '〜を旅する', '〜を扱う・治療する'] }, answer: '〜を扱う・治療する' },
  { type: 'select', data: { question: '「〜を扱う・治療する」を表す英語を選びなさい。', japanese: '〜を扱う・治療する', options: ['train', 'trust', 'travel', 'treat'] }, answer: 'treat' },
  { type: 'input', data: { question: '「〜を扱う・治療する」を英語で書きなさい。', japanese: '〜を扱う・治療する' }, answer: 'treat' },

  // --- announce ---
  { type: 'select', data: { question: '「announce」の意味を選びなさい。', options: ['〜に答える', '〜に謝罪する', '〜に現れる', '〜を発表する'] }, answer: '〜を発表する' },
  { type: 'select', data: { question: '「〜を発表する」を表す英語を選びなさい。', japanese: '〜を発表する', options: ['answer', 'apologize', 'appear', 'announce'] }, answer: 'announce' },
  { type: 'input', data: { question: '「〜を発表する」を英語で書きなさい。', japanese: '〜を発表する' }, answer: 'announce' },

  // --- apologize ---
  { type: 'select', data: { question: '「apologize」の意味を選びなさい。', options: ['〜を発表する', '〜に現れる', '〜に感謝する', '謝罪する'] }, answer: '謝罪する' },
  { type: 'select', data: { question: '「謝罪する」を表す英語を選びなさい。', japanese: '謝罪する', options: ['announce', 'appear', 'appreciate', 'apologize'] }, answer: 'apologize' },
  { type: 'input', data: { question: '「謝罪する」を英語で書きなさい。', japanese: '謝罪する' }, answer: 'apologize' },

  // --- attract ---
  { type: 'select', data: { question: '「attract」の意味を選びなさい。', options: ['〜を攻撃する', '〜を達成する', '〜を避ける', '〜を引きつける'] }, answer: '〜を引きつける' },
  { type: 'select', data: { question: '「〜を引きつける」を表す英語を選びなさい。', japanese: '〜を引きつける', options: ['attack', 'achieve', 'avoid', 'attract'] }, answer: 'attract' },
  { type: 'input', data: { question: '「〜を引きつける」を英語で書きなさい。', japanese: '〜を引きつける' }, answer: 'attract' },

  // --- challenge ---
  { type: 'select', data: { question: '「challenge」の意味を選びなさい。', options: ['〜を変える', '〜を選ぶ', '〜を確認する', '〜に挑戦する'] }, answer: '〜に挑戦する' },
  { type: 'select', data: { question: '「〜に挑戦する」を表す英語を選びなさい。', japanese: '〜に挑戦する', options: ['change', 'choose', 'check', 'challenge'] }, answer: 'challenge' },
  { type: 'input', data: { question: '「〜に挑戦する」を英語で書きなさい。', japanese: '〜に挑戦する' }, answer: 'challenge' },

  // --- choose ---
  { type: 'select', data: { question: '「choose」の意味を選びなさい。', options: ['〜に挑戦する', '〜を変える', '〜を確認する', '〜を選ぶ'] }, answer: '〜を選ぶ' },
  { type: 'select', data: { question: '「〜を選ぶ」を表す英語を選びなさい。', japanese: '〜を選ぶ', options: ['challenge', 'change', 'check', 'choose'] }, answer: 'choose' },
  { type: 'input', data: { question: '「〜を選ぶ」を英語で書きなさい。', japanese: '〜を選ぶ' }, answer: 'choose' },

  // --- compete ---
  { type: 'select', data: { question: '「compete」の意味を選びなさい。', options: ['〜を補う', '〜を完成する', '〜を比較する', '競争する'] }, answer: '競争する' },
  { type: 'select', data: { question: '「競争する」を表す英語を選びなさい。', japanese: '競争する', options: ['compensate', 'complete', 'compare', 'compete'] }, answer: 'compete' },
  { type: 'input', data: { question: '「競争する」を英語で書きなさい。', japanese: '競争する' }, answer: 'compete' },

  // --- complete ---
  { type: 'select', data: { question: '「complete」の意味を選びなさい。', options: ['〜を比較する', '競争する', '〜を補う', '〜を完成させる'] }, answer: '〜を完成させる' },
  { type: 'select', data: { question: '「〜を完成させる」を表す英語を選びなさい。', japanese: '〜を完成させる', options: ['compare', 'compete', 'compensate', 'complete'] }, answer: 'complete' },
  { type: 'input', data: { question: '「〜を完成させる」を英語で書きなさい。', japanese: '〜を完成させる' }, answer: 'complete' },

  // --- search ---
  { type: 'select', data: { question: '「search」の意味を選びなさい。', options: ['〜を確保する', '〜を分ける', '〜を選ぶ', '〜を検索する・探す'] }, answer: '〜を検索する・探す' },
  { type: 'select', data: { question: '「〜を検索する・探す」を表す英語を選びなさい。', japanese: '〜を検索する・探す', options: ['secure', 'separate', 'select', 'search'] }, answer: 'search' },
  { type: 'input', data: { question: '「〜を検索する・探す」を英語で書きなさい。', japanese: '〜を検索する・探す' }, answer: 'search' },
];
