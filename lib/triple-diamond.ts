// Content of the Triple Diamond Roles share page (STU-1167): where each role
// can use AI in each sub-phase of the triple diamond. The overview shows the
// title and level; the modal shows how to work with it and an example
// (STU-1171, STU-1172; no tools since STU-1182).
// Copy rule: no dashes as punctuation (the test checks it).

// The page is listed under Cases (STU-1179): a published `cases` row with this
// slug, created from Moa's account in the intranet, gives the title, intro,
// category and consultant. The content below stays in code. These defaults
// are used when the row can't be read.
export const TD_CASE_SLUG = "ai-activities-triple-diamond";
export const TD_CASE_DEFAULTS = {
  title: "AI Activities throughout the triple diamond process",
  categoryLine: "Interactive guide · AI in the design process",
  intro:
    "An interactive guide to where AI can help each role in the triple diamond, from problem discovery to rollout. Filter by role and level, and open an activity to see how to work with it, an example and how hard it is to get started.",
};

export type RoleId = "res" | "design" | "pm" | "ba" | "qa" | "dev" | "ds";

export type LevelId = "easy" | "medium" | "advanced";

// How hard an activity is to get going with (STU-1172).
export const LEVELS: { id: LevelId; name: string; description: string }[] = [
  { id: "easy", name: "Easy", description: "A general AI assistant and material you already have. The output is quick to check." },
  { id: "medium", name: "Medium", description: "Needs a specialised tool, some setup, or careful review against the source." },
  { id: "advanced", name: "Advanced", description: "Needs access to data or code and technical or statistical skills. Mistakes are costly." },
];

export type Activity = {
  /** Short, for the overview (STU-1172). */
  title: string;
  level: LevelId;
  /** How to work with it: a few sentences. */
  how: string;
  example: string;
};

export const ROLES: { id: RoleId; name: string }[] = [
  { id: "res", name: "Researcher" },
  { id: "design", name: "UX / Product Designer" },
  { id: "pm", name: "PM / PO" },
  { id: "ba", name: "BA" },
  { id: "qa", name: "QA" },
  { id: "dev", name: "Dev" },
  { id: "ds", name: "Data Scientist" },
];

export type Phase = { name: string; subs: { name: string; acts: Record<RoleId, Activity[]> }[] };


