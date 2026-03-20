
import { ENGLISH_PROBLEMS } from '../data';
import { Problem } from '../types';

const shuffleArray = <T,>(array: T[]): T[] => {
  return [...array].sort(() => Math.random() - 0.5);
};

/**
 * Returns up to 10 shuffled problems for a given category and subTopic.
 *
 * Grammar subtopics:
 *   '選択式' → select, '記述式' → input, '並び替え' → sort
 *
 * Vocabulary subtopics (英単語【動詞】 / 英単語【名詞】 / 英単語【形容詞・副詞】):
 *   '英→日（意味選択）' → select where question shows English word (no japanese field)
 *   '日→英（単語選択）' → select where question shows Japanese meaning (has japanese field)
 *   '日→英（単語入力）' → input
 */
export const getShuffledProblemSet = (category: string, subTopic: string): Problem[] => {
  const allForCategory = ENGLISH_PROBLEMS[category] || [];

  let filtered: Problem[];

  if (subTopic === '英→日（意味選択）') {
    filtered = allForCategory.filter(p => p.type === 'select' && !p.data.japanese);
  } else if (subTopic === '日→英（単語選択）') {
    filtered = allForCategory.filter(p => p.type === 'select' && !!p.data.japanese);
  } else if (subTopic === '日→英（単語入力）') {
    filtered = allForCategory.filter(p => p.type === 'input');
  } else {
    const typeMap: Record<string, string> = {
      '選択式': 'select',
      '記述式': 'input',
      '並び替え': 'sort',
    };
    const targetType = typeMap[subTopic];
    filtered = targetType
      ? allForCategory.filter(p => p.type === targetType)
      : allForCategory;
  }

  return shuffleArray(filtered).slice(0, 5);
};

/**
 * Returns up to `count` shuffled problems drawn from multiple categories.
 * Used by Master modes and Custom selection in Practice mode.
 */
export const getMultiCategoryProblemSet = (categories: string[], count: number = 5): Problem[] => {
  const allProblems: Problem[] = [];
  for (const cat of categories) {
    allProblems.push(...(ENGLISH_PROBLEMS[cat] || []));
  }
  return shuffleArray(allProblems).slice(0, count);
};
