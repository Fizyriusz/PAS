import React, { useState } from 'react';
import { KEYWORDS } from '../data/gameData';

// --- CZĘŚĆ 1: Obsługa Słów Kluczowych (Tooltips) ---
const KeywordHighlighter = ({ text }) => {
    const [tooltip, setTooltip] = useState(null);
    
    // Zabezpieczenie na wypadek braku tekstu
    if (!text) return null;

    const regex = new RegExp(`\\b(${Object.keys(KEYWORDS).join('|')})\\b`, 'gi');
    const parts = text.split(regex);

    return (
        <>
            {parts.map((part, i) => {
                const match = Object.keys(KEYWORDS).find(k => k.toLowerCase() === part.toLowerCase());
                
                if (match) {
                    return (
                        <span key={i} className="relative inline-block z-10">
                            <span 
                                className="text-amber-500 font-bold cursor-help border-b border-dotted border-amber-500/50 hover:text-amber-400 transition-colors" 
                                onClick={(e) => { 
                                    e.stopPropagation(); 
                                    setTooltip(tooltip === match ? null : match); 
                                }}
                            >
                                {part}
                            </span>
                            {tooltip === match && (
                                <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 bg-slate-950 border border-amber-500 p-3 rounded-lg text-xs text-slate-300 shadow-2xl z-50 whitespace-normal text-left">
                                    <strong className="block text-amber-500 mb-1 text-sm uppercase tracking-wider">{match}</strong>
                                    {KEYWORDS[match]}
                                </span>
                            )}
                        </span>
                    );
                }
                return part;
            })}
        </>
    );
};

// --- CZĘŚĆ 2: Główny Komponent (Parser Markdown) ---
const SmartText = ({ text }) => {
    if (!text) return null;

    // Krok 1: Podział na linie (obsługa Enterów)
    const lines = text.split('\n');

    return (
        <span className="block">
            {lines.map((line, lineIndex) => {
                // Krok 2: Wykrywanie pogrubień (**tekst**)
                // Dzielimy linię tam, gdzie są podwójne gwiazdki
                const parts = line.split(/(\*\*.*?\*\*)/g);

                return (
                    <span key={lineIndex} className="block min-h-[1.5em] mb-1"> {/* min-h naprawia puste linie */}
                        {parts.map((part, partIndex) => {
                            // Jeśli fragment zaczyna się i kończy na **, to jest to pogrubienie
                            if (part.startsWith('**') && part.endsWith('**')) {
                                const content = part.slice(2, -2); // Usuń gwiazdki
                                return (
                                    <strong key={partIndex} className="text-white font-extrabold tracking-wide">
                                        {/* Wewnątrz pogrubienia też szukamy słów kluczowych */}
                                        <KeywordHighlighter text={content} />
                                    </strong>
                                );
                            }
                            // Zwykły tekst
                            return <KeywordHighlighter key={partIndex} text={part} />;
                        })}
                    </span>
                );
            })}
        </span>
    );
};

export default SmartText;