import React from "react";
import { FloatingLabel, Form } from "react-bootstrap";
import MailWhite from "../../images/Icons/carbon_email_white.svg";
import * as styles from "./index.module.scss";

const CTA = () => {
  return (
    <section className={styles.cta_container}>
      <article className={`${styles.cta_wrapper} section-center`}>
        <div
          className={`${styles.text_form} d-lg-flex justify-content-center align-items-center`}
        >
          {/* TEXT */}
          <div className={styles.text_wrapper}>
            <h2>Not sure how to start?</h2>
            <p className="bt-one">
              Call our hotline to get the assistance you need
            </p>
          </div>

          {/* FORM */}
          <div className={styles.cta_form}>
            <form
              action=""
              method="post"
              className="forms d-xl-flex justify-content-between align-items-center"
            >
              <FloatingLabel controlId="ctaInput" label="Your mobile number">
                <Form.Control
                  type="text"
                  placeholder="Your mobile number"
                  required
                />
              </FloatingLabel>
              <button className="primary-btn" type="submit">
                <img src={MailWhite} alt="Mail Icon" />
                REGISTER
              </button>
            </form>
          </div>
        </div>
      </article>
    </section>
  );
};

export default CTA;
