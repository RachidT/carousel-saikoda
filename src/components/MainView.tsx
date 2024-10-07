import React from "react";
import "../styles/MainView.modules.css";

interface MainViewProps {
  selectedImage: string;
  productDescription: string;
}

const MainView: React.FC<MainViewProps> = ({
  selectedImage,
  productDescription,
}) => {
  return (
    <div className="main-view">
      <img src={selectedImage} alt="Selected product" className="main-view" />
      <div className="main-view-description">
        <p>{productDescription}</p>
      </div>
    </div>
  );
};

export default MainView;
