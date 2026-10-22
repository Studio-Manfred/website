// Content of the Triple Diamond Roles share page (STU-1167): where each role
// can use AI in each sub-phase of the triple diamond.

export type RoleId = "res" | "pm" | "ba" | "qa" | "dev" | "ds";

export const ROLES: { id: RoleId; name: string }[] = [
  { id: "res", name: "Researcher" },
  { id: "pm", name: "PM / PO" },
  { id: "ba", name: "BA" },
  { id: "qa", name: "QA" },
  { id: "dev", name: "Dev" },
  { id: "ds", name: "Data Scientist" },
];

export type Phase = { name: string; subs: { name: string; acts: Record<RoleId, string> }[] };

export const PHASES: Phase[] = [
  {
    name: "Problem discovery",
    subs: [
      {
        name: "Journey Discovery",
        acts: {
          res: "Code and theme interview transcripts with a shared codebook",
          pm: "Summarise stakeholder input and customer feedback into a first problem view",
          ba: "Map current-state processes and pain points from interviews and documents",
          qa: "Review defects and support tickets for recurring failure patterns",
          dev: "Summarise technical constraints and legacy limits that shape the journey",
          ds: "Analyse usage and survey data to find drop-off points",
        },
      },
      {
        name: "Opportunity Definition",
        acts: {
          res: "Turn themes into opportunity statements backed by quotes",
          pm: "Cluster insights, size and prioritise opportunities against goals",
          ba: "Translate opportunities into needs and business rules",
          qa: "Flag quality and compliance risks per opportunity",
          dev: "Estimate feasibility and rough effort per opportunity",
          ds: "Segment users and quantify how many each opportunity affects",
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
          res: "Draft screeners and discussion guides for concept sessions",
          pm: "Generate and compare solution ideas, write testable hypotheses",
          ba: "Draft requirements and user stories for the leading concepts",
          qa: "Generate test scenarios and edge cases from early concepts",
          dev: "Build quick working prototypes to try the idea",
          ds: "Define success metrics and set up the experiment design",
        },
      },
      {
        name: "Concept Validation",
        acts: {
          res: "Analyse test sessions and summarise findings per task",
          pm: "Compare results with hypotheses and decide: go, change or stop",
          ba: "Refine requirements based on what the tests showed",
          qa: "Review prototypes for accessibility and usability issues",
          dev: "Assess technical risk of the validated concept",
          ds: "Read A/B and survey results and check significance",
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
          res: "Answer open design questions from the insight repository",
          pm: "Keep backlog, acceptance criteria and scope aligned",
          ba: "Keep specifications and documentation up to date",
          qa: "Write and run test cases, triage bugs",
          dev: "Write, review and refactor code, generate tests and docs",
          ds: "Set up tracking, event schemas and dashboards",
        },
      },
      {
        name: "Solution Rollout",
        acts: {
          res: "Theme early feedback and follow up with users",
          pm: "Draft release notes and summarise adoption and KPIs",
          ba: "Update process documentation and training material",
          qa: "Run regression checks and watch for issues after release",
          dev: "Monitor logs and incidents, draft fixes",
          ds: "Track outcome metrics, spot anomalies and churn signals",
        },
      },
    ],
  },
];
