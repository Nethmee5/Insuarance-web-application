import { graphql, useStaticQuery } from "gatsby";
import get from "lodash/get";
import resolvePrismicLink from "../../../utils/prismic/resolveLink";

const usePrepareTabData = (data = {}) => {
  const aboutSectionData = useStaticQuery(graphql`
    query {
      prismicGlobalData {
        dataRaw
      }
    }
  `);

  const tabData = get(aboutSectionData, "prismicGlobalData.dataRaw", {});
  const founders = get(tabData, "body").find(
    (item) => item.slice_type === "founder"
  );
  const team = get(tabData, "body1").find((item) => item.slice_type === "team");

  const tabs = [];

  tabs.push({
    title: get(tabData, "about_us_tab_title", ""),
    body: get(tabData, "about_us_tab_description", []),
    aboutImages: get(tabData, "about_us_tab_images", []).map((item) => ({
      image: get(item, "image.url", ""),
    })),
    link_label: get(tabData, "about_us_tab_button_label", ""),
    link: resolvePrismicLink(get(tabData, "about_us_tab_link", {})),
    uid: "about",
  });

  tabs.push({
    title: get(tabData, "founders_tab_title", ""),
    body: get(tabData, "founders_tab_description", []),
    founders: get(founders, "items", []).map((item) => ({
      image: get(item, "image.url"),
      name: get(item, "name", ""),
      position: get(item, "title", ""),
      text: get(item, "description", ""),
    })),
    link_label: get(tabData, "founders_tab_button_label", ""),
    link: resolvePrismicLink(get(tabData, "founders_tab_link", {})),
    uid: "founders",
  });

  tabs.push({
    title: get(tabData, "team_tab_title", ""),
    body: get(tabData, "team_tab_description", []),
    team: get(team, "items", []).map((item) => ({
      image: get(item, "image.url"),
      name: get(item, "name", ""),
      position: get(item, "title", ""),
    })),
    link_label: get(tabData, "team_tab_button_label", ""),
    link: resolvePrismicLink(get(tabData, "team_tab_link", {})),
    uid: "team",
  });

  return tabs;
};

export default usePrepareTabData;
