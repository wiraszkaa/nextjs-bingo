export const KEYWORDS = [
  { id: "j0", keyword: "Proste jak drut!" },
  { id: "j1", keyword: "*wskazuje na publiczność środkowym palcem*" },
  { id: "j2", keyword: "dyszenie w mikrofon" },
  { id: "j3", keyword: "randomowy autograf" },
  { id: "j4", keyword: "Pytania do widzów XD" },
  { id: "j5", keyword: "cnd, cnn, cdd, cbd, cbś" },
  { id: "j6", keyword: "Kobieta jest stworzona dla mężczyzny" },
  { id: "j7", keyword: "Proste jak drut" },
  { id: "j8", keyword: "w każdym kątku po dzieciątku " },
  { id: "j9", keyword: '"wypasione"' },
  { id: "j10", keyword: "Historia o tym jak podnieść u niego ocenę" },
  { id: "j11", keyword: "Przerwa na klaskanie" },
  { id: "j12", keyword: "speedrun na koniec wykładu" },
  { id: "j13", keyword: "historia kościoła" },
  { id: "j14", keyword: "a po zajęciach chodziliśmy na kremówki" },
  { id: "j15", keyword: "herezjeeeee" },
  { id: "j16", keyword: "moja żona" },
  { id: "j17", keyword: "proste jak drut" },
  { id: "j18", keyword: "dyszenie do mikrofonu" },
  { id: "j19", keyword: "losowe języki" },
  { id: "j20", keyword: "to jest logiczne" },
  { id: "j21", keyword: "*uderza o biurko*" },
  { id: "j22", keyword: "poproszę technika od mikrofonu" },
  { id: "j23", keyword: "spicy fakty o języku polskim" },
  { id: "j24", keyword: "ja nie kłamię proszę państwa" },
  {
    id: "j25",
    keyword:
      "od smrodu jeszcze nikt nie umarł, a od przeciągu cała armia napoleona",
  },
  { id: "j26", keyword: "To jest genialne! " },
  { id: "j27", keyword: "Prawdopodobieństwo jest 0 ale nie niemożliwe " },
  { id: "j28", keyword: "Moi absolwenci zarabiają 40k miesięcznie " },
  { id: "j29", keyword: "GENIALNE" },
  { id: "j30", keyword: "Flex" },
  { id: "j31", keyword: "Lekcja o życiu" },
  { id: "j32", keyword: "Zachwalanie statystyki" },
  { id: "j33", keyword: "Narzekanie na statystykę" },
  { id: "j34", keyword: "Małżeństwo lub dzieci" },
  { id: "j35", keyword: "Gładko wpleciony cytat z Biblii" },
  { id: "j36", keyword: "Weźmiemy PANA/ PANIĄ" },
  { id: "j37", keyword: "Statystycznie rzecz mówiąc..." },
  { id: "j38", keyword: "Ciekawostka" },
];

export function getBingoTable() {
  const result = [];
  const usedKeywords = [];
  for (let i = 0; i < 25; i++) {
    let index = 0;
    while (usedKeywords.includes(index)) {
      index = Math.floor(Math.random() * KEYWORDS.length);
    }
    usedKeywords.push(index);
    result.push(KEYWORDS[index]);
  }

  return result;
}
