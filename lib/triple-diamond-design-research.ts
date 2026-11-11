// An unlisted copy of the Triple Diamond guide for one client team: only
// Researcher and UX / Product Designer, in Swedish, with the client's own
// seven phases (from their process picture, redrawn as the page's diagram)
// and a goal per diamond. The
// activities are chosen and described to serve those goals. Figma Make is
// switched off in the organisation, so no activity depends on it.
// Copy rule: no dashes as punctuation (the test checks it).
import type { Activity, Guide, GuideCopy, GuideProcess, Phase, Role, StepId } from "@/lib/triple-diamond";

/** Long and random so nobody finds it by guessing; the page is also noindex. */
export const TD_DR_SLUG = "ai-design-research-057dc529ef";

export const TD_DR_META = {
  title: "Triple Diamond AI",
  categoryLine: "Interaktiv guide · AI i designprocessen",
};

type DrRole = "res" | "design";

const ROLES: Role<DrRole>[] = [
  { id: "res", name: "Researcher", short: "Research" },
  { id: "design", name: "UX-/produktdesigner", short: "Design" },
];

const a = (title: string, how: string, example: string): Activity => ({ title, how, example });

const RAW: Phase<DrRole>[] = [
  {
    name: "Problemet",
    goal: "Etablera en gemensam och kontinuerligt uppdaterad insiktsbas där kvalitativa och kvantitativa insikter samlas, delas och omsätts till prioriterade problemområden som styr designteamets arbete och beslut.",
    subs: [
      {
        name: "Utforska problem",
        tag: "Fas 1",
        acts: {
          res: [
            a(
              "Bygg en gemensam insiktsbas",
              "Samla intervjuer, tester, enkätsvar, supportärenden och analysdata på ett ställe, med samma struktur för allt: källa, datum, målgrupp och taggar. Låt AI föreslå taggar och en kort sammanfattning när något nytt läggs in, och granska förslagen innan de publiceras. Bestäm vem som äger basen och hur ofta den ses över.",
              "Teamet samlar 14 tidigare studier i insiktsbasen. AI taggar dem mot en gemensam taxonomi på en eftermiddag. Researchern rättar taggarna i tre studier innan basen delas med hela designteamet.",
            ),
            a(
              "Koda och tematisera intervjuer",
              "Kom överens om en kodbok med teamet först. Låt sedan AI koda varje transkribering och föreslå nya koder för det den inte kan placera. Granska ett urval av citaten själv, slå ihop eller dela koder, och gruppera dem i teman först därefter. Lägg in teman i insiktsbasen med länk tillbaka till varje citat, så att allt går att spåra.",
              "Efter 12 intervjuer kodar AI alla transkriberingar mot kodbokens 20 koder. Researchern kontrollerar tre för hand, justerar två koder, kör igen och har en första temakarta samma eftermiddag.",
            ),
            a(
              "Väv ihop kvalitativ och kvantitativ data",
              "Ge AI teman från intervjuer tillsammans med siffror från analysverktyg, enkäter eller supportstatistik. Be den visa var källorna stödjer varandra och var de säger emot varandra. Kontrollera siffrorna mot källan själv innan de hamnar i insiktsbasen.",
              "Intervjuerna säger att avgifterna är otydliga, och supportdatan visar att 18 procent av ärendena handlar om avgifter. Tillsammans blir det ett starkare underlag än var för sig.",
            ),
          ],
          design: [
            a(
              "Skissa kundresor från insiktsbasen",
              "Ge AI teman, nyckelcitat och data ur insiktsbasen och be om ett första utkast till dagens kundresa med steg, handlingar, tankar och smärtpunkter. Använd det som underlag i en workshop, inte som svaret. Koppla varje steg till en insikt och markera det som är antaganden.",
              "Från intervjuteman och en export från analysverktyget skissar AI en onboardingresa i sex steg. På en timme rättar teamet två steg och lägger till en känslokurva från citaten.",
            ),
            a(
              "Granska dagens gränssnitt",
              "Ge AI skärmdumpar av dagens flöde och be den granska dem mot användbarhetsheuristiker och WCAG, med skärm för varje problem. Kontrollera varje problem själv och lägg in de som håller i insiktsbasen, så att de kan vägas mot det användarna säger.",
              "AI granskar 20 skärmar i kassaflödet och listar 14 problem. Designern bekräftar nio, bland annat att totalkostnaden först syns i sista steget.",
            ),
            a(
              "Skissa en tjänsteblueprint",
              "Ge AI kundresan, processanteckningar och det ni vet om systemen, och be om en blueprint med frontstage, backstage och stödprocesser. Gå igenom den med en verksamhetsutvecklare och en utvecklare, eftersom AI gissar vad som händer bakom kulisserna.",
              "Blueprinten visar att avgiftsinformationen kommer från tre system, vilket förklarar varför kunderna ser olika belopp.",
            ),
          ],
        },
      },
      {
        name: "Definiera problem",
        tag: "Fas 2",
        acts: {
          res: [
            a(
              "Formulera problemområden",
              "Be AI skriva om varje tema som ett problemområde ur användarens perspektiv, med de två eller tre starkaste belägg från både intervjuer och data. Justera formuleringen själv så att den håller sig till underlaget, och stryk områden som saknar stöd.",
              "Temat \"otydliga avgifter\" blir \"Kunder behöver förstå den totala kostnaden innan de bestämmer sig\", med citat från 7 av 12 deltagare och supportstatistik som stöd.",
            ),
            a(
              "Bedöm underlaget per problemområde",
              "Be AI lista antal källor, deltagare och metoder bakom varje problemområde, hur mycket som är kvalitativt och kvantitativt, och var underlaget spretar. Markera de svaga och planera hur luckorna ska fyllas.",
              "Två problemområden vilar på en enda intervju, så teamet gör en kort enkät innan de prioriteras.",
            ),
            a(
              "Håll insiktsbasen uppdaterad",
              "Efter varje ny studie eller varje månad: be AI jämföra det nya materialet med de befintliga problemområdena och visa vad som stärks, försvagas eller är nytt. Researchern bestämmer vad som ändras och berättar det för teamet.",
              "En ny enkät stärker problemområdet om avgifter och försvagar ett om inloggning, som flyttas ner i prioriteringen.",
            ),
          ],
          design: [
            a(
              "Prioritera problemområden med teamet",
              "Be AI göra ett första utkast till en prioriteringsmatris: effekt för användaren, nytta för verksamheten, hur starkt underlaget är och ungefärlig insats. Använd den som startpunkt i en workshop där teamet bestämmer ordningen. Spara besluten och skälen i insiktsbasen.",
              "AI placerar åtta problemområden i matrisen. Teamet flyttar två och väljer tre att arbeta med under kvartalet.",
            ),
            a(
              "Skriv Hur kan vi-frågor",
              "Ge AI varje prioriterat problemområde och be om flera Hur kan vi-frågor, från smala till breda. Välj och vässa de som lämnar plats för många lösningar, och använd dem i idéarbetet.",
              "För \"kunder behöver förstå den totala kostnaden\" föreslår AI tio frågor. Teamet väljer \"Hur kan vi visa totalkostnaden i det ögonblick man bestämmer sig?\"",
            ),
            a(
              "Skriv en designbrief per problemområde",
              "Be AI skissa en brief på en sida för varje prioriterat problemområde: problemet, beläggen, vad ni inte vet ännu och hur ni mäter att det blivit bättre. Granska den med researchern. Briefen blir starten på konceptarbetet och länkar tillbaka till insiktsbasen.",
              "Tre briefer är klara på en förmiddag. Den om avgifter blir underlaget för nästa konceptsprint.",
            ),
          ],
        },
      },
    ],
  },
  {
    name: "Konceptet",
    goal: "Primärt: effektivisera analysen efter användartester genom att minska tiden för transkribering, sammanställning och analys, så att insikter snabbare blir beslut och designförbättringar. Sekundärt: effektivisera utforskandet av designkoncept utifrån insiktsbasen och kravspecen.",
    subs: [
      {
        name: "Utforska koncept",
        tag: "Fas 3",
        acts: {
          res: [
            a(
              "Sammanställ underlag inför idéarbetet",
              "Be AI plocka ut behov, begränsningar och öppna frågor ur insiktsbasen och kravspecen för de problemområden ni arbetar med. Kontrollera att varje punkt har en källa. Dela sammanställningen med designerna innan konceptarbetet börjar.",
              "Inför konceptsprinten får designerna en sida med 12 behov, fem krav som inte går att ändra och tre öppna frågor.",
            ),
            a(
              "Skriv screener och testmanus",
              "Ge AI forskningsfrågorna, målgruppen och koncepten och be om en screener, ett testmanus och realistiska uppgifter. Läs kritiskt efter ledande frågor och uppgifter som avslöjar svaret. Pilottesta manuset en gång.",
              "AI skriver en screener och ett manus på 45 minuter för att testa två koncept. Researchern skriver om tre ledande frågor före piloten.",
            ),
            a(
              "Planera testet för snabb analys",
              "Bestäm före testet hur materialet ska analyseras: uppgifter, vad som räknas som lyckat och en mall för anteckningar med samma taggar som insiktsbasen. Då kan AI sortera materialet direkt efter testerna i stället för att ni börjar från noll.",
              "Med en färdig mall per uppgift kan AI fylla i fyndtabellen samma dag som sista testet.",
            ),
          ],
          design: [
            a(
              "Ta fram konceptidéer från kravspecen",
              "Ge AI kravspecen, problemområdena och briefen och be om många olika konceptriktningar i text: grundidé, flöde, vilket behov den möter och vilka krav den uppfyller. Välj de starkaste riktningarna och skissa dem själv i Figma. Låt inte det första förslaget styra.",
              "AI beskriver tio riktningar för att visa totalkostnad. Designern och PO väljer tre att skissa vidare på samma dag.",
            ),
            a(
              "Bygg snabba kodskisser av flöden",
              "Figma Make är avstängt, så använd en AI-assistent som organisationen godkänt för att ta fram enkla klickbara skisser i HTML från en beskrivning av flödet. De duger för att pröva flödet och ordningen, inte utseendet. Använd aldrig riktig kunddata.",
              "På en timme prövar designern tre ordningar för kassaflödet som klickbara skisser och ser vilken som håller innan något ritas i Figma.",
            ),
            a(
              "Granska koncepten mot kraven",
              "Be AI gå igenom varje koncept mot kravspecen och insiktsbasen: vilka krav som uppfylls, vilka som missas och vilka delar som saknar stöd i insikterna. Kontrollera resultatet och ta med det när ni väljer koncept att testa.",
              "Ett koncept missar ett juridiskt krav på hur avgifter ska visas och tas bort innan testet.",
            ),
          ],
        },
      },
      {
        name: "Validera koncept",
        tag: "Fas 4",
        acts: {
          res: [
            a(
              "Transkribera testerna automatiskt",
              "Spela in testerna med samtycke och låt ett godkänt verktyg transkribera dem. Kontrollera namn och fackord stickprovsvis, och ta bort personuppgifter innan materialet går vidare till analys med AI.",
              "Åtta tester på 45 minuter är transkriberade samma dag, i stället för efter två dagar.",
            ),
            a(
              "Sammanställ fynd per uppgift",
              "Låt AI skissa en sammanfattning per deltagare och per uppgift: lyckades eller inte, problem och citat. Titta själv på nyckelögonblicken, eftersom AI missar tonfall och kroppsspråk. Samla allt i fynd med allvarlighetsgrad.",
              "Efter åtta tester har AI en fyndtabell per uppgift klar inom en timme. Researchern tittar på klippen bakom varje problem och sätter allvarlighetsgrad.",
            ),
            a(
              "Gå från fynd till beslut",
              "Be AI göra en beslutslista av fynden: fynd, allvarlighetsgrad, rekommendation och vem som äger frågan. Gå igenom den på ett kort möte samma vecka och lägg in fynden i insiktsbasen.",
              "Två dagar efter sista testet har teamet beslutat om sju ändringar, och fynden finns i insiktsbasen.",
            ),
          ],
          design: [
            a(
              "Gå igenom AI-sammanställningen ihop",
              "Vänta inte på rapporten. Gå igenom AI:s sammanställning tillsammans med researchern dagen efter testerna, titta på klippen bakom de största problemen och kom överens om vad som ska ändras.",
              "På en timme dagen efter testerna enas designer och researcher om de fem viktigaste ändringarna.",
            ),
            a(
              "Omsätt fynd till designändringar",
              "Ge AI fyndtabellen och skärmarna och be om förslag på lösningar per problem. Bestäm själv vilka ändringar som görs, och testa de mest riskfyllda igen.",
              "Testet visar att användarna missar avgiftsspecifikationen. Designern prövar tre av AI:s förslag och testar det bästa igen med fem användare.",
            ),
            a(
              "Få AI-kritik på designen",
              "Dela skärmar med AI och be om kritik mot målen, heuristiker och tillgänglighet. Se det som en röst bland flera, inte som domen.",
              "AI påpekar att kostnadssammanfattningen konkurrerar med huvudknappen, så designern tonar ner den.",
            ),
          ],
        },
      },
    ],
  },
  {
    name: "Lösningen",
    goal: "Ta fram validerade high-fidelity-lösningar baserade på designsystemet, enligt WCAG, som är redo för utveckling och implementering. Skala och förvalta designsystemet effektivt med begränsade resurser.",
    subs: [
      {
        name: "Designa och utveckla lösningar",
        tag: "Fas 5",
        acts: {
          res: [
            a(
              "Svara på frågor ur insiktsbasen",
              "Låt teamet ställa frågor till insiktsbasen med AI-sök och få svar med länk till källan. När basen inte har svaret, notera luckan och planera en snabb studie.",
              "En utvecklare undrar om användarna förstår ordet \"uppläggningsavgift\". Sökningen hittar två studier med citat som visar att de inte gör det, och texten ändras.",
            ),
            a(
              "Kör snabba tester på detaljer",
              "Använd korta omodererade tester för små frågor som dyker upp under bygget. Låt AI hjälpa till att planera dem och sammanfatta svaren.",
              "Fem snabba tester av två knapptexter på en dag avgör en diskussion i teamet.",
            ),
            a(
              "Planera valideringen av lösningen",
              "Be AI skissa en testplan för den färdiga lösningen: vad som ska valideras, uppgifter, deltagare och hur ni vet att lösningen är godkänd. Ta med användare av hjälpmedel. Stäm av planen med designern innan bygget är klart.",
              "Testplanen är klar en vecka innan lösningen är byggd, med två deltagare som använder skärmläsare.",
            ),
          ],
          design: [
            a(
              "Kontrollera mot designsystemet",
              "Låt AI gå igenom designen och hitta element som inte använder designsystemets komponenter och tokens, och föreslå rätt komponent. Granska förslagen. Det som saknas i systemet går till designsystemets backlogg i stället för att lösas lokalt.",
              "AI hittar sex lokala varianter av en knapp och två färger utanför paletten. Fem byts mot systemets komponenter, en blir ett förslag till designsystemet.",
            ),
            a(
              "Skriv UI-texter i rätt ton",
              "Använd AI för att skissa etiketter, felmeddelanden och hjälptexter i er tonalitet och på klarspråk. Granska alla texter själv och testa de viktigaste med användare.",
              "AI skissar felmeddelanden för 12 betalningslägen. Designern redigerar dem och de går in i specen.",
            ),
            a(
              "Skriv specar och annoteringar",
              "Låt AI skissa annoteringar för tillstånd, beteende och tillgänglighet utifrån designen: fokusordning, rubriknivåer och texter för skärmläsare. Gå igenom dem med utvecklarna, så att lösningen är redo för utveckling.",
              "AI annoterar 12 tillstånd med fokusordning och skärmläsartexter. Utvecklarna ställer bara två frågor vid överlämningen.",
            ),
          ],
        },
      },
      {
        name: "Validera lösningar",
        tag: "Fas 6",
        acts: {
          res: [
            a(
              "Testa med användare av hjälpmedel",
              "Låt AI hjälpa till med rekryteringskriterier, uppgifter och manus för tester med användare av skärmläsare, förstoring eller tangentbord. AI kan inte ersätta de här testerna, men gör dem snabbare att planera och analysera.",
              "Två tester med skärmläsaranvändare visar att avgiftsspecifikationen inte läses upp när den öppnas.",
            ),
            a(
              "Analysera valideringstesterna",
              "Använd samma flöde som i Fas 4: automatisk transkribering, AI:s sammanställning per uppgift och egen granskning av nyckelögonblicken. Jämför med kriterierna i testplanen så att det blir tydligt vad som är godkänt.",
              "Sju av åtta uppgifter klarar kriterierna. Den åttonde går tillbaka till designern med två klipp.",
            ),
            a(
              "Skriv en kort valideringsrapport",
              "Be AI skissa en rapport på en sida: vad som testades, vad som är godkänt, vad som återstår och beläggen. Granska och dela den med teamet och lägg in fynden i insiktsbasen.",
              "Rapporten blir underlaget när PO beslutar att lösningen kan lanseras.",
            ),
          ],
          design: [
            a(
              "Granska designen mot WCAG",
              "Be AI granska skärmarna mot WCAG 2.2 nivå AA: kontrast, textstorlek, fokusordning, etiketter och felmeddelanden. Mät kontrasten exakt med ett verktyg och testa själv med tangentbord och skärmläsare, eftersom AI missar saker.",
              "AI hittar elva möjliga brister. Designern bekräftar sju, bland annat för låg kontrast på inaktiva knappar.",
            ),
            a(
              "Rätta fynden innan överlämning",
              "Be AI föreslå lösningar för fynden från tester och WCAG-granskning. Bestäm själv vad som ändras. Är problemet en komponent, rätta det i designsystemet så att alla team får rättelsen.",
              "Fokusmarkeringen på en flik rättas i designsystemet i stället för i en enda vy.",
            ),
            a(
              "Jämför byggt mot design",
              "Ta skärmdumpar av den byggda lösningen och be AI jämföra dem med designen: avstånd, texter, tillstånd och komponenter. Gå igenom avvikelserna med utvecklarna innan lanseringen.",
              "AI hittar fem avvikelser. Tre rättas direkt, två var medvetna val som dokumenteras.",
            ),
          ],
        },
      },
      {
        name: "Leverera och förfina lösningar",
        tag: "Fas 7",
        acts: {
          res: [
            a(
              "Tematisera feedback efter lansering",
              "Samla feedback från enkäter, support och recensioner och låt AI tematisera den varje vecka. Läs kommentarerna bakom de största temana och lägg in det som håller i insiktsbasen.",
              "Två veckor efter lanseringen tematiserar AI 400 kommentarer. Ett tema om månadsavgifter blir ett nytt problemområde.",
            ),
            a(
              "Mät effekten efter lansering",
              "Använd AI för att skriva en kort enkät i produkten och analysera svaren. Jämför med läget före lanseringen och uppdatera problemområdet i insiktsbasen.",
              "En enkät med två frågor visar att nöjdheten med prisinformationen gick från 3,1 till 4,0.",
            ),
            a(
              "Fråga teamen om designsystemet",
              "Gör en kort enkät eller några samtal med designers och utvecklare som använder designsystemet. Låt AI tematisera svaren i behov och problem, och ge resultatet till de som förvaltar systemet.",
              "Svaren visar att teamen saknar ett mönster för tomma tillstånd. Det hamnar högst i designsystemets backlogg.",
            ),
          ],
          design: [
            a(
              "Dokumentera komponenter med AI",
              "Ge AI komponenten, dess varianter och exempel på användning och be om ett utkast till riktlinjer: när den ska användas, gör och gör inte, och tillgänglighet. Den som förvaltar systemet granskar innan det publiceras.",
              "Dokumentationen för en ny kostnadssammanfattning är klar på en timme i stället för en dag.",
            ),
            a(
              "Hitta avvikelser och dubbletter",
              "Låt AI gå igenom skärmdumpar eller filer från teamen och hitta egna komponenter och nästan likadana varianter. Prioritera vilka som ska in i designsystemet och vilka som ska bytas ut.",
              "AI hittar fyra varianter av samma informationsruta i tre team. De blir en komponent i systemet.",
            ),
            a(
              "AI-stöd för frågor om designsystemet",
              "Ge en AI-assistent tillgång till designsystemets dokumentation så att teamen kan få svar med länk till rätt sida. Gå igenom frågor som den inte kunde svara på varje månad, de visar var dokumentationen saknas.",
              "Assistenten svarar på de flesta frågor om avstånd och färger. Obesvarade frågor om formulär leder till en ny sida i dokumentationen.",
            ),
          ],
        },
      },
    ],
  },
];

