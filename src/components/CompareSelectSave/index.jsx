import React, { useState, useEffect } from "react";
import * as styles from "./index.module.scss";
import AnimateIcon from "../../images/Icons/animateIcon.svg";
import { Modal, Form } from "react-bootstrap";
import get from "lodash/get";
import trim from "lodash/trim";
import { PrismicRichText } from "@prismicio/react";
import submitContactForm from "../../../utils/submitContactForm";
import GetQuote from "../../images/Icons/get_quote_email.svg";
import { format } from "date-fns";

// FORMS
import DefaultForm from "./FormModals/Default";
import ThirdParty from "./FormModals/ThirdParty";
import Travel from "./FormModals/Travel";
import Life from "./FormModals/Life";
import Global from "./FormModals/Global";

export const isDev = (value, defaultValue = "") => process.env.NODE_ENV === "development" ? value : defaultValue;

const CSS = ({ data }) => {
  const [home, setHome] = useState(false);
  const [show, setShow] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [modalTitle, setModalTitle] = useState("");

  const [dates, setDates] = useState({
    departure: "",
    arrival: "",
    dob: "",
  });

  const handleClose = () => setShow(false);
  const handleShow = (title = "", description = "") => {
    if (!title) return null;
    setShow(true);
    setModalTitle(title);

    if (!home) {
      user.type = description;
    }
  };

  const [user, setUser] = useState({
    name: isDev("IT-Test"),
    email: isDev("it-test@gmail.com"),
    phone: isDev("0715698548"),
    company: isDev("Test Company"),
    message: isDev("Test message"),
    type: "",
    media_code: "Inme_Corporate",
    departure_date: "",
    arrival_date: "",
    date_of_birth: "",
    passport: "",
    insurance_type: "",
    product_type: "",
  });

  const [success, setSuccess] = useState(false);
  const [fail, setFail] = useState(false);
  const [progress, setProgress] = useState(false);

  const handleSubmit = async (e, modalTitle) => {
    e.preventDefault();
    setProgress(true);

    home
      ? (user.media_code = "Inme_Personal")
      : (user.media_code = "Inme_Corporate");
    user.product_type = convertTitle(modalTitle);

    // DATE FORMAT
    user.departure_date = dates.departure ? format(dates.departure, 'yyyy-MM-dd') : "";
    user.arrival_date = dates.arrival ? format(dates.arrival, 'yyyy-MM-dd') : "";
    user.date_of_birth = dates.dob ? format(dates.dob, 'yyyy-MM-dd') : "";

    let status = await submitContactForm(user);
    let response = get(status, "formResponse.data", {});
    let inquiryID = get(response, "inquiry_id", "");

    if (inquiryID) {
      setSuccess(true);
      setProgress(false);
      user.name = "";
      user.email = "";
      user.phone = "";
      user.company = "";
      user.message = "";
      user.type = "";
      user.departure_date = "";
      user.arrival_date = "";
      user.date_of_birth = "";
      user.passport = "";
      user.insurance_type = "";
      user.media_code = "";
      dates.departure = "";
      dates.arrival = "";
      dates.dob = "";
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

  const convertTitle = (title = "") => {
    title = trim(title);
    let value = null;
    switch (title) {
      case 'Offer best health and well-being to your team':
        value = 'Medical';
        break;
      case 'Give the best protection your team deserves':
        value = 'Group Life';
        break;
      case 'Safety first! Be prepared for the worst':
        value = 'Personal Accident';
        break;
      case 'Protection for your valuable assets':
        value = 'Property';
        break;
      case 'Protect your business against 3rd party liabilities':
        value = 'Liability';
        break;
      case 'Best protection for your business':
        value = 'SME';
        break;
      default:
        value = title;
        break;
    }
    return value;
  };

  useEffect(() => {
    if (window.location.pathname === "/") {
      setHome(true);
    }
  }, []);

  return (
    <section className={styles.css_container}>
      <article className={`section-center`}>
        <div className={`${styles.css_wrapper}`}>
          <div className={`${styles.title_wrapper}`}>
            <PrismicRichText field={get(data, "feature_box_title", [])} />
            <div
              className={
                home ? styles.animate_icon_one : styles.animate_icon_two
              }
            >
              <img src={AnimateIcon} alt="Animate Icon" loading={"lazy"} />
            </div>
          </div>
          <div className={styles.package_container}>
            {get(data, "icon_blocks", []).map(
              ({ icon, description, modal_title, link }, idx) => {
                if (link) {
                  return (
                    <a className={styles.single_select} key={idx} href={link}>
                      <img src={icon.url} alt="" loading={"lazy"} />
                      <div>
                        <p className="st-two">{description}</p>
                      </div>
                    </a>
                  );
                }
                return (
                  <div
                    className={styles.single_select}
                    key={idx}
                    onClick={() => {
                      handleShow(modal_title, description);
                    }}
                  >
                    <img src={icon.url} alt="" loading={"lazy"} />
                    <div>
                      <p className="st-two">{description}</p>
                    </div>
                  </div>
                );
              }
            )}
          </div>
        </div>
      </article>
      <Modal
        show={show}
        onHide={handleClose}
        className={`${styles.css_form} css`}
        centered
      >
        <Modal.Header closeButton className={styles.header}>
          <Modal.Title>
            <h3 className="st-one">{modalTitle}</h3>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body
          className={styles.body}
          onClick={() => {
            setShowPopup(false);
          }}
        >
          <Form
            method="post"
            className={`${styles.css_form} forms`}
            onSubmit={(e) => handleSubmit(e, modalTitle)}
          >
            {selectForm(
              modalTitle,
              user,
              setUser,
              data,
              dates,
              setDates,
              showPopup,
              setShowPopup,
            )}
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

            <button
              className="primary-btn-sm"
              type="submit"
              disabled={progress}
            >
              <span>
                <img src={GetQuote} alt="Get Quote Icon" />
              </span>
              {success ? "Submitted" : "Get in touch"}
            </button>
          </Form>
        </Modal.Body>
      </Modal>
    </section>
  );
};

const selectForm = (
  modalTitle,
  user,
  setUser,
  data,
  dates,
  setDates,
  showPopup,
  setShowPopup,
  styles,
  progress,
) => {
  switch (modalTitle) {
    case "3rd Party Insurance":
      return (
        <ThirdParty
          user={user}
          setUser={setUser}
          styles={styles}
          progress={progress}
        />
      );
    case "Travel Insurance":
      return (
        <Travel
          user={user}
          setUser={setUser}
          showPopup={showPopup}
          setShowPopup={setShowPopup}
          dates={dates}
          setDates={setDates}
        />
      );
    case "Life Insurance":
      return <Life user={user} setUser={setUser} />;
    case "Global Health Insurance":
      return (
        <Global
          user={user}
          setUser={setUser}
          dates={dates}
          setDates={setDates}
        />);
    default:
      return <DefaultForm data={data} user={user} setUser={setUser} />;
  }
};

export default CSS;
