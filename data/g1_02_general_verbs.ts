import type { Problem } from '../types';

export const generalVerbProblems: Problem[] = [
  // ── SELECT (肯定文・一般動詞の選択) ─────────────────────────────────────
  {
    type: 'select',
    data: {
      question: '（　）に入る適切な語を選びなさい。\nI ___ soccer every day.',
      options: ['play', 'plays', 'am play', 'playing'],
    },
    answer: 'play',
  },
  {
    type: 'select',
    data: {
      question: '（　）に入る適切な語を選びなさい。\nShe ___ English very well.',
      options: ['speaks', 'speak', 'is speak', 'speaking'],
    },
    answer: 'speaks',
  },
  {
    type: 'select',
    data: {
      question: '（　）に入る適切な語を選びなさい。\nHe ___ lunch at school.',
      options: ['eats', 'eat', 'is eat', 'eating'],
    },
    answer: 'eats',
  },
  {
    type: 'select',
    data: {
      question: '（　）に入る適切な語を選びなさい。\nWe ___ to school by bike.',
      options: ['go', 'goes', 'is go', 'going'],
    },
    answer: 'go',
  },
  {
    type: 'select',
    data: {
      question: '（　）に入る適切な語を選びなさい。\nThey ___ music in the park.',
      options: ['like', 'likes', 'is like', 'liking'],
    },
    answer: 'like',
  },
  {
    type: 'select',
    data: {
      question: '（　）に入る適切な語を選びなさい。\nMy father ___ to work early.',
      options: ['comes', 'come', 'is come', 'coming'],
    },
    answer: 'comes',
  },
  // ── SELECT (三人称単数 -s) ────────────────────────────────────────────────
  {
    type: 'select',
    data: {
      question: '（　）に入る適切な語を選びなさい。\nKen ___ math and science.',
      options: ['studies', 'study', 'is study', 'studys'],
    },
    answer: 'studies',
  },
  {
    type: 'select',
    data: {
      question: '（　）に入る適切な語を選びなさい。\nShe ___ tennis on Sundays.',
      options: ['plays', 'play', 'is plays', 'played'],
    },
    answer: 'plays',
  },
  {
    type: 'select',
    data: {
      question: '（　）に入る適切な語を選びなさい。\nHe ___ milk every morning.',
      options: ['drinks', 'drink', 'is drinks', 'drinkes'],
    },
    answer: 'drinks',
  },
  {
    type: 'select',
    data: {
      question: '「go」に三人称単数現在の -s を正しくつけた形はどれですか。',
      options: ['goes', 'gos', 'go\'s', 'goies'],
    },
    answer: 'goes',
  },
  {
    type: 'select',
    data: {
      question: '「study」に三人称単数現在の -s を正しくつけた形はどれですか。',
      options: ['studies', 'studys', 'study\'s', 'studyes'],
    },
    answer: 'studies',
  },
  // ── SELECT (否定文 don't / doesn't) ─────────────────────────────────────
  {
    type: 'select',
    data: {
      question: '（　）に入る適切な語句を選びなさい。\nI ___ like spicy food.',
      options: ["don't", "doesn't", "isn't", "am not"],
    },
    answer: "don't",
  },
  {
    type: 'select',
    data: {
      question: '（　）に入る適切な語句を選びなさい。\nShe ___ play the piano.',
      options: ["doesn't", "don't", "isn't", "not plays"],
    },
    answer: "doesn't",
  },
  {
    type: 'select',
    data: {
      question: '（　）に入る適切な語句を選びなさい。\nThey ___ eat meat.',
      options: ["don't", "doesn't", "aren't", "not eat"],
    },
    answer: "don't",
  },
  {
    type: 'select',
    data: {
      question: '（　）に入る適切な語句を選びなさい。\nHe ___ have a dog.',
      options: ["doesn't", "don't", "isn't", "not have"],
    },
    answer: "doesn't",
  },
  // ── SELECT (Yes/No 疑問文 do/does) ───────────────────────────────────────
  {
    type: 'select',
    data: {
      question: '（　）に入る適切な語を選びなさい。\n___ you like cats?',
      options: ['Do', 'Does', 'Are', 'Is'],
    },
    answer: 'Do',
  },
  {
    type: 'select',
    data: {
      question: '（　）に入る適切な語を選びなさい。\n___ she play volleyball?',
      options: ['Does', 'Do', 'Is', 'Are'],
    },
    answer: 'Does',
  },
  {
    type: 'select',
    data: {
      question: '「Does he study English?」への正しい答えを選びなさい。',
      options: ['Yes, he does.', 'Yes, he do.', 'Yes, he is.', 'Yes, he studies.'],
    },
    answer: 'Yes, he does.',
  },
  {
    type: 'select',
    data: {
      question: '「Do they live near here?」への正しい否定の答えを選びなさい。',
      options: ["No, they don't.", "No, they doesn't.", "No, they aren't.", "No, they not."],
    },
    answer: "No, they don't.",
  },
  // ── SELECT (Wh 疑問文) ───────────────────────────────────────────────────
  {
    type: 'select',
    data: {
      question: '（　）に入る適切な語を選びなさい。\nWhat ___ you eat for breakfast?',
      options: ['do', 'does', 'are', 'is'],
    },
    answer: 'do',
  },
  {
    type: 'select',
    data: {
      question: '（　）に入る適切な語を選びなさい。\nWhere ___ she go after school?',
      options: ['does', 'do', 'is', 'are'],
    },
    answer: 'does',
  },
  {
    type: 'select',
    data: {
      question: '（　）に入る適切な語を選びなさい。\nWhat sport ___ your brother like?',
      options: ['does', 'do', 'is', 'are'],
    },
    answer: 'does',
  },
  // ── INPUT (肯定文の翻訳) ─────────────────────────────────────────────────
  {
    type: 'input',
    data: {
      question: '次の日本語を英語に直しなさい。',
      japanese: '私は毎日音楽を聴きます。',
    },
    answer: 'I listen to music every day.',
  },
  {
    type: 'input',
    data: {
      question: '次の日本語を英語に直しなさい。',
      japanese: 'あなたは英語を勉強します。',
    },
    answer: 'You study English.',
  },
  {
    type: 'input',
    data: {
      question: '次の日本語を英語に直しなさい。',
      japanese: '彼はサッカーが好きです。',
    },
    answer: 'He likes soccer.',
  },
  {
    type: 'input',
    data: {
      question: '次の日本語を英語に直しなさい。',
      japanese: '彼女は毎朝ご飯を食べます。',
    },
    answer: 'She eats rice every morning.',
  },
  {
    type: 'input',
    data: {
      question: '次の日本語を英語に直しなさい。',
      japanese: '彼らは放課後テニスをします。',
    },
    answer: 'They play tennis after school.',
  },
  {
    type: 'input',
    data: {
      question: '次の日本語を英語に直しなさい。',
      japanese: '私たちは電車で学校に来ます。',
    },
    answer: 'We come to school by train.',
  },
  // ── INPUT (三人称単数 -s の書き換え) ────────────────────────────────────
  {
    type: 'input',
    data: {
      question: '主語を「He」に変えて文を書き直しなさい。',
      japanese: 'I play the guitar.',
    },
    answer: 'He plays the guitar.',
  },
  {
    type: 'input',
    data: {
      question: '主語を「She」に変えて文を書き直しなさい。',
      japanese: 'I go to the library on Sundays.',
    },
    answer: 'She goes to the library on Sundays.',
  },
  {
    type: 'input',
    data: {
      question: '主語を「He」に変えて文を書き直しなさい。',
      japanese: 'I study math every night.',
    },
    answer: 'He studies math every night.',
  },
  // ── INPUT (否定文) ───────────────────────────────────────────────────────
  {
    type: 'input',
    data: {
      question: '次の日本語を英語に直しなさい。',
      japanese: '私は野菜が好きではありません。',
    },
    answer: "I don't like vegetables.",
  },
  {
    type: 'input',
    data: {
      question: '次の日本語を英語に直しなさい。',
      japanese: '彼は犬を飼っていません。',
    },
    answer: "He doesn't have a dog.",
  },
  {
    type: 'input',
    data: {
      question: '次の文を否定文に書き直しなさい。',
      japanese: 'She drinks coffee.',
    },
    answer: "She doesn't drink coffee.",
  },
  {
    type: 'input',
    data: {
      question: '次の文を否定文に書き直しなさい。',
      japanese: 'They play basketball.',
    },
    answer: "They don't play basketball.",
  },
  // ── INPUT (Yes/No 疑問文) ────────────────────────────────────────────────
  {
    type: 'input',
    data: {
      question: '次の文を疑問文に書き直しなさい。',
      japanese: 'You like anime.',
    },
    answer: 'Do you like anime?',
  },
  {
    type: 'input',
    data: {
      question: '次の文を疑問文に書き直しなさい。',
      japanese: 'She studies French.',
    },
    answer: 'Does she study French?',
  },
  {
    type: 'input',
    data: {
      question: '「Do you play the piano?」に「はい」と答えなさい。',
      japanese: 'はい、弾きます。',
    },
    answer: 'Yes, I do.',
  },
  {
    type: 'input',
    data: {
      question: '「Does he eat sushi?」に「いいえ」と答えなさい。',
      japanese: 'いいえ、食べません。',
    },
    answer: "No, he doesn't.",
  },
  // ── INPUT (Wh 疑問文) ────────────────────────────────────────────────────
  {
    type: 'input',
    data: {
      question: '次の日本語を英語に直しなさい。',
      japanese: 'あなたは何の教科が好きですか。',
    },
    answer: 'What subject do you like?',
  },
  {
    type: 'input',
    data: {
      question: '次の日本語を英語に直しなさい。',
      japanese: '彼女は放課後どこへ行きますか。',
    },
    answer: 'Where does she go after school?',
  },
  {
    type: 'input',
    data: {
      question: '次の日本語を英語に直しなさい。',
      japanese: 'あなたは朝食に何を食べますか。',
    },
    answer: 'What do you eat for breakfast?',
  },
  // ── SORT ─────────────────────────────────────────────────────────────────
  {
    type: 'sort',
    data: {
      question: '語句を並べ替えて英文を完成させなさい。\n「私は毎日英語を勉強します。」',
      options: ['I', 'study', 'English', 'every', 'day', '.'],
    },
    answer: ['I', 'study', 'English', 'every', 'day', '.'],
  },
  {
    type: 'sort',
    data: {
      question: '語句を並べ替えて英文を完成させなさい。\n「彼女は音楽が好きです。」',
      options: ['She', 'likes', 'music', '.'],
    },
    answer: ['She', 'likes', 'music', '.'],
  },
  {
    type: 'sort',
    data: {
      question: '語句を並べ替えて英文を完成させなさい。\n「私はピザを食べません。」',
      options: ["I", "don't", "eat", "pizza", '.'],
    },
    answer: ['I', "don't", 'eat', 'pizza', '.'],
  },
  {
    type: 'sort',
    data: {
      question: '語句を並べ替えて英文を完成させなさい。\n「彼はバスケットボールをしません。」',
      options: ["He", "doesn't", "play", "basketball", '.'],
    },
    answer: ['He', "doesn't", 'play', 'basketball', '.'],
  },
  {
    type: 'sort',
    data: {
      question: '語句を並べ替えて英文を完成させなさい。\n「あなたは犬が好きですか。」',
      options: ['Do', 'you', 'like', 'dogs', '?'],
    },
    answer: ['Do', 'you', 'like', 'dogs', '?'],
  },
  {
    type: 'sort',
    data: {
      question: '語句を並べ替えて英文を完成させなさい。\n「彼女は料理をしますか。」',
      options: ['Does', 'she', 'cook', '?'],
    },
    answer: ['Does', 'she', 'cook', '?'],
  },
  {
    type: 'sort',
    data: {
      question: '語句を並べ替えて英文を完成させなさい。\n「あなたは何のスポーツをしますか。」',
      options: ['What', 'sport', 'do', 'you', 'play', '?'],
    },
    answer: ['What', 'sport', 'do', 'you', 'play', '?'],
  },
  {
    type: 'sort',
    data: {
      question: '語句を並べ替えて英文を完成させなさい。\n「彼はどこに住んでいますか。」',
      options: ['Where', 'does', 'he', 'live', '?'],
    },
    answer: ['Where', 'does', 'he', 'live', '?'],
  },
  {
    type: 'sort',
    data: {
      question: '語句を並べ替えて英文を完成させなさい。\n「彼らは土曜日に公園へ行きます。」',
      options: ['They', 'go', 'to', 'the', 'park', 'on', 'Saturdays', '.'],
    },
    answer: ['They', 'go', 'to', 'the', 'park', 'on', 'Saturdays', '.'],
  },
  {
    type: 'sort',
    data: {
      question: '語句を並べ替えて英文を完成させなさい。\n「あなたの兄は何の音楽が好きですか。」',
      options: ['What', 'music', 'does', 'your', 'brother', 'like', '?'],
    },
    answer: ['What', 'music', 'does', 'your', 'brother', 'like', '?'],
  },
  {
    type: 'sort',
    data: {
      question: '語句を並べ替えて英文を完成させなさい。\n「私の母は朝食を作ります。」',
      options: ['My', 'mother', 'makes', 'breakfast', '.'],
    },
    answer: ['My', 'mother', 'makes', 'breakfast', '.'],
  },
  {
    type: 'sort',
    data: {
      question: '語句を並べ替えて英文を完成させなさい。\n「ケンはお茶を飲みません。」',
      options: ['Ken', "doesn't", 'drink', 'tea', '.'],
    },
    answer: ['Ken', "doesn't", 'drink', 'tea', '.'],
  },
];
