import React, { useState } from 'react';
import { KEYWORDS } from '../data/gameData';

const SmartText = ({ text }) => {
    const [tooltip, setTooltip] = useState(null);
    
    if (!text) return null;

    const regex = new RegExp(`\\b(${Object.keys(KEYWORDS).join('|')})\\b`, 'gi');
    const parts = text.split(regex);

    return (
        <span className="relative inline">
            {parts.map((part, i) => {
                const match = Object.keys(KEYWORDS).find(k => k.toLowerCase() === part.toLowerCase());
                
                if (match) {
                    return (
                        <span key={i} className="relative inline-block">
                            <span 
                                className="text-amber-500 font-bold cursor-help border-b border-dotted border-amber-500/50" 
                                onClick={(e) => { 
                                    e.stopPropagation(); 
                                    setTooltip(tooltip === match ? null : match); 
                                }}
                            >
                                {part}
                            </span>
                            {tooltip === match && (
                                <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 bg-slate-950 border border-amber-500 p-2 rounded text-xs text-white shadow-xl z-50">
                                    <strong className="block text-amber-500 mb-1">{match}</strong>
                                    {KEYWORDS[match]}
                                </span>
                            )}
                        </span>
                    );
                }
                return part;
            })}
        </span>
    );
};

export default SmartText;