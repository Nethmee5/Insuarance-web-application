import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper";
import usePreparedData from "./usePreparedData";
import get from "lodash/get";
import { Link } from "gatsby";

import "./index.scss";

const Partners = () => {
  const [active, setActive] = useState(0);

  const { title, data } = usePreparedData();

  return (
    <section className="partners-container">
      <article className="partners-wrapper section-center">
        {/* TEXT */}
        <div className="text-container">
          <div className="ch2">
            <h2>{title}</h2>
          </div>
          <div className="title-container">
            {data.map(({ title }, idx) => {
              return (
                <h3
                  key={idx}
                  className={`st-two ${active === idx ? "active-tab" : ""}`}
                  onClick={() => {
                    setActive(idx);
                  }}
                >
                  {title}
                </h3>
              );
            })}
          </div>
          <p className="st-two">{get(data, `[${active}].description`, "")}</p>
        </div>

        {/* PARTNERS SLIDER */}
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-xl-10 col-xxl-9">
              <div className="partners-slider-wrapper">
                <Swiper
                  spaceBetween={12}
                  slidesPerView={1}
                  centeredSlides={true}
                  autoplay={{
                    delay: 2000,
                    disableOnInteraction: true,
                  }}
                  pagination={{
                    clickable: true,
                  }}
                  breakpoints={{
                    360: {
                      slidesPerView: 3,
                      spaceBetween: 18,
                    },
                    768: {
                      slidesPerView: 5,
                      spaceBetween: 18,
                    },
                    1200: {
                      slidesPerView: 5,
                      spaceBetween: 16,
                    },
                  }}
                  loop={true}
                  modules={[Autoplay, Pagination]}
                >
                  {data[active].images.map(({ image, url }, idx) => {
                    return (
                      <SwiperSlide key={idx}>
                        <div className="img-container">
                          {active === 1 ? (
                            <img src={image}/>
                          ) : (
                            <Link to={url}>
                              <img src={image} loading={"lazy"} />
                            </Link>
                          )}
                          {/* <Link to={url}>
                            <img src={image} loading={"lazy"} />
                          </Link> */}
                        </div>
                      </SwiperSlide>
                    );
                  })}
                </Swiper>
              </div>
            </div>
          </div>
        </div>
      </article>
    </section>
  );
};

export default Partners;
