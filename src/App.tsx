import MainView from "./components/MainView";
import Carousel from "./components/Carousel";
import { useCarousel } from "./hooks/useCarousel";
import {
  luffy,
  shanks,
  zoro,
  sanji,
  demonSlayer,
  gojo,
  pilier,
  kaiju,
} from "./assets";

const PRODUCT_DESCRIPTION =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec purus nec nunc ultricies ultricies.";

function App() {
  const images = [luffy, shanks, zoro, sanji, demonSlayer, gojo, pilier, kaiju];

  const {
    selectedIndex,
    translateX,
    handleNext,
    handlePrev,
    selectImage,
    visibleImagesCount,
    imageWidth,
  } = useCarousel(images);

  return (
    <>
      <MainView
        selectedImage={images[selectedIndex]}
        productDescription={PRODUCT_DESCRIPTION}
      />
      <Carousel
        images={images}
        selectedIndex={selectedIndex}
        onSelect={selectImage}
        handleNext={handleNext}
        handlePrev={handlePrev}
        translateX={translateX}
        visibleImagesCount={visibleImagesCount}
        imageWidth={imageWidth}
      />
    </>
  );
}

export default App;
