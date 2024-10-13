import { useState, useRef, useEffect } from "react";

export const useCarousel = (images: string[]) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [translateX, setTranslateX] = useState(0);
  const [visibleImagesCount, setVisibleImagesCount] = useState(4);
  const [imageWidth, setImageWidth] = useState(350);
  const carouselContainerRef = useRef<HTMLDivElement>(null);

  const updateVisibleImagesCount = () => {
    const width = window.innerWidth;
    const breakpoints = [
      { minWidth: 1440, images: 4 },
      { minWidth: 1280, images: 3 },
      { minWidth: 1024, images: 3 },
      { minWidth: 960, images: 3 },
      { minWidth: 768, images: 3 },
      { minWidth: 640, images: 2 },
      { minWidth: 0, images: 1 },
    ];

    const matchingBreakpoint = breakpoints.find(
      (breakpoint) => width >= breakpoint.minWidth
    )?.images;

    if (matchingBreakpoint) {
      setVisibleImagesCount(matchingBreakpoint);
    }
  };

  const updateImageWidth = () => {
    const containerWidth = carouselContainerRef?.current?.clientWidth || 0;
    if (containerWidth) {
      setImageWidth(containerWidth / visibleImagesCount);
    }
  };

  useEffect(() => {
    updateVisibleImagesCount();
    updateImageWidth();
    window.addEventListener("resize", updateVisibleImagesCount);
    window.addEventListener("resize", updateImageWidth);
    return () => {
      window.removeEventListener("resize", updateVisibleImagesCount);
      window.removeEventListener("resize", updateImageWidth);
    };
  }, [visibleImagesCount]);

  const handleNext = () => {
    const maxTranslateX = (images.length - visibleImagesCount) * imageWidth;

    if (Math.abs(translateX) < maxTranslateX) {
      setTranslateX((prevTranslateX) => {
        const newTranslateX = prevTranslateX - imageWidth;
        return Math.abs(newTranslateX) > maxTranslateX
          ? -maxTranslateX
          : newTranslateX;
      });
    }
  };

  const handlePrev = () => {
    if (translateX < 0) {
      setTranslateX((prevTranslateX) => {
        const newTranslateX = prevTranslateX + imageWidth;
        return newTranslateX > 0 ? 0 : newTranslateX;
      });
    }
  };

  const isPrevButtonDisabled = translateX === 0;
  const isNextButtonDisabled =
    Math.abs(translateX) >= (images.length - visibleImagesCount) * imageWidth;

  const selectImage = (index: number) => {
    setSelectedIndex(index);
  };

  return {
    selectedIndex,
    translateX,
    handleNext,
    handlePrev,
    selectImage,
    visibleImagesCount,
    imageWidth,
    carouselContainerRef,
    isPrevButtonDisabled,
    isNextButtonDisabled,
  };
};
