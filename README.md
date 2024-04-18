### szizsolt2001.web.elte.hu

# Neuronháló kód

## Globális változók

- train_amount: Kategóriánkénti rajzok száma a tanítási halmazban
- test_amount: Kategóriánkénti rajzok száma teszthalmazban
- directory_path: A nyers adatokhoz tartozó könyvtár elérési útja
- preproccessed_train_directory_path: A feldolgozott tanítási adatokhoz tartozó könyvtár elérési útja
- preproccessed_test_directory_path: A feldolgozott tesztadatokhoz tartozó könyvtár elérési útja
- models_directory_path: Az elmentett háló modellekhez tartozó könyvtár elérési útja
- max_length: A rekurrens háló esetében ilyen hosszúra lesznek kitolva az idősorok
- num_classes: Kategóriák száma
- model_ckpt: A rekurrens háló és súlyai ebben a fájlban lesznek elmentve
- cnn_model_ckpt: A konvolúciós háló és súlyai ebben a fájlban lesznek elmentve

## DataPrepper osztály

### Privát adattagok: A globális változók közül néhányat át fog venni és privát adattagként fogja használni

- num_classes
- directory_path
- train_directory
- test_directory
- train_amount
- test_amount
- rates: A kategóriánként felismerhető rajzok arányát fogja tárolni
- categories: Az új kategóriák nevei
- Publikus függvények
- **init**: A osztály konstruktora, az adattagokhoz szükséges globális változókat várja paraméterül és adja át az értékeket a privát adattagoknak
- run: Végigfuttatja a privát függvényeket az adatok előkészítéséhez, a need_download paraméterrel lehet szabályozni, hogy szükséges - e letölteni az adathalmazt, vagy sem

### Privát függvények

- download_dataset: Letölti az adathalmazt és elmenti a kijelölt könyvtárba
- read_format_csv: Beolvassa és feldolgozza a csv_name paraméterül kapott név alapján a csv fájlt. Eldobja felesleges oszlopokat, illetve azokat a rajzokat amelyek nem felismerhetően vannak rajzolva, majd hozzáadja az összes sorhoz a word_id paraméterül kapott új egyedi azonosítót, ez lesz az adott rajz azonosítója. Végül megkeveri a sorokat és csak az első train_amount+test_amount sort tartja meg és ezt fogja visszaadni.
- get_rates: Meghatározza minden kategóriára, hogy milyen arányban felismerhetőek a hozzá tartozó rajzok, emellett kiveszi azokat a kategóriákat amiket kizártam. Végül lementi ezeket az arányok a rates adattagban.
- get_categories: Kiválasztja a rates tömbből az első num_classes kategóriát rendezve és elmenti ezeket a categories tömbbe, ezek lesznek az új kategóriák.
- write_data: Az előkészített, feldolgozott adatok elmenti a kijelölt könyvtárakba, a tanítási adatokat külön - külön tömörített CSV fájlokban, a tesztadatokat pedig egy nagy tömörített fájlban megkeverve.

## SelfAttentionLayer osztály

### Privát adattagok

- hidden_units: Az input vektor mérete, amely meghatározza a teljesen összketött rétegek kimeneti dimenzióit (kulcs, érték, lekérdezés rétegek).
- seq_length: A kitolt idősorok hossza.
- pos_encoding: A pozíció elkodolás eredménye, ami hozzáadódik a bemenethez a sorrendiség megtartása érdekében.
- key: Teljesen összekötött réteg, amely a kulcs vektorokat generálja a bemenet alapján.
- query: Teljesen összekötött réteg, amely a lekérdezés vektorokat generálja a bemenet alapján.
- value: Teljesen összekötött réteg, amely az érték vektorokat generálja a bemenet alapján.

### Publikus függvények

- **init**: Az osztály konstruktora, amely meghívja a szülő Layer osztály konstruktorát.
- get_positional_encoding: Generálja a pozíciós kódolást az idősorok hosszúságának és a rejtett egységek számának függvényében.
- build: Egy inicializáló függvény, amely meghatározza a rejtett egységek számát és az idősor hosszát a bemeneti input_shape alak paraméter alapján, továbbá meghívja a positional_encoding függvényt és inicializálja a kulcs, lekérdezés, érték rétegeket.
- call: A réteg előrehaladó logikáját valósítja meg. Hozzáadja a pozíció elkódolást az x paraméterül kapott bemenethez, generálja a kulcs, lekérdezés és érték vektorokat, kiszámítja a súlyokat a lekérdezések és kulcsok skaláris szorzatának normalizált softmax függvényével, majd kiszámítja és visszaadja a súlyozott összeg vektorokat az értékeken keresztül.

## NeuralNetwork absztrakt osztály

### Védett adattagok: A globális változók közül vesz át néhányat.

- num_classes
- models_path
- checkpoint_directory
- train_directory
- test_directory
- checkpoint: A modell checkpoint objektuma, a súlyok mellett a modell architektúráját is fogja tárolni a megadott könyvtárban.
- early_stopping: A modell early stopping objektuma.
- dataframe: A tanító adatok egy nagy Pandas dataframe objektumban tárolva.
- model: Maga a modell objektuma.
- history: A tanítás folyamatának eredménye lesz benne tárolva.
- val_loss: A tanítás végső validációs költsége.
- val_acc: A tanítás végső validációs pontossága.
- y_pred: A modell legutolsó predikciójának eredménye.
- success_rate: A modell legutolsó predikciójának helyessége arányban megadva.
- test_data: A tesztadatok egy nagy Pandas dataframe objektumban tárolva.
- X_train: A bemeneti adatok a tanítási halmazban.
- X_val: A bemeneti adatok a validációs halmazban.
- y_train: A bemeneti adatokhoz tartozó címkék a tanítási halmazban.
- y_val: A bemeneti adatokhoz tartozó címkék a validációs halmazban.
- x_test: A bemeneti adatok a teszthalmazban.
- y_test: A bemeneti adatokhoz tartozó címkék a teszthalmazban.

