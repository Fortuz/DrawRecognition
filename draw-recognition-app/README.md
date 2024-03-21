# Webes felület kód

## Pinia store

A pinia store a globális változók használatára, illetve globális állapotkezelésre használatos, itt fogok olyan változókat és függvényeket definiálni, melyeket az alkalmazás számos komponensében alkalmazok. Ezzel elkerülhető a duplikálás, illetve segíti az alkalmazás betöltésekor párhuzamosan inicializálandó változók létrehozását, amelyekre csak bizonyos helyeken lesz szükség, ezzel csökkentve a töltőképernyők idejét és javítva a felhasználói élményt.

### Változók

- language: A Language nevű enum típus segítségével számontartja az aktuálisan választott nyelvet.
- languageDict: Egy szótár típus, mely előre definiált változókból kiválasztja az aktuális nyelvnek megfelelőt és tárolja.
- model: A Pythonban létrehozott és betanított neuronhálót tartalmazza.
- modelPath: A betöltendő neuronháló modell elérési útvonala.
- loading: Igaz, ha egy párhuzamos folyamat még éppen fut.
- hunFlag: A magyar zászló képének elérési útvonala.
- engFlag: Az Egyesült Királyság zászlaja képének elérési útvonala.
- actualFlag: Az aktuális nyelvhez tartozó zászló képének elérési útvonala.

### Függvények

- initializeStore: Aszinkron függvény, betölti a neuronháló modellt a model változóba.
- changeLanguage: Megváltoztatja az aktuális nyelvet.
- getLanguageDictItem: Az adott paraméterhez tartozó szöveget kiszedi a languageDict szótárból.
- startLoading és endLoading: A loading flaget szabályozzák.

## usePlay

Úgynevezett composable függvény, amely olyan funkcionalitásokat foglal magába, melyeket több helyen is lehet alkalmazni, de nem globálisan, hanem mindig külön példányként. Ez a composable egy kapcsolatot teremt a FreePlay.vue, NormalPlayGame.vue és a DrawingPalette.vue komponensek között. Paraméterként a dependency injection elvnek megfelelően a store változót kapja meg.

### Változók

- predId: Az aktuális becslés azonosítója.
- prediction: A predId - hoz tartozó szöveges megjelenítése a getNameById segítő függvény alkalmazásával.
- drawingPalette: A DrawingPalette.vue komponens referenciája.
- predict: Elvégzi a becslést.

## App.vue

Az alkalmazás fő komponense, jelen alkalmazásban csak egy RouterView komponenst tartalmaz, ami az útvonal alapján dinamikusan fogja lerendelni az alkomponenseket.

## ProfileCreator.vue

A /profilecreator útvonalon érhető el, a felhasználó itt tudja megadni a felhasználónevét, majd tovább menni a következő oldalakra. Tartalmaz egy InputText és egy Button Primevue komponenset, előbbi egy bemeneti mezőt tartalmaz, ahova a felhasználó írni tud, utóbbi pedig elmenti a felhasználó által beírt nevet. Emellett tartalmaz egy zászlót, amellyel a nyelvet lehet átállítani.

### Változók

- playerName: Itt fog eltárolódni a felhasználó által beírt szöveg, össze van kötve az InputText komponenssel.
- valid: Ez fogja jelezni, hogy a felhasználó érvényes nevet adott - e meg és lehet - e tovább navigálni.
- isError: Jelzi, hogy érvénytelen szöveg van megadva, különbség a valid változó között, hogy ez csak akkor igaz, ha hiba van a szövegben.
- store: HIVATKOZÁS

### Függvények

- checkErrors: Leellenőrzi, hogy érvényes nevet adott - e meg a felhasználó, ennek függvényében állítja be a valid és isError változókat.
- submit: Elmenti a playerName változó tartalmát a böngésző localstorage tárhelyében, a userNameToken változóban, illetve tovább navigál a következő oldalra, nézve, hogy a felhasználó teljesítette - e már az oktatást.

## Tutorial.vue

Az oktató oldal komponense, az oktatás fő logikáját az Owl.vue komponensben (HIVATKOZÁS) valósítottam meg, viszont itt a külső segítségek fognak megjelenni, mint például a NavigationBar.vue (HIVATKOZÁS) és DrawingPalette.vue (HIVATKOZÁS) komponensek, de itt lehet kihagyni is az oktatást egy gomb segítségével.

### Változók

