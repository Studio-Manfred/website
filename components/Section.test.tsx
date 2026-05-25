import { describe, expect, it, vi } from "vitest";
import { render } from "@testing-library/react";
import { Section } from "./Section";

// Mock DS Container the way other tests mock @/components/ds — render a
// plain <div> + forward className/style + render children. Lets us assert
// Section's contract without booting the Radix-flavoured DS.
vi.mock("@/components/ds", () => ({
  Container: ({
    as: As = "div",
    style,
    className,
    children,
  }: {
    as?: string;
    style?: React.CSSProperties;
    className?: string;
    children?: React.ReactNode;
  }) => {
    const Element = As as keyof React.JSX.IntrinsicElements;
    return (
      <Element data-testid="ds-container" data-as={As} style={style} className={className}>
        {children}
      </Element>
    );
  },
}));

describe("Section", () => {
  it("renders as a <section> by default and wraps children in DS Container", () => {
    const { container, getByTestId } = render(<Section>hello</Section>);
    const sec = container.querySelector("section");
    expect(sec).not.toBeNull();
    expect(getByTestId("ds-container")).toBeInTheDocument();
    expect(getByTestId("ds-container").textContent).toBe("hello");
  });

  it("respects the `as` prop for the outer landmark", () => {
    const { container } = render(<Section as="main">x</Section>);
    expect(container.querySelector("main")).not.toBeNull();
    expect(container.querySelector("section")).toBeNull();
  });

  it("maps width=narrow / default / xl / wide to 720 / 960 / 1100 / 1200 px maxWidth", () => {
    const cases = [
      ["narrow", "720px"],
      ["default", "960px"],
      ["xl", "1100px"],
      ["wide", "1200px"],
    ] as const;
    for (const [width, expected] of cases) {
      const { getByTestId, unmount } = render(<Section width={width}>x</Section>);
      const ds = getByTestId("ds-container");
      expect(ds.style.maxWidth, `width=${width}`).toBe(expected);
      unmount();
    }
  });

  it("translates padding=first to pt-24 md:pt-40 pb-16 md:pb-24", () => {
    const { container } = render(<Section padding="first">x</Section>);
    const sec = container.querySelector("section")!;
    expect(sec.className).toContain("pt-24");
    expect(sec.className).toContain("md:pt-40");
    expect(sec.className).toContain("pb-16");
    expect(sec.className).toContain("md:pb-24");
  });

  it("translates padding=default to py-28 md:py-40", () => {
    const { container } = render(<Section padding="default">x</Section>);
    expect(container.querySelector("section")!.className).toMatch(/\bpy-28\b/);
    expect(container.querySelector("section")!.className).toMatch(/md:py-40/);
  });

  it("applies the blue brand background AND cursor-white together", () => {
    const { container } = render(<Section background="blue">x</Section>);
    const cls = container.querySelector("section")!.className;
    expect(cls).toContain("bg-[var(--color-business-blue)]");
    expect(cls).toContain("cursor-white");
  });

  it("white background defaults to bg-white (no cursor-white)", () => {
    const { container } = render(<Section background="white">x</Section>);
    const cls = container.querySelector("section")!.className;
    expect(cls).toContain("bg-white");
    expect(cls).not.toContain("cursor-white");
  });

  it("always emits horizontal page padding (px-6 md:px-12)", () => {
    const { container } = render(<Section>x</Section>);
    const cls = container.querySelector("section")!.className;
    expect(cls).toContain("px-6");
    expect(cls).toContain("md:px-12");
  });

  it("centres content text when align=center is passed", () => {
    const { getByTestId } = render(<Section align="center">x</Section>);
    expect(getByTestId("ds-container").className).toContain("text-center");
  });

  it("merges a caller className onto the outer landmark", () => {
    const { container } = render(<Section className="my-custom min-h-screen">x</Section>);
    const cls = container.querySelector("section")!.className;
    expect(cls).toContain("my-custom");
    expect(cls).toContain("min-h-screen");
  });
});
