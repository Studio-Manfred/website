import { describe, expect, it } from "vitest";
import { render, screen, within } from "@testing-library/react";
import fixture from "@/test/fixtures/cases.json";
import { parseCase } from "@/lib/cases";
import { CaseStudy } from "./CaseStudy";

const study = parseCase(fixture[0]);

describe("CaseStudy (STU-1146)", () => {
  it("renders the header: category line, one h1 and the intro", () => {
    render(<CaseStudy study={study} />);
    expect(screen.getByText("Consumer App · UX Research")).toBeInTheDocument();
    expect(screen.getAllByRole("heading", { level: 1 }).map((h) => h.textContent)).toEqual(["Example Client"]);
    expect(screen.getByText(/helped an example client/)).toBeInTheDocument();
  });

  it("renders the blocks in order with their headings", () => {
    render(<CaseStudy study={study} />);
    expect(screen.getAllByRole("heading", { level: 2 }).map((h) => h.textContent)).toEqual([
      "Brief",
      "Process & Methods",
      "Deliverables",
      "Outcomes",
    ]);
  });

  it("Brief: paragraphs split on blank lines, and bullets", () => {
    render(<CaseStudy study={study} />);
    expect(screen.getByText("The client needed to understand their users.")).toBeInTheDocument();
    expect(screen.getByText("It had three goals:")).toBeInTheDocument();
    expect(screen.getByText("Goal one")).toBeInTheDocument();
  });

  it("Process uses the timeline; Deliverables shows images with their note; Outcomes lists headings", () => {
    render(<CaseStudy study={study} />);
    expect(screen.getByRole("button", { name: "Validation" })).toBeInTheDocument();
    expect(screen.getByAltText("Journey map")).toHaveAttribute("src", "/cases/example.png");
    expect(screen.getByText("Sample data only.")).toBeInTheDocument();
    expect(screen.getByText("More users")).toBeInTheDocument();
  });

  it("an image note that is switched off is not shown", () => {
    const off = parseCase({ ...fixture[0], blocks: [{ type: "deliverables", images: [{ src: "a.png", alt: "A", note: "Hidden note", show_note: false }] }] });
    render(<CaseStudy study={off} />);
    expect(screen.queryByText("Hidden note")).not.toBeInTheDocument();
    expect(screen.queryByText(/No real numbers/)).not.toBeInTheDocument();
  });

  it("sidebar: consultant with photo and title, then each fact box", () => {
    render(<CaseStudy study={study} />);
    const aside = screen.getByRole("complementary");
    expect(within(aside).getByText("Consultant")).toBeInTheDocument();
    expect(within(aside).getByAltText("Moa Bogren")).toBeInTheDocument();
    expect(within(aside).getByText("UX Lead")).toBeInTheDocument();
    expect(within(aside).getByText("Markets")).toBeInTheDocument();
    expect(within(aside).getByText("United States")).toBeInTheDocument();
  });

  it("no sidebar when there is nothing in it", () => {
    render(<CaseStudy study={{ ...study, sidebar: { consultants: [], facts: [] } }} />);
    expect(screen.queryByRole("complementary")).not.toBeInTheDocument();
  });
});
