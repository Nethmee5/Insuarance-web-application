import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";
import truncate from "lodash/truncate";

const Founders = ({ tabData, active, isVisible }) => {
  if (!isVisible) return null;
  return (
    <div className="founders">
      <Swiper
        spaceBetween={20}
        slidesPerView={"auto"}
        initialSlide={0}
        pagination={{
          clickable: true,
        }}
        // loop={true}
        modules={[Pagination]}
      >
        {tabData[active].founders.map(
          ({ image, name, position, text }, idx) => {
            return (
              <SwiperSlide key={idx}>
                <div className="single-founder">
                  <div className="img-container">
                    <img src={image} alt={name} loading={"lazy"} />
                  </div>
                  <div className="body">
                    <h2 className="st-two name">{name}</h2>
                    <h3 className="bt-one position">{position}</h3>
                    <p className="bt-two text">
                      {truncate(text, {
                        length: 420,
                        separator: " ",
                        omission: "...",
                      })}
                    </p>
                  </div>
                </div>
              </SwiperSlide>
            );
          }
        )}
      </Swiper>
    </div>
  );
};

export default Founders;
