import React, { useState } from "react";

import usePrepareTabData from "./usePrepareTabData";
import { PrismicRichText } from "@prismicio/react";
import { Link } from "gatsby";
import get from "lodash/get";

import AboutCarousel from "./AboutCarousel";
import Founders from "./Founders";
import Team from "./Team";

import "./index.scss";

const CompanyInfo = ({ data: pageData }) => {
  const tabData = usePrepareTabData();

  const [active, setActive] = useState(0);

  return (
    <section className="comapny-info-container">
      <article className="company-info-wrapper section-center">
        {/* TABS */}
        <div className="tabs-container w-100">
          <div className="tabs-titles">
            {tabData.map(({ title }, idx) => {
              return (
                <div key={idx}>
                  <h3
                    className={`st-two text-nowrap ${
                      idx === active ? "active-tab" : ""
                    }`}
                    onClick={() => {
                      setActive(idx);
                    }}
                  >
                    {title}
                  </h3>
                </div>
              );
            })}
          </div>
          <div className="tabs-body w-100">
            <div className={"bt-one"}>
              <PrismicRichText field={tabData[active].body} />
            </div>
            {/*<p className="bt-one">{tabData[active].body}</p>*/}
            <Link
              to={get(tabData, `[${active}].link.link`, "")}
              target={get(tabData, `[${active}].link.target`, "_self")}
              className="primary-btn-sm-inv"
            >
              {get(tabData, `[${active}].link_label`, "")}
            </Link>
          </div>
        </div>

        {/* CAROUSEL */}
        <div className="carousel-container">
          <AboutCarousel
            tabData={tabData}
            active={active}
            isVisible={tabData[active].uid === "about"}
          />
          <Founders
            tabData={tabData}
            active={active}
            isVisible={tabData[active].uid === "founders"}
          />
          <Team
            tabData={tabData}
            active={active}
            isVisible={tabData[active].uid === "team"}
          />
        </div>
      </article>
    </section>
  );
};

export default CompanyInfo;
