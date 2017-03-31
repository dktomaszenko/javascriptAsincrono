function getY(x) {
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            resolve((3 * x) - 1);
        }, 100);
    });
}

function foo(bar, baz) {
    var x = bar * baz;
    return getY(x)
        .then(function (y) {
            // Opakowanie obu wartości i umieszczenie ich w kontenerze
            return [x, y];
        });
}

foo(10, 20)
    .then(function (msgs) {
        var x = msgs[0];
        var y = msgs[1];
        console.log(x, y); // 200 599
    });


//  SE LO PUEDE RESOLVER TAMBIEN EN ESTA FORMA ****************

function foo(bar, baz) {
    var x = bar * baz;
// Zwrot obu obietnic.
    return [
        Promise.resolve(x),
        getY(x)
    ];
}

Promise.all(
    foo(10, 20)
)
    .then(function (msgs) {
        var x = msgs[0];
        var y = msgs[1];
        console.log(x, y);
    });

//**********  VER 3

Promise.all(
    foo(10, 20)
)
    .then(Function.apply.bind(
        function (x, y) {
            console.log(x, y); // 200 599
        },
        null
    ));

//********** VER 4

Promise.all(
    foo(10, 20)
)
    .then(function ([x, y]) {
        console.log(x, y); // 200 599
    });


//------------------------------------------------------------

// Sprawdzenie bezpieczne dla skryptu typu polyfill.
if (!Promise.wrap) {
    Promise.wrap = function (fn) {
        return function () {
            var args = [].slice.call(arguments);
            return new Promise(function (resolve, reject) {
                fn.apply(
                    null,
                    args.concat(function (err, v) {
                        if (err) {
                            reject(err);
                        }
                        else {
                            resolve(v);
                        }
                    })
                );
            });
        };
    };
}