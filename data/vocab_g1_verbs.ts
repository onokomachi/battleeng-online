import type { Problem } from '../types';

export const vocabG1VerbProblems: Problem[] = [
  // --- be ---
  { type: 'select', data: { question: '「be」の意味を選びなさい。', options: ['〜を持つ', '〜である・いる', '〜を食べる', '〜へ行く'] }, answer: '〜である・いる' },
  { type: 'select', data: { question: '「〜である・いる」を表す英語を選びなさい。', japanese: '〜である・いる', options: ['have', 'go', 'be', 'come'] }, answer: 'be' },
  { type: 'input', data: { question: '「〜である・いる」を英語で書きなさい。', japanese: '〜である・いる' }, answer: 'be' },

  // --- have ---
  { type: 'select', data: { question: '「have」の意味を選びなさい。', options: ['〜である', '〜を食べる', '〜を持つ', '〜へ行く'] }, answer: '〜を持つ' },
  { type: 'select', data: { question: '「〜を持つ」を表す英語を選びなさい。', japanese: '〜を持つ', options: ['be', 'make', 'have', 'use'] }, answer: 'have' },
  { type: 'input', data: { question: '「〜を持つ」を英語で書きなさい。', japanese: '〜を持つ' }, answer: 'have' },

  // --- go ---
  { type: 'select', data: { question: '「go」の意味を選びなさい。', options: ['来る', '走る', '〜を食べる', '行く'] }, answer: '行く' },
  { type: 'select', data: { question: '「行く」を表す英語を選びなさい。', japanese: '行く', options: ['come', 'run', 'walk', 'go'] }, answer: 'go' },
  { type: 'input', data: { question: '「行く」を英語で書きなさい。', japanese: '行く' }, answer: 'go' },

  // --- come ---
  { type: 'select', data: { question: '「come」の意味を選びなさい。', options: ['行く', '走る', '来る', '歩く'] }, answer: '来る' },
  { type: 'select', data: { question: '「来る」を表す英語を選びなさい。', japanese: '来る', options: ['go', 'run', 'come', 'walk'] }, answer: 'come' },
  { type: 'input', data: { question: '「来る」を英語で書きなさい。', japanese: '来る' }, answer: 'come' },

  // --- play ---
  { type: 'select', data: { question: '「play」の意味を選びなさい。', options: ['〜を食べる', '〜を飲む', '走る', '〜をする・遊ぶ'] }, answer: '〜をする・遊ぶ' },
  { type: 'select', data: { question: '「〜をする・遊ぶ」を表す英語を選びなさい。', japanese: '〜をする・遊ぶ', options: ['eat', 'drink', 'run', 'play'] }, answer: 'play' },
  { type: 'input', data: { question: '「〜をする・遊ぶ」を英語で書きなさい。', japanese: '〜をする・遊ぶ' }, answer: 'play' },

  // --- eat ---
  { type: 'select', data: { question: '「eat」の意味を選びなさい。', options: ['〜を飲む', '〜を作る', '〜を食べる', '〜を見る'] }, answer: '〜を食べる' },
  { type: 'select', data: { question: '「〜を食べる」を表す英語を選びなさい。', japanese: '〜を食べる', options: ['drink', 'make', 'see', 'eat'] }, answer: 'eat' },
  { type: 'input', data: { question: '「〜を食べる」を英語で書きなさい。', japanese: '〜を食べる' }, answer: 'eat' },

  // --- drink ---
  { type: 'select', data: { question: '「drink」の意味を選びなさい。', options: ['〜を食べる', '〜を作る', '〜を飲む', '〜を使う'] }, answer: '〜を飲む' },
  { type: 'select', data: { question: '「〜を飲む」を表す英語を選びなさい。', japanese: '〜を飲む', options: ['eat', 'make', 'drink', 'use'] }, answer: 'drink' },
  { type: 'input', data: { question: '「〜を飲む」を英語で書きなさい。', japanese: '〜を飲む' }, answer: 'drink' },

  // --- run ---
  { type: 'select', data: { question: '「run」の意味を選びなさい。', options: ['歩く', '泳ぐ', '飛ぶ', '走る'] }, answer: '走る' },
  { type: 'select', data: { question: '「走る」を表す英語を選びなさい。', japanese: '走る', options: ['walk', 'swim', 'run', 'fly'] }, answer: 'run' },
  { type: 'input', data: { question: '「走る」を英語で書きなさい。', japanese: '走る' }, answer: 'run' },

  // --- walk ---
  { type: 'select', data: { question: '「walk」の意味を選びなさい。', options: ['走る', '歩く', '乗る', '止まる'] }, answer: '歩く' },
  { type: 'select', data: { question: '「歩く」を表す英語を選びなさい。', japanese: '歩く', options: ['run', 'ride', 'stop', 'walk'] }, answer: 'walk' },
  { type: 'input', data: { question: '「歩く」を英語で書きなさい。', japanese: '歩く' }, answer: 'walk' },

  // --- like ---
  { type: 'select', data: { question: '「like」の意味を選びなさい。', options: ['〜を欲しがる', '〜を必要とする', '〜が好きだ', '〜を愛する'] }, answer: '〜が好きだ' },
  { type: 'select', data: { question: '「〜が好きだ」を表す英語を選びなさい。', japanese: '〜が好きだ', options: ['want', 'need', 'love', 'like'] }, answer: 'like' },
  { type: 'input', data: { question: '「〜が好きだ」を英語で書きなさい。', japanese: '〜が好きだ' }, answer: 'like' },

  // --- want ---
  { type: 'select', data: { question: '「want」の意味を選びなさい。', options: ['〜が好きだ', '〜を必要とする', '〜を欲しがる', '〜を知る'] }, answer: '〜を欲しがる' },
  { type: 'select', data: { question: '「〜を欲しがる」を表す英語を選びなさい。', japanese: '〜を欲しがる', options: ['like', 'need', 'know', 'want'] }, answer: 'want' },
  { type: 'input', data: { question: '「〜を欲しがる」を英語で書きなさい。', japanese: '〜を欲しがる' }, answer: 'want' },

  // --- use ---
  { type: 'select', data: { question: '「use」の意味を選びなさい。', options: ['〜を作る', '〜を知る', '〜を見る', '〜を使う'] }, answer: '〜を使う' },
  { type: 'select', data: { question: '「〜を使う」を表す英語を選びなさい。', japanese: '〜を使う', options: ['make', 'know', 'see', 'use'] }, answer: 'use' },
  { type: 'input', data: { question: '「〜を使う」を英語で書きなさい。', japanese: '〜を使う' }, answer: 'use' },

  // --- make ---
  { type: 'select', data: { question: '「make」の意味を選びなさい。', options: ['〜を使う', '〜を知る', '〜を作る', '〜を見る'] }, answer: '〜を作る' },
  { type: 'select', data: { question: '「〜を作る」を表す英語を選びなさい。', japanese: '〜を作る', options: ['use', 'know', 'see', 'make'] }, answer: 'make' },
  { type: 'input', data: { question: '「〜を作る」を英語で書きなさい。', japanese: '〜を作る' }, answer: 'make' },

  // --- know ---
  { type: 'select', data: { question: '「know」の意味を選びなさい。', options: ['〜を見る', '〜を作る', '〜を使う', '〜を知っている'] }, answer: '〜を知っている' },
  { type: 'select', data: { question: '「〜を知っている」を表す英語を選びなさい。', japanese: '〜を知っている', options: ['see', 'make', 'use', 'know'] }, answer: 'know' },
  { type: 'input', data: { question: '「〜を知っている」を英語で書きなさい。', japanese: '〜を知っている' }, answer: 'know' },

  // --- see ---
  { type: 'select', data: { question: '「see」の意味を選びなさい。', options: ['〜を聞く', '〜を買う', '〜を見る', '〜を読む'] }, answer: '〜を見る' },
  { type: 'select', data: { question: '「〜を見る」を表す英語を選びなさい。', japanese: '〜を見る', options: ['listen', 'buy', 'read', 'see'] }, answer: 'see' },
  { type: 'input', data: { question: '「〜を見る」を英語で書きなさい。', japanese: '〜を見る' }, answer: 'see' },

  // --- buy ---
  { type: 'select', data: { question: '「buy」の意味を選びなさい。', options: ['〜を読む', '〜を書く', '〜を見る', '〜を買う'] }, answer: '〜を買う' },
  { type: 'select', data: { question: '「〜を買う」を表す英語を選びなさい。', japanese: '〜を買う', options: ['read', 'write', 'see', 'buy'] }, answer: 'buy' },
  { type: 'input', data: { question: '「〜を買う」を英語で書きなさい。', japanese: '〜を買う' }, answer: 'buy' },

  // --- read ---
  { type: 'select', data: { question: '「read」の意味を選びなさい。', options: ['〜を書く', '〜を話す', '〜を買う', '〜を読む'] }, answer: '〜を読む' },
  { type: 'select', data: { question: '「〜を読む」を表す英語を選びなさい。', japanese: '〜を読む', options: ['write', 'speak', 'buy', 'read'] }, answer: 'read' },
  { type: 'input', data: { question: '「〜を読む」を英語で書きなさい。', japanese: '〜を読む' }, answer: 'read' },

  // --- write ---
  { type: 'select', data: { question: '「write」の意味を選びなさい。', options: ['〜を読む', '〜を話す', '〜を書く', '〜を聞く'] }, answer: '〜を書く' },
  { type: 'select', data: { question: '「〜を書く」を表す英語を選びなさい。', japanese: '〜を書く', options: ['read', 'speak', 'listen', 'write'] }, answer: 'write' },
  { type: 'input', data: { question: '「〜を書く」を英語で書きなさい。', japanese: '〜を書く' }, answer: 'write' },

  // --- speak ---
  { type: 'select', data: { question: '「speak」の意味を選びなさい。', options: ['〜を聞く', '〜を勉強する', '〜を話す', '〜を書く'] }, answer: '〜を話す' },
  { type: 'select', data: { question: '「〜を話す」を表す英語を選びなさい。', japanese: '〜を話す', options: ['listen', 'study', 'write', 'speak'] }, answer: 'speak' },
  { type: 'input', data: { question: '「〜を話す」を英語で書きなさい。', japanese: '〜を話す' }, answer: 'speak' },

  // --- listen ---
  { type: 'select', data: { question: '「listen」の意味を選びなさい。', options: ['〜を話す', '〜を見る', '〜を読む', '〜を聞く'] }, answer: '〜を聞く' },
  { type: 'select', data: { question: '「〜を聞く」を表す英語を選びなさい。', japanese: '〜を聞く', options: ['speak', 'see', 'read', 'listen'] }, answer: 'listen' },
  { type: 'input', data: { question: '「〜を聞く」を英語で書きなさい。', japanese: '〜を聞く' }, answer: 'listen' },

  // --- study ---
  { type: 'select', data: { question: '「study」の意味を選びなさい。', options: ['〜を教える', '〜を学ぶ', '〜を勉強する', '〜を練習する'] }, answer: '〜を勉強する' },
  { type: 'select', data: { question: '「〜を勉強する」を表す英語を選びなさい。', japanese: '〜を勉強する', options: ['teach', 'learn', 'practice', 'study'] }, answer: 'study' },
  { type: 'input', data: { question: '「〜を勉強する」を英語で書きなさい。', japanese: '〜を勉強する' }, answer: 'study' },

  // --- live ---
  { type: 'select', data: { question: '「live」の意味を選びなさい。', options: ['〜を訪れる', '〜に滞在する', '〜を働く', '住んでいる・生きている'] }, answer: '住んでいる・生きている' },
  { type: 'select', data: { question: '「住んでいる・生きている」を表す英語を選びなさい。', japanese: '住んでいる・生きている', options: ['visit', 'stay', 'work', 'live'] }, answer: 'live' },
  { type: 'input', data: { question: '「住んでいる・生きている」を英語で書きなさい。', japanese: '住んでいる・生きている' }, answer: 'live' },

  // --- help ---
  { type: 'select', data: { question: '「help」の意味を選びなさい。', options: ['〜を必要とする', '〜を教える', '〜を助ける', '〜を守る'] }, answer: '〜を助ける' },
  { type: 'select', data: { question: '「〜を助ける」を表す英語を選びなさい。', japanese: '〜を助ける', options: ['need', 'teach', 'protect', 'help'] }, answer: 'help' },
  { type: 'input', data: { question: '「〜を助ける」を英語で書きなさい。', japanese: '〜を助ける' }, answer: 'help' },

  // --- visit ---
  { type: 'select', data: { question: '「visit」の意味を選びなさい。', options: ['住む', '〜に戻る', '〜に電話する', '〜を訪れる'] }, answer: '〜を訪れる' },
  { type: 'select', data: { question: '「〜を訪れる」を表す英語を選びなさい。', japanese: '〜を訪れる', options: ['live', 'return', 'call', 'visit'] }, answer: 'visit' },
  { type: 'input', data: { question: '「〜を訪れる」を英語で書きなさい。', japanese: '〜を訪れる' }, answer: 'visit' },

  // --- call ---
  { type: 'select', data: { question: '「call」の意味を選びなさい。', options: ['〜を尋ねる', '〜を訪れる', '〜に電話する・〜を呼ぶ', '〜を頼む'] }, answer: '〜に電話する・〜を呼ぶ' },
  { type: 'select', data: { question: '「〜に電話する・〜を呼ぶ」を表す英語を選びなさい。', japanese: '〜に電話する・〜を呼ぶ', options: ['ask', 'visit', 'look', 'call'] }, answer: 'call' },
  { type: 'input', data: { question: '「〜に電話する・〜を呼ぶ」を英語で書きなさい。', japanese: '〜に電話する・〜を呼ぶ' }, answer: 'call' },

  // --- ask ---
  { type: 'select', data: { question: '「ask」の意味を選びなさい。', options: ['〜に電話する', '〜を見る', '〜を尋ねる・頼む', '〜を話す'] }, answer: '〜を尋ねる・頼む' },
  { type: 'select', data: { question: '「〜を尋ねる・頼む」を表す英語を選びなさい。', japanese: '〜を尋ねる・頼む', options: ['call', 'look', 'speak', 'ask'] }, answer: 'ask' },
  { type: 'input', data: { question: '「〜を尋ねる・頼む」を英語で書きなさい。', japanese: '〜を尋ねる・頼む' }, answer: 'ask' },

  // --- look ---
  { type: 'select', data: { question: '「look」の意味を選びなさい。', options: ['〜を見る（watch）', '〜を尋ねる', '〜を聞く', '〜を見る・〜に見える'] }, answer: '〜を見る・〜に見える' },
  { type: 'select', data: { question: '「〜を見る・〜に見える」を表す英語を選びなさい。', japanese: '〜を見る・〜に見える', options: ['watch', 'ask', 'listen', 'look'] }, answer: 'look' },
  { type: 'input', data: { question: '「〜を見る・〜に見える」を英語で書きなさい。', japanese: '〜を見る・〜に見える' }, answer: 'look' },

  // --- work ---
  { type: 'select', data: { question: '「work」の意味を選びなさい。', options: ['〜を勉強する', '住む', '働く', '〜を休む'] }, answer: '働く' },
  { type: 'select', data: { question: '「働く」を表す英語を選びなさい。', japanese: '働く', options: ['study', 'live', 'rest', 'work'] }, answer: 'work' },
  { type: 'input', data: { question: '「働く」を英語で書きなさい。', japanese: '働く' }, answer: 'work' },

  // --- start ---
  { type: 'select', data: { question: '「start」の意味を選びなさい。', options: ['〜を止める', '〜を終える', '〜を続ける', '〜を始める'] }, answer: '〜を始める' },
  { type: 'select', data: { question: '「〜を始める」を表す英語を選びなさい。', japanese: '〜を始める', options: ['stop', 'finish', 'continue', 'start'] }, answer: 'start' },
  { type: 'input', data: { question: '「〜を始める」を英語で書きなさい。', japanese: '〜を始める' }, answer: 'start' },

  // --- stop ---
  { type: 'select', data: { question: '「stop」の意味を選びなさい。', options: ['〜を始める', '〜を続ける', '〜を止める', '〜を終える'] }, answer: '〜を止める' },
  { type: 'select', data: { question: '「〜を止める」を表す英語を選びなさい。', japanese: '〜を止める', options: ['start', 'continue', 'finish', 'stop'] }, answer: 'stop' },
  { type: 'input', data: { question: '「〜を止める」を英語で書きなさい。', japanese: '〜を止める' }, answer: 'stop' },

  // --- think ---
  { type: 'select', data: { question: '「think」の意味を選びなさい。', options: ['〜を知る', '〜を覚える', '〜を考える', '〜を理解する'] }, answer: '〜を考える' },
  { type: 'select', data: { question: '「〜を考える」を表す英語を選びなさい。', japanese: '〜を考える', options: ['know', 'remember', 'understand', 'think'] }, answer: 'think' },
  { type: 'input', data: { question: '「〜を考える」を英語で書きなさい。', japanese: '〜を考える' }, answer: 'think' },

  // --- try ---
  { type: 'select', data: { question: '「try」の意味を選びなさい。', options: ['〜を練習する', '〜を始める', '〜を試みる', '〜を続ける'] }, answer: '〜を試みる' },
  { type: 'select', data: { question: '「〜を試みる」を表す英語を選びなさい。', japanese: '〜を試みる', options: ['practice', 'start', 'continue', 'try'] }, answer: 'try' },
  { type: 'input', data: { question: '「〜を試みる」を英語で書きなさい。', japanese: '〜を試みる' }, answer: 'try' },

  // --- get ---
  { type: 'select', data: { question: '「get」の意味を選びなさい。', options: ['〜を送る', '〜を作る', '〜を受け取る・手に入れる', '〜を買う'] }, answer: '〜を受け取る・手に入れる' },
  { type: 'select', data: { question: '「〜を受け取る・手に入れる」を表す英語を選びなさい。', japanese: '〜を受け取る・手に入れる', options: ['send', 'make', 'buy', 'get'] }, answer: 'get' },
  { type: 'input', data: { question: '「〜を受け取る・手に入れる」を英語で書きなさい。', japanese: '〜を受け取る・手に入れる' }, answer: 'get' },

  // --- give ---
  { type: 'select', data: { question: '「give」の意味を選びなさい。', options: ['〜を受け取る', '〜を送る', '〜を持つ', '〜を与える'] }, answer: '〜を与える' },
  { type: 'select', data: { question: '「〜を与える」を表す英語を選びなさい。', japanese: '〜を与える', options: ['get', 'send', 'have', 'give'] }, answer: 'give' },
  { type: 'input', data: { question: '「〜を与える」を英語で書きなさい。', japanese: '〜を与える' }, answer: 'give' },

  // --- take ---
  { type: 'select', data: { question: '「take」の意味を選びなさい。', options: ['〜を与える', '〜を持ってくる', '〜を取る・持っていく', '〜を送る'] }, answer: '〜を取る・持っていく' },
  { type: 'select', data: { question: '「〜を取る・持っていく」を表す英語を選びなさい。', japanese: '〜を取る・持っていく', options: ['give', 'bring', 'send', 'take'] }, answer: 'take' },
  { type: 'input', data: { question: '「〜を取る・持っていく」を英語で書きなさい。', japanese: '〜を取る・持っていく' }, answer: 'take' },

  // --- find ---
  { type: 'select', data: { question: '「find」の意味を選びなさい。', options: ['〜を失う', '〜を見る', '〜を知る', '〜を見つける'] }, answer: '〜を見つける' },
  { type: 'select', data: { question: '「〜を見つける」を表す英語を選びなさい。', japanese: '〜を見つける', options: ['lose', 'see', 'know', 'find'] }, answer: 'find' },
  { type: 'input', data: { question: '「〜を見つける」を英語で書きなさい。', japanese: '〜を見つける' }, answer: 'find' },

  // --- watch ---
  { type: 'select', data: { question: '「watch」の意味を選びなさい。', options: ['〜を見る（look）', '〜を聞く', '〜を読む', '〜を（じっと）見る'] }, answer: '〜を（じっと）見る' },
  { type: 'select', data: { question: '「〜を（じっと）見る」を表す英語を選びなさい。', japanese: '〜を（じっと）見る', options: ['look', 'listen', 'read', 'watch'] }, answer: 'watch' },
  { type: 'input', data: { question: '「〜を（じっと）見る」を英語で書きなさい。', japanese: '〜を（じっと）見る' }, answer: 'watch' },

  // --- enjoy ---
  { type: 'select', data: { question: '「enjoy」の意味を選びなさい。', options: ['〜が好きだ', '〜を試みる', '〜を楽しむ', '〜を遊ぶ'] }, answer: '〜を楽しむ' },
  { type: 'select', data: { question: '「〜を楽しむ」を表す英語を選びなさい。', japanese: '〜を楽しむ', options: ['like', 'try', 'play', 'enjoy'] }, answer: 'enjoy' },
  { type: 'input', data: { question: '「〜を楽しむ」を英語で書きなさい。', japanese: '〜を楽しむ' }, answer: 'enjoy' },

  // --- love ---
  { type: 'select', data: { question: '「love」の意味を選びなさい。', options: ['〜が好きだ', '〜を欲しがる', '〜を楽しむ', '〜を愛する・大好きだ'] }, answer: '〜を愛する・大好きだ' },
  { type: 'select', data: { question: '「〜を愛する・大好きだ」を表す英語を選びなさい。', japanese: '〜を愛する・大好きだ', options: ['like', 'want', 'enjoy', 'love'] }, answer: 'love' },
  { type: 'input', data: { question: '「〜を愛する・大好きだ」を英語で書きなさい。', japanese: '〜を愛する・大好きだ' }, answer: 'love' },

  // --- need ---
  { type: 'select', data: { question: '「need」の意味を選びなさい。', options: ['〜を欲しがる', '〜を使う', '〜を必要とする', '〜を求める'] }, answer: '〜を必要とする' },
  { type: 'select', data: { question: '「〜を必要とする」を表す英語を選びなさい。', japanese: '〜を必要とする', options: ['want', 'use', 'ask', 'need'] }, answer: 'need' },
  { type: 'input', data: { question: '「〜を必要とする」を英語で書きなさい。', japanese: '〜を必要とする' }, answer: 'need' },

  // --- remember ---
  { type: 'select', data: { question: '「remember」の意味を選びなさい。', options: ['〜を忘れる', '〜を知る', '〜を考える', '〜を覚えている'] }, answer: '〜を覚えている' },
  { type: 'select', data: { question: '「〜を覚えている」を表す英語を選びなさい。', japanese: '〜を覚えている', options: ['forget', 'know', 'think', 'remember'] }, answer: 'remember' },
  { type: 'input', data: { question: '「〜を覚えている」を英語で書きなさい。', japanese: '〜を覚えている' }, answer: 'remember' },

  // --- open ---
  { type: 'select', data: { question: '「open」の意味を選びなさい。', options: ['〜を閉める', '〜を壊す', '〜を開ける', '〜を止める'] }, answer: '〜を開ける' },
  { type: 'select', data: { question: '「〜を開ける」を表す英語を選びなさい。', japanese: '〜を開ける', options: ['close', 'break', 'stop', 'open'] }, answer: 'open' },
  { type: 'input', data: { question: '「〜を開ける」を英語で書きなさい。', japanese: '〜を開ける' }, answer: 'open' },

  // --- close ---
  { type: 'select', data: { question: '「close」の意味を選びなさい。', options: ['〜を開ける', '〜を持つ', '〜を始める', '〜を閉める'] }, answer: '〜を閉める' },
  { type: 'select', data: { question: '「〜を閉める」を表す英語を選びなさい。', japanese: '〜を閉める', options: ['open', 'hold', 'start', 'close'] }, answer: 'close' },
  { type: 'input', data: { question: '「〜を閉める」を英語で書きなさい。', japanese: '〜を閉める' }, answer: 'close' },

  // --- bring ---
  { type: 'select', data: { question: '「bring」の意味を選びなさい。', options: ['〜を持っていく', '〜を送る', '〜を持ってくる', '〜を与える'] }, answer: '〜を持ってくる' },
  { type: 'select', data: { question: '「〜を持ってくる」を表す英語を選びなさい。', japanese: '〜を持ってくる', options: ['take', 'send', 'give', 'bring'] }, answer: 'bring' },
  { type: 'input', data: { question: '「〜を持ってくる」を英語で書きなさい。', japanese: '〜を持ってくる' }, answer: 'bring' },

  // --- swim ---
  { type: 'select', data: { question: '「swim」の意味を選びなさい。', options: ['走る', '飛ぶ', '歩く', '泳ぐ'] }, answer: '泳ぐ' },
  { type: 'select', data: { question: '「泳ぐ」を表す英語を選びなさい。', japanese: '泳ぐ', options: ['run', 'fly', 'walk', 'swim'] }, answer: 'swim' },
  { type: 'input', data: { question: '「泳ぐ」を英語で書きなさい。', japanese: '泳ぐ' }, answer: 'swim' },

  // --- ride ---
  { type: 'select', data: { question: '「ride」の意味を選びなさい。', options: ['歩く', '走る', '〜を運ぶ', '〜に乗る'] }, answer: '〜に乗る' },
  { type: 'select', data: { question: '「〜に乗る」を表す英語を選びなさい。', japanese: '〜に乗る', options: ['walk', 'run', 'carry', 'ride'] }, answer: 'ride' },
  { type: 'input', data: { question: '「〜に乗る」を英語で書きなさい。', japanese: '〜に乗る' }, answer: 'ride' },

  // --- teach ---
  { type: 'select', data: { question: '「teach」の意味を選びなさい。', options: ['〜を学ぶ', '〜を助ける', '〜を勉強する', '〜を教える'] }, answer: '〜を教える' },
  { type: 'select', data: { question: '「〜を教える」を表す英語を選びなさい。', japanese: '〜を教える', options: ['learn', 'help', 'study', 'teach'] }, answer: 'teach' },
  { type: 'input', data: { question: '「〜を教える」を英語で書きなさい。', japanese: '〜を教える' }, answer: 'teach' },

  // --- learn ---
  { type: 'select', data: { question: '「learn」の意味を選びなさい。', options: ['〜を教える', '〜を勉強する', '〜を学ぶ', '〜を練習する'] }, answer: '〜を学ぶ' },
  { type: 'select', data: { question: '「〜を学ぶ」を表す英語を選びなさい。', japanese: '〜を学ぶ', options: ['teach', 'study', 'practice', 'learn'] }, answer: 'learn' },
  { type: 'input', data: { question: '「〜を学ぶ」を英語で書きなさい。', japanese: '〜を学ぶ' }, answer: 'learn' },

  // --- sleep ---
  { type: 'select', data: { question: '「sleep」の意味を選びなさい。', options: ['〜を休む', '〜を起きる', '働く', '眠る'] }, answer: '眠る' },
  { type: 'select', data: { question: '「眠る」を表す英語を選びなさい。', japanese: '眠る', options: ['rest', 'wake', 'work', 'sleep'] }, answer: 'sleep' },
  { type: 'input', data: { question: '「眠る」を英語で書きなさい。', japanese: '眠る' }, answer: 'sleep' },

  // --- talk ---
  { type: 'select', data: { question: '「talk」の意味を選びなさい。', options: ['〜を聞く', '〜を書く', '〜を話す（speak）', '話す・おしゃべりする'] }, answer: '話す・おしゃべりする' },
  { type: 'select', data: { question: '「話す・おしゃべりする」を表す英語を選びなさい。', japanese: '話す・おしゃべりする', options: ['listen', 'write', 'speak', 'talk'] }, answer: 'talk' },
  { type: 'input', data: { question: '「話す・おしゃべりする」を英語で書きなさい。', japanese: '話す・おしゃべりする' }, answer: 'talk' },
];
