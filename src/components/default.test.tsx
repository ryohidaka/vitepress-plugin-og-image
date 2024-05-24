import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import DefaultTemplate from "./default";

describe("DefaultTemplate", () => {
  it("renders the title correctly", () => {
    const title = "Test Title";
    render(DefaultTemplate(title));

    const titleElement = screen.getByText(title);
    expect(titleElement).toBeInTheDocument();
    expect(titleElement).toHaveStyle({ fontSize: "60px", fontWeight: "700" });
  });
});
