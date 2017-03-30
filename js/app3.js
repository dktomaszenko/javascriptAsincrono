
// cadena del flujo de control
var p = Promise.resolve(21);
var p2 = p.then(function (v) {
    console.log(v); // 21
// comprobar p2 con el valor 42.
    return v * 2;
});
// conectamos con p2.
p2.then(function (v) {
    console.log(v); // 42
});