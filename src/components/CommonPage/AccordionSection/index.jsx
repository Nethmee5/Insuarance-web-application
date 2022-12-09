import React from "react";
import "./index.scss";
import { PrismicRichText } from "@prismicio/react";
import get from "lodash/get";
import { Accordion } from "react-bootstrap";

const CommonPageAccordionSection = ({ slice = {}, seoBlog=false}) => {

  console.log(slice.primary);
  console.log(slice.items);
  return (
    <div className="pb-container">
      <div className={`pb-wrapper section-center ${seoBlog ? "seo-width" : ""}`}>
        <div className="row">
          <div className={`${seoBlog ? "col-md-12" : "col-md-6"} text-wrapper`}>
            <PrismicRichText field={get(slice, "primary.title", [])} />
            <PrismicRichText field={get(slice, "primary.description", [])} />
          </div>

          <div className={`${seoBlog ? "col-md-12" : "col-md-6"} accordion-wrapper`}>
            <Accordion defaultActiveKey="0" className="faq-accordian accordion">
              {get(slice, "items", []).map(
                ({ accordion_title, accordion_description }, idx) => {
                  return (
                    <Accordion.Item eventKey={idx} key={idx}>
                      <Accordion.Header className="st-two">
                        <div>
                          <PrismicRichText field={accordion_title} />
                        </div>
                      </Accordion.Header>
                      <Accordion.Body>
                        <div>
                          <PrismicRichText field={accordion_description} />
                        </div>
                      </Accordion.Body>
                    </Accordion.Item>
                  );
                }
              )}
            </Accordion>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommonPageAccordionSection;
