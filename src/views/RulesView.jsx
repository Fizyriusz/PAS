import React, { useState } from 'react';
import { Search, LayoutGrid, Book, BookOpen, Flag, X } from 'lucide-react';
import SmartText from '../components/SmartText';

const RulesView = ({ data, onFeedback }) => {
    const [q, setQ] = useState('');
    const [selectedRule, setSelectedRule] = useState(null);
    const [viewMode, setViewMode] = useState('grid');

    const filtered = data.filter(r => 
        r.title.toLowerCase().includes(q.toLowerCase()) || 
        r.content.toLowerCase().includes(q.toLowerCase())
    );

    const groupedRules = filtered.reduce((acc, rule) => {
        if (!acc[rule.category]) acc[rule.category] = [];
        acc[rule.category].push(rule);
        return acc;
    }, {});

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
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                <div className="relative w-full md:max-w-sm">
                    <input type="text" placeholder="Szukaj..." className="w-full bg-slate-900 border border-slate-800 rounded-xl py-3 pl-10 text-white focus:outline-none focus:border-amber-500 transition-all shadow-sm placeholder:text-slate-600" value={q} onChange={e => setQ(e.target.value)} />
                    <span className="absolute left-3 top-3.5 text-slate-500"><Search size={18} /></span>
                </div>
                <div className="flex bg-slate-900 p-1 rounded-lg border border-slate-800 shrink-0">
                    <button onClick={() => setViewMode('grid')} className={`flex items-center gap-2 px-3 py-2 text-xs font-bold rounded-md transition-all ${viewMode === 'grid' ? 'bg-slate-700 text-white shadow' : 'text-slate-500 hover:text-slate-300'}`}><LayoutGrid size={14}/> ŚCIĄGA</button>
                    <button onClick={() => setViewMode('book')} className={`flex items-center gap-2 px-3 py-2 text-xs font-bold rounded-md transition-all ${viewMode === 'book' ? 'bg-slate-700 text-white shadow' : 'text-slate-500 hover:text-slate-300'}`}><Book size={14}/> PODRĘCZNIK</button>
                </div>
            </div>
            
            {viewMode === 'grid' && sortedCategories.map(cat => (
                <div key={cat} className="space-y-3 animate-in fade-in duration-300">
                    <h3 className={`text-xs font-bold uppercase tracking-widest px-1 opacity-70 ${getCategoryStyle(cat).split(' ')[2]}`}>{cat}</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {groupedRules[cat].map(r => (
                            <button key={r.id} onClick={() => setSelectedRule(r)} className={`text-left border rounded-xl p-4 relative group transition-all hover:scale-[1.02] hover:shadow-lg flex flex-col h-full ${getCategoryStyle(r.category).split(' ')[0]} bg-slate-900/40 hover:bg-slate-900/80 backdrop-blur-sm`}>
                                <div className="flex justify-between items-start w-full mb-2">
                                    <h3 className="font-bold text-slate-100 pr-4">{r.title}</h3>
                                    <span className="text-slate-600 opacity-50 group-hover:opacity-100"><BookOpen size={14}/></span>
                                </div>
                                <p className="text-sm text-slate-400 leading-snug">{r.summary || r.content.substring(0, 60) + '...'}</p>
                            </button>
                        ))}
                    </div>
                </div>
            ))}

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
                                            <h3 className="text-xl font-bold text-slate-100 group-hover:text-amber-500 transition-colors">{r.title}</h3>
                                            <button onClick={() => onFeedback(r)} className="opacity-0 group-hover:opacity-100 text-slate-600 hover:text-red-500 transition-opacity"><Flag size={14}/></button>
                                        </div>
                                        <div className="text-slate-300 leading-relaxed text-base md:text-lg pl-4 border-l-2 border-slate-800 hover:border-slate-600 transition-colors"><SmartText text={r.content} /></div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {selectedRule && viewMode === 'grid' && (
                <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200" onClick={() => setSelectedRule(null)}>
                    <div className="bg-slate-950 border border-slate-700 w-full max-w-2xl max-h-[85vh] rounded-2xl shadow-2xl overflow-hidden flex flex-col" onClick={e => e.stopPropagation()}>
                        <div className={`p-6 border-b border-slate-800 flex justify-between items-start bg-slate-900/50 ${getCategoryStyle(selectedRule.category).split(' ')[2]}`}>
                            <div>
                                <span className="text-[10px] uppercase font-bold tracking-widest opacity-70 mb-1 block">{selectedRule.category}</span>
                                <h2 className="text-2xl font-bold text-white leading-tight">{selectedRule.title}</h2>
                            </div>
                            <button onClick={() => setSelectedRule(null)} className="p-2 bg-slate-900 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"><X size={20} /></button>
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

export default RulesView;