import { TEAM } from "./team";

// The group page (/group): pillars, capabilities, cases and partners.

export interface Pillar {
  title: string;
  lead: string;
  body: string;
}

export interface Capability {
  title: string;
  description: string;
}

export interface GroupCase {
  title: string;
  description: string;
}

export const pillars: Pillar[] = [
  {
    title: "Growth",
    lead: "We scale your business, accelerate growth and reach your targets.",
    body: "We secure the people you need to scale. We recruit and mobilize top talent, from high-impact consultants to permanent hires. We deliver senior consultants, interim leadership, talent acquisition, and flexible teams.",
  },
  {
    title: "Change",
    lead: "We set up your organization for the future and develop your ways of working for maximum value.",
    body: "We design and implement modern structure, culture, and leadership that drives continuous growth and value. We transform and simplify to an adaptive, product-focused approach with purposeful ways of working.",
  },
  {
    title: "Expertise",
    lead: "We provide you with rapid access to the cutting-edge expertise required to solve complex problems.",
    body: "We deliver in-depth, hands-on expertise in product, design, research, and leadership. We coach and embed. We do training and workshops. We love to share our knowledge. We leave you with deeper knowledge and new skills.",
  },
];

export const capabilities: Capability[] = [
  {
    title: "Product & design leadership",
    description: "Support with direction, decision-making, and modern ways of working.",
  },
  {
    title: "Consulting & interim",
    description: "Specialist consultants within product, design, research, marketing, and leadership.",
  },
  {
    title: "Recruitment & talent matching",
    description: "High-quality recruitment and curated matching of independent contractors.",
  },
  {
    title: "Capability building",
    description: "Coaching, training, and development for teams and leaders.",
  },
  {
    title: "Change & transformation",
    description: "Shifts in culture, organization, and ways of working — from project to product, from output to outcome.",
  },
];

export const cases: GroupCase[] = [
  {
    title: "Mentimeter — Building a foundation of scalable design",
    description: "Interim Design Director: design foundations, design system, content, accessibility, and a unified design language across the organization.",
  },
  {
    title: "Blocket — Driving Outcomes",
    description: "We shifted a core division from a project mindset to a high-impact, product-driven organization focused on measurable results.",
  },
  {
    title: "Hubexo — High-Value Search",
    description: "Targeted recruitment of a Head of Design, strengthening internal product and creative leadership.",
  },
  {
    title: "Clarity for Leaders",
    description: "Coaching for Product and Design Leaders, turning complex decisions into clear direction and actionable next steps.",
  },
];

export const partners = [
  "Blocket",
  "Mentimeter",
  "Hubexo",
  "Aira",
  "Scandic Hotels",
  "HSB",
  "Stealth AI Research Startup",
] as const;

// The SeventyOne Group landing page (/cases/71collective): the companies,
// the headline words and the people network.

export interface Talent {
  title: string;
  text: string;
}

export interface GroupCompany {
  id: string;
  name: string;
  role: string;
  tagline: string;
  intro: string;
  talents: Talent[];
  url: string;
  /** How the company sounds, for the Ask us chat. */
  voice: string;
}

