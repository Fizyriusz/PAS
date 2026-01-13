import React, { useState } from 'react';
import { Sword, BookOpen, Sparkles, Skull, Flag, X, Map, Crown } from 'lucide-react';
import { DATA_SIMPLE, DATA_ADVANCED } from './data/gameData';

// Importujemy widoki
import IntroView from './views/IntroView';
import RulesView from './views/RulesView';
import LootView from './views/LootView';
import CharView from './views/CharView';
import GmView from './views/GmView';

// --- KOMPONENTY UI ---

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

const FeedbackModal = ({ context, onClose }) => (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-[2px] z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
        <div className="bg-slate-900 border border-slate-700 w-full max-w-sm rounded-lg p-4 shadow-2xl">
            <div className="flex justify-between items-center pb-3 border-b border-slate-800 mb-3">
                <h3 className="font-bold text-slate-200 flex items-center gap-2"><Flag size={16} className="text-red-500"/> Zgłoś błąd</h3>
                <button onClick={onClose}><X className="text-slate-500 hover:text-white" /></button>
            </div>
            <p className="text-xs text-slate-500 mb-2">Kontekst: <span className="text-slate-300 font-mono">{context.title || context.name}</span></p>
            <textarea className="w-full bg-slate-950 border border-slate-800 rounded p-3 text-sm text-white h-24 focus:border-amber-500 focus:outline-none mb-3" placeholder="Opisz problem..." autoFocus></textarea>
            <button onClick={onClose} className="w-full bg-slate-800 hover:bg-slate-700 text-slate-200 py-2 rounded font-bold transition-colors">WYŚLIJ</button>
        </div>
    </div>
);

// --- GŁÓWNA APLIKACJA ---

function App() {
    const [tab, setTab] = useState(() => {
        const hasSeenIntro = localStorage.getItem('pocket_rpg_intro_seen');
        return hasSeenIntro ? 'rules' : 'intro';
    });
    
    const [mode, setMode] = useState('simple');
    const [feedback, setFeedback] = useState(null);

    const DATA = mode === 'simple' ? DATA_SIMPLE : DATA_ADVANCED;
    const themeColor = mode === 'simple' ? 'text-emerald-500' : 'text-amber-500';
    const themeBgBtn = mode === 'simple' ? 'bg-emerald-600' : 'bg-amber-600';

    const completeIntro = () => {
        localStorage.setItem('pocket_rpg_intro_seen', 'true');
        setTab('rules');
        window.scrollTo(0,0);
    };

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
                    <NavBtn active={tab === 'intro'} onClick={() => setTab('intro')} Icon={Map} label="WSTĘP" color={themeColor} />
                    <NavBtn active={tab === 'rules'} onClick={() => setTab('rules')} Icon={BookOpen} label="ZASADY" color={themeColor} />
                    <NavBtn active={tab === 'loot'} onClick={() => setTab('loot')} Icon={Sparkles} label="LOOT" color={themeColor} />
                    <NavBtn active={tab === 'char'} onClick={() => setTab('char')} Icon={Skull} label="POSTAĆ" color={themeColor} />
                    {/* NOWY PRZYCISK: MG */}
                    <div className="md:mt-4 md:border-t md:border-slate-800 md:pt-4">
                        <NavBtn active={tab === 'gm'} onClick={() => setTab('gm')} Icon={Crown} label="MISTRZ" color="text-amber-500" />
                    </div>
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
                    {/* Mode Toggle (Mobile) */}
                    <div className="flex bg-slate-900 p-0.5 rounded-lg border border-slate-800">
                        <button onClick={() => setMode('simple')} className={`px-2 py-1 text-[10px] font-bold rounded ${mode === 'simple' ? 'bg-emerald-900/40 text-emerald-400' : 'text-slate-600'}`}>S</button>
                        <button onClick={() => setMode('advanced')} className={`px-2 py-1 text-[10px] font-bold rounded ${mode === 'advanced' ? 'bg-amber-900/40 text-amber-400' : 'text-slate-600'}`}>A</button>
                    </div>
                </header>

                <main className="flex-1 overflow-y-auto p-4 md:p-8 pb-24 md:pb-8 scroll-smooth">
                    <div className="max-w-7xl mx-auto h-full">
                        {tab === 'intro' && <IntroView onStart={completeIntro} />}
                        {tab === 'rules' && <RulesView data={DATA.rules} onFeedback={setFeedback} />}
                        {tab === 'loot' && <LootView data={DATA.loot} themeBg={themeBgBtn} />}
                        {tab === 'char' && <CharView classes={DATA.classes} spells={DATA.spells} onFeedback={setFeedback} color={themeColor} />}
                        {tab === 'gm' && <GmView color={themeColor} />}
                    </div>
                </main>
            </div>

            {/* Modal */}
            {feedback && <FeedbackModal context={feedback} onClose={() => setFeedback(null)} />}
        </div>
    );
}

export default App;