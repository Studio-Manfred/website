import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { act, render } from "@testing-library/react";
import { LoopingPhoto } from "./LoopingPhoto";

vi.mock("next/image", () => ({
  default: ({ src, alt }: { src: string; alt: string }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt} data-testid="looping-photo-img" />
  ),
}));

const images = ["/a.jpg", "/b.jpg", "/c.jpg"];

beforeEach(() => {
  vi.useFakeTimers();
});

afterEach(() => {
  vi.useRealTimers();
});

describe("LoopingPhoto", () => {
  it("renders the first image initially", () => {
    const { getByTestId } = render(<LoopingPhoto images={images} interval={1000} />);
    expect(getByTestId("looping-photo-img").getAttribute("src")).toBe(images[0]);
  });

  it("advances to the next image after the interval", () => {
    const { getByTestId } = render(<LoopingPhoto images={images} interval={1000} />);
    act(() => {
      vi.advanceTimersByTime(1000);
    });
    expect(getByTestId("looping-photo-img").getAttribute("src")).toBe(images[1]);
  });

  it("wraps the index back to zero after the last image", () => {
    const { getByTestId } = render(<LoopingPhoto images={images} interval={1000} />);
    act(() => {
      vi.advanceTimersByTime(1000 * images.length);
    });
    expect(getByTestId("looping-photo-img").getAttribute("src")).toBe(images[0]);
  });

  it("clears the interval on unmount", () => {
    const clearSpy = vi.spyOn(globalThis, "clearInterval");
    const { unmount } = render(<LoopingPhoto images={images} interval={1000} />);
    unmount();
    expect(clearSpy).toHaveBeenCalled();
    clearSpy.mockRestore();
  });

  it("does not start an interval when only a single image is provided", () => {
    const setSpy = vi.spyOn(globalThis, "setInterval");
    const before = setSpy.mock.calls.length;
    render(<LoopingPhoto images={["/only.jpg"]} interval={1000} />);
    expect(setSpy.mock.calls.length).toBe(before);
    setSpy.mockRestore();
  });
});
