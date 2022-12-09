const linkResolver = require("./utils/prismic/linkResolver");

require("dotenv").config({
  path: `.env`,
});

module.exports = {
  siteMetadata: {
    title: `InsureMe.lk`,
    siteUrl: `https://insureme.lk`,
  },
  plugins: [
    "gatsby-plugin-sass",
    "gatsby-plugin-react-helmet",
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        icon: "src/images/InMe_Favicon.png",
      },
    },
    {
      resolve: "gatsby-source-prismic",
      options: {
        repositoryName: process.env.GATSBY_PRISMIC_REPO_NAME,
        accessToken: process.env.PRISMIC_ACCESS_TOKEN,
        customTypesApiToken: process.env.PRISMIC_CUSTOM_TYPES_API_TOKEN,
        linkResolver: (doc) => linkResolver(doc),
        shouldDownloadFiles: true,
      },
    },
    {
      resolve: "gatsby-plugin-prismic-previews",
      options: {
        repositoryName: process.env.GATSBY_PRISMIC_REPO_NAME,
        accessToken: process.env.PRISMIC_ACCESS_TOKEN,
      },
    },
    {
      resolve: "gatsby-plugin-google-tagmanager",
      options: {
        id: "GTM-WV2CRQF",
        includeInDevelopment: false,
      },
    },
    "gatsby-plugin-image",
    "gatsby-plugin-netlify",
  ],
};
