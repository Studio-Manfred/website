// Synthetic data for the Customer Journey Intelligence case. Moved from the
// stand-alone demo (customer-journey-demo/index.html); nothing here is real
// customer data. Content is Swedish.
import type { Industry, IndustryId } from "./types";

export const INDUSTRIES: Record<IndustryId, Industry> = {
  "finance": {
    "id": "finance",
    "name": "Storbank",
    "industry": "Finance · Retail Banking",
    "emoji": "🏦",
    "description": "Digital bankupplevelse för privatkunder — konto, kort, lån och sparande.",
    "stats": {
      "customers": "8 200",
      "nps": "34",
      "retention": "91%",
      "interviews": "120",
      "appstore": "3.8"
    },
    "phases": [
      {
        "name": "Bankbehov",
        "sub": "Privatliv & event"
      },
      {
        "name": "Jämförelse",
        "sub": "Söker alternativ"
      },
      {
        "name": "Öppna konto",
        "sub": "Bli kund"
      },
      {
        "name": "Aktivering",
        "sub": "Kort, Swish, BankID"
      },
      {
        "name": "Vardagsbank",
        "sub": "Löpande användning"
      },
      {
        "name": "Byte av bank",
        "sub": "Risk & exit"
      }
    ],
    "emotionCards": [
      {
        "emotion": "Frustrerad på nuvarande bank",
        "sentiment": "neg",
        "quote": "\"Sick of hidden fees and 1-hour queues.\"",
        "moment": "Switchingbeslutet"
      },
      {
        "emotion": "Hoppfull men skeptisk",
        "sentiment": "mixed",
        "quote": "\"De lovar allt men jag tror dem inte riktigt.\"",
        "moment": "Banken väljs"
      },
      {
        "emotion": "Irriterad på pappersarbete",
        "sentiment": "mixed",
        "quote": "\"KYC-formulären tog 3 dagar — varför kan de inte se mitt BankID?\"",
        "moment": "Konto öppnat"
      },
      {
        "emotion": "Lättad men inte imponerad",
        "sentiment": "mixed",
        "quote": "\"OK, kortet funkar i alla fall.\"",
        "moment": "Första transaktion"
      },
      {
        "emotion": "Neutral — banken är osynlig",
        "sentiment": "mixed",
        "quote": "\"Jag märker knappt att jag har den. Bra eller dåligt?\"",
        "moment": "Månadslön in"
      },
      {
        "emotion": "Besviken, byter till neobank",
        "sentiment": "neg",
        "quote": "\"Revolut ger mig det jag ville ha från dem från dag ett.\"",
        "moment": "Portabilitetsbeslut"
      }
    ],
    "segments": [
      {
        "id": "alla",
        "label": "Alla kunder"
      },
      {
        "id": "premium",
        "label": "Private / Premium"
      },
      {
        "id": "ung",
        "label": "Unga (<30 år)"
      },
      {
        "id": "lojal",
        "label": "Lojal 5+ år"
      },
      {
        "id": "risk",
        "label": "Hög churn-risk"
      }
    ],
    "metrics": {
      "alla": {
        "curve": [
          38,
          42,
          46,
          58,
          50,
          28
        ],
        "nps": "34",
        "csat": "3.6",
        "ob": "3.4",
        "ret": "91%",
        "churn": "9%",
        "sess": "14.2",
        "dep": "88%",
        "app": "3.8",
        "sup": "3.4",
        "aum": "245k",
        "rev": "1 840",
        "adopt": "4.1",
        "scost": "92"
      },
      "premium": {
        "curve": [
          42,
          48,
          52,
          65,
          58,
          30
        ],
        "nps": "48",
        "csat": "4.1",
        "ob": "3.8",
        "ret": "95%",
        "churn": "5%",
        "sess": "11.8",
        "dep": "96%",
        "app": "4.0",
        "sup": "3.9",
        "aum": "820k",
        "rev": "6 200",
        "adopt": "5.8",
        "scost": "65"
      },
      "ung": {
        "curve": [
          35,
          48,
          44,
          62,
          54,
          22
        ],
        "nps": "28",
        "csat": "3.3",
        "ob": "3.2",
        "ret": "82%",
        "churn": "18%",
        "sess": "19.4",
        "dep": "76%",
        "app": "4.2",
        "sup": "3.1",
        "aum": "42k",
        "rev": "380",
        "adopt": "3.8",
        "scost": "124"
      },
      "lojal": {
        "curve": [
          42,
          44,
          50,
          60,
          58,
          32
        ],
        "nps": "52",
        "csat": "4.0",
        "ob": "–",
        "ret": "97%",
        "churn": "3%",
        "sess": "9.2",
        "dep": "98%",
        "app": "3.7",
        "sup": "4.1",
        "aum": "580k",
        "rev": "4 100",
        "adopt": "6.2",
        "scost": "48"
      },
      "risk": {
        "curve": [
          28,
          36,
          38,
          48,
          30,
          20
        ],
        "nps": "12",
        "csat": "2.8",
        "ob": "–",
        "ret": "68%",
        "churn": "32%",
        "sess": "3.8",
        "dep": "62%",
        "app": "2.9",
        "sup": "2.8",
        "aum": "88k",
        "rev": "640",
        "adopt": "2.4",
        "scost": "198"
      }
    },
    "personas": [
      {
        "id": "bekvamlighetsbanker",
        "name": "Bekvämlighetsbankar",
        "emoji": "📱",
        "color": 0,
        "share": 42,
        "tagline": "Banken ska vara osynlig och funka",
        "desc": "Vill att banken ska synas så lite som möjligt. Hanterar allt i appen.",
        "tags": [
          "Swish",
          "Mobil BankID",
          "Autogiro"
        ],
        "nps": "44",
        "csat": "3.8",
        "churn": "7%",
        "sess": "16.2",
        "expect": [
          0,
          -5,
          -8,
          -5,
          0,
          -8
        ],
        "deliver": [
          -2,
          2,
          4,
          6,
          5,
          -3
        ],
        "moments": [
          {
            "phase": 3,
            "insight": "\"Swish och BankID — resten spelar ingen roll.\""
          },
          {
            "phase": 4,
            "insight": "Märker knappt att de har banken. Det är bra."
          },
          {
            "phase": 5,
            "insight": "\"Revolut var enklare på dag ett.\""
          }
        ],
        "friction": [
          "Lång KYC-process",
          "Ingen 24/7 chat-support"
        ],
        "opportunity": "Friktionsfri digital onboarding. App-first."
      },
      {
        "id": "planeringsentusiasten",
        "name": "Planeraren",
        "emoji": "📊",
        "color": 1,
        "share": 18,
        "tagline": "Vill ha koll på varje krona",
        "desc": "Använder bankens budgetverktyg aktivt. Jämför räntor och sparformer.",
        "tags": [
          "Budgetverktyg",
          "Sparplaner",
          "Låneräknare"
        ],
        "nps": "52",
        "csat": "4.0",
        "churn": "8%",
        "sess": "22.4",
        "expect": [
          10,
          15,
          12,
          10,
          18,
          8
        ],
        "deliver": [
          -8,
          -5,
          -10,
          -6,
          -14,
          -5
        ],
        "moments": [
          {
            "phase": 1,
            "insight": "\"Deras ränteerbjudande var bäst. Jag räknade.\""
          },
          {
            "phase": 4,
            "insight": "Budgetappen är okej men saknar kategorisering."
          },
          {
            "phase": 4,
            "insight": "\"Klarna hade bättre insikter. Det stör mig.\""
          }
        ],
        "friction": [
          "Budgetverktyget är undermåligt",
          "Ingen automatisk kategorisering"
        ],
        "opportunity": "Finansinsikter + AI-driven budgetcoach."
      },
      {
        "id": "trygghetsokaren",
        "name": "Trygghetssökaren",
        "emoji": "🛡️",
        "color": 2,
        "share": 25,
        "tagline": "Väljer stabilitet och trygghet",
        "desc": "Har haft samma bank i 20 år. Ringer hellre än att använda appen.",
        "tags": [
          "Föredrar telefon",
          "Lång lojalitet",
          "Sparar traditionellt"
        ],
        "nps": "58",
        "csat": "4.2",
        "churn": "4%",
        "sess": "6.8",
        "expect": [
          0,
          -5,
          -5,
          -5,
          0,
          -5
        ],
        "deliver": [
          5,
          2,
          4,
          6,
          8,
          -2
        ],
        "moments": [
          {
            "phase": 0,
            "insight": "\"Jag byter inte bank. Har haft dem sedan 1998.\""
          },
          {
            "phase": 3,
            "insight": "Det tar tid men jag förstår varför de kontrollerar."
          },
          {
            "phase": 4,
            "insight": "\"Rådgivaren kände igen mig direkt.\""
          }
        ],
        "friction": [
          "Digitala tjänster för komplexa",
          "App kräver för mycket"
        ],
        "opportunity": "Hybridmodell: digital + mänsklig rådgivning."
      },
      {
        "id": "neobank_hoppar",
        "name": "Neobank-hopparen",
        "emoji": "🔄",
        "color": 3,
        "share": 15,
        "tagline": "Alltid redo att byta till bättre",
        "desc": "Har 3–4 appar parallellt. Byter snabbt om ett erbjudande är bättre.",
        "tags": [
          "Revolut",
          "Klarna",
          "Jämförelsesajter"
        ],
        "nps": "18",
        "csat": "2.9",
        "churn": "34%",
        "sess": "8.2",
        "expect": [
          20,
          25,
          22,
          20,
          25,
          15
        ],
        "deliver": [
          -15,
          -12,
          -18,
          -14,
          -20,
          -10
        ],
        "moments": [
          {
            "phase": 1,
            "insight": "\"De hade 0% i utlandsavgift. Klart jag testade.\""
          },
          {
            "phase": 4,
            "insight": "\"Appen är sämre än Revolut. Redan besviken.\""
          },
          {
            "phase": 5,
            "insight": "\"Tog 10 minuter att avsluta. Hade kunnat vara 1.\""
          }
        ],
        "friction": [
          "Onboarding för långsam",
          "Räntor inte konkurrenskraftiga"
        ],
        "opportunity": "Instant onboarding. Transparenta erbjudanden."
      }
    ],
    "touchpoints": [
      [
        {
          "name": "Google/jämförelsesajter",
          "sat": "–",
          "note": "Extern research"
        },
        {
          "name": "Vänner & familj",
          "sat": "–",
          "note": "Rekommendation"
        },
        {
          "name": "Bankens landningssida",
          "sat": "3.8",
          "note": "42% bounce rate ⚠️"
        }
      ],
      [
        {
          "name": "Räntejämförelse sida",
          "sat": "3.6",
          "note": "Primär beslutspunkt"
        },
        {
          "name": "App Store-sida",
          "sat": "3.8",
          "note": "Förhandsgranskning"
        },
        {
          "name": "Kundrecensioner",
          "sat": "–",
          "note": "Trustpilot m.fl."
        }
      ],
      [
        {
          "name": "KYC-process",
          "sat": "2.9",
          "note": "Tar 3–5 dgr ⚠️"
        },
        {
          "name": "BankID-verifiering",
          "sat": "4.1",
          "note": "Snabbaste steget"
        },
        {
          "name": "Kortbeställning",
          "sat": "3.4",
          "note": "7–10 dgr väntan"
        },
        {
          "name": "Swish-koppling",
          "sat": "4.0",
          "note": "Viktigaste steget"
        }
      ],
      [
        {
          "name": "Aktivera kort",
          "sat": "3.8",
          "note": "68% gör dag 1"
        },
        {
          "name": "Koppla Swish",
          "sat": "4.2",
          "note": "82% dag 1"
        },
        {
          "name": "BankID-setup",
          "sat": "4.4",
          "note": "Smidigaste momentet"
        },
        {
          "name": "Autogiroprofil",
          "sat": "3.6",
          "note": "54% dag 7"
        }
      ],
      [
        {
          "name": "Visa saldo / transaktioner",
          "sat": "4.0",
          "note": "22 sess/mån"
        },
        {
          "name": "Swisha",
          "sat": "4.5",
          "note": "Daglig användning"
        },
        {
          "name": "Budgetverktyg",
          "sat": "3.1",
          "note": "Underskattat ⚠️"
        },
        {
          "name": "Kontakta support",
          "sat": "3.0",
          "note": "38 min väntetid ⚠️"
        },
        {
          "name": "Ränteerbjudanden",
          "sat": "3.4",
          "note": "Sällan proaktivt"
        }
      ],
      [
        {
          "name": "Jämför konkurrent",
          "sat": "–",
          "note": "Trigger: bättre ränta"
        },
        {
          "name": "Portabilitetsprocess",
          "sat": "2.8",
          "note": "3 dgr + blankett ⚠️"
        },
        {
          "name": "Exit-enkät",
          "sat": "–",
          "note": "22% svarar"
        },
        {
          "name": "Behåll-erbjudande",
          "sat": "3.2",
          "note": "Reaktivt, inte proaktivt"
        }
      ]
    ],
    "expect": [
      45,
      52,
      55,
      65,
      55,
      30
    ],
    "delivery": {
      "alla": [
        38,
        42,
        46,
        58,
        50,
        28
      ],
      "premium": [
        42,
        48,
        52,
        65,
        58,
        30
      ],
      "ung": [
        35,
        48,
        44,
        62,
        54,
        22
      ],
      "lojal": [
        42,
        44,
        50,
        60,
        58,
        32
      ],
      "risk": [
        28,
        36,
        38,
        48,
        30,
        20
      ]
    },
    "opportunities": [
      {
        "phase": 1,
        "pos": 0.5,
        "name": "Bankens landningssida",
        "gap": -14,
        "type": "crit",
        "effort": 2,
        "reward": 4,
        "desc": "42% bounce rate. Landningssidan konverterar inte jämförande kunder."
      },
      {
        "phase": 2,
        "pos": 0.3,
        "name": "Räntejämförelse sida",
        "gap": -16,
        "type": "crit",
        "effort": 2,
        "reward": 4,
        "desc": "Kunder hittar bättre räntor hos konkurrenter. Proaktiv jämförelsevy behövs."
      },
      {
        "phase": 2,
        "pos": 0.7,
        "name": "App Store-sida",
        "gap": -10,
        "type": "watch",
        "effort": 1,
        "reward": 2,
        "desc": "3.8 i snitt. Negativa recensioner om KYC dominerar."
      },
      {
        "phase": 3,
        "pos": 0.3,
        "name": "KYC-process",
        "gap": -26,
        "type": "crit",
        "effort": 3,
        "reward": 5,
        "desc": "3–5 dagars väntan. Störst negativt gap. Digital KYC via BankID är lösningen."
      },
      {
        "phase": 3,
        "pos": 0.7,
        "name": "Kortbeställning",
        "gap": -18,
        "type": "crit",
        "effort": 3,
        "reward": 4,
        "desc": "7–10 dagar är oacceptabelt. Digitalt kort dag 1 + fysiskt dag 3."
      },
      {
        "phase": 4,
        "pos": 0.5,
        "name": "Koppla Swish",
        "gap": 8,
        "type": "quick",
        "effort": 1,
        "reward": 3,
        "desc": "Swish-kopplingen överpresterar. Tydlig prioritet i aktiveringsflödet."
      },
      {
        "phase": 4,
        "pos": 0.7,
        "name": "Budgetverktyg",
        "gap": -20,
        "type": "crit",
        "effort": 3,
        "reward": 5,
        "desc": "3.1 i nöjdhet. Konkurrenter (Klarna, Revolut) har bättre insikter."
      },
      {
        "phase": 4,
        "pos": 0.9,
        "name": "Support (38 min väntan)",
        "gap": -24,
        "type": "crit",
        "effort": 3,
        "reward": 4,
        "desc": "38 minuters väntetid är branschens svagaste punkt. AI-chatt löser 60%."
      },
      {
        "phase": 5,
        "pos": 0.4,
        "name": "Portabilitetsprocess",
        "gap": -22,
        "type": "crit",
        "effort": 3,
        "reward": 3,
        "desc": "3 dagar + blankett för att byta. Instant portabilitet är hygien 2026."
      }
    ]
  },
  "insurance": {
    "id": "insurance",
    "name": "Försäkring",
    "industry": "Insurance · P&C",
    "emoji": "🛡️",
    "description": "Sakförsäkring för privatkunder — hem, bil, resa och hälsa.",
    "stats": {
      "customers": "12 400",
      "nps": "28",
      "retention": "78%",
      "interviews": "95",
      "appstore": "3.5"
    },
    "phases": [
      {
        "name": "Försäkringsbehov",
        "sub": "Livshändelse"
      },
      {
        "name": "Research",
        "sub": "Jämför & väljer"
      },
      {
        "name": "Teckna försäkring",
        "sub": "Bli kund"
      },
      {
        "name": "Aktivering",
        "sub": "Bekräftelse & app"
      },
      {
        "name": "Skadeanmälan",
        "sub": "Sanningens moment"
      },
      {
        "name": "Förnyelse / Churn",
        "sub": "Årsförnyelse"
      }
    ],
    "emotionCards": [
      {
        "emotion": "Stressad och osäker",
        "sentiment": "neg",
        "quote": "\"Vad täcker den egentligen? Läste inte det finstilta.\"",
        "moment": "Behov uppstår"
      },
      {
        "emotion": "Överväldigad av alternativ",
        "sentiment": "mixed",
        "quote": "\"Alla ser likadana ut. Hur ska jag veta?\"",
        "moment": "Försäkringen väljs"
      },
      {
        "emotion": "Skeptisk — för enkelt?",
        "sentiment": "mixed",
        "quote": "\"Det gick för snabbt. Är jag verkligen täckt?\"",
        "moment": "Tecknad online"
      },
      {
        "emotion": "Lättad men passiv",
        "sentiment": "mixed",
        "quote": "\"Har appen men öppnar den aldrig. Borde jag det?\"",
        "moment": "Försäkringsbeviset"
      },
      {
        "emotion": "Frustrerad och sårbar",
        "sentiment": "neg",
        "quote": "\"Tre veckor och fyra samtal. Fortfarande inget besked.\"",
        "moment": "Skadeanmälan"
      },
      {
        "emotion": "Priskänslig och trött",
        "sentiment": "neg",
        "quote": "\"Premien höjdes 18%. Ringer Trygg-Hansa imorgon.\"",
        "moment": "Förnyelsebrevet"
      }
    ],
    "segments": [
      {
        "id": "alla",
        "label": "Alla kunder"
      },
      {
        "id": "premium",
        "label": "Premiumpaket"
      },
      {
        "id": "ny",
        "label": "Ny kund <1 år"
      },
      {
        "id": "lojal",
        "label": "Lojal 5+ år"
      },
      {
        "id": "risk",
        "label": "Hög churn-risk"
      }
    ],
    "metrics": {
      "alla": {
        "curve": [
          28,
          38,
          40,
          42,
          22,
          36
        ],
        "nps": "28",
        "csat": "3.2",
        "ob": "3.6",
        "ret": "78%",
        "churn": "22%",
        "sess": "2.1",
        "dep": "–",
        "app": "3.5",
        "sup": "2.9",
        "aum": "–",
        "rev": "4 200",
        "adopt": "2.8",
        "scost": "145"
      },
      "premium": {
        "curve": [
          32,
          42,
          44,
          46,
          28,
          40
        ],
        "nps": "42",
        "csat": "3.8",
        "ob": "3.8",
        "ret": "88%",
        "churn": "12%",
        "sess": "3.4",
        "dep": "–",
        "app": "3.7",
        "sup": "3.6",
        "aum": "–",
        "rev": "8 900",
        "adopt": "3.9",
        "scost": "98"
      },
      "ny": {
        "curve": [
          26,
          40,
          38,
          44,
          20,
          34
        ],
        "nps": "24",
        "csat": "3.1",
        "ob": "3.4",
        "ret": "71%",
        "churn": "29%",
        "sess": "2.8",
        "dep": "–",
        "app": "3.6",
        "sup": "2.8",
        "aum": "–",
        "rev": "2 800",
        "adopt": "2.4",
        "scost": "168"
      },
      "lojal": {
        "curve": [
          30,
          40,
          44,
          48,
          26,
          42
        ],
        "nps": "38",
        "csat": "3.9",
        "ob": "–",
        "ret": "92%",
        "churn": "8%",
        "sess": "1.8",
        "dep": "–",
        "app": "3.4",
        "sup": "3.8",
        "aum": "–",
        "rev": "5 400",
        "adopt": "3.2",
        "scost": "82"
      },
      "risk": {
        "curve": [
          20,
          30,
          32,
          34,
          14,
          24
        ],
        "nps": "8",
        "csat": "2.4",
        "ob": "–",
        "ret": "52%",
        "churn": "48%",
        "sess": "0.8",
        "dep": "–",
        "app": "2.8",
        "sup": "2.1",
        "aum": "–",
        "rev": "3 100",
        "adopt": "1.8",
        "scost": "280"
      }
    },
    "personas": [
      {
        "id": "prisjagaren",
        "name": "Prisjägaren",
        "emoji": "💰",
        "color": 0,
        "share": 38,
        "tagline": "Alltid redo att byta om det är billigare",
        "desc": "Jämför varje år på Compricer. Byter om premien höjs mer än 5%.",
        "tags": [
          "Compricer",
          "Årsvis byte",
          "Prissensitiv"
        ],
        "nps": "14",
        "csat": "2.8",
        "churn": "42%",
        "sess": "1.2",
        "expect": [
          10,
          20,
          15,
          10,
          8,
          15
        ],
        "deliver": [
          -10,
          -8,
          -12,
          -8,
          -12,
          -8
        ],
        "moments": [
          {
            "phase": 1,
            "insight": "\"Compricer visade 800 kr billigare. Självklart.\""
          },
          {
            "phase": 5,
            "insight": "\"Tog 3 veckor att få ersättning. Aldrig igen.\""
          },
          {
            "phase": 5,
            "insight": "\"Premien höjdes. Bytte nästa dag.\""
          }
        ],
        "friction": [
          "Premieökningar utan förklaring",
          "Lång skadehantering"
        ],
        "opportunity": "Prisgaranti + instant skadeersättning."
      },
      {
        "id": "trygghetsmotorn",
        "name": "Trygghetssökaren",
        "emoji": "🏠",
        "color": 1,
        "share": 28,
        "tagline": "Vill sova gott om natten",
        "desc": "Köper det bredaste alternativet. Byter sällan men kräver snabb support vid skada.",
        "tags": [
          "Heltäckande",
          "Värderar tillgänglighet",
          "Lojal"
        ],
        "nps": "46",
        "csat": "3.8",
        "churn": "12%",
        "sess": "2.8",
        "expect": [
          0,
          -5,
          -5,
          5,
          -5,
          5
        ],
        "deliver": [
          2,
          4,
          6,
          8,
          -14,
          4
        ],
        "moments": [
          {
            "phase": 3,
            "insight": "\"Valde dyraste — vill inte chansa.\""
          },
          {
            "phase": 4,
            "insight": "\"Försäkringsbeviset var tydligt. Lugnade mig.\""
          },
          {
            "phase": 4,
            "insight": "\"Skadan tog 4 veckor. Förstörde allt förtroende.\""
          }
        ],
        "friction": [
          "Lång skadehantering förstör lojaliteten",
          "Support inte tillgänglig kvällar"
        ],
        "opportunity": "24/7 support + snabb skadehantering."
      },
      {
        "id": "digitala_nativa",
        "name": "Digitala native",
        "emoji": "📱",
        "color": 2,
        "share": 20,
        "tagline": "Allt ska gå att göra i appen",
        "desc": "Förväntar sig att allt sköts digitalt. Frustreras av papper och långa handläggningstider.",
        "tags": [
          "Inga papper",
          "Snabb onboarding",
          "Push-notiser"
        ],
        "nps": "32",
        "csat": "3.4",
        "churn": "18%",
        "sess": "4.2",
        "expect": [
          15,
          20,
          18,
          15,
          20,
          10
        ],
        "deliver": [
          -12,
          -10,
          -14,
          -8,
          -18,
          -6
        ],
        "moments": [
          {
            "phase": 2,
            "insight": "\"Tecknade på 4 min i appen. Imponerad.\""
          },
          {
            "phase": 3,
            "insight": "\"Skadeanmälan kräver att jag ringer. 2026?!\""
          },
          {
            "phase": 5,
            "insight": "\"Ville förnya i appen men kunde inte.\""
          }
        ],
        "friction": [
          "Skadeanmälan kräver telefonsamtal",
          "Förnyelse inte digital"
        ],
        "opportunity": "Fulldigital skadeprocess + app-förnyelse."
      },
      {
        "id": "familjeplaneraren",
        "name": "Familjeplaneraren",
        "emoji": "👨‍👩‍👧",
        "color": 3,
        "share": 14,
        "tagline": "Vill skydda familjen rätt",
        "desc": "Vill ha ett paket som täcker hela familjen. Värdesätter rådgivning och bundles.",
        "tags": [
          "Kombinationsförsäkring",
          "Barnförsäkring",
          "Rådgivning"
        ],
        "nps": "52",
        "csat": "4.1",
        "churn": "8%",
        "sess": "3.4",
        "expect": [
          5,
          8,
          5,
          10,
          5,
          5
        ],
        "deliver": [
          2,
          4,
          6,
          8,
          -8,
          4
        ],
        "moments": [
          {
            "phase": 0,
            "insight": "\"Fick barn. Bestämde mig för att se över allt.\""
          },
          {
            "phase": 2,
            "insight": "\"Rådgivaren hjälpte mig välja rätt paket.\""
          },
          {
            "phase": 4,
            "insight": "\"Skadan på cykeln tog längre tid än förväntat.\""
          }
        ],
        "friction": [
          "Inget familjpaket tydligt i appen",
          "Rådgivning svår att boka digitalt"
        ],
        "opportunity": "Familjepaket + rådgivningsbokning i app."
      }
    ],
    "touchpoints": [
      [
        {
          "name": "Google 'hemförsäkring'",
          "sat": "–",
          "note": "Extern sök"
        },
        {
          "name": "Jämförelsesajt (Compricer)",
          "sat": "–",
          "note": "Primär kanal"
        },
        {
          "name": "Vänner/arbetsgivare tips",
          "sat": "–",
          "note": "Word of mouth"
        }
      ],
      [
        {
          "name": "Produktsida / villkor",
          "sat": "3.2",
          "note": "Svårläst ⚠️"
        },
        {
          "name": "Räkna ut premie",
          "sat": "3.8",
          "note": "Viktig konvertering"
        },
        {
          "name": "Jämförelse tabell",
          "sat": "3.4",
          "note": "Ofta för komplex"
        }
      ],
      [
        {
          "name": "Online-teckningsflöde",
          "sat": "3.6",
          "note": "Drop-off: 28% ⚠️"
        },
        {
          "name": "BankID-signering",
          "sat": "4.2",
          "note": "Snabbaste steget"
        },
        {
          "name": "Täckningsval",
          "sat": "3.0",
          "note": "Förvirring kring tillägg ⚠️"
        }
      ],
      [
        {
          "name": "Försäkringsbevis (mail)",
          "sat": "3.5",
          "note": "Ofta oläst"
        },
        {
          "name": "App-nedladdning",
          "sat": "3.4",
          "note": "42% laddar ned"
        },
        {
          "name": "Digital försäkringsbok",
          "sat": "3.6",
          "note": "Underskattat"
        }
      ],
      [
        {
          "name": "Skadeanmälan (telefon)",
          "sat": "2.4",
          "note": "38 min väntetid ⚠️"
        },
        {
          "name": "Skadeanmälan (app)",
          "sat": "3.2",
          "note": "Bara 28% använder"
        },
        {
          "name": "Handläggning",
          "sat": "2.6",
          "note": "Median 18 dgr ⚠️"
        },
        {
          "name": "Utbetalning",
          "sat": "3.0",
          "note": "Ofta otydlig timing"
        }
      ],
      [
        {
          "name": "Förnyelsebrev",
          "sat": "2.8",
          "note": "Premieökning ej förklarad ⚠️"
        },
        {
          "name": "Förnya online",
          "sat": "3.2",
          "note": "Bara 54% kan"
        },
        {
          "name": "Behåll-samtal",
          "sat": "3.4",
          "note": "Reaktivt, för sent"
        }
      ]
    ],
    "expect": [
      35,
      42,
      48,
      52,
      30,
      40
    ],
    "delivery": {
      "alla": [
        28,
        38,
        40,
        42,
        22,
        36
      ],
      "premium": [
        32,
        42,
        44,
        46,
        28,
        40
      ],
      "ny": [
        26,
        40,
        38,
        44,
        20,
        34
      ],
      "lojal": [
        30,
        40,
        44,
        48,
        26,
        42
      ],
      "risk": [
        20,
        30,
        32,
        34,
        14,
        24
      ]
    },
    "opportunities": [
      {
        "phase": 1,
        "pos": 0.5,
        "name": "Produktsida / villkor",
        "gap": -18,
        "type": "crit",
        "effort": 3,
        "reward": 4,
        "desc": "Villkoren är oläsbara. Plain language + interaktiv täckningsjämförelse."
      },
      {
        "phase": 2,
        "pos": 0.4,
        "name": "Online-teckningsflöde",
        "gap": -16,
        "type": "crit",
        "effort": 2,
        "reward": 5,
        "desc": "28% drop-off. Förenkla val + spara progress."
      },
      {
        "phase": 2,
        "pos": 0.8,
        "name": "Täckningsval",
        "gap": -20,
        "type": "crit",
        "effort": 2,
        "reward": 4,
        "desc": "Förvirring kring tillägg. Interaktiv guide: 'Vad händer om...'"
      },
      {
        "phase": 3,
        "pos": 0.5,
        "name": "App-nedladdning",
        "gap": -14,
        "type": "watch",
        "effort": 1,
        "reward": 3,
        "desc": "58% laddar aldrig ned appen. Push-notis dag 1 med onboarding-guide."
      },
      {
        "phase": 4,
        "pos": 0.2,
        "name": "Skadeanmälan (telefon)",
        "gap": -28,
        "type": "crit",
        "effort": 3,
        "reward": 5,
        "desc": "38 minuters väntetid. Störst gap i hela resan. App-baserad FNOL löser."
      },
      {
        "phase": 4,
        "pos": 0.5,
        "name": "Handläggningstid (18 dgr)",
        "gap": -24,
        "type": "crit",
        "effort": 3,
        "reward": 5,
        "desc": "Branschens sämsta punkt. Realtids-statusspårning minskar frustration med 40%."
      },
      {
        "phase": 5,
        "pos": 0.3,
        "name": "Förnyelsebrev",
        "gap": -22,
        "type": "crit",
        "effort": 2,
        "reward": 5,
        "desc": "Premieökning utan förklaring triggar 60% av churnen. Proaktiv kommunikation."
      },
      {
        "phase": 5,
        "pos": 0.7,
        "name": "Förnya online",
        "gap": -16,
        "type": "crit",
        "effort": 2,
        "reward": 4,
        "desc": "46% kan inte förnya digitalt. Kräver telefon 2026."
      }
    ]
  },
  "grocery": {
    "id": "grocery",
    "name": "Dagligvaruhandel",
    "industry": "Grocery · Retail",
    "emoji": "🛒",
    "description": "Kundresa i dagligvaruhandeln — butik, app, hemleverans och kundklubb.",
    "stats": {
      "customers": "245 000",
      "nps": "45",
      "retention": "82%",
      "interviews": "140",
      "appstore": "4.1"
    },
    "phases": [
      {
        "name": "Planering",
        "sub": "Inköpslista & recept"
      },
      {
        "name": "Kanalval",
        "sub": "Butik vs online"
      },
      {
        "name": "Handel",
        "sub": "Butik eller leverans"
      },
      {
        "name": "Kassa/Leverans",
        "sub": "Betala & få varan"
      },
      {
        "name": "Lojalitet",
        "sub": "Kundklubb & erbjudanden"
      },
      {
        "name": "Byte av butik",
        "sub": "Tappat kund"
      }
    ],
    "emotionCards": [
      {
        "emotion": "Stressad och planlös",
        "sentiment": "mixed",
        "quote": "\"Vad ska vi äta den här veckan? Ingen aning.\"",
        "moment": "Inköpsbehovet"
      },
      {
        "emotion": "Vanedriven rutinmässighet",
        "sentiment": "mixed",
        "quote": "\"Åker alltid till ICA:n på torget. Vet inte varför.\"",
        "moment": "Kanalen väljs"
      },
      {
        "emotion": "Frustrerad på köer",
        "sentiment": "neg",
        "quote": "\"20 minuter i kö för 8 varor. Aldrig igen på fredagar.\"",
        "moment": "I butiken"
      },
      {
        "emotion": "Lättad eller besviken",
        "sentiment": "mixed",
        "quote": "\"Kassan gick snabbt men tre varor fattades i leveransen.\"",
        "moment": "Kassa / Leverans"
      },
      {
        "emotion": "Ouppmärksam på poäng",
        "sentiment": "mixed",
        "quote": "\"Samlar poäng men vet inte riktigt hur mycket jag har.\"",
        "moment": "Kundklubben"
      },
      {
        "emotion": "Lockad av konkurrentens deal",
        "sentiment": "neg",
        "quote": "\"Coop hade 20% på kött hela veckan. Svårt att motstå.\"",
        "moment": "Byte av butik"
      }
    ],
    "segments": [
      {
        "id": "alla",
        "label": "Alla kunder"
      },
      {
        "id": "premium",
        "label": "Premiummedlem"
      },
      {
        "id": "digital",
        "label": "Onlineshoppers"
      },
      {
        "id": "lojal",
        "label": "Stamkund 3+ år"
      },
      {
        "id": "risk",
        "label": "Hög churn-risk"
      }
    ],
    "metrics": {
      "alla": {
        "curve": [
          52,
          50,
          56,
          48,
          44,
          32
        ],
        "nps": "45",
        "csat": "3.9",
        "ob": "4.0",
        "ret": "82%",
        "churn": "18%",
        "sess": "12.4",
        "dep": "–",
        "app": "4.1",
        "sup": "3.6",
        "aum": "–",
        "rev": "2 840",
        "adopt": "3.8",
        "scost": "28"
      },
      "premium": {
        "curve": [
          56,
          54,
          60,
          54,
          52,
          34
        ],
        "nps": "58",
        "csat": "4.3",
        "ob": "4.2",
        "ret": "91%",
        "churn": "9%",
        "sess": "14.8",
        "dep": "–",
        "app": "4.3",
        "sup": "4.0",
        "aum": "–",
        "rev": "5 200",
        "adopt": "5.2",
        "scost": "18"
      },
      "digital": {
        "curve": [
          48,
          58,
          54,
          52,
          46,
          28
        ],
        "nps": "42",
        "csat": "3.8",
        "ob": "4.1",
        "ret": "78%",
        "churn": "22%",
        "sess": "18.2",
        "dep": "–",
        "app": "4.4",
        "sup": "3.4",
        "aum": "–",
        "rev": "3 100",
        "adopt": "4.4",
        "scost": "32"
      },
      "lojal": {
        "curve": [
          56,
          52,
          60,
          56,
          58,
          36
        ],
        "nps": "62",
        "csat": "4.4",
        "ob": "–",
        "ret": "94%",
        "churn": "6%",
        "sess": "10.2",
        "dep": "–",
        "app": "4.0",
        "sup": "4.2",
        "aum": "–",
        "rev": "6 800",
        "adopt": "5.8",
        "scost": "14"
      },
      "risk": {
        "curve": [
          38,
          42,
          44,
          36,
          28,
          24
        ],
        "nps": "22",
        "csat": "3.0",
        "ob": "–",
        "ret": "58%",
        "churn": "42%",
        "sess": "4.2",
        "dep": "–",
        "app": "3.4",
        "sup": "3.0",
        "aum": "–",
        "rev": "1 200",
        "adopt": "2.1",
        "scost": "68"
      }
    },
    "personas": [
      {
        "id": "rutinhandlaren",
        "name": "Rutinhandlaren",
        "emoji": "🔄",
        "color": 0,
        "share": 44,
        "tagline": "Samma butik, samma dag, varje vecka",
        "desc": "Handlar alltid i samma butik på samma dag. Använder sällan app. Lojal om ingen friction.",
        "tags": [
          "Stamkund",
          "Fredagshandlar",
          "Ingen app"
        ],
        "nps": "62",
        "csat": "4.2",
        "churn": "8%",
        "sess": "6.2",
        "expect": [
          0,
          -5,
          -5,
          -5,
          0,
          -8
        ],
        "deliver": [
          5,
          2,
          4,
          6,
          8,
          -2
        ],
        "moments": [
          {
            "phase": 1,
            "insight": "\"Skriver alltid lista i notepad. Funkar.\""
          },
          {
            "phase": 2,
            "insight": "\"Åker dit för att jag alltid åkt dit.\""
          },
          {
            "phase": 4,
            "insight": "\"Personalen känner mig. Det är värt mycket.\""
          }
        ],
        "friction": [
          "Köer fredagar",
          "Tomma hyllor på populära varor"
        ],
        "opportunity": "Reservera varor + boka kassatid för stamkunder."
      },
      {
        "id": "digitala_handlaren",
        "name": "Digitala handlaren",
        "emoji": "📱",
        "color": 1,
        "share": 26,
        "tagline": "Handlar helst i appen eller online",
        "desc": "Handlar 70% online. Vill ha smidig app, receptsuggestions och snabb leverans.",
        "tags": [
          "Hemkörning",
          "Matplanering",
          "Receptbaserat"
        ],
        "nps": "48",
        "csat": "3.9",
        "churn": "16%",
        "sess": "22.4",
        "expect": [
          15,
          20,
          18,
          15,
          18,
          10
        ],
        "deliver": [
          -5,
          8,
          -8,
          -14,
          -4,
          -6
        ],
        "moments": [
          {
            "phase": 1,
            "insight": "\"Appen föreslår recept. Sparar tid varje vecka.\""
          },
          {
            "phase": 3,
            "insight": "\"3 varor fattades. Fick inte notis.\""
          },
          {
            "phase": 3,
            "insight": "\"Leveransen var 40 min sen och ingen svarade.\""
          }
        ],
        "friction": [
          "Substitutioner utan notis",
          "Leveransförseningar utan kommunikation"
        ],
        "opportunity": "Realtidsspårning + proaktiva substitutionsnotiser."
      },
      {
        "id": "dealjakaren",
        "name": "Dealjakaren",
        "emoji": "🏷️",
        "color": 2,
        "share": 18,
        "tagline": "Byter butik efter veckans erbjudanden",
        "desc": "Har ICA-appen, Coop-appen och Willys-appen. Byter varje vecka beroende på erbjudanden.",
        "tags": [
          "Matcharbjudanden",
          "Kupongsamlare",
          "Prisjämföring"
        ],
        "nps": "28",
        "csat": "3.2",
        "churn": "38%",
        "sess": "8.8",
        "expect": [
          15,
          20,
          15,
          12,
          15,
          10
        ],
        "deliver": [
          -10,
          -4,
          -12,
          -8,
          -12,
          -8
        ],
        "moments": [
          {
            "phase": 0,
            "insight": "\"Kollar alltid torsdagsreklamen. Bestämmer sen.\""
          },
          {
            "phase": 4,
            "insight": "\"Poängbonusen räknades inte. Fick ringa support.\""
          },
          {
            "phase": 5,
            "insight": "\"Coop hade 20% på kött hela veckan.\""
          }
        ],
        "friction": [
          "Erbjudanden inte tillräckligt personaliserade",
          "Poängproblem i kassan"
        ],
        "opportunity": "Personaliserade erbjudanden + garanterad poängsättning."
      },
      {
        "id": "halsokonnaren",
        "name": "Hälsokönnaren",
        "emoji": "🥗",
        "color": 3,
        "share": 12,
        "tagline": "Handlar ekologiskt och hälsosamt",
        "desc": "Handlar nästan uteslutande ekologiskt. Hög spend per besök. Värdesätter transparens.",
        "tags": [
          "Ekologiskt",
          "Allergifilter",
          "Hög spend"
        ],
        "nps": "58",
        "csat": "4.1",
        "churn": "10%",
        "sess": "14.2",
        "expect": [
          5,
          8,
          5,
          8,
          12,
          5
        ],
        "deliver": [
          2,
          4,
          2,
          4,
          -4,
          2
        ],
        "moments": [
          {
            "phase": 1,
            "insight": "\"Skannar alltid Krav-märket. Nyckeln.\""
          },
          {
            "phase": 4,
            "insight": "\"Ekologiska alternativ alltid i lager. Bra.\""
          },
          {
            "phase": 4,
            "insight": "\"Ville se CO2-avtryck per vara. Finns inte.\""
          }
        ],
        "friction": [
          "CO2-märkning saknas",
          "Svårt filtrera ekologiskt i appen"
        ],
        "opportunity": "Hållbarhetsfilter i app + CO2-märkning per vara."
      }
    ],
    "touchpoints": [
      [
        {
          "name": "Recept-inspiration (app/webb)",
          "sat": "3.8",
          "note": "34% börjar här"
        },
        {
          "name": "Veckans erbjudanden",
          "sat": "4.0",
          "note": "Viktig konvertering"
        },
        {
          "name": "Inköpslista i app",
          "sat": "3.6",
          "note": "42% digitaliserar"
        }
      ],
      [
        {
          "name": "Butik vs hemleverans-val",
          "sat": "3.4",
          "note": "44% väljer butik"
        },
        {
          "name": "Bokningsflöde leverans",
          "sat": "3.8",
          "note": "Drop-off: 18%"
        },
        {
          "name": "Click & Collect",
          "sat": "4.0",
          "note": "Snabbast växande"
        }
      ],
      [
        {
          "name": "Butikslayout & skyltning",
          "sat": "3.6",
          "note": "Hitta rätt = frustration"
        },
        {
          "name": "Produktinformation",
          "sat": "3.4",
          "note": "Allergi/eko info saknas ⚠️"
        },
        {
          "name": "Tillgänglighet",
          "sat": "3.2",
          "note": "Tomma hyllor ⚠️"
        }
      ],
      [
        {
          "name": "Självscanning",
          "sat": "4.2",
          "note": "Populärast 65%"
        },
        {
          "name": "Leveransprecision",
          "sat": "3.0",
          "note": "Substitutioner ⚠️"
        },
        {
          "name": "Digitalt kvitto",
          "sat": "4.1",
          "note": "78% föredrar"
        },
        {
          "name": "Poängregistrering",
          "sat": "3.4",
          "note": "Fel vid 12% ⚠️"
        }
      ],
      [
        {
          "name": "Poäng-appen",
          "sat": "3.8",
          "note": "68% aktiva"
        },
        {
          "name": "Personaliserade erbjudanden",
          "sat": "3.2",
          "note": "Ofta irrelevanta ⚠️"
        },
        {
          "name": "Premiummedlemskap",
          "sat": "4.2",
          "note": "Hög NPS bland premium"
        },
        {
          "name": "Kommunikation (mail/push)",
          "sat": "3.0",
          "note": "För hög frekvens ⚠️"
        }
      ],
      [
        {
          "name": "Konkurrentens erbjudande",
          "sat": "–",
          "note": "Primär churn-trigger"
        },
        {
          "name": "Kundservice vid problem",
          "sat": "2.8",
          "note": "Lång väntetid ⚠️"
        },
        {
          "name": "Reaktivt behåll-erbjudande",
          "sat": "3.0",
          "note": "Kommer för sent"
        }
      ]
    ],
    "expect": [
      58,
      55,
      62,
      58,
      52,
      35
    ],
    "delivery": {
      "alla": [
        52,
        50,
        56,
        48,
        44,
        32
      ],
      "premium": [
        56,
        54,
        60,
        54,
        52,
        34
      ],
      "digital": [
        48,
        58,
        54,
        52,
        46,
        28
      ],
      "lojal": [
        56,
        52,
        60,
        56,
        58,
        36
      ],
      "risk": [
        38,
        42,
        44,
        36,
        28,
        24
      ]
    },
    "opportunities": [
      {
        "phase": 2,
        "pos": 0.3,
        "name": "Produktinformation (allergi/eko)",
        "gap": -18,
        "type": "crit",
        "effort": 2,
        "reward": 4,
        "desc": "28% missar viktig produktinfo. Strukturerad data + allergifilter i app."
      },
      {
        "phase": 2,
        "pos": 0.7,
        "name": "Tillgänglighet / Tomma hyllor",
        "gap": -16,
        "type": "crit",
        "effort": 3,
        "reward": 4,
        "desc": "12% av shoppingtillfällena har en tom hylla. Realtidsinventarier minskar frustration."
      },
      {
        "phase": 3,
        "pos": 0.3,
        "name": "Leveransprecision (substitut.)",
        "gap": -22,
        "type": "crit",
        "effort": 2,
        "reward": 5,
        "desc": "Substitutioner utan förhandsnotis är störst negativt gap online."
      },
      {
        "phase": 3,
        "pos": 0.7,
        "name": "Poängregistrering (12% fel)",
        "gap": -14,
        "type": "crit",
        "effort": 2,
        "reward": 4,
        "desc": "12% av kvittona har poängfel. Underminar lojalitetsprogrammets trovärdighet."
      },
      {
        "phase": 4,
        "pos": 0.4,
        "name": "Personaliserade erbjudanden",
        "gap": -20,
        "type": "crit",
        "effort": 3,
        "reward": 5,
        "desc": "Erbjudanden upplevs generiska. ML-baserad personalisering ger +18% inlösen."
      },
      {
        "phase": 4,
        "pos": 0.7,
        "name": "Kommunikationsfrekvens",
        "gap": -14,
        "type": "watch",
        "effort": 1,
        "reward": 3,
        "desc": "För många pushnotiser. Preferenscentrum + smart timing minskar opt-outs."
      },
      {
        "phase": 3,
        "pos": 0.5,
        "name": "Självscanning",
        "gap": 10,
        "type": "quick",
        "effort": 1,
        "reward": 3,
        "desc": "Självscanning överpresterar. Tydligare promotion + first-time guide."
      }
    ]
  },
  "ehandel": {
    "id": "ehandel",
    "name": "E-handel",
    "industry": "E-commerce · Fashion & Lifestyle",
    "emoji": "📦",
    "description": "Digital shoppingresa för mode och lifestyle — discovery, köp, leverans och retur.",
    "stats": {
      "customers": "82 000",
      "nps": "38",
      "retention": "52%",
      "interviews": "110",
      "appstore": "4.0"
    },
    "phases": [
      {
        "name": "Inspiration",
        "sub": "Discovery & search"
      },
      {
        "name": "Research",
        "sub": "Jämföra & välja"
      },
      {
        "name": "Köp",
        "sub": "Cart & checkout"
      },
      {
        "name": "Leverans",
        "sub": "Väntan & mottagning"
      },
      {
        "name": "Retur & behåll",
        "sub": "Post-purchase"
      },
      {
        "name": "Sover",
        "sub": "Inaktiv kund"
      }
    ],
    "emotionCards": [
      {
        "emotion": "Inspirerad och upprymd",
        "sentiment": "pos",
        "quote": "\"Såg den på Instagram. Måste ha den.\"",
        "moment": "Trigger"
      },
      {
        "emotion": "Ambivalent och tveksam",
        "sentiment": "mixed",
        "quote": "\"Storlekstabellen stämmer aldrig. Ska jag chansa?\"",
        "moment": "Köpbeslut"
      },
      {
        "emotion": "Tillfredsställd men nervös",
        "sentiment": "mixed",
        "quote": "\"Lagt ordern. Nu hoppas jag att det stämmer med bilden.\"",
        "moment": "Checkout"
      },
      {
        "emotion": "Otålig och orolig",
        "sentiment": "mixed",
        "quote": "\"Paketet är på väg men trackingen uppdateras inte.\"",
        "moment": "Leveransväntan"
      },
      {
        "emotion": "Besviken eller glad",
        "sentiment": "mixed",
        "quote": "\"Passade inte alls. Returen var enkel i alla fall.\"",
        "moment": "Öppnar paketet"
      },
      {
        "emotion": "Glömmer bort varumärket",
        "sentiment": "neg",
        "quote": "\"Har inte shoppat på 4 månader. Tar vad som är billigast.\"",
        "moment": "Inaktivitet"
      }
    ],
    "segments": [
      {
        "id": "alla",
        "label": "Alla kunder"
      },
      {
        "id": "premium",
        "label": "VIP / Premium"
      },
      {
        "id": "ny",
        "label": "Ny kund <3 mån"
      },
      {
        "id": "lojal",
        "label": "Lojal 2+ år"
      },
      {
        "id": "risk",
        "label": "Inaktiv 90+ dgr"
      }
    ],
    "metrics": {
      "alla": {
        "curve": [
          60,
          56,
          62,
          42,
          38,
          26
        ],
        "nps": "38",
        "csat": "3.7",
        "ob": "4.0",
        "ret": "52%",
        "churn": "48%",
        "sess": "18.4",
        "dep": "–",
        "app": "4.0",
        "sup": "3.4",
        "aum": "–",
        "rev": "2 200",
        "adopt": "3.6",
        "scost": "42"
      },
      "premium": {
        "curve": [
          66,
          62,
          68,
          50,
          46,
          30
        ],
        "nps": "52",
        "csat": "4.2",
        "ob": "4.2",
        "ret": "72%",
        "churn": "28%",
        "sess": "24.8",
        "dep": "–",
        "app": "4.3",
        "sup": "4.0",
        "aum": "–",
        "rev": "6 800",
        "adopt": "5.2",
        "scost": "28"
      },
      "ny": {
        "curve": [
          58,
          60,
          60,
          44,
          36,
          22
        ],
        "nps": "32",
        "csat": "3.6",
        "ob": "4.1",
        "ret": "44%",
        "churn": "56%",
        "sess": "14.2",
        "dep": "–",
        "app": "4.2",
        "sup": "3.2",
        "aum": "–",
        "rev": "1 100",
        "adopt": "2.8",
        "scost": "58"
      },
      "lojal": {
        "curve": [
          64,
          58,
          68,
          52,
          50,
          32
        ],
        "nps": "58",
        "csat": "4.3",
        "ob": "–",
        "ret": "78%",
        "churn": "22%",
        "sess": "22.4",
        "dep": "–",
        "app": "4.1",
        "sup": "4.2",
        "aum": "–",
        "rev": "8 200",
        "adopt": "5.8",
        "scost": "22"
      },
      "risk": {
        "curve": [
          44,
          46,
          52,
          30,
          24,
          18
        ],
        "nps": "14",
        "csat": "2.8",
        "ob": "–",
        "ret": "28%",
        "churn": "72%",
        "sess": "3.8",
        "dep": "–",
        "app": "3.2",
        "sup": "2.8",
        "aum": "–",
        "rev": "480",
        "adopt": "1.8",
        "scost": "148"
      }
    },
    "personas": [
      {
        "id": "trendjakaren",
        "name": "Trendjägaren",
        "emoji": "✨",
        "color": 0,
        "share": 32,
        "tagline": "First to wear, first to return",
        "desc": "Shoppar 2–3 gånger/månad. Hög returgrad (45%). Drivs av sociala medier och trender.",
        "tags": [
          "Instagram-driven",
          "Hög returgrad",
          "Impulsköp"
        ],
        "nps": "34",
        "csat": "3.6",
        "churn": "38%",
        "sess": "28.4",
        "expect": [
          20,
          15,
          18,
          10,
          8,
          12
        ],
        "deliver": [
          -4,
          -8,
          -6,
          -12,
          -14,
          -8
        ],
        "moments": [
          {
            "phase": 0,
            "insight": "\"Såg den på TikTok. Köpte inom 10 min.\""
          },
          {
            "phase": 3,
            "insight": "\"Paketet kom nästa dag! Älskar det.\""
          },
          {
            "phase": 4,
            "insight": "\"Passade inte alls. Returen var enkel dock.\""
          }
        ],
        "friction": [
          "Storleksguiden stämmer sällan",
          "Returer drar ner marginalen"
        ],
        "opportunity": "AI-storleksguide + lönsamhet på retur-mönster."
      },
      {
        "id": "kvalitetsjakaren",
        "name": "Kvalitetssökaren",
        "emoji": "🏆",
        "color": 1,
        "share": 22,
        "tagline": "Köper sällan men rätt",
        "desc": "Köper 4–6 gånger/år men stor ordervalue. Läser alla recensioner. Lojal till bra märken.",
        "tags": [
          "Läser reviews",
          "Jämför material",
          "Lojal till märke"
        ],
        "nps": "62",
        "csat": "4.3",
        "churn": "12%",
        "sess": "14.8",
        "expect": [
          10,
          20,
          15,
          12,
          15,
          8
        ],
        "deliver": [
          -5,
          -10,
          -8,
          -6,
          -8,
          -4
        ],
        "moments": [
          {
            "phase": 1,
            "insight": "\"Läste 40 recensioner. Köpte till slut.\""
          },
          {
            "phase": 2,
            "insight": "\"Storleksguiden var exakt korrekt. Imponerad.\""
          },
          {
            "phase": 4,
            "insight": "\"Leveransen var försenad 3 dagar utan kommunikation.\""
          }
        ],
        "friction": [
          "Otydliga materialbeskrivningar",
          "Leveransförseningar utan proaktiv kommunikation"
        ],
        "opportunity": "Detaljerade produktattribut + proaktiva leveransnotiser."
      },
      {
        "id": "bekvamlighetskoparen",
        "name": "Bekvämlighetsköparen",
        "emoji": "🛋️",
        "color": 2,
        "share": 28,
        "tagline": "Vill ha rätt sak snabbt och smärtfritt",
        "desc": "Shoppar samma märken och storlekar. Vill ha snabbt checkout. Värdesätter convenience.",
        "tags": [
          "Sparade storlekar",
          "One-click checkout",
          "Snabb leverans"
        ],
        "nps": "54",
        "csat": "4.1",
        "churn": "18%",
        "sess": "12.4",
        "expect": [
          5,
          8,
          10,
          15,
          10,
          5
        ],
        "deliver": [
          2,
          4,
          8,
          8,
          -2,
          2
        ],
        "moments": [
          {
            "phase": 1,
            "insight": "\"Sökte direkt på min favoritjacka. Köpte på 2 min.\""
          },
          {
            "phase": 2,
            "insight": "\"Sparad storlek och betalning — supersmidigt.\""
          },
          {
            "phase": 3,
            "insight": "\"Leveransen var 2 dagar sen. Störande.\""
          }
        ],
        "friction": [
          "Sparade preferenser uppdateras inte",
          "Leveranser inte konsekvent snabba"
        ],
        "opportunity": "Persistent cart + guaranteed delivery windows."
      },
      {
        "id": "halbbara_shopparen",
        "name": "Hållbarhetsdrivna",
        "emoji": "🌿",
        "color": 3,
        "share": 18,
        "tagline": "Mode utan samvetskval",
        "desc": "Köper bara om produktionen är transparent. Väljer secondhand-funktioner och hållbara linjer.",
        "tags": [
          "Secondhand",
          "Hållbara material",
          "Transparens"
        ],
        "nps": "46",
        "csat": "3.9",
        "churn": "20%",
        "sess": "16.2",
        "expect": [
          8,
          15,
          10,
          10,
          12,
          8
        ],
        "deliver": [
          -4,
          -8,
          -6,
          -4,
          -8,
          -4
        ],
        "moments": [
          {
            "phase": 0,
            "insight": "\"Hittade dem via deras hållbarhetsrapport.\""
          },
          {
            "phase": 1,
            "insight": "\"CO2-footprint per produkt — det vill jag se.\""
          },
          {
            "phase": 5,
            "insight": "\"Secondhand-sektionen är för liten.\""
          }
        ],
        "friction": [
          "Hållbarhetsinfo per produkt saknas",
          "Secondhand-sektion undervälvad"
        ],
        "opportunity": "CO2-märkning + utbyggd secondhand-plattform."
      }
    ],
    "touchpoints": [
      [
        {
          "name": "Instagram / TikTok",
          "sat": "–",
          "note": "42% av trafiken"
        },
        {
          "name": "Startsida / kampanj",
          "sat": "3.8",
          "note": "Personalisering nyckel"
        },
        {
          "name": "E-mail nyhetsbrev",
          "sat": "3.4",
          "note": "22% CTR"
        }
      ],
      [
        {
          "name": "Produktsida",
          "sat": "3.6",
          "note": "Bilder viktigast"
        },
        {
          "name": "Storleksguide",
          "sat": "2.8",
          "note": "Störst pain point ⚠️"
        },
        {
          "name": "Kundrecensioner",
          "sat": "4.2",
          "note": "84% läser dem"
        },
        {
          "name": "Zoom / 360 bild",
          "sat": "3.8",
          "note": "Minskar returer 18%"
        }
      ],
      [
        {
          "name": "Cart experience",
          "sat": "3.9",
          "note": "Drop-off: 34% ⚠️"
        },
        {
          "name": "Checkout-flöde",
          "sat": "3.8",
          "note": "One-click populärast"
        },
        {
          "name": "Betalningsalternativ",
          "sat": "4.3",
          "note": "Klarna viktigast"
        },
        {
          "name": "Orderbekräftelse",
          "sat": "4.1",
          "note": "Viktigt för trygghet"
        }
      ],
      [
        {
          "name": "Leveransnotiser",
          "sat": "3.2",
          "note": "Otillräckliga ⚠️"
        },
        {
          "name": "Spårning",
          "sat": "3.4",
          "note": "Uppdateras sällan"
        },
        {
          "name": "Leveransprecision",
          "sat": "3.6",
          "note": "88% i tid"
        },
        {
          "name": "Paketeringen",
          "sat": "4.2",
          "note": "Unboxing-moment"
        }
      ],
      [
        {
          "name": "Retururlabel",
          "sat": "4.0",
          "note": "Enkel process"
        },
        {
          "name": "Retur-tracking",
          "sat": "3.2",
          "note": "Sällan uppdaterad"
        },
        {
          "name": "Återbetalning",
          "sat": "3.6",
          "note": "Median 5 dgr"
        },
        {
          "name": "Post-purchase mail",
          "sat": "3.4",
          "note": "Styling-tips underskattat"
        }
      ],
      [
        {
          "name": "Win-back kampanj",
          "sat": "3.2",
          "note": "Oftast för generisk"
        },
        {
          "name": "Lojalitetserbjudande",
          "sat": "3.4",
          "note": "Reaktivt, inte proaktivt"
        },
        {
          "name": "Opt-down (frekvens)",
          "sat": "–",
          "note": "Saknas idag ⚠️"
        }
      ]
    ],
    "expect": [
      68,
      62,
      70,
      55,
      45,
      30
    ],
    "delivery": {
      "alla": [
        60,
        56,
        62,
        42,
        38,
        26
      ],
      "premium": [
        66,
        62,
        68,
        50,
        46,
        30
      ],
      "ny": [
        58,
        60,
        60,
        44,
        36,
        22
      ],
      "lojal": [
        64,
        58,
        68,
        52,
        50,
        32
      ],
      "risk": [
        44,
        46,
        52,
        30,
        24,
        18
      ]
    },
    "opportunities": [
      {
        "phase": 1,
        "pos": 0.3,
        "name": "Storleksguide",
        "gap": -24,
        "type": "crit",
        "effort": 3,
        "reward": 5,
        "desc": "Störst pain point i hela resan. AI-storleksguide baserat på köphistorik reducerar returer 30%."
      },
      {
        "phase": 2,
        "pos": 0.4,
        "name": "Cart drop-off (34%)",
        "gap": -18,
        "type": "crit",
        "effort": 2,
        "reward": 5,
        "desc": "34% lämnar utan köp. Exit-intent + sparat cart + reminder minskar drop-off 12%."
      },
      {
        "phase": 2,
        "pos": 0.8,
        "name": "Klarna / betalningsalternativ",
        "gap": 8,
        "type": "quick",
        "effort": 1,
        "reward": 3,
        "desc": "Betalning överpresterar. Tydligare kommunikation av Klarna-alternativ i cart."
      },
      {
        "phase": 3,
        "pos": 0.3,
        "name": "Leveransnotiser",
        "gap": -22,
        "type": "crit",
        "effort": 2,
        "reward": 4,
        "desc": "Kunder uppdateras inte proaktivt vid förseningar. Push-notiser + proaktiv kommunikation."
      },
      {
        "phase": 3,
        "pos": 0.6,
        "name": "Spårning (sällan uppdaterad)",
        "gap": -16,
        "type": "crit",
        "effort": 2,
        "reward": 4,
        "desc": "Realtidsspårning är hygien 2026. Kartbaserad leveransview."
      },
      {
        "phase": 4,
        "pos": 0.3,
        "name": "Retur-tracking",
        "gap": -14,
        "type": "watch",
        "effort": 1,
        "reward": 3,
        "desc": "Kunder oroar sig för om returen kommit fram. Proaktiv bekräftelse dag 1."
      },
      {
        "phase": 4,
        "pos": 0.7,
        "name": "Post-purchase kommunikation",
        "gap": -16,
        "type": "crit",
        "effort": 2,
        "reward": 4,
        "desc": "Styling-inspirationsmail ökar repeat purchase med 22%. Underskattat kanal."
      },
      {
        "phase": 5,
        "pos": 0.4,
        "name": "Win-back kampanj (generisk)",
        "gap": -20,
        "type": "crit",
        "effort": 2,
        "reward": 5,
        "desc": "Generiska win-back kampanjer fungerar inte. Personaliserat baserat på köphistorik."
      },
      {
        "phase": 5,
        "pos": 0.8,
        "name": "Opt-down (saknas)",
        "gap": -18,
        "type": "crit",
        "effort": 1,
        "reward": 4,
        "desc": "Kunder som churnar vill ha lägre frekvens, inte avprenumerera. Opt-down saknas helt."
      }
    ]
  }
};
