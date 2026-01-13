import React, { useState, useEffect } from 'react';
import { Flag, BookOpen, Heart, Zap, RotateCcw, Shield, Sword, Dices, Skull } from 'lucide-react';
import SmartText from '../components/SmartText';
import { useGame } from '../context/GameContext'; // Importujemy Mózg

const CharView = ({ classes, spells, onFeedback, color }) => {
    // Pobieramy stan i funkcję aktualizacji z Mózgu
    const { charState, updateChar } = useGame();
    const { cls, hp, mana } = charState; // hp i mana są tu w PUNKTACH (np. 18), nie kostkach
    
    // Dane statyczne klasy
    const h = classes[cls];
    const maxHp = h.hp * 6;
    const maxMana = h.mana * 6;

    // Inicjalizacja przy pierwszym uruchomieniu (lub zmianie klasy)
    // Jeśli HP w stanie jest drastycznie inne od maxHP nowej klasy (np. zmiana z woja na maga), resetujemy
    useEffect(() => {
        // Prosta logika: jeśli obecne HP jest większe niż max nowej klasy, przytnij.
        // Jeśli to świeży start (hp undefined), ustaw max.
        if (hp === undefined) {
            updateChar({ hp: maxHp, mana: maxMana });
        }
    }, [cls, maxHp, maxMana]);

    // Zmiana klasy
    const changeClass = (newCls) => {
        const newH = classes[newCls];
        // Resetujemy HP/Mana do nowych maksimów przy zmianie klasy
        updateChar({ 
            cls: newCls, 
            hp: newH.hp * 6, 
            mana: newH.mana * 6 
        });
    };

    // --- STAN RZUTU KOŚCIĄ (To może być lokalne, nie musi być pamiętane) ---
    const [rollRes, setRollRes] = useState(null);
    const [isRolling, setIsRolling] = useState(false);
    const [displayRoll, setDisplayRoll] = useState(20);

    // --- MECHANIKA RZUTÓW ---
    useEffect(() => {
        let interval;
        if (isRolling) {
            interval = setInterval(() => {
                setDisplayRoll(Math.floor(Math.random() * 20) + 1);
            }, 50);
        }
        return () => clearInterval(interval);
    }, [isRolling]);

    const handleRoll = (type) => {
        if (isRolling) return;
        setIsRolling(true);
        setRollRes(null);

        setTimeout(() => {
            const r1 = Math.floor(Math.random() * 20) + 1;
            const r2 = Math.floor(Math.random() * 20) + 1;
            let final = r1;
            let label = "";

            if (type === 'normal') { final = r1; label = `Wynik: ${r1}`; } 
            else if (type === 'adv') { final = Math.max(r1, r2); label = `[${r1}, ${r2}] -> Wybrano: ${final}`; } 
            else if (type === 'dis') { final = Math.min(r1, r2); label = `[${r1}, ${r2}] -> Wybrano: ${final}`; }

            setRollRes({ val: final, label, isCrit: final === 20, isFail: final === 1 });
            setDisplayRoll(final);
            setIsRolling(false);
            if (navigator.vibrate) navigator.vibrate(final >= 11 ? [50, 50] : [50]);
        }, 600);
    };

    // --- MECHANIKA KLIKANIA (Aktualizujemy Globalny Stan) ---
    const takeDamage = (amount) => updateChar({ hp: Math.max(0, hp - amount) });
    const heal = () => updateChar({ hp: Math.min(maxHp, hp + 6) });
    const burnMana = (amount) => updateChar({ mana: Math.max(0, mana - amount) });
    const restoreMana = () => updateChar({ mana: maxMana });

    const hpPercentage = (hp / maxHp) * 100;
    const manaPercentage = maxMana > 0 ? (mana / maxMana) * 100 : 0;

    return (
        <div className="space-y-6 max-w-5xl mx-auto pb-12">
            
            {/* 1. SELEKTOR KLAS */}
            <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar md:justify-center">
                {Object.keys(classes).map(k => (
                    <button 
                        key={k} 
                        onClick={() => changeClass(k)} 
                        className={`px-5 py-2 rounded-lg font-bold text-sm border whitespace-nowrap transition-all ${cls === k ? `bg-slate-800 ${color} border-slate-600 shadow-lg scale-105` : 'bg-slate-900 text-slate-500 border-slate-800 hover:bg-slate-800'}`}
                    >
                        {classes[k].name}
                    </button>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                
                {/* LEWA KOLUMNA */}
                <div className="space-y-6">
                    {/* DICE ROLLER */}
                    <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl shadow-lg">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-xs font-bold text-slate-500 uppercase flex items-center gap-2"><Dices size={16} /> Test Ataku</h3>
                            {!isRolling && rollRes && (
                                <span className={`text-xs font-bold px-2 py-0.5 rounded uppercase ${rollRes.val >= 11 ? 'bg-emerald-900/50 text-emerald-400 border border-emerald-800' : 'bg-red-900/50 text-red-400 border border-red-800'}`}>
                                    {rollRes.val >= 11 ? 'SUKCES (11+)' : 'PORAŻKA'}
                                </span>
                            )}
                        </div>
                        <div className="flex gap-4 items-center">
                            <div className={`w-20 h-20 shrink-0 flex items-center justify-center rounded-xl border-2 transition-all duration-200 ${isRolling ? 'border-slate-700 bg-slate-800' : rollRes?.val >= 11 ? 'border-emerald-500 bg-emerald-900/20' : 'border-red-500 bg-red-900/20'}`}>
                                <span className={`text-4xl font-mono font-bold ${isRolling ? 'text-slate-500 blur-[1px]' : (rollRes?.val >= 11 ? 'text-emerald-400' : 'text-red-400')}`}>{isRolling ? displayRoll : (rollRes ? rollRes.val : <Dices size={32} className="opacity-20"/>)}</span>
                            </div>
                            <div className="flex-1 grid grid-cols-1 gap-2">
                                <button onClick={() => handleRoll('normal')} disabled={isRolling} className="bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 py-2 rounded font-bold text-sm transition-colors active:scale-95 flex justify-between px-4"><span>ZWYKŁY</span> <span className="opacity-50">1d20</span></button>
                                <div className="flex gap-2">
                                    <button onClick={() => handleRoll('adv')} disabled={isRolling} className="flex-1 bg-emerald-900/20 hover:bg-emerald-900/40 border border-emerald-900/50 text-emerald-400 py-2 rounded font-bold text-[10px] transition-colors active:scale-95">BIEGŁOŚĆ (2x▲)</button>
                                    <button onClick={() => handleRoll('dis')} disabled={isRolling} className="flex-1 bg-red-900/20 hover:bg-red-900/40 border border-red-900/50 text-red-400 py-2 rounded font-bold text-[10px] transition-colors active:scale-95">SŁABOŚĆ (2x▼)</button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* KOKPIT HP/MANA */}
                    <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl shadow-lg relative overflow-hidden">
                        <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${color.replace('text', 'from').replace('500', '900/20')} to-transparent opacity-50 rounded-bl-full pointer-events-none`}></div>
                        <div className="flex justify-between items-start mb-6 relative z-10">
                            <div><h2 className="text-2xl font-bold text-white leading-none">{h.name}</h2><div className={`text-xs uppercase font-bold ${color} tracking-widest mt-1 opacity-80`}>{h.role}</div></div>
                            <button onClick={() => onFeedback({ name: h.name })} className="text-slate-600 hover:text-red-500 transition-colors"><Flag size={16} /></button>
                        </div>

                        {/* HP */}
                        <div className="mb-6">
                            <div className="flex justify-between items-end mb-2">
                                <span className="text-red-400 font-bold text-xs uppercase flex items-center gap-1"><Heart size={12} fill="currentColor"/> Zdrowie</span>
                                <span className="text-white font-mono text-xl">{hp} <span className="text-slate-600 text-sm">/ {maxHp}</span></span>
                            </div>
                            <div className="h-2 bg-slate-950 rounded-full overflow-hidden mb-3 border border-slate-800"><div className="h-full bg-red-600 transition-all duration-300" style={{ width: `${hpPercentage}%` }}></div></div>
                            <div className="grid grid-cols-4 gap-2">
                                <button onClick={() => takeDamage(1)} className="bg-slate-800 hover:bg-red-900/30 border border-slate-700 text-red-200 py-2 rounded font-bold active:scale-95">-1</button>
                                <button onClick={() => takeDamage(2)} className="bg-slate-800 hover:bg-red-900/50 border border-slate-700 text-red-400 py-2 rounded font-bold active:scale-95">-2</button>
                                <button onClick={() => takeDamage(4)} className="bg-slate-800 hover:bg-red-900/80 border border-slate-700 text-red-500 py-2 rounded font-bold active:scale-95 text-xs">BOSS</button>
                                <button onClick={heal} className="bg-emerald-900/20 hover:bg-emerald-900/40 border border-emerald-900/50 text-emerald-400 py-2 rounded font-bold active:scale-95 flex items-center justify-center"><Heart size={16}/></button>
                            </div>
                        </div>

                        {/* MANA */}
                        {maxMana > 0 && (
                            <div className="mb-4 pt-4 border-t border-slate-800/50">
                                <div className="flex justify-between items-end mb-2">
                                    <span className="text-blue-400 font-bold text-xs uppercase flex items-center gap-1"><Zap size={12} fill="currentColor"/> Mana</span>
                                    <span className="text-white font-mono text-xl">{mana} <span className="text-slate-600 text-sm">/ {maxMana}</span></span>
                                </div>
                                <div className="h-2 bg-slate-950 rounded-full overflow-hidden mb-3 border border-slate-800"><div className="h-full bg-blue-500 transition-all duration-300" style={{ width: `${manaPercentage}%` }}></div></div>
                                <div className="grid grid-cols-3 gap-2">
                                    <button onClick={() => burnMana(1)} disabled={mana < 1} className="bg-slate-800 hover:bg-blue-900/30 border border-slate-700 text-blue-200 py-2 rounded font-bold active:scale-95 disabled:opacity-30">-1</button>
                                    <button onClick={() => burnMana(2)} disabled={mana < 2} className="bg-slate-800 hover:bg-blue-900/50 border border-slate-700 text-blue-400 py-2 rounded font-bold active:scale-95 disabled:opacity-30">-2</button>
                                    <button onClick={restoreMana} className="bg-blue-900/20 hover:bg-blue-900/40 border border-blue-900/50 text-blue-400 py-2 rounded font-bold active:scale-95 flex items-center justify-center"><RotateCcw size={16}/></button>
                                </div>
                            </div>
                        )}

                        {/* ŚMIERĆ */}
                        {hp === 0 && (
                            <div className="absolute inset-0 bg-black/80 backdrop-blur-sm flex flex-col items-center justify-center text-center p-6 animate-in fade-in z-20">
                                <Skull size={48} className="text-red-600 mb-2 animate-pulse" />
                                <h3 className="text-2xl font-bold text-white mb-1">POLEGŁEŚ</h3>
                                <button onClick={() => updateChar({ hp: maxHp })} className="mt-4 bg-red-600 hover:bg-red-500 text-white font-bold py-2 px-6 rounded-full shadow-lg transition-transform active:scale-95">WSTAŃ</button>
                            </div>
                        )}
                    </div>

                    <div className="grid grid-cols-2 gap-3 text-xs">
                         <div className="bg-slate-900/50 p-3 rounded-lg border border-slate-800"><strong className="block text-slate-500 mb-1 uppercase text-[10px] tracking-wider flex items-center gap-1"><Shield size={10}/> Pasywna</strong><div className="text-slate-300"><SmartText text={h.passive} /></div></div>
                        <div className="bg-slate-900/50 p-3 rounded-lg border border-slate-800"><strong className="block text-slate-500 mb-1 uppercase text-[10px] tracking-wider flex items-center gap-1"><Sword size={10}/> Aktywna</strong><div className="text-slate-300"><SmartText text={h.active} /></div></div>
                    </div>
                </div>

                {/* PRAWA KOLUMNA: CZARY */}
                <div className="space-y-4">
                    {spells[cls] ? (
                        <>
                            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 flex items-center gap-2"><BookOpen size={14}/> Dostępne Zaklęcia</h3>
                            <div className="space-y-3">
                                {[...(spells[cls].cantrips || []), ...(spells[cls].tier1 || []), ...(spells[cls].tier2 || [])].map((s, i) => (
                                    <button 
                                        key={i} 
                                        onClick={() => { if(s.cost && mana >= s.cost) burnMana(s.cost) }}
                                        disabled={s.cost && mana < s.cost}
                                        className={`w-full text-left bg-slate-900 border border-slate-800 p-4 rounded-lg flex flex-col justify-between group transition-all relative overflow-hidden ${s.cost && mana < s.cost ? 'opacity-50 cursor-not-allowed' : 'hover:border-slate-600 hover:bg-slate-800 active:scale-[0.98]'}`}
                                    >
                                        <div className="flex justify-between items-start mb-1 relative z-10">
                                            <div className="font-bold text-sm text-slate-200 flex items-center gap-2">{s.name}</div>
                                            {s.cost ? (<span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${mana >= s.cost ? 'text-blue-300 bg-blue-900/40 border-blue-800/50' : 'text-slate-500 bg-slate-950 border-slate-800'}`}>{s.cost} Mana</span>) : (<span className="text-[10px] font-bold text-emerald-400 bg-emerald-900/20 px-2 py-0.5 rounded border border-emerald-900/30">Cantrip</span>)}
                                        </div>
                                        <div className="text-xs text-slate-400 leading-relaxed mt-1 relative z-10"><SmartText text={s.desc} /></div>
                                        {s.cost && (<div className="absolute bottom-0 left-0 h-0.5 bg-blue-500 transition-all duration-300" style={{ width: mana >= s.cost ? '100%' : '0%' }}></div>)}
                                    </button>
                                ))}
                            </div>
                        </>
                    ) : (
                        <div className="h-full flex flex-col items-center justify-center text-slate-600 text-sm border-2 border-dashed border-slate-800 rounded-xl p-8 gap-2"><Sword size={32} className="opacity-20"/><div>Wojownik i Łotrzyk polegają na stali.</div><div className="text-xs opacity-50">Brak zaklęć do wyświetlenia.</div></div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CharView;