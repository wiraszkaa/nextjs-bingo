export const KEYWORDS = [
  { id: "j0", keyword: "Proste jak drut!" },
  { id: "j1", keyword: "*wskazuje na publiczność środkowym palcem*" },
  { id: "j2", keyword: "randomowy autograf" },
  { id: "j3", keyword: "Pytania do widzów XD" },
  { id: "j4", keyword: "cnd, cnn, cdd, cbd, cbś" },
  { id: "j5", keyword: "Kobieta jest stworzona dla mężczyzny" },
  { id: "j6", keyword: "w każdym kątku po dzieciątku" },
  { id: "j7", keyword: '"wypasione"' },
  { id: "j8", keyword: "Historia o tym jak podnieść u niego ocenę" },
  { id: "j9", keyword: "Przerwa na klaskanie" },
  { id: "j10", keyword: "speedrun na koniec wykładu" },
  { id: "j11", keyword: "historia kościoła" },
  { id: "j12", keyword: "a po zajęciach chodziliśmy na kremówki" },
  { id: "j13", keyword: "herezjeeeee" },
  { id: "j14", keyword: "moja żona" },
  { id: "j15", keyword: "dyszenie do mikrofonu" },
  { id: "j16", keyword: "losowe języki" },
  { id: "j17", keyword: "to jest logiczne" },
  { id: "j18", keyword: "*uderza o biurko*" },
  { id: "j19", keyword: "poproszę technika od mikrofonu" },
  { id: "j20", keyword: "spicy fakty o języku polskim" },
  { id: "j21", keyword: "ja nie kłamię proszę państwa" },
  {
    id: "j22",
    keyword:
      "od smrodu jeszcze nikt nie umarł, a od przeciągu cała armia napoleona",
  },
  { id: "j23", keyword: "Prawdopodobieństwo jest 0 ale nie niemożliwe" },
  { id: "j24", keyword: "Moi absolwenci zarabiają 40k miesięcznie" },
  { id: "j25", keyword: "GENIALNE" },
  { id: "j26", keyword: "Flex" },
  { id: "j27", keyword: "Lekcja o życiu" },
  { id: "j28", keyword: "Zachwalanie statystyki" },
  { id: "j29", keyword: "Narzekanie na statystykę" },
  { id: "j30", keyword: "Małżeństwo lub dzieci" },
  { id: "j31", keyword: "Gładko wpleciony cytat z Biblii" },
  { id: "j32", keyword: "Weźmiemy PANA/ PANIĄ" },
  { id: "j33", keyword: "Statystycznie rzecz mówiąc..." },
  { id: "j34", keyword: "Ciekawostka" },
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
