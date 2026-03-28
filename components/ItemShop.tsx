/**
 * ItemShop.tsx — MP消費ショップ（装備管理・シールド・テーマ・消耗品）
 *
 * エビデンスB: Castronova (2005) 仮想経済バランス
 * エビデンスB: Deci & Ryan (1985) 自己決定理論 — カスタマイズ = 自律性欲求充足
 */
import React, { useState } from 'react';
import { SHOP_ITEMS, TITLE_DEFS } from '../constants';
import type { ShopItemDef, ActiveBooster } from '../types';

interface ItemShopProps {
  mathPoints: number;
  ownedItems: Set<string>;          // テーマ所持判定用
  equippedTitle: string | null;
  onPurchase: (item: ShopItemDef) => void;
  onEquipTitle: (titleId: string | null) => void;
  onClose: () => void;
  // 新規
  earnedTitleIds: Set<string>;
  equippedTheme: string | null;
  onEquipTheme: (id: string | null) => void;
  hasStreakShield: boolean;
  hintTokens: number;
  activeBooster: ActiveBooster | null;
  expBoosterActive: boolean;
}

type TabKey = 'equip' | 'streak_shield' | 'theme' | 'consumable';

const RARITY_BORDER: Record<string, string> = {
  common: 'border-gray-600/40',
  rare: 'border-blue-500/40',
  epic: 'border-purple-500/40',
  legendary: 'border-amber-400/60',
};
const RARITY_LABEL: Record<string, string> = {
  common: 'text-gray-400',
  rare: 'text-blue-400',
  epic: 'text-purple-400',
  legendary: 'text-amber-400',
};