- owl: Az Owl.vue komponens referenciája.
- store: HIVATKOZÁS

### Függvények

- onEnd: Az owl változó end eseményének kezelésére használatos függvény, amely elmenti a böngésző localstorage tárhelyében egy tutorialDoneToken változóban, hogy a felhasználó teljesítette az oktatást, majd a kezdőlapra navigál.

## Home.vue

Ez a komponens az alkalmazás kezdőoldalát teszi ki, amely csak navigálási célt szolgál. Tovább tudunk haladni a FreePlay.vue, NormalPlay.vue, illetve a Tutorial.vue komponensek oldalára, illetve a nyelvet tudjuk változtatni.

## Main.vue

A FreePlay.vue és NormalPlay.vue komponensek befoglaló komponense, egy RouterView segítségével dinamikusan renderelődnek le, illetve a NavigationBar.vue elemet mindkét komponenshez hozzácsatolja. Mindezek mellett, amennyiben a store még nem fejezte be az inicializálást, akkor egy ProgressSpinner Primevue komponens fog megjelenni, mint töltőképernyő.

## NormalPlay.vue

A normál játék menüje, ahol a felhasználó beírhatja, hogy mennyi szót szeretne kapni a programtól a játék során. Egy Dialog komponens magába foglalja a szám mezőt, illetve az elindító gombot. Amikor a játék befejeződött, ez a komponens fog kapni róla értesítést.

### Változók

- inMenu: Jelzi, hogy éppen a menüben van a felhasználó, vagy éppen a játékban.
- categoryNumber: A választott kategóriák száma.

### Függvények

- start: Elindítja a játékot, ezzel az inMenu változót hamisra kapcsolja.
- onRestart: A NormalPlayGame.vue komponens restart esemény kezelésére szolgáló függvény, mely újraindítja a játékot lehetőséget adva a kategóriák számának újboli megadására.

## FreePlay.vue

A szabad játék komponense, ami csak a DrawingPalette.vue rajzfelület komponenssel fog kommunikálni, illetve segítségül hívja a usePlay composable függvényt, melyben minden szükséges funkcionalitás definiálva van, amely ennek a komponensnek a működéséhez szükséges.

## Owl.vue

A Tutorial.vue komponensben a bagoly szereplő beszédpanelét valósítja meg. Kettő publikus változóval és egy end eseménnyel fog tudni kommunikálni a szülőkomponenssel az aktuális halad állapotával kapcsolatban. A beszédbuborék egy képre és egy szövegdobozra épül, amely a szöveg folyamatos "gepelését" szimulálja, így növelve az interaktivitást és a felhasználói élményt.

### Változók

- texts: A megjelenítendő szövegek tömbje.
- typedText: Az aktuálisan megjelenített szöveg, amely karakterről karakterre épül fel.
- typingSpeed: A szimulált gépelés sebessége (milliszekundum/karakter).
- typingInterval: Az időzítő az automatikus szövegírás szimulációjához.
- textIndex: Az aktuálisan megjelenítendő szöveg indexe a texts tömbben.
- actualFullText: Az aktuálisan teljesen megjelenítendő szöveg.
- chatBubble: A beszédbuborék HTML elemének referenciája.
- fullText: Jelzi, hogy a jelenlegi szöveg teljes egészében megjelenítésre került-e.
- displayActionBar: Jelzi, hogy megjelenjen-e az akció sáv.
- displayDrawingPalette: Jelzi, hogy megjelenjen-e a rajzolófelület.

### Függvények

- typeText: Kezdeményezi a szöveg "gépelését" az aktuális indexű szöveggel.
- showFullText: Azonnal megjeleníti a jelenlegi szöveg teljes tartalmát, megszakítva a fokozatos megjelenítést.
- onClick: Ha a teljes szöveg már megjelenítésre került, továbblép a következő szövegre, vagy ha még nem, akkor azonnal megjeleníti a teljes szöveget.
- scrollToBottom: A beszédbuborék tartalmának görgetése az aljára.
- shouldScroll: Eldönti, hogy szükséges-e a tartalom aljára görgetni.

## NormalPlayGame.vue

A normál játék fő logikája, ami elindul, amint a NormalPlay.vue szülőkomponens kilép a menüből és elindítja a játékot. A restart eseményen keresztül kommunikál a szülővel. Ez a komponens foglalja magába a szavak véletlenszerű kiválasztását, a rajzok fogadását a DrawingPalette.vue komponensen keresztül, illetve a körök számának és a felhasználó pontjainak számontartását. A változók és függvények funkcionalitását a usePlay composable függvénnyel egészíti ki.

