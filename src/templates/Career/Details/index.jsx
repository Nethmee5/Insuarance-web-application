import React from "react";
import * as s from "./index.module.scss";
import get from "lodash/get";
import { PrismicRichText } from "@prismicio/react";

const Details = ({ data }) => {

  const scrollTo = (e) =>{
    window.scrollTo({
      top:
        document.getElementById("form").getBoundingClientRect()
          .top -
        document.querySelector(".top-nav").getBoundingClientRect().height,
      left: 0,
    });
  }

  return (
    <section className={`${s.details_container} section-center`}>
      <article className={s.details_wrapper}>
        <div className={s.heading}>
          <div className={s.heading_text}>
            <PrismicRichText field={get(data, "title", [])} />
            <p className="st-two">{get(data, "subtitle", "")}</p>
          </div>
          <div>
            <a className="primary-btn-sm" onClick={(e)=>{scrollTo(e)}}>
              Apply now
            </a>
          </div>
        </div>
        <div className={s.body}>
          <PrismicRichText field={get(data, "body")} />
        </div>
      </article>
    </section>
  );
};

export default Details;
