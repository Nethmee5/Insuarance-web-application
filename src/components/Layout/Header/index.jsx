import React, { useState } from "react";
import midSCurve from "../../../images/HeaderFooter/s_cuvre_nav_mid.svg";
import Logo from "../../../images/HeaderFooter/Logo.svg";
import * as styles from "./index.module.scss";
import { Link } from "gatsby";
import Mail from "../../../images/Icons/carbon_email.svg";
import Phone from "../../../images/Icons/carbon_phone_voice.svg";
import { GrClose } from "react-icons/gr";
import { FloatingLabel, Form } from "react-bootstrap";
import { useStaticQuery, graphql } from "gatsby"
import submitContactForm from "../../../../utils/submitContactForm";
import { get } from "lodash";

const Header = () => {
  const [toggle, setToggle] = useState(false);
  const [success, setSuccess] = useState(false);
  const [fail, setFail] = useState(false);
  const [progress, setProgress] = useState(false);

  const data = useStaticQuery(graphql`
  {
    allPrismicGlobalData {
      nodes {
        data {
          contact_number
          email_address
        }
      }
    }
  }
  `)

  const pageData = data.allPrismicGlobalData.nodes[0].data;

  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    message: "",
    type: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setProgress(true);
    let status = await submitContactForm(user);
    let response = get(status, "formResponse.data", {});
    let inquiryID = get(response, "inquiry_id", "")
    if(inquiryID){
      setSuccess(true);
      setProgress(false);
      user.phone="";
      setInterval(()=>{
        setSuccess(false)
      }, 6000)
    }else if(!inquiryID || status===404){
      setFail(true)
      setInterval(()=>{
        setFail(false)
      }, 6000)
    } 
  };

  return (
    <nav className={`${styles.top_nav} top-nav`}>
      <section className={styles.nav_container}>
        {/* NAV BACKGROUND CURVE */}
        <article className={styles.background_img_curve}>
          <div className={styles.thin_line}></div>
          <img src={midSCurve} alt="Footer Background" />
          <div className={`${styles.thick_line} d-none d-sm-block`}></div>
        </article>

        {/* NAV CONTENT CONTAINER */}
        <article className={styles.nav_content_container}>
          <div className={`${styles.main_nav} section-center`}>
            {/* NAV BRAND + MAIN LINKS */}
            <div className={styles.main_flex}>
              <div className={styles.brand_logo}>
                <Link to="/">
                  <img src={Logo} alt="InsureMe Logo" />
                </Link>
              </div>
              <div
                className={`${styles.nav_links_container_main} d-none d-xl-block`}
              >
                <ul>
                  <li>
                    <Link
                      to="/"
                      activeClassName={"active-page"}
                      className={`bt-one`}
                    >
                      Personal Insurance
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/corporate"
                      activeClassName={"active-page"}
                      className={`bt-one`}
                    >
                      Business Insurance
                    </Link>
                  </li>
                </ul>
              </div>
            </div>

            {/* TOGGLE BUTTON */}
            <div
              className={styles.toggler}
              onClick={() => {
                setToggle(!toggle);
              }}
            >
              <div className={styles.toggler_container}>
                <div className={styles.line_container}>
                  <div className="line"></div>
                  <div className="line"></div>
                  <div className="line"></div>
                </div>
              </div>
            </div>
          </div>

          {/* NAV LINKS + CONTACT + REQUEST CALL */}
          <div
            className={`${styles.toggle_nav} ${
              toggle ? styles.show_nav : ""
            } links-container`}
          >
            <div className={styles.nav_slider}>
              <div className={styles.close_icon}>
                <GrClose
                  onClick={() => {
                    setToggle(false);
                  }}
                />
              </div>

              {/* NAV LINKS */}
              <ul role="menu">
                <li role="menuitem">
                  <Link to="/" className="st-two page-links">
                    Personal Insurance
                  </Link>
                </li>
                <li role="menuitem">
                  <Link to="/corporate" className="st-two page-links">
                    Business Insurance
                  </Link>
                </li>
                <li role="menuitem">
                  <a
                    className="st-two page-links"
                    href="/#partners"
                  >
                    Our Partners
                  </a>
                </li>
                <li role="menuitem">
                  <Link to="/about-us" className="st-two page-links">
                    About Us
                  </Link>
                </li>
                {/* <li role="menuitem">
                  <Link to="/blog" className="st-two page-links">
                    What You Didn't Know
                  </Link>
                </li> */}
                <li role="menuitem">
                  <Link to="/careers" className="st-two page-links">
                    Careers
                  </Link>
                </li>
              </ul>

              {/* CONTACT */}
              <div
                className={`${styles.contact_info} d-flex flex-wrap justify-content-center align-items-center`}
              >
                <a href={`mailto:${get(pageData, "email_address", "")}`} className="bt-two">
                  <img src={Mail} alt="Mail Icon" />
                  {get(pageData, "email_address", "")}
                </a>
                <a href={`tel:${get(pageData, "contact_number", "")}`} className="bt-two">
                  <img src={Phone} alt="Phone Icon" />
                  {get(pageData, "contact_number", "")}
                </a>
              </div>

              {/* REQUEST CALL */}
              <form
                action=""
                method="post"
                className={`${styles.request_call_form} forms`}
                onSubmit={(e)=>handleSubmit(e)}
              >
                <FloatingLabel
                  controlId="floatingInput"
                  label="Your mobile number"
                >
                  <Form.Control
                    type="tel"
                    pattern="[0-9]{10}"
                    placeholder="Your mobile number"
                    required
                    value={user.phone}
                    onChange={(e) => setUser({ ...user, phone: e.target.value })}
                    onInvalid={(e)=>e.target.setCustomValidity('Mobile number should be 10 digits (ex: 0777 117 117)')}
                    onInput={e => e.target.setCustomValidity('')}
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
                <button className="secondary-btn" type="submit">
                  <img src={Phone} alt="Call Icon" />
                  REQUEST A CALL
                </button>
              </form>
            </div>
          </div>
        </article>
      </section>
      <div
        className={`${styles.layover} ${toggle ? styles.show_layover : ""}`}
        onClick={() => {
          setToggle(false);
        }}
      ></div>
    </nav>
  );
};

export default Header;
