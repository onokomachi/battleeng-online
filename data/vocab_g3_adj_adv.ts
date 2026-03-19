import type { Problem } from '../types';

export const vocabG3AdjAdvProblems: Problem[] = [
  // --- traditional ---
  { type: 'select', data: { question: '「traditional」の意味を選びなさい。', options: ['技術的な', '地形の', '輸送の', '伝統的な'] }, answer: '伝統的な' },
  { type: 'select', data: { question: '「伝統的な」を表す英語を選びなさい。', japanese: '伝統的な', options: ['technical', 'territorial', 'transitional', 'traditional'] }, answer: 'traditional' },
  { type: 'input', data: { question: '「伝統的な」を英語で書きなさい。', japanese: '伝統的な' }, answer: 'traditional' },

  // --- environmental ---
  { type: 'select', data: { question: '「environmental」の意味を選びなさい。', options: ['感情的な', '経済的な', '平等の', '環境の'] }, answer: '環境の' },
  { type: 'select', data: { question: '「環境の」を表す英語を選びなさい。', japanese: '環境の', options: ['emotional', 'economical', 'equal', 'environmental'] }, answer: 'environmental' },
  { type: 'input', data: { question: '「環境の」を英語で書きなさい。', japanese: '環境の' }, answer: 'environmental' },

  // --- international ---
  { type: 'select', data: { question: '「international」の意味を選びなさい。', options: ['内部の', '個人の', '工業の', '国際的な'] }, answer: '国際的な' },
  { type: 'select', data: { question: '「国際的な」を表す英語を選びなさい。', japanese: '国際的な', options: ['internal', 'individual', 'industrial', 'international'] }, answer: 'international' },
  { type: 'input', data: { question: '「国際的な」を英語で書きなさい。', japanese: '国際的な' }, answer: 'international' },

  // --- cultural ---
  { type: 'select', data: { question: '「cultural」の意味を選びなさい。', options: ['現在の', '中央の', '好奇心の強い', '文化的な'] }, answer: '文化的な' },
  { type: 'select', data: { question: '「文化的な」を表す英語を選びなさい。', japanese: '文化的な', options: ['current', 'central', 'curious', 'cultural'] }, answer: 'cultural' },
  { type: 'input', data: { question: '「文化的な」を英語で書きなさい。', japanese: '文化的な' }, answer: 'cultural' },

  // --- political ---
  { type: 'select', data: { question: '「political」の意味を選びなさい。', options: ['人口の', '実際の', '身体的な', '政治的な'] }, answer: '政治的な' },
  { type: 'select', data: { question: '「政治的な」を表す英語を選びなさい。', japanese: '政治的な', options: ['popular', 'practical', 'physical', 'political'] }, answer: 'political' },
  { type: 'input', data: { question: '「政治的な」を英語で書きなさい。', japanese: '政治的な' }, answer: 'political' },

  // --- economic ---
  { type: 'select', data: { question: '「economic」の意味を選びなさい。', options: ['教育的な', '感情的な', '平等の', '経済的な'] }, answer: '経済的な' },
  { type: 'select', data: { question: '「経済的な」を表す英語を選びなさい。', japanese: '経済的な', options: ['educational', 'emotional', 'equal', 'economic'] }, answer: 'economic' },
  { type: 'input', data: { question: '「経済的な」を英語で書きなさい。', japanese: '経済的な' }, answer: 'economic' },

  // --- scientific ---
  { type: 'select', data: { question: '「scientific」の意味を選びなさい。', options: ['社会的な', '特定の', '戦略的な', '科学的な'] }, answer: '科学的な' },
  { type: 'select', data: { question: '「科学的な」を表す英語を選びなさい。', japanese: '科学的な', options: ['social', 'specific', 'strategic', 'scientific'] }, answer: 'scientific' },
  { type: 'input', data: { question: '「科学的な」を英語で書きなさい。', japanese: '科学的な' }, answer: 'scientific' },

  // --- historical ---
  { type: 'select', data: { question: '「historical」の意味を選びなさい。', options: ['水平な', '無害な', '健全な', '歴史的な'] }, answer: '歴史的な' },
  { type: 'select', data: { question: '「歴史的な」を表す英語を選びなさい。', japanese: '歴史的な', options: ['horizontal', 'harmless', 'healthy', 'historical'] }, answer: 'historical' },
  { type: 'input', data: { question: '「歴史的な」を英語で書きなさい。', japanese: '歴史的な' }, answer: 'historical' },

  // --- natural ---
  { type: 'select', data: { question: '「natural」の意味を選びなさい。', options: ['国家の', '普通の', '隣の', '自然な'] }, answer: '自然な' },
  { type: 'select', data: { question: '「自然な」を表す英語を選びなさい。', japanese: '自然な', options: ['national', 'normal', 'neighboring', 'natural'] }, answer: 'natural' },
  { type: 'input', data: { question: '「自然な」を英語で書きなさい。', japanese: '自然な' }, answer: 'natural' },

  // --- global ---
  { type: 'select', data: { question: '「global」の意味を選びなさい。', options: ['地元の', '一般的な', '地理的な', '地球的な・世界全体の'] }, answer: '地球的な・世界全体の' },
  { type: 'select', data: { question: '「地球的な・世界全体の」を表す英語を選びなさい。', japanese: '地球的な・世界全体の', options: ['local', 'general', 'geographical', 'global'] }, answer: 'global' },
  { type: 'input', data: { question: '「地球的な・世界全体の」を英語で書きなさい。', japanese: '地球的な・世界全体の' }, answer: 'global' },

  // --- local ---
  { type: 'select', data: { question: '「local」の意味を選びなさい。', options: ['論理的な', '長い', '声の大きい', '地元の'] }, answer: '地元の' },
  { type: 'select', data: { question: '「地元の」を表す英語を選びなさい。', japanese: '地元の', options: ['logical', 'long', 'loud', 'local'] }, answer: 'local' },
  { type: 'input', data: { question: '「地元の」を英語で書きなさい。', japanese: '地元の' }, answer: 'local' },

  // --- national ---
  { type: 'select', data: { question: '「national」の意味を選びなさい。', options: ['自然な', '普通の', '隣の', '国家の・国民の'] }, answer: '国家の・国民の' },
  { type: 'select', data: { question: '「国家の・国民の」を表す英語を選びなさい。', japanese: '国家の・国民の', options: ['natural', 'normal', 'neighboring', 'national'] }, answer: 'national' },
  { type: 'input', data: { question: '「国家の・国民の」を英語で書きなさい。', japanese: '国家の・国民の' }, answer: 'national' },

  // --- public ---
  { type: 'select', data: { question: '「public」の意味を選びなさい。', options: ['純粋な', '紫の', '人口の', '公共の'] }, answer: '公共の' },
  { type: 'select', data: { question: '「公共の」を表す英語を選びなさい。', japanese: '公共の', options: ['pure', 'purple', 'popular', 'public'] }, answer: 'public' },
  { type: 'input', data: { question: '「公共の」を英語で書きなさい。', japanese: '公共の' }, answer: 'public' },

  // --- private ---
  { type: 'select', data: { question: '「private」の意味を選びなさい。', options: ['誇りに思う', '実際の', '主要な', '私的な・個人的な'] }, answer: '私的な・個人的な' },
  { type: 'select', data: { question: '「私的な・個人的な」を表す英語を選びなさい。', japanese: '私的な・個人的な', options: ['proud', 'practical', 'primary', 'private'] }, answer: 'private' },
  { type: 'input', data: { question: '「私的な・個人的な」を英語で書きなさい。', japanese: '私的な・個人的な' }, answer: 'private' },

  // --- social ---
  { type: 'select', data: { question: '「social」の意味を選びなさい。', options: ['科学的な', '特定の', '戦略的な', '社会的な'] }, answer: '社会的な' },
  { type: 'select', data: { question: '「社会的な」を表す英語を選びなさい。', japanese: '社会的な', options: ['scientific', 'specific', 'strategic', 'social'] }, answer: 'social' },
  { type: 'input', data: { question: '「社会的な」を英語で書きなさい。', japanese: '社会的な' }, answer: 'social' },

  // --- necessary ---
  { type: 'select', data: { question: '「necessary」の意味を選びなさい。', options: ['隣の', '自然な', '否定的な', '必要な'] }, answer: '必要な' },
  { type: 'select', data: { question: '「必要な」を表す英語を選びなさい。', japanese: '必要な', options: ['neighboring', 'natural', 'negative', 'necessary'] }, answer: 'necessary' },
  { type: 'input', data: { question: '「必要な」を英語で書きなさい。', japanese: '必要な' }, answer: 'necessary' },

  // --- possible ---
  { type: 'select', data: { question: '「possible」の意味を選びなさい。', options: ['肯定的な', '強力な', '人口の', '可能な'] }, answer: '可能な' },
  { type: 'select', data: { question: '「可能な」を表す英語を選びなさい。', japanese: '可能な', options: ['positive', 'powerful', 'popular', 'possible'] }, answer: 'possible' },
  { type: 'input', data: { question: '「可能な」を英語で書きなさい。', japanese: '可能な' }, answer: 'possible' },

  // --- impossible ---
  { type: 'select', data: { question: '「impossible」の意味を選びなさい。', options: ['印象的な', '不完全な', '重要でない', '不可能な'] }, answer: '不可能な' },
  { type: 'select', data: { question: '「不可能な」を表す英語を選びなさい。', japanese: '不可能な', options: ['impressive', 'incomplete', 'insignificant', 'impossible'] }, answer: 'impossible' },
  { type: 'input', data: { question: '「不可能な」を英語で書きなさい。', japanese: '不可能な' }, answer: 'impossible' },

  // --- important ---
  { type: 'select', data: { question: '「important」の意味を選びなさい。', options: ['不可能な', '印象的な', '不適切な', '重要な'] }, answer: '重要な' },
  { type: 'select', data: { question: '「重要な」を表す英語を選びなさい。', japanese: '重要な', options: ['impossible', 'impressive', 'inappropriate', 'important'] }, answer: 'important' },
  { type: 'input', data: { question: '「重要な」を英語で書きなさい。', japanese: '重要な' }, answer: 'important' },

  // --- different ---
  { type: 'select', data: { question: '「different」の意味を選びなさい。', options: ['困難な', '直接の', '汚い', '異なる'] }, answer: '異なる' },
  { type: 'select', data: { question: '「異なる」を表す英語を選びなさい。', japanese: '異なる', options: ['difficult', 'direct', 'dirty', 'different'] }, answer: 'different' },
  { type: 'input', data: { question: '「異なる」を英語で書きなさい。', japanese: '異なる' }, answer: 'different' },

  // --- similar ---
  { type: 'select', data: { question: '「similar」の意味を選びなさい。', options: ['単純な', '深刻な', '特定の', '似ている'] }, answer: '似ている' },
  { type: 'select', data: { question: '「似ている」を表す英語を選びなさい。', japanese: '似ている', options: ['simple', 'serious', 'specific', 'similar'] }, answer: 'similar' },
  { type: 'input', data: { question: '「似ている」を英語で書きなさい。', japanese: '似ている' }, answer: 'similar' },

  // --- available ---
  { type: 'select', data: { question: '「available」の意味を選びなさい。', options: ['平均的な', '冒険好きな', '意識のある', '利用可能な'] }, answer: '利用可能な' },
  { type: 'select', data: { question: '「利用可能な」を表す英語を選びなさい。', japanese: '利用可能な', options: ['average', 'adventurous', 'aware', 'available'] }, answer: 'available' },
  { type: 'input', data: { question: '「利用可能な」を英語で書きなさい。', japanese: '利用可能な' }, answer: 'available' },

  // --- responsible ---
  { type: 'select', data: { question: '「responsible」の意味を選びなさい。', options: ['尊敬できる', '信頼できる', '合理的な', '責任がある'] }, answer: '責任がある' },
  { type: 'select', data: { question: '「責任がある」を表す英語を選びなさい。', japanese: '責任がある', options: ['respectable', 'reliable', 'reasonable', 'responsible'] }, answer: 'responsible' },
  { type: 'input', data: { question: '「責任がある」を英語で書きなさい。', japanese: '責任がある' }, answer: 'responsible' },

  // --- successful ---
  { type: 'select', data: { question: '「successful」の意味を選びなさい。', options: ['驚くべき', '十分な', '重大な', '成功した'] }, answer: '成功した' },
  { type: 'select', data: { question: '「成功した」を表す英語を選びなさい。', japanese: '成功した', options: ['surprising', 'sufficient', 'significant', 'successful'] }, answer: 'successful' },
  { type: 'input', data: { question: '「成功した」を英語で書きなさい。', japanese: '成功した' }, answer: 'successful' },

  // --- independent ---
  { type: 'select', data: { question: '「independent」の意味を選びなさい。', options: ['不完全な', '個々の', '産業の', '独立した'] }, answer: '独立した' },
  { type: 'select', data: { question: '「独立した」を表す英語を選びなさい。', japanese: '独立した', options: ['incomplete', 'individual', 'industrial', 'independent'] }, answer: 'independent' },
  { type: 'input', data: { question: '「独立した」を英語で書きなさい。', japanese: '独立した' }, answer: 'independent' },

  // --- significant ---
  { type: 'select', data: { question: '「significant」の意味を選びなさい。', options: ['成功した', '驚くべき', '十分な', '重要な・著しい'] }, answer: '重要な・著しい' },
  { type: 'select', data: { question: '「重要な・著しい」を表す英語を選びなさい。', japanese: '重要な・著しい', options: ['successful', 'surprising', 'sufficient', 'significant'] }, answer: 'significant' },
  { type: 'input', data: { question: '「重要な・著しい」を英語で書きなさい。', japanese: '重要な・著しい' }, answer: 'significant' },

  // --- professional ---
  { type: 'select', data: { question: '「professional」の意味を選びなさい。', options: ['有益な', '進歩的な', '確率的な', '専門的な'] }, answer: '専門的な' },
  { type: 'select', data: { question: '「専門的な」を表す英語を選びなさい。', japanese: '専門的な', options: ['profitable', 'progressive', 'probable', 'professional'] }, answer: 'professional' },
  { type: 'input', data: { question: '「専門的な」を英語で書きなさい。', japanese: '専門的な' }, answer: 'professional' },

  // --- educational ---
  { type: 'select', data: { question: '「educational」の意味を選びなさい。', options: ['感情的な', '経済的な', '平等の', '教育的な'] }, answer: '教育的な' },
  { type: 'select', data: { question: '「教育的な」を表す英語を選びなさい。', japanese: '教育的な', options: ['emotional', 'economical', 'equal', 'educational'] }, answer: 'educational' },
  { type: 'input', data: { question: '「教育的な」を英語で書きなさい。', japanese: '教育的な' }, answer: 'educational' },

  // --- various ---
  { type: 'select', data: { question: '「various」の意味を選びなさい。', options: ['大胆な', '暴力的な', '価値ある', 'さまざまな'] }, answer: 'さまざまな' },
  { type: 'select', data: { question: '「さまざまな」を表す英語を選びなさい。', japanese: 'さまざまな', options: ['brave', 'violent', 'valuable', 'various'] }, answer: 'various' },
  { type: 'input', data: { question: '「さまざまな」を英語で書きなさい。', japanese: 'さまざまな' }, answer: 'various' },

  // --- common ---
  { type: 'select', data: { question: '「common」の意味を選びなさい。', options: ['快適な', '複雑な', '完全な', '一般的な・共通の'] }, answer: '一般的な・共通の' },
  { type: 'select', data: { question: '「一般的な・共通の」を表す英語を選びなさい。', japanese: '一般的な・共通の', options: ['comfortable', 'complex', 'complete', 'common'] }, answer: 'common' },
  { type: 'input', data: { question: '「一般的な・共通の」を英語で書きなさい。', japanese: '一般的な・共通の' }, answer: 'common' },

  // --- specific ---
  { type: 'select', data: { question: '「specific」の意味を選びなさい。', options: ['社会的な', '科学的な', '重大な', '特定の'] }, answer: '特定の' },
  { type: 'select', data: { question: '「特定の」を表す英語を選びなさい。', japanese: '特定の', options: ['social', 'scientific', 'significant', 'specific'] }, answer: 'specific' },
  { type: 'input', data: { question: '「特定の」を英語で書きなさい。', japanese: '特定の' }, answer: 'specific' },

  // --- physical ---
  { type: 'select', data: { question: '「physical」の意味を選びなさい。', options: ['政治的な', '人口の', '実際の', '身体的な'] }, answer: '身体的な' },
  { type: 'select', data: { question: '「身体的な」を表す英語を選びなさい。', japanese: '身体的な', options: ['political', 'popular', 'practical', 'physical'] }, answer: 'physical' },
  { type: 'input', data: { question: '「身体的な」を英語で書きなさい。', japanese: '身体的な' }, answer: 'physical' },

  // --- mental ---
  { type: 'select', data: { question: '「mental」の意味を選びなさい。', options: ['音楽的な', '自然な', '道徳的な', '精神的な・心の'] }, answer: '精神的な・心の' },
  { type: 'select', data: { question: '「精神的な・心の」を表す英語を選びなさい。', japanese: '精神的な・心の', options: ['musical', 'natural', 'moral', 'mental'] }, answer: 'mental' },
  { type: 'input', data: { question: '「精神的な・心の」を英語で書きなさい。', japanese: '精神的な・心の' }, answer: 'mental' },

  // --- essential ---
  { type: 'select', data: { question: '「essential」の意味を選びなさい。', options: ['感情的な', '平等な', '経済的な', '不可欠な'] }, answer: '不可欠な' },
  { type: 'select', data: { question: '「不可欠な」を表す英語を選びなさい。', japanese: '不可欠な', options: ['emotional', 'equal', 'economical', 'essential'] }, answer: 'essential' },
  { type: 'input', data: { question: '「不可欠な」を英語で書きなさい。', japanese: '不可欠な' }, answer: 'essential' },

  // --- effective ---
  { type: 'select', data: { question: '「effective」の意味を選びなさい。', options: ['感情的な', '効率的な', '電気の', '効果的な'] }, answer: '効果的な' },
  { type: 'select', data: { question: '「効果的な」を表す英語を選びなさい。', japanese: '効果的な', options: ['emotional', 'efficient', 'electric', 'effective'] }, answer: 'effective' },
  { type: 'input', data: { question: '「効果的な」を英語で書きなさい。', japanese: '効果的な' }, answer: 'effective' },

  // --- creative ---
  { type: 'select', data: { question: '「creative」の意味を選びなさい。', options: ['批判的な', '文化的な', '現在の', '創造的な'] }, answer: '創造的な' },
  { type: 'select', data: { question: '「創造的な」を表す英語を選びなさい。', japanese: '創造的な', options: ['critical', 'cultural', 'current', 'creative'] }, answer: 'creative' },
  { type: 'input', data: { question: '「創造的な」を英語で書きなさい。', japanese: '創造的な' }, answer: 'creative' },

  // --- innovative ---
  { type: 'select', data: { question: '「innovative」の意味を選びなさい。', options: ['個人の', '国際的な', '産業の', '革新的な'] }, answer: '革新的な' },
  { type: 'select', data: { question: '「革新的な」を表す英語を選びなさい。', japanese: '革新的な', options: ['individual', 'international', 'industrial', 'innovative'] }, answer: 'innovative' },
  { type: 'input', data: { question: '「革新的な」を英語で書きなさい。', japanese: '革新的な' }, answer: 'innovative' },

  // --- advanced ---
  { type: 'select', data: { question: '「advanced」の意味を選びなさい。', options: ['不利な', '冒険的な', '平均的な', '高度な・進んだ'] }, answer: '高度な・進んだ' },
  { type: 'select', data: { question: '「高度な・進んだ」を表す英語を選びなさい。', japanese: '高度な・進んだ', options: ['disadvantaged', 'adventurous', 'average', 'advanced'] }, answer: 'advanced' },
  { type: 'input', data: { question: '「高度な・進んだ」を英語で書きなさい。', japanese: '高度な・進んだ' }, answer: 'advanced' },

  // --- complex ---
  { type: 'select', data: { question: '「complex」の意味を選びなさい。', options: ['一般的な', '快適な', '完全な', '複雑な'] }, answer: '複雑な' },
  { type: 'select', data: { question: '「複雑な」を表す英語を選びなさい。', japanese: '複雑な', options: ['common', 'comfortable', 'complete', 'complex'] }, answer: 'complex' },
  { type: 'input', data: { question: '「複雑な」を英語で書きなさい。', japanese: '複雑な' }, answer: 'complex' },
];
