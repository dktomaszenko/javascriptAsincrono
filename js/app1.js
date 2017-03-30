function addNumbers(x, y) {
// Nos aseguremos que los datos de entrado son números
    if (typeof x !== "number" || typeof y !== "number") {
        throw Error("Datos erroneos.");
    }
}

function addNumbersB(x, y) {
// Nos aseguremos que los datos de entrado son números , ver. 2
    x = Number(x);
    y = Number(y);
// Operador + sumara de forma segura
    return x + y;
}
addNumbers(21, 21); // 42
addNumbers(21, "21"); // 42

addNumbersB(21, 21); // 42
addNumbersB(21, "21"); // 42