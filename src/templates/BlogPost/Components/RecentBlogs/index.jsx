import React from "react";
import { Link } from "gatsby";
import get from "lodash/get";
import * as s from "./index.module.scss";

const RecentBlogs = ({ list = [] }) => {
  if (!list || list.length === 0) return null;
  return (
    <div className={s.recent_blogs}>
      <h2 className={"text-center"}>Recent Blogs</h2>

      <div className="row section-center justify-content-center align-items-start">
        {list.map((blog) => (
          <div key={blog.id} className={`${s.single_blog} col-sm-12 col-md-6 col-lg-4`}>
            <div>
              <img
                src={get(blog, "data.image.thumbnails.thumbnail.url")}
                alt=""
              />
              <h4 className="title-two">
                <Link to={get(blog, "url", "")}>
                  {get(blog, "data.title.text", "")}
                </Link>
              </h4>
              <div className={s.date_category}>
                <span className={`${s.category} secondary-btn`}>{get(blog, "data.category", "")}</span>
                <span className={s.date}>{get(blog, "data.post_date", "")}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentBlogs;
