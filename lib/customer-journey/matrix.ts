// Rows of the journey matrix, one cell per phase (index 0 to 5). Moved from
// the stand-alone demo. The same rows are shown for every industry. A value
// starting with SEG_ is read from the chosen segment or persona.
import type { MatrixGroup, MatrixRow } from "./types";

export const MATRIX_ROWS: MatrixRow[] = [
  {
    "id": "mindset",
    "name": "Tankesätt & mål",
    "kind": "qual",
    "source": "Djupintervjuer",
    "roles": [
      "designer",
      "pm"
    ],
    "cells": [
      {
        "headline": "Viljan finns — vägen saknas",
        "quote": "\"Vet att jag borde spara men vet inte hur.\"",
        "details": [
          {
            "label": "Primärt mål",
            "value": "Pension 34%, Bostad 28%"
          }
        ]
      },
      {
        "headline": "Avgiften är deal-breaker",
        "quote": "\"Tröttnade på höga avgifter hos banken.\"",
        "details": [
          {
            "label": "Trigger",
            "value": "Hög avgift / vänners tips"
          },
          {
            "label": "Tid till beslut",
            "value": "Median 8 dagar"
          }
        ]
      },
      {
        "headline": "Positivt överraskad",
        "quote": "\"Snabbare än jag trodde. BankID var smidigt.\"",
        "details": [
          {
            "label": "Vanligaste friction",
            "value": "Förvirring kring risknivå"
          },
          {
            "label": "Tid",
            "value": "Median 8 min"
          }
        ]
      },
      {
        "headline": "Lättnad — nu rullar det",
        "quote": "\"Satte igång autogiro direkt.\""
      },
      {
        "headline": "Passiv tillit — inte ointresse",
        "quote": "\"Loggar in en gång i månaden. Gillar att det sköter sig.\""
      },
      {
        "headline": "Livshändelse, sällan ilska",
        "quote": "\"Inte missnöjd — behövde bara likviditeten.\"",
        "details": [
          {
            "label": "Känsla vid exit",
            "value": "Neutral, inte bitter"
          },
          {
            "label": "Skulle återvända",
            "value": "42%"
          }
        ]
      }
    ]
  },
  {
    "id": "nps",
    "name": "NPS",
    "kind": "quant",
    "source": "Kvartalsvisa enkäter",
    "roles": [
      "pm"
    ],
    "cells": [
      null,
      null,
      {
        "value": "68",
        "label": "NPS post-onboarding",
        "trend": "up",
        "trendText": "+4 vs Q1"
      },
      {
        "value": "64",
        "label": "NPS vid first deposit",
        "trend": "up",
        "trendText": "+2"
      },
      {
        "value": "SEG_NPS",
        "label": "Löpande NPS",
        "trend": "up",
        "trendText": "+6 YoY"
      },
      {
        "value": "22",
        "label": "Exit NPS",
        "trend": "down",
        "trendText": "−40 vs aktiv"
      }
    ]
  },
  {
    "id": "csat",
    "name": "CSAT",
    "kind": "quant",
    "source": "Löpande enkäter",
    "roles": [
      "pm"
    ],
    "cells": [
      null,
      null,
      {
        "value": "4.2",
        "label": "Onboarding ease /5",
        "trend": "up",
        "trendText": "+0.2"
      },
      {
        "value": "4.1",
        "label": "First experience /5",
        "trend": "flat",
        "trendText": "stabil"
      },
      {
        "value": "SEG_CSAT",
        "label": "Löpande CSAT /5",
        "trend": "up",
        "trendText": "+0.1"
      },
      {
        "value": "3.2",
        "label": "Exit CSAT /5",
        "trend": "down",
        "trendText": "−0.9"
      }
    ]
  },
  {
    "id": "onb_met",
    "name": "Onboarding metrics",
    "kind": "quant",
    "source": "Onboarding-enkäter",
    "roles": [
      "pm"
    ],
    "cells": [
      null,
      {
        "value": "8",
        "label": "Median sign-up tid (min)",
        "trend": "flat",
        "trendText": "mål: 7"
      },
      {
        "value": "SEG_OB",
        "label": "Ease score /5",
        "trend": "up",
        "trendText": "+0.1"
      },
      {
        "value": "82%",
        "label": "Rekommenderar onboardingen",
        "trend": "up",
        "trendText": "+3%"
      },
      null,
      null
    ]
  },
  {
    "id": "retention",
    "name": "Retention & churn",
    "kind": "quant",
    "source": "Retention snapshots",
    "roles": [
      "pm",
      "leadership"
    ],
    "cells": [
      null,
      null,
      {
        "value": "92%",
        "label": "Dag-30 retention",
        "trend": "up",
        "trendText": "+1%"
      },
      {
        "value": "88%",
        "label": "Dag-90 retention",
        "trend": "flat",
        "trendText": "stabil"
      },
      {
        "value": "SEG_RET",
        "label": "12-mån retention",
        "trend": "up",
        "trendText": "+2%"
      },
      {
        "value": "SEG_CHURN",
        "label": "Churn rate",
        "trend": "down",
        "trendText": "−2% YoY"
      }
    ]
  },
  {
    "id": "aum",
    "name": "AUM per kund (SEK)",
    "kind": "quant",
    "source": "Business metrics",
    "roles": [
      "leadership",
      "cx",
      "pm"
    ],
    "cells": [
      null,
      null,
      null,
      {
        "value": "SEG_AUM",
        "label": "Median AUM vid aktivering",
        "trend": "up",
        "trendText": "+8k YoY"
      },
      {
        "value": "SEG_AUM",
        "label": "Median AUM aktiv kund",
        "trend": "up",
        "trendText": "+12% YoY"
      },
      {
        "value": "SEG_AUM",
        "label": "AUM vid exit",
        "trend": "down",
        "trendText": "−22% vs aktiv"
      }
    ]
  },
  {
    "id": "rev",
    "name": "Intäkt per kund (SEK/år)",
    "kind": "quant",
    "source": "Business metrics",
    "roles": [
      "leadership",
      "cx",
      "pm"
    ],
    "cells": [
      null,
      null,
      null,
      {
        "value": "SEG_REV",
        "label": "Intäkt år 1",
        "trend": "up"
      },
      {
        "value": "SEG_REV",
        "label": "Intäkt aktiv kund/år",
        "trend": "up",
        "trendText": "+9% YoY"
      },
      null
    ]
  },
  {
    "id": "churnscore",
    "name": "Churn risk-score",
    "kind": "quant",
    "source": "Prediktiv modell",
    "roles": [
      "leadership",
      "cx",
      "pm"
    ],
    "cells": [
      null,
      null,
      null,
      {
        "value": "12%",
        "label": "Hög-risk dag 90",
        "trend": "flat"
      },
      {
        "value": "SEG_CHURN",
        "label": "Aktiva med hög risk",
        "trend": "down",
        "trendText": "−2pp YoY"
      },
      {
        "value": "100%",
        "label": "Per definition churnad",
        "trend": "flat"
      }
    ]
  },
  {
    "id": "adoptbiz",
    "name": "Adoption index",
    "kind": "quant",
    "source": "Adoption metrics",
    "roles": [
      "leadership",
      "pm"
    ],
    "cells": [
      null,
      null,
      {
        "value": "2.1",
        "label": "Funktioner dag 1",
        "trend": "flat",
        "trendText": "av 10"
      },
      {
        "value": "3.8",
        "label": "Funktioner månad 1",
        "trend": "up"
      },
      {
        "value": "SEG_ADOPT",
        "label": "Funktioner median aktiv",
        "trend": "up",
        "trendText": "+0.4 YoY"
      },
      {
        "value": "2.9",
        "label": "Pre-churn index",
        "trend": "down",
        "trendText": "−2.3"
      }
    ]
  },
  {
    "id": "scost",
    "name": "Support cost index",
    "kind": "quant",
    "source": "Business metrics",
    "roles": [
      "leadership",
      "cx"
    ],
    "cells": [
      null,
      null,
      {
        "value": "SEG_SCOST",
        "label": "Kostnad per onboarding-ärende",
        "trend": "down",
        "trendText": "−8% YoY"
      },
      null,
      {
        "value": "SEG_SCOST",
        "label": "Support cost index",
        "trend": "down",
        "trendText": "−12% YoY"
      },
      {
        "value": "SEG_SCOST",
        "label": "Support cost pre-churn",
        "trend": "up",
        "trendText": "+31% vs snitt"
      }
    ]
  },
  {
    "id": "sessions",
    "name": "Appsessioner",
    "kind": "behaviour",
    "source": "App usage data",
    "roles": [
      "designer"
    ],
    "cells": [
      null,
      null,
      {
        "value": "3.1",
        "label": "Sessioner vecka 1",
        "trend": "flat"
      },
      {
        "value": "11",
        "label": "Sessioner månad 1",
        "trend": "up"
      },
      {
        "value": "SEG_SESS",
        "label": "Sessioner/mån (median)",
        "trend": "flat",
        "trendText": "iOS 62%"
      },
      {
        "value": "1.8",
        "label": "Sessioner/mån pre-churn",
        "trend": "down",
        "trendText": "−78%"
      }
    ]
  },
  {
    "id": "deposit",
    "name": "Insättningsbeteende",
    "kind": "behaviour",
    "source": "App + adoption",
    "roles": [
      "designer"
    ],
    "cells": [
      null,
      null,
      {
        "value": "68%",
        "label": "Insättning dag 1–7",
        "trend": "flat"
      },
      {
        "value": "SEG_DEP",
        "label": "Autogiro uppsatt",
        "trend": "up",
        "trendText": "+5% YoY"
      },
      {
        "value": "84%",
        "label": "Aktiva insättningar",
        "trend": "up",
        "trendText": "+3%"
      },
      {
        "value": "38%",
        "label": "Insättning 60 dgr pre-churn",
        "trend": "down",
        "trendText": "−46%"
      }
    ]
  },
  {
    "id": "appstore",
    "name": "App Store betyg",
    "kind": "quant",
    "source": "App Store & Play",
    "roles": [
      "designer",
      "pm"
    ],
    "cells": [
      null,
      {
        "value": "4.3",
        "label": "Snittbetyg (600 reviews)",
        "trend": "up",
        "trendText": "+0.2 vs 2024"
      },
      {
        "value": "4.5",
        "label": "Betyg: onboarding-kommentarer",
        "trend": "up"
      },
      null,
      {
        "value": "SEG_APP",
        "label": "Löpande betyg",
        "trend": "flat",
        "trendText": "iOS 4.4 / Android 4.2"
      },
      {
        "value": "3.1",
        "label": "Betyg churnade kunder",
        "trend": "down"
      }
    ]
  },
  {
    "id": "support",
    "name": "Support & ärenden",
    "kind": "quant",
    "source": "Tickets + CSAT",
    "roles": [
      "cx",
      "pm"
    ],
    "cells": [
      null,
      null,
      {
        "value": "12%",
        "label": "Kunder med ärende i onboarding",
        "trend": "down",
        "trendText": "−3% YoY"
      },
      {
        "value": "8%",
        "label": "Ärenden inom 30 dgr",
        "trend": "down"
      },
      {
        "value": "SEG_SUP",
        "label": "Support CSAT /5",
        "trend": "flat",
        "trendText": "Median 8h"
      },
      {
        "value": "18%",
        "label": "Churnkunder stötte på support",
        "trend": "up",
        "trendText": "+5%"
      }
    ]
  },
  {
    "id": "support_qual",
    "name": "Support — kundröster",
    "kind": "qual",
    "source": "Fritext + sentiment",
    "roles": [
      "cx",
      "designer",
      "pm"
    ],
    "cells": [
      null,
      {
        "headline": "Förvirring kring produktval",
        "quote": "\"Förstår inte skillnaden på ISK och kapitalförsäkring.\"",
        "sentiment": "mixed",
        "sentimentLabel": "Neutral 58% · Negativ 28%",
        "details": [
          {
            "label": "Vanligaste ämne",
            "value": "Kontoform (ISK vs KF)"
          }
        ]
      },
      {
        "headline": "BankID-problem och risknivå-osäkerhet",
        "quote": "\"Fastnade på risknivå-steget. Kan jag ändra sen?\"",
        "sentiment": "neg",
        "sentimentLabel": "Negativ 44% · Neutral 41%",
        "details": [
          {
            "label": "Top 2 ämnen",
            "value": "BankID-fel (31%) + Risknivå (29%)"
          },
          {
            "label": "CSAT efter",
            "value": "3.8/5"
          }
        ]
      },
      {
        "headline": "Insättning — osäkerhet kring timing",
        "quote": "\"Har skickat bankgiro för 3 dagar sen. Är det normalt?\"",
        "sentiment": "neg",
        "sentimentLabel": "Negativ 52% · Neutral 35%",
        "details": [
          {
            "label": "Vanligaste fråga",
            "value": "Var är mina pengar?"
          }
        ]
      },
      {
        "headline": "Navigering och skattefrågor",
        "quote": "\"Hur hittar jag skatterapporten?\"",
        "sentiment": "pos",
        "sentimentLabel": "Positiv 41% · Neutral 45%",
        "details": [
          {
            "label": "Top ämnen",
            "value": "Skatt (28%) + Riskändring (24%)"
          },
          {
            "label": "CSAT efter",
            "value": "4.0/5"
          }
        ]
      },
      {
        "headline": "Avslut — outnyttjat fönster",
        "quote": "\"Ingen hörde av sig efteråt.\"",
        "sentiment": "neg",
        "sentimentLabel": "Negativ 61% · Neutral 31%",
        "details": [
          {
            "label": "Outreach post-churn",
            "value": "0% idag"
          }
        ]
      }
    ]
  },
  {
    "id": "qualimpr",
    "name": "Förbättringsinsikter",
    "kind": "qual",
    "source": "Intervjuer + enkäter",
    "roles": [
      "designer",
      "pm"
    ],
    "cells": [
      null,
      {
        "headline": "Bygg ett interaktivt jämförelseverktyg",
        "quote": "Lägg till \"Jämför din nuvarande fond\" på webbplatsen.",
        "details": [
          {
            "label": "Effort",
            "value": "Medel"
          },
          {
            "label": "Reward",
            "value": "Hög konverteringseffekt"
          }
        ]
      },
      {
        "headline": "Gör risknivå-steget scenario-baserat",
        "quote": "\"Om du investerat 100 000 kr med denna risknivå 2019–2024...\"",
        "details": [
          {
            "label": "Effort",
            "value": "Medel"
          },
          {
            "label": "Reward",
            "value": "22% lägre drop-off"
          }
        ]
      },
      {
        "headline": "Flytta autogiro till onboarding",
        "quote": "Autogiro-kunder churnar 40% mindre. Gör det obligatoriskt.",
        "details": [
          {
            "label": "Effort",
            "value": "Låg"
          },
          {
            "label": "Reward",
            "value": "Retention +12%"
          }
        ]
      },
      {
        "headline": "Synliggör \"Ändra risknivå\"",
        "quote": "Tar i snitt 5 min att hitta. Tydlig länk på portföljskärmen.",
        "details": [
          {
            "label": "Effort",
            "value": "Låg"
          },
          {
            "label": "Reward",
            "value": "CSAT +0.4"
          }
        ]
      },
      {
        "headline": "Starta post-churn outreach",
        "quote": "42% kan tänka sig återvända. Automatiserad sekvens dag 30/90.",
        "details": [
          {
            "label": "Effort",
            "value": "Låg"
          },
          {
            "label": "Reward",
            "value": "Win-back 8–12%"
          }
        ]
      }
    ]
  },
  {
    "id": "capabilities",
    "name": "Förmågor",
    "kind": "quant",
    "source": "Service Blueprint",
    "roles": [
      "arkitekt"
    ],
    "cells": [
      {
        "headline": "Innehållsleverans & SEO",
        "quote": "CMS, landningssidor, A/B-testramverk, SEO-pipeline. Ingen inloggning krävs.",
        "details": [
          {
            "label": "Systemnivå",
            "value": "Public / CDN"
          },
          {
            "label": "Kritiska förmågor",
            "value": "Snabb rendering, personalisering, spårning"
          }
        ]
      },
      {
        "headline": "Identitets- & konverteringshantering",
        "quote": "Registreringsflöde, BankID-integration, cookie consent, GA4-spårning.",
        "details": [
          {
            "label": "Systemnivå",
            "value": "Auth + Analytics"
          },
          {
            "label": "Kritiska förmågor",
            "value": "BankID OAuth, funnel tracking, GDPR consent"
          }
        ]
      },
      {
        "headline": "KYC, riskprofil & kontoskapande",
        "quote": "KYC-motor, riskklassificeringsalgoritm, kontoöppning mot depåsystem.",
        "details": [
          {
            "label": "Systemnivå",
            "value": "Core Banking + KYC"
          },
          {
            "label": "Kritiska förmågor",
            "value": "Realtids-KYC, riskpoängsättning, depåöppning"
          }
        ]
      },
      {
        "headline": "Betalningsinfrastruktur & onboarding-automation",
        "quote": "Bankgirokoppling, autogiro-API, välkomstflöde-triggers, portföljsättning.",
        "details": [
          {
            "label": "Systemnivå",
            "value": "Payment + Core"
          },
          {
            "label": "Kritiska förmågor",
            "value": "Bankgiro API, autogiro Bankgirot, portfolio engine"
          }
        ]
      },
      {
        "headline": "Portfölj, handel & skatteberäkning",
        "quote": "Rebalansering, fondhandel, skatterapport-generering, NAV-uppdateringar.",
        "details": [
          {
            "label": "Systemnivå",
            "value": "Investment Engine"
          },
          {
            "label": "Kritiska förmågor",
            "value": "Daglig rebalansering, skatteberäkning, NAV-feed"
          }
        ]
      },
      {
        "headline": "Avslut, portabilitet & retention",
        "quote": "Uttagsflöde, kapitalöverföring, exit-triggers, win-back automationer.",
        "details": [
          {
            "label": "Systemnivå",
            "value": "CRM + Core Banking"
          },
          {
            "label": "Kritiska förmågor",
            "value": "Avslutningsprocess, portabilitets-API, CRM-automation"
          }
        ]
      }
    ]
  },
  {
    "id": "dataevents",
    "name": "Data & händelser",
    "kind": "quant",
    "source": "Service Blueprint",
    "roles": [
      "arkitekt"
    ],
    "cells": [
      {
        "headline": "Sidvisning, kampanjdata",
        "quote": "PageView, UTM-parametrar, scroll-djup, kampanjattribuering.",
        "details": [
          {
            "label": "Events",
            "value": "page_view, campaign_click"
          },
          {
            "label": "Lagring",
            "value": "GA4, BigQuery"
          }
        ]
      },
      {
        "headline": "Registreringsstart, BankID-initiation",
        "quote": "registration_start, bankid_initiated, bankid_completed, form_field_interaction.",
        "details": [
          {
            "label": "Events",
            "value": "registration_start, bankid_*"
          },
          {
            "label": "Lagring",
            "value": "PostgreSQL + event stream"
          }
        ]
      },
      {
        "headline": "KYC-status, riskprofil, kontoöppnat",
        "quote": "kyc_submitted, kyc_approved, risk_score_set, account_created.",
        "details": [
          {
            "label": "Events",
            "value": "kyc_*, account_created"
          },
          {
            "label": "Lagring",
            "value": "Core DB + audit log"
          }
        ]
      },
      {
        "headline": "Insättning, autogiro-setup, portföljsättning",
        "quote": "deposit_initiated, deposit_confirmed, autogiro_created, portfolio_allocated.",
        "details": [
          {
            "label": "Events",
            "value": "deposit_*, autogiro_created"
          },
          {
            "label": "Lagring",
            "value": "Transaktionslogg + event bus"
          }
        ]
      },
      {
        "headline": "Session, handel, rebalansering, skatt",
        "quote": "session_start, rebalance_triggered, trade_executed, tax_report_generated.",
        "details": [
          {
            "label": "Events",
            "value": "session_*, trade_*, rebalance_*"
          },
          {
            "label": "Lagring",
            "value": "Data warehouse (BigQuery)"
          }
        ]
      },
      {
        "headline": "Uttagsbegäran, avslut, churn-signal",
        "quote": "withdrawal_requested, account_closed, churn_risk_flagged, winback_email_sent.",
        "details": [
          {
            "label": "Events",
            "value": "withdrawal_*, account_closed, churn_*"
          },
          {
            "label": "Lagring",
            "value": "CRM + event stream"
          }
        ]
      }
    ]
  },
  {
    "id": "systemdeps",
    "name": "Systemberoenden",
    "kind": "quant",
    "source": "Service Blueprint",
    "roles": [
      "arkitekt"
    ],
    "cells": [
      {
        "headline": "CDN, CMS, Analytics",
        "quote": "Cloudflare CDN · Contentful CMS · Google Analytics 4 · Hotjar.",
        "details": [
          {
            "label": "Kritiskt",
            "value": "CDN uptime, CMS publish pipeline"
          },
          {
            "label": "SLA",
            "value": "99.9% tillgänglighet"
          }
        ]
      },
      {
        "headline": "BankID, Auth, Consent",
        "quote": "BankID (Finansiell ID-Teknik) · Auth0 / intern IAM · OneTrust consent.",
        "details": [
          {
            "label": "Kritiskt",
            "value": "BankID-tillgänglighet"
          },
          {
            "label": "Fallback",
            "value": "Manuell identifiering"
          }
        ]
      },
      {
        "headline": "KYC-leverantör, Depåsystem, Fondbörs",
        "quote": "Trapets KYC · Euroclear depå · Nasdaq fondbörs · Skatteverket TIN-validering.",
        "details": [
          {
            "label": "Kritiskt",
            "value": "KYC-motor, Euroclear API"
          },
          {
            "label": "SLA",
            "value": "< 30s KYC-svar"
          }
        ]
      },
      {
        "headline": "Bankgirot, Autogiro, Portfolio Engine",
        "quote": "Bankgirot API · Autogiro Bankgirot · Intern portfolio allocation engine.",
        "details": [
          {
            "label": "Kritiskt",
            "value": "Bankgirot tillgänglighet"
          },
          {
            "label": "SLA",
            "value": "T+1 insättning"
          }
        ]
      },
      {
        "headline": "Fondhandel, NAV-feed, Skattemotor",
        "quote": "Nasdaq fondbörs · Bloomberg NAV-feed · Intern skattemotor · Notifikationstjänst.",
        "details": [
          {
            "label": "Kritiskt",
            "value": "NAV-feed, fondhandel"
          },
          {
            "label": "SLA",
            "value": "Daglig rebalansering 09:00"
          }
        ]
      },
      {
        "headline": "CRM, Bankgiro uttag, Portabilitet",
        "quote": "Salesforce CRM · Bankgirot uttag · Intern portabilitets-API · Sendgrid mail.",
        "details": [
          {
            "label": "Kritiskt",
            "value": "Uttagsprocessering"
          },
          {
            "label": "SLA",
            "value": "T+2 uttag"
          }
        ]
      }
    ]
  },
  {
    "id": "automation",
    "name": "Automationsgrad",
    "kind": "quant",
    "source": "Service Blueprint",
    "roles": [
      "arkitekt"
    ],
    "cells": [
      {
        "value": "–",
        "label": "Ej tillämpbart",
        "trend": "flat"
      },
      {
        "value": "85%",
        "label": "Automatiserat",
        "trend": "up",
        "trendText": "A/B-test, targeting, spårning"
      },
      {
        "value": "72%",
        "label": "Delvis auto",
        "trend": "up",
        "trendText": "KYC manuell review: 28%"
      },
      {
        "value": "91%",
        "label": "Hög automation",
        "trend": "up",
        "trendText": "Autogiro + portföljsättning"
      },
      {
        "value": "96%",
        "label": "Fullt automatiserat",
        "trend": "up",
        "trendText": "Daglig rebalansering, NAV, skatt"
      },
      {
        "value": "18%",
        "label": "Nästan manuellt",
        "trend": "down",
        "trendText": "Win-back saknar automation ⚠️"
      }
    ]
  },
  {
    "id": "failscenarios",
    "name": "Felscenarier",
    "kind": "qual",
    "source": "Service Blueprint",
    "roles": [
      "arkitekt"
    ],
    "cells": [
      null,
      {
        "headline": "BankID-timeout",
        "quote": "BankID svarar inte → fallback till manuell identifiering. Drabbar 2-4% av sessioner.",
        "details": [
          {
            "label": "Frekvens",
            "value": "2–4% av registreringar"
          },
          {
            "label": "Fallback",
            "value": "Manuell ID-verifiering"
          }
        ]
      },
      {
        "headline": "KYC-avslag & timeout",
        "quote": "KYC-motor timeout → köprocess. KYC-avslag → manuell review. Vanligaste friction-punkt.",
        "details": [
          {
            "label": "Frekvens",
            "value": "8% KYC-avslag"
          },
          {
            "label": "Hantering",
            "value": "Manuell review inom 24h"
          }
        ]
      },
      {
        "headline": "Bankgiro-fördröjning",
        "quote": "Bankgiro-insättning fördröjd → kunderna ser \"väntande\" i 1–2 dgr. Vanligaste support-ärende.",
        "details": [
          {
            "label": "Frekvens",
            "value": "5% av insättningar"
          },
          {
            "label": "Lösning",
            "value": "Status-notis dag 1"
          }
        ]
      },
      {
        "headline": "NAV-feed-avbrott",
        "quote": "Om Bloomberg NAV-feed faller → portföljvärden fryser. Hanteras med cached värden + banner.",
        "details": [
          {
            "label": "Frekvens",
            "value": "< 0.1% / år"
          },
          {
            "label": "Fallback",
            "value": "Senaste kända NAV + UI-banner"
          }
        ]
      },
      {
        "headline": "Uttag fastnar i clearing",
        "quote": "Uttag i Bankgirot cleara inte inom T+2 → manuell intervention. Förstärker churn-beslutet.",
        "details": [
          {
            "label": "Frekvens",
            "value": "1% av uttag"
          },
          {
            "label": "Lösning",
            "value": "Manuell eskalering + kundkommunikation"
          }
        ]
      }
    ]
  },
  {
    "id": "sla",
    "name": "SLA & latens",
    "kind": "quant",
    "source": "Service Blueprint",
    "roles": [
      "arkitekt",
      "leadership"
    ],
    "cells": [
      {
        "value": "–",
        "label": "Ej tillämpbart",
        "trend": "flat"
      },
      {
        "value": "< 2s",
        "label": "Sidladdning P95",
        "trend": "up",
        "trendText": "CDN-cachad, 99.9% uptime"
      },
      {
        "value": "< 30s",
        "label": "KYC-svar P95",
        "trend": "flat",
        "trendText": "Mål: < 10s"
      },
      {
        "value": "T+1",
        "label": "Insättning bekräftad",
        "trend": "flat",
        "trendText": "Bankgirot standard"
      },
      {
        "value": "09:00",
        "label": "Daglig rebalansering",
        "trend": "up",
        "trendText": "99.8% on-time senaste 12 mån"
      },
      {
        "value": "T+2",
        "label": "Uttag processat",
        "trend": "flat",
        "trendText": "Bankgirot standard"
      }
    ]
  }
];

export const MATRIX_GROUPS: MatrixGroup[] = [
  {
    "label": "Kvalitativ",
    "rows": [
      "mindset",
      "qualimpr"
    ]
  },
  {
    "label": "Business",
    "rows": [
      "aum",
      "rev",
      "churnscore",
      "adoptbiz",
      "scost"
    ]
  },
  {
    "label": "Kvantitativ",
    "rows": [
      "nps",
      "csat",
      "onb_met",
      "retention",
      "appstore",
      "support",
      "support_qual"
    ]
  },
  {
    "label": "Beteende",
    "rows": [
      "sessions",
      "deposit"
    ]
  },
  {
    "label": "Internal Services",
    "rows": [
      "capabilities",
      "dataevents",
      "systemdeps",
      "automation",
      "failscenarios",
      "sla"
    ]
  }
];
