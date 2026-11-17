// The team on the website: the Team section on the start page, and the photo a
// case page shows for its consultant (STU-1169). Photos live in public/team/.

export type TeamMember = { name: string; role: string; photo: string };

export const TEAM: TeamMember[] = [
  { name: "Selma Hallqvist", role: "Senior Product Designer", photo: "/team/selma.jpg" },
  { name: "Moa Bogren", role: "Senior User Research (UXR)", photo: "/team/moa.jpg" },
  { name: "Jens Wedin", role: "Design Director & Service Designer", photo: "/team/jens.jpg" },
  { name: "Markus Dahlbom", role: "Product Designer", photo: "/team/markus.jpg" },
];

const norm = (s: string) => s.trim().toLowerCase();

/** The website photo of a team member by name (any case), or undefined. */
export function teamPhoto(name: string): string | undefined {
  return TEAM.find((m) => norm(m.name) === norm(name))?.photo;
}
