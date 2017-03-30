# javascriptAsincrono

`Promise.all([ .. ])
W sekwencji asynchronicznej (łańcuch obietnic) w danym momencie jest koordynowane tylko jedno
zadanie asynchroniczne, czyli krok 2. następuje dokładnie po kroku 1., natomiast krok 3. jest wykonywany
dokładnie po kroku 2. Co w sytuacji, gdy chcemy, aby co najmniej dwa kroki były wykonywane
jednocześnie (czyli „współbieżnie”)?`