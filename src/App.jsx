import React, { useState } from 'react';
import { Sword, BookOpen, Sparkles, Skull, Search, Flag, X, Dices } from 'lucide-react';
import SmartText from './components/SmartText';
import { DATA_SIMPLE, DATA_ADVANCED } from './data/gameData';

// --- WIDOKI POMOCNICZE ---

const RulesView = ({ data, onFeedback }) => {
    const [q, setQ] = useState('');
    const filtered = data.filter(r => 
        r.title.toLowerCase().includes(q.toLowerCase()) || 
        r.content.toLowerCase().includes(q.toLowerCase())
    );

    return (
        <div className="space-y-4">
            <div className="relative">
                <input 
                    type="text" 
                    placeholder="Szukaj zasad..." 
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg py-3 pl-10 text-white focus:outline-none focus:border-amber-500 transition-colors" 
                    value={q} 
                    onChange={e => setQ(e.target.value)} 
                />
                <span className="absolute left-3 top-3.5 text-slate-500">
                    <Search size={18} />
                </span>
            </div>
            {filtered.map(r => (
                <div key={r.id} className="bg-slate-900 border border-slate-800 rounded-lg p-4 group relative hover:border-slate-700 transition-colors">
                    <div className="flex justify-between items-start mb-2">
                        <h3 className="font-bold text-slate-200">{r.title}</h3>
                        <button onClick={() => onFeedback(r)} className="text-slate-700 hover:text-red-500 p-1 transition-colors">
                            <Flag size={14} />
                        </button>
                    </div>
                    <span className="text-[10px] uppercase text-slate-500 font-bold mb-2 block tracking-wider">{r.category}</span>
                    <p className="text-sm text-slate-400 leading-relaxed">
                        <SmartText text={r.content} />
                    </p>
                </div>
            ))}
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
        <div className="h-full flex flex-col items-center justify-center gap-6">
            <div className="min-h-[160px] w-full flex items-center justify-center">
                {res ? (
                    <div className="bg-slate-900 border border-slate-800 p-6 rounded-lg text-center w-full animate-pulse-once shadow-xl">
                        <div className={`text-2xl font-bold mb-2 ${res.color}`}>{res.name}</div>
                        <div className="text-slate-400 text-sm mb-4">{res.desc}</div>
                        <div className="inline-block px-3 py-1 bg-slate-950 rounded text-xs font-mono text-slate-500">Rzut: {res.r}</div>
                    </div>
                ) : (
                    <div className={`text-slate-600 ${rolling ? 'animate-pulse' : ''}`}>
                        {rolling ? 'Losowanie...' : 'Skrzynia zamknięta'}
                    </div>
                )}
            </div>
            {data.length > 0 ? (
                <button 
                    onClick={roll} 
                    disabled={rolling}
                    className={`w-full ${btnBg} hover:opacity-90 text-black font-bold py-4 rounded-lg flex items-center justify-center gap-2 active:scale-95 transition-all shadow-lg`}
                >
                    <Dices size={20} className={rolling ? 'animate-spin' : ''}/> 
                    OTWÓRZ (d20)
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
        <div className="space-y-6">
            <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
                {Object.keys(classes).map(k => (
                    <button 
                        key={k} 
                        onClick={() => setCls(k)} 
                        className={`px-4 py-2 rounded font-bold text-sm border whitespace-nowrap transition-colors ${cls === k ? `bg-slate-800 ${color} border-slate-600` : 'bg-slate-900 text-slate-500 border-slate-800'}`}
                    >
                        {classes[k].name}
                    </button>
                ))}
            </div>
            
            <div className="bg-slate-900 border border-slate-800 p-4 rounded-lg space-y-3 relative shadow-md">
                <div className="flex justify-between">
                    <h2 className="text-xl font-bold text-white">{h.name}</h2>
                    <button onClick={() => onFeedback({ name: h.name })} className="text-slate-600 hover:text-red-500 transition-colors">
                        <Flag size={14} />
                    </button>
                </div>
                <div className={`text-xs uppercase font-bold ${color} tracking-widest`}>{h.role}</div>
                
                <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="bg-slate-950 p-2 rounded text-slate-400 border border-slate-800">
                        <strong className="block text-slate-500 mb-1 uppercase text-[10px]">HP / Mana</strong>
                        {h.hp} HP <span className="text-slate-600">|</span> {h.mana} Mana
                    </div>
                    <div className="bg-slate-950 p-2 rounded text-slate-400 border border-slate-800">
                        <strong className="block text-slate-500 mb-1 uppercase text-[10px]">Cechy</strong>
                        <SmartText text={h.stats} />
                    </div>
                </div>

                <div className="pt-2 border-t border-slate-800 space-y-2">
                    <div>
                        <span className="text-[10px] uppercase text-slate-500 font-bold block mb-0.5">Pasywna</span>
                        <span className="text-sm text-slate-300"><SmartText text={h.passive} /></span>
                    </div>
                    <div>
                        <span className="text-[10px] uppercase text-slate-500 font-bold block mb-0.5">Aktywna</span>
                        <span className="text-sm text-slate-300"><SmartText text={h.active} /></span>
                    </div>
                </div>
            </div>

            {spells[cls] && (
                <div className="space-y-3">
                    <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mt-6">Księga Zaklęć</h3>
                    {[...(spells[cls].cantrips || []), ...(spells[cls].tier1 || []), ...(spells[cls].tier2 || [])].map((s, i) => (
                        <div key={i} className="bg-slate-900/50 border border-slate-800 p-3 rounded flex justify-between group hover:bg-slate-900 transition-colors">
                            <div>
                                <div className="font-bold text-sm text-slate-300 flex items-center gap-2">
                                    {s.name} 
                                    {s.cost && <span className="text-[10px] text-blue-400 bg-blue-900/30 px-1.5 py-0.5 rounded border border-blue-900/50">{s.cost} Mana</span>}
                                </div>
                                <div className="text-xs text-slate-500 mt-1"><SmartText text={s.desc} /></div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

const NavBtn = ({ active, onClick, Icon, label, color }) => (
    <button 
        onClick={onClick} 
        className={`flex flex-col items-center w-16 p-2 rounded transition-all duration-300 ${active ? `${color} scale-110` : 'text-slate-600 hover:text-slate-400'}`}
    >
        <Icon size={24} className="mb-1" strokeWidth={active ? 2.5 : 2} />
        <span className="text-[10px] font-bold">{label}</span>
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
        <div className="flex flex-col h-screen max-w-md mx-auto border-x border-slate-900 shadow-2xl bg-slate-950 font-sans">
            
            {/* Header */}
            <header className="p-3 border-b border-slate-800 bg-slate-950/95 backdrop-blur-sm sticky top-0 z-10 space-y-3">
                <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded flex items-center justify-center text-black shadow-lg transition-colors duration-500 ${themeBgBtn}`}>
                            <Sword size={18} fill="currentColor" className="text-slate-950" />
                        </div>
                        <div>
                            <h1 className="font-bold text-slate-100 leading-tight">POCKET <span className={themeColor}>RPG</span></h1>
                            <div className="text-[10px] text-slate-500 font-mono tracking-wider">SYSTEM v2.1</div>
                        </div>
                    </div>
                </div>

                {/* Mode Toggle */}
                <div className="flex bg-slate-900 p-1 rounded-lg border border-slate-800 relative">
                    <button 
                        onClick={() => setMode('simple')}
                        className={`flex-1 py-1.5 text-xs font-bold rounded-md transition-all ${mode === 'simple' ? 'bg-emerald-900/40 text-emerald-400 shadow-inner' : 'text-slate-600 hover:text-slate-400'}`}
                    >
                        SIMPLE MODE
                    </button>
                    <button 
                        onClick={() => setMode('advanced')}
                        className={`flex-1 py-1.5 text-xs font-bold rounded-md transition-all ${mode === 'advanced' ? 'bg-amber-900/40 text-amber-400 shadow-inner' : 'text-slate-600 hover:text-slate-400'}`}
                    >
                        ADVANCED
                    </button>
                </div>
            </header>

            {/* Content */}
            <main className="flex-1 overflow-y-auto p-4 pb-24 scroll-smooth">
                {tab === 'rules' && <RulesView data={DATA.rules} onFeedback={setFeedback} />}
                {tab === 'loot' && <LootView data={DATA.loot} color={themeColor} themeBg={themeBgBtn} />}
                {tab === 'char' && <CharView classes={DATA.classes} spells={DATA.spells} onFeedback={setFeedback} color={themeColor} />}
            </main>

            {/* Navbar */}
            <nav className="border-t border-slate-800 bg-slate-950/95 backdrop-blur-md absolute bottom-0 w-full z-20 pb-safe">
                <div className="flex justify-around p-2">
                    <NavBtn active={tab === 'rules'} onClick={() => setTab('rules')} Icon={BookOpen} label="Zasady" color={themeColor} />
                    <NavBtn active={tab === 'loot'} onClick={() => setTab('loot')} Icon={Sparkles} label="Loot" color={themeColor} />
                    <NavBtn active={tab === 'char'} onClick={() => setTab('char')} Icon={Skull} label="Postać" color={themeColor} />
                </div>
            </nav>

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