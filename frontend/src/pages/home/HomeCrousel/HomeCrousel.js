import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const images = [
  'https://www.titan.co.in/dw/image/v2/BKDD_PRD/on/demandware.static/-/Library-Sites-TitanSharedLibrary/default/dw754b5288/images/homepage/All_Banners/Ti_Automatics_April2025_D.jpg',
  'https://www.titan.co.in/dw/image/v2/BKDD_PRD/on/demandware.static/-/Library-Sites-TitanSharedLibrary/default/dwfeedbf65/images/homepage/All_Banners/BestSellers_Sept_D.jpg',
  'https://www.titan.co.in/dw/image/v2/BKDD_PRD/on/demandware.static/-/Library-Sites-TitanSharedLibrary/default/dwbfab0d70/images/homepage/All_Banners/Oct_NewArrivals_D.jpg',
  'https://www.titan.co.in/dw/image/v2/BKDD_PRD/on/demandware.static/-/Library-Sites-TitanSharedLibrary/default/dwea044f00/images/homepage/All_Banners/Nebula_AT_D.jpg',
  'https://www.titan.co.in/dw/image/v2/BKDD_PRD/on/demandware.static/-/Library-Sites-TitanSharedLibrary/default/dw57d234af/images/homepage/All_Banners/Raga_Jan_D.jpg',
  'https://www.titan.co.in/dw/image/v2/BKDD_PRD/on/demandware.static/-/Library-Sites-TitanSharedLibrary/default/dw396610fd/images/homepage/All_Banners/IB_JanSale_FY25_D.jpg',
  'https://www.titan.co.in/dw/image/v2/BKDD_PRD/on/demandware.static/-/Library-Sites-TitanSharedLibrary/default/dw164a4548/images/homepage/All_Banners/Ti_smrt_60_d.jpg',
];

const Carousel = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 4000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 0,
  };

  return (
    <div className="w-full mx-auto p-4 overflow-hidden -z-10">
      <Slider {...settings}>
        {images.map((src, index) => (
          <div key={index}>
            <img src={src} alt={`Slide ${index + 1}`} className="w-full rounded-lg shadow-lg" />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Carousel;