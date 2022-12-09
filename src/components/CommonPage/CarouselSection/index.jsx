import React, { useState } from "react";
import "./index.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper";
import { PrismicRichText } from "@prismicio/react";
import get from "lodash/get";

const CommonPageCarouselSection = ({ slice = {} }) => {
  const [start, setStart] = useState(false);
  return (
    <section className="core-values-container">
      <article className="core-values-wrapper">
        <div className="cv-text-wrapper section-center">
          <div>
            <PrismicRichText field={get(slice, "primary.title", [])} />
            <PrismicRichText field={get(slice, "primary.description", [])} />
          </div>
        </div>

        <div className="section-center cv-slider-wrapper">
        <Swiper
            spaceBetween={20}
            slidesPerView={"auto"}
            slidesPerGroup={1}
            breakpoints={{
              1440:{
                spaceBetween: 26
              }
            }}
            // centeredSlides={true}
            pagination={{
              clickable: true,
            }}
            modules={[Autoplay, Pagination]}
          >
            {get(slice, "items", []).map((item, idx) => (
              <SwiperSlide key={idx}>
                <div className="single-value" key={idx}>
                  <span>{idx + 1}</span>
                  <PrismicRichText field={get(item, "title", [])} />
                  <p>{get(item, "description", "")}</p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </article>
    </section>
  );
};

export default CommonPageCarouselSection;
