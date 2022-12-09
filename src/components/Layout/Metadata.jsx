  import * as React from "react";
import { Helmet } from "react-helmet";
import get from "lodash/get";
import { graphql, useStaticQuery } from "gatsby";

const Metadata = ({ metadata }) => {
  const defaultMetadata = useStaticQuery(graphql`
    query {
      prismicGlobalData {
        data {
          meta_description
          meta_title
          meta_image {
            url
          }
        }
      }
    }
  `);

  const defaultMetaTitle = get(
    defaultMetadata,
    "prismicGlobalData.data.meta_title",
    "Welcome to Insure Me"
  );

  const defaultMetaDescription = get(
    defaultMetadata,
    "prismicGlobalData.data.meta_description",
    "Welcome to Insure Me"
  );

  const defaultMetaImage = get(
    defaultMetadata,
    "prismicGlobalData.data.meta_image.url",
    ""
  );

  return (
    <Helmet>
      <meta charSet="utf-8" />
      <title>
        {get(metadata, "metaTitle", defaultMetaTitle) || defaultMetaTitle}
      </title>
      <meta
        name="description"
        content={
          get(metadata, "metaDescription", defaultMetaDescription) ||
          defaultMetaDescription
        }
      />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta
        property="og:image"
        content={
          get(metadata, "metaImage.url", defaultMetaImage) || defaultMetaImage
        }
      />

      <meta
        name="og:title"
        content={get(metadata, "facebookTitle", "")}
      />
      <meta
        name="og:description"
        content={get(metadata, "facebookDescription", "")}
      />
      <meta
          name="og:image"
          content={
            get(metadata, "metaImage.url", defaultMetaImage) || defaultMetaImage
          }
      />

      <meta name="twitter:card" content="summary_large_image"/>

      <meta
          name="twitter:image"
          content={
            get(metadata, "metaImage.url", defaultMetaImage) || defaultMetaImage
          }
      />
      <meta
        name="twitter:description"
        content={get(metadata, "twitterDescription", "")}
      />
      <meta
        name="twitter:title"
        content={get(metadata, "twitterTitle", "")}
      />

      <meta name="robots" content="noindex, nofollow" />
    </Helmet>
  );
};

export default Metadata;
