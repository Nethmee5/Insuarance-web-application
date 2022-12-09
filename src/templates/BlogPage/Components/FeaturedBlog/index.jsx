import React from "react";
import get from "lodash/get";
import { Link } from "gatsby";
import * as s from "./index.module.scss";

const FeaturedBlog = ({ featuredBlog }) => {
  return (
    <div className={s.featured_blogs_container}>
      <div className={s.image_container}>
        <img
          src={get(featuredBlog, "data.image.url")}
          alt=""
          className={"w-100"}
        />
      </div>
      <div className={s.text_container}>
        <h2>
          <Link to={get(featuredBlog, "url", "")}>
            {get(featuredBlog, "data.title.text", "")}
          </Link>
        </h2>
        <div className={s.date_category}>
          <span className={`${s.category} secondary-btn`}>{get(featuredBlog, "data.category", "")}</span>
          <span className={s.date}>{get(featuredBlog, "data.post_date", "")}</span>
        </div>
        <p>{get(featuredBlog, "data.summary", "")}</p>
      </div>
    </div>
  );
};

export default FeaturedBlog;
