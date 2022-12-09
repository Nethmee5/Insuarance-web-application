import React, { useState } from "react";
import { FloatingLabel, Form } from "react-bootstrap";
import PhoneWhite from "../../../images/Icons/carbon_phone_voice_white.svg";
import get from "lodash/get";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper";

import "./index.scss";
import submitContactForm from "../../../../utils/submitContactForm";

const Promotions = ({ data }) => {
  const [success, setSuccess] = useState(false);
  const [fail, setFail] = useState(false);

  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    message: "",
    type: "",
    media_code: "Inme_Register",
  });

  const [progress, setProgress] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setProgress(true);
    let status = await submitContactForm(user);
    let response = get(status, "formResponse.data", {});
    let inquiryID = get(response, "inquiry_id", "")
    if (inquiryID) {
      setSuccess(true);
      setProgress(false);
      user.phone = "";
      setInterval(() => {
        setSuccess(false);
      }, 4000);
    } else if (!inquiryID || status === 404) {
      setFail(true);
      setInterval(() => {
        setFail(false);
      }, 4000);
    }
  };

  const carouselImages = get(data, "promotions_section_images", []);

  return (
    <section className="promotion-container">
      <article className="promotions-wrapper">
        {/* TITLE + FORM */}
        <div className="title-form">
          <div className="ch2">
            <h2>{get(data, "promotions_section_title[0].text", "")}</h2>
          </div>
          <h2 className="title-two">
            {get(data, "promotions_section_subtitle", "")}
          </h2>
          <p className="bt-one">
            {get(data, "promotions_section_description", "")}
          </p>
          {/* FORM */}
          <div className="me-form-container">
            <form
              action="#"
              onSubmit={handleSubmit}
              method="post"
              className="forms"
            >
              <div className="d-md-flex align-items-center form-wrapper flex-wrap">
                <FloatingLabel controlId="meInput" label="Your mobile number">
                  <Form.Control
                    type="tel"
                    pattern="[0-9]{10}"
                    placeholder="Your mobile number"
                    required
                    value={user.phone}
                    onChange={(e) =>
                      setUser({ ...user, phone: e.target.value })
                    }
                    onInvalid={(e) =>
                      e.target.setCustomValidity(
                        "Mobile number should be 10 digits (ex: 0777 117 117)"
                      )
                    }
                    onInput={(e) => e.target.setCustomValidity("")}
                  />
                </FloatingLabel>
                <button className="primary-btn" type="submit">
                  <img src={PhoneWhite} alt="Call Icon" loading={"lazy"} />
                  REGISTER
                </button>
              </div>
              <div className="form-message">
                {success && (
                  <div className="form-success"> Registered successfully. </div>
                )}
                {fail && (
                  <div className="form-fail">
                    {" "}
                    Registration failed. Please try again.{" "}
                  </div>
                )}
              </div>
              <div className="form-check">
                <input
                  type="checkbox"
                  value=""
                  id="flexCheckDefault"
                  required
                />
                <label className="form-check-label" htmlFor="flexCheckDefault">
                  I hereby confirm to receive promotional updates and agree to{" "}
                  <a href="/terms-and-conditions">terms & conditions</a>
                </label>
              </div>
            </form>
          </div>
        </div>

        {/* PROMOTION CAROUSEL */}
        <div className="promotion-carousel-container">
          <div className="promotion-carousel-wrapper">
            <Swiper
              spaceBetween={20}
              slidesPerView={"auto"}
              autoplay={{
                delay: 3500,
                disableOnInteraction: false,
              }}
              pagination={{
                clickable: true,
              }}
              breakpoints={{
                1024: {
                  slidesPerView: 1,
                  spaceBetween: 0,
                },
              }}
              loop={carouselImages.length > 1}
              modules={[Autoplay, Pagination]}
            >
              {carouselImages.map((image, idx) => (
                <SwiperSlide key={idx}>
                  <div className="img-container">
                    <img src={get(image, "image.url")} loading={"lazy"} />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </article>
    </section>
  );
};

export default Promotions;
