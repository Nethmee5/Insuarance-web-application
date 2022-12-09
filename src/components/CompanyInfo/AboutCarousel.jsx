import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper";
import Carousel from "react-bootstrap/Carousel";

const AboutCarousel = ({ tabData, active, isVisible }) => {
  // const is_ios =
  //   typeof window !== "undefined"
  //     ? /iP(ad|od|hone)/i.test(window.navigator.userAgent)
  //     : false;
  //
  // const is_safari =
  //   typeof window !== "undefined"
  //     ? !!navigator.userAgent.match(/Version\/[\d\.]+.*Safari/)
  //     : false;

  const isMobile = typeof window !== "undefined" && window.innerWidth < 767;

  if (!isVisible) return null;

  return (
    <>
      <div className={"ios-carousel-fix d-lg-none"}>
        <Carousel>
          {tabData[active].aboutImages.map(({ image }, idx) => {
            return (
              <Carousel.Item key={idx}>
                <img
                  src={image}
                  alt="Company Info Slider Image"
                  loading={"lazy"}
                />
              </Carousel.Item>
            );
          })}
        </Carousel>
      </div>
      <div className="about-carousel-container d-none d-lg-block">
        <Swiper
          spaceBetween={20}
          slidesPerView={"auto"}
          pagination={{
            clickable: true,
          }}
          modules={[Pagination]}
        >
          {tabData[active].aboutImages.map(({ image }, idx) => {
            return (
              <SwiperSlide key={idx}>
                <div className="company-info-img-container">
                  <img
                    src={image}
                    alt="Company Info Slider Image"
                    loading={"lazy"}
                  />
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </>
  );
};

export default AboutCarousel;
