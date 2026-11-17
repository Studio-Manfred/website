import type { Screenshot } from "@/lib/evaluation/evaluate";

// Screenshots are shrunk in the browser before upload: at most 1400 px wide,
// as JPEG. Enough for the model to read the page, small enough to send three.
const MAX_WIDTH = 1400;

export async function toScreenshot(file: File): Promise<Screenshot> {
  const bitmap = await createImageBitmap(file);
  const scale = Math.min(1, MAX_WIDTH / bitmap.width);
  const canvas = document.createElement("canvas");
  canvas.width = Math.round(bitmap.width * scale);
  canvas.height = Math.round(Math.min(bitmap.height * scale, 4000));
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("This browser can't read images.");
  ctx.fillStyle = "#fff";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(bitmap, 0, 0, bitmap.width * scale, bitmap.height * scale);
  const url = canvas.toDataURL("image/jpeg", 0.82);
  return { mediaType: "image/jpeg", data: url.slice(url.indexOf(",") + 1) };
}
