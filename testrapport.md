# Testrapport

## Summering
Min modul har testats genom att skapa ett användargränssnitt i webbläsaren - alltså en test-app. Test-appen befinner sig i projektets repository, där test-app använder sig av min modul och använder samtliga av modulens publika metoder. Test-appen demonstrerar även hur modulen kan användas, eftersom den använder sig av modulens publika metoder.

För att starta test-appen används Vite som är en devDependency i projektet. Efter att projektet klonats installeras projektets beroenden med ’npm install’. För att starta test-appen används kommandot ’npm run dev’.

Test-appen innehåller 12 metoder som anropas när appen startar. För att testa modulen
skapar test-appen en instans av modulens (enda) huvudklass PollDisplay och testar det publika interfacet genom att anropa PollDisplays metoder.

## Testrapport
| **Vad som testats (metodnamn/krav)** | **Hur det testats** | **Testresultat** |
|------|---------|---------|
|addPollValues(data) - Förväntas fylla canvas elementet med ett stapeldiagram där respektive värde blir ett steg högre för varje gång det förekommer i arrayen.|testAddPollValues() anropar PollDisplay.addPollValues([’ett’, ’två’]).|OK|
|addHeadline(text) - Förväntas visa texten (argumentet) som en rubrik intill stapeldiagrammet.|testAddHeadline() anropar PollDisplay.addHeadline(’rubrik’)|OK|
|addTotalVotes() - Förväntas visa det totala antalet ”röster” (element i arrayen) som ytterligare en rubrik intill stapeldiagrammet.|testAddTotalVotes() anropar PollDisplay.addTotalVotes()|OK|
|changeBackgroundColor(color) - Förväntas ändra färgen på canvaselementet (vilket innebär ändra färgen på bakgrunden till ett befintligt diagram) till den angiven som argument.|(Testet förutsätter att PollDisplay inte redan bakgrundsfärgen satt till #efdefd) testChangeBackgroundColor() anropar PollDisplay.changeBackgroundColor(’#efdefd’)|OK|
|resize(width, height) - Förväntas ändra storleken på canvaselementet (vilket innebär ändra storleken på ett befintligt diagram) till det angivet som argument.|(Testet förutsätter att PollDisplay inte redan har width: 500, height: 300) testResize() anropar PollDisplay.resize(500, 300)|OK|
|removeHeadline() - Förväntas ta bort eventuell befintlig rubrik intill diagrammet.|(Testet förutsätter att PollDisplay har en befintlig rubrik) testRemoveHeadline() anropar PollDisplay.removeHeadline()|OK|
|addPollValues(data) - Stapeldiagrammet förväntas uppdateras vid nytt metodanrop.|testAddNewValues() anropar PollDisplay.addPollValues([1, 2])|OK*|
|addPollValues(data) - Stapeldiagrammets x-värden sorteras i storleksordning om datan består av siffror.|testValuesAreBeingSorted() anropas addPollValues([2, 9, 4, 1, 10])|OK|
|addHeadline(text) - Förväntas visa ny rubrik om metoden anropas fastän där redan finns en befintlig rubrik.|(Testet förutsätter att PollDisplay har en befintlig rubrik) testHeadlineChange() anropar PollDisplay.addHeadline(’ny rubrik’)|OK|
|addHeadline(text) - Förväntas ge error om argument inte är en sträng (testappen visar error i webbläsarens console)|testInvalidHeadline() anropar PollDisplay.addHeadline(2)|OK|
|addPollValues(data) - Förväntas ge error om argument inte är en array.|testInvalidData() anropar PollDisplay.addPollValues(’test’)|OK|
|PollDisplay(canvas) - Förväntas ge error om canvas objekt inte skickas med som argument vid skapande av nytt PollDisplay objekt.|testInvalidInstance() skapar ’new PollDisplay(2)’|OK|

'*' Testet passerar, dock går det att diskutera om det vore att föredra att vid nytt metodanrop skulle metoden istället addera nya värden till befintligt diagram.