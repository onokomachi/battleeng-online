import type { Problem } from '../types';

export const vocabAdjAdvProblems: Problem[] = [
  // ===== afraid =====
  { type: 'select', data: { question: '「afraid」の意味を選びなさい。', options: ['退屈な', '怖い・恐れている', '怒っている', '疲れた'] }, answer: '怖い・恐れている' },
  { type: 'select', data: { question: '「怖い・恐れている」を表す英語を選びなさい。', japanese: '怖い・恐れている', options: ['angry', 'afraid', 'alone', 'awful'] }, answer: 'afraid' },
  { type: 'input', data: { question: '「怖い・恐れている」を英語で書きなさい。', japanese: '怖い・恐れている' }, answer: 'afraid' },

  // ===== amazing =====
  { type: 'select', data: { question: '「amazing」の意味を選びなさい。', options: ['退屈な', '素晴らしい・驚くべき', '危険な', '静かな'] }, answer: '素晴らしい・驚くべき' },
  { type: 'select', data: { question: '「素晴らしい・驚くべき」を表す英語を選びなさい。', japanese: '素晴らしい・驚くべき', options: ['awful', 'amusing', 'amazing', 'angry'] }, answer: 'amazing' },
  { type: 'input', data: { question: '「素晴らしい・驚くべき」を英語で書きなさい。', japanese: '素晴らしい・驚くべき' }, answer: 'amazing' },

  // ===== angry =====
  { type: 'select', data: { question: '「angry」の意味を選びなさい。', options: ['悲しい', '楽しい', '怒っている', '眠い'] }, answer: '怒っている' },
  { type: 'select', data: { question: '「怒っている」を表す英語を選びなさい。', japanese: '怒っている', options: ['afraid', 'angry', 'amazing', 'alone'] }, answer: 'angry' },
  { type: 'input', data: { question: '「怒っている」を英語で書きなさい。', japanese: '怒っている' }, answer: 'angry' },

  // ===== beautiful =====
  { type: 'select', data: { question: '「beautiful」の意味を選びなさい。', options: ['大きな', '美しい', '速い', '古い'] }, answer: '美しい' },
  { type: 'select', data: { question: '「美しい」を表す英語を選びなさい。', japanese: '美しい', options: ['busy', 'bright', 'beautiful', 'brave'] }, answer: 'beautiful' },
  { type: 'input', data: { question: '「美しい」を英語で書きなさい。', japanese: '美しい' }, answer: 'beautiful' },

  // ===== bright =====
  { type: 'select', data: { question: '「bright」の意味を選びなさい。', options: ['暗い', '明るい・賢い', '重い', '静かな'] }, answer: '明るい・賢い' },
  { type: 'select', data: { question: '「明るい・賢い」を表す英語を選びなさい。', japanese: '明るい・賢い', options: ['brave', 'busy', 'bright', 'broad'] }, answer: 'bright' },
  { type: 'input', data: { question: '「明るい・賢い」を英語で書きなさい。', japanese: '明るい・賢い' }, answer: 'bright' },

  // ===== busy =====
  { type: 'select', data: { question: '「busy」の意味を選びなさい。', options: ['暇な', '忙しい', '静かな', '眠い'] }, answer: '忙しい' },
  { type: 'select', data: { question: '「忙しい」を表す英語を選びなさい。', japanese: '忙しい', options: ['bright', 'brave', 'busy', 'boring'] }, answer: 'busy' },
  { type: 'input', data: { question: '「忙しい」を英語で書きなさい。', japanese: '忙しい' }, answer: 'busy' },

  // ===== careful =====
  { type: 'select', data: { question: '「careful」の意味を選びなさい。', options: ['危険な', '注意深い', '退屈な', '親切な'] }, answer: '注意深い' },
  { type: 'select', data: { question: '「注意深い」を表す英語を選びなさい。', japanese: '注意深い', options: ['correct', 'clean', 'careful', 'comfortable'] }, answer: 'careful' },
  { type: 'input', data: { question: '「注意深い」を英語で書きなさい。', japanese: '注意深い' }, answer: 'careful' },

  // ===== clean =====
  { type: 'select', data: { question: '「clean」の意味を選びなさい。', options: ['汚い', '清潔な・きれいな', '重い', '古い'] }, answer: '清潔な・きれいな' },
  { type: 'select', data: { question: '「清潔な・きれいな」を表す英語を選びなさい。', japanese: '清潔な・きれいな', options: ['correct', 'careful', 'clean', 'comfortable'] }, answer: 'clean' },
  { type: 'input', data: { question: '「清潔な・きれいな」を英語で書きなさい。', japanese: '清潔な・きれいな' }, answer: 'clean' },

  // ===== comfortable =====
  { type: 'select', data: { question: '「comfortable」の意味を選びなさい。', options: ['不便な', '快適な', '危険な', '退屈な'] }, answer: '快適な' },
  { type: 'select', data: { question: '「快適な」を表す英語を選びなさい。', japanese: '快適な', options: ['correct', 'careful', 'comfortable', 'clean'] }, answer: 'comfortable' },
  { type: 'input', data: { question: '「快適な」を英語で書きなさい。', japanese: '快適な' }, answer: 'comfortable' },

  // ===== correct =====
  { type: 'select', data: { question: '「correct」の意味を選びなさい。', options: ['間違っている', '正しい', '危険な', '難しい'] }, answer: '正しい' },
  { type: 'select', data: { question: '「正しい」を表す英語を選びなさい。', japanese: '正しい', options: ['careful', 'clean', 'correct', 'comfortable'] }, answer: 'correct' },
  { type: 'input', data: { question: '「正しい」を英語で書きなさい。', japanese: '正しい' }, answer: 'correct' },

  // ===== dangerous =====
  { type: 'select', data: { question: '「dangerous」の意味を選びなさい。', options: ['退屈な', '親切な', '危険な', '元気な'] }, answer: '危険な' },
  { type: 'select', data: { question: '「危険な」を表す英語を選びなさい。', japanese: '危険な', options: ['different', 'difficult', 'dark', 'dangerous'] }, answer: 'dangerous' },
  { type: 'input', data: { question: '「危険な」を英語で書きなさい。', japanese: '危険な' }, answer: 'dangerous' },

  // ===== dark =====
  { type: 'select', data: { question: '「dark」の意味を選びなさい。', options: ['明るい', '暗い', '広い', '重い'] }, answer: '暗い' },
  { type: 'select', data: { question: '「暗い」を表す英語を選びなさい。', japanese: '暗い', options: ['difficult', 'dangerous', 'dark', 'different'] }, answer: 'dark' },
  { type: 'input', data: { question: '「暗い」を英語で書きなさい。', japanese: '暗い' }, answer: 'dark' },

  // ===== different =====
  { type: 'select', data: { question: '「different」の意味を選びなさい。', options: ['同じ', '似ている', '異なる', '正しい'] }, answer: '異なる' },
  { type: 'select', data: { question: '「異なる」を表す英語を選びなさい。', japanese: '異なる', options: ['dark', 'dangerous', 'different', 'difficult'] }, answer: 'different' },
  { type: 'input', data: { question: '「異なる」を英語で書きなさい。', japanese: '異なる' }, answer: 'different' },

  // ===== difficult =====
  { type: 'select', data: { question: '「difficult」の意味を選びなさい。', options: ['簡単な', '難しい', '楽しい', '退屈な'] }, answer: '難しい' },
  { type: 'select', data: { question: '「難しい」を表す英語を選びなさい。', japanese: '難しい', options: ['different', 'dark', 'difficult', 'dangerous'] }, answer: 'difficult' },
  { type: 'input', data: { question: '「難しい」を英語で書きなさい。', japanese: '難しい' }, answer: 'difficult' },

  // ===== exciting =====
  { type: 'select', data: { question: '「exciting」の意味を選びなさい。', options: ['退屈な', 'わくわくする', '悲しい', '眠い'] }, answer: 'わくわくする' },
  { type: 'select', data: { question: '「わくわくする」を表す英語を選びなさい。', japanese: 'わくわくする', options: ['famous', 'exciting', 'exhausting', 'expensive'] }, answer: 'exciting' },
  { type: 'input', data: { question: '「わくわくする」を英語で書きなさい。', japanese: 'わくわくする' }, answer: 'exciting' },

  // ===== famous =====
  { type: 'select', data: { question: '「famous」の意味を選びなさい。', options: ['無名の', '人気のある', '有名な', '普通の'] }, answer: '有名な' },
  { type: 'select', data: { question: '「有名な」を表す英語を選びなさい。', japanese: '有名な', options: ['friendly', 'funny', 'famous', 'fearful'] }, answer: 'famous' },
  { type: 'input', data: { question: '「有名な」を英語で書きなさい。', japanese: '有名な' }, answer: 'famous' },

  // ===== friendly =====
  { type: 'select', data: { question: '「friendly」の意味を選びなさい。', options: ['冷たい', '怒っている', '親しみやすい', '退屈な'] }, answer: '親しみやすい' },
  { type: 'select', data: { question: '「親しみやすい」を表す英語を選びなさい。', japanese: '親しみやすい', options: ['famous', 'funny', 'fearful', 'friendly'] }, answer: 'friendly' },
  { type: 'input', data: { question: '「親しみやすい」を英語で書きなさい。', japanese: '親しみやすい' }, answer: 'friendly' },

  // ===== funny =====
  { type: 'select', data: { question: '「funny」の意味を選びなさい。', options: ['悲しい', 'おかしい・面白い', '退屈な', '怒っている'] }, answer: 'おかしい・面白い' },
  { type: 'select', data: { question: '「おかしい・面白い」を表す英語を選びなさい。', japanese: 'おかしい・面白い', options: ['friendly', 'famous', 'fearful', 'funny'] }, answer: 'funny' },
  { type: 'input', data: { question: '「おかしい・面白い」を英語で書きなさい。', japanese: 'おかしい・面白い' }, answer: 'funny' },

  // ===== glad =====
  { type: 'select', data: { question: '「glad」の意味を選びなさい。', options: ['悲しい', '怒っている', '嬉しい', '心配な'] }, answer: '嬉しい' },
  { type: 'select', data: { question: '「嬉しい」を表す英語を選びなさい。', japanese: '嬉しい', options: ['great', 'good', 'glad', 'gentle'] }, answer: 'glad' },
  { type: 'input', data: { question: '「嬉しい」を英語で書きなさい。', japanese: '嬉しい' }, answer: 'glad' },

  // ===== healthy =====
  { type: 'select', data: { question: '「healthy」の意味を選びなさい。', options: ['病気の', '疲れた', '健康な', '弱い'] }, answer: '健康な' },
  { type: 'select', data: { question: '「健康な」を表す英語を選びなさい。', japanese: '健康な', options: ['heavy', 'honest', 'huge', 'healthy'] }, answer: 'healthy' },
  { type: 'input', data: { question: '「健康な」を英語で書きなさい。', japanese: '健康な' }, answer: 'healthy' },

  // ===== heavy =====
  { type: 'select', data: { question: '「heavy」の意味を選びなさい。', options: ['軽い', '重い', '小さい', '細い'] }, answer: '重い' },
  { type: 'select', data: { question: '「重い」を表す英語を選びなさい。', japanese: '重い', options: ['healthy', 'honest', 'huge', 'heavy'] }, answer: 'heavy' },
  { type: 'input', data: { question: '「重い」を英語で書きなさい。', japanese: '重い' }, answer: 'heavy' },

  // ===== honest =====
  { type: 'select', data: { question: '「honest」の意味を選びなさい。', options: ['ずるい', '嘘をつく', '正直な', '意地悪な'] }, answer: '正直な' },
  { type: 'select', data: { question: '「正直な」を表す英語を選びなさい。', japanese: '正直な', options: ['heavy', 'healthy', 'honest', 'huge'] }, answer: 'honest' },
  { type: 'input', data: { question: '「正直な」を英語で書きなさい。', japanese: '正直な' }, answer: 'honest' },

  // ===== huge =====
  { type: 'select', data: { question: '「huge」の意味を選びなさい。', options: ['小さな', '細い', '巨大な', '軽い'] }, answer: '巨大な' },
  { type: 'select', data: { question: '「巨大な」を表す英語を選びなさい。', japanese: '巨大な', options: ['honest', 'healthy', 'heavy', 'huge'] }, answer: 'huge' },
  { type: 'input', data: { question: '「巨大な」を英語で書きなさい。', japanese: '巨大な' }, answer: 'huge' },

  // ===== important =====
  { type: 'select', data: { question: '「important」の意味を選びなさい。', options: ['不要な', '退屈な', '大切な・重要な', '危険な'] }, answer: '大切な・重要な' },
  { type: 'select', data: { question: '「大切な・重要な」を表す英語を選びなさい。', japanese: '大切な・重要な', options: ['interesting', 'impossible', 'important', 'incredible'] }, answer: 'important' },
  { type: 'input', data: { question: '「大切な・重要な」を英語で書きなさい。', japanese: '大切な・重要な' }, answer: 'important' },

  // ===== interesting =====
  { type: 'select', data: { question: '「interesting」の意味を選びなさい。', options: ['退屈な', '難しい', '興味深い', '悲しい'] }, answer: '興味深い' },
  { type: 'select', data: { question: '「興味深い」を表す英語を選びなさい。', japanese: '興味深い', options: ['important', 'incredible', 'interesting', 'impossible'] }, answer: 'interesting' },
  { type: 'input', data: { question: '「興味深い」を英語で書きなさい。', japanese: '興味深い' }, answer: 'interesting' },

  // ===== kind =====
  { type: 'select', data: { question: '「kind」の意味を選びなさい。', options: ['怒っている', '冷たい', '親切な', '忙しい'] }, answer: '親切な' },
  { type: 'select', data: { question: '「親切な」を表す英語を選びなさい。', japanese: '親切な', options: ['lonely', 'lucky', 'kind', 'known'] }, answer: 'kind' },
  { type: 'input', data: { question: '「親切な」を英語で書きなさい。', japanese: '親切な' }, answer: 'kind' },

  // ===== lonely =====
  { type: 'select', data: { question: '「lonely」の意味を選びなさい。', options: ['楽しい', '賑やかな', '孤独な', '元気な'] }, answer: '孤独な' },
  { type: 'select', data: { question: '「孤独な」を表す英語を選びなさい。', japanese: '孤独な', options: ['lucky', 'kind', 'lovely', 'lonely'] }, answer: 'lonely' },
  { type: 'input', data: { question: '「孤独な」を英語で書きなさい。', japanese: '孤独な' }, answer: 'lonely' },

  // ===== lucky =====
  { type: 'select', data: { question: '「lucky」の意味を選びなさい。', options: ['不運な', '悲しい', '運がいい', '怒っている'] }, answer: '運がいい' },
  { type: 'select', data: { question: '「運がいい」を表す英語を選びなさい。', japanese: '運がいい', options: ['lonely', 'kind', 'lovely', 'lucky'] }, answer: 'lucky' },
  { type: 'input', data: { question: '「運がいい」を英語で書きなさい。', japanese: '運がいい' }, answer: 'lucky' },

  // ===== necessary =====
  { type: 'select', data: { question: '「necessary」の意味を選びなさい。', options: ['不要な', '重要な', '必要な', '退屈な'] }, answer: '必要な' },
  { type: 'select', data: { question: '「必要な」を表す英語を選びなさい。', japanese: '必要な', options: ['nervous', 'natural', 'necessary', 'normal'] }, answer: 'necessary' },
  { type: 'input', data: { question: '「必要な」を英語で書きなさい。', japanese: '必要な' }, answer: 'necessary' },

  // ===== nervous =====
  { type: 'select', data: { question: '「nervous」の意味を選びなさい。', options: ['リラックスした', '怒っている', '緊張した', '悲しい'] }, answer: '緊張した' },
  { type: 'select', data: { question: '「緊張した」を表す英語を選びなさい。', japanese: '緊張した', options: ['necessary', 'natural', 'nervous', 'normal'] }, answer: 'nervous' },
  { type: 'input', data: { question: '「緊張した」を英語で書きなさい。', japanese: '緊張した' }, answer: 'nervous' },

  // ===== peaceful =====
  { type: 'select', data: { question: '「peaceful」の意味を選びなさい。', options: ['騒がしい', '危険な', '平和な', '難しい'] }, answer: '平和な' },
  { type: 'select', data: { question: '「平和な」を表す英語を選びなさい。', japanese: '平和な', options: ['powerful', 'proud', 'popular', 'peaceful'] }, answer: 'peaceful' },
  { type: 'input', data: { question: '「平和な」を英語で書きなさい。', japanese: '平和な' }, answer: 'peaceful' },

  // ===== popular =====
  { type: 'select', data: { question: '「popular」の意味を選びなさい。', options: ['嫌われている', '退屈な', '人気のある', '有名な'] }, answer: '人気のある' },
  { type: 'select', data: { question: '「人気のある」を表す英語を選びなさい。', japanese: '人気のある', options: ['peaceful', 'proud', 'powerful', 'popular'] }, answer: 'popular' },
  { type: 'input', data: { question: '「人気のある」を英語で書きなさい。', japanese: '人気のある' }, answer: 'popular' },

  // ===== powerful =====
  { type: 'select', data: { question: '「powerful」の意味を選びなさい。', options: ['弱い', '遅い', '強力な', '軽い'] }, answer: '強力な' },
  { type: 'select', data: { question: '「強力な」を表す英語を選びなさい。', japanese: '強力な', options: ['popular', 'peaceful', 'powerful', 'proud'] }, answer: 'powerful' },
  { type: 'input', data: { question: '「強力な」を英語で書きなさい。', japanese: '強力な' }, answer: 'powerful' },

  // ===== proud =====
  { type: 'select', data: { question: '「proud」の意味を選びなさい。', options: ['恥ずかしい', '悲しい', '誇りに思う', '心配な'] }, answer: '誇りに思う' },
  { type: 'select', data: { question: '「誇りに思う」を表す英語を選びなさい。', japanese: '誇りに思う', options: ['peaceful', 'popular', 'powerful', 'proud'] }, answer: 'proud' },
  { type: 'input', data: { question: '「誇りに思う」を英語で書きなさい。', japanese: '誇りに思う' }, answer: 'proud' },

  // ===== quiet =====
  { type: 'select', data: { question: '「quiet」の意味を選びなさい。', options: ['うるさい', '忙しい', '静かな', '怒っている'] }, answer: '静かな' },
  { type: 'select', data: { question: '「静かな」を表す英語を選びなさい。', japanese: '静かな', options: ['quick', 'strange', 'quiet', 'smart'] }, answer: 'quiet' },
  { type: 'input', data: { question: '「静かな」を英語で書きなさい。', japanese: '静かな' }, answer: 'quiet' },

  // ===== safe =====
  { type: 'select', data: { question: '「safe」の意味を選びなさい。', options: ['危険な', '難しい', '安全な', '怖い'] }, answer: '安全な' },
  { type: 'select', data: { question: '「安全な」を表す英語を選びなさい。', japanese: '安全な', options: ['smart', 'serious', 'sick', 'safe'] }, answer: 'safe' },
  { type: 'input', data: { question: '「安全な」を英語で書きなさい。', japanese: '安全な' }, answer: 'safe' },

  // ===== serious =====
  { type: 'select', data: { question: '「serious」の意味を選びなさい。', options: ['楽しい', '冗談好きな', '深刻な・まじめな', '退屈な'] }, answer: '深刻な・まじめな' },
  { type: 'select', data: { question: '「深刻な・まじめな」を表す英語を選びなさい。', japanese: '深刻な・まじめな', options: ['safe', 'sick', 'smart', 'serious'] }, answer: 'serious' },
  { type: 'input', data: { question: '「深刻な・まじめな」を英語で書きなさい。', japanese: '深刻な・まじめな' }, answer: 'serious' },

  // ===== sick =====
  { type: 'select', data: { question: '「sick」の意味を選びなさい。', options: ['元気な', '健康な', '病気の', '疲れた'] }, answer: '病気の' },
  { type: 'select', data: { question: '「病気の」を表す英語を選びなさい。', japanese: '病気の', options: ['serious', 'safe', 'smart', 'sick'] }, answer: 'sick' },
  { type: 'input', data: { question: '「病気の」を英語で書きなさい。', japanese: '病気の' }, answer: 'sick' },

  // ===== smart =====
  { type: 'select', data: { question: '「smart」の意味を選びなさい。', options: ['愚かな', '遅い', '頭がいい', '悲しい'] }, answer: '頭がいい' },
  { type: 'select', data: { question: '「頭がいい」を表す英語を選びなさい。', japanese: '頭がいい', options: ['sick', 'safe', 'serious', 'smart'] }, answer: 'smart' },
  { type: 'input', data: { question: '「頭がいい」を英語で書きなさい。', japanese: '頭がいい' }, answer: 'smart' },

  // ===== special =====
  { type: 'select', data: { question: '「special」の意味を選びなさい。', options: ['普通の', '退屈な', '特別な', '小さな'] }, answer: '特別な' },
  { type: 'select', data: { question: '「特別な」を表す英語を選びなさい。', japanese: '特別な', options: ['strong', 'strange', 'special', 'serious'] }, answer: 'special' },
  { type: 'input', data: { question: '「特別な」を英語で書きなさい。', japanese: '特別な' }, answer: 'special' },

  // ===== strange =====
  { type: 'select', data: { question: '「strange」の意味を選びなさい。', options: ['普通の', '有名な', '変な・奇妙な', '特別な'] }, answer: '変な・奇妙な' },
  { type: 'select', data: { question: '「変な・奇妙な」を表す英語を選びなさい。', japanese: '変な・奇妙な', options: ['special', 'strong', 'serious', 'strange'] }, answer: 'strange' },
  { type: 'input', data: { question: '「変な・奇妙な」を英語で書きなさい。', japanese: '変な・奇妙な' }, answer: 'strange' },

  // ===== strong =====
  { type: 'select', data: { question: '「strong」の意味を選びなさい。', options: ['弱い', '軽い', '強い', '小さい'] }, answer: '強い' },
  { type: 'select', data: { question: '「強い」を表す英語を選びなさい。', japanese: '強い', options: ['special', 'strange', 'serious', 'strong'] }, answer: 'strong' },
  { type: 'input', data: { question: '「強い」を英語で書きなさい。', japanese: '強い' }, answer: 'strong' },

  // ===== tired =====
  { type: 'select', data: { question: '「tired」の意味を選びなさい。', options: ['元気な', '嬉しい', '疲れた', '健康な'] }, answer: '疲れた' },
  { type: 'select', data: { question: '「疲れた」を表す英語を選びなさい。', japanese: '疲れた', options: ['traditional', 'useful', 'tired', 'together'] }, answer: 'tired' },
  { type: 'input', data: { question: '「疲れた」を英語で書きなさい。', japanese: '疲れた' }, answer: 'tired' },

  // ===== traditional =====
  { type: 'select', data: { question: '「traditional」の意味を選びなさい。', options: ['新しい', '現代的な', '伝統的な', '普通の'] }, answer: '伝統的な' },
  { type: 'select', data: { question: '「伝統的な」を表す英語を選びなさい。', japanese: '伝統的な', options: ['tired', 'useful', 'typical', 'traditional'] }, answer: 'traditional' },
  { type: 'input', data: { question: '「伝統的な」を英語で書きなさい。', japanese: '伝統的な' }, answer: 'traditional' },

  // ===== useful =====
  { type: 'select', data: { question: '「useful」の意味を選びなさい。', options: ['役に立たない', '退屈な', '役に立つ', '危険な'] }, answer: '役に立つ' },
  { type: 'select', data: { question: '「役に立つ」を表す英語を選びなさい。', japanese: '役に立つ', options: ['various', 'traditional', 'usual', 'useful'] }, answer: 'useful' },
  { type: 'input', data: { question: '「役に立つ」を英語で書きなさい。', japanese: '役に立つ' }, answer: 'useful' },

  // ===== various =====
  { type: 'select', data: { question: '「various」の意味を選びなさい。', options: ['同じ', '退屈な', 'さまざまな', '一つの'] }, answer: 'さまざまな' },
  { type: 'select', data: { question: '「さまざまな」を表す英語を選びなさい。', japanese: 'さまざまな', options: ['useful', 'weak', 'valuable', 'various'] }, answer: 'various' },
  { type: 'input', data: { question: '「さまざまな」を英語で書きなさい。', japanese: 'さまざまな' }, answer: 'various' },

  // ===== weak =====
  { type: 'select', data: { question: '「weak」の意味を選びなさい。', options: ['強い', '大きい', '弱い', '重い'] }, answer: '弱い' },
  { type: 'select', data: { question: '「弱い」を表す英語を選びなさい。', japanese: '弱い', options: ['various', 'wonderful', 'worried', 'weak'] }, answer: 'weak' },
  { type: 'input', data: { question: '「弱い」を英語で書きなさい。', japanese: '弱い' }, answer: 'weak' },

  // ===== wonderful =====
  { type: 'select', data: { question: '「wonderful」の意味を選びなさい。', options: ['退屈な', '普通の', '素晴らしい', '小さな'] }, answer: '素晴らしい' },
  { type: 'select', data: { question: '「素晴らしい」を表す英語を選びなさい。', japanese: '素晴らしい', options: ['weak', 'various', 'worried', 'wonderful'] }, answer: 'wonderful' },
  { type: 'input', data: { question: '「素晴らしい」を英語で書きなさい。', japanese: '素晴らしい' }, answer: 'wonderful' },

  // ===== worried =====
  { type: 'select', data: { question: '「worried」の意味を選びなさい。', options: ['嬉しい', 'リラックスした', '心配している', '誇りに思う'] }, answer: '心配している' },
  { type: 'select', data: { question: '「心配している」を表す英語を選びなさい。', japanese: '心配している', options: ['wonderful', 'weak', 'wrong', 'worried'] }, answer: 'worried' },
  { type: 'input', data: { question: '「心配している」を英語で書きなさい。', japanese: '心配している' }, answer: 'worried' },

  // ===== wrong =====
  { type: 'select', data: { question: '「wrong」の意味を選びなさい。', options: ['正しい', '完璧な', '間違っている', '良い'] }, answer: '間違っている' },
  { type: 'select', data: { question: '「間違っている」を表す英語を選びなさい。', japanese: '間違っている', options: ['worried', 'wonderful', 'weak', 'wrong'] }, answer: 'wrong' },
  { type: 'input', data: { question: '「間違っている」を英語で書きなさい。', japanese: '間違っている' }, answer: 'wrong' },

  // ===== already (副詞) =====
  { type: 'select', data: { question: '「already」の意味を選びなさい。', options: ['まだ', 'これから', 'もう・すでに', 'たいてい'] }, answer: 'もう・すでに' },
  { type: 'select', data: { question: '「もう・すでに」を表す英語を選びなさい。', japanese: 'もう・すでに', options: ['always', 'also', 'already', 'almost'] }, answer: 'already' },
  { type: 'input', data: { question: '「もう・すでに」を英語で書きなさい。', japanese: 'もう・すでに' }, answer: 'already' },

  // ===== carefully (副詞) =====
  { type: 'select', data: { question: '「carefully」の意味を選びなさい。', options: ['速く', '乱暴に', '注意深く', 'うるさく'] }, answer: '注意深く' },
  { type: 'select', data: { question: '「注意深く」を表す英語を選びなさい。', japanese: '注意深く', options: ['quickly', 'clearly', 'carefully', 'correctly'] }, answer: 'carefully' },
  { type: 'input', data: { question: '「注意深く」を英語で書きなさい。', japanese: '注意深く' }, answer: 'carefully' },

  // ===== especially (副詞) =====
  { type: 'select', data: { question: '「especially」の意味を選びなさい。', options: ['たいてい', '普通は', '特に', 'すでに'] }, answer: '特に' },
  { type: 'select', data: { question: '「特に」を表す英語を選びなさい。', japanese: '特に', options: ['usually', 'exactly', 'easily', 'especially'] }, answer: 'especially' },
  { type: 'input', data: { question: '「特に」を英語で書きなさい。', japanese: '特に' }, answer: 'especially' },

  // ===== finally (副詞) =====
  { type: 'select', data: { question: '「finally」の意味を選びなさい。', options: ['最初に', 'すぐに', 'ついに・最後に', 'たいてい'] }, answer: 'ついに・最後に' },
  { type: 'select', data: { question: '「ついに・最後に」を表す英語を選びなさい。', japanese: 'ついに・最後に', options: ['quickly', 'suddenly', 'usually', 'finally'] }, answer: 'finally' },
  { type: 'input', data: { question: '「ついに・最後に」を英語で書きなさい。', japanese: 'ついに・最後に' }, answer: 'finally' },

  // ===== maybe (副詞) =====
  { type: 'select', data: { question: '「maybe」の意味を選びなさい。', options: ['絶対に', '決して〜ない', 'たぶん・もしかしたら', 'いつも'] }, answer: 'たぶん・もしかしたら' },
  { type: 'select', data: { question: '「たぶん・もしかしたら」を表す英語を選びなさい。', japanese: 'たぶん・もしかしたら', options: ['usually', 'maybe', 'mainly', 'mostly'] }, answer: 'maybe' },
  { type: 'input', data: { question: '「たぶん・もしかしたら」を英語で書きなさい。', japanese: 'たぶん・もしかしたら' }, answer: 'maybe' },

  // ===== often (副詞) =====
  { type: 'select', data: { question: '「often」の意味を選びなさい。', options: ['めったに〜ない', 'いつも', 'よく・しばしば', '決して〜ない'] }, answer: 'よく・しばしば' },
  { type: 'select', data: { question: '「よく・しばしば」を表す英語を選びなさい。', japanese: 'よく・しばしば', options: ['always', 'usually', 'only', 'often'] }, answer: 'often' },
  { type: 'input', data: { question: '「よく・しばしば」を英語で書きなさい。', japanese: 'よく・しばしば' }, answer: 'often' },

  // ===== probably (副詞) =====
  { type: 'select', data: { question: '「probably」の意味を選びなさい。', options: ['絶対に', '決して', 'おそらく', '特に'] }, answer: 'おそらく' },
  { type: 'select', data: { question: '「おそらく」を表す英語を選びなさい。', japanese: 'おそらく', options: ['perfectly', 'possibly', 'probably', 'particularly'] }, answer: 'probably' },
  { type: 'input', data: { question: '「おそらく」を英語で書きなさい。', japanese: 'おそらく' }, answer: 'probably' },

  // ===== quickly (副詞) =====
  { type: 'select', data: { question: '「quickly」の意味を選びなさい。', options: ['ゆっくりと', '注意深く', '素早く', '静かに'] }, answer: '素早く' },
  { type: 'select', data: { question: '「素早く」を表す英語を選びなさい。', japanese: '素早く', options: ['quietly', 'carefully', 'slowly', 'quickly'] }, answer: 'quickly' },
  { type: 'input', data: { question: '「素早く」を英語で書きなさい。', japanese: '素早く' }, answer: 'quickly' },

  // ===== quietly (副詞) =====
  { type: 'select', data: { question: '「quietly」の意味を選びなさい。', options: ['うるさく', '素早く', '静かに', '注意深く'] }, answer: '静かに' },
  { type: 'select', data: { question: '「静かに」を表す英語を選びなさい。', japanese: '静かに', options: ['quickly', 'carefully', 'slowly', 'quietly'] }, answer: 'quietly' },
  { type: 'input', data: { question: '「静かに」を英語で書きなさい。', japanese: '静かに' }, answer: 'quietly' },

  // ===== recently (副詞) =====
  { type: 'select', data: { question: '「recently」の意味を選びなさい。', options: ['昔', 'これから', '最近', 'いつも'] }, answer: '最近' },
  { type: 'select', data: { question: '「最近」を表す英語を選びなさい。', japanese: '最近', options: ['rarely', 'really', 'regularly', 'recently'] }, answer: 'recently' },
  { type: 'input', data: { question: '「最近」を英語で書きなさい。', japanese: '最近' }, answer: 'recently' },

  // ===== slowly (副詞) =====
  { type: 'select', data: { question: '「slowly」の意味を選びなさい。', options: ['素早く', '注意深く', 'ゆっくりと', '静かに'] }, answer: 'ゆっくりと' },
  { type: 'select', data: { question: '「ゆっくりと」を表す英語を選びなさい。', japanese: 'ゆっくりと', options: ['quickly', 'quietly', 'suddenly', 'slowly'] }, answer: 'slowly' },
  { type: 'input', data: { question: '「ゆっくりと」を英語で書きなさい。', japanese: 'ゆっくりと' }, answer: 'slowly' },

  // ===== suddenly (副詞) =====
  { type: 'select', data: { question: '「suddenly」の意味を選びなさい。', options: ['ゆっくりと', 'いつも', '突然', 'たいてい'] }, answer: '突然' },
  { type: 'select', data: { question: '「突然」を表す英語を選びなさい。', japanese: '突然', options: ['slowly', 'usually', 'seriously', 'suddenly'] }, answer: 'suddenly' },
  { type: 'input', data: { question: '「突然」を英語で書きなさい。', japanese: '突然' }, answer: 'suddenly' },

  // ===== together (副詞) =====
  { type: 'select', data: { question: '「together」の意味を選びなさい。', options: ['一人で', '別々に', '一緒に', '静かに'] }, answer: '一緒に' },
  { type: 'select', data: { question: '「一緒に」を表す英語を選びなさい。', japanese: '一緒に', options: ['usually', 'suddenly', 'totally', 'together'] }, answer: 'together' },
  { type: 'input', data: { question: '「一緒に」を英語で書きなさい。', japanese: '一緒に' }, answer: 'together' },

  // ===== usually (副詞) =====
  { type: 'select', data: { question: '「usually」の意味を選びなさい。', options: ['決して〜ない', 'めったに〜ない', 'たいてい', '特に'] }, answer: 'たいてい' },
  { type: 'select', data: { question: '「たいてい」を表す英語を選びなさい。', japanese: 'たいてい', options: ['often', 'always', 'sometimes', 'usually'] }, answer: 'usually' },
  { type: 'input', data: { question: '「たいてい」を英語で書きなさい。', japanese: 'たいてい' }, answer: 'usually' },

  // ===== yet (副詞) =====
  { type: 'select', data: { question: '「yet」の意味を選びなさい。', options: ['もう・すでに', 'たいてい', 'まだ・もう（疑問・否定）', 'たぶん'] }, answer: 'まだ・もう（疑問・否定）' },
  { type: 'select', data: { question: '「まだ・もう（疑問・否定）」を表す英語を選びなさい。', japanese: 'まだ・もう（疑問・否定）', options: ['already', 'often', 'usually', 'yet'] }, answer: 'yet' },
  { type: 'input', data: { question: '「まだ・もう（疑問・否定）」を英語で書きなさい。', japanese: 'まだ・もう（疑問・否定）' }, answer: 'yet' },
];
