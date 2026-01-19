import { Sword, Shield, Zap, Skull, Brain, Eye, Crosshair, Ghost, Moon, Sun } from 'lucide-react';

export const KEYWORDS = {
    "Biegłość": "Rzuć 2 kości, wybierz wyższy wynik.",
    "Słabość": "Rzuć 2 kości, wybierz niższy wynik.",
    "Ułatwienie": "To samo co Biegłość (2k20 wyższa).",
    "Utrudnienie": "To samo co Słabość (2k20 niższa).",
    "Moc": "Liczba oczek, o którą obracasz kostkę wroga po trafieniu.",
    "Ultimate": "Potężna zdolność, często kosztuje Manę lub wymaga specjalnych warunków.",
    "Auto-Hit": "Trafienie bez rzutu kostką.",
    "Minion": "Wróg z 1 HP. Ginie od jednego trafienia.",
    "Boss": "Wróg posiadający Kostkę HP (6 oczek).",
    "DC": "Stopień Trudności. W tej grze zawsze wynosi 11."
};

// --- WSPÓLNE DANE DLA OBU WERSJI ---
const COMMON_LOOT = [
    { range: [1, 1], name: "Śmieci", desc: "Pusto.", rarity: "common", color: "text-slate-500" },
    { range: [2, 5], name: "Trening", desc: "Ułatwienie w następnej walce.", rarity: "common", color: "text-slate-400" },
    { range: [6, 10], name: "Złoto", desc: "Punkty zwycięstwa.", rarity: "uncommon", color: "text-amber-200" },
    { range: [11, 14], name: "Mikstura HP", desc: "Odzyskaj 1 Kostkę Życia (na 6).", rarity: "uncommon", color: "text-green-400" },
    { range: [15, 17], name: "Zwój Ochrony", desc: "Tarcza. Jednorazowe anulowanie obrażeń.", rarity: "rare", color: "text-blue-400" },
    { range: [18, 19], name: "Ulepszenie", desc: "Twoja broń zadaje +1 obrażeń na stałe.", rarity: "rare", color: "text-purple-400" },
    { range: [20, 20], name: "Artefakt", desc: "Stały bonus do życia lub ataku.", rarity: "epic", color: "text-amber-500" }
];

const COMMON_CLASSES = {
    fighter: { 
        name: "Wojownik", role: "Pierwsza linia", hp: 3, mana: 0, 
        stats: "🔥 Biegłość: Walka Wręcz, Siła.\n⚪ Neutralny: Reszta.", 
        passive: "⚔️ Atak: Ciężki (Moc 2).", 
        active: "🛡️ Twardziel: Raz na walkę ignorujesz jedno trafienie." 
    },
    rogue: { 
        name: "Łotrzyk", role: "Zwiadowca", hp: 2, mana: 0, 
        stats: "🔥 Biegłość: Łuk, Skradanie, Uniki.\n⚪ Neutralny: Reszta.", 
        passive: "🗡️ Atak: Lekki (Moc 1).", 
        active: "💀 Cios w Plecy: Jeśli bijesz wroga zajętego walką, zadajesz Ultimate (Moc 3)." 
    },
    wizard: { 
        name: "Czarodziej", role: "Magia Ofensywna", hp: 1, mana: 3, 
        stats: "🔥 Biegłość: Wiedza, Magia.\n❄️ Słabość: Siła.", 
        passive: "🔥 Cantrip: Ognisty Pocisk (Moc 1, Dystans).", 
        active: "✨ Mana to amunicja do potężnych zaklęć." 
    },
    cleric: { 
        name: "Kleryk", role: "Magia wspierająca", hp: 2, mana: 2, 
        stats: "🔥 Biegłość: Percepcja, Siła Woli.\n❄️ Słabość: Skradanie.", 
        passive: "☀️ Cantrip: Święty Płomień (Moc 1, ignoruje osłony).", 
        active: "❤️ Mana służy do leczenia i świętego gniewu." 
    }
};

const COMMON_SPELLS = {
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
};

