import type { Problem } from '../types';
import { futureProblems } from './01_future';
import { gerundProblems } from './02_gerunds';
import { infinitiveProblems } from './03_infinitives';
import { auxiliaryProblems } from './04_auxiliaries';
import { auxiliaryMustProblems } from './04_auxiliaries_must';
import { auxiliaryHaveToProblems } from './04_auxiliaries_have_to';
import { comparisonProblems } from './05_comparison';
import { thereIsProblems } from './06_there_is';
import { conjunctionProblems } from './07_conjunctions';
import { passiveProblems } from './08_passive';
import { presentPerfectProblems } from './09_present_perfect';
import { presentPerfectProgressiveProblems } from './10_present_perfect_progressive';
import { infinitive2Problems } from './11_infinitives_2';
import { otherProblems } from './12_others';

export const ENGLISH_PROBLEMS: Record<string, Problem[]> = {
  '未来': futureProblems,
  '動名詞': gerundProblems,
  '不定詞': infinitiveProblems,
  '助動詞【その他】': auxiliaryProblems,
  '助動詞【must】': auxiliaryMustProblems,
  '助動詞【have to】': auxiliaryHaveToProblems,
  '比較': comparisonProblems,
  'there is': thereIsProblems,
  '接続詞': conjunctionProblems,
  '受け身': passiveProblems,
  '現在完了': presentPerfectProblems,
  '現在完了進行形': presentPerfectProgressiveProblems,
  '不定詞2': infinitive2Problems,
  'その他': otherProblems,
};