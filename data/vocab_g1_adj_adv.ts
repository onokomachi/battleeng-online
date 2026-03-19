import type { Problem } from '../types';

export const vocabG1AdjAdvProblems: Problem[] = [
  // ===== big =====
  { type: 'select', data: { question: '「big」の意味を選びなさい。', options: ['小さい', '長い', '重い', '大きい'] }, answer: '大きい' },
  { type: 'select', data: { question: '「大きい」を表す英語を選びなさい。', japanese: '大きい', options: ['small', 'long', 'heavy', 'big'] }, answer: 'big' },
  { type: 'input', data: { question: '「大きい」を英語で書きなさい。', japanese: '大きい' }, answer: 'big' },

  // ===== small =====
  { type: 'select', data: { question: '「small」の意味を選びなさい。', options: ['大きい', '長い', '重い', '小さい'] }, answer: '小さい' },
  { type: 'select', data: { question: '「小さい」を表す英語を選びなさい。', japanese: '小さい', options: ['big', 'long', 'heavy', 'small'] }, answer: 'small' },
  { type: 'input', data: { question: '「小さい」を英語で書きなさい。', japanese: '小さい' }, answer: 'small' },

  // ===== long =====
  { type: 'select', data: { question: '「long」の意味を選びなさい。', options: ['短い', '高い', '大きい', '長い'] }, answer: '長い' },
  { type: 'select', data: { question: '「長い」を表す英語を選びなさい。', japanese: '長い', options: ['short', 'tall', 'big', 'long'] }, answer: 'long' },
  { type: 'input', data: { question: '「長い」を英語で書きなさい。', japanese: '長い' }, answer: 'long' },

  // ===== short =====
  { type: 'select', data: { question: '「short」の意味を選びなさい。', options: ['長い', '遅い', '重い', '短い・背が低い'] }, answer: '短い・背が低い' },
  { type: 'select', data: { question: '「短い・背が低い」を表す英語を選びなさい。', japanese: '短い・背が低い', options: ['long', 'slow', 'heavy', 'short'] }, answer: 'short' },
  { type: 'input', data: { question: '「短い・背が低い」を英語で書きなさい。', japanese: '短い・背が低い' }, answer: 'short' },

  // ===== tall =====
  { type: 'select', data: { question: '「tall」の意味を選びなさい。', options: ['短い', '小さい', '速い', '背が高い'] }, answer: '背が高い' },
  { type: 'select', data: { question: '「背が高い」を表す英語を選びなさい。', japanese: '背が高い', options: ['short', 'small', 'fast', 'tall'] }, answer: 'tall' },
  { type: 'input', data: { question: '「背が高い」を英語で書きなさい。', japanese: '背が高い' }, answer: 'tall' },

  // ===== fast =====
  { type: 'select', data: { question: '「fast」の意味を選びなさい。', options: ['遅い', '重い', '静かな', '速い'] }, answer: '速い' },
  { type: 'select', data: { question: '「速い」を表す英語を選びなさい。', japanese: '速い', options: ['slow', 'heavy', 'quiet', 'fast'] }, answer: 'fast' },
  { type: 'input', data: { question: '「速い」を英語で書きなさい。', japanese: '速い' }, answer: 'fast' },

  // ===== slow =====
  { type: 'select', data: { question: '「slow」の意味を選びなさい。', options: ['速い', '静かな', '重い', '遅い'] }, answer: '遅い' },
  { type: 'select', data: { question: '「遅い」を表す英語を選びなさい。', japanese: '遅い', options: ['fast', 'quiet', 'heavy', 'slow'] }, answer: 'slow' },
  { type: 'input', data: { question: '「遅い」を英語で書きなさい。', japanese: '遅い' }, answer: 'slow' },

  // ===== good =====
  { type: 'select', data: { question: '「good」の意味を選びなさい。', options: ['悪い', '難しい', '大きい', '良い'] }, answer: '良い' },
  { type: 'select', data: { question: '「良い」を表す英語を選びなさい。', japanese: '良い', options: ['bad', 'difficult', 'big', 'good'] }, answer: 'good' },
  { type: 'input', data: { question: '「良い」を英語で書きなさい。', japanese: '良い' }, answer: 'good' },

  // ===== bad =====
  { type: 'select', data: { question: '「bad」の意味を選びなさい。', options: ['良い', '正しい', '簡単な', '悪い'] }, answer: '悪い' },
  { type: 'select', data: { question: '「悪い」を表す英語を選びなさい。', japanese: '悪い', options: ['good', 'correct', 'easy', 'bad'] }, answer: 'bad' },
  { type: 'input', data: { question: '「悪い」を英語で書きなさい。', japanese: '悪い' }, answer: 'bad' },

  // ===== nice =====
  { type: 'select', data: { question: '「nice」の意味を選びなさい。', options: ['悪い', '退屈な', '古い', '素敵な・親切な'] }, answer: '素敵な・親切な' },
  { type: 'select', data: { question: '「素敵な・親切な」を表す英語を選びなさい。', japanese: '素敵な・親切な', options: ['bad', 'boring', 'old', 'nice'] }, answer: 'nice' },
  { type: 'input', data: { question: '「素敵な・親切な」を英語で書きなさい。', japanese: '素敵な・親切な' }, answer: 'nice' },

  // ===== beautiful =====
  { type: 'select', data: { question: '「beautiful」の意味を選びなさい。', options: ['醜い', '小さい', '古い', '美しい'] }, answer: '美しい' },
  { type: 'select', data: { question: '「美しい」を表す英語を選びなさい。', japanese: '美しい', options: ['ugly', 'small', 'old', 'beautiful'] }, answer: 'beautiful' },
  { type: 'input', data: { question: '「美しい」を英語で書きなさい。', japanese: '美しい' }, answer: 'beautiful' },

  // ===== happy =====
  { type: 'select', data: { question: '「happy」の意味を選びなさい。', options: ['悲しい', '怒っている', '心配な', '幸せな・嬉しい'] }, answer: '幸せな・嬉しい' },
  { type: 'select', data: { question: '「幸せな・嬉しい」を表す英語を選びなさい。', japanese: '幸せな・嬉しい', options: ['sad', 'angry', 'worried', 'happy'] }, answer: 'happy' },
  { type: 'input', data: { question: '「幸せな・嬉しい」を英語で書きなさい。', japanese: '幸せな・嬉しい' }, answer: 'happy' },

  // ===== sad =====
  { type: 'select', data: { question: '「sad」の意味を選びなさい。', options: ['幸せな', '楽しい', '元気な', '悲しい'] }, answer: '悲しい' },
  { type: 'select', data: { question: '「悲しい」を表す英語を選びなさい。', japanese: '悲しい', options: ['happy', 'fun', 'fine', 'sad'] }, answer: 'sad' },
  { type: 'input', data: { question: '「悲しい」を英語で書きなさい。', japanese: '悲しい' }, answer: 'sad' },

  // ===== busy =====
  { type: 'select', data: { question: '「busy」の意味を選びなさい。', options: ['暇な', '元気な', '疲れた', '忙しい'] }, answer: '忙しい' },
  { type: 'select', data: { question: '「忙しい」を表す英語を選びなさい。', japanese: '忙しい', options: ['free', 'fine', 'tired', 'busy'] }, answer: 'busy' },
  { type: 'input', data: { question: '「忙しい」を英語で書きなさい。', japanese: '忙しい' }, answer: 'busy' },

  // ===== free =====
  { type: 'select', data: { question: '「free」の意味を選びなさい。', options: ['忙しい', '疲れた', '高い', '暇な・自由な'] }, answer: '暇な・自由な' },
  { type: 'select', data: { question: '「暇な・自由な」を表す英語を選びなさい。', japanese: '暇な・自由な', options: ['busy', 'tired', 'expensive', 'free'] }, answer: 'free' },
  { type: 'input', data: { question: '「暇な・自由な」を英語で書きなさい。', japanese: '暇な・自由な' }, answer: 'free' },

  // ===== hot =====
  { type: 'select', data: { question: '「hot」の意味を選びなさい。', options: ['寒い', '涼しい', '温かい', '暑い・熱い'] }, answer: '暑い・熱い' },
  { type: 'select', data: { question: '「暑い・熱い」を表す英語を選びなさい。', japanese: '暑い・熱い', options: ['cold', 'cool', 'warm', 'hot'] }, answer: 'hot' },
  { type: 'input', data: { question: '「暑い・熱い」を英語で書きなさい。', japanese: '暑い・熱い' }, answer: 'hot' },

  // ===== cold =====
  { type: 'select', data: { question: '「cold」の意味を選びなさい。', options: ['暑い', '温かい', '涼しい', '寒い・冷たい'] }, answer: '寒い・冷たい' },
  { type: 'select', data: { question: '「寒い・冷たい」を表す英語を選びなさい。', japanese: '寒い・冷たい', options: ['hot', 'warm', 'cool', 'cold'] }, answer: 'cold' },
  { type: 'input', data: { question: '「寒い・冷たい」を英語で書きなさい。', japanese: '寒い・冷たい' }, answer: 'cold' },

  // ===== new =====
  { type: 'select', data: { question: '「new」の意味を選びなさい。', options: ['古い', '小さい', '遅い', '新しい'] }, answer: '新しい' },
  { type: 'select', data: { question: '「新しい」を表す英語を選びなさい。', japanese: '新しい', options: ['old', 'small', 'slow', 'new'] }, answer: 'new' },
  { type: 'input', data: { question: '「新しい」を英語で書きなさい。', japanese: '新しい' }, answer: 'new' },

  // ===== old =====
  { type: 'select', data: { question: '「old」の意味を選びなさい。', options: ['新しい', '若い', '大きい', '古い・年を取った'] }, answer: '古い・年を取った' },
  { type: 'select', data: { question: '「古い・年を取った」を表す英語を選びなさい。', japanese: '古い・年を取った', options: ['new', 'young', 'big', 'old'] }, answer: 'old' },
  { type: 'input', data: { question: '「古い・年を取った」を英語で書きなさい。', japanese: '古い・年を取った' }, answer: 'old' },

  // ===== young =====
  { type: 'select', data: { question: '「young」の意味を選びなさい。', options: ['年を取った', '大きい', '元気な', '若い'] }, answer: '若い' },
  { type: 'select', data: { question: '「若い」を表す英語を選びなさい。', japanese: '若い', options: ['old', 'big', 'fine', 'young'] }, answer: 'young' },
  { type: 'input', data: { question: '「若い」を英語で書きなさい。', japanese: '若い' }, answer: 'young' },

  // ===== easy =====
  { type: 'select', data: { question: '「easy」の意味を選びなさい。', options: ['難しい', '退屈な', '重要な', '簡単な'] }, answer: '簡単な' },
  { type: 'select', data: { question: '「簡単な」を表す英語を選びなさい。', japanese: '簡単な', options: ['hard', 'boring', 'important', 'easy'] }, answer: 'easy' },
  { type: 'input', data: { question: '「簡単な」を英語で書きなさい。', japanese: '簡単な' }, answer: 'easy' },

  // ===== hard =====
  { type: 'select', data: { question: '「hard」の意味を選びなさい。', options: ['簡単な', '柔らかい', '軽い', '難しい・一生懸命な'] }, answer: '難しい・一生懸命な' },
  { type: 'select', data: { question: '「難しい・一生懸命な」を表す英語を選びなさい。', japanese: '難しい・一生懸命な', options: ['easy', 'soft', 'light', 'hard'] }, answer: 'hard' },
  { type: 'input', data: { question: '「難しい・一生懸命な」を英語で書きなさい。', japanese: '難しい・一生懸命な' }, answer: 'hard' },

  // ===== late =====
  { type: 'select', data: { question: '「late」の意味を選びなさい。', options: ['早い', '速い', '正しい', '遅い・遅れた'] }, answer: '遅い・遅れた' },
  { type: 'select', data: { question: '「遅い・遅れた」を表す英語を選びなさい。', japanese: '遅い・遅れた', options: ['early', 'fast', 'correct', 'late'] }, answer: 'late' },
  { type: 'input', data: { question: '「遅い・遅れた」を英語で書きなさい。', japanese: '遅い・遅れた' }, answer: 'late' },

  // ===== early =====
  { type: 'select', data: { question: '「early」の意味を選びなさい。', options: ['遅い', '速い', '忙しい', '早い・早めに'] }, answer: '早い・早めに' },
  { type: 'select', data: { question: '「早い・早めに」を表す英語を選びなさい。', japanese: '早い・早めに', options: ['late', 'fast', 'busy', 'early'] }, answer: 'early' },
  { type: 'input', data: { question: '「早い・早めに」を英語で書きなさい。', japanese: '早い・早めに' }, answer: 'early' },

  // ===== always =====
  { type: 'select', data: { question: '「always」の意味を選びなさい。', options: ['決して〜ない', 'たいてい', 'ときどき', 'いつも'] }, answer: 'いつも' },
  { type: 'select', data: { question: '「いつも」を表す英語を選びなさい。', japanese: 'いつも', options: ['never', 'usually', 'sometimes', 'always'] }, answer: 'always' },
  { type: 'input', data: { question: '「いつも」を英語で書きなさい。', japanese: 'いつも' }, answer: 'always' },

  // ===== usually =====
  { type: 'select', data: { question: '「usually」の意味を選びなさい。', options: ['いつも', 'ときどき', '決して〜ない', 'たいてい'] }, answer: 'たいてい' },
  { type: 'select', data: { question: '「たいてい」を表す英語を選びなさい。', japanese: 'たいてい', options: ['always', 'sometimes', 'never', 'usually'] }, answer: 'usually' },
  { type: 'input', data: { question: '「たいてい」を英語で書きなさい。', japanese: 'たいてい' }, answer: 'usually' },

  // ===== often =====
  { type: 'select', data: { question: '「often」の意味を選びなさい。', options: ['いつも', 'ときどき', '決して〜ない', 'よく・しばしば'] }, answer: 'よく・しばしば' },
  { type: 'select', data: { question: '「よく・しばしば」を表す英語を選びなさい。', japanese: 'よく・しばしば', options: ['always', 'sometimes', 'never', 'often'] }, answer: 'often' },
  { type: 'input', data: { question: '「よく・しばしば」を英語で書きなさい。', japanese: 'よく・しばしば' }, answer: 'often' },

  // ===== sometimes =====
  { type: 'select', data: { question: '「sometimes」の意味を選びなさい。', options: ['いつも', 'よく', '決して〜ない', 'ときどき'] }, answer: 'ときどき' },
  { type: 'select', data: { question: '「ときどき」を表す英語を選びなさい。', japanese: 'ときどき', options: ['always', 'often', 'never', 'sometimes'] }, answer: 'sometimes' },
  { type: 'input', data: { question: '「ときどき」を英語で書きなさい。', japanese: 'ときどき' }, answer: 'sometimes' },

  // ===== never =====
  { type: 'select', data: { question: '「never」の意味を選びなさい。', options: ['いつも', 'よく', 'ときどき', '決して〜ない'] }, answer: '決して〜ない' },
  { type: 'select', data: { question: '「決して〜ない」を表す英語を選びなさい。', japanese: '決して〜ない', options: ['always', 'often', 'sometimes', 'never'] }, answer: 'never' },
  { type: 'input', data: { question: '「決して〜ない」を英語で書きなさい。', japanese: '決して〜ない' }, answer: 'never' },

  // ===== very =====
  { type: 'select', data: { question: '「very」の意味を選びなさい。', options: ['少し', 'あまり〜ない', 'たぶん', 'とても'] }, answer: 'とても' },
  { type: 'select', data: { question: '「とても」を表す英語を選びなさい。', japanese: 'とても', options: ['a little', 'not so', 'maybe', 'very'] }, answer: 'very' },
  { type: 'input', data: { question: '「とても」を英語で書きなさい。', japanese: 'とても' }, answer: 'very' },

  // ===== too =====
  { type: 'select', data: { question: '「too」の意味を選びなさい。', options: ['少し', 'とても', 'たぶん', '〜すぎる・〜も'] }, answer: '〜すぎる・〜も' },
  { type: 'select', data: { question: '「〜すぎる・〜も」を表す英語を選びなさい。', japanese: '〜すぎる・〜も', options: ['a little', 'very', 'maybe', 'too'] }, answer: 'too' },
  { type: 'input', data: { question: '「〜すぎる・〜も」を英語で書きなさい。', japanese: '〜すぎる・〜も' }, answer: 'too' },

  // ===== well =====
  { type: 'select', data: { question: '「well」の意味を選びなさい。', options: ['悪く', 'ゆっくりと', '静かに', '上手に・よく'] }, answer: '上手に・よく' },
  { type: 'select', data: { question: '「上手に・よく」を表す英語を選びなさい。', japanese: '上手に・よく', options: ['badly', 'slowly', 'quietly', 'well'] }, answer: 'well' },
  { type: 'input', data: { question: '「上手に・よく」を英語で書きなさい。', japanese: '上手に・よく' }, answer: 'well' },

  // ===== here =====
  { type: 'select', data: { question: '「here」の意味を選びなさい。', options: ['そこに', 'あそこに', '家に', 'ここに・ここへ'] }, answer: 'ここに・ここへ' },
  { type: 'select', data: { question: '「ここに・ここへ」を表す英語を選びなさい。', japanese: 'ここに・ここへ', options: ['there', 'over there', 'home', 'here'] }, answer: 'here' },
  { type: 'input', data: { question: '「ここに・ここへ」を英語で書きなさい。', japanese: 'ここに・ここへ' }, answer: 'here' },

  // ===== there =====
  { type: 'select', data: { question: '「there」の意味を選びなさい。', options: ['ここに', '家に', '外に', 'そこに・そこへ'] }, answer: 'そこに・そこへ' },
  { type: 'select', data: { question: '「そこに・そこへ」を表す英語を選びなさい。', japanese: 'そこに・そこへ', options: ['here', 'home', 'outside', 'there'] }, answer: 'there' },
  { type: 'input', data: { question: '「そこに・そこへ」を英語で書きなさい。', japanese: 'そこに・そこへ' }, answer: 'there' },

  // ===== now =====
  { type: 'select', data: { question: '「now」の意味を選びなさい。', options: ['昨日', 'もうすぐ', 'いつも', '今'] }, answer: '今' },
  { type: 'select', data: { question: '「今」を表す英語を選びなさい。', japanese: '今', options: ['yesterday', 'soon', 'always', 'now'] }, answer: 'now' },
  { type: 'input', data: { question: '「今」を英語で書きなさい。', japanese: '今' }, answer: 'now' },

  // ===== today =====
  { type: 'select', data: { question: '「today」の意味を選びなさい。', options: ['昨日', '明日', '毎日', '今日'] }, answer: '今日' },
  { type: 'select', data: { question: '「今日」を表す英語を選びなさい。', japanese: '今日', options: ['yesterday', 'tomorrow', 'every day', 'today'] }, answer: 'today' },
  { type: 'input', data: { question: '「今日」を英語で書きなさい。', japanese: '今日' }, answer: 'today' },

  // ===== tomorrow =====
  { type: 'select', data: { question: '「tomorrow」の意味を選びなさい。', options: ['昨日', '今日', '来週', '明日'] }, answer: '明日' },
  { type: 'select', data: { question: '「明日」を表す英語を選びなさい。', japanese: '明日', options: ['yesterday', 'today', 'next week', 'tomorrow'] }, answer: 'tomorrow' },
  { type: 'input', data: { question: '「明日」を英語で書きなさい。', japanese: '明日' }, answer: 'tomorrow' },

  // ===== yesterday =====
  { type: 'select', data: { question: '「yesterday」の意味を選びなさい。', options: ['今日', '明日', '先週', '昨日'] }, answer: '昨日' },
  { type: 'select', data: { question: '「昨日」を表す英語を選びなさい。', japanese: '昨日', options: ['today', 'tomorrow', 'last week', 'yesterday'] }, answer: 'yesterday' },
  { type: 'input', data: { question: '「昨日」を英語で書きなさい。', japanese: '昨日' }, answer: 'yesterday' },

  // ===== really =====
  { type: 'select', data: { question: '「really」の意味を選びなさい。', options: ['少し', 'たぶん', 'たいてい', '本当に・とても'] }, answer: '本当に・とても' },
  { type: 'select', data: { question: '「本当に・とても」を表す英語を選びなさい。', japanese: '本当に・とても', options: ['a little', 'maybe', 'usually', 'really'] }, answer: 'really' },
  { type: 'input', data: { question: '「本当に・とても」を英語で書きなさい。', japanese: '本当に・とても' }, answer: 'really' },

  // ===== also =====
  { type: 'select', data: { question: '「also」の意味を選びなさい。', options: ['しかし', 'だから', 'だって', '〜も・また'] }, answer: '〜も・また' },
  { type: 'select', data: { question: '「〜も・また」を表す英語を選びなさい。', japanese: '〜も・また', options: ['but', 'so', 'because', 'also'] }, answer: 'also' },
  { type: 'input', data: { question: '「〜も・また」を英語で書きなさい。', japanese: '〜も・また' }, answer: 'also' },

  // ===== just =====
  { type: 'select', data: { question: '「just」の意味を選びなさい。', options: ['まだ', 'もう', 'たいてい', 'ちょうど・ただ'] }, answer: 'ちょうど・ただ' },
  { type: 'select', data: { question: '「ちょうど・ただ」を表す英語を選びなさい。', japanese: 'ちょうど・ただ', options: ['still', 'already', 'usually', 'just'] }, answer: 'just' },
  { type: 'input', data: { question: '「ちょうど・ただ」を英語で書きなさい。', japanese: 'ちょうど・ただ' }, answer: 'just' },

  // ===== still =====
  { type: 'select', data: { question: '「still」の意味を選びなさい。', options: ['もう', 'ちょうど', 'よく', 'まだ'] }, answer: 'まだ' },
  { type: 'select', data: { question: '「まだ」を表す英語を選びなさい。', japanese: 'まだ', options: ['already', 'just', 'often', 'still'] }, answer: 'still' },
  { type: 'input', data: { question: '「まだ」を英語で書きなさい。', japanese: 'まだ' }, answer: 'still' },

  // ===== again =====
  { type: 'select', data: { question: '「again」の意味を選びなさい。', options: ['一度も〜ない', '初めて', 'いつも', 'もう一度・また'] }, answer: 'もう一度・また' },
  { type: 'select', data: { question: '「もう一度・また」を表す英語を選びなさい。', japanese: 'もう一度・また', options: ['never', 'for the first time', 'always', 'again'] }, answer: 'again' },
  { type: 'input', data: { question: '「もう一度・また」を英語で書きなさい。', japanese: 'もう一度・また' }, answer: 'again' },

  // ===== together =====
  { type: 'select', data: { question: '「together」の意味を選びなさい。', options: ['一人で', '別々に', '静かに', '一緒に'] }, answer: '一緒に' },
  { type: 'select', data: { question: '「一緒に」を表す英語を選びなさい。', japanese: '一緒に', options: ['alone', 'separately', 'quietly', 'together'] }, answer: 'together' },
  { type: 'input', data: { question: '「一緒に」を英語で書きなさい。', japanese: '一緒に' }, answer: 'together' },
];
