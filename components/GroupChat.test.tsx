import { afterEach, describe, expect, it, vi } from "vitest";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { GroupChat } from "./GroupChat";
import { GROUP_COMPANIES } from "@/lib/group";

const answers = Object.fromEntries(GROUP_COMPANIES.map((c) => [c.id, `Svar från ${c.name}`]));

function mockFetch(...responses: Response[]) {
  const fn = vi.fn();
  for (const r of responses) fn.mockResolvedValueOnce(r);
  vi.stubGlobal("fetch", fn);
  return fn;
}

afterEach(() => vi.unstubAllGlobals());

describe("GroupChat", () => {
  it("asks a question and shows one answer per company", async () => {
    const fetchMock = mockFetch(Response.json({ answers }));
    render(<GroupChat />);
    await userEvent.type(screen.getByRole("textbox", { name: /fråga/i }), "Vilka är ni?");
    await userEvent.click(screen.getByRole("button", { name: /skicka/i }));

    expect(await screen.findByText("Svar från Mather Studio")).toBeInTheDocument();
    for (const c of GROUP_COMPANIES) {
      const card = screen.getByRole("article", { name: c.name });
      expect(within(card).getByText(answers[c.id])).toBeInTheDocument();
    }
    expect(screen.getByRole("listitem", { name: "Du: Vilka är ni?" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Vad är ni bäst på?" })).toBeInTheDocument();
    expect(JSON.parse(fetchMock.mock.calls[0][1].body)).toEqual({ question: "Vilka är ni?", history: [] });
    expect(screen.getByRole("textbox", { name: /fråga/i })).toHaveValue("");
  });

  it("highlights the words each company marks with double asterisks", async () => {
    const marked = Object.fromEntries(GROUP_COMPANIES.map((c) => [c.id, `Vi är **${c.name}** och vi **växer**.`]));
    mockFetch(Response.json({ answers: marked }));
    render(<GroupChat />);
    await userEvent.click(screen.getByRole("button", { name: "Vilka är ni?" }));
    await screen.findAllByText("växer", { selector: "strong" });
    for (const c of GROUP_COMPANIES) {
      const card = screen.getByRole("article", { name: c.name });
      const strong = within(card).getByText("växer", { selector: "strong" });
      expect(strong).toHaveAttribute("data-company", c.id);
      expect(card).not.toHaveTextContent("**");
      expect(card).toHaveTextContent(`Vi är ${c.name} och vi växer.`);
    }
  });

  it("sends earlier turns as history and asks suggestions on click", async () => {
    const fetchMock = mockFetch(Response.json({ answers }), Response.json({ answers }));
    render(<GroupChat />);
    await userEvent.click(screen.getByRole("button", { name: "Vilka är ni?" }));
    await screen.findByText("Svar från Mather Studio");
    await userEvent.type(screen.getByRole("textbox", { name: /fråga/i }), "Och sen?");
    await userEvent.click(screen.getByRole("button", { name: /skicka/i }));
    await vi.waitFor(() => expect(fetchMock).toHaveBeenCalledTimes(2));
    expect(JSON.parse(fetchMock.mock.calls[1][1].body).history).toEqual([{ question: "Vilka är ni?", answers }]);
  });

  it("shows each company thinking in its own way while the answer is on its way", async () => {
    vi.stubGlobal("fetch", vi.fn(() => new Promise(() => {})));
    render(<GroupChat />);
    expect(screen.queryByText(/svarar på din fråga/)).not.toBeInTheDocument();
    expect(screen.queryByText(/Fråga oss vad du vill/)).not.toBeInTheDocument();
    await userEvent.click(screen.getByRole("button", { name: "Vilka är ni?" }));
    const thinking = screen.getAllByRole("status");
    expect(thinking.map((t) => t.getAttribute("data-company"))).toEqual(GROUP_COMPANIES.map((c) => c.id));
    for (const c of GROUP_COMPANIES) {
      const status = screen.getByRole("status", { name: `${c.name} tänker` });
      expect(status.querySelector(`[data-mark="${c.id}"]`)).not.toBeNull();
    }
  });

  it("shows an error when the request fails", async () => {
    mockFetch(new Response("", { status: 502 }));
    render(<GroupChat />);
    await userEvent.click(screen.getByRole("button", { name: "Vilka är ni?" }));
    expect(await screen.findByRole("alert")).toHaveTextContent(/gick inte/i);
  });
});
