import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FloatingLabel, Form } from "react-bootstrap";
import { Autoplay, Navigation } from "swiper";
import get from "lodash/get";
import GetQuote from "../../../images/Icons/get_quote_email.svg";
import submitContactForm from "../../../../utils/submitContactForm";

import "./index.scss";

const CorporateHero = ({ data }) => {
  const [insurance, setInsurance] = useState("");

  const mobileImages = get(data, "hero_section_slideshow_images", []).map(
    ({ mobile_image }) => mobile_image.url
  );
  const tabImages = get(data, "hero_section_slideshow_images", []).map(
    ({ tab_image }) => tab_image.url
  );
  const desktopImages = get(data, "hero_section_slideshow_images", []).map(
    ({ desktop_image }) => desktop_image.url
  );

  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    message: "",
    type: "",
    media_code: "Inme_Corporate",
  });

  const [success, setSuccess] = useState(false);
  const [fail, setFail] = useState(false);
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
      user.name = "";
      user.email = "";
      user.phone = "";
      user.company = "";
      user.message = "";
      user.type = "";
      setInterval(() => {
        setSuccess(false);
      }, 6000);
    } else if (!inquiryID || status === 404) {
      setFail(true);
      setInterval(() => {
        setFail(false);
      }, 6000);
    }
  };

  return (
    <section className="corporate-hero-container">
      <article className="corporate-hero-wrapper">
        <div className="corporate-hero-slider-container">
          <div className="mobile-slide d-md-none">
            <div>
              <Swiper
                slidesPerView={1}
                centeredSlides={true}
                loop={true}
                navigation={true}
                autoplay={{
                  delay: 6000,
                  disableOnInteraction: false,
                }}
                modules={[Autoplay, Navigation]}
              >
                {mobileImages.map((image, idx) => {
                  return (
                    <SwiperSlide key={idx}>
                      <div className="img-container">
                        <img src={image} />
                      </div>
                    </SwiperSlide>
                  );
                })}
              </Swiper>
            </div>
          </div>
          <div className="tab-slide d-none d-md-block d-lg-none">
            <div>
              <Swiper
                slidesPerView={1}
                centeredSlides={true}
                loop={true}
                navigation={true}
                autoplay={{
                  delay: 6000,
                  disableOnInteraction: false,
                }}
                modules={[Autoplay, Navigation]}
              >
                {tabImages.map((image, idx) => {
                  return (
                    <SwiperSlide key={idx}>
                      <div className="img-container">
                        <img src={image} />
                      </div>
                    </SwiperSlide>
                  );
                })}
              </Swiper>
            </div>
          </div>
          <div className="desktop-slide d-none d-lg-block">
            <div>
              <Swiper
                slidesPerView={1}
                centeredSlides={true}
                loop={true}
                navigation={true}
                autoplay={{
                  delay: 6000,
                  disableOnInteraction: false,
                }}
                modules={[Autoplay, Navigation]}
              >
                {desktopImages.map((image, idx) => {
                  return (
                    <SwiperSlide key={idx}>
                      <div className="img-container">
                        <img src={image} />
                      </div>
                    </SwiperSlide>
                  );
                })}
              </Swiper>
            </div>
          </div>
        </div>
        <div className="corporate-hero-form-container section-center css">
          <form
            action="#"
            onSubmit={handleSubmit}
            method="post"
            className="forms corporate-hero-form"
          >
            <h2 className="st-one text-center">
              Allow professionals to handle your business risks
            </h2>
            <FloatingLabel
              controlId="cName"
              className={`${user.type ? "has-content" : "no-content"}`}
              label="Select Insurance Type*"
            >
              <Form.Select
                value={user.type}
                onChange={(e) => {
                  setUser({
                    ...user,
                    type: e.target.value,
                  });
                }}
                required
              >
                <option value=""></option>
                {get(data, "icon_blocks", []).map((block, idx) => {
                  return (
                    <option key={idx + 1} value={get(block, "description", "")}>
                      {get(block, "form_field", "")}
                    </option>
                  );
                })}
                <option value="Other">Other</option>
              </Form.Select>
            </FloatingLabel>
            <FloatingLabel controlId="cfName" label="Your name*">
              <Form.Control
                type="text"
                placeholder="Your name*"
                required
                value={user.name}
                onChange={(e) => setUser({ ...user, name: e.target.value })}
              />
            </FloatingLabel>
            <FloatingLabel controlId="cfMobile" label="Your mobile number*">
              <Form.Control
                type="tel"
                pattern="[0-9]{10}"
                placeholder="Your mobile number*"
                required
                value={user.phone}
                onChange={(e) => setUser({ ...user, phone: e.target.value })}
                onInvalid={(e) =>
                  e.target.setCustomValidity(
                    "Mobile number should be 10 digits (ex: 0777 117 117)"
                  )
                }
                onInput={(e) => e.target.setCustomValidity("")}
              />
            </FloatingLabel>
            <FloatingLabel controlId="cfEmail" label="Your email address*">
              <Form.Control
                type="email"
                placeholder="Your email address*"
                required
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
              />
            </FloatingLabel>
            <FloatingLabel controlId="cfCompany" label="Company name*">
              <Form.Control
                type="text"
                placeholder="Company name*"
                required
                value={user.company}
                onChange={(e) => setUser({ ...user, company: e.target.value })}
              />
            </FloatingLabel>
            <FloatingLabel
              controlId="cfCMessage"
              className="css-teaxtarea"
              label="Your message"
            >
              <Form.Control
                as="textarea"
                placeholder="Your message"
                rows={3}
                value={user.message}
                onChange={(e) => setUser({ ...user, message: e.target.value })}
              />
            </FloatingLabel>
            {success && (
              <div className="form-success">
                {" "}
                Thank you for your inquiry. We will get back to you soon.{" "}
              </div>
            )}
            {fail && (
              <div className="form-fail">
                {" "}
                Form submission failed. Please try again.{" "}
              </div>
            )}
            <button className="primary-btn" type="submit" disabled={progress}>
              <img src={GetQuote} alt="Get Quote Icon" />
              {success ? "SUBMITTED" : "GET IN TOUCH"}
            </button>
          </form>
        </div>
      </article>
    </section>
  );
};

export default CorporateHero;