// Definicja scenariuszy (wspólna baza)
const SCENARIO_SZCZUR = {
    id: 'q1',
    title: "Szczurzy Król",
    difficulty: "easy",
    type: "Klasyk (Tutorial)",
    hook: "Karczmarz błaga o pomoc. Coś porywa beczki z piwem do kanałów.",
    acts: [
        { 
            title: "Wstęp: Karczma", 
            type: "roleplay",
            mechanics: "**1. WSTĘP (Zlecenie)**\n\n* **Zleceniodawca:** Gunter (Karczmarz).\n* **Cel:** Zejść do piwnicy, zabić potwory, uratować beczkę wina \"Czerwony Baron\".\n* **Nagroda:** 50 sztuk złota + darmowy posiłek.",
            narrative: "**SCENA 1: KARCZMA \"POD PĘKNIĘTYM KUFLEM\"**\n\n**👁️ CO WIDZĄ GRACZE:**\n> \"W karczmie panuje przyjemny gwar. Pachnie pieczonym czosnkiem, starym drewnem i kwaśnym piwem. Miejscowi grają w kości przy kominku. Nagle z zaplecza wybiega Gunter, właściciel. Jest gruby, spocony i blady jak ściana. W ręku ściska brudną ścierkę. Podbiega prosto do waszego stolika.\"\n\n**🗣️ DIALOG (Gunter):**\n> *\"Wyglądacie na takich, co potrafią machać żelastwem! Błagam, pomóżcie! Coś wlazło mi do piwnicy! Słyszę, jak gryzą beczki! Jeśli stracę zapas 'Czerwonego Barona', zbankrutuję!\"*\n\n**❓ CO MOGĄ ZROBIĆ GRACZE? (Q&A):**\n* **Pytanie:** \"Co tam jest? Szczury?\"\n* **Odpowiedź Guntera:** *\"Szczury?! Panie, to brzmi jak stado wściekłych psów! I piszczą... jakby gadały ze sobą!\"*\n\n* **Pytanie:** \"Ile płacisz?\"\n* **Odpowiedź:** *\"Dam wam 50 sztuk złota i jecie za darmo do końca tygodnia! Tylko idźcie już!\"*\n\n* **Gracz (Łotrzyk) chce się targować:** *\"Mało. Chcemy 70 złota.\"*\n* **GM:** \"Rzuć k20. Jeśli wypadnie **11+**, Gunter wzdycha: *'Niech wam będzie, zdziercy. Ale macie uratować wino!'* Jeśli **1-10**: *'Nie mam więcej! Bierzcie albo sam tam zejdę z widelcem!'*\""
        },
        { 
            title: "Akt 1: Składzik (Walka)", 
            type: "combat",
            mechanics: "**2. POKÓJ 1: SKŁADZIK (Walka)**\n\n* **Wrogowie:** 3x **Wielki Szczur** (Minion).\n* *Reprezentacja:* Żeton Czaszki.\n* *HP:* 1 (Każde trafienie zabija).\n* *Atak:* +0 (Trafia na 11+).\n* *Obrażenia:* 2 oczka (Obróć kostkę gracza o -2).",
            narrative: "**SCENA 2: ZEJŚCIE W MROK (PIWNICA)**\n\n**👁️ CO WIDZĄ GRACZE:**\n> \"Gunter otwiera ciężką klapę w podłodze kuchni. Uderza was odór stęchlizny i mokrej sierści. Schodzicie po drabinie w dół. Jest tu ciemno, tylko wasza pochodnia rzuca chwiejne cienie na ściany.\n> Widzicie składzik pełen worków z mąką. Nagle jeden worek się porusza. Potem drugi. Spomiędzy skrzyń wyłaniają się trzy gigantyczne szczury. Mają wielkość borsuków, a ich oczy świecą na czerwono. Syczą na was!\"\n\n**⚔️ W TRAKCIE WALKI (Opisy akcji):**\n\n* **Gdy gracz TRAFIA (Zabija):**\n* *\"Twój miecz gładko przecina powietrze. Trafiasz bestię w kark. Słychać chrupnięcie i szczur pada bezwładnie na worki z mąką, wzbijając biały tuman kurzu.\"*\n* *\"Magiczny pocisk uderza w szczura, odrzucając go na ścianę z głośnym plaśnięciem. Już nie wstanie.\"*\n\n* **Gdy gracz PUDŁUJE:**\n* *\"Szczur jest zaskakująco szybki! Prześlizguje się pod twoim ciosem i chowa za beczką.\"*\n* *\"Twoja broń uderza w drewniany filar, aż poleciały drzazgi. Bestia syczy z kpiną.\"*\n\n* **Gdy szczur TRAFIA GRACZA:**\n* *\"Bestia skacze ci na łydkę! Czujesz ostre zęby przebijające skórę. Boli jak diabli!\"*\n\n**❓ CO JEŚLI...?**\n* **Gracz chce przeszukać worki po walce?**\n* GM: \"Większość mąki jest zanieczyszczona, ale znajdujesz w jednym worku zagubiony srebrny widelec Guntera. Drobiazg, ale cieszy.\""
        },
        { 
            title: "Akt 2: Korytarz (Przeszkoda)", 
            type: "challenge",
            mechanics: "**3. KORYTARZ (Przeszkoda)**\n\n* **Zagrożenie:** Kałuża Kwasu (Szerokość 3 metry).\n* **Test (Unik/Skok):**\n* *DC:* 11+ na k20.\n* *Porażka:* Gracz traci 2 oczka HP (poparzenie).\n\n* **Opcja Magiczna:** Spalenie 1 Many = Automatyczny sukces dla całej grupy (Zamrożenie/Neutralizacja).",
            narrative: "**SCENA 3: ZALANY KORYTARZ (PRZESZKODA)**\n\n**👁️ CO WIDZĄ GRACZE:**\n> \"Idziecie dalej. W tylnej ścianie piwnicy jest wygryziona wielka dziura. Prowadzi do starego, ceglanego kanału.\n> Drogę blokuje wam jednak obrzydliwa przeszkoda. Rura pękła i na podłodze rozlała się szeroka kałuża zielonej, gęstej mazi. Syczy i paruje. Jeśli w to wejdziecie, stopi wam buty.\"\n\n**🧠 JAK TO ROZWIĄZAĆ? (Podpowiedzi dla GM):**\nNie podpowiadaj graczom od razu. Zapytaj: *\"Co robicie?\"*\n\n* **Pomysł:** \"Przeskakuję!\"\n* **GM:** \"To spory dystans. Rzuć k20 na Zręczność/Siłę.\"\n* **Sukces:** \"Lądujesz z gracją po drugiej stronie.\"\n* **Porażka:** \"Jedna noga wpada w maź! Szybko ją wyciągasz, ale kwas przeżarł podeszwę. Tracisz 2 punkty zdrowia (obróć kostkę).\"\n\n* **Pomysł:** \"Rzucam kłodę/deskę z piwnicy.\"\n* **GM:** \"Świetny pomysł! Rzuć na Siłę (Wojownik ma ułatwienie). Jeśli się uda, robisz mostek dla wszystkich.\"\n\n* **Pomysł:** \"Używam czaru Mrozu/Wiatru.\"\n* **GM:** \"Magia neutralizuje kwas natychmiast. Przechodzicie suchą stopą. (Koszt: 1 Mana).\""
        },
        { 
            title: "Finał: Sala Tronowa (Boss)", 
            type: "boss",
            mechanics: "**4. POKÓJ 2: SALA TRONOWA (Boss)**\n\n* **Wrogowie:**\n* 1x **Szczurzy Król** (BOSS - Czaszka w Koronie).\n* 2x **Wielki Szczur** (Minion - Ochrona).\n\n* **Boss Stats:**\n* *HP:* 6 (Jedna pełna kostka k6 na żetonie).\n* *Atak:* \"Potrójne Kłapnięcie\" (Trafia na 11+).\n* *Obrażenia:* **3 oczka** (Boli!).\n* *Mechanika:* Dopóki żyją Miniony, Bossa trafia się z **Utrudnieniem** (2 kostki, weź gorszą).",
            narrative: "**SCENA 4: SALA TRONOWA (FINAŁ)**\n\n**👁️ CO WIDZĄ GRACZE:**\n> \"Korytarz rozszerza się w okrągłą, wilgotną salę. Podłoga wyłożona jest... kośćmi kurczaków, psów i chyba ludzi.\n> Na środku sali stoi tron zbudowany ze śmieci i skradzionych świecidełek. Siedzi na nim potwór.\n> To Szczurzy Król. Trzy wielkie, otyłe szczury zrośnięte ogonami w jeden węzeł. Poruszają się nieskoordynowanie, piszcząc trzema głosami naraz.\n> *– MIĘSO! ŚWIEŻE MIĘSO DLA KRÓLA! –* zdaje się piszczeć ten stwór w waszych głowach.\n> Obok tronu stoją dwa mniejsze szczury w 'zbrojach' zrobionych z puszek.\"\n\n**⚔️ W TRAKCIE WALKI Z BOSSEM:**\n\n* **Mechanika Tarczy:** Jeśli gracze atakują Króla, a żyją miniony:\n* **GM:** *\"Nie możesz trafić! Małe szczury skaczą przed Króla, przyjmując ciosy na swoje puszki! Zabijcie najpierw ochronę!\"*\n\n* **Atak Króla:**\n* *\"Król obraca się i uderza was swoim splotem ogonów jak biczem!\"*\n* *\"Jeden z łbów Króla rzyga na ciebie kwasem!\"*\n\n* **Gdy Król traci HP (Obrywa):**\n* *\"Twój cios był potężny! Jedna z trzech głów Króla opada bezwładnie. Bestia wpada w szał, pozostałe dwie głowy piszczą w agonii!\"*\n\n**❓ CO JEŚLI...?**\n* **Gracz rzuci 'NATURALNE 20' (Krytyk) na Bossa:**\n* GM: \"To cios legendarny! Odcinasz splot ogonów. Bestia rozpada się na kawałki, które drgają jeszcze przez chwilę. Walka skończona!\""
        },
        {
            title: "Zakończenie",
            type: "roleplay",
            mechanics: "**5. LOOT (Skarb)**\n\n* **Gwarantowane:** Sakiewka złota (Zwycięstwo).\n* **Losowe:** 1 rzut na Tabelę Skarbów (lub na sztywno: **Mikstura Pełnego Leczenia**).",
            narrative: "**SCENA 5: ZWYCIĘSTWO I POWRÓT**\n\n**👁️ FINAŁ:**\n> \"Zalega cisza. Szczurzy Król leży martwy. Za jego tronem widzicie dębową beczkę z wypalonym napisem 'Czerwony Baron'. Jest lekko obdrapana, ale cała.\n> Obok leży mała szkatułka, którą Król musiał ukraść jakiemuś szlachcicowi.\"\n\n**💰 ROZDANIE SKARBÓW:**\n* **GM:** \"Co robicie? Otwieracie szkatułkę?\"\n* **Gracze:** \"Tak!\"\n* **GM:** \"W środku znajdujecie [Tu wstaw Loot z generatora] oraz garść kamieni szlachetnych.\"\n\n**EPILOG:**\n> \"Wracacie do karczmy, tocząc beczkę przed sobą. Gunter na wasz widok zaczyna płakać ze szczęścia. Cała karczma wiwatuje na waszą cześć. Pierwszy kufel smakuje jak zwycięstwo.\n> Ale w cieniu, przy kominku, zakapturzona postać obserwuje was z uwagą... Chyba właśnie zyskaliście sławę.\n> **KONIEC SCENARIUSZA 1**\"\n\n**📝 NOTATKI DLA MG (Tipy)**\n* **Improwizuj:** Jeśli gracz chce zrobić coś głupiego (np. zjeść szczura), pozwól mu, ale niech rzuci na Kondycję (żeby się nie zatruł). To buduje zabawę.\n* **Dynamika:** Jeśli walka idzie za łatwo, niech Król wezwie piskiem jeszcze jednego szczura z rury. Jeśli idzie za trudno (gracze umierają), niech Król potknie się o własny ogon (traci turę).\n* **Śmierć:** W tutorialu staraj się nie zabijać graczy. Jeśli ktoś straci HP do zera, niech straci przytomność, a Gunter go potem \"ocuci\" solami trzeźwiącymi (ale bez nagrody w złocie!)."
        }
    ]
};