### Védett függvények

- **init**: Az osztály konstruktora, amely átveszi a globális változókat és értékül adja a védett adattagoknak. Az alosztályok fogják meghívni.
- get_checkpoint: Létrehozza a checkpoint és early_stopping objektumokat. A patience paraméterül fogja megadni az early stoppingnál, hogy hány olyan epoch után, ahol nem javul a validációs költség állítsa le a tanítást.
- category_name_by_id: Megadja a kategória nevét a paraméterül kapott id azonosítója alapján.
- get_dataframe: Beolvassa a már előre feldolgozott tanítási adatokat és lementi egy Pandas dataframe objektumban, majd megkeveri a sorokat.
- proccess_points: Absztrakt függvény, a paraméterül kapott row Pandas dataframe sorára meghatározza a nyers rajz tömbből a feldolgozott pontokat.
- get_model: Absztrakt függvény, beleteszi a model változóba a megfelelő neuronháló modellt .
- get_train_data: Absztrakt függvény, elkészíti a tanító adatokat szétválasztva tanítási (X_train, y_train) és validációs (X_val, y_val) halmazokra.
- get_test_data: Absztrakt függvény, elkészíti a tesztadatokat (x_test, y_test).
- prepare_test_data: A test_data Pandas dataframe objektumban előkészíti a tesztadatok, illetve az y_test változóban elkészíti az adatokhoz tartozó címkéket, az alosztályokban már csak az x_test változót szükséges definiálni.

### Publikus függvények

- load_data: Meghívja az összes olyan függvényt, ami az adatok előkészítését végzi, a test_only paraméterrel lehet állítani, hogy szükség van - e a tanító adatokra, vagy csak a tesztadatokat szeretnénk használni.
- load_model: Meghívja az összes olyan függvényt, amely a model előkészítését végzik.
- load_weights: Betölti a modellhez már korábbról elmentett legjobb súlyokat a models_path és checkpoint_directory útvonalak segítségével.
- draw_samples: Kirajzol 5 véletlenszerű rajzot, melyeken látszódik a pontok sorrendisége is.
- train: Elvégzi a model változóban tárolt neuronháló tanítását, a paraméterül kapott epochs a tanítási ciklusok számát, az batch_size pedig a minibatch méretét adja meg.
- plot_train_results: Kirajzolja 2 grafikonon a tanítási és validációs költség, illetve pontosság alakulását.
- predict: A paraméterül kapott x bemenetre becslést végez a modell, visszatérési értéke maga a becslés (y_pred), illetve a becslés pontossága arányban megadva (success_rate).
- test_results: Kirajzolja az utolsó becsléshez tartozó konfúziós mátrixot.

## LSTMNetwork osztály

A NeuralNetwork absztrakt osztályból leszármazó osztály

### Publikus függvények

- **init**: Az osztály konstruktora, meghívja a szülő osztály konstruktorát
- random_test: Ez a függvény a betanított hálóval véletlenszerűen választott rajzokra ad egy becslést és kirajzolja magukat a rajzokat, illetve a valós és becsült kategóriájukat.
- experiment: Ez a függvény végzi a ref{subsubsec:recurrentLSTM} fejezetben említett invarianciára tett kísérletet.

### Privát függvények

- proccess_points: Ez a függvény fogja meghatározni a ref{subsubsec:recurrentLSTM} fejezetben említett (x,y,z) hármasokból álló pontokat.
- get_train_data: A feldolgozott tömböket kitolja a seq_length - ben megadott hosszúságra, illetve elkészíti a tanítási és validációs halmazokat.
- get_model: A model változóba teszi a neuronháló objektumot, ami a egy LSTM réteggel kezdődik, majd az általam definiált SelfAttentionLayer réteggel folytatódik, végül egy Dense réteg adja meg a becslést softmax aktivációs függvénnyel.
- get_test_data: A feldolgozott tömböket kitolja a seq_length - ben megadott hosszúságra, illetve elkészíti a teszthalmazt az x_test változóba.

## ConvolutionalNetwork osztály

A NeuralNetwork absztrakt osztályból leszármazó osztály

### Privát adattagok

- dimensions: A bemeneti adatok dimenzióját/alakját fogja tárolni.

### Publikus függvények

- **init**: Az osztály konstruktora, meghívja a szülő osztály konstruktorát, emellett tartalmaz egy plusz paramétert, a dimensions változót veszi át a globális változóból.
- get_model: A model változóba elkészíti a háló objektumát a ref{subsubsec:convNetwork} fejezetben említett architektúra alapján.

### Privát függvények

- proccess_points: Meghatározza a ref{subsubsec:convNetwork} fejezetben említett (x,y) párokból álló pontokat.
- get_matrix_from_points: Meghatározza a (x,y) párok alapján a 2 dimenziós tömböt, ami a rajzot egy képként fogja ábrázolni. Az array paraméter fogja megadni a (x,y) párokból álló tömböt, az index határozza meg, hogy melyik képhez készítjük el a mátrixot, illetve a df adja meg, hogy melyik dataframmel dolgozunk éppen (teszt vagy tanító).
- get_train_data: Végrehajtja a get_matrix_from_points függvényt minden sorára a tanító (dataframe) dataframenek, ezután választja szét a tanítási és validációs halmazokat.
- get_test_data: Végrehajtja a get_matrix_from_points függvényt minden sorára a teszt (test_data) dataframenek, majd beleteszi ezeket az x_test változóba.