export const GROUP_COMPANIES: GroupCompany[] = [
  {
    id: "seventyone-consulting",
    name: "SeventyOne Consulting",
    role: "Leadership & change",
    tagline: "We help people and organisations grow.",
    intro:
      "Driven consultants with great integrity who build lasting capability in product, design and leadership, from startups to public authorities.",
    talents: [
      {
        title: "Theory that works in reality",
        text: "Simple principles rather than ready-made frameworks. We experiment, test and keep what works.",
      },
      {
        title: "Leading change",
        text: "Interim managers, change leaders and agile coaches who have led change journeys in hard situations.",
      },
      {
        title: "Through the AI shift",
        text: "AI as a lever for innovation, not an end in itself, with the organisation and its people along for the ride.",
      },
      {
        title: "Training that sticks",
        text: "From short workshops to tailored programmes in product and design leadership.",
      },
    ],
    url: "https://seventyoneconsulting.se/",
    voice:
      "Warm, grounded and values-driven. Calm authority without buzzwords. Talks about people, learning, safety and making theory work in reality. Full, unhurried sentences, a friendly \"we\", no exclamation marks.",
  },
  {
    id: "studio-manfred",
    name: "Studio Manfred",
    role: "Design & customer insight",
    tagline: "Making the product world more customer driven.",
    intro:
      "Product, UX and service designers, researchers and design leaders, bringing smart work, sharp thinking and a bit of fun.",
    talents: [
      {
        title: "Customer research",
        text: "We get close to customers and turn what we learn into decisions teams can act on.",
      },
      {
        title: "Product, UX and service design",
        text: "From discovery to shipped experience, across product teams, scale-ups and large organisations.",
      },
      {
        title: "Design leadership",
        text: "Heads of design and design ops when you need them, to set direction and grow the craft.",
      },
      {
        title: "Manfred Magic",
        text: "Long relationships, real impact, and a team people enjoy working with.",
      },
    ],
    url: "https://studiomanfred.com/",
    voice:
      "Playful, confident and a little cheeky. Likes short rhetorical questions answered in a word or two (\"Customer research? Of course.\"). Smart but never stiff, light humour, customers at the centre. At most one emoji.",
  },
  {
    id: "mather-studio",
    name: "Mather Studio",
    role: "Talent & matching",
    tagline: "Great people, perfectly matched.",
    intro:
      "A curated network of top-tier independent contractors and senior talent in product, design and communication.",
    talents: [
      {
        title: "The right match",
        text: "Beyond skills on paper: culture, personality, ambition and drive.",
      },
      {
        title: "Impact from day one",
        text: "Senior independents ready to step in and make a difference straight away.",
      },
      {
        title: "Embedded recruitment",
        text: "We step into your team and run recruitment hands-on, with senior focus and pace.",
      },
      {
        title: "Retained search",
        text: "Focused search for key roles, handled end to end with quality and precision.",
      },
    ],
    url: "https://www.matherstudio.se/",
    voice:
      "Minimal, punchy and editorial. Fragments and short declarative lines. The first line may be a headline in CAPITALS. No fuss, no fluff: people, fit, drive, speed. Three or four short lines at most.",
  },
];

export const GROUP_INTRO = "We are";
export const GROUP_LEAD = "We grow through differences";

export interface GroupWord {
  word: string;
  company: GroupCompany["id"];
}

export const GROUP_WORDS: GroupWord[] = [
  { word: "TALENT", company: "mather-studio" },
  { word: "DESIGN", company: "studio-manfred" },
  { word: "PRODUCT", company: "seventyone-consulting" },
  { word: "PEOPLE", company: "mather-studio" },
  { word: "DATA", company: "studio-manfred" },
  { word: "LEADERSHIP", company: "seventyone-consulting" },
  { word: "NETWORK", company: "mather-studio" },
  { word: "RESEARCH", company: "studio-manfred" },
  { word: "TRANSFORMATION", company: "seventyone-consulting" },
];

export const GROUP_SKILLS = ["Product", "Design", "Research", "Leadership", "Agile & change", "Talent"] as const;
export type GroupSkill = (typeof GROUP_SKILLS)[number];

export interface GroupPerson {
  name: string;
  role: string;
  photo: string;
  company: string;
  skills: GroupSkill[];
  bio?: string;
  profile?: string;
}

const S71 = "seventyone-consulting";
const s71Profile = (slug: string) => `https://www.seventyoneconsulting.se/kontakt/${slug}`;
const MANFRED_SKILLS: Record<string, GroupSkill[]> = {
  "Selma Hallqvist": ["Design"],
  "Moa Bogren": ["Research"],
  "Jens Wedin": ["Design", "Leadership"],
  "Markus Dahlbom": ["Design"],
};