// ------------------------------------------------------------------
// --- WERSJA 1: STABLE (PODSTAWA) ----------------------------------
// ------------------------------------------------------------------
export const DATA_SIMPLE = {
    rules: [
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
        // NOWE: ZDOLNOŚCI BOHATERÓW
        {
            id: "s_abilities",
            title: "3. Zdolności Bohaterów",
            category: "Silnik",
            summary: "Pasywne (Darmowe) i Aktywne (Kosztują zasoby).",
            content: "**ZDOLNOŚCI BOHATERÓW (Abilities)**\nKażda postać w grze posiada dwa rodzaje umiejętności:\n\n🟢 **Zdolności Pasywne (Zawsze Aktywne)**\nTo Twoje stałe cechy, talenty lub podstawowe ataki.\n* **Koszt:** Darmowe. Nie zużywają zasobów.\n* **Przykład:** Atak mieczem lub podstawowy atak magiczny.\n\n🔴 **Zdolności Aktywne (Potężne)**\nTo \"Asy w rękawie\". Potrafią zmienić losy walki.\n* **Koszt:** Wymagają \"spalenia\" zasobu (np. Kostki Many 🔵) lub mają limit użycia.\n* **Przykład:** \"Kula Ognia\" Maga lub \"Twardziel\" Wojownika."
        },
        { 
            id: "s_hp", 
            title: "4. Jak działa zdrowie?", 
            category: "Walka", 
            summary: "Klikanie: Obracaj kostki w dół. Poniżej 1 = Odpada.", 
            content: "Twoje życie to Czerwone Kostki w puszce. Wszystkie startują ustawione na **6**.\n\n**Kiedy obrywasz...**\nGdy wróg Cię trafi, nie wyrzucaj kostki! Zamiast tego 'kliknij' nią w dół:\n🔹 **Zwykły cios:** Obróć o -2 oczka (np. z 6 na 4).\n💀 **Potężny cios (Boss):** Obróć o -4 oczka.\n\n**Kiedy giniesz?**\nDopiero gdy musisz obrócić kostkę poniżej 1. Wtedy usuń ją do pudełka. Kolejne obrażenia 'nadgryzają' następną kostkę." 
        },
        { 
            id: "s_combat", 
            title: "5. Twoja Tura (Atak)", 
            category: "Walka", 
            summary: "Test 11+. Lekka -1, Ciężka -2, Ult -3.", 
            content: "**Krok 1: Atak**\nWykonaj rzut d20.\n\n✅ **Sukces (11+):** Trafiłeś! Sprawdź Moc broni i obróć kostkę wroga:\n🗡️ **Lekka (Moc 1):** Sztylety, magia podstawowa.\n⚔️ **Ciężka (Moc 2):** Miecze, silne czary.\n🔥 **Ultimate (Moc 3):** Najpotężniejsze ataki.\n\n❌ **Porażka (1-10):** Pudło.\n\n*(Miniony mają 1 HP – każde trafienie zdejmuje je z planszy)*." 
        },
        { 
            id: "s_defense", 
            title: "6. Tura Wroga (Obrona)", 
            category: "Walka", 
            summary: "Wrogowie nie rzucają. Ty robisz Unik (11+).", 
            content: "**Krok 2: Obrona**\nWrogowie nie rzucają kośćmi. To Ty rzucasz, żeby się obronić.\n\nGdy wróg atakuje, rzuć d20:\n🛡️ **Sukces (11+):** Nic się nie dzieje. Jesteś bezpieczny.\n🤕 **Porażka (1-10):** Obrywasz! Obróć swoją kostkę życia o -2." 
        },
        // ZMIANA KATEGORII: EKSPLORACJA -> MAGIA
        { 
            id: "s_magic", 
            title: "7. Magia Użytkowa (Joker)", 
            category: "Magia", 
            summary: "Spal 1 Manę = Auto-Sukces fabularny.", 
            content: "Grasz Magiem lub Klerykiem i widzisz zamknięte drzwi albo ciemną przepaść?\n\n✨ **Spal 1 Manę.**\n\nProblem rozwiązany automatycznie (bez rzutu). Magia to uniwersalny klucz do fabuły." 
        },
        // NOWE: CANTRIP
        {
            id: "s_cantrip",
            title: "8. Co to jest Cantrip?",
            category: "Magia",
            summary: "Darmowe zaklęcie podstawowe (0 Many).",
            content: "**CO TO JEST CANTRIP? (Sztuczka Magiczna)**\nKlasy magiczne (Czarodziej i Kleryk) nie walczą mieczem. Zamiast tego władają tzw. Cantripami.\n\n* **Definicja:** To zaklęcie podstawowe, opanowane do perfekcji.\n* **Koszt:** 0 Many. Jest całkowicie darmowe.\n* **Jak to działa?** Cantrip jest słabszy od potężnych zaklęć (tych za Manę), ale za to możesz go rzucać w nieskończoność.\n\n**W praktyce:** Traktuj Cantrip jak magiczny łuk lub miecz. Używasz go w każdej turze, by zadawać obrażenia, oszczędzając Manę na Bossa."
        },
        // ZMIANA KATEGORII: PUŁAPKI -> ŚWIAT
        { 
            id: "s_traps", 
            title: "9. Pułapki", 
            category: "Świat", 
            summary: "Test 11+. Porażka = Strata całej kostki.", 
            content: "Gdy wejdziesz w pułapkę, rzuć d20.\n\n✅ **Sukces (11+):** Unikasz zagrożenia.\n⚠️ **Porażka (1-10):** Tracisz jedną PEŁNĄ Kostkę Życia." 
        }
    ],
    loot: COMMON_LOOT,
    classes: COMMON_CLASSES,
    spells: COMMON_SPELLS,
    scenarios: [
        SCENARIO_SZCZUR,
        // Placeholdery
        { id: 'q2', title: "Zaginiony Artefakt", difficulty: "medium", type: "Eksploracja", hook: "Stary Mag potrzebuje kryształu z zapomnianych ruin.", acts: [] },
        { id: 'q3', title: "Noc Żywych Trupów", difficulty: "medium", type: "Horror", hook: "Cmentarz jest niespokojny. Mieszkańcy boją się wychodzić po zmroku.", acts: [] },
        { id: 'q4', title: "Smocze Jajo", difficulty: "hard", type: "Epickie", hook: "Ktoś ukradł jajo wiwerny i ukrył je na szczycie wieży.", acts: [] }
    ]
};

