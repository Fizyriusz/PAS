import React, { useState, useEffect } from 'react';
import { Sparkles, Dices, History, ArrowDown } from 'lucide-react';

const LootView = ({ data, themeBg }) => {
    const [res, setRes] = useState(null);
    const [rolling, setRolling] = useState(false);
    const [displayNum, setDisplayNum] = useState(20); // Cyfra wyświetlana podczas losowania
    const [history, setHistory] = useState([]); // Historia rzutów

    const btnBg = themeBg.replace('text', 'bg').replace('500', '600'); 
    
    // Efekt "latających cyferek" podczas losowania
    useEffect(() => {
        let interval;
        if (rolling) {
            interval = setInterval(() => {
                setDisplayNum(Math.floor(Math.random() * 20) + 1);
            }, 50); // Zmieniaj cyfrę co 50ms
        }
        return () => clearInterval(interval);
    }, [rolling]);

    const roll = () => {
        if (rolling) return;
        setRolling(true);
        setRes(null);
        
        // Dźwięk kliknięcia (opcjonalnie w przyszłości)
        // navigator.vibrate([10]); // Wibracja na telefonie przy starcie

        // Czas trwania napięcia (800ms)
        setTimeout(() => {
            const r = Math.floor(Math.random() * 20) + 1;
            const item = data.find(l => r >= l.range[0] && r <= l.range[1]);
            
            const newLoot = { ...item, r, timestamp: new Date() };
            
            setRes(newLoot);
            setRolling(false);
            setDisplayNum(r);
            
            // Dodaj do historii (max 5 elementów)
            setHistory(prev => [newLoot, ...prev].slice(0, 5));
            
            // Wibracja sukcesu (jeśli wspierana)
            if (navigator.vibrate) navigator.vibrate([50]);
            
        }, 800);
    };

    // Helper do kolorów tła/ramki w zależności od rzadkości
    const getRarityGlow = (rarity) => {
        switch(rarity) {
            case 'epic': return 'shadow-amber-500/50 border-amber-500/50 bg-amber-950/30';
            case 'rare': return 'shadow-purple-500/50 border-purple-500/50 bg-purple-950/30';
            case 'uncommon': return 'shadow-blue-500/50 border-blue-500/50 bg-blue-950/30';
            default: return 'shadow-slate-900/50 border-slate-800 bg-slate-900';
        }
    };

    return (
        <div className="h-full flex flex-col max-w-md mx-auto relative">
            
            {/* GŁÓWNA SEKCA WYNIKU (GÓRA) */}
            <div className="flex-1 flex flex-col justify-center items-center py-6">
                
                {/* Kostka / Wynik */}
                <div className="mb-8 relative">
                    <div className={`w-24 h-24 flex items-center justify-center rounded-2xl bg-slate-800 border-2 border-slate-700 shadow-xl transition-all duration-200 ${rolling ? 'scale-110 border-amber-500' : 'scale-100'}`}>
                        <span className={`text-4xl font-bold font-mono ${rolling ? 'text-slate-400 blur-[1px]' : 'text-white'}`}>
                            {rolling ? displayNum : (res ? res.r : <Dices size={32} className="text-slate-600"/>)}
                        </span>
                    </div>
                    {/* Etykieta pod kostką */}
                    {!rolling && res && (
                        <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-slate-950 px-2 py-0.5 rounded text-[10px] uppercase font-bold text-slate-500 border border-slate-800 whitespace-nowrap">
                            Wynik k20
                        </div>
                    )}
                </div>

                {/* Karta Przedmiotu */}
                <div className="w-full min-h-[180px] flex items-center justify-center px-4">
                    {res ? (
                        <div className={`w-full p-6 rounded-xl border-2 text-center animate-in zoom-in-95 duration-300 shadow-2xl ${getRarityGlow(res.rarity)}`}>
                            {res.rarity === 'epic' && <div className="text-amber-400 text-xs font-bold uppercase tracking-[0.2em] mb-2 animate-pulse">✨ Legendarne ✨</div>}
                            <div className={`text-2xl font-bold mb-3 ${res.color}`}>{res.name}</div>
                            <div className="text-slate-300 text-sm leading-relaxed">{res.desc}</div>
                        </div>
                    ) : (
                        <div className={`text-slate-600 flex flex-col items-center gap-3 transition-opacity ${rolling ? 'opacity-50' : 'opacity-100'}`}>
                            <span className="text-sm">Naciśnij przycisk, aby otworzyć skrzynię</span>
                            <ArrowDown size={20} className="animate-bounce opacity-50"/>
                        </div>
                    )}
                </div>
            </div>

            {/* PANEL DOLNY: PRZYCISK + HISTORIA */}
            <div className="bg-slate-950/80 backdrop-blur-sm pt-4 pb-2 border-t border-slate-800/50">
                {/* Przycisk */}
                <div className="px-4 mb-6">
                    {data.length > 0 ? (
                        <button 
                            onClick={roll} 
                            disabled={rolling}
                            className={`w-full ${btnBg} hover:opacity-90 text-black font-bold py-4 rounded-xl flex items-center justify-center gap-3 active:scale-95 transition-all shadow-lg shadow-emerald-900/20 text-lg group`}
                        >
                            <Dices size={24} className={`transition-transform duration-700 ${rolling ? 'rotate-180' : 'group-hover:rotate-12'}`}/> 
                            {rolling ? 'LOSOWANIE...' : 'OTWÓRZ (d20)'}
                        </button>
                    ) : (
                        <div className="text-slate-500 text-center text-sm py-4">Brak tabeli lootu.</div>
                    )}
                </div>

                {/* Historia (Rozwijana lista ostatnich 3) */}
                {history.length > 0 && (
                    <div className="px-4">
                        <div className="flex items-center gap-2 text-[10px] font-bold text-slate-600 uppercase mb-2">
                            <History size={12}/> Ostatnie znaleziska
                        </div>
                        <div className="space-y-2">
                            {history.slice(0, 3).map((item, idx) => (
                                <div key={idx} className="flex justify-between items-center text-xs p-2 rounded bg-slate-900 border border-slate-800/50 opacity-70 hover:opacity-100 transition-opacity">
                                    <span className={`font-bold ${item.color}`}>{item.name}</span>
                                    <span className="font-mono text-slate-500 bg-slate-950 px-1.5 rounded">#{item.r}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default LootView;