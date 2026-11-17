// How each archetype behaves when it uses a service: the "personality" the
// evaluation leans on. Keyed by persona id from the customer journey data.
// Synthetic, like the rest of the data.

export type Device = "mobile" | "desktop" | "both";

export type Traits = {
  /** 1 = avoids digital services, 5 = expert. */
  digitalSkill: 1 | 2 | 3 | 4 | 5;
  /** 1 = gives up at the first snag, 5 = keeps going. */
  patience: 1 | 2 | 3 | 4 | 5;
  device: Device;
  goals: string[];
  worries: string[];
  /** Access needs that change how the service must work for them. */
  access: string[];
};

export const TRAITS: Record<string, Traits> = {
  // Retail Bank
  bekvamlighetsbanker: {
    digitalSkill: 4, patience: 2, device: "mobile",
    goals: ["Get everyday banking done in seconds", "Never have to call"],
    worries: ["Slow identity checks", "Being sent to a branch"],
    access: ["Uses the app one-handed on the go"],
  },
  planeringsentusiasten: {
    digitalSkill: 4, patience: 4, device: "both",
    goals: ["See where every krona goes", "Compare rates before deciding"],
    worries: ["Hidden fees", "Numbers that don't add up"],
    access: [],
  },
  trygghetsokaren: {
    digitalSkill: 2, patience: 3, device: "desktop",
    goals: ["Feel sure nothing goes wrong", "Reach a person when unsure"],
    worries: ["Making an irreversible mistake", "Jargon and too many steps"],
    access: ["Low vision: zooms text to 200%", "Needs plain language"],
  },
  neobank_hoppar: {
    digitalSkill: 5, patience: 1, device: "mobile",
    goals: ["The best offer, fast", "Onboarding in minutes"],
    worries: ["Long forms", "Rates that hide behind sign-up"],
    access: [],
  },
  // Insurer
  prisjagaren: {
    digitalSkill: 4, patience: 2, device: "both",
    goals: ["See the real price straight away", "Compare cover quickly"],
    worries: ["Premiums that rise without explanation", "Small print"],
    access: [],
  },
  trygghetsmotorn: {
    digitalSkill: 2, patience: 3, device: "desktop",
    goals: ["Know exactly what is covered", "Fast help when something happens"],
    worries: ["Being under-insured", "No one to talk to in a crisis"],
    access: ["Reads slowly and carefully", "Prefers phone support"],
  },
  digitala_nativa: {
    digitalSkill: 5, patience: 2, device: "mobile",
    goals: ["Do everything in the app, including claims"],
    worries: ["Paper forms", "Being told to call"],
    access: [],
  },
  familjeplaneraren: {
    digitalSkill: 3, patience: 3, device: "both",
    goals: ["One package for the whole family", "Advice before choosing"],
    worries: ["Gaps in the children's cover", "Too many options"],
    access: ["Often interrupted: needs to pick up where they left off"],
  },
  // Grocery
  rutinhandlaren: {
    digitalSkill: 2, patience: 3, device: "desktop",
    goals: ["The same shop, the same way, every week"],
    worries: ["Things moving around", "Having to learn something new"],
    access: ["Reading glasses: small text is hard"],
  },
  digitala_handlaren: {
    digitalSkill: 5, patience: 2, device: "mobile",
    goals: ["Plan meals and order in a few taps", "Know when delivery comes"],
    worries: ["Substitutions without notice", "Late deliveries"],
    access: [],
  },
  dealjakaren: {
    digitalSkill: 4, patience: 3, device: "mobile",
    goals: ["Find this week's best offers", "Make sure points count"],
    worries: ["Offers that don't apply at checkout", "Lost bonus points"],
    access: [],
  },
  halsokonnaren: {
    digitalSkill: 4, patience: 4, device: "both",
    goals: ["Filter for organic and allergens", "Know where food comes from"],
    worries: ["Missing allergy information", "Greenwashing"],
    access: ["Dyslexia: long text walls are hard"],
  },
  // E-commerce
  trendjakaren: {
    digitalSkill: 5, patience: 1, device: "mobile",
    goals: ["Get the new thing first", "Easy returns"],
    worries: ["The wrong size", "A slow checkout"],
    access: [],
  },
  kvalitetsjakaren: {
    digitalSkill: 3, patience: 5, device: "desktop",
    goals: ["Read every detail and review before buying"],
    worries: ["Vague material descriptions", "Not knowing when it arrives"],
    access: ["Uses a screen reader part of the time"],
  },
  bekvamlighetskoparen: {
    digitalSkill: 4, patience: 2, device: "mobile",
    goals: ["Reorder the usual in one go", "Fast delivery"],
    worries: ["Saved details that don't stick", "Extra steps at checkout"],
    access: [],
  },
  halbbara_shopparen: {
    digitalSkill: 4, patience: 4, device: "both",
    goals: ["Find sustainable and second-hand options", "Know how things are made"],
    worries: ["No sustainability facts per product", "Greenwashing"],
    access: [],
  },
  // Hotel
  business_traveller: {
    digitalSkill: 4, patience: 1, device: "mobile",
    goals: ["Book and check in without talking to anyone", "Receipts for expenses"],
    worries: ["Queues at the desk", "Bad Wi-Fi"],
    access: ["Books on the move, often one-handed"],
  },
  leisure_couple: {
    digitalSkill: 3, patience: 4, device: "both",
    goals: ["Find a special place and the best price", "The little touches"],
    worries: ["Paying more by booking direct", "Photos that oversell"],
    access: [],
  },
  family_planner: {
    digitalSkill: 3, patience: 3, device: "both",
    goals: ["Know the room fits the whole family", "Answers before arrival"],
    worries: ["Unclear beds and space", "Unanswered questions"],
    access: ["Often interrupted: needs to pick up where they left off"],
  },
  loyal_regular: {
    digitalSkill: 4, patience: 3, device: "both",
    goals: ["Be recognised", "Use points without hassle"],
    worries: ["Preferences that are forgotten", "Points that expire"],
    access: ["Colour blind (red–green)"],
  },
};
