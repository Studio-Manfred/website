import { describe, expect, it } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { CaseLightbox } from "./CaseLightbox";

const props = { src: "/cases/x.png", alt: "Segment matrix", label: "B2B Segment Matrix" };

describe("CaseLightbox", () => {
  it("renders the label and a single thumbnail while closed", () => {
    render(<CaseLightbox {...props} />);
    expect(screen.getByText("B2B Segment Matrix")).toBeInTheDocument();
    expect(screen.getAllByAltText("Segment matrix")).toHaveLength(1);
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });

  it("opens the enlarged image when the thumbnail is clicked", () => {
    render(<CaseLightbox {...props} />);
    fireEvent.click(screen.getByAltText("Segment matrix"));
    expect(screen.getAllByAltText("Segment matrix")).toHaveLength(2);
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("closes from the close button", () => {
    render(<CaseLightbox {...props} />);
    fireEvent.click(screen.getByAltText("Segment matrix"));
    fireEvent.click(screen.getByRole("button"));
    expect(screen.getAllByAltText("Segment matrix")).toHaveLength(1);
  });

  it("closes when the backdrop is clicked", () => {
    render(<CaseLightbox {...props} />);
    fireEvent.click(screen.getByAltText("Segment matrix"));
    const enlarged = screen.getAllByAltText("Segment matrix")[1];
    fireEvent.click(enlarged.parentElement!.parentElement!);
    expect(screen.getAllByAltText("Segment matrix")).toHaveLength(1);
  });
});
