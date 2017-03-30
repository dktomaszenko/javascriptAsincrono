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

var p = Promise.resolve( 42 );
p.then(
    null,
    function rejected(err){
// nunca llegaremos a esta linea.
    }
);