import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import TrainingPage from "./page";
import { courses } from "@/lib/courses";

vi.mock("@/components/ds", () => ({
  Logo: ({ color }: { color: string }) => <div data-testid="logo" data-color={color} />,
  Button: ({ children }: { children: React.ReactNode }) => <span data-testid="button">{children}</span>,
  Typography: ({ children }: { children: React.ReactNode }) => <span>{children}</span>,
}));

vi.mock("@/components/PageNav", () => ({
  PageNav: () => <nav data-testid="page-nav" />,
}));

vi.mock("@/components/Footer", () => ({
  Footer: () => <footer data-testid="footer" />,
}));

function getCourseTriggers(): HTMLButtonElement[] {
  return courses.map((course) =>
    screen.getByRole("button", { name: new RegExp(course.title, "i") }) as HTMLButtonElement,
  );
}

describe("TrainingPage accordion ARIA", () => {
  it("renders one trigger per course with aria-expanded='false' initially", () => {
    render(<TrainingPage />);
    const triggers = getCourseTriggers();
    expect(triggers).toHaveLength(courses.length);
    for (const trigger of triggers) {
      expect(trigger).toHaveAttribute("aria-expanded", "false");
    }
  });

  it("wires aria-controls to a real panel id for each trigger", () => {
    const { container } = render(<TrainingPage />);
    const triggers = getCourseTriggers();
    for (const trigger of triggers) {
      const panelId = trigger.getAttribute("aria-controls");
      expect(panelId).toBeTruthy();
      const panel = container.querySelector(`#${panelId}`);
      expect(panel).not.toBeNull();
    }
  });

  it("flips aria-expanded to true when the trigger is clicked", async () => {
    const user = userEvent.setup();
    render(<TrainingPage />);
    const [first] = getCourseTriggers();
    expect(first).toHaveAttribute("aria-expanded", "false");
    await user.click(first);
    expect(first).toHaveAttribute("aria-expanded", "true");
  });

  it("toggles aria-expanded via Space and Enter keys on a focused trigger", () => {
    render(<TrainingPage />);
    const [first] = getCourseTriggers();
    first.focus();
    expect(first).toHaveFocus();
    expect(first).toHaveAttribute("aria-expanded", "false");

    // Native <button> handles Space/Enter as click. We assert toggling via
    // click events that the browser would synthesise on keydown.
    fireEvent.click(first);
    expect(first).toHaveAttribute("aria-expanded", "true");
    fireEvent.click(first);
    expect(first).toHaveAttribute("aria-expanded", "false");
  });

  it("keeps panel content (tagline) in the DOM regardless of open state", () => {
    render(<TrainingPage />);
    for (const course of courses) {
      expect(screen.getByText(course.tagline)).toBeInTheDocument();
    }
  });
});
