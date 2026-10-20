import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen, within } from "@testing-library/react";
import { SharedCv } from "./SharedCv";

const cv = {
  title: "Senior UX @ Example Bank",
  language: "en" as const,
  contentHtml: "<h2>Introduction</h2><p>Moa is a researcher.</p>",
  name: "Moa Bogren",
  email: "moa@studiomanfred.com",
  avatarUrl: "https://x/moa.jpg",
  cases: [{ title: "Example Client", slug: "example-case" }],
};

describe("SharedCv (STU-1155)", () => {
  it("one h1 with the name, the CV title, and the CV text", () => {
    render(<SharedCv cv={cv} />);
    expect(screen.getAllByRole("heading", { level: 1 }).map((h) => h.textContent)).toEqual(["Moa Bogren"]);
    expect(screen.getByText("Senior UX @ Example Bank")).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 2, name: "Introduction" })).toBeInTheDocument();
    expect(screen.getByText("Curriculum Vitae · Studio Manfred")).toBeInTheDocument();
  });

  it("sidebar: photo, email as a mail link, Studio Manfred · Stockholm, and the cases as links", () => {
    render(<SharedCv cv={cv} />);
    const aside = screen.getByRole("complementary");
    expect(within(aside).getByAltText("Moa Bogren")).toBeInTheDocument();
    expect(within(aside).getByRole("link", { name: "moa@studiomanfred.com" })).toHaveAttribute("href", "mailto:moa@studiomanfred.com");
    expect(within(aside).getByText("Stockholm")).toBeInTheDocument();
    expect(within(aside).getByRole("link", { name: "Example Client" })).toHaveAttribute("href", "/cases/example-case");
  });

  it("no Cases box without cases; Swedish labels for a Swedish CV", () => {
    render(<SharedCv cv={{ ...cv, language: "sv", cases: [] }} />);
    expect(screen.queryByText("Cases")).not.toBeInTheDocument();
    expect(screen.getByText("Kontakt")).toBeInTheDocument();
  });

  it("Download PDF opens the print dialog", () => {
    const print = vi.spyOn(window, "print").mockImplementation(() => {});
    render(<SharedCv cv={cv} />);
    fireEvent.click(screen.getByRole("button", { name: /Download PDF/ }));
    expect(print).toHaveBeenCalled();
  });
});
