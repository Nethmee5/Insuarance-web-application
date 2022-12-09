import React, { useEffect } from "react";
import { withPrismicPreview } from "gatsby-plugin-prismic-previews";
import { graphql } from "gatsby";
import Layout from "../../components/Layout";
import get from "lodash/get";
import * as styles from "./index.module.scss";
import Hero from "../../components/HomePage/Hero";
import CompareSelectSave from "../../components/CompareSelectSave";
import ClientsServed from "../../components/HomePage/ClientsServed";
import MadeEasy from "../../components/HomePage/MadeEasy";
import Promotions from "../../components/HomePage/Promotions";
import Partners from "../../components/Partners";
// import CTA from "../../components/CTA";
import Reviews from "../../components/HomePage/Reviews";
import FAQ from "../../components/FAQ";
// import LatestBlogs from "../../components/LatestBlogs";
import CompanyInfo from "../../components/CompanyInfo";

const HomePageTemplate = ({ data }) => {
  const pageData = get(data, "prismicHomePage.dataRaw", {});

  useEffect(() => {
    const fade = document.querySelectorAll(".fadeIn");
    let options = {
      root: document.querySelector("#scrollArea"),
      rootMargin: "0px",
      threshold: 1.0,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, idx) => {
        if (entry.intersectionRatio > 0) {
          entry.target.style.animation = `fadeIn 0.5s forwards linear`;
        } else {
          entry.target.style.color = "none";
        }
      });
    }, options);

    fade.forEach((fade) => {
      observer.observe(fade);
    });
  }, []);

  return (
    <Layout data={pageData}>
      <div className={styles.radial_background}>
        <Hero data={pageData} />
        <CompareSelectSave data={pageData} />
        <ClientsServed data={pageData} />
      </div>

      <div className={styles.linear_background}>
        <MadeEasy data={pageData} />
        <div id="special-offers">
        </div>
        <div id="promotionsScroll">
        </div>
        <Promotions data={pageData} />
      </div>

      <div id="insurance-partners"></div>
      <div id="partners"></div>
      <Partners />

      <div className={styles.light_bg}>
        {/* <CTA/> */}
        <Reviews />
      </div>

      <FAQ data={pageData} />

      <div id="about-us">
      </div>
      <CompanyInfo />
    </Layout>
  );
};

export default withPrismicPreview(HomePageTemplate);

export const query = graphql`
  query homePageQuery {
    prismicHomePage {
      dataRaw
    }
  }
`;
