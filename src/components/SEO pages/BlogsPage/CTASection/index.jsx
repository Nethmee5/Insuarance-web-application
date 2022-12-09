import React, { useState } from "react";
import "../CTASection/index.scss";
import { FloatingLabel, Form } from "react-bootstrap";
import CallIcon from "../../../../images/BlogsPage/Vector.png";
// import get from "lodash/get";
// import GetQuote from "../../../../images/Icons/get_quote_email.svg";
// import submitContactForm from "../../../../../utils/submitContactForm";

const CTA_Section = () => {
  // const [user, setUser] = useState({
  //   // name: "",
  //   // email: "",
  //   phone: "",
  //   // company: "",
  //   // message: "",
  //   // type: "",
  //   // media_code: "Inme_Corporate",
  // });

  // // const [success, setSuccess] = useState(false);
  // // const [fail, setFail] = useState(false);
  // // const [progress, setProgress] = useState(false);

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   // setProgress(true);
  //   // let status = await submitContactForm(user);
  //   // let response = get(status, "formResponse.data", {});
  //   // let inquiryID = get(response, "inquiry_id", "");
  //   // if (inquiryID) {
  // //     setSuccess(true);
  // //     setProgress(false);
  // //     user.name = "";
  // //     user.email = "";
  // //     user.phone = "";
  // //     user.company = "";=]
  // //     user.message = "";
  // //     user.type = "";
  // //     setInterval(() => {
  // //       setSuccess(false);
  // //     }, 6000);
  // //   } else if (!inquiryID || status === 404) {
  // //     setFail(true);
  // //     setInterval(() => {
  // //       setFail(false);
  // //     }, 6000);
  // //   }
  // // };
  // }

  return (
    <>
      <div className="cta-section">
        <div className="cta-section-wrapper">
          <div className="cta-form-wrapper">
            <Form>
              <Form.Group>
                <div className="cta-form-grid">
                  <div>
                    <Form.Control
                      type="tel"
                      placeholder="Enter your mobile number"
                    />
                  </div>
                  <div>
                    <button class="primary-btn">
                      <img src={CallIcon} alt="callicon" />
                      Request quote
                    </button>
                  </div>
                </div>
              </Form.Group>
            </Form>
            <div class="sub-points">
              <div class="list">
                <p>
                  {" "}
                  <span></span> Support on claims
                </p>
                <p>
                  {" "}
                  <span></span> Expert advice
                </p>
                <p>
                  {" "}
                  <span></span> Compare 15+ quotes
                </p>
                
              </div>
             
            </div>
       
          </div>

        </div>

      </div>
           
      <div class="line4"></div>
    </>
  );
};

export default CTA_Section;
