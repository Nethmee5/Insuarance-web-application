const get = require("lodash/get");
const buildPages = require("./build/buildPages");
const graphQuery = require("./build/buildQuery");
const getReviews = require("./build/getReviews");

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;

  const queryData = await graphql(graphQuery);

  const homePages = get(queryData, "data.allPrismicHomePage.nodes", []);
  buildPages(homePages, "src/templates/HomePage/index.jsx", createPage);

  const blogPages = get(queryData, "data.allPrismicBlogPage.nodes", []);
  buildPages(blogPages, "src/templates/BlogPage/index.jsx", createPage);

  const blogs = get(queryData, "data.allPrismicBlogPost.nodes", []);
  buildPages(blogs, "src/templates/BlogPost/index.jsx", createPage);

  const careers = get(queryData, "data.allPrismicCareer.nodes", []);
  buildPages(careers, "src/templates/Career/index.jsx", createPage);

  const careersTeam = get(
    queryData,
    "data.allPrismicCareersTeamPage.nodes",
    []
  );
  buildPages(careersTeam, "src/templates/CareerTeamPage/index.jsx", createPage);

  const commonPages = get(queryData, "data.allPrismicCommonPage.nodes", []);
  buildPages(commonPages, "src/templates/CommonPage/index.jsx", createPage);

  const corporatePages = get(
    queryData,
    "data.allPrismicBusinessInsurancePage.nodes",
    []
  );
  buildPages(corporatePages, "src/templates/Corporate/index.jsx", createPage);

  const pcPages = get(
    queryData,
    "data.allPrismicPartnerscollaborators.nodes",
    []
  );
  buildPages(
    pcPages,
    "src/templates/PartnersAndCollaboratorsPage/index.jsx",
    createPage
  );
};

exports.sourceNodes = async ({ actions, createContentDigest }) => {
  const { createNode } = actions;

  const reviews = await getReviews("ChIJo7FLYNNb4joRmIJIhCbS0-E");

  createNode({
    ...reviews,
    id: `build_data`,
    parent: null,
    children: [],
    internal: {
      type: `GoogleReviews`,
      content: JSON.stringify(reviews),
      contentDigest: createContentDigest(reviews),
    },
  });
};
