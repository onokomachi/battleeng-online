import type { Problem } from '../types';

export const vocabVerbProblems: Problem[] = [
  // --- arrive ---
  { type: 'select', data: { question: '「arrive」の意味を選びなさい。', options: ['〜を借りる', '到着する', '〜を運ぶ', '〜を選ぶ'] }, answer: '到着する' },
  { type: 'select', data: { question: '「到着する」を表す英語を選びなさい。', japanese: '到着する', options: ['achieve', 'arrive', 'allow', 'avoid'] }, answer: 'arrive' },
  { type: 'input', data: { question: '「到着する」を英語で書きなさい。', japanese: '到着する' }, answer: 'arrive' },

  // --- become ---
  { type: 'select', data: { question: '「become」の意味を選びなさい。', options: ['〜を信じる', '〜に届く', '〜になる', '〜を借りる'] }, answer: '〜になる' },
  { type: 'select', data: { question: '「〜になる」を表す英語を選びなさい。', japanese: '〜になる', options: ['believe', 'belong', 'become', 'borrow'] }, answer: 'become' },
  { type: 'input', data: { question: '「〜になる」を英語で書きなさい。', japanese: '〜になる' }, answer: 'become' },

  // --- believe ---
  { type: 'select', data: { question: '「believe」の意味を選びなさい。', options: ['〜になる', '〜を借りる', '〜に届く', '〜を信じる'] }, answer: '〜を信じる' },
  { type: 'select', data: { question: '「〜を信じる」を表す英語を選びなさい。', japanese: '〜を信じる', options: ['borrow', 'become', 'belong', 'believe'] }, answer: 'believe' },
  { type: 'input', data: { question: '「〜を信じる」を英語で書きなさい。', japanese: '〜を信じる' }, answer: 'believe' },

  // --- borrow ---
  { type: 'select', data: { question: '「borrow」の意味を選びなさい。', options: ['〜を信じる', '〜を貸す', '〜を建てる', '〜を借りる'] }, answer: '〜を借りる' },
  { type: 'select', data: { question: '「〜を借りる」を表す英語を選びなさい。', japanese: '〜を借りる', options: ['believe', 'borrow', 'build', 'bring'] }, answer: 'borrow' },
  { type: 'input', data: { question: '「〜を借りる」を英語で書きなさい。', japanese: '〜を借りる' }, answer: 'borrow' },

  // --- build ---
  { type: 'select', data: { question: '「build」の意味を選びなさい。', options: ['〜を運ぶ', '〜を購入する', '〜を壊す', '〜を建てる'] }, answer: '〜を建てる' },
  { type: 'select', data: { question: '「〜を建てる」を表す英語を選びなさい。', japanese: '〜を建てる', options: ['borrow', 'break', 'build', 'bring'] }, answer: 'build' },
  { type: 'input', data: { question: '「〜を建てる」を英語で書きなさい。', japanese: '〜を建てる' }, answer: 'build' },

  // --- carry ---
  { type: 'select', data: { question: '「carry」の意味を選びなさい。', options: ['〜を集める', '〜を変える', '〜を運ぶ', '〜を捕まえる'] }, answer: '〜を運ぶ' },
  { type: 'select', data: { question: '「〜を運ぶ」を表す英語を選びなさい。', japanese: '〜を運ぶ', options: ['collect', 'change', 'catch', 'carry'] }, answer: 'carry' },
  { type: 'input', data: { question: '「〜を運ぶ」を英語で書きなさい。', japanese: '〜を運ぶ' }, answer: 'carry' },

  // --- catch ---
  { type: 'select', data: { question: '「catch」の意味を選びなさい。', options: ['〜を運ぶ', '〜を選ぶ', '〜を捕まえる', '〜を変える'] }, answer: '〜を捕まえる' },
  { type: 'select', data: { question: '「〜を捕まえる」を表す英語を選びなさい。', japanese: '〜を捕まえる', options: ['change', 'carry', 'choose', 'catch'] }, answer: 'catch' },
  { type: 'input', data: { question: '「〜を捕まえる」を英語で書きなさい。', japanese: '〜を捕まえる' }, answer: 'catch' },

  // --- change ---
  { type: 'select', data: { question: '「change」の意味を選びなさい。', options: ['〜を捕まえる', '〜を選ぶ', '〜を集める', '〜を変える'] }, answer: '〜を変える' },
  { type: 'select', data: { question: '「〜を変える」を表す英語を選びなさい。', japanese: '〜を変える', options: ['catch', 'collect', 'change', 'choose'] }, answer: 'change' },
  { type: 'input', data: { question: '「〜を変える」を英語で書きなさい。', japanese: '〜を変える' }, answer: 'change' },

  // --- choose ---
  { type: 'select', data: { question: '「choose」の意味を選びなさい。', options: ['〜を変える', '〜を集める', '〜を捕まえる', '〜を選ぶ'] }, answer: '〜を選ぶ' },
  { type: 'select', data: { question: '「〜を選ぶ」を表す英語を選びなさい。', japanese: '〜を選ぶ', options: ['collect', 'change', 'choose', 'catch'] }, answer: 'choose' },
  { type: 'input', data: { question: '「〜を選ぶ」を英語で書きなさい。', japanese: '〜を選ぶ' }, answer: 'choose' },

  // --- collect ---
  { type: 'select', data: { question: '「collect」の意味を選びなさい。', options: ['〜を選ぶ', '〜を続ける', '〜を集める', '〜を変える'] }, answer: '〜を集める' },
  { type: 'select', data: { question: '「〜を集める」を表す英語を選びなさい。', japanese: '〜を集める', options: ['continue', 'choose', 'collect', 'change'] }, answer: 'collect' },
  { type: 'input', data: { question: '「〜を集める」を英語で書きなさい。', japanese: '〜を集める' }, answer: 'collect' },

  // --- continue ---
  { type: 'select', data: { question: '「continue」の意味を選びなさい。', options: ['〜を決める', '〜を集める', '〜を選ぶ', '〜を続ける'] }, answer: '〜を続ける' },
  { type: 'select', data: { question: '「〜を続ける」を表す英語を選びなさい。', japanese: '〜を続ける', options: ['decide', 'collect', 'change', 'continue'] }, answer: 'continue' },
  { type: 'input', data: { question: '「〜を続ける」を英語で書きなさい。', japanese: '〜を続ける' }, answer: 'continue' },

  // --- decide ---
  { type: 'select', data: { question: '「decide」の意味を選びなさい。', options: ['〜を続ける', '〜を落とす', '〜を楽しむ', '〜を決める'] }, answer: '〜を決める' },
  { type: 'select', data: { question: '「〜を決める」を表す英語を選びなさい。', japanese: '〜を決める', options: ['drop', 'enjoy', 'decide', 'continue'] }, answer: 'decide' },
  { type: 'input', data: { question: '「〜を決める」を英語で書きなさい。', japanese: '〜を決める' }, answer: 'decide' },

  // --- drop ---
  { type: 'select', data: { question: '「drop」の意味を選びなさい。', options: ['〜を決める', '〜を楽しむ', '〜を落とす', '〜を説明する'] }, answer: '〜を落とす' },
  { type: 'select', data: { question: '「〜を落とす」を表す英語を選びなさい。', japanese: '〜を落とす', options: ['decide', 'enjoy', 'drop', 'explain'] }, answer: 'drop' },
  { type: 'input', data: { question: '「〜を落とす」を英語で書きなさい。', japanese: '〜を落とす' }, answer: 'drop' },

  // --- enjoy ---
  { type: 'select', data: { question: '「enjoy」の意味を選びなさい。', options: ['〜を落とす', '〜を説明する', '〜を楽しむ', '〜を決める'] }, answer: '〜を楽しむ' },
  { type: 'select', data: { question: '「〜を楽しむ」を表す英語を選びなさい。', japanese: '〜を楽しむ', options: ['drop', 'explain', 'enter', 'enjoy'] }, answer: 'enjoy' },
  { type: 'input', data: { question: '「〜を楽しむ」を英語で書きなさい。', japanese: '〜を楽しむ' }, answer: 'enjoy' },

  // --- explain ---
  { type: 'select', data: { question: '「explain」の意味を選びなさい。', options: ['〜を楽しむ', '感じる', '〜を終える', '〜を説明する'] }, answer: '〜を説明する' },
  { type: 'select', data: { question: '「〜を説明する」を表す英語を選びなさい。', japanese: '〜を説明する', options: ['enjoy', 'feel', 'finish', 'explain'] }, answer: 'explain' },
  { type: 'input', data: { question: '「〜を説明する」を英語で書きなさい。', japanese: '〜を説明する' }, answer: 'explain' },

  // --- feel ---
  { type: 'select', data: { question: '「feel」の意味を選びなさい。', options: ['〜を説明する', '〜を終える', '〜を飛ぶ', '感じる'] }, answer: '感じる' },
  { type: 'select', data: { question: '「感じる」を表す英語を選びなさい。', japanese: '感じる', options: ['explain', 'finish', 'fly', 'feel'] }, answer: 'feel' },
  { type: 'input', data: { question: '「感じる」を英語で書きなさい。', japanese: '感じる' }, answer: 'feel' },

  // --- finish ---
  { type: 'select', data: { question: '「finish」の意味を選びなさい。', options: ['感じる', '飛ぶ', '〜を忘れる', '〜を終える'] }, answer: '〜を終える' },
  { type: 'select', data: { question: '「〜を終える」を表す英語を選びなさい。', japanese: '〜を終える', options: ['feel', 'fly', 'forget', 'finish'] }, answer: 'finish' },
  { type: 'input', data: { question: '「〜を終える」を英語で書きなさい。', japanese: '〜を終える' }, answer: 'finish' },

  // --- fly ---
  { type: 'select', data: { question: '「fly」の意味を選びなさい。', options: ['〜を終える', '〜を忘れる', '成長する', '飛ぶ'] }, answer: '飛ぶ' },
  { type: 'select', data: { question: '「飛ぶ」を表す英語を選びなさい。', japanese: '飛ぶ', options: ['finish', 'forget', 'grow', 'fly'] }, answer: 'fly' },
  { type: 'input', data: { question: '「飛ぶ」を英語で書きなさい。', japanese: '飛ぶ' }, answer: 'fly' },

  // --- forget ---
  { type: 'select', data: { question: '「forget」の意味を選びなさい。', options: ['飛ぶ', '成長する', '〜を助ける', '〜を忘れる'] }, answer: '〜を忘れる' },
  { type: 'select', data: { question: '「〜を忘れる」を表す英語を選びなさい。', japanese: '〜を忘れる', options: ['fly', 'grow', 'help', 'forget'] }, answer: 'forget' },
  { type: 'input', data: { question: '「〜を忘れる」を英語で書きなさい。', japanese: '〜を忘れる' }, answer: 'forget' },

  // --- grow ---
  { type: 'select', data: { question: '「grow」の意味を選びなさい。', options: ['〜を忘れる', '〜を助ける', '〜を望む', '成長する'] }, answer: '成長する' },
  { type: 'select', data: { question: '「成長する」を表す英語を選びなさい。', japanese: '成長する', options: ['forget', 'help', 'hope', 'grow'] }, answer: 'grow' },
  { type: 'input', data: { question: '「成長する」を英語で書きなさい。', japanese: '成長する' }, answer: 'grow' },

  // --- help ---
  { type: 'select', data: { question: '「help」の意味を選びなさい。', options: ['成長する', '〜を望む', '〜を傷つける', '〜を助ける'] }, answer: '〜を助ける' },
  { type: 'select', data: { question: '「〜を助ける」を表す英語を選びなさい。', japanese: '〜を助ける', options: ['grow', 'hope', 'hurt', 'help'] }, answer: 'help' },
  { type: 'input', data: { question: '「〜を助ける」を英語で書きなさい。', japanese: '〜を助ける' }, answer: 'help' },

  // --- hope ---
  { type: 'select', data: { question: '「hope」の意味を選びなさい。', options: ['〜を助ける', '〜を傷つける', '〜を紹介する', '〜を望む'] }, answer: '〜を望む' },
  { type: 'select', data: { question: '「〜を望む」を表す英語を選びなさい。', japanese: '〜を望む', options: ['help', 'hurt', 'introduce', 'hope'] }, answer: 'hope' },
  { type: 'input', data: { question: '「〜を望む」を英語で書きなさい。', japanese: '〜を望む' }, answer: 'hope' },

  // --- hurt ---
  { type: 'select', data: { question: '「hurt」の意味を選びなさい。', options: ['〜を望む', '〜を紹介する', '〜を招く', '〜を傷つける'] }, answer: '〜を傷つける' },
  { type: 'select', data: { question: '「〜を傷つける」を表す英語を選びなさい。', japanese: '〜を傷つける', options: ['hope', 'introduce', 'invite', 'hurt'] }, answer: 'hurt' },
  { type: 'input', data: { question: '「〜を傷つける」を英語で書きなさい。', japanese: '〜を傷つける' }, answer: 'hurt' },

  // --- introduce ---
  { type: 'select', data: { question: '「introduce」の意味を選びなさい。', options: ['〜を傷つける', '〜に加わる', '〜を招く', '〜を紹介する'] }, answer: '〜を紹介する' },
  { type: 'select', data: { question: '「〜を紹介する」を表す英語を選びなさい。', japanese: '〜を紹介する', options: ['hurt', 'join', 'invite', 'introduce'] }, answer: 'introduce' },
  { type: 'input', data: { question: '「〜を紹介する」を英語で書きなさい。', japanese: '〜を紹介する' }, answer: 'introduce' },

  // --- invite ---
  { type: 'select', data: { question: '「invite」の意味を選びなさい。', options: ['〜を紹介する', '〜に加わる', '〜を続ける', '〜を招く'] }, answer: '〜を招く' },
  { type: 'select', data: { question: '「〜を招く」を表す英語を選びなさい。', japanese: '〜を招く', options: ['introduce', 'join', 'keep', 'invite'] }, answer: 'invite' },
  { type: 'input', data: { question: '「〜を招く」を英語で書きなさい。', japanese: '〜を招く' }, answer: 'invite' },

  // --- join ---
  { type: 'select', data: { question: '「join」の意味を選びなさい。', options: ['〜を招く', '〜を保つ', '笑う', '〜に加わる'] }, answer: '〜に加わる' },
  { type: 'select', data: { question: '「〜に加わる」を表す英語を選びなさい。', japanese: '〜に加わる', options: ['invite', 'keep', 'laugh', 'join'] }, answer: 'join' },
  { type: 'input', data: { question: '「〜に加わる」を英語で書きなさい。', japanese: '〜に加わる' }, answer: 'join' },

  // --- keep ---
  { type: 'select', data: { question: '「keep」の意味を選びなさい。', options: ['〜に加わる', '笑う', '〜を学ぶ', '〜を保つ'] }, answer: '〜を保つ' },
  { type: 'select', data: { question: '「〜を保つ」を表す英語を選びなさい。', japanese: '〜を保つ', options: ['join', 'laugh', 'learn', 'keep'] }, answer: 'keep' },
  { type: 'input', data: { question: '「〜を保つ」を英語で書きなさい。', japanese: '〜を保つ' }, answer: 'keep' },

  // --- laugh ---
  { type: 'select', data: { question: '「laugh」の意味を選びなさい。', options: ['〜を保つ', '〜を学ぶ', '〜を去る', '笑う'] }, answer: '笑う' },
  { type: 'select', data: { question: '「笑う」を表す英語を選びなさい。', japanese: '笑う', options: ['keep', 'learn', 'leave', 'laugh'] }, answer: 'laugh' },
  { type: 'input', data: { question: '「笑う」を英語で書きなさい。', japanese: '笑う' }, answer: 'laugh' },

  // --- learn ---
  { type: 'select', data: { question: '「learn」の意味を選びなさい。', options: ['笑う', '〜を去る', '〜を失う', '〜を学ぶ'] }, answer: '〜を学ぶ' },
  { type: 'select', data: { question: '「〜を学ぶ」を表す英語を選びなさい。', japanese: '〜を学ぶ', options: ['laugh', 'leave', 'lose', 'learn'] }, answer: 'learn' },
  { type: 'input', data: { question: '「〜を学ぶ」を英語で書きなさい。', japanese: '〜を学ぶ' }, answer: 'learn' },

  // --- leave ---
  { type: 'select', data: { question: '「leave」の意味を選びなさい。', options: ['〜を学ぶ', '〜を失う', '〜を意味する', '〜を去る'] }, answer: '〜を去る' },
  { type: 'select', data: { question: '「〜を去る」を表す英語を選びなさい。', japanese: '〜を去る', options: ['learn', 'lose', 'mean', 'leave'] }, answer: 'leave' },
  { type: 'input', data: { question: '「〜を去る」を英語で書きなさい。', japanese: '〜を去る' }, answer: 'leave' },

  // --- lose ---
  { type: 'select', data: { question: '「lose」の意味を選びなさい。', options: ['〜を去る', '〜を意味する', '〜を動かす', '〜を失う'] }, answer: '〜を失う' },
  { type: 'select', data: { question: '「〜を失う」を表す英語を選びなさい。', japanese: '〜を失う', options: ['leave', 'mean', 'move', 'lose'] }, answer: 'lose' },
  { type: 'input', data: { question: '「〜を失う」を英語で書きなさい。', japanese: '〜を失う' }, answer: 'lose' },

  // --- mean ---
  { type: 'select', data: { question: '「mean」の意味を選びなさい。', options: ['〜を失う', '〜を動かす', '〜を必要とする', '〜を意味する'] }, answer: '〜を意味する' },
  { type: 'select', data: { question: '「〜を意味する」を表す英語を選びなさい。', japanese: '〜を意味する', options: ['lose', 'move', 'need', 'mean'] }, answer: 'mean' },
  { type: 'input', data: { question: '「〜を意味する」を英語で書きなさい。', japanese: '〜を意味する' }, answer: 'mean' },

  // --- move ---
  { type: 'select', data: { question: '「move」の意味を選びなさい。', options: ['〜を意味する', '〜を必要とする', '気づく', '〜を動かす'] }, answer: '〜を動かす' },
  { type: 'select', data: { question: '「〜を動かす」を表す英語を選びなさい。', japanese: '〜を動かす', options: ['mean', 'need', 'notice', 'move'] }, answer: 'move' },
  { type: 'input', data: { question: '「〜を動かす」を英語で書きなさい。', japanese: '〜を動かす' }, answer: 'move' },

  // --- need ---
  { type: 'select', data: { question: '「need」の意味を選びなさい。', options: ['〜を動かす', '気づく', '〜を通り過ぎる', '〜を必要とする'] }, answer: '〜を必要とする' },
  { type: 'select', data: { question: '「〜を必要とする」を表す英語を選びなさい。', japanese: '〜を必要とする', options: ['move', 'notice', 'pass', 'need'] }, answer: 'need' },
  { type: 'input', data: { question: '「〜を必要とする」を英語で書きなさい。', japanese: '〜を必要とする' }, answer: 'need' },

  // --- notice ---
  { type: 'select', data: { question: '「notice」の意味を選びなさい。', options: ['〜を必要とする', '〜を通り過ぎる', '〜を計画する', '気づく'] }, answer: '気づく' },
  { type: 'select', data: { question: '「気づく」を表す英語を選びなさい。', japanese: '気づく', options: ['need', 'pass', 'plan', 'notice'] }, answer: 'notice' },
  { type: 'input', data: { question: '「気づく」を英語で書きなさい。', japanese: '気づく' }, answer: 'notice' },

  // --- pass ---
  { type: 'select', data: { question: '「pass」の意味を選びなさい。', options: ['気づく', '〜を計画する', '〜を練習する', '〜を通り過ぎる'] }, answer: '〜を通り過ぎる' },
  { type: 'select', data: { question: '「〜を通り過ぎる」を表す英語を選びなさい。', japanese: '〜を通り過ぎる', options: ['notice', 'plan', 'practice', 'pass'] }, answer: 'pass' },
  { type: 'input', data: { question: '「〜を通り過ぎる」を英語で書きなさい。', japanese: '〜を通り過ぎる' }, answer: 'pass' },

  // --- plan ---
  { type: 'select', data: { question: '「plan」の意味を選びなさい。', options: ['〜を通り過ぎる', '〜を練習する', '〜を準備する', '〜を計画する'] }, answer: '〜を計画する' },
  { type: 'select', data: { question: '「〜を計画する」を表す英語を選びなさい。', japanese: '〜を計画する', options: ['pass', 'practice', 'prepare', 'plan'] }, answer: 'plan' },
  { type: 'input', data: { question: '「〜を計画する」を英語で書きなさい。', japanese: '〜を計画する' }, answer: 'plan' },

  // --- practice ---
  { type: 'select', data: { question: '「practice」の意味を選びなさい。', options: ['〜を計画する', '〜を準備する', '〜を守る', '〜を練習する'] }, answer: '〜を練習する' },
  { type: 'select', data: { question: '「〜を練習する」を表す英語を選びなさい。', japanese: '〜を練習する', options: ['plan', 'prepare', 'protect', 'practice'] }, answer: 'practice' },
  { type: 'input', data: { question: '「〜を練習する」を英語で書きなさい。', japanese: '〜を練習する' }, answer: 'practice' },

  // --- prepare ---
  { type: 'select', data: { question: '「prepare」の意味を選びなさい。', options: ['〜を練習する', '〜を守る', '〜を引っ張る', '〜を準備する'] }, answer: '〜を準備する' },
  { type: 'select', data: { question: '「〜を準備する」を表す英語を選びなさい。', japanese: '〜を準備する', options: ['practice', 'protect', 'pull', 'prepare'] }, answer: 'prepare' },
  { type: 'input', data: { question: '「〜を準備する」を英語で書きなさい。', japanese: '〜を準備する' }, answer: 'prepare' },

  // --- protect ---
  { type: 'select', data: { question: '「protect」の意味を選びなさい。', options: ['〜を準備する', '〜を引っ張る', '〜を押す', '〜を守る'] }, answer: '〜を守る' },
  { type: 'select', data: { question: '「〜を守る」を表す英語を選びなさい。', japanese: '〜を守る', options: ['prepare', 'pull', 'push', 'protect'] }, answer: 'protect' },
  { type: 'input', data: { question: '「〜を守る」を英語で書きなさい。', japanese: '〜を守る' }, answer: 'protect' },

  // --- pull ---
  { type: 'select', data: { question: '「pull」の意味を選びなさい。', options: ['〜を守る', '〜を押す', '〜に届く', '〜を引っ張る'] }, answer: '〜を引っ張る' },
  { type: 'select', data: { question: '「〜を引っ張る」を表す英語を選びなさい。', japanese: '〜を引っ張る', options: ['protect', 'push', 'reach', 'pull'] }, answer: 'pull' },
  { type: 'input', data: { question: '「〜を引っ張る」を英語で書きなさい。', japanese: '〜を引っ張る' }, answer: 'pull' },

  // --- push ---
  { type: 'select', data: { question: '「push」の意味を選びなさい。', options: ['〜を引っ張る', '〜に届く', '〜を気づく', '〜を押す'] }, answer: '〜を押す' },
  { type: 'select', data: { question: '「〜を押す」を表す英語を選びなさい。', japanese: '〜を押す', options: ['pull', 'reach', 'realize', 'push'] }, answer: 'push' },
  { type: 'input', data: { question: '「〜を押す」を英語で書きなさい。', japanese: '〜を押す' }, answer: 'push' },

  // --- reach ---
  { type: 'select', data: { question: '「reach」の意味を選びなさい。', options: ['〜を押す', '〜を気づく', '〜を受け取る', '〜に届く'] }, answer: '〜に届く' },
  { type: 'select', data: { question: '「〜に届く」を表す英語を選びなさい。', japanese: '〜に届く', options: ['push', 'realize', 'receive', 'reach'] }, answer: 'reach' },
  { type: 'input', data: { question: '「〜に届く」を英語で書きなさい。', japanese: '〜に届く' }, answer: 'reach' },

  // --- realize ---
  { type: 'select', data: { question: '「realize」の意味を選びなさい。', options: ['〜に届く', '〜を受け取る', '〜を覚えている', '〜に気づく'] }, answer: '〜に気づく' },
  { type: 'select', data: { question: '「〜に気づく」を表す英語を選びなさい。', japanese: '〜に気づく', options: ['reach', 'receive', 'remember', 'realize'] }, answer: 'realize' },
  { type: 'input', data: { question: '「〜に気づく」を英語で書きなさい。', japanese: '〜に気づく' }, answer: 'realize' },

  // --- receive ---
  { type: 'select', data: { question: '「receive」の意味を選びなさい。', options: ['〜に気づく', '〜を覚えている', '〜に戻る', '〜を受け取る'] }, answer: '〜を受け取る' },
  { type: 'select', data: { question: '「〜を受け取る」を表す英語を選びなさい。', japanese: '〜を受け取る', options: ['realize', 'remember', 'return', 'receive'] }, answer: 'receive' },
  { type: 'input', data: { question: '「〜を受け取る」を英語で書きなさい。', japanese: '〜を受け取る' }, answer: 'receive' },

  // --- remember ---
  { type: 'select', data: { question: '「remember」の意味を選びなさい。', options: ['〜を受け取る', '〜に戻る', '〜を救う', '〜を覚えている'] }, answer: '〜を覚えている' },
  { type: 'select', data: { question: '「〜を覚えている」を表す英語を選びなさい。', japanese: '〜を覚えている', options: ['receive', 'return', 'save', 'remember'] }, answer: 'remember' },
  { type: 'input', data: { question: '「〜を覚えている」を英語で書きなさい。', japanese: '〜を覚えている' }, answer: 'remember' },

  // --- return ---
  { type: 'select', data: { question: '「return」の意味を選びなさい。', options: ['〜を覚えている', '〜を救う', '〜を送る', '〜に戻る'] }, answer: '〜に戻る' },
  { type: 'select', data: { question: '「〜に戻る」を表す英語を選びなさい。', japanese: '〜に戻る', options: ['remember', 'save', 'send', 'return'] }, answer: 'return' },
  { type: 'input', data: { question: '「〜に戻る」を英語で書きなさい。', japanese: '〜に戻る' }, answer: 'return' },

  // --- save ---
  { type: 'select', data: { question: '「save」の意味を選びなさい。', options: ['〜に戻る', '〜を送る', '〜を共有する', '〜を救う'] }, answer: '〜を救う' },
  { type: 'select', data: { question: '「〜を救う」を表す英語を選びなさい。', japanese: '〜を救う', options: ['return', 'send', 'share', 'save'] }, answer: 'save' },
  { type: 'input', data: { question: '「〜を救う」を英語で書きなさい。', japanese: '〜を救う' }, answer: 'save' },

  // --- send ---
  { type: 'select', data: { question: '「send」の意味を選びなさい。', options: ['〜を救う', '〜を共有する', '〜を見せる', '〜を送る'] }, answer: '〜を送る' },
  { type: 'select', data: { question: '「〜を送る」を表す英語を選びなさい。', japanese: '〜を送る', options: ['save', 'share', 'show', 'send'] }, answer: 'send' },
  { type: 'input', data: { question: '「〜を送る」を英語で書きなさい。', japanese: '〜を送る' }, answer: 'send' },

  // --- share ---
  { type: 'select', data: { question: '「share」の意味を選びなさい。', options: ['〜を送る', '〜を見せる', '微笑む', '〜を共有する'] }, answer: '〜を共有する' },
  { type: 'select', data: { question: '「〜を共有する」を表す英語を選びなさい。', japanese: '〜を共有する', options: ['send', 'show', 'smile', 'share'] }, answer: 'share' },
  { type: 'input', data: { question: '「〜を共有する」を英語で書きなさい。', japanese: '〜を共有する' }, answer: 'share' },

  // --- show ---
  { type: 'select', data: { question: '「show」の意味を選びなさい。', options: ['〜を共有する', '微笑む', '〜を過ごす', '〜を見せる'] }, answer: '〜を見せる' },
  { type: 'select', data: { question: '「〜を見せる」を表す英語を選びなさい。', japanese: '〜を見せる', options: ['share', 'smile', 'spend', 'show'] }, answer: 'show' },
  { type: 'input', data: { question: '「〜を見せる」を英語で書きなさい。', japanese: '〜を見せる' }, answer: 'show' },

  // --- smile ---
  { type: 'select', data: { question: '「smile」の意味を選びなさい。', options: ['〜を見せる', '〜を過ごす', '〜に滞在する', '微笑む'] }, answer: '微笑む' },
  { type: 'select', data: { question: '「微笑む」を表す英語を選びなさい。', japanese: '微笑む', options: ['show', 'spend', 'stay', 'smile'] }, answer: 'smile' },
  { type: 'input', data: { question: '「微笑む」を英語で書きなさい。', japanese: '微笑む' }, answer: 'smile' },

  // --- spend ---
  { type: 'select', data: { question: '「spend」の意味を選びなさい。', options: ['微笑む', '〜に滞在する', '〜を止める', '〜を過ごす'] }, answer: '〜を過ごす' },
  { type: 'select', data: { question: '「〜を過ごす」を表す英語を選びなさい。', japanese: '〜を過ごす', options: ['smile', 'stay', 'stop', 'spend'] }, answer: 'spend' },
  { type: 'input', data: { question: '「〜を過ごす」を英語で書きなさい。', japanese: '〜を過ごす' }, answer: 'spend' },

  // --- stay ---
  { type: 'select', data: { question: '「stay」の意味を選びなさい。', options: ['〜を過ごす', '〜を止める', '〜を支持する', '〜に滞在する'] }, answer: '〜に滞在する' },
  { type: 'select', data: { question: '「〜に滞在する」を表す英語を選びなさい。', japanese: '〜に滞在する', options: ['spend', 'stop', 'support', 'stay'] }, answer: 'stay' },
  { type: 'input', data: { question: '「〜に滞在する」を英語で書きなさい。', japanese: '〜に滞在する' }, answer: 'stay' },

  // --- stop ---
  { type: 'select', data: { question: '「stop」の意味を選びなさい。', options: ['〜に滞在する', '〜を支持する', '泳ぐ', '〜を止める'] }, answer: '〜を止める' },
  { type: 'select', data: { question: '「〜を止める」を表す英語を選びなさい。', japanese: '〜を止める', options: ['stay', 'support', 'swim', 'stop'] }, answer: 'stop' },
  { type: 'input', data: { question: '「〜を止める」を英語で書きなさい。', japanese: '〜を止める' }, answer: 'stop' },

  // --- support ---
  { type: 'select', data: { question: '「support」の意味を選びなさい。', options: ['〜を止める', '泳ぐ', '〜を教える', '〜を支持する'] }, answer: '〜を支持する' },
  { type: 'select', data: { question: '「〜を支持する」を表す英語を選びなさい。', japanese: '〜を支持する', options: ['stop', 'swim', 'teach', 'support'] }, answer: 'support' },
  { type: 'input', data: { question: '「〜を支持する」を英語で書きなさい。', japanese: '〜を支持する' }, answer: 'support' },

  // --- swim ---
  { type: 'select', data: { question: '「swim」の意味を選びなさい。', options: ['〜を支持する', '〜を教える', '〜を旅行する', '泳ぐ'] }, answer: '泳ぐ' },
  { type: 'select', data: { question: '「泳ぐ」を表す英語を選びなさい。', japanese: '泳ぐ', options: ['support', 'teach', 'travel', 'swim'] }, answer: 'swim' },
  { type: 'input', data: { question: '「泳ぐ」を英語で書きなさい。', japanese: '泳ぐ' }, answer: 'swim' },

  // --- teach ---
  { type: 'select', data: { question: '「teach」の意味を選びなさい。', options: ['泳ぐ', '〜を旅行する', '〜を試みる', '〜を教える'] }, answer: '〜を教える' },
  { type: 'select', data: { question: '「〜を教える」を表す英語を選びなさい。', japanese: '〜を教える', options: ['swim', 'travel', 'try', 'teach'] }, answer: 'teach' },
  { type: 'input', data: { question: '「〜を教える」を英語で書きなさい。', japanese: '〜を教える' }, answer: 'teach' },

  // --- travel ---
  { type: 'select', data: { question: '「travel」の意味を選びなさい。', options: ['〜を教える', '〜を試みる', '〜を理解する', '〜を旅行する'] }, answer: '〜を旅行する' },
  { type: 'select', data: { question: '「〜を旅行する」を表す英語を選びなさい。', japanese: '〜を旅行する', options: ['teach', 'try', 'understand', 'travel'] }, answer: 'travel' },
  { type: 'input', data: { question: '「〜を旅行する」を英語で書きなさい。', japanese: '〜を旅行する' }, answer: 'travel' },

  // --- try ---
  { type: 'select', data: { question: '「try」の意味を選びなさい。', options: ['〜を旅行する', '〜を理解する', '〜を訪れる', '〜を試みる'] }, answer: '〜を試みる' },
  { type: 'select', data: { question: '「〜を試みる」を表す英語を選びなさい。', japanese: '〜を試みる', options: ['travel', 'understand', 'visit', 'try'] }, answer: 'try' },
  { type: 'input', data: { question: '「〜を試みる」を英語で書きなさい。', japanese: '〜を試みる' }, answer: 'try' },

  // --- understand ---
  { type: 'select', data: { question: '「understand」の意味を選びなさい。', options: ['〜を試みる', '〜を訪れる', '〜に勝つ', '〜を理解する'] }, answer: '〜を理解する' },
  { type: 'select', data: { question: '「〜を理解する」を表す英語を選びなさい。', japanese: '〜を理解する', options: ['try', 'visit', 'win', 'understand'] }, answer: 'understand' },
  { type: 'input', data: { question: '「〜を理解する」を英語で書きなさい。', japanese: '〜を理解する' }, answer: 'understand' },

  // --- visit ---
  { type: 'select', data: { question: '「visit」の意味を選びなさい。', options: ['〜を理解する', '〜に勝つ', '心配する', '〜を訪れる'] }, answer: '〜を訪れる' },
  { type: 'select', data: { question: '「〜を訪れる」を表す英語を選びなさい。', japanese: '〜を訪れる', options: ['understand', 'win', 'worry', 'visit'] }, answer: 'visit' },
  { type: 'input', data: { question: '「〜を訪れる」を英語で書きなさい。', japanese: '〜を訪れる' }, answer: 'visit' },

  // --- win ---
  { type: 'select', data: { question: '「win」の意味を選びなさい。', options: ['〜を訪れる', '心配する', '〜を理解する', '〜に勝つ'] }, answer: '〜に勝つ' },
  { type: 'select', data: { question: '「〜に勝つ」を表す英語を選びなさい。', japanese: '〜に勝つ', options: ['visit', 'worry', 'understand', 'win'] }, answer: 'win' },
  { type: 'input', data: { question: '「〜に勝つ」を英語で書きなさい。', japanese: '〜に勝つ' }, answer: 'win' },

  // --- worry ---
  { type: 'select', data: { question: '「worry」の意味を選びなさい。', options: ['〜に勝つ', '〜を訪れる', '〜を理解する', '心配する'] }, answer: '心配する' },
  { type: 'select', data: { question: '「心配する」を表す英語を選びなさい。', japanese: '心配する', options: ['win', 'visit', 'wonder', 'worry'] }, answer: 'worry' },
  { type: 'input', data: { question: '「心配する」を英語で書きなさい。', japanese: '心配する' }, answer: 'worry' },
];
