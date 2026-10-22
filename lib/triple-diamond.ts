// Content of the Triple Diamond Roles share page (STU-1167): where each role
// can use AI in each sub-phase of the triple diamond. The overview shows the
// title and level; the modal shows how to work with it, tools and an example
// (STU-1171, STU-1172).
// Copy rule: no dashes as punctuation (the test checks it).

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
  /** Suggested tools, as named by their makers. */
  tools: string[];
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

export type Phase = { name: string; subs: { name: string; acts: Record<RoleId, Activity> }[] };

const LLM = "Claude or ChatGPT";
const CODE = ["Claude Code", "GitHub Copilot", "Cursor"];

export const PHASES: Phase[] = [
  {
    name: "Problem discovery",
    subs: [
      {
        name: "Journey Discovery",
        acts: {
          res: {
            title: "Code and theme interviews",
            level: "medium",
            how: "Agree on a codebook with the team first, then let AI apply it to each transcript and suggest new codes for what it can't place. Review a sample of the coded quotes yourself, merge or split codes, and only then cluster them into themes. Keep the link from every theme back to the original quote so the findings stay traceable.",
            tools: ["Dovetail", "Condens", LLM, "Miro AI"],
            example: "After 12 customer interviews, AI tags every transcript with the 20 codes in your codebook. You check three transcripts by hand, adjust two codes, run it again and have a first theme board ready the same afternoon.",
          },
          design: {
            title: "Draft journey maps and user flows",
            level: "easy",
            how: "Give AI the research themes, key quotes and funnel data, and ask for a first current state journey with stages, actions, thoughts and pain points. Use it as a draft to react to in a workshop, not as the answer. Check every step against real evidence and mark what is assumed.",
            tools: ["FigJam AI", "Miro AI", LLM, "Figma"],
            example: "From interview themes and an analytics export, AI drafts a six stage onboarding journey in FigJam. In a one hour session the team corrects two stages and adds the emotional curve from the quotes.",
          },
          pm: {
            title: "Summarise feedback into a problem view",
            level: "easy",
            how: "Collect meeting notes, support tickets, sales notes and NPS comments in one place and ask AI to summarise the recurring problems, who has them and how often they come up. Ask it to separate facts from opinions and to list open questions. Share the summary with stakeholders to check that you heard them right.",
            tools: ["Notion AI", "Productboard", LLM, "Dovetail"],
            example: "A PM gives AI 300 NPS comments and notes from eight stakeholder meetings and gets a one page problem view: the five most common problems, each with example quotes and a count.",
          },
          ba: {
            title: "Map current processes and pain points",
            level: "medium",
            how: "Upload process documents, manuals and interview notes and ask AI to draft the current process step by step, with roles, systems and handovers. Have it point out where the documents and the interviews disagree; those gaps are often where the pain is. Validate the draft with the people who do the work.",
            tools: [LLM, "Lucidchart", "Miro AI", "Confluence AI"],
            example: "AI turns a 40 page claims handling manual and five interview notes into a swimlane draft and flags three steps where staff work around the system. The BA walks through it with two case handlers to confirm.",
          },
          qa: {
            title: "Find patterns in defects and tickets",
            level: "medium",
            how: "Export the defects and support tickets for the journey and let AI cluster them by symptom, feature and likely cause. Read a sample of tickets in the biggest clusters to check that the grouping makes sense. Bring the patterns into discovery so known quality problems shape the problem view.",
            tools: ["Jira", "Zendesk AI", LLM, "Google Sheets"],
            example: "Clustering 1,200 tickets from the last quarter shows that 30% are about logging in with BankID on older phones. That becomes an input to the journey work instead of a bug list nobody reads.",
          },
          dev: {
            title: "Map technical constraints",
            level: "medium",
            how: "Point an AI coding assistant at the relevant repositories and architecture docs and ask how the journey works today: which services, integrations and data it depends on, and what is hard to change. Ask for answers with file references so you can check them. Share a short list of constraints with the team early.",
            tools: [...CODE],
            example: "A developer asks the assistant how checkout talks to the payment provider and gets a map of the three services involved, plus the note that the order system only accepts one payment per order.",
          },
          ds: {
            title: "Find drop-off points in usage data",
            level: "advanced",
            how: "Use AI to write and explain the queries for funnels, cohorts and survey cross tabs, then run them on the real data. Ask it where users drop off and which segments behave differently. Always check the numbers in the source tool and look for data quality issues before you share them.",
            tools: ["Amplitude", "Mixpanel", "Hex", "Jupyter"],
            example: "AI writes the SQL for a sign up funnel split by device. It shows a 40% drop at ID verification on Android, which the researcher then explores in interviews.",
          },
        },
      },
      {
        name: "Opportunity Definition",
        acts: {
          res: {
            title: "Write opportunity statements",
            level: "easy",
            how: "Ask AI to rewrite each theme as an opportunity statement from the user's point of view and to attach the two or three strongest quotes as evidence. Edit the wording yourself so it stays true to the data, and drop statements that lack support.",
            tools: ["Dovetail", LLM, "Miro AI"],
            example: "The theme \"unclear fees\" becomes \"Customers need to understand the full cost before they commit\", backed by quotes from 7 of 12 participants.",
          },
          design: {
            title: "Write How might we questions",
            level: "easy",
            how: "Give AI each opportunity statement and ask for several How might we questions, from narrow to broad. Choose and sharpen the ones that leave room for many solutions, and use them as prompts in the ideation workshop.",
            tools: ["FigJam AI", "Miro AI", LLM],
            example: "For \"customers need to understand the full cost\", AI suggests ten questions. The team picks \"How might we show the total cost at the moment people decide?\"",
          },
          pm: {
            title: "Prioritise opportunities",
            level: "medium",
            how: "Let AI group insights into opportunities and draft a first score against your goals, for example reach, impact, confidence and effort. Treat the scores as a starting point, adjust them together with the team and write down why. Keep the evidence linked to each opportunity.",
            tools: ["Productboard", "Notion AI", LLM, "Google Sheets"],
            example: "AI drafts RICE scores for nine opportunities. In the prioritisation meeting the team changes three scores after discussing confidence, and two opportunities make it to the roadmap.",
          },
          ba: {
            title: "Derive needs and business rules",
            level: "medium",
            how: "For each opportunity, ask AI to list the user needs, business rules and constraints it implies, and the questions that must be answered. Check the rules with domain experts, and with legal or compliance where needed.",
            tools: [LLM, "Confluence AI", "Notion AI"],
            example: "The opportunity \"show the total cost upfront\" gives six needs and four business rules, including which fees must be shown by law. The BA confirms them with compliance.",
          },
          qa: {
            title: "Flag quality and compliance risks",
            level: "medium",
            how: "Ask AI to go through each opportunity and list the risks for quality, accessibility, privacy and regulation, with the rule or standard that applies. Review the list with the experts and note what must be tested later.",
            tools: [LLM, "Jira", "Confluence AI"],
            example: "AI flags that a new self service flow stores personal data and must meet WCAG 2.2 AA and GDPR, so QA adds accessibility and data checks to the test plan from the start.",
          },
          dev: {
            title: "Estimate feasibility and effort",
            level: "medium",
            how: "Use an AI coding assistant to look at the code each opportunity would touch and summarise what has to change. Combine that with your own judgement for a rough size, such as small, medium or large, and list the main technical risks.",
            tools: [...CODE],
            example: "The assistant shows that showing the total cost needs a new fee endpoint but no change to the order system, so the team sizes it as medium instead of large.",
          },
          ds: {
            title: "Size opportunities with data",
            level: "advanced",
            how: "Ask AI to help define segments and write the queries that count how many users, and how much revenue, each opportunity affects. Agree on the definitions with the team so everyone means the same thing by \"active user\" or \"churned\".",
            tools: ["Hex", "Amplitude", "Looker", "Jupyter"],
            example: "The numbers show that the fee problem affects 18% of new customers but 60% of cancellations in the first month, which moves it to the top of the list.",
          },
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
          res: {
            title: "Draft screeners and discussion guides",
            level: "easy",
            how: "Give AI the research questions, the target group and the concepts, and ask for a screener and a discussion guide with neutral, open questions. Read it critically for leading questions and cut what you won't use. Pilot the guide once before the real sessions.",
            tools: [LLM, "Maze", "Lookback", "User Interviews"],
            example: "AI drafts a ten question screener and a 45 minute guide for testing two pricing concepts. The researcher rewrites three leading questions before the pilot.",
          },
          design: {
            title: "Explore layout and flow variations",
            level: "medium",
            how: "Use AI to generate many quick variations of screens and flows from a short brief, to widen the solution space. Choose the strongest directions and design them properly yourself in your design system. Don't let the first AI output anchor the team.",
            tools: ["Figma Make", "Figma AI", "Uizard", "v0"],
            example: "In an hour the designer explores 15 checkout layouts with AI, picks three directions with the PM and refines them into concepts that can be tested.",
          },
          pm: {
            title: "Generate ideas and hypotheses",
            level: "easy",
            how: "Ask AI for a wide range of ideas per opportunity, including some outside your usual patterns, with pros and cons for each. Pick the most promising ones and write hypotheses in the form \"We believe that X will lead to Y, measured by Z\".",
            tools: [LLM, "Miro AI", "Notion AI"],
            example: "From 20 ideas the team picks three, with hypotheses such as \"Showing the total cost on the product page will cut early cancellations by 20%\".",
          },
          ba: {
            title: "Draft user stories",
            level: "easy",
            how: "Give AI the concept, the business rules and the needs, and ask for user stories with acceptance criteria. Check that every story can be tested and traced to a need, and remove duplicates. Review them with developers and QA before refinement.",
            tools: ["Jira", "Confluence AI", LLM],
            example: "AI drafts 14 stories with Given/When/Then criteria for the new cost summary. In refinement the team merges four and splits one.",
          },
          qa: {
            title: "Generate test scenarios and edge cases",
            level: "easy",
            how: "Give AI the concept and the user stories and ask for test scenarios, including edge cases, error states and accessibility checks. Go through them with the team: an edge case found now is cheaper to design for than to fix later.",
            tools: [LLM, "TestRail", "Jira"],
            example: "AI lists 25 scenarios for the cost summary, including currency rounding and a customer with a discount code. That makes the designer add a state for discounts.",
          },
          dev: {
            title: "Build quick working prototypes",
            level: "medium",
            how: "Use AI coding tools to build throwaway prototypes with real interaction or real data, so the team can test what a static design can't show. Keep them clearly apart from production code and delete them once the question is answered.",
            tools: ["Claude Code", "Cursor", "v0", "Lovable"],
            example: "In one day a developer builds a working prototype that calculates the cost live against test data, and users try it in the next round of sessions.",
          },
          ds: {
            title: "Design the experiment",
            level: "advanced",
            how: "Ask AI to suggest primary and guardrail metrics for each hypothesis and to help calculate sample size and test length. Check the assumptions about baseline and effect size against real data before you commit.",
            tools: ["Statsig", "Optimizely", "GrowthBook", "Hex"],
            example: "For the cost summary test, early cancellation is the main metric and conversion the guardrail. The calculation shows the test needs three weeks.",
          },
        },
      },
      {
        name: "Concept Validation",
        acts: {
          res: {
            title: "Analyse test sessions",
            level: "medium",
            how: "Transcribe the sessions automatically and let AI draft a summary per participant and per task: success, problems and quotes. Watch the key moments yourself, since AI misses tone and body language. Combine everything into findings with a severity.",
            tools: ["Dovetail", "Lookback", "Maze", "Condens"],
            example: "After eight test sessions AI drafts a findings table per task within an hour. The researcher watches the clips behind each problem and rates the severity.",
          },
          design: {
            title: "Prototype and iterate from findings",
            level: "medium",
            how: "Use AI to build realistic prototypes faster, with real content and states, and to suggest fixes for the problems found in testing. Decide yourself which changes to make, and test the riskiest ones again.",
            tools: ["Figma", "Figma Make", "ProtoPie", "Maze"],
            example: "A test shows that users miss the fee breakdown. The designer tries three AI suggested variants and tests the best one again with five users.",
          },
          pm: {
            title: "Decide: go, change or stop",
            level: "easy",
            how: "Ask AI to put the findings and the data next to each hypothesis and summarise the evidence for and against. Make the decision with the team, and write down what you learnt and why you decided as you did.",
            tools: [LLM, "Notion AI", "Productboard"],
            example: "The summary shows strong support for the cost summary but not for the new plan picker, so the team goes ahead with one and stops the other.",
          },
          ba: {
            title: "Refine requirements from tests",
            level: "easy",
            how: "Give AI the findings and the current requirements and ask which stories need to change, be added or be removed. Update the backlog and note which finding caused each change.",
            tools: ["Jira", "Confluence AI", LLM],
            example: "Two findings lead to a new story for showing fees per month and a changed acceptance criterion for the discount state.",
          },
          qa: {
            title: "Review accessibility and usability",
            level: "medium",
            how: "Run automated accessibility checks on the prototypes and ask AI to review the screens against WCAG and usability heuristics. Automated tools only find some of the problems, so also test with the keyboard and a screen reader.",
            tools: ["Stark", "axe DevTools", "VoiceOver or NVDA", LLM],
            example: "Stark flags low contrast on the fee labels, and AI points out that the error message isn't connected to its field. Both are fixed before development starts.",
          },
          dev: {
            title: "Assess technical risk",
            level: "medium",
            how: "Ask an AI coding assistant to walk through the concept against the codebase and list the risks: performance, security, data migration and dependencies. Turn the main risks into spikes or tickets before you commit to a plan.",
            tools: [...CODE],
            example: "The review shows that calculating the cost live would call the pricing service on every keystroke, so the team plans caching from the start.",
          },
          ds: {
            title: "Analyse A/B and survey results",
            level: "advanced",
            how: "Use AI to help run and explain the analysis, check significance and look for differences between segments. Watch out for peeking, novelty effects and too many comparisons, and have a second person check the conclusion.",
            tools: ["Statsig", "Optimizely", "Hex", "Jupyter"],
            example: "The test shows 15% fewer early cancellations with the cost summary. The effect is significant for new customers but not for returning ones, which the team notes for the rollout.",
          },
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
          res: {
            title: "Answer questions from past research",
            level: "medium",
            how: "Keep research in a searchable repository and use AI search to answer the team's questions with links to the original evidence. When the repository can't answer, note the gap and plan a quick study.",
            tools: ["Dovetail", "Condens", "Notion AI", "Glean"],
            example: "A developer asks whether users understand the term \"setup fee\". AI search finds two studies with quotes showing they don't, and the copy is changed.",
          },
          design: {
            title: "Write UI copy and check designs",
            level: "easy",
            how: "Use AI to draft labels, error messages and help texts in your tone of voice, and to check designs against the design system and accessibility rules. Review all copy yourself and test the key texts with users.",
            tools: ["Figma AI", "Ditto", "Stark", LLM],
            example: "AI drafts error messages for 12 payment states in the brand's tone of voice. The designer edits them, and Stark confirms the contrast in every state.",
          },
          pm: {
            title: "Keep the backlog and scope aligned",
            level: "easy",
            how: "Ask AI to review the backlog against the goals and the validated concept: duplicates, missing acceptance criteria and stories outside the scope. Use the result to prepare refinement, and make the scope decisions yourself.",
            tools: ["Jira", "Linear", "Notion AI"],
            example: "Before refinement AI flags six stories without acceptance criteria and three that belong in a later release.",
          },
          ba: {
            title: "Keep specifications up to date",
            level: "easy",
            how: "Let AI draft updates to specifications and documentation from merged changes and decisions, then review them. Agree on where the truth lives so documents don't drift apart.",
            tools: ["Confluence AI", "Notion AI", LLM],
            example: "Every sprint AI drafts the changes to the fee rules specification from the closed tickets. The BA reviews and publishes them in 20 minutes instead of half a day.",
          },
          qa: {
            title: "Write tests and triage bugs",
            level: "medium",
            how: "Use AI to generate test cases and automated tests from the acceptance criteria, and to group incoming bugs and suggest a priority. Review the generated tests so they test the right thing, not just pass.",
            tools: ["Playwright", "GitHub Copilot", "Jira", "TestRail"],
            example: "AI writes Playwright tests for the eight acceptance criteria of the cost summary. QA adds two edge cases, and the suite runs on every pull request.",
          },
          dev: {
            title: "Write, review and refactor code",
            level: "advanced",
            how: "Use an AI coding assistant for well defined tasks: code from a clear specification, tests first, refactoring and documentation. Review every change as carefully as a colleague's, and keep people responsible for design and security decisions.",
            tools: [...CODE, "CodeRabbit"],
            example: "A developer writes the failing tests for the fee calculation, lets the assistant implement until they pass, and reviews the diff before opening the pull request.",
          },
          ds: {
            title: "Set up tracking and dashboards",
            level: "advanced",
            how: "Ask AI to draft an event schema from the success metrics, generate the tracking code and build the first dashboards. Check that the events fire correctly in a test environment before the release.",
            tools: ["Amplitude", "Mixpanel", "Segment", "Looker"],
            example: "AI drafts nine events for the new flow and a dashboard for the main metric and the guardrails, checked in staging before launch.",
          },
        },
      },
      {
        name: "Solution Rollout",
        acts: {
          res: {
            title: "Theme early feedback",
            level: "easy",
            how: "Collect feedback from surveys, support and reviews, and let AI theme it every week. Read the raw comments behind the biggest themes and follow up with a few users to understand why.",
            tools: ["Dovetail", "Sprig", "Hotjar", LLM],
            example: "Two weeks after launch AI themes 400 comments. One theme about monthly fees leads to five short follow up calls.",
          },
          design: {
            title: "Find UX issues in live usage",
            level: "medium",
            how: "Use AI summaries of session recordings, heatmaps and feedback to find where people struggle. Watch the actual sessions behind each issue, and turn them into prioritised improvements.",
            tools: ["Hotjar", "Microsoft Clarity", "FullStory", "Figma"],
            example: "The recording summaries show that many users open the fee breakdown twice, so the designer makes it open by default.",
          },
          pm: {
            title: "Draft release notes and KPI summaries",
            level: "easy",
            how: "Let AI draft release notes from the closed tickets for each audience, and summarise adoption and KPI changes from your dashboards. Check the facts and the tone before you send anything.",
            tools: ["Linear", "Jira", "Notion AI", "Amplitude"],
            example: "From 18 tickets AI drafts one release note for customers and one for support, plus a weekly KPI summary for the steering group.",
          },
          ba: {
            title: "Update documentation and training",
            level: "easy",
            how: "Give AI the new process and the changed screens and ask for updated procedures, FAQs and short training material. Review it with the people who will use it, and remove outdated documents.",
            tools: ["Confluence AI", "Scribe", "Synthesia", LLM],
            example: "AI updates the support team's procedure and drafts a one page FAQ about the new fees, reviewed by two support agents before launch.",
          },
          qa: {
            title: "Check for regressions after release",
            level: "medium",
            how: "Run the automated regression suite on every release, and use AI to group new errors and support tickets after launch. Agree in advance on the thresholds that trigger a rollback.",
            tools: ["Playwright", "Sentry", "Datadog", "Zendesk AI"],
            example: "The day after the release Sentry groups a new error on older Safari versions. QA confirms it, and a fix ships the same day.",
          },
          dev: {
            title: "Monitor incidents and draft fixes",
            level: "advanced",
            how: "Use the AI in your monitoring tools to explain errors and find the likely cause, and an AI coding assistant to draft a fix with a test. Review and deploy as usual, and write a short note after each incident.",
            tools: ["Sentry", "Datadog", "Claude Code", "GitHub Copilot"],
            example: "An alert about slow checkout leads to an AI summary that points at a missing database index. The developer adds it with a test, and the incident note takes ten minutes.",
          },
          ds: {
            title: "Track outcomes and anomalies",
            level: "advanced",
            how: "Set up dashboards and alerts on the outcome metrics and use AI anomaly detection to flag unusual changes. Look into each alert before acting, and report the outcomes against the original hypotheses.",
            tools: ["Amplitude", "Mixpanel", "Looker", "Hex"],
            example: "An alert shows cancellations rising in one region. The analysis finds a translation error in the fee text, which is fixed within a day.",
          },
        },
      },
    ],
  },
];
