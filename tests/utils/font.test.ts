import { describe, it, expect, vi } from "vitest";
import { fetchFonts } from "../../src/utils";

// Mock the fetch function
global.fetch = vi.fn().mockImplementation((url) => {
  return Promise.resolve({
    arrayBuffer: () => Promise.resolve(new ArrayBuffer(8)),
  });
});

describe("fetchFonts", () => {
  it("should fetch fonts and return Font objects", async () => {
    const expectedFonts = [
      {
        name: "Roboto-Bold",
        url: "https://cdn.jsdelivr.net/npm/roboto-font@0.1.0/fonts/Roboto/roboto-bold-webfont.ttf",
        weight: 400,
        style: "normal",
        data: new ArrayBuffer(8), // Mocked array buffer data
      },
    ];

    const fonts = await fetchFonts();

    expect(fonts).toEqual(expectedFonts);
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(
      "https://cdn.jsdelivr.net/npm/roboto-font@0.1.0/fonts/Roboto/roboto-bold-webfont.ttf",
    );
  });
});
