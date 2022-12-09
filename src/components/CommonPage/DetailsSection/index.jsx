import React from "react";
import * as s from "./index.module.scss";
import { PrismicRichText } from "@prismicio/react";
import get from "lodash/get";

const CommonPageDetailsSection = ({ slice = {} }) => {
  return (
    <div className={s.about_container}>
      <div className={`${s.about_wrapper} section-center`}>
        <div className="row">
          <div className="col-lg-6">
            <PrismicRichText field={get(slice, "primary.title", [])} />
          </div>
          <div className="col-lg-6">
            <PrismicRichText className="st-two" field={get(slice, "primary.description", [])} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommonPageDetailsSection;