// ------------------------------------------------------------------
// --- WERSJA 2: EXPERIMENTAL (PEŁNY SZCZURZY KRÓL v3.0 + NOWE ZASADY)
// ------------------------------------------------------------------
export const DATA_EXPERIMENTAL = {
    rules: [
        // --- KATEGORIA: SILNIK (Nowa Mechanika Rzutów) ---
        { 
            id: "e_core", 
            title: "1. Strefa Środka (Glitch)", 
            category: "Silnik", 
            summary: "1-5 Porażka, 6-10 Komplikacja, 11+ Sukces.",
            content: "**Koniec z nudnym 'Udało się / Nie udało'.** Teraz każdy rzut buduje historię.\n\n❌ **1-5: PORAŻKA (Miss)**\nNic się nie udaje. Tracisz zasób lub HP. Sytuacja się pogarsza.\n\n⚠️ **6-10: KOMPLIKACJA (Glitch)**\nUdało się, ALE...\n* **W walce:** Trafiasz wroga, ale on trafia też Ciebie (Wymiana ciosów).\n* **W teście:** Otwierasz zamek, ale łamiesz wytrych lub robisz hałas.\n\n✅ **11-20: SUKCES (Clean Hit)**\nPerfekcja. Wszystko idzie zgodnie z planem, zero kar." 
        },
        // NOWE: ZDOLNOŚCI BOHATERÓW (To samo co w Simple, bo to nowa definicja)
        {
            id: "s_abilities",
            title: "2. Zdolności Bohaterów",
            category: "Silnik",
            summary: "Pasywne (Darmowe) i Aktywne (Kosztują zasoby).",
            content: "**ZDOLNOŚCI BOHATERÓW (Abilities)**\nKażda postać w grze posiada dwa rodzaje umiejętności:\n\n🟢 **Zdolności Pasywne (Zawsze Aktywne)**\nTo Twoje stałe cechy, talenty lub podstawowe ataki.\n* **Koszt:** Darmowe. Nie zużywają zasobów.\n* **Przykład:** Atak mieczem lub podstawowy atak magiczny.\n\n🔴 **Zdolności Aktywne (Potężne)**\nTo \"Asy w rękawie\". Potrafią zmienić losy walki.\n* **Koszt:** Wymagają \"spalenia\" zasobu (np. Kostki Many 🔵) lub mają limit użycia.\n* **Przykład:** \"Kula Ognia\" Maga lub \"Twardziel\" Wojownika."
        },

        // --- KATEGORIA: WALKA (Atak i Obrona) ---
        { 
            id: "e_attack", 
            title: "3. Twoja Tura (Atak)", 
            category: "Walka", 
            summary: "Ty rzucasz, by trafić. Uważaj na wymianę ciosów!",
            content: "Kiedy atakujesz, rzuć k20:\n\n✅ **11+ (Czyste Trafienie):**\nZadajesz obrażenia (zgodnie z Mocą broni). Jesteś bezpieczny.\n\n⚠️ **6-10 (Wymiana Ciosów):**\nTrafiasz wroga (zadajesz dmg), ALE wróg też trafia Ciebie (tracisz HP). Walka jest chaotyczna!\n\n❌ **1-5 (Pudło):**\nNie trafiasz. Wróg wykorzystuje Twoje odsłonięcie i kontratakuje (tracisz HP)." 
        },
        { 
            id: "e_defense", 
            title: "4. Tura Wroga (Obrona Aktywna)", 
            category: "Walka", 
            summary: "Ty rzucasz na obronę. 1-5 Pełne dmg, 6-10 Połowa.",
            content: "**GM nigdy nie rzuca kośćmi.** To Ty bronisz się przed losem.\n\nGdy wróg atakuje, rzuć k20:\n✅ **11+ (Unik/Parowanie):**\nZero obrażeń. Jeśli masz tarczę lub zdolność, możesz nawet zadać 1 dmg z kontry.\n\n⚠️ **6-10 (Blok Częściowy):**\nZasłaniasz się, ale siła uderzenia przechodzi. Obrywasz **połowę obrażeń** (zaokrągloną w górę) lub tracisz równowagę.\n\n❌ **1-5 (Ból):**\nObrywasz pełne obrażenia." 
        },
        { 
            id: "e_enemies", 
            title: "5. Wrogowie i ich HP", 
            category: "Walka", 
            summary: "Minion (1 cios), Boss (Kostka HP). Elita jest trudniejsza.",
            content: "Nie każdy przeciwnik jest równy.\n\n🦇 **Minion (Pionek):**\nMa **1 HP**. Ginie od dowolnego trafienia (nawet z Komplikacją). Groźny tylko w grupie.\n\n👹 **Boss (Elita):**\nPosiada **Kostkę HP (6 oczek)**. Musisz zbijać mu życie kawałek po kawałku.\n*Uwaga:* Bossowie są trudniejsi! Czyste trafienie w Bossa wymaga wyniku **15+** (wynik 6-14 to zazwyczaj Komplikacja/Wymiana)." 
        },

        // --- KATEGORIA: MAGIA ---
        { 
            id: "e_magic", 
            title: "6. Magia Użytkowa", 
            category: "Magia", 
            summary: "Spal 1 Manę = Rozwiązanie problemu bez rzutu.",
            content: "Jesteś Magiem lub Klerykiem? Masz asa w rękawie.\n\nWidzisz przepaść, zamknięte drzwi lub napis w starożytnym języku? Zamiast ryzykować rzut kostką (i potencjalną Porażkę 1-5), możesz:\n\n✨ **Spalić 1 Manę (obróć niebieską kostkę).**\n\nProblem zostaje rozwiązany automatycznie. Opisz, jak Twoja magia nagina rzeczywistość." 
        },
        // NOWE: CANTRIP
        {
            id: "s_cantrip",
            title: "7. Co to jest Cantrip?",
            category: "Magia",
            summary: "Darmowe zaklęcie podstawowe (0 Many).",
            content: "**CO TO JEST CANTRIP? (Sztuczka Magiczna)**\nKlasy magiczne (Czarodziej i Kleryk) nie walczą mieczem. Zamiast tego władają tzw. Cantripami.\n\n* **Definicja:** To zaklęcie podstawowe, opanowane do perfekcji.\n* **Koszt:** 0 Many. Jest całkowicie darmowe.\n* **Jak to działa?** Cantrip jest słabszy od potężnych zaklęć (tych za Manę), ale za to możesz go rzucać w nieskończoność.\n\n**W praktyce:** Traktuj Cantrip jak magiczny łuk lub miecz. Używasz go w każdej turze, by zadawać obrażenia, oszczędzając Manę na Bossa."
        },

        // --- KATEGORIA: ŚWIAT ---
        {
            id: "e_traps",
            title: "8. Pułapki i Przeszkody",
            category: "Świat",
            summary: "Fail Forward: Porażka boli, ale nie zatrzymuje gry.",
            content: "Co się dzieje, gdy skaczesz nad lawą?\n\n✅ **11+:** Lądujesz bezpiecznie.\n\n⚠️ **6-10 (Udało się, ale...):**\nLądujesz na drugim brzegu, ALE skręcasz kostkę (-1 HP) lub gubisz coś z plecaka. Przeszedłeś dalej, ale z kosztem.\n\n❌ **1-5 (Katastrofa):**\nWpadasz do środka. Tracisz dużo HP i wracasz na start."
        },
        {
            id: "e_creativity",
            title: "9. Myśl poza Kartą Postaci",
            category: "Świat",
            summary: "Nie klikaj tylko 'Atak'. Użyj otoczenia!",
            content: "Twoja postać to nie tylko zbiór cyferek i przycisków.\n\n💡 **Bądź sprytny:**\n* Masz linę w ekwipunku? Zwiąż wroga zamiast go bić.\n* Widzisz żyrandol? Zwal go na głowy goblinów.\n* Grasz Wojownikiem? Wyważ drzwi barkiem zamiast szukać klucza.\n\nMistrz Gry zawsze nagrodzi dobry pomysł – często dając Ci **Ułatwienie** (rzut dwiema kostkami) lub pozwalając ominąć rzut całkowicie!"
        }
    ],
    
    loot: COMMON_LOOT,
    classes: COMMON_CLASSES,
    spells: COMMON_SPELLS,
    
    scenarios: [
        {
            id: 'q1_v3',
            title: "Szczurzy Król v3.0 (FULL)",
            difficulty: "easy",
            type: "Klasyk (Tutorial)",
            hook: "Gunter błaga o pomoc. Coś kradnie mu wino i przegryza podłogę. Wersja pełna z lekcjami dla GM.",
            acts: [
                { 
                    title: "Scena 1: Zlecenie", 
                    type: "roleplay",
                    maps: ["/maps/q1_s1.webp"], // <--- TERAZ JAKO TABLICA
                    mechanics: "**CEL:** Uratować beczki wina w piwnicy.\n**NAGRODA:** 50 złota + darmowy posiłek.\n**NPC:** Gunter (Tchórzliwy karczmarz).\n**WIEDZA:** Wie tylko, że \"szczury są wielkie jak psy\".",
                    narrative: "**🎓 LEKCJA DLA GM:**\nTesty umiejętności nie są czarno-białe. Tutaj nauczysz się stopniowania sukcesu (Sukces Pełny vs Sukces z Kosztem).\n\n**🗣️ LEKTOR:**\n> \"W karczmie panuje przyjemny gwar, pachnie czosnkiem i piwem. Nagle do waszego stolika podbiega Gunter, właściciel. Jest blady i spocony.\n> — Błagam, pomóżcie! Coś wlazło mi do piwnicy! — krzyczy, wycierając dłonie w brudną ścierkę. — Gryzą beczki! Jeśli stracę zapas wina »Czerwony Baron«, zbankrutuję! Zejdźcie tam i zabijcie to cholerstwo!\"\n\n**🎬 REŻYSERIA (Targowanie):**\nJeśli gracze chcą więcej złota, rzuć k20:\n✅ **11+ (Pełny):** \"Dobra, zdziercy. 70 złota!\"\n⚠️ **6-10 (Koszt):** \"Dam 70, ale płacicie za to piwo co pijecie! (-5 złota teraz)\"\n❌ **1-5 (Porażka):** \"Nie mam! Bierzecie 50 albo sam tam idę!\"\n\n💡 *Inny pomysł (Zastraszanie/Magia)? Rzut na 11+. Nagradzaj kreatywność!*"
                },
                { 
                    title: "Scena 2: Magazyn", 
                    type: "combat",
                    maps: ["/maps/q1_s2.webp"], // <--- TERAZ JAKO TABLICA
                    mechanics: "**WROGOWIE:** 3x Wielki Szczur (Minion).\n❤️ **HP:** 1 (Każde trafienie zabija).\n⚔️ **ATAK:** 2 obrażenia.\n🛡️ **OBRONA:** Niska (Gracz trafia na 11+).",
                    narrative: "**🎓 LEKCJA DLA GM:**\nPodstawy walki. Wrogowie typu \"Minion\" padają od jednego ciosu, co daje poczucie potęgi. Na końcu sceny gracze zdobywają zasoby.\n\n**🗣️ LEKTOR:**\n> \"Schodzicie po drabinie w mrok. Śmierdzi tu mokrą sierścią. W świetle pochodni widzicie składzik pełen worków z mąką. Nagle worki zaczynają się ruszać.\n> Spomiędzy skrzyń wyłaniają się trzy gigantyczne szczury o czerwonych oczach. Syczą na was i szykują się do skoku!\"\n\n**🎬 REŻYSERIA (Walka):**\n\n**Twój Atak:**\n✅ **11+:** \"Trafiasz bestię w kark. Pada martwa.\"\n⚠️ **6-10:** \"Zabijasz go, ALE on w ostatniej chwili gryzie cię w łydkę!\" (-2 HP)\n❌ **1-5:** \"Szczur jest za szybki! Prześlizguje się.\"\n\n**Atak Wroga (Obrona):**\n1-10: Obrywasz (-2 HP). 11+: Unikasz.\n\n**🎁 LOOT:**\nZnajdujecie \"Szczurze Fanty\" (zęby, monety). To waluta do Sceny 4."
                },
                { 
                    title: "Scena 3: Kwas", 
                    type: "challenge",
                    maps: ["/maps/q1_s3.webp", "/maps/q1_s3_2.webp"],
                    mechanics: "**ZAGROŻENIE:** Kwas (Obrażenia: 2 HP).\n**TRUDNOŚĆ TESTU:** 11+.\n**MAGIA:** Auto-Sukces (Koszt 1 Mana).",
                    narrative: "**🎓 LEKCJA DLA GM:**\nFail Forward (Porażka pcha do przodu). Nieudany rzut nie blokuje przejścia, ale kosztuje zasoby (HP).\n\n**🗣️ LEKTOR:**\n> \"Dalszą drogę blokuje wam pęknięta rura w ścianie. Na podłogę wylała się szeroka kałuża zielonej, syczącej mazi. Kwas paruje, gryząc w oczy. Przejście ma trzy metry szerokości. Co robicie?\"\n\n**🎬 REŻYSERIA:**\n\n**Skok (Rzut k20):**\n✅ **11+:** \"Lądujesz bezpiecznie po drugiej stronie.\"\n⚠️ **1-10 (Fail Forward):** \"Poślizgnąłeś się! Wpadasz jedną nogą do mazi (-2 HP), ale w panice wygrzebujesz się na drugi brzeg. Przeszedłeś.\"\n\n**Inne metody:**\nMagia lub deska to automatyczny sukces."
                },
                { 
                    title: "Scena 4: Kramarka", 
                    type: "roleplay",
                    maps: ["/maps/q1_s4.webp"], // <--- TERAZ JAKO TABLICA
                    mechanics: "**HANDEL:** Wymień \"Szczurze Fanty\" na JEDEN przedmiot.\n\n🩸 **Wywar ze Szczura:** Leczy 3 HP.\n🔥 **Olej Ognisty:** +2 Dmg na Bossa (pierwszy cios).\n🍀 **Kamień Szczęścia:** Reroll 1-5 na Bossie.",
                    narrative: "**🎓 LEKCJA DLA GM:**\nZarządzanie zasobami. To \"Safe Room\" przed finałem. Gracze muszą wydać zdobycze ze Sceny 2.\n\n**🗣️ LEKTOR:**\n> \"W ciemnym zaułku kanałów widzicie staruszkę mieszającą w kociołku.\n> — Idziecie na Króla? Hihi... Dajcie mi te wszystkie błyskotki, które znaleźliście przy szczurach, a dam wam coś specjalnego.\"\n\n**🎬 REŻYSERIA:**\n\n**Wywar:** \"Wypij to, a rany się zasklepią.\" (Leczy rannego).\n**Olej:** \"Posmaruj miecz. Król nie lubi ognia.\" (+Dmg).\n**Kamień:** \"Gdy szczęście cię opuści, ściśnij go.\" (Przerzut).\n\n*Jeśli zaatakują wiedźmę:* Zmienia się w chmarę much i znika. Zostają z niczym."
                },
                { 
                    title: "Scena 5: Boss", 
                    type: "boss",
                    maps: ["/maps/q1_s5.webp"], // <--- TERAZ JAKO TABLICA
                    mechanics: "**BOSS:** Szczurzy Król (Status: 🛡️ NIEŚMIERTELNY, dopóki żyją miniony).\n**OBSTAWA:** 2x Szczur Pancerny (HP: 1, Obrona: 11+).\n❤️ **HP BOSSA:** 6 (Kostka k6).\n⚔️ **ATAK BOSSA:** 3 obrażenia.",
                    narrative: "**🎓 LEKCJA DLA GM:**\nTaktyka i Fazy. Gracze muszą zidentyfikować \"tarczę\" bossa.\n\n**🗣️ LEKTOR:**\n> \"Wchodzicie do okrągłej sali. Na tronie ze śmieci siedzi ON – Szczurzy Król. To trzy wielkie gryzonie zrośnięte ogonami.\n> UWAGA: Przed nim stoją dwa mniejsze szczury w pancerzach z puszek po piwie. Zasłaniają Króla własnymi ciałami jak żywa tarcza!\"\n\n**🎬 REŻYSERIA:**\n\n**Atak na Króla (gdy obstawa żyje):**\n\"Pancerne szczury blokują cios! Król rechocze bezpiecznie.\" (0 Dmg).\n\n**Atak na Króla (gdy obstawa nie żyje):**\n✅ **15+ (Czyste):** \"Bestia wyje!\" (-1 HP).\n⚠️ **10-14 (Wymiana):** \"Trafiasz go (-1 HP), ale splot ogonów smaga cię po twarzy (-1 HP dla Ciebie).\"\n❌ **1-9:** \"Odbijasz się od tłustego cielska.\""
                },
                {
                    title: "Scena 6: Epilog",
                    type: "roleplay",
                    // maps: [], // Brak mapy = brak przycisku
                    mechanics: "**NAGRODY:**\n💰 50-70 Złota.\n🎁 Losowy Loot.\n🆙 Full Heal.",
                    narrative: "**🎓 LEKCJA DLA GM:**\nEpilog. Nagradzanie graczy i Cliffhanger.\n\n**🗣️ LEKTOR:**\n> \"Szczurzy Król pada martwy. Za tronem widzicie dębową beczkę z napisem »Czerwony Baron« – jest cała! Obok leży mała, ozdobna szkatułka.\"\n\n**🎬 REŻYSERIA:**\n\n**Powrót:**\n\"Wracacie do karczmy. Gunter płacze ze szczęścia. Sala wiwatuje.\"\n\n**Cliffhanger:**\n\"Gdy świętujecie, zauważacie w cieniu zakapturzoną postać, która przygląda się wam z uwagą... Potem znika.\"\n\n**💡 NOTATKA:** Upewnij się, że gracze zresetowali HP przed końcem sesji."
                }
            ]
        },
        // Placeholdery
        { id: 'q2', title: "Zaginiony Artefakt", difficulty: "medium", type: "Eksploracja", hook: "Stary Mag potrzebuje kryształu.", acts: [] }
    ]
};

