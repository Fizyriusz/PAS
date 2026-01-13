import React from 'react';
import { Map, Backpack, Sword, Rocket, Brain, GitBranch, ArrowRight, Sparkles } from 'lucide-react';
import SmartText from '../components/SmartText';
import { DATA_INTRO } from '../data/gameData';

const IntroView = ({ onStart }) => {
    const getIcon = (name) => {
        switch(name) {
            case 'Map': return <Map size={32} className="text-amber-500" />;
            case 'Backpack': return <Backpack size={32} className="text-emerald-500" />;
            case 'Swords': return <Sword size={32} className="text-red-500" />;
            case 'Rocket': return <Rocket size={32} className="text-purple-500" />;
            case 'Brain': return <Brain size={32} className="text-blue-500" />;
            case 'GitBranch': return <GitBranch size={32} className="text-slate-400" />;
            default: return <Sparkles size={32} className="text-amber-500" />;
        }
    };

    return (
        <div className="max-w-3xl mx-auto space-y-12 py-4 animate-in fade-in duration-500">
            {DATA_INTRO.map((section) => (
                <div key={section.id} className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 md:p-8 relative overflow-hidden group hover:border-slate-700 transition-colors">
                    <div className="absolute top-0 right-0 p-4 opacity-5 transform translate-x-1/4 -translate-y-1/4 group-hover:scale-110 transition-transform duration-700">
                        {getIcon(section.icon)}
                    </div>
                    <div className="flex flex-col md:flex-row gap-6 items-start relative z-10">
                        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 shadow-xl shrink-0">
                            {getIcon(section.icon)}
                        </div>
                        <div className="space-y-3 flex-1">
                            {section.subtitle && <div className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">{section.subtitle}</div>}
                            <h2 className="text-2xl md:text-3xl font-bold text-slate-100">{section.title}</h2>
                            <div className="text-slate-300 leading-relaxed text-base md:text-lg">
                                <SmartText text={section.content} />
                            </div>
                        </div>
                    </div>
                </div>
            ))}
            <div className="mt-12 mb-8 flex justify-center">
                <button 
                    onClick={onStart}
                    className="bg-amber-600 hover:bg-amber-500 text-black text-lg font-bold py-4 px-12 rounded-full shadow-2xl hover:scale-105 active:scale-95 transition-all flex items-center gap-3"
                >
                    ROZPOCZNIJ PRZYGODĘ <ArrowRight size={24} />
                </button>
            </div>
        </div>
    );
};

export default IntroView;