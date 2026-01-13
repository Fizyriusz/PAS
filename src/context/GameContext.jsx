import React, { createContext, useState, useEffect, useContext } from 'react';

// Tworzymy kontekst
const GameContext = createContext();

export const useGame = () => useContext(GameContext);

export const GameProvider = ({ children }) => {
    // --- STAN POSTACI (ZAPISYWANY W PAMIĘCI TELEFONU) ---
    // Ładujemy z LocalStorage, a jak nie ma, to dajemy wartości domyślne
    const [charState, setCharState] = useState(() => {
        const saved = localStorage.getItem('pocket_rpg_char');
        return saved ? JSON.parse(saved) : { 
            cls: 'fighter', 
            hp: 3, // Wartość w kostkach (nie punktach!) - przeliczamy w widoku
            mana: 0 
        };
    });

    // --- STAN MISTRZA GRY ---
    const [gmState, setGmState] = useState(() => {
        const saved = localStorage.getItem('pocket_rpg_gm');
        return saved ? JSON.parse(saved) : {
            scenarioId: null,
            currentAct: 0,
            bossHp: 6,
            bossMaxHp: 6
        };
    });

    // --- STAN LOOTU (HISTORIA) ---
    const [lootHistory, setLootHistory] = useState(() => {
        const saved = localStorage.getItem('pocket_rpg_loot');
        return saved ? JSON.parse(saved) : [];
    });

    // AUTOMATYCZNY ZAPIS PRZY KAŻDEJ ZMIANIE
    useEffect(() => { localStorage.setItem('pocket_rpg_char', JSON.stringify(charState)); }, [charState]);
    useEffect(() => { localStorage.setItem('pocket_rpg_gm', JSON.stringify(gmState)); }, [gmState]);
    useEffect(() => { localStorage.setItem('pocket_rpg_loot', JSON.stringify(lootHistory)); }, [lootHistory]);

    // Funkcje pomocnicze
    const updateChar = (updates) => setCharState(prev => ({ ...prev, ...updates }));
    const updateGm = (updates) => setGmState(prev => ({ ...prev, ...updates }));
    const addLoot = (item) => setLootHistory(prev => [item, ...prev].slice(0, 10)); // Pamiętaj 10 ostatnich

    return (
        <GameContext.Provider value={{
            charState, updateChar,
            gmState, updateGm,
            lootHistory, addLoot
        }}>
            {children}
        </GameContext.Provider>
    );
};