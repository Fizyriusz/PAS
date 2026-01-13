import React, { useState } from 'react';
import { Crown, RefreshCw, CheckCircle2, Circle, Skull, Map, BookOpen, Settings, ChevronRight, ChevronLeft, ArrowLeft } from 'lucide-react';
import { DATA_SCENARIOS } from '../data/gameData';
import SmartText from '../components/SmartText';
import { useGame } from '../context/GameContext'; // Import Mózgu

const GmView = ({ color = "text-amber-500" }) => {
    // Używamy globalnego stanu GM zamiast lokalnego
    const { gmState, updateGm } = useGame();
    const { scenarioId, currentAct, bossHp, bossMaxHp } = gmState;
    const [tabMode, setTabMode] = useState('narrative'); // Lokalny stan widoku (nie musi być pamiętany)

    // Znajdź aktywny scenariusz na podstawie ID
    const scenario = DATA_SCENARIOS.find(s => s.id === scenarioId) || null;

    const selectScenario = (selected) => {
        updateGm({ 
            scenarioId: selected.id,
            currentAct: 0,
            bossHp: 6,
            bossMaxHp: 6
        });
        setTabMode('narrative');
    };

    const resetView = () => updateGm({ scenarioId: null });

    const nextAct = () => updateGm({ currentAct: Math.min(scenario.acts.length - 1, currentAct + 1) });
    const prevAct = () => updateGm({ currentAct: Math.max(0, currentAct - 1) });

    const hitBoss = (dmg) => updateGm({ bossHp: Math.max(0, bossHp - dmg) });
    const setBossDice = (diceCount) => {
        const val = diceCount * 6;
        updateGm({ bossMaxHp: val, bossHp: val });
    };

    const getDifficultyBadge = (diff) => {
        switch(diff) {
            case 'easy': return <span className="bg-emerald-900/50 text-emerald-400 text-[10px] font-bold px-2 py-0.5 rounded border border-emerald-800">ŁATWY</span>;
            case 'medium': return <span className="bg-amber-900/50 text-amber-400 text-[10px] font-bold px-2 py-0.5 rounded border border-amber-800">ŚREDNI</span>;
            case 'hard': return <span className="bg-red-900/50 text-red-400 text-[10px] font-bold px-2 py-0.5 rounded border border-red-800">CIĘŻKI</span>;
            default: return null;
        }
    };

    return (
        <div className="max-w-2xl mx-auto h-full flex flex-col pb-24">
            
            {/* HEADER */}
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-slate-200 flex items-center gap-2">
                    <Crown size={24} className="text-amber-500" /> Strefa Mistrza Gry
                </h2>
                {scenario && (
                    <button 
                        onClick={resetView}
                        className="bg-slate-800 hover:bg-slate-700 text-slate-300 px-3 py-2 rounded-lg font-bold text-xs flex items-center gap-2 transition-all border border-slate-700"
                    >
                        <ArrowLeft size={14} /> POWRÓT
                    </button>
                )}
            </div>

            {!scenario ? (
                // LISTA SCENARIUSZY (ZAMIAST LOSOWANIA)
                <div className="space-y-4 animate-in fade-in duration-300">
                    <p className="text-slate-400 text-sm mb-4">Wybierz przygodę dla swojej drużyny:</p>
                    {DATA_SCENARIOS.map(s => (
                        <button 
                            key={s.id}
                            onClick={() => selectScenario(s)}
                            disabled={!s.acts || s.acts.length === 0} // Blokujemy puste scenariusze
                            className={`w-full text-left bg-slate-900 border border-slate-800 p-4 rounded-xl hover:border-amber-500/50 transition-all group relative overflow-hidden ${(!s.acts || s.acts.length === 0) ? 'opacity-50 cursor-not-allowed' : 'hover:bg-slate-800'}`}
                        >
                            <div className="flex justify-between items-start mb-2">
                                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{s.type}</span>
                                {getDifficultyBadge(s.difficulty)}
                            </div>
                            <h3 className="text-lg font-bold text-white mb-1 group-hover:text-amber-500 transition-colors">{s.title}</h3>
                            <p className="text-xs text-slate-400 line-clamp-2">{s.hook}</p>
                            {(!s.acts || s.acts.length === 0) && <div className="mt-2 text-[10px] text-red-500 font-mono">[W BUDOWIE]</div>}
                        </button>
                    ))}
                </div>
            ) : (
                // AKTYWNY SCENARIUSZ
                <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    
                    {/* TYTUŁ SCENARIUSZA */}
                    <div className="bg-slate-950 border-b border-slate-800 pb-4 mb-2">
                        <div className="flex justify-between items-center mb-1">
                            <div className="text-[10px] uppercase font-bold text-amber-500 tracking-widest">{scenario.type}</div>
                            {getDifficultyBadge(scenario.difficulty)}
                        </div>
                        <h2 className="text-2xl font-bold text-white leading-tight">{scenario.title}</h2>
                    </div>

                    {/* NAWIGACJA AKTÓW */}
                    <div className="flex items-center justify-between bg-slate-900 p-2 rounded-lg border border-slate-800">
                        <button onClick={prevAct} disabled={currentAct === 0} className="p-2 text-slate-400 hover:text-white disabled:opacity-30"><ChevronLeft size={20}/></button>
                        <div className="text-xs font-bold uppercase tracking-wider text-slate-300 text-center">
                            {scenario.acts[currentAct].title} 
                            <div className="text-[10px] text-slate-600 mt-0.5">Scena {currentAct + 1} z {scenario.acts.length}</div>
                        </div>
                        <button onClick={nextAct} disabled={currentAct === scenario.acts.length - 1} className="p-2 text-slate-400 hover:text-white disabled:opacity-30"><ChevronRight size={20}/></button>
                    </div>

                    {/* PRZEŁĄCZNIK TRYBU */}
                    <div className="flex bg-slate-900 p-1 rounded-lg border border-slate-800">
                        <button 
                            onClick={() => setTabMode('narrative')}
                            className={`flex-1 py-2 text-xs font-bold rounded-md flex items-center justify-center gap-2 transition-all ${tabMode === 'narrative' ? 'bg-slate-700 text-white shadow' : 'text-slate-500 hover:text-slate-300'}`}
                        >
                            <BookOpen size={14}/> REŻYSERIA
                        </button>
                        <button 
                            onClick={() => setTabMode('mechanics')}
                            className={`flex-1 py-2 text-xs font-bold rounded-md flex items-center justify-center gap-2 transition-all ${tabMode === 'mechanics' ? 'bg-slate-700 text-white shadow' : 'text-slate-500 hover:text-slate-300'}`}
                        >
                            <Settings size={14}/> DASHBOARD
                        </button>
                    </div>

                    {/* GŁÓWNA TREŚĆ */}
                    <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-5 min-h-[300px]">
                        {tabMode === 'narrative' ? (
                            <div className="text-slate-300 leading-relaxed text-sm space-y-4 animate-in fade-in duration-300">
                                <SmartText text={scenario.acts[currentAct].narrative} />
                            </div>
                        ) : (
                            <div className="text-slate-300 leading-relaxed text-sm space-y-4 animate-in fade-in duration-300">
                                <SmartText text={scenario.acts[currentAct].mechanics} />
                            </div>
                        )}
                    </div>

                    {/* TRACKER BOSSA (Zawsze na dole) */}
                    <div className="bg-slate-900 border border-red-900/30 p-4 rounded-xl mt-4 relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-1 h-full bg-red-600"></div>
                        <div className="flex justify-between items-center mb-3 pl-2">
                            <h3 className="text-xs font-bold text-red-400 uppercase flex items-center gap-2">
                                <Skull size={16} /> HP Przeciwnika
                            </h3>
                            <div className="flex gap-1">
                                {[1, 2, 3].map(n => (
                                    <button key={n} onClick={() => setBossDice(n)} className={`px-2 py-0.5 text-[10px] font-bold rounded border ${bossMaxHp === n*6 ? 'bg-red-900/50 text-red-200 border-red-800' : 'bg-slate-950 text-slate-600 border-slate-800'}`}>{n}k</button>
                                ))}
                            </div>
                        </div>

                        <div className="flex items-center gap-4 pl-2">
                            <div className="text-3xl font-mono font-bold text-white w-12 text-center">{bossHp}</div>
                            <div className="flex-1 grid grid-cols-4 gap-2">
                                <button onClick={() => hitBoss(1)} className="bg-slate-800 border border-slate-700 text-red-400 hover:bg-red-900/40 rounded font-bold py-2 active:scale-95">-1</button>
                                <button onClick={() => hitBoss(2)} className="bg-slate-800 border border-slate-700 text-red-400 hover:bg-red-900/40 rounded font-bold py-2 active:scale-95">-2</button>
                                <button onClick={() => hitBoss(3)} className="bg-slate-800 border border-slate-700 text-red-400 hover:bg-red-900/40 rounded font-bold py-2 active:scale-95">-3</button>
                                <button onClick={() => updateGm({ bossHp: bossMaxHp })} className="bg-slate-800 border border-slate-700 text-emerald-400 hover:bg-emerald-900/40 rounded font-bold py-2 flex items-center justify-center active:scale-95"><RefreshCw size={14}/></button>
                            </div>
                        </div>
                    </div>

                </div>
            )}
        </div>
    );
};

export default GmView;