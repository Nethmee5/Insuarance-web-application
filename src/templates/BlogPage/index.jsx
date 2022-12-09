import React, { useState } from "react";
import { withPrismicPreview } from "gatsby-plugin-prismic-previews";
import { graphql } from "gatsby";
import Layout from "../../components/Layout";
import get from "lodash/get";
import { PrismicRichText } from "@prismicio/react";
import uniq from "lodash/uniq";
import * as s from "./index.module.scss";
import FeaturedBlog from "./Components/FeaturedBlog";
import Categories from "./Components/Categories";
import BlogList from "./Components/BlogList";

const BlogPageTemplate = ({ data }) => {
  const pageData = get(data, "prismicBlogPage.dataRaw", {});

  const allBlogs = get(data, "allPrismicBlogPost.nodes", []);

  const categories = uniq(allBlogs.map((item) => item.data.category));

  const featuredBlog = allBlogs.find(
    (blog) =>
      blog.uid ===
      get(data, "prismicBlogPage.dataRaw.featured_blog_post.uid", "")
  );

  const [activeCategory, setActiveCategory] = useState("All");

  return (
    <Layout data={pageData}>
      <div>
        <div className={s.blog_page_title}>
          <PrismicRichText field={get(pageData, "title", [])} />
        </div>

        <FeaturedBlog featuredBlog={featuredBlog} />

        <div className={s.category_blog_container}>
          <div className={s.category_blog}>
            <Categories
              categories={categories}
              activeCategory={activeCategory}
              setActiveCategory={setActiveCategory}
            />
            <BlogList activeCategory={activeCategory} allBlogs={allBlogs} />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default withPrismicPreview(BlogPageTemplate);

export const query = graphql`
  query blogPageQuery {
    prismicBlogPage {
      dataRaw
    }
    allPrismicBlogPost {
      nodes {
        url
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
