import { render, screen, fireEvent } from "@testing-library/react";
import { describe, test, expect, vi } from "vitest";
import Carousel from "./Carousel";

describe("Carousel Component", () => {
  const handleNext = vi.fn();
  const handlePrev = vi.fn();
  const onSelect = vi.fn();

  const images = [
    "image1.jpg",
    "image2.jpg",
    "image3.jpg",
    "image4.jpg",
    "image5.jpg",
    "image6.jpg",
  ];

  test("should disable previous button at the start", () => {
    render(
      <Carousel
        images={images}
        selectedIndex={0}
        visibleImagesCount={4}
        translateX={0}
        imageWidth={150}
        onSelect={onSelect}
        handleNext={handleNext}
        handlePrev={handlePrev}
      />
    );

    const prevButton = screen.getByRole("button", { name: /prev/i });
    expect(prevButton).toHaveProperty("disabled", true);
  });

  test("should enable next button at the start", () => {
    render(
      <Carousel
        images={images}
        selectedIndex={0}
        visibleImagesCount={4}
        translateX={0}
        imageWidth={150}
        onSelect={onSelect}
        handleNext={handleNext}
        handlePrev={handlePrev}
      />
    );

    const nextButton = screen.getByRole("button", { name: /next/i });

    expect(nextButton).toHaveProperty("disabled", false);
  });

  test("should disable next button when at the end of the carousel", () => {
    const { rerender } = render(
      <Carousel
        images={images}
        selectedIndex={0}
        visibleImagesCount={4}
        translateX={0}
        imageWidth={150}
        onSelect={onSelect}
        handleNext={handleNext}
        handlePrev={handlePrev}
      />
    );

    const nextButton = screen.getByRole("button", { name: /next/i });
    fireEvent.click(nextButton);
    fireEvent.click(nextButton);

    rerender(
      <Carousel
        images={images}
        selectedIndex={0}
        visibleImagesCount={4}
        translateX={450}
        imageWidth={150}
        onSelect={onSelect}
        handleNext={handleNext}
        handlePrev={handlePrev}
      />
    );

    expect(nextButton).toHaveProperty("disabled", true);
  });

  test("should enable previous button after clicking next", () => {
    const { rerender } = render(
      <Carousel
        images={images}
        selectedIndex={0}
        visibleImagesCount={4}
        translateX={0}
        imageWidth={150}
        onSelect={onSelect}
        handleNext={handleNext}
        handlePrev={handlePrev}
      />
    );

    const nextButton = screen.getByRole("button", { name: /next/i });
    const prevButton = screen.getByRole("button", { name: /prev/i });

    fireEvent.click(nextButton);

    rerender(
      <Carousel
        images={images}
        selectedIndex={0}
        visibleImagesCount={4}
        imageWidth={150}
        translateX={150}
        onSelect={onSelect}
        handleNext={handleNext}
        handlePrev={handlePrev}
      />
    );

    expect(prevButton).toHaveProperty("disabled", false);
  });

  test("should call handleNext when next button is clicked", () => {
    render(
      <Carousel
        images={images}
        selectedIndex={0}
        visibleImagesCount={4}
        translateX={0}
        imageWidth={150}
        onSelect={onSelect}
        handleNext={handleNext}
        handlePrev={handlePrev}
      />
    );
    fireEvent.click(screen.getByRole("button", { name: /next/i }));
    expect(handleNext).toHaveBeenCalled();
  });

  test("should call handlePrev when prev button is clicked", () => {
    render(
      <Carousel
        images={images}
        selectedIndex={0}
        visibleImagesCount={4}
        translateX={150}
        imageWidth={150}
        onSelect={onSelect}
        handleNext={handleNext}
        handlePrev={handlePrev}
      />
    );
    fireEvent.click(screen.getByRole("button", { name: /prev/i }));
    expect(handlePrev).toHaveBeenCalled();
  });

  test("should call onSelect when an image is clicked", () => {
    render(
      <Carousel
        images={images}
        selectedIndex={0}
        visibleImagesCount={4}
        translateX={0}
        imageWidth={1}
        onSelect={onSelect}
        handleNext={handleNext}
        handlePrev={handlePrev}
      />
    );

    fireEvent.click(screen.getByAltText("Product 1"));
    expect(onSelect).toHaveBeenCalledWith(0);
  });
});
