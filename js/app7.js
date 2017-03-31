//   ****************  iteratory  *********************


var gimmeSomething = (function () {
    var nextVal;
    return function () {
        if (nextVal === undefined) {
            nextVal = 1;
        }
        else {
            nextVal = (3 * nextVal) + 6;
        }
        return nextVal;
    };
})();
gimmeSomething(); // 1
gimmeSomething(); // 9
gimmeSomething(); // 33
gimmeSomething(); // 105

////////////////  uproszczenie kodu wyzej

var something = (function () {
    var nextVal;
    return {
// Poniższy wiersz jest potrzebny dla pętli for-of.
        [Symbol.iterator]: function () {
            return this;
        },
// Metoda standardowego interfejsu iteratora.
        next: function () {
            if (nextVal === undefined) {
                nextVal = 1;
            }
            else {
                nextVal = (3 * nextVal) + 6;
            }
            return {done: false, value: nextVal};
        }
    };
})();
something.next().value; // 1
something.next().value; // 9
something.next().value; // 33
something.next().value; // 105


//   *******  interable  ***************************

var a = [1, 3, 5, 7, 9];
var it = a[Symbol.iterator]();
it.next().value; // 1
it.next().value; // 3
it.next().value; // 5


//----------------------------------------------------------------------


function foo(x, y) {
    ajax(
        "http://dowolny.adres.url.1/?x=" + x + "&y=" + y,
        function (err, data) {
            if (err) {
// Zgłoszenie błędu w *main().
                it.throw(err);
            }
            else {
// Wznowienie działania *main() wraz z otrzymanymi danymi (data).
                it.next(data);
            }
        }
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
// Uruchomienie całości!
it.next();