import React from "react";
import { withPrismicPreview } from "gatsby-plugin-prismic-previews";
import { graphql } from "gatsby";
import Layout from "../../components/Layout";
import { SliceZone } from "@prismicio/react";

import get from "lodash/get";
import CommonPageHeroSection from "../../components/CommonPage/HeroSection";
import DetailsSection from "../../components/CommonPage/DetailsSection";
import VideoSection from "../../components/CommonPage/VideoSection";
import OurTeamSection from "../../components/CommonPage/OurTeamSection";
import Careers from "../../components/CommonPage/Careers";
import VisionSection from "../../components/CommonPage/VisionSection";
import CtaSection from "../../components/CommonPage/CtaSection";
import CarouselSection from "../../components/CommonPage/CarouselSection";
import AccordionSection from "../../components/CommonPage/AccordionSection";
import LastUpdatedDate from "../../components/CommonPage/LastUpdatedDate";
import RichText from "../../components/CommonPage/RichText";

const components = {
  details_section: DetailsSection,
  video_section: VideoSection,
  our_team_section: OurTeamSection,
  careers: Careers,
  vision_section: VisionSection,
  cta: CtaSection,
  carousel_section: CarouselSection,
  custom_accordion_section: AccordionSection,
  last_updated_date: LastUpdatedDate,
  rich_text_section: RichText,
};

const CommonPageTemplate = ({ data }) => {
  const pageData = get(data, "prismicCommonPage.dataRaw", {});

  return (
    <Layout data={pageData}>
      <CommonPageHeroSection data={pageData} />
      <SliceZone slices={pageData.body} components={components} />
    </Layout>
  );
};

export default withPrismicPreview(CommonPageTemplate);

export const query = graphql`
  query commonPageQuery($uid: String) {
    prismicCommonPage(uid: { eq: $uid }) {
      dataRaw
    }
  }
`;
