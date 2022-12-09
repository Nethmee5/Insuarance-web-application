import React from "react";
import "./index.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper";
import { PrismicRichText } from "@prismicio/react";
import get from "lodash/get";
import CustomPrismicLink from "../../CustomPrismicLink";
import { graphql, Link, useStaticQuery } from "gatsby";

const CommonPageCareersSection = ({ slice = {} }) => {
  const allCareers = useStaticQuery(graphql`
    query {
      allPrismicCareer {
        nodes {
          data {
            image {
              url
            }
            title {
              text
            }
          }
          uid
          url
        }
      }
    }
  `);

  const fullCareers = get(allCareers, "allPrismicCareer.nodes", []);

  let selectedCareers = [];

  get(slice, "items", []).map(({ career }) => {
    const c = fullCareers.find((car) => car.uid === career.uid);
    selectedCareers.push(c);
    return null;
  });

  return (
    <div className="careers-container">
      <div className="careers-wrapper">
        <div className="text-container d-md-flex w-100 align-items-center justify-content-between section-center">
          <PrismicRichText field={get(slice, "primary.title", [])} />
          <CustomPrismicLink
            prismicLink={get(slice, "primary.cta_link")}
            className={"primary-btn-sm-inv"}
          >
            {get(slice, "primary.cta_title")}
          </CustomPrismicLink>
        </div>

        <div className="section-center careers-slider">
          <Swiper
            spaceBetween={20}
            slidesPerView={"auto"}
            breakpoints={{
              1440: {
                spaceBetween: 26,
              },
            }}
            pagination={{
              clickable: true,
            }}
            modules={[Autoplay, Pagination]}
          >
            {selectedCareers.map((career, idx) => (
              <SwiperSlide key={idx}>
                <div className="single-career">
                  <Link to={get(career, "url", "")}>
                    <img
                      src={get(career, "data.image.url")}
                      alt={get(career, "data.title.text")}
                    />
                    {get(career, "data.title.text")}
                  </Link>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default CommonPageCareersSection;
