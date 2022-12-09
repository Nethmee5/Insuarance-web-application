import React from "react";
import * as s from "./index.module.scss";
import get from "lodash/get";
import { PrismicRichText } from "@prismicio/react";
import CustomPrismicLink from "../../CustomPrismicLink";
import RightArrow from "../../../images/Icons/right_arrow_black.svg";

const CommonPageCtaSection = ({ slice = {} }) => {
  return (
    <div className={s.cta_container}>
      <article>
        <div className={`${s.cta_block} text-center d-md-flex align-items-center`}>
          <PrismicRichText field={get(slice, "primary.title", [])} />
          <CustomPrismicLink
            prismicLink={get(slice, "primary.cta_link", {})}
            className={"secondary-btn"}
          >
            <img src={RightArrow} alt="" />
            {get(slice, "primary.cta_label", "")}
          </CustomPrismicLink>
        </div>
      </article>
    </div>
  );
};

export default CommonPageCtaSection;
