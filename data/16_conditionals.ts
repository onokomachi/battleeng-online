import type { Problem } from '../types';

export const conditionalProblems: Problem[] = [
  // --- select (20 problems) ---

  // 現実的条件文
  { type: 'select', data: { question: '次の文の( )に適切な語を入れなさい: If it ( ) tomorrow, we will cancel the picnic.', japanese: '（もし明日雨が降れば、私たちはピクニックを中止します。）', options: ['rains', 'will rain', 'rained', 'rain'] }, answer: 'rains' },
  { type: 'select', data: { question: '次の文の( )に適切な語を入れなさい: If you study hard, you ( ) pass the test.', japanese: '（一生懸命勉強すれば、テストに合格するでしょう。）', options: ['will', 'would', 'can', 'could'] }, answer: 'will' },
  { type: 'select', data: { question: '次の文の( )に適切な語を入れなさい: I will call you if I ( ) free.', japanese: '（もし暇になったら電話します。）', options: ['am', 'will be', 'was', 'were'] }, answer: 'am' },
  { type: 'select', data: { question: '次の文の( )に適切な語を入れなさい: If she ( ) early, she will catch the bus.', japanese: '（もし彼女が早く出れば、バスに乗れるでしょう。）', options: ['leaves', 'will leave', 'left', 'leave'] }, answer: 'leaves' },
  { type: 'select', data: { question: '次の文の( )に適切な語を入れなさい: We ( ) go to the beach if the weather is nice.', japanese: '（天気がよければ、海に行くでしょう。）', options: ['will', 'would', 'should', 'shall'] }, answer: 'will' },

  // 非現実的仮定法過去
  { type: 'select', data: { question: '次の文の( )に適切な語を入れなさい: If I ( ) a bird, I could fly.', japanese: '（もし私が鳥だったら、飛べるのに。）', options: ['were', 'am', 'was', 'will be'] }, answer: 'were' },
  { type: 'select', data: { question: '次の文の( )に適切な語を入れなさい: If he had more money, he ( ) buy a car.', japanese: '（もし彼がもっとお金を持っていたら、車を買えるのに。）', options: ['could', 'can', 'will', 'should'] }, answer: 'could' },
  { type: 'select', data: { question: '次の文の( )に適切な語を入れなさい: If I ( ) you, I would study more.', japanese: '（もし私があなたなら、もっと勉強するのに。）', options: ['were', 'am', 'was', 'be'] }, answer: 'were' },
  { type: 'select', data: { question: '次の文の( )に適切な語を入れなさい: She could travel the world if she ( ) enough time.', japanese: '（もし彼女に十分な時間があれば、世界を旅できるのに。）', options: ['had', 'has', 'will have', 'have'] }, answer: 'had' },
  { type: 'select', data: { question: '次の文の( )に適切な語を入れなさい: If I knew the answer, I ( ) tell you.', japanese: '（もし答えを知っていたら、あなたに教えるのに。）', options: ['would', 'will', 'could', 'should'] }, answer: 'would' },

  // wish + 仮定法
  { type: 'select', data: { question: '次の文の( )に適切な語を入れなさい: I wish I ( ) speak English better.', japanese: '（英語がもっとうまく話せたらいいのに。）', options: ['could', 'can', 'will', 'should'] }, answer: 'could' },
  { type: 'select', data: { question: '次の文の( )に適切な語を入れなさい: She wishes she ( ) taller.', japanese: '（彼女は背が高ければいいのにと思っています。）', options: ['were', 'is', 'was', 'will be'] }, answer: 'were' },
  { type: 'select', data: { question: '次の文の( )に適切な語を入れなさい: I wish I ( ) more free time.', japanese: '（もっと自由な時間があればいいのに。）', options: ['had', 'have', 'has', 'will have'] }, answer: 'had' },
  { type: 'select', data: { question: '次の文の( )に適切な語を入れなさい: He wishes he ( ) play the guitar.', japanese: '（彼はギターが弾けたらいいのにと思っています。）', options: ['could', 'can', 'will', 'would'] }, answer: 'could' },

  // unless / as long as
  { type: 'select', data: { question: '次の文の( )に適切な語を入れなさい: ( ) you hurry, you will miss the train.', japanese: '（急がなければ、電車に乗り遅れます。）', options: ['Unless', 'If', 'When', 'As long as'] }, answer: 'Unless' },
  { type: 'select', data: { question: '次の文の( )に適切な語を入れなさい: You can borrow my bike ( ) you return it by noon.', japanese: '（正午までに返してくれる限り、自転車を貸してあげます。）', options: ['as long as', 'unless', 'if not', 'until'] }, answer: 'as long as' },
  { type: 'select', data: { question: '次の文の( )に適切な語を入れなさい: ( ) it rains, the game will be postponed.', japanese: '（雨が降らない限り、試合は延期されません。）', options: ['Unless', 'If', 'As long as', 'When'] }, answer: 'Unless' },
  { type: 'select', data: { question: '次の文の( )に適切な語を入れなさい: I will support you ( ) you do your best.', japanese: '（最善を尽くす限り、あなたを応援します。）', options: ['as long as', 'unless', 'if not', 'although'] }, answer: 'as long as' },

  // 時制の確認
  { type: 'select', data: { question: '次の文の( )に適切な語を入れなさい: If it ( ) fine, we will go for a walk.', japanese: '（晴れれば、散歩に行くでしょう。）', options: ['is', 'will be', 'was', 'were'] }, answer: 'is' },
  { type: 'select', data: { question: '次の文の( )に適切な語を入れなさい: If she ( ) harder, she could win the race.', japanese: '（もし彼女がもっと頑張れば、レースに勝てるのに。）', options: ['tried', 'tries', 'will try', 'try'] }, answer: 'tried' },

  // --- input (20 problems) ---

  // 現実的条件文
  { type: 'input', data: { question: '次の日本語を英語に訳しなさい: もし明日晴れれば、私は公園へ行きます。' }, answer: 'If it is sunny tomorrow, I will go to the park.' },
  { type: 'input', data: { question: '空欄を埋めなさい: If you ( ) to bed early, you will feel better.', japanese: '（早く寝れば、気分がよくなるでしょう。）' }, answer: 'go' },
  { type: 'input', data: { question: '次の文を英語にしなさい: もし彼が来れば、私たちはパーティーを始めます。' }, answer: 'If he comes, we will start the party.' },
  { type: 'input', data: { question: '空欄を埋めなさい: If it ( ) cold, I will wear a coat.', japanese: '（寒ければ、コートを着ます。）' }, answer: 'is' },
  { type: 'input', data: { question: '次の文を英語にしなさい: もし時間があれば、彼女はあなたを手伝うでしょう。' }, answer: 'If she has time, she will help you.' },

  // 非現実的仮定法過去
  { type: 'input', data: { question: '次の文の( )に適切な語を入れなさい: If I ( ) rich, I would travel the world.', japanese: '（もし金持ちなら、世界を旅するのに。）' }, answer: 'were' },
  { type: 'input', data: { question: '次の日本語を英語に訳しなさい: もし私があなたなら、そんなことはしないのに。' }, answer: 'If I were you, I would not do that.' },
  { type: 'input', data: { question: '空欄を埋めなさい: If he ( ) harder, he could pass the exam.', japanese: '（もし彼がもっと勉強すれば、試験に合格できるのに。）' }, answer: 'studied' },
  { type: 'input', data: { question: '次の文を英語にしなさい: もし彼女が私の姉なら、一緒に出かけるのに。' }, answer: 'If she were my sister, I would go out with her.' },
  { type: 'input', data: { question: '空欄を埋めなさい: If I ( ) a superpower, I would help everyone.', japanese: '（もし超能力を持っていたら、みんなを助けるのに。）' }, answer: 'had' },

  // wish + 仮定法
  { type: 'input', data: { question: '次の日本語を英語に訳しなさい: 私は英語がもっと話せたらいいのにと思います。' }, answer: 'I wish I could speak English better.' },
  { type: 'input', data: { question: '空欄を埋めなさい: I wish I ( ) a car.', japanese: '（車があればいいのに。）' }, answer: 'had' },
  { type: 'input', data: { question: '次の文を英語にしなさい: 彼は背が高ければいいのにと思っています。' }, answer: 'He wishes he were taller.' },
  { type: 'input', data: { question: '空欄を埋めなさい: She wishes she ( ) sing well.', japanese: '（彼女は歌がうまければいいのにと思っています。）' }, answer: 'could' },
  { type: 'input', data: { question: '次の日本語を英語に訳しなさい: 私はもっと時間があればいいのにと思います。' }, answer: 'I wish I had more time.' },

  // unless / as long as
  { type: 'input', data: { question: '空欄を埋めなさい: ( ) you practice every day, you will improve.', japanese: '（毎日練習する限り、上達するでしょう。）' }, answer: 'As long as' },
  { type: 'input', data: { question: '次の文を英語にしなさい: 急がなければ、バスに乗り遅れます。' }, answer: 'Unless you hurry, you will miss the bus.' },
  { type: 'input', data: { question: '空欄を埋めなさい: You may stay up late ( ) you finish your homework first.', japanese: '（先に宿題を終わらせる限り、夜更かししてもいいです。）' }, answer: 'as long as' },
  { type: 'input', data: { question: '次の日本語を英語に訳しなさい: 彼が謝らなければ、私は彼を許しません。' }, answer: 'Unless he apologizes, I will not forgive him.' },
  { type: 'input', data: { question: '空欄を埋めなさい: ( ) you tell me the truth, I cannot trust you.', japanese: '（本当のことを言わない限り、あなたを信用できません。）' }, answer: 'Unless' },

  // --- sort (10 problems) ---

  // 現実的条件文
  { type: 'sort', data: { question: '語句を並べ替えて「もし雨が降れば、私は家にいます。」という文を完成させなさい。', options: ['If', 'it', 'rains', ',', 'I', 'will', 'stay', 'home', '.'] }, answer: ['If', 'it', 'rains', ',', 'I', 'will', 'stay', 'home', '.'] },
  { type: 'sort', data: { question: '語句を並べ替えて「もし彼が来れば、私たちは野球をします。」という文を完成させなさい。', options: ['If', 'he', 'comes', ',', 'we', 'will', 'play', 'baseball', '.'] }, answer: ['If', 'he', 'comes', ',', 'we', 'will', 'play', 'baseball', '.'] },
  { type: 'sort', data: { question: '語句を並べ替えて「あなたが一生懸命勉強すれば、試験に合格するでしょう。」という文を完成させなさい。', options: ['you', 'study', 'hard', 'If', ',', 'you', 'will', 'pass', 'the', 'exam', '.'] }, answer: ['If', 'you', 'study', 'hard', ',', 'you', 'will', 'pass', 'the', 'exam', '.'] },

  // 非現実的仮定法過去
  { type: 'sort', data: { question: '語句を並べ替えて「もし私が鳥なら、空を飛べるのに。」という文を完成させなさい。', options: ['If', 'I', 'were', 'a', 'bird', ',', 'I', 'could', 'fly', '.'] }, answer: ['If', 'I', 'were', 'a', 'bird', ',', 'I', 'could', 'fly', '.'] },
  { type: 'sort', data: { question: '語句を並べ替えて「もし私があなたなら、もっと一生懸命勉強するのに。」という文を完成させなさい。', options: ['If', 'I', 'were', 'you', ',', 'I', 'would', 'study', 'harder', '.'] }, answer: ['If', 'I', 'were', 'you', ',', 'I', 'would', 'study', 'harder', '.'] },
  { type: 'sort', data: { question: '語句を並べ替えて「もし彼女に時間があれば、旅行できるのに。」という文を完成させなさい。', options: ['If', 'she', 'had', 'time', ',', 'she', 'could', 'travel', '.'] }, answer: ['If', 'she', 'had', 'time', ',', 'she', 'could', 'travel', '.'] },

  // wish + 仮定法
  { type: 'sort', data: { question: '語句を並べ替えて「私は英語が話せたらいいのに。」という文を完成させなさい。', options: ['I', 'wish', 'I', 'could', 'speak', 'English', '.'] }, answer: ['I', 'wish', 'I', 'could', 'speak', 'English', '.'] },
  { type: 'sort', data: { question: '語句を並べ替えて「彼女は背が高ければいいのにと思っています。」という文を完成させなさい。', options: ['She', 'wishes', 'she', 'were', 'taller', '.'] }, answer: ['She', 'wishes', 'she', 'were', 'taller', '.'] },

  // unless / as long as
  { type: 'sort', data: { question: '語句を並べ替えて「急がなければ、電車に乗り遅れます。」という文を完成させなさい。', options: ['Unless', 'you', 'hurry', ',', 'you', 'will', 'miss', 'the', 'train', '.'] }, answer: ['Unless', 'you', 'hurry', ',', 'you', 'will', 'miss', 'the', 'train', '.'] },
  { type: 'sort', data: { question: '語句を並べ替えて「最善を尽くす限り、あなたを応援します。」という文を完成させなさい。', options: ['As', 'long', 'as', 'you', 'do', 'your', 'best', ',', 'I', 'will', 'support', 'you', '.'] }, answer: ['As', 'long', 'as', 'you', 'do', 'your', 'best', ',', 'I', 'will', 'support', 'you', '.'] },
];
