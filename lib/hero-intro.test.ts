import { describe, expect, it } from "vitest";
import {
  HOLD_FRAME,
  INTRO_DURATION_MS,
  INTRO_TIMEOUT_MS,
  frameAt,
  initialPhase,
  nextPhase,
  textStartTimes,
  type IntroEvent,
  type IntroPhase,
} from "./hero-intro";

const PHASES: IntroPhase[] = ["pending", "playing", "done"];
const EVENTS: IntroEvent[] = ["ready", "complete", "error", "timeout", "skip"];

describe("initialPhase", () => {
  it("starts pending", () => {
    expect(initialPhase(false)).toBe("pending");
  });

  it("starts done for reduced motion", () => {
    expect(initialPhase(true)).toBe("done");
  });
});

describe("nextPhase", () => {
  it("moves pending to playing on ready", () => {
    expect(nextPhase("pending", "ready")).toBe("playing");
  });

  it("ignores ready once playing", () => {
    expect(nextPhase("playing", "ready")).toBe("playing");
  });

  it("moves playing to done on complete", () => {
    expect(nextPhase("playing", "complete")).toBe("done");
  });

  it("ignores complete while pending", () => {
    expect(nextPhase("pending", "complete")).toBe("pending");
  });

  it("moves any phase to done on error", () => {
    for (const phase of PHASES) {
      expect(nextPhase(phase, "error")).toBe("done");
    }
  });

  it("moves pending and playing to done on skip", () => {
    expect(nextPhase("pending", "skip")).toBe("done");
    expect(nextPhase("playing", "skip")).toBe("done");
  });

  it("moves pending and playing to done on timeout", () => {
    expect(nextPhase("pending", "timeout")).toBe("done");
    expect(nextPhase("playing", "timeout")).toBe("done");
  });

  it("ignores every event once done", () => {
    for (const event of EVENTS) {
      expect(nextPhase("done", event)).toBe("done");
    }
  });
});

describe("timing", () => {
  it("holds frame 71 and runs at 25 fps and 1.5x speed", () => {
    expect(HOLD_FRAME).toBe(71);
    expect(INTRO_DURATION_MS).toBe(1893);
  });

  it("gives up after 4 seconds", () => {
    expect(INTRO_TIMEOUT_MS).toBe(4000);
  });
});

describe("frameAt", () => {
  it("is frame 0 at the start and before it", () => {
    expect(frameAt(0)).toBe(0);
    expect(frameAt(-250)).toBe(0);
  });

  it("moves 37.5 frames per second", () => {
    expect(frameAt(100)).toBe(3);
    expect(frameAt(800)).toBe(30);
  });

  it("reaches the hold frame at the end and stays there", () => {
    expect(frameAt(INTRO_DURATION_MS)).toBe(HOLD_FRAME);
    expect(frameAt(INTRO_DURATION_MS + 5000)).toBe(HOLD_FRAME);
  });
});

describe("textStartTimes", () => {
  it("starts the headline when the drawing is done and the button 300 ms later", () => {
    expect(textStartTimes(1000)).toEqual({ headline: 1000, button: 1300 });
  });

  it("uses the intro duration", () => {
    expect(textStartTimes(INTRO_DURATION_MS)).toEqual({
      headline: 1893,
      button: 2193,
    });
  });
});
