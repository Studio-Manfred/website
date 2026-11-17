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