// The order to start in, through the whole process: step 1 is easy or the
// ground the rest stands on, step 2 builds on step 1, step 3 needs a living
// insight base, routines or documentation. `after` names what each activity
// builds on: always an earlier step, or the same step earlier in the process.
export const ROADMAP: Record<string, { step: StepId; after?: string[] }> = {
  // Fas 1
  "Bygg en gemensam insiktsbas": { step: 1 },
  "Granska dagens gränssnitt": { step: 1 },
  "Koda och tematisera intervjuer": { step: 2, after: ["Bygg en gemensam insiktsbas"] },
  "Skissa kundresor från insiktsbasen": { step: 2, after: ["Bygg en gemensam insiktsbas"] },
  "Väv ihop kvalitativ och kvantitativ data": { step: 3, after: ["Koda och tematisera intervjuer"] },
  "Skissa en tjänsteblueprint": { step: 3, after: ["Skissa kundresor från insiktsbasen"] },
  // Fas 2
  "Formulera problemområden": { step: 1, after: ["Bygg en gemensam insiktsbas"] },
  "Skriv Hur kan vi-frågor": { step: 1, after: ["Formulera problemområden"] },
  "Bedöm underlaget per problemområde": { step: 2, after: ["Formulera problemområden"] },
  "Prioritera problemområden med teamet": { step: 2, after: ["Bedöm underlaget per problemområde"] },
  "Håll insiktsbasen uppdaterad": { step: 3, after: ["Koda och tematisera intervjuer", "Formulera problemområden"] },
  "Skriv en designbrief per problemområde": { step: 3, after: ["Prioritera problemområden med teamet"] },
  // Fas 3
  "Skriv screener och testmanus": { step: 1 },
  "Planera testet för snabb analys": { step: 1, after: ["Skriv screener och testmanus"] },
  "Ta fram konceptidéer från kravspecen": { step: 1, after: ["Formulera problemområden"] },
  "Sammanställ underlag inför idéarbetet": { step: 2, after: ["Bygg en gemensam insiktsbas", "Prioritera problemområden med teamet"] },
  "Granska koncepten mot kraven": { step: 2, after: ["Ta fram konceptidéer från kravspecen"] },
  "Bygg snabba kodskisser av flöden": { step: 3, after: ["Ta fram konceptidéer från kravspecen"] },
  // Fas 4
  "Transkribera testerna automatiskt": { step: 1 },
  "Få AI-kritik på designen": { step: 1 },
  "Sammanställ fynd per uppgift": { step: 2, after: ["Transkribera testerna automatiskt", "Planera testet för snabb analys"] },
  "Gå från fynd till beslut": { step: 2, after: ["Sammanställ fynd per uppgift"] },
  "Gå igenom AI-sammanställningen ihop": { step: 2, after: ["Sammanställ fynd per uppgift"] },
  "Omsätt fynd till designändringar": { step: 3, after: ["Gå igenom AI-sammanställningen ihop"] },
  // Fas 5
  "Planera valideringen av lösningen": { step: 1 },
  "Skriv UI-texter i rätt ton": { step: 1 },
  "Kör snabba tester på detaljer": { step: 2, after: ["Planera testet för snabb analys"] },
  "Kontrollera mot designsystemet": { step: 2 },
  "Skriv specar och annoteringar": { step: 2, after: ["Kontrollera mot designsystemet"] },
  "Svara på frågor ur insiktsbasen": { step: 3, after: ["Håll insiktsbasen uppdaterad"] },
  // Fas 6
  "Granska designen mot WCAG": { step: 1 },
  "Testa med användare av hjälpmedel": { step: 2, after: ["Planera valideringen av lösningen"] },
  "Analysera valideringstesterna": { step: 2, after: ["Sammanställ fynd per uppgift", "Planera valideringen av lösningen"] },
  "Skriv en kort valideringsrapport": { step: 2, after: ["Analysera valideringstesterna"] },
  "Rätta fynden innan överlämning": { step: 2, after: ["Granska designen mot WCAG", "Analysera valideringstesterna"] },
  "Jämför byggt mot design": { step: 3, after: ["Kontrollera mot designsystemet"] },
  // Fas 7
  "Tematisera feedback efter lansering": { step: 1, after: ["Bygg en gemensam insiktsbas"] },
  "Fråga teamen om designsystemet": { step: 1 },
  "Dokumentera komponenter med AI": { step: 1 },
  "Mät effekten efter lansering": { step: 2, after: ["Formulera problemområden"] },
  "Hitta avvikelser och dubbletter": { step: 2, after: ["Kontrollera mot designsystemet"] },
  "AI-stöd för frågor om designsystemet": { step: 3, after: ["Dokumentera komponenter med AI"] },
};

