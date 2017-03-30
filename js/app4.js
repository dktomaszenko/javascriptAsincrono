// ajax( {url}, {callback} ).
// peticion Ajax basada en promesa.
function request(url) {
    var ajax = $.ajax;
    return new Promise(function (resolve, reject) {
        ajax(url, resolve);
    });
}

// paso 1.
request("http://google.es")
// paso 2.
    .then(function (response1) {
        foo.bar(); // valor undefined, tenemos un error!
// nunca llegaremos a esta linea.
        return request("http://google.pl" + response1);
    })
    // paso 3.
    .then(
        function fulfilled(response2) {
//  nunca llegaremos a esta linea.
        },
// si la promesa ha sido rechazada tratamos error.
        function rejected(err) {
            console.log(err);
// error TypeError  foo.bar().
            return 42;
        }
    )
    // paso 4.
    .then(function (msg) {
        console.log(msg); // 42
    });


//----------------------------------------------------------------

/*
 como podemos coseguir si solo tenemos que reaccionar en el caso que falla la promesa (se resuelve con error)*/

var p = Promise.resolve(42);
p.then(
    null,
    function rejected(err) {
// nunca llegaremos a esta linea.
    }
);

//----------------------------------------------------------------------
/*vaya lio, como podemos resolver la promesa y devolver que ha sido rechazada*/

/*Powinno być teraz jasne, że resolve(..) to odpowiednia nazwa dla pierwszego parametru (wywołania
 zwrotnego) konstruktora Promise(..).*/

var rejectedPr = new Promise(function (resolve, reject) {
    resolve(Promise.reject("Ups!"));
});
rejectedPr.then(
    function fulfilled() {
    },
    function rejected(err) {
        console.log(err); // "Ups!"
    }
);

//---------------------------------------------------

// Wywołanie request(..) to narzędzie Ajax oparte na obietnicach,
// podobne do zdefiniowanego wcześniej w rozdziale.
var p1 = request("http://www.google.es");
var p2 = request("http://www.google.pl/");
Promise.all([p1, p2])
    .then(function (msgs) {
// Obie obietnice p1 i p2 są spełnione
// i tutaj dostarczają swoje komunikaty.
        return request(
            "http://www.google.jp" + msgs.join(",")
        );
    })
    .then(function (msg) {
        console.log(msg);
    });

//----------------------------------------------------------------------------

// Wywołanie request(..) to oparta na obietnicach funkcja pomocnicza Ajax,
// podobna do zdefiniowanej we wcześniejszej części rozdziału.
var p3 = request("http://dowolny.adres.url.1/");
var p4 = request("http://dowolny.adres.url.2/");
Promise.race([p3, p4])
    .then(function (msg) {
// Wyścig zostanie wygrany przez p3 lub p4.
        return request(
            "http://dowolny.adres.url.3/?v=" + msg
        );
    })
    .then(function (msg) {
        console.log(msg);
    });

// ---------------------------------------------------------------------------

/*Limit czasu dla wyścigu
 Przedstawiony poniżej przykład widziałeś już wcześniej. Tutaj posłuży nam do zilustrowania, jak
 funkcję Promise.race([ .. ]) można wykorzystać do wyrażenia wzorca wyczerpania limitu czasu:*/
// Funkcja foo() została oparta na obietnicach.
// Zakończenie działania zdefiniowanej wcześniej funkcji timeoutPromise(..).
// Obietnica odrzucona po upływie określonego czasu.
// Konfiguracja czasu dostępnego dla funkcji foo().
Promise.race([
    foo(), // Próba wywołania funkcji foo().
    timeoutPromise(3000) // Na wywołanie mamy trzy sekundy.
])
    .then(
        function () {
// Funkcja foo(..) została spełniona we wskazanym czasie!
        },
        function (err) {
// Funkcja foo() została odrzucona lub po prostu
// nie zakończyła działania w ustalonym czasie.
// Sprawdzamy więc 'err', aby poznać przyczynę błędu.
        }
    );


//-----------------------------------------------------------

// Sprawdzenie bezpieczne dla skryptu typu polyfill.
if (!Promise.observe) {
    Promise.observe = function (pr, cb) {
// Obserwacja z boku rozwiązania obietnicy pr.
        pr.then(
            function fulfilled(msg) {
// Zdefiniowanie w harmonogramie asynchronicznego wywołania zwrotnego (jako zadania).
                Promise.resolve(msg).then(cb);
            },
            function rejected(err) {
// Zdefiniowanie w harmonogramie asynchronicznego wywołania zwrotnego (jako zadania).
                Promise.resolve(err).then(cb);
            }
        );
// Zwrot początkowej obietnicy.
        return pr;
    }
}

//----------------------------------------------------
Promise.race([
    Promise.observe(
        foo(), // Próba wywołania foo().
        function cleanup(msg) {
// Operacje czyszczące po wywołaniu foo(), nawet jeśli
// nie zostało zakończone przed upływem przyznanego czasu.
        }
    ),
    timeoutPromise(3000) // Udzielenie trzech sekund.
]);

//-----------------------------------------------------

// Sprawdzenie bezpieczne dla skryptu typu polyfill.
if (!Promise.first) {
    Promise.first = function (prs) {
        return new Promise(function (resolve, reject) {
// Iteracja przez wszystkie obietnice.
            prs.forEach(function (pr) {
// Normalizacja wartości.
                Promise.resolve(pr)
                // Pierwsze spełnienie wygrywa całość i jednocześnie
                // stanowi rozwiązanie dla głównej obietnicy.
                    .then(resolve);
            });
        });
    };
}

// -----------------------------------------------------------

var p1 = Promise.resolve(21);
var p2 = Promise.resolve(42);
var p3 = Promise.reject("Ups!");
// Podwajamy wartości listy, nawet jeśli
// znajdują się w obietnicach.
Promise.map([p1, p2, p3], function (pr, done) {
// Upewniamy się, że element jest obietnicą.
    Promise.resolve(pr)
        .then(
// Wyodrębnienie wartości jako 'v'.
            function (v) {
// Mapowanie spełnienia 'v' na nową wartość.
                done(v * 2);
            },
// Lub mapowanie na komunikat odrzucenia obietnicy.
            done
        );
})
    .then(function (vals) {
        console.log(vals); // [42,84,"Ups!"]
    });