import React from "react";
import { withPrismicPreview } from "gatsby-plugin-prismic-previews";
import { graphql } from "gatsby";
import Layout from "../../components/Layout";
import Details from "./Details";
import Form from "./Form";
import * as s from "./index.module.scss";
import get from "lodash/get";

const CareerTemplate = ({ data }) => {
  const pageData = get(data, "prismicCareer.dataRaw", {});

  return (
    <Layout
      data={pageData}
      metaTitle={`${get(pageData, "title[0].text", "")} | InsureMe Careers`}
      metaDescription={get(pageData, "subtitle", "")}
      metaImage={get(pageData, "image.url", "")}
    >
      <div className={s.career_wrapper}>
        <Details data={pageData} />
        <div id="form"></div>
        <Form data={pageData.title}/>
      </div>
    </Layout>
  );
};

export default withPrismicPreview(CareerTemplate);

export const query = graphql`
  query careerQuery($id: String) {
    prismicCareer(id: { eq: $id }) {
      dataRaw
    }
  }
`;
