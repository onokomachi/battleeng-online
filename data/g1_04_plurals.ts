import type { Problem } from '../types';

export const pluralProblems: Problem[] = [
  // --- SELECT problems (regular -s plurals) ---
  { type: 'select', data: { question: '次の名詞の複数形として正しいものを選びなさい: book', options: ['books', 'bookes', 'bookies', 'booksies'] }, answer: 'books' },
  { type: 'select', data: { question: '次の名詞の複数形として正しいものを選びなさい: pen', options: ['pens', 'penes', 'penies', 'pen'] }, answer: 'pens' },
  { type: 'select', data: { question: '次の名詞の複数形として正しいものを選びなさい: desk', options: ['desks', 'deskes', 'deskies', 'deskes'] }, answer: 'desks' },
  { type: 'select', data: { question: '次の名詞の複数形として正しいものを選びなさい: cat', options: ['cats', 'cates', 'caties', 'catses'] }, answer: 'cats' },
  { type: 'select', data: { question: '次の名詞の複数形として正しいものを選びなさい: dog', options: ['dogs', 'doges', 'dogies', 'dogses'] }, answer: 'dogs' },

  // --- SELECT problems (-es plurals) ---
  { type: 'select', data: { question: '次の名詞の複数形として正しいものを選びなさい: bus', options: ['buses', 'buss', 'busies', 'buse'] }, answer: 'buses' },
  { type: 'select', data: { question: '次の名詞の複数形として正しいものを選びなさい: box', options: ['boxes', 'boxs', 'boxies', 'boxe'] }, answer: 'boxes' },
  { type: 'select', data: { question: '次の名詞の複数形として正しいものを選びなさい: dish', options: ['dishes', 'dishs', 'dishies', 'dish'] }, answer: 'dishes' },
  { type: 'select', data: { question: '次の名詞の複数形として正しいものを選びなさい: watch', options: ['watches', 'watchs', 'watchies', 'watch'] }, answer: 'watches' },
  { type: 'select', data: { question: '次の名詞の複数形として正しいものを選びなさい: class', options: ['classes', 'classs', 'classies', 'class'] }, answer: 'classes' },
  { type: 'select', data: { question: '次の名詞の複数形として正しいものを選びなさい: tomato', options: ['tomatoes', 'tomatos', 'tomatoies', 'tomato'] }, answer: 'tomatoes' },

  // --- SELECT problems (y→ies) ---
  { type: 'select', data: { question: '次の名詞の複数形として正しいものを選びなさい: city', options: ['cities', 'citys', 'cityes', 'city'] }, answer: 'cities' },
  { type: 'select', data: { question: '次の名詞の複数形として正しいものを選びなさい: baby', options: ['babies', 'babys', 'babyes', 'baby'] }, answer: 'babies' },
  { type: 'select', data: { question: '次の名詞の複数形として正しいものを選びなさい: library', options: ['libraries', 'librarys', 'libraryes', 'library'] }, answer: 'libraries' },
  { type: 'select', data: { question: '次の名詞の複数形として正しいものを選びなさい: country', options: ['countries', 'countrys', 'countryes', 'country'] }, answer: 'countries' },

  // --- SELECT problems (irregular plurals) ---
  { type: 'select', data: { question: '次の名詞の複数形として正しいものを選びなさい: child', options: ['children', 'childs', 'childes', 'childies'] }, answer: 'children' },
  { type: 'select', data: { question: '次の名詞の複数形として正しいものを選びなさい: man', options: ['men', 'mans', 'manes', 'manies'] }, answer: 'men' },
  { type: 'select', data: { question: '次の名詞の複数形として正しいものを選びなさい: woman', options: ['women', 'womans', 'womanes', 'womanies'] }, answer: 'women' },
  { type: 'select', data: { question: '次の名詞の複数形として正しいものを選びなさい: foot', options: ['feet', 'foots', 'footes', 'footies'] }, answer: 'feet' },
  { type: 'select', data: { question: '次の名詞の複数形として正しいものを選びなさい: tooth', options: ['teeth', 'tooths', 'toothes', 'toothies'] }, answer: 'teeth' },
  { type: 'select', data: { question: '次の名詞の複数形として正しいものを選びなさい: mouse', options: ['mice', 'mouses', 'mices', 'mouse'] }, answer: 'mice' },
  { type: 'select', data: { question: '次の名詞の複数形として正しいものを選びなさい: fish', options: ['fish', 'fishs', 'fishes', 'fishies'] }, answer: 'fish' },
  { type: 'select', data: { question: '次の名詞の複数形として正しいものを選びなさい: sheep', options: ['sheep', 'sheeps', 'sheepes', 'sheepies'] }, answer: 'sheep' },

  // --- INPUT problems (write the plural form) ---
  { type: 'input', data: { question: '次の名詞の複数形を書きなさい。', japanese: 'book' }, answer: 'books' },
  { type: 'input', data: { question: '次の名詞の複数形を書きなさい。', japanese: 'pen' }, answer: 'pens' },
  { type: 'input', data: { question: '次の名詞の複数形を書きなさい。', japanese: 'box' }, answer: 'boxes' },
  { type: 'input', data: { question: '次の名詞の複数形を書きなさい。', japanese: 'bus' }, answer: 'buses' },
  { type: 'input', data: { question: '次の名詞の複数形を書きなさい。', japanese: 'dish' }, answer: 'dishes' },
  { type: 'input', data: { question: '次の名詞の複数形を書きなさい。', japanese: 'watch' }, answer: 'watches' },
  { type: 'input', data: { question: '次の名詞の複数形を書きなさい。', japanese: 'city' }, answer: 'cities' },
  { type: 'input', data: { question: '次の名詞の複数形を書きなさい。', japanese: 'baby' }, answer: 'babies' },
  { type: 'input', data: { question: '次の名詞の複数形を書きなさい。', japanese: 'library' }, answer: 'libraries' },
  { type: 'input', data: { question: '次の名詞の複数形を書きなさい。', japanese: 'child' }, answer: 'children' },
  { type: 'input', data: { question: '次の名詞の複数形を書きなさい。', japanese: 'man' }, answer: 'men' },
  { type: 'input', data: { question: '次の名詞の複数形を書きなさい。', japanese: 'woman' }, answer: 'women' },
  { type: 'input', data: { question: '次の名詞の複数形を書きなさい。', japanese: 'foot' }, answer: 'feet' },
  { type: 'input', data: { question: '次の名詞の複数形を書きなさい。', japanese: 'tooth' }, answer: 'teeth' },
  { type: 'input', data: { question: '次の名詞の複数形を書きなさい。', japanese: 'mouse' }, answer: 'mice' },
  { type: 'input', data: { question: '次の名詞の複数形を書きなさい。', japanese: 'fish' }, answer: 'fish' },
  { type: 'input', data: { question: '次の名詞の複数形を書きなさい。', japanese: 'sheep' }, answer: 'sheep' },

  // --- INPUT problems (fill-in-the-blank sentences) ---
  { type: 'input', data: { question: '（　）に適切な語を入れなさい: I have two (　). ※ cat の複数形', japanese: '' }, answer: 'cats' },
  { type: 'input', data: { question: '（　）に適切な語を入れなさい: There are many (　) in this town. ※ library の複数形', japanese: '' }, answer: 'libraries' },
  { type: 'input', data: { question: '（　）に適切な語を入れなさい: The (　) are playing in the park. ※ child の複数形', japanese: '' }, answer: 'children' },
  { type: 'input', data: { question: '（　）に適切な語を入れなさい: I brush my (　) twice a day. ※ tooth の複数形', japanese: '' }, answer: 'teeth' },
  { type: 'input', data: { question: '（　）に適切な語を入れなさい: How many (　) are there on the farm? ※ sheep の複数形', japanese: '' }, answer: 'sheep' },
  { type: 'input', data: { question: '（　）に適切な語を入れなさい: Many (　) work in this city. ※ man の複数形', japanese: '' }, answer: 'men' },

  // --- SORT problems ---
  { type: 'sort', data: { question: '語句を並べ替えて「私は三冊の本を持っています。」という文を完成させなさい。', options: ['I', 'have', 'three', 'books', '.'] }, answer: ['I', 'have', 'three', 'books', '.'] },
  { type: 'sort', data: { question: '語句を並べ替えて「教室にはたくさんの机があります。」という文を完成させなさい。', options: ['There', 'are', 'many', 'desks', 'in', 'the', 'classroom', '.'] }, answer: ['There', 'are', 'many', 'desks', 'in', 'the', 'classroom', '.'] },
  { type: 'sort', data: { question: '語句を並べ替えて「公園に子どもたちがいます。」という文を完成させなさい。', options: ['There', 'are', 'children', 'in', 'the', 'park', '.'] }, answer: ['There', 'are', 'children', 'in', 'the', 'park', '.'] },
  { type: 'sort', data: { question: '語句を並べ替えて「私はバスを二台見ました。」という文を完成させなさい。', options: ['I', 'saw', 'two', 'buses', '.'] }, answer: ['I', 'saw', 'two', 'buses', '.'] },
  { type: 'sort', data: { question: '語句を並べ替えて「あの女性たちは先生です。」という文を完成させなさい。', options: ['Those', 'women', 'are', 'teachers', '.'] }, answer: ['Those', 'women', 'are', 'teachers', '.'] },
  { type: 'sort', data: { question: '語句を並べ替えて「私は毎日歯を磨きます。」という文を完成させなさい。', options: ['I', 'brush', 'my', 'teeth', 'every', 'day', '.'] }, answer: ['I', 'brush', 'my', 'teeth', 'every', 'day', '.'] },
  { type: 'sort', data: { question: '語句を並べ替えて「この国には多くの都市があります。」という文を完成させなさい。', options: ['This', 'country', 'has', 'many', 'cities', '.'] }, answer: ['This', 'country', 'has', 'many', 'cities', '.'] },
  { type: 'sort', data: { question: '語句を並べ替えて「池にたくさんの魚がいます。」という文を完成させなさい。', options: ['There', 'are', 'many', 'fish', 'in', 'the', 'pond', '.'] }, answer: ['There', 'are', 'many', 'fish', 'in', 'the', 'pond', '.'] },
  { type: 'sort', data: { question: '語句を並べ替えて「私は箱をいくつか持っています。」という文を完成させなさい。', options: ['I', 'have', 'some', 'boxes', '.'] }, answer: ['I', 'have', 'some', 'boxes', '.'] },
  { type: 'sort', data: { question: '語句を並べ替えて「その赤ちゃんたちはとてもかわいい。」という文を完成させなさい。', options: ['The', 'babies', 'are', 'very', 'cute', '.'] }, answer: ['The', 'babies', 'are', 'very', 'cute', '.'] },
  { type: 'sort', data: { question: '語句を並べ替えて「何人の男性がその部屋にいますか？」という文を完成させなさい。', options: ['How', 'many', 'men', 'are', 'in', 'the', 'room', '?'] }, answer: ['How', 'many', 'men', 'are', 'in', 'the', 'room', '?'] },
  { type: 'sort', data: { question: '語句を並べ替えて「農場にはたくさんの羊がいます。」という文を完成させなさい。', options: ['There', 'are', 'many', 'sheep', 'on', 'the', 'farm', '.'] }, answer: ['There', 'are', 'many', 'sheep', 'on', 'the', 'farm', '.'] },
];
