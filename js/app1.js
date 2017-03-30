function addNumbers(x, y) {
// Upewniamy się, że dane wejściowe są liczbami.
    if (typeof x !== "number" || typeof y !== "number") {
        throw Error("Nieprawidłowe parametry.");
    }
}

function addNumbersB(x, y) {
// Upewniamy się, że dane wejściowe są liczbami.
    x = Number(x);
    y = Number(y);
// Operator + bezpiecznie przeprowadzi dodawanie wartości liczbowych.
    return x + y;
}
addNumbers(21, 21); // 42
addNumbers(21, "21"); // 42

addNumbersB(21, 21); // 42
addNumbersB(21, "21"); // 42