/**
 * ItemShop.tsx — MP消費ショップ（称号・シールド・テーマ）
 *
 * エビデンスB: Castronova (2005) 仮想経済バランス
 *   消費先の多様化がゲーム内経済の健全性を維持
 *
 * エビデンスB: Deci & Ryan (1985) 自己決定理論
 *   カスタマイズ = 自律性欲求の充足 → 内発的動機の維持
 */
import React, { useState } from 'react';
import { SHOP_ITEMS } from '../constants';
import type { ShopItemDef } from '../types';

interface ItemShopProps {
  mathPoints: number;
  ownedItems: Set<string>;
  equippedTitle: string | null;
  onPurchase: (item: ShopItemDef) => void;
  onEquipTitle: (titleId: string | null) => void;
  onClose: () => void;
}

const ItemShop: React.FC<ItemShopProps> = ({
  mathPoints, ownedItems, equippedTitle, onPurchase, onEquipTitle, onClose,
}) => {
  const [tab, setTab] = useState<'title' | 'streak_shield' | 'theme'>('title');
  const [purchaseMessage, setPurchaseMessage] = useState<string | null>(null);

  const filteredItems = SHOP_ITEMS.filter(item => item.type === tab);

  const handleBuy = (item: ShopItemDef) => {
    if (ownedItems.has(item.id)) return;
    if (mathPoints < item.cost) {
      setPurchaseMessage('MPが足りません');
      setTimeout(() => setPurchaseMessage(null), 2000);
      return;
    }
    onPurchase(item);
    setPurchaseMessage(`${item.name} を購入しました！`);
    setTimeout(() => setPurchaseMessage(null), 2000);
  };

  const tabs: { key: typeof tab; label: string; icon: string }[] = [
    { key: 'title', label: '称号', icon: '🏷️' },
    { key: 'streak_shield', label: 'シールド', icon: '🛡️' },
    { key: 'theme', label: 'テーマ', icon: '🎨' },
  ];

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
                MPを使って称号やアイテムを購入
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

        {/* Item list */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          {filteredItems.map(item => {
            const owned = ownedItems.has(item.id);
            const equipped = item.type === 'title' && equippedTitle === item.id;
            const canAfford = mathPoints >= item.cost;

            return (
              <div
                key={item.id}
                className={`rounded-lg p-3 border transition-colors ${
                  owned
                    ? 'border-green-700/30 bg-green-900/10'
                    : 'border-slate-700/30 bg-slate-900/30 hover:bg-slate-900/50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="text-2xl flex-shrink-0 w-10 text-center">{item.icon}</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-white text-sm font-bold">{item.name}</span>
                      {equipped && (
                        <span className="text-[9px] bg-cyan-500/20 text-cyan-300 px-1.5 py-0.5 rounded font-bold">装備中</span>
                      )}
                    </div>
                    <p className="text-[10px] text-gray-500 mt-0.5">{item.description}</p>
                  </div>
                  <div className="flex-shrink-0 flex items-center gap-2">
                    {owned ? (
                      item.type === 'title' ? (
                        <button
                          onClick={() => onEquipTitle(equipped ? null : item.id)}
                          className={`px-3 py-1.5 rounded-lg text-[10px] font-bold border transition-colors ${
                            equipped
                              ? 'border-gray-600 text-gray-400 hover:text-white'
                              : 'border-cyan-600/40 text-cyan-400 hover:bg-cyan-900/20'
                          }`}
                        >
                          {equipped ? '外す' : '装備'}
                        </button>
                      ) : (
                        <span className="text-green-400 text-[10px] font-bold">購入済</span>
                      )
                    ) : (
                      <button
                        onClick={() => handleBuy(item)}
                        className={`px-3 py-1.5 rounded-lg text-[10px] font-bold border transition-colors ${
                          canAfford
                            ? 'border-amber-500/40 text-amber-300 hover:bg-amber-900/20'
                            : 'border-gray-700 text-gray-600 cursor-not-allowed'
                        }`}
                        disabled={!canAfford}
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

        {/* Footer */}
        <div className="p-3 border-t border-amber-900/20 bg-slate-900/40 flex-shrink-0">
          <p className="text-[9px] text-gray-600 text-center">
            称号はプレイヤー名の横に表示されます
          </p>
        </div>
      </div>
    </div>
  );
};

export default ItemShop;
