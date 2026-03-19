
import { ENGLISH_PROBLEMS } from '../data';
import { Problem } from '../types';

const shuffleArray = <T,>(array: T[]): T[] => {
  return [...array].sort(() => Math.random() - 0.5);
};

/**
 * Returns up to 10 shuffled problems for a given English grammar category and subTopic.
 * - category: '未来', '動名詞', etc.
 * - subTopic: '選択式' → type='select', '記述式' → type='input', '並び替え' → type='sort'
 */
export const getShuffledProblemSet = (category: string, subTopic: string): Problem[] => {
  const allForCategory = ENGLISH_PROBLEMS[category] || [];

  const typeMap: Record<string, string> = {
    '選択式': 'select',
    '記述式': 'input',
    '並び替え': 'sort',
  };
  const targetType = typeMap[subTopic];

  const filtered = targetType
    ? allForCategory.filter(p => p.type === targetType)
    : allForCategory;

  const shuffled = shuffleArray(filtered);
  return shuffled.slice(0, 10);
};
