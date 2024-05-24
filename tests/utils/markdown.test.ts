import { describe, it, expect } from "vitest";
import { getSlugByPath } from "../../src/utils";

describe("getSlugByPath", () => {
  it('should remove the ".md" extension from the given file path', () => {
    const input = "example-file.md";
    const output = "example-file";
    expect(getSlugByPath(input)).toBe(output);
  });

  it('should return the same string if there is no ".md" extension', () => {
    const input = "example-file.txt";
    const output = "example-file.txt";
    expect(getSlugByPath(input)).toBe(output);
  });

  it("should return an empty string if the input is an empty string", () => {
    const input = "";
    const output = "";
    expect(getSlugByPath(input)).toBe(output);
  });

  it('should remove only the ".md" extension from the end of the string', () => {
    const input = "path/to/file.md";
    const output = "path/to/file";
    expect(getSlugByPath(input)).toBe(output);
  });

  it('should handle paths with multiple ".md" correctly', () => {
    const input = "path/to/file/something.md";
    const output = "path/to/file/something";
    expect(getSlugByPath(input)).toBe(output);
  });
});
