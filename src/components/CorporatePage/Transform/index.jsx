import React, { useState } from "react";
import TransformImage from "../../../images/CorporatePage/transform.png";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper";
import Play from "../../../images/Icons/Play.svg";

import { PrismicRichText } from "@prismicio/react";
import get from "lodash/get";
import CustomPrismicLink from "../../CustomPrismicLink";
import { GrClose } from "react-icons/gr";
import resolvePrismicLink from "../../../../utils/prismic/resolveLink";

import "./index.scss";

const Transform = ({ data }) => {
  const [modal, setModal] = useState(false);
  const cardsContainer = get(data, "body1", []);
  const cardsArray = get(cardsContainer, "[0].items", []);
  const thumbnail = get(data, "video_section_icon.url", "");

  return (
    <section className="transform-container">
      <article className="transform-warpper section-center">
        {/* CONTENT */}
        <div className="content-wrapper justify-content-center align-items-center">
          <div className="video-container">
            <img src={thumbnail} alt="Transform Video Thumbnail" />
            <div className="play-icon">
              <img
                src={Play}
                alt="Play Icon"
                onClick={() => {
                  setModal(true);
                }}
              />
            </div>
          </div>
          <div className="transform-text-container">
            <PrismicRichText field={get(data, "video_section_title", [])} />
            <h3 className="st-one">
              {get(data, "video_section_subtitle", "")}
            </h3>
            <h4 className="bt-one">
              {get(data, "video_section_description", "")}
            </h4>
            <h5>
              Digi<span>s</span>
            </h5>
            <CustomPrismicLink
              prismicLink={get(data, "button_link", {})}
              className="primary-btn-sm"
            >
              {get(data, "button_label", "")}
            </CustomPrismicLink>
          </div>
        </div>

        {/* CARDS */}
        <div className="cards-wrapper">
          <Swiper
            slidesPerView={"auto"}
            // loop={true}
            spaceBetween={26}
            pagination={{
              clickable: true,
            }}
            modules={[Autoplay, Pagination]}
            breakpoints={{
              1400: {
                pagination: false,
              },
            }}
          >
            {cardsArray.map((card, idx) => {
              const { link, target, external } = resolvePrismicLink(card.url);
              return (
                <SwiperSlide key={idx}>
                  <div className="single-transform-card">
                    <div className="icon">
                      <img src={get(card, "icon.url", "")} />
                    </div>
                    <div className="logo">
                      <img src={get(card, "logo.url", "")} />
                    </div>
                    <PrismicRichText field={get(card, "title", [])} />
                    <p className="bt-two">{get(card, "description", "")}</p>
                    <a href={link} className="primary-btn-sm" target={target}>
                      Learn more
                    </a>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </article>

      {/* MODAL */}
      <article
        className={`modal-container ${modal ? "" : "modal-hide"}`}
        onClick={() => setModal(false)}
      >
        <div className="modal-wrapper">
          <div>
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${get(
                data,
                "youtube_video_id",
                ""
              )}${modal ? "?autoplay=1" : ""}`}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            ></iframe>
          </div>
          <p onClick={() => setModal(false)}>
            <GrClose />
          </p>
        </div>
      </article>
    </section>
  );
};

export default Transform;
