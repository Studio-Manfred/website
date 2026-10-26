// Synthetic data for the Customer Journey Intelligence case. Moved from the
// stand-alone demo (customer-journey-demo/index.html) and translated to
// English; nothing here is real customer data.
import type { Industry, IndustryId } from "./types";

export const INDUSTRIES: Record<IndustryId, Industry> = {
  "finance": {
    "id": "finance",
    "name": "Retail Bank",
    "industry": "Finance · Retail Banking",
    "emoji": "🏦",
    "description": "Digital banking for personal customers: accounts, cards, loans and savings.",
    "stats": {
      "customers": "8,200",
      "nps": "34",
      "retention": "91%",
      "interviews": "120",
      "appstore": "3.8"
    },
    "phases": [
      {
        "name": "Banking need",
        "sub": "Life events"
      },
      {
        "name": "Comparison",
        "sub": "Looking at options"
      },
      {
        "name": "Open account",
        "sub": "Becoming a customer"
      },
      {
        "name": "Activation",
        "sub": "Card, payments, ID"
      },
      {
        "name": "Everyday banking",
        "sub": "Ongoing use"
      },
      {
        "name": "Switching bank",
        "sub": "Risk & exit"
      }
    ],
    "emotionCards": [
      {
        "emotion": "Frustrated with current bank",
        "sentiment": "neg",
        "quote": "\"Sick of hidden fees and 1-hour queues.\"",
        "moment": "Decision to switch"
      },
      {
        "emotion": "Hopeful but sceptical",
        "sentiment": "mixed",
        "quote": "\"They promise everything, but I don't really believe them.\"",
        "moment": "Bank chosen"
      },
      {
        "emotion": "Annoyed by paperwork",
        "sentiment": "mixed",
        "quote": "\"The KYC forms took 3 days. Why can't they just use my digital ID?\"",
        "moment": "Account opened"
      },
      {
        "emotion": "Relieved but not impressed",
        "sentiment": "mixed",
        "quote": "\"OK, at least the card works.\"",
        "moment": "First transaction"
      },
      {
        "emotion": "Neutral: the bank is invisible",
        "sentiment": "mixed",
        "quote": "\"I barely notice I have it. Good or bad?\"",
        "moment": "Salary paid in"
      },
      {
        "emotion": "Disappointed, moving to a neobank",
        "sentiment": "neg",
        "quote": "\"Revolut gives me what I wanted from them from day one.\"",
        "moment": "Decision to move"
      }
    ],
    "segments": [
      {
        "id": "alla",
        "label": "All customers"
      },
      {
        "id": "premium",
        "label": "Private / Premium"
      },
      {
        "id": "ung",
        "label": "Young (<30)"
      },
      {
        "id": "lojal",
        "label": "Loyal 5+ years"
      },
      {
        "id": "risk",
        "label": "High churn risk"
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
        "rev": "1,840",
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
        "rev": "6,200",
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
        "rev": "4,100",
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
        "name": "The Convenience Banker",
        "emoji": "📱",
        "color": 0,
        "share": 42,
        "tagline": "The bank should be invisible and just work",
        "desc": "Wants the bank to be as invisible as possible. Does everything in the app.",
        "tags": [
          "Mobile payments",
          "Mobile ID",
          "Direct debit"
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
            "insight": "\"Mobile payments and digital ID. Nothing else matters.\""
          },
          {
            "phase": 4,
            "insight": "Barely notices the bank. That's a good thing."
          },
          {
            "phase": 5,
            "insight": "\"Revolut was easier on day one.\""
          }
        ],
        "friction": [
          "Long KYC process",
          "No 24/7 chat support"
        ],
        "opportunity": "Frictionless digital onboarding. App first."
      },
      {
        "id": "planeringsentusiasten",
        "name": "The Planner",
        "emoji": "📊",
        "color": 1,
        "share": 18,
        "tagline": "Wants to keep track of every penny",
        "desc": "Actively uses the bank's budgeting tool. Compares rates and ways to save.",
        "tags": [
          "Budgeting tool",
          "Savings plans",
          "Loan calculator"
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
            "insight": "\"Their rate was the best. I did the maths.\""
          },
          {
            "phase": 4,
            "insight": "The budgeting app is OK but lacks categorisation."
          },
          {
            "phase": 4,
            "insight": "\"Klarna had better insights. That bothers me.\""
          }
        ],
        "friction": [
          "The budgeting tool is weak",
          "No automatic categorisation"
        ],
        "opportunity": "Financial insights + an AI budgeting coach."
      },
      {
        "id": "trygghetsokaren",
        "name": "The Security Seeker",
        "emoji": "🛡️",
        "color": 2,
        "share": 25,
        "tagline": "Chooses stability and security",
        "desc": "Has had the same bank for 20 years. Would rather call than use the app.",
        "tags": [
          "Prefers the phone",
          "Long-term loyalty",
          "Saves the traditional way"
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
            "insight": "\"I don't switch banks. I've been with them since 1998.\""
          },
          {
            "phase": 3,
            "insight": "It takes time, but I understand why they check."
          },
          {
            "phase": 4,
            "insight": "\"The adviser recognised me straight away.\""
          }
        ],
        "friction": [
          "Digital services too complex",
          "The app asks too much"
        ],
        "opportunity": "Hybrid model: digital + human advice."
      },
      {
        "id": "neobank_hoppar",
        "name": "The Neobank Hopper",
        "emoji": "🔄",
        "color": 3,
        "share": 15,
        "tagline": "Always ready to switch to something better",
        "desc": "Uses 3–4 banking apps at once. Switches fast if an offer is better.",
        "tags": [
          "Revolut",
          "Klarna",
          "Comparison sites"
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
            "insight": "\"They had 0% foreign fees. Of course I tried them.\""
          },
          {
            "phase": 4,
            "insight": "\"The app is worse than Revolut. Already disappointed.\""
          },
          {
            "phase": 5,
            "insight": "\"Took 10 minutes to close. Could have been 1.\""
          }
        ],
        "friction": [
          "Onboarding too slow",
          "Rates not competitive"
        ],
        "opportunity": "Instant onboarding. Transparent offers."
      }
    ],
    "touchpoints": [
      [
        {
          "name": "Google / comparison sites",
          "sat": "–",
          "note": "External research"
        },
        {
          "name": "Friends & family",
          "sat": "–",
          "note": "Recommendation"
        },
        {
          "name": "Bank landing page",
          "sat": "3.8",
          "note": "42% bounce rate ⚠️"
        }
      ],
      [
        {
          "name": "Rate comparison page",
          "sat": "3.6",
          "note": "Main decision point"
        },
        {
          "name": "App Store page",
          "sat": "3.8",
          "note": "Preview"
        },
        {
          "name": "Customer reviews",
          "sat": "–",
          "note": "Trustpilot and others"
        }
      ],
      [
        {
          "name": "KYC process",
          "sat": "2.9",
          "note": "Takes 3–5 days ⚠️"
        },
        {
          "name": "Digital ID check",
          "sat": "4.1",
          "note": "Fastest step"
        },
        {
          "name": "Card order",
          "sat": "3.4",
          "note": "7–10 day wait"
        },
        {
          "name": "Mobile payments setup",
          "sat": "4.0",
          "note": "Most important step"
        }
      ],
      [
        {
          "name": "Activate card",
          "sat": "3.8",
          "note": "68% on day 1"
        },
        {
          "name": "Connect mobile payments",
          "sat": "4.2",
          "note": "82% on day 1"
        },
        {
          "name": "Digital ID setup",
          "sat": "4.4",
          "note": "Smoothest moment"
        },
        {
          "name": "Direct debit setup",
          "sat": "3.6",
          "note": "54% by day 7"
        }
      ],
      [
        {
          "name": "Check balance / transactions",
          "sat": "4.0",
          "note": "22 sessions/month"
        },
        {
          "name": "Send a payment",
          "sat": "4.5",
          "note": "Daily use"
        },
        {
          "name": "Budgeting tool",
          "sat": "3.1",
          "note": "Underrated ⚠️"
        },
        {
          "name": "Contact support",
          "sat": "3.0",
          "note": "38 min wait ⚠️"
        },
        {
          "name": "Rate offers",
          "sat": "3.4",
          "note": "Rarely proactive"
        }
      ],
      [
        {
          "name": "Compare competitor",
          "sat": "–",
          "note": "Trigger: better rate"
        },
        {
          "name": "Switching process",
          "sat": "2.8",
          "note": "3 days + a form ⚠️"
        },
        {
          "name": "Exit survey",
          "sat": "–",
          "note": "22% respond"
        },
        {
          "name": "Retention offer",
          "sat": "3.2",
          "note": "Reactive, not proactive"
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
        "name": "Bank landing page",
        "gap": -14,
        "type": "crit",
        "effort": 2,
        "reward": 4,
        "desc": "42% bounce rate. The landing page doesn't convert customers who are comparing."
      },
      {
        "phase": 2,
        "pos": 0.3,
        "name": "Rate comparison page",
        "gap": -16,
        "type": "crit",
        "effort": 2,
        "reward": 4,
        "desc": "Customers find better rates elsewhere. A proactive comparison view is needed."
      },
      {
        "phase": 2,
        "pos": 0.7,
        "name": "App Store page",
        "gap": -10,
        "type": "watch",
        "effort": 1,
        "reward": 2,
        "desc": "3.8 on average. Negative reviews about KYC dominate."
      },
      {
        "phase": 3,
        "pos": 0.3,
        "name": "KYC process",
        "gap": -26,
        "type": "crit",
        "effort": 3,
        "reward": 5,
        "desc": "A 3–5 day wait. The biggest negative gap. Digital KYC with digital ID solves it."
      },
      {
        "phase": 3,
        "pos": 0.7,
        "name": "Card order",
        "gap": -18,
        "type": "crit",
        "effort": 3,
        "reward": 4,
        "desc": "7–10 days is unacceptable. Digital card on day 1, physical card on day 3."
      },
      {
        "phase": 4,
        "pos": 0.5,
        "name": "Connect mobile payments",
        "gap": 8,
        "type": "quick",
        "effort": 1,
        "reward": 3,
        "desc": "Mobile payments setup over-delivers. Make it a clear priority in activation."
      },
      {
        "phase": 4,
        "pos": 0.7,
        "name": "Budgeting tool",
        "gap": -20,
        "type": "crit",
        "effort": 3,
        "reward": 5,
        "desc": "3.1 in satisfaction. Competitors (Klarna, Revolut) offer better insights."
      },
      {
        "phase": 4,
        "pos": 0.9,
        "name": "Support (38 min wait)",
        "gap": -24,
        "type": "crit",
        "effort": 3,
        "reward": 4,
        "desc": "A 38-minute wait is the industry's weakest point. AI chat solves 60%."
      },
      {
        "phase": 5,
        "pos": 0.4,
        "name": "Switching process",
        "gap": -22,
        "type": "crit",
        "effort": 3,
        "reward": 3,
        "desc": "3 days and a form to switch. Instant switching is table stakes in 2026."
      }
    ]
  },
  "insurance": {
    "id": "insurance",
    "name": "Insurer",
    "industry": "Insurance · P&C",
    "emoji": "🛡️",
    "description": "Property and casualty insurance for personal customers: home, car, travel and health.",
    "stats": {
      "customers": "12,400",
      "nps": "28",
      "retention": "78%",
      "interviews": "95",
      "appstore": "3.5"
    },
    "phases": [
      {
        "name": "Insurance need",
        "sub": "Life event"
      },
      {
        "name": "Research",
        "sub": "Compare & choose"
      },
      {
        "name": "Buy a policy",
        "sub": "Becoming a customer"
      },
      {
        "name": "Activation",
        "sub": "Confirmation & app"
      },
      {
        "name": "Claim",
        "sub": "Moment of truth"
      },
      {
        "name": "Renewal / churn",
        "sub": "Annual renewal"
      }
    ],
    "emotionCards": [
      {
        "emotion": "Stressed and unsure",
        "sentiment": "neg",
        "quote": "\"What does it actually cover? I didn't read the small print.\"",
        "moment": "Need arises"
      },
      {
        "emotion": "Overwhelmed by options",
        "sentiment": "mixed",
        "quote": "\"They all look the same. How am I supposed to know?\"",
        "moment": "Policy chosen"
      },
      {
        "emotion": "Sceptical: too easy?",
        "sentiment": "mixed",
        "quote": "\"That was too quick. Am I really covered?\"",
        "moment": "Bought online"
      },
      {
        "emotion": "Relieved but passive",
        "sentiment": "mixed",
        "quote": "\"I have the app but never open it. Should I?\"",
        "moment": "Policy document"
      },
      {
        "emotion": "Frustrated and vulnerable",
        "sentiment": "neg",
        "quote": "\"Three weeks and four calls. Still no answer.\"",
        "moment": "Claim"
      },
      {
        "emotion": "Price-sensitive and tired",
        "sentiment": "neg",
        "quote": "\"My premium went up 18%. I'm calling a competitor tomorrow.\"",
        "moment": "Renewal letter"
      }
    ],
    "segments": [
      {
        "id": "alla",
        "label": "All customers"
      },
      {
        "id": "premium",
        "label": "Premium plan"
      },
      {
        "id": "ny",
        "label": "New customer <1 year"
      },
      {
        "id": "lojal",
        "label": "Loyal 5+ years"
      },
      {
        "id": "risk",
        "label": "High churn risk"
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
        "rev": "4,200",
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
        "rev": "8,900",
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
        "rev": "2,800",
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
        "rev": "5,400",
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
        "rev": "3,100",
        "adopt": "1.8",
        "scost": "280"
      }
    },
    "personas": [
      {
        "id": "prisjagaren",
        "name": "The Price Hunter",
        "emoji": "💰",
        "color": 0,
        "share": 38,
        "tagline": "Always ready to switch if it's cheaper",
        "desc": "Compares every year on comparison sites. Switches if the premium rises more than 5%.",
        "tags": [
          "Comparison sites",
          "Switches yearly",
          "Price-sensitive"
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
            "insight": "\"The comparison site showed one 800 kr cheaper. Obviously.\""
          },
          {
            "phase": 5,
            "insight": "\"Took 3 weeks to get paid out. Never again.\""
          },
          {
            "phase": 5,
            "insight": "\"The premium went up. I switched the next day.\""
          }
        ],
        "friction": [
          "Premium increases without explanation",
          "Slow claims handling"
        ],
        "opportunity": "Price guarantee + instant claim payouts."
      },
      {
        "id": "trygghetsmotorn",
        "name": "The Security Seeker",
        "emoji": "🏠",
        "color": 1,
        "share": 28,
        "tagline": "Wants to sleep well at night",
        "desc": "Buys the broadest cover. Rarely switches but expects fast support with a claim.",
        "tags": [
          "Full cover",
          "Values availability",
          "Loyal"
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
            "insight": "\"I chose the most expensive one. I don't want to take chances.\""
          },
          {
            "phase": 4,
            "insight": "\"The policy document was clear. It reassured me.\""
          },
          {
            "phase": 4,
            "insight": "\"The claim took 4 weeks. It destroyed all my trust.\""
          }
        ],
        "friction": [
          "Slow claims handling destroys loyalty",
          "Support not available in the evening"
        ],
        "opportunity": "24/7 support + fast claims handling."
      },
      {
        "id": "digitala_nativa",
        "name": "The Digital Native",
        "emoji": "📱",
        "color": 2,
        "share": 20,
        "tagline": "Everything should be doable in the app",
        "desc": "Expects everything to be digital. Frustrated by paper and long handling times.",
        "tags": [
          "No paper",
          "Fast onboarding",
          "Push notifications"
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
            "insight": "\"Bought it in 4 minutes in the app. Impressed.\""
          },
          {
            "phase": 3,
            "insight": "\"Making a claim means I have to call. In 2026?!\""
          },
          {
            "phase": 5,
            "insight": "\"I wanted to renew in the app but couldn't.\""
          }
        ],
        "friction": [
          "Claims need a phone call",
          "Renewal not digital"
        ],
        "opportunity": "Fully digital claims + renewal in the app."
      },
      {
        "id": "familjeplaneraren",
        "name": "The Family Planner",
        "emoji": "👨‍👩‍👧",
        "color": 3,
        "share": 14,
        "tagline": "Wants the right protection for the family",
        "desc": "Wants one package that covers the whole family. Values advice and bundles.",
        "tags": [
          "Bundled insurance",
          "Child insurance",
          "Advice"
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
            "insight": "\"We had a baby. I decided to review everything.\""
          },
          {
            "phase": 2,
            "insight": "\"The adviser helped me pick the right package.\""
          },
          {
            "phase": 4,
            "insight": "\"The bike claim took longer than expected.\""
          }
        ],
        "friction": [
          "No clear family package in the app",
          "Advice hard to book online"
        ],
        "opportunity": "Family package + booking advice in the app."
      }
    ],
    "touchpoints": [
      [
        {
          "name": "Google 'home insurance'",
          "sat": "–",
          "note": "External search"
        },
        {
          "name": "Comparison site",
          "sat": "–",
          "note": "Main channel"
        },
        {
          "name": "Tips from friends / employer",
          "sat": "–",
          "note": "Word of mouth"
        }
      ],
      [
        {
          "name": "Product page / terms",
          "sat": "3.2",
          "note": "Hard to read ⚠️"
        },
        {
          "name": "Premium calculator",
          "sat": "3.8",
          "note": "Key conversion"
        },
        {
          "name": "Comparison table",
          "sat": "3.4",
          "note": "Often too complex"
        }
      ],
      [
        {
          "name": "Online purchase flow",
          "sat": "3.6",
          "note": "Drop-off: 28% ⚠️"
        },
        {
          "name": "Digital ID signing",
          "sat": "4.2",
          "note": "Fastest step"
        },
        {
          "name": "Choosing cover",
          "sat": "3.0",
          "note": "Confusion about add-ons ⚠️"
        }
      ],
      [
        {
          "name": "Policy document (email)",
          "sat": "3.5",
          "note": "Often unread"
        },
        {
          "name": "App download",
          "sat": "3.4",
          "note": "42% download it"
        },
        {
          "name": "Digital policy folder",
          "sat": "3.6",
          "note": "Underrated"
        }
      ],
      [
        {
          "name": "Claim (phone)",
          "sat": "2.4",
          "note": "38 min wait ⚠️"
        },
        {
          "name": "Claim (app)",
          "sat": "3.2",
          "note": "Only 28% use it"
        },
        {
          "name": "Claims handling",
          "sat": "2.6",
          "note": "Median 18 days ⚠️"
        },
        {
          "name": "Payout",
          "sat": "3.0",
          "note": "Timing often unclear"
        }
      ],
      [
        {
          "name": "Renewal letter",
          "sat": "2.8",
          "note": "Premium increase not explained ⚠️"
        },
        {
          "name": "Renew online",
          "sat": "3.2",
          "note": "Only 54% can"
        },
        {
          "name": "Retention call",
          "sat": "3.4",
          "note": "Reactive, too late"
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
        "name": "Product page / terms",
        "gap": -18,
        "type": "crit",
        "effort": 3,
        "reward": 4,
        "desc": "The terms are unreadable. Plain language + an interactive cover comparison."
      },
      {
        "phase": 2,
        "pos": 0.4,
        "name": "Online purchase flow",
        "gap": -16,
        "type": "crit",
        "effort": 2,
        "reward": 5,
        "desc": "28% drop-off. Simplify choices + save progress."
      },
      {
        "phase": 2,
        "pos": 0.8,
        "name": "Choosing cover",
        "gap": -20,
        "type": "crit",
        "effort": 2,
        "reward": 4,
        "desc": "Confusion about add-ons. An interactive 'What happens if...' guide."
      },
      {
        "phase": 3,
        "pos": 0.5,
        "name": "App download",
        "gap": -14,
        "type": "watch",
        "effort": 1,
        "reward": 3,
        "desc": "58% never download the app. A day-1 notification with an onboarding guide."
      },
      {
        "phase": 4,
        "pos": 0.2,
        "name": "Claim (phone)",
        "gap": -28,
        "type": "crit",
        "effort": 3,
        "reward": 5,
        "desc": "A 38-minute wait. The biggest gap in the whole journey. App-based first notice of loss solves it."
      },
      {
        "phase": 4,
        "pos": 0.5,
        "name": "Handling time (18 days)",
        "gap": -24,
        "type": "crit",
        "effort": 3,
        "reward": 5,
        "desc": "The industry's worst point. Real-time status tracking cuts frustration by 40%."
      },
      {
        "phase": 5,
        "pos": 0.3,
        "name": "Renewal letter",
        "gap": -22,
        "type": "crit",
        "effort": 2,
        "reward": 5,
        "desc": "Unexplained premium increases trigger 60% of churn. Communicate proactively."
      },
      {
        "phase": 5,
        "pos": 0.7,
        "name": "Renew online",
        "gap": -16,
        "type": "crit",
        "effort": 2,
        "reward": 4,
        "desc": "46% can't renew online. Still needs a phone call in 2026."
      }
    ]
  },
  "grocery": {
    "id": "grocery",
    "name": "Grocery",
    "industry": "Grocery · Retail",
    "emoji": "🛒",
    "description": "The grocery customer journey: store, app, home delivery and loyalty club.",
    "stats": {
      "customers": "245,000",
      "nps": "45",
      "retention": "82%",
      "interviews": "140",
      "appstore": "4.1"
    },
    "phases": [
      {
        "name": "Planning",
        "sub": "Shopping list & recipes"
      },
      {
        "name": "Choosing a channel",
        "sub": "Store vs online"
      },
      {
        "name": "Shopping",
        "sub": "Store or delivery"
      },
      {
        "name": "Checkout / delivery",
        "sub": "Pay & receive"
      },
      {
        "name": "Loyalty",
        "sub": "Loyalty club & offers"
      },
      {
        "name": "Switching store",
        "sub": "Lost customer"
      }
    ],
    "emotionCards": [
      {
        "emotion": "Stressed and without a plan",
        "sentiment": "mixed",
        "quote": "\"What are we eating this week? No idea.\"",
        "moment": "Need to shop"
      },
      {
        "emotion": "Creature of habit",
        "sentiment": "mixed",
        "quote": "\"I always go to the supermarket on the square. Not sure why.\"",
        "moment": "Channel chosen"
      },
      {
        "emotion": "Frustrated by queues",
        "sentiment": "neg",
        "quote": "\"20 minutes in the queue for 8 items. Never again on a Friday.\"",
        "moment": "In the store"
      },
      {
        "emotion": "Relieved or disappointed",
        "sentiment": "mixed",
        "quote": "\"Checkout was quick, but three items were missing from the delivery.\"",
        "moment": "Checkout / delivery"
      },
      {
        "emotion": "Not paying attention to points",
        "sentiment": "mixed",
        "quote": "\"I collect points but don't really know how many I have.\"",
        "moment": "Loyalty club"
      },
      {
        "emotion": "Tempted by a competitor's deal",
        "sentiment": "neg",
        "quote": "\"The other chain had 20% off meat all week. Hard to resist.\"",
        "moment": "Switching store"
      }
    ],
    "segments": [
      {
        "id": "alla",
        "label": "All customers"
      },
      {
        "id": "premium",
        "label": "Premium member"
      },
      {
        "id": "digital",
        "label": "Online shoppers"
      },
      {
        "id": "lojal",
        "label": "Regular 3+ years"
      },
      {
        "id": "risk",
        "label": "High churn risk"
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
        "rev": "2,840",
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
        "rev": "5,200",
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
        "rev": "3,100",
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
        "rev": "6,800",
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
        "rev": "1,200",
        "adopt": "2.1",
        "scost": "68"
      }
    },
    "personas": [
      {
        "id": "rutinhandlaren",
        "name": "The Routine Shopper",
        "emoji": "🔄",
        "color": 0,
        "share": 44,
        "tagline": "Same store, same day, every week",
        "desc": "Always shops in the same store on the same day. Rarely uses the app. Loyal as long as there's no friction.",
        "tags": [
          "Regular",
          "Friday shopper",
          "No app"
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
            "insight": "\"I always write a list in my notes app. It works.\""
          },
          {
            "phase": 2,
            "insight": "\"I go there because I always have.\""
          },
          {
            "phase": 4,
            "insight": "\"The staff know me. That's worth a lot.\""
          }
        ],
        "friction": [
          "Friday queues",
          "Empty shelves for popular items"
        ],
        "opportunity": "Reserve items + book a checkout slot for regulars."
      },
      {
        "id": "digitala_handlaren",
        "name": "The Digital Shopper",
        "emoji": "📱",
        "color": 1,
        "share": 26,
        "tagline": "Prefers to shop in the app or online",
        "desc": "Shops 70% online. Wants a smooth app, recipe suggestions and fast delivery.",
        "tags": [
          "Home delivery",
          "Meal planning",
          "Recipe-based"
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
            "insight": "\"The app suggests recipes. Saves me time every week.\""
          },
          {
            "phase": 3,
            "insight": "\"3 items were missing. No notification.\""
          },
          {
            "phase": 3,
            "insight": "\"The delivery was 40 minutes late and nobody answered.\""
          }
        ],
        "friction": [
          "Substitutions without notice",
          "Late deliveries without communication"
        ],
        "opportunity": "Real-time tracking + proactive substitution alerts."
      },
      {
        "id": "dealjakaren",
        "name": "The Deal Hunter",
        "emoji": "🏷️",
        "color": 2,
        "share": 18,
        "tagline": "Switches store based on the week's offers",
        "desc": "Has three supermarket apps. Switches every week depending on the offers.",
        "tags": [
          "Matches offers",
          "Coupon collector",
          "Price comparison"
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
            "insight": "\"I always check Thursday's flyers. Then I decide.\""
          },
          {
            "phase": 4,
            "insight": "\"My bonus points weren't counted. Had to call support.\""
          },
          {
            "phase": 5,
            "insight": "\"The other chain had 20% off meat all week.\""
          }
        ],
        "friction": [
          "Offers not personalised enough",
          "Points problems at checkout"
        ],
        "opportunity": "Personalised offers + guaranteed points."
      },
      {
        "id": "halsokonnaren",
        "name": "The Health Enthusiast",
        "emoji": "🥗",
        "color": 3,
        "share": 12,
        "tagline": "Shops organic and healthy",
        "desc": "Buys almost only organic. High spend per visit. Values transparency.",
        "tags": [
          "Organic",
          "Allergy filter",
          "High spend"
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
            "insight": "\"I always look for the organic label. That's key.\""
          },
          {
            "phase": 4,
            "insight": "\"Organic options always in stock. Good.\""
          },
          {
            "phase": 4,
            "insight": "\"I wanted to see the carbon footprint per item. It isn't there.\""
          }
        ],
        "friction": [
          "No carbon labelling",
          "Hard to filter for organic in the app"
        ],
        "opportunity": "Sustainability filter in the app + carbon label per item."
      }
    ],
    "touchpoints": [
      [
        {
          "name": "Recipe inspiration (app/web)",
          "sat": "3.8",
          "note": "34% start here"
        },
        {
          "name": "Weekly offers",
          "sat": "4.0",
          "note": "Key conversion"
        },
        {
          "name": "Shopping list in the app",
          "sat": "3.6",
          "note": "42% go digital"
        }
      ],
      [
        {
          "name": "Store vs home delivery",
          "sat": "3.4",
          "note": "44% choose the store"
        },
        {
          "name": "Delivery booking flow",
          "sat": "3.8",
          "note": "Drop-off: 18%"
        },
        {
          "name": "Click & Collect",
          "sat": "4.0",
          "note": "Fastest growing"
        }
      ],
      [
        {
          "name": "Store layout & signage",
          "sat": "3.6",
          "note": "Finding things = frustration"
        },
        {
          "name": "Product information",
          "sat": "3.4",
          "note": "Allergy / organic info missing ⚠️"
        },
        {
          "name": "Availability",
          "sat": "3.2",
          "note": "Empty shelves ⚠️"
        }
      ],
      [
        {
          "name": "Self-scanning",
          "sat": "4.2",
          "note": "Most popular, 65%"
        },
        {
          "name": "Delivery accuracy",
          "sat": "3.0",
          "note": "Substitutions ⚠️"
        },
        {
          "name": "Digital receipt",
          "sat": "4.1",
          "note": "78% prefer it"
        },
        {
          "name": "Points registration",
          "sat": "3.4",
          "note": "Errors in 12% ⚠️"
        }
      ],
      [
        {
          "name": "Points app",
          "sat": "3.8",
          "note": "68% active"
        },
        {
          "name": "Personalised offers",
          "sat": "3.2",
          "note": "Often irrelevant ⚠️"
        },
        {
          "name": "Premium membership",
          "sat": "4.2",
          "note": "High NPS among premium"
        },
        {
          "name": "Communication (email/push)",
          "sat": "3.0",
          "note": "Too frequent ⚠️"
        }
      ],
      [
        {
          "name": "Competitor's offer",
          "sat": "–",
          "note": "Main churn trigger"
        },
        {
          "name": "Customer service when things go wrong",
          "sat": "2.8",
          "note": "Long wait ⚠️"
        },
        {
          "name": "Reactive retention offer",
          "sat": "3.0",
          "note": "Comes too late"
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
        "name": "Product information (allergy/organic)",
        "gap": -18,
        "type": "crit",
        "effort": 2,
        "reward": 4,
        "desc": "28% miss important product information. Structured data + an allergy filter in the app."
      },
      {
        "phase": 2,
        "pos": 0.7,
        "name": "Availability / empty shelves",
        "gap": -16,
        "type": "crit",
        "effort": 3,
        "reward": 4,
        "desc": "12% of shopping trips hit an empty shelf. Real-time stock data cuts frustration."
      },
      {
        "phase": 3,
        "pos": 0.3,
        "name": "Delivery accuracy (substitutions)",
        "gap": -22,
        "type": "crit",
        "effort": 2,
        "reward": 5,
        "desc": "Substitutions without notice are the biggest negative gap online."
      },
      {
        "phase": 3,
        "pos": 0.7,
        "name": "Points registration (12% errors)",
        "gap": -14,
        "type": "crit",
        "effort": 2,
        "reward": 4,
        "desc": "12% of receipts have points errors. It undermines trust in the loyalty programme."
      },
      {
        "phase": 4,
        "pos": 0.4,
        "name": "Personalised offers",
        "gap": -20,
        "type": "crit",
        "effort": 3,
        "reward": 5,
        "desc": "Offers feel generic. ML-based personalisation gives +18% redemption."
      },
      {
        "phase": 4,
        "pos": 0.7,
        "name": "Communication frequency",
        "gap": -14,
        "type": "watch",
        "effort": 1,
        "reward": 3,
        "desc": "Too many push notifications. A preference centre + smart timing reduce opt-outs."
      },
      {
        "phase": 3,
        "pos": 0.5,
        "name": "Self-scanning",
        "gap": 10,
        "type": "quick",
        "effort": 1,
        "reward": 3,
        "desc": "Self-scanning over-delivers. Promote it more + add a first-time guide."
      }
    ]
  },
  "ehandel": {
    "id": "ehandel",
    "name": "E-commerce",
    "industry": "E-commerce · Fashion & Lifestyle",
    "emoji": "📦",
    "description": "The online shopping journey for fashion and lifestyle: discovery, purchase, delivery and returns.",
    "stats": {
      "customers": "82,000",
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
        "sub": "Compare & choose"
      },
      {
        "name": "Purchase",
        "sub": "Cart & checkout"
      },
      {
        "name": "Delivery",
        "sub": "Waiting & receiving"
      },
      {
        "name": "Return or keep",
        "sub": "Post-purchase"
      },
      {
        "name": "Dormant",
        "sub": "Inactive customer"
      }
    ],
    "emotionCards": [
      {
        "emotion": "Inspired and excited",
        "sentiment": "pos",
        "quote": "\"Saw it on Instagram. Have to have it.\"",
        "moment": "Trigger"
      },
      {
        "emotion": "Torn and hesitant",
        "sentiment": "mixed",
        "quote": "\"The size chart is never right. Should I risk it?\"",
        "moment": "Purchase decision"
      },
      {
        "emotion": "Satisfied but nervous",
        "sentiment": "mixed",
        "quote": "\"Order placed. Now I hope it looks like the picture.\"",
        "moment": "Checkout"
      },
      {
        "emotion": "Impatient and worried",
        "sentiment": "mixed",
        "quote": "\"The parcel is on its way but tracking isn't updating.\"",
        "moment": "Waiting for delivery"
      },
      {
        "emotion": "Disappointed or happy",
        "sentiment": "mixed",
        "quote": "\"It didn't fit at all. At least the return was easy.\"",
        "moment": "Opening the parcel"
      },
      {
        "emotion": "Forgets the brand",
        "sentiment": "neg",
        "quote": "\"Haven't shopped in 4 months. I'll take whatever's cheapest.\"",
        "moment": "Inactivity"
      }
    ],
    "segments": [
      {
        "id": "alla",
        "label": "All customers"
      },
      {
        "id": "premium",
        "label": "VIP / Premium"
      },
      {
        "id": "ny",
        "label": "New customer <3 months"
      },
      {
        "id": "lojal",
        "label": "Loyal 2+ years"
      },
      {
        "id": "risk",
        "label": "Inactive 90+ days"
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
        "rev": "2,200",
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
        "rev": "6,800",
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
        "rev": "1,100",
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
        "rev": "8,200",
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
        "name": "The Trend Hunter",
        "emoji": "✨",
        "color": 0,
        "share": 32,
        "tagline": "First to wear, first to return",
        "desc": "Shops 2–3 times a month. High return rate (45%). Driven by social media and trends.",
        "tags": [
          "Instagram-driven",
          "High return rate",
          "Impulse buys"
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
            "insight": "\"Saw it on TikTok. Bought it within 10 minutes.\""
          },
          {
            "phase": 3,
            "insight": "\"The parcel came the next day! Love it.\""
          },
          {
            "phase": 4,
            "insight": "\"It didn't fit at all. The return was easy, though.\""
          }
        ],
        "friction": [
          "The size guide is rarely right",
          "Returns eat into the margin"
        ],
        "opportunity": "AI size guide + profitability by return pattern."
      },
      {
        "id": "kvalitetsjakaren",
        "name": "The Quality Seeker",
        "emoji": "🏆",
        "color": 1,
        "share": 22,
        "tagline": "Buys rarely but well",
        "desc": "Buys 4–6 times a year with a high order value. Reads every review. Loyal to good brands.",
        "tags": [
          "Reads reviews",
          "Compares materials",
          "Brand loyal"
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
            "insight": "\"Read 40 reviews. Bought it in the end.\""
          },
          {
            "phase": 2,
            "insight": "\"The size guide was spot on. Impressed.\""
          },
          {
            "phase": 4,
            "insight": "\"The delivery was 3 days late without a word.\""
          }
        ],
        "friction": [
          "Unclear material descriptions",
          "Late deliveries without proactive communication"
        ],
        "opportunity": "Detailed product attributes + proactive delivery alerts."
      },
      {
        "id": "bekvamlighetskoparen",
        "name": "The Convenience Shopper",
        "emoji": "🛋️",
        "color": 2,
        "share": 28,
        "tagline": "Wants the right thing, fast and painless",
        "desc": "Buys the same brands and sizes. Wants a fast checkout. Values convenience.",
        "tags": [
          "Saved sizes",
          "One-click checkout",
          "Fast delivery"
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
            "insight": "\"Searched for my favourite jacket. Bought it in 2 minutes.\""
          },
          {
            "phase": 2,
            "insight": "\"Saved size and payment. Super smooth.\""
          },
          {
            "phase": 3,
            "insight": "\"The delivery was 2 days late. Annoying.\""
          }
        ],
        "friction": [
          "Saved preferences don't update",
          "Deliveries not consistently fast"
        ],
        "opportunity": "Persistent cart + guaranteed delivery windows."
      },
      {
        "id": "halbbara_shopparen",
        "name": "The Sustainability-Driven",
        "emoji": "🌿",
        "color": 3,
        "share": 18,
        "tagline": "Fashion without the guilt",
        "desc": "Only buys when production is transparent. Chooses second-hand and sustainable lines.",
        "tags": [
          "Second-hand",
          "Sustainable materials",
          "Transparency"
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
            "insight": "\"Found them through their sustainability report.\""
          },
          {
            "phase": 1,
            "insight": "\"A carbon footprint per product. That's what I want to see.\""
          },
          {
            "phase": 5,
            "insight": "\"The second-hand section is too small.\""
          }
        ],
        "friction": [
          "No sustainability info per product",
          "Second-hand section too small"
        ],
        "opportunity": "Carbon labelling + a bigger second-hand platform."
      }
    ],
    "touchpoints": [
      [
        {
          "name": "Instagram / TikTok",
          "sat": "–",
          "note": "42% of traffic"
        },
        {
          "name": "Home page / campaign",
          "sat": "3.8",
          "note": "Personalisation is key"
        },
        {
          "name": "Email newsletter",
          "sat": "3.4",
          "note": "22% CTR"
        }
      ],
      [
        {
          "name": "Product page",
          "sat": "3.6",
          "note": "Images matter most"
        },
        {
          "name": "Size guide",
          "sat": "2.8",
          "note": "Biggest pain point ⚠️"
        },
        {
          "name": "Customer reviews",
          "sat": "4.2",
          "note": "84% read them"
        },
        {
          "name": "Zoom / 360° image",
          "sat": "3.8",
          "note": "Cuts returns by 18%"
        }
      ],
      [
        {
          "name": "Cart experience",
          "sat": "3.9",
          "note": "Drop-off: 34% ⚠️"
        },
        {
          "name": "Checkout flow",
          "sat": "3.8",
          "note": "One-click most popular"
        },
        {
          "name": "Payment options",
          "sat": "4.3",
          "note": "Klarna matters most"
        },
        {
          "name": "Order confirmation",
          "sat": "4.1",
          "note": "Important for reassurance"
        }
      ],
      [
        {
          "name": "Delivery alerts",
          "sat": "3.2",
          "note": "Not enough ⚠️"
        },
        {
          "name": "Tracking",
          "sat": "3.4",
          "note": "Rarely updated"
        },
        {
          "name": "Delivery accuracy",
          "sat": "3.6",
          "note": "88% on time"
        },
        {
          "name": "Packaging",
          "sat": "4.2",
          "note": "Unboxing moment"
        }
      ],
      [
        {
          "name": "Return label",
          "sat": "4.0",
          "note": "Simple process"
        },
        {
          "name": "Return tracking",
          "sat": "3.2",
          "note": "Rarely updated"
        },
        {
          "name": "Refund",
          "sat": "3.6",
          "note": "Median 5 days"
        },
        {
          "name": "Post-purchase mail",
          "sat": "3.4",
          "note": "Styling tips underrated"
        }
      ],
      [
        {
          "name": "Win-back campaign",
          "sat": "3.2",
          "note": "Usually too generic"
        },
        {
          "name": "Loyalty offer",
          "sat": "3.4",
          "note": "Reactive, not proactive"
        },
        {
          "name": "Opt-down (frequency)",
          "sat": "–",
          "note": "Missing today ⚠️"
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
        "name": "Size guide",
        "gap": -24,
        "type": "crit",
        "effort": 3,
        "reward": 5,
        "desc": "The biggest pain point in the whole journey. An AI size guide based on purchase history cuts returns by 30%."
      },
      {
        "phase": 2,
        "pos": 0.4,
        "name": "Cart drop-off (34%)",
        "gap": -18,
        "type": "crit",
        "effort": 2,
        "reward": 5,
        "desc": "34% leave without buying. Exit intent + a saved cart + a reminder cut drop-off by 12%."
      },
      {
        "phase": 2,
        "pos": 0.8,
        "name": "Klarna / payment options",
        "gap": 8,
        "type": "quick",
        "effort": 1,
        "reward": 3,
        "desc": "Payment over-delivers. Show the payment options more clearly in the cart."
      },
      {
        "phase": 3,
        "pos": 0.3,
        "name": "Delivery alerts",
        "gap": -22,
        "type": "crit",
        "effort": 2,
        "reward": 4,
        "desc": "Customers aren't told about delays. Push notifications + proactive communication."
      },
      {
        "phase": 3,
        "pos": 0.6,
        "name": "Tracking (rarely updated)",
        "gap": -16,
        "type": "crit",
        "effort": 2,
        "reward": 4,
        "desc": "Real-time tracking is table stakes in 2026. A map-based delivery view."
      },
      {
        "phase": 4,
        "pos": 0.3,
        "name": "Return tracking",
        "gap": -14,
        "type": "watch",
        "effort": 1,
        "reward": 3,
        "desc": "Customers worry whether the return arrived. Confirm proactively on day 1."
      },
      {
        "phase": 4,
        "pos": 0.7,
        "name": "Post-purchase communication",
        "gap": -16,
        "type": "crit",
        "effort": 2,
        "reward": 4,
        "desc": "Styling inspiration emails raise repeat purchases by 22%. An underrated channel."
      },
      {
        "phase": 5,
        "pos": 0.4,
        "name": "Win-back campaign (generic)",
        "gap": -20,
        "type": "crit",
        "effort": 2,
        "reward": 5,
        "desc": "Generic win-back campaigns don't work. Personalise based on purchase history."
      },
      {
        "phase": 5,
        "pos": 0.8,
        "name": "Opt-down (missing)",
        "gap": -18,
        "type": "crit",
        "effort": 1,
        "reward": 4,
        "desc": "Customers who churn want fewer emails, not none. There's no opt-down at all."
      }
    ]
  },
  "hotel": {
    "id": "hotel",
    "name": "Hotel",
    "industry": "Hospitality · Hotels",
    "emoji": "🏨",
    "description": "The hotel guest journey: finding and booking a stay, arrival, the stay itself, check-out and coming back.",
    "stats": {
      "customers": "310,000",
      "nps": "41",
      "retention": "34%",
      "interviews": "120",
      "appstore": "4.0"
    },
    "phases": [
      {
        "name": "Inspiration",
        "sub": "Dreaming & comparing"
      },
      {
        "name": "Booking",
        "sub": "Direct or via an OTA"
      },
      {
        "name": "Before arrival",
        "sub": "Confirmation & check-in"
      },
      {
        "name": "The stay",
        "sub": "Room, breakfast & service"
      },
      {
        "name": "Check-out",
        "sub": "Bill & feedback"
      },
      {
        "name": "Coming back",
        "sub": "Loyalty & rebooking"
      }
    ],
    "emotionCards": [
      {
        "emotion": "Curious and hopeful",
        "sentiment": "pos",
        "quote": "\"The pictures look amazing. I can already see myself there.\"",
        "moment": "Looking for a stay"
      },
      {
        "emotion": "Unsure about the price",
        "sentiment": "mixed",
        "quote": "\"Why is it cheaper on the booking site than on the hotel's own page?\"",
        "moment": "Booking"
      },
      {
        "emotion": "Kept in the dark",
        "sentiment": "neg",
        "quote": "\"I got a confirmation and then nothing. Can I check in early?\"",
        "moment": "Before arrival"
      },
      {
        "emotion": "Relaxed and looked after",
        "sentiment": "pos",
        "quote": "\"The room was lovely and the staff knew my name.\"",
        "moment": "During the stay"
      },
      {
        "emotion": "Rushed at the desk",
        "sentiment": "mixed",
        "quote": "\"A queue to check out and a minibar charge I didn't recognise.\"",
        "moment": "Check-out"
      },
      {
        "emotion": "Forgotten",
        "sentiment": "neg",
        "quote": "\"I never heard from them again. Next time I'll just book whatever is cheapest.\"",
        "moment": "Next trip"
      }
    ],
    "segments": [
      {
        "id": "alla",
        "label": "All guests"
      },
      {
        "id": "premium",
        "label": "Suite & premium guests"
      },
      {
        "id": "business",
        "label": "Business travellers"
      },
      {
        "id": "lojal",
        "label": "Loyalty members"
      },
      {
        "id": "risk",
        "label": "One-time guests"
      }
    ],
    "metrics": {
      "alla": {
        "curve": [
          58,
          50,
          46,
          62,
          54,
          38
        ],
        "nps": "41",
        "csat": "4.0",
        "ob": "3.7",
        "ret": "34%",
        "churn": "66%",
        "sess": "3.1",
        "dep": "–",
        "app": "4.0",
        "sup": "3.5",
        "aum": "–",
        "rev": "2,450",
        "adopt": "1.6",
        "scost": "24"
      },
      "premium": {
        "curve": [
          64,
          58,
          60,
          70,
          62,
          48
        ],
        "nps": "58",
        "csat": "4.5",
        "ob": "4.2",
        "ret": "46%",
        "churn": "54%",
        "sess": "4.4",
        "dep": "–",
        "app": "4.3",
        "sup": "4.2",
        "aum": "–",
        "rev": "6,900",
        "adopt": "2.1",
        "scost": "16"
      },
      "business": {
        "curve": [
          54,
          56,
          50,
          56,
          46,
          36
        ],
        "nps": "36",
        "csat": "3.8",
        "ob": "3.9",
        "ret": "52%",
        "churn": "48%",
        "sess": "5.8",
        "dep": "–",
        "app": "4.1",
        "sup": "3.4",
        "aum": "–",
        "rev": "3,300",
        "adopt": "4.2",
        "scost": "22"
      },
      "lojal": {
        "curve": [
          62,
          58,
          56,
          68,
          64,
          50
        ],
        "nps": "62",
        "csat": "4.4",
        "ob": "4.1",
        "ret": "71%",
        "churn": "29%",
        "sess": "6.2",
        "dep": "–",
        "app": "4.4",
        "sup": "4.1",
        "aum": "–",
        "rev": "4,800",
        "adopt": "3.4",
        "scost": "14"
      },
      "risk": {
        "curve": [
          44,
          38,
          32,
          42,
          36,
          24
        ],
        "nps": "12",
        "csat": "3.2",
        "ob": "3.0",
        "ret": "8%",
        "churn": "92%",
        "sess": "0.9",
        "dep": "–",
        "app": "3.3",
        "sup": "2.8",
        "aum": "–",
        "rev": "1,700",
        "adopt": "1.0",
        "scost": "38"
      }
    },
    "personas": [
      {
        "id": "business_traveller",
        "name": "The Business Traveller",
        "emoji": "💼",
        "color": 0,
        "share": 38,
        "tagline": "Books on Monday, sleeps on Tuesday",
        "desc": "Stays two to three nights a month on work trips. Wants fast check-in, good Wi-Fi and receipts that go straight to expenses.",
        "tags": [
          "Mobile check-in",
          "Company rate",
          "Expense receipts"
        ],
        "nps": "36",
        "csat": "3.8",
        "churn": "34%",
        "sess": "5.8",
        "expect": [
          -5,
          10,
          15,
          12,
          18,
          5
        ],
        "deliver": [
          0,
          2,
          -12,
          4,
          -10,
          -4
        ],
        "moments": [
          {
            "phase": 2,
            "insight": "\"I land at 22:00. I just want the key on my phone.\""
          },
          {
            "phase": 3,
            "insight": "\"The Wi-Fi dropped during my video call. Twice.\""
          },
          {
            "phase": 4,
            "insight": "\"I had to ask three times for a receipt with the company details.\""
          }
        ],
        "friction": [
          "No mobile key or express check-in",
          "Receipts that don't fit the expense system"
        ],
        "opportunity": "Mobile check-in with a digital key, and receipts sent straight to the expense tool."
      },
      {
        "id": "leisure_couple",
        "name": "The Weekend Couple",
        "emoji": "🥂",
        "color": 1,
        "share": 27,
        "tagline": "Saves up for a special weekend",
        "desc": "Books one or two treats a year, often for an anniversary. Compares a lot before booking and cares about the little touches.",
        "tags": [
          "Spa & dinner",
          "Special occasion",
          "Compares on OTAs"
        ],
        "nps": "52",
        "csat": "4.3",
        "churn": "58%",
        "sess": "1.8",
        "expect": [
          12,
          5,
          8,
          15,
          5,
          8
        ],
        "deliver": [
          8,
          -6,
          -4,
          10,
          2,
          -12
        ],
        "moments": [
          {
            "phase": 0,
            "insight": "\"We read reviews for a week before we picked this one.\""
          },
          {
            "phase": 3,
            "insight": "\"They had put flowers in the room for our anniversary.\""
          },
          {
            "phase": 5,
            "insight": "\"We'd love to come back, but we never got an offer.\""
          }
        ],
        "friction": [
          "Cheaper prices on booking sites than direct",
          "Nothing after the stay"
        ],
        "opportunity": "Best-price promise for booking direct, and an anniversary offer a year later."
      },
      {
        "id": "family_planner",
        "name": "The Family Planner",
        "emoji": "👨‍👩‍👧",
        "color": 2,
        "share": 21,
        "tagline": "Plans the holiday down to the cot",
        "desc": "Travels with two kids in the school holidays. Needs family rooms, early check-in and clear answers before arrival.",
        "tags": [
          "Family room",
          "School holidays",
          "Many questions"
        ],
        "nps": "34",
        "csat": "3.7",
        "churn": "52%",
        "sess": "2.6",
        "expect": [
          8,
          12,
          18,
          10,
          5,
          5
        ],
        "deliver": [
          2,
          -4,
          -16,
          -2,
          -2,
          -6
        ],
        "moments": [
          {
            "phase": 1,
            "insight": "\"I couldn't see if the room really fits a cot.\""
          },
          {
            "phase": 2,
            "insight": "\"I emailed about early check-in and got no answer.\""
          },
          {
            "phase": 3,
            "insight": "\"The kids' breakfast corner made the morning so much easier.\""
          }
        ],
        "friction": [
          "Unclear room details when booking",
          "No answers to questions before arrival"
        ],
        "opportunity": "A pre-arrival chat and room details that show beds, cots and space."
      },
      {
        "id": "loyal_regular",
        "name": "The Loyal Regular",
        "emoji": "⭐",
        "color": 3,
        "share": 14,
        "tagline": "Always the same chain, if it remembers them",
        "desc": "Gold member who stays 20+ nights a year. Expects to be recognised and that their preferences are already known.",
        "tags": [
          "Gold member",
          "Room preferences",
          "High value"
        ],
        "nps": "64",
        "csat": "4.5",
        "churn": "18%",
        "sess": "8.4",
        "expect": [
          0,
          5,
          10,
          18,
          8,
          15
        ],
        "deliver": [
          4,
          8,
          6,
          10,
          6,
          8
        ],
        "moments": [
          {
            "phase": 3,
            "insight": "\"They remembered I want a high floor and a quiet room.\""
          },
          {
            "phase": 4,
            "insight": "\"Express check-out by app. Done in ten seconds.\""
          },
          {
            "phase": 5,
            "insight": "\"My points expired without warning. That stung.\""
          }
        ],
        "friction": [
          "Preferences not carried between hotels",
          "Points that expire without warning"
        ],
        "opportunity": "One guest profile across all hotels, and reminders before points expire."
      }
    ],
    "touchpoints": [
      [
        {
          "name": "Search & map",
          "sat": "3.9",
          "note": "52% start on a search engine"
        },
        {
          "name": "Photos & reviews",
          "sat": "4.2",
          "note": "Decides the shortlist"
        },
        {
          "name": "Booking sites (OTAs)",
          "sat": "3.8",
          "note": "61% compare here"
        }
      ],
      [
        {
          "name": "Direct booking on the website",
          "sat": "3.4",
          "note": "Drop-off: 41% ⚠️"
        },
        {
          "name": "Price & room comparison",
          "sat": "3.2",
          "note": "Price gap to OTAs ⚠️"
        },
        {
          "name": "Payment & confirmation",
          "sat": "4.0",
          "note": "Works well"
        }
      ],
      [
        {
          "name": "Confirmation email",
          "sat": "3.6",
          "note": "Opened by 82%"
        },
        {
          "name": "Online check-in",
          "sat": "3.1",
          "note": "Used by 18% ⚠️"
        },
        {
          "name": "Questions before arrival",
          "sat": "2.9",
          "note": "Slow replies ⚠️"
        }
      ],
      [
        {
          "name": "Reception & welcome",
          "sat": "4.3",
          "note": "Highest-rated moment"
        },
        {
          "name": "Room & cleaning",
          "sat": "4.1",
          "note": "Key to NPS"
        },
        {
          "name": "Breakfast",
          "sat": "4.2",
          "note": "Often mentioned in reviews"
        },
        {
          "name": "Wi-Fi",
          "sat": "3.0",
          "note": "Top complaint ⚠️"
        }
      ],
      [
        {
          "name": "Check-out at the desk",
          "sat": "3.4",
          "note": "Queues 8 to 10 am ⚠️"
        },
        {
          "name": "Bill & extra charges",
          "sat": "3.2",
          "note": "Disputes in 7% ⚠️"
        },
        {
          "name": "Feedback survey",
          "sat": "3.5",
          "note": "Response rate 14%"
        }
      ],
      [
        {
          "name": "Loyalty programme",
          "sat": "3.6",
          "note": "22% of guests are members"
        },
        {
          "name": "Offers after the stay",
          "sat": "2.8",
          "note": "Generic ⚠️"
        },
        {
          "name": "Review requests",
          "sat": "3.8",
          "note": "Drives new guests"
        }
      ]
    ],
    "expect": [
      60,
      58,
      56,
      66,
      58,
      46
    ],
    "delivery": {
      "alla": [
        58,
        50,
        46,
        62,
        54,
        38
      ],
      "premium": [
        64,
        58,
        60,
        70,
        62,
        48
      ],
      "business": [
        54,
        56,
        50,
        56,
        46,
        36
      ],
      "lojal": [
        62,
        58,
        56,
        68,
        64,
        50
      ],
      "risk": [
        44,
        38,
        32,
        42,
        36,
        24
      ]
    },
    "opportunities": [
      {
        "phase": 1,
        "pos": 0.4,
        "name": "Direct booking drop-off",
        "gap": -20,
        "type": "crit",
        "effort": 3,
        "reward": 5,
        "desc": "41% leave the hotel's own booking flow, often for a booking site with a lower price. A best-price promise and a shorter flow win back margin."
      },
      {
        "phase": 2,
        "pos": 0.5,
        "name": "Silence before arrival",
        "gap": -22,
        "type": "crit",
        "effort": 2,
        "reward": 4,
        "desc": "Guests hear nothing between booking and arrival. A pre-arrival message with check-in, parking and requests cuts calls and lifts the first impression."
      },
      {
        "phase": 2,
        "pos": 0.8,
        "name": "Online check-in",
        "gap": -14,
        "type": "quick",
        "effort": 2,
        "reward": 3,
        "desc": "Only 18% check in online. A clearer link in the confirmation and a digital key would double it."
      },
      {
        "phase": 3,
        "pos": 0.8,
        "name": "Wi-Fi quality",
        "gap": -18,
        "type": "crit",
        "effort": 3,
        "reward": 4,
        "desc": "Wi-Fi is the most common complaint, above all among business travellers."
      },
      {
        "phase": 3,
        "pos": 0.3,
        "name": "Personal welcome",
        "gap": 12,
        "type": "quick",
        "effort": 1,
        "reward": 3,
        "desc": "The welcome over-delivers. Use guest preferences so every hotel can do the same."
      },
      {
        "phase": 4,
        "pos": 0.5,
        "name": "Bill disputes",
        "gap": -12,
        "type": "watch",
        "effort": 2,
        "reward": 3,
        "desc": "7% question a charge at check-out. Showing the bill in the app during the stay removes most of them."
      },
      {
        "phase": 5,
        "pos": 0.5,
        "name": "Win-back after the stay",
        "gap": -24,
        "type": "crit",
        "effort": 3,
        "reward": 5,
        "desc": "66% never come back. A personal offer based on why they travelled is the biggest lever on revenue."
      }
    ]
  }
};
