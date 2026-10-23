// Rows of the journey matrix, one cell per phase (index 0 to 5). Moved from
// the stand-alone demo. The same rows are shown for every industry. A value
// starting with SEG_ is read from the chosen segment or persona.
import type { MatrixGroup, MatrixRow } from "./types";

export const MATRIX_ROWS: MatrixRow[] = [
  {
    "id": "mindset",
    "name": "Mindset & goals",
    "kind": "qual",
    "source": "In-depth interviews",
    "roles": [
      "designer",
      "pm"
    ],
    "cells": [
      {
        "headline": "The will is there, the way isn't",
        "quote": "\"I know I should save, but I don't know how.\"",
        "details": [
          {
            "label": "Main goal",
            "value": "Pension 34%, home 28%"
          }
        ]
      },
      {
        "headline": "Fees are the deal-breaker",
        "quote": "\"I got tired of high fees at the bank.\"",
        "details": [
          {
            "label": "Trigger",
            "value": "High fees / tips from friends"
          },
          {
            "label": "Time to decide",
            "value": "Median 8 days"
          }
        ]
      },
      {
        "headline": "Pleasantly surprised",
        "quote": "\"Faster than I thought. The digital ID was smooth.\"",
        "details": [
          {
            "label": "Most common friction",
            "value": "Confusion about risk level"
          },
          {
            "label": "Time",
            "value": "Median 8 min"
          }
        ]
      },
      {
        "headline": "Relief: now it's running",
        "quote": "\"I set up direct debit straight away.\""
      },
      {
        "headline": "Passive trust, not lack of interest",
        "quote": "\"I log in once a month. I like that it takes care of itself.\""
      },
      {
        "headline": "A life event, rarely anger",
        "quote": "\"Not unhappy. I just needed the cash.\"",
        "details": [
          {
            "label": "Feeling at exit",
            "value": "Neutral, not bitter"
          },
          {
            "label": "Would come back",
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
    "source": "Quarterly surveys",
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
        "label": "NPS at first deposit",
        "trend": "up",
        "trendText": "+2"
      },
      {
        "value": "SEG_NPS",
        "label": "Ongoing NPS",
        "trend": "up",
        "trendText": "+6 YoY"
      },
      {
        "value": "22",
        "label": "Exit NPS",
        "trend": "down",
        "trendText": "−40 vs active"
      }
    ]
  },
  {
    "id": "csat",
    "name": "CSAT",
    "kind": "quant",
    "source": "Ongoing surveys",
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
        "trendText": "stable"
      },
      {
        "value": "SEG_CSAT",
        "label": "Ongoing CSAT /5",
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
    "source": "Onboarding surveys",
    "roles": [
      "pm"
    ],
    "cells": [
      null,
      {
        "value": "8",
        "label": "Median sign-up time (min)",
        "trend": "flat",
        "trendText": "target: 7"
      },
      {
        "value": "SEG_OB",
        "label": "Ease score /5",
        "trend": "up",
        "trendText": "+0.1"
      },
      {
        "value": "82%",
        "label": "Would recommend onboarding",
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
        "label": "Day-30 retention",
        "trend": "up",
        "trendText": "+1%"
      },
      {
        "value": "88%",
        "label": "Day-90 retention",
        "trend": "flat",
        "trendText": "stable"
      },
      {
        "value": "SEG_RET",
        "label": "12-month retention",
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
    "name": "Assets per customer (SEK)",
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
        "label": "Median assets at activation",
        "trend": "up",
        "trendText": "+8k YoY"
      },
      {
        "value": "SEG_AUM",
        "label": "Median assets, active customer",
        "trend": "up",
        "trendText": "+12% YoY"
      },
      {
        "value": "SEG_AUM",
        "label": "Assets at exit",
        "trend": "down",
        "trendText": "−22% vs active"
      }
    ]
  },
  {
    "id": "rev",
    "name": "Revenue per customer (SEK/year)",
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
        "label": "Revenue year 1",
        "trend": "up"
      },
      {
        "value": "SEG_REV",
        "label": "Revenue per active customer/year",
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
    "source": "Predictive model",
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
        "label": "High risk at day 90",
        "trend": "flat"
      },
      {
        "value": "SEG_CHURN",
        "label": "Active customers at high risk",
        "trend": "down",
        "trendText": "−2pp YoY"
      },
      {
        "value": "100%",
        "label": "Churned by definition",
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
        "label": "Features on day 1",
        "trend": "flat",
        "trendText": "of 10"
      },
      {
        "value": "3.8",
        "label": "Features in month 1",
        "trend": "up"
      },
      {
        "value": "SEG_ADOPT",
        "label": "Features, median active",
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
        "label": "Cost per onboarding ticket",
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
        "trendText": "+31% vs average"
      }
    ]
  },
  {
    "id": "sessions",
    "name": "App sessions",
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
        "label": "Sessions in week 1",
        "trend": "flat"
      },
      {
        "value": "11",
        "label": "Sessions in month 1",
        "trend": "up"
      },
      {
        "value": "SEG_SESS",
        "label": "Sessions/month (median)",
        "trend": "flat",
        "trendText": "iOS 62%"
      },
      {
        "value": "1.8",
        "label": "Sessions/month pre-churn",
        "trend": "down",
        "trendText": "−78%"
      }
    ]
  },
  {
    "id": "deposit",
    "name": "Deposit behaviour",
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
        "label": "Deposit on day 1–7",
        "trend": "flat"
      },
      {
        "value": "SEG_DEP",
        "label": "Direct debit set up",
        "trend": "up",
        "trendText": "+5% YoY"
      },
      {
        "value": "84%",
        "label": "Active deposits",
        "trend": "up",
        "trendText": "+3%"
      },
      {
        "value": "38%",
        "label": "Deposits 60 days pre-churn",
        "trend": "down",
        "trendText": "−46%"
      }
    ]
  },
  {
    "id": "appstore",
    "name": "App Store rating",
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
        "label": "Average rating (600 reviews)",
        "trend": "up",
        "trendText": "+0.2 vs 2024"
      },
      {
        "value": "4.5",
        "label": "Rating: onboarding comments",
        "trend": "up"
      },
      null,
      {
        "value": "SEG_APP",
        "label": "Ongoing rating",
        "trend": "flat",
        "trendText": "iOS 4.4 / Android 4.2"
      },
      {
        "value": "3.1",
        "label": "Rating from churned customers",
        "trend": "down"
      }
    ]
  },
  {
    "id": "support",
    "name": "Support & tickets",
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
        "label": "Customers with a ticket in onboarding",
        "trend": "down",
        "trendText": "−3% YoY"
      },
      {
        "value": "8%",
        "label": "Tickets within 30 days",
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
        "label": "Churned customers who contacted support",
        "trend": "up",
        "trendText": "+5%"
      }
    ]
  },
  {
    "id": "support_qual",
    "name": "Support: customer voices",
    "kind": "qual",
    "source": "Free text + sentiment",
    "roles": [
      "cx",
      "designer",
      "pm"
    ],
    "cells": [
      null,
      {
        "headline": "Confusion about which product",
        "quote": "\"I don't understand the difference between the account types.\"",
        "sentiment": "mixed",
        "sentimentLabel": "Neutral 58% · Negative 28%",
        "details": [
          {
            "label": "Most common topic",
            "value": "Account type"
          }
        ]
      },
      {
        "headline": "Digital ID problems and unsure about risk level",
        "quote": "\"I got stuck on the risk level step. Can I change it later?\"",
        "sentiment": "neg",
        "sentimentLabel": "Negative 44% · Neutral 41%",
        "details": [
          {
            "label": "Top 2 topics",
            "value": "Digital ID errors (31%) + risk level (29%)"
          },
          {
            "label": "CSAT after",
            "value": "3.8/5"
          }
        ]
      },
      {
        "headline": "Deposits: unsure about timing",
        "quote": "\"I sent a transfer 3 days ago. Is that normal?\"",
        "sentiment": "neg",
        "sentimentLabel": "Negative 52% · Neutral 35%",
        "details": [
          {
            "label": "Most common question",
            "value": "Where is my money?"
          }
        ]
      },
      {
        "headline": "Navigation and tax questions",
        "quote": "\"How do I find the tax report?\"",
        "sentiment": "pos",
        "sentimentLabel": "Positive 41% · Neutral 45%",
        "details": [
          {
            "label": "Top topics",
            "value": "Tax (28%) + changing risk (24%)"
          },
          {
            "label": "CSAT after",
            "value": "4.0/5"
          }
        ]
      },
      {
        "headline": "Closing: a missed window",
        "quote": "\"Nobody got in touch afterwards.\"",
        "sentiment": "neg",
        "sentimentLabel": "Negative 61% · Neutral 31%",
        "details": [
          {
            "label": "Outreach post-churn",
            "value": "0% today"
          }
        ]
      }
    ]
  },
  {
    "id": "qualimpr",
    "name": "Improvement insights",
    "kind": "qual",
    "source": "Interviews + surveys",
    "roles": [
      "designer",
      "pm"
    ],
    "cells": [
      null,
      {
        "headline": "Build an interactive comparison tool",
        "quote": "Add \"Compare with what you have today\" to the website.",
        "details": [
          {
            "label": "Effort",
            "value": "Medium"
          },
          {
            "label": "Reward",
            "value": "Strong effect on conversion"
          }
        ]
      },
      {
        "headline": "Make the risk level step scenario-based",
        "quote": "\"If you had invested 100,000 kr at this risk level in 2019–2024...\"",
        "details": [
          {
            "label": "Effort",
            "value": "Medium"
          },
          {
            "label": "Reward",
            "value": "22% less drop-off"
          }
        ]
      },
      {
        "headline": "Move direct debit into onboarding",
        "quote": "Customers with direct debit churn 40% less. Make it a required step.",
        "details": [
          {
            "label": "Effort",
            "value": "Low"
          },
          {
            "label": "Reward",
            "value": "Retention +12%"
          }
        ]
      },
      {
        "headline": "Make \"Change risk level\" visible",
        "quote": "Takes 5 minutes on average to find. Add a clear link on the portfolio screen.",
        "details": [
          {
            "label": "Effort",
            "value": "Low"
          },
          {
            "label": "Reward",
            "value": "CSAT +0.4"
          }
        ]
      },
      {
        "headline": "Start post-churn outreach",
        "quote": "42% would consider coming back. An automated sequence on day 30 and 90.",
        "details": [
          {
            "label": "Effort",
            "value": "Low"
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
    "name": "Capabilities",
    "kind": "quant",
    "source": "Service Blueprint",
    "roles": [
      "arkitekt"
    ],
    "cells": [
      {
        "headline": "Content delivery & SEO",
        "quote": "CMS, landing pages, A/B testing, SEO pipeline. No login needed.",
        "details": [
          {
            "label": "System level",
            "value": "Public / CDN"
          },
          {
            "label": "Critical capabilities",
            "value": "Fast rendering, personalisation, tracking"
          }
        ]
      },
      {
        "headline": "Identity & conversion",
        "quote": "Sign-up flow, digital ID integration, cookie consent, GA4 tracking.",
        "details": [
          {
            "label": "System level",
            "value": "Auth + Analytics"
          },
          {
            "label": "Critical capabilities",
            "value": "Digital ID OAuth, funnel tracking, GDPR consent"
          }
        ]
      },
      {
        "headline": "KYC, risk profile & account creation",
        "quote": "KYC engine, risk classification, account opening in the core system.",
        "details": [
          {
            "label": "System level",
            "value": "Core Banking + KYC"
          },
          {
            "label": "Critical capabilities",
            "value": "Real-time KYC, risk scoring, account opening"
          }
        ]
      },
      {
        "headline": "Payments infrastructure & onboarding automation",
        "quote": "Bank transfer integration, direct debit API, welcome flow triggers, portfolio set-up.",
        "details": [
          {
            "label": "System level",
            "value": "Payment + Core"
          },
          {
            "label": "Critical capabilities",
            "value": "Transfer API, direct debit, portfolio engine"
          }
        ]
      },
      {
        "headline": "Portfolio, trading & tax",
        "quote": "Rebalancing, fund trading, tax reports, NAV updates.",
        "details": [
          {
            "label": "System level",
            "value": "Investment Engine"
          },
          {
            "label": "Critical capabilities",
            "value": "Daily rebalancing, tax calculation, NAV feed"
          }
        ]
      },
      {
        "headline": "Closing, switching & retention",
        "quote": "Withdrawal flow, transfers out, exit triggers, win-back automation.",
        "details": [
          {
            "label": "System level",
            "value": "CRM + Core Banking"
          },
          {
            "label": "Critical capabilities",
            "value": "Closing process, switching API, CRM automation"
          }
        ]
      }
    ]
  },
  {
    "id": "dataevents",
    "name": "Data & events",
    "kind": "quant",
    "source": "Service Blueprint",
    "roles": [
      "arkitekt"
    ],
    "cells": [
      {
        "headline": "Page views, campaign data",
        "quote": "Page views, UTM parameters, scroll depth, campaign attribution.",
        "details": [
          {
            "label": "Events",
            "value": "page_view, campaign_click"
          },
          {
            "label": "Storage",
            "value": "GA4, BigQuery"
          }
        ]
      },
      {
        "headline": "Sign-up start, digital ID started",
        "quote": "registration_start, bankid_initiated, bankid_completed, form_field_interaction.",
        "details": [
          {
            "label": "Events",
            "value": "registration_start, bankid_*"
          },
          {
            "label": "Storage",
            "value": "PostgreSQL + event stream"
          }
        ]
      },
      {
        "headline": "KYC status, risk profile, account opened",
        "quote": "kyc_submitted, kyc_approved, risk_score_set, account_created.",
        "details": [
          {
            "label": "Events",
            "value": "kyc_*, account_created"
          },
          {
            "label": "Storage",
            "value": "Core DB + audit log"
          }
        ]
      },
      {
        "headline": "Deposit, direct debit set-up, portfolio set-up",
        "quote": "deposit_initiated, deposit_confirmed, autogiro_created, portfolio_allocated.",
        "details": [
          {
            "label": "Events",
            "value": "deposit_*, autogiro_created"
          },
          {
            "label": "Storage",
            "value": "Transaction log + event bus"
          }
        ]
      },
      {
        "headline": "Sessions, trading, rebalancing, tax",
        "quote": "session_start, rebalance_triggered, trade_executed, tax_report_generated.",
        "details": [
          {
            "label": "Events",
            "value": "session_*, trade_*, rebalance_*"
          },
          {
            "label": "Storage",
            "value": "Data warehouse (BigQuery)"
          }
        ]
      },
      {
        "headline": "Withdrawal request, closing, churn signal",
        "quote": "withdrawal_requested, account_closed, churn_risk_flagged, winback_email_sent.",
        "details": [
          {
            "label": "Events",
            "value": "withdrawal_*, account_closed, churn_*"
          },
          {
            "label": "Storage",
            "value": "CRM + event stream"
          }
        ]
      }
    ]
  },
  {
    "id": "systemdeps",
    "name": "System dependencies",
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
            "label": "Critical",
            "value": "CDN uptime, CMS publish pipeline"
          },
          {
            "label": "SLA",
            "value": "99.9% availability"
          }
        ]
      },
      {
        "headline": "Digital ID, auth, consent",
        "quote": "Digital ID provider · Auth0 / internal IAM · OneTrust consent.",
        "details": [
          {
            "label": "Critical",
            "value": "Digital ID availability"
          },
          {
            "label": "Fallback",
            "value": "Manual identification"
          }
        ]
      },
      {
        "headline": "KYC provider, custody system, fund exchange",
        "quote": "KYC provider · Euroclear custody · Nasdaq funds · tax ID validation.",
        "details": [
          {
            "label": "Critical",
            "value": "KYC engine, Euroclear API"
          },
          {
            "label": "SLA",
            "value": "< 30s KYC response"
          }
        ]
      },
      {
        "headline": "Transfers, direct debit, portfolio engine",
        "quote": "Transfer API · direct debit · internal portfolio allocation engine.",
        "details": [
          {
            "label": "Critical",
            "value": "Transfer system availability"
          },
          {
            "label": "SLA",
            "value": "T+1 deposit"
          }
        ]
      },
      {
        "headline": "Fund trading, NAV feed, tax engine",
        "quote": "Nasdaq funds · Bloomberg NAV feed · internal tax engine · notification service.",
        "details": [
          {
            "label": "Critical",
            "value": "NAV feed, fund trading"
          },
          {
            "label": "SLA",
            "value": "Daily rebalancing at 09:00"
          }
        ]
      },
      {
        "headline": "CRM, withdrawals, switching",
        "quote": "Salesforce CRM · transfer withdrawals · internal switching API · SendGrid email.",
        "details": [
          {
            "label": "Critical",
            "value": "Withdrawal processing"
          },
          {
            "label": "SLA",
            "value": "T+2 withdrawal"
          }
        ]
      }
    ]
  },
  {
    "id": "automation",
    "name": "Level of automation",
    "kind": "quant",
    "source": "Service Blueprint",
    "roles": [
      "arkitekt"
    ],
    "cells": [
      {
        "value": "–",
        "label": "Not applicable",
        "trend": "flat"
      },
      {
        "value": "85%",
        "label": "Automated",
        "trend": "up",
        "trendText": "A/B tests, targeting, tracking"
      },
      {
        "value": "72%",
        "label": "Partly automated",
        "trend": "up",
        "trendText": "KYC manual review: 28%"
      },
      {
        "value": "91%",
        "label": "Highly automated",
        "trend": "up",
        "trendText": "Direct debit + portfolio set-up"
      },
      {
        "value": "96%",
        "label": "Fully automated",
        "trend": "up",
        "trendText": "Daily rebalancing, NAV, tax"
      },
      {
        "value": "18%",
        "label": "Mostly manual",
        "trend": "down",
        "trendText": "Win-back has no automation ⚠️"
      }
    ]
  },
  {
    "id": "failscenarios",
    "name": "Failure scenarios",
    "kind": "qual",
    "source": "Service Blueprint",
    "roles": [
      "arkitekt"
    ],
    "cells": [
      null,
      {
        "headline": "Digital ID timeout",
        "quote": "Digital ID doesn't respond → fall back to manual identification. Affects 2–4% of sessions.",
        "details": [
          {
            "label": "Frequency",
            "value": "2–4% of sign-ups"
          },
          {
            "label": "Fallback",
            "value": "Manual ID check"
          }
        ]
      },
      {
        "headline": "KYC rejection & timeout",
        "quote": "KYC engine timeout → queue. KYC rejection → manual review. The most common friction point.",
        "details": [
          {
            "label": "Frequency",
            "value": "8% KYC rejections"
          },
          {
            "label": "Handling",
            "value": "Manual review within 24h"
          }
        ]
      },
      {
        "headline": "Transfer delay",
        "quote": "Transfer deposit delayed → customers see \"pending\" for 1–2 days. The most common support ticket.",
        "details": [
          {
            "label": "Frequency",
            "value": "5% of deposits"
          },
          {
            "label": "Fix",
            "value": "Status notification on day 1"
          }
        ]
      },
      {
        "headline": "NAV feed outage",
        "quote": "If the NAV feed goes down → portfolio values freeze. Handled with cached values + a banner.",
        "details": [
          {
            "label": "Frequency",
            "value": "< 0.1% / year"
          },
          {
            "label": "Fallback",
            "value": "Last known NAV + a banner"
          }
        ]
      },
      {
        "headline": "Withdrawal stuck in clearing",
        "quote": "Withdrawals that don't clear within T+2 → manual intervention. Reinforces the decision to leave.",
        "details": [
          {
            "label": "Frequency",
            "value": "1% of withdrawals"
          },
          {
            "label": "Fix",
            "value": "Manual escalation + customer communication"
          }
        ]
      }
    ]
  },
  {
    "id": "sla",
    "name": "SLA & latency",
    "kind": "quant",
    "source": "Service Blueprint",
    "roles": [
      "arkitekt",
      "leadership"
    ],
    "cells": [
      {
        "value": "–",
        "label": "Not applicable",
        "trend": "flat"
      },
      {
        "value": "< 2s",
        "label": "Page load P95",
        "trend": "up",
        "trendText": "CDN cached, 99.9% uptime"
      },
      {
        "value": "< 30s",
        "label": "KYC response P95",
        "trend": "flat",
        "trendText": "Target: < 10s"
      },
      {
        "value": "T+1",
        "label": "Deposit confirmed",
        "trend": "flat",
        "trendText": "Standard transfer time"
      },
      {
        "value": "09:00",
        "label": "Daily rebalancing",
        "trend": "up",
        "trendText": "99.8% on time in the last 12 months"
      },
      {
        "value": "T+2",
        "label": "Withdrawal processed",
        "trend": "flat",
        "trendText": "Standard transfer time"
      }
    ]
  }
];

export const MATRIX_GROUPS: MatrixGroup[] = [
  {
    "label": "Qualitative",
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
    "label": "Quantitative",
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
    "label": "Behaviour",
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
