import React from "react";
import { withPrismicPreview } from "gatsby-plugin-prismic-previews";
import { graphql, Link } from "gatsby";
import Layout from "../../components/Layout";
import get from "lodash/get";
import { PrismicRichText } from "@prismicio/react";
import RecentBlogs from "./Components/RecentBlogs";
import * as s from "./index.module.scss";

const BlogPostTemplate = ({ data, pageContext }) => {
  const pageData = get(data, "prismicBlogPost.data", {});

  const recentBlogs = get(data, "allPrismicBlogPost.nodes", [])
    .slice(0, 4)
    .filter((item) => item.uid !== pageContext.uid);

  return (
    <Layout
      data={pageData}
      metaTitle={`${get(pageData, "title[0].text", "")} | InsureMe Blog`}
      metaDescription={get(pageData, "summary", "")}
      metaImage={get(pageData, "image.url", "")}
    >
      <div className={s.blog_post_wrapper}>
        <div className={`section-center ${s.blog_post}`}>
          <div>
            <h1>{get(pageData, "title.text", "")}</h1>
            <div className={s.date_category}>
              <span className={`${s.category} secondary-btn`}>
                {get(pageData, "category", "")}
              </span>
              <span className={s.date}>{get(pageData, "post_date", "")}</span>
            </div>
            <div className={s.blog_image}>
              <img src={get(pageData, "image.url")} alt="" />
            </div>
            <h2>{get(pageData, "summary", "")}</h2>
            <PrismicRichText field={get(pageData, "body.richText", [])} />
          </div>

          <div className={s.prev_next}>
            <div className="d-flex align-items-center justify-content-between">
              <Link
                className="st-two"
                to={get(pageContext, "prevPage.url", "")}
              >
                Previous
              </Link>
              <Link
                className="st-two"
                to={get(pageContext, "nextPage.url", "")}
              >
                Next
              </Link>
            </div>
          </div>
        </div>

        <RecentBlogs list={recentBlogs} />
      </div>
    </Layout>
  );
};

export default withPrismicPreview(BlogPostTemplate);

export const query = graphql`
  query blogPostQuery($id: String) {
    prismicBlogPost(id: { eq: $id }) {
      url
      uid
      data {
        image {
          url
        }
        title {
          text
        }
        body {
          richText
        }
        summary
        post_date(formatString: "MMMM do, YYYY")
        category
      }
    }
    allPrismicBlogPost {
      nodes {
        url
        id
        uid
        data {
          summary
          post_date(formatString: "MMMM do, YYYY")
          category
          image {
            url
            thumbnails {
              thumbnail_square {
                url
              }
              thumbnail {
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
`;
