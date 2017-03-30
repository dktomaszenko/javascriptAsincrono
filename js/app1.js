function addNumbers(x,y) {
// Upewniamy się, że dane wejściowe są liczbami.
    if (typeof x !== "number" || typeof y !== "number") {
        throw Error("Nieprawidłowe parametry.");
    }
}