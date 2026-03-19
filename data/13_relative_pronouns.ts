import type { Problem } from '../types';

export const relativePronounProblems: Problem[] = [
  // === SELECT (20 problems) ===

  // who (主格)
  { type: 'select', data: { question: '次の文の( )に適切な語を入れなさい: I have a friend ( ) lives in Canada.', japanese: '（私にはカナダに住んでいる友達がいます。）', options: ['who', 'which', 'what', 'where'] }, answer: 'who' },
  { type: 'select', data: { question: '次の文の( )に適切な語を入れなさい: The girl ( ) is singing over there is my sister.', japanese: '（向こうで歌っている女の子は私の妹です。）', options: ['who', 'which', 'what', 'whose'] }, answer: 'who' },
  { type: 'select', data: { question: '次の文の( )に適切な語を入れなさい: Do you know the man ( ) is talking to Mr. Smith?', japanese: '（スミス先生と話している男性を知っていますか？）', options: ['who', 'which', 'it', 'where'] }, answer: 'who' },
  { type: 'select', data: { question: '次の文の( )に適切な語を入れなさい: She is a doctor ( ) helps many patients every day.', japanese: '（彼女は毎日多くの患者を助けている医者です。）', options: ['who', 'which', 'what', 'when'] }, answer: 'who' },

  // which (主格)
  { type: 'select', data: { question: '次の文の( )に適切な語を入れなさい: I have a cat ( ) is very cute.', japanese: '（私はとてもかわいい猫を飼っています。）', options: ['which', 'who', 'whom', 'where'] }, answer: 'which' },
  { type: 'select', data: { question: '次の文の( )に適切な語を入れなさい: This is the book ( ) was written by a famous author.', japanese: '（これは有名な作家によって書かれた本です。）', options: ['which', 'who', 'whose', 'when'] }, answer: 'which' },
  { type: 'select', data: { question: '次の文の( )に適切な語を入れなさい: The train ( ) goes to Tokyo is very fast.', japanese: '（東京に行く電車はとても速いです。）', options: ['which', 'who', 'what', 'it'] }, answer: 'which' },

  // that (人・物共通)
  { type: 'select', data: { question: '次の文の( )に適切な語を入れなさい: She is the only student ( ) passed the exam.', japanese: '（彼女はその試験に合格した唯一の生徒です。）', options: ['that', 'who', 'which', 'what'] }, answer: 'that' },
  { type: 'select', data: { question: '次の文の( )に適切な語を入れなさい: The first person ( ) arrived at school was Ken.', japanese: '（学校に最初に到着した人はケンでした。）', options: ['that', 'who', 'which', 'whose'] }, answer: 'that' },
  { type: 'select', data: { question: '次の文の( )に適切な語を入れなさい: Everything ( ) he said was true.', japanese: '（彼が言ったことはすべて本当でした。）', options: ['that', 'what', 'which', 'who'] }, answer: 'that' },

  // who (目的格)
  { type: 'select', data: { question: '次の文の( )に適切な語を入れなさい: The teacher ( ) we respect is Ms. Tanaka.', japanese: '（私たちが尊敬している先生は田中先生です。）', options: ['who', 'which', 'whose', 'where'] }, answer: 'who' },
  { type: 'select', data: { question: '次の文の( )に適切な語を入れなさい: The boy ( ) I met yesterday is very kind.', japanese: '（昨日私が会った男の子はとても親切です。）', options: ['who', 'which', 'what', 'when'] }, answer: 'who' },

  // which (目的格)
  { type: 'select', data: { question: '次の文の( )に適切な語を入れなさい: The movie ( ) I watched last night was exciting.', japanese: '（昨夜私が見た映画はわくわくしました。）', options: ['which', 'who', 'whose', 'where'] }, answer: 'which' },
  { type: 'select', data: { question: '次の文の( )に適切な語を入れなさい: The bag ( ) she bought is made in Italy.', japanese: '（彼女が買ったバッグはイタリア製です。）', options: ['which', 'who', 'that', 'whose'] }, answer: 'which' },

  // 省略できる場合の判断
  { type: 'select', data: { question: '「The picture which I took is beautiful.」の下線部 which は省略できますか？', japanese: '（私が撮った写真は美しいです。）', options: ['省略できる', '省略できない', 'どちらでもよい', '文が間違っている'] }, answer: '省略できる' },
  { type: 'select', data: { question: '「The man who called me was my uncle.」の下線部 who は省略できますか？', japanese: '（私に電話した男性は私の叔父でした。）', options: ['省略できない', '省略できる', 'どちらでもよい', '文が間違っている'] }, answer: '省略できない' },

  // 先行詞の種類 (人・物の判断)
  { type: 'select', data: { question: '「これは私が読んだ本です。」を英語にするとき、( )に入る関係代名詞はどれですか？: This is the book ( ) I read.', japanese: '（「本」は物なので which または that を使います。）', options: ['which', 'who', 'whom', 'whose'] }, answer: 'which' },
  { type: 'select', data: { question: '「私には東京に住んでいる兄がいます。」を英語にするとき、( )に入る関係代名詞はどれですか？: I have a brother ( ) lives in Tokyo.', japanese: '（「兄」は人なので who または that を使います。）', options: ['who', 'which', 'what', 'where'] }, answer: 'who' },
  { type: 'select', data: { question: '次の文の( )に適切な語を入れなさい: I know the woman ( ) works at the hospital.', japanese: '（私はその病院で働いている女性を知っています。）', options: ['who', 'which', 'what', 'it'] }, answer: 'who' },
  { type: 'select', data: { question: '次の文の( )に適切な語を入れなさい: Look at the dog ( ) is running in the park.', japanese: '（公園を走っている犬を見てください。）', options: ['which', 'who', 'whom', 'what'] }, answer: 'which' },
  { type: 'select', data: { question: '次の文の( )に適切な語を入れなさい: He is the singer ( ) everyone loves.', japanese: '（彼はみんなが大好きな歌手です。）', options: ['that', 'which', 'where', 'when'] }, answer: 'that' },

  // === INPUT (20 problems) ===

  // 空欄補充 (who/which/that)
  { type: 'input', data: { question: '空欄を埋めなさい: I have a brother ( ) is a pilot.', japanese: '（私にはパイロットの兄がいます。）' }, answer: 'who' },
  { type: 'input', data: { question: '空欄を埋めなさい: This is the camera ( ) I want to buy.', japanese: '（これは私が買いたいカメラです。）' }, answer: 'which' },
  { type: 'input', data: { question: '空欄を埋めなさい: The students ( ) study hard will pass the test.', japanese: '（一生懸命勉強する生徒はテストに合格するでしょう。）' }, answer: 'who' },
  { type: 'input', data: { question: '空欄を埋めなさい: The flowers ( ) bloom in spring are beautiful.', japanese: '（春に咲く花は美しいです。）' }, answer: 'which' },
  { type: 'input', data: { question: '空欄を埋めなさい: The woman ( ) I spoke to was very kind.', japanese: '（私が話しかけた女性はとても親切でした。）' }, answer: 'who' },
  { type: 'input', data: { question: '空欄を埋めなさい: The movie ( ) we saw last week was interesting.', japanese: '（先週私たちが見た映画は面白かったです。）' }, answer: 'which' },
  { type: 'input', data: { question: '空欄を埋めなさい: She is the only person ( ) can solve this problem.', japanese: '（彼女はこの問題を解ける唯一の人です。）' }, answer: 'that' },

  // 日本語→英語 (完全な文)
  { type: 'input', data: { question: '次の日本語を英語に訳しなさい: 私には上手に泳げる友達がいます。' }, answer: 'I have a friend who can swim well.' },
  { type: 'input', data: { question: '次の日本語を英語に訳しなさい: これは私が昨日作ったケーキです。' }, answer: 'This is the cake which I made yesterday.' },
  { type: 'input', data: { question: '次の日本語を英語に訳しなさい: 向こうに立っている男の子は私の弟です。' }, answer: 'The boy who is standing over there is my brother.' },

  // 2文を関係代名詞でつなぐ
  { type: 'input', data: { question: '2つの文を関係代名詞を使って1文にしなさい: I know a girl. She speaks three languages.', japanese: '（私は3つの言語を話す女の子を知っています。）' }, answer: 'I know a girl who speaks three languages.' },
  { type: 'input', data: { question: '2つの文を関係代名詞を使って1文にしなさい: This is the book. I read it last month.', japanese: '（これは先月私が読んだ本です。）' }, answer: 'This is the book which I read last month.' },
  { type: 'input', data: { question: '2つの文を関係代名詞を使って1文にしなさい: He is a scientist. He discovered a new planet.', japanese: '（彼は新しい惑星を発見した科学者です。）' }, answer: 'He is a scientist who discovered a new planet.' },

  // 省略形の書き換え
  { type: 'input', data: { question: '「The letter that she wrote was long.」の that を省略した文を書きなさい。', japanese: '（彼女が書いた手紙は長かったです。）' }, answer: 'The letter she wrote was long.' },
  { type: 'input', data: { question: '「The boy who is playing the guitar is Tom.」で who の後を現在分詞で書き換えなさい。', japanese: '（ギターを弾いている少年はトムです。）' }, answer: 'The boy playing the guitar is Tom.' },

  // 誤文訂正・選択
  { type: 'input', data: { question: '次の文の誤りを正しなさい: The dog which barks is cute. (先行詞が人の場合)' }, answer: 'The dog which barks is cute.' },
  { type: 'input', data: { question: '空欄を埋めなさい: The city ( ) I visited last summer was beautiful.', japanese: '（先の夏に訪れた都市は美しかったです。）' }, answer: 'which' },
  { type: 'input', data: { question: '空欄を埋めなさい: Is there anyone ( ) can help me?', japanese: '（私を助けてくれる人はいますか？）' }, answer: 'who' },
  { type: 'input', data: { question: '次の日本語を英語に訳しなさい: 彼は私が今まで会った中で最も面白い人です。' }, answer: 'He is the most interesting person that I have ever met.' },
  { type: 'input', data: { question: '空欄を埋めなさい: The food ( ) my mother cooks is always delicious.', japanese: '（母が作る料理はいつもおいしいです。）' }, answer: 'which' },

  // === SORT (10 problems) ===

  // who (主格)
  { type: 'sort', data: { question: '語句を並べ替えて「私には東京に住んでいる友達がいます。」という文を完成させなさい。', options: ['I', 'have', 'a', 'friend', 'who', 'lives', 'in', 'Tokyo', '.'] }, answer: ['I', 'have', 'a', 'friend', 'who', 'lives', 'in', 'Tokyo', '.'] },
  { type: 'sort', data: { question: '語句を並べ替えて「向こうで走っている男の子は私の弟です。」という文を完成させなさい。', options: ['The', 'boy', 'who', 'is', 'running', 'over', 'there', 'is', 'my', 'brother', '.'] }, answer: ['The', 'boy', 'who', 'is', 'running', 'over', 'there', 'is', 'my', 'brother', '.'] },

  // which (主格)
  { type: 'sort', data: { question: '語句を並べ替えて「私は赤い屋根のある家に住んでいます。」という文を完成させなさい。', options: ['I', 'live', 'in', 'a', 'house', 'which', 'has', 'a', 'red', 'roof', '.'] }, answer: ['I', 'live', 'in', 'a', 'house', 'which', 'has', 'a', 'red', 'roof', '.'] },
  { type: 'sort', data: { question: '語句を並べ替えて「これはとても速く走る犬です。」という文を完成させなさい。', options: ['This', 'is', 'a', 'dog', 'which', 'runs', 'very', 'fast', '.'] }, answer: ['This', 'is', 'a', 'dog', 'which', 'runs', 'very', 'fast', '.'] },

  // who (目的格)
  { type: 'sort', data: { question: '語句を並べ替えて「私が昨日会った女性は先生です。」という文を完成させなさい。', options: ['The', 'woman', 'who', 'I', 'met', 'yesterday', 'is', 'a', 'teacher', '.'] }, answer: ['The', 'woman', 'who', 'I', 'met', 'yesterday', 'is', 'a', 'teacher', '.'] },

  // which (目的格)
  { type: 'sort', data: { question: '語句を並べ替えて「これは彼女が私にくれた本です。」という文を完成させなさい。', options: ['This', 'is', 'the', 'book', 'which', 'she', 'gave', 'me', '.'] }, answer: ['This', 'is', 'the', 'book', 'which', 'she', 'gave', 'me', '.'] },

  // that
  { type: 'sort', data: { question: '語句を並べ替えて「彼女はクラスで最も背が高い生徒です。」という文を完成させなさい。', options: ['She', 'is', 'the', 'tallest', 'student', 'that', 'is', 'in', 'the', 'class', '.'] }, answer: ['She', 'is', 'the', 'tallest', 'student', 'that', 'is', 'in', 'the', 'class', '.'] },

  // 省略あり
  { type: 'sort', data: { question: '語句を並べ替えて「あなたが昨日買ったシャツはかっこいいです。」という文を完成させなさい。（関係代名詞を省略して）', options: ['The', 'shirt', 'you', 'bought', 'yesterday', 'is', 'cool', '.'] }, answer: ['The', 'shirt', 'you', 'bought', 'yesterday', 'is', 'cool', '.'] },

  // 疑問文的な応用
  { type: 'sort', data: { question: '語句を並べ替えて「あなたはギターを弾ける人を知っていますか？」という文を完成させなさい。', options: ['Do', 'you', 'know', 'anyone', 'who', 'can', 'play', 'the', 'guitar', '?'] }, answer: ['Do', 'you', 'know', 'anyone', 'who', 'can', 'play', 'the', 'guitar', '?'] },

  // 複合的な応用
  { type: 'sort', data: { question: '語句を並べ替えて「彼は私が今まで読んだ中で最もわくわくする本を書きました。」という文を完成させなさい。', options: ['He', 'wrote', 'the', 'most', 'exciting', 'book', 'that', 'I', 'have', 'ever', 'read', '.'] }, answer: ['He', 'wrote', 'the', 'most', 'exciting', 'book', 'that', 'I', 'have', 'ever', 'read', '.'] },
];
