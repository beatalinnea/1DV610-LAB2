# Reflektion

## Tabell - Kapitel 2 - Meaningful Names
Utvalda identifierare i det publika interfacet

| Namn och förklaring | Reflektion och regler från Clean Code  |
|------|---------|
|addPollValues(data)
Metod som tar in en array av värden och räknar förekomsten av respektive värde|Do one thing
Denna metod har många olika sektioner (sections with functions) vilket är ett tecken på att den gör mer än en sak. Vi har felhantering, variabeldeklaration, nästlade kontrollsatser och metodanrop. 

Have no side effects
Metoden uppdaterar hela diagrammet om nya värden skickas in i ett nytt metodanrop, vilket kan vara oväntat. Det bryter mot principen om att funktionen inte ska ha dolda biverkningar.|
|||
|||
|||
|||

## Reflektion - Kapitel 2
Jag kan inte hitta något i detta kapitel som jag inte håller med om. Jag tycker att samtliga regler har en poäng som jag förstår syftet med. Jag tycker att avsnittet om ’avoid mental mapping’ är särskilt intressant just för att det framgår vikten av att koden inte bara ska gå att förstå, för det gör den oftast, men hur vi skriver den så att vi kan förstå den mer effektivt. Att behöva översätta variabelnamn i huvudet eller förstå dem på nytt förlänger och försvårar processen med att läsa eller skriva kod generellt.

## Tabell - Kapitel 3 - Functions
De fem längsta metoderna (både publika och privata)

| Namn och förklaring | Reflektion och regler från Clean Code  |
|||
|||
|||
|||
|||


## Reflektion - Kapitel 3
Jag tycker att principen ’Do One Thing’ är en tydlig och mätbar riktlinje. Jag kan faktiskt se vad min funktion gör, hur många uppgifter den har och vad den bör göra - det går att se funktionaliteten på ett sätt som jag inte på samma självklara sätt kan se för principer vid t.ex namngivning. Att välja ett beskrivande metodnamn enligt principerna som tas upp i boken verkar delvis enkelt men också svårt. Jag håller med om att ett metodnamn gärna får vara långt. Jag förstår att ord som inte fyller en funktion för sammanhanget inte bör inkluderas, men när är långt för långt och när är långt bra långt? När förtydligar någonting kontexten och när behövs det inte? Vid val av metodnamn ställs vi inför beslut som ska tas utifrån vad som ses som rimligt - Men en spretig funktion säger snarare till mig att den gör för mycket. Jag ser dock att en stor del av poängen med dessa förhållningssätt är inte att vår namngivning ska vara ”korrekt”, men att jag ens reflekterar över vad mitt metodnamn antyder - kommer antagligen göra det lättare att förstå den.


## Reflektion - egna erfarenheter från egen kodkvalitet
Det har varit intressant att reflektera över vilka regler jag anser att jag naturligt följer och vilka jag behöver aktivt anpassa mig till för att skriva min kod mer i enlighet med bokens riktlinjer. Problemen nämnda i tabellerna ovan är inte åtgärdade, men problem med min kodkvalitet fanns i mycket större utsträckning innan jag började analysera och leta efter dem. Jag hittade många fall där jag bröt mot principen ’Do One Thing’. När min kod först fungerade som jag ville, likadant som den fungerar vid inlämning, hade jag nog hälften så många metoder än vad jag slutligen har. Jag samlade mycket spretig funktionalitet, som berör samma problem, i en och samma metod och behövde anstränga mig för att bryta isär den. 
              
Jag har märkt att jag intuitivt tänker på att inte namnge variabler med enstaka bokstäver eller förkortningar. Jag tror att det som faller sig naturligt att skriva utifrån det man själv förstår och föredrar när man skriver sin kod. Jag upplever att det tar mig längre tid att komma framåt om jag inte namnger variabler på ett tydligt sätt som talar om för mig vad variabeln representerar (undviker mental mapping). Vad som däremot är viktigt för kodkvaliteten är att namngivningen inte ska vara begriplig enbart för mig själv.
                 
Ännu en brist i min kodkvalitet är att jag använder liknande namn för metoder som har olika syften, vilket går emot principen ’one word per concept’. Det blir tydligt att jag inte har gjort tillräckliga distinktioner mellan dem. Ett exempel på detta är att jag har en privat metod i klassen som heter #clearHeadline och en publik metod som heter removeHeadline. Problemet är att dessa namn inte tydligt markerar skillnaden mellan metoderna eller förklarar varför man skulle använda den ena framför den andra. Prefixen "clear" och "remove" kan tolkas som synonymer inom denna kontext, och min nuvarande namngivning misslyckas med att klart kommunicera vad respektive metod faktiskt gör.