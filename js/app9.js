/**
 * Delegowanie generatora
 */



// prosty przyklad dla zrozumienia dzialania

function *foo() {
    console.log("Rozpoczęcie działania *foo().");
    yield 3;
    yield 4;
    console.log("Zakończenie działania *foo().");
}
function *bar() {
    yield 1;
    yield 2;
    yield *foo(); // Delegacja za pomocą yield!
    yield 5;
}

var it = bar();
it.next().value; // 1
it.next().value; // 2
it.next().value; // Rozpoczęcie działania *foo().
// 3
it.next().value; // 4
it.next().value; // Zakończenie działania *foo().
// 5


// -----------------------------------------------

function *foo() {
    var r2 = yield request("http://dowolny.adres.url.2");
    var r3 = yield request("http://dowolny.adres.url.3/?v=" + r2);
    return r3;
}
function *bar() {
    var r1 = yield request("http://dowolny.adres.url.1");
// "Delegowanie" do *foo() za pomocą yield*.
    var r3 = yield *foo();
    console.log(r3);
}
run(bar);


// *** Wyjątki również można delegować

function *foo() {
    try {
        yield "B";
    }
    catch (err) {
        console.log("nieprzechwycony błąd wewnątrz *foo():", err);
    }
    yield "C";
    throw "D";
}
function *bar() {
    yield "A";
    try {
        yield *foo();
    }
    catch (err) {
        console.log("nieprzechwycony błąd wewnątrz *bar():", err);
    }
    yield "E";
    yield *baz();
// Uwaga: nawet nie dotrzesz do tego wiersza!
    yield "G";
}
function *baz() {
    throw "F";
}
var it = bar();
console.log("na zewnątrz:", it.next().value);
// na zewnątrz: A
console.log("na zewnątrz:", it.next(1).value);
// na zewnątrz: B
console.log("na zewnątrz:", it.throw(2).value);
// nieprzechwycony błąd wewnątrz *foo(): 2
// na zewnątrz: C
console.log("na zewnątrz:", it.next(3).value);
// nieprzechwycony błąd wewnątrz *bar(): D
// na zewnątrz: E
try {
    console.log("na zewnątrz:", it.next(4).value);
}
catch (err) {
    console.log("nieprzechwycony błąd na zewnątrz:", err);
}

/*
 nieprzechwycony
 błąd
 na
 zewnątrz: F*/


//------------------------------------------------------------------------


// Wywołanie request(..) to oparta na obietnicach funkcja pomocnicza wykonująca żądania Ajax.
var res = [];
function *reqData(url) {
    var data = yield request(url);
// Przekazanie kontroli.
    yield;
    res.push(data);
}
var it1 = reqData("http://dowolny.adres.url.1");
var it2 = reqData("http://dowolny.adres.url.2");
var p1 = it1.next();
var p2 = it2.next();
p1.then(function (data) {
    it1.next(data);
});
p2.then(function (data) {
    it2.next(data);
});
Promise.all([p1, p2])
    .then(function () {
        it1.next();
        it2.next();
    });

//----------------------------------------------

// Wywołanie request(..) to oparta na obietnicach funkcja pomocnicza wykonująca żądania Ajax.
var res = [];
runAll(
    function*() {
        var p1 = request("http://dowolny.adres.url.1");
// Przekazanie kontroli.
        yield;
        res.push(yield p1);
    },
    function*() {
        var p2 = request("http://dowolny.adres.url.2");
// Przekazanie kontroli.
        yield;
        res.push(yield p2);
    }
);

///   VER 2

// Wywołanie request(..) to oparta na obietnicach funkcja pomocnicza wykonująca żądania Ajax.
runAll(
    function*(data) {
        data.res = [];
// Przekazanie kontroli (oraz komunikatu).
        var url1 = yield "http://dowolny.adres.url.2";
        var p1 = request(url1); // "http://dowolny.adres.url.1"
// Przekazanie kontroli.
        yield;
        data.res.push(yield p1);
    },
    function*(data) {
// Przekazanie kontroli (oraz komunikatu).
        var url2 = yield "http://dowolny.adres.url.1";
        var p2 = request(url2); // "http://dowolny.adres.url.2"
// Przekazanie kontroli.
        yield;
        data.res.push(yield p2);
    }
);