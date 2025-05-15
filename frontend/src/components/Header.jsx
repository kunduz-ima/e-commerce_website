import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css'; 
import 'slick-carousel/slick/slick-theme.css'; 


    // Importing images
    import image1 from '../images/image1.jpg';
    import image2 from '../images/image2.jpg';
    import image3 from '../images/image3.jpg';


const Header = () => {
  const slides = [
    { id: 1, image: image1 },
    { id: 2, image: image2 },
    { id: 3, image: image3 },
  ];

      const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        autoplay: true,
        autoplaySpeed: 3000,
      };

      return (
        <header className="relative w-full h-screen overflow-hidden">
          <Slider {...settings}>
            {slides.map((slide) => (
              <div key={slide.id} className="w-full h-full flex justify-center items-center">
                <img 
                  src={slide.image} 
                  alt={`Slide ${slide.id}`} 
                  className="w-full h-full object-contain" 
                />
              </div>
            ))}
          </Slider>
        </header>
      );
};

export default Header;