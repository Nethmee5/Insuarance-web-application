import { componentResolverFromMap } from "gatsby-plugin-prismic-previews";

import linkResolver from "./linkResolver";
import HomePageTemplate from "../../src/templates/HomePage";
import CorporatePageTemplate from "../../src/templates/Corporate";
import CareerTeamPage from "../../src/templates/CareerTeamPage";
import CareerTemplate from "../../src/templates/Career";
import BlogPageTemplate from "../../src/templates/BlogPage";
import BlogPostTemplate from "../../src/templates/BlogPost";
import CommonPageTemplate from "../../src/templates/CommonPage";
import PartnersAndCollaboratorsPage from "../../src/templates/PartnersAndCollaboratorsPage";


const previewConfig = [
  {
    repositoryName: process.env.GATSBY_PRISMIC_REPO_NAME,
    linkResolver,
    componentResolver: componentResolverFromMap({
      home_page: HomePageTemplate,
      blog_page: BlogPageTemplate,
      blog_post: BlogPostTemplate,
      business_insurance_page: CorporatePageTemplate,
      career: CareerTemplate,
      "careers_-_team_page": CareerTeamPage,
      common_page: CommonPageTemplate,
      partnerscollaborators: PartnersAndCollaboratorsPage,
    
    }),
  },
];

export default previewConfig;
