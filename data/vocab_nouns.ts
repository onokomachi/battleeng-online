import type { Problem } from '../types';

export const vocabNounProblems: Problem[] = [
  // age（年齢）
  { type: 'select', data: { question: '「age」の意味を選びなさい。', options: ['年齢', '住所', '名前', '身長'] }, answer: '年齢' },
  { type: 'select', data: { question: '「年齢」を表す英語を選びなさい。', japanese: '年齢', options: ['height', 'age', 'name', 'address'] }, answer: 'age' },
  { type: 'input', data: { question: '「年齢」を英語で書きなさい。', japanese: '年齢' }, answer: 'age' },

  // air（空気）
  { type: 'select', data: { question: '「air」の意味を選びなさい。', options: ['土', '水', '空気', '火'] }, answer: '空気' },
  { type: 'select', data: { question: '「空気」を表す英語を選びなさい。', japanese: '空気', options: ['water', 'fire', 'air', 'earth'] }, answer: 'air' },
  { type: 'input', data: { question: '「空気」を英語で書きなさい。', japanese: '空気' }, answer: 'air' },

  // animal（動物）
  { type: 'select', data: { question: '「animal」の意味を選びなさい。', options: ['植物', '昆虫', '魚', '動物'] }, answer: '動物' },
  { type: 'select', data: { question: '「動物」を表す英語を選びなさい。', japanese: '動物', options: ['insect', 'plant', 'animal', 'bird'] }, answer: 'animal' },
  { type: 'input', data: { question: '「動物」を英語で書きなさい。', japanese: '動物' }, answer: 'animal' },

  // art（芸術）
  { type: 'select', data: { question: '「art」の意味を選びなさい。', options: ['音楽', '芸術', '科学', '歴史'] }, answer: '芸術' },
  { type: 'select', data: { question: '「芸術」を表す英語を選びなさい。', japanese: '芸術', options: ['music', 'science', 'art', 'history'] }, answer: 'art' },
  { type: 'input', data: { question: '「芸術」を英語で書きなさい。', japanese: '芸術' }, answer: 'art' },

  // beach（浜辺）
  { type: 'select', data: { question: '「beach」の意味を選びなさい。', options: ['山', '川', '浜辺', '森'] }, answer: '浜辺' },
  { type: 'select', data: { question: '「浜辺」を表す英語を選びなさい。', japanese: '浜辺', options: ['mountain', 'river', 'forest', 'beach'] }, answer: 'beach' },
  { type: 'input', data: { question: '「浜辺」を英語で書きなさい。', japanese: '浜辺' }, answer: 'beach' },

  // bridge（橋）
  { type: 'select', data: { question: '「bridge」の意味を選びなさい。', options: ['道路', '橋', '駅', '空港'] }, answer: '橋' },
  { type: 'select', data: { question: '「橋」を表す英語を選びなさい。', japanese: '橋', options: ['road', 'station', 'bridge', 'airport'] }, answer: 'bridge' },
  { type: 'input', data: { question: '「橋」を英語で書きなさい。', japanese: '橋' }, answer: 'bridge' },

  // building（建物）
  { type: 'select', data: { question: '「building」の意味を選びなさい。', options: ['公園', '建物', '広場', '庭'] }, answer: '建物' },
  { type: 'select', data: { question: '「建物」を表す英語を選びなさい。', japanese: '建物', options: ['garden', 'park', 'building', 'street'] }, answer: 'building' },
  { type: 'input', data: { question: '「建物」を英語で書きなさい。', japanese: '建物' }, answer: 'building' },

  // chance（チャンス・機会）
  { type: 'select', data: { question: '「chance」の意味を選びなさい。', options: ['危険', '問題', '機会', '結果'] }, answer: '機会' },
  { type: 'select', data: { question: '「機会」を表す英語を選びなさい。', japanese: '機会', options: ['danger', 'result', 'chance', 'problem'] }, answer: 'chance' },
  { type: 'input', data: { question: '「機会」を英語で書きなさい。', japanese: '機会' }, answer: 'chance' },

  // city（都市）
  { type: 'select', data: { question: '「city」の意味を選びなさい。', options: ['村', '町', '都市', '国'] }, answer: '都市' },
  { type: 'select', data: { question: '「都市」を表す英語を選びなさい。', japanese: '都市', options: ['village', 'town', 'city', 'country'] }, answer: 'city' },
  { type: 'input', data: { question: '「都市」を英語で書きなさい。', japanese: '都市' }, answer: 'city' },

  // club（クラブ・部活）
  { type: 'select', data: { question: '「club」の意味を選びなさい。', options: ['授業', 'クラブ', '学校', '試合'] }, answer: 'クラブ' },
  { type: 'select', data: { question: '「クラブ」を表す英語を選びなさい。', japanese: 'クラブ', options: ['school', 'lesson', 'club', 'team'] }, answer: 'club' },
  { type: 'input', data: { question: '「クラブ」を英語で書きなさい。', japanese: 'クラブ' }, answer: 'club' },

  // culture（文化）
  { type: 'select', data: { question: '「culture」の意味を選びなさい。', options: ['科学', '自然', '文化', '言語'] }, answer: '文化' },
  { type: 'select', data: { question: '「文化」を表す英語を選びなさい。', japanese: '文化', options: ['nature', 'science', 'culture', 'language'] }, answer: 'culture' },
  { type: 'input', data: { question: '「文化」を英語で書きなさい。', japanese: '文化' }, answer: 'culture' },

  // dream（夢）
  { type: 'select', data: { question: '「dream」の意味を選びなさい。', options: ['目標', '夢', '希望', '願い'] }, answer: '夢' },
  { type: 'select', data: { question: '「夢」を表す英語を選びなさい。', japanese: '夢', options: ['goal', 'hope', 'wish', 'dream'] }, answer: 'dream' },
  { type: 'input', data: { question: '「夢」を英語で書きなさい。', japanese: '夢' }, answer: 'dream' },

  // earth（地球）
  { type: 'select', data: { question: '「earth」の意味を選びなさい。', options: ['月', '太陽', '宇宙', '地球'] }, answer: '地球' },
  { type: 'select', data: { question: '「地球」を表す英語を選びなさい。', japanese: '地球', options: ['moon', 'sun', 'earth', 'space'] }, answer: 'earth' },
  { type: 'input', data: { question: '「地球」を英語で書きなさい。', japanese: '地球' }, answer: 'earth' },

  // energy（エネルギー）
  { type: 'select', data: { question: '「energy」の意味を選びなさい。', options: ['力', 'エネルギー', '電気', '速度'] }, answer: 'エネルギー' },
  { type: 'select', data: { question: '「エネルギー」を表す英語を選びなさい。', japanese: 'エネルギー', options: ['power', 'speed', 'energy', 'electricity'] }, answer: 'energy' },
  { type: 'input', data: { question: '「エネルギー」を英語で書きなさい。', japanese: 'エネルギー' }, answer: 'energy' },

  // environment（環境）
  { type: 'select', data: { question: '「environment」の意味を選びなさい。', options: ['社会', '自然', '環境', '気候'] }, answer: '環境' },
  { type: 'select', data: { question: '「環境」を表す英語を選びなさい。', japanese: '環境', options: ['nature', 'society', 'environment', 'climate'] }, answer: 'environment' },
  { type: 'input', data: { question: '「環境」を英語で書きなさい。', japanese: '環境' }, answer: 'environment' },

  // event（イベント・行事）
  { type: 'select', data: { question: '「event」の意味を選びなさい。', options: ['練習', 'イベント', '授業', '試験'] }, answer: 'イベント' },
  { type: 'select', data: { question: '「イベント」を表す英語を選びなさい。', japanese: 'イベント', options: ['practice', 'lesson', 'event', 'exam'] }, answer: 'event' },
  { type: 'input', data: { question: '「イベント」を英語で書きなさい。', japanese: 'イベント' }, answer: 'event' },

  // example（例）
  { type: 'select', data: { question: '「example」の意味を選びなさい。', options: ['答え', '理由', '例', '問題'] }, answer: '例' },
  { type: 'select', data: { question: '「例」を表す英語を選びなさい。', japanese: '例', options: ['answer', 'reason', 'example', 'question'] }, answer: 'example' },
  { type: 'input', data: { question: '「例」を英語で書きなさい。', japanese: '例' }, answer: 'example' },

  // experience（経験）
  { type: 'select', data: { question: '「experience」の意味を選びなさい。', options: ['知識', '経験', '練習', '技術'] }, answer: '経験' },
  { type: 'select', data: { question: '「経験」を表す英語を選びなさい。', japanese: '経験', options: ['knowledge', 'skill', 'practice', 'experience'] }, answer: 'experience' },
  { type: 'input', data: { question: '「経験」を英語で書きなさい。', japanese: '経験' }, answer: 'experience' },

  // fact（事実）
  { type: 'select', data: { question: '「fact」の意味を選びなさい。', options: ['意見', '真実', '事実', 'ニュース'] }, answer: '事実' },
  { type: 'select', data: { question: '「事実」を表す英語を選びなさい。', japanese: '事実', options: ['opinion', 'truth', 'fact', 'news'] }, answer: 'fact' },
  { type: 'input', data: { question: '「事実」を英語で書きなさい。', japanese: '事実' }, answer: 'fact' },

  // festival（祭り）
  { type: 'select', data: { question: '「festival」の意味を選びなさい。', options: ['パーティー', 'コンサート', '祭り', '旅行'] }, answer: '祭り' },
  { type: 'select', data: { question: '「祭り」を表す英語を選びなさい。', japanese: '祭り', options: ['party', 'concert', 'festival', 'trip'] }, answer: 'festival' },
  { type: 'input', data: { question: '「祭り」を英語で書きなさい。', japanese: '祭り' }, answer: 'festival' },

  // forest（森）
  { type: 'select', data: { question: '「forest」の意味を選びなさい。', options: ['砂漠', '森', '草原', '海'] }, answer: '森' },
  { type: 'select', data: { question: '「森」を表す英語を選びなさい。', japanese: '森', options: ['desert', 'ocean', 'forest', 'field'] }, answer: 'forest' },
  { type: 'input', data: { question: '「森」を英語で書きなさい。', japanese: '森' }, answer: 'forest' },

  // future（未来）
  { type: 'select', data: { question: '「future」の意味を選びなさい。', options: ['過去', '現在', '未来', '歴史'] }, answer: '未来' },
  { type: 'select', data: { question: '「未来」を表す英語を選びなさい。', japanese: '未来', options: ['past', 'present', 'future', 'history'] }, answer: 'future' },
  { type: 'input', data: { question: '「未来」を英語で書きなさい。', japanese: '未来' }, answer: 'future' },

  // goal（目標）
  { type: 'select', data: { question: '「goal」の意味を選びなさい。', options: ['夢', '計画', '結果', '目標'] }, answer: '目標' },
  { type: 'select', data: { question: '「目標」を表す英語を選びなさい。', japanese: '目標', options: ['dream', 'plan', 'result', 'goal'] }, answer: 'goal' },
  { type: 'input', data: { question: '「目標」を英語で書きなさい。', japanese: '目標' }, answer: 'goal' },

  // group（グループ）
  { type: 'select', data: { question: '「group」の意味を選びなさい。', options: ['チーム', 'グループ', 'クラス', '家族'] }, answer: 'グループ' },
  { type: 'select', data: { question: '「グループ」を表す英語を選びなさい。', japanese: 'グループ', options: ['team', 'class', 'group', 'family'] }, answer: 'group' },
  { type: 'input', data: { question: '「グループ」を英語で書きなさい。', japanese: 'グループ' }, answer: 'group' },

  // health（健康）
  { type: 'select', data: { question: '「health」の意味を選びなさい。', options: ['運動', '病気', '健康', '食事'] }, answer: '健康' },
  { type: 'select', data: { question: '「健康」を表す英語を選びなさい。', japanese: '健康', options: ['exercise', 'illness', 'health', 'diet'] }, answer: 'health' },
  { type: 'input', data: { question: '「健康」を英語で書きなさい。', japanese: '健康' }, answer: 'health' },

  // history（歴史）
  { type: 'select', data: { question: '「history」の意味を選びなさい。', options: ['地理', '科学', '歴史', '文化'] }, answer: '歴史' },
  { type: 'select', data: { question: '「歴史」を表す英語を選びなさい。', japanese: '歴史', options: ['geography', 'science', 'history', 'culture'] }, answer: 'history' },
  { type: 'input', data: { question: '「歴史」を英語で書きなさい。', japanese: '歴史' }, answer: 'history' },

  // hobby（趣味）
  { type: 'select', data: { question: '「hobby」の意味を選びなさい。', options: ['仕事', '趣味', 'スポーツ', '勉強'] }, answer: '趣味' },
  { type: 'select', data: { question: '「趣味」を表す英語を選びなさい。', japanese: '趣味', options: ['job', 'sport', 'hobby', 'study'] }, answer: 'hobby' },
  { type: 'input', data: { question: '「趣味」を英語で書きなさい。', japanese: '趣味' }, answer: 'hobby' },

  // holiday（休日）
  { type: 'select', data: { question: '「holiday」の意味を選びなさい。', options: ['旅行', '休日', '週末', '夏休み'] }, answer: '休日' },
  { type: 'select', data: { question: '「休日」を表す英語を選びなさい。', japanese: '休日', options: ['trip', 'weekend', 'holiday', 'vacation'] }, answer: 'holiday' },
  { type: 'input', data: { question: '「休日」を英語で書きなさい。', japanese: '休日' }, answer: 'holiday' },

  // hospital（病院）
  { type: 'select', data: { question: '「hospital」の意味を選びなさい。', options: ['学校', '図書館', '病院', '博物館'] }, answer: '病院' },
  { type: 'select', data: { question: '「病院」を表す英語を選びなさい。', japanese: '病院', options: ['school', 'library', 'hospital', 'museum'] }, answer: 'hospital' },
  { type: 'input', data: { question: '「病院」を英語で書きなさい。', japanese: '病院' }, answer: 'hospital' },

  // idea（考え・アイデア）
  { type: 'select', data: { question: '「idea」の意味を選びなさい。', options: ['意見', '考え', '感想', '答え'] }, answer: '考え' },
  { type: 'select', data: { question: '「考え」を表す英語を選びなさい。', japanese: '考え', options: ['opinion', 'feeling', 'idea', 'answer'] }, answer: 'idea' },
  { type: 'input', data: { question: '「考え」を英語で書きなさい。', japanese: '考え' }, answer: 'idea' },

  // island（島）
  { type: 'select', data: { question: '「island」の意味を選びなさい。', options: ['半島', '大陸', '島', '海岸'] }, answer: '島' },
  { type: 'select', data: { question: '「島」を表す英語を選びなさい。', japanese: '島', options: ['peninsula', 'continent', 'island', 'coast'] }, answer: 'island' },
  { type: 'input', data: { question: '「島」を英語で書きなさい。', japanese: '島' }, answer: 'island' },

  // job（仕事）
  { type: 'select', data: { question: '「job」の意味を選びなさい。', options: ['趣味', '仕事', '夢', '生活'] }, answer: '仕事' },
  { type: 'select', data: { question: '「仕事」を表す英語を選びなさい。', japanese: '仕事', options: ['hobby', 'dream', 'job', 'life'] }, answer: 'job' },
  { type: 'input', data: { question: '「仕事」を英語で書きなさい。', japanese: '仕事' }, answer: 'job' },

  // language（言語）
  { type: 'select', data: { question: '「language」の意味を選びなさい。', options: ['文化', '国', '言語', '文字'] }, answer: '言語' },
  { type: 'select', data: { question: '「言語」を表す英語を選びなさい。', japanese: '言語', options: ['culture', 'country', 'language', 'word'] }, answer: 'language' },
  { type: 'input', data: { question: '「言語」を英語で書きなさい。', japanese: '言語' }, answer: 'language' },

  // leader（リーダー）
  { type: 'select', data: { question: '「leader」の意味を選びなさい。', options: ['メンバー', 'リーダー', 'ボランティア', 'プレーヤー'] }, answer: 'リーダー' },
  { type: 'select', data: { question: '「リーダー」を表す英語を選びなさい。', japanese: 'リーダー', options: ['member', 'volunteer', 'player', 'leader'] }, answer: 'leader' },
  { type: 'input', data: { question: '「リーダー」を英語で書きなさい。', japanese: 'リーダー' }, answer: 'leader' },

  // letter（手紙）
  { type: 'select', data: { question: '「letter」の意味を選びなさい。', options: ['メール', '手紙', 'メッセージ', '日記'] }, answer: '手紙' },
  { type: 'select', data: { question: '「手紙」を表す英語を選びなさい。', japanese: '手紙', options: ['email', 'message', 'letter', 'diary'] }, answer: 'letter' },
  { type: 'input', data: { question: '「手紙」を英語で書きなさい。', japanese: '手紙' }, answer: 'letter' },

  // library（図書館）
  { type: 'select', data: { question: '「library」の意味を選びなさい。', options: ['本屋', '博物館', '図書館', '美術館'] }, answer: '図書館' },
  { type: 'select', data: { question: '「図書館」を表す英語を選びなさい。', japanese: '図書館', options: ['bookstore', 'museum', 'library', 'gallery'] }, answer: 'library' },
  { type: 'input', data: { question: '「図書館」を英語で書きなさい。', japanese: '図書館' }, answer: 'library' },

  // life（生活）
  { type: 'select', data: { question: '「life」の意味を選びなさい。', options: ['仕事', '健康', '生活', '旅行'] }, answer: '生活' },
  { type: 'select', data: { question: '「生活」を表す英語を選びなさい。', japanese: '生活', options: ['job', 'health', 'life', 'trip'] }, answer: 'life' },
  { type: 'input', data: { question: '「生活」を英語で書きなさい。', japanese: '生活' }, answer: 'life' },

  // member（メンバー）
  { type: 'select', data: { question: '「member」の意味を選びなさい。', options: ['リーダー', 'メンバー', 'ボランティア', 'キャプテン'] }, answer: 'メンバー' },
  { type: 'select', data: { question: '「メンバー」を表す英語を選びなさい。', japanese: 'メンバー', options: ['leader', 'volunteer', 'member', 'captain'] }, answer: 'member' },
  { type: 'input', data: { question: '「メンバー」を英語で書きなさい。', japanese: 'メンバー' }, answer: 'member' },

  // message（メッセージ）
  { type: 'select', data: { question: '「message」の意味を選びなさい。', options: ['手紙', '日記', 'メッセージ', '本'] }, answer: 'メッセージ' },
  { type: 'select', data: { question: '「メッセージ」を表す英語を選びなさい。', japanese: 'メッセージ', options: ['letter', 'diary', 'message', 'book'] }, answer: 'message' },
  { type: 'input', data: { question: '「メッセージ」を英語で書きなさい。', japanese: 'メッセージ' }, answer: 'message' },

  // museum（博物館）
  { type: 'select', data: { question: '「museum」の意味を選びなさい。', options: ['図書館', '病院', '博物館', '学校'] }, answer: '博物館' },
  { type: 'select', data: { question: '「博物館」を表す英語を選びなさい。', japanese: '博物館', options: ['library', 'hospital', 'museum', 'school'] }, answer: 'museum' },
  { type: 'input', data: { question: '「博物館」を英語で書きなさい。', japanese: '博物館' }, answer: 'museum' },

  // nature（自然）
  { type: 'select', data: { question: '「nature」の意味を選びなさい。', options: ['文化', '環境', '自然', '宇宙'] }, answer: '自然' },
  { type: 'select', data: { question: '「自然」を表す英語を選びなさい。', japanese: '自然', options: ['culture', 'environment', 'nature', 'space'] }, answer: 'nature' },
  { type: 'input', data: { question: '「自然」を英語で書きなさい。', japanese: '自然' }, answer: 'nature' },

  // news（ニュース）
  { type: 'select', data: { question: '「news」の意味を選びなさい。', options: ['情報', 'ニュース', '知識', '話題'] }, answer: 'ニュース' },
  { type: 'select', data: { question: '「ニュース」を表す英語を選びなさい。', japanese: 'ニュース', options: ['information', 'knowledge', 'news', 'topic'] }, answer: 'news' },
  { type: 'input', data: { question: '「ニュース」を英語で書きなさい。', japanese: 'ニュース' }, answer: 'news' },

  // opinion（意見）
  { type: 'select', data: { question: '「opinion」の意味を選びなさい。', options: ['事実', '感想', '意見', '考え'] }, answer: '意見' },
  { type: 'select', data: { question: '「意見」を表す英語を選びなさい。', japanese: '意見', options: ['fact', 'feeling', 'opinion', 'idea'] }, answer: 'opinion' },
  { type: 'input', data: { question: '「意見」を英語で書きなさい。', japanese: '意見' }, answer: 'opinion' },

  // peace（平和）
  { type: 'select', data: { question: '「peace」の意味を選びなさい。', options: ['戦争', '平和', '自由', '安全'] }, answer: '平和' },
  { type: 'select', data: { question: '「平和」を表す英語を選びなさい。', japanese: '平和', options: ['war', 'freedom', 'peace', 'safety'] }, answer: 'peace' },
  { type: 'input', data: { question: '「平和」を英語で書きなさい。', japanese: '平和' }, answer: 'peace' },

  // plan（計画）
  { type: 'select', data: { question: '「plan」の意味を選びなさい。', options: ['夢', '目標', '計画', '予定表'] }, answer: '計画' },
  { type: 'select', data: { question: '「計画」を表す英語を選びなさい。', japanese: '計画', options: ['dream', 'goal', 'plan', 'schedule'] }, answer: 'plan' },
  { type: 'input', data: { question: '「計画」を英語で書きなさい。', japanese: '計画' }, answer: 'plan' },

  // player（選手）
  { type: 'select', data: { question: '「player」の意味を選びなさい。', options: ['コーチ', 'リーダー', '選手', '観客'] }, answer: '選手' },
  { type: 'select', data: { question: '「選手」を表す英語を選びなさい。', japanese: '選手', options: ['coach', 'leader', 'player', 'audience'] }, answer: 'player' },
  { type: 'input', data: { question: '「選手」を英語で書きなさい。', japanese: '選手' }, answer: 'player' },

  // problem（問題）
  { type: 'select', data: { question: '「problem」の意味を選びなさい。', options: ['質問', '答え', '問題', '理由'] }, answer: '問題' },
  { type: 'select', data: { question: '「問題」を表す英語を選びなさい。', japanese: '問題', options: ['question', 'answer', 'problem', 'reason'] }, answer: 'problem' },
  { type: 'input', data: { question: '「問題」を英語で書きなさい。', japanese: '問題' }, answer: 'problem' },

  // reason（理由）
  { type: 'select', data: { question: '「reason」の意味を選びなさい。', options: ['結果', '意見', '理由', '例'] }, answer: '理由' },
  { type: 'select', data: { question: '「理由」を表す英語を選びなさい。', japanese: '理由', options: ['result', 'opinion', 'reason', 'example'] }, answer: 'reason' },
  { type: 'input', data: { question: '「理由」を英語で書きなさい。', japanese: '理由' }, answer: 'reason' },

  // result（結果）
  { type: 'select', data: { question: '「result」の意味を選びなさい。', options: ['理由', '過程', '結果', '目標'] }, answer: '結果' },
  { type: 'select', data: { question: '「結果」を表す英語を選びなさい。', japanese: '結果', options: ['reason', 'process', 'result', 'goal'] }, answer: 'result' },
  { type: 'input', data: { question: '「結果」を英語で書きなさい。', japanese: '結果' }, answer: 'result' },

  // river（川）
  { type: 'select', data: { question: '「river」の意味を選びなさい。', options: ['湖', '海', '川', '池'] }, answer: '川' },
  { type: 'select', data: { question: '「川」を表す英語を選びなさい。', japanese: '川', options: ['lake', 'ocean', 'river', 'pond'] }, answer: 'river' },
  { type: 'input', data: { question: '「川」を英語で書きなさい。', japanese: '川' }, answer: 'river' },

  // road（道路）
  { type: 'select', data: { question: '「road」の意味を選びなさい。', options: ['橋', '駅', '道路', '空港'] }, answer: '道路' },
  { type: 'select', data: { question: '「道路」を表す英語を選びなさい。', japanese: '道路', options: ['bridge', 'station', 'road', 'airport'] }, answer: 'road' },
  { type: 'input', data: { question: '「道路」を英語で書きなさい。', japanese: '道路' }, answer: 'road' },

  // rule（ルール）
  { type: 'select', data: { question: '「rule」の意味を選びなさい。', options: ['法律', 'ルール', '約束', '命令'] }, answer: 'ルール' },
  { type: 'select', data: { question: '「ルール」を表す英語を選びなさい。', japanese: 'ルール', options: ['law', 'promise', 'rule', 'order'] }, answer: 'rule' },
  { type: 'input', data: { question: '「ルール」を英語で書きなさい。', japanese: 'ルール' }, answer: 'rule' },

  // science（科学）
  { type: 'select', data: { question: '「science」の意味を選びなさい。', options: ['歴史', '芸術', '科学', '音楽'] }, answer: '科学' },
  { type: 'select', data: { question: '「科学」を表す英語を選びなさい。', japanese: '科学', options: ['history', 'art', 'science', 'music'] }, answer: 'science' },
  { type: 'input', data: { question: '「科学」を英語で書きなさい。', japanese: '科学' }, answer: 'science' },

  // season（季節）
  { type: 'select', data: { question: '「season」の意味を選びなさい。', options: ['天気', '月', '季節', '年'] }, answer: '季節' },
  { type: 'select', data: { question: '「季節」を表す英語を選びなさい。', japanese: '季節', options: ['weather', 'month', 'season', 'year'] }, answer: 'season' },
  { type: 'input', data: { question: '「季節」を英語で書きなさい。', japanese: '季節' }, answer: 'season' },

  // skill（技術）
  { type: 'select', data: { question: '「skill」の意味を選びなさい。', options: ['知識', '経験', '技術', '才能'] }, answer: '技術' },
  { type: 'select', data: { question: '「技術」を表す英語を選びなさい。', japanese: '技術', options: ['knowledge', 'experience', 'skill', 'talent'] }, answer: 'skill' },
  { type: 'input', data: { question: '「技術」を英語で書きなさい。', japanese: '技術' }, answer: 'skill' },

  // society（社会）
  { type: 'select', data: { question: '「society」の意味を選びなさい。', options: ['国', '文化', '社会', '世界'] }, answer: '社会' },
  { type: 'select', data: { question: '「社会」を表す英語を選びなさい。', japanese: '社会', options: ['country', 'culture', 'society', 'world'] }, answer: 'society' },
  { type: 'input', data: { question: '「社会」を英語で書きなさい。', japanese: '社会' }, answer: 'society' },

  // space（宇宙）
  { type: 'select', data: { question: '「space」の意味を選びなさい。', options: ['地球', '星', '宇宙', '月'] }, answer: '宇宙' },
  { type: 'select', data: { question: '「宇宙」を表す英語を選びなさい。', japanese: '宇宙', options: ['earth', 'star', 'space', 'moon'] }, answer: 'space' },
  { type: 'input', data: { question: '「宇宙」を英語で書きなさい。', japanese: '宇宙' }, answer: 'space' },

  // speech（スピーチ）
  { type: 'select', data: { question: '「speech」の意味を選びなさい。', options: ['会話', 'スピーチ', '作文', '発音'] }, answer: 'スピーチ' },
  { type: 'select', data: { question: '「スピーチ」を表す英語を選びなさい。', japanese: 'スピーチ', options: ['conversation', 'essay', 'speech', 'pronunciation'] }, answer: 'speech' },
  { type: 'input', data: { question: '「スピーチ」を英語で書きなさい。', japanese: 'スピーチ' }, answer: 'speech' },

  // stage（舞台）
  { type: 'select', data: { question: '「stage」の意味を選びなさい。', options: ['会場', '舞台', '観客席', 'ホール'] }, answer: '舞台' },
  { type: 'select', data: { question: '「舞台」を表す英語を選びなさい。', japanese: '舞台', options: ['hall', 'audience', 'stage', 'venue'] }, answer: 'stage' },
  { type: 'input', data: { question: '「舞台」を英語で書きなさい。', japanese: '舞台' }, answer: 'stage' },

  // success（成功）
  { type: 'select', data: { question: '「success」の意味を選びなさい。', options: ['失敗', '努力', '成功', '運'] }, answer: '成功' },
  { type: 'select', data: { question: '「成功」を表す英語を選びなさい。', japanese: '成功', options: ['failure', 'effort', 'success', 'luck'] }, answer: 'success' },
  { type: 'input', data: { question: '「成功」を英語で書きなさい。', japanese: '成功' }, answer: 'success' },

  // team（チーム）
  { type: 'select', data: { question: '「team」の意味を選びなさい。', options: ['グループ', 'チーム', 'クラブ', '仲間'] }, answer: 'チーム' },
  { type: 'select', data: { question: '「チーム」を表す英語を選びなさい。', japanese: 'チーム', options: ['group', 'club', 'team', 'partner'] }, answer: 'team' },
  { type: 'input', data: { question: '「チーム」を英語で書きなさい。', japanese: 'チーム' }, answer: 'team' },

  // tradition（伝統）
  { type: 'select', data: { question: '「tradition」の意味を選びなさい。', options: ['文化', '歴史', '伝統', '習慣'] }, answer: '伝統' },
  { type: 'select', data: { question: '「伝統」を表す英語を選びなさい。', japanese: '伝統', options: ['culture', 'history', 'tradition', 'custom'] }, answer: 'tradition' },
  { type: 'input', data: { question: '「伝統」を英語で書きなさい。', japanese: '伝統' }, answer: 'tradition' },

  // trip（旅行）
  { type: 'select', data: { question: '「trip」の意味を選びなさい。', options: ['休日', '冒険', '旅行', '遠足'] }, answer: '旅行' },
  { type: 'select', data: { question: '「旅行」を表す英語を選びなさい。', japanese: '旅行', options: ['holiday', 'adventure', 'trip', 'vacation'] }, answer: 'trip' },
  { type: 'input', data: { question: '「旅行」を英語で書きなさい。', japanese: '旅行' }, answer: 'trip' },

  // truth（真実）
  { type: 'select', data: { question: '「truth」の意味を選びなさい。', options: ['事実', '秘密', '真実', 'うそ'] }, answer: '真実' },
  { type: 'select', data: { question: '「真実」を表す英語を選びなさい。', japanese: '真実', options: ['fact', 'secret', 'truth', 'lie'] }, answer: 'truth' },
  { type: 'input', data: { question: '「真実」を英語で書きなさい。', japanese: '真実' }, answer: 'truth' },

  // vacation（休暇）
  { type: 'select', data: { question: '「vacation」の意味を選びなさい。', options: ['旅行', '休日', '休暇', '週末'] }, answer: '休暇' },
  { type: 'select', data: { question: '「休暇」を表す英語を選びなさい。', japanese: '休暇', options: ['trip', 'holiday', 'vacation', 'weekend'] }, answer: 'vacation' },
  { type: 'input', data: { question: '「休暇」を英語で書きなさい。', japanese: '休暇' }, answer: 'vacation' },

  // village（村）
  { type: 'select', data: { question: '「village」の意味を選びなさい。', options: ['都市', '町', '村', '島'] }, answer: '村' },
  { type: 'select', data: { question: '「村」を表す英語を選びなさい。', japanese: '村', options: ['city', 'town', 'village', 'island'] }, answer: 'village' },
  { type: 'input', data: { question: '「村」を英語で書きなさい。', japanese: '村' }, answer: 'village' },

  // voice（声）
  { type: 'select', data: { question: '「voice」の意味を選びなさい。', options: ['音', '声', '言葉', '歌'] }, answer: '声' },
  { type: 'select', data: { question: '「声」を表す英語を選びなさい。', japanese: '声', options: ['sound', 'word', 'voice', 'song'] }, answer: 'voice' },
  { type: 'input', data: { question: '「声」を英語で書きなさい。', japanese: '声' }, answer: 'voice' },

  // volunteer（ボランティア）
  { type: 'select', data: { question: '「volunteer」の意味を選びなさい。', options: ['メンバー', 'ボランティア', 'リーダー', '選手'] }, answer: 'ボランティア' },
  { type: 'select', data: { question: '「ボランティア」を表す英語を選びなさい。', japanese: 'ボランティア', options: ['member', 'leader', 'volunteer', 'player'] }, answer: 'volunteer' },
  { type: 'input', data: { question: '「ボランティア」を英語で書きなさい。', japanese: 'ボランティア' }, answer: 'volunteer' },

  // war（戦争）
  { type: 'select', data: { question: '「war」の意味を選びなさい。', options: ['平和', '戦争', '競争', '争い'] }, answer: '戦争' },
  { type: 'select', data: { question: '「戦争」を表す英語を選びなさい。', japanese: '戦争', options: ['peace', 'competition', 'war', 'conflict'] }, answer: 'war' },
  { type: 'input', data: { question: '「戦争」を英語で書きなさい。', japanese: '戦争' }, answer: 'war' },

  // website（ウェブサイト）
  { type: 'select', data: { question: '「website」の意味を選びなさい。', options: ['アプリ', 'ウェブサイト', 'ゲーム', 'ブログ'] }, answer: 'ウェブサイト' },
  { type: 'select', data: { question: '「ウェブサイト」を表す英語を選びなさい。', japanese: 'ウェブサイト', options: ['app', 'blog', 'website', 'game'] }, answer: 'website' },
  { type: 'input', data: { question: '「ウェブサイト」を英語で書きなさい。', japanese: 'ウェブサイト' }, answer: 'website' },
];
