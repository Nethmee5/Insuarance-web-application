import React from "react";
import "../Carousal/index.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper";
import data from "../Carousal/utills/data";

const CarousalSection = () => {
  return (
    <> 
      <div className="carousal">
       <div className="line2"></div>
        <div className="section-center">
          <h3>
            {" "}
            What key elements should be considered while selecting a motor full
            insurance policy ?
          </h3>

          <Swiper
            slidesPerView={1}
            spaceBetween={30}
            pagination={{
              clickable: true,
            }}
            autoplay={true}
            modules={[Pagination, Autoplay]}
            className="mySwiper"
            breakpoints={{
              768:{
                slidesPerView: 2
              },
              1200:{
                slidesPerView: 3
              },
              1440:{
                slidesPerView: 4
              },
            }}
          >
            {data.map((item, idx) => {
              return (
                <SwiperSlide className="swiper-slide" key={item.id}>
                  <img src={item.icon} alt="icon" class="icon" />
                  <div className="st-one">{item.title}</div>
                  <div className="content">{item.content}</div>
                </SwiperSlide>
              );
            })}
          </Swiper>

          <div className="bottom-text">
            InsureMe also assists with claims by advising and contacting the
            appropriate person in order to resolve the claim in a timely manner
          </div>
          <div class="line3"></div>
        </div>
      </div>
    </>
  );
};

export default CarousalSection;
