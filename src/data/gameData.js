export const KEYWORDS = {
    "d20": "Kość Losu. 1-10 Porażka, 11+ Sukces (Simple).",
    "d6": "Kość Zasobów (HP/Mana).",
    "Mana": "Zasób magiczny (Niebieska d6).",
    "Moc": "Siła ciosu. 1: -1 oczko, 2: -2 oczka, 3: -3 oczka.",
    "Biegłość": "Twoja specjalizacja. Rzuć 2x k20, wybierz WYŻSZY.",
    "Słabość": "Coś co Ci nie leży. Rzuć 2x k20, wybierz NIŻSZY.",
    "Klikanie": "Metoda obrażeń. Nie zdejmuj kostki! Obróć ją w dół.",
    "STR": "Siła: Walka wręcz.",
    "DEX": "Zręczność: Dystans, uniki.",
    "DC": "Stopień Trudności (Advanced only).",
    "AC": "Klasa Pancerza (Advanced only).",
    "Ułatwienie": "Rzuć 2x k20, lepszy wynik.",
    "Utrudnienie": "Rzuć 2x k20, gorszy wynik."
};

export const DATA_SIMPLE = {
    rules: [
        { id: "s_core", title: "Złota Zasada (11+)", category: "Silnik", content: "Brak DC. Rzut k20. 1-10: Porażka. 11-20: Sukces." },
        { id: "s_prof", title: "Biegłość i Słabość", category: "Silnik", content: "Biegłość: Rzuć 2x k20, wybierz wyższy (Ułatwienie). Słabość: Rzuć 2x k20, wybierz niższy (Utrudnienie)." },
        { id: "s_hp", title: "System Zdrowia (Klikanie)", category: "Walka", content: "Nie zdejmuj kostki po trafieniu! Obróć ją w dół. Zwykły cios: -2 oczka. Boss: -4 oczka." },
        { id: "s_combat", title: "Twoja Tura", category: "Walka", content: "Rzuć k20 (11+ Trafiasz). Moc broni decyduje ile oczek zdejmujesz wrogowi." },
        { id: "s_defense", title: "Tura Wroga", category: "Walka", content: "Wrogowie nie rzucają. Ty rzucasz na Obronę. 11+ Unikasz. 1-10 Obrywasz (-2 oczka)." },
        { id: "s_magic", title: "Magia Użytkowa", category: "Eksploracja", content: "Spal 1 Manę, by rozwiązać problem fabularny bez rzutu." }
    ],
    loot: [
        { range: [1, 1], name: "Śmieci", desc: "Pusto.", rarity: "common", color: "text-slate-500" },
        { range: [2, 5], name: "Trening", desc: "Następna walka z Ułatwieniem.", rarity: "common", color: "text-slate-400" },
        { range: [6, 10], name: "Złoto", desc: "Punkty zwycięstwa.", rarity: "uncommon", color: "text-amber-200" },
        { range: [11, 14], name: "Mikstura HP", desc: "Pełne leczenie (Nowa kość na 6).", rarity: "uncommon", color: "text-green-400" },
        { range: [15, 17], name: "Zwój Ochrony", desc: "Anuluj jedno trafienie (Tarcza).", rarity: "rare", color: "text-blue-400" },
        { range: [20, 20], name: "Artefakt", desc: "Stałe Ułatwienie do ataków.", rarity: "epic", color: "text-amber-500" }
    ],
    classes: {
        fighter: { name: "Wojownik", role: "Tank", stats: "Biegłość: Walka Wręcz. Słabość: Magia.", hp: 3, mana: 0, passive: "Atak: Ciężki Miecz (Moc 2).", active: "Twardziel: Zignoruj 1 obrażenia na walkę." },
        rogue: { name: "Łotrzyk", role: "DPS", stats: "Biegłość: Dystans, Uniki. Słabość: Siła.", hp: 2, mana: 0, passive: "Atak: Lekki Sztylet (Moc 1).", active: "Cios w Plecy: Jeśli sojusznik walczy, masz Moc 3." },
        wizard: { name: "Czarodziej", role: "Magia", stats: "Biegłość: Magia. Słabość: Siła.", hp: 1, mana: 3, passive: "Cantrip: Ognisty Pocisk (Moc 1).", active: "Mana to amunicja." },
        cleric: { name: "Kleryk", role: "Wsparcie", stats: "Biegłość: Siła Woli. Słabość: Skradanie.", hp: 2, mana: 2, passive: "Cantrip: Święty Płomień (Moc 1).", active: "Leczenie: Spal 1 Manę = Odzyskaj kość." }
    },
    spells: {
        wizard: {
            cantrips: [{ name: "Ognisty Pocisk", desc: "Test 11+. Moc 1 (Obróć -1)." }],
            tier1: [{ name: "Pewny Pocisk", cost: 1, desc: "Auto-Hit. Moc 2 (Pewne obrażenia)." }],
            tier2: [{ name: "Kula Ognia", cost: 2, desc: "Auto-Hit. Moc 3 (Obróć -3) DLA WSZYSTKICH." }]
        },
        cleric: {
            cantrips: [{ name: "Święty Płomień", desc: "Test 11+. Moc 1. Ignoruje osłony." }],
            tier1: [{ name: "Leczenie", cost: 1, desc: "Auto. Sojusznik bierze nową kostkę HP." }],
            tier2: [{ name: "Gniew Niebios", cost: 2, desc: "Test z Ułatwieniem. Moc 4 (Boss Killer)." }]
        }
    }
};

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