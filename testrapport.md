# Verifiering och validering av din modul. 

Det ska vara En Enda testrapport

För mig som examinator:
det behöver finnas tester
jag behöver kunna se vad som finns, vad som fungerar och vad som inte fungerar
jag behöver bli övertygad om att ovanstående är korrekt
jag vill inte spendera mycket tid för att förstå det.
För en användare av modulen (en programmerare)
behöver veta vad som finns, vad som fungerar och inte
behöver känna tillit till funktion för att vilja använda det
vill inte spendera tid för att förstå det.
För en vidareutvecklare av modulen
behöver veta vad som finns, vad som fungerar och inte fungerar
vill kunna ändra, testa och se vad som nu fungerar och inte fungerar
vill veta hur den skall kunna skapa nya tester när den skapar ny funktionalitet

För att nå samförstånd om kodens funktion behöver den testas. Hur detta sker är mindre viktigt än att det sker. Som jag ser det finns det tre val ( men fler varianter kan finnas ). Oavsett val kommer ni redovisa för mig med hjälp utav en testrapport i Markdown där det tydligt framgår vad som är testat, hur det är testat och vilket utfall det fick. Se även betygskraven.


Ni testar er kod genom att skapa ett användargränssnitt ( webb, console, ui ) i en separat TestApp. Ni skapar manuella testfall ( se 1dv613) och går igenom varje testfall och matar in indata och observerar själva manuellt utdata och jämför med förväntat utdata. Ni dokumenterar er testning i en testrapport ( se 1dv613 ) som markdown.
Ni skapar en testapplikation som automatiskt kör varje test var för sig och kör den koden och observerar testernas utfall antingen med kod eller manuellt. Testapplikationen eller ni skapar en testrapport som markdown.
Ni skapar automatiska enhetstester för er modul med hjälp utav ett testramverk. Ni kör dessa och redovisar resultat med en testrapport i markdown. ni kan länka in eventuella testrapporter ifrån testramverk eller ta screenshots och inkludera i er testrapport.


Skriv en kort summering om hur modulen testats. Var så tydlig så att någon annan skulle kunna utföra testet. För testresultaten. 
Skapa en tabell i markdown med tre kolumner. Varje rad blir ett test.


- Vad som testats / Ex metodnamn, eller krav
- Hur det testats
- Testresultat

## Krav
- Funktionell kod. All kod skall vara testad. De flesta testfall skall fungera, något enstaka testfall får misslyckas eller känd bugg får finnas. Modulen måste dock fungera i stort. Det finns en testrapport som visar vad som fungerar och hur det är testat.

Högre:
- Testningen är övertygande och nogrann. Viktigaste kraven fungerar.