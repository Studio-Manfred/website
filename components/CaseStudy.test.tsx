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

describe("CaseStudy hero image and outcomes (STU-1153)", () => {
  it("shows the hero image under the intro, 2:1, with its alt text; none without one", () => {
    const { unmount } = render(<CaseStudy study={study} />);
    const img = screen.getByAltText("A laptop on a desk");
    expect(img).toHaveAttribute("src", "/cases/hero.png");
    expect(img.className).toContain("aspect-[2/1]");
    const intro = screen.getByText(/helped an example client/);
    expect(intro.compareDocumentPosition(img) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    unmount();
    render(<CaseStudy study={{ ...study, heroImage: null }} />);
    expect(screen.queryByAltText("A laptop on a desk")).not.toBeInTheDocument();
  });

  it("Outcomes: the key figure is big and blue above its heading, in a list", () => {
    render(<CaseStudy study={study} />);
    expect(screen.getAllByRole("listitem").filter((li) => li.textContent?.includes("Adoption went up."))).toHaveLength(1);
    const figure = screen.getByText("+28%").closest("p") as HTMLElement;
    expect(figure.className).toContain("text-[var(--color-business-blue)]");
    expect(figure.compareDocumentPosition(screen.getByText("More users")) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
  });

  it("Outcomes: one column when narrow, two once the block is wide enough (container query), a lone last item spans both", () => {
    render(<CaseStudy study={study} />);
    const item = screen.getByText("Calmer support").closest("li") as HTMLElement;
    const list = item.closest("ul") as HTMLElement;
        expect(list.className).toContain("@md:grid-cols-[repeat(2,minmax(0,1fr))]");
    expect(item.className).toContain("@md:last:odd:col-span-2");
  });

  it("Outcomes: an item without a figure keeps an empty figure row so labels line up; none when no item has a figure", () => {
    render(<CaseStudy study={study} />);
    expect(screen.getAllByTestId("figure-gap")).toHaveLength(1);
  });

  it("Outcomes: no figure row at all when no item has a figure", () => {
    const plain = parseCase({ ...fixture[0], blocks: [{ type: "outcomes", heading: "Outcomes", items: [{ heading: "Plain", text: "No number." }] }] });
    render(<CaseStudy study={plain} />);
    expect(screen.queryAllByTestId("figure-gap")).toHaveLength(0);
    expect(screen.getByText("Plain")).toBeInTheDocument();
  });

  it("Outcomes: a leading minus is read as \"minus\"", () => {
    const minus = parseCase({ ...fixture[0], blocks: [{ type: "outcomes", heading: "Outcomes", items: [{ heading: "Churn", text: "Down.", figure: "-40%" }] }] });
    render(<CaseStudy study={minus} />);
    expect(screen.getByText("minus 40%")).toBeInTheDocument();
  });
});
