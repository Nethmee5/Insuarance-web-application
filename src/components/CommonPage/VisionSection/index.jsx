import React from "react";
import * as s from "./index.module.scss";
import get from "lodash/get";

const CommonPageVisionSection = ({ slice = {} }) => {
  return (
    <section className={s.vision_container}>
      <article>
        <div className={`${s.text_wrapper} section-center`}>
          <span className="st-one">Vision</span>
          <h2>{get(slice, "primary.text", "")}</h2>
        </div>
        <article className={s.seperator}></article>
      </article>
    </section>
  );
};

export default CommonPageVisionSection;
