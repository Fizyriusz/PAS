import React from 'react';
import { X, GitCommit, Zap, Map, Shield, Skull, TestTube, Save, Layout, BookOpen } from 'lucide-react';

const ChangelogModal = ({ onClose }) => {
    return (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[60] flex items-center justify-center p-4 animate-in fade-in duration-200" onClick={onClose}>
            <div className="bg-slate-900 border border-slate-700 w-full max-w-lg max-h-[85vh] rounded-xl shadow-2xl flex flex-col" onClick={e => e.stopPropagation()}>
                
                {/* HEADER */}
                <div className="flex justify-between items-center p-4 border-b border-slate-800 bg-slate-950/50 rounded-t-xl">
                    <h2 className="text-xl font-bold text-white flex items-center gap-2">
                        <GitCommit className="text-purple-500" /> Dziennik Zmian
                    </h2>
                    <button onClick={onClose} className="p-1 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white transition-colors">
                        <X size={20} />
                    </button>
                </div>

                {/* CONTENT */}
                <div className="p-6 overflow-y-auto space-y-8 scroll-smooth">
                    
                    {/* --- WERSJA 2.2 (WORKBENCH) --- */}
                    <div className="relative border-l-2 border-purple-500/30 pl-6 pb-2">
                        <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-purple-500 shadow-[0_0_10px_rgba(168,85,247,0.5)]"></div>
                        
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                                    v2.2 WORKBENCH <TestTube size={14} className="text-purple-400"/>
                                </h3>
                                <div className="text-xs font-bold text-purple-400 mt-1">DUŻA AKTUALIZACJA EKSPERYMENTALNA</div>
                            </div>
                            <span className="text-xs text-slate-500 font-mono border border-slate-800 px-2 py-1 rounded">Build: Now</span>
                        </div>

                        {/* Sekcja: SYSTEM */}
                        <div className="mb-6">
                            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3 border-b border-slate-800 pb-1">System & UI</h4>
                            <ul className="space-y-3 text-sm text-slate-300">
                                <li className="flex gap-3">
                                    <div className="bg-slate-800 p-1.5 rounded h-fit shrink-0"><TestTube size={14} className="text-purple-400"/></div>
                                    <div>
                                        <strong className="text-slate-200">Tryb Warsztatowy (Workbench)</strong>
                                        Dodano przełącznik wersji danych. Pozwala testować nowe, niestabilne mechaniki bez psucia głównej gry.
                                    </div>
                                </li>
                                <li className="flex gap-3">
                                    <div className="bg-slate-800 p-1.5 rounded h-fit shrink-0"><Save size={14} className="text-green-400"/></div>
                                    <div>
                                        <strong className="text-slate-200">Pamięć Aplikacji (Persistence)</strong>
                                        Koniec z resetowaniem! Aplikacja zapamiętuje HP, Manę i postęp scenariusza nawet po odświeżeniu strony.
                                    </div>
                                </li>
                                <li className="flex gap-3">
                                    <div className="bg-slate-800 p-1.5 rounded h-fit shrink-0"><Layout size={14} className="text-blue-400"/></div>
                                    <div>
                                        <strong className="text-slate-200">Obsługa Map Taktycznych</strong>
                                        Panel Mistrza Gry obsługuje teraz wyświetlanie map (pojedynczych i galerii) dla każdej sceny.
                                    </div>
                                </li>
                            </ul>
                        </div>

                        {/* Sekcja: MECHANIKA */}
                        <div className="mb-6">
                            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3 border-b border-slate-800 pb-1">Mechanika (Experimental)</h4>
                            <ul className="space-y-3 text-sm text-slate-300">
                                <li className="flex gap-3">
                                    <div className="bg-slate-800 p-1.5 rounded h-fit shrink-0"><Zap size={14} className="text-amber-400"/></div>
                                    <div>
                                        <strong className="text-slate-200">Strefa Środka (Glitch System)</strong>
                                        Zastąpiono system binarny (1-10/11-20) systemem trójstanowym. Wyniki 6-10 to teraz "Sukces z Kosztem".
                                    </div>
                                </li>
                                <li className="flex gap-3">
                                    <div className="bg-slate-800 p-1.5 rounded h-fit shrink-0"><Shield size={14} className="text-cyan-400"/></div>
                                    <div>
                                        <strong className="text-slate-200">Aktywna Obrona</strong>
                                        Gracze nie czekają biernie na obrażenia. Teraz wykonują rzut obronny przeciwko atakom wroga.
                                    </div>
                                </li>
                                <li className="flex gap-3">
                                    <div className="bg-slate-800 p-1.5 rounded h-fit shrink-0"><Skull size={14} className="text-red-400"/></div>
                                    <div>
                                        <strong className="text-slate-200">Elitarni Wrogowie</strong>
                                        Wprowadzono wyższy próg trafienia (15+) dla Bossów i jednostek opancerzonych.
                                    </div>
                                </li>
                            </ul>
                        </div>

                        {/* Sekcja: CONTENT */}
                        <div>
                            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3 border-b border-slate-800 pb-1">Scenariusze</h4>
                            <ul className="space-y-3 text-sm text-slate-300">
                                <li className="flex gap-3">
                                    <div className="bg-slate-800 p-1.5 rounded h-fit shrink-0"><BookOpen size={14} className="text-emerald-400"/></div>
                                    <div>
                                        <strong className="text-slate-200">Szczurzy Król v3.0 (Remake)</strong>
                                        Całkowicie przebudowany tutorial. Dodano:
                                        <ul className="list-disc list-inside text-xs text-slate-400 mt-1 pl-1">
                                            <li>Lekcje prowadzenia sesji dla MG.</li>
                                            <li>Scenę "Kramarka" (Sklep/Money Sink).</li>
                                            <li>Mechanikę Fail Forward (Porażka pcha fabułę).</li>
                                        </ul>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* --- WERSJA 2.1 (STABLE) --- */}
                    <div className="relative border-l-2 border-slate-800 pl-6 opacity-50 hover:opacity-100 transition-opacity">
                        <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-slate-700"></div>
                        <h3 className="text-lg font-bold text-white mb-1">v2.1 STABLE</h3>
                        <p className="text-sm text-slate-400 mb-2">Fundamenty systemu (MVP).</p>
                        <ul className="list-disc list-outside ml-4 text-xs text-slate-500 space-y-1">
                            <li>Panel Gracza (HP, Mana, Rzutnik).</li>
                            <li>Panel Mistrza Gry (Tracker Bossa, Nawigacja).</li>
                            <li>Podstawowe zasady (Simple/Advanced).</li>
                            <li>Responsywność mobilna.</li>
                        </ul>
                    </div>

                </div>
                
                {/* FOOTER */}
                <div className="p-4 border-t border-slate-800 bg-slate-950/30 text-center">
                    <button onClick={onClose} className="w-full bg-slate-800 hover:bg-slate-700 text-white font-bold py-3 rounded-lg transition-colors text-sm">
                        ZROZUMIAŁEM
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ChangelogModal;