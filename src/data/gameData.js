export const KEYWORDS = {
    "d20": "Kość Losu. 1-10 Porażka, 11+ Sukces.",
    "d6": "Kość Zasobów (HP/Mana).",
    "Mana": "Zasób magiczny (Niebieska d6). Służy do rzucania potężnych zaklęć.",
    "Moc": "Siła ciosu. Określa o ile oczek obracasz kostkę wroga. 1: -1 oczko, 2: -2 oczka, 3: -3 oczka.",
    "Biegłość": "Twoja specjalizacja. Rzuć 2x k20, wybierz WYŻSZY wynik (Ułatwienie).",
    "Słabość": "Coś co Ci nie leży. Rzuć 2x k20, wybierz NIŻSZY wynik (Utrudnienie).",
    "Ułatwienie": "Rzuć 2x k20, wybierz wyższy wynik.",
    "Utrudnienie": "Rzuć 2x k20, wybierz niższy wynik.",
    "Klikanie": "System HP. Nie zdejmuj kostki po trafieniu! Obróć ją w dół o wartość Mocy.",
    "Minion": "Pionek. Ginie od 1 trafienia (dowolna Moc).",
    "Boss": "Elitarny wróg. Ma kości HP. Trafienie go obraca jego kość.",
    "Auto-Hit": "Nie rzucasz kostką. Atak trafia automatycznie.",
    "Cantrip": "Darmowe zaklęcie podstawowe (Moc 1).",
    "Ultimate": "Potężny atak (Moc 3 lub 4).",
};

// ... (KEYWORDS zostaje bez zmian)

