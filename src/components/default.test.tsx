import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import DefaultTemplate from "./default";
import { Author } from "@/types";

describe("DefaultTemplate", () => {
  it("renders the title correctly", () => {
    const title = "Test Title";
    render(DefaultTemplate(title));

    const titleElement = screen.getByText(title);
    expect(titleElement).toBeInTheDocument();
    expect(titleElement).toHaveStyle({ fontSize: "60px", fontWeight: "700" });
  });

  it("renders author information when provided", () => {
    const title = "Test Title";
    const author: Author = {
      name: "John Doe",
      imageURL: "http://example.com/image.jpg",
    };

    render(DefaultTemplate(title, author));

    const nameElement = screen.getByText(author.name as string);
    expect(nameElement).toBeInTheDocument();
    expect(nameElement).toHaveStyle({
      marginLeft: "16px",
      fontSize: "40px",
      fontWeight: "500",
    });

    const imageElement = screen.getByAltText("");
    expect(imageElement).toBeInTheDocument();
    expect(imageElement).toHaveAttribute("src", author.imageURL);
  });

  it("does not render author information when not provided", () => {
    const title = "Test Title";
    render(DefaultTemplate(title));

    const nameElement = screen.queryByText(/John Doe/i);
    expect(nameElement).not.toBeInTheDocument();

    const imageElement = screen.queryByAltText("");
    expect(imageElement).not.toBeInTheDocument();
  });
});