// ... (DATA_ADVANCED i DATA_INTRO zostają bez zmian)

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

export const DATA_INTRO = [
    {
        id: "intro_1",
        icon: "Map",
        title: "POCKET ADVENTURE: KIESZONKOWA WYPRAWA",
        subtitle: "Podręcznik Wędrowca (Edycja Startowa)",
        content: "**Witaj, Wędrowcze!**\n\nMasz przed sobą **Pocket Adventure** – grę, która zmienia garść kostek i żetonów w epicką opowieść o smokach, lochach i bohaterach. To system RPG (Role-Playing Game) stworzony z myślą o jednej zasadzie: **Maksimum przygody, zero matematyki.**\n\nZapomnij o ołówkach, kartkach i skomplikowanym liczeniu. Tutaj Twoje zdrowie to fizyczna kostka, którą trzymasz w dłoni. Twoja broń to Twój rzut. Twoja wyobraźnia to mapa.\n\nCzy jesteś gotów zebrać drużynę, zejść do podziemi i zdobyć chwałę, zanim skończy Ci się przerwa na kawę?"
    },
    {
        id: "intro_2",
        icon: "Backpack",
        title: "CO MASZ W KIESZENI? (Twoje Narzędzia)",
        content: "Zanim wyruszysz, poznaj swój ekwipunek. To nie są zwykłe kawałki plastiku – to Twoje życie i przeznaczenie.\n\n**1. KOŚĆ LOSU (d20)**\nTo ta największa, dwudziestościenna kość. To serce gry. Używasz jej, gdy zadajesz pytanie: *\"Czy mi się uda?\"*.\n\n* Czy trafię goblina? 🎲 **Rzuć d20.**\n* Czy przeskoczę przepaść? 🎲 **Rzuć d20.**\n* Czy uniknę pułapki? 🎲 **Rzuć d20.**\n\n**2. SERCE BOHATERA (Czerwone d6)**\nTo Twoje punkty życia. W tej grze nie zapisujesz obrażeń na kartce.\nGdy obrywasz, po prostu **obracasz kostkę w dół** (\"klikasz\").\n\n* Widzisz **6**? Jesteś w pełni sił.\n* Widzisz **1**? Ledwo stoisz na nogach.\n* Kostka znika? Padłeś w boju.\n\n**3. CZYSTA MAGIA (Niebieskie d6)**\nDla Czarodziejów i Kleryków. To Twoja amunicja. Chcesz rzucić Kulę Ognia? Musisz **spalić manę** – obrócić niebieską kostkę w dół. Magia jest potężna, ale się kończy. Zarządzaj nią mądrze!"
    },
    {
        id: "intro_3",
        icon: "Swords",
        title: "ZŁOTA ZASADA: ZERO MATEMATYKI",
        content: "W Pocket Adventure nie dodajemy, nie odejmujemy i nie dzielimy.\nKiedy rzucasz Kością Losu (d20), interesuje Cię tylko jedno – **PROGI**:\n\n💀 **1-10: PORAŻKA**\nSpudłowałeś. Oberwałeś. Potknąłeś się. Coś poszło nie tak.\n\n⚔️ **11-20: SUKCES**\nTrafiłeś! Uniknąłeś ciosu! Otworzyłeś zamek! Jesteś bohaterem.\n\n**To wszystko.**\nJeśli Twoja postać jest w czymś ekspertem (np. Wojownik w walce mieczem), po prostu bierzesz **dwie kostki** i wybierasz lepszy wynik. To takie proste."
    },
    {
        id: "intro_4",
        icon: "Rocket",
        title: "JAK ZACZĄĆ W 3 KROKACH?",
        content: "1. **Wybierz Klasę:**\nChcesz być niezniszczalnym **Wojownikiem**? Przebiegłym **Łotrzykiem**? Potężnym **Czarodziejem**? A może wspierającym **Klerykiem**? Weź odpowiednie żetony i kostki.\n\n2. **Rozłóż Mapę:**\nPołóż na stole kartę terenu lub po prostu wyobraź sobie wilgotną jaskinię. Ustaw żetony wrogów.\n\n3. **Rzuć Wyzwanie:**\nMistrz Gry (lub aplikacja) opisuje sytuację: *\"Widzicie wielkiego Ogra pilnującego skrzyni.\"*.\nCo robisz? Atakujesz? Skradasz się? Rzucasz czar?\n**Chwyć kość i sprawdź, co przyniesie los!**"
    },
    {
        id: "intro_5",
        icon: "Brain",
        title: "CZYM WŁAŚCIWIE JEST RPG?",
        subtitle: "(Role-Playing Game = Gra Fabularna)",
        content: "Najprościej mówiąc: **To gra wyobraźni z zasadami.**\n\nPamiętasz, jak w dzieciństwie bawiłeś się w \"policjantów i złodziei\" albo rycerzy? Często kończyło się to kłótnią:\n*— Strzeliłem do ciebie!*\n*— Nieprawda, zrobiłem unik!*\n\nRPG to powrót do tamtych zabaw, ale tym razem mamy sędziego – **Kości**. Kiedy mówisz \"Atakuję smoka\", rzucasz kostką. To ona decyduje, czy Twój cios był epicki, czy też potknąłeś się o własny płaszcz.\n\n**Jak to wygląda w praktyce?**\nTo rozmowa. Nie ma planszy (chyba że chcecie), nie ma pionków, które muszą iść tylko w jedną stronę.\n\n1. **Mistrz Gry (lub Aplikacja) opisuje scenę:**\n*\"Wchodzicie do wilgotnej komnaty. Na środku stoi skrzynia, ale w cieniu coś się porusza...\"*\n\n2. **Ty (Gracz) decydujesz, co robisz:**\nW grze wideo miałbyś tylko przycisk \"Atak\". Tutaj możesz zrobić wszystko:\n*\"Skradam się do skrzyni\"*, *\"Rzucam kamieniem w cień\"* albo *\"Krzyczę: Halo, jest tu kto?!\"*.\n\n3. **Rzut Kością:**\nSprawdzamy, czy Twój szalony plan się powiódł.\n\n4. **Ciąg dalszy historii:**\nWspólnie tworzycie opowieść o waszych zwycięstwach i... zabawnych porażkach.\n\n**Kto wygrywa?**\nW RPG nikt nie przegrywa. Nie gracie *przeciwko* sobie, ale *razem* (jako Drużyna) przeciwko wyzwaniom. Celem nie jest dotarcie do mety, ale przeżycie świetnej przygody i dobra zabawa przy stole.\n\n**Pocket Adventure** to właśnie RPG w pigułce – esencja tej zabawy, bez zbędnego wertowania grubych ksiąg.\n\n---\n\n*Gotowy napisać własną legendę? Przejdź dalej i stwórz Bohatera!*"
    },
    {
        id: "intro_6",
        icon: "GitBranch",
        title: "DWA SPOSOBY NA GRĘ (Tryby)",
        content: "Pocket Adventure został zaprojektowany tak, aby rosnąć razem z Tobą. W pudełku znajdziesz zasady dla dwóch trybów rozgrywki. Wybierz ten, na który masz dzisiaj ochotę!\n\n🟢 **TRYB SIMPLE (Szybki Start)**\n**Dla kogo:** Dla nowicjuszy, dzieci, na imprezę lub szybką przerwę w pracy.\nTo esencja gry. Zero matematyki, zero skomplikowanych statystyk. Tutaj liczy się tylko rzut kością i \"klikanie\" punktów zdrowia. Zasady wytłumaczysz w 3 minuty, a cała przygoda zajmie kwadrans. To idealny sposób, by poczuć klimat RPG bez bólu głowy.\n\n🔴 **TRYB ADVANCED (Pełne Doświadczenie)**\n**Dla kogo:** Dla tych, którzy chcą więcej taktyki i głębi.\nSpokojnie – to nie jest skok na głęboką wodę! Tryb Advanced nie jest trudny. To po prostu rozbudowa trybu Simple o kilka dodatkowych mechanik (jak pancerz czy konkretne czary), które dają Ci więcej możliwości decyzyjnych.\n\n💡 **WAŻNE: Brama do wielkich przygód**\nTryb Advanced to Twój **pomost do świata \"dużych\" gier fabularnych**.\nMechaniki, których tu używamy (modyfikatory atrybutów, Klasa Pancerza, Testy Obronne), to celowo uproszczone wersje zasad, które rządzą w takich legendarnych systemach jak **Dungeons & Dragons**, **Warhammer** czy **Pathfinder**.\n\nTraktuj Pocket Adventure jako swój poligon treningowy. Jeśli opanujesz tryb Advanced, będziesz gotowy, by w przyszłości usiąść do sesji w \"duże\" RPG, rozumiejąc ich fundamenty i nie czując się zagubionym. To Twoja przepustka do największego hobby świata!"
    }
];