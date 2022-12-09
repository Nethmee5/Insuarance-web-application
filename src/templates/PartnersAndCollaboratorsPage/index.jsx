import React from "react";
import { withPrismicPreview } from "gatsby-plugin-prismic-previews";
import { graphql } from "gatsby";
import Layout from "../../components/Layout";
import get from "lodash/get";
import { PrismicRichText } from "@prismicio/react";
import * as s from "./index.module.scss";

const PartnersAndCollaboratorsPage = ({ data }) => {
  const pageData = get(data, "prismicPartnerscollaborators.dataRaw", {}); 

  return (
    <Layout data={pageData}>
      <section className={s.pc_container}>
        <div className="section-center">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="row">
                <div className="col-sm-6 text-center text-sm-start">
                  <span>{get(pageData, "category", "")}</span>
                  <PrismicRichText field={get(pageData, "title", [])} />
                </div>
                <div className="col-sm-6 text-center text-sm-end">
                  <img
                    src={get(pageData, "logo.url", "")}
                    alt={get(pageData, "title[0].text", "")}
                    width={213}
                    className={"d-inline-block w-auto"}
                  />
                </div>

                <div className="col-12  mt-4 pt-3">
                  <PrismicRichText field={get(pageData, "description", [])} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default withPrismicPreview(PartnersAndCollaboratorsPage);

export const query = graphql`
  query pcQuery($id: String) {
    prismicPartnerscollaborators(id: { eq: $id }) {
      dataRaw
    }
  }
`;
