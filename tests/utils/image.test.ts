import { describe, it, expect, vi, beforeEach } from "vitest";
import fs from "fs";
import path from "path";
import satori from "satori";
import sharp from "sharp";
import { generateAndSaveImage } from "../../src/utils";

// Mock the fs, path, satori, and sharp modules
vi.mock("fs");
vi.mock("path");
vi.mock("satori");
vi.mock("sharp");

describe("generateAndSaveImage", () => {
  const mockSvg = "<svg></svg>";
  const mockPngBuffer = Buffer.from("mock-png-buffer");
  const mockFile = { path: "file.png", title: "Test Title" };
  const outDir = "/output";
  const options = { width: 100, height: 100, fonts: [] };
  let mockFilePath, mockDir;

  beforeEach(() => {
    vi.resetAllMocks();

    mockFilePath = path.join(outDir, mockFile.path);
    mockDir = path.dirname(mockFilePath);

    (satori as any).mockResolvedValue(mockSvg);
    (sharp as any).mockReturnValue({
      png: vi.fn().mockReturnThis(),
      toBuffer: vi.fn().mockResolvedValue(mockPngBuffer),
    });
    (path.dirname as any).mockReturnValue(mockDir);
    (fs.writeFileSync as any).mockImplementation(() => {});
    vi.spyOn(console, "error").mockImplementation(() => {});
  });

  it("should generate and save a PNG image from a file object", async () => {
    (fs.existsSync as any).mockReturnValue(false);
    (fs.mkdirSync as any).mockImplementation(() => {});

    await generateAndSaveImage(mockFile, outDir, options);

    expect(satori).toHaveBeenCalledWith(expect.anything(), options);
    expect(sharp).toHaveBeenCalledWith(Buffer.from(mockSvg));
    expect(path.dirname).toHaveBeenCalledWith(mockFilePath);
    expect(fs.existsSync).toHaveBeenCalledWith(mockDir);
    expect(fs.mkdirSync).toHaveBeenCalledWith(mockDir, { recursive: true });
    expect(fs.writeFileSync).toHaveBeenCalledWith(mockFilePath, mockPngBuffer);
  });

  it("should not create directory if it already exists", async () => {
    (fs.existsSync as any).mockReturnValue(true);

    await generateAndSaveImage(mockFile, outDir, options);

    expect(satori).toHaveBeenCalledWith(expect.anything(), options);
    expect(sharp).toHaveBeenCalledWith(Buffer.from(mockSvg));
    expect(path.dirname).toHaveBeenCalledWith(mockFilePath);
    expect(fs.existsSync).toHaveBeenCalledWith(mockDir);
    expect(fs.mkdirSync).not.toHaveBeenCalled();
    expect(fs.writeFileSync).toHaveBeenCalledWith(mockFilePath, mockPngBuffer);
  });

  it("should log an error if satori throws an error", async () => {
    const mockError = new Error("satori error");
    (satori as any).mockRejectedValue(mockError);

    await generateAndSaveImage(mockFile, outDir, options);

    expect(console.error).toHaveBeenCalledWith(
      `Error processing file ${mockFile.path}:`,
      mockError,
    );
  });

  it("should log an error if sharp throws an error", async () => {
    const mockError = new Error("sharp error");
    (sharp as any).mockReturnValue({
      png: vi.fn().mockReturnThis(),
      toBuffer: vi.fn().mockRejectedValue(mockError),
    });

    await generateAndSaveImage(mockFile, outDir, options);

    expect(console.error).toHaveBeenCalledWith(
      `Error processing file ${mockFile.path}:`,
      mockError,
    );
  });

  it("should log an error if fs.writeFileSync throws an error", async () => {
    const mockError = new Error("fs error");
    (fs.writeFileSync as any).mockImplementation(() => {
      throw mockError;
    });

    await generateAndSaveImage(mockFile, outDir, options);

    expect(console.error).toHaveBeenCalledWith(
      `Error processing file ${mockFile.path}:`,
      mockError,
    );
  });
});
