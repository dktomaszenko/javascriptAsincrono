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
var it2= foo2( 6 );
// Uruchomienie foo(..).
it2.next();
var res = it2.next( 7 );
res.value; // 42


function *foo2(x) {
    var y = x * (yield.valor);
    return y;
}

function fa(x) {
    return x++;
}


var it2= foo2( fa(6) );
// Uruchomienie foo(..).
it2.next();
var dig = 7;
var res = it2.next( function (dig) {
    return {
        tipo: 'test',
        valor: dig
    }
} );
res.value; // 42
























