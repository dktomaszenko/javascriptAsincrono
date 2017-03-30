// ********  cadena del flujo de control   *******************

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

//---------------------------------------------------------------

var r = Promise.resolve(21);
r.then(function (v) {
    console.log(v); // 21
// Valor 42 es el resultado de encadenar las promesas.
    return v * 2;
})
// encadenamos la promesa.
    .then(function (v) {
        console.log(v); // 42
    });

//----------------------------------------------------------------

var s = Promise.resolve(21);
s.then(function (v) {
    console.log(v); // 21
// creamos la promesa con su resultado.
    return new Promise(function (resolve, reject) {
// la promasa se resuelve con valor 42.
        resolve(v * 2);
    });
})
    .then(function (v) {
        console.log(v); // 42
    });

//------------------------------------------------------------------

var t = Promise.resolve( 21 );
t.then( function(v){
    console.log( v ); // 21
// creamos la promesa con su resultado.
    return new Promise( function(resolve,reject){
// forzamos la respuesta asincrono
        setTimeout( function(){
// la promasa se resuelve con valor 42.
            resolve( v * 2 );
        }, 2000 );
    } );
} )
    .then( function(v){
// Se ejecuta con 2 seg de retraso
        console.log( v ); // 42
    } );

//----------------------------------------------------------------------

// siguiente ejemplo muy interesante de encadenar las promesas

function delay(time) {
    return new Promise( function(resolve,reject){
        setTimeout( resolve, time );
    } );
}
delay( 100 ) // paso 1.
    .then( function STEP2(){
        console.log( "paso 2 (después de 100 ms)" );
        return delay( 200 );
    } )
    .then( function STEP3(){
        console.log( "paso 3 (despúes de 200 ms)" );
    } )
    .then( function STEP4(){
        console.log( "paso 4 (siguiente paso)" );
        return delay( 50 );
    } )
    .then( function STEP5(){
        console.log( "paso 5 (despúes de 50 ms)" );
    } );