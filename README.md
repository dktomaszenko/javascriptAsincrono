# javascriptAsincrono


chrome://flags/#enable-javascript-harmony



`Promise.all([ .. ])
W sekwencji asynchronicznej (łańcuch obietnic) w danym momencie jest koordynowane tylko jedno
zadanie asynchroniczne, czyli krok 2. następuje dokładnie po kroku 1., natomiast krok 3. jest wykonywany
dokładnie po kroku 2. Co w sytuacji, gdy chcemy, aby co najmniej dwa kroki były wykonywane
jednocześnie (czyli „współbieżnie”)?`


**Warianty wywołań all([ .. ]) i race([ .. ])**


`Wprawdzie w specyfikacji ES6 rodzime obietnice są dostarczane wraz z wbudowanymi wywołaniami
Promise.all([ .. ]) i Promise.race([ .. ]), ale istnieje jeszcze kilka często używanych wzorców
będących wariantami tych wymienionych.
none([ .. ])
Ten wzorzec przypomina wywołanie all([ .. ]), ale procedury obsługi spełnienia i odrzucenia
są poprzestawiane. Wszystkie obietnice muszą być odrzucone — odrzucenia stają się
wartościami spełniającymi i na odwrót.
any([ .. ])
Ten wzorzec przypomina wywołanie all([ .. ]), ale ignoruje wszelkie odrzucenia. Dlatego
tylko jedno jest wymagane do spełnienia zamiast wszystkich.
first([ .. ])
Ten wzorzec przypomina użycie wywołania any([ .. ]), co oznacza zignorowanie wszelkich
odrzuceń i spełnienie całości tuż po spełnieniu pierwszej obietnicy.
last([ .. ])
Ten wzorzec przypomina wywołanie first([ .. ]), ale wygrywa tylko ostatnie spełnienie.`


`var p = new Promise( function(resolve,reject){
// Funkcja resolve(..) jest wywoływana w celu rozwiązania (spełnienia) obietnicy.
// Funkcja reject(..) jest wywoływana w celu odrzucenia obietnicy.
} );`