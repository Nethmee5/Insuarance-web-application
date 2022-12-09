import React from "react";
import get from "lodash/get";
import { Link } from "gatsby";
import * as s from "./index.module.scss";

const BlogList = ({ allBlogs = [], activeCategory = "All" }) => {
  return (
    <div className={s.blog_list_container}>
      {allBlogs
        .filter((blog) => {
          if (activeCategory === "All") return true;
          return blog.data.category === activeCategory;
        })
        .map((blog) => {
          const excerpt = get(blog, "data.summary", "");
          return(
            <div className={`${s.blog_list}`} key={blog.uid}>
              <div className={`${s.blog_img}`}>
                <img
                  src={get(
                    blog,
                    "data.image.thumbnails.thumbnail_square.url",
                    ""
                  )}
                  alt={get(blog, "data.title.text", "")}
                />
              </div>
              <div className={`${s.blog_text}`}>
                <h2>
                  <Link to={blog.url}>{get(blog, "data.title.text", "")}</Link>
                </h2>

                <div className={s.date_category}>
                  <span className={`${s.category} secondary-btn`}>{get(blog, "data.category", "")}</span>
                  <span className={s.date}>{get(blog, "data.post_date", "")}</span>
                </div>
                <p>{excerpt.substring(0, 120)}{excerpt.length > 120? "..." : ""}</p>
              </div>
            </div>
          )
        })}
    </div>
  );
};

export default BlogList;
