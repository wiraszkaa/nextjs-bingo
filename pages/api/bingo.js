export const KEYWORDS = [
  { id: 0, keyword: "Proste jak drut!" },
  { id: 1, keyword: "*wskazuje na publiczność środkowym palcem*" },
  { id: 2, keyword: "dyszenie w mikrofon" },
  { id: 3, keyword: "randomowy autograf" },
  { id: 4, keyword: "Pytania do widzów XD" },
  { id: 5, keyword: "cnd, cnn, cdd, cbd, cbś" },
  { id: 6, keyword: "Kobieta jest stworzona dla mężczyzny" },
  { id: 7, keyword: "Proste jak drut" },
  { id: 8, keyword: "w każdym kątku po dzieciątku " },
  { id: 9, keyword: '"wypasione"' },
  { id: 10, keyword: "Historia o tym jak podnieść u niego ocenę" },
  { id: 11, keyword: "Przerwa na klaskanie" },
  { id: 12, keyword: "speedrun na koniec wykładu" },
  { id: 13, keyword: "historia kościoła" },
  { id: 14, keyword: "a po zajęciach chodziliśmy na kremówki" },
  { id: 15, keyword: "herezjeeeee" },
  { id: 16, keyword: "moja żona" },
  { id: 17, keyword: "proste jak drut" },
  { id: 18, keyword: "dyszenie do mikrofonu" },
  { id: 19, keyword: "losowe języki" },
  { id: 20, keyword: "to jest logiczne" },
  { id: 21, keyword: "*uderza o biurko*" },
  { id: 22, keyword: "poproszę technika od mikrofonu" },
  { id: 23, keyword: "spicy fakty o języku polskim" },
  { id: 24, keyword: "ja nie kłamię proszę państwa" },
  {
    id: 25,
    keyword:
      "od smrodu jeszcze nikt nie umarł, a od przeciągu cała armia napoleona",
  },
  { id: 26, keyword: "To jest genialne! " },
  { id: 27, keyword: "Prawdopodobieństwo jest 0 ale nie niemożliwe " },
  { id: 28, keyword: "Moi absolwenci zarabiają 40k miesięcznie " },
  { id: 29, keyword: "GENIALNE" },
  { id: 30, keyword: "Flex" },
  { id: 31, keyword: "Lekcja o życiu" },
  { id: 32, keyword: "Zachwalanie statystyki" },
  { id: 33, keyword: "Narzekanie na statystykę" },
  { id: 34, keyword: "Małżeństwo lub dzieci" },
  { id: 35, keyword: "Gładko wpleciony cytat z Biblii" },
  { id: 36, keyword: "Weźmiemy PANA/ PANIĄ" },
  { id: 37, keyword: "Statystycznie rzecz mówiąc..." },
  { id: 38, keyword: "Ciekawostka" },
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
