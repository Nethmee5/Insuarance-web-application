import React, { useState } from "react";
import { FloatingLabel, Form } from "react-bootstrap";
import * as s from "./index.module.scss";
import axios from "axios";

const isDev = (value) => (process.env.NODE_ENV === "development" ? value : "");

const CareerForm = ({data}) => {
  const [success, setSuccess] = useState(false);
  const [attachment, setAttachment] = useState(null);
  const [fail, setFail] = useState(false);

  const [user, setUser] = useState({
    title: isDev(data[0].text),
    name: isDev("Mahesh"),
    email: isDev("mahesh@gmail.com"),
    phone: isDev("7147147147"),
    message: isDev("Test message"),
  });

  const [progress, setProgress] = useState(false);

  const encodeFile = async (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      return;
    }
    const file = e.target.files[0];
    if (file.size > 2 * 1024 * 1024) {
      return;
    }
    setProgress(true);
    let reader = new FileReader();
    if (file) {
      await reader.readAsDataURL(file);
      reader.onload = () => {
        let base64 = reader.result.replace("data:", "").replace(/^.+,/, "");
        setAttachment(base64);
      };
    }
    setProgress(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFail(false);

    const { name, email, phone, message } = user;

    setProgress(true);

    // careerSubmission()
    await axios
      .post("/api/career-submission", {
        attachment,
        name,
        fields: [
          { key: "Title", value: data[0].text },
          { key: "Name", value: name },
          { key: "Email", value: email },
          { key: "Phone", value: phone },
          { key: "Message", value: message },
        ],
      })
      .then(() => {
        if (process.env.NODE_ENV === "production") {
          setUser({
            name: "",
            email: "",
            phone: "",
            message: "",
          });
          setAttachment(null);
        }

        setSuccess(true);
        setProgress(false);
      })
      .catch(() => {
        setFail(true);
        setInterval(() => {
          setFail(false);
        }, 6000);
      });
    setProgress(false);
  };

  return (
    <section className={`section-center`}>
      <article className={s.form_wrapper}>
        <Form
          action=""
          method="post"
          className="forms"
          onSubmit={(e) => {
            handleSubmit(e);
          }}
        >
          <h4 className="title-one text-center">Apply Today</h4>
          <div className={s.form_row}>
            <FloatingLabel controlId="cName" label="Your Name" className="mb-sx-16 mb-sm-4 mb-md-2">
              <Form.Control
                type="text"
                placeholder="Your name"
                required
                value={user.name}
                onChange={(e) => setUser({ ...user, name: e.target.value })}
              />
            </FloatingLabel>
            <FloatingLabel controlId="cMobile" label="Your mobile number" className="mb-sx-16 mb-sm-4 mb-md-2">
              <Form.Control
                type="tel"
                pattern="[0-9]{9,10}"
                placeholder="Your mobile number"
                required
                value={user.phone}
                onChange={(e) => setUser({ ...user, phone: e.target.value })}
                onInvalid={(e) =>
                  e.target.setCustomValidity(
                    "Enter a number between 9-10 (ex: 0777 117 117)"
                  )
                }
                onInput={(e) => e.target.setCustomValidity("")}
              />
            </FloatingLabel>
          </div>
          <div className={s.form_row}>
            <FloatingLabel controlId="cEmail" label="Your email address" className="mb-sx-16 mb-sm-4 mb-md-2">
              <Form.Control
                type="email"
                placeholder="Your email address"
                required
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
              />
            </FloatingLabel>
            <FloatingLabel controlId="cv" label="Attach your CV (PDF, 2MB max)" className="mb-sx-16 mb-sm-4 mb-md-2">
              <Form.Control
                type="file"
                placeholder="Attach your CV"
                accept={"application/pdf"}
                onChange={encodeFile}
              />
            </FloatingLabel>
          </div>
          <FloatingLabel controlId="cfCMessage" label="Your message">
            <Form.Control
              as="textarea"
              placeholder="Your message"
              rows={7}
              value={user.message}
              onChange={(e) => {
                setUser({ ...user, message: e.target.value });
              }}
            />
          </FloatingLabel>
          {success && (
            <div className="form-success"> Thank you for applying. </div>
          )}
          {fail && (
            <div className="form-fail">
              {" "}
              Form submission failed. Please try again.{" "}
            </div>
          )}
          <button
            className="primary-btn-sm mt-4"
            type="submit"
            disabled={progress || success}
          >
            Apply now
          </button>
        </Form>
      </article>
    </section>
  );
};

export default CareerForm;
