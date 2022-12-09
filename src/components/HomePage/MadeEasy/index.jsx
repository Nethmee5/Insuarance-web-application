import React, { useState } from "react";
import { FloatingLabel, Form } from "react-bootstrap";
import PhoneWhite from "../../../images/Icons/carbon_phone_voice_white.svg";
import "./index.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper";
import get from "lodash/get";
import submitContactForm from "../../../../utils/submitContactForm";

const MadeEasy = ({ data }) => {
  const [success, setSuccess] = useState(false);
  const [fail, setFail] = useState(false);

  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    message: "",
    type: "",
    media_code: "Inme_GetQuote",
  });

  const [progress, setProgress] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setProgress(true);
    let status = await submitContactForm(user);
    let response = get(status, "formResponse.data", {});
    let inquiryID = get(response, "inquiry_id", "")
    if (inquiryID) {
      setProgress(false);
      window.location.href = `https://app.insureme.lk/motor/Car/full-insurance/Quotation?number=${user.phone}`;
      user.phone = "";
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
    <section className="me-container ch2">
      <article className="me-wrapper section-center d-xl-flex justify-content-around align-items-center">
        {/* TITLE + FORM */}
        <div className="title-form">
          <h2>{get(data, "benefits_section_title[0].text", "")}</h2>
          {/* FORM */}
          <div className="me-form-container">
            <form
              action="#"
              onSubmit={handleSubmit}
              method="post"
              className="forms d-md-flex align-items-center justify-content-center justify-content-xl-start"
            >
              <FloatingLabel controlId="meInput" label="Your mobile number">
                <Form.Control
                  type="tel"
                  pattern="[0-9]{10}"
                  placeholder="Your mobile number"
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
              <button className="primary-btn" type="submit" disabled={progress}>
                <img src={PhoneWhite} alt="Call Icon" loading={"lazy"} />
                {get(data, "benefits_section_cta_button_text", "")}
              </button>
            </form>
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
          </div>
        </div>
        {/* CARD CONTAINER */}
        <div className="card-grid d-none d-lg-block">
          <div className="card-grid-container">
            {get(data, "benefits", []).map(
              ({ title, subtitle, icon, description }, idx) => {
                return (
                  <div
                    className="single-card fadeIn"
                    key={idx}
                    data-delay={`${(idx + 1) / 4}s`}
                  >
                    <img
                      src={get(icon, "url", "")}
                      alt={title}
                      loading={"lazy"}
                    />
                    <h4 className="st-one">{title}</h4>
                    <h5 className="bt-one">{subtitle}</h5>
                    <p className="bt-two">{description}</p>
                  </div>
                );
              }
            )}
          </div>
        </div>
      </article>
      {/* CARDS SLIDER */}
      <article className="cards-slider d-lg-none">
        <Swiper
          spaceBetween={28}
          slidesPerView={"auto"}
          autoplay={{
            delay: 800000,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          loop={true}
          modules={[Autoplay, Pagination]}
        >
          {get(data, "benefits", []).map(
            ({ title, subtitle, icon, description }, idx) => {
              return (
                <SwiperSlide key={idx}>
                  <div className="single-card">
                    <img
                      src={get(icon, "url", "")}
                      alt={title}
                      loading={"lazy"}
                    />
                    <h4 className="st-one">{title}</h4>
                    <h5 className="bt-one">{subtitle}</h5>
                    <p className="bt-two">{description}</p>
                  </div>
                </SwiperSlide>
              );
            }
          )}
        </Swiper>
      </article>
    </section>
  );
};

export default MadeEasy;
