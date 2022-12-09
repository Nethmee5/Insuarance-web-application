import React from "react";
import { withPrismicPreview } from "gatsby-plugin-prismic-previews";
import { graphql } from "gatsby";
import Layout from "../../components/Layout";
import CorporateHero from "../../components/CorporatePage/Hero";
import CompareSelectSave from "../../components/CompareSelectSave";
import Transform from "../../components/CorporatePage/Transform";
import Testimonials from "../../components/CorporatePage/Testimonials";
import CompanyInfo from "../../components/CompanyInfo";
import Partners from "../../components/Partners";
import get from "lodash/get";
import * as styles from "./index.module.scss";

const CorporatePageTemplate = ({ data }) => {
  const pageData = get(data, "prismicBusinessInsurancePage.dataRaw", {});

  return (
    <Layout data={pageData}>
      <div className={styles.radial_background}>
        <CorporateHero data={pageData} />
        <CompareSelectSave data={pageData} />
        <Transform data={pageData} />
      </div>
      <Testimonials data={pageData} />
      <CompanyInfo data={pageData} />
      <Partners data={pageData} />
    </Layout>
  );
};

export default withPrismicPreview(CorporatePageTemplate);

export const query = graphql`
  query corporatePageQuery {
    prismicBusinessInsurancePage {
      dataRaw
    }
  }
`;
