import React, { useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper";
import get from "lodash/get";
import TestimonialQuote from "../../../images/Icons/testimonial_quote.svg";
import { PrismicRichText } from "@prismicio/react";
import "./index.scss";

const CorporateTestimonials = ({ data }) => {
  // const[start, setStart] = useState(false);
  let start =  false;

  useEffect(()=>{
    const values = document.querySelectorAll('.val');

    let options = {
      root: document.querySelector('#scrollArea'),
      rootMargin: '0px',
      threshold: 1.0
    }

    const observer = new IntersectionObserver((entries)=>{
      entries.forEach((entry, idx) => {
        if (entry.intersectionRatio > 0){
          start = true;

        }
      })
    }, options);


    values.forEach(value => {
      observer.observe(value);
    })
    
  }, []);

  const testimonials = get(data, "body", []).find(
    (item) => item.slice_type === "testimonial"
  );
  // if (testimonials.items.length === 0) return null;

  return (
    <section className="corporate-testimonials-container">
      <article className="corporate-testimonials-wrapper">
        <div className="ch2">
          <h2>What our clients say</h2>
        </div>
        <Swiper
          slidesPerView={"auto"}
          loop={true}
          spaceBetween={28}
          autoplay={
            {
              delay: 4500,
              disableOnInteraction: false,
            }
          }
          pagination={{
            clickable: true,
          }}
          breakpoints={{
            768: {
              spaceBetween: 40,
            },
          }}
          modules={[Autoplay, Pagination]}
        >
          {testimonials.items.map((item, idx) => {
            return (
              <SwiperSlide key={idx}>
                <div className="single-testimonial val">
                  <div className="testimonial-quote">
                    <img src={TestimonialQuote} />
                  </div>
                  <div className="testimonial-text-container">
                    <img src={get(item, "image.url", "")} alt="" />
                    <p className="st-two text-center">
                      {get(item, "testimonial", "")}
                    </p>
                    <PrismicRichText field={get(item, "position", [])} />
                    <PrismicRichText field={get(item, "company", [])} />
                    <PrismicRichText field={get(item, "name", [])} />
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </article>
    </section>
  );
};

export default CorporateTestimonials;