export const DATA_SIMPLE = {
    rules: [
        // --- SEKCJA: MECHANIKA (DAWNIEJ SILNIK) ---
        { 
            id: "s_core", 
            title: "1. Jak wykonywać testy?", 
            category: "Silnik", 
            summary: "Rzut k20. 1-10 Porażka, 11-20 Sukces. Brak matematyki.",
            content: "**Zasada #1: Nie licz w pamięci.**\nW tej grze nie ma dodawania cyfr (+1, +3). Kiedy chcesz coś zrobić, po prostu rzuć d20.\n\n**Czy mi się udało?**\n❌ **Wynik 1-10:** PORAŻKA (Spudłowałeś, oberwałeś, potknąłeś się).\n✅ **Wynik 11-20:** SUKCES (Trafiłeś, uniknąłeś, udało się)." 
        },
        { 
            id: "s_prof", 
            title: "2. Iloma kostkami rzucam?", 
            category: "Silnik", 
            summary: "Biegłość = 2 kostki (wyższy). Słabość = 2 kostki (niższy).",
            content: "Twoja klasa określa, w czym jesteś dobry.\n\n🔥 **Jesteś w tym Biegły?**\n(np. Wojownik atakujący mieczem)\nRzuć 2 kostki, wybierz WYŻSZY wynik (Ułatwienie).\n\n❄️ **Jesteś w tym Słaby?**\n(np. Mag wyważający drzwi)\nRzuć 2 kostki, wybierz NIŻSZY wynik (Utrudnienie).\n\n⚪ **Wszystko inne:**\nRzuć po prostu 1 kostkę." 
        },

        // --- SEKCJA: WALKA ---
        { 
            id: "s_hp", 
            title: "3. Jak działa zdrowie?", 
            category: "Walka", 
            summary: "Klikanie: Obracaj kostki w dół. Poniżej 1 = Odpada.",
            content: "Twoje życie to Czerwone Kostki w puszce. Wszystkie startują ustawione na **6**.\n\n**Kiedy obrywasz...**\nGdy wróg Cię trafi, nie wyrzucaj kostki! Zamiast tego 'kliknij' nią w dół:\n🔹 **Zwykły cios:** Obróć o -2 oczka (np. z 6 na 4).\n💀 **Potężny cios (Boss):** Obróć o -4 oczka.\n\n**Kiedy giniesz?**\nDopiero gdy musisz obrócić kostkę poniżej 1. Wtedy usuń ją do pudełka. Kolejne obrażenia 'nadgryzają' następną kostkę." 
        },
        { 
            id: "s_combat", 
            title: "4. Twoja Tura (Atak)", 
            category: "Walka", 
            summary: "Test 11+. Lekka -1, Ciężka -2, Ult -3.",
            content: "**Krok 1: Atak**\nWykonaj rzut d20.\n\n✅ **Sukces (11+):** Trafiłeś! Sprawdź Moc broni i obróć kostkę wroga:\n🗡️ **Lekka (Moc 1):** Sztylety, magia podstawowa.\n⚔️ **Ciężka (Moc 2):** Miecze, silne czary.\n🔥 **Ultimate (Moc 3):** Najpotężniejsze ataki.\n\n❌ **Porażka (1-10):** Pudło.\n\n*(Miniony mają 1 HP – każde trafienie zdejmuje je z planszy)*." 
        },
        { 
            id: "s_defense", 
            title: "5. Tura Wroga (Obrona)", 
            category: "Walka", 
            summary: "Wrogowie nie rzucają. Ty robisz Unik (11+).",
            content: "**Krok 2: Obrona**\nWrogowie nie rzucają kośćmi. To Ty rzucasz, żeby się obronić.\n\nGdy wróg atakuje, rzuć d20:\n🛡️ **Sukces (11+):** Nic się nie dzieje. Jesteś bezpieczny.\n🤕 **Porażka (1-10):** Obrywasz! Obróć swoją kostkę życia o -2." 
        },

        // --- SEKCJA: ŚWIAT / EKSPLORACJA ---
        { 
            id: "s_magic", 
            title: "6. Magia Użytkowa (Joker)", 
            category: "Eksploracja", 
            summary: "Spal 1 Manę = Auto-Sukces fabularny.",
            content: "Grasz Magiem lub Klerykiem i widzisz zamknięte drzwi albo ciemną przepaść?\n\n✨ **Spal 1 Manę.**\n\nProblem rozwiązany automatycznie (bez rzutu). Magia to uniwersalny klucz do fabuły." 
        },
        {
            id: "s_traps",
            title: "7. Pułapki",
            category: "Eksploracja",
            summary: "Test 11+. Porażka = Strata całej kostki.",
            content: "Gdy wejdziesz w pułapkę, rzuć d20.\n\n✅ **Sukces (11+):** Unikasz zagrożenia.\n⚠️ **Porażka (1-10):** Tracisz jedną PEŁNĄ Kostkę Życia."
        }
    ],
    
    loot: [
        { range: [1, 1], name: "Śmieci", desc: "Pusto.", rarity: "common", color: "text-slate-500" },
        { range: [2, 5], name: "Trening", desc: "Ułatwienie w następnej walce.", rarity: "common", color: "text-slate-400" },
        { range: [6, 10], name: "Złoto", desc: "Punkty zwycięstwa.", rarity: "uncommon", color: "text-amber-200" },
        { range: [11, 14], name: "Mikstura HP", desc: "Odzyskaj 1 Kostkę Życia (na 6).", rarity: "uncommon", color: "text-green-400" },
        { range: [15, 17], name: "Zwój Ochrony", desc: "Tarcza. Jednorazowe anulowanie obrażeń.", rarity: "rare", color: "text-blue-400" },
        { range: [18, 19], name: "Ulepszenie", desc: "Twoja broń zadaje +1 obrażeń na stałe.", rarity: "rare", color: "text-purple-400" },
        { range: [20, 20], name: "Artefakt", desc: "Stały bonus do życia lub ataku.", rarity: "epic", color: "text-amber-500" }
    ],

    classes: {
        fighter: { 
            name: "Wojownik", 
            role: "Czołg", 
            hp: 3, 
            mana: 0, 
            stats: "🔥 Biegłość: Walka Wręcz, Siła.\n⚪ Neutralny: Reszta.", 
            passive: "⚔️ Atak: Ciężki (Moc 2).", 
            active: "🛡️ Twardziel: Raz na walkę ignorujesz jedno trafienie." 
        },
        rogue: { 
            name: "Łotrzyk", 
            role: "Zwiadowca", 
            hp: 2, 
            mana: 0, 
            stats: "🔥 Biegłość: Łuk, Skradanie, Uniki.\n⚪ Neutralny: Reszta.", 
            passive: "🗡️ Atak: Lekki (Moc 1).", 
            active: "💀 Cios w Plecy: Jeśli bijesz wroga zajętego walką, zadajesz Ultimate (Moc 3)." 
        },
        wizard: { 
            name: "Czarodziej", 
            role: "Magia Ofensywna", 
            hp: 1, 
            mana: 3, 
            stats: "🔥 Biegłość: Wiedza, Magia.\n❄️ Słabość: Siła.", 
            passive: "🔥 Cantrip: Ognisty Pocisk (Moc 1, Dystans).", 
            active: "✨ Mana to amunicja do potężnych zaklęć." 
        },
        cleric: { 
            name: "Kleryk", 
            role: "Wsparcie", 
            hp: 2, 
            mana: 2, 
            stats: "🔥 Biegłość: Percepcja, Siła Woli.\n❄️ Słabość: Skradanie.", 
            passive: "☀️ Cantrip: Święty Płomień (Moc 1, ignoruje osłony).", 
            active: "❤️ Mana służy do leczenia i świętego gniewu." 
        }
    },

    spells: {
        wizard: {
            cantrips: [{ name: "Ognisty Pocisk", desc: "Test 11+. Moc 1. Dystans." }],
            tier1: [{ name: "Pewny Pocisk", cost: 1, desc: "🎯 Auto-Hit. Moc 2. Pewne obrażenia." }],
            tier2: [{ name: "Kula Ognia", cost: 2, desc: "🔥 Auto-Hit. Moc 3 dla WSZYSTKICH wrogów." }]
        },
        cleric: {
            cantrips: [{ name: "Święty Płomień", desc: "Test 11+. Moc 1. Ignoruje osłony." }],
            tier1: [{ name: "Leczenie", cost: 1, desc: "❤️ Daj sojusznikowi nową, pełną kostkę życia." }],
            tier2: [{ name: "Gniew Niebios", cost: 2, desc: "⚡ Potężny atak (Moc 4!) na pojedynczy cel." }]
        }
    }
};

// ... (DATA_ADVANCED zostaje bez zmian)

export const DATA_ADVANCED = {
    rules: [
        { id: "a_core", title: "Mechanika Testów", category: "Ogólne", content: "d20 + Modyfikator vs DC (10/12/15). Nat 20 Krytyk." },
        { id: "a_stats", title: "Statystyki", category: "Ogólne", content: "STR, DEX, CON, INT, WIS, CHA. Modyfikatory: +3/+1/0/-1." },
        { id: "a_combat", title: "Pozycjonowanie", category: "Walka", content: "Zwarcie vs Dystans. Wyjście ze zwarcia = Atak Okazyjny." }
    ],
    loot: [], 
    classes: {
        fighter: { name: "Wojownik (ADV)", role: "Tank", stats: "STR+3, CON+1", hp: 3, mana: 0, passive: "Reroll 1 i 2 na dmg.", active: "Action Surge." }
    },
    spells: {}
};