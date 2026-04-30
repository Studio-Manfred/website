export type Instructor = {
  name: string;
  bio: string;
  photo?: string;
};

export type ContentBlock =
  | { kind: "text"; heading?: string; text: string }
  | { kind: "list"; heading: string; intro?: string; items: string[] }
  | { kind: "testimonial"; quote: string; author: string }
  | { kind: "alumni"; heading: string; intro?: string; items: string[] }
  | { kind: "fine-print"; items: string[] };

export type Course = {
  slug: string;
  title: string;
  tagline: string;
  content: ContentBlock[];
  instructors: Instructor[];
  heroImage?: string;
  price: string;
  whenAndWhere?: string;
};

export const courses: Course[] = [
  {
    slug: "design-leadership",
    title: "Design Leadership",
    tagline: "Are you design leader, manager or in the transition to become one? You know that design has become a strategic and tactical capability and want to increase the organisational design maturity.",
    content: [
      {
        kind: "text",
        text: "This is a 1 day training, where you will get the basics of what is needed as design leader to both lead up, down and sideways and build capability and design maturity in your organisation.",
      },
      {
        kind: "list",
        heading: "What you will learn",
        intro: "Key areas we will address:",
        items: [
          "The basics in design leadership and management in creative environments",
          "Principles and mindset as design leader",
          "Creating a strategy for building a design capability and increase design maturity",
          "Lead up, down and sideways",
          "Argue for design — value and impact",
        ],
      },
      {
        kind: "list",
        heading: "The education is suitable for",
        intro: "We believe you work as a:",
        items: [
          "New design leader",
          "Design Lead (UX or similar)",
          "Design Manager",
          "Design Director",
        ],
      },
      {
        kind: "fine-print",
        items: [
          "The spots are limited to 12 people. To ensure high quality and as personal as possible, you need to apply for a spot.",
          "Lunch is included, and there will be fika.",
          "All materials will be in Swedish or English, but we will speak Swedish.",
          "Get in touch if you want to send more people from your organization, or if you would like to run this course internally.",
          "You can cancel your participation up to 3 weeks before the course starts at no cost, after which you will pay the full price. Your ticket can be transferred to another person. An invoice will be sent in connection with the course starting. We can cancel or move the course if there are not enough sign-ups.",
        ],
      },
    ],
    instructors: [
      {
        name: "Jens Wedin",
        bio: "Jens has 20+ years of experience of design and worked as a design leader and coached for since 2015. Jens co-founded the first Design Leadership training in Sweden and is the co-founder of Design Leadership Community in Sweden and State of Design Report.",
        photo: "/courses/jens.png",
      },
    ],
    price: "9.500:- exkl tax",
    whenAndWhere: "We will be in centrally located premises in Stockholm. We will return when we know the number of registered participants. Planned dates: Spring: get in touch Fall: get in touch",
  },

  {
    slug: "product-discovery",
    title: "Product Discovery",
    tagline: "Most products and services that are built will never be used or bought by the customers. Why build something that nobody wants?",
    content: [
      {
        kind: "text",
        text: "This is a 1 day training, where you will get the basics about product discovery, why it is important and and a few practical tools to get started.",
      },
      {
        kind: "list",
        heading: "What you will learn",
        intro: "Key areas we will address:",
        items: [
          "The basics in product discovery (and delivery)",
          "Principles and mindset when going from delivery to discovery",
          "Understand the process and the basics of customer journeys, customer research, impact mapping, assumption mapping, business experiments and continuous product discovery",
        ],
      },
      {
        kind: "list",
        heading: "The education is suitable for",
        intro: "We believe you work as a:",
        items: [
          "Product manager or owner",
          "Member of a product team",
        ],
      },
      {
        kind: "fine-print",
        items: [
          "The spots are limited to 12 people. To ensure high quality and as personal as possible, you need to apply for a spot.",
          "Lunch is included, and there will be fika.",
          "All materials will be in Swedish or English, but we will speak Swedish.",
          "Get in touch if you want to send more people from your organization, or if you would like to run this course internally.",
          "You can cancel your participation up to 3 weeks before the course starts at no cost, after which you will pay the full price. Your ticket can be transferred to another person. An invoice will be sent in connection with the course starting. We can cancel or move the course if there are not enough sign-ups.",
        ],
      },
    ],
    instructors: [],
    price: "8.500:- exkl tax",
    whenAndWhere: "We will be in centrally located premises in Stockholm. We will return when we know the number of registered participants. Planned dates: Spring: get in touch Fall: get in touch",
  },

  {
    slug: "customer-journey-mapping",
    title: "Customer journey mapping and customer-centricity",
    tagline: "With help of data and customer insights, customer journey mapping and management can help you understand your customers better, align your team and organisation, and thereby improve the customer experience, create stronger loyalty and a healthier business.",
    content: [
      {
        kind: "text",
        text: "This is a 1 or 2 day training, which alternates theory with practice, where you will learn how you can practically work with customer experience, customer journey mapping and management.",
      },
      {
        kind: "text",
        text: "We have divided the training into 2 days. First day we focus on insights and customer journey mapping, the second day we focus on customer journey management and improving your organizational customer experience capability.",
      },
      {
        kind: "text",
        text: "One of the cornerstones of customer journey mapping is to understand and map the customer's experience with company and organisation over time. The work is often done cross-functionally with help of data and insights, and visualized as a customer journey map.",
      },
      {
        kind: "list",
        heading: "What you will learn",
        intro: "Key areas day 1 will address: First day, we will focus on the the theory of service design and the practically work on creating a customer journey map.",
        items: [
          "The basics in customer experience and service design.",
          "Understand how to go from data, customer interviews and insights to a customer journeys.",
          "Knowledge and how you practically and strategically work with customer journey mapping.",
        ],
      },
      {
        kind: "list",
        heading: "Key areas that day 2 will address:",
        intro: "Second day, we will focus on customer journey management and key areas for building a more mature customer experience capability. This is where we focus on going from ad-hoc work, to a more mature model of of working with customer-centricity.",
        items: [
          "Knowledge how to create a foundation for customer journey management and a organizational insights repository.",
          "Understand how you create a strategy and vision for increasing the customer-centricity in your organisation",
        ],
      },
      {
        kind: "list",
        heading: "The education is suitable for",
        intro: "We believe you work as a:",
        items: [
          "Organizational or business developer",
          "Product manager or owner",
          "UX or Product designer",
          "Innovation or process leader",
          "Strategist or Service Designer",
          "Leader or Manager",
        ],
      },
      {
        kind: "fine-print",
        items: [
          "The spots are limited to 12 people. To ensure high quality and as personal as possible, you need to apply for a spot.",
          "Lunch is included, and there will be fika.",
          "All materials will be in Swedish or English, but we will speak Swedish.",
          "Get in touch if you want to send more people from your organization, or if you would like to run this course internally.",
          "You can cancel your participation up to 3 weeks before the course starts at no cost, after which you will pay the full price. Your ticket can be transferred to another person. An invoice will be sent in connection with the course starting. We can cancel or move the course if there are not enough sign-ups.",
        ],
      },
    ],
    instructors: [],
    price: "This is a one or two day training, and you can choose what days you want attend.\n1 day: 7.500:- exkl tax\n2 days: 14.000:- exkl tax",
    whenAndWhere: "We will be in centrally located premises in Stockholm. We will return when we know the number of registered participants. Planned dates: Spring: get in touch Fall: get in touch",
  },

  {
    slug: "business-design",
    title: "Business Design",
    tagline: "Innovation and business development are more than just theoretical models. Here, you will learn how to use Business Design to improve your business development and innovation work.",
    content: [
      {
        kind: "list",
        heading: "Content",
        intro: "The education will include:",
        items: [
          "How to go from user-centred product development to customer-centric business development and innovation",
          "How to systematically validate assumptions about product, offering, and business ideas while minimizing the largest risks.",
          "How to simplify on how you elaborate on your business model and how you work to find the right business model.",
          "Concrete tools for better communication with management and decision-makers to bring solutions to life and introduce new products and services to the market.",
          "Learning by doing. You will work on a case from your own organization or something you are passionate about. This is to make the education as concrete and relevant as possible for you and your organization.",
        ],
      },
      {
        kind: "list",
        heading: "After the education, you will have:",
        items: [
          "Concrete methods, templates, tools, and experiences that you can start using within your organization.",
          "Experiences from having practised new ways of working and thinking, where you have applied this to your organization's offerings, services, or products.",
          "Knowledge and learnings from working with others in the same situation.",
          "A diploma!",
        ],
      },
      {
        kind: "list",
        heading: "This training is for",
        intro: "We believe that you might:",
        items: [
          "Work with UX or Service Design and want to work more strategically and closer to product and business.",
          "Work as a Product Manager, for example, a PO or PM, and want to raise the work of discovery and roadmap to a more strategic level.",
          "Work as an IT or Enterprise Architect and want to start working more from a business and customer perspective.",
          "Work as a consultant, project manager, business developer, or organizational developer and want to get concrete methods and tools to find new ways of working.",
        ],
      },
      {
        kind: "text",
        text: "The course is aimed at everyone working in product or service companies, in smaller commercial activities, and the public sector. By being able to use the methods and tools in your own business, we ensure that you get as much as possible out of the course and can use what you have learned directly after the course.",
      },
      {
        kind: "testimonial",
        quote: "Fantastic to have such an experienced and knowledgeable course leader. Good level of content, good structure with alternating theory and short exercises. Good to have knowledge and materials gathered. Luxurious also to be part of such a small group where all possibilities were available to ask and bounce questions.",
        author: "Marika - Service Designer, Unionen",
      },
      {
        kind: "alumni",
        heading: "Alumni",
        intro: "Examples of companies that have participated in the training:",
        items: ["Avanza", "The Swedish Public Employment Service", "Fortnox", "Skandia", "Systembolaget", "Unionen"],
      },
      {
        kind: "fine-print",
        items: [
          "The spots are limited to 12 people. To ensure high quality and as personal as possible, you need to apply for a spot.",
          "Lunch and fika are included.",
          "All materials will be in English, but we will speak Swedish.",
          "Get in touch if you want to send more people from your organization, or if you would like to run this course internally.",
          "You can cancel your participation up to 3 weeks before the course starts at no cost, after which you will pay the full price. Your ticket can be transferred to another person or moved to a future cohort. We can cancel or move the course if there are not enough sign-ups.",
        ],
      },
    ],
    instructors: [
      {
        name: "Jens Wedin",
        bio: "Jens Wedin has worked in design for over 20 years and worked operationally, tactically, and strategically both in large companies and government agencies, as well as small design firms and as a consultant. He is also a frequent lecturer and trainer in design and leadership at leading schools. Jens has also founded Design Leadership Community, an international community for design leaders. He is the founder of Studio Manfred.",
        photo: "/courses/jens.png",
      },
      {
        name: "Jenny Johansson",
        bio: "Jenny Johansson is a business-oriented user researcher, who helps organizations use solid insights to drive innovation and development inspired by the customers and in alignment with business goals and visions. She has worked as a consultant in the design field for 25 years, and is a lecturer in user research, impact-driven development and design thinking at Linköping university. Jenny works at Adda.",
        photo: "/courses/jenny.jpg",
      },
    ],
    price: "14.990 SEK excl. VAT",
    whenAndWhere: "We will be in the centre of Stockholm. Venue and location may change depending on the number of participants.\n\nNo training is scheduled right now. Please get in touch or register if you are interested. Invoice are sent after the training",
  },

  {
    slug: "designops",
    title: "DesignOps",
    tagline: "Learn to work with DesignOps in a structured way, where you build, scale and streamline your design organization.",
    content: [
      {
        kind: "text",
        text: "Get better and faster business and customer value and take the next step in DesignOps, Design Systems and Design Leadership. Learn to work with DesignOps in a structured way, where you build, scale and streamline your design organization. Get the right customer value faster by building the right thing and reducing risks. Increase internal efficiency, collaboration and quality through design systems, common design processes and ways of working. Attract, retain and get more healthy and engaged employees through clearer onboarding and role descriptions as well as building strong psychological safety.",
      },
      {
        kind: "text",
        text: "The level of maturity has increased in recent years in design departments and organizations, but it brings new challenges for design work. It requires new ways of working, processes and skills. During 4 half-days, you will have the opportunity to develop together with other design leaders. You will practice structurally identifying, optimizing and working out a current state, vision and plan for your design organization.",
      },
      {
        kind: "list",
        heading: "What you will learn",
        intro: "The education will include:",
        items: [
          "How to sell your work in your organization.",
          "How to structure your work with DesignOps based on a framework.",
          "Which skills and competencies you need to collaborate with to succeed.",
          "Goals, measurement and prioritization within DesignOps.",
          "Design roles, responsibilities and tasks.",
          "How to scale and structure your design organization.",
          "You get to discuss and share experiences with others in the same situation.",
          "You work on your own case from your own organization.",
        ],
      },
      {
        kind: "list",
        heading: "What you get",
        intro: "After the education, you will have:",
        items: [
          "A beginning of a current state, vision and roadmap",
          "Concrete methods, templates and tools that you can use in your organization",
          "Practiced working more strategically and tactically",
          "A diploma 🙂",
        ],
      },
      {
        kind: "list",
        heading: "The education is suitable for",
        intro: "We believe you work in, or are interested in, DesignOps. Common roles can be:",
        items: [
          "Head of Design or other strategic role",
          "UX Team Lead, UX Lead or other tactical role",
          "DesignOps Manager, DesignOps Specialist or other operational role",
          "Consultant within the above areas (here you can work with your own case or customer case)",
        ],
      },
      {
        kind: "fine-print",
        items: [
          "The spots are limited to 12 people. To ensure high quality and as personal as possible, you need to apply for a spot.",
          "Lunch is included, and we will end the last session with after work drinks and celebration.",
          "All materials will be in English, but we will speak Swedish.",
          "You will need your own case to work on during the days and have as homework. This can be something from your workplace or something you are eager to explore yourself. You need to plan for a total of about 15 hours of work between the days.",
          "Get in touch if you want to send more people from your organization, or if you would like to run this course internally.",
          "You can cancel your participation up to 3 weeks before the course starts at no cost, after which you will pay the full price. Your ticket can be transferred to another person. An invoice will be sent in connection with the course starting. We can cancel or move the course if there are not enough sign-ups.",
        ],
      },
    ],
    instructors: [
      {
        name: "Jens Wedin",
        bio: "Jens Wedin has worked in design for over 20 years and worked operationally, tactically, and strategically both in large companies and government agencies, as well as small design firms and as a consultant. He is also a frequent lecturer and trainer in design and leadership at leading schools. Jens has also founded Design Leadership Community, an international community for design leaders. He is the founder of Studio Manfred.",
        photo: "/courses/jens.png",
      },
      {
        name: "Monica Enecrona",
        bio: "Monica Enecrona is a Design leader with 30 years of experience in design. She is an initiative taker, and lead the DesignOps work at Skandia. Her passion is to develop what works well and push and make it even better, as well as support, coach, and train in innovation, product, and design.",
        photo: "/courses/monica.png",
      },
    ],
    price: "The price is currently 14.950 SEK excl. VAT. Last day to register is not set, so secure your spot now!",
    whenAndWhere: "We will be in centrally located premises in Stockholm. We will return when we know the number of registered participants. The next cohort will be on the following dates: No dates planned for the spring yet, please add your interest below. Oct the 1st 9-12 + lunch Oct the 8th 9-12 + lunch Oct the 15th 9-12 + lunch Oct the 22nd 13-17 + after work to celebrate 🥳",
  },

  {
    slug: "design-thinking-for-hr",
    title: "Design Thinking for HR",
    tagline: "Design Thinking for HR will let you apply Design Thinking in your workplace, or lead group exercises that strengthen creative thinking and innovation skills.",
    content: [
      {
        kind: "list",
        heading: "Who is the course for?",
        intro: "This course is tailored for you who work with or support HR and personnel issues in the public and private sectors, such as:",
        items: [
          "HR Managers",
          "HR Business partners",
          "HR Generalists",
          "HR Specialists",
          "Line Managers",
          "Operations managers",
          "Consulting managers",
        ],
      },
      {
        kind: "text",
        heading: "Course objectives",
        text: "To provide knowledge of what Design Thinking entails and how to use the method. After the course, you will be able to apply Design Thinking in your workplace, or lead group exercises that strengthen creative thinking and innovation skills.",
      },
      {
        kind: "text",
        heading: "What is Design Thinking?",
        text: "Design Thinking is not a new concept in itself. The method has its roots in research on creativity during the mid-1900s. In the late 1900s, the method became more commercial and gained a broader spread within the business world and was used as a method and approach to solving complex problems, business development, and innovation. During the early 2000s, a process called Double Diamond was developed by the British Design Council, which applies much of what is within Design Thinking and has become something of a standard in creative work, business development, and innovation.",
      },
      {
        kind: "list",
        heading: "Some important parts of Design Thinking and Double Diamond are:",
        items: [
          "Empathy for people, customers, and users",
          "Iterative work",
          "Complex, known, and unknown problems",
          "Framing of the problem",
          "Learning through the use of prototypes and testing",
          "Co-creation with stakeholders and target groups",
        ],
      },
      {
        kind: "list",
        heading: "Course structure",
        intro: "The course is a one-day course in central Stockholm and is a mix of theory and practical exercises. We will go through:",
        items: [
          "Complexity theory to describe and understand different types of problems",
          "Psychological safety to create the right conditions",
          "Design Thinking as a work method and process, including exploring and defining problems, probing solutions, and validating them",
          "Different methods and tools to help work with Design Thinking",
          "Practical work and exercises based on a given case",
          "Principles and thought patterns that help you in your work",
        ],
      },
    ],
    instructors: [
      {
        name: "Frida Mangen",
        bio: "Frida Mangen is an Agile coach och HR specialist who works as a consultant and lecturer in HR, leadership, and change management. She also runs the podcast AgilaHRpodden. Her passion and driving force are to contribute to more sustainable and successful organizations through innovative ideas and agile working and thinking methods.",
        photo: "/courses/frida.jpg",
      },
      {
        name: "Jens Wedin",
        bio: "Jens Wedin has worked in design for over 20 years and worked operationally, tactically, and strategically both in large companies and government agencies, as well as small design firms and as a consultant. He is also a frequent lecturer and trainer in design and leadership at leading schools. Jens has also founded Design Leadership Community, an international community for design leaders. He is the founder of Studio Manfred.",
        photo: "/courses/jens.png",
      },
    ],
    price: "7.900 SEK excluding VAT\nEarly Bird 6700 sek exl tax before 31st of jan",
    whenAndWhere: "Monday, March 18th, from 0900-1630 in central Stockholm",
  },

  {
    slug: "cx-management",
    title: "CX Management and Specialist",
    tagline: "Integrate customer experience in all processes, strengthen the brand, and retain your existing customers. This course is a two year education held by IHM Business School, where we together with House of CX hold a six month class in CX Management.",
    content: [
      {
        kind: "text",
        text: "This is a two-year education held by IHM Business School, where we together with House of CX hold a six-month class in CX Management. You will learn to integrate customer experience across all organisational processes, strengthen the brand and retain existing customers.",
      },
    ],
    instructors: [],
    price: "Contact IHM Business School for pricing",
    whenAndWhere: "Contact IHM Business School for upcoming cohorts",
  },
];
