import { describe, expect, it } from "vitest";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { GROUP_PEOPLE, GROUP_SKILLS } from "@/lib/group";
import { GroupPeople } from "./GroupPeople";

const network = () => screen.getByRole("list", { name: "People" });
const person = (name: string) => within(network()).getByRole("button", { name: new RegExp(`^${name},`) });

describe("GroupPeople", () => {
  it("shows everyone in one network, each telling their role and company", () => {
    render(<GroupPeople />);
    expect(within(network()).getAllByRole("listitem")).toHaveLength(GROUP_PEOPLE.length);
    expect(person("Moa Bernhardsson")).toHaveAccessibleName("Moa Bernhardsson, Studio & Partnerships Director, Mather Studio");
    expect(person("Jens Wedin")).toHaveAccessibleName(/Studio Manfred$/);
  });

  it("joins the skill hubs into one ring so no skill stands apart", () => {
    const { container } = render(<GroupPeople />);
    const ring = container.querySelectorAll("line[data-ring]");
    expect(ring).toHaveLength(GROUP_SKILLS.length);
    const joined = new Set([...ring].flatMap((l) => l.getAttribute("data-ring")!.split("|")));
    expect([...joined].sort()).toEqual([...GROUP_SKILLS].sort());
  });

  it("dims everyone without the chosen skill, and All brings them back", async () => {
    render(<GroupPeople />);
    const filters = screen.getByRole("group", { name: "Filtrera på förmåga" });
    const all = within(filters).getByRole("button", { name: "All" });
    expect(all).toHaveAttribute("aria-pressed", "true");

    const design = within(filters).getByRole("button", { name: "Design" });
    await userEvent.click(design);
    expect(design).toHaveAttribute("aria-pressed", "true");
    for (const p of GROUP_PEOPLE) {
      expect(person(p.name).closest("li")).toHaveAttribute("data-dimmed", String(!p.skills.includes("Design")));
    }

    await userEvent.click(all);
    for (const p of GROUP_PEOPLE) expect(person(p.name).closest("li")).toHaveAttribute("data-dimmed", "false");
  });

  it("opens a panel about the person you click, with their bio and profile link", async () => {
    render(<GroupPeople />);
    expect(screen.queryByRole("heading", { name: "Peter Olovsson" })).not.toBeInTheDocument();

    await userEvent.click(person("Peter Olovsson"));
    expect(person("Peter Olovsson")).toHaveAttribute("aria-expanded", "true");
    const panel = screen.getByRole("region", { name: "Peter Olovsson" });
    expect(within(panel).getByRole("heading", { name: "Peter Olovsson" })).toBeInTheDocument();
    expect(panel).toHaveTextContent("Design Leader, UX & Service Design");
    expect(panel).toHaveTextContent("SeventyOne Consulting");
    expect(panel).toHaveTextContent(/designledarskap, UX, tjänstedesign/);
    expect(within(panel).getByText("Design")).toBeInTheDocument();
    expect(within(panel).getByText("Leadership")).toBeInTheDocument();
    const link = within(panel).getByRole("link", { name: /Läs mer om Peter/ });
    expect(link).toHaveAttribute("href", "https://www.seventyoneconsulting.se/kontakt/peter-olovsson");
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");

    await userEvent.click(within(panel).getByRole("button", { name: "Stäng" }));
    expect(screen.queryByRole("region", { name: "Peter Olovsson" })).not.toBeInTheDocument();
    expect(person("Peter Olovsson")).toHaveAttribute("aria-expanded", "false");
  });

  it("shows no bio or link for someone without one", async () => {
    render(<GroupPeople />);
    await userEvent.click(person("Selma Hallqvist"));
    const panel = screen.getByRole("region", { name: "Selma Hallqvist" });
    expect(panel).toHaveTextContent("Senior Product Designer");
    expect(within(panel).queryByRole("link")).not.toBeInTheDocument();
  });
});

describe("GroupPeople with assignment status", () => {
  const statuses = { "Peter Olovsson": "available", "Nhan Ngo": "soon", "Selma Hallqvist": "busy" } as const;

  it("tells each person's status in their name and in the panel", async () => {
    render(<GroupPeople statuses={statuses} />);
    expect(person("Peter Olovsson")).toHaveAccessibleName(/, Tillgänglig nu$/);
    expect(person("Selma Hallqvist")).toHaveAccessibleName(/, På uppdrag$/);
    expect(person("Jens Wedin")).toHaveAccessibleName(/Studio Manfred$/);
    await userEvent.click(person("Nhan Ngo"));
    expect(screen.getByRole("region", { name: "Nhan Ngo" })).toHaveTextContent("Tillgänglig snart");
  });

  it("dims everyone who isn't available now or soon, and combines with the skill filter", async () => {
    render(<GroupPeople statuses={statuses} />);
    const toggle = screen.getByRole("button", { name: "Visa tillgängliga" });
    await userEvent.click(toggle);
    expect(toggle).toHaveAttribute("aria-pressed", "true");
    const dimmed = (name: string) => person(name).closest("li")!.getAttribute("data-dimmed");
    expect(dimmed("Peter Olovsson")).toBe("false");
    expect(dimmed("Nhan Ngo")).toBe("false");
    expect(dimmed("Selma Hallqvist")).toBe("true");
    expect(dimmed("Jens Wedin")).toBe("true");

    await userEvent.click(screen.getByRole("button", { name: "Product" }));
    expect(dimmed("Peter Olovsson")).toBe("true");
    expect(dimmed("Nhan Ngo")).toBe("false");
  });

  it("has no availability toggle without statuses", () => {
    render(<GroupPeople />);
    expect(screen.queryByRole("button", { name: "Visa tillgängliga" })).not.toBeInTheDocument();
  });
});
