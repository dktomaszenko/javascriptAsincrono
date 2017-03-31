/**
 * Generatory plus obietnice
 */


// jak zamienic ponizszy kod w nowoczesny kod uzywajacy generaty ?

function foo(x, y) {
    return request(
        "http://dowolny.adres.url.1/?x=" + x + "&y=" + y
    );
}
foo(11, 31)
    .then(
        function (text) {
            console.log(text);
        },
        function (err) {
            console.error(err);
        }
    );


// rozwiazanie

function foo(x, y) {
    return request(
        "http://dowolny.adres.url.1/?x=" + x + "&y=" + y
    );
}
function *main() {
    try {
        var text = yield foo(11, 31);
        console.log(text);
    }
    catch (err) {
        console.error(err);
    }
}

var it = main();
var p = it.next().value;
// Oczekiwanie na rozwiązanie obietnicy p.
p.then(
    function (text) {
        it.next(text);
    },
    function (err) {
        it.throw(err);
    }
);


//  *** Generator bazujący na obietnicy *****


// Podziękowania dla Benjamina Gruenbauma (@benjamingr on GitHub)
// za wprowadzenie tutaj ogromnych usprawnień!
function run(gen) {
    var args = [].slice.call(arguments, 1), it;
// Inicjalizacja generatora w bieżącym zakresie.
    it = gen.apply(this, args);
// Zwrot obietnicy pozwalającej na zakończenie działania generatora.
    return Promise.resolve()
        .then(function handleNext(value) {
// Działanie aż do następnej wartości przekazanej przez wyrażenie yield.
            var next = it.next(value);
            return (function handleResult(next) {
// Czy generator zakończył działanie?
                if (next.done) {
                    return next.value;
                }
// Jeśli nie, kontynuujemy pracę.
                else {
                    return Promise.resolve(next.value)
                        .then(
// W przypadku sukcesu należy wznowić działanie
// pętli asynchronicznej i wartość rozwiązania
// wysłać z powrotem do generatora.
                            handleNext,
// W przypadku odrzucenia obietnicy
// błąd powinien być przekazany
// z powrotem do generatora w celu
// jego obsłużenia przez generator.
                            function handleErr(err) {
                                return Promise.resolve(
                                    it.throw(err)
                                )
                                    .then(handleResult);
                            }
                        );
                }
            })(next);
        });
}


function *main() {
// ..
}
run(main);

// ------------------------------------------

function *foo() {
// "Jednoczesne" wykonanie obu żądań.
    var p1 = request("http://dowolny.adres.url.1");
    var p2 = request("http://dowolny.adres.url.2");
// Oczekiwanie na rozwiązanie obu obietnic.
    var r1 = yield p1;
    var r2 = yield p2;
    var r3 = yield request(
        "http://dowolny.adres.url.3/?v=" + r1 + "," + r2
    );
    console.log(r3);
}
// Użycie wcześniej zdefiniowanej funkcji pomocniczej run(..).
run(foo);


//------ VER 2

function *foo() {
// "Jednoczesne" wykonanie obu żądań
// i oczekiwanie na rozwiązanie obu obietnic.
    var results = yield Promise.all([
        request("http://dowolny.adres.url.1"),
        request("http://dowolny.adres.url.2")
    ]);
    /*    var r1 = results[0];
     var r2 = results[1];*/
    var [r1, r2] = results;
    var r3 = yield request(
        "http://dowolny.adres.url.3/?v=" + r1 + "," + r2
    );
    console.log(r3);
}
// Użycie wcześniej zdefiniowanej funkcji pomocniczej run(..).
run(foo);


//-------------------- VER 3

// Uwaga: to jest zwykła funkcja, a nie generator.
function bar(url1, url2) {
    return Promise.all([
        request(url1),
        request(url2)
    ]);
}
function *foo() {
//Ukrycie wewnątrz funkcji bar(..) szczegółów związanych
// ze współbieżnością opartą na obietnicach.
    var results = yield bar(
        "http://dowolny.adres.url.1",
        "http://dowolny.adres.url.2"
    );
    var [r1, r2] = results;
    var r3 = yield request(
        "http://dowolny.adres.url.3/?v=" + r1 + "," + r2
    );
    console.log(r3);
}
// Użycie wcześniej zdefiniowanej funkcji pomocniczej run(..).
run(foo);