// Each activity with its step and what it builds on, in step order within its list.
const PHASES: Phase<DrRole>[] = RAW.map((p) => ({
  ...p,
  subs: p.subs.map((s) => ({
    ...s,
    acts: Object.fromEntries(
      Object.entries(s.acts).map(([role, acts]) => [
        role,
        acts.map((act) => ({ ...act, ...ROADMAP[act.title] })).sort((x, y) => (x.step ?? 0) - (y.step ?? 0)),
      ]),
    ) as Record<DrRole, Activity[]>,
  })),
}));

const PROCESS: GuideProcess = {
  groups: [
    { name: "Discovery", sub: "Förstå problemet", phases: 2 },
    { name: "Delivery", sub: "Skapa lösning", phases: 1 },
  ],
  milestones: ["Problem eller möjlighet", "Problemdefinition", "Förslag på lösning", "Effekt"],
  stepsTitle: "Tre steg genom processen",
  steps: [
    { id: 1, name: "Kom igång", description: "Enkla aktiviteter med material ni redan har, och grunden som resten bygger på. Börja här i varje fas." },
    { id: 2, name: "Bygg vidare", description: "Bygger på steg 1: insiktsbasen, testmallen och granskningen mot designsystemet. Kräver lite mer vana och uppsättning." },
    { id: 3, name: "Skala upp", description: "Kräver att grunden finns: en levande insiktsbas, rutiner och dokumentation. Störst effekt, men mest att sätta upp." },
  ],
  step: "Steg",
  after: "Bygger på",
  sizesLabel: "Uppdragsstorlek",
  sizes: [
    { name: "Small", from: 2, to: 3, range: "Fas 3 och 4" },
    { name: "Medium", from: 2, to: 6, range: "Fas 3 till 7" },
    { name: "Large", from: 0, to: 6, range: "Fas 1 till 7" },
  ],
};

const COPY: GuideCopy = {
  lead: "",
  goal: "Mål",
  roles: "Roller",
  showAll: "Visa alla roller",
  clear: "Rensa",
  showing: "Visar {shown} av {total} aktiviteter",
  levels: "Nivåer",
  level: "Nivå",
  noRoles: "Inga roller valda. Slå på en eller flera roller ovan för att se deras aktiviteter.",
  noMatch: "Inga aktiviteter matchar valda roller och nivåer. Slå på fler nivåer ovan.",
  footnote:
    "Aktiviteterna är exempel att starta samtalet med. Välj en för att läsa hur ni kan arbeta med den och se ett exempel. Anpassa dem efter hur teamen arbetar och vad era riktlinjer tillåter. Stegen är ett förslag på ordning utifrån svårighet och beroenden. Figma Make är avstängt i organisationen, så ingen aktivitet bygger på det.",
  close: "Stäng",
  how: "Så arbetar ni med den",
  example: "Exempel",
};

export const TD_DR_GUIDE: Guide = {
  lang: "sv",
  process: PROCESS,
  roles: ROLES,
  // No levels on this page: the steps already say where to start.
  levels: [],
  phases: PHASES,
  copy: COPY,
};
