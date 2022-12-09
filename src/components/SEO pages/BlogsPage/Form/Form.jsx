import React, { useState } from "react";
import { FloatingLabel, Form } from "react-bootstrap";
import get from "lodash/get";
import GetQuote from "../../../../images/Icons/get_quote_email.svg";
import submitContactForm from "../../../../../utils/submitContactForm";

import "../Form/Form.scss";

const FormSection = () => {
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
    <div className="corporate-hero-form-container section-center css">
      <form
        action="#"
        onSubmit={handleSubmit}
        method="post"
        className="forms corporate-hero-form"
      >
        <h2 className="st-one text-center">Request a quote</h2>
        <FloatingLabel
          controlId="cName"
          className={`${user.type ? "has-content" : "no-content"}`}
          label="Select Insurance Type*"
        ></FloatingLabel>
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
  );
};

export default FormSection;
