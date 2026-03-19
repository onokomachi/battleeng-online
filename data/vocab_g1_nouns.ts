import type { Problem } from '../types';

export const vocabG1NounProblems: Problem[] = [
  // --- school ---
  { type: 'select', data: { question: '「school」の意味を選びなさい。', options: ['図書館', '病院', '学校', '公園'] }, answer: '学校' },
  { type: 'select', data: { question: '「学校」を表す英語を選びなさい。', japanese: '学校', options: ['library', 'hospital', 'park', 'school'] }, answer: 'school' },
  { type: 'input', data: { question: '「学校」を英語で書きなさい。', japanese: '学校' }, answer: 'school' },

  // --- teacher ---
  { type: 'select', data: { question: '「teacher」の意味を選びなさい。', options: ['生徒', '医者', '先生', 'コーチ'] }, answer: '先生' },
  { type: 'select', data: { question: '「先生」を表す英語を選びなさい。', japanese: '先生', options: ['student', 'doctor', 'coach', 'teacher'] }, answer: 'teacher' },
  { type: 'input', data: { question: '「先生」を英語で書きなさい。', japanese: '先生' }, answer: 'teacher' },

  // --- student ---
  { type: 'select', data: { question: '「student」の意味を選びなさい。', options: ['先生', '友達', '生徒', '子供'] }, answer: '生徒' },
  { type: 'select', data: { question: '「生徒」を表す英語を選びなさい。', japanese: '生徒', options: ['teacher', 'friend', 'child', 'student'] }, answer: 'student' },
  { type: 'input', data: { question: '「生徒」を英語で書きなさい。', japanese: '生徒' }, answer: 'student' },

  // --- book ---
  { type: 'select', data: { question: '「book」の意味を選びなさい。', options: ['ノート', '手紙', '本', '雑誌'] }, answer: '本' },
  { type: 'select', data: { question: '「本」を表す英語を選びなさい。', japanese: '本', options: ['notebook', 'letter', 'magazine', 'book'] }, answer: 'book' },
  { type: 'input', data: { question: '「本」を英語で書きなさい。', japanese: '本' }, answer: 'book' },

  // --- pen ---
  { type: 'select', data: { question: '「pen」の意味を選びなさい。', options: ['鉛筆', '消しゴム', 'ペン', '定規'] }, answer: 'ペン' },
  { type: 'select', data: { question: '「ペン」を表す英語を選びなさい。', japanese: 'ペン', options: ['pencil', 'eraser', 'ruler', 'pen'] }, answer: 'pen' },
  { type: 'input', data: { question: '「ペン」を英語で書きなさい。', japanese: 'ペン' }, answer: 'pen' },

  // --- class ---
  { type: 'select', data: { question: '「class」の意味を選びなさい。', options: ['クラブ', '授業・クラス', 'テスト', '学校'] }, answer: '授業・クラス' },
  { type: 'select', data: { question: '「授業・クラス」を表す英語を選びなさい。', japanese: '授業・クラス', options: ['club', 'test', 'school', 'class'] }, answer: 'class' },
  { type: 'input', data: { question: '「授業・クラス」を英語で書きなさい。', japanese: '授業・クラス' }, answer: 'class' },

  // --- desk ---
  { type: 'select', data: { question: '「desk」の意味を選びなさい。', options: ['椅子', '棚', 'ドア', '机'] }, answer: '机' },
  { type: 'select', data: { question: '「机」を表す英語を選びなさい。', japanese: '机', options: ['chair', 'shelf', 'door', 'desk'] }, answer: 'desk' },
  { type: 'input', data: { question: '「机」を英語で書きなさい。', japanese: '机' }, answer: 'desk' },

  // --- friend ---
  { type: 'select', data: { question: '「friend」の意味を選びなさい。', options: ['家族', '生徒', '先生', '友達'] }, answer: '友達' },
  { type: 'select', data: { question: '「友達」を表す英語を選びなさい。', japanese: '友達', options: ['family', 'student', 'teacher', 'friend'] }, answer: 'friend' },
  { type: 'input', data: { question: '「友達」を英語で書きなさい。', japanese: '友達' }, answer: 'friend' },

  // --- family ---
  { type: 'select', data: { question: '「family」の意味を選びなさい。', options: ['友達', 'グループ', '家族', 'チーム'] }, answer: '家族' },
  { type: 'select', data: { question: '「家族」を表す英語を選びなさい。', japanese: '家族', options: ['friend', 'group', 'team', 'family'] }, answer: 'family' },
  { type: 'input', data: { question: '「家族」を英語で書きなさい。', japanese: '家族' }, answer: 'family' },

  // --- father ---
  { type: 'select', data: { question: '「father」の意味を選びなさい。', options: ['母', '兄・弟', '祖父', '父'] }, answer: '父' },
  { type: 'select', data: { question: '「父」を表す英語を選びなさい。', japanese: '父', options: ['mother', 'brother', 'grandfather', 'father'] }, answer: 'father' },
  { type: 'input', data: { question: '「父」を英語で書きなさい。', japanese: '父' }, answer: 'father' },

  // --- mother ---
  { type: 'select', data: { question: '「mother」の意味を選びなさい。', options: ['父', '姉・妹', '祖母', '母'] }, answer: '母' },
  { type: 'select', data: { question: '「母」を表す英語を選びなさい。', japanese: '母', options: ['father', 'sister', 'grandmother', 'mother'] }, answer: 'mother' },
  { type: 'input', data: { question: '「母」を英語で書きなさい。', japanese: '母' }, answer: 'mother' },

  // --- brother ---
  { type: 'select', data: { question: '「brother」の意味を選びなさい。', options: ['姉・妹', '父', '叔父', '兄・弟'] }, answer: '兄・弟' },
  { type: 'select', data: { question: '「兄・弟」を表す英語を選びなさい。', japanese: '兄・弟', options: ['sister', 'father', 'uncle', 'brother'] }, answer: 'brother' },
  { type: 'input', data: { question: '「兄・弟」を英語で書きなさい。', japanese: '兄・弟' }, answer: 'brother' },

  // --- sister ---
  { type: 'select', data: { question: '「sister」の意味を選びなさい。', options: ['兄・弟', '母', '叔母', '姉・妹'] }, answer: '姉・妹' },
  { type: 'select', data: { question: '「姉・妹」を表す英語を選びなさい。', japanese: '姉・妹', options: ['brother', 'mother', 'aunt', 'sister'] }, answer: 'sister' },
  { type: 'input', data: { question: '「姉・妹」を英語で書きなさい。', japanese: '姉・妹' }, answer: 'sister' },

  // --- boy ---
  { type: 'select', data: { question: '「boy」の意味を選びなさい。', options: ['女の子', '男性', '子供', '男の子'] }, answer: '男の子' },
  { type: 'select', data: { question: '「男の子」を表す英語を選びなさい。', japanese: '男の子', options: ['girl', 'man', 'child', 'boy'] }, answer: 'boy' },
  { type: 'input', data: { question: '「男の子」を英語で書きなさい。', japanese: '男の子' }, answer: 'boy' },

  // --- girl ---
  { type: 'select', data: { question: '「girl」の意味を選びなさい。', options: ['男の子', '女性', '子供', '女の子'] }, answer: '女の子' },
  { type: 'select', data: { question: '「女の子」を表す英語を選びなさい。', japanese: '女の子', options: ['boy', 'woman', 'child', 'girl'] }, answer: 'girl' },
  { type: 'input', data: { question: '「女の子」を英語で書きなさい。', japanese: '女の子' }, answer: 'girl' },

  // --- man ---
  { type: 'select', data: { question: '「man」の意味を選びなさい。', options: ['女性', '男の子', '子供', '男性'] }, answer: '男性' },
  { type: 'select', data: { question: '「男性」を表す英語を選びなさい。', japanese: '男性', options: ['woman', 'boy', 'child', 'man'] }, answer: 'man' },
  { type: 'input', data: { question: '「男性」を英語で書きなさい。', japanese: '男性' }, answer: 'man' },

  // --- woman ---
  { type: 'select', data: { question: '「woman」の意味を選びなさい。', options: ['男性', '女の子', '子供', '女性'] }, answer: '女性' },
  { type: 'select', data: { question: '「女性」を表す英語を選びなさい。', japanese: '女性', options: ['man', 'girl', 'child', 'woman'] }, answer: 'woman' },
  { type: 'input', data: { question: '「女性」を英語で書きなさい。', japanese: '女性' }, answer: 'woman' },

  // --- town ---
  { type: 'select', data: { question: '「town」の意味を選びなさい。', options: ['都市', '村', '国', '町'] }, answer: '町' },
  { type: 'select', data: { question: '「町」を表す英語を選びなさい。', japanese: '町', options: ['city', 'village', 'country', 'town'] }, answer: 'town' },
  { type: 'input', data: { question: '「町」を英語で書きなさい。', japanese: '町' }, answer: 'town' },

  // --- park ---
  { type: 'select', data: { question: '「park」の意味を選びなさい。', options: ['学校', '庭', '公園', '広場'] }, answer: '公園' },
  { type: 'select', data: { question: '「公園」を表す英語を選びなさい。', japanese: '公園', options: ['school', 'garden', 'square', 'park'] }, answer: 'park' },
  { type: 'input', data: { question: '「公園」を英語で書きなさい。', japanese: '公園' }, answer: 'park' },

  // --- city ---
  { type: 'select', data: { question: '「city」の意味を選びなさい。', options: ['村', '町', '国', '都市'] }, answer: '都市' },
  { type: 'select', data: { question: '「都市」を表す英語を選びなさい。', japanese: '都市', options: ['village', 'town', 'country', 'city'] }, answer: 'city' },
  { type: 'input', data: { question: '「都市」を英語で書きなさい。', japanese: '都市' }, answer: 'city' },

  // --- country ---
  { type: 'select', data: { question: '「country」の意味を選びなさい。', options: ['都市', '町', '島', '国'] }, answer: '国' },
  { type: 'select', data: { question: '「国」を表す英語を選びなさい。', japanese: '国', options: ['city', 'town', 'island', 'country'] }, answer: 'country' },
  { type: 'input', data: { question: '「国」を英語で書きなさい。', japanese: '国' }, answer: 'country' },

  // --- food ---
  { type: 'select', data: { question: '「food」の意味を選びなさい。', options: ['水', '料理', '飲み物', '食べ物'] }, answer: '食べ物' },
  { type: 'select', data: { question: '「食べ物」を表す英語を選びなさい。', japanese: '食べ物', options: ['water', 'cooking', 'drink', 'food'] }, answer: 'food' },
  { type: 'input', data: { question: '「食べ物」を英語で書きなさい。', japanese: '食べ物' }, answer: 'food' },

  // --- water ---
  { type: 'select', data: { question: '「water」の意味を選びなさい。', options: ['食べ物', 'ジュース', '牛乳', '水'] }, answer: '水' },
  { type: 'select', data: { question: '「水」を表す英語を選びなさい。', japanese: '水', options: ['food', 'juice', 'milk', 'water'] }, answer: 'water' },
  { type: 'input', data: { question: '「水」を英語で書きなさい。', japanese: '水' }, answer: 'water' },

  // --- music ---
  { type: 'select', data: { question: '「music」の意味を選びなさい。', options: ['芸術', '科学', '音楽', 'スポーツ'] }, answer: '音楽' },
  { type: 'select', data: { question: '「音楽」を表す英語を選びなさい。', japanese: '音楽', options: ['art', 'science', 'sport', 'music'] }, answer: 'music' },
  { type: 'input', data: { question: '「音楽」を英語で書きなさい。', japanese: '音楽' }, answer: 'music' },

  // --- sport ---
  { type: 'select', data: { question: '「sport」の意味を選びなさい。', options: ['趣味', '音楽', '芸術', 'スポーツ'] }, answer: 'スポーツ' },
  { type: 'select', data: { question: '「スポーツ」を表す英語を選びなさい。', japanese: 'スポーツ', options: ['hobby', 'music', 'art', 'sport'] }, answer: 'sport' },
  { type: 'input', data: { question: '「スポーツ」を英語で書きなさい。', japanese: 'スポーツ' }, answer: 'sport' },

  // --- dog ---
  { type: 'select', data: { question: '「dog」の意味を選びなさい。', options: ['猫', '鳥', '魚', '犬'] }, answer: '犬' },
  { type: 'select', data: { question: '「犬」を表す英語を選びなさい。', japanese: '犬', options: ['cat', 'bird', 'fish', 'dog'] }, answer: 'dog' },
  { type: 'input', data: { question: '「犬」を英語で書きなさい。', japanese: '犬' }, answer: 'dog' },

  // --- cat ---
  { type: 'select', data: { question: '「cat」の意味を選びなさい。', options: ['犬', '鳥', '魚', '猫'] }, answer: '猫' },
  { type: 'select', data: { question: '「猫」を表す英語を選びなさい。', japanese: '猫', options: ['dog', 'bird', 'fish', 'cat'] }, answer: 'cat' },
  { type: 'input', data: { question: '「猫」を英語で書きなさい。', japanese: '猫' }, answer: 'cat' },

  // --- bird ---
  { type: 'select', data: { question: '「bird」の意味を選びなさい。', options: ['犬', '猫', '魚', '鳥'] }, answer: '鳥' },
  { type: 'select', data: { question: '「鳥」を表す英語を選びなさい。', japanese: '鳥', options: ['dog', 'cat', 'fish', 'bird'] }, answer: 'bird' },
  { type: 'input', data: { question: '「鳥」を英語で書きなさい。', japanese: '鳥' }, answer: 'bird' },

  // --- animal ---
  { type: 'select', data: { question: '「animal」の意味を選びなさい。', options: ['植物', '昆虫', '鳥', '動物'] }, answer: '動物' },
  { type: 'select', data: { question: '「動物」を表す英語を選びなさい。', japanese: '動物', options: ['plant', 'insect', 'bird', 'animal'] }, answer: 'animal' },
  { type: 'input', data: { question: '「動物」を英語で書きなさい。', japanese: '動物' }, answer: 'animal' },

  // --- time ---
  { type: 'select', data: { question: '「time」の意味を選びなさい。', options: ['日', '週', '年', '時間'] }, answer: '時間' },
  { type: 'select', data: { question: '「時間」を表す英語を選びなさい。', japanese: '時間', options: ['day', 'week', 'year', 'time'] }, answer: 'time' },
  { type: 'input', data: { question: '「時間」を英語で書きなさい。', japanese: '時間' }, answer: 'time' },

  // --- morning ---
  { type: 'select', data: { question: '「morning」の意味を選びなさい。', options: ['午後', '夕方', '夜', '朝'] }, answer: '朝' },
  { type: 'select', data: { question: '「朝」を表す英語を選びなさい。', japanese: '朝', options: ['afternoon', 'evening', 'night', 'morning'] }, answer: 'morning' },
  { type: 'input', data: { question: '「朝」を英語で書きなさい。', japanese: '朝' }, answer: 'morning' },

  // --- afternoon ---
  { type: 'select', data: { question: '「afternoon」の意味を選びなさい。', options: ['朝', '夕方', '夜', '午後'] }, answer: '午後' },
  { type: 'select', data: { question: '「午後」を表す英語を選びなさい。', japanese: '午後', options: ['morning', 'evening', 'night', 'afternoon'] }, answer: 'afternoon' },
  { type: 'input', data: { question: '「午後」を英語で書きなさい。', japanese: '午後' }, answer: 'afternoon' },

  // --- evening ---
  { type: 'select', data: { question: '「evening」の意味を選びなさい。', options: ['朝', '午後', '夜中', '夕方'] }, answer: '夕方' },
  { type: 'select', data: { question: '「夕方」を表す英語を選びなさい。', japanese: '夕方', options: ['morning', 'afternoon', 'midnight', 'evening'] }, answer: 'evening' },
  { type: 'input', data: { question: '「夕方」を英語で書きなさい。', japanese: '夕方' }, answer: 'evening' },

  // --- day ---
  { type: 'select', data: { question: '「day」の意味を選びなさい。', options: ['週', '月', '年', '日'] }, answer: '日' },
  { type: 'select', data: { question: '「日」を表す英語を選びなさい。', japanese: '日', options: ['week', 'month', 'year', 'day'] }, answer: 'day' },
  { type: 'input', data: { question: '「日」を英語で書きなさい。', japanese: '日' }, answer: 'day' },

  // --- week ---
  { type: 'select', data: { question: '「week」の意味を選びなさい。', options: ['日', '月', '年', '週'] }, answer: '週' },
  { type: 'select', data: { question: '「週」を表す英語を選びなさい。', japanese: '週', options: ['day', 'month', 'year', 'week'] }, answer: 'week' },
  { type: 'input', data: { question: '「週」を英語で書きなさい。', japanese: '週' }, answer: 'week' },

  // --- month ---
  { type: 'select', data: { question: '「month」の意味を選びなさい。', options: ['日', '週', '年', '月'] }, answer: '月' },
  { type: 'select', data: { question: '「月」を表す英語を選びなさい。', japanese: '月', options: ['day', 'week', 'year', 'month'] }, answer: 'month' },
  { type: 'input', data: { question: '「月」を英語で書きなさい。', japanese: '月' }, answer: 'month' },

  // --- year ---
  { type: 'select', data: { question: '「year」の意味を選びなさい。', options: ['日', '週', '月', '年'] }, answer: '年' },
  { type: 'select', data: { question: '「年」を表す英語を選びなさい。', japanese: '年', options: ['day', 'week', 'month', 'year'] }, answer: 'year' },
  { type: 'input', data: { question: '「年」を英語で書きなさい。', japanese: '年' }, answer: 'year' },

  // --- home ---
  { type: 'select', data: { question: '「home」の意味を選びなさい。', options: ['学校', '公園', '家・自宅', '部屋'] }, answer: '家・自宅' },
  { type: 'select', data: { question: '「家・自宅」を表す英語を選びなさい。', japanese: '家・自宅', options: ['school', 'park', 'room', 'home'] }, answer: 'home' },
  { type: 'input', data: { question: '「家・自宅」を英語で書きなさい。', japanese: '家・自宅' }, answer: 'home' },

  // --- house ---
  { type: 'select', data: { question: '「house」の意味を選びなさい。', options: ['部屋', 'アパート', '庭', '家・建物'] }, answer: '家・建物' },
  { type: 'select', data: { question: '「家・建物」を表す英語を選びなさい。', japanese: '家・建物', options: ['room', 'apartment', 'garden', 'house'] }, answer: 'house' },
  { type: 'input', data: { question: '「家・建物」を英語で書きなさい。', japanese: '家・建物' }, answer: 'house' },

  // --- room ---
  { type: 'select', data: { question: '「room」の意味を選びなさい。', options: ['家', '廊下', 'ドア', '部屋'] }, answer: '部屋' },
  { type: 'select', data: { question: '「部屋」を表す英語を選びなさい。', japanese: '部屋', options: ['house', 'hall', 'door', 'room'] }, answer: 'room' },
  { type: 'input', data: { question: '「部屋」を英語で書きなさい。', japanese: '部屋' }, answer: 'room' },

  // --- door ---
  { type: 'select', data: { question: '「door」の意味を選びなさい。', options: ['窓', '机', '椅子', 'ドア'] }, answer: 'ドア' },
  { type: 'select', data: { question: '「ドア」を表す英語を選びなさい。', japanese: 'ドア', options: ['window', 'desk', 'chair', 'door'] }, answer: 'door' },
  { type: 'input', data: { question: '「ドア」を英語で書きなさい。', japanese: 'ドア' }, answer: 'door' },

  // --- window ---
  { type: 'select', data: { question: '「window」の意味を選びなさい。', options: ['ドア', '壁', '床', '窓'] }, answer: '窓' },
  { type: 'select', data: { question: '「窓」を表す英語を選びなさい。', japanese: '窓', options: ['door', 'wall', 'floor', 'window'] }, answer: 'window' },
  { type: 'input', data: { question: '「窓」を英語で書きなさい。', japanese: '窓' }, answer: 'window' },

  // --- letter ---
  { type: 'select', data: { question: '「letter」の意味を選びなさい。', options: ['日記', 'メッセージ', 'メール', '手紙'] }, answer: '手紙' },
  { type: 'select', data: { question: '「手紙」を表す英語を選びなさい。', japanese: '手紙', options: ['diary', 'message', 'email', 'letter'] }, answer: 'letter' },
  { type: 'input', data: { question: '「手紙」を英語で書きなさい。', japanese: '手紙' }, answer: 'letter' },

  // --- word ---
  { type: 'select', data: { question: '「word」の意味を選びなさい。', options: ['文', '段落', '文字', '単語'] }, answer: '単語' },
  { type: 'select', data: { question: '「単語」を表す英語を選びなさい。', japanese: '単語', options: ['sentence', 'paragraph', 'letter', 'word'] }, answer: 'word' },
  { type: 'input', data: { question: '「単語」を英語で書きなさい。', japanese: '単語' }, answer: 'word' },

  // --- English ---
  { type: 'select', data: { question: '「English」の意味を選びなさい。', options: ['日本語', '数学', '科学', '英語'] }, answer: '英語' },
  { type: 'select', data: { question: '「英語」を表す英語を選びなさい。', japanese: '英語', options: ['Japanese', 'math', 'science', 'English'] }, answer: 'English' },
  { type: 'input', data: { question: '「英語」を英語で書きなさい。', japanese: '英語' }, answer: 'English' },

  // --- Japanese ---
  { type: 'select', data: { question: '「Japanese」の意味を選びなさい。', options: ['英語', '数学', '社会', '日本語'] }, answer: '日本語' },
  { type: 'select', data: { question: '「日本語」を表す英語を選びなさい。', japanese: '日本語', options: ['English', 'math', 'social studies', 'Japanese'] }, answer: 'Japanese' },
  { type: 'input', data: { question: '「日本語」を英語で書きなさい。', japanese: '日本語' }, answer: 'Japanese' },

  // --- math ---
  { type: 'select', data: { question: '「math」の意味を選びなさい。', options: ['英語', '理科', '社会', '数学'] }, answer: '数学' },
  { type: 'select', data: { question: '「数学」を表す英語を選びなさい。', japanese: '数学', options: ['English', 'science', 'social studies', 'math'] }, answer: 'math' },
  { type: 'input', data: { question: '「数学」を英語で書きなさい。', japanese: '数学' }, answer: 'math' },

  // --- science ---
  { type: 'select', data: { question: '「science」の意味を選びなさい。', options: ['歴史', '音楽', '数学', '理科・科学'] }, answer: '理科・科学' },
  { type: 'select', data: { question: '「理科・科学」を表す英語を選びなさい。', japanese: '理科・科学', options: ['history', 'music', 'math', 'science'] }, answer: 'science' },
  { type: 'input', data: { question: '「理科・科学」を英語で書きなさい。', japanese: '理科・科学' }, answer: 'science' },

  // --- art ---
  { type: 'select', data: { question: '「art」の意味を選びなさい。', options: ['音楽', '体育', '数学', '芸術・美術'] }, answer: '芸術・美術' },
  { type: 'select', data: { question: '「芸術・美術」を表す英語を選びなさい。', japanese: '芸術・美術', options: ['music', 'PE', 'math', 'art'] }, answer: 'art' },
  { type: 'input', data: { question: '「芸術・美術」を英語で書きなさい。', japanese: '芸術・美術' }, answer: 'art' },

  // --- history ---
  { type: 'select', data: { question: '「history」の意味を選びなさい。', options: ['科学', '地理', '数学', '歴史'] }, answer: '歴史' },
  { type: 'select', data: { question: '「歴史」を表す英語を選びなさい。', japanese: '歴史', options: ['science', 'geography', 'math', 'history'] }, answer: 'history' },
  { type: 'input', data: { question: '「歴史」を英語で書きなさい。', japanese: '歴史' }, answer: 'history' },
];
