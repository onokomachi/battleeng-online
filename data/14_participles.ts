import type { Problem } from '../types';

export const participleProblems: Problem[] = [
  // --- select (20 problems) ---

  // 現在分詞による後置修飾
  { type: 'select', data: { question: '次の文の( )に適切な語を入れなさい: The boy ( ) soccer is my brother.', japanese: '（サッカーをしている男の子は私の弟です。）', options: ['playing', 'played', 'plays', 'play'] }, answer: 'playing' },
  { type: 'select', data: { question: '次の文の( )に適切な語を入れなさい: The girl ( ) by the window is Lisa.', japanese: '（窓のそばに立っている女の子はリサです。）', options: ['standing', 'stood', 'stands', 'stand'] }, answer: 'standing' },
  { type: 'select', data: { question: '次の文の( )に適切な語を入れなさい: Look at the dog ( ) in the garden.', japanese: '（庭で走っている犬を見てください。）', options: ['running', 'run', 'runs', 'ran'] }, answer: 'running' },
  { type: 'select', data: { question: '次の文の( )に適切な語を入れなさい: The man ( ) a newspaper is my father.', japanese: '（新聞を読んでいる男性は私の父です。）', options: ['reading', 'read', 'reads', 'to read'] }, answer: 'reading' },
  { type: 'select', data: { question: '次の文の( )に適切な語を入れなさい: The children ( ) in the pool look happy.', japanese: '（プールで泳いでいる子どもたちは楽しそうです。）', options: ['swimming', 'swam', 'swim', 'swims'] }, answer: 'swimming' },

  // 過去分詞による後置修飾
  { type: 'select', data: { question: '次の文の( )に適切な語を入れなさい: The language ( ) in Brazil is Portuguese.', japanese: '（ブラジルで話されている言語はポルトガル語です。）', options: ['spoken', 'speaking', 'speaks', 'speak'] }, answer: 'spoken' },
  { type: 'select', data: { question: '次の文の( )に適切な語を入れなさい: The car ( ) by my father is very old.', japanese: '（父によって使われている車はとても古いです。）', options: ['used', 'using', 'uses', 'use'] }, answer: 'used' },
  { type: 'select', data: { question: '次の文の( )に適切な語を入れなさい: The cake ( ) by my mother was delicious.', japanese: '（母によって作られたケーキはおいしかったです。）', options: ['made', 'making', 'makes', 'make'] }, answer: 'made' },
  { type: 'select', data: { question: '次の文の( )に適切な語を入れなさい: The letter ( ) in English was difficult to read.', japanese: '（英語で書かれた手紙は読むのが難しかったです。）', options: ['written', 'writing', 'writes', 'wrote'] }, answer: 'written' },
  { type: 'select', data: { question: '次の文の( )に適切な語を入れなさい: The picture ( ) on the wall is beautiful.', japanese: '（壁に掛けられた絵は美しいです。）', options: ['hung', 'hanging', 'hangs', 'hang'] }, answer: 'hung' },

  // 現在分詞 vs 過去分詞の選択
  { type: 'select', data: { question: '次の文の( )に適切な語を入れなさい: The boy ( ) a guitar is Tom.', japanese: '（ギターを弾いている男の子はトムです。）', options: ['playing', 'played', 'plays', 'play'] }, answer: 'playing' },
  { type: 'select', data: { question: '次の文の( )に適切な語を入れなさい: The song ( ) by everyone is very popular.', japanese: '（みんなに歌われている歌はとても人気があります。）', options: ['sung', 'singing', 'sings', 'sang'] }, answer: 'sung' },
  { type: 'select', data: { question: '次の文の( )に適切な語を入れなさい: The woman ( ) with Ken is his teacher.', japanese: '（ケンと話している女性は彼の先生です。）', options: ['talking', 'talked', 'talks', 'talk'] }, answer: 'talking' },
  { type: 'select', data: { question: '次の文の( )に適切な語を入れなさい: The bridge ( ) 100 years ago is still strong.', japanese: '（100年前に建てられた橋はまだ丈夫です。）', options: ['built', 'building', 'builds', 'build'] }, answer: 'built' },
  { type: 'select', data: { question: '次の文の( )に適切な語句を入れなさい: The students ( ) in the library are my classmates.', japanese: '（図書館で勉強している生徒たちは私のクラスメートです。）', options: ['studying', 'studied', 'study', 'studies'] }, answer: 'studying' },

  // SVOC構文 (see/hear/find + O + -ing)
  { type: 'select', data: { question: '次の文の( )に適切な語を入れなさい: I saw him ( ) in the park.', japanese: '（私は彼が公園で走っているのを見ました。）', options: ['running', 'run', 'ran', 'runs'] }, answer: 'running' },
  { type: 'select', data: { question: '次の文の( )に適切な語を入れなさい: She heard the birds ( ) outside.', japanese: '（彼女は外で鳥が鳴いているのを聞きました。）', options: ['singing', 'sung', 'sing', 'sang'] }, answer: 'singing' },
  { type: 'select', data: { question: '次の文の( )に適切な語を入れなさい: We found the baby ( ) on the floor.', japanese: '（私たちは赤ちゃんが床で眠っているのを見つけました。）', options: ['sleeping', 'slept', 'sleep', 'sleeps'] }, answer: 'sleeping' },
  { type: 'select', data: { question: '次の文の( )に適切な語を入れなさい: He noticed her ( ) with tears.', japanese: '（彼は彼女が涙を流しながら泣いているのに気づきました。）', options: ['crying', 'cried', 'cry', 'cries'] }, answer: 'crying' },
  { type: 'select', data: { question: '次の文の( )に適切な語を入れなさい: I kept the engine ( ) all night.', japanese: '（私は一晩中エンジンをかけたままにしておきました。）', options: ['running', 'run', 'runs', 'ran'] }, answer: 'running' },

  // --- input (20 problems) ---

  // 現在分詞による後置修飾
  { type: 'input', data: { question: '次の日本語を英語に訳しなさい: 向こうで歌っている女の子は私の友達です。', japanese: '（The girl singing over there is my friend.）' }, answer: 'The girl singing over there is my friend.' },
  { type: 'input', data: { question: '空欄を埋めなさい: The man ( ) a camera is a famous photographer.', japanese: '（カメラを持っている男性は有名な写真家です。）' }, answer: 'holding' },
  { type: 'input', data: { question: '次の日本語を英語に訳しなさい: 木の下で寝ている猫を見てください。', japanese: '（Look at the cat sleeping under the tree.）' }, answer: 'Look at the cat sleeping under the tree.' },
  { type: 'input', data: { question: '空欄を埋めなさい: Do you know the boy ( ) a red hat?', japanese: '（赤い帽子をかぶっている男の子を知っていますか？）' }, answer: 'wearing' },
  { type: 'input', data: { question: '次の2文を1文にしなさい: The woman is cooking dinner. She is my aunt.', japanese: '（夕食を作っている女性は私の叔母です。）' }, answer: 'The woman cooking dinner is my aunt.' },

  // 過去分詞による後置修飾
  { type: 'input', data: { question: '空欄を埋めなさい: The computer ( ) by my father is very fast.', japanese: '（父によって修理されたコンピュータはとても速いです。）' }, answer: 'repaired' },
  { type: 'input', data: { question: '次の日本語を英語に訳しなさい: 彼女によって書かれた本はとても有名です。', japanese: '（The book written by her is very famous.）' }, answer: 'The book written by her is very famous.' },
  { type: 'input', data: { question: '空欄を埋めなさい: The language ( ) in Australia is English.', japanese: '（オーストラリアで話されている言語は英語です。）' }, answer: 'spoken' },
  { type: 'input', data: { question: '次の2文を1文にしなさい: The chair is broken. It is in the classroom.', japanese: '（教室にある壊れた椅子。）' }, answer: 'The chair broken in the classroom needs to be fixed.' },
  { type: 'input', data: { question: '空欄を埋めなさい: The cookies ( ) by grandma are sweet.', japanese: '（おばあちゃんによって焼かれたクッキーは甘いです。）' }, answer: 'baked' },

  // 現在分詞 vs 過去分詞の識別
  { type: 'input', data: { question: '( )内の語を正しい形にしなさい: The picture (paint) by Pablo Picasso is priceless.', japanese: '（パブロ・ピカソによって描かれた絵は値段がつけられません。）' }, answer: 'painted' },
  { type: 'input', data: { question: '( )内の語を正しい形にしなさい: The boy (wave) his hand is my cousin.', japanese: '（手を振っている男の子は私のいとこです。）' }, answer: 'waving' },
  { type: 'input', data: { question: '( )内の語を正しい形にしなさい: The houses (destroy) by the storm have been rebuilt.', japanese: '（嵐によって破壊された家々は再建されました。）' }, answer: 'destroyed' },
  { type: 'input', data: { question: '( )内の語を正しい形にしなさい: The students (study) for the exam look tired.', japanese: '（試験のために勉強している生徒たちは疲れているように見えます。）' }, answer: 'studying' },
  { type: 'input', data: { question: '空欄を埋めなさい: The food ( ) at this restaurant is very good.', japanese: '（このレストランで出される食べ物はとても美味しいです。）' }, answer: 'served' },

  // SVOC構文
  { type: 'input', data: { question: '次の日本語を英語に訳しなさい: 私は彼女がピアノを弾いているのを聞きました。', japanese: '（I heard her playing the piano.）' }, answer: 'I heard her playing the piano.' },
  { type: 'input', data: { question: '空欄を埋めなさい: We saw them ( ) in the river.', japanese: '（私たちは彼らが川で泳いでいるのを見ました。）' }, answer: 'swimming' },
  { type: 'input', data: { question: '次の日本語を英語に訳しなさい: 先生は生徒たちが教室で話しているのを見つけました。', japanese: '（The teacher found the students talking in the classroom.）' }, answer: 'The teacher found the students talking in the classroom.' },
  { type: 'input', data: { question: '空欄を埋めなさい: I could smell something ( ) in the kitchen.', japanese: '（私はキッチンで何かが焼けているにおいがしました。）' }, answer: 'burning' },
  { type: 'input', data: { question: '次の日本語を英語に訳しなさい: 彼は犬が庭で吠えているのに気づきました。', japanese: '（He noticed the dog barking in the garden.）' }, answer: 'He noticed the dog barking in the garden.' },

  // --- sort (10 problems) ---

  { type: 'sort', data: { question: '語句を並べ替えて「公園で走っている男の子は私の弟です。」という文を完成させなさい。', options: ['The', 'boy', 'running', 'in', 'the', 'park', 'is', 'my', 'brother', '.'] }, answer: ['The', 'boy', 'running', 'in', 'the', 'park', 'is', 'my', 'brother', '.'] },
  { type: 'sort', data: { question: '語句を並べ替えて「カナダで話されている言語は英語とフランス語です。」という文を完成させなさい。', options: ['The', 'languages', 'spoken', 'in', 'Canada', 'are', 'English', 'and', 'French', '.'] }, answer: ['The', 'languages', 'spoken', 'in', 'Canada', 'are', 'English', 'and', 'French', '.'] },
  { type: 'sort', data: { question: '語句を並べ替えて「私は彼女が公園で歌っているのを聞きました。」という文を完成させなさい。', options: ['I', 'heard', 'her', 'singing', 'in', 'the', 'park', '.'] }, answer: ['I', 'heard', 'her', 'singing', 'in', 'the', 'park', '.'] },
  { type: 'sort', data: { question: '語句を並べ替えて「ベンチに座っている女性は私の先生です。」という文を完成させなさい。', options: ['The', 'woman', 'sitting', 'on', 'the', 'bench', 'is', 'my', 'teacher', '.'] }, answer: ['The', 'woman', 'sitting', 'on', 'the', 'bench', 'is', 'my', 'teacher', '.'] },
  { type: 'sort', data: { question: '語句を並べ替えて「日本で作られたこの車はとても有名です。」という文を完成させなさい。', options: ['This', 'car', 'made', 'in', 'Japan', 'is', 'very', 'famous', '.'] }, answer: ['This', 'car', 'made', 'in', 'Japan', 'is', 'very', 'famous', '.'] },
  { type: 'sort', data: { question: '語句を並べ替えて「私たちは子どもたちがグラウンドで遊んでいるのを見ました。」という文を完成させなさい。', options: ['We', 'saw', 'the', 'children', 'playing', 'on', 'the', 'ground', '.'] }, answer: ['We', 'saw', 'the', 'children', 'playing', 'on', 'the', 'ground', '.'] },
  { type: 'sort', data: { question: '語句を並べ替えて「彼女によって書かれた詩は美しい。」という文を完成させなさい。', options: ['The', 'poem', 'written', 'by', 'her', 'is', 'beautiful', '.'] }, answer: ['The', 'poem', 'written', 'by', 'her', 'is', 'beautiful', '.'] },
  { type: 'sort', data: { question: '語句を並べ替えて「向こうで泳いでいる生徒たちは3年生です。」という文を完成させなさい。', options: ['The', 'students', 'swimming', 'over', 'there', 'are', 'third', 'graders', '.'] }, answer: ['The', 'students', 'swimming', 'over', 'there', 'are', 'third', 'graders', '.'] },
  { type: 'sort', data: { question: '語句を並べ替えて「母が作ったケーキはとても甘かった。」という文を完成させなさい。', options: ['The', 'cake', 'made', 'by', 'my', 'mother', 'was', 'very', 'sweet', '.'] }, answer: ['The', 'cake', 'made', 'by', 'my', 'mother', 'was', 'very', 'sweet', '.'] },
  { type: 'sort', data: { question: '語句を並べ替えて「私は誰かが私の名前を呼んでいるのに気づきました。」という文を完成させなさい。', options: ['I', 'noticed', 'someone', 'calling', 'my', 'name', '.'] }, answer: ['I', 'noticed', 'someone', 'calling', 'my', 'name', '.'] },
];