const ItemShop: React.FC<ItemShopProps> = ({
  mathPoints, ownedItems, equippedTitle, onPurchase, onEquipTitle, onClose,
  earnedTitleIds, equippedTheme, onEquipTheme, hasStreakShield,
  hintTokens, activeBooster, expBoosterActive,
}) => {
  const [tab, setTab] = useState<TabKey>('equip');
  const [purchaseMessage, setPurchaseMessage] = useState<string | null>(null);

  const showMessage = (msg: string) => {
    setPurchaseMessage(msg);
    setTimeout(() => setPurchaseMessage(null), 2000);
  };

  const handleBuy = (item: ShopItemDef) => {
    if (mathPoints < item.cost) {
      showMessage('MPが足りません');
      return;
    }
    // テーマ重複チェック
    if (item.type === 'theme' && ownedItems.has(item.id)) {
      showMessage('購入済みです');
      return;
    }
    // シールド重複チェック
    if (item.type === 'streak_shield' && hasStreakShield) {
      showMessage('すでにシールドを所持しています');
      return;
    }
    onPurchase(item);
    showMessage(`${item.name} を購入しました！`);
  };

  const tabs: { key: TabKey; label: string; icon: string }[] = [
    { key: 'equip', label: '装備管理', icon: '🏷️' },
    { key: 'streak_shield', label: 'シールド', icon: '🛡️' },
    { key: 'theme', label: 'テーマ', icon: '🎨' },
    { key: 'consumable', label: '消耗品', icon: '⚡' },
  ];

  // ── 装備管理タブ ──
  const renderEquipTab = () => {
    const earned = TITLE_DEFS.filter(t => earnedTitleIds.has(t.id));
    if (earned.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center py-12 text-gray-600">
          <span className="text-4xl mb-3">🏷️</span>
          <p className="text-sm">まだ称号がありません</p>
          <p className="text-xs mt-1">条件を達成すると称号が付与されます</p>
        </div>
      );
    }
    return (
      <div className="space-y-2">
        {earned.map(title => {
          const equipped = equippedTitle === title.id;
          const rarity = title.rarity || 'common';
          return (
            <div
              key={title.id}
              className={`rounded-lg p-3 border transition-colors ${RARITY_BORDER[rarity]} ${
                equipped ? 'bg-cyan-900/20' : 'bg-slate-900/30 hover:bg-slate-900/50'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="text-2xl flex-shrink-0 w-9 text-center">{title.icon}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-white text-sm font-bold">{title.name}</span>
                    {equipped && (
                      <span className="text-[9px] bg-cyan-500/20 text-cyan-300 px-1.5 py-0.5 rounded font-bold">装備中</span>
                    )}
                    {title.isMonthly && (
                      <span className="text-[9px] bg-amber-500/20 text-amber-300 px-1.5 py-0.5 rounded font-bold">月次</span>
                    )}
                    <span className={`text-[9px] font-bold ${RARITY_LABEL[rarity]}`}>{rarity.toUpperCase()}</span>
                  </div>
                  <p className="text-[10px] text-gray-500 mt-0.5">{title.description}</p>
                </div>
                <button
                  onClick={() => onEquipTitle(equipped ? null : title.id)}
                  className={`flex-shrink-0 px-3 py-1.5 rounded-lg text-[10px] font-bold border transition-colors ${
                    equipped
                      ? 'border-gray-600 text-gray-400 hover:text-white'
                      : 'border-cyan-600/40 text-cyan-400 hover:bg-cyan-900/20'
                  }`}
                >
                  {equipped ? '外す' : '装備'}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  // ── シールドタブ ──
  const renderShieldTab = () => {
    const item = SHOP_ITEMS.find(i => i.id === 'streak_shield')!;
    const canAfford = mathPoints >= item.cost;
    return (
      <div className="space-y-3">
        <div className={`rounded-lg p-4 border ${hasStreakShield ? 'border-blue-500/40 bg-blue-900/10' : 'border-slate-700/30 bg-slate-900/30'}`}>
          <div className="flex items-center gap-3">
            <div className="text-3xl">🛡️</div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="text-white font-bold">{item.name}</span>
                {hasStreakShield && (
                  <span className="text-[9px] bg-blue-500/20 text-blue-300 px-1.5 py-0.5 rounded font-bold">所持中</span>
                )}
              </div>
              <p className="text-[10px] text-gray-500 mt-0.5">{item.description}</p>
            </div>
            <div className="flex-shrink-0">
              {hasStreakShield ? (
                <span className="text-blue-400 text-[10px] font-bold">使用可能</span>
              ) : (
                <button
                  onClick={() => handleBuy(item)}
                  disabled={!canAfford}
                  className={`px-3 py-1.5 rounded-lg text-[10px] font-bold border transition-colors ${
                    canAfford
                      ? 'border-amber-500/40 text-amber-300 hover:bg-amber-900/20'
                      : 'border-gray-700 text-gray-600 cursor-not-allowed'
                  }`}
                >
                  {item.cost.toLocaleString()} MP
                </button>
              )}
            </div>
          </div>
          {hasStreakShield && (
            <p className="text-[10px] text-blue-400/60 mt-2 text-center">
              次回ログインが途切れた際に自動発動します
            </p>
          )}
        </div>
      </div>
    );
  };

  // ── テーマタブ ──
  const renderThemeTab = () => {
    const themes = SHOP_ITEMS.filter(i => i.type === 'theme');
    return (
      <div className="space-y-2">
        {themes.map(item => {
          const owned = ownedItems.has(item.id);
          const applied = equippedTheme === item.id;
          const canAfford = mathPoints >= item.cost;
          return (
            <div
              key={item.id}
              className={`rounded-lg p-3 border transition-colors ${
                applied ? 'border-amber-500/40 bg-amber-900/10' :
                owned ? 'border-green-700/30 bg-green-900/10' :
                'border-slate-700/30 bg-slate-900/30 hover:bg-slate-900/50'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="text-2xl flex-shrink-0 w-10 text-center">{item.icon}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-white text-sm font-bold">{item.name}</span>
                    {applied && (
                      <span className="text-[9px] bg-amber-500/20 text-amber-300 px-1.5 py-0.5 rounded font-bold">適用中</span>
                    )}
                  </div>
                  <p className="text-[10px] text-gray-500 mt-0.5">{item.description}</p>
                </div>
                <div className="flex-shrink-0 flex items-center gap-2">
                  {owned ? (
                    <button
                      onClick={() => onEquipTheme(applied ? null : item.id)}
                      className={`px-3 py-1.5 rounded-lg text-[10px] font-bold border transition-colors ${
                        applied
                          ? 'border-gray-600 text-gray-400 hover:text-white'
                          : 'border-amber-500/40 text-amber-300 hover:bg-amber-900/20'
                      }`}
                    >
                      {applied ? '解除' : '適用'}
                    </button>
                  ) : (
                    <button
                      onClick={() => handleBuy(item)}
                      disabled={!canAfford}
                      className={`px-3 py-1.5 rounded-lg text-[10px] font-bold border transition-colors ${
                        canAfford
                          ? 'border-amber-500/40 text-amber-300 hover:bg-amber-900/20'
                          : 'border-gray-700 text-gray-600 cursor-not-allowed'
                      }`}
                    >
                      {item.cost.toLocaleString()} MP
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  // ── 消耗品タブ ──
  const renderConsumableTab = () => {
    const consumables = SHOP_ITEMS.filter(i =>
      i.type === 'mp_booster' || i.type === 'hint_token' || i.type === 'exp_booster'
    );
    const getCount = (type: string): number | string => {
      if (type === 'hint_token') return hintTokens;
      if (type === 'mp_booster') {
        if (activeBooster && activeBooster.type === 'mp_booster' && activeBooster.expiresAt > Date.now()) {
          const sec = Math.ceil((activeBooster.expiresAt - Date.now()) / 1000);
          const m = Math.floor(sec / 60), s = sec % 60;
          return `${m}:${String(s).padStart(2, '0')}`;
        }
        return 0;
      }
      if (type === 'exp_booster') return expBoosterActive ? 1 : 0;
      return 0;
    };
    const isActive = (type: string): boolean => {
      if (type === 'mp_booster') return !!(activeBooster && activeBooster.type === 'mp_booster' && activeBooster.expiresAt > Date.now());
      if (type === 'exp_booster') return expBoosterActive;
      return false;
    };

    return (
      <div className="space-y-2">
        {consumables.map(item => {
          const count = getCount(item.type);
          const active = isActive(item.type);
          const canAfford = mathPoints >= item.cost;
          return (
            <div
              key={item.id}
              className={`rounded-lg p-3 border transition-colors ${
                active ? 'border-green-600/40 bg-green-900/10' : 'border-slate-700/30 bg-slate-900/30 hover:bg-slate-900/50'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="text-2xl flex-shrink-0 w-10 text-center">{item.icon}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-white text-sm font-bold">{item.name}</span>
                    {active && item.type === 'mp_booster' && (
                      <span className="text-[9px] bg-amber-500/20 text-amber-300 px-1.5 py-0.5 rounded font-bold">発動中 {count}</span>
                    )}
                    {active && item.type === 'exp_booster' && (
                      <span className="text-[9px] bg-green-500/20 text-green-300 px-1.5 py-0.5 rounded font-bold">所持: 1</span>
                    )}
                    {item.type === 'hint_token' && (Number(count) > 0) && (
                      <span className="text-[9px] bg-blue-500/20 text-blue-300 px-1.5 py-0.5 rounded font-bold">所持: {count}</span>
                    )}
                  </div>
                  <p className="text-[10px] text-gray-500 mt-0.5">{item.description}</p>
                  {item.type === 'mp_booster' && item.durationMs && (
                    <p className="text-[9px] text-amber-600/60 mt-0.5">有効期間: {item.durationMs / 60000}分</p>
                  )}
                </div>
                <div className="flex-shrink-0">
                  <button
                    onClick={() => handleBuy(item)}
                    disabled={!canAfford}
                    className={`px-3 py-1.5 rounded-lg text-[10px] font-bold border transition-colors ${
                      canAfford
                        ? 'border-amber-500/40 text-amber-300 hover:bg-amber-900/20'
                        : 'border-gray-700 text-gray-600 cursor-not-allowed'
                    }`}
                  >
                    {item.cost.toLocaleString()} MP
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm animate-math-fade-in">
      <div className="w-full max-w-2xl mx-4 max-h-[90vh] bg-slate-950/95 border border-amber-500/30 rounded-2xl shadow-[0_0_60px_rgba(245,158,11,0.1)] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-amber-900/20 via-orange-900/10 to-amber-900/20 p-5 border-b border-amber-500/20 flex-shrink-0">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-black text-white tracking-wider flex items-center gap-2">
                <span className="text-amber-400">🏪</span> アイテムショップ
              </h2>
              <p className="text-[10px] text-amber-400/70 mt-1 font-bold">
                称号の管理・アイテムの購入
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="bg-slate-900/60 rounded-lg px-3 py-1.5 border border-amber-900/30">
                <span className="text-amber-400 font-black font-mono text-sm">{mathPoints.toLocaleString()} MP</span>
              </div>
              <button
                onClick={onClose}
                className="text-gray-500 hover:text-white text-2xl transition-colors"
              >
                ✕
              </button>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-2 mt-3">
            {tabs.map(t => (
              <button
                key={t.key}
                onClick={() => setTab(t.key)}
                className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${
                  tab === t.key
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                    : 'bg-slate-900/40 text-gray-500 border border-slate-700/30 hover:text-gray-300'
                }`}
              >
                {t.icon} {t.label}
              </button>
            ))}
          </div>
        </div>

        {/* Purchase message */}
        {purchaseMessage && (
          <div className="px-4 py-2 bg-amber-900/30 text-amber-300 text-sm text-center font-bold animate-math-fade-in">
            {purchaseMessage}
          </div>
        )}

        {/* Content */}
        <div className="flex-1 overflow-y-auto min-h-0 p-4">
          {tab === 'equip' && renderEquipTab()}
          {tab === 'streak_shield' && renderShieldTab()}
          {tab === 'theme' && renderThemeTab()}
          {tab === 'consumable' && renderConsumableTab()}
        </div>

        {/* Footer */}
        <div className="p-3 border-t border-amber-900/20 bg-slate-900/40 flex-shrink-0">
          <p className="text-[9px] text-gray-600 text-center">
            {tab === 'equip' ? '称号はプレイヤー名の横に表示されます' :
             tab === 'consumable' ? '消耗品は複数購入可能です' :
             'アイテムを購入してバトルをカスタマイズしよう'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ItemShop;
