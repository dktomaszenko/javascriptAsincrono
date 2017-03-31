/**
 * Koncepcja thunk
 */

// prosty przyklad

/*function foo(x, y) {
 return x + y;
 }
 function fooThunk() {
 return foo(3, 4);
 }
 // Później.
 console.log(fooThunk()); // 7*/


//-----------------------------------

function foo(x, y) {
    return x + y;
}

function thunkify(fn) {
    var args = [].slice.call(arguments, 1);
    return function (cb) {
        args.push(cb);
        return fn.apply(null, args);
    };
}

var fooThunk = thunkify(foo, 3, 4);
// Później.
fooThunk(function (sum) {
    console.log(sum); // 7
});

// Bardziej przejrzysty kod:
var fooThunkory = thunkify(foo);
var fooThunk1 = fooThunkory(3, 4);
var fooThunk2 = fooThunkory(5, 6);
// Zamiast następującego:
var fooThunk1 = thunkify(foo, 3, 4);
var fooThunk2 = thunkify(foo, 5, 6);


//-----------------------------------------

// Podobieństwo: przygotowanie komponentu zadającego pytanie.
var fooThunkory = thunkify(foo);
var fooPromisory = promisify(foo);
// Podobieństwo: zadanie pytania.
var fooThunk = fooThunkory(3, 4);
var fooPromise = fooPromisory(3, 4);
// Udzielenie odpowiedzi przez funkcję opakowującą (thunk).
fooThunk(function (err, sum) {
    if (err) {
        console.error(err);
    }
    else {
        console.log(sum); // 7
    }
});
// Udzielenie odpowiedzi przez obietnicę.
fooPromise
    .then(
        function (sum) {
            console.log(sum); // 7
        },
        function (err) {
            console.error(err);
        }
    );