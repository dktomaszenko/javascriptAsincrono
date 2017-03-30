Object.prototype.then = function(){};
Array.prototype.then = function(){};
var v1 = { hello: "świecie" };
var v2 = [ "Hello", "Świecie" ];

v1.then(
    function (data) {
        console.log('sdas');
    }
);