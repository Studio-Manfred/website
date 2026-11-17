import { describe, expect, it } from "vitest";
import { contact } from "./contact";

describe("contact", () => {
  it("has the studio email", () => {
    expect(contact.email).toBe("hello@studiomanfred.com");
  });

  it("writes the phone number the way the footer shows it", () => {
    expect(contact.phone).toBe("079 — 336 29 10");
  });
});
