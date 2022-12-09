import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper";
import get from "lodash/get";
import { graphql, Link, useStaticQuery } from "gatsby";

import "./index.scss";

const LatestBlogs = (props) => {
  const featuredBlogs = get(props, "data.featured_blogs", []);

  const allBlogs = useStaticQuery(graphql`
    query {
      allPrismicBlogPost {
        nodes {
          url
          uid
          data {
            summary
            image {
              thumbnails {
                thumbnail_square {
                  url
                }
              }
            }
            title {
              text
            }
          }
        }
      }
    }
  `);

  const selectedBlogs = [];

  featuredBlogs.map(({ blog }) => {
    const matchingBlog = get(allBlogs, "allPrismicBlogPost.nodes", []).find(
      (fullBlog) => {
        return fullBlog.uid === blog.uid;
      }
    );
    selectedBlogs.push({
      title: get(matchingBlog, "data.title.text", ""),
      excerpt: get(matchingBlog, "data.summary", ""),
      image: get(
        matchingBlog,
        "data.image.thumbnails.thumbnail_square.url",
        ""
      ),
      url: get(matchingBlog, "url", ""),
    });
    return null;
  });

  if (!selectedBlogs || selectedBlogs.length === 0) return null;

  return (
    <section className="latest-blog-container">
      <article className="latest-blog-wrapper section-center">
        {/* TEXT */}
        <div className="latest-blog-text-wrapper ch2">
          <div>
            <h2>{get(props, "data.blog_section_title[0].text", "")}</h2>
            <p className="st-two">
              {get(props, "data.blog_section_description", "")}
            </p>
            <Link to="/blog" className="primary-btn-sm">
              {get(props, "data.blog_section_cta_text", "")}
            </Link>
          </div>
        </div>

        <div className="latest-blog-card-grid">
          {selectedBlogs.map(({ title, excerpt, image, url }, idx) => {
            return (
              <div className="single-blog-card" key={idx}>
                <div className="blog-card-img-container">
                  <img src={image} alt={title} loading={"lazy"} />
                </div>
                <div className="blog-card-text-container d-flex flex-wrap flex-column justify-content-between d-lg-block">
                  <div>
                    <h3 className="title-one">{title}</h3>
                    <p className="bt-one">
                      {excerpt.substring(0, 120)}
                      {excerpt.length > 120 ? "..." : ""}
                    </p>
                  </div>
                  <div>
                    <Link to={url} className="primary-btn-sm-inv">
                      READ MORE
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </article>
      {/* CAROUSEL */}
      <article className="latest-blog-carousel-wrapper">
        <Swiper
          spaceBetween={20}
          slidesPerView={"auto"}
          // autoplay={{
          // delay: 2500,
          // disableOnInteraction: false,
          // }}
          pagination={{
            clickable: true,
          }}
          loop={true}
          modules={[Autoplay, Pagination]}
        >
          {selectedBlogs.map(({ title, excerpt, image, url }, idx) => {
            return (
              <SwiperSlide key={idx}>
                <div className="single-blog-card">
                  <div className="blog-card-img-container">
                    <img src={image} alt={title} loading={"lazy"} />
                  </div>
                  <div className="blog-card-text-container d-flex flex-wrap flex-column justify-content-between">
                    <div>
                      <h3 className="title-one">{title}</h3>
                      <p className="bt-one">
                        {excerpt.substring(0, 120) + ""}
                        {excerpt.length > 120 ? "..." : ""}
                      </p>
                    </div>
                    <div>
                      <Link to={url} className="primary-btn-sm-inv">
                        READ MORE
                      </Link>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </article>
    </section>
  );
};

export default LatestBlogs;