export const PHASES: Phase[] = [
  {
    name: "Problem discovery",
    subs: [
      {
        name: "Journey Discovery",
        acts: {
          res: [
            {
              title: "Code and theme interviews",
              level: "medium",
              how: "Agree on a codebook with the team first, then let AI apply it to each transcript and suggest new codes for what it can't place. Review a sample of the coded quotes yourself, merge or split codes, and only then cluster them into themes. Keep the link from every theme back to the original quote so the findings stay traceable.",
              example: "After 12 customer interviews, AI tags every transcript with the 20 codes in your codebook. You check three transcripts by hand, adjust two codes, run it again and have a first theme board ready the same afternoon.",
            },
            {
              title: "Write interview guides",
              level: "easy",
              how: "Give AI the research questions and the target group and ask for a guide with a warm up, open questions and follow up probes. Remove leading questions, keep it short enough for the time you have, and pilot it once.",
              example: "For a study on why new customers cancel, AI drafts a 60 minute guide. The researcher cuts it to eight core questions and adds probes about fees.",
            },
            {
              title: "Summarise desk research and competitors",
              level: "easy",
              how: "Collect reports, earlier studies, competitor pages and app reviews, and ask AI to summarise what is already known, with a source for every claim. Check the claims the team will rely on against the source.",
              example: "AI summarises 15 sources and 40 app reviews of three competitors into two pages. The researcher checks the six claims the team will build on.",
            },
          ],
          design: [
            {
              title: "Draft journey maps and user flows",
              level: "easy",
              how: "Give AI the research themes, key quotes and funnel data, and ask for a first current state journey with stages, actions, thoughts and pain points. Use it as a draft to react to in a workshop, not as the answer. Check every step against real evidence and mark what is assumed.",
              example: "From interview themes and an analytics export, AI drafts a six stage onboarding journey in FigJam. In a one hour session the team corrects two stages and adds the emotional curve from the quotes.",
            },
            {
              title: "Draft a service blueprint",
              level: "medium",
              how: "Give AI the journey, process notes and what you know about the systems, and ask for a blueprint with front stage, back stage and support processes. Go through it with the BA and a developer, since AI guesses what happens behind the scenes.",
              example: "AI extends the onboarding journey into a blueprint. It shows that fee information comes from three systems, which explains why customers see different numbers.",
            },
            {
              title: "Audit the current UI for friction",
              level: "easy",
              how: "Give AI screenshots of today's flow and ask it to review them against usability heuristics and basic accessibility, with the screen for every issue. Check each issue yourself and keep the ones that matter.",
              example: "AI reviews 20 checkout screenshots and lists 14 issues. The designer confirms nine, including that the total cost only appears on the last step.",
            },
          ],
          pm: [
            {
              title: "Summarise feedback into a problem view",
              level: "easy",
              how: "Collect meeting notes, support tickets, sales notes and NPS comments in one place and ask AI to summarise the recurring problems, who has them and how often they come up. Ask it to separate facts from opinions and to list open questions. Share the summary with stakeholders to check that you heard them right.",
              example: "A PM gives AI 300 NPS comments and notes from eight stakeholder meetings and gets a one page problem view: the five most common problems, each with example quotes and a count.",
            },
            {
              title: "Draft a problem statement and goals",
              level: "easy",
              how: "From the problem view, ask AI to draft a problem statement, who is affected, a measurable goal and what is out of scope. Agree on the wording with stakeholders before any solution is discussed.",
              example: "\"New customers cancel because they don't understand the total cost\", with the goal of 20% fewer early cancellations this half year.",
            },
            {
              title: "Map stakeholders and their interests",
              level: "easy",
              how: "List the people involved with their role and what you know about them, and ask AI to place them by influence and interest and note what each cares about. Use the map to plan who to involve and how often.",
              example: "AI maps 14 stakeholders. The PM sees that finance and legal both care about fee wording and invites them to discovery early.",
            },
          ],
          ba: [
            {
              title: "Map current processes and pain points",
              level: "medium",
              how: "Upload process documents, manuals and interview notes and ask AI to draft the current process step by step, with roles, systems and handovers. Have it point out where the documents and the interviews disagree; those gaps are often where the pain is. Validate the draft with the people who do the work.",
              example: "AI turns a 40 page claims handling manual and five interview notes into a swimlane draft and flags three steps where staff work around the system. The BA walks through it with two case handlers to confirm.",
            },
            {
              title: "Inventory systems and data flows",
              level: "medium",
              how: "Give AI architecture documents, integration lists and interview notes, and ask for a list of the systems in the journey, their owners and what data passes between them. Confirm the list with IT.",
              example: "AI lists seven systems behind the customer's bill and finds that two of them calculate fees separately.",
            },
            {
              title: "Collect rules from policies and contracts",
              level: "medium",
              how: "Upload policies, terms and the relevant regulation and ask AI to extract the business rules with a reference to the section each comes from. Have legal or a domain expert check them.",
              example: "From the terms and one regulation, AI extracts 22 fee rules with section references. The BA finds two that contradict each other.",
            },
          ],
          qa: [
            {
              title: "Find patterns in defects and tickets",
              level: "medium",
              how: "Export the defects and support tickets for the journey and let AI cluster them by symptom, feature and likely cause. Read a sample of tickets in the biggest clusters to check that the grouping makes sense. Bring the patterns into discovery so known quality problems shape the problem view.",
              example: "Clustering 1,200 tickets from the last quarter shows that 30% are about logging in with BankID on older phones. That becomes an input to the journey work instead of a bug list nobody reads.",
            },
            {
              title: "Assess the current test coverage",
              level: "medium",
              how: "Point an AI coding assistant at the test suites and ask which steps of the journey have automated tests and which don't. Compare the gaps with where the defects are.",
              example: "The assistant finds no automated tests for the fee calculation on cancellation, which becomes a known risk for the project.",
            },
            {
              title: "Review accessibility of today's journey",
              level: "medium",
              how: "Run automated scans on the journey and ask AI to group and explain the results. Then test the key steps with keyboard and screen reader, since scans only find part of the problems.",
              example: "The scan finds 31 issues, which AI groups into five causes. A focus trap in the cost dialog is the most serious.",
            },
          ],
          dev: [
            {
              title: "Map technical constraints",
              level: "medium",
              how: "Point an AI coding assistant at the relevant repositories and architecture docs and ask how the journey works today: which services, integrations and data it depends on, and what is hard to change. Ask for answers with file references so you can check them. Share a short list of constraints with the team early.",
              example: "A developer asks the assistant how checkout talks to the payment provider and gets a map of the three services involved, plus the note that the order system only accepts one payment per order.",
            },
            {
              title: "Map the data model behind the journey",
              level: "medium",
              how: "Ask an AI coding assistant to read schemas, migrations and models and draft a diagram with an explanation of the main entities. Check it with the people who own the data.",
              example: "The assistant draws how orders, fees and discounts relate and shows that fees are stored as plain text on older orders.",
            },
            {
              title: "Find technical debt in the affected code",
              level: "advanced",
              how: "Ask the assistant to point out complex, untested or outdated code and dependencies in the parts the journey touches, with file references. Judge yourself what is a real risk.",
              example: "The assistant flags a 2,000 line pricing module without tests that uses an unsupported library. The team adds it to the risk list.",
            },
          ],
          ds: [
            {
              title: "Find drop-off points in usage data",
              level: "advanced",
              how: "Use AI to write and explain the queries for funnels, cohorts and survey cross tabs, then run them on the real data. Ask it where users drop off and which segments behave differently. Always check the numbers in the source tool and look for data quality issues before you share them.",
              example: "AI writes the SQL for a sign up funnel split by device. It shows a 40% drop at ID verification on Android, which the researcher then explores in interviews.",
            },
            {
              title: "Check data quality and tracking gaps",
              level: "advanced",
              how: "Use AI to write queries that look for missing events, duplicates and broken properties, and compare the tracking plan with the real data. Note the caveats before anyone uses the numbers.",
              example: "The check shows that 15% of sign ups lack device data since a release in March, so the Android finding gets a caveat.",
            },
            {
              title: "Analyse open survey answers at scale",
              level: "medium",
              how: "Let AI classify free text answers by topic and sentiment, check a sample by hand, and combine the result with the scores from the same survey.",
              example: "AI classifies 3,000 survey comments. Fees are the top topic among people who scored below six.",
            },
          ],
        },
      },
      {
        name: "Opportunity Definition",
        acts: {
          res: [
            {
              title: "Write opportunity statements",
              level: "easy",
              how: "Ask AI to rewrite each theme as an opportunity statement from the user's point of view and to attach the two or three strongest quotes as evidence. Edit the wording yourself so it stays true to the data, and drop statements that lack support.",
              example: "The theme \"unclear fees\" becomes \"Customers need to understand the full cost before they commit\", backed by quotes from 7 of 12 participants.",
            },
            {
              title: "Draft archetypes from the data",
              level: "medium",
              how: "Ask AI to draft archetypes from behaviours and needs in the coded data, with every trait linked to evidence. Avoid demographic stereotypes and remove traits the data doesn't support.",
              example: "AI drafts three archetypes based on how people compare prices. \"The careful comparer\" is behind most of the quotes about fees.",
            },
            {
              title: "Rate the evidence per opportunity",
              level: "easy",
              how: "Ask AI to list the number of sources, participants and methods behind each opportunity, and where the data disagrees. Mark the weak ones and plan how to fill the gaps.",
              example: "Two opportunities rest on a single interview, so the team runs a short survey before prioritising them.",
            },
          ],
          design: [
            {
              title: "Write How might we questions",
              level: "easy",
              how: "Give AI each opportunity statement and ask for several How might we questions, from narrow to broad. Choose and sharpen the ones that leave room for many solutions, and use them as prompts in the ideation workshop.",
              example: "For \"customers need to understand the full cost\", AI suggests ten questions. The team picks \"How might we show the total cost at the moment people decide?\"",
            },
            {
              title: "Build an opportunity solution tree",
              level: "medium",
              how: "Ask AI to draft a tree from the desired outcome to opportunities and early ideas. Restructure it together with the team and keep the evidence linked to each branch.",
              example: "The tree goes from \"fewer early cancellations\" to five opportunities. The team sees that two of them are the same problem.",
            },
            {
              title: "Collect patterns from other products",
              level: "easy",
              how: "Ask AI for examples of how other services solve a similar problem, then look at them yourself and collect screenshots on a board. AI can describe products that have since changed.",
              example: "AI lists how eight services show the total cost. The designer checks them and saves 12 screenshots to the board.",
            },
          ],
          pm: [
            {
              title: "Prioritise opportunities",
              level: "medium",
              how: "Let AI group insights into opportunities and draft a first score against your goals, for example reach, impact, confidence and effort. Treat the scores as a starting point, adjust them together with the team and write down why. Keep the evidence linked to each opportunity.",
              example: "AI drafts RICE scores for nine opportunities. In the prioritisation meeting the team changes three scores after discussing confidence, and two opportunities make it to the roadmap.",
            },
            {
              title: "Draft a lean business case",
              level: "medium",
              how: "Ask AI to structure a business case from your numbers: problem, value, cost, risks and assumptions. Mark every assumption clearly and have finance check the figures.",
              example: "The case shows that 20% fewer early cancellations is worth about 4 MSEK a year, with two key assumptions to test.",
            },
            {
              title: "Prepare a decision brief",
              level: "easy",
              how: "Ask AI for a one page brief: the decision needed, the options, your recommendation and the evidence. Edit the tone for the audience and keep it to one page.",
              example: "With a one page brief, the steering group agrees in one meeting to focus on the cost opportunity.",
            },
          ],
          ba: [
            {
              title: "Derive needs and business rules",
              level: "medium",
              how: "For each opportunity, ask AI to list the user needs, business rules and constraints it implies, and the questions that must be answered. Check the rules with domain experts, and with legal or compliance where needed.",
              example: "The opportunity \"show the total cost upfront\" gives six needs and four business rules, including which fees must be shown by law. The BA confirms them with compliance.",
            },
            {
              title: "Draft a glossary of domain terms",
              level: "easy",
              how: "Let AI pull the terms used in documents and interviews and suggest definitions. Agree on them in the team and keep one shared glossary.",
              example: "The glossary shows that \"fee\", \"charge\" and \"cost\" mean the same thing. The team picks one word for customers.",
            },
            {
              title: "Run a gap analysis",
              level: "medium",
              how: "Give AI today's process and systems and the needs, and ask for the gaps per need. Check every gap with the people who know the systems.",
              example: "The gap analysis shows that the total cost exists in billing but never reaches the website.",
            },
          ],
          qa: [
            {
              title: "Flag quality and compliance risks",
              level: "medium",
              how: "Ask AI to go through each opportunity and list the risks for quality, accessibility, privacy and regulation, with the rule or standard that applies. Review the list with the experts and note what must be tested later.",
              example: "AI flags that a new self service flow stores personal data and must meet WCAG 2.2 AA and GDPR, so QA adds accessibility and data checks to the test plan from the start.",
            },
            {
              title: "Define quality criteria early",
              level: "easy",
              how: "Ask AI to suggest measurable quality criteria for each opportunity, such as accuracy, speed and accessibility. Agree on them with the team so they can be tested later.",
              example: "For showing the total cost: it must match the invoice to the krona and load within one second.",
            },
            {
              title: "Assess testability",
              level: "medium",
              how: "Ask AI what will be hard to test for each opportunity: third parties, data, dates or timing. Plan test environments and test data before they become a blocker.",
              example: "AI notes that fees depend on dates and campaign rules, so QA asks for a way to set the date in the test environment.",
            },
          ],
          dev: [
            {
              title: "Estimate feasibility and effort",
              level: "medium",
              how: "Use an AI coding assistant to look at the code each opportunity would touch and summarise what has to change. Combine that with your own judgement for a rough size, such as small, medium or large, and list the main technical risks.",
              example: "The assistant shows that showing the total cost needs a new fee endpoint but no change to the order system, so the team sizes it as medium instead of large.",
            },
            {
              title: "Run a technical spike",
              level: "advanced",
              how: "Use an AI coding assistant to build a throwaway spike that answers one technical question. Timebox it, write down the answer and delete the code.",
              example: "In half a day a spike shows that the pricing service can return the total cost in under 200 ms.",
            },
            {
              title: "Compare build, buy or reuse",
              level: "medium",
              how: "Ask AI to list existing internal components, open source options and vendors with pros and cons. Check licences, maturity and fit yourself.",
              example: "AI finds a price breakdown component in another team's repository, which saves two sprints.",
            },
          ],
          ds: [
            {
              title: "Size opportunities with data",
              level: "advanced",
              how: "Ask AI to help define segments and write the queries that count how many users, and how much revenue, each opportunity affects. Agree on the definitions with the team so everyone means the same thing by \"active user\" or \"churned\".",
              example: "The numbers show that the fee problem affects 18% of new customers but 60% of cancellations in the first month, which moves it to the top of the list.",
            },
            {
              title: "Estimate impact with a simple model",
              level: "advanced",
              how: "Use AI to help build a simple model, such as users times effect times value, with ranges instead of single numbers. Show which assumption moves the result most.",
              example: "The model gives 1.5 to 5 MSEK a year depending on the effect, which is enough to prioritise.",
            },
            {
              title: "Find the drivers of churn",
              level: "advanced",
              how: "Use AI to help write and explain a model of what predicts churn. Check for leakage and confounders, and present the drivers as patterns to explore, not proven causes.",
              example: "Customers who saw an unexpected fee on their first invoice are three times as likely to cancel.",
            },
          ],
        },
      },
    ],
  },
  {
    name: "Solution discovery",
    subs: [
      {
        name: "Solution Discovery",
        acts: {
          res: [
            {
              title: "Draft screeners and discussion guides",
              level: "easy",
              how: "Give AI the research questions, the target group and the concepts, and ask for a screener and a discussion guide with neutral, open questions. Read it critically for leading questions and cut what you won't use. Pilot the guide once before the real sessions.",
              example: "AI drafts a ten question screener and a 45 minute guide for testing two pricing concepts. The researcher rewrites three leading questions before the pilot.",
            },
            {
              title: "Plan the research approach",
              level: "easy",
              how: "Give AI the questions, the time and the budget, and ask for suitable methods with pros, cons and sample sizes. Choose the approach yourself and explain why.",
              example: "AI suggests five moderated sessions and an unmoderated test with 50 people to compare two concepts.",
            },
            {
              title: "Prepare test tasks and scenarios",
              level: "easy",
              how: "Ask AI for realistic tasks and scenarios with real looking data. Check that no task gives away the answer or uses the words on the screen.",
              example: "AI writes six tasks about choosing a subscription. One is rewritten because it said \"total cost\", the label being tested.",
            },
          ],
          design: [
            {
              title: "Explore layout and flow variations",
              level: "medium",
              how: "Use AI to generate many quick variations of screens and flows from a short brief, to widen the solution space. Choose the strongest directions and design them properly yourself in your design system. Don't let the first AI output anchor the team.",
              example: "In an hour the designer explores 15 checkout layouts with AI, picks three directions with the PM and refines them into concepts that can be tested.",
            },
            {
              title: "Generate realistic content for designs",
              level: "easy",
              how: "Use AI to create realistic names, prices, texts and edge cases, so designs are tested with real content instead of placeholder text.",
              example: "AI fills the prototype with 20 realistic price combinations, including long names and campaign prices. The layout breaks for two of them.",
            },
            {
              title: "Explore visual directions",
              level: "easy",
              how: "Use AI image and design tools to explore moods and visual directions quickly. Keep the final design within the brand and the design system.",
              example: "Three moodboards for \"calm and transparent\". The team picks one in 30 minutes.",
            },
          ],
          pm: [
            {
              title: "Generate ideas and hypotheses",
              level: "easy",
              how: "Ask AI for a wide range of ideas per opportunity, including some outside your usual patterns, with pros and cons for each. Pick the most promising ones and write hypotheses in the form \"We believe that X will lead to Y, measured by Z\".",
              example: "From 20 ideas the team picks three, with hypotheses such as \"Showing the total cost on the product page will cut early cancellations by 20%\".",
            },
            {
              title: "Map assumptions and plan tests",
              level: "easy",
              how: "Ask AI to list the assumptions behind each concept, about desirability, viability and feasibility, and rank them by risk. Plan the cheapest test for the riskiest one.",
              example: "The riskiest assumption is that customers read the summary at all, so it is tested with five users before anything is built.",
            },
            {
              title: "Draft a roadmap for the concept",
              level: "medium",
              how: "Give AI the concept, dependencies and capacity and ask for a phased plan. Adjust it with the team and keep it at the level of outcomes, not dates for every feature.",
              example: "The plan has three releases: the summary on the product page, in checkout and on the invoice.",
            },
          ],
          ba: [
            {
              title: "Draft user stories",
              level: "easy",
              how: "Give AI the concept, the business rules and the needs, and ask for user stories with acceptance criteria. Check that every story can be tested and traced to a need, and remove duplicates. Review them with developers and QA before refinement.",
              example: "AI drafts 14 stories with Given/When/Then criteria for the new cost summary. In refinement the team merges four and splits one.",
            },
            {
              title: "Model the future process",
              level: "medium",
              how: "Ask AI to draft the future process with roles, systems and what changes from today. Validate it with the people who will work in it.",
              example: "The future process shows that support no longer needs to calculate costs by hand, which removes four steps.",
            },
            {
              title: "Describe data and integration needs",
              level: "medium",
              how: "Ask AI to list the data each concept needs, where it comes from, who owns it and how fresh it must be. Confirm it with the system owners.",
              example: "The summary needs fee data in real time. Billing can only deliver it nightly, which changes the design.",
            },
          ],
          qa: [
            {
              title: "Generate test scenarios and edge cases",
              level: "easy",
              how: "Give AI the concept and the user stories and ask for test scenarios, including edge cases, error states and accessibility checks. Go through them with the team: an edge case found now is cheaper to design for than to fix later.",
              example: "AI lists 25 scenarios for the cost summary, including currency rounding and a customer with a discount code. That makes the designer add a state for discounts.",
            },
            {
              title: "Plan the test strategy",
              level: "medium",
              how: "Ask AI to draft a test strategy from the concept and the risks: levels, types, environments, data and who does what. Agree on it with the team.",
              example: "The strategy puts most fee checks in unit tests and keeps only five end to end tests.",
            },
            {
              title: "Generate synthetic test data",
              level: "medium",
              how: "Use AI to generate synthetic test data that covers the edge cases. Never use real customer data in tests.",
              example: "AI generates 200 synthetic customers with different campaigns, discounts and currencies.",
            },
          ],
          dev: [
            {
              title: "Build quick working prototypes",
              level: "medium",
              how: "Use AI coding tools to build throwaway prototypes with real interaction or real data, so the team can test what a static design can't show. Keep them clearly apart from production code and delete them once the question is answered.",
              example: "In one day a developer builds a working prototype that calculates the cost live against test data, and users try it in the next round of sessions.",
            },
            {
              title: "Sketch the technical architecture",
              level: "medium",
              how: "Ask AI to draft architecture options with diagrams and trade offs. Decide in the team and write the decision down in a short decision record.",
              example: "AI compares calculating the cost in the browser with a new endpoint. The team chooses the endpoint and writes it down.",
            },
            {
              title: "Check APIs and third party limits",
              level: "medium",
              how: "Ask an AI coding assistant to read API docs and code and summarise limits, costs and authentication for the services the concept depends on.",
              example: "The payment provider allows 100 calls a second, too few for live calculation, so the team plans caching.",
            },
          ],
          ds: [
            {
              title: "Design the experiment",
              level: "advanced",
              how: "Ask AI to suggest primary and guardrail metrics for each hypothesis and to help calculate sample size and test length. Check the assumptions about baseline and effect size against real data before you commit.",
              example: "For the cost summary test, early cancellation is the main metric and conversion the guardrail. The calculation shows the test needs three weeks.",
            },
            {
              title: "Simulate expected effects",
              level: "advanced",
              how: "Use AI to help run simulations and power analyses for different scenarios, and show the uncertainty, not just one number.",
              example: "The simulation shows that a 10% effect needs 40,000 visitors, which is five weeks at today's traffic.",
            },
            {
              title: "Prepare data for prototypes",
              level: "medium",
              how: "Use AI to write queries that pull anonymised, realistic samples for prototypes. Check the privacy rules before anything leaves the data platform.",
              example: "An anonymised sample of 500 real price combinations makes the prototype realistic without personal data.",
            },
          ],
        },
      },
      {
        name: "Concept Validation",
        acts: {
          res: [
            {
              title: "Analyse test sessions",
              level: "medium",
              how: "Transcribe the sessions automatically and let AI draft a summary per participant and per task: success, problems and quotes. Watch the key moments yourself, since AI misses tone and body language. Combine everything into findings with a severity.",
              example: "After eight test sessions AI drafts a findings table per task within an hour. The researcher watches the clips behind each problem and rates the severity.",
            },
            {
              title: "Run unmoderated tests at scale",
              level: "medium",
              how: "Set up an unmoderated test and let AI summarise recordings and answers. Watch a sample of sessions yourself before you trust the summary.",
              example: "Sixty people test the concept in two days. The summary shows that 40% miss the link to the fee details.",
            },
            {
              title: "Write the research report",
              level: "easy",
              how: "Ask AI to draft the report from your findings: summary, findings, evidence and recommendations. Edit it for each audience.",
              example: "One ten slide report for the steering group and a one page version for the team, both from the same findings.",
            },
          ],
          design: [
            {
              title: "Prototype and iterate from findings",
              level: "medium",
              how: "Use AI to build realistic prototypes faster, with real content and states, and to suggest fixes for the problems found in testing. Decide yourself which changes to make, and test the riskiest ones again.",
              example: "A test shows that users miss the fee breakdown. The designer tries three AI suggested variants and tests the best one again with five users.",
            },
            {
              title: "Get a design critique from AI",
              level: "easy",
              how: "Share screens with AI and ask for a critique against the goals, heuristics and accessibility. Treat it as one voice among others, not the verdict.",
              example: "AI points out that the cost summary competes with the main button, so the designer tones it down.",
            },
            {
              title: "Write design specs and annotations",
              level: "medium",
              how: "Let AI draft annotations for states, behaviour and accessibility from the design, then go through them with the developers.",
              example: "AI annotates 12 states with focus order and screen reader texts. The developers ask only two questions at handover.",
            },
          ],
          pm: [
            {
              title: "Decide: go, change or stop",
              level: "easy",
              how: "Ask AI to put the findings and the data next to each hypothesis and summarise the evidence for and against. Make the decision with the team, and write down what you learnt and why you decided as you did.",
              example: "The summary shows strong support for the cost summary but not for the new plan picker, so the team goes ahead with one and stops the other.",
            },
            {
              title: "Update the business case",
              level: "easy",
              how: "Ask AI to update the business case with the test results and point out which assumptions changed.",
              example: "With the measured 15% effect the case drops to 3 MSEK a year, still clearly worth doing.",
            },
            {
              title: "Share learnings with stakeholders",
              level: "easy",
              how: "Ask AI to draft an update for each audience from the same findings. Check the facts and the tone before sending.",
              example: "One post for leadership and one for support, explaining what changes for customers.",
            },
          ],
          ba: [
            {
              title: "Refine requirements from tests",
              level: "easy",
              how: "Give AI the findings and the current requirements and ask which stories need to change, be added or be removed. Update the backlog and note which finding caused each change.",
              example: "Two findings lead to a new story for showing fees per month and a changed acceptance criterion for the discount state.",
            },
            {
              title: "Trace requirements to evidence",
              level: "medium",
              how: "Ask AI to build a traceability matrix linking each requirement to a need, a finding and a test, and to flag requirements without a link.",
              example: "The matrix shows three requirements with no need behind them, and they are removed.",
            },
            {
              title: "Analyse impact on other processes",
              level: "medium",
              how: "Ask AI which processes, teams and documents the concept affects. Check the list with the owners and tell them early.",
              example: "AI finds that invoices and the support script must change too, so both teams are told a month ahead.",
            },
          ],
          qa: [
            {
              title: "Review accessibility and usability",
              level: "medium",
              how: "Run automated accessibility checks on the prototypes and ask AI to review the screens against WCAG and usability heuristics. Automated tools only find some of the problems, so also test with the keyboard and a screen reader.",
              example: "Stark flags low contrast on the fee labels, and AI points out that the error message isn't connected to its field. Both are fixed before development starts.",
            },
            {
              title: "Check the concept against the rules",
              level: "medium",
              how: "Ask AI to check the concept against the business rules and the regulation list and flag conflicts. Confirm each conflict with an expert.",
              example: "AI flags that the summary leaves out a fee that must be shown by law.",
            },
            {
              title: "Plan acceptance testing",
              level: "easy",
              how: "Ask AI to draft a plan for acceptance testing: scenarios, participants and criteria for passing.",
              example: "A plan with ten scenarios for support agents to run before launch.",
            },
          ],
          dev: [
            {
              title: "Assess technical risk",
              level: "medium",
              how: "Ask an AI coding assistant to walk through the concept against the codebase and list the risks: performance, security, data migration and dependencies. Turn the main risks into spikes or tickets before you commit to a plan.",
              example: "The review shows that calculating the cost live would call the pricing service on every keystroke, so the team plans caching from the start.",
            },
            {
              title: "Build a thin vertical slice",
              level: "advanced",
              how: "Use an AI coding assistant to turn the validated part into a thin slice of real, tested code behind a feature flag. Review it like any other change.",
              example: "The cost summary is built as a slice behind a feature flag in one week.",
            },
            {
              title: "Break down and estimate the work",
              level: "medium",
              how: "Ask the assistant to break the concept into tasks with references to the code they touch. Estimate them together as a team.",
              example: "AI breaks the work into 18 tasks. The team estimates three sprints.",
            },
          ],
          ds: [
            {
              title: "Analyse A/B and survey results",
              level: "advanced",
              how: "Use AI to help run and explain the analysis, check significance and look for differences between segments. Watch out for peeking, novelty effects and too many comparisons, and have a second person check the conclusion.",
              example: "The test shows 15% fewer early cancellations with the cost summary. The effect is significant for new customers but not for returning ones, which the team notes for the rollout.",
            },
            {
              title: "Analyse behaviour in prototype tests",
              level: "medium",
              how: "Use AI to help analyse clicks, time on task and success rates from the tests. Check the numbers and the sample size before drawing conclusions.",
              example: "Time to choose a plan drops from 90 to 50 seconds with the summary.",
            },
            {
              title: "Set launch metrics and targets",
              level: "medium",
              how: "Ask AI to suggest targets and alert thresholds from the test results and the baseline. Agree on them with the team before launch.",
              example: "Target: 15% fewer early cancellations. Alert if conversion drops more than 2%.",
            },
          ],
        },
      },
    ],
  },
  {
    name: "Development",
    subs: [
      {
        name: "Design & Development",
        acts: {
          res: [
            {
              title: "Answer questions from past research",
              level: "medium",
              how: "Keep research in a searchable repository and use AI search to answer the team's questions with links to the original evidence. When the repository can't answer, note the gap and plan a quick study.",
              example: "A developer asks whether users understand the term \"setup fee\". AI search finds two studies with quotes showing they don't, and the copy is changed.",
            },
            {
              title: "Run quick tests on details",
              level: "medium",
              how: "Use quick unmoderated tests for small questions that come up during the build. Let AI help plan them and summarise the answers.",
              example: "Five quick tests of two button labels in one day settle a discussion in the team.",
            },
            {
              title: "Keep the research repository tidy",
              level: "easy",
              how: "Let AI tag, merge duplicates and summarise studies, and flag what is outdated after the redesign.",
              example: "AI tags 30 older studies and flags three as outdated after the new checkout.",
            },
          ],
          design: [
            {
              title: "Write UI copy and check designs",
              level: "easy",
              how: "Use AI to draft labels, error messages and help texts in your tone of voice, and to check designs against the design system and accessibility rules. Review all copy yourself and test the key texts with users.",
              example: "AI drafts error messages for 12 payment states in the brand's tone of voice. The designer edits them, and Stark confirms the contrast in every state.",
            },
            {
              title: "Build design system components",
              level: "medium",
              how: "Use AI to draft component variants, tokens and documentation. Follow the design system's rules and review everything before publishing.",
              example: "A price breakdown component with five variants and documentation is ready in one day.",
            },
            {
              title: "Hand off designs to development",
              level: "medium",
              how: "Use AI to generate specs and starting code from the design files, and go through them with the developers.",
              example: "Developers get component code to start from, with the right tokens already in place.",
            },
          ],
          pm: [
            {
              title: "Keep the backlog and scope aligned",
              level: "easy",
              how: "Ask AI to review the backlog against the goals and the validated concept: duplicates, missing acceptance criteria and stories outside the scope. Use the result to prepare refinement, and make the scope decisions yourself.",
              example: "Before refinement AI flags six stories without acceptance criteria and three that belong in a later release.",
            },
            {
              title: "Write clear tickets",
              level: "easy",
              how: "Ask AI to turn decisions and notes into tickets with context and acceptance criteria. Review them with the team in refinement.",
              example: "AI turns the notes from refinement into eight tickets in ten minutes.",
            },
            {
              title: "Summarise status for stakeholders",
              level: "easy",
              how: "Let AI draft a weekly status from tickets, pull requests and notes. Check it and add what only you know.",
              example: "The weekly update takes ten minutes instead of an hour.",
            },
          ],
          ba: [
            {
              title: "Keep specifications up to date",
              level: "easy",
              how: "Let AI draft updates to specifications and documentation from merged changes and decisions, then review them. Agree on where the truth lives so documents don't drift apart.",
              example: "Every sprint AI drafts the changes to the fee rules specification from the closed tickets. The BA reviews and publishes them in 20 minutes instead of half a day.",
            },
            {
              title: "Answer the team's questions on rules",
              level: "easy",
              how: "Let AI answer questions from the specifications and business rules, with references. Confirm the unclear cases yourself.",
              example: "A developer asks whether VAT is included. AI finds the rule and the BA confirms it.",
            },
            {
              title: "Write API and data specifications",
              level: "medium",
              how: "Ask AI to draft API specifications and data mappings from the requirements, and review them with the developers.",
              example: "AI drafts an OpenAPI specification for the fee endpoint. The developers adjust two fields.",
            },
          ],
          qa: [
            {
              title: "Write tests and triage bugs",
              level: "medium",
              how: "Use AI to generate test cases and automated tests from the acceptance criteria, and to group incoming bugs and suggest a priority. Review the generated tests so they test the right thing, not just pass.",
              example: "AI writes Playwright tests for the eight acceptance criteria of the cost summary. QA adds two edge cases, and the suite runs on every pull request.",
            },
            {
              title: "Automate end to end tests",
              level: "medium",
              how: "Use AI to write end to end tests from the test scenarios. Review them, use stable selectors and make sure they fail when the feature breaks.",
              example: "Twelve end to end tests for checkout run on every pull request.",
            },
            {
              title: "Check pull requests against criteria",
              level: "medium",
              how: "Let AI compare each pull request with the acceptance criteria and the tests, and point out what is missing. QA decides what matters.",
              example: "AI notes that a pull request misses the discount case from the acceptance criteria.",
            },
          ],
          dev: [
            {
              title: "Write, review and refactor code",
              level: "advanced",
              how: "Use an AI coding assistant for well defined tasks: code from a clear specification, tests first, refactoring and documentation. Review every change as carefully as a colleague's, and keep people responsible for design and security decisions.",
              example: "A developer writes the failing tests for the fee calculation, lets the assistant implement until they pass, and reviews the diff before opening the pull request.",
            },
            {
              title: "Debug with an AI assistant",
              level: "medium",
              how: "Give the assistant the error, the logs and the code, and ask for possible causes. Confirm the cause with a failing test before you fix it.",
              example: "The assistant finds a rounding error between two currencies in 20 minutes.",
            },
            {
              title: "Upgrade dependencies and migrate code",
              level: "advanced",
              how: "Let the assistant do mechanical upgrades and migrations in small steps, with the tests green after each step. Review every step.",
              example: "A framework upgrade across 80 files is done in two days, with the tests passing at every step.",
            },
          ],
          ds: [
            {
              title: "Set up tracking and dashboards",
              level: "advanced",
              how: "Ask AI to draft an event schema from the success metrics, generate the tracking code and build the first dashboards. Check that the events fire correctly in a test environment before the release.",
              example: "AI drafts nine events for the new flow and a dashboard for the main metric and the guardrails, checked in staging before launch.",
            },
            {
              title: "Build data models and pipelines",
              level: "advanced",
              how: "Use AI to write transformation code and data tests. Review the logic and the tests as carefully as application code.",
              example: "AI drafts the data models for fee events, with tests for uniqueness and missing values.",
            },
            {
              title: "Validate tracking before release",
              level: "medium",
              how: "Let AI compare the events fired in staging with the event schema and report gaps before the release.",
              example: "Two events with missing properties are found and fixed before launch.",
            },
          ],
        },
      },
      {
        name: "Solution Rollout",
        acts: {
          res: [
            {
              title: "Theme early feedback",
              level: "easy",
              how: "Collect feedback from surveys, support and reviews, and let AI theme it every week. Read the raw comments behind the biggest themes and follow up with a few users to understand why.",
              example: "Two weeks after launch AI themes 400 comments. One theme about monthly fees leads to five short follow up calls.",
            },
            {
              title: "Measure satisfaction after launch",
              level: "easy",
              how: "Use AI to help write a short survey in the product and to analyse the answers. Keep it to two or three questions.",
              example: "A two question survey after checkout shows that satisfaction with price clarity rose from 3.1 to 4.0.",
            },
            {
              title: "Plan the next round of research",
              level: "easy",
              how: "Ask AI to list the open questions from launch data and feedback, and prioritise them with the team.",
              example: "The next study is about monthly fees, based on 400 comments.",
            },
          ],
          design: [
            {
              title: "Find UX issues in live usage",
              level: "medium",
              how: "Use AI summaries of session recordings, heatmaps and feedback to find where people struggle. Watch the actual sessions behind each issue, and turn them into prioritised improvements.",
              example: "The recording summaries show that many users open the fee breakdown twice, so the designer makes it open by default.",
            },
            {
              title: "Design variants for A/B tests",
              level: "medium",
              how: "Ask AI for variants worth testing, design the strongest ones and plan the test with the data scientist.",
              example: "Two placements of the summary are tested for two weeks.",
            },
            {
              title: "Update the design system after launch",
              level: "easy",
              how: "Use AI to help document new patterns and usage guidelines so other teams can reuse them.",
              example: "The price summary pattern is added with guidelines, and two other teams reuse it.",
            },
          ],
          pm: [
            {
              title: "Draft release notes and KPI summaries",
              level: "easy",
              how: "Let AI draft release notes from the closed tickets for each audience, and summarise adoption and KPI changes from your dashboards. Check the facts and the tone before you send anything.",
              example: "From 18 tickets AI drafts one release note for customers and one for support, plus a weekly KPI summary for the steering group.",
            },
            {
              title: "Run a retrospective with AI",
              level: "easy",
              how: "Let AI group the team's retrospective notes into themes and suggest actions. The team decides what to do.",
              example: "Sixty notes become five themes and three actions.",
            },
            {
              title: "Plan the next iteration",
              level: "medium",
              how: "Ask AI to combine KPIs, feedback and the backlog into suggested next priorities. Decide with the team.",
              example: "AI suggests prioritising monthly fees next, and the team agrees.",
            },
          ],
          ba: [
            {
              title: "Update documentation and training",
              level: "easy",
              how: "Give AI the new process and the changed screens and ask for updated procedures, FAQs and short training material. Review it with the people who will use it, and remove outdated documents.",
              example: "AI updates the support team's procedure and drafts a one page FAQ about the new fees, reviewed by two support agents before launch.",
            },
            {
              title: "Give support an AI assistant",
              level: "medium",
              how: "Set up an internal AI assistant on the updated documentation so support can find answers fast. Review its answers regularly.",
              example: "The assistant answers 70% of support's fee questions from the new documentation.",
            },
            {
              title: "Measure the process improvement",
              level: "medium",
              how: "Ask AI to compare process metrics before and after, such as handling time and errors, and check the numbers in the source.",
              example: "Handling time for fee questions drops from eight to three minutes.",
            },
          ],
          qa: [
            {
              title: "Check for regressions after release",
              level: "medium",
              how: "Run the automated regression suite on every release, and use AI to group new errors and support tickets after launch. Agree in advance on the thresholds that trigger a rollback.",
              example: "The day after the release Sentry groups a new error on older Safari versions. QA confirms it, and a fix ships the same day.",
            },
            {
              title: "Find root causes of production bugs",
              level: "medium",
              how: "Let AI group bugs and incidents, suggest root causes and point out missing tests. Confirm the cause before you act.",
              example: "Three bugs share one cause: campaign rules without tests. The tests are added.",
            },
            {
              title: "Monitor accessibility in production",
              level: "easy",
              how: "Schedule automated accessibility scans and let AI summarise new issues each week.",
              example: "The weekly scan catches a missing label after a content update.",
            },
          ],
          dev: [
            {
              title: "Monitor incidents and draft fixes",
              level: "advanced",
              how: "Use the AI in your monitoring tools to explain errors and find the likely cause, and an AI coding assistant to draft a fix with a test. Review and deploy as usual, and write a short note after each incident.",
              example: "An alert about slow checkout leads to an AI summary that points at a missing database index. The developer adds it with a test, and the incident note takes ten minutes.",
            },
            {
              title: "Roll out with feature flags",
              level: "medium",
              how: "Use AI to help set up feature flags, a staged rollout and a kill switch. Watch the metrics at each step.",
              example: "The release goes to 10%, 50% and then 100% of customers over one week.",
            },
            {
              title: "Write runbooks and incident notes",
              level: "easy",
              how: "Let AI draft runbooks from the code and incident notes from the timeline. Review them with the people on call.",
              example: "A runbook for the fee service is written in 30 minutes.",
            },
          ],
          ds: [
            {
              title: "Track outcomes and anomalies",
              level: "advanced",
              how: "Set up dashboards and alerts on the outcome metrics and use AI anomaly detection to flag unusual changes. Look into each alert before acting, and report the outcomes against the original hypotheses.",
              example: "An alert shows cancellations rising in one region. The analysis finds a translation error in the fee text, which is fixed within a day.",
            },
            {
              title: "Report results against the hypothesis",
              level: "medium",
              how: "Ask AI to draft a results report: effect, confidence, segments and learnings. Have a second person review it.",
              example: "The report shows 14% fewer early cancellations, close to the 15% from the test.",
            },
            {
              title: "Forecast and track long term effects",
              level: "advanced",
              how: "Use AI to help build a forecast for the outcome metrics, and compare forecast with actual to see whether the effect lasts.",
              example: "Three months later the effect still holds.",
            },
          ],
        },
      },
    ],
  },
];
