import React from "react";
import { withPrismicPreview } from "gatsby-plugin-prismic-previews";
import { graphql } from "gatsby";
import Layout from "../../components/Layout";
import CareerList from "./CareerList";
import get from "lodash/get";
import { PrismicRichText } from "@prismicio/react";
import * as s from "./index.module.scss";

const CareerTeamTemplate = ({ data }) => {
  const pageData = get(data, "prismicCareersTeamPage.dataRaw", {});

  return (
    <Layout data={pageData}>
      <section className={s.career_page_container}>
        <article className="section-center">
          <div className={s.page_title}>
            <PrismicRichText field={get(pageData, "title", [])} />
            <p className="st-two">{get(pageData, "description", "")}</p>
          </div>
        </article>
        <CareerList />
      </section>
    </Layout>
  );
};

export default withPrismicPreview(CareerTeamTemplate);

export const query = graphql`
  query careerTeamQuery {
    prismicCareersTeamPage {
      dataRaw
    }
  }
`;
