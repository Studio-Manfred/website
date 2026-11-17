import { afterEach, describe, expect, it, vi } from "vitest";
import { toScreenshot } from "./screenshots";

const stubCanvas = (ctx: object | null) => {
  vi.spyOn(HTMLCanvasElement.prototype, "getContext").mockReturnValue(ctx as never);
  vi.spyOn(HTMLCanvasElement.prototype, "toDataURL").mockReturnValue("data:image/jpeg;base64,QUJD");
};

afterEach(() => {
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
});

describe("toScreenshot", () => {
  it("shrinks wide images to 1400 px and returns JPEG data", async () => {
    vi.stubGlobal("createImageBitmap", vi.fn().mockResolvedValue({ width: 2800, height: 1000 }));
    const draw = { fillStyle: "", fillRect: vi.fn(), drawImage: vi.fn() };
    stubCanvas(draw);
    const shot = await toScreenshot(new File(["x"], "a.png", { type: "image/png" }));
    expect(shot).toEqual({ mediaType: "image/jpeg", data: "QUJD" });
    expect(draw.drawImage).toHaveBeenCalledWith(expect.anything(), 0, 0, 1400, 500);
  });

  it("fails when the browser has no canvas", async () => {
    vi.stubGlobal("createImageBitmap", vi.fn().mockResolvedValue({ width: 100, height: 100 }));
    stubCanvas(null);
    await expect(toScreenshot(new File(["x"], "a.png"))).rejects.toThrow(/can't read images/);
  });
});
