import React, { useState } from "react";
import Logo from "../../../images/HeaderFooter/Logo.svg";
import InMe from "../../../images/HeaderFooter/inme_footer.svg";
import { graphql, Link, useStaticQuery } from "gatsby";
import * as styles from "./index.module.scss";
import MailWhite from "../../../images/Icons/carbon_email_white.svg";
import Mail from "../../../images/Icons/carbon_email.svg";
import Phone from "../../../images/Icons/carbon_phone_voice.svg";
import Facebook from "../../../images/Icons/Facebook.svg";
import Instagram from "../../../images/Icons/Instagram.svg";
import LinkedIn from "../../../images/Icons/LinkedIn.svg";
import WhatsApp from "../../../images/Icons/WhatsApp.svg";
import Viber from "../../../images/Icons/Viber.svg";
import midSCurve from "../../../images/HeaderFooter/s_cuvre_footer_mid.svg";
import { FloatingLabel, Form } from "react-bootstrap";
import { PrismicRichText } from "@prismicio/react";
import get from "lodash/get";
import { format } from "date-fns";
import submitContactForm from "../../../../utils/submitContactForm";

const Footer = () => {
  const [success, setSuccess] = useState(false);
  const [fail, setFail] = useState(false);

  const data = useStaticQuery(graphql`
    {
      allPrismicGlobalData {
        edges {
          node {
            data {
              company_address {
                richText
              }
              contact_number
              email_address
              instagram_profile_url
              linkedin_profile_url
              facebook_profile_url
              viber_number
              whatsapp_number
            }
          }
        }
      }
    }
  `);

  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    message: "",
    type: "",
    media_code: "Inme_NewsLetter",
  });

  const [progress, setProgress] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setProgress(true);
    let status = await submitContactForm(user);
    let response = get(status, "formResponse.data", {});
    let inquiryID = get(response, "inquiry_id", "");
    if (inquiryID) {
      setSuccess(true);
      setProgress(false);
      user.email = "";
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

  const pageData = data.allPrismicGlobalData.edges[0].node.data;

  return (
    <footer className="">
      <section className={styles.footer_container}>
        {/* FOOTER BACKGROUND CURVE */}
        <article className={styles.background_img_curve}>
          <div className={styles.thin_line}></div>
          <img src={midSCurve} alt="Footer Background" loading={"lazy"} />
          <div className={styles.thick_line}></div>
        </article>

        {/* FOOTER CONTENT CONTAINER */}
        <article
          className={`${styles.footer_content_container} section-center`}
        >
          {/* COMPANY INFO + QUICK LINKS */}
          <div
            className={`${styles.info_links} d-sm-flex align-items-start justify-content-between justify-content-lg-between `}
          >
            {/* INFO */}
            <div className={styles.company_info}>
              <img src={Logo} alt="Logo" loading={"lazy"} />
              <div>
                <img src={InMe} alt="InMe Footer Icon" loading={"lazy"} />
                <h3 className="bt-two">
                  Insurance Made Easy
                  {/* COMPARE <span></span> SELECT <span></span> SAVE */}
                </h3>
              </div>
            </div>

            {/* QUICK LINKS */}
            <div
              className={`${styles.quick_links} d-flex align-item-start justify-content-start`}
            >
              <ul className="ps-0 mb-0" role="menu">
                <li role="menuitem">
                  <a href="/#partners" className="bt-one page-links">
                    Our Partners
                  </a>
                </li>
                <li role="menuitem">
                  <Link to="/about-us" className="bt-one page-links">
                    About Us
                  </Link>
                </li>
                {/* <li role="menuitem">
                  <Link to="/blog" className="bt-one page-links">
                    What You Didn't Know
                  </Link>
                </li> */}
                <li role="menuitem">
                  <Link to="/careers" className="bt-one page-links">
                    Careers
                  </Link>
                </li>
              </ul>
              <ul className="mb-0" role="menu">
                <li role="menuitem">
                  <Link to="/privacy-policy" className="bt-one page-links">
                    Privacy Policy
                  </Link>
                </li>
                <li role="menuitem">
                  <Link
                    to="/terms-and-conditions"
                    className="bt-one page-links"
                  >
                    Terms & Conditions
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* SUBSCRIBE + CONTACT INFO */}
          <div
            className={`${styles.subscribe_info} d-sm-flex justify-content-between justify-content-xl-between align-items-start flex-wrap`}
          >
            {/* SUBSCRIBE */}
            <div className={styles.subscribe}>
              <form
                action="#"
                onSubmit={handleSubmit}
                method="post"
                className={`${styles.subscribe_form} forms`}
              >
                <h2 className="bt-two">Join Our Newsletter</h2>
                <FloatingLabel
                  controlId="floatingFooterInput"
                  label="Enter your email"
                >
                  <Form.Control
                    type="email"
                    placeholder="Your mobile number"
                    required
                    value={user.email}
                    onChange={(e) =>
                      setUser({ ...user, email: e.target.value })
                    }
                  />
                </FloatingLabel>
                <button
                  className="primary-btn"
                  type="submit"
                  disabled={progress}
                >
                  <img src={MailWhite} alt="Call Icon" />
                  SUBSCRIBE
                </button>
                {success && (
                  <div className="form-success"> Successfully subscribed. </div>
                )}
                {fail && (
                  <div className="form-fail">
                    {" "}
                    Subscription failed. Please try again.{" "}
                  </div>
                )}
                <div className="form-check">
                  <input
                    type="checkbox"
                    value=""
                    id="flexCheckDefault"
                    required
                  />
                  <label
                    className="form-check-label"
                    htmlFor="flexCheckDefault"
                  >
                    I hereby confirm to receive promotional updates and agree to{" "}
                    <a href="/terms-and-conditions">terms & conditions</a>
                  </label>
                </div>
              </form>
            </div>

            {/* CONTACT */}
            <div className={styles.contact}>
              <div
                className={`${styles.contact_info} d-flex flex-wrap justify-content-start align-items-center`}
              >
                <a href={`mailto:${get(pageData, "email_address", "")}`}>
                  <img src={Mail} alt="Mail Icon" />
                  {get(pageData, "email_address", "")}
                </a>
                <a href={`tel:${get(pageData, "contact_number", "")}`}>
                  <img src={Phone} alt="Phone Icon" />
                  {get(pageData, "contact_number", "")}
                </a>
              </div>
              <div className={`${styles.address} bt-two`}>
                <PrismicRichText
                  field={get(pageData, "company_address.richText", [])}
                />
              </div>
              <div className={styles.socials}>
                <div className="d-flex align-items-center justify-content-start">
                  <div className="d-flex align-items-center justify-content-center">
                    <a
                      href={get(pageData, "facebook_profile_url", "")}
                      target="_blank"
                    >
                      <img loading={"lazy"} src={Facebook} alt={"Facebook"} />
                    </a>
                    <a
                      href={get(pageData, "instagram_profile_url", "")}
                      target="_blank"
                    >
                      <img loading={"lazy"} src={Instagram} alt={"Instagram"} />
                    </a>
                    <a
                      href={get(pageData, "linkedin_profile_url", "")}
                      target="_blank"
                    >
                      <img loading={"lazy"} src={LinkedIn} alt={"LinkedIn"} />
                    </a>
                    <a
                      href={`https://wa.me/${get(
                        pageData,
                        "whatsapp_number",
                        ""
                      )}`}
                      target="_blank"
                    >
                      <img loading={"lazy"} src={WhatsApp} alt={"WhatsApp"} />
                    </a>
                    <a
                      href={`viber://contact?number=94${get(
                        pageData,
                        "viber_number",
                        ""
                      )}`}
                    >
                      <img loading={"lazy"} src={Viber} alt={"Viber"} />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </article>

        {/* DIVIDER */}
        <div className={styles.divider}></div>

        {/* COPYRIGHTS */}
        <div className={styles}>
          <p className="bt-two text-center mb-0 pb-3">
            InsureMe Insurance Brokers (Pvt) ltd. {format(new Date(), "yyyy")} © All rights
            reserved.
          </p>
        </div>
      </section>
    </footer>
  );
};

export default Footer;
