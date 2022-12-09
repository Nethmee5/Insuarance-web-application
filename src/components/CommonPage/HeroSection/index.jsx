import React from "react";
import * as s from "./index.module.scss";
import { PrismicRichText } from "@prismicio/react";
import get from "lodash/get";

const CommonPageHeroSection = ({ data = {} }) => {
  const isTitleCenter = get(data, "center_title", false);
  return (
    <div className={s.hero_container}>
      <div className={s.hero_wrapper}>
        <div
          className={`${isTitleCenter ? "mt-4 pt-3" : s.text_container} ${
            isTitleCenter ? "text-center" : ""
          }`}
        >
          {get(data, "subtitle", "") && (
            <h3 className="st-one">{get(data, "subtitle", "")}</h3>
          )}
          <PrismicRichText field={get(data, "page_title", [])} />
          {get(data, "hash_tags", "") && (
            <h4 className="st-two">{get(data, "hash_tags", "")}</h4>
          )}
        </div>
        {!isTitleCenter && (
          <div className={s.img_container}>
            <img src={get(data, "image.url", "")} alt="" />
          </div>
        )}
      </div>
    </div>
  );
};

export default CommonPageHeroSection;
