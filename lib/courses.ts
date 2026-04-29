export type Instructor = {
  name: string;
  bio: string;
  photo?: string;
};

export type Course = {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  audience: string[];
  curriculum: string[];
  instructors: Instructor[];
  duration: string;
  price: string;
  classSize: string;
  language: string;
  location: string;
  dates: string;
  includes: string;
  cancellation: string;
  note?: string;
  heroImage?: string;
};

export const courses: Course[] = [
  {
    slug: "design-leadership",
    title: "Design Leadership",
    heroImage: "/courses/hero-default.jpg",
    tagline: "Are you design leader, manager or in the transition to become one? You know that design has become a strategic and tactical capability and want to increase the organisational design maturity.",
    description:
      "You know that design has become a strategic and tactical capability and want to increase the organisational design maturity. This one-day training gives you the fundamentals of leading design teams and influencing organisations — whether you lead up, down or sideways.",
    audience: [
      "New and aspiring design leaders",
      "UX leads and senior designers moving into management",
      "Managers and directors from adjacent disciplines",
    ],
    curriculum: [
      "The basics of design leadership and management in creative environments",
      "Leadership principles and mindset for creative teams",
      "Building organisational design capability and maturity",
      "Leading across organisational levels — up, down, sideways",
      "Demonstrating design's strategic value and business impact",
    ],
    instructors: [
      {
        name: "Jens Wedin",
        bio: "20+ years in design and leadership coaching. Founder of Studio Manfred and the Design Leadership Community.",
        photo: "/courses/jens.png",
      },
    ],
    duration: "1 day",
    price: "9 500 SEK (excl. VAT)",
    classSize: "Max 12 participants",
    language: "Swedish (materials in Swedish and English)",
    location: "Central Stockholm",
    dates: "Spring and fall sessions — contact us for current dates",
    includes: "Lunch and coffee breaks",
    cancellation:
      "Free cancellation up to 3 weeks before start. Tickets are transferable.",
  },
  {
    slug: "product-discovery",
    title: "Product Discovery",
    heroImage: "/courses/hero-default.jpg",
    tagline: "Most product and services will never be used or bought. Why build something nobody wants?",
    description:
      "This one-day training teaches practitioners how to validate ideas and assumptions before investing in development. You'll leave with a practical toolkit for continuous discovery and a mindset shift from delivery-first to discovery-first.",
    audience: [
      "Product managers and product owners",
      "Members of product teams",
      "Anyone involved in deciding what to build",
    ],
    curriculum: [
      "Foundational product discovery and delivery principles",
      "Mindset shifts from delivery-focused to discovery-focused thinking",
      "Customer journeys and research methodologies",
      "Impact mapping and assumption validation",
      "Business experimentation techniques",
      "Continuous discovery practices",
    ],
    instructors: [],
    duration: "1 day",
    price: "8 500 SEK (excl. VAT)",
    classSize: "Max 12 participants",
    language: "Swedish (materials in Swedish and English)",
    location: "Central Stockholm",
    dates: "Spring and fall sessions — contact us for current dates",
    includes: "Lunch and fika",
    cancellation:
      "Free cancellation up to 3 weeks before start. Tickets are transferable.",
  },
  {
    slug: "customer-journey-mapping",
    title: "Customer Journey Mapping and Customer-Centricity",
    heroImage: "/courses/hero-default.jpg",
    tagline: "With help of data and customer insights, customer journey mapping and customer-centricity can help you align your team and organisation, and thereby improve the customer experience, create stronger loyalty and a healthier business.",
    description:
      "With the help of data and customer insights, customer journey mapping and customer-centricity can help you align your team and organisation — and thereby improve the customer experience, create stronger loyalty and a healthier business.",
    audience: [
      "Organisational developers and change managers",
      "Product managers and UX designers",
      "Innovation leaders and strategists",
      "Managers seeking to advance customer-centric practices",
    ],
    curriculum: [
      "Service design fundamentals and customer experience basics",
      "Converting data and customer insights into journey maps",
      "Strategic customer journey mapping approaches",
      "Building organisational customer experience capabilities",
      "Creating foundational strategies for customer-centricity",
    ],
    instructors: [],
    duration: "1–2 days",
    price: "7 500 SEK (1 day) / 14 000 SEK (2 days) — excl. VAT",
    classSize: "Max 12 participants",
    language: "Swedish (materials in Swedish and English)",
    location: "Central Stockholm",
    dates: "Spring and fall sessions — contact us for current dates",
    includes: "Lunch and fika",
    cancellation:
      "Free cancellation up to 3 weeks before start. Tickets are transferable.",
  },
  {
    slug: "business-design",
    title: "Business Design",
    heroImage: "/courses/hero-business-design.jpg",
    tagline: "Innovation and business development are more than just theoretical models. Here, you will learn how to use Business Design to improve your business development and innovation work.",
    description:
      "Here you will learn how to use Business Design to improve your business development and innovation work. The course bridges user-centred product thinking with strategic business strategy — applying it to real challenges from your own organisation.",
    audience: [
      "UX and Service Designers seeking strategic impact",
      "Product managers and product owners",
      "IT and enterprise architects",
      "Consultants and organisational developers",
    ],
    curriculum: [
      "Transitioning from product-centric to customer-centric business approaches",
      "Systematic assumption validation while managing risks",
      "Business model development and simplification",
      "Communication strategies with leadership and decision-makers",
      "Hands-on application to your own organisation",
    ],
    instructors: [
      {
        name: "Jens Wedin",
        bio: "20+ years of design experience across enterprises, agencies and government. Founder of Studio Manfred and Design Leadership Community.",
        photo: "/courses/jens.png",
      },
      {
        name: "Jenny Johansson",
        bio: "Business-focused researcher with 25 years' consulting expertise, currently at Adda and lecturer at Linköping University.",
        photo: "/courses/jenny.jpg",
      },
    ],
    duration: "Multi-session",
    price: "14 990 SEK (excl. VAT)",
    classSize: "Max 12 participants",
    language: "Swedish (materials in English)",
    location: "Stockholm",
    dates: "No dates currently scheduled — contact us to register interest",
    includes: "Lunch and fika; all materials",
    cancellation:
      "Full refund if cancelled 3+ weeks before start. Tickets transferable to another participant or future cohort.",
    note: "Past participants include Avanza, Fortnox, Skandia and Systembolaget.",
  },
  {
    slug: "designops",
    title: "DesignOps",
    heroImage: "/courses/hero-default.jpg",
    tagline: "Learn to work with DesignOps in a structured way, where you build, scale and streamline your design organization.",
    description:
      "Learn to work with DesignOps in a structured way. This four-session programme takes you through practical frameworks and case-based learning, and you'll work on real challenges from your own organisation throughout.",
    audience: [
      "Heads of design and UX team leads",
      "DesignOps specialists",
      "Consultants working in design organisation",
    ],
    curriculum: [
      "Communicating design work to organisational stakeholders",
      "DesignOps structural frameworks",
      "Required skills and competencies",
      "Metrics, goals and prioritisation",
      "Design roles and responsibilities",
      "Scaling design organisations",
      "Peer experience sharing",
      "Individual case work from your own organisation",
    ],
    instructors: [
      {
        name: "Jens Wedin",
        bio: "20+ years of design experience. Founder of Studio Manfred and the Design Leadership Community.",
        photo: "/courses/jens.png",
      },
      {
        name: "Monica Enecrona",
        bio: "30 years in design, including leading DesignOps at Skandia.",
        photo: "/courses/monica.png",
      },
    ],
    duration: "4 half-day sessions",
    price: "14 950 SEK (excl. VAT)",
    classSize: "Max 12 participants",
    language: "Swedish (materials in English)",
    location: "Central Stockholm",
    dates: "October sessions available — contact us for exact dates",
    includes: "Templates, tools, methods, a roadmap for your design org, and a diploma on completion",
    cancellation: "Contact us for cancellation policy details.",
  },
  {
    slug: "design-thinking-for-hr",
    title: "Design Thinking for HR",
    heroImage: "/courses/hero-design-thinking-hr.jpg",
    tagline: "Design Thinking for HR will let you apply Design Thinking in your workplace, or lead group exercises that strengthen creative thinking and innovation skills.",
    description:
      "Design Thinking for HR will let you apply Design Thinking in your workplace, or lead group exercises that strengthen creative thinking and innovation skills. You'll learn about its roots in mid-1900s creativity research, the Double Diamond framework, and how to use it practically in HR and organisational contexts.",
    audience: [
      "HR managers and business partners",
      "HR generalists and specialists",
      "Line managers and operations managers",
      "Consulting managers",
    ],
    curriculum: [
      "Complexity theory for problem classification",
      "Psychological safety principles",
      "Design Thinking processes — exploration, definition, solution testing",
      "Practical methods and tools",
      "Case-based exercises",
      "Applicable principles and thought patterns",
    ],
    instructors: [
      {
        name: "Frida Mangen",
        bio: "Agile coach and HR specialist offering consulting and lectures on HR, leadership and change management. Host of the podcast AgilaHRpodden.",
        photo: "/courses/frida.jpg",
      },
      {
        name: "Jens Wedin",
        bio: "20+ years of design experience across corporate, government and consultancy roles. Founder of Studio Manfred and Design Leadership Community.",
        photo: "/courses/jens.png",
      },
    ],
    duration: "1 day (9:00–16:30)",
    price: "7 900 SEK / Early bird 6 700 SEK before Jan 31 (excl. VAT)",
    classSize: "Max 12 participants",
    language: "Swedish",
    location: "Central Stockholm",
    dates: "Contact us for upcoming dates",
    includes: "Lunch and fika",
    cancellation: "Contact us for cancellation policy details.",
  },
  {
    slug: "cx-management",
    title: "CX Management and Specialist",
    heroImage: "/courses/hero-default.jpg",
    tagline: "Integrate customer experience in all processes, strengthen the brand, and retain your existing customers. This course is a two year education held by IHM business school, where we together with House of CX hold a six month class in CX Management.",
    description:
      "This is a two-year education held by IHM Business School, where we together with House of CX hold a six-month class in CX Management. You'll learn to integrate customer experience across all organisational processes, strengthen the brand and retain existing customers.",
    audience: [
      "Customer experience managers and specialists",
      "Marketing and brand managers",
      "Product and service leaders",
    ],
    curriculum: [
      "Integrating CX across organisational processes",
      "Strengthening brand through customer experience",
      "Customer retention strategies",
      "CX Management frameworks and tools",
    ],
    instructors: [],
    duration: "2-year programme (6-month CX Management module)",
    price: "Contact IHM Business School for pricing",
    classSize: "Contact for details",
    language: "Swedish",
    location: "IHM Business School, Stockholm",
    dates: "Contact IHM Business School for upcoming cohorts",
    includes: "Contact for details",
    cancellation: "Contact IHM Business School for details.",
    note: "This course is run in partnership with IHM Business School and House of CX.",
  },
];
