import type { Problem } from '../types';
// ── 中学1年生 文法 ────────────────────────────────────────
import { beVerbProblems } from './g1_01_be_verbs';
import { generalVerbProblems } from './g1_02_general_verbs';
import { pronounProblems } from './g1_03_pronouns';
import { pluralProblems } from './g1_04_plurals';
import { presentProgressiveProblems } from './g1_05_present_progressive';
import { pastTenseProblems } from './g1_06_past_tense';
import { pastProgressiveProblems } from './g1_07_past_progressive';
import { questionWordProblems } from './g1_08_question_words';
import { imperativeProblems } from './g1_09_imperatives';
import { exclamationProblems } from './g1_10_exclamations';
// ── 中学2年生 文法 ────────────────────────────────────────
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
// ── 中学3年生 文法 ────────────────────────────────────────
import { presentPerfectProgressiveProblems } from './10_present_perfect_progressive';
import { infinitive2Problems } from './11_infinitives_2';
import { otherProblems } from './12_others';
import { relativePronounProblems } from './13_relative_pronouns';
import { participleProblems } from './14_participles';
import { indirectQuestionProblems } from './15_indirect_questions';
import { conditionalProblems } from './16_conditionals';
// ── 英単語 中1 ────────────────────────────────────────────
import { vocabG1VerbProblems } from './vocab_g1_verbs';
import { vocabG1NounProblems } from './vocab_g1_nouns';
import { vocabG1AdjAdvProblems } from './vocab_g1_adj_adv';
// ── 英単語 中2（既存ファイル） ─────────────────────────────
import { vocabVerbProblems } from './vocab_verbs';
import { vocabNounProblems } from './vocab_nouns';
import { vocabAdjAdvProblems } from './vocab_adj_adv';
// ── 英単語 中3 ────────────────────────────────────────────
import { vocabG3VerbProblems } from './vocab_g3_verbs';
import { vocabG3NounProblems } from './vocab_g3_nouns';
import { vocabG3AdjAdvProblems } from './vocab_g3_adj_adv';

export const ENGLISH_PROBLEMS: Record<string, Problem[]> = {
  // ── 中学1年生 文法 ────────────────────────────────────────
  'be動詞': beVerbProblems,
  '一般動詞': generalVerbProblems,
  '代名詞': pronounProblems,
  '名詞の複数形': pluralProblems,
  '現在進行形': presentProgressiveProblems,
  '過去形': pastTenseProblems,
  '過去進行形': pastProgressiveProblems,
  '疑問詞': questionWordProblems,
  '命令文': imperativeProblems,
  '感嘆文': exclamationProblems,
  'there is': thereIsProblems,
  // ── 中学2年生 文法 ────────────────────────────────────────
  '未来': futureProblems,
  '動名詞': gerundProblems,
  '不定詞': infinitiveProblems,
  '助動詞【その他】': auxiliaryProblems,
  '助動詞【must】': auxiliaryMustProblems,
  '助動詞【have to】': auxiliaryHaveToProblems,
  '比較': comparisonProblems,
  '接続詞': conjunctionProblems,
  '受け身': passiveProblems,
  '現在完了': presentPerfectProblems,
  // ── 中学3年生 文法 ────────────────────────────────────────
  '現在完了進行形': presentPerfectProgressiveProblems,
  '不定詞2': infinitive2Problems,
  'その他': otherProblems,
  '関係代名詞': relativePronounProblems,
  '分詞の後置修飾': participleProblems,
  '間接疑問文': indirectQuestionProblems,
  '仮定法': conditionalProblems,
  // ── 英単語 中1 ────────────────────────────────────────────
  '英単語【動詞】中1': vocabG1VerbProblems,
  '英単語【名詞】中1': vocabG1NounProblems,
  '英単語【形容詞・副詞】中1': vocabG1AdjAdvProblems,
  // ── 英単語 中2 ────────────────────────────────────────────
  '英単語【動詞】中2': vocabVerbProblems,
  '英単語【名詞】中2': vocabNounProblems,
  '英単語【形容詞・副詞】中2': vocabAdjAdvProblems,
  // ── 英単語 中3 ────────────────────────────────────────────
  '英単語【動詞】中3': vocabG3VerbProblems,
  '英単語【名詞】中3': vocabG3NounProblems,
  '英単語【形容詞・副詞】中3': vocabG3AdjAdvProblems,
};
