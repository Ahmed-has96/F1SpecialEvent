# F1 Special Event

Jeg bygde F1 Special Event, en webapp der du kan registrere, søke opp og redigere Formel 1-førere. Appen har også en quiz. Jeg skrev brukergrensesnittet i React og REST-API-et i C# med ASP.NET Core. API-et bruker Entity Framework Core til å lese og lagre førere i SQLite.

**[Les C#-koden i DriversController](Webutvikling/F1SpecialEventAPI/Controllers/DriversController.cs)** · [Åpne React-klienten](Webutvikling/F1SpecialEvent/src)

## Følg et søk fra skjerm til database

1. Brukeren skriver inn en ID i [søkefeltet](Webutvikling/F1SpecialEvent/src/components/Drivers/SearchDriver.jsx). [DriverService](Webutvikling/F1SpecialEvent/src/Service/DriverService.jsx) sender `GET /api/Drivers/{id}`.
2. Metoden [GetDriver i C#](Webutvikling/F1SpecialEventAPI/Controllers/DriversController.cs) ber [DriverContext](Webutvikling/F1SpecialEventAPI/Context/DriverContext.cs) finne posten i databasen.
3. Finnes føreren, returnerer API-et `200 OK` med førerens data. Finnes ingen med den ID-en, returnerer det `404 Not Found`.

## Kjør lokalt

Dette er originalversjonen av prosjektet. Backend bruker .NET 7, som ikke lenger er støttet. Oppsettet under er ment for lokal utprøving. Du trenger .NET 7 SDK og Node.js med npm. Start fra prosjektets rotmappe i begge terminalene.

**1. Start API-et** (macOS/Linux). Ved første oppstart må SQLite-databasen opprettes. Kommandoene installerer EF-verktøyet lokalt og oppretter den tomme tabellen for førerne:

```sh
cd Webutvikling/F1SpecialEventAPI
mkdir -p Database
dotnet tool install --tool-path ./.tools dotnet-ef --version 7.0.13
./.tools/dotnet-ef database update
dotnet run --launch-profile http
```

Ved senere oppstart holder det å kjøre den siste kommandoen fra samme mappe. Åpne [Swagger](http://localhost:5266/swagger) for å prøve API-et. I en ny database gir [listen over førere](http://localhost:5266/api/Drivers) svaret `[]`. For å prøve søket: registrer en fører med `POST /api/Drivers`, finn ID-en i listen og slå den opp med `GET /api/Drivers/{id}`.

**2. Start React-klienten** i en ny terminal:

```sh
cd Webutvikling/F1SpecialEvent
npm ci
npm run dev
```

Åpne den lokale adressen Vite skriver i terminalen. La API-et kjøre på port 5266 mens du bruker appen.
