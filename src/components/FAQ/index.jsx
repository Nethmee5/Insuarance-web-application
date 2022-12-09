import React, { useState } from "react";
import { Accordion } from "react-bootstrap";
import get from "lodash/get";
import uniq from "lodash/uniq";
import { PrismicRichText } from "@prismicio/react";

import "./index.scss";

const Faq = (props) => {
  const categories = uniq(
    get(props, "data.faq", []).map((item) => item.category)
  );

  const [activeCategory, setActiveCategory] = useState(categories[0]);

  return (
    <section className="faq-container">
      <article className="faq-wrapper section-center">
        <div className="ch2">
          <h2 className="text-center">Frequently Asked Questions</h2>
        </div>
        <div className="faqs-wrapper">
          <div className="faq-title-wrapper" id="faq-titles">
            {categories.map((category, idx) => {
              return (
                <div
                  key={idx}
                  className={`single-title ${
                    category === activeCategory ? "active-faq" : ""
                  }`}
                >
                  <h3
                    className="st-two"
                    onClick={() => {
                      setActiveCategory(category);
                    }}
                  >
                    {category}
                  </h3>
                </div>
              );
            })}
          </div>
          <div className="faq-body-wrapper">
            <Accordion defaultActiveKey="0" className="faq-accordian accordion">
              {get(props, "data.faq", [])
                .filter((faq) => faq.category === activeCategory)
                .map(({ question, answer }, idx) => {
                  return (
                    <Accordion.Item eventKey={idx} key={idx}>
                      <Accordion.Header className="st-two">
                        <div>
                          <PrismicRichText field={question} />
                        </div>
                      </Accordion.Header>
                      <Accordion.Body>
                        <div>
                          <PrismicRichText field={answer} />
                        </div>
                      </Accordion.Body>
                    </Accordion.Item>
                  );
                })}
            </Accordion>
          </div>
        </div>
      </article>
    </section>
  );
};

export default Faq;
