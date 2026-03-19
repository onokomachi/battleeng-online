import type { Problem } from '../types';

export const vocabG3NounProblems: Problem[] = [
  // --- environment ---
  { type: 'select', data: { question: '「environment」の意味を選びなさい。', options: ['エネルギー', '経済', '教育', '環境'] }, answer: '環境' },
  { type: 'select', data: { question: '「環境」を表す英語を選びなさい。', japanese: '環境', options: ['energy', 'economy', 'education', 'environment'] }, answer: 'environment' },
  { type: 'input', data: { question: '「環境」を英語で書きなさい。', japanese: '環境' }, answer: 'environment' },

  // --- population ---
  { type: 'select', data: { question: '「population」の意味を選びなさい。', options: ['汚染', '貧困', '地位', '人口'] }, answer: '人口' },
  { type: 'select', data: { question: '「人口」を表す英語を選びなさい。', japanese: '人口', options: ['pollution', 'poverty', 'position', 'population'] }, answer: 'population' },
  { type: 'input', data: { question: '「人口」を英語で書きなさい。', japanese: '人口' }, answer: 'population' },

  // --- technology ---
  { type: 'select', data: { question: '「technology」の意味を選びなさい。', options: ['伝統', '地理', '地形', '技術'] }, answer: '技術' },
  { type: 'select', data: { question: '「技術」を表す英語を選びなさい。', japanese: '技術', options: ['tradition', 'geography', 'territory', 'technology'] }, answer: 'technology' },
  { type: 'input', data: { question: '「技術」を英語で書きなさい。', japanese: '技術' }, answer: 'technology' },

  // --- culture ---
  { type: 'select', data: { question: '「culture」の意味を選びなさい。', options: ['流れ', '通貨', '課程', '文化'] }, answer: '文化' },
  { type: 'select', data: { question: '「文化」を表す英語を選びなさい。', japanese: '文化', options: ['current', 'currency', 'course', 'culture'] }, answer: 'culture' },
  { type: 'input', data: { question: '「文化」を英語で書きなさい。', japanese: '文化' }, answer: 'culture' },

  // --- society ---
  { type: 'select', data: { question: '「society」の意味を選びなさい。', options: ['解決策', '資源', '安全', '社会'] }, answer: '社会' },
  { type: 'select', data: { question: '「社会」を表す英語を選びなさい。', japanese: '社会', options: ['solution', 'source', 'safety', 'society'] }, answer: 'society' },
  { type: 'input', data: { question: '「社会」を英語で書きなさい。', japanese: '社会' }, answer: 'society' },

  // --- tradition ---
  { type: 'select', data: { question: '「tradition」の意味を選びなさい。', options: ['技術', '輸送', '変換', '伝統'] }, answer: '伝統' },
  { type: 'select', data: { question: '「伝統」を表す英語を選びなさい。', japanese: '伝統', options: ['technology', 'transport', 'transformation', 'tradition'] }, answer: 'tradition' },
  { type: 'input', data: { question: '「伝統」を英語で書きなさい。', japanese: '伝統' }, answer: 'tradition' },

  // --- government ---
  { type: 'select', data: { question: '「government」の意味を選びなさい。', options: ['世代', '目標', '案内', '政府'] }, answer: '政府' },
  { type: 'select', data: { question: '「政府」を表す英語を選びなさい。', japanese: '政府', options: ['generation', 'goal', 'guidance', 'government'] }, answer: 'government' },
  { type: 'input', data: { question: '「政府」を英語で書きなさい。', japanese: '政府' }, answer: 'government' },

  // --- organization ---
  { type: 'select', data: { question: '「organization」の意味を選びなさい。', options: ['操作', '機会', '原点', '組織'] }, answer: '組織' },
  { type: 'select', data: { question: '「組織」を表す英語を選びなさい。', japanese: '組織', options: ['operation', 'opportunity', 'origin', 'organization'] }, answer: 'organization' },
  { type: 'input', data: { question: '「組織」を英語で書きなさい。', japanese: '組織' }, answer: 'organization' },

  // --- community ---
  { type: 'select', data: { question: '「community」の意味を選びなさい。', options: ['通信', '協力', '商品', '地域社会'] }, answer: '地域社会' },
  { type: 'select', data: { question: '「地域社会」を表す英語を選びなさい。', japanese: '地域社会', options: ['communication', 'cooperation', 'commodity', 'community'] }, answer: 'community' },
  { type: 'input', data: { question: '「地域社会」を英語で書きなさい。', japanese: '地域社会' }, answer: 'community' },

  // --- education ---
  { type: 'select', data: { question: '「education」の意味を選びなさい。', options: ['評価', '環境', '感情', '教育'] }, answer: '教育' },
  { type: 'select', data: { question: '「教育」を表す英語を選びなさい。', japanese: '教育', options: ['evaluation', 'environment', 'emotion', 'education'] }, answer: 'education' },
  { type: 'input', data: { question: '「教育」を英語で書きなさい。', japanese: '教育' }, answer: 'education' },

  // --- economy ---
  { type: 'select', data: { question: '「economy」の意味を選びなさい。', options: ['エネルギー', '感情', '教育', '経済'] }, answer: '経済' },
  { type: 'select', data: { question: '「経済」を表す英語を選びなさい。', japanese: '経済', options: ['energy', 'emotion', 'education', 'economy'] }, answer: 'economy' },
  { type: 'input', data: { question: '「経済」を英語で書きなさい。', japanese: '経済' }, answer: 'economy' },

  // --- energy ---
  { type: 'select', data: { question: '「energy」の意味を選びなさい。', options: ['経済', '感情', '平等', 'エネルギー'] }, answer: 'エネルギー' },
  { type: 'select', data: { question: '「エネルギー」を表す英語を選びなさい。', japanese: 'エネルギー', options: ['economy', 'emotion', 'equality', 'energy'] }, answer: 'energy' },
  { type: 'input', data: { question: '「エネルギー」を英語で書きなさい。', japanese: 'エネルギー' }, answer: 'energy' },

  // --- resource ---
  { type: 'select', data: { question: '「resource」の意味を選びなさい。', options: ['研究', '尊重', '責任', '資源'] }, answer: '資源' },
  { type: 'select', data: { question: '「資源」を表す英語を選びなさい。', japanese: '資源', options: ['research', 'respect', 'responsibility', 'resource'] }, answer: 'resource' },
  { type: 'input', data: { question: '「資源」を英語で書きなさい。', japanese: '資源' }, answer: 'resource' },

  // --- pollution ---
  { type: 'select', data: { question: '「pollution」の意味を選びなさい。', options: ['人口', '貧困', '地位', '汚染'] }, answer: '汚染' },
  { type: 'select', data: { question: '「汚染」を表す英語を選びなさい。', japanese: '汚染', options: ['population', 'poverty', 'position', 'pollution'] }, answer: 'pollution' },
  { type: 'input', data: { question: '「汚染」を英語で書きなさい。', japanese: '汚染' }, answer: 'pollution' },

  // --- climate ---
  { type: 'select', data: { question: '「climate」の意味を選びなさい。', options: ['文化', '登山', '主張', '気候'] }, answer: '気候' },
  { type: 'select', data: { question: '「気候」を表す英語を選びなさい。', japanese: '気候', options: ['culture', 'climbing', 'claim', 'climate'] }, answer: 'climate' },
  { type: 'input', data: { question: '「気候」を英語で書きなさい。', japanese: '気候' }, answer: 'climate' },

  // --- disaster ---
  { type: 'select', data: { question: '「disaster」の意味を選びなさい。', options: ['疾患', '距離', '議論', '災害'] }, answer: '災害' },
  { type: 'select', data: { question: '「災害」を表す英語を選びなさい。', japanese: '災害', options: ['disease', 'distance', 'discussion', 'disaster'] }, answer: 'disaster' },
  { type: 'input', data: { question: '「災害」を英語で書きなさい。', japanese: '災害' }, answer: 'disaster' },

  // --- opportunity ---
  { type: 'select', data: { question: '「opportunity」の意味を選びなさい。', options: ['組織', '意見', '操作', '機会'] }, answer: '機会' },
  { type: 'select', data: { question: '「機会」を表す英語を選びなさい。', japanese: '機会', options: ['organization', 'opinion', 'operation', 'opportunity'] }, answer: 'opportunity' },
  { type: 'input', data: { question: '「機会」を英語で書きなさい。', japanese: '機会' }, answer: 'opportunity' },

  // --- solution ---
  { type: 'select', data: { question: '「solution」の意味を選びなさい。', options: ['社会', '資源', '状況', '解決策'] }, answer: '解決策' },
  { type: 'select', data: { question: '「解決策」を表す英語を選びなさい。', japanese: '解決策', options: ['society', 'source', 'situation', 'solution'] }, answer: 'solution' },
  { type: 'input', data: { question: '「解決策」を英語で書きなさい。', japanese: '解決策' }, answer: 'solution' },

  // --- development ---
  { type: 'select', data: { question: '「development」の意味を選びなさい。', options: ['目的地', '民主主義', '違い', '発展・開発'] }, answer: '発展・開発' },
  { type: 'select', data: { question: '「発展・開発」を表す英語を選びなさい。', japanese: '発展・開発', options: ['destination', 'democracy', 'difference', 'development'] }, answer: 'development' },
  { type: 'input', data: { question: '「発展・開発」を英語で書きなさい。', japanese: '発展・開発' }, answer: 'development' },

  // --- relationship ---
  { type: 'select', data: { question: '「relationship」の意味を選びなさい。', options: ['信仰', '資源', '尊重', '関係'] }, answer: '関係' },
  { type: 'select', data: { question: '「関係」を表す英語を選びなさい。', japanese: '関係', options: ['religion', 'resource', 'respect', 'relationship'] }, answer: 'relationship' },
  { type: 'input', data: { question: '「関係」を英語で書きなさい。', japanese: '関係' }, answer: 'relationship' },

  // --- communication ---
  { type: 'select', data: { question: '「communication」の意味を選びなさい。', options: ['地域社会', '協力', '比較', 'コミュニケーション・意思疎通'] }, answer: 'コミュニケーション・意思疎通' },
  { type: 'select', data: { question: '「コミュニケーション・意思疎通」を表す英語を選びなさい。', japanese: 'コミュニケーション・意思疎通', options: ['community', 'cooperation', 'comparison', 'communication'] }, answer: 'communication' },
  { type: 'input', data: { question: '「コミュニケーション・意思疎通」を英語で書きなさい。', japanese: 'コミュニケーション・意思疎通' }, answer: 'communication' },

  // --- responsibility ---
  { type: 'select', data: { question: '「responsibility」の意味を選びなさい。', options: ['資源', '研究', '尊重', '責任'] }, answer: '責任' },
  { type: 'select', data: { question: '「責任」を表す英語を選びなさい。', japanese: '責任', options: ['resource', 'research', 'respect', 'responsibility'] }, answer: 'responsibility' },
  { type: 'input', data: { question: '「責任」を英語で書きなさい。', japanese: '責任' }, answer: 'responsibility' },

  // --- achievement ---
  { type: 'select', data: { question: '「achievement」の意味を選びなさい。', options: ['活動', '広告', '告知', '達成・業績'] }, answer: '達成・業績' },
  { type: 'select', data: { question: '「達成・業績」を表す英語を選びなさい。', japanese: '達成・業績', options: ['activity', 'advertisement', 'announcement', 'achievement'] }, answer: 'achievement' },
  { type: 'input', data: { question: '「達成・業績」を英語で書きなさい。', japanese: '達成・業績' }, answer: 'achievement' },

  // --- advertisement ---
  { type: 'select', data: { question: '「advertisement」の意味を選びなさい。', options: ['達成', '告知', '冒険', '広告'] }, answer: '広告' },
  { type: 'select', data: { question: '「広告」を表す英語を選びなさい。', japanese: '広告', options: ['achievement', 'announcement', 'adventure', 'advertisement'] }, answer: 'advertisement' },
  { type: 'input', data: { question: '「広告」を英語で書きなさい。', japanese: '広告' }, answer: 'advertisement' },

  // --- conflict ---
  { type: 'select', data: { question: '「conflict」の意味を選びなさい。', options: ['会議', '自信', '協力', '対立・紛争'] }, answer: '対立・紛争' },
  { type: 'select', data: { question: '「対立・紛争」を表す英語を選びなさい。', japanese: '対立・紛争', options: ['conference', 'confidence', 'cooperation', 'conflict'] }, answer: 'conflict' },
  { type: 'input', data: { question: '「対立・紛争」を英語で書きなさい。', japanese: '対立・紛争' }, answer: 'conflict' },

  // --- generation ---
  { type: 'select', data: { question: '「generation」の意味を選びなさい。', options: ['政府', '目標', '案内', '世代'] }, answer: '世代' },
  { type: 'select', data: { question: '「世代」を表す英語を選びなさい。', japanese: '世代', options: ['government', 'goal', 'guidance', 'generation'] }, answer: 'generation' },
  { type: 'input', data: { question: '「世代」を英語で書きなさい。', japanese: '世代' }, answer: 'generation' },

  // --- knowledge ---
  { type: 'select', data: { question: '「knowledge」の意味を選びなさい。', options: ['親切さ', '鍵', '王国', '知識'] }, answer: '知識' },
  { type: 'select', data: { question: '「知識」を表す英語を選びなさい。', japanese: '知識', options: ['kindness', 'key', 'kingdom', 'knowledge'] }, answer: 'knowledge' },
  { type: 'input', data: { question: '「知識」を英語で書きなさい。', japanese: '知識' }, answer: 'knowledge' },

  // --- cooperation ---
  { type: 'select', data: { question: '「cooperation」の意味を選びなさい。', options: ['通信', '地域社会', '会議', '協力'] }, answer: '協力' },
  { type: 'select', data: { question: '「協力」を表す英語を選びなさい。', japanese: '協力', options: ['communication', 'community', 'conference', 'cooperation'] }, answer: 'cooperation' },
  { type: 'input', data: { question: '「協力」を英語で書きなさい。', japanese: '協力' }, answer: 'cooperation' },

  // --- democracy ---
  { type: 'select', data: { question: '「democracy」の意味を選びなさい。', options: ['発展', '目的地', '違い', '民主主義'] }, answer: '民主主義' },
  { type: 'select', data: { question: '「民主主義」を表す英語を選びなさい。', japanese: '民主主義', options: ['development', 'destination', 'difference', 'democracy'] }, answer: 'democracy' },
  { type: 'input', data: { question: '「民主主義」を英語で書きなさい。', japanese: '民主主義' }, answer: 'democracy' },

  // --- destination ---
  { type: 'select', data: { question: '「destination」の意味を選びなさい。', options: ['発展', '民主主義', '違い', '目的地'] }, answer: '目的地' },
  { type: 'select', data: { question: '「目的地」を表す英語を選びなさい。', japanese: '目的地', options: ['development', 'democracy', 'difference', 'destination'] }, answer: 'destination' },
  { type: 'input', data: { question: '「目的地」を英語で書きなさい。', japanese: '目的地' }, answer: 'destination' },

  // --- disease ---
  { type: 'select', data: { question: '「disease」の意味を選びなさい。', options: ['災害', '距離', '議論', '疾患・病気'] }, answer: '疾患・病気' },
  { type: 'select', data: { question: '「疾患・病気」を表す英語を選びなさい。', japanese: '疾患・病気', options: ['disaster', 'distance', 'discussion', 'disease'] }, answer: 'disease' },
  { type: 'input', data: { question: '「疾患・病気」を英語で書きなさい。', japanese: '疾患・病気' }, answer: 'disease' },

  // --- equality ---
  { type: 'select', data: { question: '「equality」の意味を選びなさい。', options: ['経済', 'エネルギー', '感情', '平等'] }, answer: '平等' },
  { type: 'select', data: { question: '「平等」を表す英語を選びなさい。', japanese: '平等', options: ['economy', 'energy', 'emotion', 'equality'] }, answer: 'equality' },
  { type: 'input', data: { question: '「平等」を英語で書きなさい。', japanese: '平等' }, answer: 'equality' },

  // --- freedom ---
  { type: 'select', data: { question: '「freedom」の意味を選びなさい。', options: ['友情', '夢中', '前線', '自由'] }, answer: '自由' },
  { type: 'select', data: { question: '「自由」を表す英語を選びなさい。', japanese: '自由', options: ['friendship', 'fandom', 'frontier', 'freedom'] }, answer: 'freedom' },
  { type: 'input', data: { question: '「自由」を英語で書きなさい。', japanese: '自由' }, answer: 'freedom' },

  // --- influence ---
  { type: 'select', data: { question: '「influence」の意味を選びなさい。', options: ['情報', '指示', '機関', '影響'] }, answer: '影響' },
  { type: 'select', data: { question: '「影響」を表す英語を選びなさい。', japanese: '影響', options: ['information', 'instruction', 'institution', 'influence'] }, answer: 'influence' },
  { type: 'input', data: { question: '「影響」を英語で書きなさい。', japanese: '影響' }, answer: 'influence' },

  // --- introduction ---
  { type: 'select', data: { question: '「introduction」の意味を選びなさい。', options: ['機関', '指示', '情報', '紹介・導入'] }, answer: '紹介・導入' },
  { type: 'select', data: { question: '「紹介・導入」を表す英語を選びなさい。', japanese: '紹介・導入', options: ['institution', 'instruction', 'information', 'introduction'] }, answer: 'introduction' },
  { type: 'input', data: { question: '「紹介・導入」を英語で書きなさい。', japanese: '紹介・導入' }, answer: 'introduction' },
];
