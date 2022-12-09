import React, { useEffect, useState } from "react";
import MailWhite from "../../../images/Icons/carbon_email_white.svg";
import InMe from "../../../images/HomePage/InMe.png";
// import BlueBack from "../../../images/HomePage/blue-background.png";
import Play from "../../../images/Icons/Play.svg";
import { FloatingLabel, Form } from "react-bootstrap";
import * as styles from "./index.module.scss";
import RightArrow from "../../../images/Icons/right_arrow.svg";
import { PrismicRichText } from "@prismicio/react";
import get from "lodash/get";
import { GrClose } from "react-icons/gr";
import Handle from "rc-slider/lib/Handles/Handle";
import submitContactForm from "../../../../utils/submitContactForm";

const Hero = ({ data }) => {
  const [path, setPath] = useState("/");
  const [modal, setModal] = useState(false);
  const [success, setSuccess] = useState(false);
  const [fail, setFail] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const bulletPoints = get(data, "bullet_points", "");

  useEffect(() => {
    setLoaded(true);
  }, []);

  const handleScroll = () => {
    window.scrollTo({
      top:
        document.getElementById("promotionsScroll").getBoundingClientRect()
          .top -
        document.querySelector(".top-nav").getBoundingClientRect().height,
      left: 0,
    });
  };

  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    message: "",
    type: "",
    media_code: "Inme_RequestQuote",
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
    <section className={styles.homepage_hero}>
      <article
        className={`section-center ${styles.hero_container} d-lg-flex justify-content-between align-items-center`}
      >
        {/* HERO TEXT + FORM */}
        <div className={styles.hero_text_form}>
          {/* HERO TEXT */}
          <div className={styles.hero_text}>
            <PrismicRichText field={get(data, "hero_section_title", [])} />
            <div className="bt-one">
              <PrismicRichText
                field={get(data, "hero_section_description", [])}
              />
            </div>
          </div>

          {/* FORM */}
          <div className={styles.hero_form_container}>
            <form
              action="#"
              onSubmit={handleSubmit}
              method="post"
              className="forms d-md-flex align-items-center justfy-content-between"
            >
              <FloatingLabel controlId="heroInput" label="Your mobile number">
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
                <img src={MailWhite} alt="Call Icon" />
                <span>{get(data, "hero_section_cta_label", "")}</span>
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

          {/* INSTALLMENT SCHEME */}
          <div className={styles.installment_scheme}>
            <div className={styles.installment_link}>
              <a
                className="bt-one"
                onClick={() => {
                  handleScroll();
                }}
              >
                0% installment schemes{" "}
                <img src={RightArrow} alt="Right Arrow" />
              </a>
              <div></div>
            </div>

            <div>
              {bulletPoints.split("\n").map((point, idx) => {
                return (
                  <h4
                    key={idx}
                    className={`bt-two ${
                      loaded ? styles.fade_bullets : styles.bullets
                    }`}
                  >
                    <span></span> {point}
                  </h4>
                );
              })}
            </div>
          </div>
        </div>

        {/* VIDEO */}
        <div
          className={`${styles.mascot_video_container} position-relative d-flex align-items-end justify-content-end`}
        >
          <div className={`${styles.mascot_container}`}>
            <img src={InMe} alt="Insure Me Mascot" />
          </div>
          <div className={`${styles.video_container} position-relative`}>
            <img
              src={get(data, "hero_section_video_thumbnail.url", "")}
              alt="Blue Background"
            />
            <div>
              <img src={Play} alt="Play Icon" onClick={() => setModal(true)} />
            </div>
          </div>
        </div>
      </article>
      <div className={`${styles.float_mascot_container}`}>
        <img src={InMe} alt="Insure Me Mascot" />
      </div>

      {/* MODAL */}
      <article
        className={`modal-container ${modal ? "" : "modal-hide"}`}
        onClick={() => setModal(false)}
      >
        <div className="modal-wrapper">
          <div>
            {modal && (
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${
                  data.hero_section_video_id
                }${modal ? "?autoplay=1" : ""}`}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                loading="lazy"
              />
            )}
          </div>
          <p onClick={() => setModal(false)}>
            <GrClose />
          </p>
        </div>
      </article>
    </section>
  );
};

export default Hero;
