import React, { useState } from 'react';
import { Sword, BookOpen, Sparkles, Skull, Search, Flag, X, Dices, Menu, LayoutGrid, Book } from 'lucide-react';
import SmartText from './components/SmartText';
import { DATA_SIMPLE, DATA_ADVANCED } from './data/gameData';

// --- WIDOKI POMOCNICZE ---

const RulesView = ({ data, onFeedback }) => {
    const [q, setQ] = useState('');
    const [selectedRule, setSelectedRule] = useState(null); // Stan dla modala (Grid)
    const [viewMode, setViewMode] = useState('grid'); // 'grid' (Ściąga) lub 'book' (Podręcznik)

    // Filtrowanie
    const filtered = data.filter(r => 
        r.title.toLowerCase().includes(q.toLowerCase()) || 
        r.content.toLowerCase().includes(q.toLowerCase())
    );

    // Grupowanie zasad według kategorii
    const groupedRules = filtered.reduce((acc, rule) => {
        if (!acc[rule.category]) acc[rule.category] = [];
        acc[rule.category].push(rule);
        return acc;
    }, {});

    // Kolejność kategorii
    const categoryOrder = ['Silnik', 'Walka', 'Świat', 'Mistrz Gry', 'Eksploracja'];
    const sortedCategories = Object.keys(groupedRules).sort((a, b) => {
        return categoryOrder.indexOf(a) - categoryOrder.indexOf(b);
    });

    const getCategoryStyle = (cat) => {
        switch(cat) {
            case 'Walka': return 'border-red-500/30 bg-red-950/10 text-red-400';
            case 'Silnik': return 'border-emerald-500/30 bg-emerald-950/10 text-emerald-400';
            case 'Świat': return 'border-blue-500/30 bg-blue-950/10 text-blue-400';
            case 'Mistrz Gry': return 'border-purple-500/30 bg-purple-950/10 text-purple-400';
            default: return 'border-slate-700 bg-slate-900 text-slate-400';
        }
    };

    return (
        <div className="space-y-6 pb-12">
            {/* Header: Wyszukiwarka + Przełącznik Widoku */}
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                <div className="relative w-full md:max-w-sm">
                    <input 
                        type="text" 
                        placeholder="Szukaj..." 
                        className="w-full bg-slate-900 border border-slate-800 rounded-xl py-3 pl-10 text-white focus:outline-none focus:border-amber-500 transition-all shadow-sm placeholder:text-slate-600" 
                        value={q} 
                        onChange={e => setQ(e.target.value)} 
                    />
                    <span className="absolute left-3 top-3.5 text-slate-500">
                        <Search size={18} />
                    </span>
                </div>

                {/* Przełącznik Ściąga / Podręcznik */}
                <div className="flex bg-slate-900 p-1 rounded-lg border border-slate-800 shrink-0">
                    <button 
                        onClick={() => setViewMode('grid')}
                        className={`flex items-center gap-2 px-3 py-2 text-xs font-bold rounded-md transition-all ${viewMode === 'grid' ? 'bg-slate-700 text-white shadow' : 'text-slate-500 hover:text-slate-300'}`}
                    >
                        <LayoutGrid size={14}/> ŚCIĄGA
                    </button>
                    <button 
                        onClick={() => setViewMode('book')}
                        className={`flex items-center gap-2 px-3 py-2 text-xs font-bold rounded-md transition-all ${viewMode === 'book' ? 'bg-slate-700 text-white shadow' : 'text-slate-500 hover:text-slate-300'}`}
                    >
                        <Book size={14}/> PODRĘCZNIK
                    </button>
                </div>
            </div>
            
            {/* --- WIDOK 1: ŚCIĄGA (GRID) --- */}
            {viewMode === 'grid' && sortedCategories.map(cat => (
                <div key={cat} className="space-y-3 animate-in fade-in duration-300">
                    <h3 className={`text-xs font-bold uppercase tracking-widest px-1 opacity-70 ${getCategoryStyle(cat).split(' ')[2]}`}>
                        {cat}
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {groupedRules[cat].map(r => (
                            <button 
                                key={r.id} 
                                onClick={() => setSelectedRule(r)}
                                className={`text-left border rounded-xl p-4 relative group transition-all hover:scale-[1.02] hover:shadow-lg flex flex-col h-full ${getCategoryStyle(r.category).split(' ')[0]} bg-slate-900/40 hover:bg-slate-900/80 backdrop-blur-sm`}
                            >
                                <div className="flex justify-between items-start w-full mb-2">
                                    <h3 className="font-bold text-slate-100 pr-4">{r.title}</h3>
                                    <span className="text-slate-600 opacity-50 group-hover:opacity-100"><BookOpen size={14}/></span>
                                </div>
                                <p className="text-sm text-slate-400 leading-snug">
                                    {r.summary || r.content.substring(0, 60) + '...'}
                                </p>
                            </button>
                        ))}
                    </div>
                </div>
            ))}

            {/* --- WIDOK 2: PODRĘCZNIK (BOOK) --- */}
            {viewMode === 'book' && (
                <div className="max-w-3xl mx-auto space-y-12 animate-in slide-in-from-bottom-2 duration-300">
                    {sortedCategories.map(cat => (
                        <div key={cat} className="space-y-6">
                            <div className={`flex items-center gap-4 pb-2 border-b ${getCategoryStyle(cat).split(' ')[0]}`}>
                                <h2 className={`text-2xl font-bold uppercase tracking-tight ${getCategoryStyle(cat).split(' ')[2]}`}>{cat}</h2>
                            </div>
                            
                            <div className="space-y-10">
                                {groupedRules[cat].map(r => (
                                    <div key={r.id} className="group">
                                        <div className="flex items-center justify-between mb-3">
                                            <h3 className="text-xl font-bold text-slate-100 group-hover:text-amber-500 transition-colors">
                                                {r.title}
                                            </h3>
                                            <button onClick={() => onFeedback(r)} className="opacity-0 group-hover:opacity-100 text-slate-600 hover:text-red-500 transition-opacity">
                                                <Flag size={14}/>
                                            </button>
                                        </div>
                                        <div className="text-slate-300 leading-relaxed text-base md:text-lg pl-4 border-l-2 border-slate-800 hover:border-slate-600 transition-colors">
                                            <SmartText text={r.content} />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* MODAL (Tylko dla trybu Grid) */}
            {selectedRule && viewMode === 'grid' && (
                <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200" onClick={() => setSelectedRule(null)}>
                    <div className="bg-slate-950 border border-slate-700 w-full max-w-2xl max-h-[85vh] rounded-2xl shadow-2xl overflow-hidden flex flex-col" onClick={e => e.stopPropagation()}>
                        <div className={`p-6 border-b border-slate-800 flex justify-between items-start bg-slate-900/50 ${getCategoryStyle(selectedRule.category).split(' ')[2]}`}>
                            <div>
                                <span className="text-[10px] uppercase font-bold tracking-widest opacity-70 mb-1 block">{selectedRule.category}</span>
                                <h2 className="text-2xl font-bold text-white leading-tight">{selectedRule.title}</h2>
                            </div>
                            <button onClick={() => setSelectedRule(null)} className="p-2 bg-slate-900 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white transition-colors">
                                <X size={20} />
                            </button>
                        </div>
                        <div className="p-6 overflow-y-auto text-slate-300 leading-relaxed space-y-4 text-base md:text-lg">
                            <SmartText text={selectedRule.content} />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

const LootView = ({ data, color, themeBg }) => {
    const [res, setRes] = useState(null);
    const [rolling, setRolling] = useState(false);

    const roll = () => {
        setRolling(true);
        setRes(null);
        setTimeout(() => {
            const r = Math.floor(Math.random() * 20) + 1;
            const item = data.find(l => r >= l.range[0] && r <= l.range[1]);
            setRes({ ...item, r });
            setRolling(false);
        }, 600);
    };

    const btnBg = themeBg.replace('text', 'bg').replace('500', '600'); 

    return (
        <div className="h-full flex flex-col items-center justify-center gap-6 max-w-md mx-auto">
            <div className="min-h-[200px] w-full flex items-center justify-center">
                {res ? (
                    <div className="bg-slate-900 border border-slate-800 p-8 rounded-xl text-center w-full animate-pulse-once shadow-2xl relative overflow-hidden">
                        <div className={`absolute top-0 left-0 w-full h-1 ${btnBg} opacity-50`}></div>
                        <div className={`text-3xl font-bold mb-3 ${res.color}`}>{res.name}</div>
                        <div className="text-slate-400 text-sm mb-6 leading-relaxed">{res.desc}</div>
                        <div className="inline-block px-4 py-1.5 bg-slate-950 rounded-full text-xs font-mono text-slate-500 border border-slate-800">Wynik rzutu: <span className="text-white font-bold">{res.r}</span></div>
                    </div>
                ) : (
                    <div className={`text-slate-600 flex flex-col items-center gap-4 ${rolling ? 'animate-pulse' : ''}`}>
                        <Sparkles size={48} className="opacity-20" />
                        {rolling ? 'Otwieranie skrzyni...' : 'Skrzynia jest zamknięta'}
                    </div>
                )}
            </div>
            {data.length > 0 ? (
                <button 
                    onClick={roll} 
                    disabled={rolling}
                    className={`w-full ${btnBg} hover:opacity-90 text-black font-bold py-4 rounded-xl flex items-center justify-center gap-3 active:scale-95 transition-all shadow-lg text-lg`}
                >
                    <Dices size={24} className={rolling ? 'animate-spin' : ''}/> 
                    OTWÓRZ SKRZYNIĘ (d20)
                </button>
            ) : (
                <div className="text-slate-500 text-sm">Brak tabeli lootu w tym trybie.</div>
            )}
        </div>
    );
};

const CharView = ({ classes, spells, onFeedback, color }) => {
    const [cls, setCls] = useState('fighter');
    const h = classes[cls];

    return (
        <div className="space-y-6 max-w-5xl mx-auto">
            <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar md:justify-center">
                {Object.keys(classes).map(k => (
                    <button 
                        key={k} 
                        onClick={() => setCls(k)} 
                        className={`px-6 py-3 rounded-lg font-bold text-sm border whitespace-nowrap transition-all ${cls === k ? `bg-slate-800 ${color} border-slate-600 shadow-lg scale-105` : 'bg-slate-900 text-slate-500 border-slate-800 hover:bg-slate-800'}`}
                    >
                        {classes[k].name}
                    </button>
                ))}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-6">
                    <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl space-y-4 relative shadow-lg h-full">
                        <div className="flex justify-between items-start">
                            <div>
                                <h2 className="text-2xl font-bold text-white mb-1">{h.name}</h2>
                                <div className={`text-xs uppercase font-bold ${color} tracking-widest`}>{h.role}</div>
                            </div>
                            <button onClick={() => onFeedback({ name: h.name })} className="text-slate-600 hover:text-red-500 transition-colors">
                                <Flag size={16} />
                            </button>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-3 text-xs">
                            <div className="bg-slate-950 p-3 rounded-lg text-slate-400 border border-slate-800">
                                <strong className="block text-slate-500 mb-1 uppercase text-[10px] tracking-wider">Zasoby</strong>
                                <span className="text-white text-base">{h.hp}</span> HP <span className="text-slate-700 mx-1">/</span> <span className="text-blue-400 text-base">{h.mana}</span> Mana
                            </div>
                            <div className="bg-slate-950 p-3 rounded-lg text-slate-400 border border-slate-800">
                                <strong className="block text-slate-500 mb-1 uppercase text-[10px] tracking-wider">Cechy</strong>
                                <SmartText text={h.stats} />
                            </div>
                        </div>

                        <div className="pt-4 border-t border-slate-800 space-y-4">
                            <div>
                                <span className="text-[10px] uppercase text-slate-500 font-bold block mb-1 flex items-center gap-2">
                                    <div className="w-1.5 h-1.5 rounded-full bg-slate-500"></div> Pasywna
                                </span>
                                <span className="text-sm text-slate-300 leading-relaxed block bg-slate-950/50 p-2 rounded border border-slate-800/50"><SmartText text={h.passive} /></span>
                            </div>
                            <div>
                                <span className="text-[10px] uppercase text-slate-500 font-bold block mb-1 flex items-center gap-2">
                                    <div className={`w-1.5 h-1.5 rounded-full ${color.replace('text', 'bg')}`}></div> Aktywna
                                </span>
                                <span className="text-sm text-slate-300 leading-relaxed block bg-slate-950/50 p-2 rounded border border-slate-800/50"><SmartText text={h.active} /></span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="space-y-4">
                    {spells[cls] ? (
                        <>
                            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 flex items-center gap-2">
                                <BookOpen size={14}/> Księga Zaklęć
                            </h3>
                            <div className="space-y-3">
                                {[...(spells[cls].cantrips || []), ...(spells[cls].tier1 || []), ...(spells[cls].tier2 || [])].map((s, i) => (
                                    <div key={i} className="bg-slate-900/80 border border-slate-800 p-4 rounded-lg flex flex-col justify-between group hover:bg-slate-900 hover:border-slate-700 transition-all shadow-sm">
                                        <div className="flex justify-between items-start mb-1">
                                            <div className="font-bold text-sm text-slate-200 flex items-center gap-2">
                                                {s.name} 
                                            </div>
                                            {s.cost && <span className="text-[10px] font-bold text-blue-300 bg-blue-900/40 px-2 py-0.5 rounded border border-blue-800/50">{s.cost} Mana</span>}
                                            {!s.cost && <span className="text-[10px] font-bold text-slate-500 bg-slate-800 px-2 py-0.5 rounded border border-slate-700">Cantrip</span>}
                                        </div>
                                        <div className="text-xs text-slate-400 leading-relaxed mt-1"><SmartText text={s.desc} /></div>
                                    </div>
                                ))}
                            </div>
                        </>
                    ) : (
                        <div className="h-full flex items-center justify-center text-slate-600 text-sm border-2 border-dashed border-slate-800 rounded-xl p-8">
                            Ta klasa polega na stali, nie na magii.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

const NavBtn = ({ active, onClick, Icon, label, color }) => (
    <button 
        onClick={onClick} 
        className={`flex flex-col md:flex-row items-center justify-center md:justify-start gap-1 md:gap-3 w-full p-2 md:px-4 md:py-3 rounded-lg transition-all duration-200 
        ${active ? `${color} bg-slate-800/50` : 'text-slate-500 hover:text-slate-300 hover:bg-slate-800/30'}`}
    >
        <Icon size={24} className="mb-1 md:mb-0" strokeWidth={active ? 2.5 : 2} />
        <span className="text-[10px] md:text-sm font-bold tracking-wide">{label}</span>
    </button>
);

// --- GŁÓWNY KOMPONENT APP ---

function App() {
    const [tab, setTab] = useState('rules');
    const [mode, setMode] = useState('simple');
    const [feedback, setFeedback] = useState(null);

    const DATA = mode === 'simple' ? DATA_SIMPLE : DATA_ADVANCED;
    const themeColor = mode === 'simple' ? 'text-emerald-500' : 'text-amber-500';
    const themeBgBtn = mode === 'simple' ? 'bg-emerald-600' : 'bg-amber-600';

    return (
        <div className="flex h-screen bg-slate-950 font-sans text-slate-200 overflow-hidden">
            
            {/* SIDEBAR / NAVBAR */}
            <nav className="
                fixed bottom-0 left-0 w-full z-20 border-t border-slate-800 bg-slate-950/95 backdrop-blur-md pb-safe
                md:static md:w-64 md:h-full md:border-t-0 md:border-r md:flex md:flex-col md:justify-between md:p-4
            ">
                <div className="hidden md:block mb-8">
                     <div className="flex items-center gap-3 mb-1">
                        <div className={`w-8 h-8 rounded flex items-center justify-center text-black shadow-lg transition-colors duration-500 ${themeBgBtn}`}>
                            <Sword size={18} fill="currentColor" className="text-slate-950" />
                        </div>
                        <h1 className="font-bold text-slate-100 text-lg leading-tight tracking-tight">POCKET <span className={themeColor}>RPG</span></h1>
                    </div>
                    <div className="text-[10px] text-slate-500 font-mono tracking-wider pl-11">SYSTEM v2.1</div>
                </div>

                <div className="flex justify-around p-2 md:flex-col md:justify-start md:space-y-2 md:p-0">
                    <NavBtn active={tab === 'rules'} onClick={() => setTab('rules')} Icon={BookOpen} label="ZASADY" color={themeColor} />
                    <NavBtn active={tab === 'loot'} onClick={() => setTab('loot')} Icon={Sparkles} label="LOOT" color={themeColor} />
                    <NavBtn active={tab === 'char'} onClick={() => setTab('char')} Icon={Skull} label="POSTAĆ" color={themeColor} />
                </div>

                <div className="hidden md:block mt-auto pt-4 border-t border-slate-800">
                    <div className="text-[10px] text-slate-500 font-bold mb-2 uppercase text-center">Tryb Gry</div>
                    <div className="flex bg-slate-900 p-1 rounded-lg border border-slate-800 relative">
                        <button onClick={() => setMode('simple')} className={`flex-1 py-1.5 text-xs font-bold rounded-md transition-all ${mode === 'simple' ? 'bg-emerald-900/40 text-emerald-400 shadow-inner' : 'text-slate-600 hover:text-slate-400'}`}>SIMPLE</button>
                        <button onClick={() => setMode('advanced')} className={`flex-1 py-1.5 text-xs font-bold rounded-md transition-all ${mode === 'advanced' ? 'bg-amber-900/40 text-amber-400 shadow-inner' : 'text-slate-600 hover:text-slate-400'}`}>ADVANCED</button>
                    </div>
                </div>
            </nav>

            {/* CONTENT */}
            <div className="flex-1 flex flex-col h-full overflow-hidden relative">
                
                {/* Header Mobile */}
                <header className="md:hidden p-3 border-b border-slate-800 bg-slate-950/95 backdrop-blur-sm sticky top-0 z-10 flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded flex items-center justify-center text-black shadow-lg transition-colors duration-500 ${themeBgBtn}`}>
                            <Sword size={18} fill="currentColor" className="text-slate-950" />
                        </div>
                        <div>
                            <h1 className="font-bold text-slate-100 leading-tight">POCKET <span className={themeColor}>RPG</span></h1>
                            <div className="text-[10px] text-slate-500 font-mono tracking-wider">SYSTEM v2.1</div>
                        </div>
                    </div>
                    <div className="flex bg-slate-900 p-0.5 rounded-lg border border-slate-800">
                        <button onClick={() => setMode('simple')} className={`px-2 py-1 text-[10px] font-bold rounded ${mode === 'simple' ? 'bg-emerald-900/40 text-emerald-400' : 'text-slate-600'}`}>S</button>
                        <button onClick={() => setMode('advanced')} className={`px-2 py-1 text-[10px] font-bold rounded ${mode === 'advanced' ? 'bg-amber-900/40 text-amber-400' : 'text-slate-600'}`}>A</button>
                    </div>
                </header>

                <main className="flex-1 overflow-y-auto p-4 md:p-8 pb-24 md:pb-8 scroll-smooth">
                    <div className="max-w-7xl mx-auto h-full">
                        {tab === 'rules' && <RulesView data={DATA.rules} onFeedback={setFeedback} />}
                        {tab === 'loot' && <LootView data={DATA.loot} color={themeColor} themeBg={themeBgBtn} />}
                        {tab === 'char' && <CharView classes={DATA.classes} spells={DATA.spells} onFeedback={setFeedback} color={themeColor} />}
                    </div>
                </main>
            </div>

            {/* Feedback Modal */}
            {feedback && (
                <div className="fixed inset-0 bg-black/80 backdrop-blur-[2px] z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
                    <div className="bg-slate-900 border border-slate-700 w-full max-w-sm rounded-lg p-4 shadow-2xl">
                        <div className="flex justify-between items-center pb-3 border-b border-slate-800 mb-3">
                            <h3 className="font-bold text-slate-200 flex items-center gap-2"><Flag size={16} className="text-red-500"/> Zgłoś błąd</h3>
                            <button onClick={() => setFeedback(null)}><X className="text-slate-500 hover:text-white" /></button>
                        </div>
                        <p className="text-xs text-slate-500 mb-2">Kontekst: <span className="text-slate-300 font-mono">{feedback.title || feedback.name}</span></p>
                        <textarea className="w-full bg-slate-950 border border-slate-800 rounded p-3 text-sm text-white h-24 focus:border-amber-500 focus:outline-none mb-3" placeholder="Opisz problem..." autoFocus></textarea>
                        <button onClick={() => setFeedback(null)} className="w-full bg-slate-800 hover:bg-slate-700 text-slate-200 py-2 rounded font-bold transition-colors">WYŚLIJ</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default App;