// Everyone in the group, A to Z, for the People cards and their skill filter.
// SeventyOne's site names no roles, so theirs are summarised from each
// profile page on seventyoneconsulting.se; the bio is the first two sentences
// of that page, and the photos come from the site (public/group/people/).
// Manfred is the website team, which has no bios yet.
export const GROUP_PEOPLE: GroupPerson[] = (
  [
    {
      name: "Fredrik Göth", role: "Product Lead & Product Coach", photo: "/group/people/s71-fredrik-goth.jpg", company: S71, skills: ["Product"],
      bio: "Fredrik är en erfaren och engagerad produktledare som under de senaste 15 åren ägnat sig åt att utveckla digitala produkter. Han har erfarenhet av att jobba i stora och medelstora organisationer, både i Scale-ups och mer etablerade miljöer.",
      profile: s71Profile("fredrik-goth"),
    },
    {
      name: "Håkan Appelgren", role: "Agile Coach & Change Leader", photo: "/group/people/s71-hakan-appelgren.jpg", company: S71, skills: ["Agile & change", "Leadership"],
      bio: "Genom erfarenheter från chefs- och ledarroller, och med en bakgrund som utvecklare och projektledare, har Håkan med sin djupa förståelse för agilt och lean arbetat mycket med förändring och coachning av organisationer. Han drivs av mötet med människor, genomföra förändringar och att skapa en bättre möjlighet för företag att skapa fantastiska produkter och tjänster.",
      profile: s71Profile("hakan-appelgren"),
    },
    {
      name: "Nhan Ngo", role: "Product Manager", photo: "/group/people/s71-nhan-ngo.jpg", company: S71, skills: ["Product"],
      bio: "Nhan har jobbat som Product Manager med en stor variation av tekniker och produkter, som Webb, Mobil och Machine Learning. Hon brinner för problemlösning och motiveras av att ta itu användarproblem eller att skapa bättre användarupplevelser.",
      profile: s71Profile("nhan-ngo"),
    },
    {
      name: "Sofia Karlsson", role: "Product Manager & Leader", photo: "/group/people/s71-sofia-karlsson.jpg", company: S71, skills: ["Product", "Leadership"],
      bio: "Sofia är en driven, pragmatisk och lyhörd produkt manager och ledare som har lätt att se till helheten och hitta vad som är viktigast. Hon har jobbat med produktutveckling och ledarskap på både små och stora bolag och brinner för att skapa välpresterande och användarcentrerade team och produkter.",
      profile: s71Profile("sofia-karlsson"),
    },
    {
      name: "David Cederblad", role: "Agile Coach & Interim Manager", photo: "/group/people/s71-david-cederblad.jpg", company: S71, skills: ["Agile & change", "Leadership"],
      bio: "Med en lång bakgrund som konsult har David arbetat i många olika domäner och i flera olika typer av organisationer. Han drivs av att bygga produktorganisationer och coacha team och ledare att samarbeta och leverera värde.",
      profile: s71Profile("david-cederblad"),
    },
    {
      name: "Kristoffer Avci Nåmark", role: "Product Lead", photo: "/group/people/s71-kristoffer-avci-namark.jpg", company: S71, skills: ["Product", "Agile & change"],
      bio: "Kristoffer är en driven produktledare som skapar en miljö där empati och kundcentrerat arbetssätt genomsyrar allt som görs. Han har jobbat med digital produktutveckling i flera organisationer där han har skapat en tydlig vision, högpresterande team och varaktiga relationer.",
      profile: s71Profile("kristoffer-avci-namark"),
    },
    {
      name: "Peter Olovsson", role: "Design Leader, UX & Service Design", photo: "/group/people/s71-peter-olovsson.jpg", company: S71, skills: ["Design", "Leadership"],
      bio: "Peter har lång och gedigen erfarenhet inom designledarskap, UX, tjänstedesign och kundcentrerad affärsutveckling. Han byggt framgångsrika team och organisationer, som skapar produkter, tjänster och erbjudanden som både stärker kundlojaliteten och genererar affärsvärde.",
      profile: s71Profile("peter-olovsson"),
    },
    {
      name: "Moa Bernhardsson", role: "Studio & Partnerships Director", photo: "/group/people/s71-moa-bernhardsson.jpg", company: "mather-studio", skills: ["Talent"],
      bio: "Moa har en djup förståelse för design- och produktlandskapet. Hennes bakgrund sträcker sig från att hjälpa organisationer, digitala byråer, scale-ups och start-ups att hitta och matcha rätt konsulter med rätt behov och utmaningar.",
      profile: s71Profile("moa-bernhardsson"),
    },
    {
      name: "Stefania Tardito", role: "Senior Product Lead", photo: "/group/people/s71-stefania-tardito.jpg", company: S71, skills: ["Product", "Leadership"],
      bio: "Stefania är en senior produktledare med starkt affärsfokus och ett lugnt, tydligt ledarskap. Hon har lång erfarenhet av att arbeta i komplexa digitala miljöer där produkt, teknik och affär behöver samverka för att skapa verklig effekt.",
      profile: s71Profile("stefania-tardito"),
    },
    {
      name: "Johan Damberg", role: "Product Lead & Product Coach", photo: "/group/people/s71-johan-damberg.jpg", company: S71, skills: ["Product", "Agile & change"],
      bio: "Johan är en engagerad produktledare med bakgrund som bland annat produktchef, produktägare, produkt coach och teamledare. Han är en teamspelare som är duktig på att skapa förutsättningar för människor och team att bli snabba och modiga med fokus på ständig förbättring, kundvärde och affär.",
      profile: s71Profile("johan-damberg"),
    },
    ...TEAM.map((m) => ({ ...m, company: "studio-manfred", skills: MANFRED_SKILLS[m.name] ?? [] })),
  ] satisfies GroupPerson[]
).sort((a, b) => a.name.localeCompare(b.name, "sv"));
