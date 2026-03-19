import type { Problem } from '../types';

export const beVerbProblems: Problem[] = [
  // ── SELECT (肯定文・主語と be 動詞の選択) ────────────────────────────────
  {
    type: 'select',
    data: {
      question: '（　）に入る適切な語を選びなさい。\nI ___ a student.',
      options: ['am', 'is', 'are', 'be'],
    },
    answer: 'am',
  },
  {
    type: 'select',
    data: {
      question: '（　）に入る適切な語を選びなさい。\nYou ___ my best friend.',
      options: ['are', 'am', 'is', 'be'],
    },
    answer: 'are',
  },
  {
    type: 'select',
    data: {
      question: '（　）に入る適切な語を選びなさい。\nHe ___ a soccer player.',
      options: ['is', 'am', 'are', 'be'],
    },
    answer: 'is',
  },
  {
    type: 'select',
    data: {
      question: '（　）に入る適切な語を選びなさい。\nShe ___ thirteen years old.',
      options: ['is', 'am', 'are', 'be'],
    },
    answer: 'is',
  },
  {
    type: 'select',
    data: {
      question: '（　）に入る適切な語を選びなさい。\nIt ___ a cute dog.',
      options: ['is', 'am', 'are', 'be'],
    },
    answer: 'is',
  },
  {
    type: 'select',
    data: {
      question: '（　）に入る適切な語を選びなさい。\nWe ___ classmates.',
      options: ['are', 'am', 'is', 'be'],
    },
    answer: 'are',
  },
  {
    type: 'select',
    data: {
      question: '（　）に入る適切な語を選びなさい。\nThey ___ from Canada.',
      options: ['are', 'am', 'is', 'be'],
    },
    answer: 'are',
  },
  // ── SELECT (否定文) ──────────────────────────────────────────────────────
  {
    type: 'select',
    data: {
      question: '（　）に入る適切な語句を選びなさい。\nI ___ a teacher.',
      options: ['am not', 'is not', 'are not', 'not am'],
    },
    answer: 'am not',
  },
  {
    type: 'select',
    data: {
      question: '（　）に入る適切な語を選びなさい。\nHe ___ busy today.',
      options: ["isn't", "aren't", "am not", "not is"],
    },
    answer: "isn't",
  },
  {
    type: 'select',
    data: {
      question: '（　）に入る適切な語を選びなさい。\nThey ___ at home now.',
      options: ["aren't", "isn't", "am not", "not are"],
    },
    answer: "aren't",
  },
  {
    type: 'select',
    data: {
      question: '「She is not」の短縮形として正しいものを選びなさい。',
      options: ["She isn't", "She aren't", "She amn't", "She's not be"],
    },
    answer: "She isn't",
  },
  {
    type: 'select',
    data: {
      question: '「are not」の短縮形として正しいものを選びなさい。',
      options: ["aren't", "isn't", "amn't", "aren't be"],
    },
    answer: "aren't",
  },
  // ── SELECT (Yes/No 疑問文と短答) ─────────────────────────────────────────
  {
    type: 'select',
    data: {
      question: '（　）に入る適切な語を選びなさい。\n___ you a junior high school student?',
      options: ['Are', 'Am', 'Is', 'Be'],
    },
    answer: 'Are',
  },
  {
    type: 'select',
    data: {
      question: '（　）に入る適切な語を選びなさい。\n___ she a singer?',
      options: ['Is', 'Are', 'Am', 'Be'],
    },
    answer: 'Is',
  },
  {
    type: 'select',
    data: {
      question: '「Are you tired?」に対する正しい答えを選びなさい。',
      options: ['Yes, I am.', 'Yes, I is.', 'Yes, you are.', 'Yes, I be.'],
    },
    answer: 'Yes, I am.',
  },
  {
    type: 'select',
    data: {
      question: '「Is he your brother?」に対する正しい否定の答えを選びなさい。',
      options: ['No, he isn\'t.', 'No, he aren\'t.', 'No, he am not.', 'No, he not is.'],
    },
    answer: "No, he isn't.",
  },
  {
    type: 'select',
    data: {
      question: '（　）に入る適切な語を選びなさい。\n___ they in the library?',
      options: ['Are', 'Is', 'Am', 'Do'],
    },
    answer: 'Are',
  },
  // ── SELECT (What/Who 疑問文) ─────────────────────────────────────────────
  {
    type: 'select',
    data: {
      question: '（　）に入る適切な語を選びなさい。\nWhat ___ your name?',
      options: ['is', 'am', 'are', 'be'],
    },
    answer: 'is',
  },
  {
    type: 'select',
    data: {
      question: '（　）に入る適切な語を選びなさい。\nWho ___ those people?',
      options: ['are', 'is', 'am', 'be'],
    },
    answer: 'are',
  },
  {
    type: 'select',
    data: {
      question: '（　）に入る適切な語を選びなさい。\nWhat ___ your favorite sport?',
      options: ['is', 'are', 'am', 'be'],
    },
    answer: 'is',
  },
  // ── SELECT (短縮形) ──────────────────────────────────────────────────────
  {
    type: 'select',
    data: {
      question: '「I am」の短縮形として正しいものを選びなさい。',
      options: ["I'm", "I's", "Iam", "I are"],
    },
    answer: "I'm",
  },
  {
    type: 'select',
    data: {
      question: '「He is」の短縮形として正しいものを選びなさい。',
      options: ["He's", "He'm", "He're", "His"],
    },
    answer: "He's",
  },
  {
    type: 'select',
    data: {
      question: '「They are」の短縮形として正しいものを選びなさい。',
      options: ["They're", "They's", "They'm", "Theyre"],
    },
    answer: "They're",
  },
  // ── INPUT (肯定文の翻訳) ─────────────────────────────────────────────────
  {
    type: 'input',
    data: {
      question: '次の日本語を英語に直しなさい。',
      japanese: '私は学生です。',
    },
    answer: 'I am a student.',
  },
  {
    type: 'input',
    data: {
      question: '次の日本語を英語に直しなさい。',
      japanese: 'あなたは親切です。',
    },
    answer: 'You are kind.',
  },
  {
    type: 'input',
    data: {
      question: '次の日本語を英語に直しなさい。',
      japanese: '彼は医者です。',
    },
    answer: 'He is a doctor.',
  },
  {
    type: 'input',
    data: {
      question: '次の日本語を英語に直しなさい。',
      japanese: '彼女は私の姉です。',
    },
    answer: 'She is my sister.',
  },
  {
    type: 'input',
    data: {
      question: '次の日本語を英語に直しなさい。',
      japanese: 'それはとても大きい犬です。',
    },
    answer: 'It is a very big dog.',
  },
  {
    type: 'input',
    data: {
      question: '次の日本語を英語に直しなさい。',
      japanese: '私たちは同じクラスです。',
    },
    answer: 'We are in the same class.',
  },
  {
    type: 'input',
    data: {
      question: '次の日本語を英語に直しなさい。',
      japanese: '彼らはオーストラリア出身です。',
    },
    answer: 'They are from Australia.',
  },
  // ── INPUT (短縮形) ───────────────────────────────────────────────────────
  {
    type: 'input',
    data: {
      question: '次の文を短縮形を使って書き直しなさい。',
      japanese: 'She is a nurse.',
    },
    answer: "She's a nurse.",
  },
  {
    type: 'input',
    data: {
      question: '次の文を短縮形を使って書き直しなさい。',
      japanese: 'We are happy.',
    },
    answer: "We're happy.",
  },
  {
    type: 'input',
    data: {
      question: '次の文を短縮形を使って書き直しなさい。',
      japanese: 'It is cold today.',
    },
    answer: "It's cold today.",
  },
  // ── INPUT (否定文) ───────────────────────────────────────────────────────
  {
    type: 'input',
    data: {
      question: '次の日本語を英語に直しなさい。',
      japanese: '私はテニス選手ではありません。',
    },
    answer: 'I am not a tennis player.',
  },
  {
    type: 'input',
    data: {
      question: '次の日本語を英語に直しなさい。',
      japanese: '彼女は忙しくありません。',
    },
    answer: "She isn't busy.",
  },
  {
    type: 'input',
    data: {
      question: '次の日本語を英語に直しなさい。',
      japanese: '彼らはここにいません。',
    },
    answer: "They aren't here.",
  },
  // ── INPUT (Yes/No 疑問文) ────────────────────────────────────────────────
  {
    type: 'input',
    data: {
      question: '次の文を疑問文に書き直しなさい。',
      japanese: 'You are from Japan.',
    },
    answer: 'Are you from Japan?',
  },
  {
    type: 'input',
    data: {
      question: '次の文を疑問文に書き直しなさい。',
      japanese: 'He is a good singer.',
    },
    answer: 'Is he a good singer?',
  },
  {
    type: 'input',
    data: {
      question: '「Is she your teacher?」に対して「はい」と答えなさい。',
      japanese: 'はい、そうです。',
    },
    answer: 'Yes, she is.',
  },
  {
    type: 'input',
    data: {
      question: '「Are they students?」に対して「いいえ」と答えなさい。',
      japanese: 'いいえ、ちがいます。',
    },
    answer: "No, they aren't.",
  },
  // ── INPUT (What/Who 疑問文) ──────────────────────────────────────────────
  {
    type: 'input',
    data: {
      question: '次の日本語を英語に直しなさい。',
      japanese: 'あなたの名前は何ですか。',
    },
    answer: 'What is your name?',
  },
  {
    type: 'input',
    data: {
      question: '次の日本語を英語に直しなさい。',
      japanese: 'あの男性は誰ですか。',
    },
    answer: 'Who is that man?',
  },
  {
    type: 'input',
    data: {
      question: '次の日本語を英語に直しなさい。',
      japanese: 'あなたの好きな教科は何ですか。',
    },
    answer: 'What is your favorite subject?',
  },
  // ── SORT ─────────────────────────────────────────────────────────────────
  {
    type: 'sort',
    data: {
      question: '語句を並べ替えて英文を完成させなさい。\n「彼女は医者です。」',
      options: ['She', 'is', 'a', 'doctor', '.'],
    },
    answer: ['She', 'is', 'a', 'doctor', '.'],
  },
  {
    type: 'sort',
    data: {
      question: '語句を並べ替えて英文を完成させなさい。\n「私たちは中学生です。」',
      options: ['We', 'are', 'junior', 'high', 'school', 'students', '.'],
    },
    answer: ['We', 'are', 'junior', 'high', 'school', 'students', '.'],
  },
  {
    type: 'sort',
    data: {
      question: '語句を並べ替えて英文を完成させなさい。\n「彼は忙しくありません。」',
      options: ["He", "isn't", "busy", '.'],
    },
    answer: ['He', "isn't", 'busy', '.'],
  },
  {
    type: 'sort',
    data: {
      question: '語句を並べ替えて英文を完成させなさい。\n「あなたは眠いですか。」',
      options: ['Are', 'you', 'sleepy', '?'],
    },
    answer: ['Are', 'you', 'sleepy', '?'],
  },
  {
    type: 'sort',
    data: {
      question: '語句を並べ替えて英文を完成させなさい。\n「彼女はあなたの先生ですか。」',
      options: ['Is', 'she', 'your', 'teacher', '?'],
    },
    answer: ['Is', 'she', 'your', 'teacher', '?'],
  },
  {
    type: 'sort',
    data: {
      question: '語句を並べ替えて英文を完成させなさい。\n「はい、そうです。（she に対して）」',
      options: ['Yes', ',', 'she', 'is', '.'],
    },
    answer: ['Yes', ',', 'she', 'is', '.'],
  },
  {
    type: 'sort',
    data: {
      question: '語句を並べ替えて英文を完成させなさい。\n「あの少年たちは誰ですか。」',
      options: ['Who', 'are', 'those', 'boys', '?'],
    },
    answer: ['Who', 'are', 'those', 'boys', '?'],
  },
  {
    type: 'sort',
    data: {
      question: '語句を並べ替えて英文を完成させなさい。\n「あなたの好きな色は何ですか。」',
      options: ['What', 'is', 'your', 'favorite', 'color', '?'],
    },
    answer: ['What', 'is', 'your', 'favorite', 'color', '?'],
  },
  {
    type: 'sort',
    data: {
      question: '語句を並べ替えて英文を完成させなさい。\n「私は眠くありません。」',
      options: ['I', 'am', 'not', 'sleepy', '.'],
    },
    answer: ['I', 'am', 'not', 'sleepy', '.'],
  },
  {
    type: 'sort',
    data: {
      question: '語句を並べ替えて英文を完成させなさい。\n「彼らは公園にいません。」',
      options: ["They", "aren't", "in", "the", "park", '.'],
    },
    answer: ['They', "aren't", 'in', 'the', 'park', '.'],
  },
  {
    type: 'sort',
    data: {
      question: '語句を並べ替えて英文を完成させなさい。\n「彼は背が高くてハンサムです。」',
      options: ['He', 'is', 'tall', 'and', 'handsome', '.'],
    },
    answer: ['He', 'is', 'tall', 'and', 'handsome', '.'],
  },
  {
    type: 'sort',
    data: {
      question: '語句を並べ替えて英文を完成させなさい。\n「あなたはどこの出身ですか。」',
      options: ['Where', 'are', 'you', 'from', '?'],
    },
    answer: ['Where', 'are', 'you', 'from', '?'],
  },
];
