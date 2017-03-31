// Generatory

var x = 1;
function *foo() {
    x++;
    yield; // Pauza!
    console.log("x:", x);
}
function bar() {
    x++;
}


// Utworzenie iteratora 'it' przeznaczonego do kontrolowania generatora.
var it = foo();
// W tym miejscu następuje rozpoczęcie wykonywania foo()!
it.next();
console.log(x); // 2
bar();
console.log(x); // 3
it.next(); // x: 3

//-----------------------------------------------
function *foo2(x) {
    var y = x * (yield);
    return y;
}
var it2 = foo2(6);
// Uruchomienie foo(..).
it2.next();
var res = it2.next(7);
res.value; // 42


function *foo2(x) {
    var y = x * (yield.valor);
    return y;
}

function fa(x) {
    return x++;
}


var it2 = foo2(fa(6));
// Uruchomienie foo(..).
it2.next();
var dig = 7;
var res = it2.next(function (dig) {
    return {
        tipo: 'test',
        valor: dig
    }
});
res.value; // 42


// ------------------------------  VER 2

function *foo(x) {
    var y = x * (yield "Witaj"); // <-- Wyrażenie yield wraz z wartością!
    return y;
}
var it = foo(6);
var res = it.next(); // Pierwsze wywołanie next() nie przekazuje żadnych danych.
res.value; // "Witaj"
res = it.next(7); // Przekazanie 7 do wstrzymanego wyrażenia yield.
res.value; // 42


// --------------------------------------

function *foo() {
    var x = yield 2;
    z++;
    var y = yield (x * z);
    console.log(x, y, z);
}
var z = 1;
var it1 = foo();
var it2 = foo();
var val1 = it1.next().value; // 2 <-- yield 2
var val2 = it2.next().value; // 2 <-- yield 2
val1 = it1.next(val2 * 10).value; // 40 <-- x:20, z:2
val2 = it2.next(val1 * 5).value; // 600 <-- x:200, z:3
it1.next(val2 / 2); // y:300
// 20 300 3
it2.next(val1 / 4); // y:10
// 200 10 3


//--------------------------------------------------

var a = 1;
var b = 2;
function *foo() {
    a++;
    yield;
    b = b * a;
    a = (yield b) + 3;
}
function *bar() {
    b--;
    yield;
    a = (yield 8) + b;
    b = a * (yield 2);
}


//----------------------------------------------------

var a = 1;
var b = 2;
function *foo() {
    a++;
    yield;
    b = b * a;
    a = (yield b) + 3;
}
function *bar() {
    b--;
    yield;
    a = (yield 8) + b;
    b = a * (yield 2);
}

function step(gen) {
    var it = gen();
    var last;
    return function () {
// Po wywołaniu yield po prostu następuje
// przekazanie wartości z powrotem w następnym kroku!
        last = it.next(last).value;
    };
}


// Upewniamy się o wyzerowaniu 'a' i 'b'.
a = 1;
b = 2;
var s1 = step(foo);
var s2 = step(bar);
// Najpierw w pełni wykonujemy *foo().
s1();
s1();
s1();
// Teraz wykonujemy *bar().
s2();
s2();
s2();
s2();
console.log(a, b); // 11 22













