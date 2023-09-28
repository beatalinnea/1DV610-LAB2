# Testrapport

## Summering
Min modul har testats genom att skapa ett användargränssnitt i webbläsaren - alltså en test-app. Test-appen befinner sig i projektets repository, där test-app använder sig av min modul och använder samtliga av modulens publika metoder. Test-appen demonstrerar även hur modulen kan användas, eftersom den använder sig av modulens publika metoder.

För att starta test-appen används Vite som är en devDependency i projektet. Efter att projektet klonats installeras projektets beroenden med ’npm install’. För att starta test-appen används kommandot ’npm run dev’.

Test-appen innehåller 12 metoder som anropas när appen startar. För att testa modulen skapar test-appen en instans av modulens (enda) huvudklass BarChart och testar det publika interfacet genom att anropa BarCharts metoder. Testningen har skett genom att test-apps metodanrop har kommenterats bort för att inledningsvis köra det första metodanropet - sedan lägga till det andra, och till slut köra samtliga testmetoder. Observera att tre av testmetoderna förväntas att ge felmeddelanden i konsollen - dessa behöver testas separat då metoderna som anropas efter ett fel inte kommer att köras.

## Testrapport
| **Vad som testats (metodnamn/krav)** | **Hur det testats** | **Testresultat** |
|------|---------|---------|
|addValues(data) - Förväntas fylla canvas elementet med ett stapeldiagram där respektive värde blir ett steg högre för varje gång det förekommer i arrayen.|testAddValues() anropar BarChart.addValues([’ett’, ’två’]).|OK|
|addHeadline(text) - Förväntas visa texten (argumentet) som en rubrik intill stapeldiagrammet.|testAddHeadline() anropar BarChart.addHeadline(’rubrik’)|OK|
|addTotalVotes() - Förväntas visa det totala antalet ”röster” (element i arrayen) som ytterligare en rubrik intill stapeldiagrammet.|testAddTotalVotes() anropar BarChart.addTotalVotes()|OK|
|changeBackgroundColor(color) - Förväntas ändra färgen på canvaselementet (vilket innebär ändra färgen på bakgrunden till ett befintligt diagram) till den angiven som argument.|(Testet förutsätter att BarChart inte redan bakgrundsfärgen satt till #efdefd) testChangeBackgroundColor() anropar BarChart.changeBackgroundColor(’#efdefd’)|OK|
|resize(width, height) - Förväntas ändra storleken på canvaselementet (vilket innebär ändra storleken på ett befintligt diagram) till det angivet som argument.|(Testet förutsätter att BarChart inte redan har width: 500, height: 300) testResize() anropar BarChart.resize(500, 300)|OK|
|removeHeadline() - Förväntas ta bort eventuell befintlig rubrik intill diagrammet.|(Testet förutsätter att BarChart har en befintlig rubrik) testRemoveHeadline() anropar BarChart.removeHeadline()|OK|
|addValues(data) - Stapeldiagrammet förväntas uppdateras vid nytt metodanrop.|testAddNewValues() anropar BarChart.addValues([1, 2])|OK*|
|addValues(data) - Stapeldiagrammets x-värden sorteras i storleksordning om datan består av siffror.|testValuesAreBeingSorted() anropar BarChart.addValues([2, 9, 4, 1, 10])|OK|
|addHeadline(text) - Förväntas visa ny rubrik om metoden anropas fastän där redan finns en befintlig rubrik.|(Testet förutsätter att BarChart har en befintlig rubrik) testHeadlineChange() anropar BarChart.addHeadline(’ny rubrik’)|OK|
|addHeadline(text) - Förväntas ge error om argument inte är en sträng (testappen visar error i webbläsarens console)|testInvalidHeadline() anropar BarChart.addHeadline(2)|OK|
|addValues(data) - Förväntas ge error om argument inte är en array.|testInvalidData() anropar BarChart.addValues(’test’)|OK|
|BarChart(canvas, width, height) - Förväntas ge error om canvas objekt inte skickas med som argument vid skapande av nytt BarChart objekt.|testInvalidInstance() skapar ’new BarChart(2)’|OK|

'*' Testet passerar, dock går det att diskutera om det vore att föredra att vid nytt metodanrop skulle metoden istället addera nya värden till befintligt diagram.