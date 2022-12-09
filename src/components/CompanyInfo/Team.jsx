import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper";

const Team = ({ tabData, active, isVisible }) => {
  if (!isVisible) return null;
  return (
    <div className="team">
      <div className="team-slider">
        <Swiper
          spaceBetween={20}
          slidesPerView={"auto"}
          pagination={{
            clickable: true,
          }}
          modules={[Autoplay, Pagination]}
        >
          {tabData[active].team.map(({ image, name, position }, idx) => {
            return idx < 8 ? (
              <SwiperSlide key={idx}>
                <div className="single-member">
                  <div className="img-container">
                    <img src={image} alt={name} loading={"lazy"} />
                  </div>
                  <div className="body">
                    <h2 className="st-two name">{name}</h2>
                    <h3 className="bt-one position">{position}</h3>
                  </div>
                </div>
              </SwiperSlide>
            ) : null;
          })}
        </Swiper>
      </div>
      <div className="team-grid">
        {tabData[active].team.map(({ image, name, position }, idx) => {
          return idx < 8 ? (
            <div className="single-member" key={idx}>
              <div className="img-container">
                <img src={image} alt={name} loading={"lazy"} />
              </div>
              <div className="body">
                <h2 className="st-two name">{name}</h2>
                <h3 className="bt-one position">{position}</h3>
              </div>
            </div>
          ) : null;
        })}
      </div>
    </div>
  );
};

export default Team;