### Változók

- score: Az aktuális pontszáma a felhasználó, azaz, hogy hány rajzot sikerült kitalálnia a programnak.
- currentIndex: A választott kategóriákból az aktuális kategóriának az indexe.
- end: Jelzi, hogy vége van - e a játéknak.
- selectedCategories: A véletlenszerűen választott kategóriák.
- isCorrect: Az aktuális szót kitalálta - e a program a felhasználó rajza alapján.
- selectedNumber: Ennyi kategóriát választ ki az eredeti kategóriák közül, a szülőkomponens adja át paraméterként.

### Függvények

- getRandomCategories: Kiválaszt count paraméter darab kategóriát véletlenszerűen az array paraméter kategóriákból álló tömbből és készít belőlük egy új tömböt.
- initialize: Beállítja a változókat a kezdeti értékekre, illetve meghívja a getRandomCategories függvényt.
- makePrediction: A usePlay predict függvényének segítségével elvégez egy becslést az aktuális rajzra, majd ha az egyezik a sorsolt szóval, akkor emeli a pontszámot. Majd növeli az aktuális kör számát, illetve törli a vászon tartalmát.
- quit: Visszalép a főoldalra.

## NavigationBar.vue

Ez a komponens a navigációs sávot valósítja meg, amely lehetővé teszi a felhasználók számára, hogy gyorsan és egyszerűen navigáljanak az alkalmazás különböző részei között. A navigációs sáv tartalmazza a felhasználó nevét, valamint a nyelvváltáshoz szükséges zászló ikont. A komponens a Menubar Primevue komponenst használja az elemek megjelenítésére. A navigációs gombok mellett elérhető a szavak listája, ami egy párbeszédpanelt nyit meg, amely megjeleníti az elérhető kategóriákat.

### Változók

- items: A menüpontokat tartalmazó tömb, amely a navigációs sávban jelenik meg. Ez a tömb dinamikusan frissül a store állapotától függően.
- isCategoriesDialogOpen: Jelzi, hogy a kategóriák párbeszédpanelje meg van-e nyitva.
- gridCols: Meghatározza a kategóriák megjelenítéséhez használt grid oszlopainak számát a kijelző méretétől függően.
- getUserName: Kiolvassa a böngésző localstorage tárhelyéből a felhasználó megadott nevét.

## DrawingPalette.vue

Ez a komponens egy rajztáblát valósít meg, amely lehetővé teszi a felhasználók számára, hogy rajzoljanak a képernyőn egy adott területen belül, illetve rajzeszközöket válasszanak egy CustomDock.vue dokkoló panelből.

### Változók

- canvas: A rajztábla HTML canvas elemének referenciája.
- ctx: A canvas elem 2D rajzolási kontextusa.
- drawing: Jelzi, hogy a felhasználó éppen rajzol-e.
- mode: A rajzolási mód állapotát jelzi (igaz a rajzolásra, hamis a törlésre).

### Függvények

- predict: Feldolgozza a canvas-ban készített rajzot, majd feldolgozza azt, amit a store-ban tárolt model változónak átad, majd visszakapja a becslést.
- clear: Törli a rajztábla teljes tartalmát.
- startDrawing: A rajzolási folyamat kezdetét jelző függvény.
- stopDrawing: A rajzolási folyamat leállításához használt függvény.
- draw: Rajzolást végző függvény, amely követi az egér/érintés mozgását.
- onModeChanged: A rajzolási mód változásakor meghívódó függvény, amely lehetővé teszi a felhasználó számára, hogy váltson a rajzolás és a törlés között.

## CustomDock.vue

A Dock Primevue komponens személyre szabott változata. A DrawingPalette.vue komponenssel szoros kapcsolatban áll, a change és clear eseményeken keresztül fog kommunikálni a szülő komponenssel. Rajzolás, radír, illetve teljes vászon törlés eszközöket biztosít.

### Változók

- items: Ez a tömb a renderelendő lista tartalma, ahol a label tag lesz az eszköz neve, az icon tag a megjelenítendő kép, illetve a command függvényt fogja végrehajtani kattintás esetén.

### Függvények

- onItemClick: Az elemek kattintásának eseménykezelője, meghívja a command függvényt.
