import type { Problem } from '../types';

export const pronounProblems: Problem[] = [
  // --- SELECT problems (subject pronouns) ---
  { type: 'select', data: { question: '次の文の( )に適切な語を入れなさい: ( ) am a student.', options: ['I', 'Me', 'My', 'Mine'] }, answer: 'I' },
  { type: 'select', data: { question: '次の文の( )に適切な語を入れなさい: ( ) is my brother. He is tall.', options: ['He', 'Him', 'His', 'Her'] }, answer: 'He' },
  { type: 'select', data: { question: '次の文の( )に適切な語を入れなさい: ( ) is my sister. She is kind.', options: ['She', 'Her', 'Hers', 'He'] }, answer: 'She' },
  { type: 'select', data: { question: '次の文の( )に適切な語を入れなさい: This is my dog. ( ) is very cute.', options: ['It', 'Its', 'They', 'Them'] }, answer: 'It' },
  { type: 'select', data: { question: '次の文の( )に適切な語を入れなさい: Tom and I are friends. ( ) play soccer together.', options: ['We', 'Us', 'Our', 'Ours'] }, answer: 'We' },
  { type: 'select', data: { question: '次の文の( )に適切な語を入れなさい: These are my classmates. ( ) are very friendly.', options: ['They', 'Them', 'Their', 'Theirs'] }, answer: 'They' },
  { type: 'select', data: { question: '次の文の( )に適切な語を入れなさい: ( ) are from Japan.', options: ['We', 'Us', 'Our', 'Ours'] }, answer: 'We' },
  { type: 'select', data: { question: '次の文の( )に適切な語を入れなさい: ( ) like English very much.', options: ['I', 'Me', 'My', 'Mine'] }, answer: 'I' },

  // --- SELECT problems (object pronouns) ---
  { type: 'select', data: { question: '次の文の( )に適切な語を入れなさい: Please help ( ).', options: ['me', 'I', 'my', 'mine'] }, answer: 'me' },
  { type: 'select', data: { question: '次の文の( )に適切な語を入れなさい: I know ( ) very well. He is my friend.', options: ['him', 'he', 'his', 'hers'] }, answer: 'him' },
  { type: 'select', data: { question: '次の文の( )に適切な語を入れなさい: I called ( ) last night. She was happy.', options: ['her', 'she', 'hers', 'him'] }, answer: 'her' },
  { type: 'select', data: { question: '次の文の( )に適切な語を入れなさい: I have a cat. I love ( ) very much.', options: ['it', 'its', 'they', 'them'] }, answer: 'it' },
  { type: 'select', data: { question: '次の文の( )に適切な語を入れなさい: Our teacher teaches ( ) English.', options: ['us', 'we', 'our', 'ours'] }, answer: 'us' },
  { type: 'select', data: { question: '次の文の( )に適切な語を入れなさい: I see ( ) every day. They are my neighbors.', options: ['them', 'they', 'their', 'theirs'] }, answer: 'them' },

  // --- SELECT problems (possessive adjectives) ---
  { type: 'select', data: { question: '次の文の( )に適切な語を入れなさい: This is ( ) book. I wrote my name in it.', options: ['my', 'me', 'I', 'mine'] }, answer: 'my' },
  { type: 'select', data: { question: '次の文の( )に適切な語を入れなさい: What is ( ) name? Nice to meet you.', options: ['your', 'you', 'yours', 'our'] }, answer: 'your' },
  { type: 'select', data: { question: '次の文の( )に適切な語を入れなさい: Ken lost ( ) wallet yesterday.', options: ['his', 'him', 'he', 'hers'] }, answer: 'his' },
  { type: 'select', data: { question: '次の文の( )に適切な語を入れなさい: Mary loves ( ) cat. It is so cute.', options: ['her', 'she', 'hers', 'his'] }, answer: 'her' },
  { type: 'select', data: { question: '次の文の( )に適切な語を入れなさい: The dog wagged ( ) tail.', options: ['its', 'it', 'their', 'our'] }, answer: 'its' },
  { type: 'select', data: { question: '次の文の( )に適切な語を入れなさい: We forgot ( ) homework at home.', options: ['our', 'us', 'we', 'ours'] }, answer: 'our' },
  { type: 'select', data: { question: '次の文の( )に適切な語を入れなさい: The students did ( ) best on the test.', options: ['their', 'they', 'them', 'theirs'] }, answer: 'their' },

  // --- SELECT problems (possessive pronouns) ---
  { type: 'select', data: { question: '次の文の( )に適切な語を入れなさい: This pen is not yours. It is ( ).', options: ['mine', 'my', 'me', 'I'] }, answer: 'mine' },
  { type: 'select', data: { question: '次の文の( )に適切な語を入れなさい: This bag is not mine. Is it ( )?', options: ['yours', 'your', 'you', 'ours'] }, answer: 'yours' },
  { type: 'select', data: { question: '次の文の( )に適切な語を入れなさい: That bike is not mine. It is ( ).', options: ['his', 'him', 'he', 'hers'] }, answer: 'his' },
  { type: 'select', data: { question: '次の文の( )に適切な語を入れなさい: This umbrella is not mine. It is ( ).', options: ['hers', 'her', 'she', 'his'] }, answer: 'hers' },
  { type: 'select', data: { question: '次の文の( )に適切な語を入れなさい: Our car is new, but ( ) is old.', options: ['theirs', 'their', 'them', 'they'] }, answer: 'theirs' },

  // --- INPUT problems (subject pronouns & translation) ---
  { type: 'input', data: { question: '次の日本語を英語に訳しなさい。', japanese: '私は毎日学校に行きます。' }, answer: 'I go to school every day.' },
  { type: 'input', data: { question: '次の日本語を英語に訳しなさい。', japanese: '彼は野球が好きです。' }, answer: 'He likes baseball.' },
  { type: 'input', data: { question: '次の日本語を英語に訳しなさい。', japanese: '彼女は上手に英語を話します。' }, answer: 'She speaks English well.' },
  { type: 'input', data: { question: '次の日本語を英語に訳しなさい。', japanese: 'それはとても大きい犬です。' }, answer: 'It is a very big dog.' },
  { type: 'input', data: { question: '次の日本語を英語に訳しなさい。', japanese: '私たちは同じクラスにいます。' }, answer: 'We are in the same class.' },
  { type: 'input', data: { question: '次の日本語を英語に訳しなさい。', japanese: '彼らはサッカーをしています。' }, answer: 'They are playing soccer.' },

  // --- INPUT problems (object pronouns & translation) ---
  { type: 'input', data: { question: '次の日本語を英語に訳しなさい。', japanese: '私を助けてください。' }, answer: 'Please help me.' },
  { type: 'input', data: { question: '次の日本語を英語に訳しなさい。', japanese: '私は彼をよく知っています。' }, answer: 'I know him well.' },
  { type: 'input', data: { question: '次の日本語を英語に訳しなさい。', japanese: '私は昨日彼女に会いました。' }, answer: 'I met her yesterday.' },
  { type: 'input', data: { question: '次の日本語を英語に訳しなさい。', japanese: '先生は私たちに英語を教えます。' }, answer: 'The teacher teaches us English.' },
  { type: 'input', data: { question: '次の日本語を英語に訳しなさい。', japanese: '私は毎朝その猫にエサをあげます。' }, answer: 'I feed it every morning.' },
  { type: 'input', data: { question: '次の日本語を英語に訳しなさい。', japanese: '私は彼らを毎日見かけます。' }, answer: 'I see them every day.' },

  // --- INPUT problems (possessive adjectives & translation) ---
  { type: 'input', data: { question: '次の日本語を英語に訳しなさい。', japanese: 'これは私の自転車です。' }, answer: 'This is my bike.' },
  { type: 'input', data: { question: '次の日本語を英語に訳しなさい。', japanese: 'あなたの名前は何ですか？' }, answer: 'What is your name?' },
  { type: 'input', data: { question: '次の日本語を英語に訳しなさい。', japanese: '彼の夢はパイロットになることです。' }, answer: 'His dream is to become a pilot.' },
  { type: 'input', data: { question: '次の日本語を英語に訳しなさい。', japanese: '彼女の趣味は読書です。' }, answer: 'Her hobby is reading.' },
  { type: 'input', data: { question: '次の日本語を英語に訳しなさい。', japanese: '私たちの学校はとても大きい。' }, answer: 'Our school is very big.' },
  { type: 'input', data: { question: '次の日本語を英語に訳しなさい。', japanese: '彼らの家はここから遠い。' }, answer: 'Their house is far from here.' },

  // --- INPUT problems (possessive pronouns & fill-in) ---
  { type: 'input', data: { question: '（　）に適切な所有代名詞を入れなさい: This is not my bag. It is (　). ※ you の所有代名詞', japanese: '' }, answer: 'yours' },
  { type: 'input', data: { question: '（　）に適切な所有代名詞を入れなさい: That red car is (　). ※ he の所有代名詞', japanese: '' }, answer: 'his' },
  { type: 'input', data: { question: '（　）に適切な所有代名詞を入れなさい: The blue notebook is (　). ※ she の所有代名詞', japanese: '' }, answer: 'hers' },
  { type: 'input', data: { question: '（　）に適切な所有代名詞を入れなさい: This house is (　). ※ we の所有代名詞', japanese: '' }, answer: 'ours' },
  { type: 'input', data: { question: '（　）に適切な所有代名詞を入れなさい: That dog is (　). ※ they の所有代名詞', japanese: '' }, answer: 'theirs' },

  // --- SORT problems ---
  { type: 'sort', data: { question: '語句を並べ替えて「彼は私の友達です。」という文を完成させなさい。', options: ['He', 'is', 'my', 'friend', '.'] }, answer: ['He', 'is', 'my', 'friend', '.'] },
  { type: 'sort', data: { question: '語句を並べ替えて「私は彼女が好きです。」という文を完成させなさい。', options: ['I', 'like', 'her', '.'] }, answer: ['I', 'like', 'her', '.'] },
  { type: 'sort', data: { question: '語句を並べ替えて「これは彼のかばんです。」という文を完成させなさい。', options: ['This', 'is', 'his', 'bag', '.'] }, answer: ['This', 'is', 'his', 'bag', '.'] },
  { type: 'sort', data: { question: '語句を並べ替えて「彼女の母は医者です。」という文を完成させなさい。', options: ['Her', 'mother', 'is', 'a', 'doctor', '.'] }, answer: ['Her', 'mother', 'is', 'a', 'doctor', '.'] },
  { type: 'sort', data: { question: '語句を並べ替えて「私たちの先生はとても親切です。」という文を完成させなさい。', options: ['Our', 'teacher', 'is', 'very', 'kind', '.'] }, answer: ['Our', 'teacher', 'is', 'very', 'kind', '.'] },
  { type: 'sort', data: { question: '語句を並べ替えて「そのペンは私のものです。」という文を完成させなさい。', options: ['The', 'pen', 'is', 'mine', '.'] }, answer: ['The', 'pen', 'is', 'mine', '.'] },
  { type: 'sort', data: { question: '語句を並べ替えて「あの自転車は彼のものですか？」という文を完成させなさい。', options: ['Is', 'that', 'bike', 'his', '?'] }, answer: ['Is', 'that', 'bike', 'his', '?'] },
  { type: 'sort', data: { question: '語句を並べ替えて「彼らは私たちに英語を教えてくれます。」という文を完成させなさい。', options: ['They', 'teach', 'us', 'English', '.'] }, answer: ['They', 'teach', 'us', 'English', '.'] },
  { type: 'sort', data: { question: '語句を並べ替えて「私はあなたを愛しています。」という文を完成させなさい。', options: ['I', 'love', 'you', '.'] }, answer: ['I', 'love', 'you', '.'] },
  { type: 'sort', data: { question: '語句を並べ替えて「彼女は彼に手紙を書きました。」という文を完成させなさい。', options: ['She', 'wrote', 'a', 'letter', 'to', 'him', '.'] }, answer: ['She', 'wrote', 'a', 'letter', 'to', 'him', '.'] },
  { type: 'sort', data: { question: '語句を並べ替えて「それは彼らのものですか？」という文を完成させなさい。', options: ['Is', 'it', 'theirs', '?'] }, answer: ['Is', 'it', 'theirs', '?'] },
  { type: 'sort', data: { question: '語句を並べ替えて「私の父は毎朝新聞を読みます。」という文を完成させなさい。', options: ['My', 'father', 'reads', 'the', 'newspaper', 'every', 'morning', '.'] }, answer: ['My', 'father', 'reads', 'the', 'newspaper', 'every', 'morning', '.'] },
];
